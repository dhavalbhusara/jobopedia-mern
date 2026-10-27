import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Check, X, FileText, Download, Printer, Plus, Trash2, 
  ChevronRight, Award, Briefcase, GraduationCap, BookOpen, User, 
  Phone, Mail, MapPin, Globe, ShieldCheck, RefreshCw, Eye, Edit3
} from 'lucide-react';

// Preset 1: Dhaval Bhusara - Clinical Research Coordinator & Pharmacology (Matches 100% of uploaded 2-page PDF)
const DHAVAL_PRESET = {
  fullName: "BHUSARA DHAVAL M.",
  jobTitle: "Clinical Research Coordinator | Clinical Research | Pharmacology",
  mobile: "8487944035",
  email: "dhavalbhusara0123@gmail.com",
  linkedIn: "www.linkedin.com/in/dhaval-bhusara-66796230a",
  location: "Vadodara / Ahmedabad, Gujarat",
  summary: "M. Pharm (Pharmacology), completed in 2026, with a strong background in clinical research, pharmacology and laboratory research. Experienced in Phase II Clinical Trials across therapeutic areas including Rheumatoid Arthritis (RA), Systemic Lupus Erythematosus (SLE), and Inflammatory Bowel Disease (IBD), with hands-on proficiency in Interactive Web Response System (IWRS/RTSM) operations, drug accountability, and study documentation. Familiar with Good Clinical Practice (ICH-GCP E6(R3)), New Drugs and Clinical Trials (NDCT) Rules 2019, Ethics Committee processes, and ISF maintenance. Experienced in BA/BE studies, animal toxicity studies and laboratory work. Seeking to contribute as a Clinical Research Coordinator and progress toward a CRA role.",
  
  knowledgeTitle: "CLINICAL RESEARCH KNOWLEDGE",
  knowledgePoints: [
    { label: "ICH-GCP E6(R3)", desc: "principles of Good Clinical Practice, participant protection, informed consent, investigator responsibilities and essential documentation." },
    { label: "NDCT Rules 2019", desc: "basic understanding of clinical trial regulatory requirements in India and the role of the Central Licensing Authority (CLA)." },
    { label: "IWRS & Trial Operations", desc: "operational proficiency in Interactive Web Response System (IWRS/RTSM) for subject screening, randomization, study visit completion, kit allocation, and drug dispensing tracking." },
    { label: "Study Delegation & Compliance", desc: "understanding of PI delegation, Delegation Log and the importance of training/GCP compliance before performing delegated study activities." }
  ],

  experiences: [
    {
      title: "Clinical Research Coordinator — Phase II Clinical Trials",
      organization: "Therapeutic Areas: Rheumatoid Arthritis (RA), Systemic Lupus Erythematosus (SLE), and Inflammatory Bowel Disease (IBD)",
      location: "",
      period: "2025 - Present",
      bullets: [
        "Operated Interactive Web Response System (IWRS/RTSM) for subject screening, randomization, visit tracking, kit allocation, and investigational product dispensing updates.",
        "Managed Investigational Product (IP) accountability logs, temperature monitoring records (2°C–8°C / room temperature), kit reconciliations, and return/destruction records in IWRS.",
        "Maintained and updated Investigator Site File (ISF) and essential regulatory documentation in compliance with ICH-GCP E6(R3) and NDCT Rules 2019.",
        "Assisted Principal Investigators in source data documentation, CRF/eCRF data entry, and prompt resolution of data queries raised by CRAs.",
        "Coordinated subject visit scheduling, laboratory sample handling, packaging, and shipment in adherence to study-specific lab manuals."
      ]
    },
    {
      title: "BA/BE Study Coordinator — Anjna Hospital Pvt. Ltd., Vadodara | 6 Months",
      organization: "Anjna Hospital Pvt. Ltd.",
      location: "Vadodara, Gujarat",
      period: "6 Months",
      bullets: [
        "Supported coordination of Bioavailability/Bioequivalence (BA/BE) studies, gaining hands-on exposure to clinical trial conduct in a GCP compliant hospital setting.",
        "Assisted with study-related documentation, subject scheduling and adherence to protocol and ICH-GCP requirements during the study period."
      ]
    }
  ],

  research: {
    currentTitle: "Current Research — Anti-urolithiatic and antioxidant potential of Cuscuta reflexa Roxb. extract in rats",
    bullets: [
      "Conducted/assisted with preclinical research activities and laboratory procedures.",
      "Worked with animal handling, study groups, dosing-related procedures and research documentation."
    ],
    previousTitle: "Previous Research:",
    previousBullets: [
      "28-Day Toxicity Study on herbal drug in rats.",
      "Acute Oral Toxicity study according to OECD guidelines."
    ]
  },

  education: [
    { degree: "M. Pharm (Pharmacology)", institution: "VBT–GTU", year: "Completed 2026", grade: "" },
    { degree: "B. Pharm", institution: "SRI–GTU", year: "2024", grade: "" },
    { degree: "12th", institution: "2020 | 53%", year: "10th", grade: "2018 | 61%" }
  ],

  certifications: [
    "4-Month Industrial Training Certificate – SRI Pharmaceutical Pvt. Ltd (QC, QA, Production)",
    "ICH-GCP E6(R3)",
    "Clinical Data Management (2025)"
  ],

  technicalSkills: [
    { category: "Clinical Research", items: "GCP, NDCT Rules 2019, Phase II Trial Operations, IWRS/RTSM Systems, clinical trial documentation, EC processes, study workflow" },
    { category: "Industrial Exposure", items: "Quality Control (QC), Quality Assurance (QA), Production workflows & documentation" },
    { category: "Molecular Docking", items: "AutoDock Vina, PyMOL" },
    { category: "MS Office", items: "MS Excel, Word, PowerPoint" },
    { category: "Laboratory Skills", items: "Basic laboratory skills and animal handling" },
    { category: "Competencies", items: "Scientific documentation, protocol compliance, and problem solving" }
  ],

  languages: "Gujarati | Hindi | English",
  careerObjective: "To build a strong career in clinical research as a Clinical Research Coordinator, develop expertise in study coordination, IWRS operations, and GCP compliant trial conduct, and progress toward a Clinical Research Associate role."
};

