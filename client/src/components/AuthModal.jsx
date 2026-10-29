import React, { useState, useEffect } from 'react';
import { 
  X, LogIn, UserPlus, Mail, Lock, User, Phone, 
  MapPin, GraduationCap, AlertCircle, CheckCircle2, ArrowRight, Globe
} from 'lucide-react';
import { ALL_INDIAN_STATES, ALL_QUALIFICATIONS } from '../constants/referenceData';
import { useLanguage } from '../context/LanguageContext';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = 'login' }) {
  const { 
    language, 
    setLanguage, 
    t, 
    selectedState, 
    selectedDistrict, 
    getDistrictsForState, 
    getSpokenLanguages,
    handleStateChange: contextHandleStateChange,
    handleDistrictChange: contextHandleDistrictChange
  } = useLanguage();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    identifier: '', // Email or Phone for Login
    password: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    state: selectedState || 'Gujarat',
    district: selectedDistrict || 'ahmedabad',
    preferredLanguage: language || 'gu',
    qualification: 'Graduate - Any Stream / Any Discipline'
  });

  useEffect(() => {
    setMode(initialMode || 'login');
    setError('');
    setSuccessMsg('');
    if (selectedState) {
      setFormData(prev => ({
        ...prev,
        state: selectedState,
        district: selectedDistrict || prev.district,
        preferredLanguage: language || prev.preferredLanguage
      }));
    }
  }, [isOpen, initialMode, selectedState, selectedDistrict, language]);

  if (!isOpen) return null;

  const BACKEND_FALLBACK_URL = 'https://jobopedia-backend.onrender.com';

  const safeApiCall = async (endpoint, options = {}) => {
    let res = null;
    let isHtml = false;

    // 1. Try relative path (routed through Vercel or local proxy)
    try {
      res = await fetch(endpoint, options);
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        isHtml = true;
      }
    } catch (e) {
      isHtml = true;
    }

    // 2. If Vercel returned HTML (504 Gateway Timeout or server sleeping), failover directly to Render!
    if (isHtml || !res) {
      try {
        const directUrl = `${BACKEND_FALLBACK_URL}${endpoint}`;
        res = await fetch(directUrl, options);
        const directCt = res.headers.get('content-type') || '';
        if (!directCt.includes('application/json')) {
          throw new Error('સર્વર શરૂ થઈ રહ્યું છે (Server is waking up from sleep). કૃપા કરીને 5 સેકન્ડ રાહ જોઈને ફરી ક્લિક કરો.');
        }
      } catch (err) {
        throw new Error(err.message || 'સર્વર કનેક્શન થઈ શક્યું નથી. કૃપા કરીને થોડી સેકન્ડ પછી ફરી પ્રયાસ કરો.');
      }
    }

    let data = null;
    try {
      data = await res.json();
    } catch (parseErr) {
      throw new Error('સર્વર શરૂ થઈ રહ્યું છે. કૃપા કરીને 5 સેકન્ડ પછી ફરી સાઇન ઇન કરો.');
    }

    return { res, data };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onStateSelect = (e) => {
    const newState = e.target.value;
    const districts = getDistrictsForState(newState);
    const newDistrict = districts.length > 0 ? districts[0].id : '';
    const spoken = getSpokenLanguages(newState, newDistrict);
    const primaryLang = spoken.length > 0 ? spoken[0].code : 'gu';

    setFormData(prev => ({
      ...prev,
      state: newState,
      district: newDistrict,
      preferredLanguage: primaryLang
    }));
    contextHandleStateChange(newState);
    setLanguage(primaryLang);
    setError('');
  };

  const onDistrictSelect = (e) => {
    const newDistrict = e.target.value;
    const spoken = getSpokenLanguages(formData.state, newDistrict);
    const primaryLang = spoken.length > 0 ? spoken[0].code : 'gu';

    setFormData(prev => ({
      ...prev,
      district: newDistrict,
      preferredLanguage: primaryLang
    }));
    contextHandleDistrictChange(newDistrict, formData.state);
    setError('');
  };

  const onLanguageSelect = (langCode) => {
    setFormData(prev => ({ ...prev, preferredLanguage: langCode }));
    setLanguage(langCode);
  };

  const handleLoginSubmit = async (e) => {
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
      if (!cleanPassword) {
        throw new Error('Please enter your password.');
      }

      const { res, data } = await safeApiCall('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanIdentifier, password: cleanPassword })
      });

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials. If you are new, please register below.');
      }

      localStorage.setItem('jobopedia_token', data.token);
      localStorage.setItem('jobopedia_user', JSON.stringify(data.user));

      // If user has a preferred language saved, switch to it immediately
      if (data.user?.preferredLanguage) {
        setLanguage(data.user.preferredLanguage);
      }

      setSuccessMsg(`Welcome, ${data.user.fullName || 'Candidate'}! Login successful.`);
      
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 600);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const cleanName = formData.fullName.trim();
      const cleanEmail = formData.email.trim();
      const cleanMobile = formData.mobileNumber.trim();
      const cleanPassword = formData.password.trim();

      if (!cleanName) throw new Error('Please enter your Full Name.');
      if (!cleanEmail) throw new Error('Please enter your Email Address.');
      if (!cleanPassword || cleanPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      const { res, data } = await safeApiCall('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          mobileNumber: cleanMobile,
          password: cleanPassword,
          state: formData.state,
          district: formData.district,
          preferredLanguage: formData.preferredLanguage || language,
          qualification: formData.qualification
        })
      });

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      localStorage.setItem('jobopedia_token', data.token);
      localStorage.setItem('jobopedia_user', JSON.stringify(data.user));

      // Apply the selected language immediately across entire website
      if (formData.preferredLanguage) {
        setLanguage(formData.preferredLanguage);
      }

      setSuccessMsg(`Registration successful! Welcome to Jobopedia, ${cleanName}.`);

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
        
        {/* Header with Title and Mode Toggle */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 relative">
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center space-x-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-0.5 rounded-full text-xs font-semibold mb-2.5">
            <span>Unified Career Portal</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            {mode === 'login' ? 'Sign In to Jobopedia' : 'Create Free Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login' 
              ? 'Access application trackers, mock test analytics & saved jobs' 
              : 'Join to receive matching job alerts and mock tests for your degree'}
          </p>

          {/* Dual Toggle Tabs: LOGIN vs REGISTER */}
          <div className="grid grid-cols-2 gap-2 mt-5 bg-white/10 p-1 rounded-2xl backdrop-blur-xs">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 px-3 rounded-xl font-black text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                mode === 'login' 
                  ? 'bg-white text-slate-900 shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>🔑 Login (લૉગિન)</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`py-2 px-3 rounded-xl font-black text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                mode === 'register' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>📝 Register (ખાતું બનાવો)</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                    className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

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
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'Signing In...' : 'Sign In (લૉગિન કરો)'}</span>
              </button>

              <div className="pt-2 text-center">
                <span className="text-xs text-slate-500">New to Jobopedia? </span>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(''); }}
                  className="text-xs font-extrabold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                >
                  Create Account / Register here
                </button>
              </div>
            </form>
          ) : (
            /* TAB 2: REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full pl-9 pr-2 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full pl-9 pr-2 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password (min 6 chars) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t('auth_state_label', '૧. રાજ્ય (State)')} *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={onStateSelect}
                      className="w-full pl-8 pr-2 py-2 text-xs border border-slate-200 rounded-xl bg-white font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-hidden truncate"
                    >
                      {ALL_INDIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t('auth_district_label', '૨. જિલ્લો (District)')} *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 absolute left-2.5 top-3" />
                    <select
                      name="district"
                      value={formData.district}
                      onChange={onDistrictSelect}
                      className="w-full pl-8 pr-2 py-2 text-xs border border-blue-200 rounded-xl bg-blue-50/50 font-bold text-blue-900 focus:ring-2 focus:ring-blue-600 outline-hidden truncate"
                    >
                      {getDistrictsForState(formData.state).map(d => (
                        <option key={d.id} value={d.id}>
                          {d.nativeName ? `${d.nativeName} (${d.name})` : d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* District Spoken Language Interactive Selector */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 rounded-2xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-blue-900 font-black text-xs">
                    <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{t('auth_district_lang_title', '૩. જિલ્લા મુજબ બોલાતી ભાષા (District Language)')}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200 shadow-2xs">
                    {language.toUpperCase()} Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {t('auth_district_lang_desc', 'તમે પસંદ કરશો તે ભાષામાં આખી વેબસાઇટ આપોઆપ રૂપાંતરિત થઈ જશે:')}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {getSpokenLanguages(formData.state, formData.district).map((lang) => {
                    const isSelected = (formData.preferredLanguage || language) === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => onLanguageSelect(lang.code)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center space-x-1 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/30'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{lang.name}</span>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {t('auth_qual_label', 'શૈક્ષણિક લાયકાત (Qualification)')} *
                </label>
                <div className="relative">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full pl-8 pr-2 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-600 outline-hidden truncate"
                  >
                    {ALL_QUALIFICATIONS.map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{loading ? 'Creating Account...' : t('auth_register_submit', 'Create Account & Apply Language')}</span>
              </button>

              <div className="pt-2 text-center">
                <span className="text-xs text-slate-500">{t('auth_switch_to_login', 'Already have an account?')} </span>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-xs font-extrabold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                >
                  {t('auth_login_tab', 'Sign In / Login here')}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
