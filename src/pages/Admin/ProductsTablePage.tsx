import { columns } from "@/components/modules/Product/ProductsTable/columns";
import { DataTable } from "@/components/modules/Product/ProductsTable/data-table";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";

export default function ProductsTablePage() {
  const {data, isLoading} = useGetAllProductsQuery(undefined);
  console.log(data)
  return (
   
        <div className="container mx-auto py-10">
      {isLoading? <p>Loading...</p> : <DataTable columns={columns} data={data.data} />
      }
    </div>
    
  );
}