import { cn } from "@/lib/utils";
import type { IProduct, IProductCardsContainerProps, TProductCards } from "./product.types";
import { ProductCard } from "./ProductCard";



export const ProductCardsContainer = ({
  className,
  productsData,
}: IProductCardsContainerProps) => {
  console.log(className, productsData);

  const productCardsData: TProductCards = productsData?.map(
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
        currency: "USD",
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
    <section className={cn("px-10 py-32", className)}>
      <div className="container">
        <div className="grid place-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productCardsData?.map((item, index) => (
            <ProductCard key={`product-card-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};


