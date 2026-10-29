const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const { slugify } = require('../models/Job');
const Notification = require('../models/Notification');
const { sendWebPushToAll } = require('../utils/webPushHelper');
const ORGANIZED_JOBS = require('../data/organizedJobs');

// Fallback Seed Jobs in case DB is newly starting or offline
const FALLBACK_JOBS = ORGANIZED_JOBS.map((j, idx) => ({
  ...j,
  _id: j.slug || String(idx + 1),
  id: j.slug || String(idx + 1)
}));

// Top 10 High-Demand Private & Corporate Sector Keywords for Smart Matching
const PRIVATE_SECTOR_KEYWORDS = {
  it: ['it', 'software', 'developer', 'coding', 'tech', 'tcs', 'infosys', 'wipro', 'react', 'node', 'cloud', 'computer', 'bca', 'mca', 'b.tech', 'programmer', 'full stack', 'frontend', 'backend', 'data', 'cybersecurity'],
  pharma: ['pharma', 'healthcare', 'medical', 'doctor', 'nurse', 'pharmacy', 'sun pharma', 'cipla', 'zydus', 'hospital', 'clinic', 'laboratory', 'formulation', 'b.pharm', 'm.pharm', 'chemist', 'drug', 'clinical'],
  banking: ['bank', 'banking', 'finance', 'credit', 'accountant', 'ca', 'hdfc', 'icici', 'axis', 'insurance', 'audit', 'tax', 'bfsi', 'loan', 'wealth', 'fintech', 'mutual fund'],
  manufacturing: ['manufacturing', 'engineering', 'mechanical', 'electrical', 'civil', 'production', 'plant', 'l&t', 'tata', 'reliance', 'industrial', 'maintenance', 'factory', 'quality control', 'machinist'],
  sales: ['sales', 'marketing', 'business development', 'bdo', 'digital marketing', 'executive', 'retail sales', 'promoter', 'telecaller', 'client acquisition', 'seo', 'social media'],
  education: ['education', 'teaching', 'teacher', 'professor', 'faculty', 'school', 'college', 'tutor', 'edtech', 'academic', 'lecturer', 'principal', 'trainer', 'coaching'],
  automobile: ['auto', 'automobile', 'ev', 'vehicle', 'motor', 'maruti', 'mahindra', 'automotive', 'oem', 'electric vehicle', 'service engineer', 'battery'],
  retail: ['retail', 'e-commerce', 'store', 'shop', 'amazon', 'flipkart', 'dmart', 'merchandiser', 'mall', 'cashier', 'inventory', 'fmcg', 'store manager'],
  logistics: ['logistics', 'supply chain', 'warehouse', 'transport', 'delivery', 'courier', 'cargo', 'dispatch', 'fleet', 'shipping', 'freight'],
  hr: ['hr', 'human resource', 'recruiter', 'admin', 'back office', 'operations', 'customer support', 'bpo', 'kpo', 'telecalling', 'desk', 'office assistant']
};

function detectPrivateSector(job) {
  if (job.sector && job.sector !== 'PRIVATE' && job.sector !== 'GOVERNMENT' && job.sector !== 'INTERNSHIP') {
    return job.sector;
  }
  const hay = `${job.title || ''} ${job.department || ''} ${(job.tags || []).join(' ')} ${job.qualification || ''} ${job.description || ''}`.toLowerCase();
  for (const [secId, kwList] of Object.entries(PRIVATE_SECTOR_KEYWORDS)) {
    if (kwList.some(k => hay.includes(k))) {
      const labels = {
        it: 'IT & Software / Tech',
        pharma: 'Pharma & Healthcare',
        banking: 'Banking, Finance & BFSI',
        manufacturing: 'Manufacturing & Engineering',
        sales: 'Sales & Marketing',
        education: 'Education & EdTech',
        automobile: 'Automobile & EV Industry',
        retail: 'E-Commerce & Retail',
        logistics: 'Logistics & Supply Chain',
        hr: 'HR, Admin & Operations'
      };
      return labels[secId] || secId;
    }
  }
  return 'Corporate General';
}

