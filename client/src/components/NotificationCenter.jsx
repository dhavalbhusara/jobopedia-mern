import React, { useState, useEffect } from 'react';
import { 
  Bell, Check, X, ShieldCheck, Sparkles, Landmark, 
  Building2, GraduationCap, Award, ExternalLink, Settings, 
  CheckCircle2, AlertCircle, Clock, Smartphone, Monitor 
} from 'lucide-react';

export default function NotificationCenter({ user, onSelectJob }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [activeTab, setActiveTab] = useState('all'); // all, matched, govt, private, mock-test
  const [pushStatus, setPushStatus] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_notif_prefs');
      return stored ? JSON.parse(stored) : {
        govt: true,
        privateJobs: true,
        internships: true,
        mockTests: true
      };
    } catch {
      return { govt: true, privateJobs: true, internships: true, mockTests: true };
    }
  });

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const fetchNotifications = () => {
    const params = new URLSearchParams();
    if (user?.qualification) params.set('qualification', user.qualification);
    if (user?.state) params.set('state', user.state);

    fetch(`/api/notifications?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
          setUnreadCount(Math.min(data.notifications.length, 5));
        }
      })
      .catch(err => console.error("Error loading notifications:", err));
  };

  // Enable Push Notifications for Phone & PC
  const requestDeviceNotifications = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support desktop/phone push notifications.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPushStatus(permission);

      if (permission === 'granted') {
        // Send immediate welcome test notification to device
        new Notification("🇮🇳 Jobopedia: Notifications Active!", {
          body: `You will now receive instant job notifications on this ${window.innerWidth < 768 ? 'Mobile Phone' : 'PC / Laptop'} matching your qualification!`,
          icon: '/images/jobopedia-icon.png'
        });
      }
    } catch (e) {
      console.error("Notification permission error:", e);
    }
  };

  const handleTogglePref = (key) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    localStorage.setItem('jobopedia_notif_prefs', JSON.stringify(updated));
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const diff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60));
    if (diff < 60) return `${Math.max(1, diff)}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  // Filter list
  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'govt') return n.category === 'govt';
    if (activeTab === 'private') return n.category === 'private';
    if (activeTab === 'mock-test') return n.category === 'mock-test';
    if (activeTab === 'matched') {
      if (!user?.qualification) return true;
      const q = (n.targetQualification || '').toLowerCase();
      const u = user.qualification.toLowerCase();
      return q.includes(u) || u.includes(q) || q === 'all';
    }
    return true;
  });

  return (
    <div className="relative">
      
      {/* Bell Button in Navbar */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setUnreadCount(0);
        }}
        className={`p-2 rounded-xl transition cursor-pointer relative ${
          isOpen 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
        }`}
        title="Job & Career Notifications (Phone & PC)"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
        )}
      </button>

      {/* Dropdown Notification Drawer (Responsive on PC & Phone) */}
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 sm:hidden" 
            onClick={() => setIsOpen(false)} 
          />

          <div className="fixed sm:absolute top-16 sm:top-full right-2 sm:right-0 z-50 w-[95vw] sm:w-96 max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-sm sm:text-base text-white">Job Alerts &amp; Notifications</h3>
                  <span className="text-[10px] font-bold bg-blue-500/30 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Targeted alerts for Phone &amp; PC based on your interest
                </p>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
                  title="Notification Preferences"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Device Push Notification Activation Bar */}
            <div className="bg-blue-50/80 border-b border-blue-100 p-3 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2 text-blue-950 font-semibold truncate">
                {pushStatus === 'granted' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">Device Push Alerts: <strong>Active (Phone &amp; PC)</strong></span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">Get real-time job alerts on this device</span>
                  </>
                )}
              </div>

              {pushStatus !== 'granted' && (
                <button
                  type="button"
                  onClick={requestDeviceNotifications}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-black shrink-0 transition shadow-xs cursor-pointer"
                >
                  Turn ON
                </button>
              )}
            </div>

            {/* Preferences Drawer */}
            {showPreferences && (
              <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-2 text-xs animate-in fade-in">
                <div className="font-black text-slate-800 uppercase tracking-wider text-[10px]">
                  Targeted Interest Settings (Filter Alerts):
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700 font-bold">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.govt} 
                      onChange={() => handleTogglePref('govt')} 
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span>🏛️ Sarkari Jobs</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.privateJobs} 
                      onChange={() => handleTogglePref('privateJobs')} 
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span>🏢 Private MNCs</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.internships} 
                      onChange={() => handleTogglePref('internships')} 
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span>🎓 Internships</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.mockTests} 
                      onChange={() => handleTogglePref('mockTests')} 
                      className="rounded text-blue-600 focus:ring-0" 
                    />
                    <span>⚡ Mock Tests</span>
                  </label>
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex border-b border-slate-100 bg-white px-3 pt-2 gap-1 overflow-x-auto scrollbar-none text-[11px] font-bold">
              {[
                { id: 'all', label: 'All Alerts' },
                { id: 'matched', label: '🎓 For My Degree' },
                { id: 'govt', label: '🏛️ Govt' },
                { id: 'private', label: '🏢 Corporate' },
                { id: 'mock-test', label: '📝 CBT' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-2.5 transition whitespace-nowrap cursor-pointer border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications Scroll List */}
            <div className="divide-y divide-slate-100 overflow-y-auto flex-1 p-2 space-y-1">
              {filteredNotifs.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs">
                  No notifications matching your filter.
                </div>
              ) : (
                filteredNotifs.map(n => {
                  const isGovt = n.category === 'govt';
                  const isPrivate = n.category === 'private';
                  const isMock = n.category === 'mock-test';

                  return (
                    <div 
                      key={n._id || n.id}
                      className="p-3 rounded-2xl hover:bg-slate-50 transition space-y-2 border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${
                            isGovt ? 'bg-blue-600' : isPrivate ? 'bg-emerald-500' : 'bg-amber-500'
                          }`} />
                          <h4 className="text-xs font-black text-slate-900 leading-snug">
                            {n.title}
                          </h4>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                          {formatTimeAgo(n.createdAt)}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed pl-4">
                        {n.message}
                      </p>

                      <div className="flex items-center justify-between pl-4 pt-1">
                        <div className="flex items-center space-x-1.5 text-[10px]">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                            {n.targetQualification || 'All Degrees'}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-semibold">
                            {n.targetState || 'All India'}
                          </span>
                        </div>

                        <a
                          href={n.url || 'https://jobopedia.in'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-0.5 cursor-pointer"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Clear / Dismiss */}
            <div className="bg-slate-50 p-2.5 border-t border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-500">
                Personalized for {user?.qualification || 'All Degrees'} • {user?.state || 'National'}
              </span>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
