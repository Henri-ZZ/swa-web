import type { ComponentProps } from "react";
import Image from "next/image";
import type { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FooterAnchorLink } from "./footer-anchor-link";
import { FooterBadges } from "./footer-badges";
import { STORE_URLS } from "./store-urls";

type Translations = Awaited<ReturnType<typeof getTranslations>>;
type LinkHref = ComponentProps<typeof Link>["href"];

type FooterLink = {
  label: string;
  href?: LinkHref;
  hash?: string;
  external?: boolean;
  icon?: string;
};

const GUIDE_LINKS = [
  { href: "/hide-browser-tabs", label: "Hide browser tabs" },
  { href: "/hide-chrome-tabs", label: "Hide Chrome tabs" },
  { href: "/hide-tabs-from-boss", label: "Hide tabs at work" },
  { href: "/chrome-panic-button", label: "Chrome panic button" },
  { href: "/mute-browser-tabs", label: "Mute browser tabs" },
  { href: "/emergency-tab-close", label: "Emergency tab close" },
  { href: "/clean-porn-history", label: "Clean private browsing history" },
] as const;

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) =>
          l.hash ? (
            <li key={l.label}>
              <FooterAnchorLink
                label={l.label}
                hash={l.hash}
                className="text-zinc-300 transition-colors hover:text-white"
              />
            </li>
          ) : l.external ? (
            <li key={l.label}>
              <a
                href={l.href as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
              >
                {l.icon && (
                  <Image
                    src={l.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-auto"
                    style={{ width: "auto" }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.label}>
              <Link
                href={l.href!}
                className="text-zinc-300 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export function SiteFooter({ t }: { t: Translations }) {
  // Keep the footer render-safe while a dev server still holds an older
  // translation bundle during hot reload. A full refresh will use the locale
  // specific label from messages/*.json.
  const guidesTitle = t.has("footer.guides.title")
    ? t("footer.guides.title")
    : "Browser guides";

  return (
    <footer className="bg-[var(--dark)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <Image
                src="/icon.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold tracking-tight">
                  {t("header.brandFull")}
                </span>
              </span>
            </Link>
            <p className="mt-3 text-sm font-medium text-white">
              {t("footer.tagline")}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {t("footer.subTagline")}
            </p>
          </div>
          <FooterCol
            title={t("footer.columns.product.title")}
            links={[
              {
                label: t("footer.columns.product.links.features"),
                hash: "hero",
              },
              {
                label: t("footer.columns.product.links.howItWorks"),
                hash: "keyword-matching",
              },
              {
                label: t("footer.columns.product.links.changelog"),
                href: "/changelog",
              },
            ]}
          />
          <FooterCol
            title={t("footer.columns.support.title")}
            links={[
              { label: t("footer.columns.support.links.faq"), hash: "faq" },
              {
                label: t("footer.columns.support.links.contact"),
                href: "/contact",
              },
              {
                label: t("footer.columns.support.links.terms"),
                href: "/terms",
              },
              {
                label: t("footer.columns.support.links.privacy"),
                href: "/privacy",
              },
              {
                label: t("footer.columns.support.links.refund"),
                href: "/refund",
              },
            ]}
          />
          <FooterCol
            title={t("footer.columns.resources.title")}
            links={[
              { label: t("footer.columns.resources.links.chrome"), href: "#" },
              {
                label: t("footer.columns.resources.links.youtube"),
                hash: "demo",
              },
              { label: t("footer.columns.resources.links.docs"), href: "#" },
            ]}
          />
          <FooterCol
            title={t("footer.columns.download.title")}
            links={[
              {
                label: "Chrome",
                href: STORE_URLS.chrome,
                external: true,
                icon: "/chrome.svg",
              },
              {
                label: "Firefox",
                href: STORE_URLS.firefox,
                external: true,
                icon: "/firefox.svg",
              },
              {
                label: "Edge",
                href: STORE_URLS.edge,
                external: true,
                icon: "/edge.svg",
              },
            ]}
          />
        </div>
        <nav
          aria-label={guidesTitle}
          className="mt-10 border-t border-white/10 pt-5"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {guidesTitle}
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[13px] text-zinc-500">
            {GUIDE_LINKS.map((guide, index) => (
              <li key={guide.href} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden>·</span> : null}
                <a
                  href={guide.href}
                  target="_blank"
                  rel="noopener"
                  className="transition-colors hover:text-zinc-200"
                >
                  {guide.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 border-t border-white/10 pt-6">
          {/* Optional listing badges: remove this line and footer-badges.tsx to retire them. */}
          <FooterBadges />
          <p className="mt-4 text-xs text-zinc-500">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
