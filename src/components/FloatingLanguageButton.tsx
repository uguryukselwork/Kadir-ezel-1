import React from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';
import { Language } from '../types';
import { Globe } from 'lucide-react';

export const FloatingLanguageButton: React.FC = () => {
  const { language, setLanguage, openLanguageModal } = useApp();

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="fixed right-4 bottom-[104px] z-40">
      <div className="relative">
        <button
          onClick={openLanguageModal}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all border border-teal-400/30"
          title="Dili Değiştir / Select Language"
          aria-label="Change language"
        >
          <span className="text-lg leading-none">{currentOption.flag}</span>
          <span className="uppercase tracking-wider font-extrabold">{currentOption.code}</span>
          <Globe className="w-3.5 h-3.5 opacity-80" />
        </button>

        {/* Real native selector for iPhone & mobile devices */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base z-10 sm:hidden"
          aria-label="Select Language"
        >
          {SUPPORTED_LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.flag} {l.nativeName} ({l.name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
