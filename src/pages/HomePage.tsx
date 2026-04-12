import FlashSaleSection from "@/components/modules/FlashSale/FlashSaleSection";
import Hero from "@/components/modules/Hero/Hero";
import NewArrivalSection from "@/components/modules/NewArrival/NewArrivalSection";
import CategorySection from "@/components/modules/ProductCategory/CategorySection";
import { WhyChooseUsSection } from "@/components/modules/WhyChooseUs/WhyChooseUsSection";


const HomePage = () => {
  return (
    <div className="space-y-15">
      <Hero/>
      <FlashSaleSection/>
      <CategorySection/>
      <NewArrivalSection/>
      <WhyChooseUsSection/>
     
    

    </div>
  );
};

export default HomePage;