import React, { useState } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, User, Phone, MapPin, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = 'login' }) {
  const [isLoginView, setIsLoginView] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  React.useEffect(() => {
    setIsLoginView(initialMode === 'login');
    setError('');
    setSuccessMsg('');
  }, [initialMode, isOpen]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    state: 'Gujarat',
    qualification: 'Graduate'
  });

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
      const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
      const payload = isLoginView 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please check details.');
      }

      // Save token and user details in localStorage
      localStorage.setItem('jobopedia_token', data.token);
      localStorage.setItem('jobopedia_user', JSON.stringify(data.user));

      setSuccessMsg(isLoginView ? 'Welcome back! Login successful.' : 'Registration successful! Logged in.');
      
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 900);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 transition-all">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1528] to-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#F58220] mb-2">
            <span>Jobopedia Candidate & Admin Access</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {isLoginView ? 'Sign In to Your Account' : 'Create Free Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLoginView 
              ? 'Access application trackers, mock test analytics & saved jobs' 
              : 'Join over 1.2 Lakh job aspirants across India'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={() => { setIsLoginView(true); setError(''); }}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center space-x-2 ${
              isLoginView 
                ? 'bg-white text-slate-900 border-b-2 border-[#F58220] shadow-2xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4 text-[#F58220]" />
            <span>Login / Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => { setIsLoginView(false); setError(''); }}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center space-x-2 ${
              !isLoginView 
                ? 'bg-white text-slate-900 border-b-2 border-[#F58220] shadow-2xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#F58220]" />
            <span>New Registration</span>
          </button>
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
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Registration Extra Fields */}
          {!isLoginView && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Dhaval Bhusara"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email / Mobile / Username */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isLoginView ? 'Email Address or Mobile Number' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={isLoginView ? "Enter registered email or 10-digit mobile" : "name@example.com"}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden"
              />
            </div>
          </div>

          {/* State & Qualification for Registration */}
          {!isLoginView && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full pl-9 pr-2 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden bg-white"
                  >
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Central">All India / Central</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qualification</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full pl-9 pr-2 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F58220] focus:outline-hidden bg-white"
                  >
                    <option value="10th Pass">10th Pass</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="ITI / Diploma">ITI / Diploma</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-[#F58220] hover:bg-[#ea580c] disabled:bg-slate-300 text-white text-xs font-black rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : isLoginView ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Jobopedia</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Complete Registration</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          {isLoginView ? (
            <span>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => { setIsLoginView(false); setError(''); }}
                className="text-[#F58220] font-bold hover:underline"
              >
                Create one now
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button 
                type="button" 
                onClick={() => { setIsLoginView(true); setError(''); }}
                className="text-[#F58220] font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
