"use client";

import { useEffect } from "react";

/**
 * 处理站内 `#anchor` 链接的平滑滚动。
 * 原生锚点链接在 hash 不变时不会重复滚动（点第二次就失效），
 * 这里统一拦截并用 scrollIntoView，保证每次点击都滚动。
 */
export function AnchorScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = (anchor.getAttribute("href") || "").slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
