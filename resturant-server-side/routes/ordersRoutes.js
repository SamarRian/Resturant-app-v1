import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updateKitchenStatus,
  processPayment,
  deleteOrder,
} from "../controller/ordersController.js";

const router = express.Router();

router.post("/post", protect, createOrder);
router.get("/all", protect, getAllOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id/status", protect, updateOrderStatus);
router.patch("/:id/kitchen-status", protect, updateKitchenStatus);
router.patch("/:id/payment", protect, processPayment);
router.delete("/:id", protect, deleteOrder);

export default router;
