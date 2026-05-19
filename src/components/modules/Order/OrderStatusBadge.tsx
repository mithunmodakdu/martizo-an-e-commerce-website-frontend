import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_CONFIG } from "./order.constants";
import type { TOrderStatus } from "./order.interface";

const OrderStatusBadge = ({ status }: { status: TOrderStatus }) => {
  const config = ORDER_STATUS_CONFIG[status];
  return (
    <Badge variant="outline" className={`flex w-fit items-center gap-1.5 px-2 py-0.5 text-xs font-medium ${config?.className}`}>
      {config?.icon}
      {config?.label}
    </Badge>
  );
};

export default OrderStatusBadge;
