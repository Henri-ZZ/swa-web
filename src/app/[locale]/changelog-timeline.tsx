"use client";

import { useState } from "react";
import type { ChangelogType } from "@/lib/changelog";

export type ChangelogItem = {
  version: string;
  type: ChangelogType;
  title: string;
  displayDate: string;
  bodyHtml: string;
};

type ChangelogLabels = {
  all: string;
  new: string;
  improvement: string;
  fix: string;
  latest: string;
  empty: string;
  typeNames: Record<ChangelogType, string>;
};

const FILTERS: readonly ("all" | ChangelogType)[] = [
  "all",
  "new",
  "improvement",
  "fix",
];

const TYPE_STYLES: Record<ChangelogType, string> = {
  new: "bg-green-50 text-green-700",
  improvement: "bg-purple-50 text-purple-700",
  fix: "bg-blue-50 text-blue-700",
};

function TypeBadge({ type, name }: { type: ChangelogType; name: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TYPE_STYLES[type]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {name}
    </span>
  );
}

export function ChangelogTimeline({
  items,
  latestVersion,
  labels,
}: {
  items: ChangelogItem[];
  latestVersion?: string;
  labels: ChangelogLabels;
}) {
  const [filter, setFilter] = useState<"all" | ChangelogType>("all");
  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <div className="mt-10">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                active
                  ? "bg-[var(--purple)] text-white"
                  : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--purple)] hover:text-[var(--purple)]"
              }`}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="mt-12 space-y-10">
        {filtered.map((item) => (
          <div
            key={item.version}
            className="relative md:grid md:grid-cols-[170px_28px_1fr]"
          >
            {/* Meta */}
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:mb-0 md:block md:pr-6 md:text-right">
              <span className="text-sm font-semibold text-[var(--text)] md:block">
                v{item.version}
              </span>
              <span className="text-xs text-[var(--muted)] md:mt-1.5 md:block">
                {item.displayDate}
              </span>
              {item.version === latestVersion && (
                <span className="inline-block rounded-full bg-[var(--purple)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--purple)]">
                  {labels.latest}
                </span>
              )}
            </div>

            {/* Timeline node (desktop) */}
            <div className="relative hidden md:flex md:justify-center">
              <span className="absolute inset-y-0 w-px bg-[var(--border)]" aria-hidden />
              <span className="relative mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--purple)] bg-white" />
            </div>

            {/* Update card */}
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-7">
              <TypeBadge type={item.type} name={labels.typeNames[item.type]} />
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text)]">
                {item.title}
              </h2>
              <div
                className="changelog-body mt-4 text-sm leading-6 text-[var(--muted)]"
                dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
              />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[var(--muted)]">
            {labels.empty}
          </p>
        )}
      </div>
    </div>
  );
}
