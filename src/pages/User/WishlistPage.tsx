import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import type { IWishListCardItem } from "@/components/modules/Wishlist/wishlist.interface";
import WishlistItemCard from "@/components/modules/Wishlist/WishlistItemCard";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlist.api";

export default function WishlistPage() {
  const { data: wishlistData } = useGetWishlistQuery(undefined);
  console.log(wishlistData);



  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <ContentHeader
          subTitle="Handpicked by You"
          title="Your"
          highlightedWord="Wishlist"
          description="A collection of products you’ve saved for future purchase."
        />

        {/* Items */}
        <div className="space-y-5">
          {wishlistData?.items?.map((item: IWishListCardItem) => (
            <WishlistItemCard
              key={item?.productId?._id}
              item={item}             
            />
          ))}
        </div>
      </div>
    </div>
  );
}
