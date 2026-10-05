import React from 'react';
import { useApp } from '../context/AppContext';
import { APP_CONFIG } from '../data';
import { t } from '../utils/i18n';
import { InstagramVerifiedBadge } from './VerifiedBadge';
import {
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  AlertTriangle,
  Award,
  Globe2,
  CheckCircle2,
  Send,
  Share2
} from 'lucide-react';

export const OrganizerView: React.FC = () => {
  const { language, setActiveTab, openOrganizerSheet, playSound } = useApp();

  const waPrefill = language === 'tr'
    ? 'Merhaba Kadir Bey, Tayland seyahatim için bilgi ve rehberlik desteği almak istiyorum.'
    : 'Hello Mr. Kadir, I would like information and assistance for my Thailand trip.';

  const waUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(waPrefill)}`;

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

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Organizer Hero Card */}
      <div className="p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden text-center space-y-4 theme-gradient-bg">
        <div className="relative mx-auto w-24 h-24">
          <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-md border-3 border-teal-300/60 flex items-center justify-center overflow-hidden shadow-inner">
            <img 
              src={APP_CONFIG.profilePicture || '/kadir_ezel_profile.jpg'} 
              alt={APP_CONFIG.organizerName}
              className="w-full h-full object-cover"
              loading="eager"
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
          {/* Authentic Instagram Verified Rosette Badge */}
          <div className="absolute -bottom-1 -right-1 z-10 rounded-full bg-white dark:bg-slate-900 p-[2px] shadow-md flex items-center justify-center">
            <InstagramVerifiedBadge size={22} />
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-white text-xs font-black uppercase mb-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'Resmi & Güvenilir Rehber' : 'Licensed & Trusted Guide'}</span>
          </div>
          <h2 className="font-black text-2xl text-white flex items-center justify-center gap-1.5">
            <span>{APP_CONFIG.organizerName}</span>
            <InstagramVerifiedBadge size={20} />
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black tracking-wide my-1 shadow-sm">
            <Phone className="w-3.5 h-3.5 text-teal-300" />
            <a href={`tel:${APP_CONFIG.phone}`} className="hover:underline">
              {APP_CONFIG.phoneDisplay}
            </a>
          </div>
          <p className="text-xs font-semibold text-white/90 mt-1 max-w-xs mx-auto">
            {language === 'tr'
              ? "Tayland'a gelen Türk ve yabancı misafirlerimize en iyi ada turları, pasaportsuz motor kiralama, VIP havalimanı transferi ve 7/24 tatil danışmanlığı sunuyoruz."
              : 'Providing the finest island tours, safe scooter rentals, private transfers, and 24/7 dedicated guest assistance in Thailand.'}
          </p>
        </div>

        {/* Quick Contact & Share Buttons */}
        <div className="pt-2 space-y-2 max-w-xs mx-auto">
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-full bg-[#25D366] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_3px_0_#1EBE5D] active:translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${APP_CONFIG.phone}`}
              className="h-12 rounded-full bg-white text-teal-900 font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_3px_0_#cbd5e1] active:translate-y-0.5 transition-all"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>{t('directCall', language)}</span>
            </a>
          </div>

          {/* Dedicated Share Button (moved here from header) */}
          <button
            onClick={handleShareApp}
            className="w-full h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-black text-xs flex items-center justify-center gap-2 border border-white/25 active:scale-95 transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4 text-emerald-300" />
            <span>{language === 'tr' ? "Rehberi WhatsApp'ta Paylaş" : 'Share Guide on WhatsApp'}</span>
          </button>
        </div>
      </div>

      {/* Meeting Point Card */}
      <div className="p-5 rounded-[26px] bg-[var(--surface-card)] border border-[var(--border)] shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t('meetingLocation', language)}
            </div>
            <h3 className="font-black text-base text-[var(--text)] mt-0.5">
              {language === 'tr' ? APP_CONFIG.meetingPointName : APP_CONFIG.meetingPointNameEn}
            </h3>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          {language === 'tr'
            ? 'Adadaki turlar, motor teslimatı veya özel transfer için koordinasyon noktamız. Turlarda otelinizden de direkt klimalı araçlarla alınabilirsiniz.'
            : 'Our main meeting location for tours, bike rentals, and transfer coordination. Direct hotel pickups also available.'}
        </p>

        <a
          href={APP_CONFIG.meetingPointMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 text-slate-800 dark:text-slate-200 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <ExternalLink className="w-4 h-4 text-teal-600" />
          <span>{t('openInMaps', language)}</span>
        </a>
      </div>

      {/* Emergency Numbers (Acil Numaralar) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="font-extrabold text-base text-[var(--text)]">
            {t('emergencyNumbersTitle', language)}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {APP_CONFIG.emergencyNumbers.map((em, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] shadow-sm flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-black text-sm text-[var(--text)] truncate">
                  {language === 'tr' ? em.nameTr : em.nameEn}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                  {language === 'tr' ? em.descTr : em.descEn}
                </div>
              </div>

              <a
                href={`tel:${em.number.replace(/[^\d+]/g, '')}`}
                className="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 font-black text-xs shrink-0 hover:bg-rose-600 hover:text-white transition-colors"
              >
                {em.number}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Useful Highlights & Advice */}
      <div className="p-4 rounded-[26px] bg-teal-50 dark:bg-teal-950/40 border border-teal-500/20 space-y-2.5">
        <div className="font-black text-sm text-teal-950 dark:text-teal-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>{t('visaInfoTitle', language)}</span>
        </div>
        <p className="text-xs text-teal-900 dark:text-teal-300 leading-relaxed font-semibold">
          {t('visaInfoDesc', language)}
        </p>
      </div>

      {/* Action to Request */}
      <div className="pt-1 space-y-4">
        <button
          onClick={() => setActiveTab('request')}
          className="btn btn-primary w-full"
        >
          <Send className="w-5 h-5" />
          <span>{t('sendRequestToKadir', language)}</span>
        </button>

        <div className="pt-4 border-t border-[var(--border)] flex justify-center">
          <button
            onClick={() => setActiveTab('admin')}
            className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest hover:text-teal-500 transition-colors"
          >
            {language === 'tr' ? 'Yönetici Girişi (Görünmez Link)' : 'Admin Login (Dev Access)'}
          </button>
        </div>
      </div>
    </div>
  );
};
