import MyOrderCard from "@/components/modules/Order/MyOrderCard";
import type { IOrder } from "@/components/modules/Order/order.interface";
import { useGetOrderByUserIdQuery } from "@/redux/features/order.api";
import Loading from "@/utils/Loading";

const MyOrdersPage = () => {
  const {data: userOrders, isLoading} = useGetOrderByUserIdQuery(undefined);
  return (
    <div className="w-2xl mx-auto">
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <Loading/>
        ) : (
          userOrders.map((order: IOrder) => <MyOrderCard key={order._id} order={order} />)
        )}
      </div>

    </div>
  );
};

export default MyOrdersPage;