import { CheckCheck, CheckCircle2, Clock, RefreshCw, TrendingUp, XCircle } from "lucide-react";
import type { TOrderStatus } from "./order.interface";

export const ORDER_STATUS_CONFIG: Record<
  TOrderStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode; className: string }
> = {
  PENDING: {
    label: "Pending",
    variant: "outline",
    icon: <Clock className="h-3 w-3" />,
    className: "border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  PAID: {
    label: "Paid",
    variant: "outline",
    icon: <CheckCheck className="h-3 w-3" />,
    className: "border-green-300 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  },
  PROCESSING: {
    label: "Processing",
    variant: "outline",
    icon: <RefreshCw className="h-3 w-3" />,
    className: "border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  SHIPPED: {
    label: "Shipped",
    variant: "outline",
    icon: <TrendingUp className="h-3 w-3" />,
    className: "border-violet-300 bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  },
  DELIVERED: {
    label: "Delivered",
    variant: "outline",
    icon: <CheckCircle2 className="h-3 w-3" />,
    className: "border-green-300 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  },
  OUT_FOR_DELIVERY: {
    label: "Delivered",
    variant: "outline",
    icon: <CheckCircle2 className="h-3 w-3" />,
    className: "border-green-300 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "outline",
    icon: <XCircle className="h-3 w-3" />,
    className: "border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  FAILED: {
    label: "Cancelled",
    variant: "outline",
    icon: <XCircle className="h-3 w-3" />,
    className: "border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  REFUNDED: {
    label: "Refunded",
    variant: "outline",
    icon: <RefreshCw className="h-3 w-3" />,
    className: "border-gray-300 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700",
  },
};

export const PAGE_SIZE_OPTIONS = [10, 20, 50];
