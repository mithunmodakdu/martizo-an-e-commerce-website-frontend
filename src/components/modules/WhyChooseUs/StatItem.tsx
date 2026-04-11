import { cn } from "@/lib/utils";
import type { TStat } from "./WhyChooseUs.types";

export const StatItem = ({ stat, isLast }: { stat: TStat; isLast: boolean }) =>{
  return (
    <div
      className={cn(
        "py-5 px-4 text-center",
        !isLast && "border-b sm:border-b-0 sm:border-r border-border"
      )}
    >
      <p className="text-xl sm:text-2xl font-medium text-primary leading-none mb-1">
        {stat.value}
      </p>
      <p className="text-base text-muted-foreground">{stat.label}</p>
    </div>
  );
}

