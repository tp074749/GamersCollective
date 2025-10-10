// src/cart/components/CartLine.tsx
import * as React from "react";
import type { FeaturedItem } from "../../components/features/Type";
import GameCardRow from "../ui/GameCardRow";

export default function CartLine({
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
