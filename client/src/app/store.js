/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api';

import notificationReducer from '../features/notification/notificationSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
