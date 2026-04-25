import { ChevronRight } from "lucide-react";

const statusStyles = {
  success: { icon: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/40", text: "text-green-700 dark:text-green-400" },
  info:    { icon: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-950/40",   text: "text-blue-700 dark:text-blue-400"   },
  warning: { icon: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400" },
};


export const OrderRow = ({ order }) =>{
  const Icon = order.icon;
  const s = statusStyles[order.variant];
  return (
    <div className="flex items-center justify-between py-3.5 group cursor-pointer hover:bg-muted/50 px-2 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${s.bg}`}>
          <Icon className={`w-4 h-4 ${s.icon}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground font-mono tracking-tight">{order.id}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">{order.total}</p>
          <span className={`text-xs font-medium ${s.text}`}>{order.status}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
      </div>
    </div>
  );
}
