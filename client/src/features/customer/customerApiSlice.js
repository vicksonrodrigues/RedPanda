import { apiSlice } from '../../app/api';
import { store } from '../../app/store';

// eslint-disable-next-line consistent-return
const config = () => {
  const { token } = store.getState().auth;
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
};

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
        headers: config(),
      }),
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
        headers: config(),
        body: updateCustomer,
      }),
    }),
    addNewAddress: builder.mutation({
      query: ({ id, newAddress }) => ({
        url: `/customers/newAddress/${id}`,
        method: 'PUT',
        headers: config(),
        body: newAddress,
      }),
    }),
    updateExistingAddress: builder.mutation({
      query: ({ id, addressId, updateAddress }) => ({
        url: `/customers/updateAddress/${id}/${addressId}`,
        method: 'PUT',
        headers: config(),
        body: updateAddress,
      }),
    }),
    deleteAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/customers/${id}`,
        method: 'DELETE',
        headers: config(),
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ id, updatePassword }) => ({
        url: `/customers/changePassword/${id}`,
        method: 'PATCH',
        headers: config(),
        body: updatePassword,
      }),
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
