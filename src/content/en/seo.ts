const baseKeywords = [
  'Gaza humanitarian aid',
  'Gaza relief',
  'Palestine humanitarian aid',
  'Palestine relief',
  'Gaza charity',
  'Palestinian charity',
  'humanitarian organization Gaza',
  'emergency aid Gaza',
  'orphan sponsorship Gaza',
  'orphan care Palestine',
  'clean water Gaza',
  'food aid Gaza',
  'medical relief Gaza',
  'winter relief Gaza',
  'donate to Gaza',
  'donate to Palestine',
  'Islamic charity',
  'zakat Gaza',
  'zakah Gaza',
  'zaka',
  'sadaqah Gaza',
  'sadaqa',
  'sadaka',
  'sadaqah jariyah',
  'community-led aid',
  'direct aid Gaza',
  'Palestinian families support',
  'Gaza NGO'
];

const joinKeywords = (keywords: string[]) => keywords.join(', ');

export const seo = {
  languageCode: 'EN',
  htmlLang: 'en',
  locale: 'en_US',
  siteName: 'Trahom',
  siteTagline: 'Gaza humanitarian aid and Palestinian relief',
  defaultTitle: 'Trahom | Gaza Humanitarian Aid, Zakat & Sadaqah',
  defaultDescription:
    'Trahom is a Gaza-based humanitarian organization delivering food, clean water, medical relief, and orphan sponsorship across Palestine. Give zakat or sadaqah with transparency and dignity.',
  defaultKeywords: joinKeywords(baseKeywords),
  themeColor: '#F5A623',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Trahom humanitarian aid in Gaza',
  twitterHandle: '@TrahomGaza',
  organization: {
    name: 'Trahom',
    description:
      'Trahom is a Gaza-based humanitarian organization providing direct, community-led relief for Palestinian families and orphaned children. Our work centers on food assistance, clean water, medical support, and orphan sponsorship, delivered with transparency and dignity.',
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
      title: 'Page not found | Trahom',
      description: 'The page you are looking for does not exist or has moved.',
      keywords: '',
      robots: 'noindex, follow'
    },
    home: {
      title: 'Trahom | Gaza Humanitarian Aid, Zakat & Sadaqah',
      description:
        'Trahom delivers direct humanitarian aid in Gaza and Palestine, including food, clean water, medical relief, and orphan sponsorship. Give zakat or sadaqah with transparency and dignity.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gaza humanitarian organization',
        'trusted Gaza charity',
        'Gaza emergency relief',
        'local aid Gaza'
      ]),
      schemaType: 'WebPage'
    },
    mission: {
      title: 'Our Mission in Gaza | Trahom Humanitarian Aid',
      description:
        'Discover Trahom’s community-led mission in Gaza with direct, verified assistance and long-term care for Palestinian families, children, and orphans.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gaza relief mission',
        'community-led humanitarian aid',
        'direct assistance Gaza',
        'verified aid Gaza',
        'Palestine humanitarian mission'
      ]),
      schemaType: 'AboutPage'
    },
    impact: {
      title: 'Impact & Transparency | Gaza Relief Results',
      description:
        'See measurable impact from Trahom’s Gaza relief programs: food aid, clean water, medical care, and orphan support with accountable reporting.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gaza impact report',
        'donation transparency',
        'aid accountability',
        'measurable impact Gaza',
        'humanitarian results Gaza'
      ]),
      schemaType: 'WebPage'
    },
    campaigns: {
      title: 'Gaza Relief Campaigns | Orphan, Water & Food Aid',
      description:
        'Support active Gaza relief campaigns, including orphan sponsorship, clean water projects, emergency food assistance, and winter aid. Donate zakat or sadaqah.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gaza relief campaigns',
        'orphan sponsorship program',
        'water wells Gaza',
        'food parcels Gaza',
        'winter aid Gaza',
        'medical supplies Gaza'
      ]),
      schemaType: 'CollectionPage'
    },
    contact: {
      title: 'Contact Trahom | Gaza Humanitarian Aid & Partnerships',
      description:
        'Contact Trahom for Gaza humanitarian aid inquiries, zakat or sadaqah giving, partnerships, or media requests. Our team responds promptly and responsibly.',
      keywords: joinKeywords([
        ...baseKeywords,
        'contact Gaza charity',
        'humanitarian partnerships',
        'NGO partnership Gaza',
        'volunteer Gaza aid',
        'media inquiries Gaza'
      ]),
      schemaType: 'ContactPage'
    },
    donate: {
      title: 'Donate to Gaza | Zakat, Sadaqah & Emergency Relief',
      description:
        'Donate to Gaza and Palestine with secure options for zakat, sadaqah, and recurring support. Fund food, clean water, medical care, and orphan sponsorship.',
      keywords: joinKeywords([
        ...baseKeywords,
        'donate zakat Gaza',
        'zakat for Palestine',
        'sadaqah for Gaza',
        'sadaqah jariyah Gaza',
        'monthly donation Gaza',
        'secure Gaza donation'
      ]),
      faq: [
        {
          question: 'Where does my donation go?',
          answer:
            'We direct donations to the most urgent Gaza programs such as food aid, clean water, medical support, and orphan sponsorship. If you choose a specific campaign, we route your gift there.'
        },
        {
          question: 'Is my payment secure?',
          answer: 'Payments are processed by Stripe, and we do not store your card details.'
        },
        {
          question: 'How can I sponsor an orphan?',
          answer:
            'Visit the Sponsor an Orphan page, request documents via WhatsApp, and we will share verified details before sponsorship begins.'
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
        'Gaza relief photos',
        'humanitarian aid videos',
        'field work Gaza',
        'aid distribution Gaza'
      ]),
      schemaType: 'CollectionPage'
    },
    careers: {
      title: 'Careers | Humanitarian Jobs Supporting Gaza',
      description:
        'Join Trahom’s humanitarian mission supporting Gaza relief and Palestinian recovery. Explore roles in programs, operations, communications, and partnerships.',
      keywords: joinKeywords([
        ...baseKeywords,
        'humanitarian jobs Gaza',
        'NGO careers Palestine',
        'aid worker opportunities',
        'humanitarian careers'
      ]),
      schemaType: 'WebPage'
    },
    'family-signup': {
      title: 'Orphan Sponsorship Registration | Trahom Gaza Aid',
      description:
        'Guardians in Gaza can register orphaned children for Trahom’s orphan sponsorship program. Every case is reviewed and verified before sponsorship begins.',
      keywords: joinKeywords([
        ...baseKeywords,
        'Gaza orphan registration',
        'orphan sponsorship application',
        'register orphan Gaza',
        'case verification Gaza'
      ]),
      schemaType: 'WebPage'
    },
    'sponsor-orphan': {
      title: 'Sponsor a Gaza Orphan | Secure, Verified Support',
      description:
        'Sponsor a child in Gaza through a private, verified process. Your support provides education, healthcare, and daily care for orphaned children.',
      keywords: joinKeywords([
        ...baseKeywords,
        'sponsor a child Gaza',
        'orphan sponsorship Palestine',
        'support orphan education',
        'Gaza child welfare',
        'sponsor an orphan'
      ]),
      schemaType: 'CollectionPage'
    },
    privacy: {
      title: 'Privacy Policy | Trahom',
      description:
        'Learn how Trahom protects donor and applicant data while delivering humanitarian aid in Gaza and Palestine.',
      keywords: joinKeywords([
        ...baseKeywords,
        'donor privacy',
        'charity data protection',
        'donation data security'
      ]),
      schemaType: 'WebPage'
    },
    terms: {
      title: 'Terms of Service | Trahom',
      description:
        'Review Trahom’s terms for donations, services, and use of our humanitarian aid website.',
      keywords: joinKeywords([
        ...baseKeywords,
        'donation terms',
        'charity terms of service',
        'Gaza charity policies'
      ]),
      schemaType: 'WebPage'
    }
  }
} as const;
