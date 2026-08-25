import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/landing-pages";

export function getLocalizedAlternates(
  locale: string,
  path = "",
): NonNullable<Metadata["alternates"]> {
  const base = getSiteUrl();
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const englishUrl = `${base}${suffix || "/"}`;
  const chineseUrl = `${base}/zh${suffix}`;

  return {
    canonical: locale === "zh" ? chineseUrl : englishUrl,
    languages: {
      en: englishUrl,
      zh: chineseUrl,
      "x-default": englishUrl,
    },
  };
}

export function getLocalizedUrl(locale: string, path = ""): string {
  const base = getSiteUrl();
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  if (locale === routing.defaultLocale) {
    return `${base}${suffix || "/"}`;
  }

  return `${base}/${locale}${suffix}`;
}
