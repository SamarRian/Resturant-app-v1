import express from "express";
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
import orderItemsRouter from "./routes/orderItemsRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
connectDB();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL, // production client URL, Vercel env var se aayega
    ],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoute);
app.use("/api/deals", dealsRoutes);
app.use("/api/tables", tableRouter);
app.use("/api/staff", staffRouter);
app.use("/api/category", categoryRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/vehical", vehicalRouter);
app.use("/api/session", sessionRouter);
app.use("/api/orders", orderRouter);
app.use("/api/order-items", orderItemsRouter);

export default app;
