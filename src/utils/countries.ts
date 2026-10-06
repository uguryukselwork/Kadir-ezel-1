import { Language } from '../types';

// ISO 3166 code → language we suggest for visitors from that country
const COUNTRY_LANGUAGE: Record<string, Language> = {
  TR: 'tr', AZ: 'tr', CY: 'tr',
  RU: 'ru', KZ: 'ru', UA: 'ru', BY: 'ru', UZ: 'ru', KG: 'ru', GE: 'ru', AM: 'ru',
  DE: 'de', AT: 'de', CH: 'de',
  FR: 'fr', BE: 'fr', LU: 'fr',
  SA: 'ar', AE: 'ar', KW: 'ar', QA: 'ar', BH: 'ar', OM: 'ar', EG: 'ar', JO: 'ar', IQ: 'ar', MA: 'ar', LB: 'ar',
  CN: 'zh', TW: 'zh', HK: 'zh',
  TH: 'th',
  GB: 'en', US: 'en', IE: 'en', CA: 'en', AU: 'en', NZ: 'en', IN: 'en', SG: 'en', MY: 'en',
  NL: 'en', SE: 'en', NO: 'en', DK: 'en', FI: 'en', PL: 'en', IT: 'en', ES: 'en', PT: 'en',
  IL: 'en', IR: 'en', JP: 'en', KR: 'en', ZA: 'en', BR: 'en'
};

export const OTHER_COUNTRY = 'OTHER';

export const COUNTRY_CODES = Object.keys(COUNTRY_LANGUAGE);

export const countryFlag = (code: string): string => {
  if (code === OTHER_COUNTRY) return '🌍';
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
};

export const suggestedLanguage = (code: string | null): Language | null =>
  (code && COUNTRY_LANGUAGE[code]) || null;

const OTHER_NAME: Record<Language, string> = {
  tr: 'Diğer ülke',
  en: 'Other country',
  ru: 'Другая страна',
  de: 'Anderes Land',
  fr: 'Autre pays',
  ar: 'بلد آخر',
  zh: '其他国家',
  th: 'ประเทศอื่น'
};

const displayNamesCache: Partial<Record<Language, Intl.DisplayNames | null>> = {};

export const countryName = (code: string, lang: Language): string => {
  if (code === OTHER_COUNTRY) return OTHER_NAME[lang];
  if (!(lang in displayNamesCache)) {
    try {
      displayNamesCache[lang] = new Intl.DisplayNames([lang], { type: 'region' });
    } catch {
      displayNamesCache[lang] = null;
    }
  }
  return displayNamesCache[lang]?.of(code) ?? code;
};

// Best guess at where the visitor is from, using the browser locale (e.g. "de-AT" → AT)
export const detectCountry = (): string | null => {
  try {
    const region = new Intl.Locale(navigator.language).maximize().region;
    return region && COUNTRY_LANGUAGE[region] ? region : null;
  } catch {
    return null;
  }
};
