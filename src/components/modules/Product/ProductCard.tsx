/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price, PriceValue } from "./Price";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import type { ICartItem } from "../Cart/cart.types";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const ProductCard = ({
  _id,
  name,
  slug,
  category,
  description,
  image,
  price,
  badges,
  stock = 50,
  rating = 4,
  ratingCount = 500,
}) => {
  const [wishlisted, setWishlisted] = useState(false);
  const stockSold = 48;
  const { regular, sale, currency } = price;
  const stockPercent = Math.round((stockSold / stock) * 100);
  const discountPercent = sale && Math.round(((regular - sale) / regular) * 100);
  const stockLeft = stock - stockSold;
  const [addToCart] = useAddToCartMutation();

  const cartData: ICartItem = {
    productId: _id,
    name,
    category: category?._id,
    price,
    quantity: 1,
    image,
  };

  const handleAddToCart = async (data: ICartItem) => {
    // console.log(data)
    const toastId = toast.loading("Adding product to cart...");

    try {
      const res = await addToCart(data).unwrap();
      // console.log(res)
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      // console.log("from error catch", error)
      if (!error.data.success) {
        toast.error(error.data.message, { id: toastId });
      }
    }
  };

  return (
    <Card className="overflow-hidden border border-border rounded-none bg-card py-0 shadow-md hover:shadow-xl transition-shadow duration-300  h-full flex flex-col">
      <CardHeader className="relative block p-0">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted shrink-0">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute start-4 top-4">
            <div className="flex justify-items-start gap-1">
               {
                discountPercent && <Badge className="bg-destructive text-white">{`OFF ${discountPercent}%`}</Badge>
              }
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

          {/* wishlist button */}
          <Button
            onClick={() => setWishlisted(!wishlisted)}
            className={cn(
              "absolute top-2.5 right-2.5 p-1.5 rounded-full bg-background/80 backdrop-blur-sm shadow transition-all duration-200 hover:scale-110 hover:cursor-pointer",
              wishlisted ? "text-destructive" : "text-foreground",
            )}
          >
            <Heart
              className={cn("w-3.5 h-3.5", wishlisted && "fill-destructive")}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-3 px-3 pb-0 space-y-2 flex-1">
        <h3 className="font-semibold text-card-foreground text-sm leading-snug line-clamp-2">
          {name}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(rating)
                    ? "text-[var(--chart-2)] fill-[var(--chart-2)]"
                    : "text-border fill-border",
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            ({ratingCount?.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <Price onSale={sale != null} className="text-xs font-medium">
            <PriceValue price={regular} currency={currency} variant="regular" />
            <PriceValue price={sale} currency={currency} variant="sale" />           
          </Price>
          {sale && (
            <span className="text-xs font-medium text-primary ml-auto">
              SAVE BDT {regular - sale}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">
              Sold{" "}
              <span className="text-card-foreground font-semibold">
                {stockSold}
              </span>
            </span>
            <span
              className={cn(
                "font-semibold",
                stockLeft <= 10 ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {stockLeft <= 10 ? `🔥 ${stockLeft} left` : `${stockLeft} left`}
            </span>
          </div>
          <Progress
            value={stockPercent}
            className="h-1.5 bg-muted [&>div]:bg-primary"
          />
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-3 flex gap-5  justify-center">
        {/* CTA Buttons */}
        <Button
          onClick={() => handleAddToCart(cartData)}
          className="rounded-none hover:cursor-pointer"
        >
          <ShoppingCart className="w-2 h-2 mr-1" />
          Add to Cart
        </Button>

        <Link to={`/product-details/${slug}`} className="asChild">
          <Button variant="outline" className="rounded-none hover:cursor-pointer">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
