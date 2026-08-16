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
        className={`mx-auto grid max-w-6xl gap-10 px-6 py-24 transition-[grid-template-columns] duration-700 ease-in-out lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${
          playing ? "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]" : ""
        }`}
      >
        <div
          className={`transition-all duration-700 ease-in-out ${
            playing ? "lg:opacity-50" : "lg:opacity-100"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--purple)]">
            {eyebrow}
          </span>
          <h2
            className={`mt-4 font-semibold tracking-tight text-[var(--text)] transition-all duration-700 ease-in-out ${
              playing
                ? "text-2xl sm:text-3xl"
                : "text-3xl sm:text-4xl"
            }`}
          >
            {heading}
          </h2>
          <p
            className={`mt-4 text-[var(--muted)] transition-all duration-700 ease-in-out ${
              playing ? "text-sm leading-6" : "text-base leading-7"
            }`}
          >
            {copy}
          </p>
          <a
            href="https://youtu.be/JHnCipw1akw"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--text)] px-5 text-sm font-medium text-white transition-all duration-700 ease-in-out hover:bg-black ${
              playing ? "lg:pointer-events-none lg:opacity-0" : "lg:opacity-100"
            }`}
          >
            {cta}
            <span aria-hidden>↗</span>
          </a>
        </div>
        <div className="demo-video relative aspect-video overflow-hidden rounded-2xl border border-[var(--border)] bg-black shadow-xl shadow-black/10 transition-all duration-700 ease-in-out">
          <div id="demo-youtube-player" className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
