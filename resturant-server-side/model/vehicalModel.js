import mongoose from "mongoose";

const vehicalSchema = mongoose.Schema(
  {
    vehicalNumber: {
      type: String,
      default: "0",
    },
    status: {
      type: String,
      default: "Available",
    },
  },
  { timestamps: true },
);
const Vehical = mongoose.model("Vehical", vehicalSchema);
export default Vehical;
