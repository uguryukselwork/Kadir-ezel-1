import React from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import { X, Moon, Sun, Volume2, VolumeX, Globe, Palette, Shield, Share2 } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsModalOpen,
    closeSettingsModal,
    language,
    openLanguageModal,
    theme,
    openThemeModal,
    darkMode,
    toggleDarkMode,
    soundEnabled,
    setSoundEnabled,
    playSound
  } = useApp();

  if (!isSettingsModalOpen) return null;

  const handleToggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    if (newVal) playSound('click');
  };

  const handleToggleDark = () => {
    toggleDarkMode();
    playSound('pop');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-200"
        onClick={closeSettingsModal}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[var(--surface-card)] rounded-[32px] p-6 shadow-2xl border border-[var(--border)] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-[var(--text)]">
            {language === 'tr' ? 'Ayarlar' : 'Settings'}
          </h2>
          <button 
            onClick={() => { closeSettingsModal(); playSound('click'); }}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--text-muted)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {/* Theme Option */}
          <button
            onClick={() => { openThemeModal(); closeSettingsModal(); playSound('click'); }}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[var(--primary)] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl theme-bg text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Palette className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-[var(--text)]">
                  {language === 'tr' ? 'Tema Değiştir' : 'Change Theme'}
                </div>
                <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {theme}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[var(--text-muted)]">
              <X className="w-4 h-4 rotate-45" />
            </div>
          </button>

          {/* Language Option */}
          <button
            onClick={() => { openLanguageModal(); closeSettingsModal(); playSound('click'); }}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[var(--primary)] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-[var(--text)]">
                  {language === 'tr' ? 'Dil Seçimi' : 'Language'}
                </div>
                <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {language}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[var(--text-muted)]">
              <X className="w-4 h-4 rotate-45" />
            </div>
          </button>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${darkMode ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400' : 'bg-amber-100 text-amber-600'}`}>
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-[var(--text)]">
                  {language === 'tr' ? 'Karanlık Mod' : 'Dark Mode'}
                </div>
                <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {darkMode ? (language === 'tr' ? 'Açık' : 'On') : (language === 'tr' ? 'Kapalı' : 'Off')}
                </div>
              </div>
            </div>
            <button
              onClick={handleToggleDark}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${soundEnabled ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-[var(--text)]">
                  {language === 'tr' ? 'Uygulama Sesleri' : 'App Sounds'}
                </div>
                <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {soundEnabled ? (language === 'tr' ? 'Aktif' : 'Enabled') : (language === 'tr' ? 'Sessiz' : 'Muted')}
                </div>
              </div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${soundEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${soundEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {/* Share on WhatsApp */}
          <button
            onClick={() => {
              closeSettingsModal();
              playSound('click');
              const url = window.location.origin;
              const text = language === 'tr'
                ? `🇹🇭 *Kadir Thai - Tayland Gezi Rehberi & Tur Asistanı*\nTayland tatilinizde ada turları, motor kiralama, döviz ve VIP transfer rehberiniz Kadir Ezel ile cebinizde!\n📲 İncelemek için tıkla: ${url}`
                : `🇹🇭 *Kadir Thai - Thailand Travel Guide & Tour Assistant*\nIsland tours, scooter rental, VIP transfer and 24/7 personal guide in Phuket:\n📲 Visit: ${url}`;
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Share2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-emerald-800 dark:text-emerald-300">
                  {language === 'tr' ? "WhatsApp'ta Paylaş" : 'Share on WhatsApp'}
                </div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {language === 'tr' ? 'Logosu ve önizlemesiyle gönder' : 'Send app link with logo preview'}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600">
              <X className="w-4 h-4 rotate-45" />
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Kadir Ezel Official App v1.2
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold">
            © 2026 Phuket, Thailand
          </p>
        </div>
      </div>
    </div>
  );
};
