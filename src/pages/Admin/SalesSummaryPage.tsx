import { useState } from "react";
import {
  ChevronDown
} from "lucide-react";
import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
    <section className="space-y-5 p-6 bg-background">

      {/* Sales Summary Page Header */}
        <div className="flex items-start justify-between">
          <ContentHeader
            title="Sales Summary"
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



    </section>
  );
}