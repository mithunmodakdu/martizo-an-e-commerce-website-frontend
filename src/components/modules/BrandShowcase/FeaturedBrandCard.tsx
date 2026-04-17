import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { IBrand } from "@/types";

export default function FeaturedBrandCard({ brand }: {brand: IBrand}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
        hovered && "-translate-y-1",
      )}
      style={{
        background: "var(--card)",
        border: `1px solid ${hovered ? "oklch(0.5941 0.1635 150.03 / 0.4)" : "var(--border)"}`,
        boxShadow: hovered
          ? "0 10px 36px oklch(0.5941 0.1635 150.03 / 0.14)"
          : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* top bar */}
      <div className="h-[3px]" style={{ background: "var(--primary)" }} />

      <div className="p-6">
        {/* badges row */}
        <div className="flex items-center justify-between mb-5">
          <Badge
            className="gap-1 text-[10px] font-semibold tracking-widest uppercase"
            style={{
              color: "var(--primary)",
              background: "oklch(0.5941 0.1635 150.03 / 0.08)",
              border: "1px solid oklch(0.5941 0.1635 150.03 / 0.2)",
            }}
          >
            <Sparkles size={10} />
            Featured
          </Badge>
          <span
            className="flex items-center gap-1 text-[11px] font-medium"
            style={{ color: "var(--muted-foreground)" }}
          >
            <TrendingUp size={15} style={{ color: "var(--primary)" }} />
            {brand.products}+ items
          </span>
        </div>

        {/* logo area */}
        <div className="flex justify-center mb-2">
          <img
            className="w-[60px] h-[60px] rounded-full"
            src="https://res.cloudinary.com/dbcykhgzd/image/upload/v1776269557/71ziaxkilct-1776269554162-sony-logo.png.png"
            alt=""
          />
        </div>

        <p
          className="text-sm text-center mb-4"
          style={{ color: "var(--muted-foreground)" }}
        >
          {brand.tagline}
        </p>

        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span
            className="text-[11px]"
            style={{ color: "var(--muted-foreground)" }}
          >
            Official partner
          </span>
          <button
            className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-75"
            style={{ color: "var(--primary)" }}
          >
            Shop Now <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
