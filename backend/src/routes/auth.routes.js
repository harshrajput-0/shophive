import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/auth.controllers.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/register", loginUser);
router.post("/register", getUsers);

export default router;