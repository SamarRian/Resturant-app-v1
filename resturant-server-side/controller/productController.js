import multer from "multer";
import Product from "../model/productModel.js";
import Variation from "../model/productVariationModel.js";
import mongoose from "mongoose";
import fs from "fs";
export async function createProductWithVariations(req, res) {
  try {
    const {
      name,
      productType,
      category,
      productCode,
      description,
      price,
      cost,
      quantity,
      enableVariation,
    } = req.body;

    const isVariationEnabled = enableVariation === "true";

    // ✅ ek baar parse
    const parsedVariations =
      isVariationEnabled && req.body.variations
        ? JSON.parse(req.body.variations)
        : [];

    const image = req.file?.path || "";
    // Validation
    if (
      !name ||
      !productType ||
      !category ||
      !productCode ||
      !description ||
      !image ||
      !price ||
      !cost ||
      !quantity
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!["showcase", "cafe"].includes(productType)) {
      return res.status(400).json({ message: "Invalid productType!" });
    }

    // ✅ isVariationEnabled use karo
    if (isVariationEnabled && parsedVariations.length === 0) {
      return res.status(400).json({ message: "Variations required!" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists!" });
    }

    const product = await Product.create({
      name,
      productType,
      category,
      productCode,
      description,
      image,
      price: productType === "cafe" ? null : price,
      cost: productType === "cafe" ? null : cost,
      quantity: productType === "cafe" ? null : quantity,
      enableVariation: isVariationEnabled,
    });

    let createdVariations = [];

    // ✅ isVariationEnabled use karo
    if (isVariationEnabled) {
      const variationDocs = parsedVariations.map((v) => ({
        product: product._id,
        variantName: v.name,
        price: v.price,
        cost: v.cost,
        quantity: v.quantity,
      }));

      createdVariations = await Variation.insertMany(variationDocs);
    }

    res.status(201).json({
      message: "Product created successfully",
      product,
      variations: createdVariations,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res
        .status(400)
        .json({ message: `${duplicateField} already exists!` });
    }
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// GET ALL PRODUCTS WITH VARIATIONS
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().lean();

    const variations = await Variation.find().lean();

    const productsWithVariations = products.map((product) => {
      const productVariations = variations.filter(
        (v) => v.product.toString() === product._id.toString(),
      );

      return {
        ...product,
        variations: productVariations,
      };
    });

    // 🟢 Step 4: Response
    res.status(200).json({
      message: "Products fetched successfully",
      total: productsWithVariations.length,
      products: productsWithVariations,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function getProductById(req, res) {
  console.log(req.params);
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }

    const singleProduct = await Product.findById(id).lean();

    if (!singleProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const variations = await Variation.find({ product: id }).lean();

    if (variations.length === 0 || variations === null) {
      console.log("No variations found for this product");
      return res.status(200).json({
        message: "Variation not found",
        singleProduct: singleProduct,
        variations: variations,
        hasVariations: variations.length > 0,
      });
    }

    return res.status(200).json({
      message: "Single Product fetched successfully",
      singleProduct: singleProduct,
      variations: variations,
      hasVariations: variations.length > 0,
    });
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getProductById Failed ${error.message}`,
    });
  }
}
