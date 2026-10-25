import React, { useState } from 'react';
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
import JobDetailsPage from './pages/JobDetailsPage';
import AiAssistant from './components/AiAssistant';
import ResumeBuilder from './components/ResumeBuilder';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
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
    if (userData.role === 'ADMIN') {
      setCurrentView('admin');
    } else {
      setCurrentView('home');
    }
  };

  const handleOpenJobDetails = (job) => {
    setSelectedJob(job);
    setCurrentView('job-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'job-details':
        return (
          <JobDetailsPage 
            job={selectedJob} 
            setCurrentView={setCurrentView}
            onStartMockTest={() => setCurrentView('mock-tests')}
          />
        );
      case 'govt':
        return <GovtJobsPage setCurrentView={setCurrentView} onSelectJob={handleOpenJobDetails} />;
      case 'private':
        return <PrivateJobsPage setCurrentView={setCurrentView} onSelectJob={handleOpenJobDetails} />;
      case 'internships':
        return <InternshipsPage setCurrentView={setCurrentView} onSelectJob={handleOpenJobDetails} />;
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
            onSelectJob={handleOpenJobDetails}
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
            onSelectJob={handleOpenJobDetails}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        openResumeModal={() => setIsResumeModalOpen(true)}
        openAuthModal={handleOpenAuth}
        user={user}
        onLogout={handleLogout}
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
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
        initialMode={authMode}
      />
    </div>
  );
}
