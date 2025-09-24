import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/report/generate-report?session_id=${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setPdfUrl(res.data.file);

      // Auto-open in new tab
      window.open(res.data.file, "_blank");
    } catch (err: any) {
      setMessage("❌ Error generating report");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Generate Assessment Report</h2>
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          className="border p-2 w-64 mr-2"
        />
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate
        </button>

        {message && <p className="mt-4">{message}</p>}
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2"
          >
            📥 Download Report
          </a>
        )}
      </div>
    </>
  );
};

export default Dashboard;
