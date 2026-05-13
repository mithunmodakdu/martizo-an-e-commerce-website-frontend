import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export interface IStatCard {
  title: string;
  value: string | number;
  change?: string | undefined;
  changeType?: "up" | "down" | undefined;
  icon: React.ReactNode;
  sub?: string | undefined;
  accent?: string | undefined;
}

const StatCard = ({
 item
}: {
  item: IStatCard
}) =>{
  const { title,
  value,
  change,
  changeType,
  icon,
  sub,
accent} = item;

  const isUp = changeType === "up";
  return (
    <Card className="relative overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 -translate-y-6 translate-x-6 pointer-events-none" />
      <CardContent className="pt-6 pb-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
            <p className="text-xl font-bold tracking-tight text-foreground" >
              {value}
            </p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
          </div>
          <div className={`p-2.5 rounded-xl bg-primary/10 ${accent && accent}`}>
           {icon}
          </div>
        </div>
        {change && (<div className="mt-4 flex items-center gap-1.5">
          <span className={cn("flex items-center gap-0.5 text-xs font-semibold", isUp ? "text-chart-3" : "text-destructive")}>
            {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>)}
      </CardContent>
    </Card>
  );
}

export default StatCard;
