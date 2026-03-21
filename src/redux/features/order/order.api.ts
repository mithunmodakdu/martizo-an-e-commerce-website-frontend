import { baseApi } from "@/redux/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (checkoutData) => ({
        url: "/orders/create",
        method: "POST",
        data: checkoutData,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
