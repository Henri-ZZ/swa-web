import { YouTubeEmbed } from "@next/third-parties/google";

const VIDEO_ID = "JHnCipw1akw";

export function DemoSection({
  eyebrow,
  heading,
  copy,
  cta,
  playAria,
}: {
  eyebrow: string;
  heading: string;
  copy: string;
  cta: string;
  playAria: string;
}) {
  return (
    <section id="demo" className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-5 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-start">
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
            href={`https://youtu.be/${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-[#ff0000] px-5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(255,0,0,0.18)] transition-colors hover:bg-[#cc0000]"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/>
            </svg>
            {cta}
            <span aria-hidden>↗</span>
          </a>
        </div>
        <div
          className="demo-video order-1 relative aspect-video overflow-hidden rounded-2xl border border-[var(--border)] bg-black shadow-xl shadow-black/10"
          data-no-image-zoom
        >
          <YouTubeEmbed
            videoid={VIDEO_ID}
            playlabel={playAria}
            params="rel=0"
          />
        </div>
      </div>
    </section>
  );
}
