import FlashSaleSection from "@/components/modules/FlashSale/FlashSaleSection";
import Hero from "@/components/modules/Hero/Hero";
import CategorySection from "@/components/modules/ProductCategory/CategorySection";

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <FlashSaleSection/>
      <CategorySection/>

    </div>
  );
};

export default HomePage;