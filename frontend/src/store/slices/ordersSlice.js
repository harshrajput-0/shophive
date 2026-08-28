import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/order.service.js';

export const fetchAllOrders = createAsyncThunk('orders/fetchAll', () => orderService.getAll());
export const fetchMyOrders = createAsyncThunk('orders/fetchMine', (userId) => orderService.getByUser(userId));

export const placeOrder = createAsyncThunk('orders/place', async (data, { rejectWithValue }) => {
  try {
    return await orderService.create(data);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    return await orderService.updateStatus(id, status);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = { list: [], status: 'idle' };

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.list = action.payload; state.status = 'succeeded'; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.list = action.payload; state.status = 'succeeded'; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.list = state.list.map((o) => (o._id === action.payload._id ? action.payload : o));
      });
  },
});

export default ordersSlice.reducer;

export const selectOrders = (state) => state.orders.list;
