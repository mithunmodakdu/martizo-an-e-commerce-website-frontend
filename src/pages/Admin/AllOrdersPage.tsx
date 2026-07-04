/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ORDER_STATUS_CONFIG,
  PAGE_SIZE_OPTIONS,
} from "@/components/modules/Order/order.constants";
import type {
  IOrder,
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
import {
  useDeleteOrderByIdMutation,
  useDeleteSelectedOrdersMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/order.api";
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
import Swal from "sweetalert2";

const AllOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<
    string | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [sortField, setSortField] = useState<TOrderSortField>("createdAt");
  const [sortDir, setSortDir] = useState<TSortDirection>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data: allOrders, isLoading: ordersLoading } = useGetAllOrdersQuery({
    status: statusFilter,
    searchTerm: debouncedSearchQuery,
    sortField,
    sortDir,
    page: page,
    limit: pageSize,
  });

  const [deleteOrderById] = useDeleteOrderByIdMutation();
  const [deleteSelectedOrders] = useDeleteSelectedOrdersMutation();

  const totalPages = allOrders?.meta?.totalPage;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setDebouncedSearchQuery(searchQuery);
    }
  };

  const handleDeleteSelectedOrders = async (selected: Set<string>) => {
    if (selected.size === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No orders selected",
        text: "Please select at least one order.",
      });
    }

    const alertResult = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selected.size} order(s).`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    });

    if (!alertResult.isConfirmed) return;

    try {
      const selectedOrderIds = [...selected]; // Convert Set to Array
      console.log(selectedOrderIds);
      const res = await deleteSelectedOrders(selectedOrderIds).unwrap();

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: res?.message || "Orders deleted successfully.",
        });
      }

      // Optional: Clear selected orders
      setSelected(new Set());
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Failed to delete orders.",
      });
    }
  };

  const handleDeleteById = async (orderId: string) => {
    const alertResult = await Swal.fire({
      title: "Are you sure?",
      text: "This will be permanently deleted. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!alertResult.isConfirmed) return;

    try {
      const res = await deleteOrderById(orderId).unwrap();
      console.log(res);
      if (res.success) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message || "Order has been deleted successfully.",
          icon: "success",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete the order.",
        icon: "error",
      });
    }
  };

  // ── stats ──
  const stats = useMemo(() => {
    if (!allOrders?.data?.length)
      return { total: 0, revenue: 0, pending: 0, delivered: 0 };

    const total = allOrders?.data?.length;
    const revenue = allOrders?.data?.reduce((s, o) => s + o.total, 0);
    const pending = allOrders?.data?.filter(
      (o) => o.status === "pending",
    ).length;
    const delivered = allOrders?.data?.filter(
      (o) => o.status === "delivered",
    ).length;
    return { total, revenue, pending, delivered };
  }, [allOrders]);

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

  const handleSort = (field: TOrderSortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  // ── Selection ──
  const allOnPageSelected = allOrders?.data?.every((order: IOrder) =>
    selected.has(order._id),
  );
  const someOnPageSelected =
    allOrders?.data?.some((order: IOrder) => selected.has(order._id)) &&
    !allOnPageSelected;

  const toggleAll = () => {
    if (allOnPageSelected) {
      const newSelected = new Set(selected);
      allOrders?.data?.forEach((order: IOrder) =>
        newSelected.delete(order._id),
      );
      setSelected(newSelected);
    } else {
      const newSelected = new Set(selected);
      allOrders?.data?.forEach((order: IOrder) => newSelected.add(order._id));
      setSelected(newSelected);
    }
  };

  const toggleRow = (id: string) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  const handleExport = () => {
    const headers = [
      "Order No",
      "Customer",
      "Email",
      "Order Date",
      "Total Items",
      "Total Price",
      "Status",
      "Payment",
    ];

    const rows = allOrders?.data?.map((order: IOrder) =>
      [
        order.orderNo,
        order.userId.name,
        order.userId.email,
        order.createdAt,
        order.items.length,
        `$${order.totalPrice.toFixed(2)}`,
        order.status,
        order.paymentMethod,
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
                <Select
                  value={statusFilter}
                  onValueChange={(value) => handleStatusFilter(value)}
                >
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
                      (status) => (
                        <SelectItem key={status} value={status}>
                          {ORDER_STATUS_CONFIG[status].label}
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
                      onClick={() => handleDeleteSelectedOrders(selected)}
                      className="h-8 text-xs gap-1.5 cursor-pointer"
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
                      className="h-9 gap-1.5 text-sm cursor-pointer"
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
                      field="orderNo"
                      label="Order"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                      className="min-w-[110px]"
                    />
                    <TableHead className="min-w-[120px]">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Customer
                      </span>
                    </TableHead>
                    <OrderSortableHeader
                      field="createdAt"
                      label="Date"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                      className="min-w-[110px]"
                    />
                    <TableHead className="min-w-[50px]">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Total Items
                      </span>
                    </TableHead>
                    <OrderSortableHeader
                      field="itemsPrice"
                      label="Total Price"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                      className="min-w-[120px]"
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
                  {allOrders?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-32 text-center text-sm text-muted-foreground"
                      >
                        No orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    allOrders?.data?.map((order) => (
                      <TableRow
                        key={order?._id}
                        data-state={
                          selected.has(order?._id) ? "selected" : undefined
                        }
                        className="group hover:bg-muted/30 transition-colors data-[state=selected]:bg-primary/5"
                      >
                        <TableCell className="pl-4">
                          <Checkbox
                            checked={selected.has(order?._id)}
                            onCheckedChange={() => toggleRow(order?._id)}
                            aria-label={`Select order ${order?.orderNo}`}
                          />
                        </TableCell>

                        <TableCell>
                          <span className="font-mono text-sm font-semibold text-primary">
                            {order?.orderNo}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div>
                            <p className="text-sm font-medium text-foreground leading-none">
                              {order?.userId?.name}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {order?.userId?.email}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <time
                            dateTime={order?.createdAt}
                            className="text-sm text-muted-foreground"
                          >
                            {new Date(order?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </time>
                        </TableCell>

                        <TableCell className="text-center">
                          <span className="text-sm tabular-nums">
                            {order.items.length}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm font-semibold tabular-nums">
                            ${order?.itemsPrice.toFixed(2)}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {order?.paymentMethod}
                          </span>
                        </TableCell>

                        <TableCell>
                          <OrderStatusBadge status={order?.status} />
                        </TableCell>

                        <TableCell className="pr-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                                aria-label={`Actions for ${order?.orderNo}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </DropdownMenuItem>
                              <Link to={`/admin/update-order/${order?._id}`}>
                                <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                                  <Pencil className="h-3.5 w-3.5" />
                                  Edit
                                </DropdownMenuItem>
                              </Link>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteById(order._id)}
                                className="gap-2 text-sm cursor-pointer text-destructive focus:text-destructive"
                              >
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
                    {allOrders?.data?.length === 0
                      ? 0
                      : (page - 1) * pageSize + 1}
                    –{Math.min(page * pageSize, allOrders?.meta?.total)}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-foreground">
                    {allOrders?.meta?.total}
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
