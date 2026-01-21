import { AddProductBrandModal } from "@/components/modules/ProductBrand/AddProductBrandModal";
import { UpdateProductBrandModal } from "@/components/modules/ProductBrand/UpdateProductBrandModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProductBrandsQuery } from "@/redux/features/productBrands/productBrands.api";
import type { IBrand } from "@/types";
import { Edit2, Trash2 } from "lucide-react";

export default function ProductBrands() {
  const { data: brandData } = useGetProductBrandsQuery(undefined);
  // console.log(brandData);

  return (
    <div className="max-w-4xl w-full mx-auto space-y-5 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Product Brands</h1>
        <AddProductBrandModal/>
      </div>
      <div className="border-2 border-muted-foreground rounded-md p-5 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">Sl No.</TableHead>
              <TableHead className="w-1/5 text-left">Brand</TableHead>
              <TableHead className="w-1/5 text-left">Slug</TableHead>
              <TableHead className="text-center">Is Top Brand</TableHead>
              <TableHead className="text-center">Is Martizo Choice</TableHead>
              <TableHead className="text-center">Delete</TableHead>
              <TableHead className="text-center">Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandData?.map((item: IBrand, index: number) => (
              <TableRow>
                <TableCell className="w-[50px] font-medium text-center">{index + 1}</TableCell>
                <TableCell className="w-1/5 text-left">
                  <div className="flex items-center justify-start gap-3">
                    <img
                      alt={item.name}
                      className="rounded-full"
                      height={40}
                      src={item.brandLogo}
                      width={40}
                    />
                    <div className="font-medium">{item.name}</div>
                  </div>
                </TableCell>

                <TableCell className="text-left w-1/5">{item.slug}</TableCell>
                <TableCell className="text-center">{item.isTopBrand? "Yes" : "No"}</TableCell>
                <TableCell className="text-center">{item.isMartizoChoice? "Yes" : "No"}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    className="hoover: cursor-pointer"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
               <TableCell className="text-center">
                 <UpdateProductBrandModal brand={item}/>
               </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
