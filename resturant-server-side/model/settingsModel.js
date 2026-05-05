import mongoose from "mongoose";

const settingsSchema = mongoose.Schema(
  {
    buisnessName: {
      type: String,
      default: "",
    },
    logoImage: {
      type: String,
      default: "",
    },

    deliveryChargePerKM: {
      type: Number,
      default: 0,
    },
    freeDeliveryRange: {
      type: Number,
      default: 0,
    },
    phoneNumbers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);
const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
