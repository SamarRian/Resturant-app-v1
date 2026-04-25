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
      type: String,
      required: [true, "Price required hai"],
      min: 0,
    },
    quantity: {
      type: String,
      default: 0,
    },
    cost: {
      type: String,
      required: [true, "Cost required hai"],
      min: 0,
    },
  },
  { timestamps: true },
);

const Variation = mongoose.model("productVariation", variationSchema);
export default Variation;
