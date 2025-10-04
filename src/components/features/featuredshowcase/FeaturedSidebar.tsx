import type { FeaturedItem } from "../Type";
import FeaturedListItem from "./featuredsidebar/FeaturedListItem";

function FeaturedSidebar({
  items, activeIndex, onSelect
}: {
  items: FeaturedItem[]; activeIndex: number; onSelect: (i: number) => void;
}) {
  return (
    <aside className="space-y-3">
      {items.map((it, i) => (
        <FeaturedListItem
          key={it.id}
          item={it}
          active={i === activeIndex}
          onClick={() => onSelect(i)}
        />
      ))}
    </aside>
  );
}

export default FeaturedSidebar;

