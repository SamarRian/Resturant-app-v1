import Counter from "../model/counterModel.js";
import OrderItem from "../model/orderItemsModel.js";
import PosOrder from "../model/ordersModel.js";
import PosSession from "../model/sessionModel.js";
import { updateSessionStats } from "./sessionController.js";

// ─── Helper: Order Number Generate ────────────────────────────────────────────

export async function orderNumber(sessionId) {
  const counter = await Counter.findOneAndUpdate(
    { _id: `order_${sessionId}` },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  return counter.seq;
}

// ///////////////////////////////////////////////
export async function generateOrder(req, res) {
  try {
    const activeSession = await PosSession.findOne({
      status: "active",
    });

    if (!activeSession) {
      return res.status(404).json({
        success: false,
        message: "Please Active the Session",
      });
    }

    const order = await PosOrder.create({
      posSessionId: activeSession?._id,
      orderNumber: await orderNumber(activeSession?._id),
      orderDate: new Date(),
      createdBy: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Empty Order created successfully!",
      order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// ─── Create Order ──────────────────────────────────────────────────────────────
export const updateOrder = async (req, res) => {
  try {
    const {
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

    const { id } = req.params;

    // Base fields jo hamesha update hone chahiye
    const setFields = {
      orderType,
      orderSource,
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
      updatedBy: req.user._id,
    };
    const activeSession = await PosSession.findOne({
      status: "active",
    });

    if (!activeSession) {
      return res.status(404).json({
        success: false,
        message: "Please Active the Session",
      });
    }
    const unsetFields = {};

    // orderType ke hisaab se decide karo konsa data rakhna hai, konsa hatana hai
    if (orderType === "delivery") {
      setFields.deliveryAddress = deliveryAddress;
      setFields.deliveryPhone = deliveryPhone;
      unsetFields.tableId = "";
    } else if (orderType === "dine-in") {
      setFields.tableId = tableId;
      unsetFields.deliveryAddress = "";
      unsetFields.deliveryPhone = "";
    } else if (orderType === "takeaway") {
      unsetFields.tableId = "";
      unsetFields.deliveryAddress = "";
      unsetFields.deliveryPhone = "";
    }

    // customerId agar bheja gaya hai to set karo
    if (customerId !== undefined) setFields.customerId = customerId;

    const updateQuery = { $set: setFields };
    if (Object.keys(unsetFields).length > 0) {
      updateQuery.$unset = unsetFields;
    }

    const order = await PosOrder.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (["cancelled", "completed"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order ${order.orderStatus}, cannot update.`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get All Orders ────────────────────────────────────────────────────────────
export const getAllActiveSessionOrders = async (req, res) => {
  try {
    const activeSession = await PosSession.findOne({
      status: "active",
    });
    if (!activeSession) {
      return res.status(404).json({
        success: false,
        message: "Active Session not found",
      });
    }
    const activeOrders = await PosOrder.find({
      posSessionId: activeSession._id,
    });

    const filterdOrders = activeOrders.filter(
      (order) =>
        order.orderStatus === "pending" || order.paymentStatus === "pending",
    );

    const ordersWithItems = await Promise.all(
      filterdOrders.map(async (order) => {
        const items = await OrderItem.find({ orderId: order._id });
        return {
          ...order.toObject(),
          items,
        };
      }),
    );
    return res.status(200).json({
      success: true,
      message: "Active session orders found successfully.",
      data: ordersWithItems,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllPaidOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const activeSession = await PosSession.findById(id);
    if (!activeSession) {
      return res.status(404).json({
        success: false,
        message: "Active Session not found",
      });
    }
    const activeOrders = await PosOrder.find({
      posSessionId: activeSession._id,
    });

    const filteredOrders = activeOrders.filter(
      (order) =>
        order.paymentStatus === "paid" && order.orderStatus === "completed",
    );
    const ordersWithItems = await Promise.all(
      filteredOrders.map(async (order) => {
        const items = await OrderItem.find({ orderId: order._id });
        return {
          ...order.toObject(),
          items,
        };
      }),
    );
    return res.status(200).json({
      success: true,
      message: "Paid orders found successfully.",
      data: ordersWithItems,
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
      // .populate("posSessionId")
      .populate("createdBy", "name")
      .populate("updatedBy", "name");
    const items = await OrderItem.find({ orderId: order._id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    return res
      .status(200)
      .json({ success: true, data: { ...order.toObject(), items } });
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
    const { paymentMethod, paidAmount, transactionReference, paymentNote } =
      req.body;

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

    const orderItems = await OrderItem.find({ orderId: order._id });

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

    // // ✅ posSessionId order mein save karo agar pehle nahi tha
    // if (!order.posSessionId && posSessionId) {
    //   order.posSessionId = posSessionId;
    // }

    await order.save();

    // ✅ Full payment
    if (order.paymentStatus === "paid" && order.posSessionId) {
      await PosSession.findByIdAndUpdate(order.posSessionId, {
        $inc: {
          totalSales: order.totalAmount,
          totalOrders: 1,
          cashInHand: paidAmount,
        },
      });
    }

    // ✅ Partial payment
    if (order.paymentStatus === "partial" && order.posSessionId) {
      await PosSession.findByIdAndUpdate(order.posSessionId, {
        $inc: {
          cashInHand: paidAmount,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully.",
      data: {
        ...order.toObject(),
        items: orderItems,
      },
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
