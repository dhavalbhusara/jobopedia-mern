import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  STATE_DISTRICTS_DATA, 
  SUPPORTED_LANGUAGES, 
  UI_TRANSLATIONS 
} from '../constants/districtLanguages';

const LanguageContext = createContext();

// Function to update Google Translate cookies and fire full DOM translation
function triggerGoogleTranslate(langCode) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const target = langCode || 'en';
  const hostname = window.location.hostname;

  if (target === 'en') {
    // Reset back to original English
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (hostname) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    }
    const combo = document.querySelector('.goog-te-combo') || document.querySelector('select.goog-te-combo');
    if (combo && combo.value !== 'en') {
      combo.value = 'en';
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return;
  }

  // Set translation cookies
  document.cookie = `googtrans=/en/${target}; path=/;`;
  document.cookie = `googtrans=/auto/${target}; path=/;`;
  if (hostname && hostname !== 'localhost') {
    document.cookie = `googtrans=/en/${target}; domain=.${hostname}; path=/;`;
    document.cookie = `googtrans=/auto/${target}; domain=.${hostname}; path=/;`;
  }

  const applyToSelect = (select) => {
    if (!select) return false;
    select.value = target;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  };

  const select = document.querySelector('.goog-te-combo') || document.querySelector('select.goog-te-combo');
  if (select) {
    applyToSelect(select);
  } else {
    let tries = 0;
    const interval = setInterval(() => {
      tries++;
      const s = document.querySelector('.goog-te-combo') || document.querySelector('select.goog-te-combo');
      if (s) {
        applyToSelect(s);
        clearInterval(interval);
      } else if (tries > 12) {
        clearInterval(interval);
      }
    }, 250);
  }
}

export function LanguageProvider({ children }) {
  // 1. Initial Language State from localStorage or default 'en' (English)
  const [language, setLanguageState] = useState(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('jobopedia_lang_default_v2') !== 'true') {
        localStorage.setItem('jobopedia_lang_default_v2', 'true');
        localStorage.setItem('jobopedia_language', 'en');
        return 'en';
      }
      const stored = localStorage.getItem('jobopedia_language');
      if (stored && (UI_TRANSLATIONS[stored] || SUPPORTED_LANGUAGES.some(l => l.code === stored))) return stored;
      const storedUser = localStorage.getItem('jobopedia_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.preferredLanguage) {
          return u.preferredLanguage;
        }
      }
      return 'en'; // Default to English
    } catch {
      return 'en';
    }
  });

  // 2. Selected State & District State
  const [selectedState, setSelectedState] = useState(() => {
    try {
      const storedUser = localStorage.getItem('jobopedia_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.state && STATE_DISTRICTS_DATA[u.state]) return u.state;
      }
      return 'Gujarat';
    } catch {
      return 'Gujarat';
    }
  });

  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    try {
      const storedUser = localStorage.getItem('jobopedia_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.district) return u.district;
      }
      return 'ahmedabad';
    } catch {
      return 'ahmedabad';
    }
  });

  // Persist language on change & trigger full-page instant DOM translation (all jobs & descriptions)
  const setLanguage = (langCode) => {
    const validLang = langCode || 'en';
    setLanguageState(validLang);
    try {
      localStorage.setItem('jobopedia_language', validLang);
      localStorage.setItem('jobopedia_lang_default_v2', 'true');
      if (typeof document !== 'undefined') {
        document.documentElement.lang = validLang;
      }
    } catch (e) {}

    // Translate entire webpage (all dynamic jobs and descriptions)
    triggerGoogleTranslate(validLang);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      triggerGoogleTranslate(language);
    }
  }, [language]);

  // Helper: Get districts list for any given state
  const getDistrictsForState = (stateName) => {
    const sData = STATE_DISTRICTS_DATA[stateName] || STATE_DISTRICTS_DATA['Gujarat'];
    return sData.districts || [];
  };

  // Helper: Get spoken/regional languages for a district or state
  const getSpokenLanguages = (stateName, districtId) => {
    const sData = STATE_DISTRICTS_DATA[stateName] || STATE_DISTRICTS_DATA['Gujarat'];
    return sData.spokenLanguages || [
      { code: 'en', name: 'English' },
      { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
      { code: 'hi', name: 'हिंदी (Hindi)' }
    ];
  };

  // Helper: When user changes state, auto-update district
  const handleStateChange = (newState) => {
    setSelectedState(newState);
    const districts = getDistrictsForState(newState);
    if (districts.length > 0) {
      setSelectedDistrict(districts[0].id);
    } else {
      setSelectedDistrict('');
    }
  };

  // Helper: When user changes district, update selected district
  const handleDistrictChange = (newDistrictId) => {
    setSelectedDistrict(newDistrictId);
  };

  // Translation function t(key, fallback)
  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const currentDict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS['en'];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback order: English -> Gujarati -> Hindi -> fallback argument
    if (UI_TRANSLATIONS['en'] && UI_TRANSLATIONS['en'][key]) return UI_TRANSLATIONS['en'][key];
    if (UI_TRANSLATIONS['gu'] && UI_TRANSLATIONS['gu'][key]) return UI_TRANSLATIONS['gu'][key];
    if (UI_TRANSLATIONS['hi'] && UI_TRANSLATIONS['hi'][key]) return UI_TRANSLATIONS['hi'][key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      selectedState,
      selectedDistrict,
      setSelectedState,
      setSelectedDistrict,
      handleStateChange,
      handleDistrictChange,
      getDistrictsForState,
      getSpokenLanguages,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
      stateDistrictsData: STATE_DISTRICTS_DATA
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
