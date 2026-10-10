export const privacy = {
  hero: {
    badge: 'Gizlilik politikası',
    title: 'Gizliliğiniz bizim için önemlidir.',
    description:
      'İnsani çalışmalarımızı yürütürken bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu şeffaf biçimde açıklıyoruz.',
    meta: {
      updated: 'Son güncelleme: 6 Ocak 2026',
      contact: 'İletişim: info@trahom.org'
    }
  },
  highlights: [
    {
      title: 'Amaç odaklı veri kullanımı',
      description:
        'Yalnızca yardım faaliyetlerini yürütmek ve bağış süreçlerini tamamlamak için gerekli verileri toplarız.'
    },
    {
      title: 'Güvenlik önceliğimizdir',
      description: 'Şifreleme, erişim kontrolleri ve düzenli denetimlerle verilerinizi koruruz.'
    },
    {
      title: 'Kontrol sizde',
      description: 'Bilgilerinizi güncelleyebilir, erişim talep edebilir veya silinmesini isteyebilirsiniz.'
    }
  ],
  glance: {
    title: 'Kısaca',
    items: [
      'Kişisel bilgileri satmayız.',
      'Veriler yalnızca güvenilir hizmet sağlayıcılarla paylaşılır.',
      'İstediğiniz zaman e-posta bildirimlerinden çıkabilirsiniz.',
      'Site performansını iyileştirmek için çerezler kullanırız.'
    ]
  },
  sections: [
    {
      title: 'Topladığımız bilgiler',
      items: [
        'Contact details you provide when donating, subscribing, or contacting us.',
        'Donation and payment details processed securely by our payment partners.',
        'Usage data such as pages viewed, device type, and referral sources.'
      ]
    },
    {
      title: 'Bilgileri nasıl kullanıyoruz',
      items: [
        'Process donations, respond to inquiries, and deliver requested services.',
        'Send program updates, receipts, and organizational news.',
        'Analyze site performance and improve accessibility and security.'
      ]
    },
    {
      title: 'Paylaşım ve açıklama',
      items: [
        'Service providers who help us operate the site and process payments.',
        'Partners when you opt in to shared initiatives or joint campaigns.',
        'Legal or regulatory requests when required by law.'
      ]
    },
    {
      title: 'Çerezler ve analiz',
      items: [
        'We use cookies to remember preferences and keep the site secure.',
        'Analytics help us understand what content is most useful to supporters.',
        'You can manage cookies through your browser settings.'
      ]
    },
    {
      title: 'Veri saklama ve güvenlik',
      items: [
        'We retain information only as long as needed for operational or legal purposes.',
        'Access to sensitive data is limited to trained team members.',
        'No method of transmission is 100 percent secure, but we work to protect data.'
      ]
    },
    {
      title: 'Haklarınız ve tercihleriniz',
      items: [
        'Request access to, correction of, or deletion of your personal data.',
        'Opt out of marketing communications while still receiving receipts.',
        'Contact us with questions about this policy or your data.'
      ]
    }
  ],
  cta: {
    eyebrow: 'Küresel sorumluluk',
    title: 'Gizlilikle ilgili sorularınız mı var?',
    description: 'Ekibimizle iletişime geçin, en kısa sürede yanıtlayalım.',
    primaryButton: 'Bizimle iletişime geçin',
    secondaryButton: 'Kullanım şartlarını okuyun'
  }
} as const;
