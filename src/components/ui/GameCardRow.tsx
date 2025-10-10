// src/components/shared/GameCardRow.tsx
import * as React from "react";
import type { FeaturedItem } from "../features/Type";

type RightAlign = "top" | "center" | "bottom";

type Props = {
  game: FeaturedItem;
  showPrice?: boolean;
  rightExtra?: React.ReactNode;
  footerLeft?: React.ReactNode;
  rightAlign?: RightAlign;           // NEW
  className?: string;
};

export default function GameCardRow({
  game,
  showPrice = true,
  rightExtra,
  footerLeft,
  rightAlign = "center",             // default: middle-right
  className = "",
}: Props) {
  const img = game.thumbUrl ?? game.imageUrl;
  const priceText = game.price ? (/free/i.test(game.price) ? "Free" : game.price) : "Free";

  const justify =
    rightAlign === "top" ? "justify-start" :
    rightAlign === "bottom" ? "justify-end" :
    "justify-center";

  return (
    <article
      className={[
        "relative grid grid-cols-[128px_1fr_auto] gap-4 w-full",
        "rounded-xl border border-white/10 bg-[#0b0f15]/80",
        "hover:bg-[#0b0f15]/95 transition shadow-sm overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Thumbnail */}
      {img ? (
        <img
          src={img}
          alt={game.title}
          className="w-[128px] h-[72px] sm:h-[96px] md:h-[112px] object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-[128px] h-[72px] sm:h-[96px] md:h-[112px] bg-white/5" />
      )}

      {/* Title + Genre + Price */}
      <div className="py-3 pr-2 flex flex-col justify-center min-w-0">
        <h3 className="text-white font-semibold leading-tight truncate">{game.title}</h3>
        <p className="text-sm text-white/70 truncate">{game.genre ?? "—"}</p>
        {showPrice ? (
          <div className="text-sm text-white/80">{priceText}</div>
        ) : (
          <div className="h-5" />
        )}
      </div>

      {/* Right column (centered by default) */}
      <div className={`py-3 pr-4 flex flex-col items-end ${justify} text-right min-w-[180px] gap-2`}>
        {rightExtra}
      </div>

      {/* Bottom-right (you currently use it for the date) */}
      {footerLeft ? (
        <div className="absolute bottom-2 right-3 text-xs text-white/70">{footerLeft}</div>
      ) : null}
    </article>
  );
}
