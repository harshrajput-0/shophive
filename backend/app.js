import express from "express"
import connectDB from "./src/config/db.js"

const app = express();
connectDB()
app.use(express.json());



export default app;