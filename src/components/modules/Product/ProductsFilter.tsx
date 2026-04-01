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
import { useGetAllBrandsQuery } from "@/redux/features/brands/brands.api";
import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import { useSearchParams } from "react-router";

export default function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categoryData } = useGetProductCategoriesQuery(undefined);
  const {data: brandsData} = useGetAllBrandsQuery(undefined);

  const selectedCategory = searchParams.get("category") || undefined;
  const selectedBrand = searchParams.get("brand") || undefined;

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    setSearchParams(params);
  };

  const handleBrandChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("brand", value);
    setSearchParams(params);
  }

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("brand");
    setSearchParams(params);
  };


  return (
    <div>
      <div className="flex justify-between items-center w-xl mb-2">
        <h3 className="font-bold">Filter Products</h3>
        <Button
          onClick={handleClearFilter}
          variant="link"
          size="sm"
          className="cursor-pointer"
        >
          Clear Filter
        </Button>
      </div>
      <div className="flex justify-evenly items-center">
        <Select
          onValueChange={(value) => handleCategoryChange(value)}
          value={selectedCategory ? selectedCategory : ""}
        >
          <SelectTrigger className="w-full max-w-52">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Product Categories:</SelectLabel>
              {categoryData?.map(
                (item: { _id: string; name: string }, index: number) => (
                  <SelectItem key={index} value={item._id}>
                    {item.name}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleBrandChange(value)}
          value={selectedBrand? selectedBrand : ""}
        >
          <SelectTrigger className="w-full max-w-52">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Product Brands:</SelectLabel>
              {
                brandsData?.data?.map((item: {_id: string, name: string}, index: number) => (
                  <SelectItem key={index} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
