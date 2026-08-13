"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

const PADDLE_ENV = (process.env.NEXT_PUBLIC_PADDLE_ENV ??
  "sandbox") as "sandbox" | "production";
const CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
const PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID ?? "";

export function PaddleBuyButton({ label }: { label: string }) {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    let cancelled = false;
    initializePaddle({
      environment: PADDLE_ENV,
      token: CLIENT_TOKEN,
      eventCallback: (event) => {
        if (event.name === "checkout.completed") {
          setPurchased(true);
          // TODO: 后续在此接入 license 发放（通过服务器端 webhook 或 transaction id）。
        }
      },
    }).then((instance) => {
      if (!cancelled && instance) {
        setPaddle(instance);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const ready = Boolean(paddle) && Boolean(CLIENT_TOKEN) && Boolean(PRICE_ID);

  const openCheckout = () => {
    if (!paddle) return;
    paddle.Checkout.open({
      items: [{ priceId: PRICE_ID, quantity: 1 }],
    });
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={!ready}
      className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--purple)] text-sm font-semibold text-white transition-colors hover:bg-[var(--purple-bright)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {label}
      <span aria-hidden>→</span>
    </button>
  );
}
