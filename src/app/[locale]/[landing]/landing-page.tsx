import Image from "next/image";
import type { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { LandingPageContent, LandingSlug } from "@/lib/landing-pages";
import { LocaleSwitcher } from "../locale-switcher";
import { SiteFooter } from "../site-footer";
import { StoreLink } from "../store-link";
import { STORE_URLS } from "../store-urls";

type Translations = Awaited<ReturnType<typeof getTranslations>>;

const relatedLabels: Record<LandingSlug, string> = {
  "hide-browser-tabs": "Hide browser tabs",
  "hide-chrome-tabs": "Hide Chrome tabs",
  "hide-tabs-from-boss": "Hide tabs at work",
  "chrome-panic-button": "Chrome panic button",
  "mute-browser-tabs": "Mute browser tabs",
  "emergency-tab-close": "Emergency tab close",
  "clean-porn-history": "Clean porn history and hide tabs",
};

function LandingHeader({ t }: { t: Translations }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--dark)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <Image src="/icon.png" alt="Stealth Browser Assistant logo" width={30} height={30} priority />
          <span className="text-sm font-bold tracking-tight sm:text-base">Stealth Browser Assistant</span>
        </Link>
        <div className="flex items-center gap-3">
          <StoreLink
            analyticsLabel="landing_header"
            className="hidden h-9 items-center rounded-full bg-[var(--purple)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--purple-bright)] sm:inline-flex"
          >
            {t("header.cta")} <span aria-hidden>→</span>
          </StoreLink>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}

function Flow({ flow }: { flow: LandingPageContent["flow"] }) {
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {[flow.before, flow.action, flow.after].map((label, index) => (
        <div key={label} className="contents">
          <div className={`flex min-h-28 items-center justify-center rounded-2xl border p-6 text-center text-base font-semibold ${index === 1 ? "border-purple-400/30 bg-purple-500/15 text-purple-200" : "border-white/10 bg-white/5 text-white"}`}>
            <span><span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">{index === 0 ? "Before" : index === 1 ? "Action" : "After"}</span>{label}</span>
          </div>
          {index < 2 ? (
            <span
              aria-hidden
              className="self-center text-center text-2xl text-purple-400"
            >
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function LandingPage({ page, t }: { page: LandingPageContent; t: Translations }) {
  const related: LandingSlug[] = page.slug === "clean-porn-history"
    ? ["hide-browser-tabs", "mute-browser-tabs", "chrome-panic-button"]
    : (Object.keys(relatedLabels) as LandingSlug[]).filter((slug) => slug !== page.slug).slice(0, 3);

  return (
    <div lang="en" className="flex min-h-full flex-col bg-white">
      <LandingHeader t={t} />
      <main>
        <section className="relative overflow-hidden bg-[var(--dark)] text-white">
          <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-purple-300">{page.eyebrow}</p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{page.headline}</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">{page.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <StoreLink analyticsLabel={`${page.slug}_hero`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--purple)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--purple-bright)]">
                  {page.cta} <span aria-hidden>→</span>
                </StoreLink>
                <span className="text-sm text-zinc-400">Chrome · Edge · Firefox</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-purple-950/60">
              <Image src={page.image} alt={page.imageAlt} width={1280} height={800} priority className="h-auto w-full rounded-2xl object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </section>

        {page.answer ? <section className="border-b border-[var(--border)] bg-purple-50"><p className="mx-auto max-w-4xl px-6 py-8 text-center text-lg font-medium leading-8 text-purple-950">{page.answer}</p></section> : null}

        {page.supportingIntents?.length ? (
          <section className="border-b border-[var(--border)] bg-white px-6 py-14">
            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
              {page.supportingIntents.map((intent) => (
                <article key={intent.title} className="rounded-3xl border border-purple-100 bg-purple-50/60 p-7 sm:p-9">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[var(--purple)]">{intent.eyebrow}</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{intent.title}</h2>
                  <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{intent.copy}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--purple)]">THE PROBLEM</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{page.problem.title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{page.problem.copy}</p>
          </div>
          <ul className="grid gap-3">
            {page.problem.items.map((item) => <li key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] p-5 font-medium"><span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[var(--purple)]">✓</span>{item}</li>)}
          </ul>
        </section>

        <section className="bg-[var(--dark-2)] px-6 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-purple-300">{page.flowEyebrow ?? "BEFORE → ACTION → AFTER"}</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">{page.flowTitle ?? "See the change in one shortcut."}</h2>
            <div className="mt-10"><Flow flow={page.flow} /></div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--purple)]">HOW IT WORKS</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{page.howTitle}</h2>
          <ol className={`mt-10 grid gap-5 md:grid-cols-2 ${page.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {page.steps.map((step, index) => <li key={step.title} className="rounded-3xl border border-[var(--border)] p-7 shadow-sm"><span className="text-sm font-semibold text-[var(--purple)]">0{index + 1}</span><h3 className="mt-5 text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-7 text-[var(--muted)]">{step.copy}</p></li>)}
          </ol>
        </section>

        <section className="bg-zinc-50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.featuresTitle}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {page.features.map((feature) => <article key={feature.title} className="rounded-3xl border border-[var(--border)] bg-white p-6"><span aria-hidden className="block h-2 w-10 rounded-full bg-[var(--purple)]" /><h3 className="mt-6 text-lg font-semibold">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{feature.copy}</p></article>)}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-white p-6 ring-1 ring-[var(--border)] sm:p-8">
              <div><h3 className="text-lg font-semibold">Use SBA on your preferred browser.</h3><p className="mt-1 text-[var(--muted)]">{page.compatibility}</p></div>
              <div className="flex gap-3" data-no-image-zoom>
                {[
                  { name: "Google Chrome", icon: "/chrome.svg", url: STORE_URLS.chrome, width: 512, height: 512 },
                  { name: "Microsoft Edge", icon: "/edge.svg", url: STORE_URLS.edge, width: 480, height: 480 },
                  { name: "Mozilla Firefox", icon: "/firefox.svg", url: STORE_URLS.firefox, width: 256, height: 265 },
                ].map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get Stealth Browser Assistant for ${browser.name}`}
                    title={`Get SBA for ${browser.name}`}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--purple)] focus:ring-offset-2"
                  >
                    <Image
                      src={browser.icon}
                      alt={`${browser.name} logo`}
                      width={browser.width}
                      height={browser.height}
                      className="h-7 w-auto"
                      style={{ width: "auto" }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {page.faq.map((item) => <details key={item.question} className="group py-5"><summary className="flex list-none items-center justify-between gap-4 font-semibold">{item.question}<span aria-hidden className="text-xl text-[var(--purple)] transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">{item.answer}</p></details>)}
          </div>
        </section>

        <section className="bg-[var(--dark)] px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">{page.ctaCopy}</p>
          <StoreLink analyticsLabel={`${page.slug}_bottom`} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--purple)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--purple-bright)]">{page.cta} <span aria-hidden>→</span></StoreLink>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-xl font-semibold">Related guides</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">{related.map((slug) => <Link key={slug} href={`/${slug}`} className="group rounded-2xl border border-[var(--border)] p-5 font-medium transition hover:border-purple-300 hover:shadow-sm">{relatedLabels[slug]} <span aria-hidden className="float-right text-[var(--purple)] transition group-hover:translate-x-1">→</span></Link>)}</div>
        </section>
      </main>
      <SiteFooter t={t} />
    </div>
  );
}
