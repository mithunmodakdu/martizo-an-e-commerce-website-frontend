import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
   const { data: categoryData, isLoading: categoryLoading } =
    useGetProductCategoriesQuery(undefined);
  
  return (
   <div className="mt-10">
      <h2 className="text-foreground font-bold text-2xl mb-2">Shop by Categories</h2>
     <div className="grid grid-cols-4 gap-5">
      {
        !categoryLoading && categoryData?.map((category: {_id: string, name: string, icon: string}) => (
          <CategoryCard  category={category}/>
        ))
      }
    </div>
   </div>
  );
}