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

// ====| GET ORDERS |--------------------------------------------------------------
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate(`userId`, `id name`);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ====| GET MY ORDERS |--------------------------------------------------------------
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ====| UPDATE ORDER STATUS |--------------------------------------------------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.isMock) {
        return res.json({ ...order.toObject(), status: req.body.status || order.status, isMock: true });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// ====| GET VENDOR EARNING |--------------------------------------------------------------
export const getVendorEarning = async (req, res) => {
  try {
    const orders = await Order.find({ "items.vendor": req.user._id, paymentMethod: "razorpay" });

    let totalEarned = 0;
    let totalItemsSold = 0;

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.vendor.toString() === req.user._id.toString()) {
          totalEarned += item.price * item.qty;
          totalItemsSold += item.qty;
        }
      });
    });

    res.json({ totalEarned, totalItemsSold, orderCount: orders.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}