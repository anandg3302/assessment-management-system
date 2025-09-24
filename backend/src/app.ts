import express from "express";
import cors from "cors";
import path from "node:path";
import authRoutes from "./routes/authRoutes";
import reportRoutes from "./routes/reportRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// 📂 Serve generated reports as static files
app.use("/reports", express.static(path.join(__dirname, "../reports")));

// 🔑 Auth routes
app.use("/auth", authRoutes);

// 📑 Report routes
app.use("/report", reportRoutes);

// 🛠 Health check (optional, useful for debugging)
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", message: "🚀 Server is running" });
});

export default app;
