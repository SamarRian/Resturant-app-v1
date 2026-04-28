import express from "express";
import protect from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";
import { register, login, getMe } from "../controller/auth.controller.js";
import {
  createProductWithVariations,
  getAllProducts,
  getProductById,
} from "../controller/productController.js";
import multer from "multer";

// const upload = multer();

const router = express.Router();

// Public routes
router.post("/post", upload.single("image"), createProductWithVariations);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);

export default router;
