import { cn } from "@/lib/utils";
import { useState } from "react";

export default function RegularBrandCard({ brand }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl p-4 cursor-pointer transition-all duration-200",
        hovered && "-translate-y-0.5",
      )}
      style={{
        background: hovered
          ? "oklch(0.5941 0.1635 150.03 / 0.05)"
          : "var(--card)",
        border: `1px solid ${hovered ? "oklch(0.5941 0.1635 150.03 / 0.3)" : "var(--border)"}`,
        boxShadow: hovered
          ? "0 4px 16px oklch(0.5941 0.1635 150.03 / 0.08)"
          : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* logo area */}
      <div className="mb-2 w-18 h-18 rounded-full overflow-hidden flex justify-center items-center">
        <img
          className="w-14 h-14"
          src={brand.brandLogo}
          alt={`Logo of${brand.name}`}
        />
      </div>
      <p
        className="text-base mt-1.5 transition-colors duration-200"
        style={{
          color: hovered ? "var(--primary)" : "var(--muted-foreground)",
        }}
      >
        {brand.tagline}
      </p>
      <span
        className="text-base mt-0.5 opacity-60"
        style={{ color: "var(--muted-foreground)" }}
      >
        {brand.totalProducts}+ products
      </span>
    </div>
  );
}
