import { Link } from "react-router-dom";
import type { FeaturedItem } from "../../Type";

function FeaturedSlide({ item }: { item: FeaturedItem }) {
  return (
    <Link to={item.ctaHref} className="block group">
      <div
        className="h-[520px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
        role="img" aria-label={item.title}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute left-8 bottom-10 max-w-xl text-white space-y-4">
          {item.tag && (
            <span className="text-xs tracking-widest font-semibold text-white/80">
              {item.tag}
            </span>
          )}
          <h2 className="text-4xl font-extrabold drop-shadow">{item.title}</h2>
          <p className="text-white/90">{item.blurb}</p>

          {item.ctaLabel && (
            <button
              className="mt-2 inline-flex items-center rounded-xl bg-white/90 text-gray-900 px-5 py-3
                         font-semibold shadow-sm transition hover:bg-white"
            >
              {item.ctaLabel}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
export default FeaturedSlide;