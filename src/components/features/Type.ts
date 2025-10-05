// src/features/Type.ts
export interface FeaturedItem {
  id: string;
  title: string;
  blurb: string;
  imageUrl: string;
  thumbUrl: string;
  ctaLabel: string;
  ctaHref: string;
  tag?: string;
  price?: string; // ✅ Added for GameCarousel items
}
