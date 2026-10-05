import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_CONFIG } from '../data';
import {
  DollarSign,
  ArrowRightLeft,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  RotateCcw
} from 'lucide-react';

// Current exchange rates:
// 1 THB ≈ 0.96 TRY
// 1 USD ≈ 34.50 THB
// 1 EUR ≈ 37.50 THB
const RATES = {
  THB_TO_TRY: 0.96,
  TRY_TO_THB: 1 / 0.96,
  USD_TO_THB: 34.5,
  THB_TO_USD: 1 / 34.5,
  EUR_TO_THB: 37.5,
  THB_TO_EUR: 1 / 37.5,
};

type ConversionMode = 'THB_TO_TRY' | 'TRY_TO_THB' | 'USD_TO_THB';

export const CurrencyView: React.FC = () => {
  const { language, playSound } = useApp();

  // Prefilled with 100 so TL price is automatically calculated and shown right away
  const [amountStr, setAmountStr] = useState<string>('100');
  const [mode, setMode] = useState<ConversionMode>('THB_TO_TRY');

  const numericAmount = parseFloat(amountStr) || 0;

  // Primary conversion logic
  let primaryResult = 0;
  let resultUnit = 'TL';
  let inputUnit = '฿ (Baht)';

  if (mode === 'THB_TO_TRY') {
    primaryResult = numericAmount * RATES.THB_TO_TRY;
    resultUnit = 'TL';
    inputUnit = '฿ (Baht)';
  } else if (mode === 'TRY_TO_THB') {
    primaryResult = numericAmount * RATES.TRY_TO_THB;
    resultUnit = '฿ (Baht)';
    inputUnit = 'TL';
  } else if (mode === 'USD_TO_THB') {
    primaryResult = numericAmount * RATES.USD_TO_THB;
    resultUnit = '฿ (Baht)';
    inputUnit = '$ (USD)';
  }

  // Base Baht equivalent for cross-currency overview
  const thbEquivalent =
    mode === 'THB_TO_TRY'
      ? numericAmount
      : mode === 'TRY_TO_THB'
      ? numericAmount * RATES.TRY_TO_THB
      : numericAmount * RATES.USD_TO_THB;

  const tryEquivalent = thbEquivalent * RATES.THB_TO_TRY;
  const usdEquivalent = thbEquivalent * RATES.THB_TO_USD;
  const eurEquivalent = thbEquivalent * RATES.THB_TO_EUR;

  const handleQuickChip = (val: number) => {
    playSound('click');
    setAmountStr(val.toString());
  };

  const handleToggleMode = () => {
    playSound('tab');
    if (mode === 'THB_TO_TRY') setMode('TRY_TO_THB');
    else if (mode === 'TRY_TO_THB') setMode('USD_TO_THB');
    else setMode('THB_TO_TRY');
  };

  const handleContactWhatsApp = () => {
    playSound('click');
    const msg = language === 'tr'
      ? `Merhaba Kadir Bey, Phuket'te döviz bozdurma (Dolar/Euro/Baht) ve nakit transferi konusunda danışmak istiyorum.`
      : `Hello Mr. Kadir, I have a question regarding currency exchange in Phuket.`;
    window.open(`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const quickChips = [
    { label: '50 ฿', value: 50 },
    { label: '100 ฿', value: 100 },
    { label: '200 ฿', value: 200 },
    { label: '350 ฿', value: 350 },
    { label: '500 ฿', value: 500 },
    { label: '1.000 ฿', value: 1000 },
    { label: '2.000 ฿', value: 2000 },
    { label: '5.000 ฿', value: 5000 }
  ];

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200 max-w-lg mx-auto">
      {/* 1. ÇEVRİLECEK TUTAR ALANI VE MİNİK HESAPLAYICI (EN ÜSTTE) */}
      <div className="bg-[var(--surface-card)] rounded-[28px] p-4 sm:p-5 border border-[var(--border)] shadow-md space-y-3.5">
        {/* Compact Header & Direction Switcher */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl theme-bg text-white flex items-center justify-center shrink-0 shadow-xs">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-black text-sm text-[var(--text)] tracking-tight truncate">
                {language === 'tr' ? 'Canlı Kur Hesaplayıcı' : 'Currency Calculator'}
              </h2>
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                1 ฿ ≈ 0.96 TL • 1 $ ≈ 34.5 ฿
              </div>
            </div>
          </div>

          {/* Compact Switcher Button */}
          <button
            onClick={handleToggleMode}
            className="h-8 px-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700/80 text-[11px] font-black text-slate-700 dark:text-slate-200 border border-[var(--border)] flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
            title={language === 'tr' ? 'Yönü Değiştir' : 'Switch Direction'}
          >
            <ArrowRightLeft className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            <span>
              {mode === 'THB_TO_TRY' ? '฿ ➔ TL' : mode === 'TRY_TO_THB' ? 'TL ➔ ฿' : '$ ➔ ฿'}
            </span>
          </button>
        </div>

        {/* Input Box (En Üstte) */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-[var(--border)] focus-within:border-[var(--primary)] transition-all">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
            <span>{language === 'tr' ? 'Çevrilecek Tutar' : 'Amount to Convert'}</span>
            <span className="font-extrabold uppercase theme-text tracking-wide">{inputUnit}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.]/g, '');
                setAmountStr(val || '');
              }}
              className="w-full text-3xl font-black bg-transparent border-none outline-none text-[var(--text)] tracking-tight"
              placeholder="0"
              autoFocus
            />
            {amountStr && (
              <button
                onClick={() => { setAmountStr(''); playSound('pop'); }}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs flex items-center justify-center transition-colors shrink-0"
                title="Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Minik Hesaplanan Sonuç Kartı (Otomatik TL Karşılığı) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-teal-500/5 border border-emerald-500/30 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
              <span>{language === 'tr' ? 'Otomatik Hesaplanan Değer' : 'Auto Converted Value'}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-emerald-300 tracking-tight mt-0.5 truncate">
              {primaryResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-base sm:text-lg font-bold ml-1.5 text-emerald-700 dark:text-emerald-400">
                {resultUnit}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
              {mode === 'THB_TO_TRY' ? '1 ฿ ≈ 0.96 TL' : 'Canlı Kur'}
            </div>
            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-[10px] font-black">
              Net Tutar
            </span>
          </div>
        </div>

        {/* Minik Hızlı Fiyat Butonları (Tek tıkla değer değiştir) */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 px-0.5">
            {language === 'tr' ? 'Hızlı Tutar Seç' : 'Quick Amounts'}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickChips.map((q) => (
              <button
                key={q.value}
                onClick={() => handleQuickChip(q.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all active:scale-95 border ${
                  amountStr === q.value.toString()
                    ? 'theme-bg text-white border-transparent shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-[var(--border)] hover:border-[var(--primary)]'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MİNİK ÇOKLU PARA BİRİMİ KARŞILIĞI (KOMPAKT) */}
      <div className="bg-[var(--surface-card)] rounded-2xl p-3.5 border border-[var(--border)] space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-[var(--text)]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{thbEquivalent.toLocaleString()} ฿ {language === 'tr' ? 'Diğer Kurlar' : 'Other Currencies'}</span>
          </span>
          <span className="text-[10px] text-slate-600 dark:text-slate-300 font-bold">Yaklaşık Değer</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Türk Lirası</div>
            <div className="font-black text-sm text-teal-800 dark:text-teal-300 mt-0.5">
              {tryEquivalent.toLocaleString(undefined, { maximumFractionDigits: 1 })} TL
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Dolar</div>
            <div className="font-black text-sm text-blue-800 dark:text-blue-300 mt-0.5">
              ${usdEquivalent.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Euro</div>
            <div className="font-black text-sm text-purple-800 dark:text-purple-300 mt-0.5">
              €{eurEquivalent.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MİNİK DÖVİZ İPULARI (KOMPAKT) */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 font-black text-amber-900 dark:text-amber-200 text-xs">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>{language === 'tr' ? 'Phuket ATM & Döviz İpucu' : 'ATM & Exchange Tip'}</span>
        </div>
        <p className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
          {language === 'tr'
            ? 'ATM’den para çekerken ekranda "Conversion" sorulduğunda mutlaka "WITHOUT CONVERSION / DON\'T CONVERT" seçeneğini tıklayın. Böylece bankanın %7 gizli kur farkından kurtulursunuz.'
            : 'Select "WITHOUT CONVERSION" on ATMs to save up to 7% on bank currency conversion fees.'}
        </p>
      </div>

      {/* 4. KADİR EZEL WHATSAPP DANIŞMA BUTONU */}
      <button
        onClick={handleContactWhatsApp}
        className="w-full h-11 rounded-full theme-bg text-white font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>{language === 'tr' ? 'Kadir Ezel ile WhatsApp’ta Görüş' : 'Ask Kadir Ezel on WhatsApp'}</span>
      </button>
    </div>
  );
};
