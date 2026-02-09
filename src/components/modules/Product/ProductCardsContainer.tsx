import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import type { IProduct } from "@/types";
import { Price, PriceValue } from "./Price";
import { Link } from "react-router";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

interface IProductCard {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
  price: ProductPrice;
  badges?: {
    text: string;
    color?: string;
  }[];
}

type TProductCardProps = IProductCard;

type TProductCards = Array<IProductCard>;

interface IProductCardsContainerProps {
  className?: string;
  productsData?: IProduct[];
}

export const ProductCardsContainer = ({
  className,
  productsData,
}: IProductCardsContainerProps) => {
  console.log(className, productsData);

  const productCardsData: TProductCards = productsData?.map(
    (item: IProduct) => ({
      name: item.title,
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
        currency: "USD",
      },
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
    }),
  );

  return (
    <section className={cn("px-10 py-32", className)}>
      <div className="container">
        <div className="grid place-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productCardsData?.map((item, index) => (
            <ProductCard key={`product-card-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({
  name,
  description,
  image,
  badges,
  price,
}: TProductCardProps) => {
  const { regular, sale, currency } = price;

  return (
    <div className="relative group ">
      <Card className="min-w-[350px] min-h-[420px] overflow-hidden p-0 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.5} className="overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="h-56 w-full rounded-tr-3xl rounded-bl-3xl object-cover sm:h-64 lg:h-72"
            />
          </AspectRatio>
          <div className="absolute start-4 top-4">
            <div className="flex gap-3">
              {badges?.map((badge) => (
                <div>
                  {badge.text ? (
                    <Badge
                      style={{
                        backgroundColor: badge.color,
                      }}
                    >
                      {badge.text}
                    </Badge>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            {description}
          </CardDescription>
          <div className="mt-auto">
            <Price onSale={sale != null} className="text-lg font-semibold">
              <PriceValue price={sale} currency={currency} variant="sale" />
              <PriceValue
                price={regular}
                currency={currency}
                variant="regular"
              />
            </Price>
          </div>
        </CardContent>
      </Card>
      <div
        className="absolute min-w-[300px] min-h-[400px] p-0 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl inset-0 bg-muted-foreground flex items-center justify-center gap-3
        opacity-0 group-hover:opacity-80 transition-all duration-300 ease-in-out"
      >
        <Link to={"/cart"} className="asChild">
          <Button className="transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-in-out ">
            Add to Cart
          </Button>
        </Link>
        <Link to={"/product-details"} className="asChild">
          <Button
            variant={"secondary"}
            className="transform -translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
