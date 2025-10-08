//src/components/Storage/WishListLS.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./localStorage.ts";

export type WishlistItem = {
  id: string;
  title: string;
  imageUrl?: string;
  href?: string;
};

type WishlistState = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
};

const WishlistCtx = createContext<WishlistState | null>(null);
const STORAGE_KEY = "wishlist:v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<WishlistItem[]>(STORAGE_KEY, []);

  const api = useMemo<WishlistState>(() => {
    const add = (item: WishlistItem) =>
      setItems((prev) => (prev.some((x) => x.id === item.id) ? prev : [...prev, item]));
    const remove = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));
    const clear = () => setItems([]);
    const has = (id: string) => items.some((x) => x.id === id);
    return { items, add, remove, clear, has };
  }, [items, setItems]);

  return <WishlistCtx.Provider value={api}>{children}</WishlistCtx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx);
  if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
}
