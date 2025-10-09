// src/components/features/featuredshowcase/featuredsidebar/FeaturedListItem.tsx
import type { FeaturedItem } from "../../Type";

function FeaturedListItem({
  item, active, onClick
}: {
  item: FeaturedItem; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left
                  transition ring-0 focus:outline-none
                  ${active ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/80"}`}
    >
      <img src={item.thumbUrl} alt="" className="w-10 h-10 rounded-md object-cover" />
      <span className="font-medium">{item.title}</span>
    </button>
  );
}
export default FeaturedListItem;