import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { t } from '../utils/i18n';
import { Compass, Ship, CalendarCheck, User, DollarSign, ShieldCheck } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, language, requests, playSound } = useApp();

  const newRequestsCount = requests.filter((r) => r.status === 'New').length;

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    playSound('tab');
  };

  const tabs: { id: TabType; labelKey: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      labelKey: 'tabHome',
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 'tours',
      labelKey: 'tabTours',
      icon: <Ship className="w-5 h-5" />
    },
    {
      id: 'request',
      labelKey: 'tabRequest',
      icon: <CalendarCheck className="w-5 h-5" />
    },
    {
      id: 'organizer',
      labelKey: 'tabOrganizer',
      icon: <User className="w-5 h-5" />
    },
    {
      id: 'currency',
      labelKey: 'tabCurrency',
      icon: <DollarSign className="w-5 h-5" />
    }
  ];

  const isAdminActive = activeTab === 'admin';

  return (
    <>
      {/* Independent Floating Admin Panel Button placed right above the bottom bar on the right */}
      <button
        onClick={() => handleTabClick('admin')}
        className={`fixed bottom-[88px] right-3.5 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg transition-all active:scale-95 ${
          isAdminActive
            ? 'theme-bg text-white border-2 border-white/60 shadow-teal-500/20'
            : 'bg-[var(--surface-card)] text-[var(--text)] border border-[var(--border)]'
        }`}
        title={t('tabAdmin', language)}
        aria-label="Admin panel"
      >
        <ShieldCheck className={`w-4 h-4 ${isAdminActive ? 'text-white' : 'theme-text'}`} />
        <span className="text-[11.5px] font-semibold">{t('tabAdmin', language)}</span>
        {newRequestsCount > 0 && (
          <span className="px-1.5 min-w-[16px] h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
            {newRequestsCount}
          </span>
        )}
      </button>

      {/* Main 5-Item Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  {tab.icon}
                  {tab.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2 px-1.5 min-w-[16px] h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="whitespace-nowrap truncate max-w-full">
                  {t(tab.labelKey, language)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
