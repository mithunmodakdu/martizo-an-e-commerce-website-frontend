import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Badge,
  CheckCircle2,
  ChevronRight,
  Clock,
  XCircle,
} from "lucide-react";

function StatusIcon({ status }: { status: string }) {
  if (status === "completed")
    return <CheckCircle2 className="w-3.5 h-3.5 text-primary" />;
  if (status === "pending")
    return <Clock className="w-3.5 h-3.5 text-amber-500" />;
  return <XCircle className="w-3.5 h-3.5 text-destructive" />;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: "bg-primary/10 text-primary border-0",
    pending: "bg-amber-500/10 text-amber-600 border-0",
    failed: "bg-destructive/10 text-destructive border-0",
  };
  return (
    <Badge
      className={`text-[10px] font-medium capitalize px-2 py-0 h-5 ${styles[status]}`}
    >
      {status}
    </Badge>
  );
}

const RecentTransactions = () => {
  const transactions = [
    {
      id: "#ORD-9821",
      customer: "Riad Hossain",
      amount: 284.0,
      status: "completed",
      time: "2m ago",
    },
    {
      id: "#ORD-9820",
      customer: "Nusrat Jahan",
      amount: 149.5,
      status: "pending",
      time: "11m ago",
    },
    {
      id: "#ORD-9819",
      customer: "Tanvir Ahmed",
      amount: 520.0,
      status: "completed",
      time: "34m ago",
    },
    {
      id: "#ORD-9818",
      customer: "Sadia Islam",
      amount: 89.99,
      status: "failed",
      time: "1h ago",
    },
    {
      id: "#ORD-9817",
      customer: "Mehedi Hasan",
      amount: 340.0,
      status: "completed",
      time: "1h ago",
    },
    {
      id: "#ORD-9816",
      customer: "Fatema Akter",
      amount: 210.0,
      status: "pending",
      time: "2h ago",
    },
  ];

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pt-5 pb-3 px-5">
        <div>
          <CardTitle className="text-sm font-semibold">
            Recent Transactions
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest orders across all channels
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-primary hover:text-primary/80 gap-1 h-7 px-2"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        <div className="divide-y divide-border/50">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 hover:bg-muted/20 -mx-2 px-2 rounded-lg transition-colors duration-100"
            >
              <div className="flex items-center gap-3 min-w-0">
                <StatusIcon status={tx.status} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {tx.customer}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {tx.id} · {tx.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <StatusBadge status={tx.status} />
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  ${tx.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
