// src/pages/WishlistPage.tsx
import type { FeaturedItem } from "../components/features/Type";
import { useWishlist } from "../components/Storage/WishlistContext";
import { featuredData, gameCarouselData } from "../components/features/FeaturedData";
import WishItemCard from "../components/features/wishlist/WishItemCard";
import AddToCartButton from "../components/features/cart/AddToCartButton";


export default function WishlistPage() {
  const { ids, remove, clear } = useWishlist();

  // Build a lookup that prefers featuredData on collisions
  const byId = new Map<string, FeaturedItem>();
  for (const g of gameCarouselData) byId.set(g.id, g); // lower priority first
  for (const g of featuredData) byId.set(g.id, g);     // featured overrides

  const rows = ids
    .map((id) => byId.get(id))
    .filter(Boolean) as FeaturedItem[];

  return (
    <section className="p-6 text-white max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold">Wishlist</h1>
        {rows.length > 0 && (
          <button
            onClick={clear}
            className="text-sm px-3 py-1 rounded bg-white/10 hover:bg-white/20"
          >
            Clear all
          </button>
        )}
      </div>

      <ul className="space-y-4">
        {rows.map((game) => (
          <li key={game.id} className="relative">
            <WishItemCard game={game} />
            <button
              onClick={() => remove(game.id)}
              className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              Remove
            </button>
            <AddToCartButton
              id={game.id}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            />
          </li>
        ))}
        {rows.length === 0 && (
          <p className="text-white/70">Your wishlist is empty.</p>
        )}
      </ul>
    </section>
  );
}
