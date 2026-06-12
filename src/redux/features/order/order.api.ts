import { baseApi } from "@/redux/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderByTransactionId: builder.query({
      query: (transactionId) => ({
        url: `/orders/transaction/${transactionId}`,
        method: "GET",
      }),
      providesTags: ["ORDER"],
    }),

    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["ORDER"],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),

    updateOrder: builder.mutation({
      query: (dataToUpdate) => {
        const { orderId, data } = dataToUpdate;

        return {
          url: `/orders/update/${orderId}`,
          method: "PATCH",
          data
        };
      },

      invalidatesTags: ["ORDERS"]
    }),

    createOrder: builder.mutation({
      query: (checkoutData) => ({
        url: "/orders/create",
        method: "POST",
        data: checkoutData,
      }),
      invalidatesTags: ["ORDERS", "CART"],
    }),
  }),
});

export const {
  useGetOrderByTransactionIdQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useCreateOrderMutation,
} = ordersApi;
