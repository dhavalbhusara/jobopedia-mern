import React, { useState, useEffect } from 'react';
import { 
  Clock, ArrowRight, ArrowLeft, CheckCircle2, XCircle, 
  HelpCircle, RotateCcw, AlertTriangle, ShieldCheck, 
  Award, Check, ChevronRight, X, Bookmark
} from 'lucide-react';

export default function CbtExamHall({ test, onExit }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qIdx]: optionIdx }
  const [visited, setVisited] = useState({ 0: true }); // { [qIdx]: boolean }
  const [markedForReview, setMarkedForReview] = useState({}); // { [qIdx]: boolean }
  const [timeLeft, setTimeLeft] = useState((test.durationMinutes || 25) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const questions = test?.questions || [];
  const currentQuestion = questions[currentIdx];

  // Live Timer Countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleClearResponse = () => {
    if (isSubmitted) return;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIdx];
      return copy;
    });
  };

  const handleToggleReview = () => {
    if (isSubmitted) return;
    setMarkedForReview(prev => ({
      ...prev,
      [currentIdx]: !prev[currentIdx]
    }));
  };

  const goToQuestion = (idx) => {
    if (idx < 0 || idx >= questions.length) return;
    setCurrentIdx(idx);
    setVisited(prev => ({ ...prev, [idx]: true }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      goToQuestion(currentIdx + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      goToQuestion(currentIdx - 1);
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setShowConfirmModal(false);

    // Save score in local user history
    try {
      let score = 0;
      questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) score++;
      });
      const historyItem = {
        id: Date.now(),
        title: test.title || test.exam,
        score: `${score}/${questions.length}`,
        accuracy: `${Math.round((score / questions.length) * 100)}%`,
        date: new Date().toLocaleDateString('en-IN'),
        status: (score / questions.length) >= 0.5 ? 'Passed' : 'Needs Improvement'
      };
      const existing = JSON.parse(localStorage.getItem('jobopedia_mock_scores') || '[]');
      localStorage.setItem('jobopedia_mock_scores', JSON.stringify([historyItem, ...existing]));
    } catch (e) {}
  };

  // Status calculation for the Right Palette
  // Green = Answered (conducted)
  // Red = Visited but not answered
  // Purple = Marked for review
  // Grey = Not visited
  const getQuestionStatus = (idx) => {
    const isAnswered = userAnswers[idx] !== undefined;
    const isReview = markedForReview[idx];
    const isSeen = visited[idx];

    if (isAnswered && isReview) return 'review-answered';
    if (isReview) return 'review';
    if (isAnswered) return 'answered'; // Green
    if (isSeen) return 'not-answered'; // Red
    return 'not-visited'; // Grey
  };

  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = Object.keys(markedForReview).filter(k => markedForReview[k]).length;
  const notAnsweredCount = Object.keys(visited).filter(k => userAnswers[k] === undefined).length;
  const notVisitedCount = questions.length - Object.keys(visited).length;

  // Calculate score upon submission
  let totalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  if (isSubmitted) {
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        totalScore += 2;
        correctCount++;
      } else if (userAnswers[idx] !== undefined) {
        totalScore -= 0.66;
        wrongCount++;
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col font-sans select-none overflow-hidden">
      
      {/* Top CBT Hall Exam Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs text-white shadow-xs">
            CBT
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black text-white leading-tight">
              {test.title || test.exam} — Online CBT Examination Hall
            </h1>
            <span className="text-[10px] text-slate-400">
              Negative Marking: +2.00 / -0.66 • Section: General Awareness &amp; Aptitude
            </span>
          </div>
        </div>

        {/* Live Timer & Submit */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-black shadow-inner ${
            timeLeft < 180 
              ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse' 
              : 'bg-slate-900 border-slate-700 text-amber-300'
          }`}>
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
            >
              Submit Exam
            </button>
          )}

          {isSubmitted && (
            <button
              onClick={onExit}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
            >
              Exit Exam Hall
            </button>
          )}
        </div>
      </header>

      {/* Main Examination Hall: Split Two-Column Layout */}
      {!isSubmitted ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT 70%: SINGLE MCQ DISPLAY */}
          <main className="flex-1 flex flex-col justify-between bg-slate-900 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            
            <div className="max-w-3xl mx-auto w-full space-y-6">
              
              {/* Question Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 font-black text-xs">
                    Question {currentIdx + 1} of {questions.length}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Marks: +2.00 / -0.66
                  </span>
                </div>

                <button
                  onClick={handleToggleReview}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition flex items-center space-x-1 cursor-pointer ${
                    markedForReview[currentIdx]
                      ? 'bg-purple-900/60 border-purple-400 text-purple-200'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentIdx] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 text-slate-100 text-sm sm:text-base font-semibold leading-relaxed shadow-md">
                {currentQuestion?.question}
              </div>

              {/* 4 Clickable Options */}
              <div className="space-y-3">
                {currentQuestion?.options?.map((option, optIdx) => {
                  const isSelected = userAnswers[currentIdx] === optIdx;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-md ring-2 ring-blue-500/30'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center transition ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 text-white'
                        }`}>
                          {optionLetters[optIdx]}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold">{option}</span>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-blue-500 bg-blue-600' : 'border-slate-600'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="max-w-3xl mx-auto w-full pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClearResponse}
                  disabled={userAnswers[currentIdx] === undefined}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Clear Selection
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>{currentIdx === questions.length - 1 ? 'Save & Finish' : 'Save & Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </main>

          {/* RIGHT 30%: PALETTE & STATUS TRACKER */}
          <aside className="w-full lg:w-80 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 sm:p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
            
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Question Palette (CBT Grid)
              </h3>

              {/* Status Counters Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 shrink-0"></span>
                  <span className="text-slate-300">Answered: <strong className="text-emerald-400">{answeredCount}</strong></span>
                </div>

                <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="w-3.5 h-3.5 rounded-md bg-rose-500 shrink-0"></span>
                  <span className="text-slate-300">Not Answered: <strong className="text-rose-400">{notAnsweredCount}</strong></span>
                </div>

                <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="w-3.5 h-3.5 rounded-md bg-purple-500 shrink-0"></span>
                  <span className="text-slate-300">Review: <strong className="text-purple-300">{reviewCount}</strong></span>
                </div>

                <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="w-3.5 h-3.5 rounded-md bg-slate-700 shrink-0"></span>
                  <span className="text-slate-300">Not Visited: <strong className="text-slate-400">{notVisitedCount}</strong></span>
                </div>
              </div>

              {/* Interactive MCQ Numbers Grid */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-400 mb-2">Click any Question No. to Jump:</div>
                <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                  {questions.map((_, idx) => {
                    const status = getQuestionStatus(idx);
                    const isCurrent = idx === currentIdx;

                    let bgClass = "bg-slate-800 text-slate-300 border-slate-700";
                    if (status === 'answered') bgClass = "bg-emerald-600 text-white border-emerald-400 font-black";
                    else if (status === 'not-answered') bgClass = "bg-rose-600 text-white border-rose-400 font-black";
                    else if (status === 'review' || status === 'review-answered') bgClass = "bg-purple-600 text-white border-purple-400 font-black";

                    return (
                      <button
                        key={idx}
                        onClick={() => goToQuestion(idx)}
                        className={`h-9 rounded-xl border text-xs font-bold transition flex items-center justify-center cursor-pointer ${bgClass} ${
                          isCurrent ? 'ring-2 ring-amber-400 scale-105 shadow-md' : 'hover:opacity-90'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Candidate Box */}
            <div className="pt-4 border-t border-slate-800 mt-4">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg transition cursor-pointer"
              >
                Submit Examination Now
              </button>
            </div>

          </aside>

        </div>
      ) : (
        /* RESULT & DETAILED SOLUTIONS SCREEN UPON SUBMISSION */
        <div className="flex-1 bg-slate-900 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Scorecard Banner */}
            <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    CBT Test Result Declared
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black mt-2">
                    Exam Performance Scorecard
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    {test.title} • Completed on {new Date().toLocaleDateString('en-IN')}
                  </p>
                </div>

                <div className="text-center bg-white/5 border border-white/10 p-5 rounded-2xl shrink-0">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {correctCount} / {questions.length}
                  </div>
                  <div className="text-[11px] font-bold text-slate-300 mt-1">
                    Accuracy: {Math.round((correctCount / questions.length) * 100)}%
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10 text-center">
                <div>
                  <div className="text-xl font-black text-white">{questions.length}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Total Questions</div>
                </div>
                <div>
                  <div className="text-xl font-black text-emerald-400">{correctCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Correct (+{correctCount * 2})</div>
                </div>
                <div>
                  <div className="text-xl font-black text-rose-400">{wrongCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Wrong (-{(wrongCount * 0.66).toFixed(2)})</div>
                </div>
                <div>
                  <div className="text-xl font-black text-amber-400">{questions.length - answeredCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Skipped</div>
                </div>
              </div>
            </div>

            {/* Detailed Question-by-Question Solution Key */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Detailed Question Solutions &amp; Explanations</span>
              </h3>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userAns = userAnswers[idx];
                  const isCorrect = userAns === q.correctIndex;
                  const isSkipped = userAns === undefined;

                  return (
                    <div key={idx} className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400">Question {idx + 1}</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          isSkipped ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {isCorrect ? '✓ Correct (+2)' : isSkipped ? '● Unanswered (0)' : '✗ Incorrect (-0.66)'}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-slate-100">{q.question}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isUserChoice = userAns === optIdx;
                          const isRightChoice = q.correctIndex === optIdx;

                          let style = "bg-slate-900 border-slate-800 text-slate-300";
                          if (isRightChoice) style = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                          else if (isUserChoice && !isRightChoice) style = "bg-rose-950/80 border-rose-500 text-rose-200 line-through";

                          return (
                            <div key={optIdx} className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${style}`}>
                              <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              {isRightChoice && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs text-blue-200">
                          <strong className="text-blue-300">Explanation: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={onExit}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-lg transition cursor-pointer"
              >
                Done / Back to Dashboard
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Modal before Submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 text-white">
            <h3 className="text-lg font-black flex items-center space-x-2 text-amber-300">
              <AlertTriangle className="w-5 h-5" />
              <span>Submit Examination?</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to complete your test? Once submitted, your score will be calculated and solutions will be displayed.
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-emerald-400">
                <span>Questions Answered:</span>
                <strong className="font-black">{answeredCount}</strong>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Questions Unanswered:</span>
                <strong className="font-black">{questions.length - answeredCount}</strong>
              </div>
              <div className="flex justify-between text-purple-300">
                <span>Marked for Review:</span>
                <strong className="font-black">{reviewCount}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Continue Exam
              </button>

              <button
                onClick={handleSubmitExam}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
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
