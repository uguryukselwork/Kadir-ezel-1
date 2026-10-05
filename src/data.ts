// Kadir Thai - Tek bir yerden kolayca güncellenebilir veri ve iletişim ayarları
// Easy-to-edit configuration, contacts, tours, and category data
import { ThemeOption, MoodOption } from './types';
import kadirProfileImg from './assets/images/kadir_ezel_profile_1791208777067.jpg';

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'happy',
    emoji: '😎',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    nameKey: 'moodHappy',
    quoteKey: 'quoteHappy',
    taskKey: 'taskHappy',
    placeId: 'phi-phi-maya',
    placeNameTr: 'Phi Phi Adaları & Maya Bay Turu',
    placeNameEn: 'Phi Phi Islands & Maya Bay Tour'
  },
  {
    id: 'romantic',
    emoji: '❤️',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80',
    nameKey: 'moodRomantic',
    quoteKey: 'quoteRomantic',
    taskKey: 'taskRomantic',
    placeId: 'promthep-cape',
    placeNameTr: 'Promthep Cape Gün Batımı',
    placeNameEn: 'Promthep Cape Sunset Viewpoint'
  },
  {
    id: 'single',
    emoji: '🤙',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=400&q=80',
    nameKey: 'moodSingle',
    quoteKey: 'quoteSingle',
    taskKey: 'taskSingle',
    placeId: 'old-phuket-town',
    placeNameTr: 'Tarihi Old Phuket Town',
    placeNameEn: 'Historic Old Phuket Town'
  },
  {
    id: 'party',
    emoji: '🥳',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
    nameKey: 'moodParty',
    quoteKey: 'quoteParty',
    taskKey: 'taskParty',
    placeId: 'bangla-road',
    placeNameTr: 'Bangla Road & Illuzion Club',
    placeNameEn: 'Bangla Road & Nightlife'
  },
  {
    id: 'relaxed',
    emoji: '🧉',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    nameKey: 'moodRelaxed',
    quoteKey: 'quoteRelaxed',
    taskKey: 'taskRelaxed',
    placeId: 'wat-chalong',
    placeNameTr: 'Wat Chalong Tapınağı & Spa',
    placeNameEn: 'Wat Chalong Temple & Spa'
  },
  {
    id: 'adventurous',
    emoji: '🤠',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=80',
    nameKey: 'moodAdventurous',
    quoteKey: 'quoteAdventurous',
    taskKey: 'taskAdventurous',
    placeId: 'james-bond-bay',
    placeNameTr: 'James Bond & Phang Nga Kano',
    placeNameEn: 'James Bond Island & Canoeing'
  }
];

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'tropical',
    nameTr: 'Phuket Turkuazı',
    nameEn: 'Phuket Turquoise',
    color: '#0D9488',
    secondaryColor: '#F97316',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #115e59 50%, #042f2e 100%)',
    icon: '🌴',
    descriptionTr: 'Doğal Andaman denizi turkuazı ve tropik ada ferahlığı',
    descriptionEn: 'Natural Andaman turquoise and tropical island vibes'
  },
  {
    id: 'ocean',
    nameTr: 'Andaman Okyanusu',
    nameEn: 'Andaman Ocean',
    color: '#0284C7',
    secondaryColor: '#38BDF8',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #075985 50%, #0c4a6e 100%)',
    icon: '🌊',
    descriptionTr: 'Derin deniz mavisi ve berrak lagün suları',
    descriptionEn: 'Deep sea blue and crystal clear lagoon waters'
  },
  {
    id: 'sunset',
    nameTr: 'Patong Gün Batımı',
    nameEn: 'Patong Sunset',
    color: '#EA580C',
    secondaryColor: '#FBBF24',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #9a3412 50%, #7c2d12 100%)',
    icon: '🌅',
    descriptionTr: 'Promthep Burnu gün batımının sıcak kızıl-turuncu alevi',
    descriptionEn: 'Warm sunset glow of legendary Promthep Cape'
  },
  {
    id: 'lotus',
    nameTr: 'Tayland Lotusu',
    nameEn: 'Thai Lotus',
    color: '#E11D48',
    secondaryColor: '#FB7185',
    gradient: 'linear-gradient(135deg, #be123c 0%, #9f1239 50%, #881337 100%)',
    icon: '🌸',
    descriptionTr: 'Kutsal lotus çiçeği ve canlı tropik pembe tonlar',
    descriptionEn: 'Sacred lotus bloom and vivid tropical pink tones'
  },
  {
    id: 'orchid',
    nameTr: 'Kraliyet Orkidesi',
    nameEn: 'Royal Orchid',
    color: '#7C3AED',
    secondaryColor: '#A78BFA',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 50%, #4c1d95 100%)',
    icon: '💜',
    descriptionTr: 'Tayland saray zarafeti ve asil menekşe moru',
    descriptionEn: 'Thai royal elegance and noble violet purple'
  },
  {
    id: 'emerald',
    nameTr: 'Khao Sok Zümrütü',
    nameEn: 'Khao Sok Emerald',
    color: '#059669',
    secondaryColor: '#34D399',
    gradient: 'linear-gradient(135deg, #047857 0%, #065f46 50%, #064e3b 100%)',
    icon: '🌿',
    descriptionTr: 'Asırlık yağmur ormanları ve yemyeşil doğa huzuru',
    descriptionEn: 'Ancient rainforests and lush green serenity'
  },
  {
    id: 'gold',
    nameTr: 'Siam Altını',
    nameEn: 'Siam Gold',
    color: '#D97706',
    secondaryColor: '#F59E0B',
    gradient: 'linear-gradient(135deg, #b45309 0%, #92400e 50%, #78350f 100%)',
    icon: '👑',
    descriptionTr: 'Bangkok tapınakları ve ışıltılı gece zenginliği',
    descriptionEn: 'Golden temples and glistening night luxury'
  }
];

