import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ContactPage({ setCurrentView }) {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const triggerWhatsApp = () => {
    const text = encodeURIComponent("Namaste Jobopedia Support Desk,\n\nI have an inquiry regarding job postings and application guidance.");
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600 flex items-center space-x-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800">Contact Us</span>
      </div>

      <div className="text-center space-y-2">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-emerald-200 inline-block">
          Support Desk
        </span>
        <h1 className="text-3xl font-black text-slate-900">
          સંપર્ક કરો (Contact Jobopedia)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          ભરતી વિશે કોઈ પ્રશ્ન હોય અથવા ઓનલાઈન ફોર્મ ભરવામાં મદદ જોઈતી હોય તો અમારો સંપર્ક કરો.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#0B1528] to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <h3 className="text-lg font-black text-white">હેલ્પલાઇન &amp; સહાયતા</h3>
            <p className="text-xs text-slate-300 mt-1">
              અમારી ટીમ સોમવાર થી શનિવાર સવારે 9:00 થી સાંજે 8:00 સુધી ઉપલબ્ધ છે.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-400">Cyber Cafe WhatsApp Helpline:</div>
                <div className="font-bold text-white text-sm">+91 98765 43210</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-400">Official Support Email:</div>
                <div className="font-bold text-white text-sm">support@jobopedia.in</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-400">Headquarters:</div>
                <div className="font-bold text-white">Gandhinagar, Gujarat, India</div>
              </div>
            </div>
          </div>

          <button
            onClick={triggerWhatsApp}
            className="w-full py-3 bg-[#F58220] hover:bg-[#ea580c] text-white rounded-2xl text-xs font-black shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <i className="fa-brands fa-whatsapp text-base"></i>
            <span>WhatsApp Helpline પર વાત કરો</span>
          </button>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">સંદેશો મોકલાઈ ગયો છે!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                તમારો પ્રશ્ન સફળતાપૂર્વક સબમિટ થઈ ગયો છે. અમારી સપોર્ટ ટીમ 24 કલાકમાં તમારો સંપર્ક કરશે.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-blue-600 hover:underline pt-2"
              >
                બીજો મેસેજ મોકલો (Send another)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">તમારું પૂરું નામ (Full Name)</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Ramesh Patel" 
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ઈમેઈલ (Email)</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com" 
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">મોબાઈલ નંબર (Mobile)</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="9876543210" 
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">તમારો પ્રશ્ન અથવા સંદેશો (Message)</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="ભરતી વિશે કંઈપણ પૂછો..." 
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>સંદેશો મોકલો (Submit Inquiry)</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
