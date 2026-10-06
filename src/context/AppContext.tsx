import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TabType, UserRequest, RequestStatus, ToastMessage, ThemeType, ThemeOption } from '../types';
import { TourItem, TOURS_DATA, THEME_OPTIONS } from '../data';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isLanguageModalOpen: boolean;
  openLanguageModal: () => void;
  closeLanguageModal: () => void;
  country: string | null;
  completeWelcome: (country: string, lang: Language) => void;
  isWelcomeOpen: boolean;
  openWelcome: () => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentTheme: ThemeOption;
  isThemeModalOpen: boolean;
  openThemeModal: () => void;
  closeThemeModal: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  selectedTourForSheet: TourItem | null;
  isOrganizerSheetOpen: boolean;
  openOrganizerSheet: (tour?: TourItem | null) => void;
  closeOrganizerSheet: () => void;
  preselectedTourName: string | null;
  setPreselectedTourName: (name: string | null) => void;
  startBookingForTour: (tour: TourItem) => void;
  requests: UserRequest[];
  addRequest: (reqData: Omit<UserRequest, 'id' | 'createdAt' | 'status'>) => UserRequest;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  deleteRequest: (id: string) => void;
  clearAllRequests: () => void;
  seedSampleRequests: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toast: ToastMessage | null;
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  clearToast: () => void;
  selectedMoodId: string | null;
  setSelectedMoodId: (id: string | null) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  playSound: (type: 'click' | 'success' | 'tab' | 'pop') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'kadir_thai_lang';
const STORAGE_THEME_KEY = 'kadir_thai_theme';
const STORAGE_REQUESTS_KEY = 'kadir_thai_requests';
const STORAGE_DARK_KEY = 'kadir_thai_dark';
const STORAGE_MOOD_KEY = 'kadir_thai_mood';
const STORAGE_SOUND_KEY = 'kadir_thai_sound';
const STORAGE_COUNTRY_KEY = 'kadir_thai_country';

