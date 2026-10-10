export const shared = {
  imageFallbackAlt: 'Görsel yüklenirken hata oluştu',
  campaignCard: {
    donateLabel: 'Bağış yap',
    sponsorLabel: 'Sponsor ol',
    raisedTemplate: '{{amount}} toplandı',
    fundedTemplate: '%{{percent}} tamamlandı',
    imageAltTemplate: 'Gazze insani yardım kampanyası: {{title}}'
  },
  relatedLinks: {
    title: 'Daha fazlasını keşfedin',
    description: 'Gazze’deki misyonumuz, etkimiz ve devam eden kampanyalarımız hakkında bilgi alın.'
  },
  promoBar: {
    message: 'Gazze’ye kış geliyor: bir aileye sıcaklık hediye edin',
    ctaLabel: 'Şimdi bağış yapın'
  },
  "notFound": {
    "title": "Bu sayfa bulunamadı",
    "description": "Bağlantı hatalı olabilir veya sayfa taşınmış olabilir. Ana sayfaya dönebilir ya da Gazze’deki ailelere şimdi destek olabilirsiniz.",
    "homeLabel": "Ana sayfaya dön",
    "donateLabel": "Şimdi bağış yap"
  }
} as const;
