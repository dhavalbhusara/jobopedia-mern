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
        <span className="text-slate-800">Privacy Policy (ગોપનીયતા નીતિ)</span>
      </div>

      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-black uppercase px-3.5 py-1 rounded-full border border-blue-200 inline-flex items-center space-x-1.5 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Legal &amp; Candidate Data Protection</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy (પ્રાઈવસી પોલિસી)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          Jobopedia પર તમારા અંગત ડેટાની સુરક્ષા અને પારદર્શિતા અમારો મુખ્ય સિદ્ધાંત છે. છેલ્લે સુધારેલ: ઓક્ટોબર 2026.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">1</span>
            <span>પરિચય (Introduction)</span>
          </h2>
          <p>
            <strong>Jobopedia</strong> ("અમે", "અમારું" અથવા "પ્લેટફોર્મ") ભારતભરના અને ખાસ કરીને ગુજરાતના યુવાનો માટે સરકારી ભરતી (Govt Jobs), પ્રાઈવેટ મલ્ટીનેશનલ કંપનીઓની નોકરીઓ (MNC Careers), પેઇડ ઇન્ટર્નશીપ્સ અને ફ્રી ઓનલાઈન CBT મોક ટેસ્ટ્સ પૂરી પાડતું એક વિશ્વસનીય કારકિર્દી પોર્ટલ છે.
          </p>
          <p>
            આ પ્રાઈવસી પોલિસી સમજાવે છે કે જ્યારે તમે અમારી વેબસાઈટની મુલાકાત લો છો, ખાતું બનાવો છો અથવા નોટિફિકેશન ચાલુ કરો છો ત્યારે અમે તમારી કઈ માહિતી એકત્રિત કરીએ છીએ અને તેનું રક્ષણ કેવી રીતે કરીએ છીએ.
          </p>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">2</span>
            <span>અમે કઈ માહિતી એકત્રિત કરીએ છીએ (Information We Collect)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>ઉમેદવાર પ્રોફાઇલ માહિતી</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>પૂરું નામ (Full Name)</li>
                <li>ઈમેઈલ એડ્રેસ (Email Address)</li>
                <li>10-અંકનો મોબાઈલ નંબર (Mobile Number)</li>
                <li>શૈક્ષણિક લાયકાત/ડિગ્રી (Qualification)</li>
                <li>વતનનું રાજ્ય (Home State - e.g. Gujarat)</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Bell className="w-4 h-4 text-blue-600" />
                <span>ડિવાઈસ &amp; નોટિફિકેશન ટોકન</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>ક્રોમ વેબ પુશ સબસ્ક્રિપ્શન ટોકન (FCM Token)</li>
                <li>ડિવાઇસ પ્લેટફોર્મ (Mobile Phone અથવા Desktop PC)</li>
                <li>બ્રાઉઝર ટાઈપ (Chrome, Safari, Firefox)</li>
                <li>સુરક્ષા લોગ અને અંદાજિત વિઝિટર એનાલિટિક્સ</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Section 3: How We Use Information */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">3</span>
            <span>માહિતીનો ઉપયોગ કેવી રીતે થાય છે (How We Use Your Data)</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>પર્સનલાઇઝ્ડ જોબ સૂચનો:</strong> તમારી ડિગ્રી (જેમ કે BCA, B.E., 12th Pass, Graduate) અને રાજ્ય મુજબ મેળ ખાતી ભરતીઓ દર્શાવવા.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>ઓટોમેટિક પુશ નોટિફિકેશન:</strong> જ્યારે કોઈ નવી સરકારી કે પ્રાઇવેટ જોબ જાહેર થાય ત્યારે તમારા મોબાઈલ પર ત્વરિત એલર્ટ મોકલવા માટે.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>CBT મોક ટેસ્ટ સ્કોરકાર્ડ:</strong> તમારા પ્રેક્ટિસ ટેસ્ટના પરિણામો અને પ્રગતિ તમારા ઉમેદવાર પેનલમાં સુરક્ષિત રાખવા.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>હેલ્પ ડેસ્ક અને ફરિયાદ નિવારણ:</strong> જ્યારે તમે સહાયતા માટે વિનંતી કરો ત્યારે તમારા પ્રશ્નનો ઝડપથી ઉકેલ લાવવા માટે.</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Web Push Notifications Policy */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">4</span>
            <span>વેબ પુશ નોટિફિકેશન નીતિ (Push Notifications Policy)</span>
          </h2>
          <p>
            Jobopedia સત્તાવાર <strong>W3C Web Push &amp; Service Worker (`sw.js`)</strong> ટેકનોલોજીનો ઉપયોગ કરે છે.
          </p>
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 space-y-1.5 font-medium">
            <p><strong>તમારી મંજૂરી (Explicit Consent):</strong> જ્યાં સુધી તમે બ્રાઉઝરમાં "Allow" ના આપો ત્યાં સુધી કોઈ નોટિફિકેશન મોકલવામાં આવતી નથી.</p>
            <p><strong>ગમે ત્યારે બંધ કરી શકો છો (Opt-out Anytime):</strong> જો તમે ભવિષ્યમાં નોટિફિકેશન બંધ કરવા માંગો છો, તો તમારા બ્રાઉઝરના URL બારમાં રહેલા <strong>તાળા (🔒 Lock)</strong> ના આઇકોન પર ક્લિક કરીને "Reset permission" અથવા "Block" કરી શકો છો.</p>
          </div>
        </section>

        {/* Section 5: Data Security & Storage */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">5</span>
            <span>ડેટા સુરક્ષા અને સંગ્રહ (Data Security &amp; Storage)</span>
          </h2>
          <p>
            અમે તમારા ડેટાની સુરક્ષા માટે અત્યાધુનિક ઉદ્યોગ ધોરણોનું પાલન કરીએ છીએ:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-5">
            <li>તમામ પાસવર્ડ્સ <strong>bcrypt salt hashing</strong> ટેકનોલોજી દ્વારા સુરક્ષિત કરાય છે.</li>
            <li>તમારો ડેટા એન્ક્રિપ્ટેડ ક્લાઉડ ડેટાબેઝ (MongoDB Atlas) માં સંગ્રહિત થાય છે.</li>
            <li><strong>નો સેલિંગ પોલિસી:</strong> અમે ક્યારેય પણ કોઈપણ ઉમેદવારનો ડેટા (Email, Phone) કોઈ ત્રીજી માર્કેટિંગ એજન્સીને વેચતા કે શેર કરતા નથી.</li>
          </ul>
        </section>

        {/* Section 6: Third-Party Links */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">6</span>
            <span>સરકારી અને તૃતીય પક્ષ લિંક્સ (Third-Party Official Links)</span>
          </h2>
          <p>
            Jobopedia પર ઉપલબ્ધ "Apply Online" અથવા "Official Notification" બટન તમને સીધા સત્તાવાર સરકારી પોર્ટલ (જેમ કે <em>upsc.gov.in, ssc.gov.in, ojas.gujarat.gov.in</em>) અથવા અધિકૃત કંપની કારકિર્દી પેજ પર લઈ જાય છે. અમે ભલામણ કરીએ છીએ કે ત્રીજી વેબસાઇટ પર તેમની પોતાની પ્રાઈવસી પોલિસી પણ ચકાસી લેવી.
          </p>
        </section>

        {/* Section 7: Grievance & Contact */}
        <section className="space-y-3 pt-2">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">7</span>
            <span>સંપર્ક &amp; ફરિયાદ નિવારણ (Grievance Redressal Officer)</span>
          </h2>
          <p>
            જો તમને તમારા ડેટા, ખાતા ડિલીટ કરવાની વિનંતી અથવા આ પોલિસી સંબંધિત કોઈપણ પ્રશ્ન હોય તો તમે અમારો સીધો સંપર્ક કરી શકો છો:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>સત્તાવાર ઈમેઈલ હેલ્પલાઇન:</span>
              </div>
              <div className="text-slate-600 font-mono">jobopedia.careers@gmail.com</div>
              <div className="text-slate-500 font-mono text-[11px]">Instagram: @jobopedia.in</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>વોટ્સએપ હેલ્પ ડેસ્ક &amp; ફોન:</span>
              </div>
              <div className="text-slate-600 font-mono font-bold">+91 95104 42584</div>
              <div className="text-slate-500 text-[11px]">સોમવાર - શનિવાર (સવારે 9:00 થી સાંજે 8:00)</div>
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
          <span>મુખ્ય પેજ પર પાછા જાઓ (Back to Home)</span>
        </button>
      </div>

    </div>
  );
}
