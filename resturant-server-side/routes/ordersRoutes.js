import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  updateOrder,
  getAllActiveSessionOrders,
  getOrderById,
  updateOrderStatus,
  updateKitchenStatus,
  processPayment,
  deleteOrder,
  generateOrder,
  getAllPaidOrders,
} from "../controller/ordersController.js";

const router = express.Router();
router.post("/post", protect, generateOrder);
router.patch("/update/:id", protect, updateOrder);
router.get("/all", protect, getAllActiveSessionOrders);
router.get("/all/paid/:id", protect, getAllPaidOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id/status", protect, updateOrderStatus);
router.patch("/:id/kitchen-status", protect, updateKitchenStatus);
router.patch("/:id/payment", protect, processPayment);
router.delete("/:id", protect, deleteOrder);

export default router;
