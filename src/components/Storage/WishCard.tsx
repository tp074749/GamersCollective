// src/components/Storage/WishCard.tsx
import type { FeaturedItem } from "../features/Type"; // adjust path

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function WishCard({ game }: { game: FeaturedItem }) {
  // Use catalog fields (prefer thumbUrl if you have it)
  const img = game.thumbUrl ?? game.imageUrl;

  return (
    <article
      className="grid grid-cols-[128px_1fr_auto] gap-4 w-full
                 rounded-xl border border-white/10 bg-[#0b0f15]/80
                 hover:bg-[#0b0f15]/95 transition shadow-sm overflow-hidden"
    >
      {/* Thumbnail */}
      {img ? (
        <img
          src={img}
          alt={game.title}
          className="w-[128px] h-[72px] sm:h-[96px] md:h-[112px] object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-[128px] h-[72px] sm:h-[96px] md:h-[112px] bg-white/5" />
      )}

      {/* Main content */}
      <div className="py-3 pr-2 flex flex-col justify-center">
        <h3 className="text-white font-semibold leading-tight">{game.title}</h3>
        <p className="text-sm text-white/70 truncate">
          {game.genre ?? "—"}
        </p>
      </div>

      {/* Meta */}
      <div className="py-3 pr-4 flex flex-col justify-between items-end text-right min-w-[120px]">
        {/* (Optional) price block if your FeaturedItem has price fields */}
        <div className="h-5" />
        <span className="text-xs text-white/60">
          {formatDate(game.releaseDate)}
        </span>
      </div>
    </article>
  );
}
