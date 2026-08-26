import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "../locale-switcher";
import { StoreLink } from "../store-link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "goodbye" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    robots: { index: false, follow: false },
  };
}

export default async function GoodbyePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("goodbye");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--dark)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(124,58,237,0.28),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.15),transparent_42%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Stealth Browser Assistant logo"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
              Stealth Browser Assistant
            </span>
          </Link>
          <LocaleSwitcher />
        </header>

        <section className="pb-16 pt-16 sm:pt-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
              {t("eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-6xl sm:leading-[1.05]">
              {t("heading")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              {t("description")}
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] shadow-2xl shadow-black/30 backdrop-blur-xl sm:mt-16">
            <div className="border-b border-white/10 px-6 py-7 sm:px-10 sm:py-9">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
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
                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    <path d="M8 9h8M8 13h5" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold leading-8 text-white sm:text-2xl">
                    {t("question")}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {t("formNote")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white px-2 py-3 sm:px-5 sm:py-5">
              <iframe
                src="https://tally.so/embed/KYKYMD?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                title={t("formTitle")}
                className="min-h-[620px] w-full rounded-2xl bg-white sm:min-h-[680px]"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                loading="eager"
              />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            {t("footerPrefix")} {" "}
            <StoreLink
              analyticsLabel="goodbye_footer"
              className="font-medium text-violet-300 transition-colors hover:text-violet-200"
            >
              {t("footerLink")}
            </StoreLink>
          </p>
        </section>
      </div>
    </main>
  );
}
