import type { IOrder } from "@/components/modules/Order/order.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetOrderByOrderNoQuery } from "@/redux/features/order/order.api";
import { ArrowRight, Search, Truck } from "lucide-react";
import { useState } from "react";

const TrackOrderPage = () => {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<IOrder | null>(null);
  const [error, setError] = useState(false);
  console.log(order)
  const { data: orderData } = useGetOrderByOrderNoQuery(query);

  const handleTrack = () => {
    if (orderData) {
      setOrder(orderData);
      setError(false);
    } else {
      setOrder(null);
      setError(true);
    }
  };

  const STATUS_MAP: Record<IOrder["status"], { label: string; color: string }> =
    {
      PENDING: {
        label: "Pending",
        color: "bg-gray-100 text-gray-700 border-gray-200",
      },
      PAID: {
        label: "Payment Confirmed",
        color: "bg-blue-100 text-blue-700 border-blue-200",
      },
      PROCESSING: {
        label: "Processing",
        color: "bg-purple-100 text-purple-700 border-purple-200",
      },
      SHIPPED: {
        label: "Shipped",
        color: "bg-indigo-100 text-indigo-700 border-indigo-200",
      },
      OUT_FOR_DELIVERY: {
        label: "Out for Delivery",
        color: "bg-amber-100 text-amber-700 border-amber-200",
      },
      DELIVERED: {
        label: "Delivered",
        color: "bg-green-100 text-green-700 border-green-200",
      },
      CANCELLED: {
        label: "Cancelled",
        color: "bg-red-100 text-red-700 border-red-200",
      },
      FAILED: {
        label: "Failed",
        color: "bg-red-100 text-red-700 border-red-200",
      },
      REFUNDED: {
        label: "Refunded",
        color: "bg-red-100 text-red-700 border-red-200",
      },
    };

  const statusInfo = order ? STATUS_MAP[order.status] : null;

  return (
    <div className="w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
          <Truck className="w-3.5 h-3.5" />
          Real-time Tracking
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Track Your Order
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Enter your order no to get live updates on your shipment.
        </p>
      </div>

      {/* Search */}
      <Card className="border shadow-sm">
        <CardContent className="p-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9 h-11 text-sm"
                placeholder="e.g. MZ-ORD-2026-03-0008"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>
            <Button
              className="h-11 px-5 gap-2 font-semibold"
              onClick={handleTrack}
            >
              Track <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2.5 ml-1">
            Try:{" "}
            <button
              className="text-primary underline-offset-2 hover:underline"
              onClick={() => setQuery("MZ-ORD-2026-03-0008")}
            >
              MZ-ORD-2026-03-0008
            </button>
          </p>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border border-destructive/30 bg-destructive/5">
          <CardContent className="p-5 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
              <Search className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Order not found
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Double-check your transaction Id and try again. It may take a
                few hours after placing to appear.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {order && statusInfo && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Status Banner */}
          <Card className="border overflow-hidden">
            <div className="h-1 bg-primary w-full" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Order Number
                  </p>
                  <p className="font-bold text-foreground text-lg tracking-tight">
                    {order.orderNo}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Invoice: {order.invoiceNo}
                  </p>
                </div>
                <Badge
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusInfo.color}`}
                  variant="outline"
                >
                  {statusInfo.label}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
