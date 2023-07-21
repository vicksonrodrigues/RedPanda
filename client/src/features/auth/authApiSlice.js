/* eslint-disable import/prefer-default-export */
import { apiSlice } from '../../app/api';
import { setNotification } from '../notification/notificationSlice';
import { logout, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          dispatch(
            setNotification({
              notificationMessage: 'Logout error. Please try again later.',
              notificationType: 'error',
              notificationOpen: true,
            }),
          );
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        methode: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch {
          console.log('Error in refresh');
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;