export interface AppConfig {
  organizerName: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  profilePicture?: string;
  city: string;
  cityEn: string;
  meetingPointName: string;
  meetingPointNameEn: string;
  meetingPointMapsUrl: string;
  emergencyNumbers: {
    nameTr: string;
    nameEn: string;
    number: string;
    descTr: string;
    descEn: string;
  }[];
}

export const APP_CONFIG: AppConfig = {
  organizerName: "Kadir Ezel",
  phone: "+905078017933",
  phoneDisplay: "+90 (507) 801 79 33",
  whatsappNumber: "905078017933",
  profilePicture: kadirProfileImg || "/kadir_ezel_profile.jpg",
  city: "Phuket & Tayland",
  cityEn: "Phuket & Thailand",
  meetingPointName: "Patong Beach / Kadir Ezel Tur Noktası",
  meetingPointNameEn: "Patong Beach / Kadir Ezel Meeting Point",
  meetingPointMapsUrl: "https://maps.google.com/?q=Patong+Beach+Phuket+Thailand",
  emergencyNumbers: [
    {
      nameTr: "Turist Polisi (Tourist Police)",
      nameEn: "Tourist Police",
      number: "1155",
      descTr: "7/24 İngilizce hizmet veren resmi turist koruma hattı.",
      descEn: "24/7 English-speaking official tourist assistance line."
    },
    {
      nameTr: "Genel Acil Servis & Ambulans",
      nameEn: "Medical Emergency & Ambulance",
      number: "1669",
      descTr: "Tıbbi acil durumlar için Tayland genel ambulans hattı.",
      descEn: "Nationwide medical emergency and ambulance service."
    },
    {
      nameTr: "Genel Polis İmdat",
      nameEn: "National Police",
      number: "191",
      descTr: "Tayland ulusal acil polis hattı.",
      descEn: "National emergency police contact."
    },
    {
      nameTr: "T.C. Bangkok Büyükelçiliği",
      nameEn: "Turkish Embassy Bangkok",
      number: "+6623555486",
      descTr: "Acil konsolosluk desteği ve Türk vatandaşları irtibat.",
      descEn: "Turkish Embassy in Bangkok for consular emergencies."
    }
  ]
};

export interface PlaceItem {
  id: string;
  categoryId: string;
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
  priceTr: string;
  priceEn: string;
  mapsUrl: string;
  imageUrl?: string;
  tagTr?: string;
  tagEn?: string;
  badge?: string;
  isPopular?: boolean;
}

export interface TourItem {
  id: string;
  nameTr: string;
  nameEn: string;
  durationTr: string;
  durationEn: string;
  price: string;
  descTr: string;
  descEn: string;
  highlightsTr: string[];
  highlightsEn: string[];
  meetingPointTr: string;
  meetingPointEn: string;
  mapsUrl: string;
  imageUrl?: string;
  badgeTr?: string;
  badgeEn?: string;
}

export interface CategoryData {
  id: string;
  nameTr: string;
  nameEn: string;
  iconName: string;
  descTr: string;
  descEn: string;
  badgeTr?: string;
  badgeEn?: string;
  bgColor: string;
  textColor: string;
}

