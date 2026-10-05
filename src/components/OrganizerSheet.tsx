import React from 'react';
import { useApp } from '../context/AppContext';
import { APP_CONFIG } from '../data';
import { t } from '../utils/i18n';
import { InstagramVerifiedBadge } from './VerifiedBadge';
import { X, Phone, MessageCircle, MapPin, ExternalLink, CheckCircle2, Check, CalendarCheck } from 'lucide-react';

export const OrganizerSheet: React.FC = () => {
  const {
    isOrganizerSheetOpen,
    closeOrganizerSheet,
    selectedTourForSheet,
    language,
    startBookingForTour
  } = useApp();

  if (!isOrganizerSheetOpen) return null;

  const tourName = selectedTourForSheet
    ? language === 'tr'
      ? selectedTourForSheet.nameTr
      : selectedTourForSheet.nameEn
    : null;

  const meetingPointName = selectedTourForSheet
    ? language === 'tr'
      ? selectedTourForSheet.meetingPointTr
      : selectedTourForSheet.meetingPointEn
    : language === 'tr'
    ? APP_CONFIG.meetingPointName
    : APP_CONFIG.meetingPointNameEn;

  const mapsUrl = selectedTourForSheet?.mapsUrl || APP_CONFIG.meetingPointMapsUrl;

  const waPrefillTr = tourName
    ? `Merhaba Kadir Bey, "${tourName}" turu hakkında bilgi almak ve rezervasyon yaptırmak istiyorum.`
    : `Merhaba Kadir Bey, Tayland tatilim için turlar ve hizmetleriniz hakkında bilgi almak istiyorum.`;

  const waPrefillEn = tourName
    ? `Hello Mr. Kadir, I'd like information and booking for the "${tourName}" tour.`
    : `Hello Mr. Kadir, I'd like information about tours and services in Thailand.`;

  const whatsappMessage = language === 'tr' ? waPrefillTr : waPrefillEn;
  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm transition-opacity p-0 sm:p-4">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={closeOrganizerSheet} />

      <div className="relative w-full max-w-[440px] bg-[var(--surface-card)] rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-[var(--border)] z-10 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        {/* Handle bar */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-teal-500/40 bg-teal-50 dark:bg-teal-950 shadow-sm">
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
              <div className="absolute -bottom-1 -right-1 z-10 rounded-full bg-white dark:bg-slate-900 p-[1.5px] shadow-sm flex items-center justify-center">
                <InstagramVerifiedBadge size={17} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-xl text-[var(--text)]">
                  {APP_CONFIG.organizerName}
                </h3>
                <InstagramVerifiedBadge size={17} />
              </div>
              <p className="text-xs font-bold text-teal-700 dark:text-teal-300">
                {language === 'tr' ? 'Tur & Gezi Organizatörü' : 'Tour & Travel Organizer'}
              </p>
            </div>
          </div>

          <button
            onClick={closeOrganizerSheet}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Tour Banner if applicable */}
        {tourName && (
          <div className="mb-4 p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-500/20 text-xs">
            <div className="font-bold text-teal-800 dark:text-teal-300 mb-0.5">
              {t('selectedTour', language)}
            </div>
            <div className="font-extrabold text-sm text-teal-950 dark:text-teal-100">
              {tourName}
            </div>
            {selectedTourForSheet?.price && (
              <div className="mt-1 font-bold text-teal-700 dark:text-teal-400">
                {selectedTourForSheet.price} • {language === 'tr' ? selectedTourForSheet.durationTr : selectedTourForSheet.durationEn}
              </div>
            )}
          </div>
        )}

        {/* Info Grid */}
        <div className="space-y-3 mb-6">
          {/* Phone */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">
                  {t('phoneCallLabel', language)}
                </div>
                <a
                  href={`tel:${APP_CONFIG.phone}`}
                  className="font-extrabold text-slate-900 dark:text-slate-100 hover:text-teal-600 transition-colors text-base"
                >
                  {APP_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
            <a
              href={`tel:${APP_CONFIG.phone}`}
              className="px-3.5 py-1.5 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:bg-teal-600 hover:text-white transition-colors"
            >
              {t('callButton', language)}
            </a>
          </div>

          {/* Meeting Point & Maps Link */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    {t('meetingLocation', language)}
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                    {meetingPointName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t('meetingLocationDesc', language)}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center gap-1.5 text-xs font-extrabold text-teal-700 dark:text-teal-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? 'Google Haritalarda Aç' : 'Open in Google Maps'}</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              {t('organizerTrustDesc', language)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {selectedTourForSheet ? (
            <button
              onClick={() => {
                closeOrganizerSheet();
                startBookingForTour(selectedTourForSheet);
              }}
              className="w-full h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2.5 font-black text-base shadow-[0_4px_0_#c2410c] active:translate-y-0.5 transition-transform"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>{t('bookNow', language)}</span>
            </button>
          ) : (
            <a
              href={`tel:${APP_CONFIG.phone}`}
              className="w-full h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2.5 font-black text-base shadow-[0_4px_0_#0f766e] active:translate-y-0.5 transition-transform"
            >
              <Phone className="w-5 h-5" />
              <span>{t('contactOrganizer', language)}</span>
            </a>
          )}

          <button
            onClick={closeOrganizerSheet}
            className="w-full h-11 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-sm hover:bg-slate-200 transition-colors"
          >
            {language === 'tr' ? 'Kapat' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
