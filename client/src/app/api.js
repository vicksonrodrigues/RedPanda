/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../features/auth/authSlice';
import { setNotification } from '../features/notification/notificationSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const { token } = getState().auth;
    if (token && endpoint !== 'refresh') {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 401 && api.getState().auth.token !== null) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      '/auth/refresh',
      { ...api, endpoint: 'refresh' },
      extraOptions,
    );
    console.log('refresh', refreshResult);
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data));

      // retry original query with new access token

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 401) {
        refreshResult.error.data.message = 'Session expired. Please log in again.';
        if (api.getState().auth.token !== null) {
          api.dispatch(
            setNotification({
              notificationOpen: true,
              notificationType: 'error',
              notificationMessage: `${refreshResult.error.data.message}`,
            }),
          );
          api.dispatch(logout());
        }
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Customer'],
  endpoints: () => ({}),
});
