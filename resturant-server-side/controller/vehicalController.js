import mongoose from "mongoose";
import Vehical from "../model/vehicalModel.js";

// ✅ CREATE
export async function createVehical(req, res) {
  try {
    const { vehicalNumber, status } = req.body;

    if (!vehicalNumber || vehicalNumber?.trim() === "") {
      return res.status(400).json({ message: "Vehicle name is required." });
    }
    const existingVehical = await Vehical.findOne({
      vehicalNumber: vehicalNumber?.trim(),
    });

    if (existingVehical) {
      return res.status(400).json({
        message: `Vehicle number "${vehicalNumber}" already exists.`,
      });
    }
    const newVehical = await Vehical.create({
      vehicalNumber: vehicalNumber?.trim(),
    });

    return res.status(201).json({
      message: "Vehicle created successfully.",
      data: newVehical,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `createVehical Failed: ${error.message}`,
    });
  }
}

// ✅ GET ALL
export async function getAllVehicals(req, res) {
  try {
    const vehicals = await Vehical.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Vehicles fetched successfully.",
      data: vehicals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getAllVehicals Failed: ${error.message}`,
    });
  }
}

//  UPDATE — name or status
export async function updateVehical(req, res) {
  try {
    const { id } = req.params;
    const { vehicalNumber, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID." });
    }

    const updateFields = {};
    if (vehicalNumber !== undefined) {
      if (vehicalNumber?.trim() === "") {
        return res
          .status(400)
          .json({ message: "Vehicle name cannot be empty." });
      }
      updateFields.vehicalNumber = vehicalNumber?.trim();
    }
    if (status !== undefined) {
      updateFields.status = status?.trim();
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "Nothing to update." });
    }

    const updatedVehical = await Vehical.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedVehical) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID "${id}" not found.` });
    }

    return res.status(200).json({
      message: "Vehicle updated successfully.",
      data: updatedVehical,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `updateVehical Failed: ${error.message}`,
    });
  }
}

// ✅ DELETE
export async function deleteVehical(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID." });
    }

    const deletedVehical = await Vehical.findByIdAndDelete(id);

    if (!deletedVehical) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID "${id}" not found.` });
    }

    return res.status(200).json({
      message: "Vehicle deleted successfully.",
      data: deletedVehical,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `deleteVehical Failed: ${error.message}`,
    });
  }
}
export async function getSingleVehical(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID." });
    }

    const vehical = await Vehical.findById(id);

    if (!vehical) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID "${id}" not found.` });
    }

    return res.status(200).json({
      message: "Vehicle fetched successfully.",
      data: vehical,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getSingleVehical Failed: ${error.message}`,
    });
  }
}
