import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { Download, Share2, Smartphone, Check, X, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language, playSound, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleInstallClick = async () => {
    playSound('click');
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setIsOpen(false);
        showToast(
          language === 'tr' ? 'Yüklendi!' : 'Installed!',
          language === 'tr' ? 'Kadir Thai ana ekranınıza eklendi.' : 'Kadir Thai has been added to your home screen.',
          'success'
        );
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleShareWhatsApp = () => {
    playSound('click');
    const url = window.location.origin;
    const text = language === 'tr'
      ? `🇹🇭 *Kadir Thai - Tayland Gezi Rehberi & Tur Asistanı*\nTayland tatilinizde ada turları, motor kiralama, döviz ve transfer hizmetleri için Kadir Ezel rehberiniz cebinizde!\n📲 İncelemek için tıkla: ${url}`
      : `🇹🇭 *Kadir Thai - Thailand Travel Guide & Tour Assistant*\nIsland tours, scooter rental, VIP transfer and 24/7 personal guide in Phuket:\n📲 Visit: ${url}`;

    if (navigator.share) {
      navigator.share({
        title: 'Kadir Thai - Tayland Gezi Rehberi',
        text: text,
        url: url,
      }).catch(() => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <>
      {/* Banner / Trigger on Home Screen */}
      {!isInstalled && (
        <div className="rounded-3xl p-4 bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-800 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            {/* The Actual Logo Preview */}
            <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md shrink-0 border-2 border-white/40 flex items-center justify-center overflow-hidden">
              <img
                src="/apple-touch-icon.png"
                alt="Kadir Thai Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-teal-200 text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'tr' ? 'Mobil Uygulama Olarak Kullan' : 'Use as Mobile App'}</span>
              </div>
              <h3 className="font-black text-sm text-white truncate">
                {language === 'tr' ? 'Ana Ekrana Ekle' : 'Add to Home Screen'}
              </h3>
              <p className="text-[11px] text-teal-100 font-semibold line-clamp-1">
                {language === 'tr'
                  ? 'Tek tıkla logosuyla telefonunuza kurun, internet olmadan da hızlıca erişin.'
                  : 'Install with brand logo on your phone for instant, offline-ready access.'}
              </p>
            </div>

            <button
              onClick={handleInstallClick}
              className="h-10 px-3.5 rounded-full bg-white text-teal-800 font-black text-xs shrink-0 shadow-md hover:bg-teal-50 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4 text-teal-600" />
              <span>{language === 'tr' ? 'Yükle' : 'Install'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Guide Modal for iOS Safari / Manual Installation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[var(--surface-card)] border border-[var(--border)] p-6 shadow-2xl space-y-5 text-center relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo Preview with Phone App Icon Frame */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-[22px] bg-white p-1.5 shadow-xl border-2 border-teal-500/30 overflow-hidden ring-4 ring-teal-500/10">
                  <img
                    src="/apple-touch-icon.png"
                    alt="Kadir Thai Logo"
                    className="w-full h-full object-cover rounded-[18px]"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-black text-lg text-[var(--text)] mt-3">
                Kadir Thai
              </h4>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {language === 'tr'
                  ? 'Telefonunuzun ana ekranında tam olarak bu logo görünecektir.'
                  : 'This exact logo will appear on your phone home screen.'}
              </p>
            </div>

            {/* Steps Guide */}
            {isIOS ? (
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-500/20 text-left space-y-3">
                <div className="text-xs font-black text-teal-800 dark:text-teal-200 uppercase tracking-wider">
                  {language === 'tr' ? 'iPhone / iPad İçin Kurulum:' : 'iPhone / iPad Instructions:'}
                </div>
                <div className="flex items-start gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center shrink-0">1</span>
                  <span>
                    {language === 'tr'
                      ? 'Safari alt çubuğundaki '
                      : 'Tap the '}
                    <strong>{language === 'tr' ? 'Paylaş' : 'Share'}</strong>
                    {language === 'tr' ? ' simgesine dokunun.' : ' button in Safari.'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center shrink-0">2</span>
                  <span>
                    {language === 'tr' ? 'Açılan menüde aşağı kaydırıp ' : 'Scroll down and select '}
                    <strong className="text-teal-600 dark:text-teal-400">
                      {language === 'tr' ? '"Ana Ekrana Ekle"' : '"Add to Home Screen"'}
                    </strong>
                    {language === 'tr' ? ' seçeneğine basın.' : '.'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-500/20 text-left space-y-2">
                <div className="text-xs font-black text-teal-800 dark:text-teal-200 uppercase tracking-wider">
                  {language === 'tr' ? 'Android / Tarayıcı Kurulumu:' : 'Android Instructions:'}
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'tr'
                    ? 'Tarayıcı menüsünden (üç nokta) "Uygulamayı Yükle" veya "Ana Ekrana Ekle" seçeneğine dokunun.'
                    : 'From browser menu (3 dots), tap "Install App" or "Add to Home Screen".'}
                </p>
              </div>
            )}

            {/* Quick Share via WhatsApp button inside modal */}
            <div className="pt-1 space-y-2">
              <button
                onClick={handleShareWhatsApp}
                className="w-full h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs flex items-center justify-center gap-2 shadow-[0_3px_0_#128C7E] active:translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>{language === 'tr' ? 'Bu Logoyla WhatsApp\'ta Paylaş' : 'Share on WhatsApp'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold text-xs hover:bg-slate-200 transition-colors"
              >
                {language === 'tr' ? 'Tamam, Anladım' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
