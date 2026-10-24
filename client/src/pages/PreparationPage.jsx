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
          પરીક્ષા તૈયારી ગાઈડ &amp; દૈનિક સ્ટડી ટાઈમટેબલ
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          ગુજરાત સરકારની મહત્વપૂર્ણ સ્પર્ધાત્મક પરીક્ષાઓ (GSSSB CCE, Police, Talati, GPSC) પાસ કરવા માટે સિલેબસ વેઇટેજ, ટાઈમટેબલ અને ટોપર્સ સ્ટ્રેટેજી.
        </p>
      </div>

      {/* Blueprint 1: GSSSB CCE Group A & B */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              GSSSB નવી પદ્ધતિ (New Pattern)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              1. GSSSB CCE (Group A &amp; B) પ્રિલિમ્સ બ્લુપ્રિન્ટ — 100 ગુણ (60 મિનિટ)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              જુનિયર ક્લાર્ક, સિનિયર ક્લાર્ક, હેડ ક્લાર્ક અને ઓફિસ આસિસ્ટન્ટ માટે
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
            <div className="text-2xl font-black text-blue-600">40 ગુણ</div>
            <h4 className="text-sm font-bold text-slate-900">રીઝનિંગ (Reasoning)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              કોડિંગ-ડિકોડિંગ, બ્લડ રિલેશન, દિશા અને અંતર, કેલેન્ડર, ઘડિયાળ અને બેઠક વ્યવસ્થા.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-2xl font-black text-amber-600">30 ગુણ</div>
            <h4 className="text-sm font-bold text-slate-900">મેથ્સ (Quantitative Aptitude)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              ટકાવારી, નફો-ખોટ, ગુણોત્તર, સમય અને કાર્ય, સાદું અને ચક્રવૃદ્ધિ વ્યાજ, સરેરાશ.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-2xl font-black text-emerald-600">15 ગુણ</div>
            <h4 className="text-sm font-bold text-slate-900">ગુજરાતી વ્યાકરણ (Gujarati)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              જોડણી, સમાસ, અલંકાર, છંદ, સમાનાર્થી, વિરુદ્ધાર્થી અને શબ્દસમૂહ માટે એક શબ્દ.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-2xl font-black text-purple-600">15 ગુણ</div>
            <h4 className="text-sm font-bold text-slate-900">અંગ્રેજી (English Grammar)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tenses, Voice (Active/Passive), Direct-Indirect, Prepositions, Idioms &amp; Vocab.
            </p>
          </div>
        </div>
      </div>

      {/* Blueprint 2: Gujarat Police Constable */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              ગુજરાત પોલીસ ભરતી 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              2. ગુજરાત પોલીસ કોન્સ્ટેબલ અને PSI ભરતી બ્લુપ્રિન્ટ
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              શારીરિક કસોટી (PET/PST) અને 200 ગુણની લેખિત પરીક્ષા માળખું
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
              <span>સ્ટેપ 1: શારીરિક કસોટી (Physical Test)</span>
            </h4>
            <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
              <li><strong>પુરુષ ઉમેદવારો:</strong> 5000 મીટર દોડ — મહત્તમ 25 મિનિટમાં પૂર્ણ કરવાની રહેશે.</li>
              <li><strong>મહિલા ઉમેદવારો:</strong> 1600 મીટર દોડ — મહત્તમ 9 મિનિટ 30 સેકન્ડમાં પૂર્ણ કરવાની રહેશે.</li>
              <li><strong>ઊંચાઈ (Height):</strong> સામાન્ય વર્ગ ૧૬૫ સે.મી., અનામત વર્ગ ૧૬૨ સે.મી.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
            <h4 className="text-sm font-bold text-blue-900 flex items-center space-x-2">
              <span>📝</span>
              <span>સ્ટેપ 2: લેખિત પરીક્ષા (Written Exam - 200 Marks)</span>
            </h4>
            <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
              <li><strong>ભારતીય ન્યાય સંહિતા (BNS / IPC):</strong> કાયદાના મૂળભૂત નિયમો અને અધિકારો.</li>
              <li><strong>ભારતનું બંધારણ (Polity):</strong> મૂળભૂત હક્કો, ફરજો, રાષ્ટ્રપતિ, રાજ્યપાલ, ન્યાયતંત્ર.</li>
              <li><strong>ગુજરાતનો ઇતિહાસ અને ભૂગોળ:</strong> જિલ્લાઓ, નદીઓ, અભયારણ્યો, સાહિત્યકારો.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Daily Study Routine Recommendation */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-5">
        <h3 className="text-xl font-black text-amber-300">
          ⏰ ટોપર્સનું આદર્શ દૈનિક સ્ટડી ટાઈમટેબલ (Ideal Daily Schedule)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-amber-400 font-bold">સવારે 06:00 - 09:00</div>
            <div className="font-bold text-white text-sm">કરંટ અફેર્સ &amp; જીકે (GK)</div>
            <p className="text-slate-300">તાજા વર્તમાન બનાવો, ગુજરાત પાક્ષિક, અખબાર વાંચન અને દૈનિક ક્વિઝ.</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-emerald-400 font-bold">બપોરે 11:00 - 02:00</div>
            <div className="font-bold text-white text-sm">ગણિત અને રીઝનિંગ પ્રેક્ટિસ</div>
            <p className="text-slate-300">દરરોજ ઓછામાં ઓછા 50 દાખલા સોલ્વ કરો; શોર્ટકટ ટ્રીક્સ નોંધો.</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-blue-400 font-bold">સાંજે 07:00 - 10:00</div>
            <div className="font-bold text-white text-sm">મોક ટેસ્ટ &amp; રિવિઝન</div>
            <p className="text-slate-300">ઓનલાઈન મોક ટેસ્ટ આપો, ભૂલોનું એનાલિસિસ કરો અને દિવસનું રિવિઝન કરો.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
