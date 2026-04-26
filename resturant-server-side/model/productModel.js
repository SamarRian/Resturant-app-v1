import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    productType: {
      type: String,
      required: [true, "Product type is required"],
      enum: ["showcase", "cafe"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    productCode: {
      type: String,
      default: "",
     
    },
    cost: {
      type: String, // ✅ cost add kiya
      default: "0",
    },
    price: {
      type: String,
      default: "0",
    },
    quantity: {
      type: String,
      default: "0",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    enableVariation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
