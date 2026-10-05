import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { APP_CONFIG } from '../data';
import { t } from '../utils/i18n';
import { RequestTypeOption } from '../types';
import {
  CalendarCheck,
  Calendar,
  Users,
  FileText,
  Phone,
  User,
  Globe2,
  X,
  Ship,
  ChevronDown,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CountryOption {
  name: string;
  nameEn: string;
  flag: string;
}

const POPULAR_COUNTRIES: CountryOption[] = [
  { name: 'Türkiye', nameEn: 'Turkey', flag: '🇹🇷' },
  { name: 'Almanya', nameEn: 'Germany', flag: '🇩🇪' },
  { name: 'Birleşik Krallık / İngiltere', nameEn: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Rusya', nameEn: 'Russia', flag: '🇷🇺' },
  { name: 'Hollanda', nameEn: 'Netherlands', flag: '🇳🇱' },
  { name: 'Fransa', nameEn: 'France', flag: '🇫🇷' },
  { name: 'Azerbaycan', nameEn: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'Kazakistan', nameEn: 'Kazakhstan', flag: '🇰🇿' },
  { name: 'Amerika Birleşik Devletleri', nameEn: 'United States', flag: '🇺🇸' },
  { name: 'İsviçre', nameEn: 'Switzerland', flag: '🇨🇭' },
  { name: 'Avusturya', nameEn: 'Austria', flag: '🇦🇹' },
  { name: 'Belçika', nameEn: 'Belgium', flag: '🇧🇪' },
  { name: 'İsveç', nameEn: 'Sweden', flag: '🇸🇪' },
  { name: 'Norveç', nameEn: 'Norway', flag: '🇳🇴' },
  { name: 'Danimarka', nameEn: 'Denmark', flag: '🇩🇰' },
  { name: 'İtalya', nameEn: 'Italy', flag: '🇮🇹' },
  { name: 'İspanya', nameEn: 'Spain', flag: '🇪🇸' },
  { name: 'Polonya', nameEn: 'Poland', flag: '🇵🇱' },
  { name: 'Kanada', nameEn: 'Canada', flag: '🇨🇦' },
  { name: 'Avustralya', nameEn: 'Australia', flag: '🇦🇺' },
  { name: 'Ukrayna', nameEn: 'Ukraine', flag: '🇺🇦' },
  { name: 'Suudi Arabistan', nameEn: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Birleşik Arap Emirlikleri', nameEn: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Kuveyt', nameEn: 'Kuwait', flag: '🇰🇼' },
  { name: 'Katar', nameEn: 'Qatar', flag: '🇶🇦' },
  { name: 'Çin', nameEn: 'China', flag: '🇨🇳' },
  { name: 'Japonya', nameEn: 'Japan', flag: '🇯🇵' },
  { name: 'Güney Kore', nameEn: 'South Korea', flag: '🇰🇷' },
  { name: 'Hindistan', nameEn: 'India', flag: '🇮🇳' },
  { name: 'Diğer Ülke', nameEn: 'Other Country', flag: '🌍' }
];

const REQUEST_TYPE_OPTIONS: { id: RequestTypeOption; labelTr: string; labelEn: string; icon: string }[] = [
  { id: 'Tour', labelTr: 'Tur & Gezi', labelEn: 'Tour & Trip', icon: '⛵' },
  { id: 'Motorbike rental', labelTr: 'Motor Kiralama', labelEn: 'Motorbike Rental', icon: '🛵' },
  { id: 'Transfer', labelTr: 'VIP Transfer / Taksi', labelEn: 'Airport Transfer', icon: '🚖' },
  { id: 'Currency exchange', labelTr: 'Döviz Değişimi', labelEn: 'Currency Exchange', icon: '💵' },
  { id: 'Hotel', labelTr: 'Otel & Konaklama', labelEn: 'Hotel & Stay', icon: '🏨' },
  { id: 'Other', labelTr: 'Diğer / Özel Danışmanlık', labelEn: 'Other / Custom Request', icon: '💬' }
];

export const SendRequestView: React.FC = () => {
  const { language, addRequest, showToast, preselectedTourName, setPreselectedTourName, setActiveTab, playSound } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(language === 'tr' ? 'Türkiye' : 'Turkey');
  const [countryFlag, setCountryFlag] = useState('🇹🇷');
  const [customCountry, setCustomCountry] = useState('');

  const [requestType, setRequestType] = useState<RequestTypeOption>('Tour');
  const [date, setDate] = useState('');
  const [peopleCount, setPeopleCount] = useState('2');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let timer: any;
    if (submittedRequest && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [submittedRequest, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAutofill = () => {
    setName(language === 'tr' ? 'Ahmet Yılmaz' : 'John Doe');
    setPhone('+90 507 801 79 33');
    setCountry(language === 'tr' ? 'Türkiye' : 'Turkey');
    setCountryFlag('🇹🇷');
    setRequestType('Tour');
    setDate(new Date().toISOString().split('T')[0]);
    setPeopleCount(language === 'tr' ? '2 Kişi' : '2 Persons');
    setMessage(language === 'tr' ? 'Phuket\'te harika bir tatil planlıyoruz!' : 'Looking forward to a great trip in Phuket!');
    
    showToast(
      t('autofillButton', language),
      language === 'tr' ? 'Bilgiler otomatik olarak yerleştirildi.' : 'Information populated automatically.',
      'info'
    );
  };

  const getWhatsAppUrl = (req: any) => {
    const formattedText = language === 'tr'
      ? `👋 *YENİ REZERVASYON / TALEP (Kadir Thai)*\n\n` +
        `👤 *Ad Soyad:* ${req.name}\n` +
        `📞 *Telefon:* ${req.phone}\n` +
        `🌍 *Hangi Ülkeden Geldi:* ${countryFlag} ${req.country}\n` +
        `🏷️ *Talep Türü:* ${req.requestType}\n` +
        (req.tourName ? `⛵ *Tur Adı:* ${req.tourName}\n` : '') +
        (req.date ? `📅 *Tarih:* ${req.date}\n` : '') +
        (req.peopleCount ? `👥 *Kişi Sayısı:* ${req.peopleCount}\n` : '') +
        (req.message ? `📝 *Mesaj / Not:* ${req.message}\n\n` : '\n') +
        `_Kadir Ezel ile görüşmek ve rezervasyonu onaylatmak istiyorum._`
      : `👋 *NEW BOOKING / REQUEST (Kadir Thai)*\n\n` +
        `👤 *Full Name:* ${req.name}\n` +
        `📞 *Phone:* ${req.phone}\n` +
        `🌍 *Visiting From:* ${countryFlag} ${req.country}\n` +
        `🏷️ *Request Type:* ${req.requestType}\n` +
        (req.tourName ? `⛵ *Tour:* ${req.tourName}\n` : '') +
        (req.date ? `📅 *Date:* ${req.date}\n` : '') +
        (req.peopleCount ? `👥 *Guests:* ${req.peopleCount}\n` : '') +
        (req.message ? `📝 *Message:* ${req.message}\n\n` : '\n') +
        `_Booking request submitted to Kadir Ezel._`;

    return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedText)}`;
  };

  // If a tour was pre-selected, update requestType
  useEffect(() => {
    if (preselectedTourName) {
      setRequestType('Tour');
    }
  }, [preselectedTourName]);

  const handleCountryChange = (selectedVal: string) => {
    const found = POPULAR_COUNTRIES.find(
      (c) => c.name === selectedVal || c.nameEn === selectedVal
    );
    setCountry(selectedVal);
    if (found) {
      setCountryFlag(found.flag);
    } else {
      setCountryFlag('🌍');
    }
  };

  const finalCountryValue =
    country.includes('Diğer') || country.includes('Other')
      ? customCountry.trim() || country
      : country;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation (Required: Name, Phone, Request type)
    if (!name.trim()) {
      setErrorMsg(language === 'tr' ? 'Lütfen adınızı ve soyadınızı giriniz.' : 'Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(language === 'tr' ? 'Lütfen telefon numaranızı giriniz.' : 'Please enter your phone number.');
      return;
    }
    if (!requestType) {
      setErrorMsg(language === 'tr' ? 'Lütfen talep türünü seçiniz.' : 'Please select a request type.');
      return;
    }

    setIsSubmitting(true);

    // 1. Save the request to localStorage
    const savedReq = addRequest({
      name: name.trim(),
      phone: phone.trim(),
      nationality: finalCountryValue,
      country: finalCountryValue,
      requestType,
      tourName: preselectedTourName || undefined,
      date: date || undefined,
      peopleCount: peopleCount || undefined,
      message: message.trim() || (preselectedTourName ? `"${preselectedTourName}" turu için rezervasyon.` : undefined)
    });

    setSubmittedRequest(savedReq);
    playSound('success');

    // 2. Trigger joyful confetti & Show success toast
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    const successTitle = language === 'tr' ? 'Rezervasyonunuz Alındı!' : 'Reservation Received!';
    const successDesc = language === 'tr'
      ? "Talebiniz kaydedildi. Kadir Ezel'e WhatsApp üzerinden de bildirmek için aşağıdaki butonu kullanabilirsiniz."
      : "Your request has been received. Use the button below to also notify Kadir Ezel via WhatsApp.";

    showToast(successTitle, successDesc, 'success');

    // Reset Form (for future use if they go back)
    setName('');
    setPhone('');
    setDate('');
    setMessage('');
    setCustomCountry('');
    setPreselectedTourName(null);
    setIsSubmitting(false);
  };

  if (submittedRequest) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 space-y-6 text-center animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xl mb-2">
          <CalendarCheck className="w-12 h-12" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t('reservationSuccessTitle', language)}
          </h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            {t('reservationSuccessDesc', language)}
          </p>
        </div>

        <div className="p-6 rounded-[32px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-sm shadow-inner relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="flex items-center gap-2 text-rose-500 font-black text-4xl tabular-nums">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center px-4">
              {t('contactTimerText', language)}
            </p>
          </div>
        </div>

        <div className="w-full space-y-3 max-w-sm">
          <a
            href={getWhatsAppUrl(submittedRequest)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="w-full h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-base flex items-center justify-center gap-2.5 shadow-[0_4px_0_#128C7E] active:translate-y-0.5 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span>{t('sendToWhatsApp', language)}</span>
          </a>

          <button
            onClick={() => {
              setSubmittedRequest(null);
              setActiveTab('home');
              playSound('pop');
            }}
            className="w-full h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-sm hover:bg-slate-200 transition-colors"
          >
            {t('backToHome', language)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-black uppercase mb-1">
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>{t('tabRequest', language)}</span>
        </div>
        <h2 className="font-black text-2xl text-[var(--text)]">
          {preselectedTourName
            ? language === 'tr'
              ? 'Tur Rezervasyon Formu'
              : 'Tour Reservation Form'
            : t('tabRequest', language)}
        </h2>
        <p className="text-xs font-semibold text-[var(--text-muted)] mt-1">
          {language === 'tr'
            ? 'Bilgilerinizi doldurun, rezervasyon kaydınız oluşturulsun ve Kadir Ezel anında size dönüş yapsın.'
            : 'Fill in your details to create your booking record and get instant confirmation.'}
        </p>
      </div>

      {/* Autofill Quick Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAutofill}
          className="animate-signal flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600/10 border border-teal-600/30 text-teal-700 dark:text-teal-400 font-bold text-xs active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('autofillButton', language)}</span>
        </button>
      </div>

      {/* Preselected Tour Notice Banner */}
      {preselectedTourName && (
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-500/40 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase">
                {language === 'tr' ? 'Rezerve Edilen Tur:' : 'Selected Tour for Booking:'}
              </div>
              <div className="font-black text-sm text-teal-950 dark:text-teal-100">
                {preselectedTourName}
              </div>
            </div>
          </div>
          <button
            onClick={() => setPreselectedTourName(null)}
            className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            title={language === 'tr' ? 'Tur seçimini kaldır' : 'Remove selection'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-extrabold animate-shake">
            {errorMsg}
          </div>
        )}

        {/* 1. Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[var(--text)] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('fullNameLabel', language)}</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'tr' ? 'Örn: Ahmet Yılmaz' : 'e.g. John Doe'}
            className="w-full h-13 px-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] text-sm font-semibold text-[var(--text)] outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* 2. Phone / WhatsApp */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[var(--text)] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('phoneLabel', language)}</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={language === 'tr' ? 'Örn: +90 507 801 79 33' : 'e.g. +90 507 801 79 33'}
            className="w-full h-13 px-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] text-sm font-semibold text-[var(--text)] outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* 3. iPhone-Style Native Country Picker Button: "Hangi Ülkeden Geldiniz?" */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[var(--text)] flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('countryFromLabel', language)}</span>
          </label>

          <div className="relative">
            {/* iOS Styled Button Display */}
            <div className="w-full h-14 px-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] text-sm font-semibold text-[var(--text)] flex items-center justify-between shadow-sm transition-all pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">{countryFlag}</span>
                <span className="font-extrabold text-sm text-[var(--text)]">
                  {country}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-extrabold">
                <span className="opacity-90">{language === 'tr' ? 'Seç' : 'Select'}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Native Mobile iPhone/Android Selector Overlay:
                When tapped on an iPhone, iOS automatically brings up the authentic native iOS spinning wheel picker at the bottom of the screen! */}
            <select
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base z-10"
              aria-label={language === 'tr' ? 'Hangi ülkeden geldiniz?' : 'Which country are you from?'}
            >
              {POPULAR_COUNTRIES.map((c) => {
                const cName = language === 'tr' ? c.name : c.nameEn;
                return (
                  <option key={c.name} value={cName}>
                    {c.flag} {cName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* If Other Country is selected, show optional custom country input */}
          {(country.includes('Diğer') || country.includes('Other')) && (
            <div className="pt-1.5 animate-in fade-in duration-150">
              <input
                type="text"
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
                placeholder={
                  language === 'tr'
                    ? 'Lütfen ülkenizin adını buraya yazın...'
                    : 'Please enter your country name here...'
                }
                className="w-full h-12 px-4 rounded-2xl bg-[var(--surface)] border border-teal-500/50 text-xs font-semibold text-[var(--text)] outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          )}
        </div>

        {/* 4. Request Type (Cards) */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-[var(--text)] flex items-center gap-1.5">
            <span>{t('requestTypeLabel', language)}</span>
            <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {REQUEST_TYPE_OPTIONS.map((opt) => {
              const isSelected = requestType === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setRequestType(opt.id)}
                  className={`p-3 rounded-2xl text-left border flex flex-col justify-between transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                      : 'bg-[var(--surface-card)] text-slate-800 dark:text-slate-200 border-[var(--border)] hover:border-teal-500/40'
                  }`}
                >
                  <span className="text-xl mb-1">{opt.icon}</span>
                  <span className="font-extrabold text-xs leading-snug">
                    {language === 'tr' ? opt.labelTr : opt.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Date & Number of People */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[var(--text)] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('dateLabel', language)}</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-12 px-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] outline-none focus:border-teal-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[var(--text)] flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('guestsLabel', language)}</span>
            </label>
            <div className="relative">
              {/* iPhone Styled Visible Selector Field */}
              <div className="w-full h-12 px-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] text-xs font-bold text-[var(--text)] flex items-center justify-between pointer-events-none shadow-sm transition-all">
                <span>{peopleCount || (language === 'tr' ? '2 Kişi' : '2 Persons')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Native Mobile iOS / Phone Wheel Selector */}
              <select
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base z-10"
                aria-label={language === 'tr' ? 'Kişi Sayısı' : 'Number of Guests'}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => {
                  const label = language === 'tr' ? `${num} Kişi` : `${num} ${num === 1 ? 'Person' : 'Persons'}`;
                  return (
                    <option key={num} value={label}>
                      {label}
                    </option>
                  );
                })}
                <option value={language === 'tr' ? 'Özel Grup (20+ Kişi)' : 'Large Group (20+)'}>
                  {language === 'tr' ? 'Özel Grup (20+ Kişi)' : 'Large Group (20+)'}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* 6. Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[var(--text)] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('messageLabel', language)}</span>
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              language === 'tr'
                ? 'Kaldığınız otel veya sormak istediğiniz detaylar...'
                : 'Hotel name, pickup details or special requests...'
            }
            className="w-full p-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] text-sm font-semibold text-[var(--text)] outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder:text-slate-400 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-[0_4px_0_#c2410c] active:translate-y-0.5 transition-all"
          >
            <CalendarCheck className="w-5 h-5" />
            <span>
              {preselectedTourName
                ? language === 'tr'
                  ? 'Rezervasyon Yap & Onayla'
                  : 'Book Now & Confirm'
                : language === 'tr'
                ? 'Rezervasyon Yap'
                : 'Book Now'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
