import { apiSlice } from '../../app/api';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // for counter in aboutUs Page
    getOrderLength: builder.query({
      query: () => '/orders/orderLength',
    }),
    addOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
  }),
});

export const { useGetOrderLengthQuery, useAddOrderMutation } = orderApiSlice;
