import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "../Product/ProductCard";
import type { IProduct } from "../Product/product.types";
import ContentHeader from "../Shared/ContentHeader/ContentHeader";

const NewArrivalSection = () => {
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProductsQuery({ isNewArrival: true, limit: 8 });


  return (
    <section className="border-2 border-border p-5">
      {/* Header */}
        <ContentHeader
          subTitle="Just Landed"
          title="Discover the"
          highlightedWord="New Arrivals"
          description="Be the first to explore our newest products, freshly added to keep your style and lifestyle up to date."
          btnText="All New Arrivals"
          btnLink="/products?isNewArrival=true"
        />

      {/* products card */}
      {
      !productsLoading && (<Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {productsData?.data?.map((item: IProduct) => (
            <CarouselItem key={item._id} className="basis md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-1">
              <div className="p-1">
                <ProductCard item={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4"/>
        <CarouselNext className="mr-4"/>
      </Carousel>)
      }
    </section>
  );
};

export default NewArrivalSection;
