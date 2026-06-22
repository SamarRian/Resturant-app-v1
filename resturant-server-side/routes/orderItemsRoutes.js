import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  addOrderItems,
  addCustomItem,
  getOrderItems,
  updateItemQuantity,
  updateItemKitchenStatus,
  removeOrderItem,
} from "../controller/orderItemController.js";

const router = express.Router();

router.post("/post", protect, addOrderItems);
router.post("/custom", protect, addCustomItem);
router.patch("/:id/quantity", protect, updateItemQuantity);
router.patch("/:id/kitchen-status", protect, updateItemKitchenStatus);
router.delete("/:id/delete", protect, removeOrderItem);
router.get("/:orderId", protect, getOrderItems);

export default router;
