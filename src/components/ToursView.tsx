import React from 'react';
import { useApp } from '../context/AppContext';
import { TOURS_DATA, APP_CONFIG, TourItem } from '../data';
import { t } from '../utils/i18n';
import { MapPin, Clock, Check, CalendarCheck, Info } from 'lucide-react';

export const ToursView: React.FC = () => {
  const { language, openOrganizerSheet, startBookingForTour, playSound } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Introduction */}
      <div className="px-1 pt-1">
        <h2 className="font-display font-medium text-[28px] leading-tight text-[var(--text)]">
          {t('popularToursTitle', language)}
        </h2>
        <p className="text-[14px] text-[var(--text-muted)] mt-1.5 max-w-[38ch]">
          {t('popularToursSub', language)}
        </p>
      </div>

      {/* Tour Cards */}
      <div className="space-y-5">
        {TOURS_DATA.map((tour) => {
          const tourTitle = language === 'tr' ? tour.nameTr : tour.nameEn;
          const duration = language === 'tr' ? tour.durationTr : tour.durationEn;
          const desc = language === 'tr' ? tour.descTr : tour.descEn;
          const highlights = language === 'tr' ? tour.highlightsTr : tour.highlightsEn;
          const badge = language === 'tr' ? tour.badgeTr : tour.badgeEn;
          const meetingPoint = language === 'tr' ? tour.meetingPointTr : tour.meetingPointEn;

          return (
            <div
              key={tour.id}
              className="group overflow-hidden rounded-[24px] bg-[var(--surface-card)] border border-[var(--border)] shadow-[var(--lift)]"
            >
              {/* Tour Image with Badges & MapPin Icon */}
              <div className="relative w-full h-52 sm:h-56 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img
                  src={tour.imageUrl}
                  alt={tourTitle}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high-res Thailand beach image if network drops
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Badge top-left */}
                {badge && (
                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-white/90 text-[var(--ink)] backdrop-blur-md">
                      {badge}
                    </span>
                  </div>
                )}

                {/* Corner MapPin Icon: Tapping it opens organizer sheet */}
                <button
                  onClick={() => { openOrganizerSheet(tour); playSound('pop'); }}
                  className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 text-teal-700 dark:text-teal-300 backdrop-blur-md flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all shadow-md active:scale-90"
                  title={language === 'tr' ? 'Buluşma Noktası & Organizatör' : 'Meeting Point & Organizer'}
                  aria-label="Organizer & Location details"
                >
                  <MapPin className="w-5 h-5 text-orange-500" />
                </button>

                {/* Bottom image overlay: Price & Duration */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
                  <div>
                    <div className="text-[12px] font-medium text-white/75">
                      {t('tourPrice', language)}
                    </div>
                    <div className="font-display font-medium text-[28px] leading-none text-white mt-1">
                      {tour.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[12.5px] font-medium border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-teal-300" />
                    <span>{duration}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5">
                {/* Tour Title */}
                <h3 className="font-display font-medium text-[20px] text-[var(--text)] leading-snug">
                  {tourTitle}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
                  {desc}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] text-[var(--text)]">
                      <Check className="w-4 h-4 text-teal-600 dark:text-teal-300 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Meeting Point Clickable Row */}
                <div
                  onClick={() => { openOrganizerSheet(tour); playSound('pop'); }}
                  className="cursor-pointer flex items-center gap-2 text-[13px] font-medium text-teal-700 dark:text-teal-300 hover:underline pt-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="truncate">{meetingPoint}</span>
                </div>

                {/* Action Buttons: "Rezervasyon Yap" + "Buluşma & Bilgi" */}
                <div className="pt-2 grid grid-cols-2 gap-2.5">
                  {/* Meeting Details button */}
                  <button
                    onClick={() => { openOrganizerSheet(tour); playSound('pop'); }}
                    className="h-12 rounded-full bg-[var(--bg)] hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--text)] font-semibold text-[14px] flex items-center justify-center gap-1.5 transition-colors border border-[var(--border)]"
                  >
                    <Info className="w-4 h-4 text-teal-600" />
                    <span>{t('detailsButton', language)}</span>
                  </button>

                  {/* Prominent "Rezervasyon Yap" button */}
                  <button
                    onClick={() => { startBookingForTour(tour); playSound('tab'); }}
                    className="h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[14px] flex items-center justify-center gap-1.5 shadow-[0_3px_0_var(--color-orange-800)] active:translate-y-0.5 active:shadow-none transition-all"
                  >
                    <CalendarCheck className="w-4 h-4 text-white" />
                    <span>{t('bookNow', language)}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
