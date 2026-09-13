import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../services/order.service.js";
import { logout } from "./authSlice.js";

export const fetchAllOrders = createAsyncThunk("orders/fetchAll", () => orderService.getAll());
export const fetchMyOrders = createAsyncThunk("orders/fetchMine", (userId) =>
  orderService.getByUser(userId)
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await orderService.updateStatus(id, status);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchVendorEarnings = createAsyncThunk("orders/fetchVendorEarnings", () =>
  orderService.getVendorEarnings()
);

const initialState = { list: [], status: "idle", earnings: null, earningsStatus: "idle" };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Add the new order after a successful payment.
    // Razorpay creates the order, and CheckoutPage adds it here.
    orderPlaced: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.list = state.list.map((o) => (o._id === action.payload._id ? action.payload : o));
      })
      .addCase(fetchVendorEarnings.pending, (state) => {
        state.earningsStatus = "loading";
      })
      .addCase(fetchVendorEarnings.fulfilled, (state, action) => {
        state.earnings = action.payload;
        state.earningsStatus = "succeeded";
      })
      .addCase(fetchVendorEarnings.rejected, (state) => {
        state.earningsStatus = "failed";
      })
      // Clear orders when the user logs out.
      // This also removes temporary order-status changes.
      .addCase(logout, () => initialState);
  },
});

export const { orderPlaced } = ordersSlice.actions;
export default ordersSlice.reducer;

export const selectOrders = (state) => state.orders.list;
export const selectVendorEarnings = (state) => state.orders.earnings;
export const selectVendorEarningsStatus = (state) => state.orders.earningsStatus;