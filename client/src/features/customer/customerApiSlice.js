import { apiSlice } from '../../app/api';

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
      }),
      providesTags: ['Customer'],
    }),
    addNewCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: '/customers',
        method: 'POST',
        body: newCustomer,
      }),
    }),
    updateBasicDetails: builder.mutation({
      query: ({ id, updateCustomer }) => ({
        url: `/customers/updateBasic/${id}`,
        method: 'PUT',
        body: updateCustomer,
      }),
      invalidatesTags: ['Customer'],
    }),
    addNewAddress: builder.mutation({
      query: ({ id, newAddress }) => ({
        url: `/customers/newAddress/${id}`,
        method: 'PUT',
        body: newAddress,
      }),
      invalidatesTags: ['Customer'],
    }),
    updateExistingAddress: builder.mutation({
      query: ({ id, addressId, updateAddress }) => ({
        url: `/customers/updateAddress/${id}/${addressId}`,
        method: 'PUT',
        body: updateAddress,
      }),
      invalidatesTags: ['Customer'],
    }),
    deleteAddress: builder.mutation({
      query: ({ id, addressId }) => ({
        url: `/customers/deleteAddress/${id}/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customer'],
    }),
    updatePassword: builder.mutation({
      query: ({ id, updatePassword }) => ({
        url: `/customers/changePassword/${id}`,
        method: 'PATCH',
        body: updatePassword,
      }),
      invalidatesTags: ['Customer'],
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useAddNewCustomerMutation,
  useAddNewAddressMutation,
  useUpdateBasicDetailsMutation,
  useDeleteAddressMutation,
  useUpdateExistingAddressMutation,
  useUpdatePasswordMutation,
} = customerApiSlice;
