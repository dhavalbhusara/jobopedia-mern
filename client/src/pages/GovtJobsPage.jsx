import React, { useState, useEffect } from 'react';
import { Landmark, MapPin, GraduationCap, Calendar, ArrowRight, ExternalLink, Search, Filter, ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import { ALL_STATES, QUALIFICATION_CATEGORIES } from '../constants/masterData';

export default function GovtJobsPage({ setCurrentView, onSelectJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [qualFilter, setQualFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, [stateFilter, qualFilter]);

  const fetchJobs = () => {
    setLoading(true);
    const params = new URLSearchParams({ category: 'govt' });
    if (stateFilter !== 'all') params.set('state', stateFilter);
    if (qualFilter !== 'all') params.set('qualification', qualFilter);

    fetch(`/api/jobs?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else {
          // Fallback sample govt jobs if database is empty
          setJobs([
            {
              id: 'g-1',
              title: 'UPSC Civil Services (IAS / IPS / IFS) Examination 2026',
              department: 'Union Public Service Commission (UPSC)',
              category: 'govt',
              sector: 'GOVERNMENT',
              state: 'Central',
              qualification: 'Graduate',
              salary: '₹56,100 - ₹2,50,000 / month (Level 10)',
              vacancies: 1056,
              lastDate: '2026-11-15',
              description: 'Recruitment for Indian Administrative Service, Indian Police Service, and Central Group A Services across 77 national test centres.',
              applyUrl: 'https://upsc.gov.in'
            },
            {
              id: 'g-2',
              title: 'GSSSB Combined Competitive Examination (CCE) Group A & B',
              department: 'Gujarat Secondary Service Selection Board',
              category: 'govt',
              sector: 'GOVERNMENT',
              state: 'Gujarat',
              qualification: 'Graduate',
              salary: '₹26,000 - ₹49,600 / month',
              vacancies: 5554,
              lastDate: '2026-11-20',
              description: 'Junior Clerk, Senior Clerk, Head Clerk, and Office Assistant posts across Gujarat districts.',
              applyUrl: 'https://ojas.gujarat.gov.in'
            },
            {
              id: 'g-3',
              title: 'Gujarat Police Constable & PSI Direct Recruitment 2026',
              department: 'Gujarat Police Recruitment Board (LRD)',
              category: 'govt',
              sector: 'GOVERNMENT',
              state: 'Gujarat',
              qualification: '12th Pass',
              salary: '₹26,000 Fixed Pay / month',
              vacancies: 12472,
              lastDate: '2026-11-25',
              description: 'Unarmed Constable, Armed Police, SRPF, and Jail Sepoy vacancies with physical efficiency tests.',
              applyUrl: 'https://lrdgujarat2021.in'
            },
            {
              id: 'g-4',
              title: 'SSC Combined Graduate Level (CGL) 2026',
              department: 'Staff Selection Commission (SSC)',
              category: 'govt',
              sector: 'GOVERNMENT',
              state: 'Central',
              qualification: 'Graduate',
              salary: '₹25,500 - ₹1,42,400 / month',
              vacancies: 17727,
              lastDate: '2026-11-18',
              description: 'Assistant Section Officer (ASO), Inspector of Income Tax, Central Excise, and Sub-Inspector in CBI.',
              applyUrl: 'https://ssc.gov.in'
            },
            {
              id: 'g-5',
              title: 'Railway RRB Non-Technical Popular Categories (NTPC)',
              department: 'Railway Recruitment Board (Indian Railways)',
              category: 'govt',
              sector: 'GOVERNMENT',
              state: 'Central',
              qualification: '12th Pass / Graduate',
              salary: '₹19,900 - ₹35,400 / month',
              vacancies: 11558,
              lastDate: '2026-11-30',
              description: 'Station Master, Goods Train Manager, Senior Commercial cum Ticket Clerk across 21 railway zones.',
              applyUrl: 'https://indianrailways.gov.in'
            }
          ]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const triggerCyberCafe = (jobTitle) => {
    const text = encodeURIComponent(`Namaste Jobopedia Cyber Cafe Helpline,\n\nI want assistance applying for Government Job: *${jobTitle}*.\nPlease guide me on WhatsApp.`);
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
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
        <span className="text-slate-800">સરકારી નોકરીઓ (Government Jobs)</span>
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
          સરકારી ભરતી પોર્ટલ (Government Jobs Hub)
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          UPSC, GPSC, GSSSB, ગુજરાત પોલીસ, રેલવે RRB, બેન્કિંગ અને SSC ના તમામ સત્તાવાર નોટિફિકેશન, પગાર ધોરણ (Salary), વયમર્યાદા અને ડાયરેક્ટ ઓનલાઈન ફોર્મ લિંક્સ.
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
              <option value="all">📍 All States &amp; Central</option>
              {ALL_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select 
              value={qualFilter}
              onChange={(e) => setQualFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white font-semibold text-slate-700"
            >
              <option value="all">🎓 All Qualifications</option>
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
                  else window.open(job.applyUrl || 'https://ojas.gujarat.gov.in', '_blank');
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={job.applyUrl || 'https://ojas.gujarat.gov.in'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Apply Official</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
