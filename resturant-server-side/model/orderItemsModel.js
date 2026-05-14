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
      type: Number,
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

    // Kitchen tracking
    kitchenStatus: {
      type: String,
      enum: ["pending", "preparing", "ready", "served"],
      default: "pending",
      index: true,
    },
    preparingAt: {
      type: Date,
      default: null,
    },
    readyAt: {
      type: Date,
      default: null,
    },
    servedAt: {
      type: Date,
      default: null,
    },

    sortOrder: {
      type: Number,
      default: 0,
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
