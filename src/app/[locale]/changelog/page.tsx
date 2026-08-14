import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { marked } from "marked";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "../locale-switcher";
import { SiteFooter } from "../site-footer";
import { ChangelogTimeline, type ChangelogItem } from "../changelog-timeline";
import { getChangelogEntries } from "@/lib/changelog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });
  const tb = await getTranslations({ locale, namespace: "header" });
  return { title: `${t("title")} | ${tb("brandFull")}` };
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const entries = getChangelogEntries();
  const items: ChangelogItem[] = await Promise.all(
    entries.map(async (e) => {
      // 按当前 locale 取多语言内容，缺失时回退到默认语言或第一个可用值
      const pick = (map: Record<string, string>) =>
        map[locale] ?? map["en"] ?? Object.values(map)[0] ?? "";
      const bodyHtml = await marked.parse(pick(e.content));
      const displayDate = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(`${e.date}T00:00:00`));
      return {
        version: e.version,
        type: e.type,
        title: pick(e.title),
        displayDate,
        bodyHtml,
      };
    }),
  );
  const latestVersion = items[0]?.version;

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
        <div className="mx-auto w-full max-w-[1040px] px-6 py-16 sm:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            {t("changelog.title")}
          </h1>
          <p className="mt-3 max-w-2xl leading-6 text-[var(--muted)]">
            {t("changelog.description")}
          </p>
          <ChangelogTimeline
            items={items}
            latestVersion={latestVersion}
            labels={{
              all: t("changelog.filters.all"),
              new: t("changelog.filters.new"),
              improvement: t("changelog.filters.improvement"),
              fix: t("changelog.filters.fix"),
              latest: t("changelog.latest"),
              empty: t("changelog.empty"),
              typeNames: {
                new: t("changelog.types.new"),
                improvement: t("changelog.types.improvement"),
                fix: t("changelog.types.fix"),
              },
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <SiteFooter t={t} />
    </div>
  );
}
