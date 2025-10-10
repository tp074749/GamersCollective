// src/cart/AddToCartButton.tsx
import Button from "../../ui/Button";
import { useCart } from "../../Storage/CartContext";

export default function AddToCartButton({ id, className = "" }: { id: string; className?: string }) {
  const { add, has } = useCart();
  const inCart = has(id);
  return (
    <Button
      variant="secondary"
      className={className}
      disabled={inCart}
      onClick={() => add(id)}
      title={inCart ? "Already in cart" : "Add to cart"}
    >
      {inCart ? "✓ In cart" : "🛒 Add to cart"}
    </Button>
  );
}
