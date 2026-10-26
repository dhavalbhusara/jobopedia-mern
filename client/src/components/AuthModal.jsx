import React, { useState } from 'react';
import { X, LogIn, Mail, Lock, User, Phone, MapPin, GraduationCap, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    fullName: '',
    mobileNumber: '',
    state: 'Gujarat',
    qualification: 'Graduate - Any Stream / Any Discipline'
  });

  React.useEffect(() => {
    setError('');
    setSuccessMsg('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const cleanIdentifier = formData.identifier.trim();
      const cleanPassword = formData.password.trim();

      if (!cleanIdentifier) {
        throw new Error('Please enter your Email Address or 10-digit Mobile Number.');
      }
      if (!cleanPassword || cleanPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      // Step 1: Attempt Login
      let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanIdentifier, password: cleanPassword })
      });

      let data = await res.json();

      // Step 2: If account does not exist, seamlessly auto-create account on Login!
      if (!res.ok && data.error && (data.error.includes('No account found') || data.error.includes('Register first'))) {
        const isEmail = cleanIdentifier.includes('@');
        const regPayload = {
          fullName: formData.fullName.trim() || cleanIdentifier.split('@')[0],
          email: isEmail ? cleanIdentifier : `${cleanIdentifier}@jobopedia.user`,
          mobileNumber: isEmail ? (formData.mobileNumber || '') : cleanIdentifier,
          password: cleanPassword,
          state: formData.state,
          qualification: formData.qualification
        };

        const regRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regPayload)
        });

        const regData = await regRes.json();
        if (regRes.ok && regData.success) {
          res = regRes;
          data = regData;
        } else {
          throw new Error(regData.error || data.error);
        }
      } else if (!res.ok || !data.success) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      // Save credentials & notify parent
      localStorage.setItem('jobopedia_token', data.token);
      localStorage.setItem('jobopedia_user', JSON.stringify(data.user));

      setSuccessMsg(`Welcome, ${data.user.fullName || 'Candidate'}! Login successful.`);
      
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 700);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 transition-all my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1528] to-slate-900 text-white p-6 relative">
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#F58220] mb-2">
            <span>Unified Candidate &amp; Admin Access</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            Sign In to Jobopedia
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access application trackers, CBT mock test analytics &amp; saved jobs.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Email / Mobile */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address or 10-Digit Mobile Number *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="identifier"
                required
                value={formData.identifier}
                onChange={handleChange}
                placeholder="e.g. candidate@example.com or 9876543210"
                className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 6 chars)"
                className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Optional Profile Info Toggle (For new accounts / custom preferences) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowProfileDetails(!showProfileDetails)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
            >
              <span>{showProfileDetails ? 'Hide' : '+ Customize'} Name, State &amp; Qualification</span>
              {showProfileDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showProfileDetails && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#F58220] outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Home State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#F58220] outline-hidden truncate"
                    >
                      {ALL_INDIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Qualification</label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#F58220] outline-hidden truncate"
                    >
                      {ALL_QUALIFICATIONS.map(q => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#F58220] hover:bg-[#ea580c] disabled:bg-slate-300 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Continue &amp; Login</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-500 font-medium">
            New user? Simply enter your details above and click Continue — your account is auto-created instantly!
          </p>

        </form>

      </div>
    </div>
  );
}
