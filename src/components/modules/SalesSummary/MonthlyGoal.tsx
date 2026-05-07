import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const MonthlyGoal = () => {
  const monthlyGoal = { current: 87400, target: 120000 };
  const goalPct = Math.round((monthlyGoal.current / monthlyGoal.target) * 100);
  const remaining = monthlyGoal.target - monthlyGoal.current;

  return (
    <Card className="border-border/60 shadow-sm flex flex-col">
      <CardHeader className="pt-5 pb-2 px-5">
        <CardTitle className="text-sm font-semibold">Monthly Goal</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Revenue target — May 2026
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-5 flex flex-col gap-5 flex-1 justify-between">
        <div>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              ${(monthlyGoal.current / 1000).toFixed(1)}k
            </span>
            <span className="text-sm text-muted-foreground mb-1">
              / ${(monthlyGoal.target / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{goalPct}% achieved</span>
              <span className="text-muted-foreground">
                ${(remaining / 1000).toFixed(1)}k to go
              </span>
            </div>
            <Progress value={goalPct} className="h-2.5 bg-muted" />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          {[
            { label: "New customers", current: 312, target: 400, unit: "" },
            { label: "Avg. order size", current: 68, target: 75, unit: "$" },
            { label: "Repeat buyers", current: 58, target: 70, unit: "%" },
          ].map((g) => {
            const p = Math.min(Math.round((g.current / g.target) * 100), 100);
            return (
              <div key={g.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{g.label}</span>
                  <span className="font-medium text-foreground">
                    {g.unit}
                    {g.current}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      / {g.unit}
                      {g.target}
                    </span>
                  </span>
                </div>
                <Progress value={p} className="h-1.5 bg-muted" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyGoal;
