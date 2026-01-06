import { baseApi } from "@/redux/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo
      })
    })
  })
});

export const {useRegisterMutation} = userApi;