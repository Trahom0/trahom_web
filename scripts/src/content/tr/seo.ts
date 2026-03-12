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
  ogImageAlt: 'Trahom humanitarian aid in Gaza',
  twitterHandle: '@TrahomGaza',
  organization: {
    name: 'Trahom',
    description:
      'Trahom, Gazze merkezli bir insani yardım kuruluşudur. Filistinli ailelere ve yetim çocuklara doğrudan, topluluk temelli destek sağlar. Çalışmalarımız gıda, temiz su, tıbbi yardım ve yetim sponsorluğu alanlarına odaklanır ve şeffaflık ile onur temelinde yürütülür.',
    areaServed: ['Gaza Strip', 'Palestine'],
    email: 'info@trahom.org',
    phone: '+1 (555) 123-4567',
    sameAs: [
      'https://www.instagram.com/trahom.charity',
      'https://www.linkedin.com/company/trahomorg/',
      'https://x.com/TrahomGaza',
      'https://www.tiktok.com/@trahomgaza',
      'https://t.me/trahom1'
    ]
  },
  pages: {
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
      title: 'Our Mission in Gaza | Trahom Humanitarian Aid',
      description:
        'Discover Trahom’s community-led mission in Gaza with direct, verified assistance and long-term care for Palestinian families, children, and orphans.',
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
      title: 'Impact & Transparency | Gaza Relief Results',
      description:
        'See measurable impact from Trahom’s Gaza relief programs: food aid, clean water, medical care, and orphan support with accountable reporting.',
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
      title: 'Gaza Relief Campaigns | Orphan, Water & Food Aid',
      description:
        'Support active Gaza relief campaigns, including orphan sponsorship, clean water projects, emergency food assistance, and winter aid. Donate zakat or sadaqah.',
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
      title: 'Contact Trahom | Gaza Humanitarian Aid & Partnerships',
      description:
        'Contact Trahom for Gaza humanitarian aid inquiries, zakat or sadaqah giving, partnerships, or media requests. Our team responds promptly and responsibly.',
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
      title: 'Donate to Gaza | Zakat, Sadaqah & Emergency Relief',
      description:
        'Donate to Gaza and Palestine with secure options for zakat, sadaqah, and recurring support. Fund food, clean water, medical care, and orphan sponsorship.',
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
      title: 'Gaza Relief Gallery | Photos & Videos from the Field',
      description:
        'Explore photos and videos from Trahom’s humanitarian work in Gaza, including aid distribution, water projects, medical relief, and orphan care.',
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
      title: 'Careers | Humanitarian Jobs Supporting Gaza',
      description:
        'Join Trahom’s humanitarian mission supporting Gaza relief and Palestinian recovery. Explore roles in programs, operations, communications, and partnerships.',
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
      title: 'Family Assistance Registration | Trahom Gaza Aid',
      description:
        'Families in Gaza can register to request humanitarian assistance and follow-up support through Trahom’s verified, community-led process.',
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
      title: 'Sponsor a Gaza Orphan | Secure, Verified Support',
      description:
        'Sponsor a child in Gaza through a private, verified process. Your support provides education, healthcare, and daily care for orphaned children.',
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
      title: 'Privacy Policy | Trahom',
      description:
        'Learn how Trahom protects donor and applicant data while delivering humanitarian aid in Gaza and Palestine.',
      keywords: joinKeywords([
        ...baseKeywords,
        'bağışçı gizliliği',
        'veri koruma',
        'bağış güvenliği'
      ]),
      schemaType: 'WebPage'
    },
    terms: {
      title: 'Terms of Service | Trahom',
      description:
        'Review Trahom’s terms for donations, services, and use of our humanitarian aid website.',
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
