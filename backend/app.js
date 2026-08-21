import express from "express"
import connectDB from "./src/config/db.js"
import authRoutes from "./src/routes/auth.routes.js"

const app = express();
connectDB()
app.use(express.json());


app.use("/api/auth", authRoutes);


export default app;