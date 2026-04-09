import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {ShoppingCart, Heart, Star} from "lucide-react";
import { cn } from "@/lib/utils";


export function FlashProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const stockPercent = Math.round((product.stockSold / product.stockTotal) * 100);
  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );
  const stockLeft = product.stockTotal - product.stockSold;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Card className="overflow-hidden border border-border bg-card shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-2.5 left-2.5 bg-destructive hover:bg-destructive text-white font-bold text-xs px-2 py-0.5 rounded-md shadow">
          -{discount}%
        </Badge>
        {product.tag && (
          <Badge
            variant="secondary"
            className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold"
          >
            {product.tag}
          </Badge>
        )}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={cn(
            "absolute top-2.5 right-2.5 p-1.5 rounded-full bg-background/80 backdrop-blur-sm shadow transition-all duration-200 hover:scale-110",
            wishlisted ? "text-destructive" : "text-muted-foreground"
          )}
        >
          <Heart className={cn("w-3.5 h-3.5", wishlisted && "fill-destructive")} />
        </button>
      </div>

      <CardContent className="pt-3 px-3 pb-0 space-y-2 flex-1">
        <h3 className="font-semibold text-card-foreground text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "text-[var(--chart-2)] fill-[var(--chart-2)]"
                    : "text-border fill-border"
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-extrabold text-card-foreground tracking-tight">
            ${product.salePrice}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ${product.originalPrice}
          </span>
          <span className="text-xs font-semibold text-primary ml-auto">
            Save ${product.originalPrice - product.salePrice}
          </span>
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">
              Sold <span className="text-card-foreground font-semibold">{product.stockSold}</span>
            </span>
            <span className={cn("font-semibold", stockLeft <= 10 ? "text-destructive" : "text-muted-foreground")}>
              {stockLeft <= 10 ? `🔥 ${stockLeft} left` : `${stockLeft} left`}
            </span>
          </div>
          <Progress value={stockPercent} className="h-1.5 bg-muted [&>div]:bg-primary" />
        </div>
      </CardContent>

      <CardFooter className="px-3 pt-3 pb-3">
        <Button
          size="sm"
          onClick={handleAddToCart}
          className={cn(
            "w-full text-xs font-semibold h-9 rounded-lg transition-all duration-200",
            addedToCart
              ? "bg-[var(--chart-3)] hover:bg-[var(--chart-3)] text-primary-foreground"
              : "bg-primary hover:bg-[var(--chart-4)] text-primary-foreground hover:scale-[1.02]"
          )}
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
          {addedToCart ? "Added ✓" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}