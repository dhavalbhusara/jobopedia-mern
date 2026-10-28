import React from 'react';
import { 
  X, ExternalLink, Landmark, Building2, GraduationCap, 
  MapPin, Calendar, IndianRupee, Briefcase, ShieldCheck, 
  Award, FileText, CheckCircle2, AlertCircle, Share2 
} from 'lucide-react';

export default function JobDetailsModal({ job, isOpen, onClose, onStartMockTest }) {
  if (!isOpen || !job) return null;

  const isGovt = job.category === 'govt' || job.sector === 'GOVERNMENT';
  const isIntern = job.category === 'internship';
  const officialUrl = job.applyUrl || job.officialUrl || job.notificationUrl || 'https://jobopedia.in';

  const handleShare = () => {
    const jobId = job._id || job.id;
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/?job=${encodeURIComponent(jobId)}`
      : `https://jobopedia.in/?job=${encodeURIComponent(jobId)}`;

    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `🏛️ *${job.title}*\n🏢 ${job.department || job.organization || job.company || 'Jobopedia'}\n💰 Salary: ${job.salary || 'Best in Industry'}\n📅 Last Date: ${job.lastDate || 'Closing Soon'}\n\n👉 Apply here:\n${shareUrl}`,
        url: shareUrl
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert(`✅ Job Share Link Copied!\n\n${shareUrl}\n\nSend this link to anyone to directly open this job.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative my-auto">
        
        {/* Modal Top Header */}
        <div className={`p-6 sm:p-8 text-white relative rounded-t-3xl ${
          isGovt 
            ? 'bg-gradient-to-r from-[#0B1E33] via-[#0F2942] to-[#1E3A8A]' 
            : isIntern
            ? 'bg-gradient-to-r from-purple-950 via-indigo-900 to-purple-900'
            : 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center space-x-1.5 ${
              isGovt ? 'bg-amber-400 text-slate-950' : isIntern ? 'bg-purple-300 text-purple-950' : 'bg-emerald-300 text-emerald-950'
            }`}>
              {isGovt ? <Landmark className="w-3.5 h-3.5" /> : isIntern ? <GraduationCap className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
              <span>{isGovt ? 'Government (Sarkari)' : isIntern ? 'Paid Internship' : 'Corporate / Private'}</span>
            </span>

            <span className="text-[10px] font-bold text-white/80 bg-white/10 px-2.5 py-1 rounded-full flex items-center space-x-1 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% Verified Job Notification</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
            {job.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 font-semibold mt-1.5">
            {job.department || job.organization || job.company}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800">
          
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Vacancies</span>
              <span className="text-sm sm:text-base font-black text-slate-900 mt-0.5 block">
                {job.vacancies ? `${job.vacancies} Posts` : 'Refer Notification'}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Salary / Stipend</span>
              <span className="text-sm sm:text-base font-black text-emerald-700 mt-0.5 block truncate">
                {job.salary || 'Best in Industry'}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Location / State</span>
              <span className="text-sm sm:text-base font-black text-blue-700 mt-0.5 block truncate">
                {job.state || 'All India'}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Application Deadline</span>
              <span className="text-sm sm:text-base font-black text-rose-600 mt-0.5 block">
                {job.lastDate || 'Closing Soon'}
              </span>
            </div>
          </div>

          {/* Qualification & Eligibility */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 sm:p-5 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Required Qualification &amp; Eligibility Criteria</span>
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {job.qualification || job.eligibility || 'Graduate / 10th / 12th as per official notification guidelines.'}
            </p>
            {job.ageLimit && (
              <div className="text-xs text-slate-600 font-medium pt-1">
                Age Criteria: <strong className="text-slate-800">{job.ageLimit}</strong> (Relaxation applicable as per Govt rules).
              </div>
            )}
          </div>

          {/* Full Job Description & Scope */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span>સંપૂર્ણ વિગતો અને જોબનું વર્ણન (Full Job Description &amp; Scope)</span>
            </h4>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 whitespace-pre-line">
              {job.description || 'Full notification details are published by the recruiting board. Candidates must review age limits, fee structure, and syllabi before submitting the online form.'}
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="flex items-start space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Official Job Verification:</strong> Click the official link below to visit the authentic recruitment portal. Fill your application details and pay the registration fee directly without intermediaries.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {onStartMockTest && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartMockTest(job);
                }}
                className="w-full sm:w-auto px-5 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-2xl text-xs font-black transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Practice MCQs for this Exam</span>
              </button>
            )}

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:ml-auto">
              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                title="Share this Job Direct Link"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Link</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>

              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Submit Form on Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
