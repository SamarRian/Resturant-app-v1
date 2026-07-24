import express from "express";
import {
  openSession,
  closeSession,
  getActiveSession,
  getAllSessions,
  getSessionById,
  getWeeklySessions,
} from "../controller/sessionController.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/open", protect, openSession);
router.get("/active", protect, getActiveSession);
router.get("/sales/weekly", protect, getWeeklySessions);
router.put("/close/:id", protect, closeSession);

router.get("/", protect, getAllSessions);
router.get("/:id", protect, getSessionById);

export default router;
