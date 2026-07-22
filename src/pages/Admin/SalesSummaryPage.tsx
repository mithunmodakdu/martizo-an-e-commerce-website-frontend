import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DailyRevenueChart from "@/components/modules/SalesSummary/DailyRevenueChart";
import MonthlyGoal from "@/components/modules/SalesSummary/MonthlyGoal";
import ConversionFunnel from "@/components/modules/SalesSummary/ConversionFunnel";
import SalesByChannel from "@/components/modules/SalesSummary/SalesByChannel";
import RecentTransactions from "@/components/modules/SalesSummary/RecentTransactions";

export default function SalesSummaryPage() {
  const [period, setPeriod] = useState("This Year");

  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-5 p-6 bg-background">
      {/* Sales Summary Page Header */}
      <div className="flex items-start justify-between">
        <ContentHeader
          title="Sales Summary"
          description={`${formattedToday} · All data refreshed 5 minutes ago`}
        />
      </div>

      {/* Row 1 — Revenue Chart + Monthly Goal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <DailyRevenueChart />
        <MonthlyGoal />
      </div>

      {/* Row 2 — Funnel + Channels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ConversionFunnel />
        <SalesByChannel />
      </div>
      
      {/* Row 3 — Recent Transactions */}
      <RecentTransactions/>
    </div>
  );
}
