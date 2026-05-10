import express from "express";
import {
  getAllStaff,
  createStaff,
  deleteStaffById,
  getSingleStaff,
  updateStaffById,
  updateStaffStatus,
} from "../controller/staffController.js";

const router = express.Router();

router.get("/all", getAllStaff);
router.post("/post", createStaff);
router.delete("/delete/:id", deleteStaffById);
router.put("/update/:id", updateStaffById);
router.get("/get/:id", getSingleStaff);
router.patch("/update/:id/status", updateStaffStatus);

export default router;
