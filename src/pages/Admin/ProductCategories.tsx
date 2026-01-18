import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";

export default function ProductCategories() {
  const {data} = useGetProductCategoriesQuery(undefined)
  console.log(data)
  return (
    <div>
      ProductCategories Page
    </div>
  );
}