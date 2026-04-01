import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import { useSearchParams } from "react-router";
// import { useState } from "react";

export default function ProductsFilter() {
  // const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  // console.log(selectedCategory)
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || undefined;

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    setSearchParams(params);
  }

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    setSearchParams(params);
  }

  const { data: categoryData } = useGetProductCategoriesQuery(undefined);
  
  return (
    <div>
      <div className="flex justify-between items-center w-xl">
        <h3 className="font-bold mb-2">Filter Products</h3>
        <Button onClick={handleClearFilter} variant="outline" className="cursor-pointer">Clear Filter</Button>
      </div>
      <Select
        onValueChange={(value) => handleCategoryChange(value)}
        value={selectedCategory? selectedCategory : ""}
      >
        <SelectTrigger className="w-full max-w-52">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Product Categories:</SelectLabel>
            {
              categoryData?.map((item: {_id: string, name: string}, index: number) => (
                <SelectItem key={index} value={item._id}>{item.name}</SelectItem>
              ))
            }
            
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
