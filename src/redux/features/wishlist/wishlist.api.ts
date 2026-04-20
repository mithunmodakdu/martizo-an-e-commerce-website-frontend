import { baseApi } from "@/redux/baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (wishlistItem) => ({
        url: "/wishlist",
        method: "POST",
        data: wishlistItem
      })
    })
  })
})

export const {
  useAddToWishlistMutation
} = wishlistApi;