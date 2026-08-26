import mongoose from "mongoose";
import Order from "../models/order.model.js";
import { sendEmail } from "../utils/email.js";


const sendOrderConfirmationEmail = async (user, order) => {
  const message = `
    <h2>Order Confirmation</h2>
    <p>Hello ${user.name},</p>
    <p>Your order has been successfully placed! Order ID: <strong>${order._id}</strong></p>
    <p>Total Amount: $${order.totalAmount.toFixed(2)}</p>
    <p>It will be shipped to: ${order.address.street}, ${order.address.city}</p>
    <p>Thank you for shopping with ShopNest!</p>
  `;
  await sendEmail({ email: user.email, subject: 'ShopNest - Order Confirmation', message });
};