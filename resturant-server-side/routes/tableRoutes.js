import express from "express";
import {
  getAllTables,
  createTable,
  deleteTableById,
  updateTableById,
  getSingleTable,
} from "../controller/tableController.js";

const router = express.Router();

router.get("/all", getAllTables);
router.post("/post", createTable);
router.delete("/delete/:id", deleteTableById);
router.put("/update/:id", updateTableById);
router.get("/get/:id", getSingleTable);

export default router;
