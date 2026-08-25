import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "../locale-switcher";
import { SiteFooter } from "../site-footer";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tb = await getTranslations({ locale, namespace: "header" });
  return {
    title: `${t("heading")} | ${tb("brandFull")}`,
    alternates: getLocalizedAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--dark)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--dark)]/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/icon.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="text-base font-bold tracking-tight text-white">
              {t("header.brandFull")}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={{ pathname: "/", hash: "pricing" }}
              className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-[var(--purple)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--purple-bright)]"
            >
              {t("header.cta")}
              <span aria-hidden>→</span>
            </Link>
            <LocaleSwitcher />
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          {/* Heading */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--purple)]/30 bg-[var(--purple)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--purple)]">
              {t("contact.eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              {t("contact.heading")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {t("contact.description")}
            </p>
          </div>

          {/* Info + form */}
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="space-y-8">
              <div className="rounded-2xl border border-[var(--border)] bg-zinc-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--purple)]/10 text-[var(--purple)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--text)]">
                  {t("contact.emailTitle")}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  {t("contact.emailBody")}
                </p>
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="mt-2 inline-block break-all text-sm font-semibold text-[var(--purple)] transition-colors hover:text-[var(--purple-bright)] hover:underline"
                >
                  {t("contact.email")}
                </a>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-zinc-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--purple)]/10 text-[var(--purple)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--text)]">
                  {t("contact.responseTitle")}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  {t("contact.responseBody")}
                </p>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-3xl border border-[var(--border)] bg-white p-2 shadow-sm sm:p-3">
                <iframe
                  src="https://tally.so/embed/xXbgK5"
                  title={t("contact.formTitle")}
                  className="h-[680px] w-full"
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter t={t} />
    </div>
  );
}
