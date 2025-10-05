import React, { useState, useEffect } from "react";
import eldenRingImg from "../../assets/elden_ring.jpg";
import peakImg from "../../assets/peak.webp";
import silentImg from "../../assets/silent_hill_f.avif";
import forniteImg from "../../assets/fortnite.webp";
import dyinglightImg from "../../assets/Dying_Light_The_Beast.jpg";
import expedition33Img from "../../assets/Clair-Obscur-Expedition-33.png";
import metalgearsolidImg from "../../assets/MetalGearSolidDelta.jpg";
import GOWImg from "../../assets/God_of_War_Ragnarok.jpg";
import FF7Img from "../../assets/ff7rebirth.jpg";
import LiesofPImg from "../../assets/Lies-of-P_2025.jpg";
import ArmorCore6Img from "../../assets/Armored_Core_VI_Fires_of_Rubicon.jpg";

const games = [
  {
    id: 1,
    title: "Elden Ring",
    price: "MYR 219.99",
    img: eldenRingImg,
    description:
      "An epic open-world action RPG from the creators of Dark Souls. Explore vast lands filled with dungeons, fierce bosses, and secrets hidden across the Lands Between.",
  },
  {
    id: 2,
    title: "PEAK",
    price: "MYR 53.99",
    img: peakImg,
    description:
      "Embark on a thrilling journey to conquer nature’s toughest mountains. Test your endurance, adapt to unpredictable weather, and master the art of climbing to the top.",
  },
  {
    id: 3,
    title: "SILENT HILL f",
    price: "MYR 219.99",
    img: silentImg,
    description:
      "Set in 1960s Japan, this psychological horror adventure unravels a chilling story of supernatural terror, loneliness, and decay in the haunting world of Silent Hill.",
  },
  {
    id: 4,
    title: "FORTNITE",
    price: "Free",
    img: forniteImg,
    description:
      "Jump into the ever-evolving world of Fortnite. Build, battle, and survive in unique modes ranging from fast-paced Battle Royale to creative sandbox experiences.",
  },
  {
    id: 5,
    title: "Dying Light: The Beast",
    price: "MYR 135.99",
    img: dyinglightImg,
    description:
      "A gripping action survival game where your agility is your greatest weapon. Use parkour skills and brutal combat to survive in a city overrun by infected creatures.",
  },
  {
    id: 6,
    title: "Clair Obscur: Expedition 33",
    price: "MYR 199.00",
    img: expedition33Img,
    description:
      "Experience a poetic blend of art and RPG gameplay. Lead your expedition through a painted fantasy world where every battle and every decision shapes your destiny.",
  },
  {
    id: 7,
    title: "METAL GEAR SOLID Δ: SNAKE EATER",
    price: "MYR 189.99",
    img: metalgearsolidImg,
    description:
      "A stunning remake of the classic stealth masterpiece. Follow Naked Snake in his origin story as he infiltrates enemy territory during the height of the Cold War.",
  },
  {
    id: 8,
    title: "God of War Ragnarok",
    price: "MYR 229.00",
    img: GOWImg,
    description:
      "Join Kratos and Atreus on a mythic adventure across the Nine Realms as Ragnarok approaches. Face gods, monsters, and destiny in this breathtaking Norse saga.",
  },
  {
    id: 9,
    title: "FINAL FANTASY VII REBIRTH",
    price: "MYR 159.00",
    img: FF7Img,
    description:
      "Rediscover the legendary journey of Cloud and his friends in a beautifully reimagined world filled with intense combat, deep storytelling, and emotional moments.",
  },
  {
    id: 10,
    title: "Lies of P: Overture",
    price: "MYR 189.00",
    img: LiesofPImg,
    description:
      "A dark fantasy souls-like inspired by the tale of Pinocchio. Explore the grim city of Krat, battle twisted automatons, and uncover the truth behind humanity’s fall.",
  },
  {
    id: 11,
    title: "ARMORED CORE™ VI FIRES OF RUBICON™",
    price: "MYR 215.00",
    img: ArmorCore6Img,
    description:
      "Pilot your custom mech through explosive missions in this high-octane action game. Build, modify, and unleash firepower in the war-torn world of Rubicon.",
  },
];

const GameCarousel: React.FC = () => {
  const itemsPerView = 5;
const GAP_REM = 1; // tailwind gap-4 = 1rem (16px at root 16px)
const maxIndex = Math.max(0, games.length - itemsPerView);

const [index, setIndex] = useState(0);

const nextSlide = () => setIndex(i => Math.min(i + 1, maxIndex));
const prevSlide = () => setIndex(i => Math.max(i - 1, 0));

useEffect(() => {
  const id = setInterval(() => {
    setIndex(i => (i >= maxIndex ? 0 : i + 1));
  }, 4000);
  return () => clearInterval(id);
}, [maxIndex]);

return (
  <div className="w-full">
    {/* header ... */}
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
    <div className="overflow-hidden">
      <div
        className="flex gap-4 transition-transform duration-500 ease-in-out"
        style={{
          // percentage per step:
          // 100% / itemsPerView of content width + gap percentage per step.
          // Easier: move by (index * (100 / itemsPerView))% of the container width.
          // Because each step reveals next card width computed by calc() below.
          transform: `translateX(-${(index * 100) / itemsPerView}%)`,
        }}
      >
      {games.map((g) => (
        <div
          key={g.id}
          // width calc => (container - total gaps in a view) / itemsPerView
          className="shrink-0 basis-[calc((100%-1rem*4)/5)] group" // 4 gaps for 5 items with gap-4 (1rem)
        >
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={g.img}
              alt={g.title}
              className="w-full h-60 object-cover"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-5 rounded-lg">
              <h3 className="text-white text-lg font-bold mb-2">{g.title}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-5">{g.description}</p>
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
