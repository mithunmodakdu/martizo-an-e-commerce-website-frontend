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

  const productCardsData = productsData?.data?.map((item: IProduct) => ({
    _id: item._id,
    name: item.title,
    slug: item.slug,
    category: item.category,
    image: {
      src: item.thumbnail,
      alt: `Thumbnail of ${item.title}`,
    },
    description:
      item.description.length > 25
        ? item.description.slice(0, 25)
        : item.description,
    price: {
      regular: item.price,
      sale: item.salePrice,
      currency: "BDT",
    },
    variants: item.variants,
    badges: [
      {
        text: item?.isFlashSale && "Flash Sale",
        color: item?.isFlashSale && "oklch(0.577 0.245 27.325)",
      },
      {
        text: item?.isMartizoExclusive && "Exclusive",
        color: item?.isMartizoExclusive && "oklch(0.5941 0.1635 150.03)",
      },
      {
        text: item?.isTrending && "Trending",
        color: item?.isTrending && "oklch(0.841 0.238 128.85)",
      },
      {
        text: item?.isNewArrival && "New",
        color: item?.isNewArrival && "oklch(0.448 0.119 151.328)",
      },
    ],
  }));

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
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {productCardsData?.map((item, index) => (
            <CarouselItem key={index} className="basis md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-1">
              <div className="p-1">
                <ProductCard {...item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4"/>
        <CarouselNext className="mr-4"/>
      </Carousel>
    </section>
  );
};

export default NewArrivalSection;
