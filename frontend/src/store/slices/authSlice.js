import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authService.login(email, password);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      return await authService.register(name, email, password);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.updateProfile(payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = { user: null, status: "idle", error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("shophive_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { token, ...user } = action.payload;
        state.user = user;
        localStorage.setItem("shophive_token", token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { token, ...user } = action.payload;
        state.user = user;
        localStorage.setItem("shophive_token", token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
