import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, GraduationCap, Briefcase, 
  Bookmark, CheckCircle2, Award, Clock, ArrowRight, 
  Sparkles, FileText, Settings, ShieldCheck, ExternalLink, 
  Building2, Landmark, RefreshCw, Edit3, Trash2, Check,
  Search, Bell, AlertCircle, ChevronRight, Calendar, MessageSquare, Send, LogOut, Share2
} from 'lucide-react';
import WeeklyGovtJobCalendar from '../components/WeeklyGovtJobCalendar';
import JobDetailsModal from '../components/JobDetailsModal';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';

export default function UserDashboard({ user, setUser, setCurrentView, openResumeModal, onSelectJob, onLogout }) {
  const [activeTab, setActiveTab] = useState('recommended');
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_saved_jobs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    mobileNumber: user?.mobileNumber || '',
    qualification: user?.qualification || 'Graduate (Any Discipline)',
    state: user?.state || 'Gujarat',
    targetRole: user?.targetRole || 'Government & Corporate Careers'
  });
  const [saveStatus, setSaveStatus] = useState({ loading: false, msg: '', error: '' });

  // Grievance / Complaint submission state
  const [complaintForm, setComplaintForm] = useState({
    subject: '',
    category: 'Job Application Issue',
    message: ''
  });
  const [complaintSuccess, setComplaintSuccess] = useState(null);
  const [complaintSubmitting, setComplaintSubmitting] = useState(false);
  const [myComplaints, setMyComplaints] = useState([]);

  useEffect(() => {
    fetch('/api/complaints')
      .then(r => r.json())
      .then(d => {
        if (d.success && Array.isArray(d.complaints)) {
          if (user?.email || user?.mobileNumber) {
            setMyComplaints(d.complaints.filter(c => 
              (user.email && c.email === user.email) ||
              (user.mobileNumber && c.mobileNumber === user.mobileNumber)
            ));
          } else {
            setMyComplaints(d.complaints);
          }
        }
      })
      .catch(() => {});
  }, [user]);

  const handleShareJob = (e, job) => {
    e.stopPropagation();
    const jobId = job.slug || job._id || job.id;
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/?job=${encodeURIComponent(jobId)}`
      : `https://jobopedia.in/?job=${encodeURIComponent(jobId)}`;

    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `🏛️ *${job.title}*\n🏢 ${job.organization || job.company || job.department || 'Job Vacancy'}\n💰 Salary: ${job.salary || 'Best in Industry'}\n📅 Last Date: ${job.lastDate || 'Closing Soon'}\n\n👉 Apply here:\n${shareUrl}`,
        url: shareUrl
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert(`✅ Job Share Link Copied!\n\n${shareUrl}\n\nSend this link to anyone to directly open this job.`);
    }
  };

  const handleUserSubmitComplaint = async (e) => {
    e.preventDefault();
    setComplaintSubmitting(true);
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: user?.fullName || 'Candidate',
          email: user?.email || 'candidate@jobopedia.in',
          mobileNumber: user?.mobileNumber || '9999999999',
          category: complaintForm.category,
          subject: complaintForm.subject,
          message: complaintForm.message,
          userId: user?.id || user?._id || null
        })
      });
      const data = await res.json();
      if (data.success) {
        setComplaintSuccess(data);
        setComplaintForm({ subject: '', category: 'Job Application Issue', message: '' });
        fetch('/api/complaints')
          .then(r => r.json())
          .then(d => {
            if (d.success && Array.isArray(d.complaints)) {
              setMyComplaints(d.complaints.filter(c => 
                (user?.email && c.email === user.email) ||
                (user?.mobileNumber && c.mobileNumber === user.mobileNumber)
              ));
            }
          });
      } else {
        alert(data.error || 'Failed to submit complaint');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setComplaintSubmitting(false);
    }
  };

  // Mock Test History (stored in localStorage or simulated)
  const [mockHistory, setMockHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_mock_scores');
      return stored ? JSON.parse(stored) : [
        { id: 1, title: 'UPSC Prelims GS Paper 1 Mini Mock', score: '18/20', accuracy: '90%', date: '24 Oct 2026', status: 'Passed' },
        { id: 2, title: 'SSC CGL General Awareness & Reasoning', score: '17/20', accuracy: '85%', date: '22 Oct 2026', status: 'Passed' },
        { id: 3, title: 'TCS NQT Cognitive Aptitude Diagnostic', score: '16/20', accuracy: '80%', date: '20 Oct 2026', status: 'Passed' }
      ];
    } catch {
      return [];
    }
  });

  // Fetch Recommended Jobs
  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else if (Array.isArray(data)) {
          setJobs(data);
        }
        setLoadingJobs(false);
      })
      .catch(err => {
        console.error('Fetch jobs error in dashboard:', err);
        setLoadingJobs(false);
      });
  }, []);

  const handleToggleSaveJob = (job) => {
    const isAlreadySaved = savedJobs.some(j => (j._id || j.id) === (job._id || job.id));
    let updated;
    if (isAlreadySaved) {
      updated = savedJobs.filter(j => (j._id || j.id) !== (job._id || job.id));
    } else {
      updated = [...savedJobs, { ...job, appliedAt: new Date().toLocaleDateString('en-IN') }];
    }
    setSavedJobs(updated);
    localStorage.setItem('jobopedia_saved_jobs', JSON.stringify(updated));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaveStatus({ loading: true, msg: '', error: '' });

    try {
      const token = localStorage.getItem('jobopedia_token');
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...user, ...data.user };
        setUser(updatedUser);
        localStorage.setItem('jobopedia_user', JSON.stringify(updatedUser));
        setSaveStatus({ loading: false, msg: 'Profile updated successfully!', error: '' });
        setIsEditingProfile(false);
      } else {
        setSaveStatus({ loading: false, msg: '', error: data.error || 'Failed to update' });
      }
    } catch (err) {
      // Local fallback
      const updatedUser = { ...user, ...profileForm };
      setUser(updatedUser);
      localStorage.setItem('jobopedia_user', JSON.stringify(updatedUser));
      setSaveStatus({ loading: false, msg: 'Profile saved locally!', error: '' });
      setIsEditingProfile(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Card / Profile Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 border-2 border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-lg">
                {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {user?.fullName || 'Candidate Profile'}
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </span>
                  {user?.role === 'ADMIN' && (
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full">
                      👑 Admin
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    {user?.email || 'user@example.com'}
                  </span>
                  {user?.mobileNumber && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      {user?.mobileNumber}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    {user?.qualification || 'Graduate'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {user?.state || 'Gujarat, India'}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              <button
                onClick={openResumeModal}
                className="px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl text-xs font-black text-white shadow-md transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-100" />
                <span className="hidden sm:inline">Open ATS Resume Builder</span>
                <span className="sm:hidden">Resume</span>
              </button>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 border border-rose-500 rounded-xl text-xs font-black text-white shadow-md transition flex items-center space-x-1.5 cursor-pointer"
                  title="Logout from Account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Inline Profile Edit Form Drawer */}
          {isEditingProfile && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-sm font-bold text-amber-300 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Update Profile &amp; Job Match Preferences
              </h3>
              <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-800">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={e => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={profileForm.mobileNumber}
                    onChange={e => setProfileForm({ ...profileForm, mobileNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Highest Qualification (A to Z)</label>
                  <select
                    value={profileForm.qualification}
                    onChange={e => setProfileForm({ ...profileForm, qualification: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {ALL_QUALIFICATIONS.map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Home State (All States &amp; UTs)</label>
                  <select
                    value={profileForm.state}
                    onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {ALL_INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-end space-x-3 pt-2">
                  {saveStatus.msg && <span className="text-xs font-bold text-emerald-400">{saveStatus.msg}</span>}
                  {saveStatus.error && <span className="text-xs font-bold text-rose-400">{saveStatus.error}</span>}
                  <button
                    type="submit"
                    disabled={saveStatus.loading}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer"
                  >
                    {saveStatus.loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{savedJobs.length}</div>
              <div className="text-xs font-bold text-slate-500">Saved Vacancies</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{mockHistory.length}</div>
              <div className="text-xs font-bold text-slate-500">Mock Tests Attempted</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">85%</div>
              <div className="text-xs font-bold text-slate-500">Average Accuracy</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">Active</div>
              <div className="text-xs font-bold text-slate-500">ATS Resume Status</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-3 overflow-x-auto pb-1 scrollbar-none text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`pb-3 px-4 transition cursor-pointer flex items-center space-x-2 border-b-2 ${
              activeTab === 'recommended'
                ? 'border-blue-600 text-blue-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Recommended For You ({jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-4 transition cursor-pointer flex items-center space-x-2 border-b-2 ${
              activeTab === 'saved'
                ? 'border-blue-600 text-blue-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4 text-blue-500" />
            <span>My Saved Vacancies ({savedJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('mock-tests')}
            className={`pb-3 px-4 transition cursor-pointer flex items-center space-x-2 border-b-2 ${
              activeTab === 'mock-tests'
                ? 'border-blue-600 text-blue-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-500" />
            <span>MCQ Tests &amp; Scorecards</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-3 px-4 transition cursor-pointer flex items-center space-x-2 border-b-2 ${
              activeTab === 'resume'
                ? 'border-blue-600 text-blue-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-500" />
            <span>ATS Resume &amp; Documents</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`pb-3 px-4 transition cursor-pointer flex items-center space-x-2 border-b-2 ${
              activeTab === 'calendar'
                ? 'border-blue-600 text-blue-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>Weekly Govt Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`pb-3 px-4 transition cursor-pointer flex items-center space-x-2 border-b-2 ${
              activeTab === 'complaints'
                ? 'border-rose-600 text-rose-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-rose-500" />
            <span>Help Desk &amp; Grievances (ફરિયાદ)</span>
          </button>
        </div>

        {/* Tab 1: Recommended Jobs */}
        {activeTab === 'recommended' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Targeted Jobs Matching: <span className="text-blue-600">{user?.qualification || 'All Degrees'}</span>
                </h2>
                <p className="text-xs text-slate-500">Live verified openings from Government Bodies &amp; Leading Companies</p>
              </div>
              <button
                onClick={() => setCurrentView('govt')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Jobs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loadingJobs ? (
              <div className="bg-white rounded-2xl p-10 text-center text-slate-500 font-bold border border-slate-200">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                Loading matching jobs from database...
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-slate-500 border border-slate-200">
                No active jobs found right now. Check back soon!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.slice(0, 8).map((job) => {
                  const jobId = job._id || job.id;
                  const isSaved = savedJobs.some(j => (j._id || j.id) === jobId);
                  const isGovt = job.sector === 'GOVERNMENT' || job.category === 'govt' || !job.sector;

                  return (
                    <div 
                      key={jobId}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-3 relative flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                              isGovt ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {isGovt ? <Landmark className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                                {job.organization || job.company || 'Job Vacancy'}
                              </div>
                              <h3 className="font-extrabold text-slate-900 text-sm line-clamp-1">
                                {job.title}
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleSaveJob(job)}
                            className={`p-2 rounded-xl border transition cursor-pointer ${
                              isSaved 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-blue-600'
                            }`}
                            title={isSaved ? "Saved" : "Save Job"}
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-semibold pt-1">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {job.location || 'India'}
                          </span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <GraduationCap className="w-3 h-3 text-slate-400" />
                            {job.qualification || 'Graduate'}
                          </span>
                          {job.vacancies && (
                            <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                              {job.vacancies} Posts
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="text-[11px] text-slate-500">
                          Last Date: <span className="font-bold text-rose-600">{job.lastDate || 'Apply Soon'}</span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleShareJob(e, job)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                            title="Share this Job Direct Link"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectJob) onSelectJob(job);
                              else setSelectedJobModal(job);
                            }}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-xs cursor-pointer"
                          >
                            <span>View Details &amp; Apply</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved / Tracked Vacancies */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">My Saved &amp; Tracked Vacancies</h2>
                <p className="text-xs text-slate-500">Keep track of upcoming deadlines and application forms</p>
              </div>
            </div>

            {savedJobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">You haven't bookmarked any jobs yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Click the bookmark icon on any Government or Private job listing to save it here for fast access.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('recommended')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer"
                >
                  Explore Vacancies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedJobs.map((job) => {
                  const jobId = job._id || job.id;
                  return (
                    <div key={jobId} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase">
                            {job.organization || job.company}
                          </div>
                          <h3 className="font-extrabold text-slate-900 text-sm">{job.title}</h3>
                        </div>
                        <button
                          onClick={() => handleToggleSaveJob(job)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-slate-600">
                        Saved on: <span className="font-semibold text-slate-800">{job.appliedAt || 'Recently'}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-rose-600">Deadline: {job.lastDate || 'Ongoing'}</span>
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleShareJob(e, job)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                            title="Share this Job Direct Link"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectJob) onSelectJob(job);
                              else setSelectedJobModal(job);
                            }}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                          >
                            <span>View Official Details</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Mock Tests & MCQs */}
        {activeTab === 'mock-tests' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Candidate Mock Test Performance</h2>
                <p className="text-xs text-slate-500">Track your diagnostic test accuracy and competitive rankings</p>
              </div>
              <button
                onClick={() => setCurrentView('mock-tests')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black transition shadow flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Take Live Mock Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
              <div className="min-w-[480px]">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 grid grid-cols-12">
                  <div className="col-span-6">Test Paper &amp; Subject</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-2 text-center">Accuracy</div>
                  <div className="col-span-2 text-right">Attempt Date</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {mockHistory.map((test) => (
                    <div key={test.id} className="p-4 grid grid-cols-12 items-center text-xs">
                      <div className="col-span-6 font-bold text-slate-900 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="truncate">{test.title}</span>
                      </div>
                      <div className="col-span-2 text-center font-black text-blue-600">{test.score}</div>
                      <div className="col-span-2 text-center font-bold text-emerald-600">{test.accuracy}</div>
                      <div className="col-span-2 text-right text-slate-400 font-medium">{test.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-extrabold text-blue-950 text-sm">Need Daily Topic-Wise Practice?</h4>
                <p className="text-xs text-blue-800">Practice 10 Daily MCQs for UPSC Prelims, SSC General Studies, GPSC &amp; Reasoning.</p>
              </div>
              <button
                onClick={() => setCurrentView('mock-tests')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer shrink-0"
              >
                Start Practice MCQs
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: ATS Resume & Documents */}
        {activeTab === 'resume' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Free ATS-Compliant Resume</h2>
              <p className="text-xs text-slate-500">Formatted to pass Applicant Tracking Systems of MNCs and Corporate Recruiters</p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black shrink-0 border border-amber-200">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {user?.fullName ? `${user.fullName}_Resume.pdf` : 'Candidate_ATS_Resume.pdf'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                    <span className="text-emerald-600 font-bold">● Ready for Download</span>
                    <span>• Clean 1-Page Format</span>
                    <span>• Tailored for {user?.qualification || 'Graduate'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={openResumeModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Edit in ATS Resume Builder</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Weekly Govt Job Calendar (Auto Synced with MongoDB) */}
        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <WeeklyGovtJobCalendar onSelectJob={onSelectJob} />
          </div>
        )}

        {/* Tab 6: Grievance Redressal & Complaints */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            
            {/* Header Card */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-6 border border-rose-200">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-2xl bg-rose-600 text-white shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Candidate Grievance &amp; Help Desk (ફરિયાદ નિવારણ)
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    If you face any problem in job application, expired link, or need technical help, write here. Your ticket goes directly to Dhaval Admin Panel.
                  </p>
                </div>
              </div>
            </div>

            {/* Submission Form & Ticket History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Form */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <span>📝</span>
                  <span>Submit a New Complaint / Issue</span>
                </h4>

                {complaintSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                    <div className="flex items-center space-x-2 text-emerald-800 font-black text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{complaintSuccess.message}</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-700">
                      Ticket ID: <strong>{complaintSuccess.ticketId}</strong>
                    </div>
                  </div>
                )}

                <form onSubmit={handleUserSubmitComplaint} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Issue Category *</label>
                    <select
                      value={complaintForm.category}
                      onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Job Application Issue">Job Application Issue</option>
                      <option value="Fake or Expired Job Report">Fake / Expired Job Report</option>
                      <option value="MCQ / Test Question Error">MCQ / CBT Test Error</option>
                      <option value="Website Technical Problem">Website Technical Problem</option>
                      <option value="Account / Login Assistance">Account / Login Issue</option>
                      <option value="Suggestion / Feedback">Suggestion / Feedback</option>
                      <option value="Other Complaint">Other Complaint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subject (વિષય) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apply button redirect issue on GPSC job"
                      value={complaintForm.subject}
                      onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Detailed Description (વિગતવાર સમજાવો) *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Explain your problem clearly..."
                      value={complaintForm.message}
                      onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={complaintSubmitting}
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{complaintSubmitting ? 'Submitting...' : 'Send Complaint to Admin'}</span>
                  </button>
                </form>
              </div>

              {/* My Submitted Complaints List */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span>📋</span>
                    <span>My Complaint Tickets</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {myComplaints.length} Total
                  </span>
                </h4>

                {myComplaints.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs font-semibold">
                    You have not submitted any complaints yet.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {myComplaints.map(ticket => (
                      <div key={ticket._id || ticket.ticketId} className="p-3.5 rounded-2xl border border-slate-200 space-y-2 bg-slate-50/50">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-black bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                            {ticket.ticketId}
                          </span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                            ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            ● {ticket.status}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900">{ticket.subject}</div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{ticket.message}</p>
                        {ticket.adminReply && (
                          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] space-y-0.5">
                            <span className="font-bold text-blue-900">Admin Resolution:</span>
                            <p className="text-blue-800">{ticket.adminReply}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Official Job Details Modal */}
      <JobDetailsModal
        job={selectedJobModal}
        isOpen={Boolean(selectedJobModal)}
        onClose={() => setSelectedJobModal(null)}
      />

    </div>
  );
}
