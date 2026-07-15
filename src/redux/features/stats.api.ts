import { baseApi } from "../baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStats: builder.query({
      query: () => ({
        url: "/stats/orders",
        method: "GET"
      })
    })
  })
})

export const {
  useGetOrderStatsQuery
} = statsApi;