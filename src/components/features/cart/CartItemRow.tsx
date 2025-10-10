// src/cart/components/CartLine.tsx
import type { FeaturedItem } from "../Type";
import GameCardRow from "../../ui/GameCardRow";

export default function CartItemRow({
  game,
  onRemove,
  className,
}: {
  game: FeaturedItem;
  onRemove: () => void;
  className?: string;
}) {
  return (
    <GameCardRow
      game={game}
      showPrice
      className={className}
      rightExtra={
        <button
          onClick={onRemove}
          className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
        >
          Remove
        </button>
      }
    />
  );
}
