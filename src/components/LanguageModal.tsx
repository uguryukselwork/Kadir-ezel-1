import React from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES, t } from '../utils/i18n';
import { Globe, Check } from 'lucide-react';

export const LanguageModal: React.FC = () => {
  const { isLanguageModalOpen, closeLanguageModal, language, setLanguage } = useApp();

  if (!isLanguageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={closeLanguageModal} />

      {/* iOS Settings Style Sheet */}
      <div className="relative w-full max-w-[420px] bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-t-[32px] sm:rounded-[28px] shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[88vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-250">
        
        {/* iOS Pull indicator for mobile */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        {/* iOS Navigation Header Bar */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-white/70 dark:bg-[#2C2C2E]/70 backdrop-blur-md">
          <button
            onClick={closeLanguageModal}
            className="text-sm font-semibold text-[#007AFF] active:opacity-60 transition-opacity"
          >
            {t('cancel', language)}
          </button>

          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-teal-600" />
            <span>{t('languageTitle', language)}</span>
          </div>

          <button
            onClick={closeLanguageModal}
            className="text-sm font-bold text-[#007AFF] active:opacity-60 transition-opacity"
          >
            {t('done', language)}
          </button>
        </div>

        {/* iOS Inset Grouped Table View */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3">
            {t('preferredLanguages', language)}
          </div>

          <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C] divide-y divide-[#E5E5EA] dark:divide-[#3A3A3C] overflow-hidden">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-slate-100 dark:active:bg-slate-800 transition-colors text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl leading-none">{lang.flag}</span>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {lang.nativeName}
                      </div>
                      <div className="text-[11px] font-medium text-slate-400">
                        {lang.name}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="text-[#007AFF]">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-center text-slate-400 font-medium px-4">
            {t('languageApplyNotice', language)}
          </p>
        </div>
      </div>
    </div>
  );
};
