import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOTP } from "@/types";

const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<IResponse<null>, ISendOTP>({
      query: (otpInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: otpInfo
      })
    })
  })
})

export const {useSendOtpMutation} = otpApi;