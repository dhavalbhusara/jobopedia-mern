import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GovtJobsPage from './pages/GovtJobsPage';
import PrivateJobsPage from './pages/PrivateJobsPage';
import InternshipsPage from './pages/InternshipsPage';
import MockTestsPage from './pages/MockTestsPage';
import PreparationPage from './pages/PreparationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AiAssistant from './components/AiAssistant';
import ResumeBuilder from './components/ResumeBuilder';
import AuthModal from './components/AuthModal';
import JobDetailsModal from './components/JobDetailsModal';
import JobDetailPage from './pages/JobDetailPage';
import PushNotificationPrompt from './components/PushNotificationPrompt';
import ComplaintModal from './components/ComplaintModal';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const viewParam = urlParams.get('view');
        if (viewParam) {
          if (viewParam === 'govt-jobs' || viewParam === 'govt') return 'govt';
          if (viewParam === 'private-jobs' || viewParam === 'private') return 'private';
          if (viewParam === 'internships') return 'internships';
          if (viewParam === 'mock-tests') return 'mock-tests';
          if (viewParam === 'preparation') return 'preparation';
          if (viewParam === 'about') return 'about';
          if (viewParam === 'contact') return 'contact';
          if (viewParam === 'privacy-policy') return 'privacy-policy';
        }
      }
    } catch (e) {}
    return 'home';
  });
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Auth User State from localStorage (Guarded by Emergency Security Reset v3)
  const [user, setUser] = useState(() => {
    try {
      // Invalidate all legacy sessions across all visitor browsers immediately
      if (!localStorage.getItem('jobopedia_security_v3')) {
        localStorage.removeItem('jobopedia_token');
        localStorage.removeItem('jobopedia_user');
        localStorage.setItem('jobopedia_security_v3', 'active_reset_' + Date.now());
        return null;
      }
      const stored = localStorage.getItem('jobopedia_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Auth modal is closed by default - opens only on voluntary user action (Login button)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Forced mode disabled to allow open navigation & crawler access
  const [isAuthForced, setIsAuthForced] = useState(false);
  const [pendingJob, setPendingJob] = useState(null);

  const [loadingDirectJob, setLoadingDirectJob] = useState(false);

  // Deep-linking: Read ?job=<id> or ?jobId=<id> or /job/<id> on website load & on popstate
  useEffect(() => {
    const checkJobInUrl = async () => {
      if (typeof window === 'undefined') return;

      const urlParams = new URLSearchParams(window.location.search);
      let targetJobId = urlParams.get('job') || urlParams.get('jobId');

      if (!targetJobId && window.location.pathname.startsWith('/job/')) {
        targetJobId = window.location.pathname.replace('/job/', '').trim();
      }

      if (targetJobId) {
        setLoadingDirectJob(true);

        try {
          const res = await fetch(`/api/jobs/${encodeURIComponent(targetJobId)}`);
          const data = await res.json();
          if (data.success && data.job) {
            setSelectedJob(data.job);
            setCurrentView('job-detail');
            setLoadingDirectJob(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
        } catch (err) {
          console.warn("Direct job fetch error, attempting list fallback:", err.message);
        }

        // Fallback lookup in all jobs
        try {
          const listRes = await fetch('/api/jobs');
          const listData = await listRes.json();
          if (listData.success && Array.isArray(listData.jobs)) {
            const match = listData.jobs.find(j => 
              String(j._id || j.id) === String(targetJobId) || 
              j.slug === targetJobId ||
              (j.title && j.title.toLowerCase().replace(/[\W_]+/g, '-') === targetJobId.toLowerCase())
            );
            if (match) {
              setSelectedJob(match);
              setCurrentView('job-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        } catch (e) {}

        setLoadingDirectJob(false);
      }
    };

    checkJobInUrl();

    // Listen for browser Back & Forward button navigation
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const targetJobId = urlParams.get('job') || urlParams.get('jobId');
      const viewParam = urlParams.get('view');
      if (targetJobId) {
        checkJobInUrl();
      } else if (viewParam) {
        if (viewParam === 'govt-jobs' || viewParam === 'govt') setCurrentView('govt');
        else if (viewParam === 'private-jobs' || viewParam === 'private') setCurrentView('private');
        else setCurrentView(viewParam);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user]);

  const [authMode, setAuthMode] = useState('login');

  const handleOpenAuth = (isLogin = true) => {
    setIsAuthForced(false);
    setAuthMode(isLogin ? 'login' : 'register');
    setIsAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthModalOpen(false);
    setIsAuthForced(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jobopedia_token');
    localStorage.removeItem('jobopedia_user');
    setUser(null);
    setCurrentView('home');
    setAuthMode('login');
    setIsAuthForced(false);
    setIsAuthModalOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    setIsAuthForced(false);

    // If Admin logged in, take them directly to the Admin Dashboard!
    if (userData?.role === 'ADMIN') {
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If user clicked a job before logging in, immediately open that job!
    const targetJob = pendingJob || selectedJob;
    if (targetJob) {
      setSelectedJob(targetJob);
      setPendingJob(null);
      setCurrentView('job-detail');
      const jobId = targetJob.slug || targetJob._id || targetJob.id;
      if (jobId && typeof window !== 'undefined') {
        window.history.pushState({ jobId, view: 'job-detail' }, '', `/?job=${encodeURIComponent(jobId)}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (selectedJob || currentView === 'job-detail') {
      setCurrentView('job-detail');
    } else {
      setCurrentView('home');
    }
  };

  // Automatically request browser notification permission on website load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
    }
    // Pre-warm / wake-up Render backend immediately on page load
    fetch('https://jobopedia-backend.onrender.com/api/health').catch(() => {});
  }, []);

  // Auto-track website traffic for Dhaval's Analytics Dashboard (1 visit per user per day with real IP)
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        let publicIp = sessionStorage.getItem('jobopedia_client_ip') || '';
        if (!publicIp) {
          try {
            const ipRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2500) });
            const ipData = await ipRes.json();
            if (ipData && ipData.ip) {
              publicIp = ipData.ip;
              sessionStorage.setItem('jobopedia_client_ip', publicIp);
            }
          } catch (e) {}
        }

        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        const deviceType = isMobileDevice ? 'Mobile' : 'Desktop';
        const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' : (navigator.userAgent.includes('Firefox') ? 'Firefox' : (navigator.userAgent.includes('Safari') ? 'Safari' : 'Browser'));

        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: currentView,
            deviceType,
            browser,
            state: user?.state || 'All India',
            clientIp: publicIp
          })
        }).catch(() => {});
      } catch (e) {}
    };

    trackVisitor();
  }, [currentView]);

  const handleOpenJobDetail = (job, updateUrl = true) => {
    setSelectedJob(job);
    setCurrentView('job-detail');
    if (updateUrl && typeof window !== 'undefined') {
      const jobId = job.slug || job._id || job.id;
      if (jobId) {
        const newUrl = `/?job=${encodeURIComponent(jobId)}`;
        window.history.pushState({ jobId, view: 'job-detail' }, '', newUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToView = (view) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      const newUrl = view === 'home' ? '/' : `/?view=${encodeURIComponent(view)}`;
      window.history.pushState({ view }, '', newUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentView = () => {
    if (loadingDirectJob) {
      return (
        <div className="py-24 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto shadow-md"></div>
          <div className="text-base font-black text-slate-800">Opening Job Details...</div>
          <p className="text-xs text-slate-500 font-medium">Please wait while we retrieve the verified job posting.</p>
        </div>
      );
    }

    switch (currentView) {
      case 'job-detail':
        return (
          <JobDetailPage 
            job={selectedJob} 
            setCurrentView={navigateToView}
            user={user}
            onRequireAuth={() => {
              setIsAuthForced(false);
              setAuthMode('login');
              setIsAuthModalOpen(true);
            }}
            onStartMockTest={(j) => {
              setSelectedJob(j);
              navigateToView('mock-tests');
            }}
          />
        );
      case 'govt':
        return <GovtJobsPage setCurrentView={navigateToView} onSelectJob={handleOpenJobDetail} />;
      case 'private':
        return <PrivateJobsPage setCurrentView={navigateToView} onSelectJob={handleOpenJobDetail} />;
      case 'internships':
        return <InternshipsPage setCurrentView={navigateToView} onSelectJob={handleOpenJobDetail} />;
      case 'mock-tests':
        return <MockTestsPage setCurrentView={navigateToView} />;
      case 'preparation':
        return <PreparationPage setCurrentView={navigateToView} />;
      case 'about':
        return <AboutPage setCurrentView={navigateToView} />;
      case 'contact':
        return <ContactPage setCurrentView={navigateToView} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage setCurrentView={navigateToView} />;
      case 'admin':
        if (!user || user.role !== 'ADMIN') {
          return (
            <HomePage 
              user={user} 
              openResumeModal={() => setIsResumeModalOpen(true)}
              openAuthModal={handleOpenAuth}
              setCurrentView={navigateToView} 
              onSelectJob={handleOpenJobDetail}
            />
          );
        }
        return <AdminDashboard setCurrentView={navigateToView} user={user} onLogout={handleLogout} />;
      case 'user-dashboard':
        return (
          <UserDashboard 
            user={user} 
            setUser={setUser}
            setCurrentView={navigateToView} 
            openResumeModal={() => setIsResumeModalOpen(true)}
            onSelectJob={handleOpenJobDetail}
            onLogout={handleLogout}
          />
        );
      case 'home':
      default:
        return (
          <HomePage 
            user={user}
            setCurrentView={navigateToView}
            openResumeModal={() => setIsResumeModalOpen(true)}
            openAuthModal={() => handleOpenAuth(true)}
            onSelectJob={handleOpenJobDetail}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B1329] text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden w-full max-w-full transition-colors duration-200">
      <PushNotificationPrompt user={user} />

      <Navbar 
        currentView={currentView} 
        setCurrentView={navigateToView} 
        openResumeModal={() => setIsResumeModalOpen(true)}
        openComplaintModal={() => setIsComplaintModalOpen(true)}
        openAuthModal={handleOpenAuth}
        user={user}
        onLogout={handleLogout}
        onSelectJob={handleOpenJobDetail}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentView()}
      </main>

      <Footer setCurrentView={navigateToView} />

      <AiAssistant />
      
      <ResumeBuilder 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
        user={user}
      />

      <ComplaintModal 
        isOpen={isComplaintModalOpen} 
        onClose={() => setIsComplaintModalOpen(false)} 
        user={user}
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuth} 
        onLoginSuccess={handleLoginSuccess}
        initialMode={authMode}
        isForced={isAuthForced}
      />

      {/* Global Job Details Modal for notifications & universal job viewing */}
      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
}
