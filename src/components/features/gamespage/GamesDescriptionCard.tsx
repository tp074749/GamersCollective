// DescriptionCard.tsx
import type { FeaturedItem } from "../Type"; // adjust path if needed

export function DescriptionCard({
  item,
  thumbSrc,
}: {
  item: FeaturedItem;
  thumbSrc: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 p-4 bg-white/[0.03] space-y-4">
      {/* Top thumbnail — ratio box + contain */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="w-full h-28 sm:h-48">
          <img
            src={thumbSrc}
            alt={`${item.title} banner`}
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {item.tag && (
        <span className="text-xs bg-white/10 px-2 py-1 rounded inline-block">
          {item.tag}
        </span>
      )}

      <p className="text-white/80 leading-relaxed">{item.blurb}</p>

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
  );
}
