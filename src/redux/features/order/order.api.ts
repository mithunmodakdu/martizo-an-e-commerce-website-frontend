import { baseApi } from "@/redux/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderByTransactionId: builder.query({
      query: (transactionId) => ({
        url: `/orders/${transactionId}`,
        method: "GET",
      }),
      providesTags: ["ORDERS"]
    }),

    createOrder: builder.mutation({
      query: (checkoutData) => ({
        url: "/orders/create",
        method: "POST",
        data: checkoutData,
      }),
      invalidatesTags: ["ORDERS", "CART"]
    }),
  }),
});

export const { 
  useGetOrderByTransactionIdQuery,
  useCreateOrderMutation
 } = ordersApi;
