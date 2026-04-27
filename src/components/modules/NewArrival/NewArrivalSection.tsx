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

const NewArrivalSection = () => {
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProductsQuery({ isNewArrival: true, limit: 8 });


  return (
    <section className="border-2 border-border p-5">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-4">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-1.5">
            Just dropped
          </p>
          <h2
            id="new-arrivals-heading"
            className="text-xl sm:text-2xl font-medium text-foreground"
          >
            New arrivals
          </h2>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="self-start sm:self-auto border-primary text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Link to="/products?isNewArrival=true">View all new arrivals</Link>
        </Button>
      </div>

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
