import { Campaign, AudioMessage, HashtagCategory, AdBanner } from '../types';
import { Language } from './translations';

// Pre-defined multi-lingual translations for Campaigns
const CAMPAIGN_TRANSLATIONS: Record<string, Record<Language, {
  title: string;
  questionPrompt: string;
  description: string;
  hashtag: string;
  organizerName: string;
}>> = {
  camp_1: {
    ar: {
      title: 'فعالية الأسبوع: ماذا تقول لمرضى السرطان؟',
      questionPrompt: 'ما هي كلمتك الصوتية اليوم لرفع معنويات أبطالنا المحاربين للسرطان؟',
      description: 'في هذا الأسبوع، نجمع أصواتكم الملهمة لتصل إلى قلوب محاربي السرطان في مراكز العلاج. صوتك قد يكون سبب ابتسامة وقوة لمريض يخوض رحلة الشفاء.',
      hashtag: '#تبرع_لمرضى_السرطان',
      organizerName: 'فريق صوت الأمل'
    },
    en: {
      title: 'Campaign of the Week: What do you say to cancer fighters?',
      questionPrompt: 'What is your voice message today to lift the spirits of our cancer warrior heroes?',
      description: 'This week, we collect your inspiring voice donations to reach cancer fighters in treatment centers. Your voice can bring a smile and strength to a healing journey.',
      hashtag: '#CancerWarriorsSupport',
      organizerName: 'Voice of Hope Team'
    },
    fr: {
      title: "Action de la semaine : Que dites-vous aux combattants du cancer ?",
      questionPrompt: "Quel est votre message vocal aujourd'hui pour remonter le moral de nos héros luttant contre le cancer ?",
      description: "Cette semaine, nous rassemblons vos voix inspirantes pour soutenir les personnes luttant contre le cancer dans les centres de soins.",
      hashtag: '#SoutienCancerEnsemble',
      organizerName: "Équipe Voix de l'Espoir"
    },
    tr: {
      title: 'Haftanın Etkinliği: Kanser Savaşçılarına Ne Söylemek İstersiniz?',
      questionPrompt: 'Kanserle savaşan kahramanlarımızın moralini yükseltmek için bugün sesli mesajınız nedir?',
      description: 'Bu hafta, tedavi merkezlerindeki kanser savaşçılarına ulaşmak için ilham verici ses bağışlarınızı topluyoruz.',
      hashtag: '#KanserSavaşçılarınaDestek',
      organizerName: 'Umut Sesi Ekibi'
    },
    es: {
      title: 'Campaña de la Semana: ¿Qué le dices a los luchadores contra el cáncer?',
      questionPrompt: '¿Cuál es tu mensaje de voz hoy para elevar el ánimo de nuestros héroes que luchan contra el cáncer?',
      description: 'Esta semana recolectamos tus donaciones de voz inspiradoras para llegar a los pacientes en centros de tratamiento.',
      hashtag: '#ApoyoLuchaContraElCancer',
      organizerName: 'Equipo Voz de Esperanza'
    },
    de: {
      title: 'Kampagne der Woche: Was sagst du Krebskämpfern?',
      questionPrompt: 'Was ist deine heutige Sprachbotschaft, um den Mut unserer Helden im Kampf gegen den Krebs zu stärken?',
      description: 'In dieser Woche sammeln wir eure inspirierenden Sprachspenden für Menschen in Behandlungszentren.',
      hashtag: '#KrebsKämpferUnterstützung',
      organizerName: 'Team Stimme der Hoffnung'
    }
  },
  camp_2: {
    ar: {
      title: 'رسائل أمل ووفاء لكبار السن في دور الرعاية',
      questionPrompt: 'ماذا تقول لأمهاتنا وأبائنا في دور الرعاية ليشعروا بقربنا ومحبتنا؟',
      description: 'كبار السن هم بركتنا وذاكرتنا الدافئة. أهدِهم رسالة صوتية محملة بالاحترام والشوق والدعاء الطيب.',
      hashtag: '#دفء_كبار_السن',
      organizerName: 'جمعية إكرام المسنين'
    },
    en: {
      title: 'Messages of Hope & Loyalty for the Elderly in Care Homes',
      questionPrompt: 'What do you say to our mothers and fathers in care homes to make them feel our love and closeness?',
      description: 'The elderly are our blessing and warm memories. Gift them a voice message filled with respect, warmth, and prayers.',
      hashtag: '#WarmthForElderly',
      organizerName: 'Honor Elderly Foundation'
    },
    fr: {
      title: "Messages d'Espoir et de Fidélité pour les Personnes Âgées",
      questionPrompt: "Que dites-vous à nos aînés dans les maisons de retraite pour qu'ils ressentent notre affection ?",
      description: "Les personnes âgées sont notre bénédiction. Offrez-leur un message vocal rempli de respect et de chaleur.",
      hashtag: '#ChaleurPourNosAînés',
      organizerName: 'Fondation Respect des Aînés'
    },
    tr: {
      title: 'Huzurevlerindeki Yaşlılarımız İçin Umut ve Vefa Mesajları',
      questionPrompt: 'Huzurevlerindeki anne ve babalarımıza sevgimizi hissettirmek için ne söylemek istersiniz?',
      description: 'Yaşlılarımız bereketimiz ve sıcak hafızamızdır. Onlara saygı ve dua dolu bir sesli mesaj hediye edin.',
      hashtag: '#YaşlılarımızaSevgi',
      organizerName: 'Yaşlılara Saygı Derneği'
    },
    es: {
      title: 'Mensajes de Esperanza y Gratitud para Adultos Mayores',
      questionPrompt: '¿Qué les dices a nuestros abuelos y padres en residencias para que sientan nuestro cariño?',
      description: 'Los adultos mayores son nuestra bendición. Regálales un mensaje de voz lleno de respeto y afecto.',
      hashtag: '#CariñoParaNuestrosAbuelos',
      organizerName: 'Fundación Honor a los Mayores'
    },
    de: {
      title: 'Botschaften der Hoffnung und Dankbarkeit für Senioren',
      questionPrompt: 'Was sagst du unseren Müttern und Vätern in Pflegeheimen, damit sie unsere Liebe spüren?',
      description: 'Senioren sind unser Segen und Erinnerungsschatz. Schenke ihnen eine Sprachbotschaft voller Respekt.',
      hashtag: '#WärmeFürSenioren',
      organizerName: 'Seniorenhilfe Stiftung'
    }
  },
  camp_3: {
    ar: {
      title: 'صوتك يلهم أبطال التوحد وعائلاتهم',
      questionPrompt: 'كيف تعبر عن فخرك ومساندتك لأبطال التوحد وأسرهم الصابرة؟',
      description: 'نطلق حملة صوتية خاصة للتعريف بأبطال التوحد وإرسال بطاقات صوتية ملهمة تدعم طاقاتهم الاستثنائية.',
      hashtag: '#أبطال_التوحد',
      organizerName: 'مبادرة طيف الأمل'
    },
    en: {
      title: 'Your Voice Inspires Autism Heroes & Their Families',
      questionPrompt: 'How do you express pride and support for autism heroes and their patient families?',
      description: 'We launch a special voice campaign to highlight autism heroes and send inspiring voice cards supporting their extraordinary potential.',
      hashtag: '#AutismHeroesSupport',
      organizerName: 'Spectrum of Hope Initiative'
    },
    fr: {
      title: 'Votre Voix Inspire les Héros de lAutisme et Leurs Familles',
      questionPrompt: 'Comment exprimez-vous votre fierté envers les héros de l’autisme et leurs familles ?',
      description: 'Campagne vocale dédiée pour célébrer les héros autistes et soutenir leurs talents exceptionnels.',
      hashtag: '#SoutienAutismeHéros',
      organizerName: 'Initiative Spectre de lEspoir'
    },
    tr: {
      title: 'Sesiniz Otizm Kahramanlarına ve Ailelerine İlham Versin',
      questionPrompt: 'Otizm kahramanlarına ve sabırlı ailelerine desteğinizi nasıl ifade edersiniz?',
      description: 'Otizm kahramanlarını desteklemek ve harika potansiyellerine güç vermek için özel bir ses kampanyası.',
      hashtag: '#OtizmKahramanları',
      organizerName: 'Umut Tayfı İnisiyatifi'
    },
    es: {
      title: 'Tu Voz Inspira a los Héroes con Autismo y sus Familias',
      questionPrompt: '¿Cómo expresas tu orgullo y apoyo a los héroes con autismo y sus familias?',
      description: 'Lanzamos una campaña de voz para apoyar a los héroes con autismo y destacar su increíble talento.',
      hashtag: '#HéroesDelAutismo',
      organizerName: 'Iniciativa Espectro de Esperanza'
    },
    de: {
      title: 'Deine Stimme inspiriert Autismus-Helden und ihre Familien',
      questionPrompt: 'Wie drückst du deinen Stolz und deine Unterstützung für Autismus-Helden aus?',
      description: 'Eine Sprachkampagne zur Unterstützung von Autismus-Helden und ihren Familien.',
      hashtag: '#AutismusHelden',
      organizerName: 'Spektrum der Hoffnung'
    }
  },
  camp_4: {
    ar: {
      title: 'همسات مساندة لأطفال أجنحة المستشفيات',
      questionPrompt: 'احكِ قصة قصيرة أو كلمة مبهجة تزرع الابتسامة على وجوه الأطفال المنومين.',
      description: 'الأطفال في المستشفيات يحتاجون لصوت حنون وقصة ملهمة تهون عليهم فترة الاستشفاء والعلاج.',
      hashtag: '#بسمة_طفل',
      organizerName: 'مؤسسة أطفالنا أولاً'
    },
    en: {
      title: 'Whispers of Support for Children in Hospital Wards',
      questionPrompt: 'Tell a short story or joyful word that puts a smile on hospitalized children’s faces.',
      description: 'Children in hospital wards need a warm voice and inspiring story to brighten their recovery days.',
      hashtag: '#ChildSmileVoice',
      organizerName: 'Children First Foundation'
    },
    fr: {
      title: "Chuchotements de Soutien aux Enfants Hospitalisés",
      questionPrompt: "Racontez une courte histoire ou un mot joyeux pour faire sourire les enfants à l'hôpital.",
      description: "Les enfants hospitalisés ont besoin d'une voix réconfortante pour traverser leur convalescence.",
      hashtag: '#SourireDenfant',
      organizerName: 'Fondation Nos Enfants Dabord'
    },
    tr: {
      title: 'Hastane Servislerindeki Çocuklara Sevgi Fısıltıları',
      questionPrompt: 'Hastanedeki çocukların yüzünü güldürecek kısa bir hikaye veya neşeli bir kelime söyleyin.',
      description: 'Hastanelerdeki çocuklar iyileşme süreçlerinde şefkatli bir sese ve neşeli hikayelere ihtiyaç duyar.',
      hashtag: '#ÇocukGülüşü',
      organizerName: 'Önce Çocuklarımız Vakfı'
    },
    es: {
      title: 'Susurros de Apoyo para Niños Hospitalizados',
      questionPrompt: 'Cuenta una historia corta o palabras alegres que saquen una sonrisa a los niños en hospitales.',
      description: 'Los niños hospitalizados necesitan una voz cálida e historias alegres para su recuperación.',
      hashtag: '#SonrisaDeNiño',
      organizerName: 'Fundación Nuestros Niños Primero'
    },
    de: {
      title: 'Worte der Aufmunterung für Kinder auf Krankenhausstationen',
      questionPrompt: 'Erzähle eine kurze Geschichte oder fröhliche Worte, die Kindern im Krankenhaus ein Lächeln schenken.',
      description: 'Kinder im Krankenhaus brauchen eine wohlwollende Stimme und aufmunternde Geschichten.',
      hashtag: '#KinderLächeln',
      organizerName: 'Stiftung Unsere Kinder Zuerst'
    }
  }
};

