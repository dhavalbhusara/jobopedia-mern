import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import AiAssistant from './components/AiAssistant';
import ResumeBuilder from './components/ResumeBuilder';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        openResumeModal={() => setIsResumeModalOpen(true)}
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
      <Footer />
    </div>
  );
}
