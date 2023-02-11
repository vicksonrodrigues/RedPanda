import { apiSlice } from '../../app/api';

export const restaurantEventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurantEvent: builder.query({
      query: () => '/events',
    }),
  }),
});

export const { useGetRestaurantEventQuery } = restaurantEventApiSlice;
