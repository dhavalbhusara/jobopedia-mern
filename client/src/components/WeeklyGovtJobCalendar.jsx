import React, { useState, useEffect } from 'react';
import { Landmark, Sparkles, DollarSign, FileText, ExternalLink, ArrowRight, X, Share2 } from 'lucide-react';

export default function WeeklyGovtJobCalendar({ onSelectJob }) {
  const [calendarData, setCalendarData] = useState(null);
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(0);
  const [selectedDayNum, setSelectedDayNum] = useState(2);
  const [modalJob, setModalJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs/weekly-calendar')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCalendarData(data);
        }
      })
      .catch(err => console.error("Error loading calendar:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !calendarData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-xs text-slate-500 font-bold mt-2">Loading Weekly Govt Jobs Calendar...</p>
        </div>
      </div>
    );
  }

  const activeWeek = calendarData.weeks[selectedWeekIdx] || calendarData.weeks[0];
  const days = activeWeek.days || [];
  const activeDay = days.find(d => d.dayNumber === selectedDayNum) || days[0];

  const triggerHelpDesk = (title) => {
    const text = encodeURIComponent(`Namaste Jobopedia Help Desk,\n\nI want assistance applying for: *${title}*.\nPlease guide me.`);
    window.open(`https://wa.me/918487944035?text=${text}`, "_blank");
  };

  const handleShareJob = (e, job) => {
    e.stopPropagation();
    const jobId = job.slug || job._id || job.id;
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/?job=${encodeURIComponent(jobId)}`
      : `https://jobopedia.in/?job=${encodeURIComponent(jobId)}`;

    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `🏛️ *${job.title}*\n🏢 ${job.department || 'Government of Gujarat / India'}\n💰 Salary: ${job.salary}\n📅 Last Date: ${job.lastDate}\n\n👉 Apply here:\n${shareUrl}`,
        url: shareUrl
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert(`✅ Job Share Link Copied!\n\n${shareUrl}\n\nSend this link to anyone to directly open this job.`);
    }
  };

  return (
    <section id="weekly-calendar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-gradient-to-br from-[#0B1E33] via-[#0F2942] to-[#0A1726] rounded-3xl p-5 sm:p-8 text-white shadow-2xl border border-blue-800/60 relative overflow-hidden space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5" />
                <span>Weekly Government Jobs Bulletin</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Database Auto-Sync (Salary &amp; Description Included)</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              📅 સાપ્તાહિક સરકારી ભરતી કેલેન્ડર — {calendarData.monthName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              1 થી 7 તારીખ કે કોઈપણ દિવસ પર ક્લિક કરો; અંદર જ નોકરીનું સંપૂર્ણ વર્ણન (Job Description) અને પગાર ધોરણ (Salary) જુઓ.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <a
              href="#jobs-feed"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-lg cursor-pointer"
            >
              <span>View All Govt Jobs Across India</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Week Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none relative z-10">
          {calendarData.weeks.map((week, idx) => {
            const isSelected = selectedWeekIdx === idx;
            return (
              <button
                key={week.id}
                onClick={() => {
                  setSelectedWeekIdx(idx);
                  if (week.days && week.days.length > 0) {
                    setSelectedDayNum(week.days[0].dayNumber);
                  }
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg font-extrabold ring-2 ring-amber-300/60"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                <span>🗓️ {week.label} ({week.range} {calendarData.monthName.split(" ")[0]})</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                  isSelected ? "bg-slate-950/20 text-slate-950" : "bg-blue-500/25 text-blue-200"
                }`}>
                  {week.totalJobsInWeek} Jobs
                </span>
              </button>
            );
          })}
        </div>

        {/* 7 Day Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
          {days.map((day) => {
            const isSelected = day.dayNumber === selectedDayNum;
            const hasJobs = day.jobsCount > 0;
            const topJob = hasJobs ? day.jobs[0] : null;

            return (
              <div
                key={day.dayNumber}
                onClick={() => setSelectedDayNum(day.dayNumber)}
                className={`rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between space-y-2 group relative ${
                  isSelected
                    ? "bg-gradient-to-b from-blue-700/80 to-blue-950/90 border-amber-400 ring-2 ring-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.4)]"
                    : hasJobs
                    ? "bg-gradient-to-b from-blue-950/90 via-slate-900/90 to-blue-950/90 border-amber-400/80 ring-1 ring-amber-400/40 shadow-sm hover:border-amber-300"
                    : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase text-slate-300 group-hover:text-white">
                    {day.dayName}
                  </span>
                  {hasJobs && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded uppercase shadow-xs flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping shrink-0"></span>
                      <span>{day.jobsCount} Jobs</span>
                    </span>
                  )}
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {String(day.dayNumber).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{calendarData.monthName.split(" ")[0]}</span>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  {hasJobs && topJob ? (
                    <>
                      <div className="bg-blue-950/70 border border-blue-400/30 rounded-xl p-1.5 group-hover:border-amber-400/70 transition-colors">
                        <p className="text-[11px] font-black text-white group-hover:text-amber-300 line-clamp-2 leading-snug">
                          {topJob.title}
                        </p>
                      </div>
                      {topJob.salary && (
                        <div className="text-[9.5px] font-black text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded-lg border border-amber-400/25 truncate">
                          💰 {topJob.salary}
                        </div>
                      )}
                      <div className="text-[9px] font-bold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                        {topJob.vacancies} Posts
                      </div>
                    </>
                  ) : (
                    <div className="py-2 text-center text-[10px] text-slate-400">No deadlines</div>
                  )}
                </div>

                <div className="text-[10px] text-blue-300 font-semibold group-hover:underline flex items-center justify-between pt-1 border-t border-white/10">
                  <span>{hasJobs ? "View Pop-up" : "Open"}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inline Spotlight Box */}
        {activeDay && (
          <div className="bg-gradient-to-r from-slate-900/90 via-blue-950/80 to-slate-900/90 rounded-2xl p-4 sm:p-5 border-2 border-amber-400/40 shadow-xl space-y-4 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex flex-col items-center justify-center font-black shadow-md shrink-0">
                  <span className="text-[8px] uppercase">{activeDay.dayName}</span>
                  <span className="text-base leading-none">{String(activeDay.dayNumber).padStart(2, "0")}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm sm:text-base font-black text-white">
                      આ તારીખની સરકારી ભરતીઓ ({activeDay.dateStr})
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {activeDay.jobsCount} Jobs Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    નીચે ભરતીનું સત્તાવાર વર્ણન (Job Description) અને પગાર ધોરણ (Salary) આપેલું છે.
                  </p>
                </div>
              </div>

              {activeDay.jobsCount > 0 && (
                <button
                  onClick={() => setModalJob(activeDay.jobs[0])}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition flex items-center space-x-1 shrink-0 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Full Pop-up Box</span>
                </button>
              )}
            </div>

            {activeDay.jobsCount === 0 ? (
              <div className="py-6 text-center text-xs text-slate-300">
                આ તારીખે કોઈ વિશેષ છેલ્લી તારીખ નથી. અઠવાડિયાની અન્ય તારીખો પર ક્લિક કરીને સરકારી નોકરીઓ જુઓ.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeDay.jobs.map((job) => (
                  <div
                    key={job._id || job.id}
                    className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-3 shadow-sm"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-500/25 text-blue-200 border border-blue-400/30 truncate">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
                          {job.vacancies} જગાઓ
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-white leading-snug">
                        {job.title}
                      </h4>

                      {/* Prominent Salary Box */}
                      <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5 text-emerald-300">
                          <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-[11px] font-bold">પગાર ધોરણ (Salary):</span>
                        </div>
                        <span className="text-xs sm:text-sm font-black text-emerald-200">
                          {job.salary}
                        </span>
                      </div>

                      {/* Prominent Job Description Box */}
                      <div className="bg-slate-950/60 border border-white/10 rounded-xl p-3 space-y-1">
                        <div className="flex items-center space-x-1.5 text-amber-300 text-[11px] font-extrabold">
                          <FileText className="w-3.5 h-3.5" />
                          <span>જોબનું વર્ણન અને કામનું સ્વરૂપ (Job Description):</span>
                        </div>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed line-clamp-3">
                          {job.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">લાયકાત (Eligibility):</span>
                          <span className="truncate block font-medium">{job.eligibility}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">છેલ્લી તારીખ:</span>
                          <strong className="text-amber-300 font-bold">{job.lastDate}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (onSelectJob) onSelectJob(job);
                          else setModalJob(job);
                        }}
                        className="flex-1 py-2 px-3 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold text-center transition cursor-pointer"
                      >
                        સંપૂર્ણ વિગતો / View Details
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleShareJob(e, job)}
                        className="p-2 bg-white/10 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer shrink-0"
                        title="Share this Job Direct Link"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (onSelectJob) onSelectJob(job);
                          else setModalJob(job);
                        }}
                        className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shrink-0 shadow-md cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Pop-up Modal with Full Job Description & Salary */}
      {modalJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-black uppercase px-2.5 py-1 rounded bg-blue-500/25 text-blue-300 border border-blue-400/30">
                  {modalJob.department}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">{modalJob.title}</h3>
              </div>
              <button 
                onClick={() => setModalJob(null)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-emerald-950/70 border border-emerald-500/50 rounded-2xl p-4">
              <div className="text-xs font-bold text-emerald-300 uppercase">પગાર ધોરણ (Official Pay Scale &amp; Monthly Salary)</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">{modalJob.salary}</div>
              <p className="text-xs text-emerald-200/80 mt-1">Includes Basic Pay + DA + HRA + Transport &amp; Medical Allowances.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-bold text-amber-300">સત્તાવાર જોબ વર્ણન (Job Scope &amp; Official Duties):</div>
              <p className="text-sm text-slate-200 leading-relaxed">{modalJob.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block font-semibold">લાયકાત (Eligibility):</span>
                <span className="font-bold text-white text-sm">{modalJob.eligibility}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block font-semibold">કુલ જગાઓ (Total Vacancies):</span>
                <span className="font-bold text-white text-sm">{modalJob.vacancies} Posts</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setModalJob(null)} 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>
                <button 
                  type="button"
                  onClick={(e) => handleShareJob(e, modalJob)} 
                  className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Job Link</span>
                </button>
              </div>
              <a 
                href={modalJob.applyUrl || 'https://jobopedia.in'} 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-lg transition flex items-center space-x-2 cursor-pointer"
              >
                <span>Submit Form on Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
