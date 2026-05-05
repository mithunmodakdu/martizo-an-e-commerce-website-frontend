import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from "@/components/modules/Analytics/CustomTooltip";

const RevenueChart = () => {
  const revenueData = [
    { month: "Jan", revenue: 42000, orders: 310 },
    { month: "Feb", revenue: 38500, orders: 280 },
    { month: "Mar", revenue: 51200, orders: 395 },
    { month: "Apr", revenue: 47800, orders: 362 },
    { month: "May", revenue: 63100, orders: 481 },
    { month: "Jun", revenue: 58400, orders: 440 },
    { month: "Jul", revenue: 72000, orders: 553 },
    { month: "Aug", revenue: 68900, orders: 521 },
    { month: "Sep", revenue: 79200, orders: 604 },
    { month: "Oct", revenue: 84500, orders: 648 },
    { month: "Nov", revenue: 97300, orders: 745 },
    { month: "Dec", revenue: 112000, orders: 861 },
  ];

  return (
    <Card className="lg:col-span-2 border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Revenue & Orders
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Monthly performance for 2025
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
              Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-chart-1 inline-block" />
              Orders
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={revenueData}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.15}
                />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="oklch(0.871 0.15 154.449)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="oklch(0.871 0.15 154.449)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#revGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--primary)" }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="oklch(0.871 0.15 154.449)"
              strokeWidth={2}
              fill="url(#ordGrad)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
