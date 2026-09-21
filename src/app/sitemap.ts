import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { LANDING_SLUGS } from "@/lib/landing-pages";
import { getLocalizedUrl } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

type StaticRoute = {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/getting-started", changeFrequency: "monthly", priority: 0.9 },
  { path: "/changelog", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/refund", changeFrequency: "monthly", priority: 0.4 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  // `sitemap.ts` is prerendered at build time, so this is the last deploy date.
  const lastModified = new Date();

  const localized: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: getLocalizedUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      // Helps Google pair the two locale versions instead of treating the
      // language copies as competing duplicates.
      alternates: {
        languages: {
          en: getLocalizedUrl("en", path),
          zh: getLocalizedUrl("zh", path),
          "x-default": getLocalizedUrl("en", path),
        },
      },
    })),
  );

  const landingPages: MetadataRoute.Sitemap = LANDING_SLUGS.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: {
      languages: { en: `${base}/${slug}`, "x-default": `${base}/${slug}` },
    },
  }));

  return [...localized, ...landingPages];
}
