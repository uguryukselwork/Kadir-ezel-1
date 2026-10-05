import { Language, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย', flag: '🇹🇭' }
];

type Translations = Record<string, Record<Language, string>>;

export const TRANSLATIONS: Translations = {
  appName: {
    tr: 'Kadir Thai',
    en: 'Kadir Thai',
    ru: 'Kadir Thai',
    de: 'Kadir Thai',
    fr: 'Kadir Thai',
    ar: 'كادير تايلاند',
    zh: 'Kadir Thai',
    th: 'คาดีร์ ไทย'
  },
  guideBadge: {
    tr: 'Rehber',
    en: 'Guide',
    ru: 'Гид',
    de: 'Reiseführer',
    fr: 'Guide',
    ar: 'دليل',
    zh: '指南',
    th: 'คู่มือ'
  },
  welcomeHeader: {
    tr: "Tayland'a Hoş Geldiniz! 🇹🇭",
    en: 'Welcome to Thailand! 🇹🇭',
    ru: 'Добро пожаловать в Таиланд! 🇹🇭',
    de: 'Willkommen in Thailand! 🇹🇭',
    fr: 'Bienvenue en Thaïlande ! 🇹🇭',
    ar: 'مرحباً بكم في تايلاند! 🇹🇭',
    zh: '欢迎来到泰国！🇹🇭',
    th: 'ยินดีต้อนรับสู่ประเทศไทย! 🇹🇭'
  },
  welcomeSub: {
    tr: 'Ada turları, motor kiralama, VIP transfer ve 7/24 tatil rehberliği tek tık uzağınızda.',
    en: 'Island tours, scooter rentals, VIP transfers, and 24/7 personal travel guidance.',
    ru: 'Островные туры, аренда скутеров, VIP-трансферы и круглосуточная поддержка.',
    de: 'Inseltouren, Rollerverleih, VIP-Transfers und persönliche 24/7-Reisebetreuung.',
    fr: 'Excursions dans les îles, location de scooters, transferts VIP et assistance 24/7.',
    ar: 'جولات الجزر، استئجار الدراجات، التوصيل الخاص، ودعم وإرشاد على مدار الساعة.',
    zh: '海岛游览、摩托车租赁、贵宾接送及24小时全天候旅行指导。',
    th: 'ทัวร์เกาะ เช่ามอเตอร์ไซค์ รถรับส่ง VIP และบริการดูแลตลอด 24 ชั่วโมง'
  },
  bookNow: {
    tr: 'Rezervasyon Yap',
    en: 'Book Now',
    ru: 'Забронировать',
    de: 'Jetzt buchen',
    fr: 'Réserver',
    ar: 'احجز الآن',
    zh: '立即预订',
    th: 'จองตอนนี้'
  },
  tourOrganizer: {
    tr: 'Tur Organizatörü:',
    en: 'Tour Organizer:',
    ru: 'Организатор туров:',
    de: 'Veranstalter:',
    fr: 'Organisateur de circuit :',
    ar: 'منظم الرحلات:',
    zh: '行程组织者：',
    th: 'ผู้จัดทัวร์:'
  },
  meetingLocation: {
    tr: 'Buluşma Noktası / Konum',
    en: 'Meeting Point / Location',
    ru: 'Место встречи / Локация',
    de: 'Treffpunkt / Standort',
    fr: 'Point de rendez-vous / Lieu',
    ar: 'نقطة الالتقاء / الموقع',
    zh: '集合地点 / 位置',
    th: 'จุดนัดพบ / พิกัด'
  },
  openInMaps: {
    tr: "Google Haritalar'da Aç",
    en: 'Open in Google Maps',
    ru: 'Открыть на Google Картах',
    de: 'In Google Maps öffnen',
    fr: 'Ouvrir sur Google Maps',
    ar: 'افتح في خرائط جوجل',
    zh: '在谷歌地图中打开',
    th: 'เปิดใน Google Maps'
  },
  directCall: {
    tr: 'Hemen Ara',
    en: 'Direct Call',
    ru: 'Позвонить',
    de: 'Anrufen',
    fr: 'Appeler',
    ar: 'اتصال مباشر',
    zh: '直接致电',
    th: 'โทรทันที'
  },
  searchPlaceholder: {
    tr: 'Mekan, plaj, döviz, motor veya ipucu ara...',
    en: 'Search places, beaches, currency, bikes...',
    ru: 'Поиск мест, пляжей, валюты, байков...',
    de: 'Orte, Strände, Währung, Roller suchen...',
    fr: 'Rechercher lieux, plages, devises, scooters...',
    ar: 'ابحث عن الأماكن، الشواطئ، الصرافة، الدراجات...',
    zh: '搜索景点、海滩、货币兑换、摩托车...',
    th: 'ค้นหาสถานที่ ชายหาด แลกเงิน เช่ารถ...'
  },
  categoriesTitle: {
    tr: 'Kategoriler & Rehber',
    en: 'Categories & Guide',
    ru: 'Категории и гид',
    de: 'Kategorien & Tipps',
    fr: 'Catégories & Guide',
    ar: 'الفئات والدليل',
    zh: '分类与指南',
    th: 'หมวดหมู่และข้อมูล'
  },
  popularToursTitle: {
    tr: 'Tayland Ada & Macera Turları',
    en: 'Thailand Island & Adventure Tours',
    ru: 'Островные и приключенческие туры',
    de: 'Thailand Insel- & Abenteuertouren',
    fr: 'Circuits d’îles et d’aventures en Thaïlande',
    ar: 'جولات الجزر والمغامرات في تايلاند',
    zh: '泰国海岛与探险之旅',
    th: 'ทัวร์เกาะและการผจญภัยในไทย'
  },
  popularToursSub: {
    tr: 'Tüm turlarda konforlu transfer, şnorkel takımı ve lisanslı rehberlik dahildir.',
    en: 'All tours include comfortable transfer, snorkeling equipment, and licensed guides.',
    ru: 'Все туры включают комфортный трансфер, снаряжение и лицензированных гидов.',
    de: 'Alle Touren beinhalten bequemen Transfer, Schnorchelausrüstung und Reiseleitung.',
    fr: 'Tous les circuits comprennent le transfert, l’équipement et un guide agréé.',
    ar: 'تشمل جميع الجولات النقل المريح ومعدات الغطس والمرشدين المرخصين.',
    zh: '所有行程均包含舒适接送、浮潜装备和专业持证导游。',
    th: 'ทุกทัวร์รวมรถรับส่ง อุปกรณ์ดำน้ำ และไกด์มืออาชีพ'
  },
  detailsButton: {
    tr: 'Buluşma & Bilgi',
    en: 'Meeting & Details',
    ru: 'Встреча и детали',
    de: 'Treffpunkt & Details',
    fr: 'Détails & Point',
    ar: 'التفاصيل ونقطة اللقاء',
    zh: '集合与详情',
    th: 'จุดนัดพบและรายละเอียด'
  },
  perPerson: {
    tr: '/ Kişi Başı',
    en: '/ Per Person',
    ru: '/ С человека',
    de: '/ Pro Person',
    fr: '/ Par personne',
    ar: '/ للشخص الواحد',
    zh: '/ 每人',
    th: '/ ต่อคน'
  },
  selectLanguageTitle: {
    tr: 'Dil Seçin',
    en: 'Select Language',
    ru: 'Выберите язык',
    de: 'Sprache wählen',
    fr: 'Choisir la langue',
    ar: 'اختر اللغة',
    zh: '选择语言',
    th: 'เลือกภาษา'
  },
  tabHome: {
    tr: 'Rehber',
    en: 'Guide',
    ru: 'Гид',
    de: 'Guide',
    fr: 'Guide',
    ar: 'الرئيسية',
    zh: '指南',
    th: 'หน้าหลัก'
  },
  tabTours: {
    tr: 'Turlar',
    en: 'Tours',
    ru: 'Туры',
    de: 'Touren',
    fr: 'Circuits',
    ar: 'الجولات',
    zh: '行程',
    th: 'ทัวร์'
  },
  tabRequest: {
    tr: 'Rezervasyon',
    en: 'Booking',
    ru: 'Бронь',
    de: 'Buchung',
    fr: 'Réservation',
    ar: 'الحجز',
    zh: '预订',
    th: 'จอง'
  },
  tabOrganizer: {
    tr: 'Kadir Ezel',
    en: 'Organizer',
    ru: 'Кадир',
    de: 'Kontakt',
    fr: 'Contact',
    ar: 'المنظم',
    zh: '组织者',
    th: 'ผู้จัด'
  },
  tabCurrency: {
    tr: 'Döviz',
    en: 'Currency',
    ru: 'Валюта',
    de: 'Währung',
    fr: 'Devises',
    ar: 'العملات',
    zh: '汇率',
    th: 'ค่าเงิน'
  },
  tabAdmin: {
    tr: 'Yönetim',
    en: 'Admin',
    ru: 'Админ',
    de: 'Admin',
    fr: 'Admin',
    ar: 'الإدارة',
    zh: '管理',
    th: 'จัดการ'
  },
  close: {
    tr: 'Kapat',
    en: 'Close',
    ru: 'Закрыть',
    de: 'Schließen',
    fr: 'Fermer',
    ar: 'إغلاق',
    zh: '关闭',
    th: 'ปิด'
  },
  submitReservation: {
    tr: 'Rezervasyonu Onayla',
    en: 'Confirm Booking',
    ru: 'Подтвердить бронь',
    de: 'Buchung bestätigen',
    fr: 'Confirmer la réservation',
    ar: 'تأكيد الحجز',
    zh: '确认预订',
    th: 'ยืนยันการจอง'
  },
  fullNameLabel: {
    tr: 'Adınız ve Soyadınız',
    en: 'Full Name',
    ru: 'Имя и фамилия',
    de: 'Vor- und Nachname',
    fr: 'Nom et prénom',
    ar: 'الاسم الكامل',
    zh: '全名',
    th: 'ชื่อ-นามสกุล'
  },
  phoneLabel: {
    tr: 'Telefon Numaranız',
    en: 'Phone Number',
    ru: 'Номер телефона',
    de: 'Telefonnummer',
    fr: 'Numéro de téléphone',
    ar: 'رقم الهاتف',
    zh: '电话号码',
    th: 'เบอร์โทรศัพท์'
  },
  countryFromLabel: {
    tr: 'Hangi Ülkeden Geldiniz?',
    en: 'Which country are you from?',
    ru: 'Из какой вы страны?',
    de: 'Aus welchem Land kommen Sie?',
    fr: 'De quel pays venez-vous ?',
    ar: 'من أي بلد أنت؟',
    zh: '你来自哪个国家？',
    th: 'คุณมาจากประเทศอะไร?'
  },
  requestTypeLabel: {
    tr: 'Talep Türü',
    en: 'Request Type',
    ru: 'Тип запроса',
    de: 'Anfrage-Typ',
    fr: 'Type de demande',
    ar: 'نوع الطلب',
    zh: '需求类型',
    th: 'ประเภทความต้องการ'
  },
  dateLabel: {
    tr: 'Tarih',
    en: 'Date',
    ru: 'Дата',
    de: 'Datum',
    fr: 'Date',
    ar: 'التاريخ',
    zh: '日期',
    th: 'วันที่'
  },
  guestsLabel: {
    tr: 'Kişi Sayısı',
    en: 'Guests',
    ru: 'Количество гостей',
    de: 'Anzahl der Personen',
    fr: 'Nombre de personnes',
    ar: 'عدد الضيوف',
    zh: '人数',
    th: 'จำนวนคน'
  },
  messageLabel: {
    tr: 'Mesajınız / Notlar',
    en: 'Message / Notes',
    ru: 'Сообщение / Заметки',
    de: 'Nachricht / Notizen',
    fr: 'Message / Notes',
    ar: 'الرسالة / ملاحظات',
    zh: '留言 / 备注',
    th: 'ข้อความ / หมายเหตุ'
  },
  autofillButton: {
    tr: 'Otomatik Doldur',
    en: 'Quick Autofill',
    ru: 'Автозаполнение',
    de: 'Autom. Ausfüllen',
    fr: 'Remplissage auto',
    ar: 'ملء تلقائي',
    zh: '自动填充',
    th: 'เติมข้อมูลอัตโนมัติ'
  },
  tourPrice: {
    tr: 'Tur Ücreti',
    en: 'Tour Price',
    ru: 'Цена тура',
    de: 'Tour-Preis',
    fr: 'Prix du circuit',
    ar: 'سعر الجولة',
    zh: '行程价格',
    th: 'ราคาหลัก'
  },
  selectedTour: {
    tr: 'Seçilen Tur:',
    en: 'Selected Tour:',
    ru: 'Выбранный тур:',
    de: 'Ausgewählte Tour:',
    fr: 'Circuit sélectionné :',
    ar: 'الجولة المختارة:',
    zh: '已选行程：',
    th: 'ทัวร์ที่เลือก:'
  },
  organizerTrustDesc: {
    tr: 'Türkçe ve İngilizce 7/24 kesintisiz iletişim & güvenilir transfer',
    en: '24/7 Turkish & English support with reliable transfers',
    ru: 'Поддержка 24/7 на турецком и английском и надежный трансфер',
    de: '24/7 Unterstützung auf Türkisch & Englisch mit zuverlässigen Transfers',
    fr: 'Assistance 24/7 en turc et anglais avec transferts fiables',
    ar: 'دعم باللغتين التركية والإنجليزية على مدار الساعة مع توصيل موثوق',
    zh: '24/7 土耳其语和英语支持，提供可靠的接送服务',
    th: 'บริการช่วยเหลือ 24 ชม. ภาษาตุรกีและอังกฤษ พร้อมรถรับส่งที่เชื่อถือได้'
  },
  contactOrganizer: {
    tr: 'Kadir Ezel ile İletişime Geç',
    en: 'Contact Kadir Ezel',
    ru: 'Связаться с Кадиром',
    de: 'Kontakt Kadir Ezel',
    fr: 'Contacter Kadir Ezel',
    ar: 'اتصل بكادير إيزيل',
    zh: '联系 Kadir Ezel',
    th: 'ติดต่อ คาดีร์'
  },
  phoneCallLabel: {
    tr: 'Telefon / Çağrı',
    en: 'Phone / Call',
    ru: 'Телефон / Вызов',
    de: 'Telefon / Anruf',
    fr: 'Téléphone / Appel',
    ar: 'الهاتف / مكالمة',
    zh: '电话 / 呼叫',
    th: 'โทรศัพท์ / โทร'
  },
  callButton: {
    tr: 'Ara',
    en: 'Call',
    ru: 'Позвонить',
    de: 'Anrufen',
    fr: 'Appeler',
    ar: 'اتصال',
    zh: '拨打',
    th: 'โทร'
  },
  meetingLocationDesc: {
    tr: 'Rehberinizle buluşma veya otelden alınış noktası.',
    en: 'Meeting location or hotel pickup coordination point.',
    ru: 'Место встречи с гидом или точка сбора из отеля.',
    de: 'Treffpunkt mit Ihrem Guide oder Abholpunkt vom Hotel.',
    fr: 'Lieu de rendez-vous avec votre guide ou point de prise en charge à l’hôtel.',
    ar: 'نقطة الالتقاء بالمرشد أو نقطة الاستلام من الفندق.',
    zh: '导游集合点或酒店接送协调点。',
    th: 'จุดนัดพบไกด์หรือจุดรับส่งจากโรงแรม'
  },
  emergencyNumbersTitle: {
    tr: 'Tayland Acil Yardım Numaraları',
    en: 'Thailand Emergency Numbers',
    ru: 'Экстренные номера Таиланда',
    de: 'Notrufnummern Thailand',
    fr: 'Numéros d’urgence en Thaïlande',
    ar: 'أرقام الطوارئ في تايلاند',
    zh: '泰国紧急救援电话',
    th: 'เบอร์โทรฉุกเฉินในไทย'
  },
  visaInfoTitle: {
    tr: 'Türk Vatandaşları İçin Vize Bilgisi',
    en: 'Visa Info for Travelers',
    ru: 'Информация о визе',
    de: 'Visa-Informationen',
    fr: 'Informations sur les visas',
    ar: 'معلومات التأشيرة',
    zh: '签证信息',
    th: 'ข้อมูลวีซ่า'
  },
  visaInfoDesc: {
    tr: '🇹🇷 Türk vatandaşları umuma mahsus (bordo) ve yeşil pasaportla Tayland’a 60 güne kadar VİZESİZ seyahat edebilirler. Pasaportunuzun en az 6 ay geçerlilik süresi olması yeterlidir.',
    en: '🇹🇷 Turkish passport holders enjoy 60 days visa-free entry to Thailand. Ensure your passport has at least 6 months validity.',
    ru: 'Граждане многих стран могут въезжать в Таиланд без визы. Убедитесь, что ваш паспорт действителен не менее 6 месяцев.',
    de: 'Bürger vieler Länder können visumfrei nach Thailand einreisen. Ihr Reisepass muss noch mindestens 6 Monate gültig sein.',
    fr: 'Les citoyens de nombreux pays peuvent entrer en Thaïlande sans visa. Votre passeport doit être valide au moins 6 mois.',
    ar: 'يتمتع مواطنو العديد من الدول بدخول تايلاند بدون تأشيرة. تأكد من أن جواز سفرك صالح لمدة 6 أشهر على الأقل.',
    zh: '许多国家的公民可免签进入泰国。请确保您的护照有效期至少还有6个月。',
    th: 'พลเมืองหลายประเทศสามารถเข้าไทยได้โดยไม่ต้องขอวีซ่า ตรวจสอบให้แน่ใจว่าพาสปอร์ตมีอายุเหลืออย่างน้อย 6 เดือน'
  },
  sendRequestToKadir: {
    tr: 'Kadir Ezel’e Talep Gönder',
    en: 'Send Request to Kadir',
    ru: 'Отправить запрос Кадиру',
    de: 'Anfrage an Kadir senden',
    fr: 'Envoyer une demande à Kadir',
    ar: 'أرسل طلباً إلى كادير',
    zh: '向 Kadir 发送请求',
    th: 'ส่งคำขอถึงคาดีร์'
  },
  adminPanelTitle: {
    tr: 'Gelen Talepler & İletişim',
    en: 'Incoming Requests & Leads',
    ru: 'Входящие запросы',
    de: 'Eingehende Anfragen',
    fr: 'Demandes entrantes',
    ar: 'الطلبات الواردة',
    zh: '收到的请求',
    th: 'คำขอที่ส่งเข้ามา'
  },
  adminPanelBadge: {
    tr: 'Yönetici Paneli',
    en: 'Admin Dashboard',
    ru: 'Панель администратора',
    de: 'Admin-Dashboard',
    fr: 'Tableau de bord',
    ar: 'لوحة التحكم',
    zh: '管理面板',
    th: 'แผงควบคุม'
  },
  adminPanelSub: {
    tr: 'Müşteri taleplerini görüntüleyin, durumlarını güncelleyin veya tek dokunuşla WhatsApp mesajı atın.',
    en: 'Review client inquiries, update statuses, or WhatsApp them in one tap.',
    ru: 'Просматривайте запросы, обновляйте статусы или пишите в WhatsApp в один клик.',
    de: 'Anfragen prüfen, Status aktualisieren oder per WhatsApp kontaktieren.',
    fr: 'Consultez les demandes, mettez à jour les statuts ou envoyez un WhatsApp.',
    ar: 'راجع استفسارات العملاء، قم بتحديث الحالة، أو تواصل عبر واتساب بلمسة واحدة.',
    zh: '查看客户查询、更新状态 or 一键发送 WhatsApp。',
    th: 'ตรวจสอบคำขอ อัปเดตสถานะ หรือส่งข้อความ WhatsApp ได้ในคลิกเดียว'
  },
  totalLabel: {
    tr: 'Toplam',
    en: 'Total',
    ru: 'Всего',
    de: 'Gesamt',
    fr: 'Total',
    ar: 'الإجمالي',
    zh: '总计',
    th: 'ทั้งหมด'
  },
  newStatus: {
    tr: 'Yeni',
    en: 'New',
    ru: 'Новый',
    de: 'Neu',
    fr: 'Nouveau',
    ar: 'جديد',
    zh: '新',
    th: 'ใหม่'
  },
  contactedStatus: {
    tr: 'Görüşüldü',
    en: 'Contacted',
    ru: 'Связались',
    de: 'Kontaktiert',
    fr: 'Contacté',
    ar: 'تم التواصل',
    zh: '已联系',
    th: 'ติดต่อแล้ว'
  },
  completedStatus: {
    tr: 'Tamamlandı',
    en: 'Completed',
    ru: 'Завершено',
    de: 'Abgeschlossen',
    fr: 'Terminé',
    ar: 'مكتمل',
    zh: '已完成',
    th: 'เสร็จสิ้น'
  },
  allLabel: {
    tr: 'Tümü',
    en: 'All',
    ru: 'Все',
    de: 'Alle',
    fr: 'Tous',
    ar: 'الكل',
    zh: '全部',
    th: 'ทั้งหมด'
  },
  searchAdminPlaceholder: {
    tr: 'İsim, telefon veya talep ara...',
    en: 'Search by name, phone...',
    ru: 'Поиск по имени, телефону...',
    de: 'Suche nach Name, Telefon...',
    fr: 'Rechercher par nom, tél...',
    ar: 'بحث بالاسم، الهاتف...',
    zh: '按姓名、电话搜索...',
    th: 'ค้นหาด้วยชื่อ เบอร์โทร...'
  },
  noRequestsFound: {
    tr: 'Talep Bulunamadı',
    en: 'No Requests Found',
    ru: 'Запросы не найдены',
    de: 'Keine Anfragen gefunden',
    fr: 'Aucune demande trouvée',
    ar: 'لم يتم العثور على طلبات',
    zh: '未找到请求',
    th: 'ไม่พบคำขอ'
  },
  messageWhatsApp: {
    tr: "WhatsApp'la Yaz",
    en: 'Message WhatsApp',
    ru: 'Написать в WhatsApp',
    de: 'WhatsApp Nachricht',
    fr: 'Message WhatsApp',
    ar: 'مراسلة عبر واتساب',
    zh: '发送 WhatsApp',
    th: 'ส่งข้อความ WhatsApp'
  },
  confirmLabel: {
    tr: 'Onayla',
    en: 'Confirm',
    ru: 'ОК',
    de: 'Bestätigen',
    fr: 'Confirmer',
    ar: 'تأكيد',
    zh: '确认',
    th: 'ยืนยัน'
  },
  cancel: {
    tr: 'Vazgeç',
    en: 'Cancel',
    ru: 'Отмена',
    de: 'Abbrechen',
    fr: 'Annuler',
    ar: 'إلغاء',
    zh: '取消',
    th: 'ยกเลิก'
  },
  done: {
    tr: 'Bitti',
    en: 'Done',
    ru: 'Готово',
    de: 'Fertig',
    fr: 'Terminé',
    ar: 'تم',
    zh: '完成',
    th: 'เสร็จสิ้น'
  },
  languageTitle: {
    tr: 'Dil Seçimi',
    en: 'Language',
    ru: 'Язык',
    de: 'Sprache',
    fr: 'Langue',
    ar: 'اللغة',
    zh: '语言',
    th: 'ภาษา'
  },
  preferredLanguages: {
    tr: 'Tercih Edilen Diller',
    en: 'Preferred Languages',
    ru: 'Предпочитаемые языки',
    de: 'Bevorzugte Sprachen',
    fr: 'Langues préférées',
    ar: 'اللغات المفضلة',
    zh: '首选语言',
    th: 'ภาษาที่ต้องการ'
  },
  languageApplyNotice: {
    tr: 'Seçtiğiniz dil tüm turlar, mekanlar ve menülerde anında uygulanır.',
    en: 'Selected language is applied instantly across all tours and guides.',
    ru: 'Выбранный язык мгновенно применяется ко всем турам и меню.',
    de: 'Die gewählte Sprache wird sofort für alle Touren und Menüs übernommen.',
    fr: 'La langue choisie est appliquée instantanément à tous les circuits.',
    ar: 'يتم تطبيق اللغة المختارة فوراً على جميع الجولات والقوائم.',
    zh: '所选语言将立即应用于所有行程和菜单。',
    th: 'ภาษาที่เลือกจะถูกใช้กับทัวร์และเมนูทั้งหมดทันที'
  },
  resetToDefaultTheme: {
    tr: 'Varsayılan Temaya Dön',
    en: 'Reset to Default Theme',
    ru: 'Сбросить тему',
    de: 'Standardthema wiederherstellen',
    fr: 'Rétablir le thème par défaut',
    ar: 'إعادة تعيين المظهر الافتراضي',
    zh: '恢复默认主题',
    th: 'กลับสู่ธีมเริ่มต้น'
  },
  relationshipMoodTitle: {
    tr: 'Tatil Modun Nasıl?',
    en: "What's Your Vacation Mood?",
    ru: 'Какое у тебя настроение?',
    de: "Wie ist deine Urlaubsstimmung?",
    fr: "Quelle est votre ambiance de vacances ?",
    ar: "ما هو مزاجك في الإجازة؟",
    zh: "您的度假心情如何？",
    th: 'อารมณ์วันหยุดของคุณเป็นอย่างไร?'
  },
  reservationSuccessTitle: {
    tr: 'Talebiniz Kaydedildi!',
    en: 'Request Saved Successfully!',
    ru: 'Запрос успешно сохранен!',
    de: 'Anfrage erfolgreich gespeichert!',
    fr: 'Demande enregistrée avec succès !',
    ar: 'تم حفظ الطلب بنجاح!',
    zh: '请求已成功保存！',
    th: 'บันทึกคำขอสำเร็จ!'
  },
  reservationSuccessDesc: {
    tr: 'Rezervasyonunuz sistemimize düştü. Kadir Ezel en kısa sürede size ulaşacaktır.',
    en: 'Your reservation is now in our system. Kadir Ezel will reach out shortly.',
    ru: 'Ваше бронирование в системе. Кадир Эзель скоро свяжется с вами.',
    de: 'Ihre Reservierung ist in unserem System. Kadir Ezel wird sich in Kürze melden.',
    fr: 'Votre réservation est dans notre système. Kadir Ezel vous contactera bientôt.',
    ar: 'حجزك الآن في نظامنا. سيتواصل معك قادر إيزيل قريباً.',
    zh: '您的预订已进入我们的系统。Kadir Ezel 很快会与您联系。',
    th: 'การจองของคุณอยู่ในระบบแล้ว คาดีร์จะติดต่อกลับเร็วๆ นี้'
  },
  contactTimerText: {
    tr: 'Müşteri temsilcimiz yaklaşık 5 dakika içerisinde sizinle iletişime geçecektir.',
    en: 'Our representative will contact you within approximately 5 minutes.',
    ru: 'Наш представитель свяжется с вами в течение примерно 5 минут.',
    de: 'Unser Mitarbeiter wird Sie in etwa 5 Minuten kontaktieren.',
    fr: 'Notre représentant vous contactera dans environ 5 minutes.',
    ar: 'سيتصل بك ممثلنا في غضون 5 دقائق تقريبًا.',
    zh: '我们的代表将在约 5 分钟内 with 您联系。',
    th: 'เจ้าหน้าที่จะติดต่อกลับภายในเวลาประมาณ 5 นาที'
  },
  sendToWhatsApp: {
    tr: 'WhatsApp ile Gönder',
    en: 'Send via WhatsApp',
    ru: 'Отправить через WhatsApp',
    de: 'Über WhatsApp senden',
    fr: 'Envoyer via WhatsApp',
    ar: 'إرسال عبر واتساب',
    zh: '通过 WhatsApp 发送',
    th: 'ส่งผ่าน WhatsApp'
  },
  backToHome: {
    tr: 'Ana Sayfaya Dön',
    en: 'Back to Home',
    ru: 'На главную',
    de: 'Zurück zur Startseite',
    fr: 'Retour à l\'accueil',
    ar: 'العودة إلى الصفحة الرئيسية',
    zh: '回到首页',
    th: 'กลับหน้าหลัก'
  },
  moodHappy: { tr: 'Mutlu', en: 'Happy', ru: 'Счастлив', de: 'Glücklich', fr: 'Heureux', ar: 'سعيد', zh: '开心', th: 'มีความสุข' },
  moodRomantic: { tr: 'Romantik', en: 'Romantic', ru: 'Романтично', de: 'Romantisch', fr: 'Romantique', ar: 'رومانسي', zh: '浪漫', th: 'โรแมนติก' },
  moodSingle: { tr: 'Sap/Bekar', en: 'Single', ru: 'Одинок', de: 'Single', fr: 'Célibataire', ar: 'أعزب', zh: '单身', th: 'โสด' },
  moodParty: { tr: 'Parti Canavarı', en: 'Party Animal', ru: 'Вечеринка', de: 'Partylöwe', fr: 'Fêtard', ar: 'محب للحفلات', zh: '派对狂', th: 'สายปาร์ตี้' },
  moodRelaxed: { tr: 'Rahat', en: 'Relaxed', ru: 'Расслаблен', de: 'Entspannt', fr: 'Détendu', ar: 'مسترخٍ', zh: '放松', th: 'ผ่อนคลาย' },
  moodAdventurous: { tr: 'Maceracı', en: 'Adventurous', ru: 'Искатель приключений', de: 'Abenteuerlustig', fr: 'Aventureux', ar: 'مغامر', zh: '爱冒险', th: 'ชอบผจญภัย' },
  quoteHappy: {
    tr: 'Phuket güneşinden daha parlak gülüyorsun! 🥥',
    en: 'You are glowing brighter than the Phuket sun! 🥥',
    ru: 'Ты сияешь ярче солнца Пхукета! 🥥',
    de: 'Du strahlst heller als die Sonne von Phuket! 🥥',
    fr: 'Vous brillez plus que le soleil de Phuket ! 🥥',
    ar: 'أنت تتألق أكثر من شمس بوكيت! 🥥',
    zh: '你比普吉岛的阳光还要灿烂！ 🥥',
    th: 'คุณสดใสกว่าแสงแดดที่ภูเก็ตอีก! 🥥'
  },
  quoteRomantic: {
    tr: 'Aşk Andaman Denizi kadar derin... ❤️',
    en: 'Love is as deep as the Andaman Sea... ❤️',
    ru: 'Любовь глубока, как Андаманское море... ❤️',
    de: 'Die Liebe ist so tief wie das Andamanische Meer... ❤️',
    fr: 'L\'amour est aussi profond que la mer d\'Andaman... ❤️',
    ar: 'الحب عميق كعمق بحر أندامان... ❤️',
    zh: '爱如安达曼海一样深沉... ❤️',
    th: 'ความรักลึกซึ้งเหมือนทะเลอันดามัน... ❤️'
  },
  quoteSingle: {
    tr: 'Bekarlık sultanlıktır, özellikle Tayland\'da! 🤙',
    en: 'Being single is royalty, especially in Thailand! 🤙',
    ru: 'Быть одиноким — это круто, особенно в Таиланде! 🤙',
    de: 'Single sein ist wie ein König, besonders in Thailand! 🤙',
    fr: 'Être célibataire, c\'est la royauté, surtout en Thaïlande ! 🤙',
    ar: 'أن تكون أعزب يعني أنك ملك، خاصة في تايلاند! 🤙',
    zh: '单身就是王者，尤其是在泰国！ 🤙',
    th: 'เป็นโสดคือราชา โดยเฉพาะในไทย! 🤙'
  },
  quoteParty: {
    tr: 'Bangla Road seni bekliyor, bu gece uyku yok! 🥳',
    en: 'Bangla Road is calling you, no sleep tonight! 🥳',
    ru: 'Бангла-роуд зовет, сегодня не до сна! 🥳',
    de: 'Die Bangla Road ruft dich, heute Nacht wird nicht geschlafen! 🥳',
    fr: 'Bangla Road vous appelle, pas de sommeil ce soir ! 🥳',
    ar: 'طريق بانغلا يناديك، لا نوم الليلة! 🥳',
    zh: 'Bangla Road 在呼唤你，今晚不睡觉！ 🥳',
    th: 'ซอยบางลากำลังเรียกหา คืนนี้ไม่มีนอน! 🥳'
  },
  quoteRelaxed: {
    tr: 'Masaj koltuğundan kalkmaman dileğiyle... 🧉',
    en: 'May you stay on that massage chair forever... 🧉',
    ru: 'Желаю тебе навсегда остаться в массажном кресле... 🧉',
    de: 'Mögest du für immer auf diesem Massagesessel bleiben... 🧉',
    fr: 'Puissiez-vous rester sur ce fauteuil de massage pour toujours... 🧉',
    ar: 'أتمنى أن تبقى على كرسي المساج هذا للأبد... 🧉',
    zh: '愿你永远坐在按摩椅上... 🧉',
    th: 'ขอให้คุณได้นวดจนลืมโลกไปเลย... 🧉'
  },
  quoteAdventurous: {
    tr: 'Bir sonraki ada seni bekliyor, haydi gidelim! 🤠',
    en: 'The next island is waiting for you, let\'s go! 🤠',
    ru: 'Следующий остров ждет тебя, погнали! 🤠',
    de: 'Die nächste Insel wartet auf dich, lass uns gehen! 🤠',
    fr: 'La prochaine île vous attend, allons-y ! 🤠',
    ar: 'الجزيرة التالية في انتظارك، لنذهب! 🤠',
    zh: '下一个岛屿在等着你，我们走吧！ 🤠',
    th: 'เกาะต่อไปกำลังรอคุณอยู่ ไปกันเถอะ! 🤠'
  },
  taskHappy: {
    tr: 'Sürpriz bir akşam yemeği planla 🥂',
    en: 'Plan a surprise dinner 🥂',
    ru: 'Запланируй ужин-сюрприз 🥂',
    de: 'Plane ein Überraschungsabendessen 🥂',
    fr: 'Organisez un dîner surprise 🥂',
    ar: 'خطط لعشاء مفاجئ 🥂',
    zh: '计划一场惊喜晚餐 🥂',
    th: 'วางแผนมื้อค่ำสุดพิเศษ 🥂'
  },
  taskRomantic: {
    tr: 'Gün batımını el ele izleyin 🌅',
    en: 'Watch the sunset hand in hand 🌅',
    ru: 'Смотрите закат рука в руку 🌅',
    de: 'Schaut euch den Sonnenuntergang Hand in Hand an 🌅',
    fr: 'Regardez le coucher de soleil main dans la main 🌅',
    ar: 'شاهدا غروب الشمس يداً بيد 🌅',
    zh: '手牵手看日落 🌅',
    th: 'ดูพระอาทิตย์ตกดินด้วยกัน 🌅'
  },
  taskSingle: {
    tr: 'Yeni insanlarla tanışmaya çık! 🍻',
    en: 'Go out and meet new people! 🍻',
    ru: 'Выйди в свет и познакомься с кем-нибудь! 🍻',
    de: 'Geh raus und lerne neue Leute kennen! 🍻',
    fr: 'Sortez et rencontrez de nouvelles personnes ! 🍻',
    ar: 'اخرج وتعرف على أشخاص جدد! 🍻',
    zh: '出去结识新朋友！ 🍻',
    th: 'ออกไปพบปะผู้คนใหม่ๆ กันเถอะ! 🍻'
  },
  taskParty: {
    tr: 'En popüler gece kulübüne git 💃',
    en: 'Head to the hottest nightclub 💃',
    ru: 'Отправляйся в самый крутой клуб 💃',
    de: 'Geh in den angesagtesten Nachtclub 💃',
    fr: 'Allez dans la boîte de nuit la plus branchée 💃',
    ar: 'توجه إلى أروع ملهى ليلي 💃',
    zh: '前往最热门的夜总会 💃',
    th: 'ไปคลับที่ฮอตที่สุดกันเลย 💃'
  },
  taskRelaxed: {
    tr: 'Birlikte ayak masajı yaptırın 💆‍♂️',
    en: 'Get a foot massage together 💆‍♂️',
    ru: 'Сходите на массаж ног вместе 💆‍♂️',
    de: 'Gönnt euch zusammen eine Fußmassage 💆‍♂️',
    fr: 'Faites-vous masser les pieds ensemble 💆‍♂️',
    ar: 'احصلا على مساج للقدمين معاً 💆‍♂️',
    zh: '一起去做足部按摩 💆‍♂️',
    th: 'ไปนวดเท้าด้วยกันนะ 💆‍♂️'
  },
  taskAdventurous: {
    tr: 'Kimsenin bilmediği bir koyu keşfet 🚤',
    en: 'Discover a hidden bay 🚤',
    ru: 'Найди секретную бухту 🚤',
    de: 'Entdecke eine versteckte Bucht 🚤',
    fr: 'Découvrez une baie cachée  Boat',
    ar: 'اكتشف خليجاً مخفياً 🚤',
    zh: '发现一个隐藏的海湾 🚤',
    th: 'ไปสำรวจอ่าวลับๆ กันเถอะ 🚤'
  },
  suggestedAction: {
    tr: 'Önerilen Aksiyon:',
    en: 'Suggested Action:',
    ru: 'Рекомендуемое действие:',
    de: 'Empfohlene Aktion:',
    fr: 'Action suggérée :',
    ar: 'الإجراء المقترح:',
    zh: '建议操作：',
    th: 'สิ่งแนะนำที่ควรทำ:'
  },
  themeTitle: {
    tr: 'Renk Teması',
    en: 'Color Theme',
    ru: 'Тема оформления',
    de: 'Farbschema',
    fr: 'Thème de couleur',
    ar: 'مظهر الألوان',
    zh: '颜色主题',
    th: 'ธีมสี'
  },
  thailandThemes: {
    tr: 'Tayland Temaları (7 Seçenek)',
    en: 'Thailand Themes (7 Options)',
    ru: 'Тайские темы (7 вариантов)',
    de: 'Thailand-Themen (7 Optionen)',
    fr: 'Thèmes thaïlandais (7 options)',
    ar: 'سمات تايلاند (7 خيارات)',
    zh: '泰国主题 (7 种选择)',
    th: 'ธีมไทย (7 ตัวเลือก)'
  },
  livePreview: {
    tr: 'Anında Uygulanır',
    en: 'Live Preview',
    ru: 'Предпросмотр',
    de: 'Live-Vorschau',
    fr: 'Aperçu en direct',
    ar: 'معاينة مباشرة',
    zh: '实时预览',
    th: 'ดูตัวอย่างสด'
  },
  themeNotice: {
    tr: 'Seçtiğiniz tema renkleri menülerde, butonlarda ve kartlarda hemen etkinleşir.',
    en: 'Selected theme accents apply instantly to navigation, buttons, and cards.',
    ru: 'Выбранные акценты темы мгновенно применяются к навигации и кнопкам.',
    de: 'Gewählte Farbakzente werden sofort für Navigation und Buttons übernommen.',
    fr: 'Les couleurs choisies s’appliquent instantanément à la navigation.',
    ar: 'يتم تطبيق ألوان المظهر المختارة فوراً على القوائم والأزرار.',
    zh: '所选主题色将立即应用于导航、按钮和卡片。',
    th: 'สีธีมที่เลือกจะถูกใช้กับเมนู ปุ่ม และการ์ดทันที'
  }
};

export const t = (key: string, lang: Language): string => {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  if (TRANSLATIONS[key] && TRANSLATIONS[key]['en']) {
    return TRANSLATIONS[key]['en'];
  }
  return key;
};
