/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Price, PriceValue } from "./Price";
import type { IProduct, IWishListItem } from "./product.types";
import StarRating from "../Shared/StarRating";
import { useState } from "react";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";
import { pad } from "../Shared/pad";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductListCard = ({ item }: { item: IProduct }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const {
    title,
    thumbnail,
    price: { regular, sale, currency },
    rating,
  } = item;

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
    <div className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/40 hover:shadow-[0_8px_30px_-5px_rgba(0,152,69,0.12)] transition-all duration-300">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-muted shrink-0 overflow-hidden">
        <img
          src={thumbnail}
          alt={`Thumbnail of ${title}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-card-foreground leading-snug truncate mb-1.5">
          {title}
        </h3>
        <StarRating rating={rating} />
        {/* wishlist button */}
        <Button
          onClick={handleWishlist}
          className={cn(
            " rounded-full bg-background/80 backdrop-blur-sm shadow transition-all duration-200 hover:scale-105 hover:cursor-pointer",
            wishlisted ? "text-destructive" : "text-foreground",
          )}
        >
          <Heart className={cn("w-3 h-3", wishlisted && "fill-destructive")} />
        </Button>
      </div>

      {/* Price*/}
      {/* Price */}
      <div className="flex flex-col gap-1.5">
        <Price
          onSale={sale != null}
          className="text-xs font-medium flex flex-col"
        >
          <PriceValue price={regular} currency={currency} variant="regular" />
          <PriceValue price={sale} currency={currency} variant="sale" />
        </Price>
        {sale && (
          <span className="text-xs font-medium text-primary ml-auto">
            SAVE BDT {regular - sale}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductListCard;
