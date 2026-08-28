import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/user.service.js';

export const fetchUsers = createAsyncThunk('users/fetchAll', () => userService.getAll());
export const changeUserRole = createAsyncThunk('users/changeRole', async ({ id, role }, { rejectWithValue }) => {
  try {
    return await userService.updateRole(id, role);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = { list: [], status: 'idle' };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => { state.list = action.payload; state.status = 'succeeded'; })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.list = state.list.map((u) => (u._id === action.payload._id ? action.payload : u));
      });
  },
});

export default usersSlice.reducer;

export const selectUsers = (state) => state.users.list;
export const selectVendorById = (id) => (state) => state.users.list.find((u) => u._id === id && u.role === 'vendor');
