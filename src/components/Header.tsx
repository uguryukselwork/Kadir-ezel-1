import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { APP_CONFIG } from '../data';
import { t } from '../utils/i18n';
import { HamburgerMenu } from './HamburgerMenu';
import { countryFlag } from '../utils/countries';
import { Sun, Moon, MapPin, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, darkMode, toggleDarkMode, setActiveTab, playSound, country, openWelcome } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`topbar ${isScrolled ? 'topbar-scrolled' : ''}`}>
        <div 
          className="brand cursor-pointer select-none" 
          onClick={() => setActiveTab('home')}
          title={t('appName', language)}
        >
          <div className="brand-logo overflow-hidden p-0.5 bg-white dark:bg-slate-800 border-2 border-teal-500/40 shadow-sm shrink-0">
            <img
              src="/apple-touch-icon.png"
              alt="Kadir Thai Logo"
              className="w-full h-full object-cover rounded-[14px]"
              onError={(e) => {
                // Fallback to static src path if needed
                (e.target as HTMLImageElement).src = '/pwa-192x192.png';
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="brand-name font-black tracking-tight text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                {t('appName', language)}
              </h1>
              <span className="inline-flex items-center text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full theme-soft-bg theme-text">
                {t('guideBadge', language)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 theme-text shrink-0" />
              <span>{language === 'tr' ? APP_CONFIG.city : APP_CONFIG.cityEn}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Country & language: reopens the first-launch picker */}
          <button
            onClick={() => { openWelcome(); playSound('click'); }}
            className="icon-btn text-[20px] leading-none"
            title={t('changeCountryLanguage', language)}
            aria-label={t('changeCountryLanguage', language)}
          >
            <span aria-hidden="true">{country ? countryFlag(country) : '🌍'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => { toggleDarkMode(); playSound('pop'); }}
            className="icon-btn hover:border-[var(--primary)] text-slate-700 dark:text-slate-300"
            title={darkMode ? (language === 'tr' ? 'Açık Mod' : 'Light Mode') : (language === 'tr' ? 'Karanlık Mod' : 'Dark Mode')}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Hamburger Menu Toggle (Replaced top admin button) */}
          <button
            onClick={() => { setIsMenuOpen(true); playSound('click'); }}
            className="icon-btn hover:border-[var(--primary)] text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 shadow-xs"
            title={language === 'tr' ? 'Menü' : 'Menu'}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hamburger Drawer Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
