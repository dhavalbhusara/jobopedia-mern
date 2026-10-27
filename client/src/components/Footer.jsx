import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const triggerHelpDesk = () => {
    const text = encodeURIComponent("Namaste Jobopedia Help Desk,\n\nI want assistance with online form submission.");
    window.open("https://wa.me/919510442584?text=" + text, "_blank");
  };

  const navigateTo = (view, sectionId) => {
    if (setCurrentView) setCurrentView(view);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-[#0B1528] text-white pt-14 pb-8 border-t border-slate-800 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img src="/images/jobopedia-icon.png" alt="Jobopedia" className="w-8 h-8 rounded-lg" onError={(e) => { e.target.src = '/images/careersetu-icon.png'; }} />
              <span className="text-xl font-black text-white">
                Job<span className="text-[#F58220]">opedia</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              India's premier verified employment ecosystem providing automated daily government notifications, corporate placements, and certified online application assistance.
            </p>
            <div className="space-y-1.5 pt-1 text-slate-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:jobopedia.careers@gmail.com" className="hover:text-amber-400 transition font-medium">jobopedia.careers@gmail.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+919510442584" className="hover:text-amber-400 transition font-medium">+91 95104 42584</a>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <a 
                  href="https://www.instagram.com/jobopedia.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pink-300 hover:text-pink-200 transition font-semibold flex items-center space-x-1"
                >
                  <span>@jobopedia.in</span>
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 px-1 rounded">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-white text-sm">Quick Links</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => navigateTo('home', 'weekly-calendar')} className="hover:text-white transition cursor-pointer">Weekly Govt Calendar (1-7)</button></li>
              <li><button onClick={() => navigateTo('home', 'jobs-section')} className="hover:text-white transition cursor-pointer">All India Job Directory</button></li>
              <li><button onClick={() => navigateTo('internships')} className="hover:text-white transition cursor-pointer">College &amp; Fresher Internships</button></li>
              <li><button onClick={() => navigateTo('preparation')} className="hover:text-white transition cursor-pointer">Exam Preparation Guide</button></li>
              <li><button onClick={() => navigateTo('home', 'mock-tests')} className="hover:text-white transition cursor-pointer">Full Mock Test Series</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-white text-sm">Organization</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => navigateTo('about')} className="hover:text-white transition cursor-pointer">About Jobopedia</button></li>
              <li><button onClick={() => navigateTo('privacy-policy')} className="hover:text-amber-400 font-semibold transition cursor-pointer">Privacy Policy (ગોપનીયતા નીતિ)</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition cursor-pointer">Contact Support Desk</button></li>
              <li>UPSC Civil Services 2026</li>
              <li>Gujarat Police Constable &amp; PSI</li>
              <li>SSC CGL &amp; Railway RRB NTPC</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-white text-sm">Help Desk</h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              Ghar baithe WhatsApp se online form bharwayen bina kisi mistake ya rejection risk ke.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={triggerHelpDesk}
                className="w-full px-3 py-2 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 shadow-sm transition cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>WhatsApp: +91 95104 42584</span>
              </button>
              <a
                href="https://www.instagram.com/jobopedia.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 shadow-sm transition cursor-pointer block text-center"
              >
                <Instagram className="w-3.5 h-3.5 inline-block mr-1" />
                <span>Instagram: @jobopedia.in</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <div>
            © 2026 Jobopedia India. All rights reserved. Connecting Youth with Verified Careers.
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateTo('privacy-policy')} className="text-amber-400 hover:text-white font-semibold cursor-pointer">Privacy Policy</button>
            <button onClick={() => navigateTo('about')} className="hover:text-slate-400 cursor-pointer">About</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-slate-400 cursor-pointer">Contact</button>
            <button onClick={() => navigateTo('internships')} className="hover:text-slate-400 cursor-pointer">Internships</button>
            <button onClick={() => navigateTo('preparation')} className="hover:text-slate-400 cursor-pointer">Preparation</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
