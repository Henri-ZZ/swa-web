import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FAQAccordion, type FAQItem } from "./faq-accordion";
import { DemoSection } from "./demo-section";
import { LocaleSwitcher } from "./locale-switcher";
import { PaddleBuyButton } from "./paddle-buy-button";
import { SiteFooter } from "./site-footer";
import { StoreLink } from "./store-link";
import { KeywordMatching } from "./keyword-matching";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  // Paddle 配置：服务端读取环境变量，作为 props 传给购买按钮（避免 NEXT_PUBLIC_ 前缀）。
  const paddleEnv = (process.env.PADDLE_ENV ?? "sandbox") as
    | "sandbox"
    | "production";
  const paddleToken = process.env.PADDLE_CLIENT_TOKEN ?? "";
  const paddlePriceId = process.env.PADDLE_PRICE_ID ?? "";

  const shortcutKeys = ["mute", "hide", "emergency", "clear"] as const;
  const heroActionKeys = ["mute", "hide", "emergency", "clear"] as const;
  const privacyKeys = [
    "noData",
    "noTracking",
    "noUploads",
    "noAccount",
  ] as const;
  const tabKeys = [
    "work",
    "project",
    "shopping",
    "personal",
    "banking",
  ] as const;
  const benefitKeys = ["unlimited", "feedback", "mute", "hide", "emergency", "clear", "all", "updates", "noFee"] as const;
  const trustKeys = ["free", "oneTime", "lifetime", "noSub"] as const;
  const faqKeys = ["safe", "data", "sites", "license", "custom", "detect"] as const;

  const faqItems: FAQItem[] = faqKeys.map((k) => ({
    question: t(`faq.items.${k}.question`),
    answer: t(`faq.items.${k}.answer`),
  }));

  const sensitiveTabs = new Set(["personal", "banking"]);

  return (
    <div className="flex flex-col flex-1">
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
            <span className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">
                {t("header.brandFull")}
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
            <Link
              href="#hero"
              className="transition-colors hover:text-white"
            >
              {t("header.nav.features")}
            </Link>
            <Link
              href="#keyword-matching"
              className="transition-colors hover:text-white"
            >
              {t("header.nav.howItWorks")}
            </Link>
            <Link
              href="#pricing"
              className="transition-colors hover:text-white"
            >
              {t("header.nav.pricing")}
            </Link>
            <Link href="#faq" className="transition-colors hover:text-white">
              {t("header.nav.faq")}
            </Link>
            <Link
              href="/changelog"
              className="transition-colors hover:text-white"
            >
              {t("header.nav.changelog")}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <StoreLink className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-[var(--purple)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--purple-bright)]">
              {t("header.cta")}
              <span aria-hidden>→</span>
            </StoreLink>
            <LocaleSwitcher />
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section
          id="hero"
          className="relative overflow-hidden bg-[var(--dark)] text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hero-glow"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--dark))]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-20 lg:grid-cols-2 lg:gap-10 lg:pt-28">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-bright)]" />
                {t("hero.eyebrow")}
              </span>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                {t("hero.headlineLine1")}
                <br />
                {t("hero.headlineLine2Start")}
                <span className="text-[var(--purple-bright)]">
                  {t("hero.headlineAccent")}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                {t("hero.copy")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--purple)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--purple-bright)]"
                >
                  {t("hero.primaryCta")}
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-2.5 w-2.5"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {t("hero.secondaryCta")}
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-400">
                {trustKeys.map((key) => (
                  <li key={key} className="flex items-center gap-1.5">
                    <CheckIcon />
                    {t(`hero.trust.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Browser mockup with extension popup */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[var(--dark-2)] shadow-2xl shadow-purple-900/40">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 border-b border-white/10 bg-[var(--dark-2)] px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs text-zinc-500">
                    <LockIcon />
                    <span className="truncate">
                      {t("hero.mockup.browserAddress")}
                    </span>
                  </div>
                </div>
                {/* Extension popup */}
                <div className="p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src="/icon.png"
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <span className="text-sm font-semibold text-white">
                        {t("header.brandFull")}
                      </span>
                      <Image
                        src="/premium.png"
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {heroActionKeys.map((key) => {
                      return (
                        <button
                          key={key}
                          type="button"
                          className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left transition-colors hover:bg-white/[0.08]"
                        >
                          <span className="flex items-center gap-3">
                            <ActionIcon kind={key} />
                            <span className="text-sm font-medium text-white">
                              {t(`hero.mockup.actions.${key}.name`)}
                            </span>
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500">
                            {t(`hero.mockup.actions.${key}.shortcut`)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      {t("hero.mockup.supportedLabel")}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-6">
                      {[
                        { name: "Chrome", icon: "/chrome.svg" },
                        { name: "Firefox", icon: "/firefox.svg" },
                        { name: "Edge", icon: "/edge.svg" },
                      ].map((b) => (
                        <span
                          key={b.name}
                          className="flex items-center gap-1.5 text-white"
                        >
                          <Image
                            src={b.icon}
                            alt={b.name}
                            width={16}
                            height={16}
                            className="h-4 w-4"
                          />
                          <span className="text-xs font-medium">{b.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Keyword matching: how it works */}
        <KeywordMatching t={t} />

        {/* Keyboard shortcuts */}
        <section id="shortcuts" className="bg-[var(--dark)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--purple-bright)]">
                {t("shortcuts.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("shortcuts.headingStart")}
                <span className="text-[var(--purple-bright)]">
                  {t("shortcuts.headingAccent")}
                </span>
              </h2>
              <p className="mt-4 text-zinc-400">{t("shortcuts.copy")}</p>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shortcutKeys.map((key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <ActionIcon kind={key} />
                    <span className="text-sm font-semibold text-white">
                      {t(`shortcuts.items.${key}.name`)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(t.raw(`shortcuts.items.${key}.keys`) as string[]).map(
                      (k, i, arr) => (
                        <span key={i} className="flex items-center gap-1.5">
                          <kbd className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-md border border-white/15 bg-[var(--dark-2)] px-2 text-xs font-mono text-white shadow-sm">
                            {k}
                          </kbd>
                          {i < arr.length - 1 && (
                            <span className="text-zinc-500 text-xs">+</span>
                          )}
                        </span>
                      ),
                    )}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-zinc-400">
                    {t(`shortcuts.items.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-zinc-500">
              {t("shortcuts.note")}
            </p>
          </div>
        </section>

        {/* Emergency / How It Works */}
        <section
          id="how-it-works"
          className="border-t border-[var(--border)] bg-white"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--purple)]">
                {t("emergency.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
                {t("emergency.heading")}
              </h2>
              <p className="mt-4 text-[var(--muted)]">{t("emergency.copy")}</p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              <TabsState
                label={t("emergency.beforeLabel")}
                variant="before"
                tabKeys={tabKeys}
                sensitiveTabs={sensitiveTabs}
                t={t}
              />
              <TabsState
                label={t("emergency.afterLabel")}
                variant="after"
                tabKeys={tabKeys}
                sensitiveTabs={sensitiveTabs}
                t={t}
              />
            </div>
          </div>
        </section>

        {/* YouTube Demo */}
        <DemoSection
          eyebrow={t("demo.eyebrow")}
          heading={t("demo.heading")}
          copy={t("demo.copy")}
          cta={t("demo.cta")}
        />

        {/* Privacy */}
        <section
          id="privacy"
          className="border-t border-white/10 bg-[var(--dark)] text-white"
        >
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--purple-bright)]">
                {t("privacy.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t("privacy.heading")}
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-400">
                {t("privacy.copy")}
              </p>
              <p className="mt-3 max-w-2xl text-sm font-medium text-zinc-300">
                {t("privacy.localMatching")}
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {privacyKeys.map((key) => (
                  <div key={key} className="flex gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--purple-bright)]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12l4 4L19 6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {t(`privacy.points.${key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">
                        {t(`privacy.points.${key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="border-t border-[var(--border)] bg-white"
        >
          <div className="mx-auto max-w-5xl px-6 py-24">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
              {t("pricing.heading")}
            </h2>
            <div className="mt-12 flex flex-col items-center gap-10 lg:flex-row lg:items-end lg:justify-center">
              {/* Free plan */}
              <div className="w-full max-w-xs rounded-3xl border border-[var(--border)] bg-white p-8 lg:flex-1">
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {t("pricing.freeName")}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-[var(--text)]">
                    {t("pricing.freePrice")}
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    {t("pricing.freePeriod")}
                  </span>
                </div>
                <div className="mt-6">
                  <StoreLink className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--purple)]/30 text-sm font-semibold text-[var(--purple)] transition-colors hover:bg-[var(--purple)]/5">
                    {t("pricing.freeCta")}
                    <span aria-hidden>→</span>
                  </StoreLink>
                </div>
                <ul className="mt-6 space-y-3">
                  {(["keywords", "feedback", "mute", "hide", "emergency"] as const).map((k) => (
                    <li
                      key={k}
                      className="flex items-center gap-3 text-sm text-[var(--text)]"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--purple)]/10 text-[var(--purple)]">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l4 4L19 6" />
                        </svg>
                      </span>
                      {t(`pricing.freeBenefits.${k}`)}
                    </li>
                  ))}
                  <li className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </span>
                    {t("pricing.freeBenefits.clear")}
                  </li>
                </ul>
              </div>
              {/* Premium plan */}
              <div className="relative w-full max-w-lg rounded-3xl border-2 border-[var(--purple)]/40 bg-white p-8 shadow-2xl shadow-[var(--purple)]/10 lg:flex-[1.5]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--purple)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  {t("pricing.badge")}
                </div>
                <h3 className="flex items-center gap-2.5 text-lg font-semibold text-[var(--text)]">
                  <Image
                    src="/premium.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  {t("pricing.premiumLabel")}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-[var(--text)]">
                    {t("pricing.price")}
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    {t("pricing.period")}
                  </span>
                </div>
                <div className="mt-6">
                  <PaddleBuyButton
                    label={t("pricing.cta")}
                    environment={paddleEnv}
                    token={paddleToken}
                    priceId={paddlePriceId}
                  />
                </div>
                <ul className="mt-6 space-y-3">
                  {benefitKeys.map((key) => (
                    <li
                      key={key}
                      className="flex items-center gap-3 text-sm text-[var(--text)]"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--purple)]/10 text-[var(--purple)]">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l4 4L19 6" />
                        </svg>
                      </span>
                      {t(`pricing.benefits.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Activation steps */}
              <div className="w-full max-w-md lg:flex-1 lg:self-start">
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {t("pricing.steps.title")}
                </h3>
                <ol className="mt-5 space-y-4">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--purple)]/10 text-sm font-semibold text-[var(--purple)]">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-6 text-[var(--muted)]">
                        {t(`pricing.steps.items.${i}`, {
                          product: t("header.brandFull"),
                        })}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left: heading + CTA */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--purple)]">
                  {t("faq.eyebrow")}
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
                  {t("faq.heading")}
                </h2>
                <p className="mt-6 text-sm font-medium text-[var(--text)]">
                  {t("faq.ctaStart")}{" "}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-[var(--purple)] transition-colors hover:text-[var(--purple-bright)]"
                  >
                    {t("faq.ctaLink")}
                    <span aria-hidden>→</span>
                  </Link>
                </p>
              </div>
              {/* Right: questions */}
              <div className="lg:col-span-8">
                <FAQAccordion items={faqItems} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter t={t} />
    </div>
  );
}

/* ---------- helpers ---------- */

function TabsState({
  label,
  variant,
  tabKeys,
  sensitiveTabs,
  t,
}: {
  label: string;
  variant: "before" | "after";
  tabKeys: readonly string[];
  sensitiveTabs: Set<string>;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const hidden = variant === "after";
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold uppercase tracking-wider ${
            hidden
              ? "bg-[var(--purple)]/10 text-[var(--purple)]"
              : "bg-zinc-100 text-[var(--muted)]"
          }`}
        >
          {label}
        </span>
      </div>
      <div className="rounded-2xl border border-[var(--border)] bg-zinc-50 p-4">
        {/* Browser chrome */}
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="ml-2 h-3 w-3 rounded bg-zinc-200" />
        </div>
        <div className="flex flex-wrap gap-2">
          {tabKeys.map((key) => {
            const isSensitive = sensitiveTabs.has(key);
            const isHidden = hidden && isSensitive;
            const isClosed = hidden && key === "banking";
            return (
              <div
                key={key}
                className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-all ${
                  isClosed
                    ? "border-zinc-200 bg-zinc-50 text-zinc-300 opacity-40"
                    : isHidden
                      ? "border-dashed border-zinc-300 bg-zinc-100 text-zinc-400 line-through opacity-60"
                      : isSensitive
                        ? "border-[var(--purple)]/30 bg-[var(--purple)]/5 text-[var(--text)]"
                        : "border-[var(--border)] bg-white text-[var(--text)]"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-current opacity-50" />
                {t(`emergency.tabs.${key}`)}
                {isSensitive && !isHidden && !isClosed && (
                  <span className="ml-1 inline-flex h-3.5 items-center rounded-full bg-[var(--purple)] px-1.5 text-[8px] font-semibold uppercase tracking-wider text-white">
                    mute
                  </span>
                )}
                {isHidden && <span className="ml-1 text-[10px]">hidden</span>}
                {isClosed && <span className="ml-1 text-[10px]">closed</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- icons ---------- */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 text-[var(--purple-bright)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

const ACTION_COLORS = {
  mute: "purple",
  hide: "blue",
  emergency: "red",
  clear: "green",
} as const;

const COLOR_HEX = {
  purple: "#7c3aed",
  blue: "#2563eb",
  red: "#dc2626",
  orange: "#ea580c",
  green: "#16a34a",
} as const;

function ActionIcon({ kind }: { kind: keyof typeof ACTION_COLORS }) {
  const c = COLOR_HEX[ACTION_COLORS[kind]];
  const cls = "h-4 w-4";
  if (kind === "mute") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${c}20`, color: c }}
      >
        <svg
          viewBox="0 0 24 24"
          className={cls}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      </span>
    );
  }
  if (kind === "hide") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${c}20`, color: c }}
      >
        <svg
          viewBox="0 0 24 24"
          className={cls}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      </span>
    );
  }
  if (kind === "emergency") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${c}20`, color: c }}
      >
        <svg
          viewBox="0 0 24 24"
          className={cls}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
      style={{ backgroundColor: `${c}20`, color: c }}
    >
      <svg
        viewBox="0 0 24 24"
        className={cls}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
      </svg>
    </span>
  );
}
