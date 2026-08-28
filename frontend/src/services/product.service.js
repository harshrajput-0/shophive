
import { axiosClient } from './axiosClient.js';

const errorMessage = (err) => err.response?.data?.message || err.message || 'Something went wrong';

// Builds the multipart form the backend expects from ProductForm's plain values.
const toFormData = ({ name, description, price, category, stock, imageFile }) => {
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('price', price);
    form.append('category', category);
    form.append('stock', stock);
    if (imageFile) form.append('image', imageFile);
    return form;
};

export const productService = {
    // GET /products  -> Product[]  (each has `vendor` populated as { _id, name, avatar, description })
    getAll: async () => {
        const { data } = await axiosClient.get('/products');
        return data;
    },

    // GET /products/:id  -> Product
    getById: async (id) => {
        const { data } = await axiosClient.get(`/products/${id}`);
        return data;
    },

    // GET /products/vendor/:vendorId  -> Product[]  (used for a vendor's public storefront page)
    getByVendor: async (vendorId) => {
        const { data } = await axiosClient.get(`/products/vendor/${vendorId}`);
        return data;
    },

    // POST /products  (vendor only)  multipart/form-data  -> Product
    create: async (data) => {
        try {
            const { data: created } = await axiosClient.post('/products', toFormData(data), {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return created;
        } catch (err) {
            throw new Error(errorMessage(err), { cause: err });
        }
    },

    // PUT /products/:id  (owning vendor only)  multipart/form-data  -> Product
    update: async (id, data) => {
        try {
            const { data: updated } = await axiosClient.put(`/products/${id}`, toFormData(data), {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return updated;
        } catch (err) {
            // If you're catching an error and replacing it with another error, don't throw away the original error.
            // throw new Error(errorMessage(err)); --> throw new Error(errorMessage(err), { cause: err });
            throw new Error(errorMessage(err), { cause: err });
        }
    },

    // DELETE /products/:id  (owning vendor or admin)
    remove: async (id) => {
        try {
            await axiosClient.delete(`/products/${id}`);
            return id;
        } catch (err) {
            throw new Error(errorMessage(err), { cause: err });
        }
    },
};
