import { axiosClient } from "./axiosClient";

const errorMessage = (err) => err.response?.data?.message || err.message || "Something went wrong";

export const orderService = {
  // GET /orders  (admin: all orders)  -> Order[]
  getAll: async () => {
    const { data } = await axiosClient.get("/orders");
    return data;
  },

  // GET /orders/myorders  (current user's orders, from their auth token)  -> Order[]
  getByUser: async () => {
    const { data } = await axiosClient.get("/orders/myorders");
    return data;
  },

  // GET /orders/vendor/earnings  (vendor only)  -> { totalEarned, totalItemsSold, orderCount }
  getVendorEarnings: async () => {
    const { data } = await axiosClient.get("/orders/vendor/earnings");
    return data;
  },

  updateStatus: async (id, status) => {
    try {
      const { data } = await axiosClient.patch(`/orders/${id}/status`, { status });
      return data;
    } catch (err) {
      throw new Error(errorMessage(err), { cause: err });
    }
  },
};
