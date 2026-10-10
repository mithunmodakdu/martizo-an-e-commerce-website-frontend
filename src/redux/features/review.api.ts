import { baseApi } from "../baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (formData) =>({
        url: "/reviews/create",
        method: "POST",
        data: formData
      }),
      invalidatesTags: ["REVIEWS"]
    })
  })
})

export const {
  useCreateReviewMutation
} = reviewsApi;