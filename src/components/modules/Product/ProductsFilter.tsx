import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  const { data: brandsData } = useGetAllBrandsQuery(undefined);

  const selectedCategory = searchParams.get("category") || undefined;
  const selectedBrand = searchParams.get("brand") || undefined;
  const isCheckedNewArrival = Boolean(searchParams.get("isNewArrival"));
  const isCheckedBestSeller = Boolean(searchParams.get("isBestSeller"));
  const isCheckedTrending = Boolean(searchParams.get("isTrending"));
  const isCheckedFlashSale = Boolean(searchParams.get("isFlashSale"));
  const isCheckedMartizoExclusive = Boolean(searchParams.get("isMartizoExclusive"));

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    setSearchParams(params);
  };

  const handleBrandChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("brand", value);
    setSearchParams(params);
  };

  const handleNewArrival = (value: boolean) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("isNewArrival", String(value));
      setSearchParams(params);
    } else {
      params.delete("isNewArrival");
      setSearchParams(params);
    }
  };

  const handleBestSeller = (value: boolean) => {
    const params = new URLSearchParams(searchParams);

    if(value){
      params.set("isBestSeller", String(value));
      setSearchParams(params);
    }else{
      params.delete("isBestSeller");
      setSearchParams(params);
    }
  }

  const handleTrending = (value: boolean) => {
    const params = new URLSearchParams(searchParams);

    if(value){
      params.set("isTrending", String(value));
      setSearchParams(params);
    }else{
      params.delete("isTrending");
      setSearchParams(params);
    }
  }

  const handleFlashSale = (value: boolean) => {
    const params = new URLSearchParams(searchParams);

    if(value){
      params.set("isFlashSale", String(value));
      setSearchParams(params);
    }else{
      params.delete("isFlashSale");
      setSearchParams(params);
    }
  }

  const handleMartizoExclusive = (value: boolean) => {
    const params = new URLSearchParams(searchParams);

    if(value){
      params.set("isMartizoExclusive", String(value));
      setSearchParams(params);
    }else{
      params.delete("isMartizoExclusive");
      setSearchParams(params);
    }
  }

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("brand");
    params.delete("isNewArrival");
    params.delete("isBestSeller");
    params.delete("isTrending");
    params.delete("isFlashSale");
    params.delete("isMartizoExclusive");
    setSearchParams(params);
  };

  return (
    <div className="border-2 p-5 mx-auto w-3/4 md:w-1/3 lg:w-1/4 ">
      <div className="flex justify-between items-center mb-2">
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
      <div className="flex flex-col gap-3">
        {/*Filter Product by Categories*/}
        <Select
          onValueChange={(value) => handleCategoryChange(value)}
          value={selectedCategory ? selectedCategory : ""}
        >
          <SelectTrigger className="w-full">
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

        {/*Filter Product by Brands */}
        <Select
          onValueChange={(value) => handleBrandChange(value)}
          value={selectedBrand ? selectedBrand : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Product Brands:</SelectLabel>
              {brandsData?.data?.map(
                (item: { _id: string; name: string }, index: number) => (
                  <SelectItem key={index} value={item._id}>
                    {item.name}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/*Filter New Arrival Products by Checkbox */}
        <Label className="flex items-start gap-2 rounded-lg border p-2 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
          <Checkbox
            checked= {isCheckedNewArrival}
            onCheckedChange={(value: boolean) => handleNewArrival(value)}
          />
          <div className="flex flex-col gap-1">
            <p>New Arrival</p>
          </div>
        </Label>

        {/*Filter Best Seller Products by Checkbox */}
        <Label className="flex items-start gap-2 rounded-lg border p-2 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
          <Checkbox
            checked= {isCheckedBestSeller}
            onCheckedChange={(value: boolean) => handleBestSeller(value)}
          />
          <div className="flex flex-col gap-1">
            <p>Best Seller</p>
          </div>
        </Label>

        {/*Filter Trending Products by Checkbox */}
        <Label className="flex items-start gap-2 rounded-lg border p-2 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
          <Checkbox
            checked= {isCheckedTrending}
            onCheckedChange={(value: boolean) => handleTrending(value)}
          />
          <div className="flex flex-col gap-1">
            <p>Trending</p>
          </div>
        </Label>

        {/*Filter Flash Sale Products by Checkbox */}
        <Label className="flex items-start gap-2 rounded-lg border p-2 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
          <Checkbox
            checked= {isCheckedFlashSale}
            onCheckedChange={(value: boolean) => handleFlashSale(value)}
          />
          <div className="flex flex-col gap-1">
            <p>Flash Sale</p>
          </div>
        </Label>

        {/*Filter Martizo Exclusive Products by Checkbox */}
        <Label className="flex items-start gap-2 rounded-lg border p-2 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
          <Checkbox
            checked= {isCheckedMartizoExclusive}
            onCheckedChange={(value: boolean) => handleMartizoExclusive(value)}
          />
          <div className="flex flex-col gap-1">
            <p>Martizo Exclusive</p>
          </div>
        </Label>

      </div>
    </div>
  );
}
