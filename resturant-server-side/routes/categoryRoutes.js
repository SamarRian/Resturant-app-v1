import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getSingleCategory,
  updateCategoryById,
} from "../controller/categoryController.js";

const router = express.Router();

router.get("/all", getAllCategories);
router.post("/post", createCategory);
router.delete("/delete/:id", deleteCategoryById);
router.put("/update/:id", updateCategoryById);
router.get("/get/:id", getSingleCategory);

export default router;
