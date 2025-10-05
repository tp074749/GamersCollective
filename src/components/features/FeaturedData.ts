// FeaturedData.ts
import type { FeaturedItem } from "./Type";

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
    thumbUrl: "src/assets/featured/bf6-thumb.jpg",
    ctaLabel: "Buy Now",
    ctaHref: "/battlefield6",
    genre: "FPS",
    developer: "DICE",
    releaseDate: "November 19, 2021",
  },
];
