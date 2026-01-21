import type { ComponentType } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type {ISendOTPInfo, IVerifyOTPInfo} from "./otp.types";
export type {IBrand} from "./brand.types"
export {CreateBrandZodSchema} from "./brand.types"
export {SignupUserZodSchema} from "./user.types"

export type {ILoginInfo} from "./auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    component: ComponentType
  }[];
}

export type TUserRole = "SUPER_ADMIN" | "ADMIN" | "USER";