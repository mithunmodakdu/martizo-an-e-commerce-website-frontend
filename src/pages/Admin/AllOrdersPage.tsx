import { ORDER_STATUS_CONFIG } from "@/components/modules/Order/order.constants";
import type {
  IOrder,
  TOrderSortField,
  TOrderStatus,
  TSortDirection,
} from "@/components/modules/Order/order.interface";
import OrderSortableHeader from "@/components/modules/Order/OrderSortableHeader";
import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import StatCard from "@/components/modules/Shared/StatCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Package,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";

const ORDERS_DATA: IOrder[] = [
  {
    id: "1",
    orderId: "#ORD-8821",
    customer: "Ayesha Rahman",
    email: "ayesha.r@email.com",
    date: "2025-05-12",
    items: 3,
    total: 245.0,
    status: "delivered",
    paymentMethod: "bKash",
  },
  {
    id: "2",
    orderId: "#ORD-8820",
    customer: "Tanvir Hossain",
    email: "tanvir.h@email.com",
    date: "2025-05-12",
    items: 1,
    total: 89.99,
    status: "processing",
    paymentMethod: "Card",
  },
  {
    id: "3",
    orderId: "#ORD-8819",
    customer: "Nusrat Jahan",
    email: "nusrat.j@email.com",
    date: "2025-05-11",
    items: 5,
    total: 512.5,
    status: "shipped",
    paymentMethod: "Nagad",
  },
  {
    id: "4",
    orderId: "#ORD-8818",
    customer: "Rafiqul Islam",
    email: "rafiq.i@email.com",
    date: "2025-05-11",
    items: 2,
    total: 178.0,
    status: "pending",
    paymentMethod: "COD",
  },
  {
    id: "5",
    orderId: "#ORD-8817",
    customer: "Sabrina Akter",
    email: "sabrina.a@email.com",
    date: "2025-05-10",
    items: 4,
    total: 339.0,
    status: "cancelled",
    paymentMethod: "Card",
  },
  {
    id: "6",
    orderId: "#ORD-8816",
    customer: "Imran Chowdhury",
    email: "imran.c@email.com",
    date: "2025-05-10",
    items: 2,
    total: 124.0,
    status: "delivered",
    paymentMethod: "bKash",
  },
  {
    id: "7",
    orderId: "#ORD-8815",
    customer: "Fatema Begum",
    email: "fatema.b@email.com",
    date: "2025-05-09",
    items: 7,
    total: 689.99,
    status: "refunded",
    paymentMethod: "Card",
  },
  {
    id: "8",
    orderId: "#ORD-8814",
    customer: "Karim Uddin",
    email: "karim.u@email.com",
    date: "2025-05-09",
    items: 1,
    total: 55.0,
    status: "delivered",
    paymentMethod: "Nagad",
  },
  {
    id: "9",
    orderId: "#ORD-8813",
    customer: "Sadia Islam",
    email: "sadia.i@email.com",
    date: "2025-05-08",
    items: 3,
    total: 290.0,
    status: "processing",
    paymentMethod: "COD",
  },
  {
    id: "10",
    orderId: "#ORD-8812",
    customer: "Jahirul Haque",
    email: "jahir.h@email.com",
    date: "2025-05-08",
    items: 6,
    total: 445.5,
    status: "shipped",
    paymentMethod: "bKash",
  },
  {
    id: "11",
    orderId: "#ORD-8811",
    customer: "Mithila Das",
    email: "mithila.d@email.com",
    date: "2025-05-07",
    items: 2,
    total: 190.0,
    status: "pending",
    paymentMethod: "Card",
  },
  {
    id: "12",
    orderId: "#ORD-8810",
    customer: "Arif Billah",
    email: "arif.b@email.com",
    date: "2025-05-07",
    items: 4,
    total: 365.0,
    status: "delivered",
    paymentMethod: "bKash",
  },
  {
    id: "13",
    orderId: "#ORD-8809",
    customer: "Poly Khatun",
    email: "poly.k@email.com",
    date: "2025-05-06",
    items: 1,
    total: 45.0,
    status: "cancelled",
    paymentMethod: "Nagad",
  },
  {
    id: "14",
    orderId: "#ORD-8808",
    customer: "Shihab Uddin",
    email: "shihab.u@email.com",
    date: "2025-05-06",
    items: 9,
    total: 812.0,
    status: "delivered",
    paymentMethod: "Card",
  },
  {
    id: "15",
    orderId: "#ORD-8807",
    customer: "Rima Sultana",
    email: "rima.s@email.com",
    date: "2025-05-05",
    items: 3,
    total: 215.0,
    status: "shipped",
    paymentMethod: "bKash",
  },
  {
    id: "16",
    orderId: "#ORD-8806",
    customer: "Nasir Ahmed",
    email: "nasir.a@email.com",
    date: "2025-05-05",
    items: 2,
    total: 134.5,
    status: "processing",
    paymentMethod: "COD",
  },
  {
    id: "17",
    orderId: "#ORD-8805",
    customer: "Tania Parvin",
    email: "tania.p@email.com",
    date: "2025-05-04",
    items: 5,
    total: 478.0,
    status: "delivered",
    paymentMethod: "Card",
  },
  {
    id: "18",
    orderId: "#ORD-8804",
    customer: "Babul Mia",
    email: "babul.m@email.com",
    date: "2025-05-04",
    items: 1,
    total: 68.0,
    status: "refunded",
    paymentMethod: "Nagad",
  },
  {
    id: "19",
    orderId: "#ORD-8803",
    customer: "Sharmin Akter",
    email: "sharmin.a@email.com",
    date: "2025-05-03",
    items: 4,
    total: 310.0,
    status: "pending",
    paymentMethod: "bKash",
  },
  {
    id: "20",
    orderId: "#ORD-8802",
    customer: "Zahid Hassan",
    email: "zahid.h@email.com",
    date: "2025-05-03",
    items: 2,
    total: 176.0,
    status: "delivered",
    paymentMethod: "Card",
  },
];

const AllOrdersPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<TOrderSortField>("date");
  const [sortDir, setSortDir] = useState<TSortDirection>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // ── stats ──
  const stats = useMemo(() => {
    const total = ORDERS_DATA.length;
    const revenue = ORDERS_DATA.reduce((s, o) => s + o.total, 0);
    const pending = ORDERS_DATA.filter((o) => o.status === "pending").length;
    const delivered = ORDERS_DATA.filter(
      (o) => o.status === "delivered",
    ).length;
    return { total, revenue, pending, delivered };
  }, []);

  const statCardItems = [
    {
      title: "Total Orders",
      value: stats.total,
      sub: "All time",
      icon: <Package className="h-5 w-5 text-primary" />,
      accent: "bg-primary/10",
    },
    {
      title: "Total Revenue",
      value: `$${stats.revenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`,
      sub: "Across all orders",
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      accent: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      title: "Pending",
      value: stats.pending,
      sub: "Awaiting action",
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      accent: "bg-amber-100 dark:bg-amber-950",
    },
    {
      title: "Delivered",
      value: stats.delivered,
      sub: "Successfully fulfilled",
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      accent: "bg-green-100 dark:bg-green-950",
    },
  ];

  // ── Filtering ──
  const filteredOrders = useMemo(() => {
    let data = [...ORDERS_DATA];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (o) =>
          o.orderId.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((o) => o.status === statusFilter);
    }

    if (sortField) {
      data.sort((a, b) => {
        let aVal: string | number = "";
        let bVal: string | number = "";

        switch (sortField) {
          case "orderId":
            aVal = a.orderId;
            bVal = b.orderId;
            break;
          case "customer":
            aVal = a.customer;
            bVal = b.customer;
            break;
          case "date":
            aVal = a.date;
            bVal = b.date;
            break;
          case "total":
            aVal = a.total;
            bVal = b.total;
            break;
          case "items":
            aVal = a.items;
            bVal = b.items;
            break;
          case "status":
            aVal = a.status;
            bVal = b.status;
            break;
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortDir === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return data;
  }, [search, statusFilter, sortField, sortDir]);

  const handleSearchChange = (v: string) => {
    setSearch(v);
  };

  const handleStatusFilter = (v: string) => {
    setStatusFilter(v);
  };

  // ── Pagination ──
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginated = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

    const handleSort = (field: TOrderSortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };


   // ── Selection ──
  const allOnPageSelected = paginated.every((o) => selected.has(o.id));
  const someOnPageSelected = paginated.some((o) => selected.has(o.id)) && !allOnPageSelected;

  const toggleAll = () => {
    if (allOnPageSelected) {
      const next = new Set(selected);
      paginated.forEach((o) => next.delete(o.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      paginated.forEach((o) => next.add(o.id));
      setSelected(next);
    }
  };




  const handleExport = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Date",
      "Items",
      "Total",
      "Status",
      "Payment",
    ];
    const rows = filteredOrders.map((o) =>
      [
        o.orderId,
        o.customer,
        o.email,
        o.date,
        o.items,
        `$${o.total.toFixed(2)}`,
        o.status,
        o.paymentMethod,
      ].join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <ContentHeader
        title="All Orders"
        description="Manage and track every customer order in one place."
      />

      {/* stat cards */}
      <div
        aria-label="Order statistics"
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {statCardItems.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      {/* Table Card */}
      <section
        aria-label="Orders table"
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      >
        {/* Toolbar */}
        <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between border-b border-border">
          <div className="flex flex-1 items-center gap-5">
            {/* search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search orders…"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 h-9 text-sm"
                aria-label="Search orders"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger
                className="h-9 w-38 text-sm"
                aria-label="Filter by status"
              >
                <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {(Object.keys(ORDER_STATUS_CONFIG) as TOrderStatus[]).map(
                  (s) => (
                    <SelectItem key={s} value={s}>
                      {ORDER_STATUS_CONFIG[s].label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Delete and Export as CSV */}
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <>
                <span className="text-xs text-muted-foreground">
                  {selected.size} selected
                </span>
                <Separator orientation="vertical" className="h-4" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 text-xs gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5 text-sm"
                  onClick={handleExport}
                  aria-label="Export orders as CSV"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export as CSV</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-10 pl-4">
                  <Checkbox
                    checked={allOnPageSelected}
                    ref={(el) => {
                      if (el)
                        (el as HTMLButtonElement).dataset.indeterminate =
                          String(someOnPageSelected);
                    }}
                    onCheckedChange={toggleAll}
                    aria-label="Select all on page"
                    className="data-[state=indeterminate]:bg-primary/20"
                  />
                </TableHead>
                <OrderSortableHeader
                  field="orderId"
                  label="Order"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                  className="min-w-[110px]"
                />
                <OrderSortableHeader
                  field="customer"
                  label="Customer"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                  className="min-w-[160px]"
                />
                <OrderSortableHeader
                  field="date"
                  label="Date"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                  className="min-w-[110px]"
                />
                <OrderSortableHeader
                  field="items"
                  label="Items"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                  className="w-16 text-center"
                />
                <OrderSortableHeader
                  field="total"
                  label="Total"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <TableHead className="min-w-[120px]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Payment
                  </span>
                </TableHead>
                <OrderSortableHeader
                  field="status"
                  label="Status"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                  className="min-w-[120px]"
                />
                <TableHead className="w-12 pr-4">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default AllOrdersPage;
