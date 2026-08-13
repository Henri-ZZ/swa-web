import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage, type LegalSection } from "../legal-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  const tb = await getTranslations({ locale, namespace: "header" });
  return { title: `${t("title")} | ${tb("brandFull")}` };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const sections = t.raw("legal.terms.sections") as LegalSection[];

  return (
    <LegalPage
      brand={t("header.brandFull")}
      cta={t("header.cta")}
      title={t("legal.terms.title")}
      lastUpdated={t("legal.lastUpdated")}
      sections={sections}
      t={t}
    />
  );
}
