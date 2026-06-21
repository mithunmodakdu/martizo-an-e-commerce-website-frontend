import type { IOrder } from "@/components/modules/Order/order.interface";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetAllOrdersQuery } from "@/redux/features/order/order.api";
import { useGetMeQuery } from "@/redux/features/users/users.api";
import Loading from "@/utils/Loading";
import getFormattedDate from "@/utils/getFormattedDate";
import {
  CalendarDays,
  Clock3,
  Package,
  ReceiptText,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useMemo, type ReactNode } from "react";

const STATUS_STYLES: Record<IOrder["status"], string> = {
  PENDING: "bg-gray-100 text-gray-700 border-gray-200",
  PAID: "bg-blue-100 text-blue-700 border-blue-200",
  PROCESSING: "bg-purple-100 text-purple-700 border-purple-200",
  SHIPPED: "bg-indigo-100 text-indigo-700 border-indigo-200",
  OUT_FOR_DELIVERY: "bg-amber-100 text-amber-700 border-amber-200",
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  FAILED: "bg-red-100 text-red-700 border-red-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  REFUNDED: "bg-slate-100 text-slate-700 border-slate-200",
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

export default function MyOrdersPage() {
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined);
  const { data: ordersData, isLoading: ordersLoading } =
    useGetAllOrdersQuery(undefined);

  const currentUserId =
    meData?.data?._id ?? meData?.data?.id ?? meData?.data?.user?._id;

  const myOrders = useMemo(() => {
    const orders = (ordersData?.data ?? []) as IOrder[];

    if (!currentUserId) {
      return [];
    }

    return orders.filter((order: IOrder) => order?.userId?._id === currentUserId);
  }, [currentUserId, ordersData]);

  const stats = useMemo(() => {
    const totalOrders = myOrders.length;
    const deliveredOrders = myOrders.filter(
      (order: IOrder) => order.status === "DELIVERED",
    ).length;
    const pendingOrders = myOrders.filter((order: IOrder) =>
      ["PENDING", "PAID", "PROCESSING", "SHIPPED", "OUT_FOR_DELIVERY"].includes(
        order.status,
      ),
    ).length;
    const totalSpent = myOrders.reduce(
      (sum: number, order: IOrder) =>
        sum + (order.totalPrice ?? order.itemsPrice ?? 0),
      0,
    );

    return {
      totalOrders,
      deliveredOrders,
      pendingOrders,
      totalSpent,
    };
  }, [myOrders]);

  const isLoading = meLoading || ordersLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="relative space-y-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.14),transparent_38%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_36%)]" />

      <Card className="relative overflow-hidden border-border/60 bg-linear-to-br from-background via-primary/5 to-background shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_55%)] opacity-60" />
        <CardContent className="relative p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <ReceiptText className="size-3.5" />
                Dashboard
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                  My Orders
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                  Review your order history, monitor fulfillment progress, and
                  keep a clear view of your recent spending in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full border border-primary/15 bg-background/80 px-3 py-1 text-primary shadow-sm hover:bg-background/80">
                  {stats.totalOrders} total orders
                </Badge>
                <Badge className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-foreground shadow-sm hover:bg-background/80">
                  {stats.pendingOrders} awaiting updates
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[540px]">
              <MiniStat
                icon={<ShoppingBag className="size-4" />}
                label="Orders"
                value={stats.totalOrders}
              />
              <MiniStat
                icon={<Clock3 className="size-4" />}
                label="Pending"
                value={stats.pendingOrders}
              />
              <MiniStat
                icon={<Truck className="size-4" />}
                label="Delivered"
                value={stats.deliveredOrders}
              />
              <MiniStat
                icon={<ReceiptText className="size-4" />}
                label="Spent"
                value={formatMoney(stats.totalSpent)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {!currentUserId ? (
        <Card className="border-border/60">
          <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-muted/60 shadow-inner">
              <Package className="size-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold">Unable to load your orders</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We could not identify the current user, so your order history
              cannot be filtered yet.
            </p>
          </CardContent>
        </Card>
      ) : myOrders.length ? (
        <div className="space-y-4">
          {myOrders.map((order: IOrder) => {
            const statusClass = STATUS_STYLES[order.status];

            return (
              <Card
                key={order._id}
                className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="space-y-5 p-5 md:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                          Order
                        </span>
                        <h2 className="text-lg font-semibold tracking-tight">
                          {order.orderNo}
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5" />
                        <span>
                          Placed {getFormattedDate(order.createdAt ?? null, true)}
                        </span>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{order.items.length} item(s)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${statusDotClass(order.status)} animate-pulse`} />
                      <Badge className={statusClass}>{order.status.replaceAll("_", " ")}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <InfoBlock label="Customer" value={order.userId?.name} />
                    <InfoBlock label="Email" value={order.userId?.email} />
                    <InfoBlock
                      label="Payment"
                      value={order.paymentMethod?.replaceAll("_", " ")}
                    />
                    <InfoBlock
                      label="Total"
                      value={formatMoney(order.totalPrice ?? order.itemsPrice ?? 0)}
                    />
                  </div>

                  <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4 transition-colors duration-300 group-hover:bg-muted/40 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Shipping
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {order.shippingAddress?.address}, {order.shippingAddress?.city}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.shippingAddress?.postalCode}
                        {order.shippingAddress?.country
                          ? `, ${order.shippingAddress.country}`
                          : ""}
                      </p>
                    </div>

                    <div className="text-xs text-muted-foreground md:text-right">
                      <p>
                        Invoice: <span className="font-medium text-foreground">{order.invoiceNo}</span>
                      </p>
                      {order.trackingNumber ? (
                        <p className="mt-1">
                          Tracking: <span className="font-medium text-foreground">{order.trackingNumber}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-border/60">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" />
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">No orders yet</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Your order history will appear here once you complete a purchase.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/90 p-3 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-2 flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner shadow-primary/10">
        {icon}
      </div>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-3 shadow-sm transition-colors duration-300 hover:border-border/80">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value || "N/A"}</p>
    </div>
  );
}

function statusDotClass(status: IOrder["status"]) {
  switch (status) {
    case "PENDING":
      return "bg-gray-500";
    case "PAID":
      return "bg-blue-500";
    case "PROCESSING":
      return "bg-purple-500";
    case "SHIPPED":
      return "bg-indigo-500";
    case "OUT_FOR_DELIVERY":
      return "bg-amber-500";
    case "DELIVERED":
      return "bg-green-500";
    case "FAILED":
    case "CANCELLED":
    case "REFUNDED":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}