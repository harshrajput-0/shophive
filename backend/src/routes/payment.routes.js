import express from "express";
import { protect } from "../middlewares/auth.middleware";

import { createOrder } from "../controllers/payment.controllers";

const router = express.Router();

router.post("/order", protect, createOrder);

export default router;