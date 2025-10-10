import React from "react";
import { useParams } from "react-router-dom";
import { featuredData } from "../components/features/FeaturedData";
import { useGameScreenshots } from "../components/features/gamespage/useGameScreenshots";
import { ScreenshotGallery } from "../components/features/gamespage/ScreenshotGallery";
import { DescriptionCard } from "../components/features/gamespage/DescriptionCard";
import WishlistButton from "../components/Storage/WishListButton"; 
import AddToCartButton from "../components/cart/AddToCartButton";



export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = featuredData.find((g) => g.id === id);
  const images = useGameScreenshots(id);

  if (!item) return <div className="p-6 text-white">Game not found.</div>;
  if (images.length === 0)
    return (
      <section className="mx-auto p-6 text-white max-w-[1400px] 2xl:max-w-[1600px]">
        <h1 className="text-3xl font-extrabold mb-3">{item.title}</h1>
        <p>No screenshots found in <code>src/assets/{id}</code>.</p>
      </section>
    );

  return (
    <section className="mx-auto p-6 text-white max-w-[1400px] 2xl:max-w-[1600px]">
      <h1 className="text-4xl font-extrabold mb-4">{item.title}</h1>
      


      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_430px] 2xl:grid-cols-[minmax(0,1fr)_460px]">
        <ScreenshotGallery images={images} title={item.title} />
        <DescriptionCard item={item} thumbSrc={item.thumbUrl} />
      </div>

      <div className="pt-5 flex items-center gap-3">
        <a
          href={item.ctaHref}
          className="inline-block rounded-lg bg-white/90 text-gray-900 px-5 py-2.5 font-semibold hover:bg-white "
        >
          {item.ctaLabel}
          </a>

        <WishlistButton id={item.id} />

        <AddToCartButton id={item.id} />

      </div>
    </section>
  );
}
