import { baseApi } from "../baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyStats: builder.query({
      query: () => ({
        url: "/stats/my-stats",
        method: "GET"
      }),
      transformResponse: res => res.data
    }),

    getOrderStats: builder.query({
      query: () => ({
        url: "/stats/orders",
        method: "GET"
      }),
      transformResponse: res => res.data
    }),

    getProductStats: builder.query({
      query: () => ({
        url: "/stats/products",
        method: "GET"
      }),
      transformResponse: res => res.data
    }),

    getUserStats: builder.query({
      query: () => ({
        url: "/stats/users",
        method: "GET"
      }),
      transformResponse: res => res.data
    })
  })
})

export const {
  useGetMyStatsQuery,
  useGetOrderStatsQuery,
  useGetProductStatsQuery,
  useGetUserStatsQuery
} = statsApi;