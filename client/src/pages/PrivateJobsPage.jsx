import React, { useState, useEffect } from 'react';
import { Building2, MapPin, GraduationCap, Calendar, ArrowRight, ExternalLink, Search, Filter, ArrowLeft, Briefcase, Sparkles } from 'lucide-react';
import JobDetailsModal from '../components/JobDetailsModal';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';

export default function PrivateJobsPage({ setCurrentView, onSelectJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [qualFilter, setQualFilter] = useState('all');
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  const samplePrivateJobs = [
    {
      id: 'p-1',
      title: 'TCS National Qualifier Test (NQT) — Ninja & Digital Software Engineer',
      department: 'Tata Consultancy Services (TCS)',
      category: 'private',
      sector: 'PRIVATE',
      state: 'Gujarat',
      qualification: 'B.Tech / BCA / MCA / B.Sc IT',
      salary: '₹3,60,000 - ₹9,20,000 / year',
      vacancies: 40000,
      lastDate: '2026-11-28',
      description: 'Pan-India hiring test for fresh engineering and computer science graduates for full stack, cloud engineering, and data science roles.',
      applyUrl: 'https://learning.tcsionhub.in'
    },
    {
      id: 'p-2',
      title: 'Formulation & Analytical Development Scientist',
      department: 'Sun Pharmaceutical Industries Ltd.',
      category: 'private',
      sector: 'PRIVATE',
      state: 'Gujarat',
      qualification: 'B.Pharm / M.Pharm / M.Sc Chemistry',
      salary: '₹4,50,000 - ₹8,00,000 / year',
      vacancies: 45,
      lastDate: '2026-12-05',
      description: 'Solid dosage formulation development, HPLC/GC analysis, and validation protocols at Sun Pharma R&D centre, Vadodara.',
      applyUrl: 'https://sunpharma.com'
    },
    {
      id: 'p-3',
      title: 'Senior Cloud Systems Architect (AWS / Azure)',
      department: 'Wipro Digital Technologies',
      category: 'private',
      sector: 'PRIVATE',
      state: 'Maharashtra',
      qualification: 'B.Tech / MCA',
      salary: '₹14,00,000 - ₹22,00,000 / year',
      vacancies: 20,
      lastDate: '2026-12-10',
      description: 'Design multi-region cloud infrastructures, Docker containerization, Kubernetes orchestrations, and zero-trust security postures.',
      applyUrl: 'https://careers.wipro.com'
    },
    {
      id: 'p-4',
      title: 'Branch Credit Manager & Corporate Banking Associate',
      department: 'HDFC Bank Ltd.',
      category: 'private',
      sector: 'PRIVATE',
      state: 'Gujarat',
      qualification: 'Graduate / MBA / CA Inter',
      salary: '₹5,50,000 - ₹9,00,000 / year',
      vacancies: 80,
      lastDate: '2026-11-25',
      description: 'SME loan underwriting, working capital facility assessment, financial statement audits, and client portfolio relationship management.',
      applyUrl: 'https://hdfcbank.com/careers'
    },
    {
      id: 'p-5',
      title: 'Civil Construction Project Engineer',
      department: 'Larsen & Toubro (L&T Construction)',
      category: 'private',
      sector: 'PRIVATE',
      state: 'Gujarat',
      qualification: 'B.E. Civil / Diploma Civil',
      salary: '₹4,80,000 - ₹8,50,000 / year',
      vacancies: 60,
      lastDate: '2026-12-15',
      description: 'High-speed rail corridor execution, metro pier casting supervision, quality inspection, and contractor billing management in Surat & Ahmedabad.',
      applyUrl: 'https://lntecc.com'
    }
  ];

  useEffect(() => {
    fetchJobs();
  }, [stateFilter, qualFilter]);

  const fetchJobs = () => {
    setLoading(true);
    const params = new URLSearchParams({ category: 'private' });
    if (stateFilter !== 'all') params.set('state', stateFilter);
    if (qualFilter !== 'all') params.set('qualification', qualFilter);

    fetch(`/api/jobs?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else {
          setJobs(samplePrivateJobs);
        }
      })
      .catch(() => setJobs(samplePrivateJobs))
      .finally(() => setLoading(false));
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
        <span className="text-slate-800">પ્રાઇવેટ &amp; MNC જોબ્સ (Corporate Careers)</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#0F2942] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full">
            🏢 Top Corporate &amp; MNC Placements 2026
          </span>
          <span className="bg-white/10 text-emerald-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
            TCS • Infosys • Sun Pharma • L&amp;T • HDFC
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          પ્રાઇવેટ અને MNC કેરિયર પોર્ટલ (Private Jobs Hub)
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          ભારતની લીડિંગ આઇટી કંપનીઓ, ફાર્માસ્યુટિકલ પ્લાન્ટ્સ, બેન્કિંગ સેક્ટર અને એન્જિનિયરિંગ ક્ષેત્રની વેરિફાઇડ નોકરીઓ વાર્ષિક પેકેજ અને લાયકાત સાથે.
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
              placeholder="Search by role, company (e.g. TCS, Software Engineer, Sun Pharma, HDFC)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <select 
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-semibold text-slate-700"
            >
              <option value="all">All States</option>
              <option value="Gujarat">📍 Gujarat (Ahmedabad, Vadodara, Surat)</option>
              <option value="Maharashtra">📍 Maharashtra (Mumbai, Pune)</option>
              <option value="Karnataka">📍 Karnataka (Bengaluru)</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select 
              value={qualFilter}
              onChange={(e) => setQualFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-semibold text-slate-700"
            >
              <option value="all">All Qualifications</option>
              <option value="Graduate">Any Graduate</option>
              <option value="B.Tech">B.E. / B.Tech / BCA / MCA</option>
              <option value="Pharma">B.Pharm / M.Pharm</option>
              <option value="MBA">B.Com / BBA / MBA</option>
            </select>
          </div>

        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map(job => (
          <div key={job.id || job._id} className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  🏢 {job.department || 'Corporate MNC'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  📍 {job.state || 'India'}
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {job.vacancies ? `${job.vacancies} Positions` : 'Actively Hiring'}
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
                  <span className="text-emerald-700 font-black">{job.salary || 'Competitive CTC'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.qualification || 'Graduate'}</span>
                </span>
                <span className="flex items-center space-x-1 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Apply Before: <strong>{job.lastDate || 'Rolling Admissions'}</strong></span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <button
                onClick={() => {
                  if (onSelectJob) onSelectJob(job);
                  else setSelectedJobModal(job);
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>View Details &amp; Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a 
                href={job.applyUrl || 'https://jobopedia.in'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer border border-slate-200"
              >
                <span>Direct Careers Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
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
