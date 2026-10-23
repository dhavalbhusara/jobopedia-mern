import React, { useState, useEffect } from 'react';
import { FileCheck, Clock, CheckCircle2, XCircle, Printer, X, Play } from 'lucide-react';

export default function MockTests() {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/mock-tests')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTests(data.tests);
        }
      })
      .catch(err => console.error("Error loading tests:", err));
  }, []);

  const startTest = (test) => {
    setActiveTest(test);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    if (!activeTest) return 0;
    let score = 0;
    activeTest.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  return (
    <section id="mock-tests" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Exam Preparation
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
          National Mock Test Series &amp; MCQs
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Take authentic full-length practice tests. Solutions and full explanations are shown only after submission with PDF export.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tests.map(test => (
          <div key={test.testId} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                {test.exam}
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{test.durationMinutes} Mins</span>
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-900">
              {test.title}
            </h3>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Standard syllabus test with negative marking evaluation, timer, and detailed answer explanations.
            </p>

            <button
              onClick={() => startTest(test)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black transition flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Mock Test</span>
            </button>
          </div>
        ))}
      </div>

      {/* Test Taking Modal */}
      {activeTest && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between z-10">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {activeTest.exam}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{activeTest.title}</h3>
              </div>
              <button 
                onClick={() => setActiveTest(null)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Questions Container */}
            <div className="p-6 space-y-6 flex-1">
              <p className="text-xs text-slate-500 font-medium">
                Select your answers for all questions. Answers will remain hidden until you click "Submit Test &amp; View Solutions".
              </p>

              {activeTest.questions.map((q, qIdx) => {
                const userChoice = userAnswers[qIdx];
                return (
                  <div key={q.id || qIdx} className={`p-4 rounded-2xl border ${
                    isSubmitted 
                      ? userChoice === q.correctIndex 
                        ? 'bg-emerald-50/60 border-emerald-300' 
                        : 'bg-red-50/60 border-red-300'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}>
                    <div className="font-extrabold text-sm text-slate-900 mb-3">
                      Q{qIdx + 1}. {q.question}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isChecked = userChoice === optIdx;
                        let optClass = "p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2.5 transition cursor-pointer ";
                        
                        if (isSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optClass += "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                          } else if (isChecked && optIdx !== q.correctIndex) {
                            optClass += "bg-red-100 border-red-500 text-red-900 line-through";
                          } else {
                            optClass += "bg-white border-slate-200 text-slate-600 opacity-60";
                          }
                        } else {
                          optClass += isChecked ? "bg-blue-50 border-blue-600 text-blue-900 font-bold" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                        }

                        return (
                          <div key={optIdx} onClick={() => handleSelectOption(qIdx, optIdx)} className={optClass}>
                            <input 
                              type="radio" 
                              name={`q_${qIdx}`} 
                              checked={isChecked} 
                              disabled={isSubmitted} 
                              readOnly 
                              className="w-3.5 h-3.5 text-blue-600"
                            />
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reveal Explanations only AFTER submission! */}
                    {isSubmitted && (
                      <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                        <div className="font-bold text-slate-900 flex items-center space-x-1 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct Answer: {q.options[q.correctIndex]}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
              {isSubmitted ? (
                <>
                  <div className="text-sm font-black text-slate-900">
                    Score: <span className="text-blue-600 font-extrabold">{calculateScore()} / {activeTest.questions.length}</span> ({Math.round((calculateScore()/activeTest.questions.length)*100)}%)
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-sm cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Export / Print PDF</span>
                    </button>
                    <button
                      onClick={() => setActiveTest(null)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs text-slate-500 font-medium">
                    Answered {Object.keys(userAnswers).length} of {activeTest.questions.length}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsSubmitted(true)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                    >
                      Submit Test &amp; View Solutions
                    </button>
                    <button
                      onClick={() => setActiveTest(null)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
