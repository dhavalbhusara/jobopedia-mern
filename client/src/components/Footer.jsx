import React from 'react';

export default function Footer() {
  const triggerCyberCafeHelp = () => {
    const text = encodeURIComponent("Namaste Jobopedia Cyber Cafe Helpline,\n\nI want assistance with online form submission.");
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <footer className="bg-[#0B1528] text-white pt-14 pb-8 border-t border-slate-800 mt-16">
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
              India's premier verified employment ecosystem providing automated daily government notifications, corporate placements, and certified cyber cafe application assistance.
            </p>
            <div className="text-slate-400">
              Official Helpline: <strong>support@jobopedia.in</strong>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-white text-sm">Quick Sections</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#weekly-calendar" className="hover:text-white transition">Weekly Govt Calendar (1-7)</a></li>
              <li><a href="#jobs-feed" className="hover:text-white transition">All India Job Directory</a></li>
              <li><a href="#mock-tests" className="hover:text-white transition">Full Mock Test Series</a></li>
              <li><a href="#jobs-feed" className="hover:text-white transition">Internships for Freshers</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-white text-sm">Top Govt Recruitments</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>UPSC Civil Services (IAS / IPS)</li>
              <li>SSC CGL &amp; CHSL 2026</li>
              <li>Railway RRB NTPC &amp; ALP</li>
              <li>State Bank of India (SBI PO)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-white text-sm">Cyber Cafe Desk</h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              Ghar baithe WhatsApp se online form bharwayen bina kisi mistake ya rejection risk ke.
            </p>
            <button
              onClick={triggerCyberCafeHelp}
              className="mt-2 px-4 py-2 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-xl font-bold flex items-center space-x-1.5 shadow-sm transition cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>Connect on WhatsApp</span>
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-slate-500 text-xs gap-3">
          <div>© 2026 Jobopedia India. Built with MERN Stack (React + Node.js + MongoDB Atlas).</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
