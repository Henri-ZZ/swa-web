"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: {
      Player: new (
        id: string,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: { onStateChange?: (e: { data: number }) => void };
        },
      ) => unknown;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VIDEO_ID = "JHnCipw1akw";

export function DemoSection({
  eyebrow,
  heading,
  copy,
  cta,
}: {
  eyebrow: string;
  heading: string;
  copy: string;
  cta: string;
}) {
  const [playing, setPlaying] = useState(false);
  const playerReady = useRef(false);

  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT?.Player || playerReady.current) return;
      playerReady.current = true;
      new window.YT.Player("demo-youtube-player", {
        videoId: VIDEO_ID,
        playerVars: { rel: 0 },
        events: {
          onStateChange: (e) => {
            // 1 = playing，2 = paused，0 = ended
            setPlaying(e.data === 1);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <section id="demo" className="border-t border-[var(--border)] bg-white">
      <div
        className={`mx-auto grid w-full transition-all duration-700 ease-in-out ${
          playing
            ? "max-w-[96rem] gap-4 px-2 py-8 sm:px-3 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.18fr)]"
            : "max-w-7xl gap-8 px-4 py-16 sm:px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        }`}
      >
        <div
          className={`order-2 flex flex-col transition-all duration-700 ease-in-out ${
            playing ? "justify-center" : "justify-start"
          }`}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--purple)]">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              {copy}
            </p>
          </div>
          <a
            href="https://youtu.be/JHnCipw1akw"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-[var(--text)] px-5 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            {cta}
            <span aria-hidden>↗</span>
          </a>
        </div>
        <div className="demo-video order-1 relative aspect-video overflow-hidden rounded-2xl border border-[var(--border)] bg-black shadow-xl shadow-black/10 transition-all duration-700 ease-in-out">
          <div id="demo-youtube-player" className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
