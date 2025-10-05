import React, { useState, useEffect } from "react";
import { gameCarouselData } from "../features/FeaturedData"; // ✅ Import from your shared data file

const GameCarousel: React.FC = () => {
  const itemsPerView = 5;
  const GAP_REM = 1;
  const maxIndex = Math.max(0, gameCarouselData.length - itemsPerView);
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prevSlide = () => setIndex((i) => Math.max(i - 1, 0));

  // ✅ Auto-scroll every 4s
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [maxIndex]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Top Selling Games</h2>
        <div className="space-x-2">
          <button
            onClick={prevSlide}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(index * 100) / itemsPerView}%)`,
          }}
        >
          {gameCarouselData.map((g) => (
            <div
              key={g.id}
              className="shrink-0 basis-[calc((100%-1rem*4)/5)] group"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="w-full h-120 object-cover"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-5 rounded-lg">
                  <h3 className="text-white text-lg font-bold mb-2">
                    {g.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-5">
                    {g.blurb}
                  </p>
                  <p className="text-[#00bfff] font-semibold">{g.price}</p>
                </div>
              </div>
              {/* Title and Price below */}
              <div className="mt-2">
                <h4 className="text-md font-semibold text-white">{g.title}</h4>
                <p className="text-gray-400">{g.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default GameCarousel;
