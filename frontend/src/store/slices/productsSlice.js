import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../../services/product.service.js";

export const fetchProducts = createAsyncThunk("products/fetchAll", () => productService.getAll());

export const createProduct = createAsyncThunk(
  "products/create",
  async (data, { rejectWithValue }) => {
    try {
      return await productService.create(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await productService.update(id, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await productService.remove(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = { list: [], status: "idle" };

// Products are loaded when the app starts.
// Public pages use the same product list and don't fetch again.
// Instead, Header fetches fresh products from the database after logout.
// This also removes any unsaved changes made using mock account.

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.list = state.list.map((p) => (p._id === action.payload._id ? action.payload : p));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;

export const selectProducts = (state) => state.products.list;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductById = (id) => (state) => state.products.list.find((p) => p._id === id);
export const selectProductsByVendor = (vendorId) => (state) =>
  state.products.list.filter((p) => (p.vendor?._id || p.vendor) === vendorId);