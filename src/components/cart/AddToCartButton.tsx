import Button from "../ui/Button"; // your Button
import { useCart } from "./CartContext";

export default function AddToCartButton({
  id,
  className = "",
  qty = 1,
}: {
  id: string;
  qty?: number;
  className?: string;
}) {
  const { add } = useCart();
  return (
    <Button
      variant="secondary"
      className={className}
      onClick={() => add(id, qty)}
      aria-label="Add to cart"
      title="Add to cart"
    >
      🛒 Add to cart
    </Button>
  );
}
