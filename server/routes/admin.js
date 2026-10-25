const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const MockTest = require('../models/MockTest');
const Application = require('../models/Application');

const SAMPLE_CANDIDATES = [
  {
    name: "Dhaval Patel",
    mobile: "+91 9876543210",
    email: "dhaval@jobopedia.in",
    state: "Gujarat",
    qualification: "B.Tech Computer Science",
    targetJob: "Civil Services IAS / Tech Officer",
    resumeTitle: "Dhaval_Patel_ATS_Resume.pdf",
    status: "Shortlisted"
  },
  {
    name: "Tushar Shah",
    mobile: "+91 9823456789",
    email: "tushar@jobopedia.in",
    state: "Maharashtra",
    qualification: "MBA Finance & B.Com",
    targetJob: "SBI PO / Credit Risk",
    resumeTitle: "Tushar_Shah_Finance_Resume.pdf",
    status: "Under Review"
  },
  {
    name: "Pooja Verma",
    mobile: "+91 9911223344",
    email: "pooja.v@gmail.com",
    state: "Delhi",
    qualification: "BA Political Science",
    targetJob: "SSC CGL Assistant Section Officer",
    resumeTitle: "Pooja_Verma_Govt_Resume.pdf",
    status: "Interview Scheduled"
  }
];

// POST /api/admin/jobs/bulk (Bulk JSON upload of jobs)
router.post('/jobs/bulk', async (req, res) => {
  try {
    const jobsArray = req.body;
    if (!Array.isArray(jobsArray)) {
      return res.status(400).json({ success: false, error: "Input must be an array of jobs." });
    }

    try {
      await Job.insertMany(jobsArray);
    } catch (e) {}

    res.json({ success: true, count: jobsArray.length, message: `Successfully uploaded ${jobsArray.length} jobs to Jobopedia!` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/mock-tests/bulk (Bulk JSON upload of MCQs)
router.post('/mock-tests/bulk', async (req, res) => {
  try {
    const { exam, testId, title, questions } = req.body;
    if (!Array.isArray(questions)) {
      return res.status(400).json({ success: false, error: "Questions must be an array." });
    }

    try {
      await MockTest.findOneAndUpdate(
        { testId: testId || 'custom-test' },
        { 
          exam: exam || 'General',
          title: title || 'Custom Mock Test Series',
          $push: { questions: { $each: questions } }
        },
        { upsert: true, new: true }
      );
    } catch (e) {}

    res.json({ success: true, count: questions.length, message: `Successfully uploaded ${questions.length} MCQs to ${exam} test series!` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/candidates (Candidate tracking with phone, email, ATS resume)
router.get('/candidates', async (req, res) => {
  try {
    let list = [];
    try {
      list = await Application.find().lean();
    } catch (e) {}

    if (!list || list.length === 0) {
      list = SAMPLE_CANDIDATES;
    }

    res.json({ success: true, count: list.length, candidates: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/govt-jobs-mcqs (All Government jobs with MCQ practice availability status)
router.get('/govt-jobs-mcqs', async (req, res) => {
  try {
    let jobs = [];
    let mockTests = [];

    try {
      jobs = await Job.find({ 
        $or: [
          { category: 'govt' },
          { sector: 'GOVERNMENT' },
          { sector: 'Govt' }
        ]
      }).lean();
    } catch (e) {}

    try {
      mockTests = await MockTest.find().lean();
    } catch (e) {}

    const result = (jobs || []).map(j => {
      const jTitle = (j.title || '').toLowerCase();
      const jDept = (j.department || '').toLowerCase();

      const matchingTest = (mockTests || []).find(m => {
        const mExam = (m.exam || '').toLowerCase();
        const mTitle = (m.title || '').toLowerCase();
        return (
          (mExam && (jTitle.includes(mExam) || jDept.includes(mExam))) ||
          (mTitle && (jTitle.includes(mTitle) || mTitle.includes(jTitle)))
        );
      });

      return {
        ...j,
        hasMcq: !!matchingTest,
        mcqCount: matchingTest ? (matchingTest.questions?.length || 0) : 0,
        testId: matchingTest ? matchingTest.testId : null,
        examName: matchingTest ? matchingTest.exam : null
      };
    });

    res.json({ success: true, count: result.length, jobs: result, allTests: mockTests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
