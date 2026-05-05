import express from "express";
import {
  createSettings,
  deleteSettingsById,
  getAllSettings,
  getSingleSettings,
  updateSettingsById,
} from "../controller/settingsController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/all", getAllSettings);
router.post("/post", upload.single("logoImage"), createSettings);
router.delete("/delete/:id", deleteSettingsById);
router.put("/update/:id", upload.single("logoImage"), updateSettingsById);
router.get("/get/:id", getSingleSettings);

export default router;
