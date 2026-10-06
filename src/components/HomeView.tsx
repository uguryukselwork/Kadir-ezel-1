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
    <div className="space-y-7 pb-12">
      {/* Top Controls: Left-side Theme Button + Search Bar */}
      <div className="flex items-center gap-2.5">
        {/* Small Theme Button on the Left */}
        <button
          type="button"
          onClick={() => { openThemeModal(); playSound('click'); }}
          className="animate-signal w-12 h-12 rounded-full bg-[var(--surface-card)] border border-[var(--border)] shadow-sm flex items-center justify-center text-[var(--text)] hover:scale-105 active:scale-95 transition-all shrink-0 relative group"
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
          <div className="flex items-center gap-2.5 px-4 h-12 rounded-full bg-[var(--surface-card)] border border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder', language)}
              className="w-full bg-transparent text-[15px] text-[var(--text)] outline-none placeholder:text-[var(--faint)]"
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
            <h2 className="font-display font-medium text-[19px] text-[var(--text)]">
              {language === 'tr' ? 'Arama Sonuçları' : 'Search Results'} ({filteredItems.length})
            </h2>
            <button
              onClick={() => { setSearchQuery(''); playSound('pop'); }}
              className="text-[13px] font-semibold text-teal-700 dark:text-teal-300"
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
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-teal-700 dark:text-teal-300 hover:underline py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'tr' ? 'Tüm Kategoriler' : 'All Categories'}</span>
          </button>
            <span className="text-[13px] text-[var(--text-muted)]">
              {categoryItems.length} {language === 'tr' ? 'Öneri' : 'Items'}
            </span>
          </div>

          {/* Category Header Card */}
          <div
            className="p-5 rounded-[22px]"
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
                  className="font-display font-medium text-[22px] leading-tight"
                  style={{ color: currentCategory.textColor }}
                >
                  {language === 'tr' ? currentCategory.nameTr : currentCategory.nameEn}
                </h2>
                <div className="text-[13.5px] mt-1 text-[var(--text)]/80">
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
                className="btn btn-primary w-full"
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
          {/* Welcome hero: photo of the Andaman with "sawasdee" in Thai script */}
          <section className="hero-andaman">
            <img
              src={TOURS_DATA[0]?.imageUrl}
              alt=""
              className="hero-andaman-photo"
              loading="eager"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            <div className="hero-andaman-shade" />
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="mt-auto">
                <p className="hero-thai" lang="th" aria-hidden="true">สวัสดี</p>
                <p className="text-[12.5px] font-medium text-white/70 mt-1 mb-4">
                  {language === 'tr' ? 'Tayca "merhaba" demek' : '"Hello" in Thai'}
                </p>
                <h2 className="font-display text-[26px] leading-[1.15] font-medium text-white">
                  {t('welcomeHeader', language).replace(/\s*🇹🇭/u, '')}
                </h2>
                <p className="text-[14px] leading-relaxed text-white/85 mt-2 max-w-[34ch]">
                  {t('welcomeSub', language)}
                </p>
                <div className="flex items-center gap-2 mt-5">
                  <button
                    onClick={() => { setActiveTab('request'); playSound('tab'); }}
                    className="h-11 px-5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-semibold shadow-[0_3px_0_var(--color-orange-800)] active:translate-y-0.5 active:shadow-none transition-all"
                  >
                    {t('tabRequest', language)}
                  </button>
                  <button
                    onClick={() => { setActiveTab('tours'); playSound('tab'); }}
                    className="h-11 px-5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-[14px] font-semibold ring-1 ring-white/30 transition-colors"
                  >
                    {t('tabTours', language)}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Your guide: Kadir Ezel */}
          <button
            type="button"
            onClick={() => openOrganizerSheet(null)}
            className="w-full text-left flex items-center gap-3.5 p-3.5 pr-4 rounded-[22px] bg-[var(--surface-card)] border border-[var(--border)] shadow-[var(--lift)] hover:border-teal-300 transition-colors"
          >
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-teal-500 ring-offset-2 ring-offset-[var(--surface-card)] bg-teal-50">
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
              <div className="absolute -bottom-0.5 -right-0.5 z-10 rounded-full bg-[var(--surface-card)] p-[1.5px]">
                <InstagramVerifiedBadge size={16} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] text-[var(--text-muted)]">{t('tourOrganizer', language)}</div>
              <div className="font-display font-medium text-[18px] leading-tight text-[var(--text)] truncate">
                {APP_CONFIG.organizerName}
              </div>
              <div className="text-[12.5px] text-[var(--text-muted)] mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate">{language === 'tr' ? APP_CONFIG.meetingPointName : APP_CONFIG.meetingPointNameEn}</span>
              </div>
            </div>
            <span className="shrink-0 h-9 px-3.5 rounded-full theme-bg text-white text-[13px] font-semibold flex items-center">
              {language === 'tr' ? 'İletişim' : 'Contact'}
            </span>
          </button>

          {/* Holiday mood picker */}
          <section className="space-y-3">
            <div className="flex items-baseline justify-between px-1">
              <h3 className="font-display font-medium text-[19px] text-[var(--text)]">
                {t('relationshipMoodTitle', language)}
              </h3>
              {selectedMoodId && (
                <button
                  onClick={() => { setSelectedMoodId(null); playSound('pop'); }}
                  className="text-[13px] font-semibold text-teal-700 dark:text-teal-300"
                >
                  {language === 'tr' ? 'Temizle' : 'Clear'}
                </button>
              )}
            </div>

            <div className="flex items-start gap-3 overflow-x-auto pb-1 -mx-[18px] px-[18px] scrollbar-none snap-x">
              {MOOD_OPTIONS.map((mood) => {
                const isSelected = selectedMoodId === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => { setSelectedMoodId(mood.id); playSound('pop'); }}
                    aria-pressed={isSelected}
                    className="flex flex-col items-center gap-1.5 w-[72px] shrink-0 snap-start group"
                  >
                    <div
                      className={`w-[72px] h-[88px] rounded-[18px] overflow-hidden relative transition-all ${
                        isSelected
                          ? 'ring-[3px] ring-teal-500 ring-offset-2 ring-offset-[var(--bg)]'
                          : 'ring-1 ring-[var(--border)] group-hover:ring-teal-300'
                      }`}
                    >
                      <img
                        src={mood.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>
                    <span className={`text-[12px] leading-tight text-center line-clamp-1 ${isSelected ? 'font-semibold text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>
                      {t(mood.nameKey, language)}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedMoodId && (() => {
              const activeMood = MOOD_OPTIONS.find((m) => m.id === selectedMoodId);
              if (!activeMood) return null;
              return (
                <div className="rounded-[22px] bg-[var(--surface-card)] border border-[var(--border)] shadow-[var(--lift)] overflow-hidden">
                  <div className="p-4 space-y-3">
                    <p className="font-display text-[17px] leading-snug text-[var(--text)]">
                      {t(activeMood.quoteKey, language)}
                    </p>
                    <div className="flex items-start gap-2 text-[14px] text-[var(--text-muted)]">
                      <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{t(activeMood.taskKey, language)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenMoodPlace(activeMood.placeId)}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-orange-50 dark:bg-orange-950/50 border-t border-[var(--border)] text-left hover:bg-orange-100 dark:hover:bg-orange-950 transition-colors"
                  >
                    <img
                      src={activeMood.image}
                      alt=""
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] text-orange-700 dark:text-orange-300">
                        {language === 'tr' ? 'Kadir’in önerisi' : 'Kadir recommends'}
                      </span>
                      <span className="block font-semibold text-[14.5px] text-[var(--text)] truncate">
                        {language === 'tr' ? activeMood.placeNameTr : activeMood.placeNameEn}
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5 text-orange-600 dark:text-orange-300 shrink-0" />
                  </button>
                </div>
              );
            })()}
          </section>

          {/* Categories as one list, so names and descriptions get the full width */}
          <section className="space-y-3">
            <h3 className="font-display font-medium text-[19px] text-[var(--text)] px-1">
              {t('categoriesTitle', language)}
            </h3>

            <div className="rounded-[22px] bg-[var(--surface-card)] border border-[var(--border)] shadow-[var(--lift)] overflow-hidden divide-y divide-[var(--border)]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    if (cat.id === 'tours') {
                      setActiveTab('tours');
                      playSound('tab');
                    } else {
                      setSelectedCategoryId(cat.id);
                      playSound('click');
                    }
                  }}
                  className="w-full text-left flex items-center gap-3.5 px-4 py-3.5 hover:bg-[var(--bg)] transition-colors"
                >
                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5"
                    style={{ backgroundColor: cat.bgColor, color: cat.textColor }}
                  >
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px] text-[var(--text)] truncate">
                        {language === 'tr' ? cat.nameTr : cat.nameEn}
                      </span>
                      {cat.badgeTr && (
                        <span className="text-[11px] font-medium px-2 py-px rounded-full bg-[var(--bg)] text-[var(--text-muted)] shrink-0">
                          {language === 'tr' ? cat.badgeTr : cat.badgeEn}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] leading-snug text-[var(--text-muted)] line-clamp-2 mt-0.5">
                      {language === 'tr' ? cat.descTr : cat.descEn}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--faint)] shrink-0" />
                </button>
              ))}
            </div>
          </section>

          {/* Custom tour: dark closing block */}
          <section className="rounded-[22px] bg-[var(--ink)] text-white p-5 relative overflow-hidden">
            <svg className="absolute right-0 bottom-0 !w-40 !h-16 text-white/[0.07]" viewBox="0 0 160 64" aria-hidden="true">
              <path d="M0 40 Q20 30 40 40 T80 40 T120 40 T160 40 V64 H0Z" fill="currentColor" stroke="none" />
              <path d="M0 52 Q20 44 40 52 T80 52 T120 52 T160 52 V64 H0Z" fill="currentColor" stroke="none" />
            </svg>
            <h4 className="font-display font-medium text-[20px] leading-snug relative">
              {language === 'tr' ? 'Özel tur veya transfer mi lazım?' : 'Need a custom tour or transfer?'}
            </h4>
            <p className="text-[14px] text-white/75 mt-1.5 max-w-[32ch] relative">
              {language === 'tr'
                ? 'Size özel program ve fiyat teklifi hazırlayalım.'
                : 'Get a personalized plan and a quote on WhatsApp.'}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4 relative">
              <button
                onClick={() => { setActiveTab('request'); playSound('tab'); }}
                className="h-11 px-5 rounded-full bg-orange-400 hover:bg-orange-300 text-[var(--ink)] text-[14px] font-semibold transition-colors"
              >
                {language === 'tr' ? 'Teklif iste' : 'Request a quote'}
              </button>
              <button
                onClick={handleShareApp}
                className="h-11 px-4 rounded-full text-white/90 hover:text-white text-[14px] font-medium flex items-center gap-2 ring-1 ring-white/20 hover:ring-white/40 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'tr' ? 'Rehberi paylaş' : 'Share the guide'}</span>
              </button>
            </div>
          </section>
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
    <div className="rounded-[22px] overflow-hidden bg-[var(--surface-card)] border border-[var(--border)] shadow-[var(--lift)] group">
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
          <h4 className="font-display font-medium text-[18px] leading-snug text-[var(--text)]">
            {language === 'tr' ? item.nameTr : item.nameEn}
          </h4>
        </div>

        <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
          {language === 'tr' ? item.descTr : item.descEn}
        </p>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[12px] text-[var(--text-muted)]">
              {language === 'tr' ? 'Tahmini Fiyat / Bilgi' : 'Estimated Price / Info'}
            </div>
            <div className="font-semibold text-[14px] text-orange-600 dark:text-orange-300 truncate">
              {language === 'tr' ? item.priceTr : item.priceEn}
            </div>
          </div>

          <a
            href={item.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 rounded-full bg-[var(--bg)] hover:bg-teal-50 dark:hover:bg-teal-950 text-[var(--text)] text-[13px] font-semibold border border-[var(--border)] flex items-center gap-1.5 transition-colors shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'tr' ? 'Haritada Aç' : 'Open in Maps'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
