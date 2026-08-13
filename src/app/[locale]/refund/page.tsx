import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage, type LegalSection } from "../legal-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.refund" });
  const tb = await getTranslations({ locale, namespace: "header" });
  return { title: `${t("title")} | ${tb("brandFull")}` };
}

export default async function RefundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const sections = t.raw("legal.refund.sections") as LegalSection[];

  return (
    <LegalPage
      brand={t("header.brandFull")}
      cta={t("header.cta")}
      title={t("legal.refund.title")}
      lastUpdated={t("legal.lastUpdated")}
      sections={sections}
      t={t}
    />
  );
}
