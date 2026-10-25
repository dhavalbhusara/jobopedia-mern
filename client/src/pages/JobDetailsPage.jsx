import React from 'react';
import { 
  ArrowLeft, Landmark, Building2, GraduationCap, MapPin, 
  Calendar, IndianRupee, ExternalLink, ShieldCheck, FileText, 
  Share2, Bookmark, CheckCircle2, AlertCircle, Award, Users,
  Clock, ArrowRight
} from 'lucide-react';

export default function JobDetailsPage({ job, setCurrentView, onStartMockTest }) {
  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-black text-slate-800">Job Details Not Found</h2>
        <p className="text-xs text-slate-500">Please choose a vacancy from the homepage or job directory.</p>
        <button
          onClick={() => setCurrentView('home')}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer inline-flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  const isGovt = job.sector === 'GOVERNMENT' || job.category === 'govt' || !job.sector;
  const isIntern = job.category === 'internship';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out ${job.title} at ${job.department || job.company} on Jobopedia!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied to clipboard!');
    }
  };

  const officialLink = job.applyUrl || job.officialLink || 'https://ojas.gujarat.gov.in';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Vacancies</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition cursor-pointer"
            title="Share Job"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 shadow-xs ${
              isGovt ? 'bg-amber-100 text-amber-800 border border-amber-200' :
              isIntern ? 'bg-purple-100 text-purple-800 border border-purple-200' :
              'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {isGovt ? <Landmark className="w-7 h-7" /> : isIntern ? <GraduationCap className="w-7 h-7" /> : <Building2 className="w-7 h-7" />}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                  isGovt ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  isIntern ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                  'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {isGovt ? '🏛️ Official Government Recruitment' : isIntern ? '🎓 Paid Internship' : '🏢 Corporate MNC'}
                </span>

                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>100% Authentic Vacancy</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {job.title}
              </h1>

              <p className="text-sm font-bold text-slate-600">
                {job.department || job.company}
              </p>
            </div>
          </div>
        </div>

        {/* Key Quick Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pay Scale / Salary</span>
            <div className="text-sm font-extrabold text-emerald-700 mt-0.5 flex items-center">
              <IndianRupee className="w-3.5 h-3.5 mr-0.5 shrink-0" />
              <span className="truncate">{job.salary || 'As per norms'}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Vacancies</span>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5 flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-blue-600 shrink-0" />
              <span>{job.vacancies || 'Multiple'} Posts</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Location / State</span>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500 shrink-0" />
              <span className="truncate">{job.state || 'All India'}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Application Deadline</span>
            <div className="text-sm font-extrabold text-rose-600 mt-0.5 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-rose-500 shrink-0" />
              <span>{job.lastDate || 'Apply Immediately'}</span>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTION BUTTON: DIRECT OFFICIAL RECRUITMENT PORTAL (NO WHATSAPP!) */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-blue-700/50">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-black uppercase text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Recruitment Portal Redirect</span>
            </div>
            <p className="text-xs text-slate-200">
              Submit your authentic application directly on the government or company portal.
            </p>
          </div>

          <a
            href={officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer shrink-0"
          >
            <span>🚀 Apply on Official Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Two Column Detailed Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Description & Eligibility */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Detailed Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Full Job Description &amp; Notification Summary</span>
            </h2>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
              <p className="whitespace-pre-line">
                {job.description || "Official recruitment notice published by the department. Candidates must ensure they meet all educational qualification, age limit, and category reservation criteria prior to submitting online applications."}
              </p>
            </div>
          </div>

          {/* Educational Qualification & Eligibility */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span>Eligibility &amp; Educational Qualification</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Required Degree / Stream: </strong>
                  <span>{job.qualification || job.eligibility || 'Graduate in any discipline'}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Age Limit: </strong>
                  <span>18 to 35 Years (Age relaxations for SC/ST/OBC/EWS/PwD as per government recruitment rules).</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Selection Process: </strong>
                  <span>Computer Based Test (CBT) Written Examination followed by Document Verification &amp; Medical fitness.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step How to Apply */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>How to Apply Online</span>
            </h2>

            <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside leading-relaxed font-medium">
              <li>Click on the <strong>"Apply on Official Website"</strong> button above to visit the department's authenticated portal.</li>
              <li>Complete New Candidate Registration by entering your active Email ID and Mobile Number.</li>
              <li>Upload scanned passport size photograph and signature strictly as per size specifications.</li>
              <li>Fill in Educational Qualification, Category, and Address details carefully.</li>
              <li>Pay the online examination fee (if applicable) via Net Banking, UPI, or Debit Card.</li>
              <li>Download and print the final Application Confirmation Slip for your records.</li>
            </ol>
          </div>

        </div>

        {/* Right 1 Col: Important Links & CBT Practice */}
        <div className="space-y-6">
          
          {/* Official Portals Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>Official Links &amp; Downloads</span>
            </h3>

            <div className="space-y-2">
              <a
                href={officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer border border-blue-200"
              >
                <span>🌐 Online Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer border border-slate-200"
              >
                <span>📄 Detailed Notification PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* CBT Mock Test Promo */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-950 rounded-3xl p-6 text-white space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-amber-300">
              <Award className="w-5 h-5" />
            </div>

            <h3 className="font-black text-base">Practice CBT Mock Test for this Exam</h3>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Take practice MCQs with real exam timer, single-question screen, and instant scorecards.
            </p>

            <button
              onClick={() => setCurrentView('mock-tests')}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Start Free CBT Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
