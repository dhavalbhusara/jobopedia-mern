const express = require('express');
const router = express.Router();
const MockTest = require('../models/MockTest');

const SAMPLE_TESTS = [
  {
    testId: "upsc-gs-1",
    exam: "UPSC Civil Services",
    title: "General Studies Paper 1 — National Mock Test 2026",
    durationMinutes: 120,
    totalQuestions: 5,
    category: "Civil Services",
    questions: [
      {
        id: 1,
        question: "Which Constitutional Amendment Act added Article 21A (Right to Education as a Fundamental Right)?",
        options: ["86th Amendment Act, 2002", "42nd Amendment Act, 1976", "44th Amendment Act, 1978", "91st Amendment Act, 2003"],
        correctIndex: 0,
        explanation: "The 86th Constitutional Amendment Act, 2002 inserted Article 21A, making free and compulsory education for children between 6 to 14 years a Fundamental Right."
      },
      {
        id: 2,
        question: "Which river is often termed as 'Dakshin Ganga' (Ganga of the South)?",
        options: ["Godavari", "Krishna", "Cauvery", "Mahanadi"],
        correctIndex: 0,
        explanation: "Godavari is India's second longest river and is historically referred to as 'Dakshin Ganga' due to its length and religious significance."
      },
      {
        id: 3,
        question: "In the context of the Indian Economy, what does 'Headline Inflation' measure?",
        options: ["Inflation excluding food and energy prices", "Total inflation in an economy including volatile items like food and fuel", "Only wholesale prices of manufactured goods", "Only agricultural commodity price changes"],
        correctIndex: 1,
        explanation: "Headline inflation is the raw inflation figure reported through the Consumer Price Index (CPI), covering all categories including volatile food and fuel."
      },
      {
        id: 4,
        question: "Who among the following was the founder of the 'Satya Shodhak Samaj' in 1873?",
        options: ["Jyotirao Phule", "Raja Ram Mohan Roy", "Swami Dayanand Saraswati", "Ishwar Chandra Vidyasagar"],
        correctIndex: 0,
        explanation: "Jyotirao Phule founded the Satya Shodhak Samaj in Pune in 1873 to liberate lower caste communities and advocate women education."
      },
      {
        id: 5,
        question: "What is the primary function of the NITI Aayog in India?",
        options: ["Allocation of central tax funds to states", "Policy think tank providing strategic and technical advice to Govt", "Regulating stock exchanges", "Conducting general elections"],
        correctIndex: 1,
        explanation: "NITI Aayog (National Institution for Transforming India) serves as the apex public policy think tank fostering cooperative federalism."
      }
    ]
  },
  {
    testId: "ssc-cgl-1",
    exam: "SSC CGL Tier-1",
    title: "SSC CGL Full Mock Test (Reasoning, GK, Math)",
    durationMinutes: 60,
    totalQuestions: 3,
    category: "SSC",
    questions: [
      {
        id: 1,
        question: "Which of the following is an example of an Indirect Tax in India?",
        options: ["Corporate Tax", "Income Tax", "Goods and Services Tax (GST)", "Securities Transaction Tax"],
        correctIndex: 2,
        explanation: "GST is a comprehensive destination-based indirect tax levied on the supply of goods and services."
      },
      {
        id: 2,
        question: "If A is brother of B, B is sister of C, and C is father of D, how is A related to D?",
        options: ["Father", "Uncle", "Grandfather", "Brother"],
        correctIndex: 1,
        explanation: "C is D's father. A is brother of C. Therefore, A is paternal uncle of D."
      },
      {
        id: 3,
        question: "Who was appointed as the first Chief Justice of Independent India?",
        options: ["H.J. Kania", "M. Patanjali Sastri", "Mehr Chand Mahajan", "Sudhi Ranjan Das"],
        correctIndex: 0,
        explanation: "Sir Harilal Jekisundas Kania served as the first Chief Justice of India from 1950 to 1951."
      }
    ]
  }
];

// GET /api/mock-tests
router.get('/', async (req, res) => {
  try {
    let tests = [];
    try {
      tests = await MockTest.find().lean();
    } catch (e) {}

    if (!tests || tests.length === 0) {
      tests = SAMPLE_TESTS;
    }

    res.json({ success: true, count: tests.length, tests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/mock-tests/:testId
router.get('/:testId', async (req, res) => {
  try {
    let test = null;
    try {
      test = await MockTest.findOne({ testId: req.params.testId }).lean();
    } catch (e) {}

    if (!test) {
      test = SAMPLE_TESTS.find(t => t.testId === req.params.testId);
    }

    if (!test) {
      return res.status(404).json({ success: false, error: "Mock test not found" });
    }

    res.json({ success: true, test });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
