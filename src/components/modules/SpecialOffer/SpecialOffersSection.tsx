import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { Link } from "react-router";
import { ProductCard } from "../Product/ProductCard";
import type { IProduct } from "../Product/product.types";

export default function SpecialOffersSection() {
  const { data: topDiscountProducts } = useGetAllProductsQuery({
    sort: "-discountPercentage",
    page:1,
    limit: 2,
  });

  const { data: smallDiscountProducts } = useGetAllProductsQuery({
    sort: "-discountPercentage",
    page:2,
    limit: 4
    
  });
  // console.log(topDiscountProducts);
  // console.log(smallDiscountProducts);
  const topDiscountProductCardsData = topDiscountProducts?.data?.map(
    (item: IProduct) => ({
      _id: item._id,
      name: item.title,
      slug: item.slug,
      category: item.category,
      image: {
        src: item.thumbnail,
        alt: `Thumbnail of ${item.title}`,
      },
      description:
        item.description.length > 25
          ? item.description.slice(0, 25)
          : item.description,
      price: {
        regular: item.price,
        sale: item.salePrice,
        currency: "BDT",
      },
      variants: item.variants,
      badges: [
        {
          text: item?.isFlashSale && "Flash Sale",
          color: item?.isFlashSale && "oklch(0.577 0.245 27.325)",
        },
        {
          text: item?.isMartizoExclusive && "Exclusive",
          color: item?.isMartizoExclusive && "oklch(0.5941 0.1635 150.03)",
        },
        {
          text: item?.isTrending && "Trending",
          color: item?.isTrending && "oklch(0.841 0.238 128.85)",
        },
        {
          text: item?.isNewArrival && "New",
          color: item?.isNewArrival && "oklch(0.448 0.119 151.328)",
        },
      ],
    }),
  );
  const smallDiscountProductCardsData = smallDiscountProducts?.data?.map(
    (item: IProduct) => ({
      _id: item._id,
      name: item.title,
      slug: item.slug,
      category: item.category,
      image: {
        src: item.thumbnail,
        alt: `Thumbnail of ${item.title}`,
      },
      description:
        item.description.length > 25
          ? item.description.slice(0, 25)
          : item.description,
      price: {
        regular: item.price,
        sale: item.salePrice,
        currency: "BDT",
      },
      variants: item.variants,
      badges: [
        {
          text: item?.isFlashSale && "Flash Sale",
          color: item?.isFlashSale && "oklch(0.577 0.245 27.325)",
        },
        {
          text: item?.isMartizoExclusive && "Exclusive",
          color: item?.isMartizoExclusive && "oklch(0.5941 0.1635 150.03)",
        },
        {
          text: item?.isTrending && "Trending",
          color: item?.isTrending && "oklch(0.841 0.238 128.85)",
        },
        {
          text: item?.isNewArrival && "New",
          color: item?.isNewArrival && "oklch(0.448 0.119 151.328)",
        },
      ],
    }),
  );

  return (
    <section aria-labelledby="special-offers-heading">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-destructive mb-1.5">
            Limited time
          </p>
          <h2
            id="special-offers-heading"
            className="text-xl sm:text-2xl font-medium text-foreground"
          >
            Special offers
          </h2>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="self-start sm:self-auto border-primary text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Link to="/products?filter=sale">View all deals</Link>
        </Button>
      </div>

      {/* Top deals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {topDiscountProductCardsData?.map((item) => (
          <ProductCard key={item._id} {...item} />
        ))}
      </div>
      
      {/* Small deals */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {
          smallDiscountProductCardsData?.map(item => (
            <ProductCard key={item._id} {...item}/>
          ))
        }
      </div>



    </section>
  );
}
