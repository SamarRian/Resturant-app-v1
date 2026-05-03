import mongoose from "mongoose";

const tableSchema = mongoose.Schema(
  {
    tableName: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true },
);
const Table = mongoose.model("Table", tableSchema);
export default Table;
