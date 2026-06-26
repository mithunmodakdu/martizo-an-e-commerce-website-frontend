import { baseApi } from "@/redux/baseApi";

export const productBrandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      providesTags: ["BRAND"],
      transformResponse: (response) => response.data,
    }),

    getProductBrandById: builder.query({
      query: (categoryId) => ({
        url: `/brands/${categoryId}`,
        method: "GET",
      }),

      transformResponse: (response) => response.data,
    }),

    createProductBrand: builder.mutation({
      query: (formData) => ({
        url: "/brands/create",
        method: "POST",
        data: formData,
      }),

      invalidatesTags: ["BRAND"],
    }),

    updateProductBrand: builder.mutation({
      query: (dataToUpdate) => {
        const { brandId, formData } = dataToUpdate;

        return {
          url: `/brands/${brandId}`,
          method: "PATCH",
          data: formData,
        };
      },

      invalidatesTags: ["BRAND"],
    }),

    deleteProductBrand: builder.mutation({
      query: (brandId) => ({
        url: `/brands/${brandId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["BRAND"],
    }),
  }),
});

export const {
  useGetProductBrandsQuery,
  useGetProductBrandByIdQuery,
  useCreateProductBrandMutation,
  useUpdateProductBrandMutation,
  useDeleteProductBrandMutation
} = productBrandsApi;
