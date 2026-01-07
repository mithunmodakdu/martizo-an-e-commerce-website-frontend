import { baseApi } from "@/redux/baseApi";
import type { ILoginInfo } from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<unknown, ILoginInfo>({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: loginInfo
      })
    })
  })
});

export const {useLoginMutation} = authApi;

