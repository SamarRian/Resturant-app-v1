import OrderItem from "../model/orderItemsModel.js";
import Product from "../model/productModel.js";
import PosOrder from "../model/ordersModel.js";

// ─── Add Items to Order ────────────────────────────────────────────────────────

export async function generateItems(req, res) {
  try {
    const { orderId } = req.body;
    const order = await PosOrder.findById({ orderId });
    if (!order) {
      return res.status(404).json({
        message: "No order found ",
        success: false,
      });
    }

    const orderItems = await OrderItem.create({});

    return res.status(200).json({
      success: true,
      message: "Items generated successfully!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const addOrderItems = async (req, res) => {
  try {
    const { orderId, items } = req.body;

    console.log("📥 REQUESTED DATA:", JSON.stringify(req.body, null, 2));

    // ✅ Validate input
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // if (!items || !Array.isArray(items) || items.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Items array is required and cannot be empty",
    //   });
    // }

    // ✅ Order exist karta hai?
    const order = await PosOrder.findById(orderId);
    console.log("📋 ORDER FOUND:", order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // ✅ Cancelled ya completed order mein items add nahi ho sakti
    if (["cancelled", "completed"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order ${order.orderStatus}, items cannot be added`,
      });
    }

    // ✅ 🔥 STEP 1: DELETE ALL existing order items
    console.log(`🗑️ Deleting all existing items for order: ${orderId}`);
    const deleteResult = await OrderItem.deleteMany({ orderId: orderId });
    console.log(`✅ Deleted ${deleteResult.deletedCount} items`);

    // ✅ 🔥 STEP 2: CREATE new order items
    const orderItemsToSave = [];
    let totalAmount = 0;

    for (const item of items) {
      const {
        productId,
        name,
        unitPrice,
        quantity,
        description,
        isDeal,
        specialInstructions,
        isVariant,
        selectedProductVariaton,
        isCustom = false,
      } = item;

      console.log(`📦 Processing item: ${name}`, {
        productId,
        unitPrice,
        quantity,
        isVariant,
        variantId: selectedProductVariaton?._id || null,
      });

      // ✅ Validate required fields
      if (!productId && !isCustom) {
        return res.status(400).json({
          success: false,
          message: `Product ID is required for item: ${name}`,
        });
      }

      if (!unitPrice || unitPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid unit price for item: ${name}`,
        });
      }

      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for item: ${name}`,
        });
      }

      // ✅ Calculate total price
      const totalPrice = unitPrice * quantity;
      totalAmount += totalPrice;

      // ✅ Fetch product for productType
      let product = null;
      if (productId && !productId.startsWith("custom_")) {
        product = await Product.findById(productId);
      }

      // ✅ Create variant object WITHOUT the quantity from variant
      let variantToSave = null;
      if (selectedProductVariaton) {
        variantToSave = {
          _id: selectedProductVariaton._id || null,
          product: selectedProductVariaton.product || null,
          variantName: selectedProductVariaton.variantName || "",
          price: selectedProductVariaton.price || 0,
          cost: selectedProductVariaton.cost || 0,
        };
      }

      const orderItemData = {
        orderId: orderId,
        productId: productId,
        productName: name || "Unknown Product",
        productType: product?.productType || null,
        selectedProductVariaton: variantToSave,
        unitPrice: unitPrice,
        quantity: quantity,
        totalPrice: totalPrice,
        specialInstructions: specialInstructions || null,
        isCustom: isCustom,
        isDeal: isDeal || false,
        isVariant: isVariant || false,
        description: description || null,
      };

      orderItemsToSave.push(orderItemData);
    }

    console.log(`📦 Saving ${orderItemsToSave.length} new items`);

    // ✅ 🔥 STEP 3: Insert all new items
    const savedItems = await OrderItem.insertMany(orderItemsToSave);
    console.log(`✅ Saved ${savedItems.length} items`);

    // ✅ 🔥 STEP 4: Update order with new items
    const updatedOrder = await PosOrder.findByIdAndUpdate(
      orderId,
      {
        $set: {
          subTotal: totalAmount,
          totalAmount: totalAmount,
          orderItems: savedItems.map((item) => item._id), // ✅ Replace entire array
        },
      },
      { new: true },
    );

    console.log("✅ Updated order:", {
      orderId: updatedOrder._id,
      subTotal: updatedOrder.subTotal,
      totalAmount: updatedOrder.totalAmount,
      itemCount: updatedOrder.orderItems?.length || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Order items replaced successfully.",
      data: savedItems,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("❌ Error in addOrderItems:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// ─── Add Custom Item (jo product list mein nahi) ──────────────────────────────
// export const addOrderItems = async (req, res) => {
//   try {
//     const { orderId, items } = req.body;

//     const order = await PosOrder.findById(orderId);

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found." });
//     }

//     if (["cancelled", "completed"].includes(order.orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: `Order ${order.orderStatus}, items cannot be added`,
//       });
//     }

//     const orderItems = [];
//     let totalAmount = 0;

//     for (const item of items) {
//       const {
//         _id: productId,
//         productName,
//         productType,
//         variations,
//         addons,
//         unitPrice,
//         quantity,
//         specialInstructions,
//         isCustom,
//       } = item;

//       const totalPrice = unitPrice * quantity;
//       totalAmount += totalPrice;

//       orderItems.push({
//         orderId,
//         productId,
//         productName,
//         productType,
//         variations,
//         unitPrice,
//         quantity,
//         totalPrice,
//         specialInstructions,
//         isCustom,
//       });
//     }

//     const savedItems = await OrderItem.insertMany(orderItems);

//     await PosOrder.findByIdAndUpdate(orderId, {
//       $inc: {
//         subTotal: totalAmount,
//         totalAmount: totalAmount,
//       },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Items added to order successfully.",
//       data: savedItems,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

export const addCustomItem = async (req, res) => {
  try {
    const {
      orderId,
      productName,
      unitPrice,
      quantity,
      specialInstructions,
      sortOrder,
    } = req.body;

    const order = await PosOrder.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    const totalPrice = unitPrice * quantity;

    const item = await OrderItem.create({
      orderId,
      productId: null,
      productName,
      unitPrice,
      quantity,
      totalPrice,
      specialInstructions: specialInstructions ?? null,
      sortOrder: sortOrder ?? 0,
      isCustom: true,
    });

    // Order amount update karo
    await PosOrder.findByIdAndUpdate(orderId, {
      $inc: {
        subTotal: totalPrice,
        totalAmount: totalPrice,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Custom item added successfully.",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Order Items ───────────────────────────────────────────────────────────
export const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;

    const items = await OrderItem.find({ orderId })
      .populate("productId", "name price productType image")
      .sort({ sortOrder: 1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Item Quantity ──────────────────────────────────────────────────────
export const updateItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await OrderItem.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Order item not found." });
    }

    const quantityDiff = quantity - item.quantity; // + ya - kitna change hua
    const newTotalPrice = item.unitPrice * quantity;
    const priceDiff = newTotalPrice - item.totalPrice;

    // Stock adjust karo
    if (!item.isCustom && item.productId) {
      const product = await Product.findById(item.productId);
      if (quantityDiff > 0 && product.quantity < quantityDiff) {
        return res.status(400).json({
          success: false,
          message: `Low Stock. Available: ${product.quantity}`,
        });
      }

      await Product.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -quantityDiff },
      });
    }

    item.quantity = quantity;
    item.totalPrice = newTotalPrice;
    await item.save();

    // Order amount update karo
    await PosOrder.findByIdAndUpdate(item.orderId, {
      $inc: {
        subTotal: priceDiff,
        totalAmount: priceDiff,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Item quantity updated.",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Kitchen Status ─────────────────────────────────────────────────────
export const updateItemKitchenStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { kitchenStatus } = req.body;

    const item = await OrderItem.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Order item not found." });
    }

    item.kitchenStatus = kitchenStatus;

    if (kitchenStatus === "preparing") item.preparingAt = new Date();
    if (kitchenStatus === "ready") item.readyAt = new Date();
    if (kitchenStatus === "served") item.servedAt = new Date();

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Kitchen status updated.",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Remove Item from Order ────────────────────────────────────────────────────
export const removeOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await OrderItem.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Order item not found." });
    }

    // Stock wapas karo
    if (!item.isCustom && item.productId) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { quantity: item.quantity },
      });
    }

    // Order amount kam karo
    await PosOrder.findByIdAndUpdate(item.orderId, {
      $inc: {
        subTotal: -item.totalPrice,
        totalAmount: -item.totalPrice,
      },
    });

    await item.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Item removed from order.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