export const CATEGORIES: CategoryData[] = [
  {
    id: "nightlife",
    nameTr: "Eğlence & Gece Hayatı",
    nameEn: "Entertainment & Nightlife",
    iconName: "Sparkles",
    descTr: "Bangla Road, Beach Club'lar, canlı müzik mekanları ve gece pazarları.",
    descEn: "Bangla Road, top beach clubs, live music spots, and night markets.",
    badgeTr: "Popüler",
    badgeEn: "Hot",
    bgColor: "var(--card-pink)",
    textColor: "#e11d48"
  },
  {
    id: "places",
    nameTr: "Gezilecek Yerler",
    nameEn: "Places to Visit",
    iconName: "Compass",
    descTr: "Büyük Buda, Wat Chalong, Old Phuket Town, nefes kesen seyir tepeleri.",
    descEn: "Big Buddha, Wat Chalong, Old Phuket Town, and breathtaking viewpoints.",
    badgeTr: "Kaçırma",
    badgeEn: "Must-See",
    bgColor: "var(--card-sky)",
    textColor: "#0284c7"
  },
  {
    id: "tours",
    nameTr: "Turlar & Adalar",
    nameEn: "Tours & Islands",
    iconName: "Ship",
    descTr: "Phi Phi, Maya Bay, James Bond, Similan adaları ve fil barınağı.",
    descEn: "Phi Phi, Maya Bay, James Bond, Similan islands & elephant sanctuary.",
    badgeTr: "Kadir Ezel",
    badgeEn: "Kadir Ezel",
    bgColor: "var(--card-mint)",
    textColor: "#0d9488"
  },
  {
    id: "currency",
    nameTr: "Döviz & Para Değişimi",
    nameEn: "Currency Exchange",
    iconName: "Banknote",
    descTr: "En iyi kur veren sarı ve yeşil döviz büroları, komisyonsuz ATM ipuçları.",
    descEn: "Best rate exchange booths (SuperRich / TT Currency) and ATM fee tips.",
    badgeTr: "Tasarruf",
    badgeEn: "Save $",
    bgColor: "var(--card-cream)",
    textColor: "#d97706"
  },
  {
    id: "motorbike",
    nameTr: "Motor & Scooter Kiralama",
    nameEn: "Motorbike / Scooter Rental",
    iconName: "Bike",
    descTr: "Pasaportsuz/güvenli kiralama, ehliyet kuralları, kask ve kaza sigortası.",
    descEn: "Safe rentals without passport deposit, license rules & safety tips.",
    badgeTr: "Güvenli",
    badgeEn: "Safe",
    bgColor: "var(--card-ice)",
    textColor: "#4f46e5"
  },
  {
    id: "transport",
    nameTr: "Ulaşım (Grab, Bolt, Transfer)",
    nameEn: "Transport (Grab, Bolt, Taxi)",
    iconName: "Car",
    descTr: "Havalimanı transferi, Bolt/Grab indirimleri, tuk-tuk pazarlık taktikleri.",
    descEn: "Airport private transfers, Bolt/Grab promo tips & tuk-tuk bargaining.",
    badgeTr: "Kolay",
    badgeEn: "Easy",
    bgColor: "var(--card-lavender)",
    textColor: "#7c3aed"
  },
  {
    id: "useful",
    nameTr: "Faydalı Bilgiler & SIM Kart",
    nameEn: "Useful Info & SIM Cards",
    iconName: "Info",
    descTr: "7-Eleven eSIM/SIM, priz tipi, acil numaralar, tapınak ve bahşiş kuralları.",
    descEn: "eSIM & tourist SIM, plug types, emergency numbers & cultural etiquette.",
    badgeTr: "Rehber",
    badgeEn: "Guide",
    bgColor: "var(--header-peach)",
    textColor: "#ea580c"
  }
];

