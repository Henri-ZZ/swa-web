import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";

export const SOCIAL_IMAGE = {
  url: "/promo-images/SBA_Marquee_Promo_Tile_1400x560.png",
  width: 1400,
  height: 560,
  alt: "Stealth Browser Assistant — Mute, Hide, and Clean browser tabs",
} as const;

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

/**
 * Shared Open Graph / Twitter tags so every indexable page ships a complete
 * social preview instead of falling back to nothing (or to the home page copy).
 */
export function getSocialMetadata({
  locale,
  title,
  description,
  url,
  image = SOCIAL_IMAGE,
}: {
  locale: string;
  title: string;
  description: string;
  url: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Pick<Metadata, "openGraph" | "twitter"> {
  const imageUrl = image.url.startsWith("http")
    ? image.url
    : new URL(image.url, getSiteUrl()).toString();

  return {
    openGraph: {
      type: "website",
      url,
      siteName: "Stealth Browser Assistant",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
