import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
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
    // Re-prompt login when logged out
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // If the logged-in user is an ADMIN, automatically take them to Admin Dashboard
    if (userData.role === 'ADMIN') {
      setCurrentView('admin');
    } else {
      setCurrentView('home');
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
        {currentView === 'home' ? (
          <HomePage 
            openResumeModal={() => setIsResumeModalOpen(true)}
            openAuthModal={() => handleOpenAuth(true)}
          />
        ) : (
          <AdminDashboard 
            setCurrentView={setCurrentView} 
            user={user}
          />
        )}
      </main>

      <Footer />

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
