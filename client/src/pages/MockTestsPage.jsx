import React from 'react';
import MockTests from '../components/MockTests';
import { ArrowLeft, Award, Clock, FileCheck } from 'lucide-react';

export default function MockTestsPage({ setCurrentView }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 flex items-center space-x-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800">ઓનલાઇન મોક ટેસ્ટ્સ (Mock Tests CBT)</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#0F2942] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-3">
        <span className="bg-blue-400/20 text-blue-300 border border-blue-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block">
          ⚡ 2026 CBT Online Examination Simulator
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          ઓનલાઇન મોક ટેસ્ટ્સ &amp; પ્રેક્ટિસ પેપર્સ (Mock Tests MCQs)
        </h1>
        <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
          GSSSB CCE, Gujarat Police Constable, Talati અને GPSC માટે ટાઈમર, નેગેટિવ માર્કિંગ, ત્વરિત પરિણામ અને વિગતવાર સોલ્યુશન્સ સાથે સંપૂર્ણ તૈયારી.
        </p>
      </div>

      {/* Mock Tests Component */}
      <MockTests />

    </div>
  );
}
