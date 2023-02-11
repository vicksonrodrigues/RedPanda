import { apiSlice } from '../../app/api';

export const galleryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => '/gallery',
    }),
  }),
});

export const { useGetGalleryQuery } = galleryApiSlice;
