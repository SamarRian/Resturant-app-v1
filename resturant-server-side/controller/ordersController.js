import PosOrder from "../model/ordersModel.js";
import PosSession from "../model/sessionModel.js";
import { updateSessionStats } from "./sessionController.js";

// ─── Helper: Order Number Generate ────────────────────────────────────────────
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${timestamp}-${random}`;
};

// ─── Create Order ──────────────────────────────────────────────────────────────
export const createOrder = async (req, res) => {
  try {
    const {
      posSessionId,
      tableId,
      customerId,
      orderType,
      orderSource,
      deliveryAddress,
      deliveryPhone,
      subTotal,
      discountType,
      discountValue,
      discountAmount,
      serviceChargeType,
      serviceChargeValue,
      serviceChargeAmount,
      taxType,
      taxMethod,
      taxValue,
      taxAmount,
      totalAmount,
      paymentMethod,
      paymentStatus,
      paymentNote,
      customerNotes,
      kitchenNotes,
      riderWaiter,
      covers,
      cookingTime,
    } = req.body;

    const order = await PosOrder.create({
      posSessionId: posSessionId ?? null,
      orderNumber: generateOrderNumber(),
      orderDate: new Date(),
      orderType: orderType ?? "dine-in",
      orderSource: orderSource ?? "pos",
      tableId: tableId ?? null,
      customerId: customerId ?? null,
      deliveryAddress: deliveryAddress ?? null,
      deliveryPhone: deliveryPhone ?? null,
      subTotal: subTotal ?? 0,
      discountType: discountType ?? null,
      discountValue: discountValue ?? 0,
      discountAmount: discountAmount ?? 0,
      serviceChargeType: serviceChargeType ?? null,
      serviceChargeValue: serviceChargeValue ?? 0,
      serviceChargeAmount: serviceChargeAmount ?? 0,
      taxType: taxType ?? null,
      taxMethod: taxMethod ?? null,
      taxValue: taxValue ?? 0,
      taxAmount: taxAmount ?? 0,
      totalAmount: totalAmount ?? 0,
      paymentMethod: paymentMethod ?? null,
      paymentStatus: paymentStatus ?? "pending",
      paymentNote: paymentNote ?? null,
      customerNotes: customerNotes ?? null,
      kitchenNotes: kitchenNotes ?? null,
      riderWaiter: riderWaiter ?? null,
      covers: covers ?? 1,
      cookingTime: cookingTime ?? null,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get All Orders ────────────────────────────────────────────────────────────
export const getAllOrders = async (req, res) => {
  try {
    const {
      orderStatus,
      paymentStatus,
      orderType,
      kitchenStatus,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (orderStatus) filter.orderStatus = orderStatus;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (orderType) filter.orderType = orderType;
    if (kitchenStatus) filter.kitchenStatus = kitchenStatus;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      PosOrder.find(filter)
        .populate("customerId", "name phone")
        .populate("tableId", "name")
        .populate("createdBy", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      PosOrder.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Single Order ──────────────────────────────────────────────────────────
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await PosOrder.findById(id)
      //   .populate("customerId", "name phone email")
      .populate("tableId", "name")
      .populate("posSessionId")
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Order Status ───────────────────────────────────────────────────────
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await PosOrder.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // Cancelled ya completed order dobara update nahi hogi
    if (["cancelled", "completed"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order already ${order.orderStatus}, cannot update.`,
      });
    }

    order.orderStatus = orderStatus;
    order.updatedBy = req.user._id;

    if (orderStatus === "cancelled") order.cancelledAt = new Date();
    if (orderStatus === "disputed") order.disputedAt = new Date();

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated.",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Kitchen Status ─────────────────────────────────────────────────────
export const updateKitchenStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { kitchenStatus } = req.body;

    const order = await PosOrder.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    order.kitchenStatus = kitchenStatus;
    order.updatedBy = req.user._id;

    // Timestamps set karo status ke mutabiq
    if (kitchenStatus === "accepted") order.kitchenAcceptedAt = new Date();
    if (kitchenStatus === "preparing") order.kitchenStartedAt = new Date();
    if (kitchenStatus === "ready") order.kitchenReadyAt = new Date();
    if (kitchenStatus === "served") order.kitchenServedAt = new Date();

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Kitchen status updated.",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Process Payment ───────────────────────────────────────────────────────────
export const processPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      paymentMethod,
      paidAmount,
      transactionReference,
      paymentNote,
      posSessionId,
    } = req.body;

    const order = await PosOrder.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    if (order.paymentStatus === "paid") {
      return res
        .status(400)
        .json({ success: false, message: "Order already paid." });
    }

    const totalPaidSoFar = order.paidAmount + paidAmount;
    const due = order.totalAmount - totalPaidSoFar;
    const change = totalPaidSoFar - order.totalAmount;

    order.paymentMethod = paymentMethod;
    order.paidAmount = totalPaidSoFar;
    order.dueAmount = due > 0 ? due : 0;
    order.changeAmount = change > 0 ? change : 0;
    order.transactionReference = transactionReference ?? null;
    order.paymentNote = paymentNote ?? null;
    order.paymentStatus = due > 0 ? "partial" : "paid";
    order.orderStatus = due > 0 ? order.orderStatus : "completed";
    order.updatedBy = req.user._id;

    // ✅ posSessionId order mein save karo agar pehle nahi tha
    if (!order.posSessionId && posSessionId) {
      order.posSessionId = posSessionId;
    }

    await order.save();

    // ✅ Session ID — order ka use karo ya body wala fallback
    const sessionId = order.posSessionId || posSessionId;

    // ✅ Full payment
    if (order.paymentStatus === "paid" && sessionId) {
      await PosSession.findByIdAndUpdate(sessionId, {
        $inc: {
          totalSales: order.totalAmount,
          totalOrders: 1,
          cashInHand: paidAmount,
        },
      });
    }

    // ✅ Partial payment
    if (order.paymentStatus === "partial" && sessionId) {
      await PosSession.findByIdAndUpdate(sessionId, {
        $inc: {
          cashInHand: paidAmount,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully.",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Delete Order ──────────────────────────────────────────────────────────────
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await PosOrder.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // Sirf pending orders delete ho sakti hain
    if (order.orderStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be deleted.",
      });
    }

    await order.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
