"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type OpenImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function canZoom(image: HTMLImageElement) {
  if (image.closest("[data-no-image-zoom]")) return false;
  const declaredWidth = Number(image.getAttribute("width")) || 0;
  const declaredHeight = Number(image.getAttribute("height")) || 0;
  const width = Math.max(image.naturalWidth, declaredWidth);
  const height = Math.max(image.naturalHeight, declaredHeight);
  return width >= 480 && height >= 280;
}

function originalImageSource(image: HTMLImageElement) {
  const explicit = image.dataset.zoomSrc;
  if (explicit) return explicit;

  const source = image.currentSrc || image.src;
  try {
    const url = new URL(source, window.location.origin);
    if (url.pathname === "/_next/image") {
      return url.searchParams.get("url") ?? source;
    }
  } catch {
    return source;
  }
  return source;
}

export function ImageLightbox() {
  const [openImage, setOpenImage] = useState<OpenImage | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prepareImage = (image: HTMLImageElement) => {
      const markReady = () => {
        if (!canZoom(image) || image.dataset.imageZoomReady) return;
        image.dataset.imageZoomReady = "true";
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute(
          "aria-label",
          `${image.alt || "Image"} — view full size`,
        );
      };

      if (image.complete) markReady();
      else image.addEventListener("load", markReady, { once: true });
    };

    const prepareAll = () =>
      document.querySelectorAll("img").forEach((image) => prepareImage(image));

    const open = (image: HTMLImageElement) => {
      if (!canZoom(image)) return;
      previousFocusRef.current = image;
      setOpenImage({
        src: originalImageSource(image),
        alt: image.alt,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    const onClick = (event: MouseEvent) => {
      const image = (event.target as Element | null)?.closest("img");
      if (image instanceof HTMLImageElement) open(image);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenImage(null);
        return;
      }
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target instanceof HTMLImageElement && canZoom(event.target)) {
        event.preventDefault();
        open(event.target);
      }
    };

    prepareAll();
    const observer = new MutationObserver(prepareAll);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!openImage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [openImage]);

  if (!openImage) return null;

  const aspectRatio = openImage.width / openImage.height;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Full-size image viewer"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpenImage(null);
      }}
    >
      <div
        className="relative max-h-[88vh] max-w-[94vw] overflow-hidden rounded-xl bg-white shadow-2xl"
        style={{
          width: `min(94vw, calc(88vh * ${aspectRatio}), 1600px)`,
          aspectRatio: `${openImage.width} / ${openImage.height}`,
        }}
        data-no-image-zoom
      >
        <Image
          src={openImage.src}
          alt={openImage.alt}
          fill
          sizes="(max-width: 1700px) 94vw, 1600px"
          unoptimized
          className="object-contain"
          data-no-image-zoom
        />
      </div>
      <button
        ref={closeButtonRef}
        type="button"
        onClick={() => setOpenImage(null)}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white sm:right-7 sm:top-7"
        aria-label="Close full-size image"
      >
        <span aria-hidden>×</span>
      </button>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/70 sm:bottom-5">
        Press Esc to close
      </p>
    </div>
  );
}