export const TOURS_DATA: TourItem[] = [
  {
    id: "phi-phi-maya",
    nameTr: "Phi Phi Adaları & Maya Bay Sürat Teknesi Turu",
    nameEn: "Phi Phi Islands & Maya Bay Speedboat Tour",
    imageUrl: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=1000&q=80",
    durationTr: "Tam Gün (07:30 - 17:00)",
    durationEn: "Full Day (07:30 - 17:00)",
    price: "1,800 ฿ (~$50)",
    descTr: "The Beach filminin çekildiği efsanevi Maya Bay, Viking Mağarası, Monkey Beach, Pileh Lagoon'da yüzme ve zengin açık büfe öğle yemeği dahil.",
    descEn: "Visit the iconic Maya Bay from 'The Beach', Viking Cave, Monkey Beach, swimming in turquoise Pileh Lagoon, plus a full buffet lunch.",
    highlightsTr: [
      "Otelden gidiş-dönüş VIP transfer",
      "Milli park giriş ücretleri dahil",
      "Şnorkel takımı & can yeleği temini",
      "Öğle yemeği, meyve ve meşrubatlar"
    ],
    highlightsEn: [
      "Roundtrip hotel VIP transfer",
      "National Park entry fees included",
      "Snorkeling gear & life jackets",
      "Buffet lunch, fresh fruits & soft drinks"
    ],
    meetingPointTr: "Phuket Rassada / Chalong İskelesi (Otelinizden alınırsınız)",
    meetingPointEn: "Phuket Rassada / Chalong Pier (Pick-up from your hotel)",
    mapsUrl: "https://maps.google.com/?q=Rassada+Pier+Phuket",
    badgeTr: "En Çok Tercih Edilen",
    badgeEn: "Best Seller"
  },
  {
    id: "james-bond-bay",
    nameTr: "James Bond Adası & Phang Nga Körfezi Kano Turu",
    nameEn: "James Bond Island & Phang Nga Bay Canoeing",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80",
    durationTr: "Tam Gün (08:00 - 16:30)",
    durationEn: "Full Day (08:00 - 16:30)",
    price: "1,950 ฿ (~$55)",
    descTr: "Zümrüt yeşili Phang Nga sularında devasa kalker kayalıkları, gizli lagünlerde rehberli kano turu ve Koh Panyee yüzen Müslüman köyünde öğle yemeği.",
    descEn: "Marvel at dramatic limestone karsts in emerald waters, explore sea caves by guided canoe, and dine at the floating village of Koh Panyee.",
    highlightsTr: [
      "Ko Tapu (James Bond) kaya manzarası",
      "Rehberli deniz kanosu tecrübesi",
      "Yüzen köyde lezzetli deniz ürünleri",
      "Klimalı konforlu transfer"
    ],
    highlightsEn: [
      "Iconic James Bond rock view",
      "Guided sea canoeing through caves",
      "Delicious lunch in floating village",
      "Comfortable A/C minivan transfer"
    ],
    meetingPointTr: "Ao Po Grand Marina / Otel lobisi",
    meetingPointEn: "Ao Po Grand Marina / Hotel lobby",
    mapsUrl: "https://maps.google.com/?q=Ao+Po+Grand+Marina+Phuket",
    badgeTr: "Doğa & Macera",
    badgeEn: "Nature & Adventure"
  },
  {
    id: "elephant-sanctuary",
    nameTr: "Etik Fil Barınağı & Çamur Banyosu Deneyimi",
    nameEn: "Ethical Elephant Sanctuary & Mud Spa Experience",
    imageUrl: "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?auto=format&fit=crop&w=1000&q=80",
    durationTr: "Yarım Gün (Sabah / Öğleden Sonra)",
    durationEn: "Half Day (Morning / Afternoon)",
    price: "2,200 ฿ (~$62)",
    descTr: "Kesinlikle fil üzerine binilmeyen, kurtarılmış filleri doğal ortamında besleyebileceğiniz, çamur banyosu yaptırıp nehirde yıkayabileceğiniz etik barınak turu.",
    descEn: "100% ethical sanctuary with NO riding. Feed rescued gentle giants, enjoy natural mud spa and bathe them in river springs.",
    highlightsTr: [
      "Etik ve hayvana saygılı yaklaşım",
      "Muz ve şeker kamışı ile besleme",
      "Çamur banyosu ve nehir havuzu",
      "Tayland ev yapımı yemek ikramı"
    ],
    highlightsEn: [
      "100% ethical no-riding sanctuary",
      "Hands-on feeding with bananas",
      "Natural mud spa & fresh bath",
      "Authentic Thai buffet included"
    ],
    meetingPointTr: "Phuket Elephant Care Sanctuary / Otel lobisi",
    meetingPointEn: "Phuket Elephant Care Sanctuary / Hotel lobby",
    mapsUrl: "https://maps.google.com/?q=Phuket+Elephant+Sanctuary",
    badgeTr: "Çocuklu Aileler İçin",
    badgeEn: "Family Friendly"
  },
  {
    id: "similan-islands",
    nameTr: "Similan Adaları Efsanevi Şnorkel Turu",
    nameEn: "Similan Islands Legendary Snorkeling Trip",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
    durationTr: "Tam Gün (06:00 - 18:30 - Sezonsal)",
    durationEn: "Full Day (06:00 - 18:30 - Seasonal)",
    price: "2,700 ฿ (~$76)",
    descTr: "Dünyanın en berrak sularında deniz kaplumbağalarıyla yüzme fırsatı. Yelken Kayası (Sail Rock) manzarası ve pudra yumuşaklığında bembeyaz kumsallar.",
    descEn: "Swim with sea turtles in crystal-clear waters. Discover the iconic Sail Rock and walk on powdery white pristine beaches.",
    highlightsTr: [
      "Deniz kaplumbağaları ile şnorkel",
      "Dünyaca ünlü Sail Rock seyir terası",
      "Sabah kahvaltısı ve öğle yemeği",
      "Hızlı ve yeni nesil sürat teknesi"
    ],
    highlightsEn: [
      "Snorkel with wild sea turtles",
      "Famous Sail Rock viewpoint",
      "Breakfast, lunch & snacks included",
      "Fast modern speedboat fleet"
    ],
    meetingPointTr: "Thap Lamu İskelesi / Otelden transfer",
    meetingPointEn: "Thap Lamu Pier / Hotel pick-up",
    mapsUrl: "https://maps.google.com/?q=Thap+Lamu+Pier+Phang+Nga",
    badgeTr: "Kristal Sular",
    badgeEn: "Crystal Waters"
  },
  {
    id: "phuket-city-tour",
    nameTr: "Phuket VIP Şehir Turu, Big Buddha & Wat Chalong",
    nameEn: "Phuket VIP City Tour, Big Buddha & Wat Chalong",
    imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80",
    durationTr: "5 - 6 Saat (Özel Klimalı Araç)",
    durationEn: "5 - 6 Hours (Private A/C Minivan)",
    price: "1,500 ฿ (~$42)",
    descTr: "45 metrelik dev mermer Big Buddha heykeli, adanın en kutsal tapınağı Wat Chalong, Karon View Point ve renkli tarihi Old Phuket Town sokakları.",
    descEn: "Visit the 45m Big Buddha marble statue, the sacred Wat Chalong temple, Karon Viewpoint, and historic colorful Sino-Portuguese Old Town.",
    highlightsTr: [
      "Özel şoförlü klimalı araç",
      "Fotoğraf çekimi için duraklar",
      "Kaju fıstığı fabrikası tadımı",
      "Kendi temponuza göre serbest zaman"
    ],
    highlightsEn: [
      "Private air-conditioned car & driver",
      "Best photo viewpoints",
      "Cashew nut factory tasting",
      "Flexible schedule at your own pace"
    ],
    meetingPointTr: "Otelinizden özel araçla alınış",
    meetingPointEn: "Private pick-up directly at your hotel",
    mapsUrl: "https://maps.google.com/?q=Big+Buddha+Phuket",
    badgeTr: "Kültür & Şehir",
    badgeEn: "Culture & City"
  },
  {
    id: "racha-coral-sunset",
    nameTr: "Racha & Coral Adaları Katamaran Gün Batımı Turu",
    nameEn: "Racha & Coral Island Catamaran Sunset Cruise",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    durationTr: "Yarım Gün (11:30 - 19:00)",
    durationEn: "Half Day (11:30 - 19:00)",
    price: "2,100 ฿ (~$59)",
    descTr: "Lüks yelkenli katamaranda DJ müziği, Coral adasında su sporları (parasailing/banana boat) ve Promthep Burnu açıklarında unutulmaz gün batımı.",
    descEn: "Sail on a luxury sailing catamaran with cool vibes, enjoy water sports on Coral Island, and witness legendary Promthep Cape sunset.",
    highlightsTr: [
      "Lüks katamaranda file üzerinde güneşlenme",
      "Denizde gün batımı şampanya/içecek",
      "Balık avı ve şnorkel aktivitesi",
      "Akşam yemeği büfesi dahil"
    ],
    highlightsEn: [
      "Lounge nets on luxury catamaran",
      "Sunset drinks off Promthep Cape",
      "Fishing & snorkeling gear",
      "Sunset barbecue dinner buffet"
    ],
    meetingPointTr: "Chalong İskelesi / Otel Transferi",
    meetingPointEn: "Chalong Pier / Hotel Transfer",
    mapsUrl: "https://maps.google.com/?q=Chalong+Pier+Phuket",
    badgeTr: "Romantik & Lüks",
    badgeEn: "Romantic Cruise"
  }
];

