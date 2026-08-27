import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

export const fetchProducts = createAsyncThunk('products/fetchAll', () => productService.getAll());
export const createProduct = createAsyncThunk('products/create', (data) => productService.create(data));
export const updateProduct = createAsyncThunk('products/update', ({ id, data }) => productService.update(id, data));
export const deleteProduct = createAsyncThunk('products/delete', (id) => productService.remove(id));

const initialState = { list: [], status: 'idle' };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload; })
      .addCase(createProduct.fulfilled, (state, action) => { state.list.push(action.payload); })
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
