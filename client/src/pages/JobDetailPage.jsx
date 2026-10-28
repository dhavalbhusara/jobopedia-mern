import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Landmark, Building2, GraduationCap, Calendar, 
  MapPin, Award, CheckCircle2, ExternalLink, FileText, 
  Share2, ShieldCheck, Clock, Users, Briefcase, Sparkles, 
  BookOpen, ChevronRight, HelpCircle, Check, Copy, MessageCircle 
} from 'lucide-react';

export default function JobDetailPage({ job: initialJob, setCurrentView, onStartMockTest }) {
  const [currentJob, setCurrentJob] = useState(initialJob);
  const [loading, setLoading] = useState(!initialJob);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialJob) {
      setCurrentJob(initialJob);
      setLoading(false);
      setNotFound(false);
      return;
    }

    // Direct deep-link retrieval if page was refreshed or loaded without parent state
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let targetId = params.get('job') || params.get('jobId');
      if (!targetId && window.location.pathname.startsWith('/job/')) {
        targetId = window.location.pathname.replace('/job/', '').trim();
      }

      if (targetId) {
        setLoading(true);
        fetch(`/api/jobs/${encodeURIComponent(targetId)}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.job) {
              setCurrentJob(data.job);
              setNotFound(false);
            } else {
              setNotFound(true);
            }
          })
          .catch(() => setNotFound(true))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
        setNotFound(true);
      }
    }
  }, [initialJob]);

  // Synchronize browser address bar with this exact job's link
  useEffect(() => {
    if (currentJob && typeof window !== 'undefined') {
      const identifier = currentJob.slug || currentJob._id || currentJob.id;
      if (identifier) {
        const expectedSearch = `?job=${encodeURIComponent(identifier)}`;
        if (window.location.search !== expectedSearch) {
          window.history.replaceState({ jobId: identifier, view: 'job-detail' }, '', `/?job=${encodeURIComponent(identifier)}`);
        }
      }
    }
  }, [currentJob]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto shadow-md"></div>
        <h2 className="text-xl font-black text-slate-800">જોબની સંપૂર્ણ વિગતો મેળવી રહ્યા છીએ...</h2>
        <p className="text-xs text-slate-500 font-medium">Please wait while we retrieve the authentic verified job notification from database.</p>
      </div>
    );
  }

  if (notFound || !currentJob) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">આ જોબ જાહેરાત મળી નથી</h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          તમે જે શેર કરેલી લિંક પર ક્લિક કર્યું છે તે જોબની મુદત પૂર્ણ થઈ ગઈ હોઈ શકે છે અથવા લિંક બદલાઈ ગઈ છે.
        </p>
        <button
          onClick={() => setCurrentView('home')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-lg transition cursor-pointer"
        >
          હોમપેજ પર તમામ નવી ભરતીઓ જુઓ (Explore All Jobs)
        </button>
      </div>
    );
  }

  const isGovt = currentJob.category === 'govt' || currentJob.sector === 'GOVERNMENT';
  const isInternship = currentJob.category === 'internship';

  const jobIdentifier = currentJob.slug || currentJob._id || currentJob.id;
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?job=${encodeURIComponent(jobIdentifier)}`
    : `https://jobopedia.in/?job=${encodeURIComponent(jobIdentifier)}`;

  const copyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🏛️ *${currentJob.title}*\n` +
      `🏢 ડિપાર્ટમેન્ટ / સંસ્થા: ${currentJob.department || currentJob.organization || currentJob.company}\n` +
      `💰 પગાર ધોરણ: ${currentJob.salary}\n` +
      `👥 કુલ જગ્યાઓ: ${currentJob.vacancies ? `${currentJob.vacancies} Posts` : 'Active Vacancies'}\n` +
      `📅 છેલ્લી તારીખ: ${currentJob.lastDate || 'Closing Soon'}\n` +
      `📍 સ્થળ: ${currentJob.state || 'All India'}\n\n` +
      `👉 આ જોબની સંપૂર્ણ વિગતો વાંચવા અને સીધી અરજી કરવા અહીં ક્લિક કરો:\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentJob.title,
        text: `🏛️ *${currentJob.title}*\n🏢 ${currentJob.department}\n💰 Salary: ${currentJob.salary}\n📅 Last Date: ${currentJob.lastDate}\n\n👉 Apply here:\n${shareUrl}`,
        url: shareUrl
      }).catch(() => {
        copyShareLink();
      });
    } else {
      copyShareLink();
    }
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(`Namaste Jobopedia Help Desk,\n\nI want assistance applying online for:\n*${currentJob.title}*\nDepartment: ${currentJob.department}\n\nPlease guide me with the application form submission.`);
    window.open(`https://wa.me/918487944035?text=${text}`, "_blank");
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
            onClick={handleWhatsAppShare}
            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl transition flex items-center space-x-1.5 cursor-pointer shadow-2xs font-bold text-xs"
            title="Share this Job on WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span className="hidden xs:inline">WhatsApp</span>
          </button>

          <button
            onClick={copyShareLink}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition flex items-center space-x-1.5 cursor-pointer shadow-2xs font-bold text-xs"
            title="Copy Direct Link to this Job"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center space-x-1 cursor-pointer shadow-2xs text-xs font-bold"
            title="More Share Options"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Share</span>
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
              {Array.isArray(currentJob.qualifications) && currentJob.qualifications.length > 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentJob.qualifications.map(q => (
                    <span key={q} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      🎓 {q}
                    </span>
                  ))}
                </div>
              )}
              {Array.isArray(currentJob.states) && currentJob.states.length > 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentJob.states.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      📍 {s}
                    </span>
                  ))}
                </div>
              )}
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

          {/* Shareable Job Link Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-300 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <Share2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Share this Job (મિત્રો સાથે શેર કરો)
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  આ ડાયરેક્ટ લિંક પર ક્લિક કરતાં જ આ જ જોબ ખૂલશે
                </p>
              </div>
            </div>

            {/* Direct Link Input Box with 1-Click Copy */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-600">
                Direct Shareable Link:
              </label>
              <div className="flex items-center space-x-1.5">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  onClick={(e) => e.target.select()}
                  className="w-full px-3 py-2 text-[11px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono focus:outline-none select-all"
                />
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shrink-0 cursor-pointer shadow-2xs"
                  title="Copy Link to Clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>More Apps</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-500 font-medium text-center">
              💡 WhatsApp, Telegram કે Social Media પર મોકલીને મિત્રોને જાણ કરો.
            </p>
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
