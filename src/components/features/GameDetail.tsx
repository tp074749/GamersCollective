// components/features/GameDetail.tsx
import { useParams } from "react-router-dom";
import { featuredData } from "./FeaturedData";

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const item = featuredData.find(g => g.id === id);

  if (!item) return <div className="p-6 text-white">Game not found.</div>;

  return (
    <section className="max-w-5xl mx-auto p-6 text-white grid md:grid-cols-2 gap-6">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-64 md:h-full object-cover rounded-xl border border-white/10"
      />
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold">{item.title}</h1>
        <p className="text-white/80">{item.blurb}</p>
        {item.tag && <span className="text-xs bg-white/10 px-2 py-1 rounded">{item.tag}</span>}
        <div className="pt-2">
          <button className="rounded-lg bg-white/90 text-gray-900 px-4 py-2 font-semibold hover:bg-white">
            {item.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
 