import React from 'react';
import { ShieldCheck, Target, Award, Users, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function AboutPage({ setCurrentView }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 flex items-center space-x-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800">About Jobopedia</span>
      </div>

      <div className="text-center space-y-3">
        <span className="bg-blue-100 text-blue-700 text-xs font-black uppercase px-3 py-1 rounded-full border border-blue-200 inline-block">
          Our Mission &amp; Purpose
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          About Jobopedia
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          India's premier verified career portal providing timely government vacancies, top private MNC opportunities, paid internships, and free CBT practice tests.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
          Our Core Mission
        </h2>
        <p>
          Students and job seekers frequently encounter misleading notices, fake vacancies, and outdated alerts online. <strong>Jobopedia</strong> was founded with a singular commitment: to empower every candidate with 100% free, direct access to official recruitment portals (such as UPSC, SSC, Railways, State Commissions) and verified corporate employers (including TCS, Infosys, Sun Pharma, and top BFSI banks).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="font-black text-slate-900 text-sm">100% Verified Data</h4>
            <p className="text-xs text-slate-500">Every recruitment notification is cross-referenced with official government gazettes before publishing.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Award className="w-6 h-6 text-blue-600" />
            <h4 className="font-black text-slate-900 text-sm">Free CBT Mock Tests</h4>
            <p className="text-xs text-slate-500">Realistic exam-standard computer-based mock tests with live timers, negative marking, and instant solutions.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Target className="w-6 h-6 text-amber-600" />
            <h4 className="font-black text-slate-900 text-sm">Free ATS Resume Builder</h4>
            <p className="text-xs text-slate-500">Build high-scoring, ATS-compliant corporate resumes tailored for leading multinational companies for free.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900">Headquarters &amp; Support Office</div>
            <div className="text-xs text-slate-500">Gandhinagar &amp; Ahmedabad, Gujarat, India</div>
          </div>
          <button 
            onClick={() => setCurrentView('contact')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer self-start sm:self-auto"
          >
            Contact Support Desk →
          </button>
        </div>
      </div>

    </div>
  );
}
