import mongoose from "mongoose";
import Category from "../model/categoryModel.js";

// ✅ GET ALL CATEGORIES
export async function getAllCategories(req, res) {
  try {
    const categoryData = await Category.find().lean();

    if (!categoryData || categoryData.length === 0) {
      return res.status(200).json({
        message: "No categories found.",
        categoryData: [],
      });
    }

    return res.status(200).json({
      message: "Categories fetched successfully.",
      categoryData,
    });
  } catch (error) {
    console.error("Get all categories error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getAllCategories Failed: ${error.message}`,
    });
  }
}

// ✅ GET SINGLE CATEGORY
export async function getSingleCategory(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    const category = await Category.findById(id).lean();

    if (!category) {
      return res.status(404).json({
        message: `Category with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Category fetched successfully.",
      category,
    });
  } catch (error) {
    console.error("Get single category error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getSingleCategory Failed: ${error.message}`,
    });
  }
}

// ✅ CREATE CATEGORY
export async function createCategory(req, res) {
  try {
    const { categoryName } = req.body;

    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({ message: "Category name is required." });
    }

    const existingCategory = await Category.findOne({
      categoryName: categoryName.trim(),
    });

    if (existingCategory) {
      return res.status(409).json({
        message: `Category with name "${categoryName}" already exists.`,
      });
    }

    const newCategory = await Category.create({
      categoryName: categoryName.trim(),
    });

    return res.status(201).json({
      message: "Category created successfully.",
      newCategory,
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `createCategory Failed: ${error.message}`,
    });
  }
}

// ✅ UPDATE CATEGORY BY ID
export async function updateCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({ message: "Category name is required." });
    }

    // const existingCategory = await Category.findOne({
    //   categoryName: categoryName.trim(),
    // });

    // if (existingCategory) {
    //   return res.status(409).json({
    //     message: `Category with name "${categoryName}" already exists.`,
    //   });
    // }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName: categoryName.trim() },
      { new: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: `Category with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Category updated successfully.",
      updatedCategory,
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `updateCategoryById Failed: ${error.message}`,
    });
  }
}

// ✅ DELETE CATEGORY BY ID
export async function deleteCategoryById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: `Category with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully.",
      deletedCategory,
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `deleteCategoryById Failed: ${error.message}`,
    });
  }
}
