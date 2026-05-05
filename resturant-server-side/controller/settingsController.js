import mongoose from "mongoose";
import Settings from "../model/settingsModel.js";

// GET ALL SETTINGS
export async function getAllSettings(req, res) {
  try {
    const allSettings = await Settings.find().sort({ _id: -1 }).lean();

    if (!allSettings || allSettings.length === 0) {
      return res.status(200).json({
        message: "No settings found.",
        settingsData: [],
      });
    }

    return res.status(200).json({
      message: "Settings fetched successfully.",
      settingsData: allSettings,
    });
  } catch (error) {
    console.error("Get all settings error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getAllSettings Failed: ${error.message}`,
    });
  }
}

//  GET SINGLE SETTINGS
export async function getSingleSettings(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid settings ID." });
    }

    const settings = await Settings.findById(id).lean();

    if (!settings) {
      return res.status(404).json({
        message: `Settings with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Settings fetched successfully.",
      settingsData: settings,
    });
  } catch (error) {
    console.error("Get single settings error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getSingleSettings Failed: ${error.message}`,
    });
  }
}

//  CREATE SETTINGS
export async function createSettings(req, res) {
  try {
    const { buisnessName, deliveryChargePerKM, freeDeliveryRange } = req.body;

    const logoImage = req.file?.filename || "";

    //
    const phoneNumbers = req.body.phoneNumbers
      ? Array.isArray(req.body.phoneNumbers)
        ? req.body.phoneNumbers // Multiple numbers
        : [req.body.phoneNumbers] // Single number
      : [];

    if (!buisnessName || buisnessName.trim() === "") {
      return res.status(400).json({ message: "Business name is required." });
    }

    const existingSettings = await Settings.findOne({ buisnessName });

    if (existingSettings) {
      return res.status(409).json({
        message: `Settings with business name ${buisnessName} already exists.`,
      });
    }
    const allSettings = await Settings.find().lean();

    if (allSettings.length > 0) {
      return res.status(409).json({
        message: `You Can Just Update Settings Now.`,
      });
    }

    const newSettings = await Settings.create({
      buisnessName: buisnessName.trim(),
      logoImage,
      deliveryChargePerKM: deliveryChargePerKM || 0,
      freeDeliveryRange: freeDeliveryRange || 0,
      phoneNumbers,
    });

    return res.status(201).json({
      message: "Settings created successfully.",
      settingsData: newSettings,
    });
  } catch (error) {
    console.error("Create settings error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `createSettings Failed: ${error.message}`,
    });
  }
}

//  UPDATE SETTINGS BY ID
export async function updateSettingsById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid settings ID." });
    }

    // ✅ Sirf wahi fields lo jo request mein aayi hain
    const updateFields = {};

    if (req.body.buisnessName) {
      updateFields.buisnessName = req.body.buisnessName.trim();
    }
    if (req.file) {
      updateFields.logoImage = req.file?.filename || "";
    }
    if (req.body.deliveryChargePerKM) {
      updateFields.deliveryChargePerKM = req.body.deliveryChargePerKM;
    }
    if (req.body.freeDeliveryRange) {
      updateFields.freeDeliveryRange = req.body.freeDeliveryRange;
    }
    if (req.body.phoneNumbers) {
      updateFields.phoneNumbers = Array.isArray(req.body.phoneNumbers)
        ? req.body.phoneNumbers
        : [req.body.phoneNumbers];
    }

    // ✅ Agar koi field hi nahi aayi
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        message: "Koi bhi field update karne ke liye nahi di.",
      });
    }

    const updatedSettings = await Settings.findByIdAndUpdate(
      id,
      { $set: updateFields }, // ✅ $set — sirf yahi fields update karega
      { new: true },
    );

    if (!updatedSettings) {
      return res.status(404).json({
        message: `Settings with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Settings updated successfully.",
      settingsData: updatedSettings,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `updateSettingsById Failed: ${error.message}`,
    });
  }
}

// DELETE SETTINGS BY ID
export async function deleteSettingsById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid settings ID." });
    }

    const deletedSettings = await Settings.findByIdAndDelete(id);

    if (!deletedSettings) {
      return res.status(404).json({
        message: `Settings with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Settings deleted successfully.",
      settingsData: deletedSettings,
    });
  } catch (error) {
    console.error("Delete settings error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `deleteSettingsById Failed: ${error.message}`,
    });
  }
}
