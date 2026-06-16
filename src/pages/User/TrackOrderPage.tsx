import type { IOrder } from "@/components/modules/Order/order.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useGetOrderByOrderNoQuery } from "@/redux/features/order/order.api";
import getFormattedDate from "@/utils/getFormattedDate";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";

// Types
type TStepStatus = "done" | "active" | "pending";

interface ITrackingStep {
  id: number;
  label: string;
  description: string;
  timestamp: string | null;
  status: TStepStatus;
  icon: React.ReactNode;
}

// Build timeline steps from order status
function buildSteps(order: IOrder): ITrackingStep[] {
  const createdAt = getFormattedDate(order.createdAt, true);
  const updatedAt = getFormattedDate(order.updatedAt, true);

  const STAGES: IOrder["status"][] = [
    "PENDING",
    "PAID",
    "PROCESSING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];
  const currentIdx = STAGES.indexOf(order.status);

  const definitions = [
    {
      label: "Order Placed",
      description: "Your order has been confirmed.",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      label: "Payment Confirmed",
      description: "Payment received successfully.",
      icon: <Package className="w-4 h-4" />,
    },
    {
      label: "Processing",
      description: "Items being packed and prepared.",
      icon: <Package className="w-4 h-4" />,
    },
    {
      label: "Shipped",
      description: "Your order is on its way.",
      icon: <Truck className="w-4 h-4" />,
    },
    {
      label: "Out for Delivery",
      description: "Your package is out for delivery today.",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Delivered",
      description: "Package delivered successfully.",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  return definitions.map((def, idx) => ({
    id: idx + 1,
    ...def,
    status:
      idx < currentIdx ? "done" : idx === currentIdx ? "active" : "pending",

    // Show timestamp only for done/active — use createdAt for first step, updatedAt for current
    timestamp: idx === 0 ? createdAt : idx === currentIdx ? updatedAt : null,
  }));
}

// StepNode
function StepNode({ step, isLast }: { step: ITrackingStep; isLast: boolean }) {
  const isDone = step.status === "done";
  const isActive = step.status === "active";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`
          flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 shrink-0
          ${isDone ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/30" : ""}
          ${isActive ? "bg-white border-primary text-primary shadow-lg shadow-primary/20 ring-4 ring-primary/10" : ""}
          ${step.status === "pending" ? "bg-muted border-border text-muted-foreground" : ""}
        `}
        >
          {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-1 mb-1 min-h-8 rounded-full transition-colors duration-500 ${isDone ? "bg-primary" : "bg-border"}`}
          />
        )}
      </div>

      <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
        <div className="flex items-center gap-2 mb-0.5">
          <p
            className={`text-sm font-semibold ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}
          >
            {step.label}
          </p>
          {isActive && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{step.description}</p>
        {step.timestamp && (
          <p className="text-[11px] text-muted-foreground/70 mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {step.timestamp}
          </p>
        )}
      </div>
    </div>
  );
}

// :::: TrackOrderPage ::::
const TrackOrderPage = () => {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<IOrder | null>(null);
  const [error, setError] = useState(false);
  const [showItems, setShowItems] = useState(false);
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
  const steps = order ? buildSteps(order) : [];
    
  // Flatten shipping address to one string
  const addressStr = order
    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}-${order.shippingAddress.postalCode}`
    : "";


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

              <Separator className="my-4" />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {/* Show estimated delivery only when available */}
                {order.estimatedDeliveryAt && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Est. Delivery
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {getFormattedDate(order.estimatedDeliveryAt, true)}
                    </p>
                  </div>
                )}

                {/* Payment method - always available */}
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Payment
                  </p>
                  <p className="font-semibold text-foreground text-sm">
                    {order.paymentMethod.replace("_", " ")}
                  </p>
                </div>

                {/* Carrier - only when shipped */}
                {order.carrier ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Carrier
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {order.carrier}
                    </p>
                  </div>
                ) : null}

                {/* Last location - only when shipped */}
                {order.lastLocation ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Last Location
                    </p>
                    <p className="font-semibold text-foreground text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {order.lastLocation}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Shipping to
                    </p>
                    <p className="font-semibold text-foreground text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {order.shippingAddress.city}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border">
            <CardContent className="p-5 pb-6">
              <h2 className="font-bold text-sm text-foreground mb-5">
                Shipment Progress
              </h2>
              <div>
                {steps.map((step, idx) => (
                  <StepNode
                    key={step.id}
                    step={step}
                    isLast={idx === steps.length - 1}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collapsible Order Items */}
          <Card className="border">
            <CardContent className="p-0">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
                onClick={() => setShowItems((v) => !v)}
              >
                <span className="font-bold text-sm text-foreground">
                  Order Items ({order.items.length})
                </span>
                {showItems ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {showItems && (
                <div className="border-t divide-y">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.variant ? `${item.variant} · ` : ""}Qty:{" "}
                          {item.quantity}
                          {item.price.sale && (
                            <span className="ml-2 line-through text-muted-foreground/60">
                              ৳{item.price.regular}
                            </span>
                          )}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground shrink-0">
                        {/* {formatPrice(item.price)} */}
                      </p>
                    </div>
                  ))}

                  {/* Order total breakdown */}
                  <div className="px-5 py-3 space-y-1 bg-muted/20">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Items subtotal</span>
                      <span>৳{order.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Shipping</span>
                      <span>৳{order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Tax</span>
                      <span>৳{order.taxPrice.toFixed(2)}</span>
                    </div>
                    <Separator className="my-1" />
                    <div className="flex justify-between text-sm font-bold text-foreground">
                      <span>Total</span>
                      <span>৳{order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Full shipping address */}
                  <div className="px-5 py-3 bg-muted/30 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">
                        {order.shippingAddress.name}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        {order.shippingAddress.phone}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-5">
                      {addressStr}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
