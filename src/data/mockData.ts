import { Campaign, AudioMessage, HashtagCategory, User, AdBanner } from '../types';

export const INITIAL_USER: User = {
  id: 'user_1',
  name: 'أحمد التميمي',
  email: 'ahmed.donations@example.com', // Private
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  bio: 'متبرع بالصوت، أؤمن أن الكلمة الطيبة تداوي النفوس وتزرع الأمل في القلوب.',
  joinedDate: 'يناير 2026',
  isFounder: false
};

export const FOUNDER_USER: User = {
  id: 'founder_1',
  name: 'د. سارة المنصور (المؤسسة)',
  email: 'sara.founder@hopevoice.app',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  bio: 'مؤسسة تطبيق صوت الأمل. نهدف لجمع مليون رسالة صوتية ملهمة للفئات الأكثر احتياجاً للدعم.',
  joinedDate: 'نوفمبر 2025',
  isFounder: true
};

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_1',
    title: 'فعالية الأسبوع: ماذا تقول لمرضى السرطان؟',
    questionPrompt: 'ما هي كلمتك الصوتية اليوم لرفع معنويات أبطالنا المحاربين للسرطان؟',
    description: 'في هذا الأسبوع، نجمع أصواتكم الملهمة لتصل إلى قلوب محاربي السرطان في مراكز العلاج. صوتك قد يكون سبب ابتسامة وقوة لمريض يخوض رحلة الشفاء.',
    hashtag: '#تبرع_لمرضى_السرطان',
    category: 'cancer',
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
    startDate: '2026-08-01',
    isActive: true,
    donationsCount: 1420,
    totalLikesCount: 8930,
    organizerName: 'فريق صوت الأمل'
  },
  {
    id: 'camp_2',
    title: 'رسائل أمل ووفاء لكبار السن في دور الرعاية',
    questionPrompt: 'ماذا تقول لأمهاتنا وأبائنا في دور الرعاية ليشعروا بقربنا ومحبتنا؟',
    description: 'كبار السن هم بركتنا وذاكرتنا الدافئة. أهدِهم رسالة صوتية محملة بالاحترام والشوق والدعاء الطيب.',
    hashtag: '#دفء_كبار_السن',
    category: 'elderly',
    coverImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&q=80&w=800',
    startDate: '2026-07-20',
    isActive: true,
    donationsCount: 850,
    totalLikesCount: 4210,
    organizerName: 'جمعية إكرام المسنين'
  },
  {
    id: 'camp_3',
    title: 'صوتك يلهم أبطال التوحد وعائلاتهم',
    questionPrompt: 'كيف تعبر عن فخرك ومساندتك لأبطال التوحد وأسرهم الصابرة؟',
    description: 'نطلق حملة صوتية خاصة للتعريف بأبطال التوحد وإرسال بطاقات صوتية ملهمة تدعم طاقاتهم الاستثنائية.',
    hashtag: '#أبطال_التوحد',
    category: 'autism',
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800',
    startDate: '2026-07-10',
    isActive: false,
    donationsCount: 620,
    totalLikesCount: 3100,
    organizerName: 'مبادرة طيف الأمل'
  },
  {
    id: 'camp_4',
    title: 'همسات مساندة لأطفال أجنحة المستشفيات',
    questionPrompt: 'احكِ قصة قصيرة أو كلمة مبهجة تزرع الابتسامة على وجوه الأطفال المنومين.',
    description: 'الأطفال في المستشفيات يحتاجون لصوت حنون وقصة ملهمة تهون عليهم فترة الاستشفاء والعلاج.',
    hashtag: '#بسمة_طفل',
    category: 'hospitals',
    coverImage: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
    startDate: '2026-06-15',
    isActive: false,
    donationsCount: 940,
    totalLikesCount: 5600,
    organizerName: 'مؤسسة أطفالنا أولاً'
  }
];

