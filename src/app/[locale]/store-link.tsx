"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useSyncExternalStore, type ReactNode } from "react";
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

const subscribe = () => () => {};

export function StoreLink({
  children,
  className,
  analyticsLabel,
}: {
  children: ReactNode;
  className?: string;
  analyticsLabel?: string;
}) {
  const store = useSyncExternalStore<StoreKey>(
    subscribe,
    detectStore,
    () => "chrome",
  );

  return (
    <a
      href={STORE_URLS[store]}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        if (analyticsLabel && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
          sendGAEvent("event", "install_cta_click", {
            placement: analyticsLabel,
            store,
          });
        }
      }}
    >
      {children}
    </a>
  );
}
