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

        {/* Section 7: Comprehensive Cookie Policy, Google AdSense & DoubleClick DART Disclosures */}
        <section id="cookie-policy-section" className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">7</span>
              <span>Comprehensive Cookie Policy &amp; Advertising Partner Disclosures</span>
            </h2>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open_cookie_preferences'))}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-xl transition cursor-pointer flex items-center space-x-1"
            >
              <span>⚙️ Manage Cookie Preferences</span>
            </button>
          </div>

          <p>
            This section discloses how <strong>Jobopedia (jobopedia.in)</strong> and authorized third-party service providers (including <strong>Google LLC</strong> and its advertising partners) deploy cookies, Web Beacons, and Local Storage technologies when you browse our employment portal.
          </p>

          {/* Sub-section: What are cookies */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">7.1 What are Cookies &amp; Local Storage?</h3>
            <p>
              Cookies are small alphanumeric text files stored on your computer or mobile device by websites you visit. They enable websites to recall your device, language preferences, and previous sessions, improve navigation speed, and facilitate personalized services. We also utilize modern browser Local Storage (HTML5 Web Storage) for fast client-side settings such as high-contrast Dark Mode.
            </p>
          </div>

          {/* Sub-section: Google AdSense Specific Disclosures */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-3">
            <h3 className="font-black text-sm text-blue-900 flex items-center space-x-2">
              <span>7.2 Third-Party Advertising &amp; Google Partner Policy Disclosures</span>
            </h3>
            <p className="leading-relaxed">
              In accordance with Google AdSense Publisher Program Policies and the Google Privacy &amp; Terms framework, we provide the following explicit disclosures to all visitors:
            </p>
            <ul className="space-y-2 list-disc pl-5 leading-relaxed">
              <li>
                <strong>Third-Party Vendors:</strong> Third-party vendors, including <strong>Google</strong>, use cookies to serve advertisements based on a user's prior visits to Jobopedia or other websites across the Internet.
              </li>
              <li>
                <strong>Google Advertising &amp; DART Cookies:</strong> Google's use of advertising cookies (such as the DoubleClick DART cookie and Google Publisher Tag identifiers) enables it and its advertising partners to serve ads to our users based on their visit to our sites and/or other sites on the World Wide Web.
              </li>
              <li>
                <strong>Interest-Based &amp; Personalized Advertising:</strong> Advertisements displayed on Jobopedia may be tailored to your inferred interests, geographic region, or general career queries. No personal identifiers (such as your phone number or national ID) are ever shared with advertisers.
              </li>
            </ul>
          </div>

          {/* Detailed Cookie Inventory Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">7.3 Exhaustive Cookie &amp; Storage Inventory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-2.5 border-b border-slate-200">Cookie / Storage Key</th>
                    <th className="p-2.5 border-b border-slate-200">Provider / Host</th>
                    <th className="p-2.5 border-b border-slate-200">Category</th>
                    <th className="p-2.5 border-b border-slate-200">Lifespan</th>
                    <th className="p-2.5 border-b border-slate-200">Explicit Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-900">__gads</td>
                    <td className="p-2.5">Google AdSense</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">Advertising</span></td>
                    <td className="p-2.5">13 Months</td>
                    <td className="p-2.5">Measures ad impressions, prevents ad fraud, and limits repeat ad frequency.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-2.5 font-mono font-bold text-slate-900">__gpi</td>
                    <td className="p-2.5">Google Publisher Tag</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">Advertising</span></td>
                    <td className="p-2.5">13 Months</td>
                    <td className="p-2.5">Tracks cross-session ad delivery performance on authorized publisher domains.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-900">IDE / test_cookie</td>
                    <td className="p-2.5">doubleclick.net</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">Advertising</span></td>
                    <td className="p-2.5">1 Year / Session</td>
                    <td className="p-2.5">Serves targeted non-intrusive career ads and registers user interaction conversions.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-2.5 font-mono font-bold text-slate-900">jobopedia_theme</td>
                    <td className="p-2.5">Jobopedia Local</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Functional</span></td>
                    <td className="p-2.5">Persistent</td>
                    <td className="p-2.5">Stores candidate Dark Mode / Light Mode visual theme preference.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-900">jobopedia_language</td>
                    <td className="p-2.5">Jobopedia Local</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Functional</span></td>
                    <td className="p-2.5">Persistent</td>
                    <td className="p-2.5">Saves chosen regional language (English, Gujarati, Hindi, Marathi, etc.).</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-2.5 font-mono font-bold text-slate-900">jobopedia_token</td>
                    <td className="p-2.5">Jobopedia Local</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">Strictly Necessary</span></td>
                    <td className="p-2.5">30 Days</td>
                    <td className="p-2.5">JSON Web Token (JWT) authenticating candidate account and test hall submissions.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-900">googtrans</td>
                    <td className="p-2.5">Google Translate</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Functional</span></td>
                    <td className="p-2.5">Session / Cookie</td>
                    <td className="p-2.5">Maintains instant localized translation state across web pages.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-2.5 font-mono font-bold text-slate-900">jobopedia_cookie_consent</td>
                    <td className="p-2.5">Jobopedia Local</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">Strictly Necessary</span></td>
                    <td className="p-2.5">1 Year</td>
                    <td className="p-2.5">Records user consent choices (All Cookies vs. Essential Only) to honor user privacy.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-section: How to Opt-Out & Manage Cookies */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">7.4 How to Opt-Out of Personalized Advertising</h3>
            <p>
              Users have the complete legal right to disable personalized ads or revoke cookie permissions through multiple official channels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="https://adssettings.google.com/authenticated"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition block group"
              >
                <div className="font-bold text-blue-600 group-hover:underline flex items-center space-x-1">
                  <span>Google Ads Settings (Direct Opt-Out)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Manage or turn off personalized advertising across Google's display ad network.</div>
              </a>

              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition block group"
              >
                <div className="font-bold text-blue-600 group-hover:underline flex items-center space-x-1">
                  <span>Digital Advertising Alliance (AboutAds)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Opt out of third-party interest-based advertising across dozens of participating vendors.</div>
              </a>

              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition block group"
              >
                <div className="font-bold text-blue-600 group-hover:underline flex items-center space-x-1">
                  <span>Network Advertising Initiative (NAI)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Central opt-out tool for leading ad networks delivering behavioral ads.</div>
              </a>

              <a
                href="https://www.youronlinechoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition block group"
              >
                <div className="font-bold text-blue-600 group-hover:underline flex items-center space-x-1">
                  <span>Your Online Choices (EU/UK EDAA)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Interactive guide and opt-out tool under European ePrivacy &amp; GDPR regulations.</div>
              </a>
            </div>
          </div>

          {/* Sub-section: Browser Cookie Management */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">7.5 Managing Cookies in Your Web Browser</h3>
            <p>
              You can instruct your web browser to delete or reject cookies at any time. Consult your browser's official instructions:
            </p>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-5">
              <li><strong>Google Chrome (Desktop/Android):</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies &rarr; Block third-party cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection &rarr; Custom (Check Cookies).</li>
              <li><strong>Apple Safari (iOS / macOS):</strong> Settings &rarr; Safari &rarr; Advanced &rarr; Block All Cookies.</li>
              <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies.</li>
            </ul>
            <p className="text-[11px] text-slate-500 pt-1">
              <em>Note:</em> Disabling strictly necessary cookies may prevent logging in to your candidate dashboard or saving customized mock test results.
            </p>
          </div>

          {/* Sub-section: CCPA / CPRA & GDPR Statements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
              <span className="font-black text-emerald-900 block">🛡️ CCPA / CPRA "Do Not Sell" Declaration</span>
              <p>Jobopedia strictly does <strong>NOT</strong> sell, rent, trade, or transfer candidates' personal identification data or phone records to data brokers or third parties for monetary consideration.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-1">
              <span className="font-black text-blue-900 block">🇪🇺 European Economic Area (EEA) / GDPR Rights</span>
              <p>Visitors from the EU/UK have full legal rights under GDPR to access, rectify, restrict, or request erasure of stored profile cookies and account records upon written email request.</p>
            </div>
          </div>

        </section>

        {/* Section 8: Independent Educational Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">8</span>
            <span>Independent Portal &amp; Government Disclaimer</span>
          </h2>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1.5 leading-relaxed font-medium">
            <p><strong>Non-Government Affiliation:</strong> Jobopedia (jobopedia.in) is an independent private employment news and career assistance portal. We are NOT affiliated with, associated with, endorsed by, or in any way officially connected with any Government agency, department, commission, or public recruitment board.</p>
            <p><strong>Zero Placement Charges:</strong> Jobopedia does NOT charge any fee from candidates for job employment or application submissions. All candidates are advised to verify details from the respective official governmental gazettes (e.g., upsc.gov.in, ssc.gov.in) before submitting fees.</p>
          </div>
        </section>

        {/* Section 9: Grievance & Contact */}
        <section className="space-y-3 pt-2">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">9</span>
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
