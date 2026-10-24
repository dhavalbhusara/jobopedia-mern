import React, { useState } from 'react';
import WeeklyGovtJobCalendar from '../components/WeeklyGovtJobCalendar';
import PersonalizedJobs from '../components/PersonalizedJobs';
import MockTests from '../components/MockTests';
import { Search, ArrowRight, Sparkles, GraduationCap, Building2, Landmark, CheckCircle2, ChevronRight } from 'lucide-react';

const DEPARTMENTS = [
  { id: 'UPSC', name: 'UPSC & Civil Services', icon: '/images/departments/upsc.svg', count: '1,056+ Posts', color: 'from-blue-500/10 to-indigo-500/10' },
  { id: 'SSC', name: 'SSC Central Cadre', icon: '/images/departments/ssc.svg', count: '17,727+ Posts', color: 'from-amber-500/10 to-orange-500/10' },
  { id: 'Railway', name: 'Indian Railways (RRB)', icon: '/images/departments/railway.svg', count: '11,558+ Posts', color: 'from-rose-500/10 to-red-500/10' },
  { id: 'Bank', name: 'Banking & Insurance', icon: '/images/departments/banking.svg', count: '6,450+ Posts', color: 'from-emerald-500/10 to-teal-500/10' },
  { id: 'Police', name: 'Defence & Police', icon: '/images/departments/defence.svg', count: '12,000+ Posts', color: 'from-indigo-500/10 to-blue-500/10' },
  { id: 'Medical', name: 'Healthcare & Pharma', icon: '/images/departments/healthcare.svg', count: '4,200+ Posts', color: 'from-teal-500/10 to-emerald-500/10' },
  { id: 'Education', name: 'Education & Teaching', icon: '/images/departments/education.svg', count: '8,500+ Posts', color: 'from-amber-500/10 to-yellow-500/10' },
  { id: 'PSU', name: 'PSU & Engineering', icon: '/images/departments/psu.svg', count: '3,800+ Posts', color: 'from-purple-500/10 to-violet-500/10' },
  { id: 'GPSC', name: 'State Govt (GPSC/GSSSB)', icon: '/images/departments/state-govt.svg', count: '15,200+ Posts', color: 'from-blue-500/10 to-cyan-500/10' },
  { id: 'Research', name: 'Scientific & Research', icon: '/images/departments/research.svg', count: '1,950+ Posts', color: 'from-slate-500/10 to-zinc-500/10' }
];

