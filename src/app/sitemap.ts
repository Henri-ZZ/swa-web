import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl, LANDING_SLUGS } from "@/lib/landing-pages";
import { getLocalizedUrl } from "@/lib/seo";

const STATIC_ROUTES = ["", "/changelog", "/contact", "/privacy", "/refund", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const localizedPages = routing.locales.flatMap((locale) =>
    STATIC_ROUTES.map((path) => ({ locale, path })),
  );
  const landingPages = LANDING_SLUGS.map((slug) => ({ locale: "en", path: `/${slug}` }));

  return [...localizedPages, ...landingPages].map(({ locale, path }) => ({
      url: path && locale === "en"
        ? `${base}${path}`
        : getLocalizedUrl(locale, path),
      changeFrequency: path ? ("monthly" as const) : ("weekly" as const),
      priority: path.startsWith("/hide-") || path === "/chrome-panic-button" || path === "/mute-browser-tabs" || path === "/emergency-tab-close" ? 0.8 : path ? 0.6 : 1,
    }));
}
