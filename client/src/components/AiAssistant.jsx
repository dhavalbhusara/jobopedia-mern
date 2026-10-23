import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Namaste! I am your Jobopedia AI Career Assistant. How can I guide your job preparation today?' }
  ]);
  const [input, setInput] = useState('');

  const sendQuery = (text) => {
    const q = text || input;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { from: 'user', text: q }]);
    setInput('');

    setTimeout(() => {
      let reply = "You can view complete recruitment details, syllabus, and pay scale on our weekly calendar above!";
      if (q.toLowerCase().includes('sarkari') || q.toLowerCase().includes('govt')) {
        reply = "Upcoming top government recruitments include UPSC Civil Services (1,056 posts), SSC CGL (17,727 posts), and Railway RRB NTPC. Check our Weekly Calendar for all 1-7 date updates!";
      } else if (q.toLowerCase().includes('resume') || q.toLowerCase().includes('ats')) {
        reply = "To get shortlisted by HR, match your resume skills to the Job Description keywords. Use our 'AI Resume Keywords' tool in the navbar!";
      } else if (q.toLowerCase().includes('salary')) {
        reply = "Central govt pay levels range from Level 1 (₹18,000) up to Level 10 (₹56,100 - ₹2,50,000) with DA, HRA, and medical allowances included.";
      }

      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl flex items-center justify-center text-xl hover:scale-105 transition cursor-pointer"
        title="Ask Jobopedia AI Assistant"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[420px]">
          <div className="bg-[#0F2942] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <span className="font-extrabold text-sm">Jobopedia Career AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.from === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-slate-100 flex gap-1 overflow-x-auto text-[10px] scrollbar-none">
            <button onClick={() => sendQuery('Top Sarkari Jobs 2026')} className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap hover:bg-slate-200">
              Top Sarkari Jobs
            </button>
            <button onClick={() => sendQuery('ATS Resume Tips')} className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap hover:bg-slate-200">
              ATS Tips
            </button>
          </div>

          <div className="p-3 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
              placeholder="Ask anything about govt or corporate jobs..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
            />
            <button onClick={() => sendQuery()} className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
