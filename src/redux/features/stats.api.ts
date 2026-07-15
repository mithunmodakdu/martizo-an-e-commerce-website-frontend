import { baseApi } from "../baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStats: builder.query({
      query: () => ({
        url: "/stats/orders",
        method: "GET"
      }),
      transformResponse: res => res.data
    })
  })
})

export const {
  useGetOrderStatsQuery
} = statsApi;