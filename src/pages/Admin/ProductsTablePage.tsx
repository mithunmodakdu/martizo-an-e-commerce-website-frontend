import { columns } from "@/components/modules/Product/ProductsTable/columns";
import { DataTable } from "@/components/modules/Product/ProductsTable/DataTable";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import Loading from "@/utils/Loading";

export default function ProductsTablePage() {
  const { data, isLoading } = useGetAllProductsQuery(undefined);
  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <Loading/>
      ) : (
        <DataTable columns={columns} data={data?.data} />
      )}
    </div>
  );
}
