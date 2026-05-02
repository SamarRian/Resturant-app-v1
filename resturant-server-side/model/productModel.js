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
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
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
