import React from 'react';
import { Landmark, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, openResumeModal }) {
  const triggerCyberCafeHelp = () => {
    const text = encodeURIComponent("Namaste Jobopedia Cyber Cafe Helpline,\n\nI want assistance with online form submission and document verification.");
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0B1528] text-white py-1 px-4 text-xs font-semibold flex items-center justify-between border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-[#F58220] text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
              New Alerts
            </span>
            <div className="overflow-hidden whitespace-nowrap w-64 sm:w-96 md:w-[600px]">
              <span className="animate-marquee inline-block">
                🇮🇳 UPSC Civil Services Prelims 2026 Notification Out (1,056 Posts) • SSC CGL 2026 Vacancies 17,727 • SBI PO Application Window Open • RRB NTPC Active!
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-slate-300 text-[11px]">
            <span>📞 Cyber Cafe Helpline: <strong>+91 98765 43210</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo */}
            <div 
              onClick={() => setCurrentView('home')} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <img 
                src="/images/jobopedia-icon.png" 
                alt="Jobopedia" 
                className="w-10 h-10 object-contain rounded-xl shadow-xs"
                onError={(e) => { e.target.src = '/images/careersetu-icon.png'; }}
              />
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Job<span className="text-[#F58220]">opedia</span>
              </span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-bold text-slate-700">
              <button 
                onClick={() => setCurrentView('home')} 
                className={`hover:text-blue-600 transition ${currentView === 'home' ? 'text-blue-600' : ''}`}
              >
                Explore Jobs
              </button>
              <a href="#weekly-calendar" className="hover:text-blue-600 transition">
                Weekly Calendar
              </a>
              <a href="#mock-tests" className="hover:text-blue-600 transition">
                Mock Tests
              </a>
              <button 
                onClick={openResumeModal}
                className="hover:text-blue-600 transition flex items-center space-x-1"
              >
                <span>✨ AI Resume Keywords</span>
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView(currentView === 'home' ? 'admin' : 'home')}
                className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center space-x-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>{currentView === 'home' ? 'Admin Portal' : 'Public Site'}</span>
              </button>

              <button
                onClick={triggerCyberCafeHelp}
                className="px-4 py-2 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-1.5 cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span className="hidden sm:inline">Cyber Cafe Form Help</span>
                <span className="sm:hidden">Help</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
