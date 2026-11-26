import React, { useState, useEffect } from 'react';
import { Landmark, MapPin, GraduationCap, Calendar, ArrowRight, ExternalLink, Search, Filter, ArrowLeft, ShieldCheck, Eye, Share2 } from 'lucide-react';
import JobDetailsModal from '../components/JobDetailsModal';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';
import initialJobsData from '../data/initialJobs.json';

export default function GovtJobsPage({ setCurrentView, onSelectJob }) {
  const initialGovt = Array.isArray(initialJobsData) ? initialJobsData.filter(j => j.category === 'govt' || j.category === 'government' || j.sector === 'GOVERNMENT') : [];
  const [jobs, setJobs] = useState(initialGovt);
  const [loading, setLoading] = useState(initialGovt.length === 0);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [qualFilter, setQualFilter] = useState('all');
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [stateFilter, qualFilter]);

  const fetchJobs = () => {
    setLoading(jobs.length === 0);
    const params = new URLSearchParams({ category: 'govt' });
    if (stateFilter !== 'all') params.set('state', stateFilter);
    if (qualFilter !== 'all') params.set('qualification', qualFilter);

    fetch(`/api/jobs?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else if (jobs.length === 0) {
          // If state/qual filter matched nothing from API, fallback to client-filtered initialGovt
          const filteredFallback = initialGovt.filter(j => {
            if (stateFilter !== 'all' && j.state && j.state !== stateFilter && j.state !== 'Central' && j.state !== 'All India') return false;
            if (qualFilter !== 'all' && j.qualification && !j.qualification.toLowerCase().includes(qualFilter.toLowerCase())) return false;
            return true;
          });
          setJobs(filteredFallback);
        }
      })
      .catch(() => {
        fetch(`https://jobopedia-backend.onrender.com/api/jobs?${params.toString()}`)
          .then(r => r.json())
          .then(d => {
            if (d.success && Array.isArray(d.jobs) && d.jobs.length > 0) setJobs(d.jobs);
          })
          .catch(() => {});
      })
      .finally(() => setLoading(false));
  };

  const triggerHelpDesk = (jobTitle) => {
    const text = encodeURIComponent(`Namaste Jobopedia Help Desk,\n\nI want assistance applying for Government Job: *${jobTitle}*.\nPlease guide me.`);
    window.open(`https://wa.me/918487944035?text=${text}`, "_blank");
  };

  const handleShareJob = (e, job) => {
    e.stopPropagation();
    const jobId = job.slug || job._id || job.id;
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/?job=${encodeURIComponent(jobId)}`
      : `https://jobopedia.in/?job=${encodeURIComponent(jobId)}`;

    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `🏛️ *${job.title}*\n🏢 ${job.department || 'Government Job'}\n💰 Salary: ${job.salary || 'Govt Pay Matrix'}\n📅 Last Date: ${job.lastDate || 'Closing Soon'}\n\n👉 Apply here:\n${shareUrl}`,
        url: shareUrl
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert(`✅ Job Share Link Copied!\n\n${shareUrl}\n\nSend this link to anyone to directly open this job.`);
    }
  };

  const filtered = jobs.filter(j => 
    !search || 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 flex items-center space-x-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800">Government Jobs (Central & State)</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0B1E33] via-[#0F2942] to-[#1E3A8A] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full">
            🏛️ 100% Official Sarkari Naukri Portal 2026
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Central &amp; State Recruitment</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          Government Jobs Portal & Recruitment Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          Official recruitment notifications, pay scale matrices, eligibility requirements, and direct application links across UPSC, SSC, Railways RRB, Banking, Defence, and State Services.
        </p>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, department (e.g. UPSC, GPSC, Police, Clerk)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <select 
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white font-semibold text-slate-700"
            >
              <option value="all">All States &amp; Central</option>
              <option value="Central">🏛️ All India (Central)</option>
              <option value="Gujarat">📍 Gujarat</option>
              <option value="Maharashtra">📍 Maharashtra</option>
              <option value="Rajasthan">📍 Rajasthan</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select 
              value={qualFilter}
              onChange={(e) => setQualFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white font-semibold text-slate-700"
            >
              <option value="all">All Qualifications</option>
              <option value="10th Pass">10th Pass</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Graduate">Any Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
              <option value="Engineering">B.E. / B.Tech</option>
            </select>
          </div>

        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map(job => (
          <div key={job.id || job._id} className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  🏛️ {job.department || 'Central / State Govt'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  📍 {job.state || 'All India'}
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {job.vacancies ? `${job.vacancies} Vacancies` : 'Active Vacancy'}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {job.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-3 text-xs text-slate-600 font-semibold pt-1">
                <span className="flex items-center space-x-1">
                  <span>💰</span>
                  <span className="text-emerald-700 font-black">{job.salary || 'Govt Pay Matrix'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.qualification || 'Graduate'}</span>
                </span>
                <span className="flex items-center space-x-1 text-red-600">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Last Date: <strong>{job.lastDate || 'Closing Soon'}</strong></span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <button
                onClick={() => {
                  if (onSelectJob) onSelectJob(job);
                  else setSelectedJobModal(job);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>View Full Details &amp; Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleShareJob(e, job)}
                  className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer flex-1"
                  title="Share this Job Direct Link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                <a 
                  href={job.applyUrl || 'https://jobopedia.in'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer border border-slate-200 flex-1"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <JobDetailsModal 
        job={selectedJobModal}
        isOpen={Boolean(selectedJobModal)}
        onClose={() => setSelectedJobModal(null)}
      />

    </div>
  );
}
