import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../Storage/localStorage"; // your hook path

export type CartLine = { id: string; qty: number };

type CartAPI = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number; // total items (sum of qty)
};

const KEY = "cart:v1";
const Ctx = createContext<CartAPI | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useLocalStorage<CartLine[]>(KEY, []);

  const api = useMemo<CartAPI>(() => {
    const add = (id: string, qty = 1) =>
      setLines(prev => {
        const i = prev.findIndex(l => l.id === id);
        if (i === -1) return [...prev, { id, qty }];
        const copy = [...prev];
        copy[i] = { id, qty: copy[i].qty + qty };
        return copy;
      });

    const setQty = (id: string, qty: number) =>
      setLines(prev => {
        if (qty <= 0) return prev.filter(l => l.id !== id);
        const i = prev.findIndex(l => l.id === id);
        if (i === -1) return [...prev, { id, qty }];
        const copy = [...prev];
        copy[i] = { id, qty };
        return copy;
      });

    const remove = (id: string) => setLines(prev => prev.filter(l => l.id !== id));
    const clear = () => setLines([]);

    const count = lines.reduce((s, l) => s + l.qty, 0);

    return { lines, add, setQty, remove, clear, count };
  }, [lines, setLines]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
