import { baseApi } from "@/redux/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
        
      }),
      providesTags: ["PRODUCTS"]
    }),

    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "GET"
      }),
      transformResponse: (response) => response.data,
      providesTags: ["PRODUCT"]
    }),


    deleteProduct: builder.mutation({
      query: (productId) =>({
        url: `/products/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["PRODUCTS", "PRODUCT"]
    }),

    updateProduct: builder.mutation({
      query: (dataToUpdate) => {
        
        const {productSlug, formData} = dataToUpdate;

        return {
          url: `/products/update/${productSlug}`,
          method: "PATCH",
          data: formData
        }
      },
      invalidatesTags: ["PRODUCTS", "PRODUCT"]
      
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/create",
        method: "POST",
        data: formData
      }),
      invalidatesTags: ["PRODUCTS"]
    })
  })
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  // useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation
} = productsApi;

