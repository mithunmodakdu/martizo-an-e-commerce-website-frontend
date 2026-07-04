import MyOrderCard from "@/components/modules/Order/MyOrderCard";
import type { IOrder } from "@/components/modules/Order/order.interface";
import { useGetOrderByUserIdQuery } from "@/redux/features/order.api";
import Loading from "@/utils/Loading";

const MyOrdersPage = () => {
  const {data: userOrders, isLoading} = useGetOrderByUserIdQuery(undefined);
  return (
    <div className="w-xl mx-auto">
      {/* Page header */}  
        <div className="mb-5">
          <h1 className="text-2xl font-medium">My orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {userOrders?.length} orders placed · Member since Jan 2024
          </p>
        </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <Loading/>
        ) : (
          userOrders?.map((order: IOrder) => <MyOrderCard key={order._id} order={order} />)
        )}
      </div>

    </div>
  );
};

export default MyOrdersPage;