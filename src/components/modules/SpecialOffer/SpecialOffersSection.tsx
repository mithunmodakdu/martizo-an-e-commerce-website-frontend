import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { ProductCard } from "../Product/ProductCard";
import type { IProduct } from "../Product/product.types";
import { CouponCountdownStrip } from "./CouponCountdownStrip";
import ContentHeader from "../Shared/ContentHeader/ContentHeader";

export default function SpecialOffersSection() {
  const { data: topDiscountProducts } = useGetAllProductsQuery({
    sort: "-discountPercentage",
    page:1,
    limit: 3,
  });

  const { data: smallDiscountProducts } = useGetAllProductsQuery({
    sort: "-discountPercentage",
    page:2,
    limit: 4
    
  });

  
  return (
    <section aria-labelledby="special-offers-heading" className="border-2 border-border p-5">

       <ContentHeader
          subTitle="Limited Time"
          title="Grab the"
          highlightedWord="Special Offers"
          description="Don’t miss out on exclusive discounts and deals available for a limited time only."
          btnText="All Deals"
          btnLink="/products?isNewArrival=true"
        />

      {/* Top deals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {topDiscountProducts?.data?.map((item: IProduct) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
      
      {/* Small deals */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {
          smallDiscountProducts?.data?.map((item: IProduct) => (
            <ProductCard key={item._id} item={item}/>
          ))
        }
      </div>

      {/* CouponCountdownStrip */}
      <CouponCountdownStrip/>



    </section>
  );
}
