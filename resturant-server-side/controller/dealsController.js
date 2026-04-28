import Deals from "../model/dealsModel.js";

export async function getAllDeals(req, res) {
  try {
    const allDeals = await Deals.find().lean();

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
