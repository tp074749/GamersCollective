// src/pages/WishlistPage.tsx
import { useWishlist } from "../components/Storage/WishlistContext";
import { featuredData } from "../components/features/FeaturedData";
import WishCard from "../components/Storage/WishCard";

export default function WishlistPage() {
  const { items: wish, remove, clear } = useWishlist();

  // join: for each saved id, find the canonical catalog item
  const rows = wish
    .map(w => featuredData.find(g => g.id === w.id))
    .filter(Boolean); // drop any ids that no longer exist

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
        {rows.map(game => (
          <li key={game!.id} className="relative">
            <WishCard game={game!} />
            <button
              onClick={() => remove(game!.id)}
              className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              Remove
            </button>
          </li>
        ))}
        {rows.length === 0 && (
          <p className="text-white/70">Your wishlist is empty.</p>
        )}
      </ul>
    </section>
  );
}
