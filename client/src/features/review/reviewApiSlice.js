import { apiSlice } from '../../app/api';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query({
      query: () => '/reviews',
    }),
  }),
});

export const { useGetReviewQuery } = reviewApiSlice;
