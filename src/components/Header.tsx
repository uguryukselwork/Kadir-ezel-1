import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { APP_CONFIG } from '../data';
import { t } from '../utils/i18n';
import { HamburgerMenu } from './HamburgerMenu';
import { Sun, Moon, MapPin, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, darkMode, toggleDarkMode, setActiveTab, playSound } = useApp();
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
          <div className="brand-logo overflow-hidden ring-1 ring-[var(--border)] bg-white">
            <img
              src="/apple-touch-icon.png"
              alt="Kadir Thai Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to static src path if needed
                (e.target as HTMLImageElement).src = '/pwa-192x192.png';
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="brand-name">
                {t('appName', language)}
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full theme-soft-bg theme-text">
                {t('guideBadge', language)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[12.5px] font-medium text-[var(--text-muted)] mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 theme-text shrink-0" />
              <span>{language === 'tr' ? APP_CONFIG.city : APP_CONFIG.cityEn}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => { toggleDarkMode(); playSound('pop'); }}
            className="icon-btn"
            title={darkMode ? (language === 'tr' ? 'Açık Mod' : 'Light Mode') : (language === 'tr' ? 'Karanlık Mod' : 'Dark Mode')}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Hamburger Menu Toggle (Replaced top admin button) */}
          <button
            onClick={() => { setIsMenuOpen(true); playSound('click'); }}
            className="icon-btn"
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
