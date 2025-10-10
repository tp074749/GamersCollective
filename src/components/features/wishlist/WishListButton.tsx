// src/components/Storage/WishListButton.tsx
import { useState } from "react";
import Button from "../../ui/Button";
import { useWishlist } from "../../Storage/WishlistContext";

export default function WishlistButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const { has, add, remove } = useWishlist();   // ids-only API
  const [busy, setBusy] = useState(false);
  const inList = has(id);

  const toggle = async () => {
    setBusy(true);
    try {
      inList ? remove(id) : add(id);            // ✅ add/remove by id
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="md"
      loading={busy}
      onClick={toggle}
      className={className}
      aria-pressed={inList}
      aria-label={inList ? "Remove from wishlist" : "Add to wishlist"}
      title={inList ? "Remove from wishlist" : "Add to wishlist"}
    >
      {inList ? "★ In wishlist" : "☆ Add to wishlist"}
    </Button>
  );
}
