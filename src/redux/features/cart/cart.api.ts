import { baseApi } from "@/redux/baseApi";

export const cartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/carts",
        method: "GET"
      }),
      providesTags: ["CART"]
    }),

    deleteCartItem: builder.mutation({
      query: (productId) => ({
        url: `carts/remove/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["CART"]
    }),

    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "/carts/add",
        method: "POST",
        data: cartData
      }),
      invalidatesTags: ["CART"]
    })
  })
});

export const {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useAddToCartMutation
} = cartsApi;