export default function HomePage({ openResumeModal, openAuthModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState(null);

  const triggerCyberCafeHelp = () => {
    const text = encodeURIComponent("Namaste Jobopedia Cyber Cafe Helpline,\n\nGhar baithe WhatsApp se online application form fill karwana hai.");
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDepartmentClick = (deptId) => {
    setSelectedDept(deptId);
    setSearchQuery(deptId);
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Hero Section WITH BACKGROUND IMAGE OF INDIAN YOUTH ASPIRANTS IN BLUE AREA */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-slate-800 overflow-hidden bg-slate-950 text-white">
        
        {/* Background Indian Youth Aspirants Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-right bg-no-repeat z-0 transition-all duration-700 transform scale-100 opacity-40 mix-blend-luminosity" 
          style={{ backgroundImage: `url('/images/hero-professionals.jpg')` }}
        ></div>

        {/* Gradient Overlays for High Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/45 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 z-0"></div>

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                  Government &amp; Corporate Careers Portal 2026
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                Find <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">Government &amp; Private Jobs</span><br/>
                Tailored for Your Qualification
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-medium">
                Unified India Career Bridge — Apply to authentic vacancies from UPSC, SSC, Railways, Banking, ISRO &amp; State PSCs along with top MNCs like TCS, Infosys, Sun Pharma, L&amp;T, and HDFC Bank.
              </p>

              {/* Big Search Bar */}
              <div className="max-w-2xl pt-1">
                <form 
                  onSubmit={handleSearchSubmit}
                  className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(15,41,66,0.12)] hover:border-blue-500 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300"
                >
                  <div className="pl-4 pr-2 text-slate-400">
                    <Search className="w-5 h-5 text-blue-600 animate-pulse" />
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type job title, skill, or department (e.g. UPSC, GPSC, Software Engineer, 12th Pass)..." 
                    className="w-full py-3.5 sm:py-4 px-2 text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                  />
                  <div className="pr-2.5 py-1.5 shrink-0">
                    <button 
                      type="submit" 
                      className="px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Search</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Trending Searches Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-300 font-medium">
                <span className="font-bold text-amber-400">Trending:</span>
                <button onClick={() => handleDepartmentClick('UPSC')} className="px-2.5 py-1 bg-white/10 hover:bg-blue-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all cursor-pointer">⚡ UPSC 2026</button>
                <button onClick={() => handleDepartmentClick('SSC')} className="px-2.5 py-1 bg-white/10 hover:bg-indigo-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all cursor-pointer">🔥 SSC CGL</button>
                <button onClick={() => handleDepartmentClick('GPSC')} className="px-2.5 py-1 bg-white/10 hover:bg-amber-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all cursor-pointer">🏛️ GPSC Class 1 &amp; 2</button>
                <button onClick={() => handleDepartmentClick('TCS')} className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all cursor-pointer">🚀 TCS NQT</button>
                <button onClick={() => handleDepartmentClick('Railway')} className="px-2.5 py-1 bg-white/10 hover:bg-rose-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all cursor-pointer">🚆 RRB NTPC</button>
                <button onClick={() => handleDepartmentClick('Bank')} className="px-2.5 py-1 bg-white/10 hover:bg-purple-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all cursor-pointer">🏦 SBI PO</button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button 
                  onClick={openResumeModal}
                  className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-black shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-100" />
                  <span>Free ATS Resume Builder</span>
                </button>

                <a 
                  href="#weekly-calendar" 
                  className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer border border-blue-400/30"
                >
                  <Landmark className="w-4 h-4" />
                  <span>🏛️ Government Jobs Calendar</span>
                </a>

                <a 
                  href="#jobs-section" 
                  className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer border border-emerald-400/30"
                >
                  <Building2 className="w-4 h-4" />
                  <span>🏢 Private &amp; MNC Careers</span>
                </a>
              </div>

              {/* Badges Strip */}
              <div className="grid grid-cols-3 gap-3 pt-3 max-w-lg">
                <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-left">
                  <div className="text-base sm:text-xl font-black text-amber-400 leading-none">100%</div>
                  <div className="text-[10px] text-slate-300 font-bold mt-1">Official Apply Links</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-left">
                  <div className="text-base sm:text-xl font-black text-emerald-400 leading-none">Govt + MNC</div>
                  <div className="text-[10px] text-slate-300 font-bold mt-1">Dual Career Portals</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-left">
                  <div className="text-base sm:text-xl font-black text-blue-400 leading-none">ATS Ready</div>
                  <div className="text-[10px] text-slate-300 font-bold mt-1">Free Resume Builder</div>
                </div>
              </div>

            </div>

            {/* Right Card: Online Cyber Cafe Desk */}
            <div className="lg:col-span-4 relative self-center">
              <div className="bg-gradient-to-br from-[#0F2942]/90 to-[#0A1D30]/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <h3 className="font-black text-white text-base">Online Cyber Cafe Desk</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
                    100% Verified
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Worried about photo resize, thumb impression, or form rejection? Certified operators will fill your application form error-free on WhatsApp.
                </p>

                <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-1 text-xs">
                  <div className="text-slate-300">⚡ Live Application Status</div>
                  <div className="text-emerald-300 font-bold">UPSC CSE 2026 • SSC CGL • SBI PO • GPSC</div>
                </div>

                <button
                  onClick={triggerCyberCafeHelp}
                  className="w-full py-3 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-2xl text-xs font-black shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <i className="fa-brands fa-whatsapp text-base"></i>
                  <span>Book Form on WhatsApp (+91 98765 43210)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links Horizontal Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 pl-2 shrink-0">Quick Links:</span>
            
            <a href="#jobs-section" className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shrink-0 hover:border-blue-500 hover:text-blue-600">
              <span>🏛️ Latest Jobs</span>
            </a>
            
            <a href="#mock-tests" className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shrink-0 hover:border-indigo-500 hover:text-indigo-600">
              <span>⚡ Mock Tests</span>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-red-500 text-white leading-tight">Hot</span>
            </a>
            
            <a href="#weekly-calendar" className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shrink-0 hover:border-amber-500 hover:text-amber-600">
              <span>📅 Exam Calendar</span>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-blue-600 text-white leading-tight">2026</span>
            </a>

            <button onClick={openResumeModal} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shrink-0 hover:border-purple-500 hover:text-purple-600 cursor-pointer">
              <span>📄 Free ATS Resume</span>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-600 text-white leading-tight">New</span>
            </button>
          </div>
        </div>
      </div>

      {/* BROWSE BY OFFICIAL RECRUITMENT DEPARTMENTS (10 SVG ICONS FROM JOBUDAAN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Official Recruitment Departments
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                સત્તાવાર ભરતી વિભાગો (Browse by Department)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                UPSC, SSC, રેલવે, બેન્કિંગ, ડિફેન્સ, હેલ્થકેર અને શિક્ષણ ક્ષેત્રની સત્તાવાર ભરતીઓ સીધી ફિલ્ટર કરો
              </p>
            </div>
            {selectedDept && (
              <button 
                onClick={() => { setSelectedDept(null); setSearchQuery(''); }}
                className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 transition cursor-pointer self-start sm:self-auto"
              >
                Clear Department Filter (✕)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {DEPARTMENTS.map(dept => {
              const isSelected = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => handleDepartmentClick(dept.id)}
                  className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-md' 
                      : 'border-slate-200 hover:border-blue-500 hover:shadow-md bg-slate-50/70 hover:bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs p-2.5 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                    <img 
                      src={dept.icon} 
                      alt={dept.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {dept.name}
                    </h4>
                    <span className="text-[10px] font-black text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                      {dept.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verified Central Bodies & Partners Bar */}
      <section className="border-y border-slate-200/80 bg-white/70 backdrop-blur-md py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="shrink-0 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                Verified Central Bodies &amp; Hiring Partners
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-700">
              <span className="px-2.5 py-1 bg-slate-100/90 rounded-lg border border-slate-200/80">🏛️ UPSC</span>
              <span className="px-2.5 py-1 bg-slate-100/90 rounded-lg border border-slate-200/80">📋 SSC</span>
              <span className="px-2.5 py-1 bg-slate-100/90 rounded-lg border border-slate-200/80">🚆 Indian Railways</span>
              <span className="px-2.5 py-1 bg-slate-100/90 rounded-lg border border-slate-200/80">💊 Sun Pharma</span>
              <span className="px-2.5 py-1 bg-slate-100/90 rounded-lg border border-slate-200/80">🏢 Google India</span>
              <span className="px-2.5 py-1 bg-slate-100/90 rounded-lg border border-slate-200/80">💻 TCS &amp; Infosys</span>
              <span className="px-2.5 py-1 bg-slate-100/90 rounded-lg border border-slate-200/80">🏦 HDFC Bank</span>
            </div>
          </div>
        </div>
      </section>

      {/* 📅 Weekly Government Job Calendar */}
      <div id="weekly-calendar">
        <WeeklyGovtJobCalendar />
      </div>

      {/* 🎯 Targeted Jobs Directory (Passed with active department / search query) */}
      <div id="jobs-section">
        <PersonalizedJobs externalSearch={searchQuery} />
      </div>

      {/* 📝 Mock Tests Series */}
      <div id="mock-tests">
        <MockTests />
      </div>

    </div>
  );
}
