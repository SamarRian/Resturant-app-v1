import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true },
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
