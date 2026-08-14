"use client";

import { Link, usePathname } from "@/i18n/navigation";

/**
 * 页脚锚点链接：首页时与顶部导航一致用纯 hash 跳转（#faq 等），
 * 其他页面（法务页）跳回首页对应锚点。
 */
export function FooterAnchorLink({
  label,
  hash,
  className,
}: {
  label: string;
  hash: string;
  className?: string;
}) {
  const pathname = usePathname();
  const href = pathname === "/" ? `#${hash}` : { pathname: "/", hash };
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
