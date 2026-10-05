export type Language = 'tr' | 'en' | 'ru' | 'de' | 'fr' | 'ar' | 'zh' | 'th';

export type ThemeType = 'tropical' | 'ocean' | 'sunset' | 'lotus' | 'orchid' | 'emerald' | 'gold';

export interface ThemeOption {
  id: ThemeType;
  nameTr: string;
  nameEn: string;
  color: string;
  secondaryColor: string;
  gradient: string;
  icon: string;
  descriptionTr: string;
  descriptionEn: string;
}

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export type TabType = 'home' | 'tours' | 'request' | 'organizer' | 'currency' | 'admin';

export type RequestStatus = 'New' | 'Contacted' | 'Completed';

export type RequestTypeOption =
  | 'Tour'
  | 'Motorbike rental'
  | 'Transfer'
  | 'Currency exchange'
  | 'Hotel'
  | 'Other';

export interface UserRequest {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  nationality?: string;
  country?: string;
  requestType: RequestTypeOption;
  tourName?: string;
  date?: string;
  peopleCount?: string;
  message?: string;
  status: RequestStatus;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export type MoodType = 'happy' | 'romantic' | 'single' | 'party' | 'relaxed' | 'adventurous';

export interface MoodOption {
  id: MoodType;
  emoji: string;
  image: string;
  nameKey: string;
  quoteKey: string;
  taskKey: string;
  placeId: string;
  placeNameTr: string;
  placeNameEn: string;
}
