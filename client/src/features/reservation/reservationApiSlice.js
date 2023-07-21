import { apiSlice } from '../../app/api';

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservationLength: builder.query({
      query: () => '/reservations/reservationLength',
    }),
    addNewReservation: builder.mutation({
      query: (newReservation) => ({
        url: '/reservations',
        method: 'POST',
        body: newReservation,
      }),
    }),
  }),
});

export const { useGetReservationLengthQuery, useAddNewReservationMutation } = reservationApiSlice;
