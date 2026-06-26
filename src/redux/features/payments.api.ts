import { baseApi } from "@/redux/baseApi";

const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceDownloadUrl: builder.query({
      query: (paymentId) => ({
        url: `/payments/invoice/${paymentId}`,
        method: "GET"
      })
    }),

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
  useGetInvoiceDownloadUrlQuery,
  useGetPaymentByTransactionIdQuery,
  useInitSslPaymentMutation
} = paymentsApi;