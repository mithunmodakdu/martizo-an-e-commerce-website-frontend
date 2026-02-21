import { Cart } from "@/components/modules/Cart/Cart";
import type { ICartItem } from "@/components/modules/Cart/cart.types";
import { useGetCartQuery } from "@/redux/features/cart/cart.api";
import { FormProvider, useForm } from "react-hook-form";

export default function CartPage() {
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(undefined);
  console.log(cartData?.data?.items);
  // const cartItems: ICartItem[] = [
  //   {
  //     productId: "product-1",
  //     link: "#",
  //     name: "Stylish Maroon Sneaker",
  //     image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/stylish-maroon-sneaker.png",
  //     price: {
  //       regular: 354.0,
  //       currency: "USD",
  //     },
  //     quantity: 1,
  //     details: [
  //       {
  //         label: "Color",
  //         value: "Red",
  //       },
  //       {
  //         label: "Size",
  //         value: "36",
  //       },
  //     ],
  //   },
  //   {
  //     productId: "product-2",
  //     link: "#",
  //     name: "Bicolor Sweatshirt with Embroidered Logo",
  //     image:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/bicolor-crewneck-sweatshirt-with-embroidered-logo.png",
  //     price: {
  //       regular: 499.0,
  //       currency: "USD",
  //     },
  //     quantity: 1,
  //     details: [
  //       {
  //         label: "Color",
  //         value: "Blue & White",
  //       },
  //       {
  //         label: "Size",
  //         value: "L",
  //       },
  //     ],
  //   },
  //   {
  //     productId: "product-4",
  //     link: "#",
  //     name: "Maroon Leather Handbag",
  //     image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/maroon-leather-handbag.png",
  //     price: {
  //       regular: 245.0,
  //       currency: "USD",
  //     },
  //     quantity: 1,
  //     details: [
  //       {
  //         label: "Color",
  //         value: "Maroon",
  //       },
  //     ],
  //   },
  // ];

  const cartItems: ICartItem[] = cartData?.data?.items?.map(
    (item: ICartItem) => ({
      productId: item.productId,
      link: "#",
      name: item.name,
      image: {
        src: item.image?.src,
        alt: item.image?.alt,
      },
      price: {
        regular: item.price.regular,
        sale: item.price.sale,
        currency: item.price.currency,
      },
      quantity: item.quantity,
      details: [
        {
          label: "Color",
          value: "Red",
        },
        {
          label: "Size",
          value: "36",
        },
      ],
    }),
  );

  console.log(cartItems);

  const defaultProducts = cartItems?.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price.sale ?? item.price.regular,
  }));

  const form = useForm({
    defaultValues: {
      products: defaultProducts,
    },
  });

  return (
    <div className="max-w-3xl mx-auto">
      <FormProvider {...form}>
        {cartLoading ? (
          <div>
            <h1>There is no product in the cart</h1>
          </div>
        ) : (
          <Cart cartItems={cartItems} />
        )}
      </FormProvider>
    </div>
  );
}
