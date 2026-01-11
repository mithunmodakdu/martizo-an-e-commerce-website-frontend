export interface ISendOTPInfo {
  email: string
}

export interface IVerifyOTPInfo {
  email: string,
  otp: string
}