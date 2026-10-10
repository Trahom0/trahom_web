const baseKeywords = [
  'Gazze insani yardım',
  'Gazze yardım',
  'Filistin insani yardım',
  'Filistin yardım',
  'Gazze hayır kurumu',
  'Filistin yardım kuruluşu',
  'Gazze insani kuruluş',
  'Gazze acil yardım',
  'Gazze yetim sponsorluğu',
  'Filistin yetim bakımı',
  'Gazze temiz su',
  'Gazze gıda yardımı',
  'Gazze tıbbi yardım',
  'Gazze kış yardımı',
  "Gazze’ye bağış",
  "Filistin’e bağış",
  'İslami yardım',
  'Gazze zekat',
  'Gazze zekât',
  'zekat',
  'sadaka',
  'sadaka-i cariye',
  'sadaqah',
  'sadaqa',
  'topluluk temelli yardım',
  'doğrudan yardım Gazze',
  'Gazze STK'
];

const joinKeywords = (keywords: string[]) => keywords.join(', ');

export const seo = {
  languageCode: 'TR',
  htmlLang: 'tr',
  locale: 'tr_TR',
  siteName: 'Trahom',
  siteTagline: 'Gazze için doğrudan ve güvenilir insani yardım',
  defaultTitle: 'Trahom | Gazze İnsani Yardım, Zekât ve Sadaka',
  defaultDescription:
    'Trahom, Gazze merkezli bir insani yardım girişimidir. Gıda, temiz su, tıbbi destek ve yetim sponsorluğu alanlarında doğrudan yardım ulaştırır. Zekât ve sadakanızı güvenle bağışlayın.',
  defaultKeywords: joinKeywords(baseKeywords),
  themeColor: '#F5A623',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Trahom’un Gazze’deki insani yardımı',
  twitterHandle: '@TrahomGaza',
  organization: {
    name: 'Trahom',
    description:
      'Trahom, Gazze merkezli bir insani yardım kuruluşudur. Filistinli ailelere ve yetim çocuklara doğrudan, topluluk temelli destek sağlar. Çalışmalarımız gıda, temiz su, tıbbi yardım ve yetim sponsorluğu alanlarına odaklanır ve şeffaflık ile onur temelinde yürütülür.',
    areaServed: ['Gaza Strip', 'Palestine'],
    email: 'info@trahom.org',
    sameAs: [
      'https://www.instagram.com/trahom.charity',
      'https://www.linkedin.com/company/trahomorg/',
      'https://x.com/TrahomGaza',
      'https://www.tiktok.com/@trahomgaza',
      'https://t.me/trahom1'
    ]
  },
  pages: {
    'not-found': {
      title: 'Sayfa bulunamadı | Trahom',
      description: 'Aradığınız sayfa mevcut değil veya taşınmış.',
      keywords: '',
      robots: 'noindex, follow'
    },
    home: {
      title: 'Trahom | Gazze İnsani Yardım, Zekât ve Sadaka',
      description:
        'Trahom, Gazze ve Filistin’de doğrudan insani yardım ulaştırır. Gıda, temiz su, sağlık desteği ve yetim sponsorluğu için zekât ve sadakanızı güvenle bağışlayın.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze insani yardım kuruluşu',
        'güvenilir Gazze yardımı',
        'Gazze acil yardım',
        'yerel yardım Gazze'
      ]),
      schemaType: 'WebPage'
    },
    mission: {
      title: 'Gazze’deki Misyonumuz | Trahom İnsani Yardım',
      description:
        'Trahom’un Gazze’deki toplum temelli misyonunu keşfedin: Filistinli aileler, çocuklar ve yetimler için doğrudan, doğrulanmış yardım ve uzun vadeli destek.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze yardım misyonu',
        'topluluk temelli insani yardım',
        'doğrudan yardım Gazze',
        'doğrulanmış yardım Gazze',
        'Filistin yardım misyonu'
      ]),
      schemaType: 'AboutPage'
    },
    impact: {
      title: 'Etki ve Şeffaflık | Gazze Yardım Sonuçları',
      description:
        'Trahom’un Gazze yardım programlarının ölçülebilir etkisini görün: gıda yardımı, temiz su, sağlık desteği ve yetim sponsorluğu, hesap verebilir raporlama ile.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze etki raporu',
        'bağış şeffaflığı',
        'yardım hesap verebilirliği',
        'ölçülebilir etki Gazze',
        'insani yardım sonuçları'
      ]),
      schemaType: 'WebPage'
    },
    campaigns: {
      title: 'Gazze Yardım Kampanyaları | Yetim, Su ve Gıda Yardımı',
      description:
        'Yetim sponsorluğu, temiz su projeleri, acil gıda yardımı ve kış desteği gibi devam eden Gazze kampanyalarına destek olun. Zekât veya sadaka bağışlayın.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze yardım kampanyaları',
        'yetim sponsorluğu programı',
        'Gazze su projeleri',
        'Gazze gıda paketleri',
        'Gazze kış yardımı',
        'Gazze tıbbi malzemeler'
      ]),
      schemaType: 'CollectionPage'
    },
    contact: {
      title: 'Trahom ile İletişim | Gazze İnsani Yardım ve İş Birlikleri',
      description:
        'Gazze insani yardım soruları, zekât ve sadaka bağışları, iş birlikleri veya basın talepleri için Trahom ile iletişime geçin. Ekibimiz en kısa sürede yanıt verir.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze yardım iletişim',
        'insani iş birliği',
        'STK iş birliği Gazze',
        'Gazze gönüllülük',
        'medya talepleri'
      ]),
      schemaType: 'ContactPage'
    },
    donate: {
      title: 'Gazze’ye Bağış | Zekât, Sadaka ve Acil Yardım',
      description:
        'Gazze ve Filistin’e zekât, sadaka veya düzenli bağış ile güvenle destek olun. Gıda, temiz su, sağlık desteği ve yetim sponsorluğuna katkı sağlayın.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze zekat bağışı',
        'Filistin zekat',
        'Gazze sadaka',
        'sadaka-i cariye Gazze',
        'aylık bağış Gazze',
        'güvenli bağış'
      ]),
      faq: [
        {
          question: 'Bağışım nereye gidiyor?',
          answer:
            'Bağışları Gazze’de en acil ihtiyaçlara (gıda, su, sağlık desteği, yetim sponsorluğu) yönlendiriyoruz. Belirli bir kampanya seçerseniz bağışınızı oraya aktarırız.'
        },
        {
          question: 'Ödeme güvenli mi?',
          answer: 'Ödemeler Stripe üzerinden işlenir; kart bilgilerinizi saklamayız.'
        },
        {
          question: 'Yetim sponsorluğu nasıl yapılır?',
          answer:
            'Yetim sponsorluğu sayfasına gidip WhatsApp üzerinden dosya talep edin; doğrulama sonrası gerekli bilgileri paylaşırız.'
        }
      ],
      schemaType: 'WebPage'
    },
    gallery: {
      title: 'Gazze Yardım Galerisi | Sahadan Fotoğraf ve Videolar',
      description:
        'Trahom’un Gazze’deki insani çalışmalarından fotoğraf ve videolar: yardım dağıtımları, su projeleri, sağlık desteği ve yetim bakımı.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze yardım fotoğrafları',
        'insani yardım videoları',
        'Gazze saha çalışması',
        'Gazze yardım dağıtımı'
      ]),
      schemaType: 'CollectionPage'
    },
    careers: {
      title: 'Kariyer | Gazze’yi Destekleyen İnsani Görevler',
      description:
        'Gazze’ye yardım eden Trahom’un insani misyonuna katılın. Açık pozisyonlar bu sayfada duyurulur.',
      keywords: joinKeywords([
        ...baseKeywords,
        'insani yardım işleri',
        'STK kariyer Filistin',
        'yardım çalışanı',
        'insani kariyer'
      ]),
      schemaType: 'WebPage'
    },
    'family-signup': {
      title: 'Aile Yardım Kaydı | Trahom Gazze Yardımı',
      description:
        'Gazze’deki aileler, Trahom’un doğrulanmış ve toplum temelli süreci aracılığıyla insani yardım ve takip desteği için kayıt olabilir.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze aile kaydı',
        'Gazze yardım talebi',
        'insani yardım başvurusu',
        'vaka doğrulama Gazze'
      ]),
      schemaType: 'WebPage'
    },
    'sponsor-orphan': {
      title: 'Gazze’de Bir Yetime Sponsor Olun | Güvenli ve Doğrulanmış Destek',
      description:
        'Gazze’de bir çocuğa gizli ve doğrulanmış bir süreçle sponsor olun. Desteğiniz yetim çocuklara eğitim, sağlık ve günlük bakım sağlar.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gazze’de yetim sponsorluğu',
        'Filistin yetim desteği',
        'yetim eğitim desteği',
        'Gazze çocuk refahı',
        'yetim sponsor ol'
      ]),
      schemaType: 'CollectionPage'
    },
    privacy: {
      title: 'Gizlilik Politikası | Trahom',
      description:
        'Trahom’un Gazze ve Filistin’de insani yardım ulaştırırken bağışçı ve başvuru sahiplerinin verilerini nasıl koruduğunu öğrenin.',
      keywords: joinKeywords([
        ...baseKeywords,
        'bağışçı gizliliği',
        'veri koruma',
        'bağış güvenliği'
      ]),
      schemaType: 'WebPage'
    },
    terms: {
      title: 'Kullanım Şartları | Trahom',
      description:
        'Bağışlar, hizmetler ve insani yardım web sitemizin kullanımına ilişkin Trahom şartlarını inceleyin.',
      keywords: joinKeywords([
        ...baseKeywords,
        'bağış şartları',
        'hayır kurumu kullanım şartları',
        'Gazze bağış politikaları'
      ]),
      schemaType: 'WebPage'
    }
  }
} as const;
