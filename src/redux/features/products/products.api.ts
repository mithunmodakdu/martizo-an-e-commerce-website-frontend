import { baseApi } from "@/redux/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useCreateProductMutation
} = productsApi;

