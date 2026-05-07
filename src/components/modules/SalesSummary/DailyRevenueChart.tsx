import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "./ChartTooltip";

const DailyRevenueChart = () => {
  const revenueData = [
    { day: "May 1", revenue: 3200, projected: 3000 },
    { day: "May 2", revenue: 4100, projected: 3200 },
    { day: "May 3", revenue: 2900, projected: 3400 },
    { day: "May 4", revenue: 5200, projected: 3600 },
    { day: "May 5", revenue: 4800, projected: 3800 },
    { day: "May 6", revenue: 6100, projected: 4000 },
    { day: "May 7", revenue: 5700, projected: 4200 },
    { day: "May 8", revenue: 7300, projected: 4400 },
    { day: "May 9", revenue: 6500, projected: 4600 },
    { day: "May 10", revenue: 8200, projected: 4800 },
    { day: "May 11", revenue: 7100, projected: 5000 },
    { day: "May 12", revenue: 9400, projected: 5200 },
    { day: "May 13", revenue: 8800, projected: 5400 },
    { day: "May 14", revenue: 10200, projected: 5600 },
  ];

  const monthlyGoal = { current: 87400, target: 120000 };

  return (
    <Card className="xl:col-span-2 border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pt-5 pb-2 px-5">
        <div>
          <CardTitle className="text-sm font-semibold">Daily Revenue</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Actual vs projected · last 14 days
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-0.5">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-primary rounded inline-block" />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 border-t-2 border-dashed border-muted-foreground inline-block" />
            Projected
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <ResponsiveContainer width="100%" height={210}>
          <LineChart
            data={revenueData}
            margin={{ top: 8, right: 12, bottom: 0, left: -10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.92 0.004 286.32)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "oklch(0.552 0.016 285.938)" }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "oklch(0.552 0.016 285.938)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<ChartTooltip />} />
            <ReferenceLine
              y={monthlyGoal.target / 30}
              stroke="oklch(0.841 0.238 128.85)"
              strokeDasharray="4 3"
              strokeWidth={1}
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="oklch(0.841 0.238 128.85)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="oklch(0.5941 0.1635 150.03)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 0,
                fill: "oklch(0.5941 0.1635 150.03)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DailyRevenueChart;
