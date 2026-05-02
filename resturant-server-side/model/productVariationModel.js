import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId, // ← Foreign Key
      ref: "Product", // ← Product se link
      required: [true, "Product required hai"],
    },
    variantName: {
      type: String,
      required: [true, "Variant name required hai"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price required hai"],
      min: 0,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      required: [true, "Cost required hai"],
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

const Variation = mongoose.model("productVariation", variationSchema);
export default Variation;
