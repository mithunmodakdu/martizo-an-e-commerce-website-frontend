import FlashSaleSection from "@/components/modules/FlashSale/FlashSaleSection";
import Hero from "@/components/modules/Hero/Hero";
import NewArrivalSection from "@/components/modules/NewArrival/NewArrivalSection";
import CategorySection from "@/components/modules/ProductCategory/CategorySection";
import SpecialOffersSection from "@/components/modules/SpecialOffer/SpecialOffersSection";
import TestimonialsSection from "@/components/modules/Testimonial/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/modules/WhyChooseUs/WhyChooseUsSection";


const HomePage = () => {
  return (
    <div className="space-y-15">
      <Hero/>
      <FlashSaleSection/>
      <CategorySection/>
      <NewArrivalSection/>
      <SpecialOffersSection/>
      <WhyChooseUsSection/>
      <TestimonialsSection/>
    </div>
  );
};

export default HomePage;