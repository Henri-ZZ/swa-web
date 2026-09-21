import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getLandingPage, isLandingSlug, LANDING_SLUGS } from "@/lib/landing-pages";
import { getSiteUrl } from "@/lib/site";
import { LandingPage } from "./landing-page";

/**
 * The landing/guide pages are English-only content, so only the default locale
 * is prerendered. Localized duplicates used to be served as `noindex` pages,
 * which Google flagged as a critical coverage issue; they now permanently
 * redirect to the English URL instead (see also `src/proxy.ts`).
 */
export function generateStaticParams() {
  return LANDING_SLUGS.map((landing) => ({ locale: routing.defaultLocale, landing }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[landing]">): Promise<Metadata> {
  const { locale, landing } = await params;
  if (!isLandingSlug(landing) || locale !== routing.defaultLocale) return {};

  const page = getLandingPage(landing);
  const base = getSiteUrl();
  const path = `/${landing}`;
  const url = `${base}${path}`;
  const image = new URL(page.image, base).toString();

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    openGraph: { type: "website", url, title: page.title, description: page.description, images: [{ url: image, width: 1280, height: 800, alt: page.imageAlt }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/[landing]">) {
  const { locale, landing } = await params;
  if (!isLandingSlug(landing)) notFound();
  if (locale !== routing.defaultLocale) permanentRedirect(`/${landing}`);
  setRequestLocale(locale);
  const [page, t] = [
    getLandingPage(landing),
    await getTranslations({ locale: "en" }),
  ];
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} /><LandingPage page={page} t={t} /></>;
}
