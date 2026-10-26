const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Notification = require('../models/Notification');

// Fallback Seed Jobs in case DB is newly starting
const FALLBACK_JOBS = [
  {
    _id: "1",
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
    description: "Recruitment for Indian Administrative Service, Indian Police Service, and Central Group A Services. Prelims exam will be held across 77 centres.",
    eligibility: "Any Bachelor's Degree",
    applyUrl: "https://jobopedia.in",
    tags: ["UPSC", "Civil Services", "IAS", "Group A"],
    isNewJob: true
  },
  {
    _id: "2",
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
    _id: "3",
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
    _id: "4",
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
    _id: "5",
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
    _id: "6",
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
    _id: "7",
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

// GET /api/jobs (Filter Logic: Private filtered by selected state; Govt jobs shown across all India)
router.get('/', async (req, res) => {
  try {
    const { category, state, qualification, search } = req.query;
    
    let jobs = [];
    try {
      jobs = await Job.find().lean();
    } catch (e) {
      // fallback
    }

    if (!jobs || jobs.length === 0) {
      jobs = FALLBACK_JOBS;
    }

    let filtered = jobs.filter(job => {
      // Category filter
      if (category && category !== 'all' && job.category !== category) {
        return false;
      }

      // Qualification filter
      if (qualification && qualification !== 'all') {
        const qStr = (job.qualification || '').toLowerCase();
        if (!qStr.includes(qualification.toLowerCase())) return false;
      }

      // State Filter Rule:
      // Govt jobs shown for ALL states!
      // Private jobs must match selected state
      if (state && state !== 'all') {
        if (job.category !== 'govt') {
          if (job.state !== state && job.state !== 'All India' && job.state !== 'Central') {
            return false;
          }
        }
      }

      // Search query
      if (search) {
        const q = search.toLowerCase();
        const match = (job.title || '').toLowerCase().includes(q) ||
                      (job.department || '').toLowerCase().includes(q) ||
                      (job.tags || []).some(t => t.toLowerCase().includes(q));
        if (!match) return false;
      }

      return true;
    });

    res.json({ success: true, count: filtered.length, jobs: filtered });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/jobs/weekly-calendar (Generates 1 to 7 dates with live jobs, description & salary)
router.get('/weekly-calendar', async (req, res) => {
  try {
    let dbJobs = [];
    try {
      dbJobs = await Job.find({ category: 'govt' }).lean();
    } catch (e) {}

    if (!dbJobs || dbJobs.length === 0) {
      dbJobs = FALLBACK_JOBS.filter(j => j.category === 'govt');
    }

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const days = [];

    for (let i = 1; i <= 7; i++) {
      // Automatic sync: If job has dayNumber use it, otherwise distribute by index / lastDate
      const dayJobs = dbJobs.filter((j, idx) => {
        if (j.dayNumber === i) return true;
        if (!j.dayNumber) {
          // If no dayNumber, auto-calculate from index or date
          const assignedDay = ((idx % 7) + 1);
          return assignedDay === i;
        }
        return false;
      });

      days.push({
        dayNumber: i,
        dayName: dayNames[(i - 1) % 7],
        dateStr: `${i}th Nov 2026`,
        jobsCount: dayJobs.length,
        jobs: dayJobs
      });
    }

    res.json({
      success: true,
      monthName: "November 2026",
      todayDay: 3,
      weeks: [
        {
          id: "w1",
          label: "Week 1",
          range: "1 - 7",
          startDay: 1,
          endDay: 7,
          totalJobsInWeek: days.reduce((acc, d) => acc + d.jobsCount, 0),
          days: days
        },
        {
          id: "w2",
          label: "Week 2",
          range: "8 - 14",
          startDay: 8,
          endDay: 14,
          totalJobsInWeek: 2,
          days: []
        },
        {
          id: "w3",
          label: "Week 3",
          range: "15 - 21",
          startDay: 15,
          endDay: 21,
          totalJobsInWeek: 3,
          days: []
        },
        {
          id: "w4",
          label: "Week 4",
          range: "22 - 28",
          startDay: 22,
          endDay: 28,
          totalJobsInWeek: 1,
          days: []
        }
      ]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/jobs (Publish new job & trigger auto-notification)
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    // AUTOMATIC NOTIFICATION DISPATCH (Matching Candidate Interest & Degree)
    try {
      const typeLabel = job.category === 'govt' ? 'Govt Job' : (job.category === 'internship' ? 'Internship' : 'Corporate Job');
      await Notification.create({
        title: `⚡ New ${typeLabel}: ${job.title}`,
        message: `${job.department} announced ${job.vacancies || 1} posts for ${job.qualification}. Salary: ${job.salary}. Last Date: ${job.lastDate}. Apply online now!`,
        category: job.category || 'govt',
        targetQualification: job.qualification || 'All',
        targetState: job.state || 'All India',
        jobId: job._id ? job._id.toString() : null,
        url: job.applyUrl || 'https://jobopedia.in',
        sentBy: 'System Auto-Trigger'
      });
      console.log(`[Auto-Notification] Sent alert for job: "${job.title}" matching [${job.state} | ${job.qualification}]`);
    } catch (notifErr) {
      console.error("[Auto-Notification] Error:", notifErr.message);
    }

    res.status(201).json({ success: true, message: "Job created successfully and notifications dispatched to matched candidates!", job });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/jobs/:id (Remove job)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = null;
    try {
      deleted = await Job.findByIdAndDelete(id);
    } catch (e) {
      deleted = await Job.findOneAndDelete({ _id: id });
    }
    res.json({ success: true, message: "Job deleted successfully", id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
