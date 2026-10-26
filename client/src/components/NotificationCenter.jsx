import React, { useState, useEffect } from 'react';
import { 
  Bell, Check, X, ShieldCheck, Smartphone, CheckCircle2, 
  AlertCircle, Sparkles, Volume2
} from 'lucide-react';

export default function NotificationCenter({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pushStatus, setPushStatus] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });
  const [testSent, setTestSent] = useState(false);
  const [toastAlert, setToastAlert] = useState(null);
  const knownIdsRef = React.useRef(new Set());
  const initialFetchDoneRef = React.useRef(false);

  // Sync current permission status
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushStatus(Notification.permission);
    }
  }, [isOpen]);

  // Auto-fetch & Poll for newly uploaded jobs matching user's degree and interest
  useEffect(() => {
    fetchNotifications();

    // Poll every 15 seconds for newly published jobs
    const interval = setInterval(() => {
      fetchNotifications(true);
    }, 15000);

    return () => clearInterval(interval);
  }, [user]);

  const fetchNotifications = (isBackgroundPoll = false) => {
    const params = new URLSearchParams();
    if (user?.qualification) params.set('qualification', user.qualification);
    if (user?.state) params.set('state', user.state);

    fetch(`/api/notifications?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.notifications)) {
          const incoming = data.notifications;
          
          // Check for newly uploaded jobs that were not seen before
          if (initialFetchDoneRef.current && isBackgroundPoll) {
            const newlyAdded = incoming.filter(n => n._id && !knownIdsRef.current.has(n._id));
            if (newlyAdded.length > 0) {
              const latestItem = newlyAdded[0];
              
              // 1. Device Push Notification (Mobile Phone & PC Desktop)
              if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
                try {
                  new Notification(latestItem.title, {
                    body: latestItem.message,
                    icon: '/images/jobopedia-icon.png'
                  });
                } catch (e) {}
              }

              // 2. In-App Floating Toast Alert
              setToastAlert(latestItem);
              setTimeout(() => setToastAlert(null), 8000);
            }
          }

          // Update known IDs
          incoming.forEach(n => {
            if (n._id) knownIdsRef.current.add(n._id);
          });
          initialFetchDoneRef.current = true;
        }
      })
      .catch(err => console.error("Error loading notifications:", err));
  };

  // Enable Push Notifications for Phone & PC
  const requestDeviceNotifications = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support phone/desktop push notifications.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPushStatus(permission);

      if (permission === 'granted') {
        setTestSent(true);
        try {
          new Notification("🇮🇳 Jobopedia: Notifications Active!", {
            body: `You will now receive instant job notifications on this ${window.innerWidth < 768 ? 'Mobile Phone' : 'PC / Laptop'} matching your qualification!`,
            icon: '/images/jobopedia-icon.png'
          });
        } catch (e) {}
        setTimeout(() => setTestSent(false), 4000);
      } else if (permission === 'denied') {
        alert("Notifications were blocked. Please enable them in your browser settings (tap the lock icon in the address bar).");
      }
    } catch (e) {
      console.error("Notification permission error:", e);
    }
  };

  const sendTestNotification = () => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification("🇮🇳 Jobopedia Test Alert", {
          body: "Great! Your phone is ready to receive instant job alerts whenever new vacancies are posted.",
          icon: '/images/jobopedia-icon.png'
        });
        setTestSent(true);
        setTimeout(() => setTestSent(false), 3000);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="relative">
      
      {/* Bell Button in Navbar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`p-2 rounded-xl transition cursor-pointer relative ${
          isOpen 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
        }`}
        title="Job & Career Notifications (Phone & PC)"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {pushStatus !== 'granted' && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
        )}
      </button>

      {/* Clean Centered Notification Modal (No clutter, just Notification ON option) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          
          {/* Backdrop click to close */}
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)} 
          />

          <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">Job Notifications</h3>
                  <p className="text-[11px] text-blue-200 font-medium">Phone &amp; Desktop Alerts</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: ONLY NOTIFICATION ON OPTION */}
            <div className="p-6 text-center space-y-5">
              
              {pushStatus === 'granted' ? (
                <>
                  {/* ALREADY ACTIVE STATE */}
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 mx-auto flex items-center justify-center text-emerald-600 shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Notifications Active (ચાલુ છે)</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 pt-1">
                      તમારા ફોનમાં નોટિફિકેશન ચાલુ છે!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      નવી સરકારી ભરતી કે પ્રાઈવેટ જોબ અપલોડ થતાં જ તમારા આ ફોન પર સીધા ફ્રી એલર્ટ મળતા રહેશે.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={sendTestNotification}
                      className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span>{testSent ? '✓ Test Alert Sent to Device!' : 'Send Test Notification (ચેક કરો)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition cursor-pointer"
                    >
                      બંધ કરો (Close)
                    </button>
                  </div>
                </>
              ) : pushStatus === 'denied' ? (
                <>
                  {/* BLOCKED IN BROWSER STATE */}
                  <div className="w-16 h-16 rounded-full bg-amber-50 border-4 border-amber-100 mx-auto flex items-center justify-center text-amber-600 shadow-inner">
                    <AlertCircle className="w-9 h-9" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                      <span>Permissions Blocked</span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 pt-1">
                      Browser માં નોટિફિકેશન Block થયેલ છે
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ચાલુ કરવા માટે ઉપર બ્રાઉઝરના URL ની બાજુમાં <strong>તાળા (🔒 Lock)</strong> ના આઇકોન પર ક્લિક કરીને <strong>Notifications: Allow</strong> સિલેક્ટ કરો.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    સમજાયું (OK)
                  </button>
                </>
              ) : (
                <>
                  {/* NOT YET ENABLED: PRIMARY TURN ON STATE */}
                  <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-100 mx-auto flex items-center justify-center text-blue-600 shadow-inner animate-bounce">
                    <Smartphone className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-slate-900">
                      Job Notifications ચાલુ કરો
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      નવી ભરતી અપલોડ થતાં જ તમારા મોબાઈલ પર સીધા ફ્રી એલર્ટ મેળવવા માટે નોટિફિકેશન On કરો.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={requestDeviceNotifications}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                    >
                      <Bell className="w-5 h-5 text-amber-300 animate-pulse" />
                      <span>🔔 Turn ON Notifications (ઓન કરો)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition cursor-pointer"
                    >
                      પછી કરીશ (Not Now)
                    </button>
                  </div>
                </>
              )}

            </div>

            {/* Bottom micro note */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free Job Alerts • No Spam</span>
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Floating In-App Real-time Push Alert Banner */}
      {toastAlert && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-950 text-white p-4 rounded-2xl shadow-2xl border border-blue-500/60 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-2.5">
              <span className="p-1.5 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                <Bell className="w-4 h-4 animate-bounce" />
              </span>
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  ⚡ New Job Posted!
                </div>
                <div className="text-xs font-extrabold text-white line-clamp-1">
                  {toastAlert.title}
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {toastAlert.message}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setToastAlert(null)}
              className="text-slate-400 hover:text-white text-xs font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
