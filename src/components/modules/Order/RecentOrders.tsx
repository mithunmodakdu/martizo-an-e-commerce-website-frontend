import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetAllOrdersQuery } from "@/redux/features/order.api";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import type { IOrder } from "./order.interface";
import OrderStatusBadge from "./OrderStatusBadge";
import getFormattedDate from "@/utils/getFormattedDate";
import Loading from "@/utils/Loading";

const RecentOrders = () => {
  const { data: ordersData, isLoading } = useGetAllOrdersQuery({
    sortField: "createdAt",
    sortDir: "desc",
    limit: 5,
  });
  console.log(ordersData)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
              <Link to={"/admin/all-orders"}>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium gap-1.5 cursor-pointer"
                >
                  View All Orders <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-border/60 bg-muted/30">
                    {[
                      "Order No",
                      "Customer",
                      "Amount",
                      "Status",
                      "Date",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ordersData?.data?.map((order: IOrder, i: number) => (
                    <tr
                      key={order._id}
                      className={cn(
                        "border-b border-border/40 hover:bg-muted/30 transition-colors",
                        i === ordersData?.data.length - 1 && "border-b-0",
                      )}
                    >
                      <td className="px-6 py-3.5 font-mono text-xs font-semibold text-muted-foreground">
                        {order.orderNo}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="items-center gap-2.5">
                          <p className="font-medium">{order.userId.name}</p>
                          <p className="font-normal">{order.userId.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 font-semibold">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-3.5">
                        <OrderStatusBadge status={order?.status} />
                      </td>
                      <td className="px-6 py-3.5 text-xs text-muted-foreground">
                        {getFormattedDate(order.createdAt as Date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default RecentOrders;
