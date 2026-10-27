import React, { useState } from 'react';
import { 
  Search, ChevronDown, Lock, LogOut, User, Sparkles, 
  BookOpen, FileText, Award, Calendar, ExternalLink, 
  Menu, X, Home, Landmark, Building2, GraduationCap, 
  ChevronRight, Phone, ShieldCheck, MessageSquare, Instagram, Mail
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  openResumeModal, 
  openComplaintModal,
  openAuthModal, 
  user, 
  onLogout,
  onSelectJob 
}) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="bg-[#0B1528] text-white py-1 px-3 sm:px-4 text-xs font-semibold flex items-center justify-between border-b border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 flex-1 min-w-0 mr-2 sm:mr-4">
            <span className="bg-[#F58220] text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase shrink-0">
              New Alerts
            </span>
            <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0">
              <span className="animate-marquee inline-block text-[11px] text-slate-200">
                🇮🇳 UPSC Civil Services 2026 Notification Active • SSC CGL 17,727 Vacancies • GPSC Class 1 &amp; 2 Online Form • Gujarat Police Constable Exam Schedule Released!
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-slate-300 text-[11px] shrink-0">
            {/* Direct Instagram Profile Link */}
            <a
              href="https://www.instagram.com/jobopedia.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-90 text-white font-bold transition shadow-2xs"
              title="Open Official Instagram Profile (@jobopedia.in)"
            >
              <Instagram className="w-3.5 h-3.5 text-white" />
              <span className="hidden xs:inline">Instagram</span>
            </a>

            {/* Direct Gmail Open Link */}
            <a
              href="mailto:jobopedia.careers@gmail.com"
              className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-2xs"
              title="Direct Mail: jobopedia.careers@gmail.com"
            >
              <Mail className="w-3.5 h-3.5 text-white" />
              <span className="hidden xs:inline">Gmail</span>
            </a>

            {/* Help Desk Phone */}
            <a 
              href="https://wa.me/918487944035?text=Namaste%20Jobopedia%20Help%20Desk" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex hover:text-amber-400 transition items-center space-x-1"
            >
              <span>📞</span>
              <strong className="text-white">+91 84879 44035</strong>
            </a>

            {/* Grievance button */}
            <button
              onClick={openComplaintModal}
              className="hidden lg:flex hover:text-rose-400 text-rose-300 transition items-center space-x-1 cursor-pointer bg-white/10 hover:bg-white/15 px-2 py-0.5 rounded-md font-bold"
            >
              <MessageSquare className="w-3 h-3 text-rose-400" />
              <span>📢 Grievance</span>
            </button>
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
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-sm font-bold text-slate-700 shrink-0">
              
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
                      <span>Exam Blueprints &amp; Prep Guide</span>
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
                      <span>Free ATS Resume Builder (Pathways)</span>
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
                    <button 
                      onClick={() => { setResourcesOpen(false); setCurrentView('privacy-policy'); }}
                      className="w-full text-left flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition cursor-pointer"
                    >
                      <span>🔒 Privacy Policy (ગોપનીયતા નીતિ)</span>
                    </button>
                  </div>
                )}
              </div>

            </nav>

            {/* Right Side Actions: Notifications, Search, Login & (ADMIN ONLY PORTAL) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Notification Center (Push alerts for Phone & PC) */}
              <NotificationCenter user={user} onSelectJob={onSelectJob} />

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
                  {/* Candidate Panel Button */}
                  <button
                    onClick={() => setCurrentView(currentView === 'user-dashboard' ? 'home' : 'user-dashboard')}
                    className={`flex items-center space-x-2 py-1.5 px-3 rounded-xl border transition shadow-xs cursor-pointer ${
                      currentView === 'user-dashboard'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                    title="Open Candidate Panel"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      currentView === 'user-dashboard' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                    }`}>
                      {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-bold max-w-[80px] sm:max-w-[100px] truncate">
                      {user.fullName || user.email?.split('@')[0]}
                    </span>
                  </button>

                  {/* Prominent High-Visibility Logout Button */}
                  <button
                    onClick={onLogout}
                    title="Logout from Account"
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-300 hover:border-rose-400 text-rose-700 hover:text-rose-800 rounded-xl text-xs font-black transition shadow-xs cursor-pointer shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>Logout</span>
                  </button>

                  {/* ADMIN PORTAL BUTTON (Strictly ONLY shown when user?.role === 'ADMIN') */}
                  {user.role === 'ADMIN' && (
                    <button
                      onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
                      className={`px-2.5 py-1.5 text-xs font-black rounded-xl transition flex items-center space-x-1 shadow-sm shrink-0 cursor-pointer ${
                        currentView === 'admin'
                          ? 'bg-slate-900 text-white hover:bg-slate-800'
                          : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                      }`}
                      title="Admin Control Center"
                    >
                      <Lock className="w-3 h-3" />
                      <span>{currentView === 'admin' ? 'Public' : '👑 Admin'}</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Guest View: Clean Unified Login Button (No Register button needed) */
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAuthModal(true)}
                    className="px-4 py-2 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-xs hover:shadow-md transition cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Login</span>
                  </button>
                </div>
              )}

              {/* Tablet Menu Toggle Button (Visible only on tablets md to xl; hidden on mobile phones to keep header clean) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hidden md:flex xl:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Tablet Dropdown Menu (Screen width md to xl) */}
        {mobileMenuOpen && (
          <div className="hidden md:block xl:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            
            {/* If Logged In: Show User Card */}
            {user ? (
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-4 rounded-2xl text-white space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-sm">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-extrabold text-sm truncate">{user.fullName || 'Candidate'}</div>
                    <div className="text-[11px] text-slate-300 truncate">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <button
                    onClick={() => { setCurrentView('user-dashboard'); setMobileMenuOpen(false); }}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center cursor-pointer"
                  >
                    👤 Candidate Panel
                  </button>
                  {user.role === 'ADMIN' && (
                    <button
                      onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
                      className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black cursor-pointer"
                    >
                      👑 Admin
                    </button>
                  )}
                  <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer shadow-sm"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pb-2 border-b border-slate-100">
                <button
                  onClick={() => { openAuthModal(true); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-xs transition cursor-pointer"
                >
                  🔐 Login to Jobopedia
                </button>
              </div>
            )}

            {/* Navigation Links List */}
            <div className="space-y-1 text-sm font-bold text-slate-700">
              <button
                onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer ${
                  currentView === 'home' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2.5">
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Home</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => { setCurrentView('govt'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer ${
                  currentView === 'govt' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2.5">
                  <Landmark className="w-4 h-4 text-blue-500" />
                  <span>Government Jobs (Sarkari)</span>
                </span>
                <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">100% Verified</span>
              </button>

              <button
                onClick={() => { setCurrentView('private'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer ${
                  currentView === 'private' ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2.5">
                  <Building2 className="w-4 h-4 text-emerald-500" />
                  <span>Private &amp; MNC Careers</span>
                </span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">TCS, Infosys</span>
              </button>

              <button
                onClick={() => { setCurrentView('internships'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer ${
                  currentView === 'internships' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2.5">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <span>Paid Internships</span>
                </span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">New</span>
              </button>

              <button
                onClick={() => { setCurrentView('mock-tests'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer ${
                  currentView === 'mock-tests' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Online Mock Tests &amp; MCQs</span>
                </span>
                <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Live CBT</span>
              </button>

              <button
                onClick={() => { setCurrentView('preparation'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer ${
                  currentView === 'preparation' ? 'bg-purple-50 text-purple-700' : 'hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center space-x-2.5">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>Preparation Blueprint &amp; Timetable</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => { openResumeModal(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <span className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Free ATS Resume Builder</span>
                </span>
                <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">AI Ready</span>
              </button>

              {user && (
                <button
                  onClick={() => { setCurrentView('user-dashboard'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left cursor-pointer ${
                    currentView === 'user-dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center space-x-2.5">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Candidate User Panel</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              )}

              <div className="border-t border-slate-100 pt-2 space-y-1">
                <button
                  onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
                  className="w-full p-2 rounded-xl hover:bg-slate-50 text-slate-600 text-left cursor-pointer flex items-center space-x-2"
                >
                  <span>ℹ️ About Jobopedia</span>
                </button>
                <button
                  onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false); }}
                  className="w-full p-2 rounded-xl hover:bg-slate-50 text-slate-600 text-left cursor-pointer flex items-center space-x-2"
                >
                  <span>📞 Contact Support Desk</span>
                </button>
                <button
                  onClick={() => { openComplaintModal(); setMobileMenuOpen(false); }}
                  className="w-full p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-left cursor-pointer flex items-center space-x-2 font-bold"
                >
                  <MessageSquare className="w-4 h-4 text-rose-600" />
                  <span>📢 Submit Complaint (ફરિયાદ)</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </header>

      {/* Sticky Mobile Bottom Navigation Bar (Visible only on screens < md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] print:hidden">
        <div className="grid grid-cols-5 items-center text-center">
          
          {/* Home */}
          <button
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className={`flex flex-col items-center justify-center py-1 transition cursor-pointer ${
              currentView === 'home' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight">Home</span>
            {currentView === 'home' && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-0.5"></span>}
          </button>

          {/* Govt Jobs */}
          <button
            onClick={() => { setCurrentView('govt'); setMobileMenuOpen(false); }}
            className={`flex flex-col items-center justify-center py-1 transition cursor-pointer ${
              currentView === 'govt' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Landmark className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight">Govt Jobs</span>
            {currentView === 'govt' && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-0.5"></span>}
          </button>

          {/* Private Jobs */}
          <button
            onClick={() => { setCurrentView('private'); setMobileMenuOpen(false); }}
            className={`flex flex-col items-center justify-center py-1 transition cursor-pointer ${
              currentView === 'private' ? 'text-emerald-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight">Private</span>
            {currentView === 'private' && <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5"></span>}
          </button>

          {/* Mock Tests */}
          <button
            onClick={() => { setCurrentView('mock-tests'); setMobileMenuOpen(false); }}
            className={`flex flex-col items-center justify-center py-1 transition cursor-pointer ${
              currentView === 'mock-tests' ? 'text-indigo-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight">Mock Tests</span>
            {currentView === 'mock-tests' && <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-0.5"></span>}
          </button>

          {/* User Panel or Login */}
          <button
            onClick={() => {
              if (user) {
                setCurrentView('user-dashboard');
              } else {
                openAuthModal(true);
              }
              setMobileMenuOpen(false);
            }}
            className={`flex flex-col items-center justify-center py-1 transition cursor-pointer ${
              currentView === 'user-dashboard' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight">{user ? 'My Panel' : 'Login'}</span>
            {currentView === 'user-dashboard' && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-0.5"></span>}
          </button>

        </div>
      </nav>
    </>
  );
}
