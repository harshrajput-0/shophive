import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const idx = state.items.findIndex((x) => x.productId === item.productId);
      if (idx >= 0) state.items[idx] = item;
      else state.items.push(item);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((x) => x.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((a, i) => a + i.qty, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((a, i) => a + i.price * i.qty, 0);
