import { createSlice } from '@reduxjs/toolkit';
import customerService from '../services/customers';

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

export const currentCustomer = (id) => async (dispatch) => {
  customerService.getCustomer(id).then((customer) => {
    dispatch(initializeWith(customer));
  });
};
