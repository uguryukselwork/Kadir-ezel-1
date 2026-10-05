import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { APP_CONFIG } from '../data';
import { InstagramVerifiedBadge } from './VerifiedBadge';
import {
  X,
  Crown,
  Smartphone,
  HelpCircle,
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Palette,
  Globe,
  ChevronDown,
  ChevronUp,
  Shield,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  DollarSign
} from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const {
    language,
    openThemeModal,
    openLanguageModal,
    setActiveTab,
    playSound,
    showToast
  } = useApp();

  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // FAQ accordion state: which item is expanded
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [showIOSInstallSteps, setShowIOSInstallSteps] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleInstallApp = async () => {
    playSound('click');
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        showToast(
          language === 'tr' ? 'Uygulama Yüklendi!' : 'App Installed!',
          language === 'tr' ? 'Kadir Thai telefonunuza eklendi.' : 'Kadir Thai has been added to your device.',
          'success'
        );
      }
    } else if (isIOS) {
      setShowIOSInstallSteps(!showIOSInstallSteps);
    } else {
      showToast(
        language === 'tr' ? 'Bilgi' : 'Info',
        language === 'tr'
          ? 'Tarayıcı menüsünden "Uygulamayı Yükle" veya "Ana Ekrana Ekle" seçebilirsiniz.'
          : 'Use your browser menu to "Install App" or "Add to Home Screen".',
        'info'
      );
    }
  };

  const handleShareApp = () => {
    playSound('click');
    const url = window.location.origin;
    const shareText = language === 'tr'
      ? `🇹🇭 *Kadir Thai - Tayland Gezi Rehberi & Tur Asistanı*\nTayland tatilinizde ada turları, motor kiralama, döviz ve VIP transfer rehberiniz Kadir Ezel ile cebinizde!\n📲 İncelemek için tıkla: ${url}`
      : `🇹🇭 *Kadir Thai - Thailand Travel Guide & Tour Assistant*\nIsland tours, scooter rental, VIP transfer and 24/7 personal guide in Phuket:\n📲 Visit: ${url}`;

    if (navigator.share) {
      navigator.share({
        title: 'Kadir Thai - Tayland Gezi Rehberi',
        text: shareText,
        url: url,
      }).catch(() => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const handleStartVipPlan = () => {
    playSound('click');
    const text = language === 'tr'
      ? 'Merhaba Kadir Bey, VIP Özel Kullanıcı Seyahat Planı hakkında bilgi ve kişiye özel tatil programı danışmanlığı almak istiyorum.'
      : 'Hello Mr. Kadir, I would like to get VIP custom travel planning and concierge assistance.';
    window.open(`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  const faqs = [
    {
      qTr: 'Tayland vizesi Türk vatandaşları için gerekli mi?',
      qEn: 'Do Turkish citizens need a visa for Thailand?',
      aTr: 'Hayır! Türk vatandaşları Tayland’a 60 güne kadar vizesiz seyahat edebilmektedir. Pasaportunuzun en az 6 ay geçerliliği olması ve gidiş-dönüş uçak biletinizin bulunması yeterlidir.',
      aEn: 'No! Turkish citizens can travel to Thailand visa-free for up to 60 days. Just ensure your passport is valid for at least 6 months and you hold a return flight ticket.'
    },
    {
      qTr: 'Ada turları (Phi Phi, James Bond vb.) nasıl işliyor?',
      qEn: 'How do island day trips (Phi Phi, James Bond) work?',
      aTr: 'Turlarımız otel transferlidir. Sabah klimalı VIP araçla otelinizden alınırsınız. Sürat teknesi veya katamaranla adalara gidilir. Tüm milli park giriş ücretleri, şnorkel takımları, can yelekleri ve zengin açık büfe öğle yemeği fiyata dahildir. Akşam otelinize güvenle geri bırakılırsınız.',
      aEn: 'All tours include roundtrip hotel pickup in modern A/C minivans. Speedboat or catamaran transport, national park fees, snorkeling gear, life jackets, and a full buffet lunch are all included.'
    },
    {
      qTr: 'Motor (scooter) kiralarken pasaport bırakmak zorunda mıyım?',
      qEn: 'Do I have to leave my passport as collateral for motorbikes?',
      aTr: 'Kesinlikle hayır! Kadir Ezel organizasyonunda pasaportunuzu asla rehin bırakmazsınız. Sadece fotokopisi veya küçük bir depozito ile güvenle yeni model motorunuzu teslim alırsınız.',
      aEn: 'Never! With Kadir Ezel, you never leave your original passport as hostage. Rentals are done safely with a passport copy or a standard small deposit.'
    },
    {
      qTr: 'Döviz bozdururken en iyi kur nerede bulunur?',
      qEn: 'Where can I find the best currency exchange rates in Phuket?',
      aTr: 'Havalimanı yerine Patong ve Kata sokaklarındaki SuperRich veya sarı/yeşil TT Currency döviz bürolarını tercih edin. 50$ ve 100$ banknotlar daha yüksek kurdan bozulur. Hasarsız ve lekesiz banknot getirmeyi unutmayın.',
      aEn: 'Avoid airport banks. Look for SuperRich or yellow/green TT Currency booths in town. $50 and $100 bills get the highest exchange rate. Ensure bills are clean and crisp.'
    },
    {
      qTr: 'SIM kart ve interneti nereden almalıyım?',
      qEn: 'Where should I purchase a tourist SIM card / internet?',
      aTr: 'Havalimanı stantları yerine yerel 7-Eleven marketlerinden TrueMove veya AIS turist SIM kartı almak çok daha hesaplıdır. Kadir Ezel ile iletişime geçerek anında eSIM yönlendirmesi de alabilirsiniz.',
      aEn: 'Instead of expensive airport kiosks, buy a TrueMove or AIS tourist SIM from any local 7-Eleven. Or ask Kadir Ezel for instant eSIM recommendations.'
    },
    {
      qTr: 'Turlar ve transferlerde ödemeyi nasıl yapabilirim?',
      qEn: 'What payment methods are accepted for tours and services?',
      aTr: 'Nakit Tayland Bahtı (THB), Amerikan Doları (USD), Euro veya Türk banka hesaplarımıza kolayca havale/EFT ile ödeme yapabilirsiniz.',
      aEn: 'You can pay in cash Thai Baht (THB), USD, EUR, or via online bank transfer for Turkish guests.'
    },
    {
      qTr: 'Tayland’da priz tipi nedir, dönüştürücü gerekir mi?',
      qEn: 'What plug type is used in Thailand, do I need an adapter?',
      aTr: 'Tayland’daki prizler Türkiye ve Avrupa standartlarındaki 2 uçlu yuvarlak ve Amerikan tipi düz fişlerin ikisine de uyumludur. Özel bir dönüştürücüye ihtiyaç duymazsınız.',
      aEn: 'Thailand wall outlets accommodate both standard European round 2-pin plugs and US flat pins. Usually no adapter is needed.'
    }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => { onClose(); playSound('click'); }}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-[380px] bg-[var(--surface-card)] h-full shadow-2xl flex flex-col z-10 border-l border-[var(--border)] animate-in slide-in-from-right duration-250">
        {/* Header of Drawer */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden p-0.5 bg-white dark:bg-slate-800 border-2 border-teal-500/40 shadow-xs shrink-0">
              <img
                src="/apple-touch-icon.png"
                alt="Kadir Thai"
                className="w-full h-full object-cover rounded-[10px]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/pwa-192x192.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-base text-[var(--text)] tracking-tight">
                  Kadir Thai
                </h3>
                <InstagramVerifiedBadge size={15} />
              </div>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {language === 'tr' ? 'Tayland Seyahat Menüsü' : 'Thailand Travel Menu'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { onClose(); playSound('click'); }}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 1. VIP KULLANICI PLANI BUTTON / BANNER */}
          <div className="relative overflow-hidden rounded-[26px] p-4 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Crown className="w-4 h-4 text-amber-100 fill-amber-100" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-100">
                  {language === 'tr' ? 'Özel Ayrıcalık' : 'Exclusive VIP'}
                </span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md uppercase">
                VIP Concierge
              </span>
            </div>

            <div>
              <h4 className="font-black text-base text-white leading-tight">
                {language === 'tr' ? 'VIP Kullanıcı Seyahat Planı' : 'VIP Custom Travel Plan'}
              </h4>
              <p className="text-xs text-amber-100 font-semibold mt-1 leading-relaxed">
                {language === 'tr'
                  ? 'Kişiye özel lüks yat, gizli ada rotaları, VIP havalimanı karşılama ve 7/24 birebir rehberlik danışmanlığı.'
                  : 'Tailored private yachts, VIP airport escort, luxury transfers, and 24/7 personal guide assistance.'}
              </p>
            </div>

            <button
              onClick={() => { setIsVipModalOpen(true); playSound('click'); }}
              className="w-full h-11 rounded-2xl bg-white text-amber-900 font-black text-xs flex items-center justify-center gap-2 shadow-md hover:bg-amber-50 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{language === 'tr' ? 'VIP Plan Detayları & Resimleri Gör' : 'View VIP Plan & Pictures'}</span>
            </button>
          </div>

          {/* 2. UYGULAMAYI İNDİR / ANA EKRANA EKLE BUTTON */}
          <div className="p-4 rounded-[26px] bg-teal-50 dark:bg-teal-950/40 border border-teal-500/20 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-sm border border-teal-500/30 flex items-center justify-center shrink-0">
                <img
                  src="/apple-touch-icon.png"
                  alt="Kadir Thai Logo"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 text-[10px] font-black uppercase tracking-wider">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isInstalled ? (language === 'tr' ? 'Yüklü' : 'Installed') : (language === 'tr' ? 'Mobil Uygulama' : 'Mobile App')}</span>
                </div>
                <h4 className="font-black text-sm text-[var(--text)] truncate">
                  {language === 'tr' ? 'Uygulamayı İndir / Yükle' : 'Download / Install App'}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 line-clamp-1">
                  {language === 'tr' ? 'Ana ekrana ekleyip anında erişin' : 'Add to home screen for 1-tap access'}
                </p>
              </div>
            </div>

            <button
              onClick={handleInstallApp}
              className="w-full h-11 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>
                {isInstalled
                  ? (language === 'tr' ? 'Uygulama Zaten Yüklü' : 'App Already Installed')
                  : (language === 'tr' ? 'Telefona İndir / Kur' : 'Install on Phone')}
              </span>
            </button>

            {/* iOS Safari steps helper */}
            {isIOS && showIOSInstallSteps && (
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 space-y-1.5 border border-teal-500/20 animate-in fade-in duration-200">
                <div className="font-black text-teal-700 dark:text-teal-400 text-[11px] uppercase">
                  iPhone / Safari Kurulumu:
                </div>
                <p>1. Safari altındaki <strong>Paylaş</strong> butonuna basın.</p>
                <p>2. Menüden <strong>"Ana Ekrana Ekle"</strong> seçin.</p>
              </div>
            )}
          </div>

          {/* 3. SIKÇA SORULAN SORULAR (SSS / FAQ) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-1">
              <h4 className="font-black text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>{language === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}</span>
              </h4>
              <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400">
                {faqs.length} {language === 'tr' ? 'Soru' : 'Items'}
              </span>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => {
                        setExpandedFaqIndex(isExpanded ? null : idx);
                        playSound('pop');
                      }}
                      className="w-full p-3.5 text-left flex items-start justify-between gap-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/40"
                    >
                      <span className="font-extrabold text-xs text-[var(--text)] leading-snug">
                        {language === 'tr' ? faq.qTr : faq.qEn}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-[var(--text-muted)] font-semibold leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                        {language === 'tr' ? faq.aTr : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. DİĞER GEREKLİ ALANLAR (SHORTCUTS & ESSENTIALS) */}
          <div className="space-y-2 pt-2 border-t border-[var(--border)]">
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-400 px-1">
              {language === 'tr' ? 'Hızlı İşlemler & İletişim' : 'Quick Actions'}
            </h4>

            {/* Canlı Döviz & Baht Hesaplayıcı */}
            <button
              onClick={() => {
                onClose();
                setActiveTab('currency');
                playSound('tab');
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/20 text-teal-900 dark:text-teal-200 hover:border-teal-500 transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <div className="font-black text-xs truncate">
                    {language === 'tr' ? 'Canlı Baht ➔ TL Kur Hesaplayıcı' : 'Live Baht ➔ TRY Calculator'}
                  </div>
                  <div className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold truncate">
                    {language === 'tr' ? '1 ฿ ≈ 0.96 TL • Anında çevir' : 'Instant currency converter'}
                  </div>
                </div>
              </div>
            </button>

            {/* WhatsApp ile Paylaş */}
            <button
              onClick={handleShareApp}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 hover:border-emerald-500 transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <div className="font-black text-xs truncate">
                    {language === 'tr' ? 'Rehberi WhatsApp’ta Paylaş' : 'Share on WhatsApp'}
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                    {language === 'tr' ? 'Arkadaşlarına tavsiye et' : 'Recommend to friends'}
                  </div>
                </div>
              </div>
            </button>

            {/* Renk Teması */}
            <button
              onClick={() => {
                onClose();
                openThemeModal();
                playSound('click');
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl theme-bg text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-black text-xs">
                    {language === 'tr' ? 'Renk Teması Değiştir' : 'Change Theme Color'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">
                    {language === 'tr' ? '7 Farklı Phuket rengi' : '7 Tropical colors'}
                  </div>
                </div>
              </div>
            </button>

            {/* Dil Değiştir */}
            <button
              onClick={() => {
                onClose();
                openLanguageModal();
                playSound('click');
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-black text-xs">
                    {language === 'tr' ? 'Uygulama Dili' : 'Language'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">
                    {language}
                  </div>
                </div>
              </div>
            </button>

            {/* Acil Numaralar Kutusu */}
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/50 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-black">
                <AlertTriangle className="w-4 h-4" />
                <span>{language === 'tr' ? 'Tayland Acil İletişim Hatları' : 'Thailand Emergency Numbers'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <a
                  href="tel:1155"
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 flex items-center justify-between text-slate-800 dark:text-slate-200"
                >
                  <span>{language === 'tr' ? 'Turist Polisi' : 'Tourist Police'}</span>
                  <span className="font-black text-rose-600">1155</span>
                </a>
                <a
                  href="tel:1669"
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 flex items-center justify-between text-slate-800 dark:text-slate-200"
                >
                  <span>{language === 'tr' ? 'Ambulans' : 'Ambulance'}</span>
                  <span className="font-black text-rose-600">1669</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer of Drawer */}
        <div className="p-4 border-t border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-teal-500/40 shrink-0 bg-teal-50 dark:bg-teal-950">
              <img
                src={APP_CONFIG.profilePicture || '/kadir_ezel_profile.jpg'}
                alt={APP_CONFIG.organizerName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/kadir_ezel_profile.jpg')) {
                    target.src = '/kadir_ezel_profile.jpg';
                  } else if (!target.src.endsWith('/apple-touch-icon.png')) {
                    target.src = '/apple-touch-icon.png';
                  }
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">
                  {APP_CONFIG.organizerName}
                </span>
                <InstagramVerifiedBadge size={14} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 block truncate">
                Phuket & Tayland
              </span>
            </div>
          </div>

          {/* Admin link discreetly placed in drawer footer */}
          <button
            onClick={() => {
              onClose();
              setActiveTab('admin');
              playSound('tab');
            }}
            className="text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* VIP Luxury Plan Details Modal with Rich Images */}
      {isVipModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[var(--surface-card)] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Header with Luxury Yacht Hero Image */}
            <div className="relative h-56 w-full bg-slate-900 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1000&q=80"
                alt="VIP Yacht & Luxury Phuket"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

              <button
                onClick={() => setIsVipModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-black text-[10px] uppercase tracking-wider mb-2 shadow-sm">
                  <Crown className="w-3.5 h-3.5 fill-amber-950" />
                  <span>Kadir Ezel VIP Concierge</span>
                </div>
                <h3 className="font-black text-xl sm:text-2xl leading-tight text-white drop-shadow-sm">
                  {language === 'tr' ? 'VIP Özel Kullanıcı Seyahat Planı' : 'VIP Tailored Travel Plan'}
                </h3>
              </div>
            </div>

            {/* Scrollable Experiences with Photos */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <p className="text-xs text-[var(--text-muted)] font-semibold leading-relaxed">
                {language === 'tr'
                  ? 'Tayland tatilinizi sıradanlıktan çıkarıp unutulmaz bir lüks deneyime dönüştürün. Kadir Ezel ile tüm süreç birebir koordine edilir.'
                  : 'Transform your Thailand getaway into a world-class luxury vacation coordinated directly with Kadir Ezel.'}
              </p>

              <div className="space-y-3">
                {/* 1. Lüks Özel Yat & Katamaran */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)] flex gap-3.5 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80"
                      alt="Özel Yat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                      {language === 'tr' ? 'Özel Ada Rotası' : 'Private Island Route'}
                    </span>
                    <h5 className="font-black text-xs sm:text-sm text-[var(--text)] truncate">
                      {language === 'tr' ? 'Lüks Özel Yat & Katamaran Kiralama' : 'Private Luxury Yacht & Catamaran'}
                    </h5>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5 font-semibold">
                      {language === 'tr'
                        ? 'Size özel mürettebat, şef yemekleri ve el değmemiş lagünlerde yüzme.'
                        : 'Private crew, gourmet chef lunch, and secluded lagoons in Phi Phi & Racha.'}
                    </p>
                  </div>
                </div>

                {/* 2. VIP Havalimanı Karşılama & Alphard */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)] flex gap-3.5 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"
                      alt="VIP Minivan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                      {language === 'tr' ? 'Özel Transfer' : 'Private Transfer'}
                    </span>
                    <h5 className="font-black text-xs sm:text-sm text-[var(--text)] truncate">
                      {language === 'tr' ? 'VIP Karşılama & Toyota Alphard' : 'VIP Airport Escort & Luxury Van'}
                    </h5>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5 font-semibold">
                      {language === 'tr'
                        ? 'Havalimanında isimli karşılama, konforlu deri koltuklu lüks araçla otele direkt ulaşım.'
                        : 'Nameboard terminal pickup and luxury captain-seat door-to-door transfer.'}
                    </p>
                  </div>
                </div>

                {/* 3. Özel Helikopter Phang Nga Körfezi */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)] flex gap-3.5 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80"
                      alt="Helikopter Uçuşu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                      {language === 'tr' ? 'Panoramik Uçuş' : 'Scenic Flight'}
                    </span>
                    <h5 className="font-black text-xs sm:text-sm text-[var(--text)] truncate">
                      {language === 'tr' ? 'Özel Helikopter Phang Nga Turu' : 'Private Helicopter Bay Tour'}
                    </h5>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5 font-semibold">
                      {language === 'tr'
                        ? 'Kalker kayalıkları ve James Bond adasını gökyüzünden izleme ayrıcalığı.'
                        : 'Breathtaking aerial views above limestone cliffs and emerald waters.'}
                    </p>
                  </div>
                </div>

                {/* 4. Beach Club VIP Loca & Ön Sıra Rezervasyon */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)] flex gap-3.5 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80"
                      alt="Beach Club VIP"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                      {language === 'tr' ? 'VIP Rezervasyon' : 'VIP Table Access'}
                    </span>
                    <h5 className="font-black text-xs sm:text-sm text-[var(--text)] truncate">
                      {language === 'tr' ? 'Beach Club VIP Loca & Masa Önceliği' : 'Beach Club VIP Daybed & Tables'}
                    </h5>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5 font-semibold">
                      {language === 'tr'
                        ? 'Cafe Del Mar, Illuzion ve Yona Beach Club’da sıra beklemeden en iyi masalar.'
                        : 'Priority front-row daybed reservations with no queues.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Booking Actions */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleStartVipPlan}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-[0_3px_0_#b45309] active:translate-y-0.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-amber-600" />
                  <span>{language === 'tr' ? 'Kadir Ezel ile VIP Rezervasyon Yap (WhatsApp)' : 'Book VIP Plan on WhatsApp'}</span>
                </button>

                <a
                  href={`tel:${APP_CONFIG.phone}`}
                  className="w-full h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>{language === 'tr' ? 'Telefon ile VIP Danışmanlık' : 'Call for VIP Concierge'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
