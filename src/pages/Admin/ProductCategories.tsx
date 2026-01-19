import { AddProductCategoryModal } from "@/components/modules/ProductCategory/AddProductCategoryModal";
import { UpdateProductCategoryModal } from "@/components/modules/ProductCategory/UpdateProductCategoryModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import { Trash2 } from "lucide-react";

export default function ProductCategories() {
  const { data } = useGetProductCategoriesQuery(undefined);
  // console.log(data);
  return (
    <div className="max-w-4xl w-full mx-auto space-y-5 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Product Categories</h1>
        <AddProductCategoryModal/>
      </div>
      <div className="border-2 border-muted-foreground rounded-md p-5 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sl No.</TableHead>
              <TableHead className="w-1/2">Category Name</TableHead>
              <TableHead className="w-1/2">Category Slug</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data?.map((item: {_id: string, name: string, slug: string}, index: number) => (
                <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.slug}</TableCell>
              <TableCell><Button variant="destructive"><Trash2/></Button></TableCell>
              <TableCell><UpdateProductCategoryModal category={item}/></TableCell>
            </TableRow>
              ))
            }
            
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
