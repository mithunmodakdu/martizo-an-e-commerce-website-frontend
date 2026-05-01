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
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";
import { pad } from "../Shared/pad";
import type { IProduct, IWishListItem } from "./product.types";
import StarRating from "../Shared/StarRating";

export const ProductCard = ({ item }: { item: IProduct }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const stockPercent = Math.round((item?.soldFromStock / item?.stock) * 100);
  const stockLeft = item?.stock - item?.soldFromStock;

  const badges = [
    {
      text: item?.discountPercentage
        ? `OFF ${item?.discountPercentage}%`
        : undefined,
      className: item?.discountPercentage ? "bg-destructive text-white" : undefined,
    },
    {
      text: item?.isFlashSale ? "Flash Sale" : undefined,
      className: item?.isFlashSale ? "bg-chart-2 text-white" : undefined,
    },
    {
      text: item?.isMartizoExclusive ? "Exclusive" : undefined,
      className: item?.isMartizoExclusive
        ? "bg-primary text-primary-foreground"
        : undefined,
    },
    {
      text: item?.isTrending ? "Trending" : undefined,
      className: item?.isTrending ? "bg-chart-3 text-white" : undefined,
    },
    {
      text: item?.isNewArrival ? "New" : undefined,
      className: item?.isNewArrival
        ? "bg-accent text-accent-foreground border border-border"
        : undefined,
    },
  ].filter((badge) => badge.text);

  const cartData: ICartItem = {
    productId: item?._id,
    name: item?.title,
    category: item?.category?._id,
    price: item?.price,
    quantity: 1,
    image: { src: item?.thumbnail, alt: `Image of ${item?.title}` },
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

  const handleWishlist = async () => {
    if (!wishlisted) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = pad(today.getMonth() + 1);
      const dd = pad(today.getDate());

      const formattedToday = dd + "/" + mm + "/" + yyyy;

      const wishlistItem: IWishListItem = {
        productId: item?._id,
        addedAt: formattedToday,
      };

      const toastId = toast.loading("Adding product to wishlist...");

      try {
        const res = await addToWishlist(wishlistItem).unwrap();

        if (res.success) {
          toast.success(res.message, { id: toastId });
          setWishlisted(true);
        }
      } catch (error: any) {
        console.log("error:", error);
        if (!error.data.success) {
          toast.error(error?.data?.message, { id: toastId });
          setWishlisted(false);
        }
      }
    } else {
      const removeToastId = toast.loading("Removing product from wishlist...");
      try {
        const res = await removeFromWishlist(item?._id).unwrap();

        if (res.success) {
          toast.success(res.message, { id: removeToastId });
          setWishlisted(false);
        }
      } catch (error: any) {
        if (!error.data.success) {
          toast.error(error.data.message, { id: removeToastId });
          setWishlisted(true);
        }
      }
    }
  };

  return (
    <Card className="overflow-hidden border border-border rounded-none bg-card py-0 shadow-md hover:shadow-xl transition-shadow duration-300  h-full flex flex-col">
      <CardHeader className="relative block p-0">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted shrink-0">
          <img
            src={item?.thumbnail}
            alt={`Thumbnail of ${item?.title}`}
            className="w-full h-full object-fill transition-transform duration-500 hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute start-2 top-2">
            <div className="flex flex-col">
              {badges?.map((badge) => (
                <div>
                 <Badge
                      className={badge?.className}
                    >
                      {badge.text}
                    </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* wishlist button */}
          <Button
            onClick={handleWishlist}
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
          {item?.title}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          <StarRating rating={item?.rating} />

          <span className="text-[11px] text-muted-foreground">
            ({item?.ratingCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <Price
            onSale={item?.price.sale != null}
            className="text-xs font-medium"
          >
            <PriceValue
              price={item?.price.regular}
              currency={item?.price.currency}
              variant="regular"
            />
            <PriceValue
              price={item?.price.sale}
              currency={item?.price.currency}
              variant="sale"
            />
          </Price>
          {item?.price.sale && (
            <span className="text-xs font-medium text-primary ml-auto">
              SAVE BDT {item?.price.regular - item?.price.sale}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">
              Sold{" "}
              <span className="text-card-foreground font-semibold">
                {item?.soldFromStock}
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

      <CardFooter className="px-3 pb-3 flex gap-5">
        {/* CTA Buttons */}
        <Button
          onClick={() => handleAddToCart(cartData)}
          className="rounded-none hover:cursor-pointer flex-1"
        >
          <ShoppingCart className="w-2 h-2 mr-1" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          className="rounded-none hover:cursor-pointer flex-1"
        >
          <Link to={`/product-details/${item?.slug}`} className="asChild">
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
