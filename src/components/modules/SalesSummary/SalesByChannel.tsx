import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, LinkIcon, MousePointerClick, Share2, Zap } from "lucide-react";

const SalesByChannel = () => {
  const channels = [
    {
      name: "Organic Search",
      revenue: 38400,
      share: 36,
      icon: Globe,
      change: +4.2,
    },
    {
      name: "Paid Ads",
      revenue: 29100,
      share: 27,
      icon: MousePointerClick,
      change: -1.8,
    },
    {
      name: "Referral",
      revenue: 19800,
      share: 19,
      icon: LinkIcon,
      change: +8.1,
    },
    { name: "Social", revenue: 11200, share: 11, icon: Share2, change: +2.3 },
    { name: "Direct", revenue: 7500, share: 7, icon: Zap, change: -0.5 },
  ];

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pt-5 pb-2 px-5">
        <CardTitle className="text-sm font-semibold">
          Sales by Channel
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Revenue source breakdown
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-3.5 mt-1">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const isUp = ch.change >= 0;
          return (
            <div key={ch.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {ch.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground tabular-nums">
                    ${(ch.revenue / 1000).toFixed(1)}k
                  </span>
                  <span
                    className={`font-semibold tabular-nums w-10 text-right ${isUp ? "text-primary" : "text-destructive"}`}
                  >
                    {isUp ? "+" : ""}
                    {ch.change}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${ch.share}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-7 text-right tabular-nums">
                  {ch.share}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SalesByChannel;
