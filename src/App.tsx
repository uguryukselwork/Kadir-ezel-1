import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ToursView } from './components/ToursView';
import { SendRequestView } from './components/SendRequestView';
import { OrganizerView } from './components/OrganizerView';
import { CurrencyView } from './components/CurrencyView';
import { AdminView } from './components/AdminView';
import { OrganizerSheet } from './components/OrganizerSheet';
import { FloatingLanguageButton } from './components/FloatingLanguageButton';
import { FloatingThemeButton } from './components/FloatingThemeButton';
import { LanguageModal } from './components/LanguageModal';
import { ThemeModal } from './components/ThemeModal';
import { SettingsModal } from './components/SettingsModal';
import { Toast } from './components/Toast';
import { WelcomeScreen } from './components/WelcomeScreen';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="app">
      <Header />
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'tours' && <ToursView />}
      {activeTab === 'request' && <SendRequestView />}
      {activeTab === 'organizer' && <OrganizerView />}
      {activeTab === 'currency' && <CurrencyView />}
      {activeTab === 'admin' && <AdminView />}
      <BottomNav />
      <OrganizerSheet />
      <FloatingThemeButton />
      <FloatingLanguageButton />
      <ThemeModal />
      <LanguageModal />
      <SettingsModal />
      <Toast />
      <WelcomeScreen />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
