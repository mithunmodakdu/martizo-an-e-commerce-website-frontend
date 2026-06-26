import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo
      })
    }),

    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET"
      }),
      providesTags: ["USER"]
    }) 
  })
});

export const {useRegisterMutation, useGetMeQuery} = userApi;