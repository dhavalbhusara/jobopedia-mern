import React, { useState, useEffect } from 'react';
import { Bell, ShieldCheck, Check, X, Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function PushNotificationPrompt({ user }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('default');

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }

    setPermissionStatus(Notification.permission);

    // 1. If permission is still 'default' (not granted and not denied):
    if (Notification.permission === 'default') {
      // Automatically attempt native browser permission request on site load
      try {
        Notification.requestPermission().then(perm => {
          setPermissionStatus(perm);
          if (perm === 'granted') {
            sendWelcomeNotification();
            setShowPrompt(false);
          } else if (perm === 'default') {
            // Browser required a direct gesture or dismissed
            setShowPrompt(true);
          }
        }).catch(() => {
          setShowPrompt(true);
        });
      } catch (e) {
        setShowPrompt(true);
      }

      // Show prominent visual prompt after 1.5 seconds if still not granted
      const timer = setTimeout(() => {
        if (Notification.permission !== 'granted') {
          const dismissedAt = localStorage.getItem('jobopedia_notif_dismissed');
          // Only show if not dismissed in last 2 hours
          if (!dismissedAt || (Date.now() - Number(dismissedAt)) > 2 * 60 * 60 * 1000) {
            setShowPrompt(true);
          }
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const sendWelcomeNotification = () => {
    try {
      new Notification("🇮🇳 Jobopedia: Job Alerts Active!", {
        body: `You will now receive instant notifications on this ${window.innerWidth < 768 ? 'Mobile Phone' : 'PC / Laptop'} whenever new jobs matching your qualification are posted!`,
        icon: '/images/jobopedia-icon.png'
      });
    } catch (e) {
      console.error("Welcome notification error:", e);
    }
  };

  const handleAllowNotifications = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support web notifications.");
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      setPermissionStatus(perm);
      if (perm === 'granted') {
        sendWelcomeNotification();
        setShowPrompt(false);
      } else if (perm === 'denied') {
        alert("Notifications were blocked. You can enable them anytime from your browser address bar (lock icon).");
        setShowPrompt(false);
      }
    } catch (err) {
      console.error("Permission error:", err);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('jobopedia_notif_dismissed', Date.now().toString());
  };

  // If already granted or unsupported or user dismissed, don't show
  if (!showPrompt || permissionStatus === 'granted') {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] sm:w-full bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-5 shadow-2xl border border-blue-500/50 animate-in slide-in-from-top-6 duration-300">
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
            <Bell className="w-6 h-6 text-white animate-bounce" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                Instant Alerts
              </span>
              <span className="text-[11px] text-slate-300 font-bold flex items-center space-x-1">
                <Smartphone className="w-3 h-3 text-blue-400" />
                <span>Phone &amp; PC</span>
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-black text-white leading-snug">
              Website Notifications મંજૂર કરો (Allow Job Alerts)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              નવી સરકારી ભરતી કે પ્રાઈવેટ જોબ અપલોડ થતાં જ તમારા મોબાઈલ અને કમ્પ્યુટર પર સીધી ફ્રી એલર્ટ મેળવવા માટે નોટિફિકેશન મંજૂર કરો.
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition shrink-0"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="text-[11px] text-emerald-400 font-bold flex items-center space-x-1 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero Spam • Only Verified Opportunities</span>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={handleDismiss}
            className="flex-1 sm:flex-none px-4 py-2 bg-white/10 hover:bg-white/15 text-slate-300 rounded-xl text-xs font-bold transition text-center cursor-pointer"
          >
            Later
          </button>

          <button
            onClick={handleAllowNotifications}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>🔔 Allow Notifications</span>
          </button>
        </div>
      </div>
    </div>
  );
}
