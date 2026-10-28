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
  whatsapp: {
    label: 'Bize yazın',
    ariaLabel: 'Trahom ekibiyle WhatsApp üzerinden yazışın',
    hint: 'WhatsApp — Pazar–Perşembe, 09:00–16:00 (Gazze saati) arasında yanıt veriyoruz',
    messages: {
      default: 'Merhaba Trahom, bir sorum var.',
      donate: 'Merhaba Trahom, bağış hakkında bir sorum var.',
      'sponsor-orphan': 'Merhaba Trahom, yetim sponsorluğu hakkında bilgi almak istiyorum.',
      campaigns: 'Merhaba Trahom, kampanyalarınız hakkında bir sorum var.',
      contact: 'Merhaba Trahom, sizinle iletişime geçmek istiyorum.',
      careers: 'Merhaba Trahom, sizinle çalışmak veya gönüllü olmak hakkında bir sorum var.'
    }
  },
  consent: {
    title: 'Gizlilik tercihleri',
    text: 'İzninizle, farkındalık kampanyalarımızı ölçmek için Meta’yı (Facebook) kullanıyoruz. Formlarımıza yazdıklarınızı asla görmez.',
    policyLink: 'Gizlilik politikası',
    accept: 'İzin ver',
    decline: 'Hayır, teşekkürler'
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
