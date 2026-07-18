import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrderStatsQuery } from "@/redux/features/stats.api";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CategoryPie = () => {
  const {data: orderStatsData} = useGetOrderStatsQuery(undefined);

  const ordersPerCategory = orderStatsData?.ordersPerCategory || [];
 
  const colors = [
    "var(--primary)",
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
    "var(--chart-7)",
    "var(--chart-8)",
    "var(--chart-9)",
    "var(--chart-10)",
    "var(--chart-11)"
    
  ]
  const ordersPerCategoryData = ordersPerCategory?.map((item, idx) => (
    { name: item?.category, 
      value: item?.totalOrders, 
      color: colors[idx] 
    }))

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Sales by Category
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Share of total revenue
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={ordersPerCategoryData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
            >
              {ordersPerCategoryData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number) => `${v}%`}
              contentStyle={{
                fontSize: 12,
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--card)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-3 space-y-2">
          {ordersPerCategoryData.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: cat.color }}
                />
                <span className="text-muted-foreground">{cat.name}</span>
              </div>
              <span className="font-semibold text-foreground">
                {cat.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPie;
