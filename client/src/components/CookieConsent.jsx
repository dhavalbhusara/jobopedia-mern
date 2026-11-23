import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, Check, ExternalLink, Settings2 } from 'lucide-react';

export default function CookieConsent({ onOpenPrivacyPolicy }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true and locked
    advertising: true, // Google AdSense & personalized ads
    analytics: true   // Traffic measurement & improvements
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem('jobopedia_cookie_consent');
      if (!consent) {
        // Show after 1 second for a smooth non-intrusive appearance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  // Listen for custom event to re-open cookie preferences from Footer or Policy page
  useEffect(() => {
    const handleReopen = () => {
      setShowDetails(true);
      setIsVisible(true);
    };
    window.addEventListener('open_cookie_preferences', handleReopen);
    return () => window.removeEventListener('open_cookie_preferences', handleReopen);
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('jobopedia_cookie_consent', JSON.stringify({
        status: 'accepted_all',
        essential: true,
        advertising: true,
        analytics: true,
        timestamp: new Date().toISOString()
      }));
      window.dispatchEvent(new Event('jobopedia_cookie_consent_updated'));
    } catch (e) {}
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('jobopedia_cookie_consent', JSON.stringify({
        status: 'essential_only',
        essential: true,
        advertising: false,
        analytics: false,
        timestamp: new Date().toISOString()
      }));
      window.dispatchEvent(new Event('jobopedia_cookie_consent_updated'));
    } catch (e) {}
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem('jobopedia_cookie_consent', JSON.stringify({
        status: 'custom',
        essential: true,
        advertising: preferences.advertising,
        analytics: preferences.analytics,
        timestamp: new Date().toISOString()
      }));
      window.dispatchEvent(new Event('jobopedia_cookie_consent_updated'));
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-5 pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-4xl mx-auto bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-5 sm:p-6 pointer-events-auto text-slate-800 dark:text-slate-100 transition-colors">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-start space-x-3.5 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-2xs mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  Cookie &amp; Advertising Transparency Notice
                </h3>
                <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
                  Google AdSense Compliant
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Jobopedia uses cookies and related technologies (including <strong>Google AdSense</strong> and <strong>DoubleClick DART cookies</strong>) to maintain authentic sessions, remember your regional language &amp; dark mode preferences, deliver verified employment notices, and serve non-intrusive, relevant career advertisements.
              </p>
              <div className="pt-1 flex items-center space-x-3 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenPrivacyPolicy) onOpenPrivacyPolicy();
                    setIsVisible(false);
                  }}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <span>Review Detailed Cookie Policy &amp; Disclosures</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1 cursor-pointer"
                >
                  <Settings2 className="w-3 h-3" />
                  <span>{showDetails ? 'Hide Options' : 'Customize Preferences'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 shrink-0">
            <button
              type="button"
              onClick={handleAcceptEssential}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer text-center"
              title="Decline non-essential cookies"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-md transition cursor-pointer text-center"
              title="Accept all cookies and personalized ads"
            >
              Accept All Cookies
            </button>
          </div>

        </div>

        {/* Expandable Preferences Drawer */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Category 1: Essential */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 dark:text-white">Strictly Necessary</span>
                  <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">Always Active</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Authentication tokens, regional language selection, theme preferences &amp; core security safeguards.
                </p>
              </div>

              {/* Category 2: Advertising */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 dark:text-white">Google AdSense</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Google DART cookies (<code className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1 rounded">__gads</code>, <code className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1 rounded">__gpi</code>, <code className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1 rounded">IDE</code>) enabling relevant job adverts.
                </p>
              </div>

              {/* Category 3: Analytics */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 dark:text-white">Performance Analytics</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Aggregate anonymous visitor metrics and device compatibility diagnostics to optimize page speed.
                </p>
              </div>

            </div>

            <div className="flex items-center justify-end space-x-2 pt-1">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Save Selected Preferences
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
