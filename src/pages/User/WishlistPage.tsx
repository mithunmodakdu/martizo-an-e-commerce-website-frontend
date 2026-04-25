import ContentHeader from "@/components/modules/Shared/ContentHeader/ContentHeader";
import WishlistItemCard from "@/components/modules/Wishlist/WishlistItemCard";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlist.api";

export default function WishlistPage() {
  const { data: wishlistData } = useGetWishlistQuery(undefined);
  console.log(wishlistData);

  const Wishlist_Items = [
    {
      id: 1,
      name: "Noise Cancelling Headphones Pro",
      brand: "SoundCore",
      price: 249.99,
      originalPrice: 329.99,
      image: "https://placehold.co/300x300/e2e8f0/64748b?text=Headphones",
      rating: 4.7,
      reviews: 1240,
      inStock: true,
      category: "Electronics",
      tags: ["sale", "popular"],
    },
    {
      id: 2,
      name: "Minimalist Leather Wallet",
      brand: "Bellroy",
      price: 89.0,
      originalPrice: null,
      image: "https://placehold.co/300x300/fef3c7/92400e?text=Wallet",
      rating: 4.5,
      reviews: 870,
      inStock: true,
      category: "Accessories",
      tags: ["trending"],
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      brand: "Herman Miller",
      price: 1299.0,
      originalPrice: 1499.0,
      image: "https://placehold.co/300x300/dcfce7/166534?text=Chair",
      rating: 4.9,
      reviews: 3200,
      inStock: false,
      category: "Furniture",
      tags: ["sale", "premium"],
    },
    {
      id: 4,
      name: "Mechanical Keyboard TKL",
      brand: "Keychron",
      price: 119.0,
      originalPrice: null,
      image: "https://placehold.co/300x300/ede9fe/4c1d95?text=Keyboard",
      rating: 4.6,
      reviews: 560,
      inStock: true,
      category: "Electronics",
      tags: [],
    },
    {
      id: 5,
      name: "Stainless Water Bottle 32oz",
      brand: "Hydro Flask",
      price: 44.95,
      originalPrice: 54.95,
      image: "https://placehold.co/300x300/fce7f3/831843?text=Bottle",
      rating: 4.8,
      reviews: 2100,
      inStock: true,
      category: "Lifestyle",
      tags: ["sale"],
    },
    {
      id: 6,
      name: "Ultralight Running Shoes",
      brand: "Brooks",
      price: 159.99,
      originalPrice: null,
      image: "https://placehold.co/300x300/fff7ed/7c2d12?text=Shoes",
      rating: 4.4,
      reviews: 430,
      inStock: false,
      category: "Sports",
      tags: ["popular"],
    },
  ];

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
        <div className="space-y-3">
          {Wishlist_Items.map((item) => (
            <WishlistItemCard
              key={item.id}
              item={item}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
}
