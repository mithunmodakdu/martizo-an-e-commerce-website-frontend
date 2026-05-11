import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

export default function StockManagementPage() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6 font-sans">
      {/* ── Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
       
        <ContentHeader
          title="Stock Management"
          description="Monitor inventory levels, thresholds, and supplier info."
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" /> Sync
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" /> Add Item
          </Button>
        </div>
      </div>
    </div>
  );
}
