import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOTPInfo, IVerifyOTPInfo } from "@/types";

const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<IResponse<null>, ISendOTPInfo>({
      query: (sendOtpInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: sendOtpInfo
      })
    }),

    verifyOtp: builder.mutation<IResponse<null>, IVerifyOTPInfo>({
      query: (verifyOtpInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: verifyOtpInfo
      })
    })
  })
})

export const {useSendOtpMutation, useVerifyOtpMutation} = otpApi;