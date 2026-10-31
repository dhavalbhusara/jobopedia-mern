import React from 'react';
import { 
  ShieldCheck, Lock, Bell, Eye, Database, FileText, 
  HelpCircle, ArrowLeft, CheckCircle2, Phone, Mail, MapPin 
} from 'lucide-react';

export default function PrivacyPolicyPage({ setCurrentView }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <button 
          onClick={() => setCurrentView('home')} 
          className="hover:text-blue-600 flex items-center space-x-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800">Privacy Policy</span>
      </div>

      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-black uppercase px-3.5 py-1 rounded-full border border-blue-200 inline-flex items-center space-x-1.5 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Legal &amp; Candidate Data Protection</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          At Jobopedia, transparency and candidate data security are our foundational principles. Last updated: October 2026.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">1</span>
            <span>Introduction</span>
          </h2>
          <p>
            <strong>Jobopedia</strong> ("we", "our", or "the Platform") is a trusted national employment information portal providing verified Government recruitment notifications, Corporate MNC job openings, paid internships, and computer-based online mock tests for candidates across India.
          </p>
          <p>
            This Privacy Policy describes what information we collect when you visit our website, register a profile, or subscribe to real-time notification alerts, and how that information is safeguarded.
          </p>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">2</span>
            <span>Information We Collect</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Candidate Profile Data</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>10-Digit Mobile Number</li>
                <li>Highest Educational Qualification</li>
                <li>Home State &amp; District</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Bell className="w-4 h-4 text-blue-600" />
                <span>Device &amp; Notification Tokens</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>Web Push Subscription Token (FCM / Service Worker)</li>
                <li>Device Platform (Mobile Phone or Desktop PC)</li>
                <li>Browser Environment (Chrome, Safari, Firefox, Edge)</li>
                <li>Aggregate site traffic analytics</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Section 3: How We Use Information */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">3</span>
            <span>How We Use Your Data</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Personalized Job Feeds:</strong> Matching your qualification (e.g. BCA, B.Tech, 12th Pass, Graduate) and preferred location to relevant vacancies.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Real-Time Job Alerts:</strong> Delivering free browser push notifications as soon as official vacancies are uploaded.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>CBT Scorecard History:</strong> Preserving your practice test attempts, timing analytics, and progress in your candidate profile.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Candidate Support Desk:</strong> Addressing grievances and answering inquiries submitted through our Help Desk.</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Web Push Notifications Policy */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">4</span>
            <span>Web Push Notifications Policy</span>
          </h2>
          <p>
            Jobopedia utilizes official <strong>W3C Web Push &amp; Service Worker (sw.js)</strong> standards.
          </p>
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 space-y-1.5 font-medium">
            <p><strong>Explicit Consent:</strong> Notifications are only dispatched if you explicitly click "Allow" in your browser prompt.</p>
            <p><strong>Opt-Out Anytime:</strong> You may revoke notification permissions at any time by clicking the <strong>🔒 Lock icon</strong> next to the address bar and selecting "Reset permission" or "Block".</p>
          </div>
        </section>

        {/* Section 5: Data Security & Storage */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">5</span>
            <span>Data Security &amp; Storage</span>
          </h2>
          <p>
            We implement industry-standard technical measures to secure your personal data:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-5">
            <li>User account passwords are encrypted using one-way <strong>bcrypt salt hashing</strong>.</li>
            <li>All records are hosted in encrypted, secure MongoDB Atlas cloud clusters.</li>
            <li><strong>Zero Data Selling:</strong> We never sell, rent, or lease candidate personal contact details (Email, Phone) to third-party telemarketers.</li>
          </ul>
        </section>

        {/* Section 6: Third-Party Links */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">6</span>
            <span>Third-Party Official Links</span>
          </h2>
          <p>
            "Apply Online" or "Official Notification" links on Jobopedia redirect candidates directly to verified governmental portals (such as <em>upsc.gov.in, ssc.gov.in, ojas.gujarat.gov.in</em>) or official corporate hiring gateways. We recommend reviewing the privacy policies of external sites upon redirection.
          </p>
        </section>

        {/* Section 7: Grievance & Contact */}
        <section className="space-y-3 pt-2">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">7</span>
            <span>Grievance Redressal &amp; Support Contact</span>
          </h2>
          <p>
            If you have questions regarding your candidate data, account deletion requests, or this policy, please contact our support desk:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Official Email Helpline:</span>
              </div>
              <div className="text-slate-600 font-mono">jobopedia.careers@gmail.com</div>
              <div className="text-slate-500 font-mono text-[11px]">Instagram: @jobopedia.in</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Helpline &amp; Phone:</span>
              </div>
              <div className="text-slate-600 font-mono font-bold">+91 84879 44035</div>
              <div className="text-slate-500 text-[11px]">Monday - Saturday (9:00 AM - 8:00 PM IST)</div>
            </div>
          </div>
        </section>

      </div>

      {/* Back to Home Button */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer inline-flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Page</span>
        </button>
      </div>

    </div>
  );
}
