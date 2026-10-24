import React, { useState, useEffect } from 'react';
import { Search, MapPin, GraduationCap, IndianRupee, Landmark, Building2, Briefcase, ExternalLink, ArrowRight } from 'lucide-react';

export default function PersonalizedJobs({ externalSearch = '' }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [qualification, setQualification] = useState('all');
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

  const triggerCyberCafeHelp = (title) => {
    const text = encodeURIComponent(`Namaste Jobopedia Cyber Cafe Helpline,\n\nI want to apply for: *${title}*.\nPlease assist me in online application submission.`);
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section id="jobs-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            All-India Job Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Targeted Jobs &amp; Paid Internships
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Central Government jobs are shown across India, while Private jobs automatically filter by your chosen state.
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
            placeholder="Search by Job Designation, Department, or Skill (e.g. UPSC, SSC, Banking, Full Stack)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category Tabs & Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Vacancies' },
              { id: 'govt', label: '🏛️ Sarkari Jobs' },
              { id: 'private', label: '🏢 Private Jobs' },
              { id: 'internship', label: '🎓 Internships' },
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

          {/* State & Qualification Selectors */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">📍 All States (National)</option>
              <option value="Gujarat">Gujarat (Ahmedabad/Surat)</option>
              <option value="Maharashtra">Maharashtra (Pune/Mumbai)</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Karnataka">Karnataka (Bangalore)</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>

            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">🎓 Any Qualification</option>
              <option value="10th">10th Pass</option>
              <option value="12th">12th Pass</option>
              <option value="Graduate">Graduate (Any Degree)</option>
              <option value="B.Tech">B.Tech / Engineering</option>
              <option value="Nursing">Nursing / Pharmacy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-500">
          Loading matching opportunities...
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
            const isGovt = job.category === 'govt';
            const isIntern = job.category === 'internship';

            return (
              <div
                key={job._id || job.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group hover:border-slate-300"
              >
                <div className="space-y-3">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md flex items-center space-x-1 ${
                      isGovt ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      isIntern ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {isGovt ? <Landmark className="w-3 h-3" /> : isIntern ? <GraduationCap className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                      <span>{isGovt ? 'Sarkari Job' : isIntern ? 'Paid Internship' : 'Corporate'}</span>
                    </span>

                    {job.isNewJob && (
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
                      {job.department}
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

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold text-slate-400">
                    Till: {job.lastDate}
                  </span>

                  <button
                    onClick={() => triggerCyberCafeHelp(job.title)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-sm cursor-pointer"
                  >
                    <span>Apply Now</span>
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