// Pre-defined multi-lingual translations for Audio Messages
const MESSAGE_TRANSLATIONS: Record<string, Record<Language, {
  transcriptText: string;
  createdAt: string;
}>> = {
  msg_1: {
    ar: {
      transcriptText: 'أقول لكل بطل يخوض هذه المعركة: أنت قوي جداً، ورحلتك هذه هي قصة شجاعة نعتز بها جميعاً. الشفاء قريب بإذن الله والابتسامة يليق بها وجهك دائماً!',
      createdAt: 'منذ ساعتين'
    },
    en: {
      transcriptText: 'I say to every hero fighting this battle: You are extremely strong, and your journey is a story of courage we all honor. Healing is near, and a smile always belongs on your face!',
      createdAt: '2 hours ago'
    },
    fr: {
      transcriptText: 'Je dis à chaque héros qui mène ce combat : Vous êtes incroyablement fort. La guérison est proche et votre sourire illumine le monde !',
      createdAt: 'Il y a 2 heures'
    },
    tr: {
      transcriptText: 'Bu savaşı veren her kahramana söylüyorum: Çok güçlüsünüz ve yolculuğunuz hepimizin gurur duyduğu bir cesaret öyküsüdür. İyileşmek çok yakın!',
      createdAt: '2 saat önce'
    },
    es: {
      transcriptText: 'A cada héroe que da esta batalla: Eres increíblemente fuerte y tu historia nos llena de orgullo. ¡La sanación está cerca!',
      createdAt: 'Hace 2 horas'
    },
    de: {
      transcriptText: 'An jeden Helden in diesem Kampf: Du bist unglaublich stark und deine Reise erfüllt uns mit Stolz. Die Genesung ist nah!',
      createdAt: 'Vor 2 Stunden'
    }
  },
  msg_2: {
    ar: {
      transcriptText: 'رسالتي من القلب: لا تفقد الأمل لحظة واحدة. كل يوم جديد هو خطوة نحو التعافي الكامل. نحن ندعو لكم في كل صلاة وأنتم أبطالنا الحقيقيون.',
      createdAt: 'منذ 5 ساعات'
    },
    en: {
      transcriptText: 'My message from the heart: Never lose hope for a single moment. Every new day is a step toward full recovery. You are our true heroes.',
      createdAt: '5 hours ago'
    },
    fr: {
      transcriptText: 'Mon message du cœur : Ne perdez jamais espoir. Chaque jour est un pas vers le rétablissement complet. Vous êtes nos vrais héros.',
      createdAt: 'Il y a 5 heures'
    },
    tr: {
      transcriptText: 'Kalpten gelen mesajım: Bir an bile umudunuzu kaybetmeyin. Her yeni gün tam iyileşmeye doğru bir adımdır.',
      createdAt: '5 saat önce'
    },
    es: {
      transcriptText: 'Mi mensaje desde el corazón: Nunca pierdas la esperanza. Cada nuevo día es un paso hacia la recuperación total. Son nuestros héroes.',
      createdAt: 'Hace 5 horas'
    },
    de: {
      transcriptText: 'Meine Botschaft von Herzen: Verliere niemals die Hoffnung. Jeder neue Tag bringt dich der vollen Genesung näher.',
      createdAt: 'Vor 5 Stunden'
    }
  },
  msg_3: {
    ar: {
      transcriptText: 'إلى أمهاتنا وآبائنا البركة والأصل: أنتم القدوة والبركة، ندعو الله أن يمدكم بالصحة والعافية ويملأ قلوبكم بالسكينة والراحة. نحبكم جميعاً.',
      createdAt: 'منذ يوم واحد'
    },
    en: {
      transcriptText: 'To our blessed parents and elders: You are our role models and blessing. We pray for your health, peace, and comfort. We love you all deeply.',
      createdAt: '1 day ago'
    },
    fr: {
      transcriptText: 'À nos chers aînés : Vous êtes nos modèles et notre bénédiction. Nous vous souhaitons santé, paix et confort. Nous vous aimons tous.',
      createdAt: 'Il y a 1 jour'
    },
    tr: {
      transcriptText: 'Değerli büyüklerimize: Sizler bizim bereketimiz ve rol modelimizsiniz. Sağlık ve huzur dolu günler dileriz.',
      createdAt: '1 gün önce'
    },
    es: {
      transcriptText: 'A nuestros queridos adultos mayores: Son nuestra bendición y ejemplo. Les deseamos salud y tranquilidad. Los queremos mucho.',
      createdAt: 'Hace 1 día'
    },
    de: {
      transcriptText: 'An unsere geschätzten Senioren: Ihr seid unser Segen und Vorbild. Wir wünschen euch Gesundheit und Seelenfrieden.',
      createdAt: 'Vor 1 Tag'
    }
  },
  msg_4: {
    ar: {
      transcriptText: 'يا أبطالنا الصغار! أنتم أقوى وأشجع بكثير مما تظنون، والأيام القادمة ستكون مليئة باللعب والمرح والصحة الجيدة بإذن الله.',
      createdAt: 'منذ يومين'
    },
    en: {
      transcriptText: 'Little heroes! You are so much stronger and braver than you think. Upcoming days will be full of fun games and great health!',
      createdAt: '2 days ago'
    },
    fr: {
      transcriptText: 'Petits héros ! Vous êtes beaucoup plus forts et courageux que vous ne le pensez. Les jours à venir seront remplis de jeux et de santé !',
      createdAt: 'Il y a 2 jours'
    },
    tr: {
      transcriptText: 'Küçük kahramanlar! Düşündüğünüzden çok daha güçlü ve cesursunuz. Önünüzdeki günler neşeli oyunlarla dolu olacak!',
      createdAt: '2 gün önce'
    },
    es: {
      transcriptText: '¡Pequeños héroes! Son mucho más fuertes y valientes de lo que creen. Los próximos días estarán llenos de juegos y salud.',
      createdAt: 'Hace 2 días'
    },
    de: {
      transcriptText: 'Kleine Helden! Ihr seid viel stärker und mutiger als ihr denkt. Die kommenden Tage bringen Spiel, Freude und Gesundheit!',
      createdAt: 'Vor 2 Tagen'
    }
  }
};

