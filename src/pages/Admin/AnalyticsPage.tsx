import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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
  console.log(formattedToday);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-screen-2xl mx-auto px-5 py-3 space-y-8">
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
      </main>
    </div>
  );
}
