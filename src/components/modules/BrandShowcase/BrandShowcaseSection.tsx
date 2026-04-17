import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FeaturedBrandCard from "./FeaturedBrandCard";

const brands = [
  { id: 1, name: "Lumen",  tagline: "Premium Lighting",  featured: true,  products: 214 },
  { id: 2, name: "Solène", tagline: "Luxury Skincare",   featured: true,  products: 178 },
  { id: 3, name: "Vortex", tagline: "Sports & Active",   featured: false, products: 302 },
  { id: 4, name: "Arcana", tagline: "Home Décor",        featured: false, products: 145 },
  { id: 5, name: "Ferro",  tagline: "Tools & Hardware",  featured: false, products: 88  },
  { id: 6, name: "Aura",   tagline: "Wellness & Spa",    featured: false, products: 193 },
  { id: 7, name: "Noxis",  tagline: "Tech Gadgets",      featured: false, products: 261 },
  { id: 8, name: "Bloom",  tagline: "Organic Foods",     featured: false, products: 134 },
];


export default function BrandShowcaseSection() {
  const featuredBrands = brands.filter((brand) => brand.featured);
  
  return (
    <section className="py-20 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-5 h-px"
                style={{ background: "var(--primary)" }}
              />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: "var(--primary)" }}
              >
                Curated Partners
              </span>
            </div>
            <h2
              className="text-3xl font-bold tracking-tight leading-tight"
              style={{
                color: "var(--foreground)",
                fontFamily: "'Georgia', serif",
              }}
            >
              Shop by <span style={{ color: "var(--primary)" }}>Brand</span>
            </h2>
            <p
              className="mt-2 text-base max-w-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Handpicked partners that meet Martizo's standard for quality,
              sustainability, and style.
            </p>
          </div>

          <Button
            variant="outline"
            className="self-start md:self-auto gap-2 font-medium"
          >
            View All Brands <ArrowRight size={14} />
          </Button>
        </div>

        {/* Rule */}
        <div className="w-full h-px mb-10" style={{ background: "var(--border)" }} />

         {/* Featured + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Featured column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {featuredBrands.map((brand) => (
              <FeaturedBrandCard key={brand.id} brand={brand} />
            ))}
          </div>

         
        </div>


      </div>
    </section>
  );
}
