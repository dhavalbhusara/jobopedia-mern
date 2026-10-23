import React, { useState } from 'react';
import { Sparkles, Check, X, FileText } from 'lucide-react';

export default function ResumeBuilder({ isOpen, onClose }) {
  const [targetRole, setTargetRole] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!targetRole) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/resume-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole }),
      });
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-black text-slate-900">AI ATS Resume Keyword Optimizer</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Enter your desired job title. Our AI extracts high-frequency keywords that HR recruitment software filters for when selecting candidates.
        </p>

        <form onSubmit={handleGenerate} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Designation / Sector</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Software Engineer, Bank PO, Sub Inspector, AIIMS Nurse"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loading ? 'Analyzing Job Keywords...' : 'Generate High-ATS Keywords'}</span>
          </button>
        </form>

        {data && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Recommended ATS Keywords:</span>
              <div className="flex flex-wrap gap-1.5">
                {data.keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Suggested Profile Headline:</span>
              <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200">
                "{data.summaryHeadline}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
