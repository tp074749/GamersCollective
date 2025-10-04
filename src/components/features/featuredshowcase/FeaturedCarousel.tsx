import React from "react";
import FeaturedSlide from "./featuredcarousel/FeaturedSlide";
import SlideProgressBar from "./featuredcarousel/SlideProgressBar";
import type { FeaturedItem } from "../Type";

function FeaturedCarousel({
  items, index, onChange, intervalMs = 6000
}: {
  items: FeaturedItem[]; index: number;
  onChange: (i: number) => void; intervalMs?: number;
}) {
  const [progress, setProgress] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // timer
  React.useEffect(() => {
    if (paused) return;
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - start) / intervalMs);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        const next = (index + 1) % items.length;
        onChange(next);
        setProgress(0);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [index, paused, intervalMs, items.length, onChange]);

  const item = items[index];

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <FeaturedSlide item={item} />
      <SlideProgressBar progress={progress} />
      {/* (Optional) Prev/Next buttons */}
      {/* (Optional) Keyboard nav with onKeyDown */}
    </div>
  );
}
export default FeaturedCarousel;