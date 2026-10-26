import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle2, XCircle, AlertCircle, ArrowLeft, 
  ArrowRight, RotateCcw, Award, Check, FileText, ChevronRight 
} from 'lucide-react';

export default function CbtExamHall({ test, onExit }) {
  const questions = test?.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qIndex]: selectedOptionIndex }
  const [timeLeft, setTimeLeft] = useState((test?.durationMinutes || 15) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleClearResponse = () => {
    if (isSubmitted) return;
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIdx];
      return copy;
    });
  };

  const currentQ = questions[currentIdx] || { question: '', options: [] };
  const attemptedCount = Object.keys(answers).length;
  const unattemptedCount = Math.max(0, questions.length - attemptedCount);

  // Score computation
  const calculateResult = () => {
    let correct = 0;
    let wrong = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] !== undefined) {
        if (answers[idx] === q.correctIndex) {
          correct++;
        } else {
          wrong++;
        }
      }
    });
    const total = questions.length;
    const scorePercentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, wrong, unattempted: unattemptedCount, total, scorePercentage };
  };

  // If test already submitted, render scorecard
  if (isSubmitted) {
    const result = calculateResult();
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-in fade-in">
        
        {/* Scorecard Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
              Test Completed Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {test?.title || 'CBT Mock Examination'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Exam: {test?.exam} • Evaluation with Answer Key &amp; Explanations
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Questions</span>
              <span className="text-xl font-black text-white block mt-0.5">{result.total}</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Correct Answers</span>
              <span className="text-xl font-black text-emerald-400 block mt-0.5">{result.correct}</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-rose-400">Wrong Answers</span>
              <span className="text-xl font-black text-rose-400 block mt-0.5">{result.wrong}</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-amber-400">Accuracy Score</span>
              <span className="text-xl font-black text-amber-400 block mt-0.5">{result.scorePercentage}%</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setAnswers({});
                setCurrentIdx(0);
                setTimeLeft((test?.durationMinutes || 15) * 60);
                setIsSubmitted(false);
              }}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Mock Test</span>
            </button>
            <button
              onClick={onExit}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
            >
              Exit to Tests Hall
            </button>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            Question-by-Question Solution &amp; Explanations
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userChoice = answers[idx];
              const isCorrect = userChoice === q.correctIndex;
              const isSkipped = userChoice === undefined;

              return (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-extrabold text-sm text-slate-900">
                      Q{idx + 1}. {q.question}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shrink-0 ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : isSkipped
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {isCorrect ? 'Correct (+1)' : isSkipped ? 'Skipped (0)' : 'Incorrect (-0.25)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctIndex;
                      const isOptionSelected = oIdx === userChoice;
                      let badgeClass = "bg-white border-slate-200 text-slate-700";
                      if (isOptionCorrect) {
                        badgeClass = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                      } else if (isOptionSelected && !isCorrect) {
                        badgeClass = "bg-rose-50 border-rose-300 text-rose-900 font-bold line-through";
                      }

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${badgeClass}`}>
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isOptionCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // Live CBT Exam Room View (Split: One Question + Palette)
  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      
      {/* Top Test Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              title="Exit Test"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {test?.exam || 'CBT EXAM HALL'}
              </span>
              <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight truncate max-w-xs sm:max-w-md">
                {test?.title || 'Mock Test Examination'}
              </h1>
            </div>
          </div>

          {/* Countdown Timer Display */}
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-2xl border font-mono font-black text-sm sm:text-base ${
              timeLeft < 180 
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse' 
                : 'bg-slate-900 text-white border-slate-800'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 sm:px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-sm transition cursor-pointer"
            >
              Submit Exam
            </button>
          </div>

        </div>
      </header>

      {/* Main CBT Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANE (lg:col-span-8): Single Question Display */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between min-h-[500px]">
            
            <div className="space-y-4">
              {/* Question Header & Marks */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Question <span className="text-blue-600 text-base font-extrabold">{currentIdx + 1}</span> of {questions.length}
                </span>
                <div className="flex items-center space-x-2 text-[11px] font-bold">
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    +1.00 Mark
                  </span>
                  <span className="bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                    -0.25 Neg.
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* 4 Options Radio Style */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options?.map((option, oIdx) => {
                  const isSelected = answers[currentIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-4 rounded-2xl border text-left transition flex items-center space-x-3 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 text-blue-950 font-bold'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span className="text-xs sm:text-sm">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation & Action Buttons */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearResponse}
                  disabled={answers[currentIdx] === undefined}
                  className="px-3.5 py-2.5 text-rose-600 hover:bg-rose-50 disabled:opacity-30 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-md cursor-pointer"
                  >
                    <span>Save &amp; Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(true)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition flex items-center space-x-1 shadow-md cursor-pointer"
                  >
                    <span>Final Submit</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT PANE (lg:col-span-4): Question Palette Grid with Legend */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
            
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Question Palette (પ્રશ્ન નેવિગેશન)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Click any number to jump directly to that question
              </p>
            </div>

            {/* Status Legend (Follows User Instruction: Green = Available/Unattempted, Red = Attempted/Conducted) */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-md bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  {unattemptedCount}
                </span>
                <span className="text-slate-700">Remaining (Green)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-md bg-rose-500 text-white flex items-center justify-center text-[10px]">
                  {attemptedCount}
                </span>
                <span className="text-slate-700">Conducted (Red)</span>
              </div>
            </div>

            {/* Questions Grid 1 to N */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
              {questions.map((_, qIdx) => {
                const isAttempted = answers[qIdx] !== undefined;
                const isCurrent = qIdx === currentIdx;

                return (
                  <button
                    key={qIdx}
                    type="button"
                    onClick={() => setCurrentIdx(qIdx)}
                    className={`h-10 rounded-xl text-xs font-black transition flex items-center justify-center cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-blue-600 ring-offset-2 scale-105'
                        : ''
                    } ${
                      isAttempted
                        ? 'bg-rose-500 text-white shadow-xs' // RED for Conducted/Attempted
                        : 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600' // GREEN for Remaining/Unattempted
                    }`}
                  >
                    {qIdx + 1}
                  </button>
                );
              })}
            </div>

            {/* Summary Box */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Answered: <strong className="text-rose-600">{attemptedCount}</strong></span>
              <span>Pending: <strong className="text-emerald-600">{unattemptedCount}</strong></span>
            </div>

            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black transition cursor-pointer shadow-md"
            >
              Submit &amp; View Result
            </button>

          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">Are you sure you want to Submit?</h3>
            <p className="text-xs text-slate-500">
              You have answered <strong className="text-slate-800">{attemptedCount}</strong> out of {questions.length} questions. You will immediately see your detailed scorecard.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Continue Exam
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  setIsSubmitted(true);
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
