import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getGettingStartedContent,
  type TutorialStep,
} from "@/lib/getting-started";
import { getSiteUrl } from "@/lib/site";
import { getLocalizedAlternates, getLocalizedUrl } from "@/lib/seo";
import { LocaleSwitcher } from "../locale-switcher";
import { SiteFooter } from "../site-footer";
import { StoreLink } from "../store-link";

type GettingStartedPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  params,
}: Pick<GettingStartedPageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const content = getGettingStartedContent(locale);
  const url = getLocalizedUrl(locale, "/getting-started");
  const image = `${getSiteUrl()}/promo-images/SBA_Marquee_Promo_Tile_1400x560.png`;

  return {
    title: { absolute: content.metadata.title },
    description: content.metadata.description,
    alternates: getLocalizedAlternates(locale, "/getting-started"),
    openGraph: {
      type: "article",
      url,
      siteName: "Stealth Browser Assistant",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      title: content.metadata.title,
      description: content.metadata.description,
      images: [
        {
          url: image,
          width: 1400,
          height: 560,
          alt: "Stealth Browser Assistant browser extension interface",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.title,
      description: content.metadata.description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

function TutorialScreenshot({
  screenshot,
  wide,
}: {
  screenshot: NonNullable<TutorialStep["screenshot"]>;
  wide: boolean;
}) {
  return (
    <figure
      className="overflow-hidden rounded-3xl border border-[var(--border)] bg-zinc-50 p-2 shadow-sm sm:p-4"
    >
      <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-white">
        <Image
          src={screenshot.src}
          alt={screenshot.label}
          width={screenshot.width}
          height={screenshot.height}
          className={
            wide
              ? "h-auto w-full object-contain"
              : "mx-auto h-auto max-h-[640px] w-auto max-w-full object-contain"
          }
          sizes={wide ? "(max-width: 1200px) 100vw, 1152px" : "(max-width: 1024px) 100vw, 50vw"}
        />
      </div>
      <figcaption className="px-3 pb-1 pt-4 text-center text-xs leading-5 text-zinc-500">
        {screenshot.label}
      </figcaption>
    </figure>
  );
}

function TutorialCard({
  step,
  index,
  locale,
}: {
  step: TutorialStep;
  index: number;
  locale: string;
}) {
  const hasWideScreenshot = Boolean(
    step.screenshot && step.screenshot.width / step.screenshot.height >= 1.7,
  );

  return (
    <article
      id={step.id}
      className="scroll-mt-28 border-b border-[var(--border)] py-16 first:pt-8 last:border-b-0"
    >
      <div
        className={
          hasWideScreenshot
            ? "grid gap-10"
            : "grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        }
      >
        <div
          className={
            hasWideScreenshot
              ? "max-w-3xl"
              : index % 2 === 1
                ? "lg:order-2"
                : undefined
          }
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[var(--purple)]">
              {step.number}
            </span>
            <span className="h-px w-8 bg-purple-200" />
            <span className="text-xs font-semibold tracking-[0.18em] text-[var(--purple)]">
              {step.eyebrow}
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            {step.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            {step.copy}
          </p>
          <ul className="mt-6 space-y-3">
            {step.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 leading-7 text-zinc-700">
                <span
                  aria-hidden
                  className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-[var(--purple)]"
                >
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          {step.note ? (
            <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-950">
              <strong className="font-semibold">
                {locale === "zh" ? "说明：" : "Note:"}
              </strong>{" "}
              {step.note}
            </p>
          ) : null}
          {step.warning ? (
            <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950">
              <strong className="font-semibold">
                {locale === "zh" ? "重要：" : "Important:"}
              </strong>{" "}
              {step.warning}
            </p>
          ) : null}
        </div>
        {step.screenshot ? (
          <div
            className={
              !hasWideScreenshot && index % 2 === 1 ? "lg:order-1" : undefined
            }
          >
            <TutorialScreenshot
              screenshot={step.screenshot}
              wide={hasWideScreenshot}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default async function GettingStartedPage({
  params,
  searchParams,
}: GettingStartedPageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);
  const [content, t] = [
    getGettingStartedContent(locale),
    await getTranslations({ locale }),
  ];
  const installedValue = Array.isArray(query.installed)
    ? query.installed[0]
    : query.installed;
  const isInstalled = installedValue === "1" || installedValue === "true";
  const pageUrl = getLocalizedUrl(locale, "/getting-started");
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metadata.title,
        description: content.metadata.description,
        inLanguage: locale === "zh" ? "zh-CN" : "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Stealth Browser Assistant",
            item: getLocalizedUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.hero.eyebrow,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--dark)]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 text-white">
            <Image
              src="/icon.png"
              alt="Stealth Browser Assistant logo"
              width={30}
              height={30}
              priority
            />
            <span className="truncate text-sm font-bold tracking-tight sm:text-base">
              Stealth Browser Assistant
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="#quick-start"
              className="hidden h-9 items-center rounded-full bg-[var(--purple)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--purple-bright)] sm:inline-flex"
            >
              {content.headerCta} <span aria-hidden>↓</span>
            </a>
            <LocaleSwitcher />
          </div>
        </nav>
      </header>

      <main>
        {isInstalled ? (
          <section className="border-b border-purple-400/20 bg-purple-600 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-purple-200">
                  {content.installed.eyebrow}
                </p>
                <h1 className="mt-2 text-2xl font-semibold">
                  {content.installed.title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-purple-100">
                  {content.installed.copy}
                </p>
              </div>
              <a
                href="#quick-start"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                {content.headerCta} <span aria-hidden>↓</span>
              </a>
            </div>
          </section>
        ) : null}

        <section className="relative overflow-hidden bg-[var(--dark)] text-white">
          <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-purple-300">
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                {content.hero.copy}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#quick-start"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--purple)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--purple-bright)]"
                >
                  {content.hero.primaryCta} <span aria-hidden>↓</span>
                </a>
                {!isInstalled ? (
                  <StoreLink
                    analyticsLabel="getting_started_hero"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    {content.hero.secondaryCta} <span aria-hidden>→</span>
                  </StoreLink>
                ) : null}
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
                <span>✓ {content.hero.time}</span>
                <span>✓ {content.hero.browsers}</span>
                <span>
                  ✓ {locale === "zh" ? "先使用免费功能" : "Free features first"}
                </span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-purple-950/50 backdrop-blur sm:p-9">
              <p className="text-sm font-semibold text-purple-200">
                {content.overview.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {content.overview.copy}
              </p>
              <ol className="mt-7 space-y-4">
                {content.overview.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <h2 className="font-semibold text-white">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                      {item.copy}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="quick-start" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-[var(--purple)]">
                {content.hero.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                {content.stepsHeading}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                {content.stepsCopy}
              </p>
            </div>
            <div className="mt-10">
              {content.steps.map((step, index) => (
                <TutorialCard
                  key={step.id}
                  step={step}
                  index={index}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--dark-2)] px-6 py-20 text-white">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-purple-300">
                {content.shortcutTable.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {content.shortcutTable.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">
                {content.shortcutTable.copy}
              </p>
              <p className="mt-5 text-sm leading-6 text-purple-200">
                {content.shortcutTable.note}
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-left">
                <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-zinc-400">
                  <tr>
                    {content.shortcutTable.columns.map((column) => (
                      <th key={column} className="px-5 py-4 font-semibold sm:px-7">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {content.shortcutTable.rows.map(([action, shortcut]) => (
                    <tr key={action}>
                      <td className="px-5 py-5 font-medium sm:px-7">{action}</td>
                      <td className="px-5 py-5 sm:px-7">
                        <kbd className="rounded-lg border border-white/15 bg-black/20 px-3 py-2 font-mono text-sm text-purple-200">
                          {shortcut}
                        </kbd>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--purple)]">
              {content.troubleshooting.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {content.troubleshooting.title}
            </h2>
          </div>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {content.troubleshooting.items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.question}
                  <span
                    aria-hidden
                    className="text-xl text-[var(--purple)] transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-purple-50 px-6 py-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--purple)]">
              {content.privacy.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {content.privacy.title}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {content.privacy.copy}
            </p>
            <Link
              href="/privacy"
              className="mt-7 inline-flex font-semibold text-[var(--purple)] hover:underline"
            >
              {t("footer.columns.support.links.privacy")} →
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--purple)]">
            {content.next.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.next.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">{content.next.copy}</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {content.next.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-3xl border border-[var(--border)] p-6 transition hover:border-purple-300 hover:shadow-md"
              >
                <h3 className="font-semibold">
                  {item.label}{" "}
                  <span
                    aria-hidden
                    className="inline-block text-[var(--purple)] transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {item.copy}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              {content.faqTitle}
            </h2>
            <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {content.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.question}
                    <span
                      aria-hidden
                      className="text-xl text-[var(--purple)] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--dark)] px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.overview.items[0].title}. {content.overview.items[1].title}.{" "}
            {content.overview.items[2].title}.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            {content.hero.copy}
          </p>
          {!isInstalled ? (
            <StoreLink
              analyticsLabel="getting_started_bottom"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--purple)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--purple-bright)]"
            >
              {content.hero.secondaryCta} <span aria-hidden>→</span>
            </StoreLink>
          ) : (
            <a
              href="#quick-start"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--purple)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--purple-bright)]"
            >
              {content.headerCta} <span aria-hidden>↑</span>
            </a>
          )}
        </section>
      </main>

      <SiteFooter t={t} />
    </div>
  );
}
