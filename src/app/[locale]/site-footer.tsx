import type { ComponentProps } from "react";
import Image from "next/image";
import type { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FooterAnchorLink } from "./footer-anchor-link";

type Translations = Awaited<ReturnType<typeof getTranslations>>;
type LinkHref = ComponentProps<typeof Link>["href"];

type FooterLink = { label: string; href?: LinkHref; hash?: string };

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
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
          ) : (
            <li key={l.label}>
              <Link
                href={l.href!}
                className="text-zinc-300 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export function SiteFooter({ t }: { t: Translations }) {
  return (
    <footer className="bg-[var(--dark)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
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
            </div>
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
              { label: t("footer.columns.product.links.features"), hash: "features" },
              { label: t("footer.columns.product.links.howItWorks"), hash: "how-it-works" },
              { label: t("footer.columns.product.links.changelog"), hash: "changelog" },
            ]}
          />
          <FooterCol
            title={t("footer.columns.support.title")}
            links={[
              { label: t("footer.columns.support.links.faq"), hash: "faq" },
              { label: t("footer.columns.support.links.contact"), href: "#" },
              { label: t("footer.columns.support.links.privacy"), href: "/privacy" },
              { label: t("footer.columns.support.links.terms"), href: "/terms" },
              { label: t("footer.columns.support.links.refund"), href: "/refund" },
            ]}
          />
          <FooterCol
            title={t("footer.columns.resources.title")}
            links={[
              { label: t("footer.columns.resources.links.chrome"), href: "#" },
              { label: t("footer.columns.resources.links.youtube"), hash: "demo" },
              { label: t("footer.columns.resources.links.docs"), href: "#" },
            ]}
          />
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-zinc-500">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
