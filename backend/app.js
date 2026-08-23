import express from "express"
import connectDB from "./src/config/db.js"
import authRoutes from "./src/routes/auth.routes.js"
import productRoutes from "./src/routes/product.routes.js";

const app = express();
connectDB()
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);


export default app;