export const PLACE_ITEMS: PlaceItem[] = [
  // 1. Entertainment & Nightlife
  {
    id: "bangla-road",
    categoryId: "nightlife",
    nameTr: "Bangla Road (Patong Gece Hayatı Merkezi)",
    nameEn: "Bangla Road (Heart of Patong Nightlife)",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    descTr: "Phuket'in en ünlü caddesi. Canlı müzik kulüpleri, neon ışıklar, sokak şovları ve gece kulüpleriyle sabaha kadar hareketli.",
    descEn: "The undisputed epicenter of Phuket nightlife with live bands, rooftop bars, neon lights, and world-class nightclubs.",
    priceTr: "Girişler ücretsiz, biralar 100-180 ฿",
    priceEn: "Free entrance, beers 100-180 ฿",
    mapsUrl: "https://maps.google.com/?q=Bangla+Road+Patong+Phuket",
    tagTr: "Gece Kulüpleri",
    tagEn: "Clubs & Bars",
    badge: "1 Numaralı Merkez",
    isPopular: true
  },
  {
    id: "cafe-del-mar",
    categoryId: "nightlife",
    nameTr: "Café Del Mar Phuket (Kamala Beach Club)",
    nameEn: "Café Del Mar Phuket (Kamala Beach Club)",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    descTr: "Plaj kenarında lüks şezlonglar, uluslararası DJ performansları, gurme Akdeniz & sushi menüsü ve gün batımı partileri.",
    descEn: "Upscale beachfront venue offering international guest DJs, daybeds by the pool, sushi, cocktails, and sunset sessions.",
    priceTr: "Kokteyller 320-450 ฿, Şezlong min harcama",
    priceEn: "Cocktails 320-450 ฿, Daybeds min spend",
    mapsUrl: "https://maps.google.com/?q=Cafe+Del+Mar+Phuket",
    tagTr: "Beach Club",
    tagEn: "Beach Club",
    badge: "Lüks Ortam",
    isPopular: true
  },
  {
    id: "illuzion-club",
    categoryId: "nightlife",
    nameTr: "Illuzion Phuket (Dünya Top 100 Kulüp)",
    nameEn: "Illuzion Phuket (Top 100 World Club)",
    imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80",
    descTr: "DJ Mag sıralamasında yer alan mega gece kulübü. Devasa ses-ışık sistemi ve dünyaca ünlü DJ konukları.",
    descEn: "Ranked among top clubs worldwide. Incredible sound, LED visuals, acrobats, and top EDM/Hip-hop headliners.",
    priceTr: "Genelde ücretsiz / Özel gecelerde 400-800 ฿",
    priceEn: "Usually free / Special events 400-800 ฿",
    mapsUrl: "https://maps.google.com/?q=Illuzion+Phuket",
    tagTr: "Gece Kulübü",
    tagEn: "Mega Club",
    badge: "Top 100 DJ Mag"
  },
  {
    id: "chillva-market",
    categoryId: "nightlife",
    nameTr: "Chillva Market Phuket (Genç & Canlı Gece Pazarı)",
    nameEn: "Chillva Market Phuket (Trendy Night Market)",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    descTr: "Konteyner dükkanlar, yerel sokak lezzetleri, butik kıyafetler ve canlı akustik Tayland müzikleri.",
    descEn: "Bohemian container market filled with delicious street food snacks, hipster clothes, craft stalls, and acoustic live music.",
    priceTr: "Yemek porsiyonları 50-120 ฿",
    priceEn: "Food snacks 50-120 ฿",
    mapsUrl: "https://maps.google.com/?q=Chillva+Market+Phuket",
    tagTr: "Gece Pazarı",
    tagEn: "Night Market",
    badge: "Lezzet & Alışveriş"
  },

  // 2. Places to Visit
  {
    id: "big-buddha",
    categoryId: "places",
    nameTr: "Phuket Büyük Buda (The Big Buddha)",
    nameEn: "Phuket Big Buddha",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    descTr: "Nakkerd Tepesi'nde 45 metre yüksekliğindeki beyaz mermer heykel. Chalong ve Kata koylarını 360 derece izleyin.",
    descEn: "Majestic 45-meter tall white marble statue on top of Nakkerd Hills offering panoramic 360-degree views across the island.",
    priceTr: "Giriş Ücretsiz (Omuz ve diz örtülü olmalı)",
    priceEn: "Free Entry (Shoulders & knees must be covered)",
    mapsUrl: "https://maps.google.com/?q=Big+Buddha+Phuket",
    tagTr: "Kutsal Anıt",
    tagEn: "Iconic Monument",
    badge: "En Yüksek Tepe",
    isPopular: true
  },
  {
    id: "wat-chalong",
    categoryId: "places",
    nameTr: "Wat Chalong Tapınağı (Chaithararam)",
    nameEn: "Wat Chalong Temple",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    descTr: "Phuket'in en büyük ve en önemli Budist tapınağı. Altın işlemeli pagodası ve Buda'nın kutsal emanetine ev sahipliği yapar.",
    descEn: "The largest, most revered temple in Phuket. Features stunning architecture, gilded shrines, and a peaceful sacred atmosphere.",
    priceTr: "Giriş Ücretsiz (Bağış serbest)",
    priceEn: "Free Entry (Donations welcome)",
    mapsUrl: "https://maps.google.com/?q=Wat+Chalong+Phuket",
    tagTr: "Budist Tapınağı",
    tagEn: "Buddhist Temple",
    badge: "Tarihi Miras"
  },
  {
    id: "old-phuket-town",
    categoryId: "places",
    nameTr: "Tarihi Old Phuket Town (Thalang Road)",
    nameEn: "Old Phuket Town (Thalang Road)",
    imageUrl: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80",
    descTr: "Pastel renkli Çin-Portekiz evleri, sanat galerileri, şık kafeler ve pazar akşamları kurulan Lard Yai yürüyüş caddesi.",
    descEn: "Charming Sino-Portuguese shophouses, trendy cafes, colorful street murals, and Sunday walking street street food.",
    priceTr: "Gezinti ücretsiz, kafeler 80-160 ฿",
    priceEn: "Free walk, cafes 80-160 ฿",
    mapsUrl: "https://maps.google.com/?q=Old+Phuket+Town+Thalang+Road",
    tagTr: "Fotoğraf & Kültür",
    tagEn: "Culture & Cafes",
    badge: "Fotojenik",
    isPopular: true
  },
  {
    id: "promthep-cape",
    categoryId: "places",
    nameTr: "Promthep Cape (Phuket Gün Batımı Noktası)",
    nameEn: "Promthep Cape (Best Sunset Viewpoint)",
    imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
    descTr: "Tayland'ın en çok fotoğraflanan gün batımı manzarası. Andaman Denizi üzerinde güneşin batışını izlemek için 17:45'te orada olun.",
    descEn: "Thailand's most famous sunset viewpoint. Be there around 17:45 for spectacular sea views over the Andaman horizon.",
    priceTr: "Giriş Ücretsiz",
    priceEn: "Free Entry",
    mapsUrl: "https://maps.google.com/?q=Promthep+Cape+Phuket",
    tagTr: "Manzara Tepesi",
    tagEn: "Sunset Viewpoint",
    badge: "Efsane Gün Batımı"
  },

  // 3. Tours (Quick shortcuts in category)
  {
    id: "phi-phi-shortcut",
    categoryId: "tours",
    nameTr: "Phi Phi Adaları & Maya Bay Hızlı Tekne",
    nameEn: "Phi Phi Islands & Maya Bay Speedboat",
    imageUrl: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=800&q=80",
    descTr: "Kadir Ezel güvencesiyle en iyi tekneler, rehberlik ve otel transferi dahil paket tur.",
    descEn: "Premium speedboat tour with hotel pickup, national park fees, and lunch included.",
    priceTr: "1,800 ฿ (~$50)",
    priceEn: "1,800 ฿ (~$50)",
    mapsUrl: "https://maps.google.com/?q=Rassada+Pier+Phuket",
    tagTr: "Günübirlik Ada",
    tagEn: "Island Day Trip",
    badge: "Popüler Tur",
    isPopular: true
  },
  {
    id: "james-bond-shortcut",
    categoryId: "tours",
    nameTr: "James Bond Adası & Kano Macerası",
    nameEn: "James Bond Island & Sea Canoeing",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    descTr: "Phang Nga körfezinde mağara kanosu, yüzen Müslüman köyü ve film seti kayalığı.",
    descEn: "Explore Phang Nga bay limestone caves by canoe and visit the floating village.",
    priceTr: "1,950 ฿ (~$55)",
    priceEn: "1,950 ฿ (~$55)",
    mapsUrl: "https://maps.google.com/?q=Ao+Po+Grand+Marina+Phuket",
    tagTr: "Kano & Mağara",
    tagEn: "Canoe & Cave"
  },

  // 4. Currency Exchange
  {
    id: "tt-currency-exchange",
    categoryId: "currency",
    nameTr: "TT Currency Exchange (Sarı Bürolar)",
    nameEn: "TT Currency Exchange (Yellow Booths)",
    imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80",
    descTr: "Phuket genelinde (Patong, Kata, Karon) bankalardan ve havalimanından %5-8 daha yüksek kur veren güvenilir zincir.",
    descEn: "Reliable exchange chain across Patong and Phuket offering 5-8% better rates than airport counters.",
    priceTr: "Komisyonsuz net kur (EUR, USD, GBP kabul)",
    priceEn: "No commission, best rates for EUR, USD, GBP",
    mapsUrl: "https://maps.google.com/?q=TT+Currency+Exchange+Patong",
    tagTr: "En İyi Kur",
    tagEn: "Best Rates",
    badge: "Tavsiye",
    isPopular: true
  },
  {
    id: "superrich-thailand",
    categoryId: "currency",
    nameTr: "SuperRich Thailand (Yeşil / Turuncu)",
    nameEn: "SuperRich Thailand (Green / Orange)",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    descTr: "Tayland'ın en iyi döviz kuru veren efsanevi kurumu. Büyük miktarlar bozdururken mutlaka ilk tercih edilmeli.",
    descEn: "Legendary foreign exchange brand offering the closest to market interbank rates in Thailand.",
    priceTr: "En yüksek Baht karşılığı",
    priceEn: "Highest Baht exchange value",
    mapsUrl: "https://maps.google.com/?q=Superrich+Thailand+Exchange",
    tagTr: "Resmi Döviz",
    tagEn: "Official Exchange",
    badge: "En Yüksek Baht"
  },
  {
    id: "atm-withdrawal-tip",
    categoryId: "currency",
    nameTr: "ATM Para Çekme & Kur İpucu (Önemli!)",
    nameEn: "ATM Cash Withdrawal & DCC Tip (Crucial)",
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80",
    descTr: "ATM'den para çekerken 'Without Conversion / Don't Convert' seçeneğini tıklayın! Aksi halde banka %6-9 gizli kur farkı keser. Sabit ATM ücreti 220 ฿'dir.",
    descEn: "Always select 'Without Conversion' when withdrawing from Thai ATMs. Fixed ATM foreign card fee is 220 ฿ per transaction.",
    priceTr: "Sabit ücret 220 ฿ (Tek seferde 20.000 ฿ çekin)",
    priceEn: "Fixed 220 ฿ fee (Withdraw 20,000 ฿ at once)",
    mapsUrl: "https://maps.google.com/?q=Bangkok+Bank+ATM+Phuket",
    tagTr: "Önemli İpucu",
    tagEn: "Money Tip",
    badge: "Para Kurtarır"
  },

  // 5. Motorbike / Scooter Rental
  {
    id: "kadir-ezel-moto",
    categoryId: "motorbike",
    nameTr: "Kadir Ezel Motor & Scooter Kiralama Noktası",
    nameEn: "Kadir Ezel Motorbike & Scooter Service",
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    descTr: "Pasaportunuzu rehin vermeden, yeni model Honda Click / PCX motorlar, temiz 2 kask ve Türkçe sözleşme desteği.",
    descEn: "Safe motorbike rentals without leaving original passport. Late-model Honda Click / PCX scooters with clean helmets.",
    priceTr: "250 - 450 ฿ / Günlük (Modeline göre)",
    priceEn: "250 - 450 ฿ / Day (Depending on model)",
    mapsUrl: "https://maps.google.com/?q=Patong+Beach+Phuket",
    tagTr: "Pasaportsöz Rehin",
    tagEn: "No Passport Hold",
    badge: "Kadir Ezel Güvencesi",
    isPopular: true
  },
  {
    id: "moto-safety-rules",
    categoryId: "motorbike",
    nameTr: "Motor Kullanımı & Polis Kontrol Kuralları",
    nameEn: "Motorbike Traffic Rules & Police Checks",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    descTr: "Kasksız sürmek 1,000 ฿ ceza, uluslararası ehliyet (A sınıfı) kontrolü sık yapılır. Trafik sol taraftan akar, kavşaklara dikkat!",
    descEn: "Helmet is strictly mandatory (1,000 ฿ fine). Drive on the left side of the road. International Driving Permit recommended.",
    priceTr: "Kask takmak zorunlu!",
    priceEn: "Helmet mandatory!",
    mapsUrl: "https://maps.google.com/?q=Phuket+Tourist+Police+Station",
    tagTr: "Trafik Kuralları",
    tagEn: "Traffic Rules",
    badge: "Dikkat"
  },

  // 6. Transport
  {
    id: "bolt-app",
    categoryId: "transport",
    nameTr: "Bolt & InDrive Uygulamaları (En Ucuz Taksi)",
    nameEn: "Bolt & InDrive Apps (Cheapest Taxi)",
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    descTr: "Sokaktaki taksilere göre %40-60 daha uygundur. Havalimanı veya plajlar arası araç çağırmak için en pratik yöntemdir.",
    descEn: "Usually 40-60% cheaper than metered road taxis or street tuk-tuks. Fast arrival and fixed transparent pricing.",
    priceTr: "Plajlar arası 120-250 ฿",
    priceEn: "Between beaches 120-250 ฿",
    mapsUrl: "https://maps.google.com/?q=Phuket+Airport",
    tagTr: "Mobil Uygulama",
    tagEn: "Mobile App",
    badge: "En Ekonomik",
    isPopular: true
  },
  {
    id: "grab-app",
    categoryId: "transport",
    nameTr: "Grab Uygulaması (Geniş Araç Filosu)",
    nameEn: "Grab SuperApp (Largest Fleet)",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    descTr: "Tayland'ın Uber'i. Kredi kartı ekleyebilir, yemek ve market siparişi de verebilirsiniz. Biraz daha pahalı ama araç sayısı en yüksek.",
    descEn: "The Uber of Southeast Asia. Accepts credit cards, has food delivery, and guarantees quick driver pickup anywhere.",
    priceTr: "Plajlar arası 180-350 ฿",
    priceEn: "Between beaches 180-350 ฿",
    mapsUrl: "https://maps.google.com/?q=Patong+Phuket",
    tagTr: "Ulaşım & Yemek",
    tagEn: "Rides & Food",
    badge: "Geniş Ağ"
  },
  {
    id: "private-airport-transfer",
    categoryId: "transport",
    nameTr: "Özel Havalimanı VIP Transferi (Kadir Ezel)",
    nameEn: "Private Airport VIP Transfer (Kadir Ezel)",
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    descTr: "İsimli tabela ile kapıda karşılama, klimalı geniş VIP minivan veya sedan araç. Gece uçuşlarında gecikmesiz transfer.",
    descEn: "Nameboard meet & greet at terminal exit, spacious air-conditioned VIP van or sedan. Direct door-to-door to your hotel.",
    priceTr: "700 - 1,000 ฿ (Bölgeye göre araç başı)",
    priceEn: "700 - 1,000 ฿ (Per car depending on area)",
    mapsUrl: "https://maps.google.com/?q=Phuket+International+Airport",
    tagTr: "VIP Karşılama",
    tagEn: "VIP Meet & Greet",
    badge: "Önerilir",
    isPopular: true
  },
  {
    id: "tuktuk-bargaining",
    categoryId: "transport",
    nameTr: "Phuket Kırmızı Tuk-Tuk Deneyimi",
    nameEn: "Phuket Red Tuk-Tuk Experience",
    imageUrl: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80",
    descTr: "Bangkok'taki gibi üç tekerli değil, 4 tekerli küçük kamyonetlerdir. Binmeden önce mutlaka gideceğiniz yeri ve fiyatı netleştirin!",
    descEn: "Phuket tuk-tuks are small 4-wheel open minivans with colorful music and lights. Always agree on price before stepping inside!",
    priceTr: "Kısa mesafe 200 ฿, plajlar arası 400 ฿",
    priceEn: "Short ride 200 ฿, beach hopping 400 ฿",
    mapsUrl: "https://maps.google.com/?q=Patong+Beach+Road",
    tagTr: "Yerel Deneyim",
    tagEn: "Local Ride",
    badge: "Pazarlık Yapın"
  },

  // 7. Useful Info
  {
    id: "sim-card-7eleven",
    categoryId: "useful",
    nameTr: "7-Eleven Tourist SIM & eSIM (TrueMove / AIS)",
    nameEn: "7-Eleven Tourist SIM & eSIM (TrueMove / AIS)",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80",
    descTr: "Havalimanında 600-800 ฿ ödemek yerine sokaktaki herhangi bir 7-Eleven marketten pasaportunuzu göstererek 200-300 ฿'ye sınırsız internetli SIM alın.",
    descEn: "Skip expensive airport kiosks! Pop into any 7-Eleven with your passport to get a 8-15 day unlimited data SIM for only 200-300 ฿.",
    priceTr: "200 - 350 ฿ (8-15 gün sınırsız 5G)",
    priceEn: "200 - 350 ฿ (8-15 days unlimited 5G)",
    mapsUrl: "https://maps.google.com/?q=7-Eleven+Patong+Phuket",
    tagTr: "İnternet & SIM",
    tagEn: "Internet & SIM",
    badge: "Yarı Fiyatına",
    isPopular: true
  },
  {
    id: "temple-etiquette",
    categoryId: "useful",
    nameTr: "Tapınak Kuralları & Kültürel Nezaket",
    nameEn: "Temple Etiquette & Cultural Rules",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    descTr: "Tapınaklara girerken ayakkabılar çıkarılır, omuz ve dizler örtülü olmalıdır. Asla birinin kafasına dokunmayın ve ayak tabanınızı Buda heykeline doğru uzatmayın.",
    descEn: "Remove shoes before entering temples. Cover knees and shoulders. Never touch anyone's head or point your feet toward Buddha images.",
    priceTr: "Ücretsiz saygı kuralı",
    priceEn: "Respectful dress code",
    mapsUrl: "https://maps.google.com/?q=Wat+Chalong+Phuket",
    tagTr: "Kültür Kuralları",
    tagEn: "Cultural Etiquette",
    badge: "Önemli Bilgi"
  },
  {
    id: "power-socket-water",
    categoryId: "useful",
    nameTr: "Priz Tipi & Musluk Suyu Uyarısı",
    nameEn: "Power Plugs & Tap Water Warning",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    descTr: "Tayland'da prizler Türkiye'deki (Avrupa C/F) fişlere uygundur, dönüştürücüye gerek yoktur. Musluk suyu içilmez; diş fırçalarken bile şişe suyu tercih edin.",
    descEn: "Plugs accommodate EU two-pin plugs. Tap water is NOT drinkable in Thailand; always use bottled water for drinking and brushing teeth.",
    priceTr: "Şişe su 7-Eleven'da 7-14 ฿",
    priceEn: "Bottled water 7-14 ฿ at 7-Eleven",
    mapsUrl: "https://maps.google.com/?q=7-Eleven+Phuket",
    tagTr: "Pratik Bilgi",
    tagEn: "Practical Info",
    badge: "Sağlık İpucu"
  }
];
