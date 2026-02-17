import { baseApi } from "@/redux/baseApi";

export const cartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useAddToCartMutation
} = cartsApi;
