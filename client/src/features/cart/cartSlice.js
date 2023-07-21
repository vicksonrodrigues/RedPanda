import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.push(newItem);
    },
    changeQuantity(state, action) {
      const { id } = action.payload;
      const itemToChange = state.find((item) => item.id === id);
      const changedQuantity = {
        ...itemToChange,
        quantity: action.payload.quantity,
        totalCost: action.payload.totalCost,
      };
      return state.map((item) => (item.id !== id ? item : changedQuantity));
    },
    removeItem(state, action) {
      const { id } = action.payload;
      return state.filter((s) => s.id !== id);
    },
    clearCart() {
      return [];
    },
  },
});

export const { addItem, changeQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
