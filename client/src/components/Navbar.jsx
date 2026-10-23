import React from 'react';
import { Landmark, ShieldCheck, Lock, ExternalLink, User, LogOut, LogIn } from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  openResumeModal, 
  openAuthModal, 
  user, 
  onLogout 
}) {
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
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* Logo */}
            <div 
              onClick={() => setCurrentView('home')} 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0"
            >
              <img 
                src="/images/jobopedia-icon.png" 
                alt="Jobopedia" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-xl shadow-xs"
                onError={(e) => { e.target.src = '/images/careersetu-icon.png'; }}
              />
              <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900">
                Job<span className="text-[#F58220]">opedia</span>
              </span>
            </div>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-bold text-slate-700">
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
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Login / User Profile Button */}
              {user ? (
                <div className="flex items-center space-x-2 bg-slate-100 py-1 px-2.5 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-[#0B1528] text-white flex items-center justify-center text-xs font-black">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[80px] sm:max-w-[120px] truncate hidden xs:inline">
                    {user.fullName || user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={onLogout}
                    title="Logout"
                    className="p-1 hover:text-red-600 text-slate-400 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login / Register</span>
                </button>
              )}

              {/* Admin Portal Toggle */}
              <button
                onClick={() => setCurrentView(currentView === 'home' ? 'admin' : 'home')}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center space-x-1.5"
                title="Admin Control Center"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">{currentView === 'home' ? 'Admin Portal' : 'Public Site'}</span>
                <span className="sm:hidden">{currentView === 'home' ? 'Admin' : 'Home'}</span>
              </button>

              {/* Cyber Cafe Helpline */}
              <button
                onClick={triggerCyberCafeHelp}
                className="px-3 sm:px-4 py-2 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-1.5 cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span className="hidden md:inline">Cyber Cafe Form Help</span>
                <span className="md:hidden">Help</span>
              </button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
