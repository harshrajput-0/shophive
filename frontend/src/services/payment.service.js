import { axiosClient } from './axiosClient';

const errorMessage = (err) => err.response?.data?.message || err.message || 'Something went wrong';

export const paymentService = {
  // POST /payment/order  body: { items }  -> Razorpay order { id, amount, currency, computedAmount, keyId }
  createOrder: async (items) => {
    try {
      const { data } = await axiosClient.post('/payment/order', { items });
      return data;
    } catch (err) {
      throw new Error(errorMessage(err), { cause: err });
    }
  },

  // POST /payment/verify  body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, address }  -> Order
  verify: async (payload) => {
    try {
      const { data } = await axiosClient.post('/payment/verify', payload);
      return data;
    } catch (err) {
      throw new Error(errorMessage(err), { cause: err });
    }
  },
};