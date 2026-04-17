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
      <div className="flex justify-center mb-2">
        <img
          className="w-[60px] h-[60px] rounded-full"
          src="https://res.cloudinary.com/dbcykhgzd/image/upload/v1776269557/71ziaxkilct-1776269554162-sony-logo.png.png"
          alt=""
        />
      </div>
      <p
        className="text-[11px] mt-1.5 transition-colors duration-200"
        style={{
          color: hovered ? "var(--primary)" : "var(--muted-foreground)",
        }}
      >
        {brand.tagline}
      </p>
      <span
        className="text-[10px] mt-0.5 opacity-60"
        style={{ color: "var(--muted-foreground)" }}
      >
        {brand.products}+ products
      </span>
    </div>
  );
}
