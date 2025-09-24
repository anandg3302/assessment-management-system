# Assessment Management System 🚀

A full‑stack application that supports user registration/login and generation of PDF reports for assessments.  
Report formats are **configurable** — new assessment types can be added via JSON config without modifying code.

## 📂 Project Structure

assessment-management-system/


│
├── backend/ # Express + TypeScript + Puppeteer


│ ├── src/


│ │ ├── config/ # Assessment templates (JSON)


│ │ ├── controllers/


│ │ ├── data/ # Sample data file(s)


│ │ ├── routes/


│ │ └── utils/


│ ├── package.json


│ └── tsconfig.json


│
├── frontend/ # React + Vite + Tailwind


│ ├── index.html


│ ├── src/


│ │ ├── components/


│ │ ├── pages/


│ │ ├── App.tsx


│ │ ├── main.tsx


│ │ └── index.css


│ ├── package.json


│ ├── tailwind.config.js


│ └── tsconfig.json


│
└── README.md

yaml
Copy code

---

## 🧰 Tech Stack & Key Libraries

| Layer        | Technologies / Libraries |
|--------------|----------------------------|
| Backend      | Node.js, Express, TypeScript |
| PDF           | Puppeteer |
| Auth         | JWT, bcrypt |
| Frontend     | React (with React Router), Vite, Tailwind CSS |
| Config       | JSON-based templates for assessments |

---

## ⚙️ Setup & Run Instructions

### 1. Backend

```bash
cd backend
npm install
npm run dev
Runs server on http://localhost:5000

Endpoints:

POST /auth/register — register user

POST /auth/login — login (get JWT)

GET /report/generate-report?session_id=... — generate PDF report for that session

Generated PDF files will be saved in backend/reports/.

2. Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Runs on http://localhost:5173

Features:

Home / Landing page with Login / Signup

Login & Signup forms

Dashboard with input for session_id to generate report

Displays a confirmation message + file path or download link

🔄 Workflow / Demo Flow
Open frontend in browser → see Home page

Click Signup, create an account

Login → redirected to Dashboard

Enter a valid session_id (from sample data)

Click Generate → backend generates a PDF

Dashboard shows confirmation (file path) or download link

(Optional) Edit JSON config to add new assessment, regenerate → see new format

🧩 Customizable / Extensible Areas
Config-driven templates: all assessment layouts (sections, fields) are defined in JSON (backend/src/config/assessments.json).

Data source: sample data is in backend/src/data/, so you can swap or expand datasets.

PDF layout: you can improve HTML/CSS in pdfGenerator util as needed.

Frontend enhancements: file download links, better UI/UX, error handling, form validation etc.

📁 Important Notes
Include .gitignore to exclude node_modules, reports/, .env files, etc.

Use environment variables (e.g. JWT secret, database URLs if used) for production security.

The project is meant for demonstration / assignment use — you can improve error handling, security (input sanitization, strong tokens, rate limiting) etc.

🎥 Submission Checklist
🧾 GitHub repo URL

📼 Demo video showing the flow

📝 (Optional) README instructions for setup and features

🆕 (Optional) Show you've added a new assessment type by updating config and regenerating PDF

🛠 Troubleshooting Tips
If frontend complains about PostCSS / autoprefixer: ensure you have installed autoprefixer and a valid postcss.config.js

If PDF isn’t generated: check that backend is running, correct session_id, permissions on reports/ folder

Cross-origin issues: if frontend and backend run on different ports, you may need to enable CORS in Express


