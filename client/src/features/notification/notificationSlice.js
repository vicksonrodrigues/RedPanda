import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notification',
  initialState: {
    notificationOpen: false,
    notificationType: 'success',
    notificationMessage: '',
  },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = slice.actions;

export default slice.reducer;
