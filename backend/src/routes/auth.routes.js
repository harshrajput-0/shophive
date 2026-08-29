import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middelware.js";
import { registerUser, loginUser, getUsers, getVendorById, updateUserRole, updateProfile } from "../controllers/auth.controllers.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);
router.get("/vendors/:id", getVendorById);
router.get("/users", protect, authorizeRole("admin"), getUsers);
router.patch("/users/:id/role", protect, authorizeRole("admin"), updateUserRole);

export default router;