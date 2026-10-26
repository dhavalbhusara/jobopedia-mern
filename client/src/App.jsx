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
  const [currentView, setCurrentView] = useState('home');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Auth User State from localStorage
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Automatically open Login modal on website load if visitor is not logged in
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_user');
      return !stored;
    } catch {
      return true;
    }
  });

  const [authMode, setAuthMode] = useState('login');

  const handleOpenAuth = (isLogin = true) => {
    setAuthMode(isLogin ? 'login' : 'register');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jobopedia_token');
    localStorage.removeItem('jobopedia_user');
    setUser(null);
    setCurrentView('home');
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('home');
  };

  // Automatically request browser notification permission on website load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
    }
  }, []);

  // Auto-track website traffic for Dhaval's Analytics Dashboard
  useEffect(() => {
    try {
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
          state: user?.state || 'All India'
        })
      }).catch(() => {});
    } catch (e) {}
  }, [currentView]);

  const handleOpenJobDetail = (job) => {
    setSelectedJob(job);
    setCurrentView('job-detail');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'job-detail':
        return (
          <JobDetailPage 
            job={selectedJob} 
            setCurrentView={setCurrentView}
            onStartMockTest={(j) => {
              setSelectedJob(j);
              setCurrentView('mock-tests');
            }}
          />
        );
      case 'govt':
        return <GovtJobsPage setCurrentView={setCurrentView} onSelectJob={handleOpenJobDetail} />;
      case 'private':
        return <PrivateJobsPage setCurrentView={setCurrentView} onSelectJob={handleOpenJobDetail} />;
      case 'internships':
        return <InternshipsPage setCurrentView={setCurrentView} onSelectJob={handleOpenJobDetail} />;
      case 'mock-tests':
        return <MockTestsPage setCurrentView={setCurrentView} />;
      case 'preparation':
        return <PreparationPage setCurrentView={setCurrentView} />;
      case 'about':
        return <AboutPage setCurrentView={setCurrentView} />;
      case 'contact':
        return <ContactPage setCurrentView={setCurrentView} />;
      case 'admin':
        return <AdminDashboard setCurrentView={setCurrentView} user={user} />;
      case 'user-dashboard':
        return (
          <UserDashboard 
            user={user} 
            setUser={setUser}
            setCurrentView={setCurrentView} 
            openResumeModal={() => setIsResumeModalOpen(true)}
            onSelectJob={handleOpenJobDetail}
          />
        );
      case 'home':
      default:
        return (
          <HomePage 
            user={user}
            setCurrentView={setCurrentView}
            openResumeModal={() => setIsResumeModalOpen(true)}
            openAuthModal={() => handleOpenAuth(true)}
            onSelectJob={handleOpenJobDetail}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden w-full max-w-full">
      <PushNotificationPrompt user={user} />

      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
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

      <Footer setCurrentView={setCurrentView} />

      <AiAssistant />
      
      <ResumeBuilder 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />

      <ComplaintModal 
        isOpen={isComplaintModalOpen} 
        onClose={() => setIsComplaintModalOpen(false)} 
        user={user}
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
        initialMode={authMode}
      />

      {/* Global Job Details Modal for notifications & universal job viewing */}
      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
}
