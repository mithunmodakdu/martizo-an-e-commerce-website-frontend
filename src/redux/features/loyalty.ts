import { baseApi } from "../baseApi";

const loyaltyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyLoyaltyAccount: builder.query({
      query: () => ({
        url: "/loyalty/my-account",
        method: "GET"
      }),
      transformResponse: res => res.data,
      providesTags: ["POINTS"]
    }),

    getMyLoyaltyAccountWithProgress: builder.query({
      query: () => ({
        url: "/loyalty/my-account-with-progress",
        method: "GET"
      }),
      transformResponse: res => res.data,
      providesTags: ["POINTS"]
    })
  })
})

export const {
  useGetMyLoyaltyAccountQuery,
  useGetMyLoyaltyAccountWithProgressQuery
} = loyaltyApi;