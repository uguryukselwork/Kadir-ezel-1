import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PLACE_ITEMS, TOURS_DATA, APP_CONFIG, MOOD_OPTIONS, CategoryData, PlaceItem, TourItem } from '../data';
import { Language } from '../types';
import { t } from '../utils/i18n';
import { InstagramVerifiedBadge } from './VerifiedBadge';
import {
  Sparkles,
  Compass,
  Ship,
  Banknote,
  Bike,
  Car,
  Info,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Search,
  MessageCircle,
  Phone,
  Check,
  Star,
  Flame,
  X,
  Palette,
  Share2,
  CalendarCheck,
  DollarSign
} from 'lucide-react';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles':
      return <Sparkles className="w-6 h-6" />;
    case 'Compass':
      return <Compass className="w-6 h-6" />;
    case 'Ship':
      return <Ship className="w-6 h-6" />;
    case 'Banknote':
      return <Banknote className="w-6 h-6" />;
    case 'Bike':
      return <Bike className="w-6 h-6" />;
    case 'Car':
      return <Car className="w-6 h-6" />;
    case 'Info':
    default:
      return <Info className="w-6 h-6" />;
  }
};

export const HomeView: React.FC = () => {
  const {
    language,
    selectedCategoryId,
    setSelectedCategoryId,
    openOrganizerSheet,
    setActiveTab,
    openThemeModal,
    currentTheme,
    selectedMoodId,
    setSelectedMoodId,
    playSound,
    startBookingForTour
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // State for Recommended Mood Place Details Modal
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState<{
    title: string;
    desc: string;
    category: string;
    price?: string;
    mapsUrl: string;
    imageUrl?: string;
    isTour?: boolean;
    tourItem?: TourItem;
  } | null>(null);

  const handleOpenMoodPlace = (placeId: string) => {
    playSound('click');
    const tour = TOURS_DATA.find((t) => t.id === placeId);
    if (tour) {
      setSelectedPlaceForModal({
        title: language === 'tr' ? tour.nameTr : tour.nameEn,
        desc: language === 'tr' ? tour.descTr : tour.descEn,
        category: language === 'tr' ? 'Popüler Ada Turu' : 'Island Tour',
        price: tour.price,
        mapsUrl: tour.mapsUrl,
        imageUrl: tour.imageUrl,
        isTour: true,
        tourItem: tour
      });
      return;
    }
    const place = PLACE_ITEMS.find((p) => p.id === placeId);
    if (place) {
      setSelectedPlaceForModal({
        title: language === 'tr' ? place.nameTr : place.nameEn,
        desc: language === 'tr' ? place.descTr : place.descEn,
        category: place.badge || (language === 'tr' ? 'Önerilen Mekan' : 'Recommended Spot'),
        price: language === 'tr' ? place.priceTr : place.priceEn,
        mapsUrl: place.mapsUrl,
        imageUrl: MOOD_OPTIONS.find((m) => m.placeId === placeId)?.image,
        isTour: false
      });
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

  // Selected category object
  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategoryId) || null;

  // Filtered items
  const categoryItems = selectedCategoryId
    ? PLACE_ITEMS.filter((item) => item.categoryId === selectedCategoryId)
    : [];

  const filteredItems = searchQuery.trim()
    ? PLACE_ITEMS.filter((item) => {
        const query = searchQuery.toLowerCase();
        const name = (language === 'tr' ? item.nameTr : item.nameEn).toLowerCase();
        const desc = (language === 'tr' ? item.descTr : item.descEn).toLowerCase();
        return name.includes(query) || desc.includes(query);
      })
    : [];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Controls: Left-side Theme Button + Search Bar */}
      <div className="flex items-center gap-2.5">
        {/* Small Theme Button on the Left */}
        <button
          type="button"
          onClick={() => { openThemeModal(); playSound('click'); }}
          className="animate-signal w-13 h-13 rounded-full bg-[var(--surface-card)] border border-[var(--border)] shadow-sm flex items-center justify-center text-[var(--text)] hover:scale-105 active:scale-95 transition-all shrink-0 relative group"
          title={language === 'tr' ? 'Renk Teması Değiştir' : 'Change Color Theme'}
          aria-label="Theme selector"
        >
          <Palette className="w-5 h-5 text-[var(--primary)] transition-transform group-hover:rotate-12" />
          <span
            className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--surface-card)] shadow-xs"
            style={{ backgroundColor: currentTheme.color }}
          />
        </button>

        {/* Search & Filter Bar */}
        <div className="relative flex-1">
          <div className="flex items-center gap-2.5 px-4 h-13 rounded-full bg-[var(--surface-card)] border border-[var(--border)] shadow-sm focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder', language)}
              className="w-full bg-transparent text-sm font-semibold text-[var(--text)] outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS VIEW */}
      {searchQuery.trim() ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-lg text-[var(--text)]">
              {language === 'tr' ? 'Arama Sonuçları' : 'Search Results'} ({filteredItems.length})
            </h2>
            <button
              onClick={() => { setSearchQuery(''); playSound('pop'); }}
              className="text-xs font-bold text-teal-600"
            >
              {language === 'tr' ? 'Temizle' : 'Clear'}
            </button>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty">
              <h2>{language === 'tr' ? 'Sonuç Bulunamadı' : 'No Results Found'}</h2>
              <p>
                {language === 'tr'
                  ? 'Farklı bir arama terimi deneyin veya Kadir Ezel ile doğrudan iletişime geçin.'
                  : 'Try a different search keyword or contact Kadir Ezel directly.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} language={language} />
              ))}
            </div>
          )}
        </div>
      ) : selectedCategoryId && currentCategory ? (
        /* CATEGORY DRILLDOWN VIEW */
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
          <button
            onClick={() => { setSelectedCategoryId(null); playSound('pop'); }}
            className="inline-flex items-center gap-1.5 text-xs font-black text-teal-600 dark:text-teal-400 hover:underline py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'tr' ? 'Tüm Kategoriler' : 'All Categories'}</span>
          </button>
            <span className="text-xs font-extrabold text-slate-400">
              {categoryItems.length} {language === 'tr' ? 'Öneri' : 'Items'}
            </span>
          </div>

          {/* Category Header Card */}
          <div
            className="p-5 rounded-[26px] border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
            style={{ backgroundColor: currentCategory.bgColor }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-900/80 flex items-center justify-center shadow-sm"
                style={{ color: currentCategory.textColor }}
              >
                {getCategoryIcon(currentCategory.iconName)}
              </div>
              <div>
                <h2
                  className="font-black text-xl leading-tight"
                  style={{ color: currentCategory.textColor }}
                >
                  {language === 'tr' ? currentCategory.nameTr : currentCategory.nameEn}
                </h2>
                <div className="text-xs font-bold opacity-80 mt-0.5 text-slate-800 dark:text-slate-200">
                  {language === 'tr' ? currentCategory.descTr : currentCategory.descEn}
                </div>
              </div>
            </div>
          </div>

          {/* Item List for Category */}
          <div className="space-y-3.5">
            {categoryItems.map((item) => (
              <ItemCard key={item.id} item={item} language={language} />
            ))}
          </div>

          {/* If Tours category, show direct shortcut to Tours tab */}
          {selectedCategoryId === 'tours' && (
            <div className="pt-2">
              <button
                onClick={() => { setActiveTab('tours'); playSound('tab'); }}
                className="btn btn-primary w-full"
              >
                <Ship className="w-5 h-5" />
                <span>{language === 'tr' ? 'Tüm Turları ve Fiyatları Gör' : 'View All Tours & Rates'}</span>
              </button>
            </div>
          )}

          {/* If Currency category, show shortcut to live Currency Calculator tab */}
          {selectedCategoryId === 'currency' && (
            <div className="pt-2">
              <button
                onClick={() => { setActiveTab('currency'); playSound('tab'); }}
                className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <DollarSign className="w-4 h-4" />
                <span>{language === 'tr' ? 'Canlı Baht ➔ TL Kur Hesaplayıcıyı Aç' : 'Open Live Baht ➔ TRY Calculator'}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* DEFAULT HOME VIEW */
        <>
          {/* Welcome Header */}
          <div className="relative overflow-hidden rounded-[28px] p-6 pt-28 text-white shadow-lg theme-gradient-bg">
            {/* Andaman sea photo behind the welcome text */}
            <img
              src={TOURS_DATA[0]?.imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider mb-2.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>{language === 'tr' ? 'Tayland Seyahat Asistanı' : 'Thailand Travel Assistant'}</span>
              </div>
              <h2 className="font-black text-2xl sm:text-3xl leading-tight tracking-tight text-white mb-2">
                {t('welcomeHeader', language)}
              </h2>
              <p className="text-sm font-semibold text-white/90 leading-relaxed max-w-sm">
                {t('welcomeSub', language)}
              </p>

              <div className="flex items-center gap-2 mt-4 pt-1">
                <button
                  onClick={() => { setActiveTab('request'); playSound('tab'); }}
                  className="px-4 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-[0_3px_0_#c2410c] active:translate-y-0.5 transition-all"
                >
                  {t('tabRequest', language)}
                </button>
                <button
                  onClick={() => { setActiveTab('tours'); playSound('tab'); }}
                  className="px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-black transition-all"
                >
                  {t('tabTours', language)}
                </button>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -right-6 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute right-4 bottom-3 opacity-20 pointer-events-none">
              <Compass className="w-28 h-28 text-white" />
            </div>
          </div>

          {/* Relationship Mood Feature */}
          <div className="bg-[var(--surface-card)] border border-[var(--border)] rounded-[26px] p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-extrabold text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
                {t('relationshipMoodTitle', language)}
              </h3>
              {selectedMoodId && (
                <button 
                  onClick={() => { setSelectedMoodId(null); playSound('pop'); }}
                  className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase"
                >
                  {language === 'tr' ? 'Temizle' : 'Clear'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {MOOD_OPTIONS.map((mood) => {
                const isSelected = selectedMoodId === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => { setSelectedMoodId(mood.id); playSound('pop'); }}
                    className={`flex flex-col items-center gap-2 min-w-[82px] p-2 rounded-2xl transition-all active:scale-95 group ${
                      isSelected 
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-500 shadow-md ring-2 ring-teal-500/20 scale-[1.02]' 
                        : 'bg-slate-50 dark:bg-slate-800/40 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl overflow-hidden relative shadow-sm transition-transform duration-200 ${isSelected ? 'ring-2 ring-teal-500' : 'group-hover:scale-105'}`}>
                      <img
                        src={mood.image}
                        alt={t(mood.nameKey, language)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tight text-center leading-tight line-clamp-1 ${isSelected ? 'text-teal-700 dark:text-teal-300' : 'text-slate-600 dark:text-slate-400'}`}>
                      {t(mood.nameKey, language)}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedMoodId && (() => {
              const activeMood = MOOD_OPTIONS.find((m) => m.id === selectedMoodId);
              return (
                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/50 dark:border-orange-900/30 animate-in zoom-in-95 duration-200 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                    <p className="text-sm font-bold text-orange-900 dark:text-orange-100 leading-snug italic">
                      "{t(activeMood?.quoteKey || '', language)}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-orange-200/50 dark:border-orange-900/50 flex flex-col gap-1">
                    <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                      {t('suggestedAction', language)}
                    </span>
                    <div className="flex items-center gap-2 text-sm font-extrabold text-orange-950 dark:text-orange-100">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      <span>{t(activeMood?.taskKey || '', language)}</span>
                    </div>
                  </div>

                  {/* Önerilen Mekan ve Bilgilerini Görme Butonu */}
                  {activeMood && (
                    <div className="pt-3 border-t border-orange-200/60 dark:border-orange-900/60">
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-orange-200/80 dark:border-orange-900/60 shadow-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-xs border border-orange-200 dark:border-orange-950">
                            <img
                              src={activeMood.image}
                              alt={activeMood.placeNameTr}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider block truncate">
                              {language === 'tr' ? 'Önerilen Mekan / Tur' : 'Recommended Destination'}
                            </span>
                            <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                              {language === 'tr' ? activeMood.placeNameTr : activeMood.placeNameEn}
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenMoodPlace(activeMood.placeId)}
                          className="h-10 px-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs shrink-0 shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          <Info className="w-4 h-4" />
                          <span>{language === 'tr' ? 'Bilgileri Gör' : 'View Details'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Tour Organizer Card: Kadir Ezel (opens the same bottom sheet) */}
          <div className="group border theme-border/30 bg-[var(--surface-card)] p-4 rounded-[26px] shadow-sm hover:border-[var(--primary)] transition-all">
            <div className="flex items-center justify-between gap-3">
              <div 
                className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                onClick={() => openOrganizerSheet(null)}
              >
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-2xl overflow-hidden shadow-md border-2 border-teal-500/40 bg-teal-50 dark:bg-teal-950">
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
                  {/* Instagram Verified Rosette Badge */}
                  <div className="absolute -bottom-1 -right-1 z-10 rounded-full bg-white dark:bg-slate-900 p-[1.5px] shadow-sm flex items-center justify-center">
                    <InstagramVerifiedBadge size={17} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-base text-slate-900 dark:text-slate-100 truncate">
                      {t('tourOrganizer', language)}
                      <span className="theme-text ml-1">{APP_CONFIG.organizerName}</span>
                    </span>
                    <InstagramVerifiedBadge size={16} />
                  </div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">{language === 'tr' ? APP_CONFIG.meetingPointName : APP_CONFIG.meetingPointNameEn}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openOrganizerSheet(null)}
                  className="px-3.5 py-2 rounded-full theme-bg text-white text-xs font-black hover:opacity-90 active:scale-95 transition-all shadow-sm"
                  title={language === 'tr' ? 'İletişim & Konum' : 'Contact & Point'}
                >
                  {language === 'tr' ? 'İletişim & Konum' : 'Contact & Point'}
                </button>
              </div>
            </div>
          </div>

          {/* Share App on WhatsApp Banner (Tastefully relocated from the top header) */}
          <div className="p-4 rounded-[26px] bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-sm text-white truncate">
                  {language === 'tr' ? 'Kadir Thai Rehberini Paylaş' : 'Share Kadir Thai Guide'}
                </h4>
                <p className="text-[11px] text-teal-100 font-semibold truncate">
                  {language === 'tr' ? 'Tayland tatiline çıkan arkadaşlarına gönder' : 'Send to friends traveling to Thailand'}
                </p>
              </div>
            </div>

            <button
              onClick={handleShareApp}
              className="h-10 px-4 rounded-full bg-white text-emerald-800 font-black text-xs shrink-0 shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
              <span>{language === 'tr' ? 'Paylaş' : 'Share'}</span>
            </button>
          </div>

          {/* Category Cards (7 Items) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-extrabold text-lg text-[var(--text)]">
                {t('categoriesTitle', language)}
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {CATEGORIES.length} {language === 'tr' ? 'Kategori' : 'Categories'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const count = PLACE_ITEMS.filter((p) => p.categoryId === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      if (cat.id === 'tours') {
                        setActiveTab('tours');
                        playSound('tab');
                      } else {
                        setSelectedCategoryId(cat.id);
                        playSound('click');
                      }
                    }}
                    className="p-4 rounded-[24px] bg-[var(--surface-card)] border border-[var(--border)] hover:border-teal-500/40 shadow-sm cursor-pointer transition-all active:scale-[0.98] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ backgroundColor: cat.bgColor, color: cat.textColor }}
                      >
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-sm text-[var(--text)] truncate">
                            {language === 'tr' ? cat.nameTr : cat.nameEn}
                          </h4>
                          {cat.badgeTr && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                              {language === 'tr' ? cat.badgeTr : cat.badgeEn}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                          {language === 'tr' ? cat.descTr : cat.descEn}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Support Banner */}
          <div className="p-4 rounded-[24px] bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-amber-950 dark:text-amber-100">
                  {language === 'tr' ? 'Özel Tur veya Transfer mi Lazım?' : 'Need Custom Tour or Transfer?'}
                </h4>
                <p className="text-xs text-amber-800/90 dark:text-amber-300 mt-0.5">
                  {language === 'tr'
                    ? 'Size özel program ve fiyat teklifi hazırlayalım.'
                    : 'Get a personalized schedule and instant WhatsApp quote.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setActiveTab('request'); playSound('tab'); }}
              className="px-3.5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shrink-0 transition-colors"
            >
              {language === 'tr' ? 'Talep Et' : 'Request'}
            </button>
          </div>
        </>
      )}

      {/* Recommended Mood Place Details Modal */}
      {selectedPlaceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-[var(--surface-card)] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
          >
            {/* Header Image with close button */}
            <div className="relative h-52 w-full bg-slate-900 shrink-0">
              {selectedPlaceForModal.imageUrl && (
                <img
                  src={selectedPlaceForModal.imageUrl}
                  alt={selectedPlaceForModal.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              
              <button
                onClick={() => setSelectedPlaceForModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-orange-500 text-white mb-1.5 shadow-sm">
                  {selectedPlaceForModal.category}
                </span>
                <h3 className="font-black text-xl leading-snug drop-shadow-sm text-white">
                  {selectedPlaceForModal.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 overflow-y-auto">
              {selectedPlaceForModal.price && (
                <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/60 flex items-center justify-between">
                  <span className="text-xs font-black text-orange-800 dark:text-orange-300">
                    {language === 'tr' ? 'Tahmini Ücret / Fiyat:' : 'Estimated Price / Rate:'}
                  </span>
                  <span className="text-sm font-black text-orange-600 dark:text-orange-400">
                    {selectedPlaceForModal.price}
                  </span>
                </div>
              )}

              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  {language === 'tr' ? 'Mekan / Tur Hakkında' : 'About the Destination'}
                </h4>
                <p className="text-xs text-[var(--text)] leading-relaxed font-semibold">
                  {selectedPlaceForModal.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {/* Open in Maps */}
                <a
                  href={selectedPlaceForModal.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>{t('openInMaps', language)}</span>
                </a>

                {/* If it's a tour, option to direct book */}
                {selectedPlaceForModal.isTour && selectedPlaceForModal.tourItem && (
                  <button
                    onClick={() => {
                      const item = selectedPlaceForModal.tourItem!;
                      setSelectedPlaceForModal(null);
                      startBookingForTour(item);
                    }}
                    className="w-full h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-[0_3px_0_#c2410c] active:translate-y-0.5 transition-all"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{language === 'tr' ? 'Bu Tura Rezervasyon Yap' : 'Book This Tour'}</span>
                  </button>
                )}

                {/* Ask Kadir Ezel on WhatsApp */}
                <a
                  href={`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    language === 'tr'
                      ? `Merhaba Kadir Bey, "${selectedPlaceForModal.title}" hakkında bilgi almak ve planlama yapmak istiyorum.`
                      : `Hello Kadir, I would like information regarding "${selectedPlaceForModal.title}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs flex items-center justify-center gap-2 shadow-[0_3px_0_#128C7E] active:translate-y-0.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>{language === 'tr' ? 'Kadir Ezel ile WhatsApp\'ta Konuş' : 'Chat with Kadir Ezel on WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable card for place items
const ItemCard: React.FC<{ item: PlaceItem; language: Language }> = ({ item, language }) => {
  return (
    <div className="rounded-[26px] overflow-hidden bg-[var(--surface-card)] border border-[var(--border)] shadow-sm hover:border-teal-500/40 transition-all space-y-0 group">
      {item.imageUrl && (
        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={item.imageUrl}
            alt={language === 'tr' ? item.nameTr : item.nameEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {item.badge && (
            <span className="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-teal-800 dark:text-teal-300 shadow-sm backdrop-blur-xs">
              {item.badge}
            </span>
          )}
          {(item.tagTr || item.tagEn) && (
            <span className="absolute bottom-2.5 left-3 text-[11px] font-bold text-white drop-shadow-sm">
              #{language === 'tr' ? item.tagTr : item.tagEn}
            </span>
          )}
        </div>
      )}

      <div className="p-4 space-y-3">
        <div className="min-w-0">
          <h4 className="font-black text-base text-[var(--text)]">
            {language === 'tr' ? item.nameTr : item.nameEn}
          </h4>
        </div>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          {language === 'tr' ? item.descTr : item.descEn}
        </p>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {language === 'tr' ? 'Tahmini Fiyat / Bilgi' : 'Estimated Price / Info'}
            </div>
            <div className="font-black text-xs text-orange-600 dark:text-orange-400 truncate">
              {language === 'tr' ? item.priceTr : item.priceEn}
            </div>
          </div>

          <a
            href={item.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-800 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 text-xs font-extrabold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'tr' ? 'Haritada Aç' : 'Open in Maps'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
