import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middelware.js";

import { createMockOrder, getMyOrders, getOrders, getVendorEarning, updateOrderStatus } from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/mock", protect, createMockOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/vendor/earnings", protect, authorizeRole("vendor"), getVendorEarning);

router.get("/", protect, authorizeRole("admin"), getOrders);
router.patch("/:id/status", protect, authorizeRole("admin"), updateOrderStatus);

export default router;