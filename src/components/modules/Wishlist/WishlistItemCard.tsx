/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ShoppingCart,
  Trash2,
  Share2,
  MoreVertical,
  PackageCheck,
  PackageX,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import StarRating from "../Shared/StarRating";
import type { IWishListCardItem } from "./wishlist.interface";
import { Price, PriceValue } from "../Product/Price";
import { useRemoveFromWishlistMutation } from "@/redux/features/wishlist/wishlist.api";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import type { ICartItem } from "../Cart/cart.types";

export default function WishlistItemCard({
  item,
}: {
  item: IWishListCardItem;
}) {

  const [addToCart] = useAddToCartMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const {
    productId: {
      _id,
      title,
      category: {_id: categoryId, name: categoryName},
      thumbnail,
      price: { regular, sale, currency },
      discountPercentage,
      stock,
      rating,
      ratingCount,
    },
    addedAt,
  } = item;

   const cartData: ICartItem = {
      productId: _id,
      name: title,
      category: categoryId,
      price: {regular, sale, currency},
      quantity: 1,
      image: { src: thumbnail, alt: `Image of ${title}` },
    };
  
    const handleAddToCart = async (data: ICartItem) => {
      const toastId = toast.loading("Adding product to cart...");
  
      try {
        const res = await addToCart(data).unwrap();
        if (res.success) {
          toast.success(res.message, { id: toastId });
        }
      } catch (error: any) {
        if (!error.data.success) {
          toast.error(error.data.message, { id: toastId });
        }
      }
    };

   const handleRemove = async (productId: string) => {
    const toastId = toast.loading("Removing product from the wishlist...");
    try {
      const res = await removeFromWishlist(productId);
      if (res.data.success) {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Card className="group overflow-hidden border border-border/60 hover:border-border hover:shadow-md transition-all duration-300 bg-card">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-40 h-44 sm:h-auto shrink-0 overflow-hidden bg-muted">
            <img
              src={thumbnail}
              alt={`Thumbnail of ${title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discountPercentage && (
              <Badge className="absolute top-2 left-2 bg-rose-500 hover:bg-rose-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-sm">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4 gap-2 justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <Badge variant="outline" className="text-xs w-fit text-muted-foreground">
                <Tag size={10} className="mr-1" />
                {categoryName}
              </Badge>
                  <h3 className="font-semibold text-foreground leading-snug mt-0.5 mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground">Added to wishlist on {addedAt}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <MoreVertical size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied!");
                      }}
                    >
                      <Share2 size={14} className="mr-2" />
                      Share
                    </DropdownMenuItem>                    
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2">
                <StarRating rating={rating} />
                <span className="text-xs text-muted-foreground">
                  {rating} ({ratingCount.toLocaleString()})
                </span>
              </div>             
            </div>

            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-5">
                  <Price onSale={sale != null} className="text-xs font-medium">
                    <PriceValue
                      price={regular}
                      currency={currency}
                      variant="regular"
                    />
                    <PriceValue
                      price={sale}
                      currency={currency}
                      variant="sale"
                    />
                  </Price>
                  {sale && (
                    <span className="text-xs font-medium text-primary ml-auto">
                      SAVE BDT {regular - sale}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {stock > 0 ? (
                    <>
                      <PackageCheck size={12} className="text-emerald-500" />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        In Stock
                      </span>
                    </>
                  ) : (
                    <>
                      <PackageX size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-medium">
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>
              </div>

              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors cursor-pointer"
                        onClick={() => handleRemove(_id)}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove from wishlist</TooltipContent>
                  </Tooltip>

                  <Button
                    size="sm"
                    className="gap-1.5 h-9 px-4 cursor-pointer"
                    disabled={!(stock > 0)}
                    onClick={() => handleAddToCart(cartData)}
                  >
                    <ShoppingCart size={14} />
                    {stock > 0 ? "Add to Cart" : "Notify Me"}
                  </Button>
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
