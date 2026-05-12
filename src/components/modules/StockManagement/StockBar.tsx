import { cn } from "@/lib/utils";

export default function StockBar({ quantity, min, max }: { quantity: number; min: number; max: number }) {
  const pct = max === 0 ? 0 : Math.min((quantity / max) * 100, 100);
  const isLow = quantity < min;
  const isOver = quantity > max;
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="relative h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full transition-all duration-500",
            isOver ? "bg-blue-500" : isLow ? "bg-amber-500" : "bg-primary"
          )}
          style={{ width: `${pct}%` }}
        />
        {/* min threshold marker */}
        <div
          className="absolute top-0 h-full w-px bg-destructive"
          style={{ left: `${(min / max) * 100}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground w-8 text-right">{quantity}</span>
    </div>
  );
}
