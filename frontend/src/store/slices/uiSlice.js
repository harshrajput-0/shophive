import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = { toasts: [] };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast: {
      reducer: (state, action) => {
        state.toasts.push(action.payload);
      },
      prepare: (message, kind = "default") => ({ payload: { id: nanoid(), message, kind } }),
    },
    dismissToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showToast, dismissToast } = uiSlice.actions;
export default uiSlice.reducer;
export const selectToasts = (state) => state.ui.toasts;
