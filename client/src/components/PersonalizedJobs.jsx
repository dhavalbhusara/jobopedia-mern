import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, GraduationCap, IndianRupee, Landmark, 
  Building2, Briefcase, ExternalLink, ArrowRight, ShieldCheck, 
  CheckCircle2, Sparkles, Filter, Share2 
} from 'lucide-react';
import JobDetailsModal from './JobDetailsModal';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';

export default function PersonalizedJobs({ externalSearch = '', onStartMockTest, onSelectJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all'); // all, govt, private, internship

  // Logged-in User Preferences
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [selectedState, setSelectedState] = useState(loggedInUser?.state || 'all');
  const [qualification, setQualification] = useState(loggedInUser?.qualification || 'all');
  const [searchQuery, setSearchQuery] = useState(externalSearch);
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);

  useEffect(() => {
    if (externalSearch !== undefined) {
      setSearchQuery(externalSearch);
    }
  }, [externalSearch]);

  useEffect(() => {
    fetchJobs();
  }, [category, selectedState, qualification, searchQuery]);

  const fetchJobs = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (selectedState !== 'all') params.set('state', selectedState);
    if (qualification !== 'all') params.set('qualification', qualification);
    if (searchQuery) params.set('search', searchQuery);

    fetch(`/api/jobs?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else if (Array.isArray(data)) {
          setJobs(data);
        }
      })
      .catch(err => console.error("Error loading jobs:", err))
      .finally(() => setLoading(false));
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
        text: `🏛️ *${job.title}*\n🏢 ${job.department || job.organization}\n💰 Salary: ${job.salary}\n📅 Last Date: ${job.lastDate}\n\n👉 Apply here:\n${shareUrl}`,
        url: shareUrl
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert(`✅ Share Link Copied for "${job.title}"!\n\n${shareUrl}\n\nAnyone clicking this link will directly open this job.`);
    }
  };

  // Client-side smart suggestion filtering logic
  const filteredJobs = jobs.filter(job => {
    const isGovt = job.category === 'govt' || job.sector === 'GOVERNMENT';
    const isIntern = job.category === 'internship';
    const isPrivate = !isGovt && !isIntern;

    // RULE 1: Government jobs are shown across India to everyone!
    if (isGovt) {
      return true;
    }

    // RULE 2: Private jobs filter strictly by user's qualification and state
    if (isPrivate) {
      if (selectedState && selectedState !== 'all') {
        if (job.state && job.state !== selectedState && job.state !== 'All India' && job.state !== 'Central') {
          return false;
        }
      }
      if (qualification && qualification !== 'all') {
        const qStr = (job.qualification || '').toLowerCase();
        const userQ = qualification.toLowerCase();
        if (!qStr.includes(userQ) && !userQ.includes(qStr)) {
          // If neither contains the other, check broad degree matching (e.g. B.Tech / Graduate)
          if (userQ.includes('graduate') && qStr.includes('graduate')) {
            // match
          } else if (userQ.includes('12th') && qStr.includes('12th')) {
            // match
          } else {
            return false;
          }
        }
      }
      return true;
    }

    // RULE 3: Internships filter strictly by qualification & degree
    if (isIntern) {
      if (qualification && qualification !== 'all') {
        const qStr = (job.qualification || '').toLowerCase();
        const userQ = qualification.toLowerCase();
        if (!qStr.includes(userQ) && !userQ.includes(qStr) && !qStr.includes('any')) {
          return false;
        }
      }
      return true;
    }

    return true;
  });

  return (
    <section id="jobs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            All-India Smart Career Gateway
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Targeted Jobs &amp; Paid Internships
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            🏛️ Central &amp; State Govt Jobs open to all • 🏢 Private Jobs matched to your state • 🎓 Internships matched to your degree.
          </p>
        </div>

        {loggedInUser && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-3 flex items-center space-x-3 shrink-0">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-500 block">Active Profile Suggestion:</span>
              <strong className="text-blue-900">{loggedInUser.state} • {loggedInUser.qualification}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Job Designation, Department, or Skill (e.g. UPSC, SSC, Banking, TCS, Full Stack)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category Tabs & Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          
          {/* Category Tabs (Clean flex-wrap, No Horizontal Scrollbar Bar) */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Opportunities' },
              { id: 'govt', label: '🏛️ Sarkari Jobs (All Open)' },
              { id: 'private', label: '🏢 Private & MNCs (State Matched)' },
              { id: 'internship', label: '🎓 Internships (Degree Matched)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  category === tab.id
                    ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* State & Qualification Selectors (Comprehensive Lists) */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              <option value="all">📍 All States / National</option>
              {ALL_INDIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer max-w-[220px] truncate"
            >
              <option value="all">🎓 Any Qualification (A to Z)</option>
              {ALL_QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-500">
          Loading matching opportunities from verified databases...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-2">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching jobs found in this category</h3>
          <p className="text-xs text-slate-500">Try changing your state preference or clearing qualification filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => {
            const isGovt = job.category === 'govt' || job.sector === 'GOVERNMENT';
            const isIntern = job.category === 'internship';

            return (
              <div
                key={job._id || job.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group hover:border-blue-400"
              >
                <div className="space-y-3">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md flex items-center space-x-1 ${
                      isGovt ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      isIntern ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {isGovt ? <Landmark className="w-3 h-3" /> : isIntern ? <GraduationCap className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                      <span>{isGovt ? 'Sarkari Job' : isIntern ? 'Paid Internship' : 'Corporate MNC'}</span>
                    </span>

                    {job.isNewJob && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                        ⚡ New
                      </span>
                    )}
                  </div>

                  {/* Title & Dept */}
                  <div>
                    <h3 
                      onClick={() => {
                        if (onSelectJob) onSelectJob(job);
                        else setSelectedJobForModal(job);
                      }}
                      className="text-base font-black text-slate-900 group-hover:text-blue-600 transition leading-snug cursor-pointer line-clamp-2"
                    >
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {job.department || job.organization || job.company}
                    </p>
                  </div>

                  {/* Details Pill Box */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center space-x-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.state || 'All India'}</span>
                      </span>
                      <span className="font-bold text-slate-800 text-[11px]">{job.vacancies || 'Open'} Vacancies</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-emerald-700 font-extrabold text-xs pt-1 border-t border-slate-200/60">
                      <IndianRupee className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{job.salary || 'Govt Pay Scale'}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium truncate">
                      🎓 {job.qualification || 'Graduate'}
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Actions: REDIRECTS TO FULL JOB DETAILS PAGE (NO WHATSAPP!) */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold text-slate-400">
                    Till: {job.lastDate || 'Closing Soon'}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleShareJob(e, job)}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                      title="Share this Job Direct Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (onSelectJob) onSelectJob(job);
                        else setSelectedJobForModal(job);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-sm cursor-pointer"
                    >
                      <span>View &amp; Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Official Job Details Modal */}
      <JobDetailsModal
        job={selectedJobForModal}
        isOpen={Boolean(selectedJobForModal)}
        onClose={() => setSelectedJobForModal(null)}
        onStartMockTest={onStartMockTest}
      />

    </section>
  );
}
