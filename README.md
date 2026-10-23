# Jobopedia — Complete MERN Stack Project
### React 18 + Node.js / Express.js + MongoDB Atlas + Tailwind CSS

A complete, production-ready MERN Stack employment portal featuring real-time government job bulletins, weekly calendar salary matrices, state-based filters, ATS keyword generator, and dual admin JSON bulk engines.

---

## 📁 Directory Architecture

```text
jobopedia-mern/
│
├── client/                     # React 18 + Vite + Tailwind CSS Frontend
│   ├── public/
│   │   └── images/             # Brand logos, Ashoka emblems & department SVGs
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── WeeklyGovtJobCalendar.jsx   # 1-7 date cards with live salary & pop-up modal
│   │   │   ├── PersonalizedJobs.jsx        # Govt nationwide + Private state filters
│   │   │   ├── MockTests.jsx               # Delayed answers + PDF export
│   │   │   ├── ResumeBuilder.jsx           # AI ATS keyword optimizer
│   │   │   ├── AiAssistant.jsx             # Floating career bot
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── AdminDashboard.jsx          # HR Posts, Bulk JSON & Candidate Tracker
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js          # Proxies /api requests to Express server (port 5000)
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Express.js + Mongoose + MongoDB Atlas Backend
│   ├── config/
│   │   └── db.js               # MongoDB Atlas connection pooling
│   ├── models/
│   │   ├── Job.js
│   │   ├── User.js
│   │   ├── MockTest.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── jobs.js             # GET /api/jobs, GET /api/jobs/weekly-calendar
│   │   ├── admin.js            # POST /api/admin/jobs/bulk, GET /api/admin/candidates
│   │   ├── mockTests.js        # GET /api/mock-tests
│   │   ├── auth.js             # Login / Register
│   │   └── ai.js               # Resume keyword suggestions
│   ├── seed.js                 # 1-Click MongoDB Atlas database seeder
│   ├── .env                    # MONGODB_URI & PORT
│   ├── server.js               # Express application entry
│   └── package.json
│
├── .gitignore
├── package.json                # Root runner (starts client & server together)
└── README.md
```

---

## 🚀 How to Run the MERN Stack Project

### 1. Install Dependencies
In the root directory, run:
```bash
# Install root, server and client dependencies:
npm run install:all
```

### 2. Configure MongoDB Atlas
Open `server/.env` and paste your MongoDB Atlas connection URI:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/jobopedia?retryWrites=true&w=majority"
```

*(Optional) To populate MongoDB Atlas with initial jobs & mock tests:*
```bash
npm run seed
```

### 3. Start Both Frontend & Backend (One Command)
```bash
npm run dev
```
* **Frontend (React + Vite)**: `http://localhost:3000`
* **Backend API (Node + Express)**: `http://localhost:5000`
* Requests to `/api/*` are automatically proxied to port 5000.

---

## 🌟 Included Features:

1. **Weekly Govt Job Calendar (Dates 1 - 7)**:
   - Live daily cards with Pay Scale, vacancies, and department badges.
   - Click to open the detailed **Job Description & Salary Pop-up Modal**.
2. **All India Job Directory with State Filter**:
   - Central Government jobs remain visible for candidates across all India.
   - Private corporate jobs automatically filter by selected State (Gujarat, Maharashtra, Delhi, etc.).
3. **Mock Tests with Delayed Evaluation**:
   - Practice questions with no instant answer reveal.
   - Answers and detailed explanations displayed only after clicking **Submit Test**.
   - One-click **PDF Export** for offline studying.
4. **AI Resume Keyword Optimizer**:
   - Extracts top ATS keywords for HR selection.
5. **Dual Admin Control Center**:
   - Dhaval & Tushar Bulk JSON Uploader for 100+ Jobs & MCQs.
   - HR recruitment form.
   - Candidate application tracking table with WhatsApp chat links and CSV download.
6. **WhatsApp Cyber Cafe Desk**:
   - Direct pre-filled WhatsApp link to help candidates apply error-free.
