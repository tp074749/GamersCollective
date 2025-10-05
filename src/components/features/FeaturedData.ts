import type { FeaturedItem } from "./Type";

export const featuredData: FeaturedItem[] = [
  {
    id: "fortnite",
    title: "Fortnite: Demon Rush",
    blurb: "Team up in Demon Rush and crush the incoming swarm of Demons.",
    imageUrl: "src/assets/fortnite.jpg",
    thumbUrl: "src/assets/featured/fortnite-thumb.jpg",
    ctaLabel: "Play For Free",
    ctaHref: "/game/fortnite",
    tag: "OUT NOW",
  },
  {
    id: "battlefield6",
    title: "Battlefield 6",
    blurb: "Join all-out warfare across land, sea, and air.",
    imageUrl: "src/assets/battlefield6.jpg",
    thumbUrl: "src/assets/featured/bf6-thumb.jpg",
    ctaLabel: "Buy Now",
    ctaHref: "/game/battlefield6",
  },
];
