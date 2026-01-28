import { baseApi } from "@/redux/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
        
      })
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/create",
        method: "POST",
        data: formData
      })
    })
  })
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation
} = productsApi;

