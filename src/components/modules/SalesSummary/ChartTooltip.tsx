/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-lg text-xs space-y-1">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <div
          key={p.name}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium text-foreground">
            ৳{p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