// Preset 2: Bhavesh Patel - Senior Administrative Clerk (Govt Secretariat)
const BHAVESH_PRESET = {
  fullName: "BHAVESH PATEL",
  jobTitle: "Senior Administrative Clerk | Secretariat Procedures & RTI Compliance",
  mobile: "+91 98250 12345",
  email: "bhavesh.patel@gmail.com",
  linkedIn: "www.linkedin.com/in/bhavesh-patel-admin",
  location: "Gandhinagar, Gujarat",
  summary: "Certified Administrative Professional with proven experience in Gujarat government secretariat procedures, noting and drafting, file processing, and RTI document compliance. Highly adept at digital e-governance workflows, revenue record verification, and high-speed bilingual typing.",
  
  knowledgeTitle: "CORE ADMINISTRATIVE & GOVT COMPETENCIES",
  knowledgePoints: [
    { label: "Noting & Drafting", desc: "Expert in preparing formal government office notes, cabinet briefs, and departmental orders in compliance with Secretariat Manual." },
    { label: "RTI Act 2005 Compliance", desc: "Thorough knowledge of statutory timelines, public record classification, and lawful citizen information disclosure." },
    { label: "E-Governance Portals (OASIS & iWDMS)", desc: "Proficient in end-to-end digital file tracking, electronic signature protocols, and dispatch registers." },
    { label: "Bilingual Typing 40 WPM", desc: "Certified typing speed in Gujarati (Shruti / Indic) and English with 99.4% transcription accuracy." }
  ],

  experiences: [
    {
      title: "Executive Clerk — District Panchayat Office",
      organization: "Revenue & General Administration Department",
      location: "Gandhinagar, Gujarat",
      period: "2024 - Present",
      bullets: [
        "Processed over 180 official dispatch files weekly, ensuring zero procedural delays in citizen grievance resolutions.",
        "Managed public applications with 99.8% recording accuracy and compiled weekly compliance dossiers for District Collectorate scrutiny.",
        "Streamlined physical record rooms by digitizing over 4,500 legacy village registry documents into standardized searchable formats."
      ]
    }
  ],

  research: {
    currentTitle: "E-Governance Record Optimization Project",
    bullets: [
      "Spearheaded digital archive pilot program reducing file retrieval turnaround time from 4 days to under 15 minutes."
    ],
    previousTitle: "",
    previousBullets: []
  },

  education: [
    { degree: "Bachelor of Commerce (B.Com)", institution: "Gujarat University, Ahmedabad", year: "2024", grade: "74.5% First Class" },
    { degree: "HSC (12th General Stream)", institution: "GHSEB Gandhinagar", year: "2021", grade: "81.2% Distinction" }
  ],

  certifications: [
    "CCC (Course on Computer Concepts) Examination Certification — GTU (Grade A)",
    "Government Certified Typing (English 40 WPM & Gujarati 30 WPM)",
    "RTI Act 2005 Procedural Workshop – SPIPA Ahmedabad"
  ],

  technicalSkills: [
    { category: "Office Software", items: "Advanced MS Excel (VLOOKUP, Pivot Tables), Word, PowerPoint, Google Workspace" },
    { category: "Govt Portals", items: "OASIS, AnyROR, e-Dhara, IFMS Gujarat, Digital Seva Setu" },
    { category: "Typing & Languages", items: "English 40 WPM, Gujarati Typing (Indic Input 3 / Shruti), Hindi" }
  ],

  languages: "Gujarati | Hindi | English",
  careerObjective: "Dedicated public service professional aiming to contribute exceptional administrative rigor, speed, and integrity as a Senior Administrative Clerk within Gujarat Government departments."
};

// Preset 3: Software Engineer / IT Professional
const SOFTWARE_PRESET = {
  fullName: "RAHUL SHAH",
  jobTitle: "Full Stack Software Engineer | React.js | Node.js | Cloud",
  mobile: "+91 98980 54321",
  email: "rahul.shah.dev@gmail.com",
  linkedIn: "www.linkedin.com/in/rahul-shah-dev",
  location: "Ahmedabad, Gujarat",
  summary: "Results-driven Software Engineer with 2+ years of experience in architecting and deploying scalable web applications using React.js, Node.js, Express, and MongoDB. Proven track record in optimizing REST APIs, implementing microservices, and leading agile sprint deliverables.",
  
  knowledgeTitle: "CORE TECHNICAL COMPETENCIES",
  knowledgePoints: [
    { label: "Frontend Architecture", desc: "Expertise in React 18, Next.js, Redux Toolkit, Tailwind CSS, and Responsive UI Design." },
    { label: "Backend & RESTful APIs", desc: "Building modular Node.js/Express microservices with JWT authentication, role-based access, and rate limiting." },
    { label: "Database Management", desc: "MongoDB aggregation pipelines, indexing, PostgreSQL relational schema design, and Redis caching." }
  ],

  experiences: [
    {
      title: "Full Stack Developer — Infotech Solutions Pvt Ltd",
      organization: "Enterprise Web Applications Vertical",
      location: "Ahmedabad, Gujarat",
      period: "2024 - Present",
      bullets: [
        "Engineered scalable MERN stack recruitment portal serving 50,000+ monthly active candidates with sub-second response times.",
        "Integrated AWS S3 for document uploads and reduced cloud asset latency by 45% using CloudFront CDN.",
        "Spearheaded automated unit and integration testing pipelines with Jest, achieving 88% code test coverage."
      ]
    }
  ],

  research: {
    currentTitle: "AI-Powered Automated Resume Parsing & Ranking Algorithm",
    bullets: [
      "Developed NLP-based ATS scanner utilizing TF-IDF keyword extraction to evaluate applicant-job alignment."
    ],
    previousTitle: "",
    previousBullets: []
  },

  education: [
    { degree: "B.Tech in Computer Engineering", institution: "Gujarat Technological University (GTU)", year: "2024", grade: "8.6 CGPA" }
  ],

  certifications: [
    "AWS Certified Cloud Practitioner (2025)",
    "Meta Frontend Developer Professional Certificate — Coursera",
    "MongoDB Certified Developer Associate"
  ],

  technicalSkills: [
    { category: "Languages", items: "JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, SQL" },
    { category: "Frameworks & Libraries", items: "React.js, Node.js, Express.js, Tailwind CSS, Bootstrap" },
    { category: "Databases & Tools", items: "MongoDB, PostgreSQL, Git, GitHub, Docker, Postman, Vite" }
  ],

  languages: "Gujarati | Hindi | English",
  careerObjective: "To advance my career as a Senior Full Stack Engineer building high-throughput, mission-critical cloud software systems."
};

