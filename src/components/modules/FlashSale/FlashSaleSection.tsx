import { useEffect, useRef, useState} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { ProductCard } from "../Product/ProductCard";
import type { IProduct } from "../Product/product.types";
import ContentHeader from "../Shared/ContentHeader/ContentHeader";
import Countdown from "../Shared/CountDown/Countdown";

export default function FlashSaleSection() {
  const {data: flashProductsData} = useGetAllProductsQuery({isFlashSale: true});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const endsAt = useRef(
    new Date(Date.now() + 5 * 60 * 60 * 1000 + 43 * 60 * 1000 + 20 * 1000),
  ).current;

  // console.log(endsAt)

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="w-full bg-background border-2 p-5">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <ContentHeader
          subTitle="Hurry Before It Ends"
          title="Limited Drops at Unbeatable Prices — "
          highlightedWord="Flash Sale"
          description="Shop curated deals with exclusive pricing. Once they’re gone, they’re gone—don’t miss out."
        />

        {/* Right: Countdown + View All */}
        <div className="flex items-center gap-4">
          {/* Countdown */}
          <Countdown endsAt={endsAt}/>
          
          {/* View All */}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-1.5 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {flashProductsData?.data?.map((item: IProduct) => (
            <CarouselItem
              key={item._id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard item={item}/>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="hidden sm:flex -left-8 border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors" />
        <CarouselNext className="hidden sm:flex -right-8 border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors" />
      </Carousel>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-1.5 mt-5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "rounded-full transition-all duration-300",
              i === current
                ? "bg-primary w-5 h-2"
                : "bg-border hover:bg-muted-foreground w-2 h-2"
            )}
          />
        ))}
      </div>

      {/* Mobile View All */}
      <div className="flex justify-center mt-5 sm:hidden">
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors w-full max-w-xs"
        >
          View All Flash Deals
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}