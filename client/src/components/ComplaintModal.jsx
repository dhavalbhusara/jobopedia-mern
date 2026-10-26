import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle2, MessageSquare, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function ComplaintModal({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobileNumber: user?.mobileNumber || '',
    category: 'Job Application Issue',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: user?.id || user?._id || null
        })
      });
      const data = await res.json();

      if (data.success) {
        setTicketSuccess({
          ticketId: data.ticketId,
          message: data.message
        });
        setFormData({
          fullName: user?.fullName || '',
          email: user?.email || '',
          mobileNumber: user?.mobileNumber || '',
          category: 'Job Application Issue',
          subject: '',
          message: ''
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit complaint');
      }
    } catch (err) {
      setErrorMsg('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                User Help &amp; Grievance Redressal
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                કોઈપણ સમસ્યા, જોબ સંબંધિત ફરિયાદ કે સુચન અહીં નોંધાવો (Dhaval Admin Panel)
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {ticketSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">ફરિયાદ સફળતાપૂર્વક નોંધાઈ ગઈ છે!</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                તમારી ફરિયાદ <strong>Dhaval Admin Panel</strong> માં મોકલી દેવાઈ છે. અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે.
              </p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 inline-block">
              <span className="text-xs font-mono font-bold text-emerald-800">
                Ticket Reference: {ticketSuccess.ticketId}
              </span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => { setTicketSuccess(null); onClose(); }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
              >
                Close &amp; Back to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name (પૂરું નામ) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mobile / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="candidate@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Complaint Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-slate-700"
                >
                  <option value="Job Application Issue">Job Application Issue</option>
                  <option value="Fake or Expired Job Report">Fake / Expired Job Report</option>
                  <option value="MCQ / Test Question Error">MCQ / CBT Test Error</option>
                  <option value="Website Technical Problem">Website Technical Problem</option>
                  <option value="Account / Login Assistance">Account / Login Issue</option>
                  <option value="Suggestion / Feedback">Suggestion / Feedback</option>
                  <option value="Other Complaint">Other Complaint</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject (વિષય) *</label>
                <input
                  type="text"
                  required
                  placeholder="Short subject of complaint"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Complaint / Issue Details (વિગતવાર ફરિયાદ) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Mention complete details of your problem or difficulty..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black shadow-md transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Submitting...' : 'Submit Complaint (ફરિયાદ મોકલો)'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
