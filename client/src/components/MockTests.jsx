import React, { useState, useEffect } from 'react';
import { FileCheck, Clock, CheckCircle2, XCircle, Play, Award, Sparkles, BookOpen } from 'lucide-react';
import CbtExamHall from './CbtExamHall';

export default function MockTests() {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mock-tests')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.tests?.length > 0) {
          setTests(data.tests);
        } else {
          // Fallback test series if DB empty
          setTests([
            {
              testId: 'upsc-gs-1',
              exam: 'UPSC Civil Services',
              title: 'UPSC Prelims General Studies Paper 1 Mock Simulator',
              durationMinutes: 25,
              totalQuestions: 10,
              questions: [
                {
                  id: 1,
                  question: "Which Constitutional Amendment Act introduced the Goods and Services Tax (GST) in India?",
                  options: ["99th Amendment Act", "100th Amendment Act", "101st Amendment Act", "103rd Amendment Act"],
                  correctIndex: 2,
                  explanation: "The 101st Constitutional Amendment Act, 2016 introduced the national Goods and Services Tax (GST) in India."
                },
                {
                  id: 2,
                  question: "Under the Indian Constitution, the 'Right to Privacy' is protected as an intrinsic part of which Article?",
                  options: ["Article 14", "Article 19", "Article 21", "Article 25"],
                  correctIndex: 2,
                  explanation: "In the landmark Justice K.S. Puttaswamy (Retd.) vs Union of India case (2017), the Supreme Court ruled that the Right to Privacy is protected under Article 21."
                },
                {
                  id: 3,
                  question: "Which river in India crosses the Tropic of Cancer twice during its flow?",
                  options: ["Narmada", "Mahi", "Tapi", "Chambal"],
                  correctIndex: 1,
                  explanation: "The Mahi River originates in Madhya Pradesh, flows through Rajasthan and Gujarat, crossing the Tropic of Cancer twice."
                },
                {
                  id: 4,
                  question: "Who among the following was the Viceroy of India when the Indian National Congress was founded in 1885?",
                  options: ["Lord Ripon", "Lord Dufferin", "Lord Curzon", "Lord Lansdowne"],
                  correctIndex: 1,
                  explanation: "Lord Dufferin was the Viceroy of India when the Indian National Congress was founded by A.O. Hume in Bombay in December 1885."
                },
                {
                  id: 5,
                  question: "The Monetary Policy Committee (MPC) of the Reserve Bank of India consists of how many members?",
                  options: ["4 Members", "5 Members", "6 Members", "8 Members"],
                  correctIndex: 2,
                  explanation: "The MPC has 6 members: 3 from the Reserve Bank of India including the Governor, and 3 external members appointed by the Government of India."
                }
              ]
            },
            {
              testId: 'ssc-cgl-tier1',
              exam: 'SSC CGL 2026',
              title: 'SSC CGL Tier-1 General Intelligence & Quantitative Aptitude',
              durationMinutes: 20,
              totalQuestions: 8,
              questions: [
                {
                  id: 1,
                  question: "Find the missing number in the series: 3, 7, 15, 31, 63, ?",
                  options: ["95", "111", "127", "129"],
                  correctIndex: 2,
                  explanation: "The pattern is (x * 2) + 1: 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1=127."
                },
                {
                  id: 2,
                  question: "If 'A' denotes '+', 'B' denotes '-', 'C' denotes '×', and 'D' denotes '÷', then what is the value of: 16 C 4 A 12 D 3 B 5?",
                  options: ["59", "63", "65", "71"],
                  correctIndex: 1,
                  explanation: "Equation: 16 * 4 + 12 / 3 - 5 = 64 + 4 - 5 = 63."
                },
                {
                  id: 3,
                  question: "Where are the headquarters of the Food and Agriculture Organization (FAO) located?",
                  options: ["Geneva, Switzerland", "Rome, Italy", "Paris, France", "Vienna, Austria"],
                  correctIndex: 1,
                  explanation: "The Food and Agriculture Organization (FAO) is a specialized agency of the UN headquartered in Rome, Italy."
                }
              ]
            },
            {
              testId: 'gpsc-cce-1',
              exam: 'GPSC / GSSSB CCE',
              title: 'Gujarat Secondary Service (GSSSB CCE) Reasoning & General Studies',
              durationMinutes: 20,
              totalQuestions: 5,
              questions: [
                {
                  id: 1,
                  question: "ગુજરાતમાં પંચાયતી રાજનો અમલ કઈ તારીખથી શરૂ થયો હતો?",
                  options: ["1 મે, 1960", "1 એપ્રિલ, 1963", "15 ઓગસ્ટ, 1965", "26 જાન્યુઆરી, 1962"],
                  correctIndex: 1,
                  explanation: "ગુજરાતમાં પંચાયતી રાજ અધિનિયમ મુજબ 1 એપ્રિલ, 1963 ના રોજથી પંચાયતી રાજનો અમલ શરૂ થયો હતો."
                },
                {
                  id: 2,
                  question: "કયા મોગલ શાસકનો જન્મ ગુજરાતના દાહોદ ખાતે થયો હતો?",
                  options: ["અકબર", "જહાંગીર", "શાહજહાં", "ઔરંગઝેબ"],
                  correctIndex: 3,
                  explanation: "મોગલ બાદશાહ ઔરંગઝેબનો જન્મ 3 નવેમ્બર 1618 ના રોજ ગુજરાતના દાહોદ ખાતે થયો હતો."
                }
              ]
            }
          ]);
        }
      })
      .catch(err => console.error("Error loading tests:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="mock-tests" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Real Exam CBT Hall Simulator
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Official Mock Tests &amp; Practice MCQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            One question per screen, live countdown timer, and interactive Question Palette (Green: Answered, Red: Unanswered, Purple: Marked for Review).
          </p>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tests.map(test => (
          <div key={test.testId} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {test.exam}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{test.durationMinutes} Mins</span>
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 leading-snug">
                {test.title}
              </h3>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Standard syllabus test with negative marking (+2.00 / -0.66), single-question view, and instant score analysis.
              </p>

              <div className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                <span className="font-bold text-slate-700">{test.questions?.length || test.totalQuestions} Questions</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">Negative Marking</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTest(test)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-black transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Mock Test (CBT Hall)</span>
            </button>
          </div>
        ))}
      </div>

      {/* Full-Screen CBT Exam Hall Interface */}
      {activeTest && (
        <CbtExamHall 
          test={activeTest} 
          onExit={() => setActiveTest(null)} 
        />
      )}

    </section>
  );
}
