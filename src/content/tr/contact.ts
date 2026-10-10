export const contact = {
  hero: {
    badge: 'Bizimle İletişime Geçin',
    title: 'Dinlemek için buradayız',
    description: 'Çalışmalarımız hakkında sorularınız mı var, iş birliği mi yapmak istiyorsunuz ya da desteğe mi ihtiyacınız var? Ekibimiz yardımcı olmaya hazır. Bugün bize yazın, birlikte fark yaratalım.'
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
    successTitle: 'Mesajınızı aldık',
    successMessage: 'Bizimle iletişime geçtiğiniz için teşekkür ederiz. En kısa sürede size dönüş yapacağız.',
    sendAnotherLabel: 'Yeni bir mesaj gönder',
    errorMessage: 'Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin veya bize doğrudan e-posta gönderin.'
  },
  quickContact: {
    title: 'Hızlı iletişim',
    email: {
      label: 'E-posta',
      value: 'info@trahom.org'
    }
  },
  officeHours: {
    title: 'Çalışma saatleri (Gazze saati)',
    schedule: [
      { day: 'Pazar – Perşembe', hours: '09:00 – 16:00' },
      { day: 'Cuma – Cumartesi', hours: 'Kapalı' }
    ]
  },
  social: {
    title: 'Bizi takip edin',
    description: 'Güncel çalışmalarımız ve kampanyalarımızdan haberdar olun'
  },
  about: {
    title: 'Trahom hakkında',
    paragraphs: [
      'Trahom, Gazze\'den çıkan gerçek ihtiyaçları karşılamayı amaçlayan insani bir girişimdir.',
      'Doğrudan etkilenen ailelerle çalışıyoruz; yetimlere, gıda güvenliğine, temiz suya ve yaşam için gerekli diğer ihtiyaçlara odaklanıyoruz. Durumları mümkün olduğunca kontrol ediyor ve takip ediyoruz, çünkü yardım bir emanettir.',
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