const INITIAL_SAMPLE_REQUESTS: UserRequest[] = [
  {
    id: 'req-sample-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    name: 'Mehmet Yılmaz',
    phone: '+90 532 555 1234',
    nationality: 'Turkish',
    requestType: 'Tour',
    tourName: 'Phi Phi Adaları & Maya Bay Sürat Teknesi Turu',
    date: '2026-10-15',
    peopleCount: '2 Kişi',
    message: 'Phi Phi & Maya Bay turu için rezervasyon ve otel transferi istiyoruz.',
    status: 'New'
  },
  {
    id: 'req-sample-2',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    name: 'Burak & Selin Demir',
    phone: '+90 541 333 4567',
    nationality: 'Turkish',
    requestType: 'Motorbike rental',
    date: '2026-10-12',
    peopleCount: '2 Kişi',
    message: 'Honda PCX 160 scooter kiralamak istiyoruz. 5 günlük fiyat alabilir miyiz?',
    status: 'Contacted'
  },
  {
    id: 'req-sample-3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    name: 'Alexander Novak',
    phone: '+44 7700 900077',
    nationality: 'Other',
    requestType: 'Transfer',
    date: '2026-10-20',
    peopleCount: '3 Persons',
    message: 'Airport transfer to Kata Beach hotel, arriving on flight TK0068.',
    status: 'Completed'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language: Default 'tr', persisted, supporting all languages
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_LANG_KEY) as Language;
    const isValid = SUPPORTED_LANGUAGES.some((l) => l.code === saved);
    if (isValid) return saved;

    // Auto-detect browser language if no saved preference
    try {
      const browserLang = navigator.language.split('-')[0] as Language;
      const isSupported = SUPPORTED_LANGUAGES.some((l) => l.code === browserLang);
      return isSupported ? browserLang : 'tr';
    } catch (e) {
      return 'tr';
    }
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_LANG_KEY, lang);
    setIsLanguageModalOpen(false);
  };

  const toggleLanguage = () => {
    // Open language picker modal for intuitive selection
    setIsLanguageModalOpen(true);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // 1.2 Country of origin, asked once on first launch together with the language
  const [country, setCountryState] = useState<string | null>(() => localStorage.getItem(STORAGE_COUNTRY_KEY));
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(() => !localStorage.getItem(STORAGE_COUNTRY_KEY));

  const completeWelcome = (code: string, lang: Language) => {
    setCountryState(code);
    localStorage.setItem(STORAGE_COUNTRY_KEY, code);
    setLanguage(lang);
    setIsWelcomeOpen(false);
  };

  const openWelcome = () => setIsWelcomeOpen(true);

  const openLanguageModal = () => setIsLanguageModalOpen(true);
  const closeLanguageModal = () => setIsLanguageModalOpen(false);

  // 1.5 Theme Management
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY) as ThemeType;
    const isValid = THEME_OPTIONS.some((t) => t.id === saved);
    return isValid ? saved : 'tropical';
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  }, [theme]);

  const setTheme = (t: ThemeType) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_THEME_KEY, t);
    setIsThemeModalOpen(false);
  };

  const openThemeModal = () => setIsThemeModalOpen(true);
  const closeThemeModal = () => setIsThemeModalOpen(false);

  const currentTheme = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  // 2. Active Tab & Route handling (support /admin or #admin)
  const [activeTab, setActiveTabState] = useState<TabType>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'admin' || hash === 'tours' || hash === 'request' || hash === 'organizer') {
      return hash as TabType;
    }
    if (window.location.pathname.includes('/admin')) {
      return 'admin';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin' || hash === 'tours' || hash === 'request' || hash === 'organizer' || hash === 'home') {
        setActiveTabState(hash as TabType);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Category drilldown
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // 4. Kadir Ezel Organizer Bottom Sheet
  const [selectedTourForSheet, setSelectedTourForSheet] = useState<TourItem | null>(null);
  const [isOrganizerSheetOpen, setIsOrganizerSheetOpen] = useState<boolean>(false);

  const openOrganizerSheet = (tour: TourItem | null = null) => {
    setSelectedTourForSheet(tour || null);
    setIsOrganizerSheetOpen(true);
  };

  const closeOrganizerSheet = () => {
    setIsOrganizerSheetOpen(false);
  };

  // 5. Preselected tour for booking
  const [preselectedTourName, setPreselectedTourName] = useState<string | null>(null);

  const startBookingForTour = (tour: TourItem) => {
    const name = language === 'tr' ? tour.nameTr : tour.nameEn;
    setPreselectedTourName(name);
    setActiveTab('request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6. Requests in localStorage
  const [requests, setRequests] = useState<UserRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REQUESTS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading requests from localStorage:', e);
    }
    return INITIAL_SAMPLE_REQUESTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save requests:', e);
    }
  }, [requests]);

  const addRequest = (reqData: Omit<UserRequest, 'id' | 'createdAt' | 'status'>): UserRequest => {
    const newReq: UserRequest = {
      ...reqData,
      id: 'req-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const clearAllRequests = () => {
    setRequests([]);
  };

  const seedSampleRequests = () => {
    setRequests(INITIAL_SAMPLE_REQUESTS);
  };

  // 7. Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_DARK_KEY);
    return saved === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_DARK_KEY, String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // 8. Toast notification
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const newToast: ToastMessage = {
      id: String(Date.now()),
      title,
      message,
      type
    };
    setToast(newToast);
    setTimeout(() => {
      setToast((cur) => (cur?.id === newToast.id ? null : cur));
    }, 4500);
  };

  const clearToast = () => {
    setToast(null);
  };

  // 9. Mood Selection
  const [selectedMoodId, setSelectedMoodIdState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_MOOD_KEY);
  });

  const setSelectedMoodId = (id: string | null) => {
    setSelectedMoodIdState(id);
    if (id) {
      localStorage.setItem(STORAGE_MOOD_KEY, id);
    } else {
      localStorage.removeItem(STORAGE_MOOD_KEY);
    }
  };
  
  // 10. Sound Management
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_SOUND_KEY);
    return saved !== 'false'; // Default true
  });

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    localStorage.setItem(STORAGE_SOUND_KEY, String(enabled));
  };

  const playSound = (type: 'click' | 'success' | 'tab' | 'pop') => {
    if (!soundEnabled) return;

    try {
      const frequencies = {
        click: 600,
        success: 800,
        tab: 400,
        pop: 1000
      };
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const freq = frequencies[type] || 440;
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      if (type === 'success') {
        oscillator.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.1);
      } else if (type === 'pop') {
        oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + 0.1);
      }

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  };

  // 11. Settings Modal
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isLanguageModalOpen,
        openLanguageModal,
        closeLanguageModal,
        country,
        completeWelcome,
        isWelcomeOpen,
        openWelcome,
        theme,
        setTheme,
        currentTheme,
        isThemeModalOpen,
        openThemeModal,
        closeThemeModal,
        activeTab,
        setActiveTab,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedTourForSheet,
        isOrganizerSheetOpen,
        openOrganizerSheet,
        closeOrganizerSheet,
        preselectedTourName,
        setPreselectedTourName,
        startBookingForTour,
        requests,
        addRequest,
        updateRequestStatus,
        deleteRequest,
        clearAllRequests,
        seedSampleRequests,
        darkMode,
        toggleDarkMode,
        toast,
        showToast,
        clearToast,
        selectedMoodId,
        setSelectedMoodId,
        soundEnabled,
        setSoundEnabled,
        isSettingsModalOpen,
        openSettingsModal,
        closeSettingsModal,
        playSound
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
