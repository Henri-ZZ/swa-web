import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLandingPage, getSiteUrl, isLandingSlug, LANDING_SLUGS } from "@/lib/landing-pages";
import { LandingPage } from "./landing-page";

export function generateStaticParams() {
  return LANDING_SLUGS.map((landing) => ({ locale: "en", landing }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[landing]">): Promise<Metadata> {
  const { locale, landing } = await params;
  if (locale !== "en" || !isLandingSlug(landing)) notFound();
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
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/[landing]">) {
  const { locale, landing } = await params;
  if (locale !== "en" || !isLandingSlug(landing)) notFound();
  setRequestLocale(locale);
  const [page, t] = [getLandingPage(landing), await getTranslations()];
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} /><LandingPage page={page} t={t} /></>;
}
