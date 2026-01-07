/* eslint-disable @typescript-eslint/no-explicit-any */
export type {ISendOTP} from "./otp.types";

export type {ILoginInfo} from "./auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}