import type { getTranslations } from "next-intl/server";

type Translations = Awaited<ReturnType<typeof getTranslations>>;

const KEYWORD_KEYS = ["shopping", "private", "work"] as const;
const TAB_KEYS = ["a", "b", "c"] as const;
const ACTION_KEYS = ["mute", "hide", "emergency"] as const;

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 5v14" />
      <path d="M6 13l6 6 6-6" />
    </svg>
  );
}

export function KeywordMatching({ t }: { t: Translations }) {
  return (
    <section
      id="keyword-matching"
      className="border-t border-[var(--border)] bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--purple)]">
            {t("keywordMatching.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            {t("keywordMatching.heading")}
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {t("keywordMatching.copy")}
          </p>
        </div>

        {/* Flow: Keywords → Matching tabs → Actions */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {/* Keywords */}
          <div className="km-fade-up rounded-2xl border border-[var(--border)] bg-zinc-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {t("keywordMatching.steps.keywords.title")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {KEYWORD_KEYS.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-[var(--purple)]/30 bg-[var(--purple)]/10 px-3 py-1 text-sm font-medium text-[var(--purple)]"
                >
                  {t(`keywordMatching.steps.keywords.chips.${k}`)}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow (desktop) */}
          <div className="hidden items-center justify-center text-[var(--muted)] lg:flex">
            <ArrowRight />
          </div>
          {/* Arrow (mobile) */}
          <div className="flex justify-center text-[var(--muted)] lg:hidden">
            <ArrowDown />
          </div>

          {/* Matching tabs */}
          <div className="km-fade-up km-delay-1 rounded-2xl border border-[var(--border)] bg-zinc-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {t("keywordMatching.steps.tabs.title")}
            </p>
            <div className="mt-4 space-y-2">
              {TAB_KEYS.map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50/60 px-3 py-2 text-sm font-medium text-[var(--text)]"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <span className="truncate">
                    {t(`keywordMatching.steps.tabs.items.${k}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow (desktop) */}
          <div className="hidden items-center justify-center text-[var(--muted)] lg:flex">
            <ArrowRight />
          </div>
          {/* Arrow (mobile) */}
          <div className="flex justify-center text-[var(--muted)] lg:hidden">
            <ArrowDown />
          </div>

          {/* Actions */}
          <div className="km-fade-up km-delay-2 rounded-2xl border border-[var(--border)] bg-zinc-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {t("keywordMatching.steps.actions.title")}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {ACTION_KEYS.map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--text)]"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--purple)]" />
                  {t(`hero.mockup.actions.${k}.name`)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-12 text-center">
          <p className="text-base font-semibold text-[var(--text)]">
            {t("keywordMatching.tagline")}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {t("keywordMatching.note")}
          </p>
        </div>

        {/* Story line: You define → SBA detects → You control */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          <span>{t("keywordMatching.story.define")}</span>
          <span aria-hidden className="text-[var(--purple)]">
            →
          </span>
          <span>{t("keywordMatching.story.detect")}</span>
          <span aria-hidden className="text-[var(--purple)]">
            →
          </span>
          <span>{t("keywordMatching.story.control")}</span>
        </div>
      </div>
    </section>
  );
}
