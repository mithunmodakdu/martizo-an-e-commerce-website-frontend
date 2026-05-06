import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, Star, TrendingDown, TrendingUp } from "lucide-react";

const TopProducts = () => {
  const topProducts = [
    {
      id: 1,
      name: "Wireless Pro Headphones",
      sales: 1842,
      revenue: 276300,
      rating: 4.8,
      trend: "up",
    },
    {
      id: 2,
      name: "Minimalist Watch Series X",
      sales: 1241,
      revenue: 198560,
      rating: 4.9,
      trend: "up",
    },
    {
      id: 3,
      name: "Running Shoes Elite",
      sales: 983,
      revenue: 147450,
      rating: 4.7,
      trend: "down",
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      sales: 876,
      revenue: 131400,
      rating: 4.6,
      trend: "up",
    },
    {
      id: 5,
      name: "Smart Home Hub",
      sales: 741,
      revenue: 111150,
      rating: 4.5,
      trend: "down",
    },
  ];

  return (
    <Card className="lg:col-span-2 border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Top Products
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Best performing by revenue
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {topProducts.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <span className="w-5 text-center text-xs font-bold text-muted-foreground">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">
                    {p.sales.toLocaleString()} sold
                  </span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="flex items-center gap-0.5 text-xs text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500" />
                    {p.rating}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  ${(p.revenue / 1000).toFixed(1)}K
                </p>
                <span
                  className={cn(
                    "flex items-center justify-end gap-0.5 text-xs font-medium",
                    p.trend === "up" ? "text-chart-3" : "text-destructive",
                  )}
                >
                  {p.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {p.trend === "up" ? "Up" : "Down"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
