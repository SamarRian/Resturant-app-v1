import mongoose from "mongoose";
import Staff from "../model/staffModel.js";

// ✅ GET ALL STAFF
export async function getAllStaff(req, res) {
  try {
    const staffData = await Staff.find().sort({ _id: -1 }).lean();

    // ✅ Ab
    if (!staffData || staffData.length === 0) {
      return res.status(200).json({
        message: "No staff found.",
        staffData: [],
      });
    }

    return res.status(200).json({
      message: "Staff fetched successfully.",
      staffData,
    });
  } catch (error) {
    console.error("Get all staff error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getAllStaff Failed: ${error.message}`,
    });
  }
}

// ✅ GET SINGLE STAFF
export async function getSingleStaff(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid staff ID." });
    }

    const staff = await Staff.findById(id).lean();

    if (!staff) {
      return res.status(404).json({
        message: `Staff with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Staff fetched successfully.",
      staff,
    });
  } catch (error) {
    console.error("Get single staff error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getSingleStaff Failed: ${error.message}`,
    });
  }
}

// ✅ CREATE STAFF
export async function createStaff(req, res) {
  try {
    const { personName } = req.body;

    if (!personName || personName.trim() === "") {
      return res.status(400).json({ message: "Person name is required." });
    }

    const existingStaff = await Staff.findOne({
      personName: personName.trim(),
    });

    if (existingStaff) {
      return res.status(409).json({
        message: `Staff with name "${personName}" already exists.`,
      });
    }

    const newStaff = await Staff.create({ personName: personName.trim() });

    return res.status(201).json({
      message: "Staff created successfully.",
      newStaff,
    });
  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `createStaff Failed: ${error.message}`,
    });
  }
}

// ✅ UPDATE STAFF BY ID
export async function updateStaffById(req, res) {
  try {
    const { id } = req.params;
    const { personName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid staff ID." });
    }

    if (!personName || personName.trim() === "") {
      return res.status(400).json({ message: "Person name is required." });
    }

    // const existingStaff = await Staff.findOne({
    //   personName: personName.trim(),
    // });

    // if (existingStaff) {
    //   return res.status(409).json({
    //     message: `Staff with name "${personName}" already exists.`,
    //   });
    // }

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { personName: personName.trim() },
      { new: true },
    );

    if (!updatedStaff) {
      return res.status(404).json({
        message: `Staff with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Staff updated successfully.",
      data: updatedStaff,
    });
  } catch (error) {
    console.error("Update staff error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `updateStaffById Failed: ${error.message}`,
    });
  }
}

// ✅ DELETE STAFF BY ID
export async function deleteStaffById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid staff ID." });
    }

    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({
        message: `Staff with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Staff deleted successfully.",
      data: deletedStaff,
    });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `deleteStaffById Failed: ${error.message}`,
    });
  }
}
