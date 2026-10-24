import React, { useState } from 'react';
import { Search, ChevronDown, Lock, LogOut, User, Sparkles, BookOpen, FileText, Award, Calendar, ExternalLink } from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  openResumeModal, 
  openAuthModal, 
  user, 
  onLogout 
}) {
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navigateTo = (view, sectionId) => {
    setCurrentView(view);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0B1528] text-white py-1 px-4 text-xs font-semibold flex items-center justify-between border-b border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-[#F58220] text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
              New Alerts
            </span>
            <div className="overflow-hidden whitespace-nowrap w-64 sm:w-96 md:w-[650px]">
              <span className="animate-marquee inline-block text-[11px] text-slate-200">
                🇮🇳 UPSC Civil Services 2026 Notification Active • SSC CGL 17,727 Vacancies • GPSC Class 1 &amp; 2 Online Form • Gujarat Police Constable Exam Schedule Released!
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-slate-300 text-[11px]">
            <a 
              href="https://wa.me/919876543210?text=Namaste%20Jobopedia%20Cyber%20Cafe%20Helpline" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-amber-400 transition flex items-center space-x-1"
            >
              <span>📞 Cyber Cafe Helpline:</span>
              <strong className="text-white">+91 98765 43210</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar matching Jobopedia official UI */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}
              className="flex items-center space-x-2.5 group shrink-0 cursor-pointer"
            >
              <img 
                src="/images/jobopedia-icon.png" 
                alt="Jobopedia Icon" 
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0 group-hover:scale-105 transition-transform"
                onError={(e) => { e.target.src = '/images/careersetu-icon.png'; }}
              />
              <div className="flex flex-col">
                <span className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-none group-hover:opacity-90 transition-opacity">
                  Job<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">opedia</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-500 tracking-wider uppercase mt-1">
                  Govt &amp; Corporate Career Hub
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-4 lg:space-x-5 text-sm font-bold text-slate-700">
              
              {/* Home */}
              <button 
                onClick={() => setCurrentView('home')}
                className={`transition-colors pb-1 cursor-pointer ${
                  currentView === 'home' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Home
              </button>

              {/* Govt Jobs (Separate Page) */}
              <button 
                onClick={() => setCurrentView('govt')}
                className={`transition-colors pb-1 cursor-pointer ${
                  currentView === 'govt' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Govt Jobs
              </button>

              {/* Private & MNCs (Separate Page) */}
              <button 
                onClick={() => setCurrentView('private')}
                className={`transition-colors pb-1 cursor-pointer ${
                  currentView === 'private' 
                    ? 'text-emerald-600 border-b-2 border-emerald-600 font-extrabold' 
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                Private &amp; MNCs
              </button>

              {/* Internships (Separate Page) */}
              <button 
                onClick={() => setCurrentView('internships')}
                className={`transition-colors flex items-center space-x-1.5 pb-1 cursor-pointer ${
                  currentView === 'internships'
                    ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                <span>Internships</span>
                <span className="px-1.5 py-0.2 text-[9px] font-black bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  New
                </span>
              </button>

              {/* Mock Tests (MCQs) (Separate Page) */}
              <button 
                onClick={() => setCurrentView('mock-tests')}
                className={`transition-colors flex items-center space-x-1.5 pb-1 cursor-pointer ${
                  currentView === 'mock-tests'
                    ? 'text-blue-700 border-b-2 border-blue-600 font-extrabold'
                    : 'text-blue-700 hover:text-blue-900'
                }`}
              >
                <span>Mock Tests (MCQs)</span>
                <span className="px-1.5 py-0.2 text-[9px] font-black bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                  Live
                </span>
              </button>

              {/* Prep Guide (Separate Page) */}
              <button 
                onClick={() => setCurrentView('preparation')}
                className={`transition-colors pb-1 cursor-pointer ${
                  currentView === 'preparation'
                    ? 'text-purple-700 border-b-2 border-purple-600 font-extrabold'
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                Prep Guide
              </button>

              {/* Exams Calendar (Scrolls to Calendar) */}
              <button 
                onClick={() => navigateTo('home', 'weekly-calendar')}
                className="transition-colors hover:text-purple-600 text-slate-600 cursor-pointer"
              >
                Exams
              </button>

              {/* Pathways / AI Resume */}
              <button 
                onClick={openResumeModal}
                className="transition-colors hover:text-amber-600 flex items-center space-x-1 text-slate-600 cursor-pointer"
              >
                <span>Pathways</span>
              </button>

              {/* Resources Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  onBlur={() => setTimeout(() => setResourcesOpen(false), 250)}
                  className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition-colors focus:outline-hidden cursor-pointer"
                >
                  <span>Resources</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {resourcesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
                    <button 
                      onClick={() => { setResourcesOpen(false); setCurrentView('preparation'); }}
                      className="w-full text-left flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span>Exam Blueprints &amp; Timetable</span>
                    </button>
                    <button 
                      onClick={() => { setResourcesOpen(false); navigateTo('home', 'weekly-calendar'); }}
                      className="w-full text-left flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Exam Calendar 2026</span>
                    </button>
                    <button 
                      onClick={() => { setResourcesOpen(false); setCurrentView('mock-tests'); }}
                      className="w-full text-left flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>Online Mock Tests &amp; MCQs</span>
                    </button>
                    <button 
                      onClick={() => { setResourcesOpen(false); openResumeModal(); }}
                      className="w-full text-left flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>Free ATS Resume Builder</span>
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button 
                      onClick={() => { setResourcesOpen(false); setCurrentView('about'); }}
                      className="w-full text-left flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                    >
                      <span>ℹ️ About Jobopedia</span>
                    </button>
                    <button 
                      onClick={() => { setResourcesOpen(false); setCurrentView('contact'); }}
                      className="w-full text-left flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                    >
                      <span>📞 Contact Support Desk</span>
                    </button>
                  </div>
                )}
              </div>

            </nav>

            {/* Right Side Actions: Search, Login, Register & (ADMIN ONLY PORTAL) */}
            <div className="flex items-center space-x-3">
              
              {/* Search Icon */}
              <button 
                onClick={() => navigateTo('home', 'jobs-section')}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                title="Search Jobs"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* User Logged In State vs Guest Buttons */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-slate-100 py-1.5 px-3 rounded-xl border border-slate-200">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                      {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-bold text-slate-800 max-w-[100px] sm:max-w-[130px] truncate">
                      {user.fullName || user.email?.split('@')[0]}
                    </span>
                    <button
                      onClick={onLogout}
                      title="Logout"
                      className="p-1 hover:text-red-600 text-slate-400 transition cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* ADMIN PORTAL BUTTON (Strictly ONLY shown when user?.role === 'ADMIN') */}
                  {user.role === 'ADMIN' && (
                    <button
                      onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
                      className={`px-3 py-2 text-xs font-black rounded-xl transition flex items-center space-x-1.5 shadow-sm cursor-pointer ${
                        currentView === 'admin'
                          ? 'bg-slate-900 text-white hover:bg-slate-800'
                          : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                      }`}
                      title="Admin Control Center"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{currentView === 'admin' ? 'Public Site' : '👑 Admin Portal'}</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Guest View: Clean Login & Register Buttons (No Admin Portal visible) */
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => openAuthModal(true)}
                    className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer px-2 py-1.5"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => openAuthModal(false)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </header>
    </>
  );
}
