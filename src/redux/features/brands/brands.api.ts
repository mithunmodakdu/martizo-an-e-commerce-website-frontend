import { baseApi } from "@/redux/baseApi";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET"
      })
    })
  })
})

export const {
  useGetAllBrandsQuery
} = brandsApi;