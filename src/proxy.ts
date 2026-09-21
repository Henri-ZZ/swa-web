import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { isLandingSlug } from "@/lib/landing-pages";

const withLocaleDetection = createMiddleware(routing);

// The guide/landing pages only exist in English (see `generateStaticParams` in
// `app/[locale]/[landing]/page.tsx`). Without this, locale detection rewrites
// `/hide-browser-tabs` to `/zh/hide-browser-tabs`, which in turn permanently
// redirects back to the English URL — an endless redirect loop for anyone with
// a `zh` cookie or `Accept-Language: zh`. Skipping detection keeps the English
// URL stable at 200, which is also what the canonical/hreflang tags promise.
const withoutLocaleDetection = createMiddleware({
  ...routing,
  localeDetection: false,
});

function getLandingSlug(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const [first, second] = segments;

  if (segments.length === 1 && isLandingSlug(first)) {
    return first;
  }
  if (
    segments.length === 2 &&
    (first === "en" || first === "zh") &&
    isLandingSlug(second)
  ) {
    return second;
  }
  return null;
}

export default function proxy(request: NextRequest) {
  const handler = getLandingSlug(request.nextUrl.pathname)
    ? withoutLocaleDetection
    : withLocaleDetection;

  return handler(request);
}

export const config = {
  // Match all pathnames including the root `/` so the middleware can
  // detect the browser's Accept-Language header and redirect to the
  // best-matching locale (falling back to `defaultLocale` = "en").
  // Excludes:
  // - API routes
  // - _next, _vercel (internal Next.js paths)
  // - static files (images, etc.)
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
