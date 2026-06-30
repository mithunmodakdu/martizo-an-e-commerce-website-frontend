import {
  ORDER_STATUS_CONFIG,
  PAGE_SIZE_OPTIONS,
} from "@/components/modules/Order/order.constants";
import type {
  IOrder,
  IOrderItem,
  IOrderTableRow,
  TOrderSortField,
  TOrderStatus,
  TSortDirection,
} from "@/components/modules/Order/order.interface";
import OrderSortableHeader from "@/components/modules/Order/OrderSortableHeader";
import OrderStatusBadge from "@/components/modules/Order/OrderStatusBadge";
import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import StatCard from "@/components/modules/Shared/StatCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetAllOrdersQuery } from "@/redux/features/order.api";
import Loading from "@/utils/Loading";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  Pencil,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

const AllOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery ] = useState<string>("");
  console.log(debouncedSearchQuery)
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<TOrderSortField>("date");
  const [sortDir, setSortDir] = useState<TSortDirection>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { data: allOrders, isLoading: ordersLoading } =
    useGetAllOrdersQuery({searchTerm: debouncedSearchQuery});
    console.log(allOrders)

  useEffect(() => {
    const timer = setTimeout(() =>{
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      setDebouncedSearchQuery(searchQuery)
    }
  }

  const ORDERS_DATA: IOrderTableRow[] = useMemo(
    () =>
      allOrders?.data?.data?.map((order: IOrder) => ({
        id: order?._id,
        orderId: order?.orderNo,
        customer: order?.userId?.name,
        email: order?.userId?.email,
        date: order?.createdAt,
        items: order.items.length,
        total: order?.itemsPrice,
        status: order?.status?.toLowerCase(),
        paymentMethod: order?.paymentMethod,
      })) ?? [],
    [allOrders],
  );

  // ── stats ──
  const stats = useMemo(() => {
    if (!ORDERS_DATA.length)
      return { total: 0, revenue: 0, pending: 0, delivered: 0 };

    const total = ORDERS_DATA?.length;
    const revenue = ORDERS_DATA.reduce((s, o) => s + o.total, 0);
    const pending = ORDERS_DATA?.filter((o) => o.status === "pending").length;
    const delivered = ORDERS_DATA?.filter(
      (o) => o.status === "delivered",
    ).length;
    return { total, revenue, pending, delivered };
  }, [ORDERS_DATA]);

  const statCardItems = [
    {
      title: "Total Orders",
      value: stats?.total,
      sub: "All time",
      icon: <Package className="h-5 w-5 text-primary" />,
      accent: "bg-primary/10",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.revenue?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`,
      sub: "Across all orders",
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      accent: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      title: "Pending",
      value: stats?.pending,
      sub: "Awaiting action",
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      accent: "bg-amber-100 dark:bg-amber-950",
    },
    {
      title: "Delivered",
      value: stats?.delivered,
      sub: "Successfully fulfilled",
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      accent: "bg-green-100 dark:bg-green-950",
    },
  ];

  // ── Filtering ──
  const filteredOrders = useMemo(() => {
    let data = [...(ORDERS_DATA ?? [])];

    // if (search.trim()) {
    //   const q = search.toLowerCase();
    //   data = data.filter(
    //     (o) =>
    //       o.orderId.toLowerCase().includes(q) ||
    //       o.customer.toLowerCase().includes(q) ||
    //       o.email.toLowerCase().includes(q),
    //   );
    // }

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
  }, [ORDERS_DATA, statusFilter, sortField, sortDir]);

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



  const handleStatusFilter = (v: string) => {
    setStatusFilter(v);
    setPage(1);
  };

  // ── Selection ──
  const allOnPageSelected = paginated.every((o) => selected.has(o.id));
  const someOnPageSelected =
    paginated.some((o) => selected.has(o.id)) && !allOnPageSelected;

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

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
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

      {ordersLoading ? (
        <Loading />
      ) : (
        <div className="space-y-5">
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleEnterKeyDown}
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
                {/* table header */}
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-10 pl-4">
                      <Checkbox
                        checked={
                          allOnPageSelected
                            ? true
                            : someOnPageSelected
                              ? "indeterminate"
                              : false
                        }
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

                {/* table body */}
                <TableBody>
                  {paginated.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-32 text-center text-sm text-muted-foreground"
                      >
                        No orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginated.map((order) => (
                      <TableRow
                        key={order.id}
                        data-state={
                          selected.has(order.id) ? "selected" : undefined
                        }
                        className="group hover:bg-muted/30 transition-colors data-[state=selected]:bg-primary/5"
                      >
                        <TableCell className="pl-4">
                          <Checkbox
                            checked={selected.has(order.id)}
                            onCheckedChange={() => toggleRow(order.id)}
                            aria-label={`Select order ${order.orderId}`}
                          />
                        </TableCell>

                        <TableCell>
                          <span className="font-mono text-sm font-semibold text-primary">
                            {order.orderId}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div>
                            <p className="text-sm font-medium text-foreground leading-none">
                              {order.customer}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {order.email}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <time
                            dateTime={order.date}
                            className="text-sm text-muted-foreground"
                          >
                            {new Date(order.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </TableCell>

                        <TableCell className="text-center">
                          <span className="text-sm tabular-nums">
                            {order.items}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm font-semibold tabular-nums">
                            ${order.total.toFixed(2)}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {order.paymentMethod}
                          </span>
                        </TableCell>

                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>

                        <TableCell className="pr-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                                aria-label={`Actions for ${order.orderId}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </DropdownMenuItem>
                              <Link to={`/admin/update-order/${order.id}`}>
                                <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                                  <Pencil className="h-3.5 w-3.5" />
                                  Edit
                                </DropdownMenuItem>
                              </Link>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 text-sm cursor-pointer text-destructive focus:text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col gap-3 px-4 py-3 border-t border-border sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>
                  Showing{" "}
                  <strong className="text-foreground">
                    {filteredOrders.length === 0
                      ? 0
                      : (page - 1) * pageSize + 1}
                    –{Math.min(page * pageSize, filteredOrders.length)}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-foreground">
                    {filteredOrders.length}
                  </strong>{" "}
                  orders
                </span>
                <Separator orientation="vertical" className="h-3" />
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => {
                    setPageSize(Number(v));
                    setPage(1);
                  }}
                >
                  <SelectTrigger
                    className="h-7 w-28 text-xs"
                    aria-label="Rows per page"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)} className="text-xs">
                        {n} / page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <nav aria-label="Pagination" className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                  )
                  .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                      acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === "…" ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-1 text-xs text-muted-foreground"
                      >
                        …
                      </span>
                    ) : (
                      <Button
                        key={item}
                        variant={page === item ? "default" : "outline"}
                        size="icon"
                        className="h-7 w-7 text-xs"
                        onClick={() => setPage(item as number)}
                        aria-label={`Page ${item}`}
                        aria-current={page === item ? "page" : undefined}
                      >
                        {item}
                      </Button>
                    ),
                  )}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AllOrdersPage;
