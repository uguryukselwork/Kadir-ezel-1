import React from 'react';
import { useApp } from '../context/AppContext';
import { THEME_OPTIONS } from '../data';
import { t } from '../utils/i18n';
import { Palette, Check, Sparkles } from 'lucide-react';

export const ThemeModal: React.FC = () => {
  const { isThemeModalOpen, closeThemeModal, theme, setTheme, language } = useApp();

  if (!isThemeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={closeThemeModal} />

      {/* iOS Settings Style Sheet */}
      <div className="relative w-full max-w-[420px] bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-t-[32px] sm:rounded-[28px] shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[88vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-250">
        
        {/* iOS Pull indicator for mobile */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        {/* iOS Navigation Header Bar */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-white/70 dark:bg-[#2C2C2E]/70 backdrop-blur-md">
          <button
            onClick={closeThemeModal}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 active:opacity-60 transition-opacity"
          >
            {t('cancel', language)}
          </button>

          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[var(--primary)]" />
            <span>{t('themeTitle', language)}</span>
          </div>

          <button
            onClick={closeThemeModal}
            className="text-sm font-bold text-[var(--primary)] active:opacity-60 transition-opacity"
          >
            {t('done', language)}
          </button>
        </div>

        {/* Themes List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between px-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('thailandThemes', language)}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[var(--primary)]">
              <Sparkles className="w-3 h-3" />
              <span>{t('livePreview', language)}</span>
            </span>
          </div>

          <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C] divide-y divide-[#E5E5EA] dark:divide-[#3A3A3C] overflow-hidden">
            {THEME_OPTIONS.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-slate-100 dark:active:bg-slate-800 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Theme color circle with emoji */}
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-sm transition-transform group-hover:scale-105"
                      style={{
                        background: t.gradient,
                        border: isSelected ? '2px solid #ffffff' : 'none',
                        boxShadow: isSelected ? `0 0 0 2px ${t.color}` : 'none'
                      }}
                    >
                      <span>{t.icon}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                          {language === 'tr' ? t.nameTr : t.nameEn}
                        </span>
                        {/* Color swatch dot */}
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: t.color }}
                        />
                      </div>
                      <div className="text-[11px] font-medium text-slate-400 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {language === 'tr' ? t.descriptionTr : t.descriptionEn}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 ml-2 shadow-sm"
                      style={{ backgroundColor: t.color }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setTheme('tropical')}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-extrabold text-xs hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider"
          >
            {t('resetToDefaultTheme', language)}
          </button>

          <p className="text-[11px] text-center text-slate-400 font-medium px-4">
            {t('themeNotice', language)}
          </p>
        </div>
      </div>
    </div>
  );
};
