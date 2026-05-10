import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
  {
    personName: {
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
const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
