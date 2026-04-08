import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
   const { data: categoryData, isLoading: categoryLoading } =
    useGetProductCategoriesQuery(undefined);
  
  return (
    <div className="py-10 grid grid-cols-4">
      {
        !categoryLoading && categoryData?.map((category: {_id: string, name: string, icon: string}) => (
          <CategoryCard  category={category}/>
        ))
      }
    </div>
  );
}