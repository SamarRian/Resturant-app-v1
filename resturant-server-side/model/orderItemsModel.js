import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PosOrder",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    productName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      enum: ["showcase", "cafe"],
      default: null,
    },

    // Stored as arrays of objects (replaces JSON columns)
    variations: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    addons: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    specialInstructions: {
      type: String,
      default: null,
    },

    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
