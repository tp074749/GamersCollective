//src/components/Storage/WishListButton.tsx
import { useState } from "react";
import Button from "../ui/Button"; // adjust path if different
import { useWishlist } from "./WishListLS";

export default function WishlistButton({
  id, title, imageUrl, href, className = "",
}: {
  id: string; title: string; imageUrl?: string; href?: string; className?: string;
}) {
  const { has, add, remove } = useWishlist();
  const [busy, setBusy] = useState(false);
  const inList = has(id);

  const toggle = async () => {
    setBusy(true);
    try {
      if (inList) remove(id);
      else add({ id, title, imageUrl, href });
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
