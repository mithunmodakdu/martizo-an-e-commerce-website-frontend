import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import CategoryCard from "./CategoryCard";
import ContentHeader from "../Shared/ContentHeader/ContentHeader";

export default function CategorySection() {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetProductCategoriesQuery(undefined);

  return (
    <section>
       {/* Header */}
        <ContentHeader
          subTitle="Start Exploring"
          title="Shop Smarter by"
          highlightedWord="Category"
          description="Jump into your favorite categories and discover products tailored just for you."
          btnText="Explore Products by Category"
          btnLink="/products?category=696f45b6268046c0ac86fb94"
        />
        
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
