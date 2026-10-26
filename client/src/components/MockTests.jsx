import React, { useState, useEffect } from 'react';
import { FileCheck, Clock, CheckCircle2, Play, Award, Sparkles, BookOpen } from 'lucide-react';
import CbtExamHall from './CbtExamHall';

export default function MockTests() {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mock-tests')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.tests)) {
          setTests(data.tests);
        }
      })
      .catch(err => console.error("Error loading tests:", err))
      .finally(() => setLoading(false));
  }, []);

  // If a mock test is active, render the full CBT Exam Hall simulator!
  if (activeTest) {
    return <CbtExamHall test={activeTest} onExit={() => setActiveTest(null)} />;
  }

  return (
    <section id="mock-tests" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            ⚡ 2026 CBT Online Examination Simulator
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            National Mock Test Series &amp; Practice MCQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Real CBT interface with live timer, Question Palette (Remaining in Green, Conducted in Red), instant scorecards and detailed answers.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 font-bold border border-slate-200">
          Loading authentic mock test papers...
        </div>
      ) : tests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
          No mock tests available right now. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tests.map(test => (
            <div 
              key={test.testId || test._id} 
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-400 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    {test.exam}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{test.durationMinutes || 15} Mins</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {test.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Authentic pattern with {test.questions?.length || 20} questions. Live countdown, negative marking (-0.25) &amp; full answer explanations.
                </p>

                <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{test.questions?.length || 20} Total Questions</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-extrabold">Instant Scorecard</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTest(test)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-black transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Mock Test (CBT Hall)</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
