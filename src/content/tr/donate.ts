export const donate = {
  status: {
    success: {
      title: 'Bağışınız için teşekkür ederiz',
      description: 'Bağışınız başarıyla alındı. Kısa süre içinde onay ve makbuz e-postası gönderilecektir.'
    },
    cancel: {
      title: 'Bağış iptal edildi',
      description: 'Herhangi bir tahsilat yapılmadı. Hazır olduğunuzda tekrar deneyebilirsiniz.'
    }
  },
  hero: {
    badge: 'Etki yaratın',
    title: 'Bağışınız, onurla ulaştığında etkili olur.',
    description: 'Bağış bir sayfa üzerindeki bir rakam değil, güvenle teslim edilen bir sorumluluktur. Yapabileceğinizi seçin; desteğinizi ailelerin gerçek ihtiyaçlarına ve en hızlı şekilde ulaştıracağız.'
  },
  form: {
    donationType: {
      title: 'Bağış türünü seçin',
      options: {
        oneTime: {
          label: 'Tek seferlik Bağış',
          description: 'Bir defaya mahsus bağış'
        },
        monthly: {
          label: 'Aylık',
          description: 'Sürekli Destek, Devamlılığa Katkı Sağlar'
        }
      }
    },
    amount: {
      title: 'Tutarı seçin',
      customPlaceholder: 'Özel tutar'
    },
    cause: {
      title: 'Bağış alanını seçin',
      items: [
        {
          id: 'orphan-sponsorship',
          name: 'Yetim sponsorluğu',
          description: 'Günlük ihtiyaçlar, eğitim ve sağlık takibini kapsayan sürekli bakım.'
        },
        {
          id: 'water',
          name: 'Temiz su',
          description: 'İçme suyu sağlamak için saha projeleri.'
        },
        {
          id: 'winter-campaign',
          name: 'Kış desteği',
          description: 'Güvenli barınağı olmayan ve soğukla mücadele eden aileler için giysi, battaniye ve ısınma araçları.'
        },
        {
          id: 'food-security',
          name: 'Gıda güvenliği',
          description: 'YEtkilenen ailelere, çocuklar ve yaşlılara öncelik verilerek yemek ve gıda kolileri sağlanması.'
        }
      ]
    },
    info: {
      title: 'Bilgileriniz',
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
        }
      }
    },
    submit: {
      loadingLabel: 'Güvenli ödeme sayfasına yönlendiriliyorsunuz...',
      defaultTemplate: 'Güvenli ödemeye geç ${{amount}}'
    },
    errors: {
      invalidAmount: 'Lütfen geçerli bir bağış tutarı girin.',
      startCheckout: 'Ödeme işlemi başlatılamadı. Lütfen tekrar deneyin.',
      missingCheckoutUrl: 'Ödeme bağlantısı şu anda kullanılamıyor.',
      default: 'İşlem tamamlanamadı. Lütfen tekrar deneyin.'
    }
  },
  impact: {
    examples: [
      { amount: 25, impact: 'Aileler için hazır öğünlerin ulaştırılmasına katkı sağlar.' },
      { amount: 50, impact: 'Acil gıda paketlerinin dağıtımını destekler.' },
      { amount: 100, impact: 'Bir yetim çocuğun düzenli takibini mümkün kılar.' },
      { amount: 250, impact: 'Temiz suya erişimi genişletmeye yardımcı olur.' },
      { amount: 500, impact: 'Yerinden edilmiş bir aile için barınma yükünü hafifletir.' },
      { amount: 1000, impact: 'Acil sağlık müdahalesi ya da nakit desteğe katkı sağlar.' }
    ],
    fallback: 'Her katkının bir karşılığı vardır'
  },
  summary: {
    title: 'Bağış özeti',
    labels: {
      type: 'Tür',
      amount: 'Tutar',
      frequency: 'Sıklık',
      impact: 'Bağışınızın etkisi'
    },
    typeLabels: {
      oneTime: 'Tek seferlik',
      monthly: 'Aylık'
    },
    securityBadges: ['Güvenli ödeme', 'Veri güvenliği']
  },
  trust: {
    title: 'Neden Trahom?',
    items: [
      'Desteğin mümkün olduğunca sahaya yönlendirilmesi',
      'Şeffaf raporlama ve düzenli takip',
      'Toplulukla birlikte yürütülen çalışmalar'
    ]
  },
  stats: {
    title: 'Bağışların sahadaki karşılığı',
    items: [
      { number: '300k+', label: 'Toplam ulaşılan kişi' },
      { number: '3,375+', label: 'Yetim sponsorluğu' },
      { number: '160k+', label: 'Dağıtılan öğün' }
    ]
  }
} as const;
