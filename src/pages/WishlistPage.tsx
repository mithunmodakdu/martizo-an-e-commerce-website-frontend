import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";

const WishlistPage = () => {
  return (
    <div className="my-14">
       <ContentHeader
          subTitle="Handpicked by You"
          title="Your"
          highlightedWord="Wishlist"
          description="A collection of products you’ve saved for future purchase."
          
        />
      
    </div>
  );
};

export default WishlistPage;