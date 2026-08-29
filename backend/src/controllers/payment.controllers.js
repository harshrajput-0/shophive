import Razorpay from "razorpay";
import crypto from "crypto";

import { buildOrderItems } from "../utils/orderPricing.js";
import { persistOrder } from "./order.controllers.js";

const getInstance = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ====| CREATE ORDER |------------------------------------------------------------------
export const createOrder = async (req, res) => {
    try {
        const { items: cartItems } = req.body;
        const { totalAmount } = await buildOrderItems(cartItems);

        const instance = getInstance();
        const options = {
            amount: Math.round(totalAmount * 100),
            currency: "INR",
        };

        const razorpayOrder = await instance.orders.create(options);
        if (!razorpayOrder) return res.status(500).json({ message: 'Could not create Razorpay order' });

        res.json({ ...razorpayOrder, computedAmount: totalAmount, keyId: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Payment Order Creation Failed" });
    }
}

// ====| VERIFY PAYMENT |------------------------------------------------------------------
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, address } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body).digest('hex');
    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }
    const { items: builtItems, totalAmount } = await buildOrderItems(items);
    const order = await persistOrder({
      user: req.user, items: builtItems, totalAmount, address,
      paymentMethod: 'razorpay',
      razorpay: { paymentId: razorpay_payment_id }
    });
    res.status(201).json(order);
  } catch (error) {
    // Payment already succeeded on Razorpay's side at this point, so this is
    // a stock/validation failure while placing the order, not a payment failure.
    res.status(error.status || 500).json({ message: error.message || 'Order could not be placed after payment' });
  }
};