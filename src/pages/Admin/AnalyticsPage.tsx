// import AnalyticsStatCard from "@/components/modules/Analytics/AnalyticsStatCard";
import CategoryPie from "@/components/modules/Analytics/CategoryPie";
import RecentOrders from "@/components/modules/Analytics/RecentOrders";
import RevenueChart from "@/components/modules/Analytics/RevenueChart";
import TopProducts from "@/components/modules/Analytics/TopProducts";
import WeeklyVisitors from "@/components/modules/Analytics/WeeklyVisitors";
import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import type { IStatCard } from "@/components/modules/Shared/StatCard";
import StatCard from "@/components/modules/Shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

import { useState } from "react";

export default function Analytics() {
  const [period, setPeriod] = useState("This Year");

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
      value: "$784.2K",
      change: "18.4%",
      changeType: "up",
      icon: DollarSign,
      sub: "$112K this month",
    },
    {
      title: "Total Orders",
      value: "6,248",
      change: "12.1%",
      changeType: "up",
      icon: ShoppingBag,
      sub: "861 this month",
    },
    {
      title: "Active Customers",
      value: "18,492",
      change: "9.3%",
      changeType: "up",
      icon: Users,
      sub: "1,204 new this month",
    },
    {
      title: "Avg. Order Value",
      value: "$125.50",
      change: "3.2%",
      changeType: "down",
      icon: Package,
      sub: "Down from $129.70",
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 font-medium">
                {period}
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Today", "This Week", "This Month", "This Year"].map((p) => (
                <DropdownMenuItem key={p} onClick={() => setPeriod(p)}>
                  {p}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Analytics StatCard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {
            statItems?.map(item => (
              <StatCard key={item.title} item={item}/>
            ))
          }
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
