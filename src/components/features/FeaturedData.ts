// FeaturedData.ts
import type { FeaturedItem } from "./Type";
import eldenRingImg from "../../assets/elden_ring.jpg";
import peakImg from "../../assets/peak.webp";
import silentImg from "../../assets/silent_hill_f.avif";
import fortniteImg from "../../assets/fortnite.webp";
import dyinglightImg from "../../assets/Dying_Light_The_Beast.jpg";
import expedition33Img from "../../assets/Clair-Obscur-Expedition-33.png";
import metalGearSolidImg from "../../assets/MetalGearSolidDelta.jpg";
import GOWImg from "../../assets/God_of_War_Ragnarok.jpg";
import FF7Img from "../../assets/ff7rebirth.jpg";
import LiesofPImg from "../../assets/Lies-of-P_2025.jpg";
import ArmorCore6Img from "../../assets/Armored_Core_VI_Fires_of_Rubicon.jpg";

export const wishlist: FeaturedItem[] = [
  
];

export const featuredData: FeaturedItem[] = [
  {
    id: "fortnite",
    title: "Fortnite: Demon Rush",
    blurb: "Team up in Demon Rush and crush the incoming swarm of Demons.",
    imageUrl: "src/assets/fortnite/fortnite.jpg",
    thumbUrl: "src/assets/fortnite/fortnite.jpg",
    ctaLabel: "Play For Free",
    ctaHref: "/fortnite",
    tag: "OUT NOW",
    genre: "Battle Royale",
    developer: "Epic Games",
    releaseDate: "July 21, 2017",
  },
  {
    id: "battlefield6",
    title: "Battlefield6",
    blurb: "Join all-out warfare across land, sea, and air.",
    imageUrl: "src/assets/battlefield6.jpg",
    thumbUrl: "src/assets/battlefield6.jpg",
    ctaLabel: "Buy Now",
    ctaHref: "/battlefield6",
    genre: "FPS",
    developer: "DICE",
    releaseDate: "November 19, 2021",
  },
];

// --- Game Carousel Data ---
export const gameCarouselData: FeaturedItem[] = [
  {
    id: "elden-ring",
    title: "Elden Ring",
    blurb:
      "An epic open-world action RPG from the creators of Dark Souls. Explore vast lands filled with dungeons, fierce bosses, and secrets hidden across the Lands Between.",
    imageUrl: eldenRingImg,
    thumbUrl: eldenRingImg,
    price: "MYR 219.99",
    ctaLabel: "View Game",
    ctaHref: "/game/elden-ring",
    tag: "Top Seller",
  },
  {
    id: "peak",
    title: "PEAK",
    blurb:
      "Embark on a thrilling journey to conquer nature’s toughest mountains. Test your endurance, adapt to unpredictable weather, and master the art of climbing to the top.",
    imageUrl: peakImg,
    thumbUrl: peakImg,
    price: "MYR 53.99",
    ctaLabel: "View Game",
    ctaHref: "/game/peak",
  },
  {
    id: "silent-hill-f",
    title: "SILENT HILL f",
    blurb:
      "Set in 1960s Japan, this psychological horror adventure unravels a chilling story of supernatural terror, loneliness, and decay in the haunting world of Silent Hill.",
    imageUrl: silentImg,
    thumbUrl: silentImg,
    price: "MYR 219.99",
    ctaLabel: "View Game",
    ctaHref: "/game/silent-hill-f",
  },
  {
    id: "fortnite",
    title: "FORTNITE",
    blurb:
      "Jump into the ever-evolving world of Fortnite. Build, battle, and survive in unique modes ranging from fast-paced Battle Royale to creative sandbox experiences.",
    imageUrl: fortniteImg,
    thumbUrl: fortniteImg,
    price: "Free",
    ctaLabel: "Play Free",
    ctaHref: "/game/fortnite",
  },
  {
    id: "dying-light-beast",
    title: "Dying Light: The Beast",
    blurb:
      "A gripping action survival game where your agility is your greatest weapon. Use parkour skills and brutal combat to survive in a city overrun by infected creatures.",
    imageUrl: dyinglightImg,
    thumbUrl: dyinglightImg,
    price: "MYR 135.99",
    ctaLabel: "View Game",
    ctaHref: "/game/dying-light-beast",
  },
  {
    id: "expedition-33",
    title: "Clair Obscur: Expedition 33",
    blurb:
      "Experience a poetic blend of art and RPG gameplay. Lead your expedition through a painted fantasy world where every battle and every decision shapes your destiny.",
    imageUrl: expedition33Img,
    thumbUrl: expedition33Img,
    price: "MYR 199.00",
    ctaLabel: "View Game",
    ctaHref: "/game/expedition-33",
  },
  {
    id: "metal-gear-solid-delta",
    title: "METAL GEAR SOLID Δ: SNAKE EATER",
    blurb:
      "A stunning remake of the classic stealth masterpiece. Follow Naked Snake in his origin story as he infiltrates enemy territory during the height of the Cold War.",
    imageUrl: metalGearSolidImg,
    thumbUrl: metalGearSolidImg,
    price: "MYR 189.99",
    ctaLabel: "View Game",
    ctaHref: "/game/metal-gear-solid-delta",
  },
  {
    id: "god-of-war-ragnarok",
    title: "God of War Ragnarok",
    blurb:
      "Join Kratos and Atreus on a mythic adventure across the Nine Realms as Ragnarok approaches. Face gods, monsters, and destiny in this breathtaking Norse saga.",
    imageUrl: GOWImg,
    thumbUrl: GOWImg,
    price: "MYR 229.00",
    ctaLabel: "View Game",
    ctaHref: "/game/god-of-war-ragnarok",
  },
  {
    id: "final-fantasy-vii-rebirth",
    title: "FINAL FANTASY VII REBIRTH",
    blurb:
      "Rediscover the legendary journey of Cloud and his friends in a beautifully reimagined world filled with intense combat, deep storytelling, and emotional moments.",
    imageUrl: FF7Img,
    thumbUrl: FF7Img,
    price: "MYR 159.00",
    ctaLabel: "View Game",
    ctaHref: "/game/final-fantasy-vii-rebirth",
  },
  {
    id: "lies-of-p-overture",
    title: "Lies of P: Overture",
    blurb:
      "A dark fantasy souls-like inspired by the tale of Pinocchio. Explore the grim city of Krat, battle twisted automatons, and uncover the truth behind humanity’s fall.",
    imageUrl: LiesofPImg,
    thumbUrl: LiesofPImg,
    price: "MYR 189.00",
    ctaLabel: "View Game",
    ctaHref: "/game/lies-of-p-overture",
  },
  {
    id: "armored-core-vi",
    title: "ARMORED CORE™ VI FIRES OF RUBICON™",
    blurb:
      "Pilot your custom mech through explosive missions in this high-octane action game. Build, modify, and unleash firepower in the war-torn world of Rubicon.",
    imageUrl: ArmorCore6Img,
    thumbUrl: ArmorCore6Img,
    price: "MYR 215.00",
    ctaLabel: "View Game",
    ctaHref: "/game/armored-core-vi",
  },
];
