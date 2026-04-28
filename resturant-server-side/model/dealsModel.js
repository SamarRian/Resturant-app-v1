import mongoose from "mongoose";

const dealSchema = mongoose.Schema({
  dealName: {
    type: String,
    default: "",
    trim: true,
  },
  dealCost: {
    type: Number,
    default: 0,
  },
  dealPrice: {
    type: Number,
    default: 0,
  },
  dealTitle: {
    type: String,
    default: "",
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  displayPOS: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  variantsIncluded: {
    type: Array,
    default: [],
  },
});

const Deals = mongoose.model("Deals", dealSchema);
export default Deals;