export const INITIAL_MESSAGES: AudioMessage[] = [
  {
    id: 'msg_1',
    campaignId: 'camp_1',
    campaignTitle: 'فعالية الأسبوع: ماذا تقول لمرضى السرطان؟',
    hashtag: '#تبرع_لمرضى_السرطان',
    donorId: 'user_2',
    donorName: 'مريم العتيبي',
    donorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    durationSeconds: 28,
    likesCount: 342,
    isLikedByCurrentUser: true,
    createdAt: 'منذ ساعتين',
    transcriptText: 'أقول لكل بطل يخوض هذه المعركة: أنت قوي جداً، ورحلتك هذه هي قصة شجاعة نعتز بها جميعاً. الشفاء قريب بإذن الله والابتسامة يليق بها وجهك دائماً!',
    category: 'cancer'
  },
  {
    id: 'msg_2',
    campaignId: 'camp_1',
    campaignTitle: 'فعالية الأسبوع: ماذا تقول لمرضى السرطان؟',
    hashtag: '#تبرع_لمرضى_السرطان',
    donorId: 'user_1',
    donorName: 'أحمد التميمي',
    donorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    durationSeconds: 42,
    likesCount: 189,
    isLikedByCurrentUser: false,
    createdAt: 'منذ 5 ساعات',
    transcriptText: 'رسالتي من القلب: لا تفقد الأمل لحظة واحدة. كل يوم جديد هو خطوة نحو التعافي الكامل. نحن ندعو لكم في كل صلاة وأنتم أبطالنا الحقيقيون.',
    category: 'cancer'
  },
  {
    id: 'msg_3',
    campaignId: 'camp_2',
    campaignTitle: 'رسائل أمل ووفاء لكبار السن في دور الرعاية',
    hashtag: '#دفء_كبار_السن',
    donorId: 'user_3',
    donorName: 'عمر الخالدي',
    donorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    durationSeconds: 35,
    likesCount: 256,
    isLikedByCurrentUser: false,
    createdAt: 'منذ يوم واحد',
    transcriptText: 'إلى أمهاتنا وآبائنا البركة والأصل: أنتم القدوة والبركة، ندعو الله أن يمدكم بالصحة والعافية ويملأ قلوبكم بالسكينة والراحة. نحبكم جميعاً.',
    category: 'elderly'
  },
  {
    id: 'msg_4',
    campaignId: 'camp_4',
    campaignTitle: 'همسات مساندة لأطفال أجنحة المستشفيات',
    hashtag: '#بسمة_طفل',
    donorId: 'user_4',
    donorName: 'نورة السعيد',
    donorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    durationSeconds: 20,
    likesCount: 410,
    isLikedByCurrentUser: true,
    createdAt: 'منذ يومين',
    transcriptText: 'يا أبطالنا الصغار! أنتم أقوى وأشجع بكثير مما تظنون، والأيام القادمة ستكون مليئة باللعب والمرح والصحة الجيدة بإذن الله.',
    category: 'hospitals'
  },
  {
    id: 'msg_5',
    campaignId: 'camp_3',
    campaignTitle: 'صوتك يلهم أبطال التوحد وعائلاتهم',
    hashtag: '#أبطال_التوحد',
    donorId: 'user_5',
    donorName: 'فهد الشمري',
    donorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    durationSeconds: 31,
    likesCount: 175,
    isLikedByCurrentUser: false,
    createdAt: 'منذ 3 أيام',
    transcriptText: 'عقول استثنائية ونظرة نقية للكون! أبطال التوحد يعلموننا كل يوم معاني الإصرار والتفرد. كل الدعم لكم ولعائلاتكم العظيمة.',
    category: 'autism'
  }
];

export const HASHTAG_CATEGORIES: HashtagCategory[] = [
  {
    tag: '#تبرع_لمرضى_السرطان',
    label: 'مرضى السرطان',
    count: 1420,
    iconName: 'HeartHandshake',
    color: 'from-pink-500 to-rose-600'
  },
  {
    tag: '#دفء_كبار_السن',
    label: 'كبار السن ودور الرعاية',
    count: 850,
    iconName: 'UserCheck',
    color: 'from-amber-500 to-orange-600'
  },
  {
    tag: '#أبطال_التوحد',
    label: 'أبطال التوحد',
    count: 620,
    iconName: 'Sparkles',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    tag: '#بسمة_طفل',
    label: 'أطفال المستشفيات',
    count: 940,
    iconName: 'Smile',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    tag: '#رسائل_الهمم',
    label: 'ذوو الهمم والاحتياجات',
    count: 510,
    iconName: 'ShieldHeart',
    color: 'from-cyan-500 to-blue-600'
  }
];

export const INITIAL_ADS: AdBanner[] = [
  {
    id: 'ad_1',
    title: 'مبادرة الشريك الإنساني - رعاية الأطفال',
    sponsorName: 'مؤسسة الأمل الخيرية',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=800',
    targetUrl: 'https://example.com/sponsor-charity',
    position: 'top',
    isActive: true,
    clicksCount: 124,
    viewsCount: 1450,
    badgeText: 'إعلان راعي إنساني'
  },
  {
    id: 'ad_2',
    title: 'حملة التبرع بالدم بالتعاون مع المركز الصحي',
    sponsorName: 'المركز الطبي الوطني',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800',
    targetUrl: 'https://example.com/blood-donation',
    position: 'feed',
    isActive: true,
    clicksCount: 89,
    viewsCount: 920,
    badgeText: 'إعلان شريك صحي'
  },
  {
    id: 'ad_3',
    title: 'مركز الأمل للتدريب ورعاية أصحاب الهمم',
    sponsorName: 'مؤسسة تمكين',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    targetUrl: 'https://example.com/tamkeen',
    position: 'search',
    isActive: true,
    clicksCount: 45,
    viewsCount: 680,
    badgeText: 'إعلان في صفحة البحث'
  },
  {
    id: 'ad_4',
    title: 'برنامج الكافل الإنساني للمستشفيات',
    sponsorName: 'جمعية العطاء',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    targetUrl: 'https://example.com/kataa',
    position: 'profile',
    isActive: true,
    clicksCount: 38,
    viewsCount: 510,
    badgeText: 'إعلان في صفحة حسابي'
  },
  {
    id: 'ad_5',
    title: 'إعلان AdMob سفلي تثبيتي - دعم الأبحاث الطبية',
    sponsorName: 'Google AdMob Unit',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    targetUrl: 'https://example.com/admob-demo',
    position: 'bottom_sticky',
    isActive: true,
    clicksCount: 112,
    viewsCount: 2300,
    badgeText: 'AdMob Banner'
  }
];

