import { baseApi } from "@/redux/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
        
      }),
      providesTags: ["PRODUCT"]
    }),

    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "GET"
      }),
      transformResponse: (response) => response.data,
    }),

    deleteProduct: builder.mutation({
      query: (productId) =>({
        url: `/products/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["PRODUCT"]
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/create",
        method: "POST",
        data: formData
      }),
      invalidatesTags: ["PRODUCT"]
    })
  })
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  // useDeleteProductMutation,
  useCreateProductMutation
} = productsApi;

