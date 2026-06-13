import { Truck } from "lucide-react";

const TrackOrderPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      
        {/* Page Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
            <Truck className="w-3.5 h-3.5" />
            Real-time Tracking
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Track Your Order</h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Enter your transaction Id to get live updates on your shipment.
          </p>
        </div>

    </div>
  );
};

export default TrackOrderPage;