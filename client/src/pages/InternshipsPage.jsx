import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, IndianRupee, GraduationCap, Building2, ExternalLink, Search, Filter, ArrowLeft } from 'lucide-react';

export default function InternshipsPage({ setCurrentView }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState('ALL');
  const [search, setSearch] = useState('');

  const sampleInternships = [
    {
      id: 'int-1',
      title: 'Graduate Technical Trainee (Software & AI)',
      company: 'Tata Consultancy Services (TCS)',
      sector: 'PRIVATE',
      location: 'Ahmedabad / Gandhinagar',
      stipend: '₹22,000 - ₹28,000 / month',
      duration: '6 Months',
      qualification: 'B.Tech / BCA / MCA (2025/2026 Batch)',
      description: 'Hands-on enterprise application development, cloud deployment, and mentor-guided AI solutions with pre-placement offer (PPO) evaluation.',
      applyUrl: 'https://jobopedia.in',
      tags: ['Software', 'PPO Included', 'TCS']
    },
    {
      id: 'int-2',
      title: 'NITI Aayog National Policy & Research Internship',
      company: 'NITI Aayog (Govt of India)',
      sector: 'GOVERNMENT',
      location: 'New Delhi / Remote Hybrid',
      stipend: '₹12,000 / month + Official Certificate',
      duration: '3 to 6 Months',
      qualification: 'Undergraduate / Postgraduate in any stream',
      description: 'Assist Senior Advisors in public policy analysis, infrastructure evaluation, and sustainable development index monitoring.',
      applyUrl: 'https://jobopedia.in',
      tags: ['Govt Policy', 'Certificate', 'Official']
    },
    {
      id: 'int-3',
      title: 'Quality Control & Formulation Intern',
      company: 'Sun Pharma Advanced Research',
      sector: 'PRIVATE',
      location: 'Vadodara, Gujarat',
      stipend: '₹18,000 / month',
      duration: '6 Months',
      qualification: 'B.Pharm / M.Pharm / B.Sc Chemistry',
      description: 'Laboratory testing of pharmaceutical formulations, HPLC operations, and regulatory documentation according to US-FDA standards.',
      applyUrl: 'https://jobopedia.in',
      tags: ['Pharma', 'Lab Testing', 'Vadodara']
    },
    {
      id: 'int-4',
      title: 'ISRO Space Application Centre (SAC) Student Project Trainee',
      company: 'ISRO (Space Applications Centre)',
      sector: 'GOVERNMENT',
      location: 'SAC Ahmedabad, Gujarat',
      stipend: 'Government Sponsored Trainee Stipend',
      duration: '6 Months',
      qualification: 'B.E./B.Tech in Electronics / Computer / IT',
      description: 'Satellite image processing, remote sensing telemetry, and embedded systems programming under Indian space scientists.',
      applyUrl: 'https://jobopedia.in',
      tags: ['ISRO SAC', 'Satellite', 'Prestigious']
    },
    {
      id: 'int-5',
      title: 'Digital Banking Operations & Fintech Associate',
      company: 'HDFC Bank Technology Wing',
      sector: 'PRIVATE',
      location: 'Surat / Rajkot, Gujarat',
      stipend: '₹16,000 - ₹20,000 / month',
      duration: '3 Months',
      qualification: 'B.Com / BBA / MBA / Any Graduate',
      description: 'Training in modern core banking solutions, UPI transaction monitoring, and corporate client credit appraisals.',
      applyUrl: 'https://jobopedia.in',
      tags: ['Banking', 'Fintech', 'Surat']
    }
  ];

  useEffect(() => {
    fetch('/api/jobs?category=internship')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.jobs.length > 0) {
          setInternships(data.jobs);
        } else {
          setInternships(sampleInternships);
        }
      })
      .catch(() => setInternships(sampleInternships))
      .finally(() => setLoading(false));
  }, []);

  const filtered = internships.filter(item => {
    const matchesMode = filterMode === 'ALL' || item.sector === filterMode;
    const matchesSearch = !search || 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.company?.toLowerCase().includes(search.toLowerCase()) ||
      item.department?.toLowerCase().includes(search.toLowerCase());
    return matchesMode && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 flex items-center space-x-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800">Paid Internships 2026</span>
      </div>

      {/* Hero Banner for Internships */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#0F2942] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-3">
        <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block">
          🎓 College Students &amp; Freshers Portal 2026
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          સરકારી અને કોર્પોરેટ ઇન્ટર્નશિપ્સ (Internships Hub)
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          કોલેજ વિદ્યાર્થીઓ અને ફ્રેશર્સ માટે માસિક સ્ટાઈપેન્ડ (₹12,000 થી ₹28,000), સર્ટિફિકેટ અને પ્રી-પ્લેસમેન્ટ ઓફર (PPO) સાથે વેરિફાઇડ તકો.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, company (e.g. TCS, ISRO, NITI Aayog)..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button 
            onClick={() => setFilterMode('ALL')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              filterMode === 'ALL' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Internships
          </button>
          <button 
            onClick={() => setFilterMode('GOVERNMENT')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              filterMode === 'GOVERNMENT' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🏛️ Govt Internships
          </button>
          <button 
            onClick={() => setFilterMode('PRIVATE')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              filterMode === 'PRIVATE' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🏢 MNC Internships
          </button>
        </div>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    item.sector === 'GOVERNMENT' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.sector === 'GOVERNMENT' ? '🏛️ Govt Trainee' : '🏢 Corporate Trainee'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-600 mt-0.5 flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.company || item.department}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                    {item.stipend || item.salary}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{item.location || item.state}</span>
                </span>
                <span className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  <GraduationCap className="w-3 h-3 text-slate-400" />
                  <span>{item.qualification}</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">
                100% Verified Trainee Posting
              </span>
              <a 
                href={item.applyUrl || 'https://jobopedia.in'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-xs cursor-pointer"
              >
                <span>Apply Online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
