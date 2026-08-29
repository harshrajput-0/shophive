import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/order.service.js';

export const fetchAllOrders = createAsyncThunk('orders/fetchAll', () => orderService.getAll());
export const fetchMyOrders = createAsyncThunk('orders/fetchMine', (userId) => orderService.getByUser(userId));

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    return await orderService.updateStatus(id, status);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchVendorEarnings = createAsyncThunk('orders/fetchVendorEarnings', () => orderService.getVendorEarnings());

const initialState = { list: [], status: 'idle', earnings: null, earningsStatus: 'idle' };

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // The real Razorpay order is created by paymentService.verify() directly
    // (not a thunk, since it's driven by the Razorpay modal's callback), so
    // CheckoutPage dispatches this to add it to the list once placed.
    orderPlaced: (state, action) => { state.list.push(action.payload); },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.list = action.payload; state.status = 'succeeded'; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.list = action.payload; state.status = 'succeeded'; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.list = state.list.map((o) => (o._id === action.payload._id ? action.payload : o));
      })
      .addCase(fetchVendorEarnings.pending, (state) => { state.earningsStatus = 'loading'; })
      .addCase(fetchVendorEarnings.fulfilled, (state, action) => {
        state.earnings = action.payload;
        state.earningsStatus = 'succeeded';
      })
      .addCase(fetchVendorEarnings.rejected, (state) => { state.earningsStatus = 'failed'; });
  },
});

export const { orderPlaced } = ordersSlice.actions;
export default ordersSlice.reducer;

export const selectOrders = (state) => state.orders.list;
export const selectVendorEarnings = (state) => state.orders.earnings;
export const selectVendorEarningsStatus = (state) => state.orders.earningsStatus;