// GET /api/jobs (Filter Logic: Private filtered by selected state; Govt jobs shown across all India)
router.get('/', async (req, res) => {
  try {
    const { category, state, qualification, search, sector } = req.query;
    
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

      // Sector filter (Private Industry Sector or Govt Department)
      if (sector && sector !== 'all') {
        const secLower = sector.toLowerCase();
        const jobSec = (job.sector || '').toLowerCase();
        const jobDept = (job.department || '').toLowerCase();
        const jobTitle = (job.title || '').toLowerCase();
        const jobTags = (job.tags || []).map(t => (t || '').toLowerCase());

        const isMatch = jobSec.includes(secLower) ||
                        jobDept.includes(secLower) ||
                        jobTitle.includes(secLower) ||
                        jobTags.some(t => t.includes(secLower)) ||
                        (PRIVATE_SECTOR_KEYWORDS[secLower] && PRIVATE_SECTOR_KEYWORDS[secLower].some(k => 
                          jobSec.includes(k) || jobDept.includes(k) || jobTitle.includes(k) || jobTags.some(t => t.includes(k))
                        ));
        if (!isMatch) return false;
      }

      // Search query
      if (search) {
        const q = search.toLowerCase();
        const match = (job.title || '').toLowerCase().includes(q) ||
                      (job.department || '').toLowerCase().includes(q) ||
                      (job.sector || '').toLowerCase().includes(q) ||
                      (job.tags || []).some(t => (t || '').toLowerCase().includes(q)) ||
                      (PRIVATE_SECTOR_KEYWORDS[q] && PRIVATE_SECTOR_KEYWORDS[q].some(k => 
                        (job.title || '').toLowerCase().includes(k) || (job.department || '').toLowerCase().includes(k)
                      ));
        if (!match) return false;
      }

      return true;
    });

    res.json({ success: true, count: filtered.length, jobs: filtered });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/jobs/sector-stats (Live counts for Private Sectors and Govt Departments)
router.get('/sector-stats', async (req, res) => {
  try {
    let jobs = [];
    try {
      jobs = await Job.find().lean();
    } catch (e) {}
    if (!jobs || jobs.length === 0) {
      jobs = FALLBACK_JOBS;
    }

    const privateSectorStats = {};
    for (const secKey of Object.keys(PRIVATE_SECTOR_KEYWORDS)) {
      privateSectorStats[secKey] = { count: 0, vacancies: 0, label: '' };
    }

    const deptStats = {
      UPSC: { count: 0, vacancies: 0 },
      SSC: { count: 0, vacancies: 0 },
      Railway: { count: 0, vacancies: 0 },
      Bank: { count: 0, vacancies: 0 },
      Police: { count: 0, vacancies: 0 },
      Medical: { count: 0, vacancies: 0 },
      Education: { count: 0, vacancies: 0 },
      PSU: { count: 0, vacancies: 0 },
      GPSC: { count: 0, vacancies: 0 },
      Research: { count: 0, vacancies: 0 }
    };

    jobs.forEach(job => {
      const isGovt = job.category === 'govt' || job.sector === 'GOVERNMENT';
      const isPrivate = !isGovt;
      const v = Number(job.vacancies) || 1;
      const hay = `${job.title || ''} ${job.department || ''} ${job.sector || ''} ${(job.tags || []).join(' ')}`.toLowerCase();

      // Check Private Sectors
      if (isPrivate || job.category === 'internship') {
        for (const [secId, kwList] of Object.entries(PRIVATE_SECTOR_KEYWORDS)) {
          const matches = (job.sector || '').toLowerCase().includes(secId) ||
                          kwList.some(k => hay.includes(k));
          if (matches) {
            privateSectorStats[secId].count += 1;
            privateSectorStats[secId].vacancies += v;
          }
        }
      }

      // Check Govt Departments
      const deptHay = `${job.title || ''} ${job.department || ''} ${(job.tags || []).join(' ')}`.toLowerCase();
      if (deptHay.includes('upsc') || deptHay.includes('civil services') || deptHay.includes('ias')) {
        deptStats.UPSC.count += 1;
        deptStats.UPSC.vacancies += v;
      }
      if (deptHay.includes('ssc') || deptHay.includes('cgl') || deptHay.includes('chsl')) {
        deptStats.SSC.count += 1;
        deptStats.SSC.vacancies += v;
      }
      if (deptHay.includes('railway') || deptHay.includes('rrb') || deptHay.includes('ntpc')) {
        deptStats.Railway.count += 1;
        deptStats.Railway.vacancies += v;
      }
      if (deptHay.includes('bank') || deptHay.includes('sbi') || deptHay.includes('ibps') || deptHay.includes('rbi')) {
        deptStats.Bank.count += 1;
        deptStats.Bank.vacancies += v;
      }
      if (deptHay.includes('police') || deptHay.includes('defence') || deptHay.includes('army') || deptHay.includes('constable') || deptHay.includes('psi')) {
        deptStats.Police.count += 1;
        deptStats.Police.vacancies += v;
      }
      if (deptHay.includes('medical') || deptHay.includes('doctor') || deptHay.includes('nurse') || deptHay.includes('health') || deptHay.includes('aiims')) {
        deptStats.Medical.count += 1;
        deptStats.Medical.vacancies += v;
      }
      if (deptHay.includes('education') || deptHay.includes('teaching') || deptHay.includes('tet') || deptHay.includes('tat') || deptHay.includes('professor')) {
        deptStats.Education.count += 1;
        deptStats.Education.vacancies += v;
      }
      if (deptHay.includes('psu') || deptHay.includes('ongc') || deptHay.includes('iocl') || deptHay.includes('bhel') || deptHay.includes('isro')) {
        deptStats.PSU.count += 1;
        deptStats.PSU.vacancies += v;
      }
      if (deptHay.includes('gpsc') || deptHay.includes('gsssb') || deptHay.includes('ojas') || deptHay.includes('panchayat')) {
        deptStats.GPSC.count += 1;
        deptStats.GPSC.vacancies += v;
      }
      if (deptHay.includes('research') || deptHay.includes('drdo') || deptHay.includes('csir') || deptHay.includes('scientist')) {
        deptStats.Research.count += 1;
        deptStats.Research.vacancies += v;
      }
    });

    // Format human-friendly count labels
    for (const [k, v] of Object.entries(privateSectorStats)) {
      if (v.count === 0) {
        v.label = '0 Jobs (Hiring Soon)';
      } else {
        const postText = v.vacancies > 0 ? ` (${v.vacancies.toLocaleString('en-IN')}+ Posts)` : '';
        v.label = `${v.count} ${v.count === 1 ? 'Job' : 'Jobs'}${postText}`;
      }
    }

    res.json({
      success: true,
      totalJobs: jobs.length,
      privateSectors: privateSectorStats,
      departments: deptStats
    });
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

// GET /api/jobs/:id (Direct deep-link: fetch single job by MongoDB _id, slug, or fallback)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let job = null;

    // 1. Try finding by MongoDB _id if valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      job = await Job.findById(id).lean();
    }

    // 2. Try finding by unique slug
    if (!job) {
      job = await Job.findOne({ slug: id }).lean();
    }

    // 3. Try finding by title exact or case-insensitive regex
    if (!job) {
      const cleanTitle = id.replace(/-/g, ' ').trim();
      job = await Job.findOne({
        $or: [
          { title: new RegExp(`^${cleanTitle}$`, 'i') },
          { title: new RegExp(cleanTitle, 'i') }
        ]
      }).lean();
    }

    // 4. Try finding in FALLBACK_JOBS
    if (!job) {
      job = FALLBACK_JOBS.find(j => 
        String(j._id || j.id) === String(id) ||
        j.slug === id ||
        (j.title && j.title.toLowerCase().includes(id.toLowerCase().replace(/-/g, ' ')))
      );
    }

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/jobs (Publish new job & trigger auto-notification)
router.post('/', async (req, res) => {
  try {
    let jobData = { ...req.body };

    // Normalize states (support multiple states array and comma-separated string)
    let statesArr = [];
    if (Array.isArray(jobData.states) && jobData.states.length > 0) {
      statesArr = jobData.states.filter(Boolean);
    } else if (jobData.state) {
      statesArr = String(jobData.state).split(',').map(s => s.trim()).filter(Boolean);
    }
    if (statesArr.length === 0) statesArr = ['All India'];
    jobData.states = statesArr;
    jobData.state = statesArr.join(', ');

    // Normalize qualifications (support multiple qualifications array and comma-separated string)
    let qualArr = [];
    if (Array.isArray(jobData.qualifications) && jobData.qualifications.length > 0) {
      qualArr = jobData.qualifications.filter(Boolean);
    } else if (jobData.qualification) {
      qualArr = String(jobData.qualification).split(',').map(q => q.trim()).filter(Boolean);
    }
    if (qualArr.length === 0) qualArr = ['Graduate'];
    jobData.qualifications = qualArr;
    jobData.qualification = qualArr.join(', ');

    // PRE-PUBLISH DUPLICATE JOB CHECK (Warn admin before creating duplicate jobs)
    if (!jobData.forcePublish && jobData.title && jobData.department) {
      const cleanTitle = jobData.title.trim();
      const cleanDept = jobData.department.trim();
      try {
        const existingJob = await Job.findOne({
          title: { $regex: new RegExp(`^${cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
          department: { $regex: new RegExp(`^${cleanDept.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
        }).lean();

        if (existingJob) {
          return res.status(409).json({
            success: false,
            duplicateWarning: true,
            message: `⚠️ Similar job is already live: "${existingJob.title}" in "${existingJob.department}".`,
            existingJob: {
              id: existingJob._id,
              title: existingJob.title,
              department: existingJob.department,
              vacancies: existingJob.vacancies,
              lastDate: existingJob.lastDate,
              createdAt: existingJob.createdAt
            }
          });
        }
      } catch (checkErr) {
        console.warn("Pre-publish duplicate check skipped:", checkErr.message);
      }
    }

    // Generate clean slug if missing
    if (!jobData.slug && jobData.title) {
      jobData.slug = slugify(jobData.title) + '-' + Date.now().toString().slice(-4);
    }

    // Auto-detect & normalize sector for private & corporate jobs
    if (jobData.category === 'private' || jobData.category === 'internship') {
      if (!jobData.sector || jobData.sector === 'PRIVATE' || jobData.sector === 'INTERNSHIP') {
        jobData.sector = detectPrivateSector(jobData);
      }
    } else if (jobData.category === 'govt' && (!jobData.sector || jobData.sector === 'GOVERNMENT')) {
      jobData.sector = 'GOVERNMENT';
    }

    const job = new Job(jobData);
    await job.save();

    // AUTOMATIC NOTIFICATION DISPATCH (Matching Candidate Interest, States & Degrees)
    try {
      const typeLabel = job.category === 'govt' ? 'Govt Job' : (job.category === 'internship' ? 'Internship' : 'Corporate Job');
      const qualDisplay = qualArr.length > 2 ? `${qualArr.slice(0, 2).join(', ')} +${qualArr.length - 2} more` : qualArr.join(', ');
      const stateDisplay = statesArr.length > 2 ? `${statesArr.slice(0, 2).join(', ')} +${statesArr.length - 2} more` : statesArr.join(', ');

      await Notification.create({
        title: `⚡ New ${typeLabel}: ${job.title}`,
        message: `${job.department} announced ${job.vacancies || 1} vacancies for ${qualDisplay}. Location: ${stateDisplay}. Salary: ${job.salary}. Last Date: ${job.lastDate}. Apply online now!`,
        category: job.category || 'govt',
        targetQualification: qualDisplay,
        targetQualifications: qualArr,
        targetState: stateDisplay,
        targetStates: statesArr,
        jobId: job._id ? job._id.toString() : null,
        url: job.applyUrl || 'https://jobopedia.in',
        sentBy: 'System Auto-Trigger'
      });
      // Real Web Push to Chrome on Phone and PC (Works even when website is closed!)
      try {
        sendWebPushToAll({
          title: `⚡ New ${typeLabel}: ${job.title}`,
          body: `${job.department} announced ${job.vacancies || 1} posts. Last Date: ${job.lastDate}. Apply now!`,
          url: job.applyUrl || 'https://jobopedia.in'
        }).catch(e => console.error("[WebPush Auto-Trigger Error]:", e.message));
      } catch (e) {}

      console.log(`[Auto-Notification] Sent alert for job: "${job.title}" matching States: [${statesArr.join(', ')}] | Qualifications: [${qualArr.join(', ')}]`);
    } catch (notifErr) {
      console.error("[Auto-Notification] Error:", notifErr.message);
    }

    res.status(201).json({ success: true, message: "Job created successfully and notifications dispatched to matched candidates!", job });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PATCH /api/jobs/:id/instagram-status (Toggle or set Instagram checklist status for Admin)
router.patch('/:id/instagram-status', async (req, res) => {
  try {
    const { id } = req.params;
    const { postedToInstagram, adminName, adminEmail } = req.body;

    let job = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      job = await Job.findById(id);
    }
    if (!job) {
      job = await Job.findOne({ $or: [{ slug: id }, { _id: id }] });
    }

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    const newStatus = typeof postedToInstagram === 'boolean' ? postedToInstagram : !job.postedToInstagram;
    job.postedToInstagram = newStatus;
    job.postedToInstagramAt = newStatus ? new Date() : null;
    job.postedToInstagramBy = newStatus ? (adminName || 'Admin') : null;
    job.postedToInstagramByEmail = newStatus ? (adminEmail || null) : null;
    await job.save();

    console.log(`[Admin Instagram Checklist] Job "${job.title}" marked as ${newStatus ? 'POSTED by ' + job.postedToInstagramBy : 'PENDING'}`);

    res.json({
      success: true,
      message: newStatus ? `✅ Marked as Posted to Instagram by ${job.postedToInstagramBy}!` : "⏳ Marked as Pending Instagram Post",
      jobId: job._id,
      postedToInstagram: job.postedToInstagram,
      postedToInstagramAt: job.postedToInstagramAt,
      postedToInstagramBy: job.postedToInstagramBy,
      postedToInstagramByEmail: job.postedToInstagramByEmail
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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
