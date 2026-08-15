"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

type PaddleEnvironment = "sandbox" | "production";

export function PaddleBuyButton({
  label,
  environment,
  token,
  priceId,
}: {
  label: string;
  environment: PaddleEnvironment;
  token: string;
  priceId: string;
}) {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  useEffect(() => {
    // token/priceId 缺失时跳过初始化，避免线上报 "You must specify your Paddle Seller ID or token"。
    if (!token || !priceId) return;

    let cancelled = false;
    initializePaddle({
      environment,
      token,
      // 激活码发放由 Paddle webhook 转发到激活码管理平台（licentra.henri.ren）处理，
      // 前端无需监听交易事件。
    }).then((instance) => {
      if (!cancelled && instance) {
        setPaddle(instance);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [environment, token, priceId]);

  const ready = Boolean(paddle) && Boolean(token) && Boolean(priceId);

  const openCheckout = () => {
    if (!paddle) return;
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
    });
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={!ready}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--purple)] text-sm font-semibold text-white transition-colors hover:bg-[var(--purple-bright)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {label}
      <span aria-hidden>→</span>
    </button>
  );
}
