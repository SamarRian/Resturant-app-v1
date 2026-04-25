import express from "express";
import protect from "../middleware/auth.middleware.js";
import { register, login, getMe } from "../controller/auth.controller.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route (test ke liye)
router.get("/me", protect, getMe);

export default router;
