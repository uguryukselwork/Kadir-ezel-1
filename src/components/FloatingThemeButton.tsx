import React from 'react';
import { useApp } from '../context/AppContext';
import { Palette } from 'lucide-react';

export const FloatingThemeButton: React.FC = () => {
  const { openThemeModal, currentTheme, activeTab, language } = useApp();

  // Show on home tab as explicitly requested by user:
  // "Ana sayfa sol tarafta bir tane küçük ikon olsun tema butonu"
  if (activeTab !== 'home') return null;

  return (
    <div className="fixed left-3.5 bottom-[88px] z-40 animate-in fade-in zoom-in duration-200">
      <button
        onClick={openThemeModal}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[var(--surface-card)] text-[var(--text)] font-semibold text-xs shadow-lg active:scale-95 transition-all border border-[var(--border)] group"
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
