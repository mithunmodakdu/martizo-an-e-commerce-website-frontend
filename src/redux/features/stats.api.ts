import { baseApi } from "../baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStats: builder.query({
      query: () => ({
        url: "/stats/orders",
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
  useGetOrderStatsQuery,
  useGetUserStatsQuery
} = statsApi;