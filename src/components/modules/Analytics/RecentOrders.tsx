import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "#ORD-9821",
      customer: "Amina Hossain",
      avatar: "AH",
      amount: 249.99,
      status: "Delivered",
      time: "2m ago",
    },
    {
      id: "#ORD-9820",
      customer: "Rafiq Islam",
      avatar: "RI",
      amount: 89.5,
      status: "Processing",
      time: "14m ago",
    },
    {
      id: "#ORD-9819",
      customer: "Sumaiya Khan",
      avatar: "SK",
      amount: 429.0,
      status: "Shipped",
      time: "1h ago",
    },
    {
      id: "#ORD-9818",
      customer: "Tanvir Ahmed",
      avatar: "TA",
      amount: 159.99,
      status: "Delivered",
      time: "2h ago",
    },
    {
      id: "#ORD-9817",
      customer: "Nadia Begum",
      avatar: "NB",
      amount: 312.5,
      status: "Cancelled",
      time: "3h ago",
    },
  ];

  const statusConfig: Record<string, string> = {
    Delivered: "bg-chart-1/20 text-chart-3 border-chart-1/30",
    Processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Shipped: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Recent Orders
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest customer purchases
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-medium gap-1.5"
          >
            View All Orders <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border/60 bg-muted/30">
                {["Order ID", "Customer", "Amount", "Status", "Time", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr
                  key={order.id}
                  className={cn(
                    "border-b border-border/40 hover:bg-muted/30 transition-colors",
                    i === recentOrders.length - 1 && "border-b-0",
                  )}
                >
                  <td className="px-6 py-3.5 font-mono text-xs font-semibold text-muted-foreground">
                    {order.id}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="bg-primary/15 text-primary text-[10px] font-bold">
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-semibold">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold border",
                        statusConfig[order.status],
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-xs text-muted-foreground">
                    {order.time}
                  </td>
                  <td className="px-6 py-3.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-7 h-7">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Track Order</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
