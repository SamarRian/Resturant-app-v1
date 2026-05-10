import express from "express";
import {
  createVehical,
  getAllVehicals,
  updateVehical,
  deleteVehical,
  getSingleVehical,
} from "../controller/vehicalController.js";

const router = express.Router();

router.get("/all", getAllVehicals);
router.post("/post", createVehical);
router.delete("/delete/:id", deleteVehical);
router.put("/update/:id", updateVehical);
router.get("/get/:id", getSingleVehical);

export default router;
