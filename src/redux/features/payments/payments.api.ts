import { baseApi } from "@/redux/baseApi";

const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentByTransactionId: builder.query({
      query: (transactionId) => ({
        url: `/payments/${transactionId}`,
        method: "GET"
      })
    })
  })
});

export const {
  useGetPaymentByTransactionIdQuery
} = paymentsApi;