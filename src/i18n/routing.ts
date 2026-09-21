import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
  // Each page already emits exact `<link rel="alternate" hreflang>` tags, while
  // this middleware header advertises a locale variant for *every* pathname.
  // That made Google discover `/zh/<landing>` duplicates of pages that only
  // exist in English and report them as "Excluded by 'noindex' tag".
  alternateLinks: false,
});