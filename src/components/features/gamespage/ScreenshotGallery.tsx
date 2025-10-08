import { useState } from "react";
import { NavBtn } from "./LRNavBtn";
import { Lightbox } from "./Lightbox";

export function ScreenshotGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  if (!images.length) return null;

  return (
    <div className="space-y-3">
      {/* Big image area (responsive height, no crop) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <img
            src={images[active]}
            alt={`${title} screenshot ${active + 1}`}
            className="h-full w-full object-cover cursor-zoom-in"
            onClick={() => setZoomOpen(true)}
        />
        <NavBtn onClick={prev} label="Previous screenshot" side="left" />
        <NavBtn onClick={next} label="Next screenshot" side="right" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/50 rounded px-2 py-1">
            {active + 1} / {images.length}
        </div>
        </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={[
              "relative shrink-0 overflow-hidden rounded border snap-start",
              "aspect-[16/9] w-28",
              i === active
                ? "border-white"
                : "border-white/10 hover:border-white/40 focus-visible:border-white/60",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
            ].join(" ")}
            onClick={() => setActive(i)}
            aria-label={`Show screenshot ${i + 1}`}
            aria-pressed={i === active}
          >
            <img
              src={src}
              alt={`${title} thumbnail ${i + 1}`}
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            {i === active && (
              <span className="absolute inset-0 ring-2 ring-white/70 pointer-events-none rounded" />
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={zoomOpen}
        src={images[active] ?? null}
        onClose={() => setZoomOpen(false)}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
