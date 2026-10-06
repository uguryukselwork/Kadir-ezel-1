import React from 'react';
import { useApp } from '../context/AppContext';
import { Palette } from 'lucide-react';

export const FloatingThemeButton: React.FC = () => {
  const { openThemeModal, currentTheme, activeTab, language } = useApp();

  // Show on home tab as explicitly requested by user:
  // "Ana sayfa sol tarafta bir tane küçük ikon olsun tema butonu"
  if (activeTab !== 'home') return null;

  return (
    <div className="fixed left-4 bottom-[104px] z-40 animate-in fade-in zoom-in duration-200">
      <button
        onClick={openThemeModal}
        className="animate-signal flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-[var(--surface-card)] hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--text)] font-black text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all border border-[var(--border)] group"
        title={language === 'tr' ? 'Renk Teması Değiştir' : 'Change Color Theme'}
        aria-label="Change theme"
      >
        <div className="relative">
          <Palette className="w-4 h-4 text-[var(--primary)] transition-transform group-hover:rotate-12" />
          <span
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white dark:border-slate-800 shadow-xs"
            style={{ backgroundColor: currentTheme.color }}
          />
        </div>
        <span className="text-sm leading-none">{currentTheme.icon}</span>
      </button>
    </div>
  );
};
