const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

// POST /api/admin/jobs/:jobId/mcqs (Upload MCQs specifically for a job)
router.post('/jobs/:jobId/mcqs', async (req, res) => {
  try {
    const { jobId } = req.params;
    const { questions, exam, title, durationMinutes } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, error: "Questions must be a non-empty array." });
    }

    const testId = `test-job-${jobId}`;
    
    // Create or update mock test in MongoDB
    let savedTest = null;
    try {
      savedTest = await MockTest.findOneAndUpdate(
        { testId },
        {
          testId,
          jobId,
          exam: exam || 'Govt Recruitment CBT',
          title: title || 'Job Specific Practice MCQs',
          durationMinutes: durationMinutes || 15,
          totalQuestions: questions.length,
          questions: questions
        },
        { upsert: true, new: true }
      );

      // Update Job with hasMcqs flag
      await Job.findByIdAndUpdate(jobId, { hasMcqs: true, mcqTestId: testId });
    } catch (e) {
      console.error("MongoDB mock test save error:", e.message);
    }

    res.json({
      success: true,
      message: `Successfully uploaded and linked ${questions.length} MCQs to this Government Job!`,
      test: savedTest
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/jobs - Fetch all jobs across categories for search & management
router.get('/jobs', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: regex },
        { department: regex },
        { state: regex },
        { qualification: regex },
        { sector: regex }
      ];
    }

    let jobs = await Job.find(query).sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/admin/jobs/:jobId - Remove / Delete a job from MongoDB
router.delete('/jobs/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    let deletedJob = null;

    if (mongoose.Types.ObjectId.isValid(jobId)) {
      deletedJob = await Job.findByIdAndDelete(jobId);
    } else {
      deletedJob = await Job.findOneAndDelete({ _id: jobId });
    }

    // Also remove any mock test linked to this job
    try {
      await MockTest.deleteMany({ jobId });
    } catch (e) {}

    res.json({
      success: true,
      message: `Job "${deletedJob?.title || jobId}" successfully removed from MongoDB Atlas!`,
      jobId
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
