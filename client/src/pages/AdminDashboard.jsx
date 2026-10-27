import React, { useState, useEffect } from 'react';
import { 
  Lock, PlusCircle, Users, Code, CloudUpload, ArrowLeft, 
  Download, Briefcase, Landmark, Building2, GraduationCap, 
  CheckCircle2, Bell, Send, Smartphone, Monitor, Trash2, 
  Search, BarChart3, TrendingUp, Calendar, FileSpreadsheet, 
  RefreshCw, Eye, Check, X, Plus, Filter, Globe, Sparkles, MessageSquare 
} from 'lucide-react';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';

export default function AdminDashboard({ setCurrentView, user }) {
  const [activeTab, setActiveTab] = useState('hr');
  const [candidates, setCandidates] = useState([]);
  const [successToast, setSuccessToast] = useState('');
  const [jobPostingStatus, setJobPostingStatus] = useState('idle'); // 'idle' | 'posting' | 'done'
  const [bulkJobsStatus, setBulkJobsStatus] = useState('idle'); // 'idle' | 'posting' | 'done'

  // Push Notification Broadcast State
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    category: 'govt',
    targetQualification: 'All',
    targetState: 'All India',
    url: 'https://jobopedia.in'
  });
  const [broadcastStates, setBroadcastStates] = useState(['All India / Central']);
  const [broadcastQualifications, setBroadcastQualifications] = useState(['All']);
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
    "states": ["All India / Central", "Delhi NCR", "Gujarat"],
    "qualifications": [
      "Graduate - Any Stream / Any Discipline",
      "Graduate - B.A. (Bachelor of Arts)",
      "Graduate - B.Com (Bachelor of Commerce)",
      "Graduate - B.E. / B.Tech (Computer Science & IT)"
    ],
    "salary": "₹52,000 - ₹1,40,000 / month (Level 7 Pay Matrix)",
    "vacancies": 450,
    "ageLimit": "20 - 30 Years",
    "lastDate": "2026-11-28",
    "dayNumber": 3,
    "applyUrl": "https://ssc.gov.in",
    "notificationUrl": "https://mea.gov.in/official-recruitment-notification-2026.pdf",
    "description": "Ministry of External Affairs invites online applications for Assistant Section Officer (ASO) posts. Appointed officers will manage diplomatic consular files, coordinate international summits, and serve postings in Indian Embassies and Consulates abroad with diplomatic passport status, foreign allowances, and government housing.",
    "eligibility": "Bachelor's Degree from a recognized University. Candidate must have basic computer proficiency and typing speed of 35 wpm in English or 30 wpm in Hindi.",
    "selectionProcess": "Tier-1 Computer Based Objective Test -> Tier-2 Written Descriptive & Typing Test -> Document Verification & Medical Examination",
    "tags": ["ASO", "MEA", "SSC CGL", "Central Govt"]
  },
  {
    "title": "Senior Cloud Software Engineer - AWS & React",
    "department": "Tata Consultancy Services (TCS Digital)",
    "category": "private",
    "sector": "IT / SOFTWARE",
    "states": ["Gujarat", "Maharashtra", "Karnataka"],
    "qualifications": [
      "Graduate - B.E. / B.Tech (Computer Science & IT)",
      "Graduate - BCA (Computer Applications)",
      "Post Graduate - MCA (Computer Applications)",
      "Post Graduate - M.Sc (Science / Information Technology)"
    ],
    "salary": "₹7,50,000 - ₹14,00,000 / year + Performance Bonus",
    "vacancies": 120,
    "ageLimit": "21 - 32 Years",
    "lastDate": "2026-12-15",
    "applyUrl": "https://www.tcs.com/careers",
    "notificationUrl": "https://www.tcs.com/careers/job-description-digital.pdf",
    "description": "TCS Digital is hiring Full Stack Engineers to build enterprise microservices on AWS and Node.js. Responsibilities include building scalable REST APIs, containerization using Docker & Kubernetes, designing responsive frontends in React & Tailwind CSS, and collaborating with global client architects.",
    "eligibility": "B.E. / B.Tech / MCA with minimum 60% aggregate. Proficiency in JavaScript, React, Node.js, and cloud deployments.",
    "selectionProcess": "TCS NQT Online Aptitude & Coding Assessment -> Technical Interview Round -> HR Discussion",
    "tags": ["TCS", "Software Engineer", "Full Stack", "Private MNC"]
  },
  {
    "title": "Public Policy & Urban Governance Internship 2026",
    "department": "NITI Aayog (Government of India)",
    "category": "internship",
    "sector": "PUBLIC POLICY",
    "states": ["Delhi NCR", "Gujarat", "Maharashtra", "All India / Central"],
    "qualifications": [
      "Graduate - Any Stream / Any Discipline",
      "Graduate - B.A. (Bachelor of Arts)",
      "Post Graduate - Any Master's Degree",
      "Post Graduate - MBA / PGDM (Finance / Marketing / HR / Ops)"
    ],
    "salary": "₹15,000 / month Stipend + Official Certificate",
    "vacancies": 60,
    "ageLimit": "19 - 28 Years",
    "lastDate": "2026-11-30",
    "applyUrl": "https://www.niti.gov.in/internship",
    "notificationUrl": "https://www.niti.gov.in/guidelines-internship-scheme.pdf",
    "description": "NITI Aayog internship scheme offers students exposure to government policy formulation, data analytics, and socio-economic research. Interns work directly with senior Advisors and Vertical Heads on national flagship initiatives such as Atal Innovation Mission, Aspirational Districts, and Green Energy.",
    "eligibility": "Undergraduate students appearing for final semester or postgraduate/research scholars studying in recognized institutions.",
    "selectionProcess": "Scrutiny of Academic Merits & Statement of Purpose (SOP) followed by online interaction.",
    "tags": ["NITI Aayog", "Internship", "Govt Internship", "Stipend"]
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
    state: 'All India / Central',
    salary: '',
    qualification: 'Graduate - Any Stream / Any Discipline',
    vacancies: 50,
    ageLimit: '18 - 35 Years',
    lastDate: '2026-12-31',
    applyUrl: 'https://jobopedia.in',
    notificationUrl: '',
    description: ''
  });

  // Multiple States and Qualifications Selection State
  const [selectedStates, setSelectedStates] = useState(['All India / Central']);
  const [selectedQualifications, setSelectedQualifications] = useState(['Graduate - Any Stream / Any Discipline']);
  const [stateSearch, setStateSearch] = useState('');
  const [qualSearch, setQualSearch] = useState('');
  const [customQualInput, setCustomQualInput] = useState('');

  // Toggle state selection
  const toggleState = (st) => {
    if (st === 'All India / Central') {
      setSelectedStates(['All India / Central']);
      return;
    }
    let updated = selectedStates.filter(s => s !== 'All India / Central');
    if (updated.includes(st)) {
      updated = updated.filter(s => s !== st);
      if (updated.length === 0) updated = ['All India / Central'];
    } else {
      updated = [...updated, st];
    }
    setSelectedStates(updated);
  };

  // Toggle qualification selection
  const toggleQual = (q) => {
    if (q === 'Graduate - Any Stream / Any Discipline' || q === 'All') {
      setSelectedQualifications(['Graduate - Any Stream / Any Discipline']);
      return;
    }
    let updated = selectedQualifications.filter(x => x !== 'Graduate - Any Stream / Any Discipline' && x !== 'All');
    if (updated.includes(q)) {
      updated = updated.filter(x => x !== q);
      if (updated.length === 0) updated = ['Graduate - Any Stream / Any Discipline'];
    } else {
      updated = [...updated, q];
    }
    setSelectedQualifications(updated);
  };

  // Add custom typed qualification
  const addCustomQualification = (e) => {
    if (e) e.preventDefault();
    const trimmed = customQualInput.trim();
    if (!trimmed) return;
    if (!selectedQualifications.includes(trimmed)) {
      const updated = selectedQualifications.filter(x => x !== 'Graduate - Any Stream / Any Discipline' && x !== 'All');
      setSelectedQualifications([...updated, trimmed]);
    }
    setCustomQualInput('');
  };

  // Toggle broadcast state selection
  const toggleBroadcastState = (st) => {
    if (st === 'All India / Central' || st === 'All India') {
      setBroadcastStates(['All India / Central']);
      return;
    }
    let updated = broadcastStates.filter(s => s !== 'All India / Central' && s !== 'All India');
    if (updated.includes(st)) {
      updated = updated.filter(s => s !== st);
      if (updated.length === 0) updated = ['All India / Central'];
    } else {
      updated = [...updated, st];
    }
    setBroadcastStates(updated);
  };

  // Toggle broadcast qualification selection
  const toggleBroadcastQual = (q) => {
    if (q === 'All' || q === 'Graduate - Any Stream / Any Discipline') {
      setBroadcastQualifications(['All']);
      return;
    }
    let updated = broadcastQualifications.filter(x => x !== 'All');
    if (updated.includes(q)) {
      updated = updated.filter(x => x !== q);
      if (updated.length === 0) updated = ['All'];
    } else {
      updated = [...updated, q];
    }
    setBroadcastQualifications(updated);
  };

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

  // All Jobs & Removal State
  const [allJobs, setAllJobs] = useState([]);
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Visitor Analytics State (Dhaval Special)
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsViewMode, setAnalyticsViewMode] = useState('date-wise'); // 'date-wise' | 'month-wise'

  // User Complaints & Grievances State
  const [complaintsList, setComplaintsList] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [complaintFilter, setComplaintFilter] = useState('all');
  const [complaintSearch, setComplaintSearch] = useState('');
  const [replyTextMap, setReplyTextMap] = useState({});

  const fetchComplaints = () => {
    setLoadingComplaints(true);
    fetch('/api/complaints')
      .then(r => r.json())
      .then(d => {
        if (d.success && Array.isArray(d.complaints)) {
          setComplaintsList(d.complaints);
        }
      })
      .catch(err => console.error("Error fetching complaints:", err))
      .finally(() => setLoadingComplaints(false));
  };

  const handleUpdateComplaint = async (complaintId, newStatus, reply) => {
    try {
      const res = await fetch(`/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          adminReply: reply
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessToast(`✅ Complaint updated to "${newStatus}"!`);
        fetchComplaints();
        setTimeout(() => setSuccessToast(''), 4000);
      }
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (!window.confirm("Are you sure you want to permanently delete this complaint record?")) return;
    try {
      const res = await fetch(`/api/complaints/${complaintId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSuccessToast("🗑️ Complaint removed successfully!");
        fetchComplaints();
        setTimeout(() => setSuccessToast(''), 4000);
      }
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const fetchAllAdminJobs = () => {
    setLoadingJobs(true);
    setLoadingGovtJobs(true);
    Promise.all([
      fetch('/api/admin/jobs').then(r => r.json()),
      fetch('/api/mock-tests').then(r => r.json())
    ]).then(([jobsData, testsData]) => {
      if (jobsData.success && Array.isArray(jobsData.jobs)) {
        setAllJobs(jobsData.jobs);
        setGovtJobs(jobsData.jobs.filter(j => j.category === 'govt'));
      }
      if (testsData.success && Array.isArray(testsData.tests)) {
        setMockTestsList(testsData.tests);
      }
    }).catch(err => console.error("Error loading admin jobs:", err))
      .finally(() => {
        setLoadingJobs(false);
        setLoadingGovtJobs(false);
      });
  };

  const fetchAnalytics = () => {
    setLoadingAnalytics(true);
    fetch('/api/analytics/stats')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setAnalyticsData(data);
        }
      })
      .catch(err => console.error("Error loading analytics:", err))
      .finally(() => setLoadingAnalytics(false));
  };

  const handleDeleteJob = async (jobId, jobTitle) => {
    if (!window.confirm(`Are you sure you want to permanently delete this job:\n\n"${jobTitle}"\n\nThis will remove it from Jobopedia and MongoDB Atlas.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSuccessToast(`🗑️ "${jobTitle}" has been successfully removed from database!`);
        setAllJobs(prev => prev.filter(j => (j._id || j.id) !== jobId));
        setGovtJobs(prev => prev.filter(j => (j._id || j.id) !== jobId));
        setTimeout(() => setSuccessToast(''), 4000);
      } else {
        alert(data.error || 'Failed to delete job');
      }
    } catch (err) {
      alert("Error deleting job: " + err.message);
    }
  };

  const exportAnalyticsCsv = () => {
    if (!analyticsData) return;
    const { dateWise, monthWise, summary } = analyticsData;
    
    let csv = "JOBOPEDIA TRAFFIC & VISITOR ANALYTICS REPORT\n";
    csv += `Export Date: ${new Date().toLocaleDateString('en-IN')}\n`;
    csv += `Total Lifetime Visits: ${summary.totalLifetimeVisits}\n`;
    csv += `This Month Visits: ${summary.thisMonthVisits}\n`;
    csv += `Today's Visits: ${summary.todayVisits}\n\n`;

    csv += "--- DATE-WISE TRAFFIC (LAST 30 DAYS) ---\n";
    csv += "Date,Day,Total Visits,Mobile Visits,Desktop Visits,Unique Visitors\n";
    (dateWise || []).forEach(d => {
      csv += `"${d.date}","${d.formattedDate}",${d.totalVisits},${d.mobileVisits},${d.desktopVisits},${d.uniqueVisitors}\n`;
    });

    csv += "\n--- MONTH-WISE TRAFFIC (2026) ---\n";
    csv += "Month Code,Month Name,Total Visits,Mobile Visits,Desktop Visits,Unique Visitors\n";
    (monthWise || []).forEach(m => {
      csv += `"${m.month}","${m.monthName}",${m.totalVisits},${m.mobileVisits},${m.desktopVisits},${m.uniqueVisitors}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Jobopedia_Traffic_Analytics_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const fetchGovtJobsAndTests = () => {
    fetchAllAdminJobs();
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

    fetchAllAdminJobs();
    fetchAnalytics();
    fetchComplaints();
  }, []);

  // Live auto-refresh of visitor analytics every 5 seconds when Dhaval is viewing
  useEffect(() => {
    let interval = null;
    if (activeTab === 'dhaval') {
      fetchAnalytics();
      interval = setInterval(() => {
        fetchAnalytics();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTab]);

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
      const finalStates = broadcastStates.length > 0 ? broadcastStates : ['All India / Central'];
      const finalQuals = broadcastQualifications.length > 0 ? broadcastQualifications : ['All'];

      const payload = {
        ...broadcastForm,
        targetStates: finalStates,
        targetState: finalStates.join(', '),
        targetQualifications: finalQuals,
        targetQualification: finalQuals.join(', ')
      };

      const res = await fetch('/api/notifications/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
        setBroadcastStates(['All India / Central']);
        setBroadcastQualifications(['All']);
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
      setBulkJobsStatus('posting');
      const parsed = JSON.parse(jobsJson);
      const res = await fetch('/api/admin/jobs/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      const data = await res.json();
      setBulkJobsStatus('done');
      setSuccessToast(data.message || '✅ DONE! Jobs successfully uploaded to MongoDB Atlas!');
      setTimeout(() => {
        setSuccessToast('');
        setBulkJobsStatus('idle');
      }, 5000);
    } catch (e) {
      setBulkJobsStatus('idle');
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
      setSuccessToast(data.message || '✅ DONE! MCQs successfully uploaded to MongoDB Atlas!');
      setTimeout(() => setSuccessToast(''), 4000);
    } catch (e) {
      alert("Invalid JSON format: " + e.message);
    }
  };

  const handleSingleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      setJobPostingStatus('posting');
      // Synchronize category with jobType
      const cat = singleJob.jobType === 'GOVERNMENT' || singleJob.jobType === 'BANKING_PSU' ? 'govt' : (singleJob.jobType === 'INTERNSHIP' ? 'internship' : 'private');
      const finalStates = selectedStates.length > 0 ? selectedStates : ['All India / Central'];
      const finalQuals = selectedQualifications.length > 0 ? selectedQualifications : ['Graduate - Any Stream / Any Discipline'];

      const payload = {
        ...singleJob,
        category: cat,
        sector: singleJob.jobType === 'INTERNSHIP' ? 'INTERNSHIP' : (cat === 'govt' ? 'GOVERNMENT' : 'PRIVATE'),
        states: finalStates,
        state: finalStates.join(', '),
        qualifications: finalQuals,
        qualification: finalQuals.join(', ')
      };

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      setJobPostingStatus('done');
      setSuccessToast(`✅ DONE! "${singleJob.title}" has been published to MongoDB Atlas! Auto-notifications sent to matched candidates.`);
      setTimeout(() => {
        setSuccessToast('');
        setJobPostingStatus('idle');
      }, 6000);

      // Reset form
      setSingleJob({
        title: '',
        department: '',
        jobType: 'GOVERNMENT',
        category: 'govt',
        employmentType: 'Full Time (Regular)',
        experienceLevel: 'Fresher (0 - 1 Year)',
        state: 'All India / Central',
        salary: '',
        qualification: 'Graduate - Any Stream / Any Discipline',
        vacancies: 50,
        ageLimit: '18 - 35 Years',
        lastDate: '2026-12-31',
        applyUrl: 'https://jobopedia.in',
        notificationUrl: '',
        description: ''
      });
      setSelectedStates(['All India / Central']);
      setSelectedQualifications(['Graduate - Any Stream / Any Discipline']);
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
          onClick={() => { setActiveTab('dhaval'); fetchAnalytics(); }}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'dhaval' ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>📊 VISITOR ANALYTICS &amp; TRAFFIC (DHAVAL)</span>
        </button>

        <button
          onClick={() => { setActiveTab('govt-jobs'); fetchAllAdminJobs(); }}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'govt-jobs' ? 'bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          <span>🗑️ MANAGE &amp; REMOVE JOBS ({allJobs.length || govtJobs.length})</span>
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
          onClick={() => setActiveTab('broadcast')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'broadcast' ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>📢 BROADCAST PUSH NOTIFICATION</span>
        </button>

        <button
          onClick={() => { setActiveTab('complaints'); fetchComplaints(); }}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition flex items-center space-x-2 cursor-pointer shrink-0 ${
            activeTab === 'complaints' ? 'bg-gradient-to-r from-rose-700 via-pink-700 to-rose-800 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>📢 USER COMPLAINTS ({complaintsList.filter(c => c.status === 'Pending').length} Pending)</span>
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

            {/* Multiple States & Locations Selection */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1 rounded-md bg-blue-100 text-blue-700">
                      <Globe className="w-4 h-4" />
                    </span>
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      2. Eligible States & Locations (એક કે તેથી વધુ રાજ્યો પસંદ કરો) *
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Select all states where candidates are eligible to apply. Automatic push notifications will be dispatched to candidates from these selected states.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStates(['All India / Central'])}
                    className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-xs cursor-pointer"
                  >
                    🇮🇳 Select All India
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStates([])}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Selected States Badges */}
              <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-white rounded-xl border border-blue-100 min-h-[42px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mr-1">
                  Selected ({selectedStates.length}):
                </span>
                {selectedStates.map(st => (
                  <span 
                    key={st}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs"
                  >
                    <span>{st}</span>
                    <button
                      type="button"
                      onClick={() => toggleState(st)}
                      className="ml-1 text-blue-500 hover:text-rose-600 cursor-pointer font-black"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Quick Add:</span>
                {['Gujarat', 'Maharashtra', 'Delhi NCR', 'Rajasthan', 'Uttar Pradesh', 'Karnataka', 'Madhya Pradesh', 'Bihar', 'Punjab'].map(st => {
                  const isSel = selectedStates.includes(st);
                  return (
                    <button
                      type="button"
                      key={st}
                      onClick={() => toggleState(st)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                        isSel 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isSel ? '✓ ' : '+ '}{st}
                    </button>
                  );
                })}
              </div>

              {/* Search All Indian States & UTs */}
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={stateSearch}
                    onChange={(e) => setStateSearch(e.target.value)}
                    placeholder="Search from all 36 Indian States & UTs (e.g. Goa, Kerala, Assam, Uttarakhand...)"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="max-h-32 overflow-y-auto p-2 bg-white rounded-xl border border-slate-200 flex flex-wrap gap-1.5">
                  {ALL_INDIAN_STATES
                    .filter(s => s.toLowerCase().includes(stateSearch.toLowerCase()))
                    .map(st => {
                      const isSel = selectedStates.includes(st);
                      return (
                        <button
                          type="button"
                          key={st}
                          onClick={() => toggleState(st)}
                          className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer border ${
                            isSel
                              ? 'bg-blue-600 text-white border-blue-600 font-bold'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {isSel ? '✓ ' : '+ '}{st}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Multiple Qualifications & Degrees Selection */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-purple-50/40 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1 rounded-md bg-purple-100 text-purple-700">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      3. Required Qualifications & Degrees (એક કે તેથી વધુ લાયકાતો પસંદ કરો) *
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Select all eligible degrees and qualifications. Push notifications will automatically reach every user with matching education degrees.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedQualifications(['Graduate - Any Stream / Any Discipline'])}
                    className="px-2.5 py-1 text-[11px] font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition shadow-xs cursor-pointer"
                  >
                    🎓 Any Graduate
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedQualifications([])}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Selected Qualifications Badges */}
              <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-white rounded-xl border border-purple-100 min-h-[42px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mr-1">
                  Selected ({selectedQualifications.length}):
                </span>
                {selectedQualifications.map(q => (
                  <span 
                    key={q}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 shadow-2xs"
                  >
                    <span>{q}</span>
                    <button
                      type="button"
                      onClick={() => toggleQual(q)}
                      className="ml-1 text-purple-500 hover:text-rose-600 cursor-pointer font-black"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Preset Category Shortcuts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Category Presets:</span>
                {[
                  {
                    label: '⚡ 10th & 12th Pass',
                    items: ['10th Pass (Matriculation / SSC)', '12th Pass - Arts', '12th Pass - Commerce', '12th Pass - Science']
                  },
                  {
                    label: '💻 IT & Computer',
                    items: ['Graduate - BCA (Computer Applications)', 'Graduate - B.E. / B.Tech (Computer Science & IT)', 'Post Graduate - MCA (Computer Applications)', 'Post Graduate - M.Sc (Science / Information Technology)']
                  },
                  {
                    label: '⚙️ Engineering & Polytechnic',
                    items: ['Polytechnic Diploma (Mechanical / Civil / Electrical / Auto)', 'Polytechnic Diploma (Computer / IT / Electronics)', 'Graduate - B.E. / B.Tech (Computer Science & IT)', 'Graduate - B.E. / B.Tech (Mechanical / Civil / Electrical / EC)']
                  },
                  {
                    label: '💼 Commerce & MBA',
                    items: ['Graduate - B.Com (Bachelor of Commerce)', 'Graduate - BBA / BMS (Business Administration)', 'Post Graduate - MBA / PGDM (Finance / Marketing / HR / Ops)', 'Chartered Accountant (CA) / CS / CMA / ICWA']
                  },
                  {
                    label: '🏥 Medical & Pharma',
                    items: ['Graduate - MBBS / BDS (Medical & Dental)', 'Graduate - B.Pharm (Pharmacy)', 'Graduate - B.Sc Nursing / GNM']
                  }
                ].map(cat => (
                  <button
                    type="button"
                    key={cat.label}
                    onClick={() => {
                      const updated = selectedQualifications.filter(x => x !== 'Graduate - Any Stream / Any Discipline' && x !== 'All');
                      const merged = Array.from(new Set([...updated, ...cat.items]));
                      setSelectedQualifications(merged);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-purple-50 hover:text-purple-700 text-slate-700 border border-slate-200 transition cursor-pointer"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Custom Degree Write-In & Search from 35+ Degrees */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>Search All Indian Degrees & Qualifications:</span>
                  </div>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={qualSearch}
                      onChange={(e) => setQualSearch(e.target.value)}
                      placeholder="Search degree (e.g. B.Tech, 10th, Nursing, LLB, CA...)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div className="max-h-36 overflow-y-auto p-2 bg-white rounded-xl border border-slate-200 flex flex-wrap gap-1.5">
                    {ALL_QUALIFICATIONS
                      .filter(q => q.toLowerCase().includes(qualSearch.toLowerCase()))
                      .map(q => {
                        const isSel = selectedQualifications.includes(q);
                        return (
                          <button
                            type="button"
                            key={q}
                            onClick={() => toggleQual(q)}
                            className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer border ${
                              isSel
                                ? 'bg-purple-600 text-white border-purple-600 font-bold'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {isSel ? '✓ ' : '+ '}{q}
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Custom Write-In Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    Or Add Any Custom Degree / Trade:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={customQualInput}
                      onChange={(e) => setCustomQualInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomQualification(); } }}
                      placeholder="e.g. B.Sc Agriculture / Diploma Fire Safety"
                      className="flex-1 px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={addCustomQualification}
                      className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition cursor-pointer flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-[11px] text-purple-900 leading-tight">
                    💡 <strong>Smart Notification Dispatch:</strong> Candidates having any of these selected degrees will receive instant push notifications on their Phone &amp; PC!
                  </div>
                </div>
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

            {/* Success Done Banner right above submit button */}
            {jobPostingStatus === 'done' && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-400 text-emerald-950 rounded-2xl flex items-center space-x-3 shadow-md animate-in zoom-in-95">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-emerald-950">
                    ✅ DONE! જોબ સફળતાપૂર્વક પોસ્ટ થઈ ગઈ છે!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Job has been published to MongoDB Atlas and Chrome Web Push notifications dispatched to candidates!
                  </p>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Data will be instantly synced to MongoDB Atlas and published to live website.
              </span>
              <button
                type="submit"
                disabled={jobPostingStatus === 'posting'}
                className={`px-8 py-3.5 rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer ${
                  jobPostingStatus === 'done'
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 scale-105'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {jobPostingStatus === 'done' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                    <span className="text-sm">✅ DONE! Job Post Ho Gayi Hai</span>
                  </>
                ) : jobPostingStatus === 'posting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publishing to MongoDB...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Publish Job to Live Database</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TAB 2: DHAVAL'S VISITOR ANALYTICS & TRAFFIC ANALYSIS + BULK OPS */}
      {activeTab === 'dhaval' && (
        <div className="space-y-6">
          
          {/* Analytics Control Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                    <BarChart3 className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Dhaval's Website Visitor Analytics &amp; Traffic Report
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Track date-wise and month-wise visitor counts, device distribution (Mobile vs Desktop), and export reports to CSV.
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={fetchAnalytics}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                  title="Reload Live Analytics"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={exportAnalyticsCsv}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-1.5 cursor-pointer"
                  title="Download CSV for Date-wise & Month-wise traffic"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>📥 Export Analytics to CSV</span>
                </button>
              </div>
            </div>

            {/* Live Traffic Summary Metric Cards (100% REAL DATA FROM MONGODB - 1 VISIT PER USER PER DAY) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 space-y-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-blue-700 flex items-center justify-between">
                  <span>Total Unique Visitors</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {analyticsData?.summary?.totalLifetimeVisits ?? 0}
                </div>
                <div className="text-[11px] text-blue-700 font-semibold">
                  1 record per user per day in database
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-emerald-700 flex items-center justify-between">
                  <span>Today's Unique Visitors</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {analyticsData?.summary?.todayVisits ?? 0}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  Distinct users on {analyticsData?.summary?.todayDate || 'Today'}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                  This Month's Unique Visitors
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {analyticsData?.summary?.thisMonthVisits ?? 0}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold">
                  Month: {analyticsData?.summary?.currentMonth || 'Current'}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 space-y-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-purple-700">
                  Device Breakdown
                </div>
                <div className="text-xl font-black text-slate-900 flex items-center space-x-2">
                  <span className="text-blue-600">{analyticsData?.summary?.mobileRatio ?? 0}% 📱</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-emerald-600">{analyticsData?.summary?.desktopRatio ?? 0}% 💻</span>
                </div>
                <div className="text-[11px] text-purple-700 font-semibold">
                  {analyticsData?.summary?.mobileRatio ?? 0}% Mobile • {analyticsData?.summary?.desktopRatio ?? 0}% Desktop
                </div>
              </div>
            </div>

            {/* Real Recent Visitors Live Stream (1 Entry Per User Per Day with Exact IP) */}
            <div className="space-y-3 p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">
                    🔴 Live Daily Unique Visitors Stream (વાસ્તવિક મુલાકાતીઓ &amp; IP)
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="text-amber-300 font-bold bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800">
                    🔒 1 User = 1 Bar Per Day
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 hidden sm:inline">
                    Live Auto-updating 5s
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto max-h-72 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 uppercase font-black text-[10px] tracking-wider sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Visit Time</th>
                      <th className="py-2.5 px-3">Visitor Real IP (આઇપી)</th>
                      <th className="py-2.5 px-3">Page Visited</th>
                      <th className="py-2.5 px-3">Device Platform</th>
                      <th className="py-2.5 px-3">Candidate State</th>
                      <th className="py-2.5 px-3">Today's Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium text-[11px]">
                    {(!analyticsData?.recentVisitors || analyticsData.recentVisitors.length === 0) ? (
                      <tr>
                        <td colSpan="6" className="py-6 text-center text-slate-400">
                          Waiting for live visitors... Open the website on your phone to see your entry appear here!
                        </td>
                      </tr>
                    ) : (
                      analyticsData.recentVisitors.map((v, i) => (
                        <tr key={v.id || i} className="hover:bg-slate-800/50 transition">
                          <td className="py-2 px-3 text-slate-300 font-mono whitespace-nowrap">
                            {new Date(v.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            <span className="text-[10px] text-slate-500 block">{v.date}</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className="font-mono text-amber-300 font-extrabold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 inline-block shadow-2xs">
                              🌐 {v.ip || '127.0.0.1'}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span className="font-bold text-slate-200 capitalize">
                              {v.page === 'home' ? '🏠 Home Page' :
                               v.page === 'govt' ? '🏛️ Govt Jobs' :
                               v.page === 'private' ? '🏢 Private Jobs' :
                               v.page === 'internships' ? '🎓 Internships' :
                               v.page === 'job-detail' ? '📋 Job Detail Page' :
                               v.page === 'user-dashboard' ? '👤 Candidate Panel' :
                               v.page === 'admin' ? '⚙️ Admin Dashboard' :
                               v.page}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            {v.deviceType === 'Mobile' ? (
                              <span className="inline-flex items-center space-x-1 text-blue-400 font-bold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/60">
                                <span>📱 Mobile</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                                <span>💻 Desktop PC</span>
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-slate-300 font-semibold whitespace-nowrap">
                            📍 {v.state || 'All India'} • <span className="text-slate-400 font-normal text-[10px]">{v.browser}</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-800 whitespace-nowrap">
                              <span>✓ 1 User</span>
                              {v.visitCount > 1 && (
                                <span className="text-amber-300">({v.visitCount} views today)</span>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Date-wise vs Month-wise Tabs Switcher */}
            <div className="pt-2">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <button
                  type="button"
                  onClick={() => setAnalyticsViewMode('date-wise')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center space-x-1.5 ${
                    analyticsViewMode === 'date-wise'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>📅 Date-Wise Traffic (Last 30 Days)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAnalyticsViewMode('month-wise')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center space-x-1.5 ${
                    analyticsViewMode === 'month-wise'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>🗓️ Month-Wise Traffic Growth (2026)</span>
                </button>
              </div>
            </div>

            {/* DATE-WISE ANALYSIS VIEW */}
            {analyticsViewMode === 'date-wise' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-800">
                    Day-by-Day Visitor Breakdown (Daily Traffic Trends)
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Showing last 30 days
                  </span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 uppercase font-black border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Total Visits</th>
                        <th className="py-3 px-4">Mobile (📱)</th>
                        <th className="py-3 px-4">Desktop PC (💻)</th>
                        <th className="py-3 px-4">Unique Candidates</th>
                        <th className="py-3 px-4">Traffic Volume Visual</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {(analyticsData?.dateWise || []).slice(-15).reverse().map((d, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2.5 px-4 font-bold text-slate-900">
                            {d.formattedDate} <span className="text-[10px] text-slate-400 font-normal">({d.date})</span>
                          </td>
                          <td className="py-2.5 px-4 font-black text-blue-600 text-sm">
                            {d.totalVisits.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 px-4 text-slate-700">
                            {d.mobileVisits} <span className="text-[10px] text-slate-400">({d.totalVisits ? Math.round((d.mobileVisits/d.totalVisits)*100) : 0}%)</span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-700">
                            {d.desktopVisits} <span className="text-[10px] text-slate-400">({d.totalVisits ? Math.round((d.desktopVisits/d.totalVisits)*100) : 0}%)</span>
                          </td>
                          <td className="py-2.5 px-4 text-emerald-700 font-bold">
                            {d.uniqueVisitors}
                          </td>
                          <td className="py-2.5 px-4 w-48">
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                              <div 
                                className="bg-blue-600 h-2.5" 
                                style={{ width: `${Math.min(100, Math.round((d.totalVisits / 1000) * 100))}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MONTH-WISE ANALYSIS VIEW */}
            {analyticsViewMode === 'month-wise' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-800">
                    Monthly Traffic Performance &amp; Growth (2026)
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    All-India Candidate Growth
                  </span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 uppercase font-black border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Month</th>
                        <th className="py-3 px-4">Total Monthly Visits</th>
                        <th className="py-3 px-4">Mobile Device</th>
                        <th className="py-3 px-4">Desktop PC</th>
                        <th className="py-3 px-4">Unique Job Seekers</th>
                        <th className="py-3 px-4">Performance Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {(analyticsData?.monthWise || []).map((m, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-3 px-4 font-black text-slate-900 text-sm">
                            {m.monthName}
                          </td>
                          <td className="py-3 px-4 font-black text-emerald-700 text-base">
                            {m.totalVisits.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {m.mobileVisits.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {m.desktopVisits.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-blue-700 font-bold">
                            {m.uniqueVisitors.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                              🚀 High Traffic
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Additional Breakdowns: Top Pages & State Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  🔥 Most Visited Sections
                </h4>
                <div className="space-y-2 text-xs">
                  {(analyticsData?.topPages || []).map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                      <span className="font-bold text-slate-800 truncate mr-2">{p.page}</span>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="font-black text-blue-600">{p.views?.toLocaleString('en-IN')} views</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600">{p.share}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  📍 State-Wise Candidate Visitor Distribution
                </h4>
                <div className="space-y-2 text-xs">
                  {(analyticsData?.topStates || []).map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>{s.state}</span>
                        <span className="text-blue-600">{s.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full" style={{ width: `${s.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bulk JSON Uploaders for Jobs & MCQs (Preserved for Dhaval) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Bulk Jobs */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                  <span>📁</span>
                  <span>Bulk Jobs JSON Uploader (Full Details &amp; Description)</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">Upload multiple Sarkari, Corporate &amp; Internship vacancies with complete descriptions to MongoDB Atlas.</p>
              </div>

              {/* JSON Field Reference Guide */}
              <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl text-[11px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-900 uppercase tracking-wide">Supported JSON Fields:</span>
                  <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">✨ Multiple Degrees &amp; States Supported</span>
                </div>
                <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                  {['title', 'department', 'category', 'sector', 'states (array)', 'state', 'qualifications (array)', 'qualification', 'salary', 'vacancies', 'ageLimit', 'lastDate', 'dayNumber', 'applyUrl', 'notificationUrl', 'description', 'eligibility', 'selectionProcess', 'tags'].map(f => (
                    <span key={f} className={`px-1.5 py-0.5 rounded font-bold border ${f.includes('array') ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white border-blue-200 text-blue-800'}`}>
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-blue-800 leading-relaxed">
                  💡 <strong>Multi-Selection in JSON:</strong> Use <code>"states": ["Gujarat", "Maharashtra", "Delhi NCR"]</code> and <code>"qualifications": ["10th Pass (Matriculation / SSC)", "12th Pass - Science", "Graduate - B.E. / B.Tech (Computer Science &amp; IT)"]</code>. As soon as you upload, targeted push notifications will be automatically triggered to every user matching any of these degrees or states!
                </p>
              </div>

              <textarea
                value={jobsJson}
                onChange={(e) => setJobsJson(e.target.value)}
                rows="14"
                className="w-full font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none leading-relaxed"
              />

              <button
                type="button"
                onClick={handleBulkJobs}
                disabled={bulkJobsStatus === 'posting'}
                className={`w-full py-3.5 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer ${
                  bulkJobsStatus === 'done'
                    ? 'bg-emerald-600 ring-4 ring-emerald-200'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {bulkJobsStatus === 'done' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                    <span>✅ DONE! Bulk Jobs Successfully Uploaded (જોબ પોસ્ટ થઈ ગઈ છે)</span>
                  </>
                ) : bulkJobsStatus === 'posting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading Jobs...</span>
                  </>
                ) : (
                  <>
                    <CloudUpload className="w-4 h-4" />
                    <span>Publish Bulk Jobs to MongoDB Atlas</span>
                  </>
                )}
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
                rows="10"
                className="w-full font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              />

              <button
                type="button"
                onClick={handleBulkMcqs}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CloudUpload className="w-4 h-4" />
                <span>Publish MCQs to Mock Tests Engine</span>
              </button>
            </div>

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

      {/* TAB 4: MANAGE & REMOVE JOBS (WITH SEARCH & DELETE) */}
      {activeTab === 'govt-jobs' && (() => {
        const filteredAdminJobs = (allJobs.length > 0 ? allJobs : govtJobs).filter(job => {
          if (selectedCategoryFilter !== 'all' && job.category !== selectedCategoryFilter) {
            return false;
          }
          if (jobSearchQuery && jobSearchQuery.trim() !== '') {
            const q = jobSearchQuery.toLowerCase();
            const match = 
              (job.title && job.title.toLowerCase().includes(q)) ||
              (job.department && job.department.toLowerCase().includes(q)) ||
              (job.state && job.state.toLowerCase().includes(q)) ||
              (job.qualification && job.qualification.toLowerCase().includes(q)) ||
              (job.sector && job.sector.toLowerCase().includes(q));
            if (!match) return false;
          }
          return true;
        });

        return (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                    <Trash2 className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Manage &amp; Remove Jobs (Search &amp; 1-Click Delete)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Search any live job across Government, Corporate MNC, or Internship categories. Permanently remove unwanted jobs or upload MCQ practice tests.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchAllAdminJobs}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Jobs</span>
              </button>
            </div>

            {/* Real-time Search and Category Filtering Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="🔍 Search jobs by Title, Department, State, Qualification to remove..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none"
                />
                {jobSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setJobSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: 'all', label: `All Jobs (${allJobs.length || govtJobs.length})` },
                  { id: 'govt', label: `🏛️ Govt (${allJobs.filter(j => j.category === 'govt').length || govtJobs.length})` },
                  { id: 'private', label: `🏢 Private (${allJobs.filter(j => j.category === 'private').length})` },
                  { id: 'internship', label: `🎓 Internships (${allJobs.filter(j => j.category === 'internship').length})` }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {loadingJobs ? (
              <div className="py-12 text-center text-xs font-bold text-slate-400">
                Loading jobs from MongoDB Atlas...
              </div>
            ) : filteredAdminJobs.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <div className="text-3xl">🔍</div>
                <div className="text-sm font-bold text-slate-700">No matching jobs found</div>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {jobSearchQuery ? `No jobs matched query "${jobSearchQuery}". Try another keyword or clear search.` : "No jobs uploaded in this category."}
                </p>
                {jobSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setJobSearchQuery('')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl mt-2 cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-black border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Job Title &amp; Category</th>
                      <th className="py-3 px-4">Department &amp; State</th>
                      <th className="py-3 px-4">Vacancies &amp; Salary</th>
                      <th className="py-3 px-4">Last Date</th>
                      <th className="py-3 px-4">MCQ Practice</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredAdminJobs.map((job) => {
                      const jobId = job._id || job.id;
                      const matchingTest = mockTestsList.find(t => 
                        t.jobId === jobId || 
                        (t.exam && job.department && t.exam.toLowerCase().includes(job.department.toLowerCase())) ||
                        (t.title && job.title && t.title.toLowerCase().includes(job.title.toLowerCase()))
                      );
                      const hasMcq = Boolean(job.hasMcqs || matchingTest);
                      const mcqCount = matchingTest ? matchingTest.questions?.length : (job.hasMcqs ? 20 : 0);

                      const categoryBadge = job.category === 'govt'
                        ? 'bg-blue-100 text-blue-800'
                        : (job.category === 'internship' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800');

                      return (
                        <tr key={jobId} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${categoryBadge}`}>
                                {job.category || 'govt'}
                              </span>
                              <div className="font-extrabold text-slate-900 line-clamp-1">{job.title}</div>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {jobId}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-700">{job.department}</div>
                            <div className="text-[10px] text-slate-500">📍 {job.state || 'Central'}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-emerald-700">{job.vacancies || 1} Posts</div>
                            <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{job.salary}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-rose-600">{job.lastDate || 'Active'}</span>
                          </td>
                          <td className="py-3 px-4">
                            {hasMcq ? (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                <span>MCQs Active ({mcqCount})</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-200">
                                <span>No MCQs</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                type="button"
                                onClick={() => setSelectedJobForMcq(job)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                                title="Manage Practice MCQs for this Job"
                              >
                                <span>⚡ MCQs</span>
                              </button>

                              {/* REMOVE / DELETE JOB BUTTON */}
                              <button
                                type="button"
                                onClick={() => handleDeleteJob(jobId, job.title)}
                                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer shadow-2xs"
                                title="Permanently delete job from database"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })()}

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
            <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="font-black text-xs uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Audience Targeting (Select Multiple States &amp; Degrees)</span>
              </div>

              {/* Target States Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Target States ({broadcastStates.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setBroadcastStates(['All India / Central'])}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Reset to All India
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-xl border border-slate-200 min-h-[38px]">
                  {broadcastStates.map(st => (
                    <span key={st} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      <span>{st}</span>
                      <button type="button" onClick={() => toggleBroadcastState(st)} className="ml-1 text-blue-400 hover:text-rose-600">×</button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 text-[10px]">
                  {['All India / Central', 'Gujarat', 'Maharashtra', 'Delhi NCR', 'Rajasthan', 'Uttar Pradesh', 'Karnataka', 'Madhya Pradesh'].map(st => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => toggleBroadcastState(st)}
                      className={`px-2 py-1 rounded-md font-bold border transition cursor-pointer ${
                        broadcastStates.includes(st)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {broadcastStates.includes(st) ? '✓ ' : '+ '}{st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Qualifications Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Target Qualifications ({broadcastQualifications.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setBroadcastQualifications(['All'])}
                    className="text-[10px] font-bold text-purple-600 hover:underline"
                  >
                    Reset to All Degrees
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-xl border border-slate-200 min-h-[38px]">
                  {broadcastQualifications.map(q => (
                    <span key={q} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                      <span>{q}</span>
                      <button type="button" onClick={() => toggleBroadcastQual(q)} className="ml-1 text-purple-400 hover:text-rose-600">×</button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 text-[10px]">
                  {[
                    { label: 'All Qualifications', val: 'All' },
                    { label: '10th & 12th', val: '10th Pass (Matriculation / SSC)' },
                    { label: 'Any Graduate', val: 'Graduate - Any Stream / Any Discipline' },
                    { label: 'B.Tech / IT', val: 'Graduate - B.E. / B.Tech (Computer Science & IT)' },
                    { label: 'BCA / MCA', val: 'Graduate - BCA (Computer Applications)' },
                    { label: 'B.Com / Finance', val: 'Graduate - B.Com (Bachelor of Commerce)' },
                    { label: 'MBA / PG', val: 'Post Graduate - MBA / PGDM (Finance / Marketing / HR / Ops)' }
                  ].map(item => (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => toggleBroadcastQual(item.val)}
                      className={`px-2 py-1 rounded-md font-bold border transition cursor-pointer ${
                        broadcastQualifications.includes(item.val)
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {broadcastQualifications.includes(item.val) ? '✓ ' : '+ '}{item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* URL */}
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
                <span className="text-[10px] text-slate-400 mt-0.5 block">Direct link opened when candidate clicks the notification</span>
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

      {/* TAB 6: USER COMPLAINTS & GRIEVANCE REDRESSAL PANEL */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  User Complaints &amp; Grievances (ફરિયાદ નિવારણ કેન્દ્ર)
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Direct grievances, issues, and inquiries submitted by job seekers and website users.
              </p>
            </div>

            <button
              onClick={fetchComplaints}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingComplaints ? 'animate-spin' : ''}`} />
              <span>Refresh Complaints</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Complaints</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{complaintsList.length}</div>
            </div>
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-left">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">Pending Investigation</div>
              <div className="text-2xl font-black text-amber-900 mt-1">
                {complaintsList.filter(c => c.status === 'Pending').length}
              </div>
            </div>
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-left">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Resolved / Closed</div>
              <div className="text-2xl font-black text-emerald-900 mt-1">
                {complaintsList.filter(c => c.status === 'Resolved').length}
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {['all', 'Pending', 'In Progress', 'Resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setComplaintFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer capitalize ${
                    complaintFilter === st
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Issues' : st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, phone, ticket ID..."
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Complaints Cards List */}
          {complaintsList.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-bold">
              No user complaints recorded. All candidate issues are resolved!
            </div>
          ) : (
            <div className="space-y-4">
              {complaintsList
                .filter(c => {
                  if (complaintFilter !== 'all' && c.status !== complaintFilter) return false;
                  if (complaintSearch.trim()) {
                    const q = complaintSearch.toLowerCase();
                    return (
                      c.fullName?.toLowerCase().includes(q) ||
                      c.ticketId?.toLowerCase().includes(q) ||
                      c.mobileNumber?.includes(q) ||
                      c.subject?.toLowerCase().includes(q) ||
                      c.message?.toLowerCase().includes(q)
                    );
                  }
                  return true;
                })
                .map(comp => (
                  <div 
                    key={comp._id || comp.ticketId}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition space-y-3 bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-black bg-slate-100 px-2 py-0.5 rounded-lg text-slate-800">
                          {comp.ticketId}
                        </span>
                        <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                          comp.status === 'Resolved' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : comp.status === 'In Progress' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          ● {comp.status}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {comp.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(comp.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          onClick={() => handleDeleteComplaint(comp._id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                          title="Delete Complaint Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900">{comp.subject}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                        {comp.message}
                      </p>
                    </div>

                    {/* Candidate Contact Info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                      <div className="flex items-center space-x-3 text-slate-600 font-medium">
                        <span>👤 <strong>{comp.fullName}</strong></span>
                        <span>✉️ {comp.email}</span>
                        <span>📱 {comp.mobileNumber}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Direct WhatsApp Chat */}
                        <a
                          href={`https://wa.me/91${comp.mobileNumber.replace(/\D/g, '')}?text=Namaste%20${encodeURIComponent(comp.fullName)},%20regarding%20your%20Jobopedia%20Ticket%20${comp.ticketId}:`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer shadow-2xs"
                        >
                          <span>💬 Chat on WhatsApp</span>
                        </a>

                        {/* Status Change Buttons */}
                        {comp.status !== 'In Progress' && (
                          <button
                            onClick={() => handleUpdateComplaint(comp._id, 'In Progress', comp.adminReply)}
                            className="px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-[11px] font-bold transition cursor-pointer border border-blue-200"
                          >
                            Mark In Progress
                          </button>
                        )}
                        {comp.status !== 'Resolved' && (
                          <button
                            onClick={() => handleUpdateComplaint(comp._id, 'Resolved', comp.adminReply)}
                            className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-[11px] font-bold transition cursor-pointer border border-emerald-200"
                          >
                            ✓ Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Admin Reply Section */}
                    <div className="pt-2 border-t border-slate-100 flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={comp.adminReply ? `Reply: ${comp.adminReply}` : "Type admin resolution notes or reply for this ticket..."}
                        value={replyTextMap[comp._id] !== undefined ? replyTextMap[comp._id] : (comp.adminReply || '')}
                        onChange={(e) => setReplyTextMap({ ...replyTextMap, [comp._id]: e.target.value })}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleUpdateComplaint(comp._id, comp.status, replyTextMap[comp._id] || comp.adminReply)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold transition cursor-pointer shrink-0"
                      >
                        Save Reply
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
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
