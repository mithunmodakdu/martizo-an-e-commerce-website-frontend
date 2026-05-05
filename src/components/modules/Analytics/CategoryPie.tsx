import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CategoryPie = () => {
  const categoryData = [
    { name: "Electronics", value: 34, color: "var(--primary)" },
    { name: "Clothing", value: 28, color: "oklch(0.723 0.219 149.579)" },
    { name: "Home & Garden", value: 18, color: "oklch(0.871 0.15 154.449)" },
    { name: "Sports", value: 12, color: "oklch(0.527 0.154 150.069)" },
    { name: "Other", value: 8, color: "oklch(0.92 0.004 286.32)" },
  ];

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
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryData.map((entry, i) => (
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
          {categoryData.map((cat) => (
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
