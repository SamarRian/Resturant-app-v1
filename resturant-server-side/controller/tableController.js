import mongoose from "mongoose";
import Table from "../model/tableModel.js";

export async function getAllTables(req, res) {
  try {
    const tablesData = await Table.find().sort({ _id: -1 }).lean();

    if (!tablesData || tablesData.length === 0) {
      return res.status(200).json({
        message: "No tables found.",
        tablesData: [],
      });
    }
    return res.status(200).json({
      message: "Tables fetched successfully.",
      total: tablesData.length,
      tablesData,
    });
  } catch (error) {
    console.error("Get tables error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getAllTables Failed: ${error.message}`,
    });
  }
}

export async function createTable(req, res) {
  try {
    const { tableName } = req.body;

    if (!tableName || tableName.trim() === "") {
      return res.status(400).json({
        message: "Table name is required.",
      });
    }

    const existingTable = await Table.findOne({ tableName: tableName.trim() });

    if (existingTable) {
      return res.status(409).json({
        message: `Table with name "${tableName}" already exists.`,
      });
    }

    const newTable = await Table.create({
      tableName: tableName.trim(),
    });

    return res.status(201).json({
      message: "Table created successfully.",
      newTable,
    });
  } catch (error) {
    console.error("Create table error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `createTable Failed: ${error.message}`,
    });
  }
}

export async function deleteTableById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid table ID.",
      });
    }

    const deletedTable = await Table.findByIdAndDelete(id);

    if (!deletedTable) {
      return res.status(404).json({
        message: `Table with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Table deleted successfully.",
      deletedTable,
    });
  } catch (error) {
    console.error("Delete table error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `deleteTableById Failed: ${error.message}`,
    });
  }
}

export async function updateTableById(req, res) {
  try {
    const { id } = req.params;
    const { tableName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid table ID.",
      });
    }

    if (!tableName || tableName.trim() === "") {
      return res.status(400).json({
        message: "Table name is required.",
      });
    }

    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { tableName: tableName.trim() },
      { new: true },
    );

    if (!updatedTable) {
      return res.status(404).json({
        message: `Table with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Table updated successfully.",
      data: updatedTable,
    });
  } catch (error) {
    console.error("Update table error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `updateTableById Failed: ${error.message}`,
    });
  }
}

export async function getSingleTable(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid table ID.",
      });
    }

    const table = await Table.findById(id).lean();

    if (!table) {
      return res.status(404).json({
        message: `Table with ID "${id}" not found.`,
      });
    }

    return res.status(200).json({
      message: "Table fetched successfully.",
      table,
    });
  } catch (error) {
    console.error("Get single table error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
      controllerError: `getSingleTable Failed: ${error.message}`,
    });
  }
}
