import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId, // ← Foreign Key
      ref: "Product", // ← Product se link
      required: [true, "Product is required."],
    },
    variantName: {
      type: String,
      required: [true, "Variant name is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

const Variation = mongoose.model("productVariation", variationSchema);
export default Variation;
