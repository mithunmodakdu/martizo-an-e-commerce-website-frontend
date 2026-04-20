import { baseApi } from "@/redux/baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "PATCH",        
      }),

      invalidatesTags: ["WISHLIST"]
    }),

    addToWishlist: builder.mutation({
      query: (wishlistItem) => ({
        url: "/wishlist",
        method: "POST",
        data: wishlistItem
      }),
      
      invalidatesTags: ["WISHLIST"]
    })
  })
})

export const {
  useRemoveFromWishlistMutation,
  useAddToWishlistMutation
} = wishlistApi;