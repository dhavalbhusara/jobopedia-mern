import React, { useState } from 'react';
import { 
  ArrowLeft, Landmark, Building2, GraduationCap, Calendar, 
  MapPin, Award, CheckCircle2, ExternalLink, FileText, 
  Share2, ShieldCheck, Clock, Users, Briefcase, Sparkles, 
  BookOpen, ChevronRight, HelpCircle, Check, Copy 
} from 'lucide-react';

export default function JobDetailPage({ job, setCurrentView, onStartMockTest }) {
  const [copied, setCopied] = useState(false);

  // Fallback default job if user directly refreshed or opened view without state
  const currentJob = job || {
    title: "UPSC Civil Services (IAS / IPS / IFS) Examination 2026",
    department: "Union Public Service Commission (UPSC)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "Central / All India",
    qualification: "Graduate in any stream",
    salary: "₹56,100 - ₹2,50,000 / month (Level 10 Pay Matrix)",
    vacancies: 1056,
    lastDate: "2026-11-15",
    ageLimit: "21 - 32 Years",
    selectionProcess: "Stage 1: Preliminary Exam (Objective MCQs) → Stage 2: Main Written Exam → Stage 3: Personality Test / Interview",
    description: "Union Public Service Commission (UPSC) has officially published the recruitment notification for Civil Services Examination 2026. This prestigious all-India examination selects officers for the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and Central Group 'A' & 'B' civil services. Candidates selected will undergo foundational training at LBSNAA Mussoorie followed by cadre allocation across Indian states.",
    eligibility: "Candidate must hold a Bachelor's Degree of any university incorporated by an Act of the Central or State Legislature in India. Final-year students awaiting degree results are also eligible to apply for the preliminary stage.",
    applyUrl: "https://upsconline.nic.in",
    notificationUrl: "https://upsc.gov.in",
    hasMcqs: true
  };

  const isGovt = currentJob.category === 'govt';
  const isInternship = currentJob.category === 'internship';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(`Namaste Jobopedia Help Desk,\n\nI want assistance applying online for:\n*${currentJob.title}*\nDepartment: ${currentJob.department}\n\nPlease guide me with the application form submission.`);
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-500">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentView('home')}
            className="hover:text-blue-600 transition flex items-center space-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <button 
            onClick={() => setCurrentView(isGovt ? 'govt' : (isInternship ? 'internships' : 'private'))}
            className="hover:text-blue-600 transition cursor-pointer capitalize"
          >
            {isGovt ? 'Government Jobs' : (isInternship ? 'Internships' : 'Corporate Jobs')}
          </button>
          <span>/</span>
          <span className="text-slate-800 truncate max-w-[200px] sm:max-w-xs">{currentJob.title}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition flex items-center space-x-1.5 cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Link Copied!' : 'Share Job'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-[#0B1528] via-slate-900 to-[#0F2942] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-6">
        
        {/* Decorative ambient badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
              isGovt 
                ? 'bg-[#F58220] text-slate-950' 
                : (isInternship ? 'bg-purple-500 text-white' : 'bg-emerald-500 text-slate-950')
            }`}>
              {isGovt ? '🏛️ Official Government Recruitment' : (isInternship ? '🎓 Student & Fresher Internship' : '🏢 Corporate MNC Placement')}
            </span>

            <span className="bg-white/10 text-emerald-300 px-3 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Verified Notification</span>
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            Job ID: {currentJob._id || currentJob.id || 'JOB-2026-X'}
          </div>
        </div>

        {/* Title and Department */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {currentJob.title}
          </h1>
          <div className="flex items-center space-x-2 text-sm sm:text-base font-bold text-slate-300">
            {isGovt ? <Landmark className="w-4 h-4 text-amber-400 shrink-0" /> : <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            <span>{currentJob.department}</span>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
          <a
            href={currentJob.applyUrl || 'https://jobopedia.in'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-[#F58220] to-amber-500 hover:from-[#ea580c] hover:to-amber-600 text-slate-950 rounded-2xl text-xs sm:text-sm font-black shadow-lg transition flex items-center space-x-2 cursor-pointer group"
          >
            <span>🚀 Apply Online (Official Portal)</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {currentJob.notificationUrl && (
            <a
              href={currentJob.notificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold transition flex items-center space-x-2 border border-white/15 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Download Official PDF</span>
            </a>
          )}

          <button
            onClick={handleWhatsAppHelp}
            className="px-4 py-3.5 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer shadow-xs"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>Form Filling Help Desk</span>
          </button>

          {currentJob.hasMcqs && (
            <button
              onClick={() => {
                if (onStartMockTest) onStartMockTest(currentJob);
                else setCurrentView('mock-tests');
              }}
              className="px-4 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-indigo-200" />
              <span>📝 Practice CBT Mock Test</span>
            </button>
          )}
        </div>

      </div>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Salary */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Salary / Pay Scale</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
            {currentJob.salary || 'Best in Industry'}
          </div>
        </div>

        {/* Vacancies */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Total Vacancies</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-emerald-700">
            {currentJob.vacancies ? `${currentJob.vacancies} Posts` : 'Multiple Posts'}
          </div>
        </div>

        {/* Last Date */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-rose-600" />
            <span>Last Date</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-rose-600">
            {currentJob.lastDate || 'Active Now'}
          </div>
        </div>

        {/* State / Location */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-purple-600" />
            <span>Job Location</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
            {currentJob.state || 'All India'}
          </div>
        </div>

        {/* Qualification */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center space-x-1">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Qualification</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
            {currentJob.qualification || 'Graduate'}
          </div>
        </div>

        {/* Age Limit */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Age Limit</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
            {currentJob.ageLimit || '18 - 35 Years'}
          </div>
        </div>

      </div>

      {/* Main Content Sections: Description, Eligibility, Selection Scheme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Columns: Detailed Description, Eligibility & Selection */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Detailed Job Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <Briefcase className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-black text-slate-900">
                Detailed Job Description &amp; Responsibilities (વિગતવાર વર્ણન)
              </h2>
            </div>
            
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-medium whitespace-pre-line">
              {currentJob.description || (
                "Official recruitment notification released by the competent authority. Candidates must fulfill the minimum eligibility conditions as outlined in the official advertisement."
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-3 text-xs text-slate-600">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                Note: Candidate must verify all original documents and certificates before the final interview/counseling round.
              </span>
            </div>
          </div>

          {/* Educational Eligibility & Criteria */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <GraduationCap className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-black text-slate-900">
                Eligibility &amp; Educational Qualification (લાયકાત અને શરતો)
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              <p>
                <strong>Minimum Education:</strong> {currentJob.qualification || 'Graduate / Relevant Degree'}
              </p>
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-emerald-950 space-y-1.5">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-800">Criteria Details:</div>
                <p className="text-xs leading-relaxed">
                  {currentJob.eligibility || 'Candidate must hold a degree or diploma from any recognized university or state technical examination board in India.'}
                </p>
              </div>
            </div>
          </div>

          {/* Selection Process Scheme */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <Award className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-black text-slate-900">
                Selection Process &amp; Examination Pattern (પસંદગી પ્રક્રિયા)
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-semibold space-y-2">
              <div className="text-[11px] font-black uppercase text-indigo-700">Stages of Examination:</div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {currentJob.selectionProcess || 'Online Computer Based Test (CBT) followed by Physical / Typing Skill Test and final Document Verification.'}
              </p>
            </div>
          </div>

        </div>

        {/* Right 4 Columns: Official Links, Help Desk & Verification Notice */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Official Apply Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Official Application Portal
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Direct official website link without any middleman or redirection.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={currentJob.applyUrl || 'https://jobopedia.in'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer group text-center"
              >
                <span>🌐 Open Official Apply Portal</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {currentJob.notificationUrl && (
                <a
                  href={currentJob.notificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer text-center"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Download Advertisement (PDF)</span>
                </a>
              )}
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed font-medium">
              ⚠️ <strong>Important:</strong> Check that all details (Name, DOB, Marksheet) match your official Aadhaar and SSC certificate before clicking Final Submit on the official website.
            </div>
          </div>

          {/* Help Desk Assistance Card */}
          <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="space-y-1">
              <span className="bg-[#F58220] text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block">
                Assistance
              </span>
              <h3 className="text-base font-black text-white">
                Jobopedia Official Help Desk
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need guidance filling this online application form or resolving document upload errors?
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Form Rejection Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Photo &amp; Signature Resizing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Category / EWS / OBC Certificate Guidance</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppHelp}
              className="w-full py-3 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-2xl text-xs font-black shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>Connect on WhatsApp Help Desk</span>
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Sticky-style Action Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentView('home')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to All Jobs</span>
          </button>
          <div className="hidden sm:block">
            <div className="text-xs font-black text-slate-900 truncate max-w-sm">{currentJob.title}</div>
            <div className="text-[10px] text-slate-500 font-medium">Last Date: {currentJob.lastDate}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <a
            href={currentJob.applyUrl || 'https://jobopedia.in'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
