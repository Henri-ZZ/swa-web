import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "../legal-page";
import { getLegalDocForLocale } from "../legal-doc";
import {
  getLocalizedAlternates,
  getLocalizedUrl,
  getSocialMetadata,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getLegalDocForLocale("refund", locale);
  const tb = await getTranslations({ locale, namespace: "header" });
  const t = await getTranslations({ locale, namespace: "legal" });
  const title = `${doc?.title ?? "Refund Policy"} | ${tb("brandFull")}`;
  const description = t("descriptions.refund");

  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, "/refund"),
    ...getSocialMetadata({
      locale,
      title,
      description,
      url: getLocalizedUrl(locale, "/refund"),
    }),
  };
}

export default async function RefundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const doc = await getLegalDocForLocale("refund", locale);
  if (!doc) notFound();

  const displayDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${doc.date}T00:00:00`));

  return (
    <LegalPage
      brand={t("header.brandFull")}
      cta={t("header.cta")}
      title={doc.title}
      lastUpdated={`${t("legal.lastUpdatedPrefix")}${displayDate}`}
      bodyHtml={doc.bodyHtml}
      t={t}
    />
  );
}
