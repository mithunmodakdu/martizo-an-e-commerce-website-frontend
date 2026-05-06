import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const WeeklyVisitors = () => {
  const weeklyVisitors = [
    { day: "Mon", visitors: 1240 },
    { day: "Tue", visitors: 1890 },
    { day: "Wed", visitors: 2210 },
    { day: "Thu", visitors: 1750 },
    { day: "Fri", visitors: 2890 },
    { day: "Sat", visitors: 3240 },
    { day: "Sun", visitors: 2650 },
  ];

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Weekly Visitors
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Unique store visits this week
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1 mb-2">
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            17,860
          </span>
          <span className="text-xs text-chart-3 font-semibold flex items-center mb-1">
            <TrendingUp className="w-3 h-3 mr-0.5" /> +8.4%
          </span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart
            data={weeklyVisitors}
            barSize={22}
            margin={{ left: -20, right: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="visitors"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              opacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyVisitors;
