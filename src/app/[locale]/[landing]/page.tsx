import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getLandingPage, getSiteUrl, isLandingSlug, LANDING_SLUGS } from "@/lib/landing-pages";
import { LandingPage } from "./landing-page";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LANDING_SLUGS.map((landing) => ({ locale, landing })),
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[landing]">): Promise<Metadata> {
  const { locale, landing } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number]) || !isLandingSlug(landing)) notFound();
  const page = getLandingPage(landing);
  const base = getSiteUrl();
  const path = `/${landing}`;
  const image = new URL(page.image, base).toString();

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: {
      canonical: `${base}${path}`,
      languages: { en: `${base}/${landing}`, "x-default": `${base}/${landing}` },
    },
    openGraph: { type: "website", url: `${base}${path}`, title: page.title, description: page.description, images: [{ url: image, width: 1280, height: 800, alt: page.imageAlt }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
    robots: { index: locale === "en", follow: true },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/[landing]">) {
  const { locale, landing } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number]) || !isLandingSlug(landing)) notFound();
  setRequestLocale(locale);
  const [page, t] = [
    getLandingPage(landing),
    await getTranslations({ locale: "en" }),
  ];
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} /><LandingPage page={page} t={t} /></>;
}
