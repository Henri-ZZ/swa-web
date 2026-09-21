"use client";

import { useSearchParams } from "next/navigation";

/**
 * Post-install confirmation banner for `/getting-started?installed=1`.
 * Reading the query string on the client keeps the tutorial page fully
 * prerendered (reading `searchParams` in the page made the whole route render
 * on every request), so this is rendered inside a `<Suspense>` boundary.
 */
export function InstalledBanner({
  eyebrow,
  title,
  copy,
  cta,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
}) {
  const searchParams = useSearchParams();
  const installed = searchParams.get("installed");
  if (installed !== "1" && installed !== "true") return null;

  return (
    <section className="border-b border-purple-400/20 bg-purple-600 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-200">
            {eyebrow}
          </p>
          <p className="mt-2 text-2xl font-semibold">{title}</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-purple-100">
            {copy}
          </p>
        </div>
        <a
          href="#quick-start"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          {cta} <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}
