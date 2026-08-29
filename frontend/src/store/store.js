import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice.js";
import uiReducer from "./slices/uiSlice.js";
import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import ordersReducer from "./slices/ordersSlice.js";
import usersReducer from "./slices/usersSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    users: usersReducer,
  },
});