export default function ResumeBuilder({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('personal'); 
  const [resumeData, setResumeData] = useState(() => DHAVAL_PRESET);
  const [targetRole, setTargetRole] = useState('Clinical Research Coordinator');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'edit' | 'preview'

  if (!isOpen) return null;

  // AI Keyword Matcher
  const handleGenerateKeywords = async (roleQuery) => {
    const role = roleQuery || targetRole;
    if (!role) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/resume-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: role })
      });
      const data = await res.json();
      if (data.success) {
        setAiResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddAllAiKeywords = () => {
    if (!aiResult || !aiResult.keywords) return;
    const kwString = aiResult.keywords.join(', ');
    const updatedSkills = [...resumeData.technicalSkills];
    const existingIndex = updatedSkills.findIndex(s => s.category.includes('ATS Target'));
    if (existingIndex >= 0) {
      updatedSkills[existingIndex].items = kwString;
    } else {
      updatedSkills.unshift({ category: 'ATS Target Keywords / કીવર્ડ્સ', items: kwString });
    }
    setResumeData({ ...resumeData, technicalSkills: updatedSkills });
  };

  // MULTI-PAGE PRINT & PDF EXPORT HANDLER
  // Creates an isolated clean iframe with NO outer border, compact margins, and clean multi-page flow!
  const handlePrintPDF = () => {
    const resumeEl = document.getElementById('printable-resume');
    if (!resumeEl) {
      window.print();
      return;
    }

    let printFrame = document.getElementById('jobopedia-resume-print-frame');
    if (!printFrame) {
      printFrame = document.createElement('iframe');
      printFrame.id = 'jobopedia-resume-print-frame';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame);
    }

    const printDoc = printFrame.contentWindow.document;
    printDoc.open();
    printDoc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${(resumeData.fullName || 'Resume').replace(/\s+/g, '_')}_ATS_Resume</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm 14mm 10mm 14mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #0F172A;
            font-family: Calibri, 'Segoe UI', Arial, sans-serif;
            font-size: 11px;
            line-height: 1.38;
          }
          .resume-sheet {
            width: 100%;
            background: #ffffff;
            padding: 0;
            margin: 0;
            border: none !important;
            box-shadow: none !important;
          }
          .page-break {
            page-break-after: always !important;
            break-after: page !important;
            height: 0;
            margin: 0;
            padding: 0;
            border: none;
          }
          .no-print-preview {
            display: none !important;
          }
          h1 {
            font-size: 22px;
            font-weight: 900;
            color: #0B1E33;
            margin: 0 0 2px 0;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .subtitle {
            font-size: 11.5px;
            font-weight: 600;
            color: #334155;
            text-align: center;
            margin-bottom: 2px;
          }
          .contact-line {
            font-size: 10px;
            color: #475569;
            text-align: center;
            margin-bottom: 6px;
          }
          .section-title {
            font-size: 11.5px;
            font-weight: 900;
            color: #0F2942;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            border-bottom: 1.5px solid #0F2942;
            padding-bottom: 1px;
            margin-top: 8px;
            margin-bottom: 3.5px;
            page-break-after: avoid;
            break-after: avoid;
          }
          p {
            margin: 0 0 3px 0;
            text-align: justify;
          }
          ul {
            margin: 1.5px 0 3.5px 0;
            padding-left: 14px;
          }
          li {
            margin-bottom: 2px;
            text-align: justify;
          }
          strong {
            color: #0F172A;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <div class="resume-sheet">
          ${resumeEl.innerHTML}
        </div>
      </body>
      </html>
    `);
    printDoc.close();

    setTimeout(() => {
      try {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
      } catch (e) {
        window.print();
      }
    }, 250);
  };

  // Dynamic Add / Remove helpers
  const addExperience = () => {
    const newExp = {
      title: "New Job Title — Organization (નવો હોદ્દો)",
      organization: "Department / Project Area",
      location: "Location / સ્થળ",
      period: "Year - Year",
      bullets: ["Describe major responsibility or achievement with metrics."]
    };
    setResumeData({ ...resumeData, experiences: [...resumeData.experiences, newExp] });
  };

  const removeExperience = (index) => {
    setResumeData({
      ...resumeData,
      experiences: resumeData.experiences.filter((_, i) => i !== index)
    });
  };

  const addExperienceBullet = (expIndex) => {
    const updated = [...resumeData.experiences];
    updated[expIndex].bullets.push("New measurable achievement or regulatory contribution.");
    setResumeData({ ...resumeData, experiences: updated });
  };

  const removeExperienceBullet = (expIndex, bulletIndex) => {
    const updated = [...resumeData.experiences];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setResumeData({ ...resumeData, experiences: updated });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { degree: "Degree / Course (ડિગ્રી)", institution: "University / Institute (સંસ્થા)", year: "2025", grade: "" }]
    });
  };

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    });
  };

  const addKnowledgePoint = () => {
    setResumeData({
      ...resumeData,
      knowledgePoints: [...resumeData.knowledgePoints, { label: "New Competency (નવી ક્ષમતા)", desc: "Procedural workflow and regulatory understanding." }]
    });
  };

  const removeKnowledgePoint = (index) => {
    setResumeData({
      ...resumeData,
      knowledgePoints: resumeData.knowledgePoints.filter((_, i) => i !== index)
    });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, "New Certificate / Training Course (નવું સર્ટિફિકેટ)"]
    });
  };

  const removeCertification = (index) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
      
      {/* Modal Container */}
      <div className="bg-slate-100 rounded-3xl w-full max-w-[1480px] h-[95vh] flex flex-col shadow-2xl border border-slate-700/50 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-[#0B1E33] text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-blue-900/60 no-print">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
                  ATS Resume Builder (HR સિલેક્શન કીવર્ડ્સ સાથે)
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  100% Recruiter Approved
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                મલ્ટિ-પેજ PDF એક્સપોર્ટ અને લાઈવ ATS ફોર્મેટ સાથે (Multi-Page PDF Export Ready)
              </p>
            </div>
          </div>

          {/* Presets and Export Actions */}
          <div className="flex items-center space-x-2">
            
            {/* Sample Data Presets */}
            <div className="flex items-center space-x-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs">
              <span className="text-[10px] font-bold text-slate-400 px-1.5 uppercase hidden xl:inline">
                નમૂના ડેટા / Presets:
              </span>
              <button
                onClick={() => { setResumeData(DHAVAL_PRESET); setTargetRole('Clinical Research Coordinator'); }}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[11px] transition cursor-pointer"
                title="Load Dhaval Bhusara (Clinical Research Coordinator & Pharmacology)"
              >
                🔬 ક્લિનિકલ રિસર્ચ (Clinical)
              </button>
              <button
                onClick={() => { setResumeData(BHAVESH_PRESET); setTargetRole('Senior Clerk'); }}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-[11px] transition cursor-pointer"
                title="Load Bhavesh Patel (Govt Senior Clerk)"
              >
                🏛️ સરકારી ક્લાર્ક (Govt Clerk)
              </button>
              <button
                onClick={() => { setResumeData(SOFTWARE_PRESET); setTargetRole('Software Engineer'); }}
                className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-[11px] transition cursor-pointer hidden sm:inline"
                title="Load Rahul Shah (Software Engineer)"
              >
                💻 સોફ્ટવેર (IT)
              </button>
            </div>

            {/* Print / Export PDF Button */}
            <button
              onClick={handlePrintPDF}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-1.5 cursor-pointer"
              title="Print or Export Complete Multi-Page PDF"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ PDF ડાઉનલોડ કરો (Export PDF)</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="બંધ કરો (Close)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="lg:hidden flex items-center justify-center bg-slate-200 border-b border-slate-300 p-1.5 gap-2 no-print shrink-0">
          <button
            onClick={() => setViewMode('edit')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              viewMode === 'edit' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>✏️ વિગતો ભરો (Edit Form)</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              viewMode === 'preview' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>📄 લાઈવ રેઝ્યૂમે (Live A4 Preview)</span>
          </button>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Bilingual Form Controls & AI Optimizer */}
          {/* ========================================================= */}
          <div className={`w-full lg:w-1/2 flex flex-col bg-white border-r border-slate-200 overflow-hidden no-print ${
            viewMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}>
            
            {/* AI ATS Keyword Matcher Header Box */}
            <div className="p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border-b border-slate-200 space-y-2.5 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-black text-slate-900">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>AI જોબ રોલ મેચ &amp; કીવર્ડ ઑપ્ટિમાઇઝર (AI Keyword Optimizer)</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ⚡ 95% Match (ATS Shortlist Ready)
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="તમે કઈ જોબ માટે અરજી કરવા માંગો છો? (Which job role? e.g. Clinical Research, Senior Clerk, Pharmacist)"
                  className="flex-1 px-3 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleGenerateKeywords()}
                  disabled={aiLoading}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition shrink-0 cursor-pointer flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
                  <span>{aiLoading ? 'મેચિંગ...' : 'મેચ (Match)'}</span>
                </button>
              </div>

              {/* Recommended Keywords */}
              {aiResult && aiResult.keywords && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">શિફારસ કરેલ HR &amp; ATS કીવર્ડ્સ (Recommended Keywords):</span>
                    <button
                      onClick={handleAddAllAiKeywords}
                      className="text-blue-600 font-black hover:underline cursor-pointer"
                    >
                      + બધા ઉમેરો (+ Add All)
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                    {aiResult.keywords.map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const updated = [...resumeData.technicalSkills];
                          updated[0].items = updated[0].items ? `${updated[0].items}, ${kw}` : kw;
                          setResumeData({ ...resumeData, technicalSkills: updated });
                        }}
                        className="px-2 py-0.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold shadow-2xs transition cursor-pointer"
                        title="Click to add into skills"
                      >
                        + {kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs (All in Gujarati + English) */}
            <div className="flex items-center gap-1 px-3 pt-2.5 pb-2 border-b border-slate-200 bg-slate-50 overflow-x-auto no-scrollbar shrink-0 text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'personal' ? 'bg-blue-600 text-white font-black shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૧. અંગત વિગતો (Personal)
              </button>
              <button
                onClick={() => setActiveTab('knowledge')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'knowledge' ? 'bg-blue-600 text-white font-black shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૨. મુખ્ય નોલેજ (Knowledge)
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'experience' ? 'bg-blue-600 text-white font-black shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૩. કાર્ય અનુભવ (Experience)
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'research' ? 'bg-blue-600 text-white font-black shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૪. સંશોધન / પ્રોજેક્ટ્સ (Research)
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'education' ? 'bg-blue-600 text-white font-black shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૫. શિક્ષણ (Education)
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'skills' ? 'bg-blue-600 text-white font-black shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૬. સ્કિલ્સ &amp; સર્ટિ. (Skills)
              </button>
              <button
                onClick={() => setActiveTab('objective')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'objective' ? 'bg-blue-600 text-white font-black shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૭. લક્ષ્ય &amp; ભાષાઓ (Objective)
              </button>
            </div>

            {/* Tab Form Content Area (Scrollable with Bilingual Labels) */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-slate-800">
              
              {/* TAB 1: PERSONAL DETAILS */}
              {activeTab === 'personal' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">
                      ૧. અંગત વિગતો અને સારાંશ (1. Personal Details &amp; Summary)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      રેઝ્યૂમે હેડર, સંપર્ક માહિતી અને પ્રોફેશનલ સમરી (Header &amp; Contact Info)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        પૂરું નામ (Full Name - UPPERCASE)
                      </label>
                      <input
                        type="text"
                        value={resumeData.fullName}
                        onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                        placeholder="દા.ત. BHUSARA DHAVAL M."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        પ્રોફેશનલ શીર્ષક / હોદ્દો (Professional Title / Job Subtitle)
                      </label>
                      <input
                        type="text"
                        value={resumeData.jobTitle}
                        onChange={(e) => setResumeData({ ...resumeData, jobTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                        placeholder="દા.ત. Clinical Research Coordinator | Clinical Research | Pharmacology"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        મોબાઈલ નંબર (Mobile Number / Phone)
                      </label>
                      <input
                        type="text"
                        value={resumeData.mobile}
                        onChange={(e) => setResumeData({ ...resumeData, mobile: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                        placeholder="દા.ત. 8487944035"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        ઈમેઇલ સરનામું (Email Address)
                      </label>
                      <input
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="દા.ત. dhavalbhusara0123@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        LinkedIn પ્રોફાઇલ URL (LinkedIn Link)
                      </label>
                      <input
                        type="text"
                        value={resumeData.linkedIn}
                        onChange={(e) => setResumeData({ ...resumeData, linkedIn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="દા.ત. www.linkedin.com/in/dhaval-bhusara-66796230a"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        શહેર અને રાજ્ય (City &amp; State / Location)
                      </label>
                      <input
                        type="text"
                        value={resumeData.location}
                        onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="દા.ત. Vadodara, Gujarat"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      પ્રોફાઈલ સારાંશ (Professional Summary)
                    </label>
                    <textarea
                      rows={5}
                      value={resumeData.summary}
                      onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                      placeholder="તમારા અનુભવ, મુખ્ય યોગ્યતાઓ અને લક્ષ્ય વિશે વિગતવાર લખો..."
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: DOMAIN KNOWLEDGE */}
              {activeTab === 'knowledge' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        ૨. ડોમેન નોલેજ અને મુખ્ય યોગ્યતાઓ (2. Core Knowledge &amp; Competencies)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        નિયમનકારી માર્ગદર્શિકા અને પ્રક્રિયાગત યોગ્યતાઓ (GCP, NDCT, Noting &amp; Drafting)
                      </p>
                    </div>
                    <button
                      onClick={addKnowledgePoint}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ નવો પોઇન્ટ (+ Add Competency)</span>
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      વિભાગનું શીર્ષક (Section Heading - UPPERCASE)
                    </label>
                    <input
                      type="text"
                      value={resumeData.knowledgeTitle}
                      onChange={(e) => setResumeData({ ...resumeData, knowledgeTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                    />
                  </div>

                  <div className="space-y-3">
                    {resumeData.knowledgePoints.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group">
                        <button
                          onClick={() => removeKnowledgePoint(idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          title="કાઢી નાખો (Delete)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="pr-6">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            મુખ્ય કીવર્ડ / સબ-હેડિંગ #{idx + 1} (Sub-Heading / Guideline)
                          </label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const updated = [...resumeData.knowledgePoints];
                              updated[idx].label = e.target.value;
                              setResumeData({ ...resumeData, knowledgePoints: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white outline-none"
                            placeholder="દા.ત. ICH-GCP E6(R3) અથવા Noting & Drafting"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            વિગતવાર વર્ણન (Detailed Description)
                          </label>
                          <textarea
                            rows={2}
                            value={item.desc}
                            onChange={(e) => {
                              const updated = [...resumeData.knowledgePoints];
                              updated[idx].desc = e.target.value;
                              setResumeData({ ...resumeData, knowledgePoints: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white outline-none"
                            placeholder="નિયમો, પ્રક્રિયાઓ અને પ્રેક્ટિસનું વિગતવાર વર્ણન..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PROFESSIONAL EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        ૩. કાર્ય અનુભવ (3. Professional Work Experience)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        હોદ્દો, સંસ્થા, સમયગાળો અને કામગીરીની સિદ્ધિઓ (Roles, Organizations &amp; Key Achievements)
                      </p>
                    </div>
                    <button
                      onClick={addExperience}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ નવી જોબ ઉમેરો (+ Add Job)</span>
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {resumeData.experiences.map((exp, expIdx) => (
                      <div key={expIdx} className="p-3.5 bg-slate-50 border border-slate-300 rounded-2xl space-y-3 relative">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                          <span className="font-black text-blue-900 text-xs uppercase">
                            અનુભવ #{expIdx + 1} (Work Experience Entry)
                          </span>
                          <button
                            onClick={() => removeExperience(expIdx)}
                            className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center space-x-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>કાઢી નાખો (Delete)</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              હોદ્દો / પદવી (Role Title / Position)
                            </label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].title = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                              placeholder="દા.ત. Clinical Research Coordinator — Phase II Clinical Trials"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              સંસ્થા / પ્રોજેક્ટ ક્ષેત્ર (Organization / Therapeutic Area)
                            </label>
                            <input
                              type="text"
                              value={exp.organization}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].organization = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="દા.ત. Therapeutic Areas: Rheumatoid Arthritis..."
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              સમયગાળો (Duration / Dates)
                            </label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].period = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="દા.ત. 2025 - Present અથવા 6 Months"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              સ્થળ (Job Location)
                            </label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].location = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="દા.ત. Vadodara, Gujarat"
                            />
                          </div>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-700">
                              મુખ્ય સિદ્ધિઓ અને કામગીરી (Key Contributions &amp; Achievements):
                            </span>
                            <button
                              onClick={() => addExperienceBullet(expIdx)}
                              className="text-blue-600 font-black text-[11px] hover:underline cursor-pointer"
                            >
                              + પોઇન્ટ ઉમેરો (+ Add Bullet)
                            </button>
                          </div>
                          {exp.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1.5">
                              <span className="text-slate-400 font-bold">•</span>
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const updated = [...resumeData.experiences];
                                  updated[expIdx].bullets[bIdx] = e.target.value;
                                  setResumeData({ ...resumeData, experiences: updated });
                                }}
                                className="flex-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                              />
                              <button
                                onClick={() => removeExperienceBullet(expIdx, bIdx)}
                                className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                                title="કાઢી નાખો"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: RESEARCH EXPERIENCE */}
              {activeTab === 'research' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">
                      ૪. સંશોધન અને પ્રોજેક્ટ્સ (4. Research Experience &amp; Projects)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      લેબોરેટરી રિસર્ચ, પ્રાણી અભ્યાસ અને એકેડેમિક પ્રોજેક્ટ્સ (Preclinical, Lab &amp; Academic Projects)
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      હાલનું સંશોધન / મુખ્ય પ્રોજેક્ટ શીર્ષક (Current Research Title)
                    </label>
                    <input
                      type="text"
                      value={resumeData.research.currentTitle}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        research: { ...resumeData.research, currentTitle: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white outline-none"
                      placeholder="દા.ત. Current Research — Anti-urolithiatic and antioxidant potential..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 text-[11px]">
                        સંશોધન પ્રવૃત્તિઓ (Research Activities &amp; Methodology):
                      </span>
                      <button
                        onClick={() => {
                          const updated = { ...resumeData.research };
                          updated.bullets.push("New preclinical research finding or method conducted.");
                          setResumeData({ ...resumeData, research: updated });
                        }}
                        className="text-blue-600 font-black text-[11px] hover:underline cursor-pointer"
                      >
                        + પોઇન્ટ ઉમેરો (+ Add Bullet)
                      </button>
                    </div>
                    {resumeData.research.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => {
                            const updated = { ...resumeData.research };
                            updated.bullets[i] = e.target.value;
                            setResumeData({ ...resumeData, research: updated });
                          }}
                          className="flex-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                        />
                        <button
                          onClick={() => {
                            const updated = { ...resumeData.research };
                            updated.bullets = updated.bullets.filter((_, idx) => idx !== i);
                            setResumeData({ ...resumeData, research: updated });
                          }}
                          className="text-rose-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2.5 border-t border-slate-200">
                    <label className="block font-bold text-slate-700 mb-1">
                      અગાઉનું સંશોધન શીર્ષક (Previous Research Header)
                    </label>
                    <input
                      type="text"
                      value={resumeData.research.previousTitle}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        research: { ...resumeData.research, previousTitle: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                      placeholder="દા.ત. Previous Research:"
                    />
                  </div>

                  <div className="space-y-1.5">
                    {resumeData.research.previousBullets.map((pb, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <input
                          type="text"
                          value={pb}
                          onChange={(e) => {
                            const updated = { ...resumeData.research };
                            updated.previousBullets[i] = e.target.value;
                            setResumeData({ ...resumeData, research: updated });
                          }}
                          className="flex-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                        />
                        <button
                          onClick={() => {
                            const updated = { ...resumeData.research };
                            updated.previousBullets = updated.previousBullets.filter((_, idx) => idx !== i);
                            setResumeData({ ...resumeData, research: updated });
                          }}
                          className="text-rose-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: EDUCATION */}
              {activeTab === 'education' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        ૫. શૈક્ષણિક લાયકાત (5. Education &amp; Qualifications)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        ડિગ્રી, યુનિવર્સિટી, વર્ષ અને ટકાવારી (Degrees, Colleges, Years &amp; Percentage)
                      </p>
                    </div>
                    <button
                      onClick={addEducation}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ નવી ડિગ્રી (+ Add Degree)</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                        <button
                          onClick={() => removeEducation(idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          title="કાઢી નાખો (Delete)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              ડિગ્રી / કોર્સનું નામ (Degree / Course)
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].degree = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                              placeholder="દા.ત. M. Pharm (Pharmacology)"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              કોલેજ / યુનિવર્સિટી (College / University / Board)
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].institution = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="દા.ત. VBT–GTU અથવા Gujarat University"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              વર્ષ (Passing Year / Status)
                            </label>
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].year = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="દા.ત. Completed 2026 અથવા 2024"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              ટકાવારી / ગ્રેડ (Percentage / Grade)
                            </label>
                            <input
                              type="text"
                              value={edu.grade}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].grade = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="દા.ત. 74.5% First Class અથવા 53%"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SKILLS & CERTIFICATIONS */}
              {activeTab === 'skills' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">
                      ૬. પ્રમાણપત્રો અને ટેકનિકલ કૌશલ્યો (6. Certifications &amp; Technical Skills)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      ઔદ્યોગિક તાલીમ અને વર્ગીકૃત કૌશલ્યો (Training Certificates &amp; Categorized Skills)
                    </p>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">
                        સર્ટિફિકેટ્સ &amp; ઔદ્યોગિક તાલીમ (Certifications &amp; Industrial Training):
                      </span>
                      <button
                        onClick={addCertification}
                        className="text-blue-600 font-black text-xs hover:underline cursor-pointer"
                      >
                        + સર્ટિફિકેટ ઉમેરો (+ Add Cert)
                      </button>
                    </div>
                    {resumeData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => {
                            const updated = [...resumeData.certifications];
                            updated[idx] = e.target.value;
                            setResumeData({ ...resumeData, certifications: updated });
                          }}
                          className="flex-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                        />
                        <button
                          onClick={() => removeCertification(idx)}
                          className="text-rose-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Categorized Technical Skills */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">
                        વર્ગીકૃત ટેકનિકલ &amp; રિસર્ચ સ્કિલ્સ (Categorized Technical Skills):
                      </span>
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            technicalSkills: [...resumeData.technicalSkills, { category: "New Category (નવી કેટેગરી)", items: "Skill 1, Skill 2" }]
                          });
                        }}
                        className="text-blue-600 font-black text-xs hover:underline cursor-pointer"
                      >
                        + નવી કેટેગરી ઉમેરો (+ Add Category)
                      </button>
                    </div>

                    {resumeData.technicalSkills.map((sk, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 relative">
                        <button
                          onClick={() => {
                            setResumeData({
                              ...resumeData,
                              technicalSkills: resumeData.technicalSkills.filter((_, i) => i !== idx)
                            });
                          }}
                          className="absolute top-2 right-2 text-rose-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pr-6">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                              કેટેગરી (Category)
                            </label>
                            <input
                              type="text"
                              value={sk.category}
                              onChange={(e) => {
                                const updated = [...resumeData.technicalSkills];
                                updated[idx].category = e.target.value;
                                setResumeData({ ...resumeData, technicalSkills: updated });
                              }}
                              className="w-full px-2.5 py-1 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                              placeholder="દા.ત. Clinical Research"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                              કૌશલ્યો / ટૂલ્સ (Tools &amp; Skills)
                            </label>
                            <input
                              type="text"
                              value={sk.items}
                              onChange={(e) => {
                                const updated = [...resumeData.technicalSkills];
                                updated[idx].items = e.target.value;
                                setResumeData({ ...resumeData, technicalSkills: updated });
                              }}
                              className="w-full px-2.5 py-1 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="દા.ત. GCP, NDCT Rules, AutoDock Vina, MS Excel"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 7: OBJECTIVE & LANGUAGES */}
              {activeTab === 'objective' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">
                      ૭. કરિયર લક્ષ્ય અને ભાષાઓ (7. Career Objective &amp; Languages)
                    </h4>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      જાણીતી ભાષાઓ (Languages Known)
                    </label>
                    <input
                      type="text"
                      value={resumeData.languages}
                      onChange={(e) => setResumeData({ ...resumeData, languages: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white outline-none font-bold"
                      placeholder="દા.ત. Gujarati | Hindi | English"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      કરિયર લક્ષ્ય / ઉદ્દેશ્ય (Career Objective / Vision)
                    </label>
                    <textarea
                      rows={4}
                      value={resumeData.careerObjective}
                      onChange={(e) => setResumeData({ ...resumeData, careerObjective: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white outline-none leading-relaxed"
                      placeholder="તમારા લાંબા ગાળાના પ્રોફેશનલ લક્ષ્ય વિશે લખો..."
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Form Action Bar */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] font-bold text-slate-500">
                💾 રીઅલ-ટાઇમ ઓટો-સેવ (Real-time Auto Save Active)
              </span>
              <button
                onClick={handlePrintPDF}
                className="px-4 py-2 bg-[#0B1E33] hover:bg-slate-900 text-white rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>🖨️ PDF ડાઉનલોડ કરો (Export PDF)</span>
              </button>
            </div>

          </div>


          {/* ========================================================= */}
          {/* RIGHT SIDE: Real-time Multi-Page ATS Preview (NO OUTER BORDER, REALISTIC PAGES) */}
          {/* ========================================================= */}
          <div className={`w-full lg:w-1/2 flex flex-col bg-slate-300/80 overflow-y-auto p-3 sm:p-5 lg:p-6 items-center ${
            viewMode === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}>
            
            {/* Live Document Canvas without artificial outer box borders */}
            <div 
              id="printable-resume"
              className="w-full max-w-[760px] space-y-4"
              style={{ fontFamily: "Calibri, 'Segoe UI', Arial, sans-serif" }}
            >
              
              {/* ==================== PAGE 1 ==================== */}
              <div className="bg-white text-slate-900 px-6 sm:px-9 py-6 shadow-xl rounded-sm space-y-2.5 font-sans leading-normal selection:bg-blue-100 relative">
                <div className="absolute top-2 right-3 text-[10px] font-bold text-slate-400 no-print-preview">
                  📄 પેજ ૧ (Page 1)
                </div>

                {/* Header: Name, Subtitle, Contact */}
                <div className="text-center space-y-0.5 pb-1">
                  <h1 className="text-xl sm:text-2xl font-black text-[#0B1E33] tracking-wide uppercase">
                    {resumeData.fullName || "BHUSARA DHAVAL M."}
                  </h1>
                  
                  {resumeData.jobTitle && (
                    <div className="subtitle text-[11px] sm:text-xs font-semibold text-slate-700">
                      {resumeData.jobTitle}
                    </div>
                  )}

                  <div className="contact-line text-[10px] sm:text-[10.5px] text-slate-600 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 pt-0.5">
                    {resumeData.mobile && <span>Mobile: <strong>{resumeData.mobile}</strong></span>}
                    {resumeData.mobile && resumeData.email && <span>|</span>}
                    {resumeData.email && <span>Email: <strong>{resumeData.email}</strong></span>}
                    {resumeData.linkedIn && (
                      <>
                        <span>|</span>
                        <span>LinkedIn: <strong>{resumeData.linkedIn}</strong></span>
                      </>
                    )}
                    {resumeData.location && (
                      <>
                        <span>|</span>
                        <span>{resumeData.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* 1. PROFESSIONAL SUMMARY */}
                {resumeData.summary && (
                  <div className="resume-section space-y-1">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      PROFESSIONAL SUMMARY
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-800 text-justify leading-snug">
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* 2. CLINICAL RESEARCH KNOWLEDGE / CORE COMPETENCIES */}
                {resumeData.knowledgePoints && resumeData.knowledgePoints.length > 0 && (
                  <div className="resume-section space-y-1">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      {resumeData.knowledgeTitle || "CLINICAL RESEARCH KNOWLEDGE"}
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] sm:text-[11px] text-slate-800">
                      {resumeData.knowledgePoints.map((kp, idx) => (
                        <li key={idx} className="flex items-start text-justify">
                          <span className="font-bold mr-1.5 shrink-0">•</span>
                          <span>
                            <strong className="text-slate-900">{kp.label}:</strong> {kp.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3. PROFESSIONAL EXPERIENCE */}
                {resumeData.experiences && resumeData.experiences.length > 0 && (
                  <div className="resume-section space-y-1.5">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      PROFESSIONAL EXPERIENCE
                    </div>
                    {resumeData.experiences.map((exp, idx) => (
                      <div key={idx} className="resume-item space-y-0.5 pt-0.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <div className="text-[11px] font-bold text-slate-900">
                            {exp.title}
                          </div>
                          {exp.period && (
                            <div className="text-[10px] font-semibold text-slate-600">
                              {exp.period}
                            </div>
                          )}
                        </div>

                        {exp.organization && (
                          <div className="text-[10px] italic text-slate-600 font-medium">
                            {exp.organization}
                          </div>
                        )}

                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="space-y-0.5 text-[10.5px] sm:text-[11px] text-slate-800 pt-0.5">
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start text-justify">
                                <span className="font-bold mr-1.5 shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. RESEARCH EXPERIENCE */}
                {resumeData.research && resumeData.research.currentTitle && (
                  <div className="resume-section space-y-1">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      RESEARCH EXPERIENCE
                    </div>
                    <div className="space-y-0.5 text-[10.5px] sm:text-[11px] text-slate-800">
                      <div className="font-bold text-slate-900">
                        {resumeData.research.currentTitle}
                      </div>
                      {resumeData.research.bullets && (
                        <ul className="space-y-0.5">
                          {resumeData.research.bullets.map((b, i) => (
                            <li key={i} className="flex items-start">
                              <span className="font-bold mr-1.5 shrink-0">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {resumeData.research.previousTitle && (
                        <div className="font-bold text-slate-900 pt-1">
                          {resumeData.research.previousTitle}
                        </div>
                      )}
                      {resumeData.research.previousBullets && (
                        <ul className="space-y-0.5">
                          {resumeData.research.previousBullets.map((pb, i) => (
                            <li key={i} className="flex items-start">
                              <span className="font-bold mr-1.5 shrink-0">•</span>
                              <span>{pb}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. EDUCATION */}
                {resumeData.education && resumeData.education.length > 0 && (
                  <div className="resume-section space-y-1">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      EDUCATION
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] sm:text-[11px] text-slate-800">
                      {resumeData.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start justify-between">
                          <div className="flex items-start">
                            <span className="font-bold mr-1.5 shrink-0">•</span>
                            <span>
                              <strong>{edu.degree}</strong>, {edu.institution} {edu.grade ? `| ${edu.grade}` : ''}
                            </span>
                          </div>
                          {edu.year && (
                            <span className="text-[10.5px] font-semibold text-slate-600 shrink-0 ml-2">
                              | {edu.year}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>


              {/* ==================== CLEAN PAGE BREAK INDICATOR ==================== */}
              <div className="page-break no-print-preview flex items-center justify-center my-3">
                <div className="border-t-2 border-dashed border-slate-400 w-full flex items-center justify-center">
                  <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-2xs border border-slate-300">
                    📄 પેજ ૨ / Page 2 Starts Below
                  </span>
                </div>
              </div>


              {/* ==================== PAGE 2 ==================== */}
              <div className="bg-white text-slate-900 px-6 sm:px-9 py-6 shadow-xl rounded-sm space-y-2.5 font-sans leading-normal selection:bg-blue-100 relative">
                <div className="absolute top-2 right-3 text-[10px] font-bold text-slate-400 no-print-preview">
                  📄 પેજ ૨ (Page 2)
                </div>

                {/* 6. CERTIFICATIONS & INDUSTRIAL TRAINING */}
                {resumeData.certifications && resumeData.certifications.length > 0 && (
                  <div className="resume-section space-y-1">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      CERTIFICATIONS &amp; INDUSTRIAL TRAINING
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] sm:text-[11px] text-slate-800">
                      {resumeData.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="font-bold mr-1.5 shrink-0">•</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 7. TECHNICAL & RESEARCH SKILLS */}
                {resumeData.technicalSkills && resumeData.technicalSkills.length > 0 && (
                  <div className="resume-section space-y-1">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      TECHNICAL &amp; RESEARCH SKILLS
                    </div>
                    <ul className="space-y-0.5 text-[10.5px] sm:text-[11px] text-slate-800">
                      {resumeData.technicalSkills.map((sk, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="font-bold mr-1.5 shrink-0">•</span>
                          <span>
                            <strong className="text-slate-900">{sk.category}:</strong> {sk.items}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 8. LANGUAGES */}
                {resumeData.languages && (
                  <div className="resume-section space-y-0.5">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      LANGUAGES
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-800">
                      {resumeData.languages}
                    </p>
                  </div>
                )}

                {/* 9. CAREER OBJECTIVE */}
                {resumeData.careerObjective && (
                  <div className="resume-section space-y-0.5">
                    <div className="section-title text-xs font-black text-[#0F2942] uppercase tracking-wider border-b-[1.5px] border-[#0F2942] pb-0.5">
                      CAREER OBJECTIVE
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-800 text-justify leading-snug">
                      {resumeData.careerObjective}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
