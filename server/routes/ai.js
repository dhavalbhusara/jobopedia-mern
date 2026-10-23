const express = require('express');
const router = express.Router();

const KEYWORD_MAP = {
  software: ["React.js", "Node.js", "TypeScript", "REST APIs", "SQL", "Cloud AWS", "Git / GitHub", "Agile / Scrum", "Microservices", "System Design"],
  banking: ["Financial Modeling", "KYC Verification", "Credit Underwriting", "Banking Regulations", "RBI Guidelines", "Customer Relationship", "Risk Assessment", "Branch Operations", "AML Compliance"],
  civil: ["Public Policy", "Administrative Governance", "Constitutional Law", "District Administration", "Disaster Management", "Budget Allocation", "Public Grievance Redressal", "Ethics & Integrity"],
  engineering: ["AutoCAD", "Structural Analysis", "Project Execution", "Quality Assurance", "Site Supervision", "Vendor Management", "Cost Estimation", "Safety Protocols"],
  default: ["Strategic Planning", "Cross-functional Leadership", "Data Analysis", "Communication Skills", "Problem Solving", "Time Management", "Project Coordination"]
};

// POST /api/ai/resume-keywords
router.post('/resume-keywords', (req, res) => {
  const { targetRole } = req.body;
  const role = (targetRole || '').toLowerCase();

  let matched = KEYWORD_MAP.default;
  if (role.includes('soft') || role.includes('dev') || role.includes('tech') || role.includes('it')) {
    matched = KEYWORD_MAP.software;
  } else if (role.includes('bank') || role.includes('po') || role.includes('finance')) {
    matched = KEYWORD_MAP.banking;
  } else if (role.includes('civil') || role.includes('upsc') || role.includes('admin') || role.includes('govt')) {
    matched = KEYWORD_MAP.civil;
  } else if (role.includes('eng') || role.includes('mechanical') || role.includes('civil')) {
    matched = KEYWORD_MAP.engineering;
  }

  res.json({
    success: true,
    targetRole: targetRole || "General Professional",
    keywords: matched,
    summaryHeadline: `Target-driven professional with proven expertise in ${matched.slice(0, 3).join(", ")}. Adept at regulatory compliance, scalable project delivery, and high-impact operations.`
  });
});

module.exports = router;
