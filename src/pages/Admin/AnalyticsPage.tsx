import CategoryPie from "@/components/modules/Analytics/CategoryPie";
import RecentOrders from "@/components/modules/Order/RecentOrders";
import RevenueChart from "@/components/modules/Analytics/RevenueChart";
import TopProducts from "@/components/modules/Analytics/TopProducts";
import WeeklyVisitors from "@/components/modules/Analytics/WeeklyVisitors";
import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import type { IStatCard } from "@/components/modules/Shared/StatCard";
import StatCard from "@/components/modules/Shared/StatCard";
import {
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useGetOrderStatsQuery, useGetUserStatsQuery } from "@/redux/features/stats.api";

export default function Analytics() {
  const { data: orderStatsData} = useGetOrderStatsQuery(undefined);
  const {data: userStatsData} = useGetUserStatsQuery(undefined);

  const totalOrders = orderStatsData?.totalOrders || 0;
  const ordersThisMonth = orderStatsData?.ordersInLastThirtyDays || 0;
  const ordersInLastSixtyDays = orderStatsData?.ordersInLastSixtyDays || 0;
  const ordersInLastMonth = ordersInLastSixtyDays - ordersThisMonth;
  const ordersChangePercentage = ordersInLastMonth === 0 ? 0 :
    ((ordersThisMonth - ordersInLastMonth) / ordersInLastMonth) * 100;

  const totalItemsPrice = orderStatsData?.totalItemsPrice || 0;
  const totalItemsPriceThisMonth = orderStatsData?.totalItemsPriceThisMonth || 0;
  const totalItemsPriceLastMonth = orderStatsData?.totalItemsPriceLastMonth || 0;
  const totalItemsPriceChangePercentage = totalItemsPriceLastMonth === 0 ? 0 :
    ((totalItemsPriceThisMonth - totalItemsPriceLastMonth) /
      totalItemsPriceLastMonth) *
    100;
  
  const avgItemsPrice = orderStatsData?.avgItemsPrice ?? 0;
  const avgItemsPriceUptoLastMonth = orderStatsData?.avgItemsPriceUptoLastMonth ?? 0;
  const avgItemsPriceChangePercentage = avgItemsPriceUptoLastMonth === 0 ? 0 : (avgItemsPrice - avgItemsPriceUptoLastMonth)/ avgItemsPriceUptoLastMonth * 100;

  const {totalActiveUsers = 0, newUsersThisMonth = 0, newUsersLastMonth = 0} = userStatsData || {};
  const newUsersChangePercentage = newUsersLastMonth === 0 ? 0 : (newUsersThisMonth - newUsersLastMonth)/newUsersLastMonth * 100;

  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statItems: IStatCard[] = [
    {
      title: "Total Revenue",
      value: `৳ ${totalItemsPrice}`,
      change: `${totalItemsPriceChangePercentage.toFixed(2)}%`,
      changeType: totalItemsPriceChangePercentage > 0 ? "up" : "down",
      icon: <FaBangladeshiTakaSign />,
      sub: `৳${(totalItemsPriceThisMonth / 1000).toFixed(2)}K this month`,
    },
    {
      title: "Total Orders",
      value: totalOrders,
      change: `${ordersChangePercentage.toFixed(2)}%`,
      changeType: ordersChangePercentage > 0 ? "up" : "down",
      icon: <ShoppingBag />,
      sub: `${ordersThisMonth} this month`,
    },
    {
      title: "Active Customers",
      value: `${totalActiveUsers}`,
      change: `${newUsersChangePercentage}%`,
      changeType: newUsersChangePercentage > 0 ? "up" : "down",
      icon: <Users />,
      sub: `${newUsersThisMonth} new this month`,
    },
    {
      title: "Avg. Order Value",
      value: `৳ ${avgItemsPrice.toFixed(2)}`,
      change: `${avgItemsPriceChangePercentage.toFixed(2)}%`,
      changeType: avgItemsPriceChangePercentage > 0 ? "up" : "down",
      icon: <Package />,
      sub: avgItemsPrice > avgItemsPriceUptoLastMonth? `Up from ৳ ${avgItemsPriceUptoLastMonth.toFixed(2)}` : `Down from ৳ ${avgItemsPriceUptoLastMonth.toFixed(2)}`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-screen-2xl mx-auto px-5 py-3 space-y-5">
        {/* Analytics Page Header */}
        <div className="flex items-start justify-between">
          <ContentHeader
            title="Analytics Overview"
            description={`${formattedToday} · All data refreshed 5 minutes ago`}
          />
        </div>

        {/* Analytics StatCard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems?.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue chart */}
          <RevenueChart />

          {/*Sales by Category Pie */}
          <CategoryPie />
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Weekly Visitors */}
          <WeeklyVisitors />
          {/* Top Products */}
          <TopProducts />
        </div>

        <RecentOrders />
      </main>
    </div>
  );
}
