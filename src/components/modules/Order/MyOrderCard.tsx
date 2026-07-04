import { useState } from "react";
import type { IOrder, IOrderItem } from "./order.interface";
import OrderStatusBadge from "./OrderStatusBadge";
import getFormattedDate from "@/utils/getFormattedDate";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

const MyOrderCard = ({ order }: { order: IOrder }) => {
  console.log(order);
  const [open, setOpen] = useState(false);
  const { orderNo, createdAt, status, totalPrice, items, shippingAddress } = order;

  const flattenAddress = shippingAddress
    ? `${shippingAddress.address}, ${shippingAddress.city}-${shippingAddress.postalCode}`
    : "";

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-colors hover:border-border/80">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-5 py-4 gap-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center flex-wrap gap-3">
          <span className="text-sm font-medium">{orderNo}</span>
          <span className="text-xs text-muted-foreground">
            {getFormattedDate(createdAt as Date)}
          </span>
          <OrderStatusBadge status={status} />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-medium">BDT {totalPrice}</span>
          {open ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="border-t border-border px-5 py-4">
          {/* Items */}
          <div className="flex flex-col gap-3 mb-4">
            {items.map((item: IOrderItem, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center text-xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium flex-shrink-0">
                  BDT {item.price.sale? item.price.sale : item.price.regular }
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-3 flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              {flattenAddress}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyOrderCard;
