import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "../legal-page";
import { getLegalDocForLocale } from "../legal-doc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getLegalDocForLocale("refund", locale);
  const tb = await getTranslations({ locale, namespace: "header" });
  return { title: `${doc?.title ?? "Refund Policy"} | ${tb("brandFull")}` };
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
