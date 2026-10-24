import React, { useState } from 'react';
import WeeklyGovtJobCalendar from '../components/WeeklyGovtJobCalendar';
import PersonalizedJobs from '../components/PersonalizedJobs';
import MockTests from '../components/MockTests';
import { Search, ArrowRight, Sparkles, GraduationCap, Building2, Landmark, CheckCircle2 } from 'lucide-react';

export default function HomePage({ openResumeModal, openAuthModal }) {
  const [searchQuery, setSearchQuery] = useState('');

  const triggerCyberCafeHelp = () => {
    const text = encodeURIComponent("Namaste Jobopedia Cyber Cafe Helpline,\n\nGhar baithe WhatsApp se online application form fill karwana hai.");
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Hero Section matching official Jobopedia Index layout */}
      <section className="relative min-h-[540px] sm:min-h-[580px] flex items-center pt-8 sm:pt-12 pb-14 sm:pb-16 border-b border-slate-800 overflow-hidden bg-slate-950 text-white">
        
        {/* Glow Gradients */}
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
                <a href="#jobs-section" className="px-2.5 py-1 bg-white/10 hover:bg-blue-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all">⚡ UPSC 2026</a>
                <a href="#jobs-section" className="px-2.5 py-1 bg-white/10 hover:bg-indigo-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all">🔥 SSC CGL</a>
                <a href="#jobs-section" className="px-2.5 py-1 bg-white/10 hover:bg-amber-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all">🏛️ GPSC Class 1 &amp; 2</a>
                <a href="#jobs-section" className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all">🚀 TCS NQT</a>
                <a href="#jobs-section" className="px-2.5 py-1 bg-white/10 hover:bg-rose-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all">🚆 RRB NTPC</a>
                <a href="#jobs-section" className="px-2.5 py-1 bg-white/10 hover:bg-purple-600/60 text-white rounded-full font-bold border border-white/15 backdrop-blur-sm transition-all">🏦 SBI PO</a>
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
                <div className="bg-slate-900/70 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-left">
                  <div className="text-base sm:text-xl font-black text-amber-400 leading-none">100%</div>
                  <div className="text-[10px] text-slate-300 font-bold mt-1">Official Apply Links</div>
                </div>
                <div className="bg-slate-900/70 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-left">
                  <div className="text-base sm:text-xl font-black text-emerald-400 leading-none">Govt + MNC</div>
                  <div className="text-[10px] text-slate-300 font-bold mt-1">Dual Career Portals</div>
                </div>
                <div className="bg-slate-900/70 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-left">
                  <div className="text-base sm:text-xl font-black text-blue-400 leading-none">ATS Ready</div>
                  <div className="text-[10px] text-slate-300 font-bold mt-1">Free Resume Builder</div>
                </div>
              </div>

            </div>

            {/* Right Card: Online Cyber Cafe Desk */}
            <div className="lg:col-span-4 relative self-center">
              <div className="bg-gradient-to-br from-[#0F2942] to-[#0A1D30] rounded-3xl p-6 sm:p-7 border border-white/20 shadow-2xl space-y-4">
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

      {/* Verified Hiring Partners Bar */}
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

      {/* 🎯 Targeted Jobs Directory */}
      <div id="jobs-section">
        <PersonalizedJobs />
      </div>

      {/* 📝 Mock Tests Series */}
      <div id="mock-tests">
        <MockTests />
      </div>

    </div>
  );
}
