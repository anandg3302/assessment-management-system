import { Request, Response } from "express";
import { dataset, AssessmentData } from "../data/data";   // ✅ named import
import config from "../config/assessments.json";
import { generatePDF } from "../utils/pdfGenerator";
import path from "path";

// 📑 Generate report for a given session_id
export const generateReport = async (req: Request, res: Response) => {
  try {
    const { session_id } = req.query;

    // 🔒 Validate query param & sanitize input
    const cleanSessionId =
      typeof session_id === "string" ? session_id.trim() : "";

    if (!cleanSessionId) {
      return res.status(400).json({ message: "❌ session_id is required" });
    }

    // 🔍 Debug log (helpful while testing)
    console.log("👉 Requested session_id:", cleanSessionId);
    console.log("👉 Available sessions:", dataset.map((d) => d.session_id));

    // 📂 Find the record
    const record: AssessmentData | undefined = dataset.find(
      (d) => d.session_id === cleanSessionId
    );

    if (!record) {
      return res
        .status(404)
        .json({ message: `❌ Session '${cleanSessionId}' not found` });
    }

    // ⚙️ Get assessment template
    const assessment = (config as Record<string, any>)[record.assessment_id];
    if (!assessment) {
      return res.status(400).json({
        message: `❌ Assessment type '${record.assessment_id}' not supported`,
      });
    }

    // 📝 Generate PDF
    const filePath = await generatePDF(record, assessment);

    // 🌐 Build a public URL so frontend can open/download
    const fileUrl = `${req.protocol}://${req.get("host")}/reports/${path.basename(filePath)}`;

    // ✅ Success response
    return res.status(200).json({
      message: "✅ Report generated successfully",
      file: fileUrl,
    });
  } catch (err: any) {
    console.error("❌ Error generating report:", err.message || err);
    return res.status(500).json({ message: "🔥 Internal Server Error" });
  }
};

// 📋 List all available sessions
export const listSessions = (req: Request, res: Response) => {
  try {
    const sessions = dataset.map((d) => ({
      session_id: d.session_id,
      assessment_id: d.assessment_id,
    }));

    return res.status(200).json({ sessions });
  } catch (err: any) {
    console.error("❌ Error listing sessions:", err.message || err);
    return res.status(500).json({ message: "🔥 Internal Server Error" });
  }
};
