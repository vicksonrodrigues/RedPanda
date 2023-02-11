import { apiSlice } from '../../app/api';

export const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => '/menu',
    }),
  }),
});

export const { useGetMenuQuery } = menuApiSlice;
