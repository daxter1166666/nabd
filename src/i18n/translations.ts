export type Language = 'ar' | 'en' | 'fr' | 'tr' | 'es' | 'de';

export interface TranslationKeys {
  appTitle: string;
  appSubtitle: string;
  navHome: string;
  navSearch: string;
  navRecord: string;
  navAdmin: string;
  navProfile: string;
  newCampaign: string;
  searchPlaceholder: string;
  donateVoice: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginToDonateBtn: string;
  cancel: string;
  login: string;
  logout: string;
  donorName: string;
  emailPrivate: string;
  activeCampaigns: string;
  messagesPublished: string;
  listenToAudio: string;
  likes: string;
  share: string;
  filterAll: string;
  filterPopular: string;
  sponsors: string;
  adminDashboardTitle: string;
  manageCampaigns: string;
  manageAds: string;
  manageMessages: string;
  languageName: string;
  dir: 'rtl' | 'ltr';
}

export const LANGUAGES: Record<Language, { name: string; flag: string; dir: 'rtl' | 'ltr' }> = {
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' }
};

export const TRANSLATIONS: Record<Language, TranslationKeys> = {
  ar: {
    appTitle: 'نبض الأمل',
    appSubtitle: 'منصة التبرعات والرسائل الصوتية الإنسانية',
    navHome: 'الرئيسية',
    navSearch: 'البحث والهاشتاغات',
    navRecord: 'تبرّع بصوتك',
    navAdmin: 'لوحة الأدمن',
    navProfile: 'حسابي',
    newCampaign: '+ فعالية جديدة',
    searchPlaceholder: 'ابحث عن فعاليات، هاشتاغات، أو صوتيات...',
    donateVoice: 'تبرّع بصوتك الآن',
    loginRequiredTitle: 'تسجيل الدخول مطلوب للتفاعل',
    loginRequiredDesc: 'يمكنك تصفح التطبيق والاستماع لجميع التبرعات الصوتية بحرية! للتبرع بصوتية جديدة أو الإعجاب، يرجى تسجيل الدخول أولاً.',
    loginToDonateBtn: 'تسجيل الدخول الآن',
    cancel: 'إلغاء',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    donorName: 'اسم المتبرع',
    emailPrivate: 'البريد خفي ومستور بالكامل',
    activeCampaigns: 'الفعاليات النشطة',
    messagesPublished: 'الصوتيات المنشورة',
    listenToAudio: 'استمع للتبرع الصوتي',
    likes: 'إعجاب',
    share: 'مشاركة',
    filterAll: 'الكل',
    filterPopular: 'الأكثر استماعاً',
    sponsors: 'الرعاة والداعمون',
    adminDashboardTitle: 'لوحة تحكّم الإدارة والمؤسس',
    manageCampaigns: 'إدارة الفعاليات',
    manageAds: 'إدارة الإعلانات',
    manageMessages: 'إشراف الصوتيات',
    languageName: 'العربية',
    dir: 'rtl'
  },
  en: {
    appTitle: 'Voice of Hope',
    appSubtitle: 'Humanitarian Voice Donations & Campaign Platform',
    navHome: 'Home',
    navSearch: 'Search',
    navRecord: 'Donate Voice',
    navAdmin: 'Admin Panel',
    navProfile: 'Profile',
    newCampaign: '+ New Campaign',
    searchPlaceholder: 'Search campaigns, hashtags, or audio messages...',
    donateVoice: 'Donate Your Voice Now',
    loginRequiredTitle: 'Login Required to Interact',
    loginRequiredDesc: 'You can freely browse campaigns and listen to all audio donations! To record a message or like audio, please log in first.',
    loginToDonateBtn: 'Log In Now',
    cancel: 'Cancel',
    login: 'Log In',
    logout: 'Log Out',
    donorName: 'Donor Name',
    emailPrivate: 'Email is strictly private & hidden',
    activeCampaigns: 'Active Campaigns',
    messagesPublished: 'Published Audio Messages',
    listenToAudio: 'Listen to Voice Donation',
    likes: 'Likes',
    share: 'Share',
    filterAll: 'All',
    filterPopular: 'Most Popular',
    sponsors: 'Sponsors & Donors',
    adminDashboardTitle: 'Admin & Founder Dashboard',
    manageCampaigns: 'Manage Campaigns',
    manageAds: 'Manage Ads',
    manageMessages: 'Moderate Audio',
    languageName: 'English',
    dir: 'ltr'
  },
  fr: {
    appTitle: "Voix de l'Espoir",
    appSubtitle: "Plateforme de Dons Vocaux et d'Actions Humanitaires",
    navHome: 'Accueil',
    navSearch: 'Recherche',
    navRecord: 'Donner sa voix',
    navAdmin: 'Administration',
    navProfile: 'Profil',
    newCampaign: '+ Nouvelle Campagne',
    searchPlaceholder: 'Rechercher des campagnes, hashtags ou audios...',
    donateVoice: 'Faites don de votre voix',
    loginRequiredTitle: 'Connexion Requise',
    loginRequiredDesc: 'Vous pouvez parcourir les campagnes et écouter les dons vocaux librement ! Pour enregistrer ou aimer, veuillez vous connecter.',
    loginToDonateBtn: 'Se Connecter',
    cancel: 'Annuler',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    donorName: 'Nom du donateur',
    emailPrivate: 'E-mail strictement privé',
    activeCampaigns: 'Campagnes Actives',
    messagesPublished: 'Audios Publiés',
    listenToAudio: 'Écouter le don vocal',
    likes: 'J\'aime',
    share: 'Partager',
    filterAll: 'Tout',
    filterPopular: 'Plus Populaire',
    sponsors: 'Sponsors & Partenaires',
    adminDashboardTitle: 'Tableau de Bord Administrateur',
    manageCampaigns: 'Gérer les Campagnes',
    manageAds: 'Gérer les Publicités',
    manageMessages: 'Modération Audio',
    languageName: 'Français',
    dir: 'ltr'
  },
  tr: {
    appTitle: 'Umut Sesi',
    appSubtitle: 'İnsani Yardım Sesli Bağış ve Kampanya Platformu',
    navHome: 'Ana Sayfa',
    navSearch: 'Arama',
    navRecord: 'Ses Bağışla',
    navAdmin: 'Yönetici Paneli',
    navProfile: 'Profilim',
    newCampaign: '+ Yeni Kampanya',
    searchPlaceholder: 'Kampanya, hashtag veya ses ara...',
    donateVoice: 'Şimdi Sesini Bağışla',
    loginRequiredTitle: 'Giriş Yapmanız Gerekiyor',
    loginRequiredDesc: 'Kampanyalara özgürce göz atabilir ve tüm ses kayıtlarını dinleyebilirsiniz! Ses kaydetmek veya beğenmek için lütfen giriş yapın.',
    loginToDonateBtn: 'Şimdi Giriş Yap',
    cancel: 'İptal',
    login: 'Giriş Yap',
    logout: 'Çıkış Yap',
    donorName: 'Bağışçı Adı',
    emailPrivate: 'E-posta tamamen gizlidir',
    activeCampaigns: 'Aktif Kampanyalar',
    messagesPublished: 'Yayınlanan Sesler',
    listenToAudio: 'Ses Kaydını Dinle',
    likes: 'Beğeni',
    share: 'Paylaş',
    filterAll: 'Tümü',
    filterPopular: 'En Popüler',
    sponsors: 'Sponsorlar',
    adminDashboardTitle: 'Yönetici Paneli',
    manageCampaigns: 'Kampanyaları Yönet',
    manageAds: 'Reklamları Yönet',
    manageMessages: 'Ses Moderasyonu',
    languageName: 'Türkçe',
    dir: 'ltr'
  },
  es: {
    appTitle: 'Voz de Esperanza',
    appSubtitle: 'Plataforma de Donaciones de Voz y Causas Humanitarias',
    navHome: 'Inicio',
    navSearch: 'Buscar',
    navRecord: 'Donar Voz',
    navAdmin: 'Panel Admin',
    navProfile: 'Mi Perfil',
    newCampaign: '+ Nueva Campaña',
    searchPlaceholder: 'Buscar campañas, hashtags o mensajes de voz...',
    donateVoice: 'Dona Tu Voz Ahora',
    loginRequiredTitle: 'Iniciar Sesión Requerido',
    loginRequiredDesc: '¡Puedes explorar campañas y escuchar audios libremente! Para grabar tu voz o dar Me Gusta, por favor inicia sesión.',
    loginToDonateBtn: 'Iniciar Sesión',
    cancel: 'Cancelar',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    donorName: 'Nombre del Donante',
    emailPrivate: 'Correo estrictamente privado',
    activeCampaigns: 'Campañas Activas',
    messagesPublished: 'Audios Publicados',
    listenToAudio: 'Escuchar donación de voz',
    likes: 'Me Gusta',
    share: 'Compartir',
    filterAll: 'Todos',
    filterPopular: 'Más Escuchados',
    sponsors: 'Patrocinadores',
    adminDashboardTitle: 'Panel de Administración',
    manageCampaigns: 'Gestionar Campañas',
    manageAds: 'Gestionar Anuncios',
    manageMessages: 'Moderación de Audio',
    languageName: 'Español',
    dir: 'ltr'
  },
  de: {
    appTitle: 'Stimme der Hoffnung',
    appSubtitle: 'Humanitäre Sprachspenden & Kampagnenplattform',
    navHome: 'Startseite',
    navSearch: 'Suche',
    navRecord: 'Stimme Spenden',
    navAdmin: 'Admin-Bereich',
    navProfile: 'Profil',
    newCampaign: '+ Neue Kampagne',
    searchPlaceholder: 'Kampagnen, Hashtags oder Audio suchen...',
    donateVoice: 'Spende jetzt deine Stimme',
    loginRequiredTitle: 'Anmeldung Erforderlich',
    loginRequiredDesc: 'Du kannst Kampagnen frei durchsuchen und Sprachspenden anhören! Zum Aufnehmen oder Liken bitte zuerst anmelden.',
    loginToDonateBtn: 'Jetzt Anmelden',
    cancel: 'Abbrechen',
    login: 'Anmelden',
    logout: 'Abmelden',
    donorName: 'Spendername',
    emailPrivate: 'E-Mail ist streng vertraulich',
    activeCampaigns: 'Aktive Kampagnen',
    messagesPublished: 'Veröffentlichte Audios',
    listenToAudio: 'Sprachspende anhören',
    likes: 'Gefällt mir',
    share: 'Teilen',
    filterAll: 'Alle',
    filterPopular: 'Beliebteste',
    sponsors: 'Sponsoren',
    adminDashboardTitle: 'Administrator Dashboard',
    manageCampaigns: 'Kampagnen verwalten',
    manageAds: 'Anzeigen verwalten',
    manageMessages: 'Audio Moderation',
    languageName: 'Deutsch',
    dir: 'ltr'
  }
};
