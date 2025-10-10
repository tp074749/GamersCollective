// src/components/Storage/WishCard.tsx
import type { FeaturedItem } from "../features/Type";
import GameCardRow from "../ui/GameCardRow";


function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

export default function WishCard({
  game,
  className,
}: {
  game: FeaturedItem;
  className?: string;
}) {
  

  return (
    <GameCardRow
      game={game}
      showPrice
      rightAlign="center"               // <— middle-right
      className={className}
      footerLeft={
        game.releaseDate ? <span>{formatDate(game.releaseDate)}</span> : null
      }
    />
  );
}
