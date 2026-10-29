import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  STATE_DISTRICTS_DATA, 
  SUPPORTED_LANGUAGES, 
  UI_TRANSLATIONS 
} from '../constants/districtLanguages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // 1. Initial Language State from localStorage or default 'gu' (Gujarati)
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem('jobopedia_language');
      if (stored && UI_TRANSLATIONS[stored]) return stored;
      const storedUser = localStorage.getItem('jobopedia_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.preferredLanguage && UI_TRANSLATIONS[u.preferredLanguage]) {
          return u.preferredLanguage;
        }
      }
      return 'gu'; // Default to Gujarati
    } catch {
      return 'gu';
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

  // Persist language on change & update html lang attribute
  const setLanguage = (langCode) => {
    const validLang = UI_TRANSLATIONS[langCode] ? langCode : 'gu';
    setLanguageState(validLang);
    try {
      localStorage.setItem('jobopedia_language', validLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = validLang;
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
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
      { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
      { code: 'hi', name: 'हिंदी (Hindi)' },
      { code: 'en', name: 'English' }
    ];
  };

  // Helper: When user changes state, auto-update district and pick recommended spoken language
  const handleStateChange = (newState) => {
    setSelectedState(newState);
    const districts = getDistrictsForState(newState);
    if (districts.length > 0) {
      const firstDistrict = districts[0];
      setSelectedDistrict(firstDistrict.id);
      if (firstDistrict.defaultLang && UI_TRANSLATIONS[firstDistrict.defaultLang]) {
        setLanguage(firstDistrict.defaultLang);
      }
    } else {
      setSelectedDistrict('');
    }
  };

  // Helper: When user changes district, auto-switch to district's native language if desired
  const handleDistrictChange = (newDistrictId, stateName = selectedState) => {
    setSelectedDistrict(newDistrictId);
    const districts = getDistrictsForState(stateName);
    const matched = districts.find(d => d.id === newDistrictId || d.name.toLowerCase() === newDistrictId.toLowerCase());
    if (matched && matched.defaultLang && UI_TRANSLATIONS[matched.defaultLang]) {
      setLanguage(matched.defaultLang);
    }
  };

  // Translation function t(key, fallback)
  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const currentDict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS['gu'];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback order: Gujarati -> Hindi -> English -> fallback argument
    if (UI_TRANSLATIONS['gu'] && UI_TRANSLATIONS['gu'][key]) return UI_TRANSLATIONS['gu'][key];
    if (UI_TRANSLATIONS['hi'] && UI_TRANSLATIONS['hi'][key]) return UI_TRANSLATIONS['hi'][key];
    if (UI_TRANSLATIONS['en'] && UI_TRANSLATIONS['en'][key]) return UI_TRANSLATIONS['en'][key];
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
