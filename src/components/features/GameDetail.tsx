import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { featuredData } from "./FeaturedData";

// Tailwind helper for icon buttons
const NavBtn = ({
  onClick,
  label,
  side,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  side: "left" | "right";
}) => (
  <button
    aria-label={label}
    onClick={onClick}
    className={[
      "absolute top-1/2 -translate-y-1/2 z-10",
      side === "left" ? "left-2" : "right-2",
      "rounded-full bg-black/50 backdrop-blur px-3 py-2 text-white",
      "hover:bg-black/70 focus:outline-none focus:ring focus:ring-white/30",
    ].join(" ")}
  >
    {side === "left" ? "◀" : "▶"}
  </button>
);

// Lightbox modal
const Lightbox = ({
  open,
  src,
  onClose,
  onPrev,
  onNext,
}: {
  open: boolean;
  src: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <img
        src={src}
        alt=""
        className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute top-3 right-3">
        <button
          onClick={onClose}
          className="rounded bg-white/10 px-3 py-1 text-white hover:bg-white/20"
        >
          Close ✕
        </button>
      </div>
      <NavBtn onClick={(e) => { e.stopPropagation(); onPrev(); }} label="Previous" side="left" />
      <NavBtn onClick={(e) => { e.stopPropagation(); onNext(); }} label="Next" side="right" />
    </div>
  );
};

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const item = featuredData.find((g) => g.id === id);

  // ---- Auto-import all screenshots under src/assets/** and filter by /<id>/ ----
  // NOTE: pattern must be static; we filter by folder name at runtime.
  const allImages = import.meta.glob<
    string
  >("/src/assets/**/*.{png,jpg,jpeg,webp,avif}", {
    eager: true,
    as: "url",
  });

  const images = useMemo(() => {
    if (!id) return [];
    // keep only files that live in /<id>/
    const entries = Object.entries(allImages).filter(([path]) =>
      path.includes(`/${id}/`)
    );
    // stable order: by filename ascending (01, 02, …)
    entries.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));
    return entries.map(([, url]) => url);
  }, [id]);

  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    setActive(0); // when id changes, reset to first image
  }, [id]);

  if (!item) return <div className="p-6 text-white">Game not found.</div>;
  if (images.length === 0)
    return (
      <section className="max-w-6xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-extrabold mb-3">{item.title}</h1>
        <p>No screenshots found in <code>src/assets/{id}</code>.</p>
      </section>
    );

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);
  
  return (
  <section className="max-w-6xl mx-auto p-6 text-white">
    {/* TITLE OUTSIDE & ABOVE */}
    <h1 className="text-4xl font-extrabold mb-4">{item.title}</h1>

    {/* MAIN CONTAINER */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* LEFT: Images */}
      <div className="space-y-3">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <img
            src={images[active]}
            alt={`${item.title} screenshot ${active + 1}`}
            className="h-full w-full object-cover cursor-zoom-in"
            onClick={() => setZoomOpen(true)}
          />
          <NavBtn onClick={prev} label="Previous screenshot" side="left" />
          <NavBtn onClick={next} label="Next screenshot" side="right" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/50 rounded px-2 py-1">
            {active + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails row */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              className={[
                "relative shrink-0 h-16 w-28 overflow-hidden rounded border",
                i === active
                  ? "border-white"
                  : "border-white/10 hover:border-white/40",
              ].join(" ")}
              onClick={() => setActive(i)}
              aria-label={`Go to screenshot ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              {i === active && (
                <span className="absolute inset-0 ring ring-white/70 pointer-events-none rounded" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: DESCRIPTION BOX (now holds blurb + small thumb) */}
      <div className="rounded-xl border border-white/10 p-4 bg-white/[0.03] space-y-4">
          {/* Top thumbnail */}
          <img
            src={item.thumbUrl ?? images[0]}
            alt=""
            className="w-full h-32 sm:h-40 object-cover rounded border border-white/10"
          />

  {/* Optional tag */}
  {item.tag && (
    <span className="text-xs bg-white/10 px-2 py-1 rounded inline-block">
      {item.tag}
    </span>
  )}

  {/* Description */}
  <p className="text-white/80 leading-relaxed">{item.blurb}</p>

  {/* Meta rows */}
  <dl className="text-sm text-white/80 space-y-2">
    {item.developer && (
      <div className="flex gap-3">
        <dt className="shrink-0 text-white/60 w-28">Developer</dt>
        <dd className="grow">{item.developer}</dd>
      </div>
    )}

    <div className="flex gap-3">
      <dt className="shrink-0 text-white/60 w-28">Release date</dt>
      <dd className="grow">
        {item.releaseDate
          ? new Date(item.releaseDate).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Not available"}
      </dd>
    </div>

    {item.genre && (
      <div className="flex gap-3">
        <dt className="shrink-0 text-white/60 w-28">Genre</dt>
        <dd className="grow">
          <span className="inline-block rounded bg-white/10 px-2 py-0.5">
            {item.genre}
          </span>
        </dd>
      </div>
    )}
  </dl>
</div>
    </div>

    {/* PLAY BUTTON OUTSIDE & BELOW */}
    <div className="pt-5">
      <a
        href={item.ctaHref}
        className="inline-block rounded-lg bg-white/90 text-gray-900 px-5 py-2.5 font-semibold hover:bg-white"
      >
        {item.ctaLabel}
      </a>
    </div>

    {/* Lightbox */}
    <Lightbox
      open={zoomOpen}
      src={images[active] ?? null}
      onClose={() => setZoomOpen(false)}
      onPrev={prev}
      onNext={next}
    />
  </section>
);
}
