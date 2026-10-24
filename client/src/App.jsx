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
import AiAssistant from './components/AiAssistant';
import ResumeBuilder from './components/ResumeBuilder';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
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
      setCurrentView('user-dashboard');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'govt':
        return <GovtJobsPage setCurrentView={setCurrentView} />;
      case 'private':
        return <PrivateJobsPage setCurrentView={setCurrentView} />;
      case 'internships':
        return <InternshipsPage setCurrentView={setCurrentView} />;
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

      <main className="flex-1">
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
