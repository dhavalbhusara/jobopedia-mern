const express = require('express');
const router = express.Router();

const KEYWORD_MAP = {
  clinical: [
    "ICH-GCP E6(R3)", "NDCT Rules 2019", "IWRS / RTSM Systems", "IP Drug Accountability (2°C–8°C)",
    "Investigator Site File (ISF)", "Ethics Committee Approvals", "eCRF / EDC Data Entry",
    "BA/BE Study Operations", "Biological Sample Handling", "Preclinical Animal Studies",
    "Source Data Verification (SDV)", "Protocol Deviation Management"
  ],
  clerk: [
    "File Management", "Noting & Drafting", "RTI Act 2005 Compliance", "Gujarati & English Typing 40 WPM",
    "MS Excel & Office", "Public Dealing", "Office Procedure Guidelines", "Revenue File Processing",
    "Secretariat Procedures", "Record Keeping", "Citizen Grievance Resolution"
  ],
  software: [
    "React.js", "Node.js", "TypeScript", "REST APIs", "MongoDB / SQL",
    "Cloud Deployment (AWS/Vercel)", "Git / GitHub", "Agile / Scrum", "Microservices", "System Architecture"
  ],
  banking: [
    "Financial Modeling", "KYC Verification", "Credit Underwriting", "Banking Regulations",
    "RBI Guidelines", "Customer Relationship", "Risk Assessment", "Branch Operations", "AML Compliance"
  ],
  pharmacist: [
    "Prescription Dispensing", "Pharmacy Council Regulations (PCI)", "Cold Chain Storage (2°C–8°C)",
    "Quality Assurance (QA/QC)", "Good Manufacturing Practice (GMP)", "Patient Counseling",
    "Hospital Formulary", "Drug Interaction Screening"
  ],
  civil: [
    "AutoCAD", "Site Supervision", "Bar Bending Schedule (BBS)", "Quantity Surveying",
    "Concrete Mix Design", "Quality Control & Material Testing", "Safety Compliance", "Vendor Coordination"
  ],
  default: [
    "Strategic Planning", "Cross-functional Leadership", "Data Analysis",
    "Communication Skills", "Problem Solving", "Time Management", "Project Coordination", "Regulatory Compliance"
  ]
};

// POST /api/ai/resume-keywords
router.post('/resume-keywords', (req, res) => {
  const { targetRole } = req.body;
  const role = (targetRole || '').toLowerCase();

  let matched = KEYWORD_MAP.default;
  if (role.includes('clinic') || role.includes('pharm') || role.includes('cra') || role.includes('crc') || role.includes('trial') || role.includes('drug')) {
    matched = KEYWORD_MAP.clinical;
  } else if (role.includes('clerk') || role.includes('sachivalay') || role.includes('admin') || role.includes('talati') || role.includes('govt')) {
    matched = KEYWORD_MAP.clerk;
  } else if (role.includes('soft') || role.includes('dev') || role.includes('tech') || role.includes('it') || role.includes('web') || role.includes('full stack')) {
    matched = KEYWORD_MAP.software;
  } else if (role.includes('bank') || role.includes('po') || role.includes('finance') || role.includes('account')) {
    matched = KEYWORD_MAP.banking;
  } else if (role.includes('civil') || role.includes('site') || role.includes('struct') || role.includes('build')) {
    matched = KEYWORD_MAP.civil;
  }

  res.json({
    success: true,
    targetRole: targetRole || "General Professional",
    keywords: matched,
    summaryHeadline: `Target-driven professional specialized in ${matched.slice(0, 3).join(", ")}. Adept at protocol compliance, operational excellence, and high-impact institutional delivery.`
  });
});

module.exports = router;
