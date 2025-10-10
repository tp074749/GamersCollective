// src/pages/CartPage.tsx

import { useState } from "react";
import { featuredData, gameCarouselData } from "../components/features/FeaturedData";
import { useCart, useCartItems, useCartSubtotal } from "../components/Storage/CartContext";
import CartItemRow from "../components/features/cart/CartItemRow";           // ✅ correct casing
import { formatMYR } from "../components/features/cart/CurrencyFormat(MYR)";
import ComfirmWindow from "../components/ui/ComfirmWindow";     // ✅ bring back modal


type ModalMode = "clear" | "checkout" | null;

export default function CartPage() {
  const { remove, clear } = useCart();

  // Resolve ids → FeaturedItem (prefer featuredData over carousel on collisions)
  const items    = useCartItems([gameCarouselData, featuredData]);
  const subtotal = useCartSubtotal([gameCarouselData, featuredData]);

  const [modal, setModal] = useState<ModalMode>(null);

  const modalTitle =
    modal === "clear" ? "Clear cart?" :
    modal === "checkout" ? "Confirm purchase" : "";

  const modalMessage =
    modal === "clear"
      ? "This will remove all items from your cart."
      : modal === "checkout"
      ? "This is a placeholder confirmation. You’ll wire 'Proceed' to Stripe later."
      : "";

  const onConfirm = () => {
    if (modal === "clear") {
      clear();
    }
    // if checkout: placeholder, do nothing for now
    setModal(null);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold">Cart</h1>
        {items.length > 0 && (
          <button
            onClick={() => setModal("clear")}
            className="text-sm px-3 py-1 rounded bg-white/10 hover:bg-white/20"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-white/70">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((g) => (
            <CartItemRow key={g.id} game={g} onRemove={() => remove(g.id)} />
          ))}

          {/* Summary */}
          <div className="rounded-xl border border-white/10 p-4 bg-white/[0.03]">
            <div className="flex justify-between text-white/80">
              <span>Subtotal</span>
              <span>{formatMYR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Tax</span>
              <span>{formatMYR(0)}</span>
            </div>
            <div className="flex justify-between text-white mt-2 text-lg font-semibold">
              <span>Total</span>
              <span>{formatMYR(subtotal)}</span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setModal("checkout")}
                className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold"
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      )}



      <ComfirmWindow
        open={modal !== null}
        title={modalTitle}
        message={modalMessage}
        onCancel={() => setModal(null)}
        onConfirm={onConfirm}
      />
    </section>
  );
}
