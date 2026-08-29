import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalOrder = await Order.countDocuments({});
    const totalProduct = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalVendors = await User.countDocuments({ role: "vendor", isMock: false });

    const realOrders = await Order.find({ paymentMethod: "razorpay" });
    const totalRevenue = realOrders.reduce((account, item) => account + item.totalAmount, 0);
    const mockOrders = await Order.countDocuments({ paymentMethod: "mock" });

    res.json({ totalOrder, totalProduct, totalUsers, totalVendors, totalRevenue, mockOrders }); // No real orders are being carried out so no real orders are added
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
