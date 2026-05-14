import mongoose from "mongoose";

const posSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startingBalance: {
      type: Number,
      default: 0,
    },
    endingBalance: {
      type: Number,
      default: null,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    cashInHand: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: null,
    },
    startedAt: {
      type: Date,
      required: true,
    },
    endedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const PosSession = mongoose.model("PosSession", posSessionSchema);

export default PosSession;
