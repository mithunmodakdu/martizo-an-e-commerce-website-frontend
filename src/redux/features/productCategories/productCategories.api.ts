import { baseApi } from "@/redux/baseApi";

export const productCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProductCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: "/categories/create",
        method: "POST",
        data: categoryInfo
      }),
      invalidatesTags: ["CATEGORY"]
    }),

    getProductCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET"
      }),
      providesTags: ["CATEGORY"],
      transformResponse: (response) => response.data
      
    }) 
  })
});

export const {
  useCreateProductCategoryMutation, 
  useGetProductCategoriesQuery
} = productCategoriesApi;