import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import ContentHeader from "../Shared/ContentHeader/ContentHeader";
import type { IProduct } from "../Product/product.types";
import { ProductCard } from "../Product/ProductCard";
import ProductListCard from "../Product/ProductListCard";

export function TrendingProductsSection() {
  const { data: trendingProducts } = useGetAllProductsQuery({
    isNewArrival: true,
    limit: 6,
  });
  console.log("TrendingProductsSection", trendingProducts);
  // const bigTrendingProducts = trendingProducts.data.slice(0, 3);
  // const listTrendingProducts = trendingProducts.data.slice(3);
  // console.log(bigTrendingProducts)
  // console.log(listTrendingProducts)

  return (
    <section className=" px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ContentHeader
          subTitle="Top Picks"
          title="Shop What’s"
          highlightedWord="Trending"
          description="Explore our best-selling and most talked-about items, updated regularly to bring you what everyone is buying."
          btnText="View All Trending Products"
          btnLink="/products?isTrending=true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {trendingProducts?.data?.map((item: IProduct) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>

          {/* Also trending  */}
          <div className="lg:col-span-2 flex flex-col gap-3 justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 px-1">
              Also trending
            </p>
            {trendingProducts?.data?.map((item: IProduct) => (
              <ProductListCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
