import FeaturedCarousel from "./featuredshowcase/FeaturedCarousel";
import FeaturedSidebar from "./featuredshowcase/FeaturedSidebar";
import React from "react";
import type { FeaturedItem } from "./Type";

function FeaturedShowcase({ items }: { items: FeaturedItem[] }) {
  const [index, setIndex] = React.useState(0);

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <FeaturedCarousel
        items={items}
        index={index}
        onChange={setIndex}
        intervalMs={6000}
      />
      <FeaturedSidebar
        items={items}
        activeIndex={index}
        onSelect={setIndex}
      />
    </section>
  );
}
export default FeaturedShowcase;