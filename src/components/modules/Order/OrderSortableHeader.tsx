import { TableHead } from "@/components/ui/table";
import type { IOrderSortableHeaderProps } from "./order.interface";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

const OrderSortableHeader = ({ field, label, sortField, sortDir, onSort, className }: IOrderSortableHeaderProps) => {
  const isActive = sortField === field;
  return (
    <TableHead className={className}>
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
        <span className="ml-0.5">
          {isActive ? (
            sortDir === "asc" ? <ChevronUp className="h-3.5 w-3.5 text-primary" /> : <ChevronDown className="h-3.5 w-3.5 text-primary" />
          ) : (
            <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
          )}
        </span>
      </button>
    </TableHead>
  );
};

export default OrderSortableHeader;
