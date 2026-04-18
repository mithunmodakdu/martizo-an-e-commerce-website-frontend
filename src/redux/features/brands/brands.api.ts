import { baseApi } from "@/redux/baseApi";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET"
      })
    }),

    getBrandById: builder.query({
      query: (brandId) => ({
        url: `/brands/${brandId}`,
        method: "GET"
      })
    })
  })
})

export const {
  useGetAllBrandsQuery,
  useGetBrandByIdQuery
} = brandsApi;