import express from "express";
import {
  getAllTables,
  createTable,
  deleteTableById,
  updateTableById,
  getSingleTable,
  updateTableStatus,
} from "../controller/tableController.js";

const router = express.Router();

router.get("/all", getAllTables);
router.post("/post", createTable);
router.delete("/delete/:id", deleteTableById);
router.put("/update/:id", updateTableById);
router.patch("/update/:id/status", updateTableStatus);
router.get("/get/:id", getSingleTable);

export default router;
