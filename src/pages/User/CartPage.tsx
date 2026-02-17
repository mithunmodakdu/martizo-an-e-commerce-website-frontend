import { Cart } from "@/components/modules/Cart/Cart";
import type { ICartItem } from "@/components/modules/Cart/cart.types";
import { FormProvider, useForm } from "react-hook-form";

export default function CartPage() {
  const cartItems: ICartItem[] = [
    {
      product_id: "product-1",
      link: "#",
      name: "Stylish Maroon Sneaker",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/stylish-maroon-sneaker.png",
      price: {
        regular: 354.0,
        currency: "USD",
      },
      quantity: 1,
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
    },
    {
      product_id: "product-2",
      link: "#",
      name: "Bicolor Sweatshirt with Embroidered Logo",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/bicolor-crewneck-sweatshirt-with-embroidered-logo.png",
      price: {
        regular: 499.0,
        currency: "USD",
      },
      quantity: 1,
      details: [
        {
          label: "Color",
          value: "Blue & White",
        },
        {
          label: "Size",
          value: "L",
        },
      ],
    },
    {
      product_id: "product-4",
      link: "#",
      name: "Maroon Leather Handbag",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/maroon-leather-handbag.png",
      price: {
        regular: 245.0,
        currency: "USD",
      },
      quantity: 1,
      details: [
        {
          label: "Color",
          value: "Maroon",
        },
      ],
    },
  ];

  const defaultProducts = cartItems.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price.sale ?? item.price.regular,
  }));

  const form = useForm({
    // resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      // payment: {
      //   method: PAYMENT_METHODS.creditCard,
      // },
      products: defaultProducts,
    },
  });
  
  return (
    <div className="mx-auto">
      <FormProvider {...form}>
        <Cart cartItems={cartItems} form={form}/>
      </FormProvider>
    </div>
  );
}