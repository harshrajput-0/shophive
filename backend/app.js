import express from "express"
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import analyticRoutes from "./src/routes/analytics.routes.js";

const app = express();
connectDB()
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticRoutes);


export default app;