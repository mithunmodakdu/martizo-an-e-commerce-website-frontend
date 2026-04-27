import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetProductCategoriesQuery(undefined);

  return (
    <section>
      <h2 className="text-foreground font-bold text-2xl mb-2">
        Shop by Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {!categoryLoading &&
          categoryData?.map(
            (category: { _id: string; name: string; icon: string }) => (
              <CategoryCard key={category._id} category={category} />
            ),
          )}
      </div>
    </section>
  );
}
