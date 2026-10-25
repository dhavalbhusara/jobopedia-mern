import React, { useState, useEffect } from 'react';
import { 
  Lock, PlusCircle, Users, Code, CloudUpload, ArrowLeft, 
  Download, Briefcase, Landmark, Building2, GraduationCap, 
  CheckCircle2, FileText, ExternalLink, Award, Sparkles, RefreshCw, AlertCircle
} from 'lucide-react';
import { ALL_STATES, QUALIFICATION_CATEGORIES } from '../constants/masterData';

export default function AdminDashboard({ setCurrentView, user }) {
  const [activeTab, setActiveTab] = useState('govt-list'); // 'govt-list', 'hr', 'dhaval', 'candidates'
  const [candidates, setCandidates] = useState([]);
  const [govtJobsWithMcqs, setGovtJobsWithMcqs] = useState([]);
  const [loadingGovtJobs, setLoadingGovtJobs] = useState(true);
  const [successToast, setSuccessToast] = useState('');
  const [selectedExamForMcq, setSelectedExamForMcq] = useState('UPSC Civil Services 2026');

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

  const fetchGovtJobs = () => {
    setLoadingGovtJobs(true);
    fetch('/api/admin/govt-jobs-mcqs')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.jobs) {
          setGovtJobsWithMcqs(data.jobs);
        }
        setLoadingGovtJobs(false);
      })
      .catch(() => setLoadingGovtJobs(false));
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

    fetchGovtJobs();
  }, []);

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
      fetchGovtJobs();
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
          testId: 'test-' + Date.now(),
          exam: selectedExamForMcq,
          title: `${selectedExamForMcq} CBT Mock Practice Series`,
          questions: parsed
        })
      });
      const data = await res.json();
      setSuccessToast(data.message || 'MCQs successfully uploaded to MongoDB Atlas!');
      fetchGovtJobs();
      setTimeout(() => setSuccessToast(''), 4000);
    } catch (e) {
      alert("Invalid JSON format: " + e.message);
    }
  };

  const openMcqUploaderForJob = (job) => {
    setSelectedExamForMcq(job.title || job.department);
    setActiveTab('dhaval');
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
          onClick={() => setActiveTab('govt-list')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'govt-list' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>🏛️ GOVT JOBS &amp; MCQS STATUS ({govtJobsWithMcqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hr')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'hr' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>JOB POSTING FORM</span>
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

      </div>

      {/* TAB 0: UPLOADED GOVT JOBS & MCQS AVAILABILITY STATUS */}
      {activeTab === 'govt-list' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Live MongoDB Atlas Government Database
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Uploaded Government Jobs &amp; MCQ Practice Status
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Live listing of all government recruitment drives. Check whether CBT Mock Tests are attached and upload MCQs via JSON.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={fetchGovtJobs}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Live Jobs</span>
              </button>
            </div>
          </div>

          {loadingGovtJobs ? (
            <div className="py-12 text-center text-xs font-bold text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
              Loading live jobs from MongoDB Atlas...
            </div>
          ) : govtJobsWithMcqs.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              No government jobs found in MongoDB. Upload jobs using the form or JSON uploader.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 font-extrabold uppercase text-[11px] text-slate-500">
                  <tr>
                    <th className="p-4">Recruitment Job Title &amp; Department</th>
                    <th className="p-4">Salary / Pay Scale</th>
                    <th className="p-4">Vacancies</th>
                    <th className="p-4">State</th>
                    <th className="p-4">MCQ Practice Availability</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {govtJobsWithMcqs.map((job) => (
                    <tr key={job._id || job.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-bold text-slate-900 max-w-xs">
                        <div className="text-sm font-extrabold text-slate-900 line-clamp-1">{job.title}</div>
                        <div className="text-[11px] text-slate-500 font-semibold">{job.department}</div>
                      </td>
                      <td className="p-4 font-bold text-emerald-700 whitespace-nowrap">
                        {job.salary}
                      </td>
                      <td className="p-4 font-bold text-slate-800 whitespace-nowrap">
                        {job.vacancies} Posts
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                          {job.state || 'All India'}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {job.hasMcq ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-black text-[10px] flex items-center space-x-1 w-fit">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>✅ Live MCQs ({job.mcqCount} Questions)</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-black text-[10px] flex items-center space-x-1 w-fit">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            <span>❌ No MCQs Yet</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openMcqUploaderForJob(job)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer shadow-2xs"
                            title="Upload MCQs for this exam via JSON"
                          >
                            <span>➕ Upload MCQs</span>
                          </button>

                          <a
                            href={job.applyUrl || 'https://ojas.gujarat.gov.in'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer"
                            title="Open Official Portal"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Official</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

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
                  {ALL_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
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
                <span>Bulk MCQs &amp; Mock Tests JSON Uploader</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Add practice questions with explanations directly into MongoDB Mock Test collection.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Examination / Recruitment Name *</label>
              <input
                type="text"
                value={selectedExamForMcq}
                onChange={(e) => setSelectedExamForMcq(e.target.value)}
                placeholder="e.g. UPSC Civil Services, SSC CGL, GSSSB CCE, Gujarat Police"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="font-bold text-slate-500">Insert Template:</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedExamForMcq('UPSC Civil Services 2026');
                  setMcqJson(`[
  {
    "id": 1,
    "question": "Which Constitutional Article guarantees Equality Before Law and Equal Protection of the Laws?",
    "options": ["Article 14", "Article 19", "Article 21", "Article 32"],
    "correctIndex": 0,
    "explanation": "Article 14 of the Constitution guarantees equality before law and equal protection of the laws to all persons within India."
  }
]`);
                }}
                className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold hover:bg-blue-100 cursor-pointer"
              >
                UPSC Template
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedExamForMcq('SSC CGL General Intelligence');
                  setMcqJson(`[
  {
    "id": 1,
    "question": "Select the related word from the given alternatives: Ocean : Water :: Glacier : ?",
    "options": ["Mountain", "Ice", "Cave", "River"],
    "correctIndex": 1,
    "explanation": "As Ocean consists of Water, similarly Glacier consists of Ice."
  }
]`);
                }}
                className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold hover:bg-amber-100 cursor-pointer"
              >
                SSC Template
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedExamForMcq('GSSSB CCE General Studies');
                  setMcqJson(`[
  {
    "id": 1,
    "question": "ગુજરાતના કયા જિલ્લામાં મોઢેરાનું પ્રખ્યાત સૂર્યમંદિર આવેલું છે?",
    "options": ["મહેસાણા", "પાટણ", "અમદાવાદ", "સાબરકાંઠા"],
    "correctIndex": 0,
    "explanation": "મોઢેરાનું સૂર્યમંદિર ગુજરાતના મહેસાણા જિલ્લામાં પુષ્પાવતી નદીના કિનારે આવેલું છે."
  }
]`);
                }}
                className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold hover:bg-emerald-100 cursor-pointer"
              >
                GSSSB Template
              </button>
            </div>

            <textarea
              value={mcqJson}
              onChange={(e) => setMcqJson(e.target.value)}
              rows="10"
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

    </div>
  );
}
