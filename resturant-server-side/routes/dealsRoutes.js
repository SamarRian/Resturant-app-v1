import express from "express";
import protect from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";
import {
  getAllDeals,
  createDeal,
  addVariationToDeal,
  getDealById,
  deleteDealById,
  deleteVariant,
  updateDeal,
} from "../controller/dealsController.js";
import multer from "multer";

// const upload = multer();

const router = express.Router();

// Public routes
router.post("/post", upload.single("image"), createDeal);
router.get("/all", getAllDeals);
router.post("/post/:id", addVariationToDeal);
router.get("/get/:id", getDealById);
router.delete("/delete/:id", deleteDealById);
router.delete("/delete/:dealId/variant/:variantId", deleteVariant);
router.put("/update/:dealId", upload.single("image"), updateDeal);
export default router;
