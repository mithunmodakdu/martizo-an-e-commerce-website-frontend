import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const SIZE_MAP = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function StarRating({
  value,
  onChange,
  readOnly = false,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isInteractive = !readOnly && !!onChange;
  const displayValue = hovered ?? value;

  return (
    <div className="flex items-center gap-1" role={isInteractive ? "radiogroup" : "img"}
      aria-label={isInteractive ? "Rate this product" : `Rated ${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!isInteractive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => isInteractive && setHovered(star)}
          onMouseLeave={() => isInteractive && setHovered(null)}
          className={cn(
            "transition-colors",
            isInteractive ? "cursor-pointer" : "cursor-default"
          )}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              SIZE_MAP[size],
              star <= displayValue
                ? "fill-primary text-primary"
                : "fill-muted text-muted-foreground"
            )}
          />
        </button>
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

