import { baseApi } from "@/redux/baseApi";

const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentByTransactionId: builder.query({
      query: (transactionId) => ({
        url: `/payments/${transactionId}`,
        method: "GET"
      })
    }),

    initSslPayment: builder.mutation({
      query: (orderId) => ({
        url: `/payments/init/${orderId}`,
        method: "POST"
      })
    }),
  })
});

export const {
  useGetPaymentByTransactionIdQuery,
  useInitSslPaymentMutation
} = paymentsApi;