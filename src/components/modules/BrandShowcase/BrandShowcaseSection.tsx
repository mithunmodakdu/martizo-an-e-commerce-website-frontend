import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FeaturedBrandCard from "./FeaturedBrandCard";
import RegularBrandCard from "./RegularBrandCard";
import { useGetAllBrandsQuery } from "@/redux/features/brands/brands.api";
import type { IBrand } from "@/types";
import ContentHeader from "../Shared/ContentHeader/ContentHeader";

export default function BrandShowcaseSection() {
  const {data: brandData} = useGetAllBrandsQuery(undefined);
  const featuredBrands = brandData?.data?.filter((brand: IBrand) => brand.isFeatured);
  const regularBrands = brandData?.data?.filter((brand: IBrand) => !brand.isFeatured);
  
  return (
    <section className="px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ContentHeader
          subTitle="Curated Partners"
          title="Shop by"
          highlightedWord="Brand"
          description="Handpicked partners that meet Martizo's standard for quality, sustainability, and style."
          btnText="View All Products by Brand"
          btnLink="/products?brand=LG"
        />

        {/* Rule */}
        <div className="w-full h-px mb-10" style={{ background: "var(--border)" }} />

         {/* Featured + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Featured column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {featuredBrands?.map((brand: IBrand) => (
              <FeaturedBrandCard key={brand._id} brand={brand} />
            ))}
          </div>

             {/* Brand grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 content-start">
            {regularBrands?.map((brand: IBrand) => (
              <RegularBrandCard key={brand._id} brand={brand} />
            ))}

            {/* CTA tile */}
            <div
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center rounded-xl p-4 cursor-pointer transition-colors duration-200"
              style={{
                border: "1.5px dashed var(--border)",
                background: "var(--muted)",
                minHeight: "100px",
              }}
            >
              <p className="text-base text-center mb-2.5" style={{ color: "var(--muted-foreground)" }}>
                50+ brands available on Martizo
              </p>
              <button
                className="flex items-center gap-1 text-base font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Explore All <ArrowRight size={16} />
              </button>
            </div>
          </div>


         
        </div>


      </div>
    </section>
  );
}
