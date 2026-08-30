import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      // Removed since vendor can edit them
      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  address: {
    fullName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  paymentId: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["mock", "razorpay"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;