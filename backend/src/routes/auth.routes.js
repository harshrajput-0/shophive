import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middelware.js";
import { registerUser, loginUser, getUsers } from "../controllers/auth.controllers.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, authorizeRole("admin"), getUsers);

export default router;