import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConversionFunnel = () => {
  const funnelStages = [
  { label: "Visitors",     count: 48320, pct: 100,  bar: "bg-primary/30" },
  { label: "Product Views",count: 21440, pct: 44.4, bar: "bg-primary/45" },
  { label: "Add to Cart",  count: 8910,  pct: 18.4, bar: "bg-primary/60" },
  { label: "Checkout",     count: 3620,  pct: 7.5,  bar: "bg-primary/80" },
  { label: "Purchased",    count: 1284,  pct: 2.7,  bar: "bg-primary"    },
];

  return (
    <Card className="border-border/60 shadow-sm">
          <CardHeader className="pt-5 pb-2 px-5">
            <CardTitle className="text-sm font-semibold">Conversion Funnel</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Visitor → Purchase pipeline</p>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-2.5 mt-1">
            {funnelStages.map((stage, i) => (
              <div key={stage.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-4 text-center font-mono">{i + 1}</span>
                    <span className="font-medium text-foreground">{stage.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground tabular-nums">
                      {stage.count.toLocaleString()}
                    </span>
                    <span className="font-semibold text-foreground w-10 text-right tabular-nums">
                      {stage.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stage.bar}`}
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
                {i < funnelStages.length - 1 && (
                  <p className="text-[10px] text-muted-foreground/60 text-right">
                    {((funnelStages[i + 1].count / stage.count) * 100).toFixed(1)}% pass-through
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

  );
};

export default ConversionFunnel;