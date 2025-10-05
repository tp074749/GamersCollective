import FeaturedCarousel from "../components/features/featuredshowcase/FeaturedCarousel";
import { featuredData } from "../components/features/FeaturedData";


export default function Store() { return (
    <section className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Featured</h1>
        <FeaturedCarousel items={featuredData} index={0} onChange={() => {}} />
            
    </section>
);
}