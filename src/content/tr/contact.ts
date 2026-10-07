export const contact = {
  hero: {
    badge: 'Bizimle İletişime Geçin',
    title: 'Dinlemek için buradayız',
    description: 'İş Birliği Fırsatı'
  },
  form: {
    title: 'Bize mesaj gönderin',
    fields: {
      firstName: {
        label: 'Ad *',
        placeholder: ''
      },
      lastName: {
        label: 'Soyad *',
        placeholder: ''
      },
      email: {
        label: 'E-posta adresi *',
        placeholder: ''
      },
      phone: {
        label: 'Telefon numarası',
        placeholder: ''
      },
      subject: {
        label: 'Konu *',
        placeholder: 'Bir konu seçin',
        options: [
          { value: 'general', label: 'Genel bilgi' },
          { value: 'donation', label: 'Bağış hakkında soru' },
          { value: 'partnership', label: 'İş birliği teklifi' },
          { value: 'volunteer', label: 'Gönüllülük bilgisi' },
          { value: 'sponsorship', label: 'Yetim sponsorluğu' },
          { value: 'support', label: 'Destek talebi' }
        ]
      },
      message: {
        label: 'Mesaj *',
        placeholder: 'Size nasıl yardımcı olabileceğimizi anlatın...'
      }
    },
    submit: {
      defaultLabel: 'Mesajı gönder',
      sendingLabel: 'Mesaj gönderiliyor...',
      sentLabel: 'Mesaj gönderildi!'
    },
    successMessage: 'Bizimle iletişime geçtiğiniz için teşekkür ederiz. En geç 24 saat içinde size geri döneceğiz.',
    errorMessage: 'Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin veya bize doğrudan e-posta gönderin.'
  },
  quickContact: {
    title: 'Hızlı iletişim',
    phone: {
      label: 'Telefon',
      value: '+1 (555) 123-4567'
    },
    email: {
      label: 'E-posta',
      value: 'info@trahom.org'
    },
    location: {
      label: 'Konum',
      value: 'Gaza'
    }
  },
  officeHours: {
    title: 'Çalışma saatleri',
    schedule: [
      { day: 'Pazartesi – Cuma', hours: '09:00 – 18:00' },
      { day: 'Cumartesi', hours: '10:00 – 16:00' },
      { day: 'Pazar', hours: 'Kapalı' }
    ]
  },
  social: {
    title: 'Bizi takip edin',
    description: 'Güncel çalışmalarımız ve kampanyalarımızdan haberdar olun'
  },
  globalOffices: {
    title: 'Küresel ofislerimiz',
    description: 'Yerel destek ve iş birliği imkânları için size en yakın ofisi bulun.',
    offices: [
      {
        city: 'New York',
        country: 'United States',
        address: '123 Humanitarian Way',
        postal: 'New York, NY 10001',
        phone: '+1 (555) 123-4567',
        email: 'ny@trahom.org'
      },
      {
        city: 'London',
        country: 'United Kingdom',
        address: '45 Charity Lane',
        postal: 'London SW1A 1AA',
        phone: '+44 20 7123 4567',
        email: 'london@trahom.org'
      },
      {
        city: 'Dubai',
        country: 'United Arab Emirates',
        address: '78 Aid Boulevard',
        postal: 'Dubai, UAE',
        phone: '+971 4 123 4567',
        email: 'dubai@trahom.org'
      }
    ]
  },
  about: {
    title: 'Trahom hakkında',
    paragraphs: [
      'Trahom, Gazze\'den çıkan gerçek ihtiyaçları karşılamayı amaçlayan insani bir girişimdir.',
      'SDoğrudan etkilenen ailelerle çalışıyoruz; yetimlere, gıda güvenliğine, temiz suya ve yaşam için gerekli diğer ihtiyaçlara odaklanıyoruz. Durumları mümkün olduğunca kontrol ediyor ve takip ediyoruz, çünkü yardım bir emanettir.',
      'Mesajımız basit: Yardım onurla ulaşıp, etkisi takip ile sürsün, sözlerle değil.'
    ],
    whyTitle: 'Neden Trahom?',
    whyItems: [
      'Aracı olmadan doğrudan ulaştırılan destek',
      'Her vaka için doğrulama ve düzenli takip',
      'Gazze ve acil insani ihtiyaçlara odaklanma',
      'Sözlere değil güvene, hesap verebilirliğe ve sürekliliğe dayalı yapı'
    ]
  }
} as const;
