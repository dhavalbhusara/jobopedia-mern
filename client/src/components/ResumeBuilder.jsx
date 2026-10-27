import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Check, X, FileText, Download, Printer, Plus, Trash2, 
  ChevronRight, Award, Briefcase, GraduationCap, BookOpen, User, 
  Phone, Mail, MapPin, Globe, ShieldCheck, RefreshCw, Eye, Edit3
} from 'lucide-react';

// Preset 1: Dhaval Bhusara - Clinical Research Coordinator & Pharmacology (Matches uploaded PDF)
const DHAVAL_PRESET = {
  fullName: "BHUSARA DHAVAL M.",
  jobTitle: "Clinical Research Coordinator | Clinical Research | Pharmacology",
  mobile: "9510442584",
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
    { degree: "12th (Science)", institution: "GSEB Board", year: "2020", grade: "53% | 10th | 2018 | 61%" }
  ],

  certifications: [
    "4-Month Industrial Training Certificate – SRI Pharmaceutical Pvt. Ltd (QC, QA, Production)",
    "ICH-GCP E6(R3) Investigator & Site Certification",
    "Clinical Data Management (CDM) System Proficiency (2025)"
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
    { label: "Noting & Drafting", desc: "Expert in preparing formal government office notes, cabinet briefs, and official departmental orders in compliance with Secretariat Manual." },
    { label: "RTI Act 2005 Compliance", desc: "Thorough knowledge of statutory timelines, public record management, and lawful citizen information disclosure." },
    { label: "E-Governance (OASIS & iWDMS)", desc: "Proficient in end-to-end digital file tracking, electronic signature protocols, and dispatch registers." },
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

export default function ResumeBuilder({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('personal'); // personal | knowledge | experience | research | education | skills | objective
  const [resumeData, setResumeData] = useState(() => DHAVAL_PRESET);
  const [targetRole, setTargetRole] = useState('Clinical Research Coordinator');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [viewMode, setViewMode] = useState('split'); // 'split' (desktop) | 'edit' | 'preview' (mobile)

  useEffect(() => {
    // If user has profile info, update default name/email if empty
    if (user && resumeData.email === DHAVAL_PRESET.email && user.email) {
      // Keep Dhaval preset by default or let user customize
    }
  }, [user]);

  if (!isOpen) return null;

  // AI Keyword Generator
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

  // Add all AI keywords into Technical Skills or Knowledge
  const handleAddAllAiKeywords = () => {
    if (!aiResult || !aiResult.keywords) return;
    const kwString = aiResult.keywords.join(', ');
    const updatedSkills = [...resumeData.technicalSkills];
    const existingIndex = updatedSkills.findIndex(s => s.category === 'ATS Target Keywords');
    if (existingIndex >= 0) {
      updatedSkills[existingIndex].items = kwString;
    } else {
      updatedSkills.unshift({ category: 'ATS Target Keywords', items: kwString });
    }
    setResumeData({ ...resumeData, technicalSkills: updatedSkills });
  };

  // Print PDF
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${resumeData.fullName.replace(/\s+/g, '_')}_ATS_Resume`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  // Dynamic Add / Remove helpers
  const addExperience = () => {
    const newExp = {
      title: "New Role / Position — Company",
      organization: "Department / Project",
      location: "Location",
      period: "Year - Year",
      bullets: ["Detail key contribution with quantifiable metrics and achievements."]
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
    updated[expIndex].bullets.push("New accomplishment or regulatory responsibility.");
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
      education: [...resumeData.education, { degree: "Degree / Diploma", institution: "University / Institute", year: "2025", grade: "" }]
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
      knowledgePoints: [...resumeData.knowledgePoints, { label: "Core Competency", desc: "Detailed procedural understanding and compliance guidelines." }]
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
      certifications: [...resumeData.certifications, "New Certificate / Industrial Training Course"]
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
      <div className="bg-slate-100 rounded-3xl w-full max-w-[1450px] h-[95vh] flex flex-col shadow-2xl border border-slate-700/50 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-[#0B1E33] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-blue-900/60 no-print">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  ATS Resume Builder
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  HR Recruiter Approved
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                AI કીવર્ડ્સ સાથે પ્રોફેશનલ ૧૦૦% ATS પાસિંગ રેઝ્યૂમે બનાવો અને ડાઉનલોડ કરો
              </p>
            </div>
          </div>

          {/* Quick Presets & Print Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Sample Presets Dropdown */}
            <div className="flex items-center space-x-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
              <span className="text-[10px] font-bold text-slate-400 px-2 uppercase hidden sm:inline">
                Sample Data:
              </span>
              <button
                onClick={() => { setResumeData(DHAVAL_PRESET); setTargetRole('Clinical Research Coordinator'); }}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[11px] transition cursor-pointer"
                title="Load Dhaval Bhusara (Clinical Research Coordinator & Pharmacology)"
              >
                🔬 Clinical Research
              </button>
              <button
                onClick={() => { setResumeData(BHAVESH_PRESET); setTargetRole('Senior Clerk'); }}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-[11px] transition cursor-pointer"
                title="Load Bhavesh Patel (Govt Senior Clerk)"
              >
                🏛️ Govt Clerk
              </button>
            </div>

            {/* Print / Download Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ Download / Print PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close Builder"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile View Toggle Switch */}
        <div className="lg:hidden flex items-center justify-center bg-slate-200 border-b border-slate-300 p-1.5 gap-2 no-print shrink-0">
          <button
            onClick={() => setViewMode('edit')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              viewMode === 'edit' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>✏️ Edit Details (વિગતો ભરો)</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              viewMode === 'preview' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>📄 Real-time ATS Preview</span>
          </button>
        </div>

        {/* Main Content Body: Split Left (Editor) and Right (Live Preview) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Form Controls & AI Optimizer (Editor) */}
          {/* ========================================================= */}
          <div className={`w-full lg:w-1/2 flex flex-col bg-white border-r border-slate-200 overflow-hidden no-print ${
            viewMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}>
            
            {/* AI ATS Keyword Matcher Header Box */}
            <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border-b border-slate-200 space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-black text-slate-900">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                  <span>AI Job Role Match &amp; Keyword Optimizer</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ⚡ 95% Match (ATS Shortlist Ready)
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="કઈ જોબ માટે અરજી કરવી છે? (e.g. Clinical Research, Senior Clerk, Pharmacist, Software)"
                  className="flex-1 px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleGenerateKeywords()}
                  disabled={aiLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition shrink-0 cursor-pointer flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
                  <span>{aiLoading ? 'Matching...' : 'Match'}</span>
                </button>
              </div>

              {/* Recommended Keywords Chips */}
              {aiResult && aiResult.keywords && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-600">શિફારસ કરેલ HR &amp; ATS કીવર્ડ્સ (ક્લિક કરીને ઉમેરો):</span>
                    <button
                      onClick={handleAddAllAiKeywords}
                      className="text-blue-600 font-extrabold hover:underline cursor-pointer"
                    >
                      + Add All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                    {aiResult.keywords.map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const updated = [...resumeData.technicalSkills];
                          updated[0].items = updated[0].items ? `${updated[0].items}, ${kw}` : kw;
                          setResumeData({ ...resumeData, technicalSkills: updated });
                        }}
                        className="px-2 py-0.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold shadow-2xs transition cursor-pointer"
                      >
                        + {kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs for Form Sections */}
            <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-slate-200 bg-slate-50 overflow-x-auto no-scrollbar shrink-0 text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'personal' ? 'bg-blue-600 text-white font-extrabold shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૧. અંગત વિગતો
              </button>
              <button
                onClick={() => setActiveTab('knowledge')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'knowledge' ? 'bg-blue-600 text-white font-extrabold shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૨. ડોમેન નોલેજ
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'experience' ? 'bg-blue-600 text-white font-extrabold shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૩. અનુભવ (Exp)
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'research' ? 'bg-blue-600 text-white font-extrabold shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૪. સંશોધન / પ્રોજેક્ટ
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'education' ? 'bg-blue-600 text-white font-extrabold shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૫. શિક્ષણ (Edu)
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'skills' ? 'bg-blue-600 text-white font-extrabold shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૬. સ્કિલ્સ &amp; સર્ટિ.
              </button>
              <button
                onClick={() => setActiveTab('objective')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === 'objective' ? 'bg-blue-600 text-white font-extrabold shadow-xs' : 'hover:bg-slate-200'
                }`}
              >
                ૭. ઓબ્જેક્ટિવ &amp; ભાષાઓ
              </button>
            </div>

            {/* Tab Form Content Area (Scrollable) */}
            <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs text-slate-800">
              
              {/* TAB 1: PERSONAL DETAILS */}
              {activeTab === 'personal' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">૧. અંગત વિગતો (Personal Details &amp; Summary)</h4>
                    <p className="text-[11px] text-slate-500">રેઝ્યૂમે હેડર અને પ્રોફેશનલ સમરી</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">પૂરું નામ (Full Name)</label>
                      <input
                        type="text"
                        value={resumeData.fullName}
                        onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                        placeholder="e.g. BHUSARA DHAVAL M."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">પ્રોફેશનલ ટાઈટલ (Job Title / Subtitle)</label>
                      <input
                        type="text"
                        value={resumeData.jobTitle}
                        onChange={(e) => setResumeData({ ...resumeData, jobTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Clinical Research Coordinator | Clinical Research | Pharmacology"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">મોબાઈલ નંબર (Phone)</label>
                      <input
                        type="text"
                        value={resumeData.mobile}
                        onChange={(e) => setResumeData({ ...resumeData, mobile: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. 9510442584"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ઈમેઇલ (Email Address)</label>
                      <input
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. dhavalbhusara0123@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">LinkedIn પ્રોફાઇલ URL</label>
                      <input
                        type="text"
                        value={resumeData.linkedIn}
                        onChange={(e) => setResumeData({ ...resumeData, linkedIn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. www.linkedin.com/in/dhaval-bhusara-66796230a"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">શહેર અને રાજ્ય (Location)</label>
                      <input
                        type="text"
                        value={resumeData.location}
                        onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Gandhinagar, Gujarat"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">પ્રોફાઈલ સારાંશ (Professional Summary)</label>
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

              {/* TAB 2: DOMAIN KNOWLEDGE & COMPETENCIES */}
              {activeTab === 'knowledge' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">૨. ડોમેન નોલેજ / મુખ્ય યોગ્યતાઓ (Core Knowledge)</h4>
                      <p className="text-[11px] text-slate-500">ઉદા. ICH-GCP E6(R3), NDCT Rules 2019, Noting &amp; Drafting વગેરે</p>
                    </div>
                    <button
                      onClick={addKnowledgePoint}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ નવું ઉમેરો</span>
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">વિભાગનું શીર્ષક (Section Title)</label>
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
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="pr-6">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">કીવર્ડ / સબ-હેડિંગ #{idx + 1}</label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const updated = [...resumeData.knowledgePoints];
                              updated[idx].label = e.target.value;
                              setResumeData({ ...resumeData, knowledgePoints: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white outline-none"
                            placeholder="e.g. ICH-GCP E6(R3)"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">વિગતવાર વર્ણન (Description)</label>
                          <textarea
                            rows={2}
                            value={item.desc}
                            onChange={(e) => {
                              const updated = [...resumeData.knowledgePoints];
                              updated[idx].desc = e.target.value;
                              setResumeData({ ...resumeData, knowledgePoints: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white outline-none"
                            placeholder="principles of Good Clinical Practice..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PROFESSIONAL EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">૩. વ્યવસાયિક અનુભવ (Professional Experience)</h4>
                      <p className="text-[11px] text-slate-500">હોદ્દો, સંસ્થા, સમયગાળો અને કામગીરીના બુલેટ પોઈન્ટ્સ</p>
                    </div>
                    <button
                      onClick={addExperience}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ નવી જોબ / અનુભવ ઉમેરો</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {resumeData.experiences.map((exp, expIdx) => (
                      <div key={expIdx} className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3 relative">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-extrabold text-blue-900 text-xs uppercase">
                            અનુભવ #{expIdx + 1}
                          </span>
                          <button
                            onClick={() => removeExperience(expIdx)}
                            className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center space-x-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>કાઢી નાખો (Delete)</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">હોદ્દો / શીર્ષક (Role Title)</label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].title = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                              placeholder="e.g. Clinical Research Coordinator — Phase II Clinical Trials"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">સંસ્થા / સબ-ડિટેઇલ્સ (Organization / Areas)</label>
                            <input
                              type="text"
                              value={exp.organization}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].organization = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="e.g. Therapeutic Areas: Rheumatoid Arthritis..."
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">સમયગાળો (Period / Duration)</label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].period = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="e.g. 2025 - Present અથવા 6 Months"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">સ્થળ (Location - વૈકલ્પિક)</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => {
                                const updated = [...resumeData.experiences];
                                updated[expIdx].location = e.target.value;
                                setResumeData({ ...resumeData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="e.g. Vadodara, Gujarat"
                            />
                          </div>
                        </div>

                        {/* Bullets for this experience */}
                        <div className="space-y-2 pt-2 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-600">કામગીરી અને સિદ્ધિઓ (Key Contributions):</span>
                            <button
                              onClick={() => addExperienceBullet(expIdx)}
                              className="text-blue-600 font-bold text-[11px] hover:underline cursor-pointer"
                            >
                              + પોઇન્ટ ઉમેરો (+ Add Bullet)
                            </button>
                          </div>
                          {exp.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2">
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

              {/* TAB 4: RESEARCH EXPERIENCE / PROJECTS */}
              {activeTab === 'research' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">૪. સંશોધન / પ્રોજેક્ટ્સ (Research Experience &amp; Projects)</h4>
                    <p className="text-[11px] text-slate-500">લેબોરેટરી રિસર્ચ, પ્રોજેક્ટ ટાઈટલ અને પદ્ધતિઓ</p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">હાલનું રિસર્ચ / મુખ્ય પ્રોજેક્ટ ટાઈટલ</label>
                    <input
                      type="text"
                      value={resumeData.research.currentTitle}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        research: { ...resumeData.research, currentTitle: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white outline-none"
                      placeholder="e.g. Current Research — Anti-urolithiatic and antioxidant potential..."
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 text-[11px]">રિસર્ચ પ્રવૃત્તિઓ (Activities):</span>
                      <button
                        onClick={() => {
                          const updated = { ...resumeData.research };
                          updated.bullets.push("New research finding or procedure conducted.");
                          setResumeData({ ...resumeData, research: updated });
                        }}
                        className="text-blue-600 font-bold text-[11px] hover:underline cursor-pointer"
                      >
                        + પોઇન્ટ ઉમેરો
                      </button>
                    </div>
                    {resumeData.research.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
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

                  <div className="pt-3 border-t border-slate-200">
                    <label className="block font-bold text-slate-700 mb-1">અગાઉનું રિસર્ચ / અતિરિક્ત પ્રોજેક્ટ્સ (Previous Research Header)</label>
                    <input
                      type="text"
                      value={resumeData.research.previousTitle}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        research: { ...resumeData.research, previousTitle: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                      placeholder="e.g. Previous Research:"
                    />
                  </div>

                  <div className="space-y-2">
                    {resumeData.research.previousBullets.map((pb, i) => (
                      <div key={i} className="flex items-center gap-2">
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
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">૫. શૈક્ષણિક લાયકાત (Education &amp; Qualifications)</h4>
                      <p className="text-[11px] text-slate-500">ડિગ્રી, યુનિવર્સિટી, પાસિંગ વર્ષ અને ટકાવારી</p>
                    </div>
                    <button
                      onClick={addEducation}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ નવી ડિગ્રી ઉમેરો</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                        <button
                          onClick={() => removeEducation(idx)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">ડિગ્રી / કોર્સ (Degree / Standard)</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].degree = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                              placeholder="e.g. M. Pharm (Pharmacology)"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">કોલેજ / યુનિવર્સિટી (Institution / Board)</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].institution = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="e.g. VBT–GTU અથવા Gujarat University"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">વર્ષ (Passing Year)</label>
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].year = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="e.g. Completed 2026"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">ટકાવારી / વિગતો (Grade / Percentage)</label>
                            <input
                              type="text"
                              value={edu.grade}
                              onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[idx].grade = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="e.g. 74.5% First Class"
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
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">૬. સર્ટિફિકેટ્સ &amp; ટેકનિકલ સ્કિલ્સ (Certifications &amp; Skills)</h4>
                    <p className="text-[11px] text-slate-500">ઇન્ડસ્ટ્રિયલ ટ્રેનિંગ સર્ટિફિકેટ્સ અને કેટેગરી-વાઇઝ સ્કિલ્સ</p>
                  </div>

                  {/* Certifications Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">સર્ટિફિકેટ્સ અને ટ્રેનિંગ (Certifications):</span>
                      <button
                        onClick={addCertification}
                        className="text-blue-600 font-bold text-xs hover:underline cursor-pointer"
                      >
                        + સર્ટિફિકેટ ઉમેરો
                      </button>
                    </div>
                    {resumeData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => {
                            const updated = [...resumeData.certifications];
                            updated[idx] = e.target.value;
                            setResumeData({ ...resumeData, certifications: updated });
                          }}
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
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
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">કેટેગરી-વાઇઝ ટેકનિકલ સ્કિલ્સ (Technical Skills):</span>
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            technicalSkills: [...resumeData.technicalSkills, { category: "New Skill Group", items: "Skill 1, Skill 2" }]
                          });
                        }}
                        className="text-blue-600 font-bold text-xs hover:underline cursor-pointer"
                      >
                        + નવી કેટેગરી ઉમેરો
                      </button>
                    </div>

                    {resumeData.technicalSkills.map((sk, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
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
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">કેટેગરી (Category)</label>
                            <input
                              type="text"
                              value={sk.category}
                              onChange={(e) => {
                                const updated = [...resumeData.technicalSkills];
                                updated[idx].category = e.target.value;
                                setResumeData({ ...resumeData, technicalSkills: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold bg-white outline-none"
                              placeholder="e.g. Clinical Research"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">સ્કિલ્સ / ટૂલ્સ (Items)</label>
                            <input
                              type="text"
                              value={sk.items}
                              onChange={(e) => {
                                const updated = [...resumeData.technicalSkills];
                                updated[idx].items = e.target.value;
                                setResumeData({ ...resumeData, technicalSkills: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white outline-none"
                              placeholder="e.g. GCP, NDCT Rules, AutoDock Vina, MS Excel"
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
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-slate-900">૭. કરિયર ઉદ્દેશ્ય &amp; ભાષાઓ (Objective &amp; Languages)</h4>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ભાષાઓ (Languages Known)</label>
                    <input
                      type="text"
                      value={resumeData.languages}
                      onChange={(e) => setResumeData({ ...resumeData, languages: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white outline-none font-semibold"
                      placeholder="e.g. Gujarati | Hindi | English"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">કરિયર ઉદ્દેશ્ય (Career Objective)</label>
                    <textarea
                      rows={4}
                      value={resumeData.careerObjective}
                      onChange={(e) => setResumeData({ ...resumeData, careerObjective: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white outline-none leading-relaxed"
                      placeholder="તમારા લાંબા ગાળાના પ્રોફેશનલ લક્ષ્ય વિશે જણાવો..."
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Form Action Bar */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] font-bold text-slate-500">
                💾 રીઅલ-ટાઇમ ઓટો-સેવ એક્ટિવ છે
              </span>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-[#0B1E33] hover:bg-slate-900 text-white rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download / Print PDF</span>
              </button>
            </div>

          </div>


          {/* ========================================================= */}
          {/* RIGHT SIDE: Real-time ATS Preview (Print Ready) */}
          {/* ========================================================= */}
          <div className={`w-full lg:w-1/2 flex flex-col bg-slate-200 overflow-y-auto p-4 sm:p-6 lg:p-8 items-center ${
            viewMode === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}>
            
            {/* Live Preview Container Card (A4 Sheet Ratio) */}
            <div 
              id="printable-resume"
              className="bg-white text-slate-900 w-full max-w-[794px] min-h-[1123px] p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-300 space-y-4 font-sans leading-normal selection:bg-blue-100"
              style={{ fontFamily: "Calibri, Arial, sans-serif" }}
            >
              
              {/* Header: Name, Subtitle, Contact */}
              <div className="text-center space-y-1 pb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E33] tracking-wide uppercase">
                  {resumeData.fullName || "BHUSARA DHAVAL M."}
                </h1>
                
                {resumeData.jobTitle && (
                  <div className="text-xs sm:text-sm font-semibold text-slate-700">
                    {resumeData.jobTitle}
                  </div>
                )}

                <div className="text-[11px] sm:text-xs text-slate-600 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 pt-0.5">
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
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    PROFESSIONAL SUMMARY
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-800 text-justify leading-relaxed">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* 2. CLINICAL RESEARCH KNOWLEDGE / CORE COMPETENCIES */}
              {resumeData.knowledgePoints && resumeData.knowledgePoints.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    {resumeData.knowledgeTitle || "CLINICAL RESEARCH KNOWLEDGE"}
                  </div>
                  <ul className="space-y-1 text-[11px] sm:text-xs text-slate-800">
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
                <div className="space-y-2.5">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    PROFESSIONAL EXPERIENCE
                  </div>
                  {resumeData.experiences.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <div className="text-xs sm:text-sm font-bold text-slate-900">
                          {exp.title}
                        </div>
                        {exp.period && (
                          <div className="text-[11px] font-semibold text-slate-600">
                            {exp.period}
                          </div>
                        )}
                      </div>

                      {exp.organization && (
                        <div className="text-[11px] italic text-slate-600 font-medium">
                          {exp.organization}
                        </div>
                      )}

                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="space-y-0.5 text-[11px] sm:text-xs text-slate-800 pt-0.5">
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
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    RESEARCH EXPERIENCE
                  </div>
                  <div className="space-y-1 text-[11px] sm:text-xs text-slate-800">
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
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    EDUCATION
                  </div>
                  <ul className="space-y-0.5 text-[11px] sm:text-xs text-slate-800">
                    {resumeData.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start justify-between">
                        <div className="flex items-start">
                          <span className="font-bold mr-1.5 shrink-0">•</span>
                          <span>
                            <strong>{edu.degree}</strong>, {edu.institution} {edu.grade ? `| ${edu.grade}` : ''}
                          </span>
                        </div>
                        {edu.year && (
                          <span className="text-[11px] font-semibold text-slate-600 shrink-0 ml-2">
                            | {edu.year}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 6. CERTIFICATIONS & INDUSTRIAL TRAINING */}
              {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    CERTIFICATIONS &amp; INDUSTRIAL TRAINING
                  </div>
                  <ul className="space-y-0.5 text-[11px] sm:text-xs text-slate-800">
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
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    TECHNICAL &amp; RESEARCH SKILLS
                  </div>
                  <ul className="space-y-0.5 text-[11px] sm:text-xs text-slate-800">
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
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    LANGUAGES
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-800">
                    {resumeData.languages}
                  </p>
                </div>
              )}

              {/* 9. CAREER OBJECTIVE */}
              {resumeData.careerObjective && (
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-black text-[#0F2942] uppercase tracking-wider border-b-2 border-[#0F2942] pb-0.5">
                    CAREER OBJECTIVE
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-800 text-justify leading-relaxed">
                    {resumeData.careerObjective}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
