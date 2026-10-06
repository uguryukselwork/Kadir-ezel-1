import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../utils/i18n';
import {
  COUNTRY_CODES,
  OTHER_COUNTRY,
  countryFlag,
  countryName,
  detectCountry,
  suggestedLanguage
} from '../utils/countries';
import { Check, Search, ChevronDown, Ship, Bike, ArrowRightLeft, CarTaxiFront, BedDouble } from 'lucide-react';

// "Hello" in every language the app speaks, cycled as the first thing a visitor sees
const GREETINGS = ['Merhaba', 'Hello', 'Привет', 'Hallo', 'Bonjour', 'مرحبا', '你好', 'สวัสดี'];

// Shown for information only: these are what the visitor can book once inside
const SERVICES = [
  { key: 'navTours', icon: Ship, bg: 'var(--card-mint)', fg: '#0d9488' },
  { key: 'navMotorbike', icon: Bike, bg: 'var(--card-ice)', fg: '#4f46e5' },
  { key: 'navCurrency', icon: ArrowRightLeft, bg: 'var(--card-cream)', fg: '#d97706' },
  { key: 'navTransfer', icon: CarTaxiFront, bg: 'var(--card-lavender)', fg: '#7c3aed' },
  { key: 'navStay', icon: BedDouble, bg: 'var(--card-pink)', fg: '#e11d48' }
];

const Greeting: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % GREETINGS.length), 1700);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="welcome-greeting" aria-hidden="true">
      <span key={index} className="welcome-greeting-word">
        {GREETINGS[index]}
      </span>
    </p>
  );
};

export const WelcomeScreen: React.FC = () => {
  const { isWelcomeOpen, completeWelcome, country: savedCountry, language } = useApp();

  const [country, setCountry] = useState<string | null>(() => savedCountry ?? detectCountry());
  const [lang, setLang] = useState<Language>(() => suggestedLanguage(savedCountry ?? detectCountry()) ?? language);
  const [picker, setPicker] = useState<'country' | 'language'>('country');
  const [query, setQuery] = useState('');

  // Reopening from the header starts from the current choices
  useEffect(() => {
    if (isWelcomeOpen) {
      setPicker('country');
      setQuery('');
      if (savedCountry) {
        setCountry(savedCountry);
        setLang(language);
      }
    }
  }, [isWelcomeOpen]);

  const countries = useMemo(() => {
    const sorted = [...COUNTRY_CODES].sort((a, b) =>
      countryName(a, lang).localeCompare(countryName(b, lang), lang)
    );
    // Keep the visitor's likely country on top so most people tap once
    const pinned = country && country !== OTHER_COUNTRY ? [country] : [];
    return [...pinned, ...sorted.filter((c) => !pinned.includes(c)), OTHER_COUNTRY];
  }, [lang, country]);

  const visibleCountries = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(lang);
    if (!q) return countries;
    return countries.filter(
      (c) =>
        countryName(c, lang).toLocaleLowerCase(lang).includes(q) ||
        countryName(c, 'en').toLowerCase().includes(q)
    );
  }, [countries, query, lang]);

  const suggested = suggestedLanguage(country);

  const languages = useMemo(() => {
    if (!suggested) return SUPPORTED_LANGUAGES;
    return [
      ...SUPPORTED_LANGUAGES.filter((l) => l.code === suggested),
      ...SUPPORTED_LANGUAGES.filter((l) => l.code !== suggested)
    ];
  }, [suggested]);

  if (!isWelcomeOpen) return null;

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === lang)!;

  const pickCountry = (code: string) => {
    setCountry(code);
    const next = suggestedLanguage(code);
    if (next) setLang(next);
  };

  return (
    <div
      className="welcome"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      lang={lang}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="welcome-top">
        <Greeting />
        <p className="welcome-place">Phuket, Thailand</p>
      </div>

      <section className="welcome-card">
        <h1 id="welcome-title" className="welcome-title">{t('welcomeTitle', lang)}</h1>
        <p className="welcome-sub">{t('welcomePickSub', lang)}</p>

        {/* Country and language side by side; the list below follows whichever is open */}
        <div className="welcome-pickers" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={picker === 'country'}
            aria-controls="welcome-list"
            className="welcome-picker"
            onClick={() => setPicker('country')}
          >
            <span className="welcome-flag">{country ? countryFlag(country) : '🌍'}</span>
            <span className="welcome-picker-text">
              <small>{t('countryLabel', lang)}</small>
              <span>{country ? countryName(country, lang) : '—'}</span>
            </span>
            <ChevronDown className="welcome-chevron" aria-hidden="true" />
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={picker === 'language'}
            aria-controls="welcome-list"
            className="welcome-picker"
            onClick={() => setPicker('language')}
          >
            <span className="welcome-flag">{currentLang.flag}</span>
            <span className="welcome-picker-text">
              <small>{t('languageLabel', lang)}</small>
              <span>{currentLang.nativeName}</span>
            </span>
            <ChevronDown className="welcome-chevron" aria-hidden="true" />
          </button>
        </div>

        {picker === 'country' && (
          <label className="welcome-search">
            <Search className="w-4 h-4" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('welcomeSearch', lang)}
              aria-label={t('welcomeSearch', lang)}
            />
          </label>
        )}

        <ul id="welcome-list" className="welcome-list" role="listbox">
          {picker === 'country' ? (
            <>
              {visibleCountries.map((code) => (
                <li key={code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={code === country}
                    className="welcome-row"
                    onClick={() => pickCountry(code)}
                  >
                    <span className="welcome-flag">{countryFlag(code)}</span>
                    <span className="welcome-row-name">{countryName(code, lang)}</span>
                    {code === country && <Check className="welcome-check" aria-hidden="true" />}
                  </button>
                </li>
              ))}
              {visibleCountries.length === 0 && <li className="welcome-empty">{t('welcomeNoMatch', lang)}</li>}
            </>
          ) : (
            languages.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l.code === lang}
                  className="welcome-row"
                  onClick={() => setLang(l.code)}
                >
                  <span className="welcome-flag">{l.flag}</span>
                  <span className="welcome-row-name">
                    <span lang={l.code}>{l.nativeName}</span>
                    {l.code === suggested && <small>{t('welcomeSuggested', lang)}</small>}
                  </span>
                  {l.code === lang && <Check className="welcome-check" aria-hidden="true" />}
                </button>
              </li>
            ))
          )}
        </ul>

        <button
          type="button"
          className="welcome-start"
          disabled={!country}
          onClick={() => country && completeWelcome(country, lang)}
        >
          {t('welcomeStart', lang)}
        </button>
      </section>

      <section className="welcome-services" aria-labelledby="welcome-services-title">
        <h2 id="welcome-services-title">{t('ourServices', lang)}</h2>
        <ul>
          {SERVICES.map(({ key, icon: Icon, bg, fg }) => (
            <li key={key}>
              <span className="welcome-service-icon" style={{ backgroundColor: bg, color: fg }}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="welcome-service-label">{t(key, lang)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
