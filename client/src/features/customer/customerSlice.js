import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'customer',
  initialState: null,
  reducers: {
    initializeWith(state, { payload }) {
      return payload;
    },
  },
});
export const { initializeWith } = slice.actions;
export default slice.reducer;
