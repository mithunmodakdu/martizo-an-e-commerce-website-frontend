import { baseApi } from "@/redux/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        body: userInfo
      })
    })
  })
});

export const {useRegisterMutation} = userApi;