import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./localStorage"; // no .ts extension
import type { FeaturedItem } from "../features/Type";

/** Context API */
type WishlistStore  = {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  count: number;
};

const WISHLIST_STORAGE_KEY  = "wishlist:v1";
const WishlistCtx = createContext<WishlistStore | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  // store only canonical ids
  const [ids, setIds] = useLocalStorage<string[]>(WISHLIST_STORAGE_KEY , []);

  const WishStore  = useMemo<WishlistStore>(() => {
    const add = (id: string) => setIds(prev => (prev.includes(id) ? prev : [...prev, id]));
    const remove = (id: string) => setIds(prev => prev.filter(x => x !== id));
    const clear = () => setIds([]);
    const has = (id: string) => ids.includes(id);
    return { ids, add, remove, clear, has, count: ids.length };
  }, [ids, setIds]);

  return <WishlistCtx.Provider value={WishStore }>{children}</WishlistCtx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx);
  if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
}

/**
 * Helper hook: resolve wishlist ids to FeaturedItem objects
 * using the provided catalog(s). You choose the source of truth.
 */
export function useWishlistItems(catalogs: FeaturedItem[][]) {
  const { ids } = useWishlist();
  // build a map (prefer featuredData over others on collisions)
  const byId = useMemo(() => {
    const map = new Map<string, FeaturedItem>();
    // later pushes win — put lower-priority lists first
    for (const list of catalogs) {
      for (const g of list) map.set(g.id, g);
    }
    return map;
  }, [catalogs]);

  return ids.map(id => byId.get(id)).filter(Boolean) as FeaturedItem[];
}
