import React, { useState } from 'react';
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Auth User State
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('jobopedia_token');
    localStorage.removeItem('jobopedia_user');
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        openResumeModal={() => setIsResumeModalOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {currentView === 'home' ? (
          <HomePage openResumeModal={() => setIsResumeModalOpen(true)} />
        ) : (
          <AdminDashboard setCurrentView={setCurrentView} />
        )}
      </main>

      <AiAssistant />
      <ResumeBuilder 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      <Footer />
    </div>
  );
}
