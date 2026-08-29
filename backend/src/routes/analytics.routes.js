import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middelware.js";

import { getAdminStats } from "../controllers/analytics.controllers.js";

const router = express.Router();

router.get("/", protect, authorizeRole("admin"), getAdminStats);

export default router;
