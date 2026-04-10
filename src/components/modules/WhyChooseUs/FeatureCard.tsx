import { cn } from "@/lib/utils";
import type { TFeature } from "./WhyChooseUs.types";
import { Card, CardContent } from "@/components/ui/card";

export const FeatureCard = ({ feature }: { feature: TFeature }) => {
  return (
    <Card className="group border hover:border-primary transition-colors duration-200 h-full">
      <CardContent className="p-5 flex flex-col gap-3 h-full">
        <div
          className={cn(
            "w-15 h-15 rounded-xl flex items-center justify-center shrink-0",
            "bg-primary/10 text-primary",
            "group-hover:bg-primary group-hover:text-primary-foreground",
            "transition-colors duration-200"
          )}
        >
          {feature.icon}
        </div>
        <h3 className="text-lg font-medium text-foreground">{feature.title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
}

