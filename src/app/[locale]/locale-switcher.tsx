"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  zh: "中文",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("locale");

  return (
    <div className="relative">
      <label htmlFor="locale-switcher" className="sr-only">
        {t("label")}
      </label>
      <select
        id="locale-switcher"
        value={locale}
        onChange={(e) =>
          router.replace(pathname, {
            locale: e.target.value as (typeof routing.locales)[number],
          })
        }
        className="h-9 cursor-pointer appearance-none rounded-full border border-white/10 bg-[var(--dark-2)] pl-3 pr-8 text-sm font-medium text-white transition-colors hover:bg-[var(--dark-2)]/80 focus:outline-none focus:ring-2 focus:ring-[var(--purple)]/40"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc} className="bg-[var(--dark)] text-white">
            {LOCALE_NAMES[loc] ?? loc}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}