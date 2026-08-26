import mongoose from "mongoose";
import Razorpay from "razorpay";
import crypto from "crypto";

import { buildOrderItems } from "../utils/orderPricing";
import { persistOrder } from "./order.controllers";

const getInstance = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

        res.json({ ...razorpayOrder, computedAmount: totalAmount });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Payment Order Creation Failed" });
    }
}