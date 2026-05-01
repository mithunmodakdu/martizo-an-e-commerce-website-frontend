import { useEffect, useRef, useState,  useCallback} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Zap, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlashProductCard } from "./FlashSaleProductCard";
import { cn } from "@/lib/utils";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { ProductCard } from "../Product/ProductCard";
import type { IProduct } from "../Product/product.types";
import ContentHeader from "../Shared/ContentHeader/ContentHeader";

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviewCount: number;
  stockTotal: number;
  stockSold: number;
  tag?: string;
}

const FLASH_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    originalPrice: 399,
    salePrice: 249,
    rating: 4.8,
    reviewCount: 2341,
    stockTotal: 100,
    stockSold: 73,
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Apple Watch Series 9 – Midnight Aluminium",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    originalPrice: 429,
    salePrice: 299,
    rating: 4.9,
    reviewCount: 5120,
    stockTotal: 60,
    stockSold: 55,
    tag: "Hot Deal",
  },
  {
    id: "3",
    name: "Logitech MX Master 3S Wireless Mouse",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    originalPrice: 109,
    salePrice: 69,
    rating: 4.7,
    reviewCount: 3870,
    stockTotal: 80,
    stockSold: 41,
  },
  {
    id: "4",
    name: "Samsung 27\" QHD IPS Monitor 165Hz",
    image: "https://images.unsplash.com/photo-1593640408182-31c228a3bae7?w=600&q=80",
    originalPrice: 349,
    salePrice: 219,
    rating: 4.6,
    reviewCount: 1980,
    stockTotal: 50,
    stockSold: 38,
    tag: "Limited",
  },
  {
    id: "5",
    name: "Anker 737 Power Bank 24000mAh",
    image: "https://images.unsplash.com/photo-1609592806596-b942de9dcf7b?w=600&q=80",
    originalPrice: 149,
    salePrice: 89,
    rating: 4.5,
    reviewCount: 872,
    stockTotal: 120,
    stockSold: 60,
  },
  {
    id: "6",
    name: "Kindle Paperwhite 16GB Signature Edition",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    originalPrice: 189,
    salePrice: 129,
    rating: 4.8,
    reviewCount: 4410,
    stockTotal: 90,
    stockSold: 67,
    tag: "Top Rated",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown(targetDate: Date) {
  const getTimeLeft = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, [getTimeLeft]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-md px-2.5 py-1 min-w-[40px] text-center">
        <span className="text-primary-foreground font-bold text-lg tabular-nums leading-none">
          {pad(value)}
        </span>
      </div>
      <span className="text-primary-foreground/70 text-[10px] mt-0.5 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}



export default function FlashSaleSection() {
  const {data: flashProductsData} = useGetAllProductsQuery({isFlashSale: true});

  const saleEndsAt = useRef(
    new Date(Date.now() + 5 * 60 * 60 * 1000 + 43 * 60 * 1000 + 20 * 1000)
  ).current;
  const { hours, minutes, seconds } = useCountdown(saleEndsAt);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
          <div className="flex items-center gap-1.5 bg-primary rounded-xl px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-primary-foreground/80 mr-1" />
            <CountdownUnit value={hours} label="hrs" />
            <span className="text-primary-foreground/60 font-bold text-lg pb-3">:</span>
            <CountdownUnit value={minutes} label="min" />
            <span className="text-primary-foreground/60 font-bold text-lg pb-3">:</span>
            <CountdownUnit value={seconds} label="sec" />
          </div>

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