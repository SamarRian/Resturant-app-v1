import mongoose from "mongoose";
import Deals from "../model/dealsModel.js";

export async function getAllDeals(req, res) {
  try {
    let allDeals = await Deals.find().sort({ _id: -1 }).lean();

    const bulkOps = allDeals.map((deal) => {
      const totalVariantsPrice = deal.variantsIncluded.reduce(
        (sum, variant) => {
          return sum + parseInt(variant.price) * parseInt(variant.dealQuantity);
        },
        0,
      );

      return {
        updateOne: {
          filter: { _id: deal._id },
          update: { $set: { regularPrice: totalVariantsPrice } },
        },
      };
    });

    await Deals.bulkWrite(bulkOps);

    res.status(200).json({
      message: "Deals fetched successfully",
      total: allDeals.length,
      deals: allDeals,
    });
  } catch (error) {
    console.error("Get deals error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `Get Deals Failed ${error.message}`,
    });
  }
}

export async function createDeal(req, res) {
  try {
    console.log(req.body);
    console.log(req.file);

    // Get data form body
    let {
      dealName,
      dealCost,
      dealPrice,
      dealTitle,
      displayPOS,
      status,
      variantsIncluded,
    } = req.body;

    // NORMALIZATION

    dealName = dealName.toLowerCase().trim();
    dealTitle = dealTitle.toLowerCase().trim();
    const image = req.file?.filename || "";

    // Validation

    if (
      !dealName ||
      !dealTitle ||
      !dealCost ||
      !dealPrice ||
      !displayPOS ||
      !status ||
      !image
    ) {
      return res.status(400).json({
        message: "All fields are required!",
        dealsController: "Deals controller All field are Required!",
      });
    }

    // Check for already existing deal

    // Create Deal
    const existingDeal = await Deals.findOne({
      dealName: dealName,
      dealTitle: dealTitle,
    });

    if (existingDeal) {
      return res.status(400).json({
        message: "Deal with exact same name and title already exists!",
      });
    }

    const deal = await Deals.create({
      dealName,
      dealCost,
      dealPrice,
      dealTitle,
      displayPOS,
      status,
      variantsIncluded,
      image,
    });

    res.status(201).json({
      message: "Deal created successfully",
      deal,
    });
  } catch (error) {
    console.error("Create deals error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `Create Deals Failed ${error.message}`,
    });
  }
}

export const addVariationToDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const variants = req.body;

    const deal = await Deals.findById(id);
    if (!deal) {
      return res
        .status(404)
        .json({ success: false, message: "Deal not found" });
    }
    // SAME VARIANT VALIDATION

    const existingVariant = deal.variantsIncluded.find(
      (el) => el.name === variants.name,
    );

    if (existingVariant) {
      existingVariant.dealQuantity += variants.dealQuantity;
      deal.markModified("variantsIncluded");
    } else {
      deal.variantsIncluded.push(variants);
    }

    await deal.save();

    res.status(201).json({
      success: true,
      message: "Variation added successfully",
      data: deal.variantsIncluded,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export async function getDealById(req, res) {
  try {
    const { id } = req.params;

    // ID VALIDATION
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }

    const singleDeal = await Deals.findById(id).lean();

    // DEAL VALIDATION
    if (!singleDeal) {
      return res.status(404).json({
        message: "Single Deal Not Found!",
      });
    }

    return res.status(200).json({
      message: "Single Deal Found",
      singleDeal,
    });
  } catch (error) {
    console.error("Get DEALS by ID error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getDealById Failed ${error.message}`,
    });
  }
}

export async function deleteDealById(req, res) {
  try {
    const { id } = req.params;

    // ID VALIDATION

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }

    // DELETE BY ID

    const delted = await Deals.findByIdAndDelete(id);

    // DEAL VALIDATION

    if (!delted) {
      return res.status(404).json({
        message: "Deleted Deal not found",
      });
    }

    return res.status(200).json({
      message: "Deal Deleted Successfully",
      delted,
    });
  } catch (error) {
    console.error("Delete DEALS by ID error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `deleteDealById Failed ${error.message}`,
    });
  }
}

export async function deleteVariant(req, res) {
  try {
    const { dealId, variantId } = req.params;

    // Validate dealId
    if (!mongoose.Types.ObjectId.isValid(dealId)) {
      return res.status(400).json({ message: "Invalid Deal ID format" });
    }

    // Validate variantId
    if (!mongoose.Types.ObjectId.isValid(variantId)) {
      return res.status(400).json({ message: "Invalid Variant ID format" });
    }

    // Find the deal
    let deal = await Deals.findById(dealId);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // Find variant inside deal
    let variantExists = deal.variantsIncluded.find((v) => v._id === variantId);

    if (!variantExists) {
      return res.status(404).json({ message: "Variant not found" });
    }

    // Delete variant
    deal.variantsIncluded = deal.variantsIncluded.filter(
      (v) => v._id !== variantId,
    );

    await deal.save();

    return res.status(200).json({
      message: "Variant Deleted Successfully",
      data: deal.variantsIncluded,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
