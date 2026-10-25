import React, { useState, useEffect } from 'react';
import { Search, MapPin, GraduationCap, IndianRupee, Landmark, Building2, Briefcase, ExternalLink, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { ALL_STATES, QUALIFICATION_CATEGORIES } from '../constants/masterData';

export default function PersonalizedJobs({ externalSearch = '', user, onSelectJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [selectedState, setSelectedState] = useState(user?.state || 'all');
  const [qualification, setQualification] = useState(user?.qualification || 'all');
  const [searchQuery, setSearchQuery] = useState(externalSearch);

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
        if (data.success) {
          setJobs(data.jobs);
        }
      })
      .catch(err => console.error("Error loading jobs:", err))
      .finally(() => setLoading(false));
  };

  // Rule implemented:
  // - Private Jobs: suggested only if matching user's state & qualification
  // - Govt Jobs: shown across all states, with matching ones highlighted
  // - Internships: filtered according to degree/qualification
  const isMatchUserPreference = (job) => {
    if (!user) return false;
    const qualMatch = !user.qualification || 
      (job.qualification && job.qualification.toLowerCase().includes(user.qualification.toLowerCase())) ||
      (user.qualification.toLowerCase().includes('graduate') && job.qualification?.toLowerCase().includes('graduate'));
    return qualMatch;
  };

  return (
    <section id="jobs-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Personalized Career Directory
            </span>
            {user && (
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tailored for: {user.qualification || 'Graduate'} ({user.state || 'India'})</span>
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            Targeted Jobs &amp; Paid Internships
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Central &amp; State Government jobs are displayed for all candidates, while Private MNC jobs &amp; Internships filter according to your qualification &amp; state.
          </p>
        </div>
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
            placeholder="Search by Job Designation, Department, or Skill (e.g. UPSC, SSC, Banking, Software Engineer)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
          />
        </div>

        {/* Category Tabs & Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Opportunities' },
              { id: 'govt', label: '🏛️ Sarkari Govt Jobs (All India)' },
              { id: 'private', label: '🏢 Private MNC Careers' },
              { id: 'internship', label: '🎓 Paid Internships' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  category === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* State & Qualification Selectors (A to Z Master Lists) */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              <option value="all">📍 All States (National)</option>
              {ALL_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer max-w-[220px] truncate"
            >
              <option value="all">🎓 Any Qualification / Degree</option>
              {QUALIFICATION_CATEGORIES.map(cat => (
                <optgroup key={cat.category} label={cat.category}>
                  {cat.degrees.map(deg => (
                    <option key={deg} value={deg}>{deg}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-500">
          Loading matching opportunities from database...
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-2">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching jobs found in this category</h3>
          <p className="text-xs text-slate-500">Try changing your state preference or clearing filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => {
            const isGovt = job.category === 'govt' || job.sector === 'GOVERNMENT';
            const isIntern = job.category === 'internship';
            const isMatched = isMatchUserPreference(job);

            return (
              <div
                key={job._id || job.id}
                className={`bg-white rounded-3xl p-5 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group ${
                  isMatched ? 'border-emerald-400/80 ring-1 ring-emerald-400/20' : 'border-slate-200 hover:border-slate-300'
                }`}
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
                      <span>{isGovt ? 'Sarkari Job' : isIntern ? 'Paid Internship' : 'Corporate'}</span>
                    </span>

                    {isMatched && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Degree Match</span>
                      </span>
                    )}

                    {job.isNewJob && !isMatched && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                        ⚡ New
                      </span>
                    )}
                  </div>

                  {/* Title & Dept */}
                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {job.department || job.company}
                    </p>
                  </div>

                  {/* Details Pill Box */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center space-x-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.state}</span>
                      </span>
                      <span className="font-bold text-slate-800 text-[11px]">{job.vacancies} Vacancies</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-emerald-700 font-extrabold text-xs pt-1 border-t border-slate-200/60">
                      <IndianRupee className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{job.salary}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium truncate">
                      🎓 {job.qualification}
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Actions: View Details & Official Apply (NO WhatsApp!) */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold text-slate-400">
                    Till: {job.lastDate}
                  </span>

                  <button
                    onClick={() => {
                      if (onSelectJob) {
                        onSelectJob(job);
                      } else {
                        window.open(job.applyUrl || 'https://ojas.gujarat.gov.in', '_blank');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-sm cursor-pointer"
                  >
                    <span>Apply &amp; Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
