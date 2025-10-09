import { useState, useMemo } from "react";
import { useCart } from "../components/cart/CartContext.tsx";
import { featuredData, gameCarouselData } from "../components/features/FeaturedData";
import Button from "../components/ui/Button";
import { resolveAssetUrl } from "../components/ui/resolveAssetUrl";

// --- Helper: build a lookup by id from all known catalogs
const catalog = [...featuredData, ...gameCarouselData];
const byId = new Map(catalog.map(g => [g.id, g as any]));

// --- price helpers
function parsePrice(p?: string): number {
  if (!p) return 0;
  const n = Number((p.match(/[\d.]+/) ?? [0])[0]);
  return Number.isFinite(n) ? n : 0;
}
function formatMYR(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "MYR" }).format(n);
}

export default function CartPage() {
  const { lines, setQty, remove, clear } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const rows = useMemo(() => {
    return lines
      .map(l => {
        const game = byId.get(l.id);
        if (!game) return null;
        const price = parsePrice(game.price || game.ctaLabel === "Play For Free" ? "0" : undefined);
        const img = resolveAssetUrl(game.thumbUrl ?? game.imageUrl);
        return { line: l, game, price, img, sub: price * l.qty };
      })
      .filter(Boolean) as Array<{
        line: { id: string; qty: number };
        game: any;
        price: number;
        img: string;
        sub: number;
      }>;
  }, [lines]);

  const totals = useMemo(() => {
    const subtotal = rows.reduce((s, r) => s + r.sub, 0);
    const tax = 0; // add tax logic if needed
    const grand = subtotal + tax;
    return { subtotal, tax, grand };
  }, [rows]);

  return (
    <section className="max-w-5xl mx-auto p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold">Cart</h1>
        {rows.length > 0 && (
          <button onClick={() => setConfirmOpen(true)} className="text-sm px-3 py-1 rounded bg-white/10 hover:bg-white/20">
            Clear all
          </button>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="text-white/70">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Lines */}
          {rows.map(({ line, game, price, img, sub }) => (
            <div
              key={line.id}
              className="grid grid-cols-[96px_1fr_auto] gap-4 items-center rounded-xl border border-white/10 p-3 bg-[#0b0f15]/80"
            >
              {/* thumb */}
              {img ? (
                <img src={img} alt={game.title} className="w-24 h-16 object-cover rounded" />
              ) : (
                <div className="w-24 h-16 rounded bg-white/5" />
              )}

              {/* info */}
              <div className="min-w-0">
                <div className="font-semibold truncate">{game.title}</div>
                <div className="text-white/70 text-sm truncate">{game.genre ?? ""}</div>
              </div>

              {/* qty + price */}
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded bg-white/10">
                  <button
                    className="px-2 py-1 hover:bg-white/10"
                    onClick={() => setQty(line.id, Math.max(0, line.qty - 1))}
                  >
                    −
                  </button>
                  <span className="px-3 py-1 min-w-[2ch] text-center">{line.qty}</span>
                  <button
                    className="px-2 py-1 hover:bg-white/10"
                    onClick={() => setQty(line.id, line.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/70">{price ? formatMYR(price) : "Free"}</div>
                  <div className="text-white font-semibold">{price ? formatMYR(sub) : "—"}</div>
                </div>
                <button onClick={() => remove(line.id)} className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20">
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="rounded-xl border border-white/10 p-4 bg-white/[0.03]">
            <div className="flex justify-between text-white/80">
              <span>Subtotal</span>
              <span>{formatMYR(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Tax</span>
              <span>{formatMYR(totals.tax)}</span>
            </div>
            <div className="flex justify-between text-white mt-2 text-lg font-semibold">
              <span>Total</span>
              <span>{formatMYR(totals.grand)}</span>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setConfirmOpen(true)}
              >
                Proceed to payment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation modal (placeholder) */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0b0e12] p-5 space-y-4">
            <h3 className="text-white text-lg font-semibold">Confirm purchase</h3>
            <p className="text-white/80">
              This is a placeholder confirmation. “Proceed” doesn’t charge yet—you’ll wire it to Stripe later.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // placeholder action; keep modal open or close it—your choice
                  setConfirmOpen(false);
                }}
              >
                Proceed
              </Button>
            </div>

            <div className="border-t border-white/10 pt-3">
              <button
                onClick={() => { clear(); setConfirmOpen(false); }}
                className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
              >
                (Optional) Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
