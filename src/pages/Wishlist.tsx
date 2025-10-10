// src/pages/Wishlist.tsx
import React from "react";
import WishCard, { type WishlistGame } from "../components/Storage/WishCard";
import { useWishlist } from "../components/Storage/WishListLS";

// Use your FeaturedData arrays as the catalog
import {
  gameCarouselData,
  featuredData, // optional; if you don't want this, remove and adjust CATALOG below
} from "../components/features/FeaturedData";

const PLACEHOLDER_IMG = "/assets/wishlist/placeholder.jpg";

// Build a fast id → game map from your data arrays
const CATALOG = [...(featuredData ?? []), ...(gameCarouselData ?? [])];
const GAME_INDEX: Record<string, (typeof CATALOG)[number]> =
  Object.fromEntries(CATALOG.map((g) => [g.id, g]));

export default function Wishlist() {
  const { items, remove, clear } = useWishlist();

  // Convert the minimal LS item into the card model expected by <WishCard>
  const toCardModel = (w: { id: string; title: string; imageUrl?: string }): WishlistGame => {
    const meta = GAME_INDEX[w.id];

    // Try to derive genres from either array `genres` or single `genre`
    const metaGenres =
      (meta as any)?.genres ??
      ((meta as any)?.genre ? [(meta as any).genre as string] : []);

    // Some of your items have `price`; map it to priceNow for the card
    const priceNow = (meta as any)?.price as string | undefined;

    // FeaturedData has `releaseDate` on some items; carousel items may not
    const releaseDate = (meta as any)?.releaseDate ?? "1970-01-01";

    return {
      id: w.id,
      title: w.title ?? meta?.title ?? "Unknown title",
      imageUrl: w.imageUrl ?? meta?.imageUrl ?? PLACEHOLDER_IMG,
      genres: Array.isArray(metaGenres) ? metaGenres : [],
      releaseDate,
      priceNow,
      // Optionally map discount/old price if you add those fields later:
      // priceOld: (meta as any)?.priceOld,
      // discountPct: (meta as any)?.discountPct,
    };
  };

  const games: WishlistGame[] = items.map(toCardModel);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-white">Wishlist</h1>
        {items.length > 0 && (
          <button
            className="text-sm px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white/80"
            onClick={clear}
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-white/70">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {games.map((g) => (
            <div key={g.id} className="relative">
              <WishCard game={g} />
              <button
                onClick={() => remove(g.id)}
                className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white/80"
                aria-label={`Remove ${g.title} from wishlist`}
                title={`Remove ${g.title}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
