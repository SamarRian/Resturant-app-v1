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
    console.log("REQUESTED DATA", req.body);
    // Order exist karta hai?
    const order = await PosOrder.findById(orderId);
    console.log("ORDER", order);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // Cancelled ya completed order mein items add nahi ho sakti
    if (["cancelled", "completed"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order ${order.orderStatus},items cannot be added`,
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const {
        productId,
        quantity,
        variations,
        addons,
        specialInstructions,
        isCustom,
      } = item;

      // Product DB se fetch karo
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${productId}`,
        });
      }

      // Stock check karo
      // if (product.quantity < quantity) {
      //   return res.status(400).json({
      //     success: false,
      //     message: `${product.name} ka stock kam hai. Available: ${product.quantity}`,
      //   });
      // }
      // if (product.enableVariation) {
      //   return res.status(400).res({
      //     success: false,
      //     message: "Please the quantity of variation",
      //   });
      // }
      const unitPrice = product.price;
      const totalPrice = unitPrice * quantity;
      totalAmount += totalPrice;

      // Stock kam karo
      // await Product.findByIdAndUpdate(productId, {
      //   $inc: { quantity: -quantity },
      // });

      orderItems.push({
        orderId,
        productId: product._id,
        productName: product.name,
        productType: product.productType,
        variations: variations ?? null,
        addons: addons ?? null,
        unitPrice,
        quantity,
        totalPrice,
        specialInstructions: specialInstructions ?? null,

        isCustom,
      });

      console.log("ORDER ITEMS", orderItems);
    }

    // Sab items ek saath save karo
    const savedItems = await OrderItem.insertMany(orderItems);
    console.log("saved items", savedItems);

    // Order ka subTotal aur totalAmount update karo
    console.log(typeof totalAmount);

    // await PosOrder.findByIdAndUpdate(orderId, {
    //   $inc: {
    //     subTotal: totalAmount,
    //     totalAmount: totalAmount,
    //   },
    // });

    return res.status(201).json({
      success: true,
      message: "Items added to order successfully.",
      data: savedItems,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Add Custom Item (jo product list mein nahi) ──────────────────────────────
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
