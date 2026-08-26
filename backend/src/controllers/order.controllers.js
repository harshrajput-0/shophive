import mongoose from "mongoose";
import Order from "../models/order.model.js";
import { sendEmail } from "../utils/email.js";
import { buildOrderItems, decrementStock } from "../utils/orderPricing.js";


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

// ====| PERSIST ORDER |--------------------------------------------------------------
export const persistOrder = async ({ user, items, totalAmount, address, paymentMethod, razorpay = {} }) => {
  const order = new Order({
    userId: user._id,
    items,
    totalAmount,
    address,
    paymentMethod,
    ...razorpay
  });
  const created = await order.save();
  await decrementStock(items);
  await sendOrderConfirmationEmail(user, created);
  return created;
};

// ====| BUILD FAKE ORDER |--------------------------------------------------------------
export const buildFakeOrder = ({ user, items, totalAmount, address, paymentMethod }) => ({
  _id: new mongoose.Types.ObjectId(),
  userId: user._id,
  items,
  totalAmount,
  address,
  paymentMethod,
  status: 'Pending',
  isMock: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// ====| CREATE MOCK ORDER |--------------------------------------------------------------
export const createMockOrder = async (req, res) => {
  try {
    const { items: cartItems, address } = req.body;
    const { items, totalAmount } = await buildOrderItems(cartItems);

    if (req.user.isMock) {
      return res.status(201).json(
        buildFakeOrder({ user: req.user, items, totalAmount, address, paymentMethod: 'mock' })
      );
    }

    const created = await persistOrder({
      user: req.user,
      items,
      totalAmount,
      address,
      paymentMethod: 'mock'
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


// ====| GET ORDERS |--------------------------------------------------------------
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate(`userId`, `id name`);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}