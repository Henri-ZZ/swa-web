import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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