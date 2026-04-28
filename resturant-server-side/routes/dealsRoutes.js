import express from "express";
import protect from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";
import { getAllDeals, createDeal } from "../controller/dealsController.js";
import multer from "multer";

// const upload = multer();

const router = express.Router();

// Public routes
router.post("/post", upload.single("image"), createDeal);
router.get("/all", getAllDeals);

export default router;
