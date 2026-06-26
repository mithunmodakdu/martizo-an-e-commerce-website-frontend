import { baseApi } from "@/redux/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderByTransactionId: builder.query({
      query: (transactionId) => ({
        url: `/orders/transaction/${transactionId}`,
        method: "GET",
      }),
      transformResponse: res => res.data,
      providesTags: ["ORDER"],
    }),

    getOrderByOrderNo: builder.query({
      query: (orderNo) => ({
        url: `/orders/get-order/${orderNo}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
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
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params
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
  useGetOrderByOrderNoQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useCreateOrderMutation,
} = ordersApi;
