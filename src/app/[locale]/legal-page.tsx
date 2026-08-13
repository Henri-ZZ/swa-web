import Image from "next/image";
import type { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { SiteFooter } from "./site-footer";

type Translations = Awaited<ReturnType<typeof getTranslations>>;

export type LegalSection = {
  heading: string;
  body: string;
};

export function LegalPage({
  brand,
  cta,
  title,
  lastUpdated,
  sections,
  t,
}: {
  brand: string;
  cta: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  t: Translations;
}) {
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
              {brand}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={{ pathname: "/", hash: "pricing" }}
              className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-[var(--purple)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--purple-bright)]"
            >
              {cta}
              <span aria-hidden>→</span>
            </Link>
            <LocaleSwitcher />
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">{lastUpdated}</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-lg font-semibold text-[var(--text)]">
                  {s.heading}
                </h2>
                <p className="mt-2 leading-7 text-[var(--muted)]">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter t={t} />
    </div>
  );
}
