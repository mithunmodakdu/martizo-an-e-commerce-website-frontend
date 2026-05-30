import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";

const TRACKING_DATA = {
  "ORD-2024-8821": {
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

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);


  function handleTrack() {
    const trimmed = query.trim().toUpperCase();

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
                  placeholder="e.g. ORD-2024-8821"
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
                  setQuery("ORD-2024-8821");
                }}
              >
                ORD-2024-8821
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
                  Double-check your order ID or tracking number and try again.
                  It may take a few hours after placing to appear.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  );
}
