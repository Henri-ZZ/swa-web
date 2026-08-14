"use client";

import { useMemo, type ReactNode } from "react";
import { STORE_URLS } from "./store-urls";

type StoreKey = keyof typeof STORE_URLS;

function detectStore(): StoreKey {
  if (typeof navigator === "undefined") return "chrome";
  const ua = navigator.userAgent;
  // 注意顺序：Edge 的 UA 也包含 "Chrome"，必须先检测
  if (ua.includes("Edg/")) return "edge";
  if (ua.includes("Firefox/")) return "firefox";
  return "chrome";
}

export function StoreLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const href = useMemo(() => STORE_URLS[detectStore()], []);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
