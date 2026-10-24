import React, { useState, useEffect } from 'react';
import { Lock, PlusCircle, Users, Code, CloudUpload, ArrowLeft, Download } from 'lucide-react';

export default function AdminDashboard({ setCurrentView, user }) {
  const [activeTab, setActiveTab] = useState('dhaval');

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
  const [candidates, setCandidates] = useState([]);
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
  },
  {
    "title": "Lead Cloud Infrastructure Architect",
    "department": "Wipro Digital Solutions",
    "category": "private",
    "sector": "PRIVATE",
    "state": "Maharashtra",
    "qualification": "B.Tech / MCA",
    "salary": "₹16,00,000 - ₹24,00,000 / year",
    "vacancies": 12,
    "lastDate": "2026-12-05",
    "dayNumber": 4,
    "description": "Designing high-availability Kubernetes clusters, cloud security policies, and DevOps pipelines for banking clients."
  }
]`);

  const [mcqJson, setMcqJson] = useState(`[
  {
    "id": 101,
    "question": "Which schedule of the Indian Constitution contains provisions regarding the allocation of seats in Rajya Sabha?",
    "options": ["Fourth Schedule", "Third Schedule", "Seventh Schedule", "Eighth Schedule"],
    "correctIndex": 0,
    "explanation": "The Fourth Schedule specifies the allocation of seats in the Council of States (Rajya Sabha) to states and Union Territories."
  },
  {
    "id": 102,
    "question": "The term 'Bull and Bear' is associated with which branch of commercial activity?",
    "options": ["Banking", "Stock Market", "Foreign Trade", "Insurance"],
    "correctIndex": 1,
    "explanation": "In financial markets, a bull market refers to an upward market trend, whereas a bear market refers to a declining trend."
  }
]`);

  const [singleJob, setSingleJob] = useState({
    title: '',
    department: '',
    category: 'govt',
    state: 'Central',
    salary: '',
    qualification: 'Graduate',
    vacancies: 50,
    lastDate: '2026-12-31',
    description: ''
  });

  useEffect(() => {
    fetch('/api/admin/candidates')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCandidates(data.candidates);
        }
      })
      .catch(err => console.error(err));
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
      alert(data.message || 'Jobs successfully uploaded to MongoDB Atlas!');
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
          testId: 'upsc-gs-1',
          exam: 'UPSC Civil Services',
          title: 'UPSC GS Mock Test',
          questions: parsed
        })
      });
      const data = await res.json();
      alert(data.message || 'MCQs successfully uploaded to MongoDB Atlas!');
    } catch (e) {
      alert("Invalid JSON format: " + e.message);
    }
  };

  const handleSingleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(singleJob)
      });
      const data = await res.json();
      alert("Job published successfully to Jobopedia!");
      setSingleJob({
        title: '',
        department: '',
        category: 'govt',
        state: 'Central',
        salary: '',
        qualification: 'Graduate',
        vacancies: 50,
        lastDate: '2026-12-31',
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
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <button 
            onClick={() => setCurrentView('home')}
            className="text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Jobopedia Dual Admin Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            MERN Stack Connected to MongoDB Atlas. Manage HR posts, Candidate ATS resumes, and Dhaval/Tushar Bulk JSON engines.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center space-x-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-300">Active Live Visitors</div>
            <div className="text-xl font-black text-amber-300">14,821 Live</div>
          </div>
          <span className="text-2xl">📈</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dhaval')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
            activeTab === 'dhaval' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>⚡</span>
          <span>CONTENT ADMIN (DHAVAL &amp; TUSHAR - BULK JSON)</span>
        </button>

        <button
          onClick={() => setActiveTab('hr')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
            activeTab === 'hr' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>💼</span>
          <span>HR SINGLE JOB POSTING</span>
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
            activeTab === 'candidates' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>👥</span>
          <span>CANDIDATE APPLICATIONS ({candidates.length})</span>
        </button>
      </div>

      {/* Dhaval & Tushar Bulk JSON Panel */}
      {activeTab === 'dhaval' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bulk Jobs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                <span>📁</span>
                <span>Bulk Jobs JSON Uploader</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Upload multiple Sarkari &amp; Corporate vacancies to MongoDB Atlas.</p>
            </div>

            <textarea
              value={jobsJson}
              onChange={(e) => setJobsJson(e.target.value)}
              className="w-full h-64 p-3 bg-slate-950 text-emerald-400 font-mono text-xs rounded-2xl border border-slate-800 focus:outline-none"
            />

            <button
              onClick={handleBulkJobs}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>☁️</span>
              <span>Validate &amp; Bulk Upload to MongoDB Atlas</span>
            </button>
          </div>

          {/* Bulk MCQs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                <span>📝</span>
                <span>Bulk MCQs Mock Test Uploader</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Add 100+ MCQs to UPSC, SSC CGL, or Banking test series.</p>
            </div>

            <textarea
              value={mcqJson}
              onChange={(e) => setMcqJson(e.target.value)}
              className="w-full h-64 p-3 bg-slate-950 text-amber-400 font-mono text-xs rounded-2xl border border-slate-800 focus:outline-none"
            />

            <button
              onClick={handleBulkMcqs}
              className="w-full py-3 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-2xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>🚀</span>
              <span>Upload MCQs to Test Series</span>
            </button>
          </div>

        </div>
      )}

      {/* HR Single Job Post Form */}
      {activeTab === 'hr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900">Publish a New Vacancy</h2>
            <p className="text-xs text-slate-500 font-medium">Fill in details to save directly into MongoDB Atlas.</p>
          </div>

          <form onSubmit={handleSingleJobSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Designation *</label>
                <input
                  type="text"
                  value={singleJob.title}
                  onChange={(e) => setSingleJob({ ...singleJob, title: e.target.value })}
                  placeholder="e.g. Probationary Officer"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department / Organization *</label>
                <input
                  type="text"
                  value={singleJob.department}
                  onChange={(e) => setSingleJob({ ...singleJob, department: e.target.value })}
                  placeholder="e.g. State Bank of India"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={singleJob.category}
                  onChange={(e) => setSingleJob({ ...singleJob, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                >
                  <option value="govt">Sarkari Job</option>
                  <option value="private">Private Job</option>
                  <option value="internship">Paid Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                <select
                  value={singleJob.state}
                  onChange={(e) => setSingleJob({ ...singleJob, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                >
                  <option value="Central">Central (All India)</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Salary / Pay Scale *</label>
                <input
                  type="text"
                  value={singleJob.salary}
                  onChange={(e) => setSingleJob({ ...singleJob, salary: e.target.value })}
                  placeholder="e.g. ₹56,100 - ₹1,77,500 / month"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qualification *</label>
                <input
                  type="text"
                  value={singleJob.qualification}
                  onChange={(e) => setSingleJob({ ...singleJob, qualification: e.target.value })}
                  placeholder="e.g. Graduate or B.Tech"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Description *</label>
              <textarea
                value={singleJob.description}
                onChange={(e) => setSingleJob({ ...singleJob, description: e.target.value })}
                rows="4"
                placeholder="Official job scope, duties and pattern..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200"
                required
              />
            </div>

            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md cursor-pointer">
              Publish Job to MongoDB
            </button>
          </form>
        </div>
      )}

      {/* Candidate Applications Tab */}
      {activeTab === 'candidates' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Candidate Applications &amp; ATS Resume Profiles</h2>
              <p className="text-xs text-slate-500 font-medium">Direct WhatsApp contact, state verification, and ATS qualifications.</p>
            </div>
            <button 
              onClick={exportCsv}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="p-3.5">Candidate Name</th>
                  <th className="p-3.5">WhatsApp / Phone</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">State</th>
                  <th className="p-3.5">Qualification</th>
                  <th className="p-3.5">Applied Role</th>
                  <th className="p-3.5">ATS Resume</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3.5">
                      <a 
                        href={`https://wa.me/${c.mobile.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-emerald-600 font-bold hover:underline flex items-center space-x-1"
                      >
                        <span>💬</span> <span>{c.mobile}</span>
                      </a>
                    </td>
                    <td className="p-3.5 text-slate-600">{c.email}</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">{c.state}</span></td>
                    <td className="p-3.5 text-slate-700">{c.qualification}</td>
                    <td className="p-3.5 font-medium text-slate-900">{c.targetJob}</td>
                    <td className="p-3.5 text-blue-600 font-medium hover:underline cursor-pointer">📄 {c.resumeTitle}</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
