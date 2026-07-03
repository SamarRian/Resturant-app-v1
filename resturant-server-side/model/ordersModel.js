import mongoose from "mongoose";

const posOrderSchema = new mongoose.Schema(
  {
    posSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PosSession",
      default: null,
    },

    orderNumber: {
      type: Number,
      // required: true,
      default: null,
    },
    orderDate: {
      type: Date,
      required: true,
      index: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "disputed",
        "completed",
        "cancelled",
      ],
      default: "pending",
      index: true,
      default: "pending",
    },
    orderSource: {
      type: String,
      enum: ["pos", "web", "mobile"],
      default: "pos",
    },

    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      default: null,
    },
    // customerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Customer",
    //   default: null,
    // },

    orderType: {
      type: String,
      enum: ["dine-in", "takeaway", "delivery"],
      default: "dine-in",
    },
    deliveryAddress: {
      type: String,
      default: null,
    },
    deliveryPhone: {
      type: String,
      default: null,
    },

    // ─── Pricing ───────────────────────────────────────────────────────────────
    subTotal: {
      type: Number,
      default: 0.0,
    },

    // Discount
    discountType: {
      type: String,
      enum: ["percentage", "fixed", null],
      default: null,
    },
    discountValue: {
      type: Number,
      default: 0.0,
    },
    discountAmount: {
      type: Number,
      default: 0.0,
    },

    // Service Charge
    serviceChargeType: {
      type: String,
      enum: ["percentage", "fixed", null],
      default: null,
    },
    serviceChargeValue: {
      type: Number,
      default: 0.0,
    },
    serviceChargeAmount: {
      type: Number,
      default: 0.0,
    },

    // Tax
    taxType: {
      type: String,
      enum: ["inclusive", "exclusive", null],
      default: null,
    },
    taxMethod: {
      type: String,
      enum: ["percentage", "fixed", null],
      default: null,
    },
    taxValue: {
      type: Number,
      default: 0.0,
    },
    taxAmount: {
      type: Number,
      default: 0.0,
    },

    // Totals
    totalAmount: {
      type: Number,
      default: 0.0,
    },
    paidAmount: {
      type: Number,
      default: 0.0,
    },
    dueAmount: {
      type: Number,
      default: 0.0,
    },
    changeAmount: {
      type: Number,
      default: 0.0,
    },

    // ─── Payment ───────────────────────────────────────────────────────────────
    paymentMethod: {
      type: String,
      enum: ["cash", "online", null],
      default: null,
    },
    transactionReference: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid", "refunded"],
      default: "pending",
    },
    paymentNote: {
      type: String,
      default: null,
    },

    // ─── Kitchen Management ────────────────────────────────────────────────────
    kitchenStatus: {
      type: String,
      enum: ["pending", "accepted", "preparing", "ready", "served"],
      default: "pending",
      index: true,
    },
    kitchenAcceptedAt: {
      type: Date,
      default: null,
    },
    kitchenStartedAt: {
      type: Date,
      default: null,
    },
    kitchenReadyAt: {
      type: Date,
      default: null,
    },
    kitchenServedAt: {
      type: Date,
      default: null,
    },

    // ─── Additional Info ───────────────────────────────────────────────────────

    customerId: {
      type: String,
      default: null,
    },

    customerNotes: {
      type: String,
      default: null,
    },
    riderWaiter: {
      type: String,
      default: null,
    },
    kitchenNotes: {
      type: String,
      default: null,
    },
    covers: {
      type: Number,
      default: 1,
    },
    cookingTime: {
      type: Number,
      default: null,
    },

    disputedAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
const PosOrder = mongoose.model("PosOrder", posOrderSchema);
export default PosOrder;
