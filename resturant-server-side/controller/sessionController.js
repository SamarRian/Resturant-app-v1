import PosSession from "../model/sessionModel.js";

// ─── Open New Session ──────────────────────────────────────────────────────────
export const openSession = async (req, res) => {
  try {
    const { startingBalance, notes } = req.body;
    const userId = req.user._id;

    const existingSession = await PosSession.findOne({
      userId,
      status: "active",
    });

    if (existingSession) {
      return res.status(400).json({
        success: false,
        message: "Already an active session open. Please close it first.",
      });
    }

    const session = await PosSession.create({
      userId,
      startingBalance: startingBalance ?? 0,
      notes: notes ?? null,
      startedAt: new Date(),
      status: "active",
    });

    return res.status(201).json({
      success: true,
      message: "POS session opened successfully.",
      data: session,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Close Session ─────────────────────────────────────────────────────────────
export const closeSession = async (req, res) => {
  try {
    const { id } = req.params;

    const { endingBalance, notes } = req.body;

    if (!endingBalance) {
      return res.status(400).json({
        message: "Ending Balance is Required!",
      });
    }

    const session = await PosSession.findById(id);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found." });
    }

    if (session.status === "closed") {
      return res
        .status(400)
        .json({ success: false, message: "Session is already closed." });
    }

    session.status = "closed";
    session.endedAt = new Date();
    session.endingBalance = endingBalance ?? session.cashInHand;
    if (notes) session.notes = notes;

    await session.save();

    return res.status(200).json({
      success: true,
      message: "POS session closed successfully.",
      data: session,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Active Session ────────────────────────────────────────────────────────
export const getActiveSession = async (req, res) => {
  try {
    const userId = req.user._id;

    const session = await PosSession.findOne({
      userId,
      status: "active",
    }).populate("userId", "name email");

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "No active session found." });
    }

    return res.status(200).json({ success: true, data: session });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get All Sessions ──────────────────────────────────────────────────────────
export const getAllSessions = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      PosSession.find(filter)
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      PosSession.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: sessions,
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

// ─── Get Single Session ────────────────────────────────────────────────────────
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await PosSession.findById(id).populate(
      "userId",
      "name email",
    );

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found." });
    }

    return res.status(200).json({ success: true, data: session });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Session Stats (internally call hoga orders se) ────────────────────
export const updateSessionStats = async (sessionId, saleAmount) => {
  try {
    await PosSession.findByIdAndUpdate(sessionId, {
      $inc: {
        totalSales: saleAmount,
        totalOrders: 1,
        cashInHand: saleAmount,
      },
    });
  } catch (error) {
    console.error("Session stats update failed:", error.message);
  }
};
