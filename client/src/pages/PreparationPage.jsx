import React from 'react';
import { BookOpen, CheckCircle2, Clock, Award, FileText, ArrowLeft, Download, Bookmark } from 'lucide-react';

export default function PreparationPage({ setCurrentView }) {
  const downloadBlueprint = (title) => {
    alert(`Downloading ${title} PDF study guide...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 flex items-center space-x-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800">Exam Preparation Guide 2026</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0F2942] via-[#1E3A8A] to-[#0A1D30] rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-3">
        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block">
          🎯 Official 2026 Examination Roadmaps
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          Exam Preparation Guide &amp; Daily Study Timetable
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          Comprehensive syllabus blueprints, subject weightage, study roadmaps, and topper strategies for competitive examinations (GSSSB CCE, Police Constable, Talati, GPSC &amp; SSC).
        </p>
      </div>

      {/* Blueprint 1: GSSSB CCE Group A & B */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              GSSSB New Pattern 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              1. GSSSB CCE (Group A &amp; B) Prelims Blueprint — 100 Marks (60 Minutes)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              For Junior Clerk, Senior Clerk, Head Clerk, and Office Assistant posts
            </p>
          </div>
          <button
            onClick={() => downloadBlueprint('GSSSB CCE')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Syllabus PDF</span>
          </button>
        </div>

        {/* 4 Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-2xl font-black text-blue-600">40 Marks</div>
            <h4 className="text-sm font-bold text-slate-900">Reasoning &amp; Analytics</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Coding-Decoding, Blood Relations, Direction &amp; Distance, Calendars, Clocks, and Seating Arrangements.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-2xl font-black text-amber-600">30 Marks</div>
            <h4 className="text-sm font-bold text-slate-900">Quantitative Aptitude</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Percentages, Profit &amp; Loss, Ratio &amp; Proportion, Time &amp; Work, Simple &amp; Compound Interest, Averages.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-2xl font-black text-emerald-600">15 Marks</div>
            <h4 className="text-sm font-bold text-slate-900">Regional Language &amp; Grammar</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Orthography, Compounds, Figures of Speech, Synonyms, Antonyms, and Idiomatic Expressions.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-2xl font-black text-purple-600">15 Marks</div>
            <h4 className="text-sm font-bold text-slate-900">English Grammar &amp; Vocab</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tenses, Active &amp; Passive Voice, Direct &amp; Indirect Speech, Prepositions, Idioms &amp; Vocabulary.
            </p>
          </div>
        </div>
      </div>

      {/* Blueprint 2: Police Constable */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Police &amp; PSI Recruitment 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              2. Police Constable &amp; Sub-Inspector (PSI) Examination Blueprint
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Physical Efficiency &amp; Measurement Test (PET/PST) and 200-Mark Written Exam Pattern
            </p>
          </div>
          <button
            onClick={() => downloadBlueprint('Gujarat Police')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Physical Chart PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <h4 className="text-sm font-bold text-emerald-900 flex items-center space-x-2">
              <span>🏃</span>
              <span>Step 1: Physical Efficiency Test (PET)</span>
            </h4>
            <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
              <li><strong>Male Candidates:</strong> 5000 meters run — to be completed within 25 minutes.</li>
              <li><strong>Female Candidates:</strong> 1600 meters run — to be completed within 9 minutes 30 seconds.</li>
              <li><strong>Minimum Height Standards:</strong> General Category 165 cm, Reserved Categories 162 cm.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
            <h4 className="text-sm font-bold text-blue-900 flex items-center space-x-2">
              <span>📝</span>
              <span>Step 2: Written Examination (200 Marks)</span>
            </h4>
            <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
              <li><strong>Bharatiya Nyaya Sanhita (BNS / Penal Code):</strong> Foundational legal statutes and procedural rights.</li>
              <li><strong>Constitution of India (Polity):</strong> Fundamental Rights, Duties, President, Judiciary, State Executive.</li>
              <li><strong>General Studies &amp; Geography:</strong> National Geography, Key Rivers, Sanctuaries, and Historical Heritage.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Daily Study Routine Recommendation */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-5">
        <h3 className="text-xl font-black text-amber-300">
          ⏰ Topper's Recommended Daily Study Timetable (Ideal Schedule)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-amber-400 font-bold">Morning 06:00 - 09:00</div>
            <div className="font-bold text-white text-sm">Current Affairs &amp; General Knowledge</div>
            <p className="text-slate-300">National events, daily editorial reading, official gazettes, and practice quizzes.</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-emerald-400 font-bold">Afternoon 11:00 - 02:00</div>
            <div className="font-bold text-white text-sm">Quantitative Aptitude &amp; Reasoning</div>
            <p className="text-slate-300">Solve at least 50 numerical and analytical questions daily; note down shortcuts.</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-blue-400 font-bold">Evening 07:00 - 10:00</div>
            <div className="font-bold text-white text-sm">Online Mock Tests &amp; Revision</div>
            <p className="text-slate-300">Attempt full-length CBT practice tests, analyze incorrect answers, and revise daily notes.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
