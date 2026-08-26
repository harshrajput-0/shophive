import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middelware.js";

import { createMockOrder, getMyOrders, getOrders  } from "../controllers/order.controllers";

const router = express.Router();

router.post("/mock", protect, createMockOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, authorizeRole("admin"), getOrders);