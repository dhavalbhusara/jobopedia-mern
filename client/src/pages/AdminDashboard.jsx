import React, { useState, useEffect } from 'react';
import { 
  Lock, PlusCircle, Users, Code, CloudUpload, ArrowLeft, 
  Download, Briefcase, Landmark, Building2, GraduationCap, 
  CheckCircle2, Bell, Send, Smartphone, Monitor 
} from 'lucide-react';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';

export default function AdminDashboard({ setCurrentView, user }) {
  const [activeTab, setActiveTab] = useState('hr');
  const [candidates, setCandidates] = useState([]);
  const [successToast, setSuccessToast] = useState('');

  // Push Notification Broadcast State
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    category: 'govt',
    targetQualification: 'All',
    targetState: 'All India',
    url: 'https://jobopedia.in'
  });
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  // Security Guard: Only users with role === 'ADMIN' can view the control center
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Administrator Access Required</h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          The Admin Control Center is strictly confidential and restricted. Please login using an Administrator Account to post jobs, upload MCQs, and access candidate records.
        </p>
        <div className="pt-3">
          <button 
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
          >
            ← Return to Home Page
          </button>
        </div>
      </div>
    );
  }

  const [jobsJson, setJobsJson] = useState(`[
  {
    "title": "Assistant Section Officer (ASO) 2026",
    "department": "Ministry of External Affairs (MEA)",
    "category": "govt",
    "sector": "GOVERNMENT",
    "state": "Central",
    "qualification": "Graduate",
    "salary": "₹52,000 - ₹1,40,000 / month",
    "vacancies": 450,
    "lastDate": "2026-11-28",
    "dayNumber": 3,
    "applyUrl": "https://jobopedia.in",
    "notificationUrl": "https://mea.gov.in/official-notification.pdf",
    "description": "Foreign posting allowance, diplomatic consular duties, and administrative coordination in Indian embassies abroad."
  }
]`);

  const [mcqJson, setMcqJson] = useState(`[
  {
    "id": 101,
    "question": "Which schedule of the Indian Constitution contains provisions regarding the allocation of seats in Rajya Sabha?",
    "options": ["Fourth Schedule", "Third Schedule", "Seventh Schedule", "Eighth Schedule"],
    "correctIndex": 0,
    "explanation": "The Fourth Schedule specifies the allocation of seats in the Council of States (Rajya Sabha)."
  }
]`);

  // Rich Job Post Form State
  const [singleJob, setSingleJob] = useState({
    title: '',
    department: '',
    jobType: 'GOVERNMENT', // GOVERNMENT, PRIVATE, INTERNSHIP, BANKING_PSU, HEALTHCARE, EDUCATION
    category: 'govt',
    employmentType: 'Full Time (Regular)',
    experienceLevel: 'Fresher (0 - 1 Year)',
    state: 'Central',
    salary: '',
    qualification: 'Graduate',
    vacancies: 50,
    ageLimit: '18 - 35 Years',
    lastDate: '2026-12-31',
    applyUrl: 'https://jobopedia.in',
    notificationUrl: '',
    description: ''
  });

  // Govt Jobs & MCQs Manager State
  const [govtJobs, setGovtJobs] = useState([]);
  const [mockTestsList, setMockTestsList] = useState([]);
  const [loadingGovtJobs, setLoadingGovtJobs] = useState(false);
  const [selectedJobForMcq, setSelectedJobForMcq] = useState(null);
  const [customMcqJson, setCustomMcqJson] = useState(`[
  {
    "question": "Which article of the Indian Constitution provides for the Election Commission of India?",
    "options": ["Article 324", "Article 280", "Article 356", "Article 370"],
    "correctIndex": 0,
    "explanation": "Article 324 vests superintendence, direction, and control of elections in an Election Commission."
  },
  {
    "question": "Who is known as the guardian of the Public Purse in India?",
    "options": ["Comptroller and Auditor General (CAG)", "Finance Minister", "Prime Minister", "RBI Governor"],
    "correctIndex": 0,
    "explanation": "The CAG controls the entire financial system of the country at both the Centre and State levels."
  }
]`);

  const fetchGovtJobsAndTests = () => {
    setLoadingGovtJobs(true);
    Promise.all([
      fetch('/api/jobs?category=govt').then(r => r.json()),
      fetch('/api/mock-tests').then(r => r.json())
    ]).then(([jobsData, testsData]) => {
      if (jobsData.success && Array.isArray(jobsData.jobs)) {
        setGovtJobs(jobsData.jobs);
      }
      if (testsData.success && Array.isArray(testsData.tests)) {
        setMockTestsList(testsData.tests);
      }
    }).catch(err => console.error("Error loading admin jobs & tests:", err))
      .finally(() => setLoadingGovtJobs(false));
  };

  useEffect(() => {
    fetch('/api/admin/candidates')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCandidates(data.candidates);
        }
      })
      .catch(() => {});

    fetchGovtJobsAndTests();
  }, []);

  const handleUploadJobMcqs = async () => {
    if (!selectedJobForMcq) return;
    try {
      const parsed = JSON.parse(customMcqJson);
      const res = await fetch(`/api/admin/jobs/${selectedJobForMcq._id || selectedJobForMcq.id}/mcqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: selectedJobForMcq.department || selectedJobForMcq.title,
          title: `${selectedJobForMcq.title} - Practice MCQs`,
          durationMinutes: 15,
          questions: parsed
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessToast(data.message || 'MCQs successfully linked to this Job!');
        setSelectedJobForMcq(null);
        fetchGovtJobsAndTests();
        setTimeout(() => setSuccessToast(''), 4000);
      } else {
        alert(data.error || 'Failed to upload MCQs');
      }
    } catch (err) {
      alert('Invalid JSON syntax: ' + err.message);
    }
  };

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.message) {
      alert("Please enter title and message.");
      return;
    }
    setBroadcastLoading(true);
    try {
      const res = await fetch('/api/notifications/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(broadcastForm)
      });
      const data = await res.json();
      if (data.success) {
        setSuccessToast(`📢 ${data.message}`);
        setBroadcastForm({
          title: '',
          message: '',
          category: 'govt',
          targetQualification: 'All',
          targetState: 'All India',
          url: 'https://jobopedia.in'
        });
        setTimeout(() => setSuccessToast(''), 6000);
      } else {
        alert(data.error || 'Failed to broadcast notification');
      }
    } catch (err) {
      alert('Broadcast Error: ' + err.message);
    } finally {
      setBroadcastLoading(false);
    }
  };

  const handleBulkJobs = async () => {
    try {
      const parsed = JSON.parse(jobsJson);
      const res = await fetch('/api/admin/jobs/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      const data = await res.json();
      setSuccessToast(data.message || 'Jobs successfully uploaded to MongoDB Atlas!');
      setTimeout(() => setSuccessToast(''), 4000);
    } catch (e) {
      alert("Invalid JSON format: " + e.message);
    }
  };

  const handleBulkMcqs = async () => {
    try {
      const parsed = JSON.parse(mcqJson);
      const res = await fetch('/api/admin/mock-tests/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: 'gpsc-mock-' + Date.now(),
          exam: 'Competitive Exam Mock Test',
          title: 'All India Practice Test Series',
          questions: parsed
        })
      });
      const data = await res.json();
      setSuccessToast(data.message || 'MCQs successfully uploaded to MongoDB Atlas!');
      setTimeout(() => setSuccessToast(''), 4000);
    } catch (e) {
      alert("Invalid JSON format: " + e.message);
    }
  };

  const handleSingleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      // Synchronize category with jobType
      const cat = singleJob.jobType === 'GOVERNMENT' || singleJob.jobType === 'BANKING_PSU' ? 'govt' : (singleJob.jobType === 'INTERNSHIP' ? 'internship' : 'private');
      const payload = {
        ...singleJob,
        category: cat,
        sector: singleJob.jobType === 'INTERNSHIP' ? 'INTERNSHIP' : (cat === 'govt' ? 'GOVERNMENT' : 'PRIVATE')
      };

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      setSuccessToast(`🎉 Success: "${singleJob.title}" has been published to MongoDB Atlas!`);
      setTimeout(() => setSuccessToast(''), 4000);

      // Reset form
      setSingleJob({
        title: '',
        department: '',
        jobType: 'GOVERNMENT',
        category: 'govt',
        employmentType: 'Full Time (Regular)',
        experienceLevel: 'Fresher (0 - 1 Year)',
        state: 'Central',
        salary: '',
        qualification: 'Graduate',
        vacancies: 50,
        ageLimit: '18 - 35 Years',
        lastDate: '2026-12-31',
        applyUrl: 'https://jobopedia.in',
        notificationUrl: '',
        description: ''
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const exportCsv = () => {
    let csv = "Name,Mobile,Email,State,Qualification,TargetJob,ResumeTitle,Status\n";
    candidates.forEach(c => {
      csv += `"${c.name}","${c.mobile}","${c.email}","${c.state}","${c.qualification}","${c.targetJob}","${c.resumeTitle}","${c.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Jobopedia_Candidate_Applications.csv';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 shadow-xl">
        <div>
          <button 
            onClick={() => setCurrentView('home')}
            className="text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950">
              Admin Access Active
            </span>
            <span className="text-xs text-slate-400">Logged in as: <strong>{user?.fullName || user?.email}</strong></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Jobopedia Master Admin Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            MERN Stack Connected to MongoDB Atlas. Publish Jobs, MCQs, and track candidate applications.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center space-x-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-300">Live MongoDB Status</div>
            <div className="text-lg font-black text-emerald-300 flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Atlas Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        
        <button
          onClick={() => setActiveTab('hr')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'hr' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>JOB POSTING FORM (NEW VACANCY)</span>
        </button>

        <button
          onClick={() => setActiveTab('dhaval')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'dhaval' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>⚡</span>
          <span>BULK JSON UPLOAD (JOBS &amp; MCQS)</span>
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'candidates' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>CANDIDATE APPLICATIONS ({candidates.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('govt-jobs'); fetchGovtJobsAndTests(); }}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'govt-jobs' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>🏛️ GOVT JOBS &amp; MCQS STATUS ({govtJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'broadcast' ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>📢 BROADCAST PUSH NOTIFICATION</span>
        </button>

      </div>

      {/* TAB 1: ADVANCED SINGLE JOB POSTING FORM WITH TYPE SELECTOR */}
      {activeTab === 'hr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-900">
              Publish New Vacancy or Internship (Job Post Form)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Select the Job Post Type below. This automatically categorizes the vacancy into Govt Jobs, Private &amp; MNCs, or Internships.
            </p>
          </div>

          <form onSubmit={handleSingleJobSubmit} className="space-y-6">
            
            {/* Visual Job Post Type Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                1. Select Job Post Type (ભરતીનો પ્રકાર પસંદ કરો) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { id: 'GOVERNMENT', label: 'Government (Sarkari)', icon: '🏛️', desc: 'UPSC, GPSC, GSSSB, Police' },
                  { id: 'PRIVATE', label: 'Private & MNC', icon: '🏢', desc: 'TCS, Infosys, Sun Pharma' },
                  { id: 'INTERNSHIP', label: 'Paid Internship', icon: '🎓', desc: 'Students & Freshers' },
                  { id: 'BANKING_PSU', label: 'Banking & PSU', icon: '🏦', desc: 'SBI, IBPS, ONGC, IOCL' },
                  { id: 'HEALTHCARE', label: 'Healthcare & Medical', icon: '💊', desc: 'Doctors, Staff Nurse' },
                  { id: 'EDUCATION', label: 'Teaching / Faculty', icon: '📚', desc: 'TET, TAT, Professor' }
                ].map(item => {
                  const isSelected = singleJob.jobType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSingleJob({ ...singleJob, jobType: item.id })}
                      className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div>
                        <div className="text-xs font-black text-slate-900">{item.label}</div>
                        <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Designation / Post Title *</label>
                <input
                  type="text"
                  value={singleJob.title}
                  onChange={(e) => setSingleJob({ ...singleJob, title: e.target.value })}
                  placeholder="e.g. Deputy Collector / Software Engineer / Intern"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department / Company / Authority *</label>
                <input
                  type="text"
                  value={singleJob.department}
                  onChange={(e) => setSingleJob({ ...singleJob, department: e.target.value })}
                  placeholder="e.g. GPSC / Tata Consultancy Services (TCS)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type *</label>
                <select
                  value={singleJob.employmentType}
                  onChange={(e) => setSingleJob({ ...singleJob, employmentType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-semibold"
                >
                  <option value="Full Time (Regular)">Full Time (Permanent / Regular)</option>
                  <option value="Fixed Pay (5-Year Govt Scheme)">Fixed Pay (5-Year Govt Scheme)</option>
                  <option value="Paid Internship (Stipend Based)">Paid Internship (Stipend Based)</option>
                  <option value="Contractual / Trainee">Contractual / Trainee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location / State *</label>
                <select
                  value={singleJob.state}
                  onChange={(e) => setSingleJob({ ...singleJob, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-semibold"
                >
                  <option value="Central">Central (All India)</option>
                  <option value="Gujarat">Gujarat (Ahmedabad, Gandhinagar, Surat)</option>
                  <option value="Maharashtra">Maharashtra (Mumbai, Pune)</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Karnataka">Karnataka (Bengaluru)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Salary / Stipend *</label>
                <input
                  type="text"
                  value={singleJob.salary}
                  onChange={(e) => setSingleJob({ ...singleJob, salary: e.target.value })}
                  placeholder="e.g. ₹56,100 - ₹1,77,500 / month or ₹20,000 Stipend"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Qualification *</label>
                <input
                  type="text"
                  value={singleJob.qualification}
                  onChange={(e) => setSingleJob({ ...singleJob, qualification: e.target.value })}
                  placeholder="e.g. Any Graduate / B.Tech / 12th Pass"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Vacancies / Openings *</label>
                <input
                  type="number"
                  value={singleJob.vacancies}
                  onChange={(e) => setSingleJob({ ...singleJob, vacancies: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age Limit</label>
                <input
                  type="text"
                  value={singleJob.ageLimit}
                  onChange={(e) => setSingleJob({ ...singleJob, ageLimit: e.target.value })}
                  placeholder="e.g. 18 - 35 Years (Relaxation as per rules)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Last Date to Apply (Deadline) *</label>
                <input
                  type="date"
                  value={singleJob.lastDate}
                  onChange={(e) => setSingleJob({ ...singleJob, lastDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct Official Online Apply Link *</label>
                <input
                  type="url"
                  value={singleJob.applyUrl}
                  onChange={(e) => setSingleJob({ ...singleJob, applyUrl: e.target.value })}
                  placeholder="https://ojas.gujarat.gov.in or official portal URL"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Notification PDF Link</label>
                <input
                  type="url"
                  value={singleJob.notificationUrl}
                  onChange={(e) => setSingleJob({ ...singleJob, notificationUrl: e.target.value })}
                  placeholder="https://.../advt_notification.pdf"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Job Description &amp; Scope *</label>
              <textarea
                value={singleJob.description}
                onChange={(e) => setSingleJob({ ...singleJob, description: e.target.value })}
                rows="4"
                placeholder="Mention duties, selection stages, physical criteria, syllabus, or instructions for candidates..."
                className="w-full p-3.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Data will be instantly synced to MongoDB Atlas and published to live website.
              </span>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Job to Live Database</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TAB 2: BULK JSON UPLOADER */}
      {activeTab === 'dhaval' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bulk Jobs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                <span>📁</span>
                <span>Bulk Jobs JSON Uploader</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Upload multiple Sarkari &amp; Corporate vacancies to MongoDB Atlas in 1-click.</p>
            </div>

            <textarea
              value={jobsJson}
              onChange={(e) => setJobsJson(e.target.value)}
              rows="12"
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
            />

            <button
              onClick={handleBulkJobs}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <CloudUpload className="w-4 h-4" />
              <span>Publish Bulk Jobs to MongoDB Atlas</span>
            </button>
          </div>

          {/* Bulk MCQs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                <span>📝</span>
                <span>Bulk MCQs &amp; Mock Tests Uploader</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Add practice questions with solutions directly into MongoDB Mock Test collection.</p>
            </div>

            <textarea
              value={mcqJson}
              onChange={(e) => setMcqJson(e.target.value)}
              rows="12"
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
            />

            <button
              onClick={handleBulkMcqs}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <CloudUpload className="w-4 h-4" />
              <span>Publish MCQs to Mock Tests Engine</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 3: CANDIDATE APPLICATIONS */}
      {activeTab === 'candidates' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Candidate ATS Applications</h2>
              <p className="text-xs text-slate-500">Live tracker of candidates who generated resumes or applied through the portal.</p>
            </div>
            <button
              onClick={exportCsv}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-black border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">State &amp; Qual</th>
                  <th className="py-3 px-4">Applied Role</th>
                  <th className="py-3 px-4">ATS Resume</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      No candidate applications recorded yet.
                    </td>
                  </tr>
                ) : (
                  candidates.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                      <td className="py-3 px-4 text-slate-600">{c.mobile}<br/>{c.email}</td>
                      <td className="py-3 px-4 text-slate-600">{c.state}<br/>{c.qualification}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">{c.targetJob}</td>
                      <td className="py-3 px-4 text-slate-500">{c.resumeTitle}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: GOVT JOBS & MCQS STATUS & UPLOAD MANAGER */}
      {activeTab === 'govt-jobs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Uploaded Government Jobs &amp; MCQ Practice Status
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Review all live Government Vacancies on Jobopedia. Check if practice MCQs are available, and upload test questions via JSON directly for any job.
              </p>
            </div>
            <button
              onClick={fetchGovtJobsAndTests}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>Refresh Status</span>
            </button>
          </div>

          {loadingGovtJobs ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400">
              Loading Government jobs &amp; MCQ tests from database...
            </div>
          ) : govtJobs.length === 0 ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400">
              No Government jobs found. Use Tab 1 or Tab 2 to upload new vacancies!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-black border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Government Vacancy</th>
                    <th className="py-3 px-4">Department &amp; State</th>
                    <th className="py-3 px-4">Vacancies &amp; Salary</th>
                    <th className="py-3 px-4">Last Date</th>
                    <th className="py-3 px-4">MCQ Practice Test</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {govtJobs.map((job) => {
                    const jobId = job._id || job.id;
                    // Check if test exists for this job
                    const matchingTest = mockTestsList.find(t => 
                      t.jobId === jobId || 
                      (t.exam && job.department && t.exam.toLowerCase().includes(job.department.toLowerCase())) ||
                      (t.title && job.title && t.title.toLowerCase().includes(job.title.toLowerCase()))
                    );
                    const hasMcq = Boolean(job.hasMcqs || matchingTest);
                    const mcqCount = matchingTest ? matchingTest.questions?.length : (job.hasMcqs ? 20 : 0);

                    return (
                      <tr key={jobId} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <div className="font-extrabold text-slate-900 line-clamp-1">{job.title}</div>
                          <div className="text-[10px] text-slate-400 font-medium">ID: {jobId}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-700">{job.department}</div>
                          <div className="text-[10px] text-slate-500">📍 {job.state || 'Central'}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-emerald-700">{job.vacancies} Posts</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{job.salary}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-rose-600">{job.lastDate}</span>
                        </td>
                        <td className="py-3 px-4">
                          {hasMcq ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              <span>Available ({mcqCount} MCQs)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800 border border-rose-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                              <span>Not Available</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedJobForMcq(job)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
                              hasMcq
                                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            {hasMcq ? '+ Add More MCQs' : '⚡ Upload MCQs (JSON)'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: BROADCAST PUSH NOTIFICATION (PHONE & PC TARGETING) */}
      {activeTab === 'broadcast' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                  <Bell className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Send Targeted Push Notification (Phone &amp; PC)
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Deliver real-time job alerts directly to candidates' mobile phones and computers filtered by their exact State and Qualification degrees.
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl text-[11px] font-bold text-slate-600">
              <span className="flex items-center space-x-1"><Smartphone className="w-3.5 h-3.5 text-blue-600" /><span>Mobile</span></span>
              <span>•</span>
              <span className="flex items-center space-x-1"><Monitor className="w-3.5 h-3.5 text-emerald-600" /><span>Desktop PC</span></span>
            </div>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alert Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ⚡ Gujarat Police Constable 12,472 Vacancies Live"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alert Category
                </label>
                <select
                  value={broadcastForm.category}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, category: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="govt">🏛️ Government Job Alert</option>
                  <option value="private">🏢 Private / MNC Vacancy</option>
                  <option value="internship">🎓 Fresher / Student Internship</option>
                  <option value="mock-test">📝 Mock Test / CBT Exam</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notification Message Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. OJAS portal registration is now active. Salary ₹26,000/mo. 12th pass eligible. Apply before 15th December."
                value={broadcastForm.message}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                className="w-full p-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            {/* Targeting Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Target State / Region
                </label>
                <select
                  value={broadcastForm.targetState}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, targetState: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="All India">🇮🇳 All India / Central (Pan-India)</option>
                  {ALL_INDIAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Only candidates from this state receive alert</span>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Target Qualification / Degree
                </label>
                <select
                  value={broadcastForm.targetQualification}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, targetQualification: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="All">🎓 All Qualifications (Everyone)</option>
                  {ALL_QUALIFICATIONS.map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Matched with user education profile</span>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Official Apply / Notification URL
                </label>
                <input
                  type="url"
                  placeholder="https://jobopedia.in"
                  value={broadcastForm.url}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, url: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Direct link opened on clicking alert</span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={broadcastLoading}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-2xl text-xs font-black shadow-lg transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{broadcastLoading ? 'Broadcasting Alert...' : '🚀 Send Notification to Phone & PC Users'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MCQ JSON UPLOAD MODAL FOR SPECIFIC GOVT JOB */}
      {selectedJobForMcq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Upload Practice MCQs (JSON)
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {selectedJobForMcq.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedJobForMcq.department} • Job ID: {selectedJobForMcq._id || selectedJobForMcq.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobForMcq(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Paste JSON Array of Questions (or edit sample below):
              </label>
              <textarea
                rows={10}
                value={customMcqJson}
                onChange={(e) => setCustomMcqJson(e.target.value)}
                className="w-full p-3 text-xs font-mono bg-slate-900 text-emerald-300 rounded-2xl border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
              <p className="text-[11px] text-slate-500">
                Format: Array of objects with `question`, `options` (4 strings), `correctIndex` (0 to 3), and `explanation`.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedJobForMcq(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUploadJobMcqs}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
              >
                Save MCQs for this Job
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
