import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { LANDING_SLUGS } from "@/lib/landing-pages";
import { getLocalizedUrl } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const STATIC_ROUTES = ["", "/getting-started", "/changelog", "/contact", "/privacy", "/refund", "/terms"];

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
      priority: path.startsWith("/hide-") || path === "/panic-button" || path === "/chrome-panic-button" || path === "/mute-browser-tabs" || path === "/emergency-tab-close" || path === "/clean-porn-history" ? 0.8 : path ? 0.6 : 1,
    }));
}
