"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  // 服务端渲染时无法识别浏览器，首帧与服务端保持一致（chrome），
  // 挂载后再按真实浏览器更新链接，避免 hydration 不一致导致 Edge/Firefox 显示 Chrome 链接。
  const [store, setStore] = useState<StoreKey>("chrome");

  useEffect(() => {
    setStore(detectStore());
  }, []);

  return (
    <a
      href={STORE_URLS[store]}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
