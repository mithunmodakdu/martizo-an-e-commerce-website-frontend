/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { ILoginInfo, IResponse } from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<any>, ILoginInfo>({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: loginInfo
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST"
      })
    })
  })
});

export const {useLoginMutation, useLogoutMutation} = authApi;

