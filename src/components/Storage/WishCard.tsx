// src/components/Storage/WishCard.tsx
import React from "react";

export type WishlistGame = {
  id: string;
  title: string;
  imageUrl: string;      // thumbnail
  genres: string[];      // e.g. ["Roguelite", "Psychological Horror"]
  releaseDate: string;   // ISO like "2025-09-27"
  // optional pricing if you want to show badges
  priceNow?: string;
  priceOld?: string;
  discountPct?: number;  // e.g. 40 for -40%
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

export default function WishCard({ game }: { game: WishlistGame }) {
  const { title, imageUrl, genres, releaseDate, discountPct, priceNow, priceOld } = game;

  return (
    <article
      className="grid grid-cols-[128px_1fr_auto] gap-4 w-full
                 rounded-xl border border-white/10 bg-[#0b0f15]/80
                 hover:bg-[#0b0f15]/95 transition shadow-sm overflow-hidden"
    >
      {/* Thumbnail */}
      <img
        src={imageUrl}
        alt={title}
        className="w-[128px] h-[72px] sm:h-[96px] md:h-[112px] object-cover"
        loading="lazy"
      />

      {/* Main content */}
      <div className="py-3 pr-2 flex flex-col justify-center">
        <h3 className="text-white font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-white/70 truncate">
          {genres.join(", ")}
        </p>
      </div>

      {/* Meta (discount + release date bottom-right) */}
      <div className="py-3 pr-4 flex flex-col justify-between items-end text-right min-w-[120px]">
        {/* top-right: discount/price (optional) */}
        {typeof discountPct === "number" ? (
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-lime-600/80 text-black font-bold text-xs">
              -{discountPct}%
            </span>
            <div className="flex flex-col leading-tight">
              {priceOld && (
                <span className="text-xs text-white/50 line-through">{priceOld}</span>
              )}
              {priceNow && (
                <span className="text-sm text-lime-300 font-semibold">{priceNow}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="h-5" /> // keeps height consistent if no discount
        )}

        {/* bottom-right: release date */}
        <span className="text-xs text-white/60">{formatDate(releaseDate)}</span>
      </div>
    </article>
  );
}
