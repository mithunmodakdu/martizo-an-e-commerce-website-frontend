import { baseApi } from "@/redux/baseApi";

export const productCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["CATEGORY"],
      transformResponse: (response) => response.data,
    }),

    getProductCategoryById: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "GET",
      }),
    
      transformResponse: (response) => response.data,
    }),

    createProductCategory: builder.mutation({
      query: (formData) => ({
        url: "/categories/create",
        method: "POST",
        data: formData,
      }),

      invalidatesTags: ["CATEGORY"],
    }),

    updateProductCategory: builder.mutation({
      query: (dataToUpdate) => {
        const { categoryId, formData} = dataToUpdate;

        return {
          url: `/categories/${categoryId}`,
          method: "PATCH",
          data: formData,
        };
      },

      invalidatesTags: ["CATEGORY"],
    }),

    
  }),
});

export const {
  useGetProductCategoriesQuery,
  useGetProductCategoryByIdQuery,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation
} = productCategoriesApi;