// Helper function to translate dynamic Campaign
export function translateCampaign(campaign: Campaign, lang: Language): Campaign {
  if (lang === 'ar') return campaign;
  const trans = CAMPAIGN_TRANSLATIONS[campaign.id]?.[lang];
  if (!trans) return campaign;

  return {
    ...campaign,
    title: trans.title,
    questionPrompt: trans.questionPrompt,
    description: trans.description,
    hashtag: trans.hashtag,
    organizerName: trans.organizerName
  };
}

// Helper function to translate dynamic AudioMessage
export function translateAudioMessage(msg: AudioMessage, lang: Language, campaigns: Campaign[]): AudioMessage {
  if (lang === 'ar') return msg;

  const matchedCamp = campaigns.find(c => c.id === msg.campaignId);
  const campTrans = matchedCamp ? translateCampaign(matchedCamp, lang) : null;
  const msgTrans = MESSAGE_TRANSLATIONS[msg.id]?.[lang];

  return {
    ...msg,
    campaignTitle: campTrans ? campTrans.title : msg.campaignTitle,
    hashtag: campTrans ? campTrans.hashtag : msg.hashtag,
    transcriptText: msgTrans ? msgTrans.transcriptText : msg.transcriptText,
    createdAt: msgTrans ? msgTrans.createdAt : msg.createdAt
  };
}
