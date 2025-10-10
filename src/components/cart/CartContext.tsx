// src/cart/CartContext.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../Storage/localStorage";
import type { FeaturedItem } from "../features/Type";

type CartAPI = {
  ids: string[];                 // one id per game
  add: (id: string) => void;     // no duplicates
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  count: number;
};

const KEY = "cart:v1";
const Ctx = createContext<CartAPI | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useLocalStorage<string[]>(KEY, []);

  const api = useMemo<CartAPI>(() => {
    const add    = (id: string) => setIds(prev => (prev.includes(id) ? prev : [...prev, id]));
    const remove = (id: string) => setIds(prev => prev.filter(x => x !== id));
    const clear  = () => setIds([]);
    const has    = (id: string) => ids.includes(id);
    return { ids, add, remove, clear, has, count: ids.length };
  }, [ids, setIds]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

/* ---------- Helpers to resolve ids → FeaturedItem ---------- */

/**
 * Build a lookup map from one or more catalogs.
 * Later catalogs in the array take precedence on id collisions.
 */
function buildCatalogMap(catalogs: FeaturedItem[][]) {
  const map = new Map<string, FeaturedItem>();
  for (const list of catalogs) {
    for (const g of list) map.set(g.id, g);
  }
  return map;
}

/** Resolve the current cart ids to full FeaturedItem objects. */
export function useCartItems(catalogs: FeaturedItem[][]) {
  const { ids } = useCart();
  const byId = useMemo(() => buildCatalogMap(catalogs), [catalogs]);
  return ids.map(id => byId.get(id)).filter(Boolean) as FeaturedItem[];
}

/** Utility to parse price strings like "MYR 249.00" or "Free". */
export function parsePriceToNumber(price?: string): number {
  if (!price) return 0;
  if (/free/i.test(price)) return 0;
  const n = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Compute subtotal (numeric) from resolved cart items. */
export function useCartSubtotal(catalogs: FeaturedItem[][]) {
  const items = useCartItems(catalogs);
  return items.reduce((sum, g) => sum + parsePriceToNumber(g.price), 0);
}
