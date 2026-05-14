import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoute from "./routes/productRoutes.js";
import dealsRoutes from "./routes/dealsRoutes.js";
import tableRouter from "./routes/tableRoutes.js";
import staffRouter from "./routes/staffRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import settingsRouter from "./routes/settingsRoutes.js";
import vehicalRouter from "./routes/vehicalRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import orderRouter from "./routes/ordersRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoute);
// DEALS
app.use("/api/deals", dealsRoutes);
// TABLE
app.use("/api/tables", tableRouter);
// STAFF
app.use("/api/staff", staffRouter);
// CATEGORY
app.use("/api/category", categoryRouter);
// SETTINGS
app.use("/api/settings", settingsRouter);
// VEHICAL
app.use("/api/vehical", vehicalRouter);
// Session
app.use("/api/session", sessionRouter);
//  ORDERS
app.use("/api/orders", orderRouter);

app.use("/images", express.static("assets/productImages"));
// MongoDB Connect

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err.message));
