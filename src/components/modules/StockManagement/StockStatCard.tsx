import { cn } from "@/lib/utils";

export default function StockStatCard({ label, value, sub, icon: Icon, accent }: { label: string; value: string | number; sub?: string; icon: React.ElementType; accent: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4 hover:shadow-sm transition-shadow">
      <div className={cn("mt-0.5 rounded-lg p-2.5", accent)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight font-mono">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}
