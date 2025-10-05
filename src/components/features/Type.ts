// src/features/featured/types.ts
export interface FeaturedItem {
  id: string;
  title: string;
  blurb: string;
  imageUrl: string;
  thumbUrl: string;
  ctaLabel: string;
  ctaHref: string;
  tag?: string;
}
