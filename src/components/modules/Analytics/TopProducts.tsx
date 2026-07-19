import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetProductStatsQuery } from "@/redux/features/stats.api";
import { Eye, Star, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const TopProducts = () => {
  const {data: productStatsData} = useGetProductStatsQuery(undefined);
  console.log(productStatsData)
  const topProductsData = productStatsData?.topProductsByRevenue?.map((item, idx) => ( {
      id: idx + 1,
      name: item.productName,
      sales: item.totalQuantity
,
      revenue: item.totalRevenue
,
      rating: 4.8,
      trend: "up",
    }));


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
         <Link to={"/products"}>
          <Button variant="outline" size="sm" className="text-xs text-primary hover:cursor-pointer">
            View All Products
          </Button>
         </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {topProductsData?.map((p, i) => (
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
