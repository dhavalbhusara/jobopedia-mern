import React from 'react';
import WeeklyGovtJobCalendar from '../components/WeeklyGovtJobCalendar';
import PersonalizedJobs from '../components/PersonalizedJobs';
import MockTests from '../components/MockTests';
import { ShieldCheck, Search, ArrowRight } from 'lucide-react';

export default function HomePage({ openResumeModal }) {
  const triggerCyberCafeHelp = () => {
    const text = encodeURIComponent("Namaste Jobopedia Cyber Cafe Helpline,\n\nGhar baithe WhatsApp se online application form fill karwana hai.");
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-4">
      
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-10 sm:pt-16 pb-16 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Verified National Career Gateway</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                All India <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">Govt &amp; Corporate</span> Career Hub
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
                Discover 1,20,000+ verified Central, State, Railway, Defence, and MNC vacancies. Filter private jobs by state, inspect daily salary matrices, and take free mock tests.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#weekly-calendar"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg transition flex items-center space-x-2 cursor-pointer"
                >
                  <span>🗓️ Weekly Govt Calendar</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={openResumeModal}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs sm:text-sm font-bold border border-white/20 transition cursor-pointer"
                >
                  ✨ AI Resume Keywords
                </button>
              </div>
            </div>

            {/* Hero Quick Helpline Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0F2942] to-[#0A1D30] rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <h3 className="font-black text-white text-base">Online Cyber Cafe Desk</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                    100% Verified
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Worried about photo resize, thumb impression, or form rejection? Certified operators will fill your application form error-free on WhatsApp.
                </p>

                <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-1 text-xs">
                  <div className="text-slate-300">⚡ Live Application Status</div>
                  <div className="text-emerald-300 font-bold">UPSC CSE 2026 • SSC CGL • SBI PO</div>
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

      {/* Cyber Cafe Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-gradient-to-br from-[#0F2942] via-[#0A2239] to-[#061524] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              Online Cyber Cafe Service • Jobopedia India
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Ghar Baithe <span className="text-emerald-400">WhatsApp Se Sarkari &amp; Private Form</span> Bharwayen!
            </h2>
            <p className="text-xs text-slate-300">
              Aapko cyber cafe ki line me khade rehne ki zaroorat nahi. Document bhejiye, operator form fill karega aur receipt turant WhatsApp par bhejega.
            </p>
          </div>

          <button
            onClick={triggerCyberCafeHelp}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black shadow-lg transition flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <i className="fa-brands fa-whatsapp text-base"></i>
            <span>WhatsApp Par Form Bhejein</span>
          </button>
        </div>
      </section>

      {/* 📅 Weekly Government Job Calendar */}
      <WeeklyGovtJobCalendar />

      {/* 🎯 Targeted Jobs Directory */}
      <PersonalizedJobs />

      {/* 📝 Mock Tests Series */}
      <MockTests />

    </div>
  );
}
