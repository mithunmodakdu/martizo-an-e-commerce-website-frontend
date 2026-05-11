import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import StockStatCard from "@/components/modules/StockManagement/StockStatCard";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Download,
  Package,
  Plus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";

type IStockStatus = "in_stock" | "low_stock" | "out_of_stock" | "overstocked";
type ICategory =
  | "Electronics"
  | "Clothing"
  | "Food & Beverage"
  | "Furniture"
  | "Tools"
  | "Beauty";

interface IStockItem {
  id: string;
  sku: string;
  name: string;
  category: Category;
  quantity: number;
  minThreshold: number;
  maxThreshold: number;
  unitPrice: number;
  supplier: string;
  lastUpdated: string;
  status: StockStatus;
}

const INITIAL_DATA: IStockItem[] = [
  {
    id: "1",
    sku: "ELC-001",
    name: "Wireless Headphones Pro",
    category: "Electronics",
    quantity: 142,
    minThreshold: 20,
    maxThreshold: 200,
    unitPrice: 89.99,
    supplier: "TechSource Ltd.",
    lastUpdated: "2025-05-10",
    status: "in_stock",
  },
  {
    id: "2",
    sku: "ELC-002",
    name: "USB-C Hub 7-Port",
    category: "Electronics",
    quantity: 8,
    minThreshold: 15,
    maxThreshold: 100,
    unitPrice: 34.5,
    supplier: "TechSource Ltd.",
    lastUpdated: "2025-05-09",
    status: "low_stock",
  },
  {
    id: "3",
    sku: "CLT-011",
    name: "Merino Wool Crew Neck",
    category: "Clothing",
    quantity: 0,
    minThreshold: 10,
    maxThreshold: 150,
    unitPrice: 49.0,
    supplier: "FabricCo.",
    lastUpdated: "2025-05-08",
    status: "out_of_stock",
  },
  {
    id: "4",
    sku: "FDB-005",
    name: "Organic Green Tea (50pk)",
    category: "Food & Beverage",
    quantity: 312,
    minThreshold: 30,
    maxThreshold: 250,
    unitPrice: 12.99,
    supplier: "Nature Imports",
    lastUpdated: "2025-05-10",
    status: "overstocked",
  },
  {
    id: "5",
    sku: "FRN-008",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    quantity: 27,
    minThreshold: 5,
    maxThreshold: 40,
    unitPrice: 299.0,
    supplier: "WorkSpace Co.",
    lastUpdated: "2025-05-07",
    status: "in_stock",
  },
  {
    id: "6",
    sku: "TLS-003",
    name: "Precision Screwdriver Set",
    category: "Tools",
    quantity: 11,
    minThreshold: 12,
    maxThreshold: 80,
    unitPrice: 24.99,
    supplier: "ToolMaster",
    lastUpdated: "2025-05-09",
    status: "low_stock",
  },
  {
    id: "7",
    sku: "BTY-019",
    name: "Vitamin C Serum 30ml",
    category: "Beauty",
    quantity: 88,
    minThreshold: 25,
    maxThreshold: 120,
    unitPrice: 19.5,
    supplier: "GlowLab",
    lastUpdated: "2025-05-10",
    status: "in_stock",
  },
  {
    id: "8",
    sku: "ELC-015",
    name: "Smart LED Desk Lamp",
    category: "Electronics",
    quantity: 0,
    minThreshold: 10,
    maxThreshold: 60,
    unitPrice: 44.0,
    supplier: "TechSource Ltd.",
    lastUpdated: "2025-05-06",
    status: "out_of_stock",
  },
  {
    id: "9",
    sku: "CLT-022",
    name: "Slim Fit Chino Pants",
    category: "Clothing",
    quantity: 65,
    minThreshold: 20,
    maxThreshold: 100,
    unitPrice: 39.0,
    supplier: "FabricCo.",
    lastUpdated: "2025-05-10",
    status: "in_stock",
  },
  {
    id: "10",
    sku: "FDB-012",
    name: "Cold Brew Coffee Bags (12pk)",
    category: "Food & Beverage",
    quantity: 4,
    minThreshold: 20,
    maxThreshold: 180,
    unitPrice: 18.75,
    supplier: "Brew Imports",
    lastUpdated: "2025-05-08",
    status: "low_stock",
  },
  {
    id: "11",
    sku: "FRN-014",
    name: "Bamboo Bookshelf 5-Tier",
    category: "Furniture",
    quantity: 390,
    minThreshold: 5,
    maxThreshold: 30,
    unitPrice: 119.0,
    supplier: "WorkSpace Co.",
    lastUpdated: "2025-05-05",
    status: "overstocked",
  },
  {
    id: "12",
    sku: "BTY-033",
    name: "Matte Lip Colour Set",
    category: "Beauty",
    quantity: 56,
    minThreshold: 30,
    maxThreshold: 100,
    unitPrice: 14.25,
    supplier: "GlowLab",
    lastUpdated: "2025-05-10",
    status: "in_stock",
  },
];

export default function StockManagementPage() {
  const [items, setItems] = useState<IStockItem[]>(INITIAL_DATA);
  // ── Stats
  const stats = useMemo(() => {
    const totalSKUs = items.length;
    const totalValue = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    const alerts = items.filter(
      (i) => i.status === "low_stock" || i.status === "out_of_stock",
    ).length;
    const overstocked = items.filter((i) => i.status === "overstocked").length;
    return { totalSKUs, totalValue, alerts, overstocked };
  }, [items]);

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

      {/* ── Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StockStatCard
          label="Total SKUs"
          value={stats.totalSKUs}
          sub="Active product lines"
          icon={Package}
          accent="bg-primary/10 text-primary"
        />
        <StockStatCard
          label="Stock Value"
          value={`$${stats.totalValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          sub="Total inventory cost"
          icon={TrendingUp}
          accent="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
        <StockStatCard
          label="Alerts"
          value={stats.alerts}
          sub="Low / out of stock"
          icon={AlertTriangle}
          accent="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
        />
        <StockStatCard
          label="Overstocked"
          value={stats.overstocked}
          sub="Exceeds max threshold"
          icon={TrendingDown}
          accent="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        />
      </div>
    </div>
  );
}
