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

    deleteSelectedOrders: builder.mutation({
      query: (selectedOrderIds) => ({
        url: "/orders/delete-selected-orders",
        method: "DELETE",
        data: selectedOrderIds
      }),
      invalidatesTags: ["ORDERS"]
    }),

    deleteOrderById: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["ORDERS"]
    }),

    getOrderByUserId: builder.query({
      query: () => ({
        url: "/orders/user-orders",
        method: "GET"
      }),
      transformResponse: res => res.data
    }),

    getAllOrders: builder.query({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params
      }),
      transformResponse: res => res.data,
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
  useDeleteSelectedOrdersMutation,
  useDeleteOrderByIdMutation,
  useGetOrderByUserIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useCreateOrderMutation,
} = ordersApi;
