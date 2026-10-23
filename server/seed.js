const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job');
const User = require('./models/User');
const MockTest = require('./models/MockTest');
const Application = require('./models/Application');

const SEED_JOBS = [
  {
    title: "UPSC Civil Services (IAS / IPS / IFS) Examination 2026",
    department: "Union Public Service Commission (UPSC)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "Central",
    qualification: "Graduate in any stream",
    salary: "₹56,100 - ₹2,50,000 / month (Level 10 Pay Matrix)",
    vacancies: 1056,
    dayNumber: 3,
    lastDate: "2026-11-15",
    description: "Recruitment for Indian Administrative Service, Indian Police Service, and Central Group A Services. Prelims exam will be held across 77 centres nationwide.",
    eligibility: "Any Bachelor's Degree",
    applyUrl: "https://jobopedia.in",
    tags: ["UPSC", "Civil Services", "IAS", "Group A"],
    isNewJob: true
  },
  {
    title: "SSC Combined Graduate Level (CGL) Examination 2026",
    department: "Staff Selection Commission (SSC CGL)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "Central",
    qualification: "Graduate",
    salary: "₹25,500 - ₹1,42,400 / month (Pay Level 4 to Level 7)",
    vacancies: 17727,
    dayNumber: 7,
    lastDate: "2026-11-20",
    description: "Combined Graduate Level examination for Central Ministries, CBI, Intelligence Bureau, and Excise & Customs departments.",
    eligibility: "Bachelor's Degree",
    applyUrl: "https://jobopedia.in",
    tags: ["SSC CGL", "Central Govt", "ASO", "Inspector"],
    isNewJob: true
  },
  {
    title: "RRB Non-Technical Popular Categories (NTPC) Posts",
    department: "Indian Railways (All Railway Zones)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "Central",
    qualification: "12th Pass / Graduate",
    salary: "₹19,900 - ₹35,400 / month (Level 2 to Level 6)",
    vacancies: 11558,
    dayNumber: 2,
    lastDate: "2026-11-18",
    description: "Recruitment for Station Master, Goods Guard, Senior Clerk cum Typist across 21 Railway Recruitment Board zones.",
    eligibility: "12th Pass or Bachelor's Degree",
    applyUrl: "https://jobopedia.in",
    tags: ["Railways", "RRB NTPC", "Govt"],
    isNewJob: true
  },
  {
    title: "IBPS Probationary Officers / Management Trainees (PO/MT)",
    department: "11 Participating Public Sector Banks (SBI, PNB, BoB)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "Central",
    qualification: "Graduate",
    salary: "₹48,480 - ₹85,920 / month + DA, HRA & Leased Accom.",
    vacancies: 4455,
    dayNumber: 5,
    lastDate: "2026-11-12",
    description: "Officer cadre recruitment for leading public sector commercial banks across India.",
    eligibility: "Any Graduate",
    applyUrl: "https://jobopedia.in",
    tags: ["Banking", "IBPS", "Bank PO"],
    isNewJob: false
  },
  {
    title: "ISRO Scientist / Engineer 'SC' (CS, Electronics, Mech)",
    department: "ISRO Centralised Recruitment Board (ICRB)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "Central",
    qualification: "B.Tech / BE with 65% marks",
    salary: "₹56,100 - ₹1,77,500 / month (Gross ~ ₹95,000 / mo)",
    vacancies: 320,
    dayNumber: 2,
    lastDate: "2026-11-25",
    description: "Space research and satellite propulsion engineering positions at URSC Bengaluru, SAC Ahmedabad, VSSC Thiruvananthapuram.",
    eligibility: "B.Tech / B.E in CS / EC / Mechanical",
    applyUrl: "https://jobopedia.in",
    tags: ["ISRO", "Engineering", "Scientist"],
    isNewJob: true
  },
  {
    title: "AIIMS Nursing Officer Recruitment Common Eligibility Test (NORCET)",
    department: "AIIMS New Delhi & All India Institutes",
    category: "govt",
    sector: "GOVERNMENT",
    state: "Central",
    qualification: "B.Sc Nursing / GNM",
    salary: "₹44,900 - ₹1,42,400 / month (Level 7)",
    vacancies: 3500,
    dayNumber: 4,
    lastDate: "2026-11-22",
    description: "Staff Nurse Grade II positions across premier central medical institutes and hospitals.",
    eligibility: "B.Sc Nursing or Diploma in GNM + 2 yrs experience",
    applyUrl: "https://jobopedia.in",
    tags: ["Healthcare", "AIIMS", "Nursing"],
    isNewJob: false
  },
  {
    title: "Senior Full Stack Cloud Software Engineer",
    department: "Tata Consultancy Services (TCS Digital)",
    category: "private",
    sector: "PRIVATE",
    state: "Maharashtra",
    qualification: "B.Tech / MCA",
    salary: "₹12,00,000 - ₹18,00,000 / year (₹1,00,000 - ₹1,50,000 / mo)",
    vacancies: 45,
    dayNumber: 4,
    lastDate: "2026-12-05",
    description: "Developing scalable React & Node.js microservices for multinational fintech clients in Pune and Mumbai.",
    eligibility: "B.Tech / MCA with React / Node expertise",
    applyUrl: "https://jobopedia.in",
    tags: ["IT", "Private", "Pune", "Mumbai"],
    isNewJob: true
  },
  {
    title: "Govt Digital Governance Technical Intern",
    department: "National Informatics Centre (NIC)",
    category: "internship",
    sector: "GOVERNMENT",
    state: "All India",
    qualification: "College Students / Freshers",
    salary: "₹25,000 / month Stipend (Govt Certificate + Pre-Placement)",
    vacancies: 100,
    dayNumber: 1,
    lastDate: "2026-11-10",
    description: "6-month official government internship contributing to citizen service portals and cloud databases.",
    eligibility: "Enrolled in B.Tech / BCA / MCA / M.Sc",
    applyUrl: "https://jobopedia.in",
    tags: ["Internship", "NIC", "Govt"],
    isNewJob: true
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.error("Please configure a valid MONGODB_URI in server/.env before seeding.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas.");

    await Job.deleteMany({});
    await Job.insertMany(SEED_JOBS);
    console.log(`✓ Seeded ${SEED_JOBS.length} Jobs`);

    console.log("🎉 Seeding complete!");
  } catch (err) {
    console.error("Seeding error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
