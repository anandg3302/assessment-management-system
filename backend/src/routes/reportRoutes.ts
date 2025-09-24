import express from "express";
import { generateReport, listSessions } from "../controllers/reportController";

const router = express.Router();

// 📑 Generate PDF report
router.get("/generate-report", generateReport);

// 📋 List all available sessions
router.get("/list-sessions", listSessions);

export default router;
