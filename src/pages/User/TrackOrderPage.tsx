import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useGetOrderByTransactionIdQuery } from "@/redux/features/order/order.api";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";

// types
interface IOrderItem {
  name: string;
  variant: string;
  qty: number;
  price: string;
  image: string;
}

type TStepStatus = "done" | "active" | "pending";

interface ITrackingStep {
  id: number;
  label: string;
  description: string;
  timestamp: string | null;
  status: TStepStatus;
  icon: React.ReactNode;
}

interface ITrackingData {
  orderId: string;
  status: string;
  statusColor: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  lastLocation: string;
  steps: ITrackingStep[];
  items: IOrderItem[];
  shippingAddress: string;
}

// data
const TRACKING_DATA: Record<string, ITrackingData> = {
  "tran_id_1774417367854_755": {
    orderId: "ORD-2024-8821",
    status: "Out for Delivery",
    statusColor: "bg-amber-100 text-amber-700 border-amber-200",
    estimatedDelivery: "Today, by 8:00 PM",
    carrier: "FedEx",
    trackingNumber: "FX928374650192",
    lastLocation: "Dhaka Sorting Facility",
    steps: [
      {
        id: 1,
        label: "Order Placed",
        description: "Your order has been confirmed.",
        timestamp: "May 25, 9:14 AM",
        status: "done",
        icon: <ShoppingBag className="w-4 h-4" />,
      },
      {
        id: 2,
        label: "Processing",
        description: "Items packed and ready to ship.",
        timestamp: "May 26, 2:30 PM",
        status: "done",
        icon: <Package className="w-4 h-4" />,
      },
      {
        id: 3,
        label: "Shipped",
        description: "Picked up by FedEx carrier.",
        timestamp: "May 27, 10:05 AM",
        status: "done",
        icon: <Truck className="w-4 h-4" />,
      },
      {
        id: 4,
        label: "Out for Delivery",
        description: "On the way — arriving today.",
        timestamp: "May 29, 7:48 AM",
        status: "active",
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        id: 5,
        label: "Delivered",
        description: "Package delivered successfully.",
        timestamp: null,
        status: "pending",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
    ],
    items: [
      {
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Midnight Black",
        qty: 1,
        price: "৳4,299",
        image: "🎧",
      },
      {
        name: "USB-C Fast Charging Cable",
        variant: "2m / White",
        qty: 2,
        price: "৳599",
        image: "🔌",
      },
    ],
    shippingAddress: "12/A, Gulshan Avenue, Dhaka-1212",
  },
};

// Step Indicator
function StepNode({ step, isLast }: { step: ITrackingStep; isLast: boolean }) {
  const isDone = step.status === "done";
  const isActive = step.status === "active";

  return (
    <div className="flex gap-4">
      {/* Line + Icon */}
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
            className={`w-0.5 flex-1 mt-1 mb-1 min-h-[2rem] rounded-full transition-colors duration-500 ${
              isDone ? "bg-primary" : "bg-border"
            }`}
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
        <div className="flex items-center gap-2 mb-0.5">
          <p
            className={`text-sm font-semibold ${
              step.status === "pending"
                ? "text-muted-foreground"
                : "text-foreground"
            }`}
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

// TrackOrderPage
export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const {data: orderData} = useGetOrderByTransactionIdQuery(query);
  console.log(orderData)
  const [data, setData] = useState<ITrackingData | null>(null);
  const [error, setError] = useState(false);
  const [showItems, setShowItems] = useState(false);

  function handleTrack() {
    const trimmed = query.trim();

    if (TRACKING_DATA[trimmed]) {
      setData(TRACKING_DATA[trimmed]);
      setError(false);
    } else {
      setData(null);
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Page Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 px-3 py-2 rounded-full mb-3">
            <Truck className="w-3.5 h-3.5" />
            Real-time Tracking
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Track Your Order
          </h1>
          <p className="text-muted-foreground text-base max-w-sm mx-auto">
            Enter your order ID or tracking number to get live updates on your
            shipment.
          </p>
        </div>

        {/* Search Card */}
        <Card className="border shadow-sm">
          <CardContent className="p-5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-9 h-11 text-sm"
                  placeholder="Write your transaction Id e.g. tran_id_1774417367854_755"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                />
              </div>
              <Button
                className="h-11 px-5 gap-2 font-semibold"
                onClick={handleTrack}
              >
                Track
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2.5 ml-1">
              Try:{" "}
              <button
                className="text-primary underline-offset-2 hover:underline"
                onClick={() => {
                  setQuery("tran_id_1774417367854_755");
                }}
              >
                tran_id_1774417367854_755
              </button>
            </p>
          </CardContent>
        </Card>

        {/* Error Card */}
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
                  Double-check your transaction ID and try again.
                  It may take a few hours after placing to appear.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Tracking */}
        {data && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1500">
            {/* Order Tracking Status Banner */}
            <Card className="border overflow-hidden">
              <div className="h-1 bg-primary w-full" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Order ID
                    </p>
                    <p className="font-bold text-foreground text-lg tracking-tight">
                      {data.orderId}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${data.statusColor}`}
                  >
                    {data.status}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Est. Delivery
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {data.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Carrier
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {data.carrier}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Last Location
                    </p>
                    <p className="font-semibold text-foreground text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {data.lastLocation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step Indicator Timeline */}
            <Card className="border">
              <CardContent className="p-5 pb-6">
                <h2 className="font-bold text-sm text-foreground mb-5">
                  Shipment Progress
                </h2>
                <div>
                  {data.steps.map((step, idx) => (
                    <StepNode
                      key={step.id}
                      step={step}
                      isLast={idx === data.steps.length - 1}
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
                    Order Items ({data?.items.length})
                  </span>
                  {showItems ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>

                {showItems && (
                  <div className="border-t divide-y">
                    {data?.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                          {item.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.variant} · Qty: {item.qty}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-foreground shrink-0">
                          {item.price}
                        </p>
                      </div>
                    ))}
                    <div className="px-5 py-3 bg-muted/30 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Delivering to:{" "}
                        <span className="text-foreground font-medium">
                          {data?.shippingAddress}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <RotateCcw className="w-3.5 h-3.5" />
                Request Return
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Phone className="w-3.5 h-3.5" />
                Contact Support
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs text-muted-foreground ml-auto"
                onClick={() => {
                  setData(null);
                  setQuery("");
                  setError(false);
                }}
              >
                Track another order
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
