
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
  Tag,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { toast } from "sonner";
import StarRating from "../Shared/StarRating";


export default function WishlistItemCard({ item }) {
 

  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;


  return (
    <Card className="group overflow-hidden border border-border/60 hover:border-border hover:shadow-md transition-all duration-300 bg-card">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-40 h-44 sm:h-auto shrink-0 overflow-hidden bg-muted">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discount && (
              <Badge className="absolute top-2 left-2 bg-rose-500 hover:bg-rose-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-sm">
                -{discount}%
              </Badge>
            )}
            {item.tags.includes("popular") && (
              <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-sm">
                Popular
              </Badge>
            )}
          </div>


          {/* Content */}
          <div className="flex flex-col flex-1 p-4 gap-2 justify-between">
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {item.brand}
                  </p>
                  <h3 className="font-semibold text-foreground leading-snug mt-0.5">
                    {item.name}
                  </h3>
                </div>


                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
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
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      
                    >
                      <Trash2 size={14} className="mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>


              <div className="flex items-center gap-2">
                <StarRating rating={item.rating} />
                <span className="text-xs text-muted-foreground">
                  {item.rating} ({item.reviews.toLocaleString()})
                </span>
              </div>


              <Badge variant="outline" className="text-xs w-fit">
                <Tag size={10} className="mr-1" />
                {item.category}
              </Badge>
            </div>


            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-foreground">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {item.inStock ? (
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
                        className="h-9 w-9 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
                        
                      >
                        <Trash2 size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove from wishlist</TooltipContent>
                  </Tooltip>


                  <Button
                    size="sm"
                    className="gap-1.5 h-9 px-4"
                    disabled={!item.inStock}
                    
                  >
                    <ShoppingCart size={14} />
                    {item.inStock ? "Add to Cart" : "Notify Me"}
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
