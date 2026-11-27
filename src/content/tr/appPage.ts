export const appPage = {
  badge: 'Trahom’un resmi uygulaması',
  title: 'Gazze’de bir yetime sponsor olun, sponsorluğunuzu telefonunuzdan takip edin',
  description: 'Sponsor bekleyen çocukların dosyalarına göz atın, destek olmak istediğiniz çocuğu seçin ve sponsorluğunuzu tek yerden takip edin.',
  freeNote: 'Android ve iPhone’da ücretsiz',
  googlePlay: 'Google Play’den indirin',
  appStore: 'App Store’dan indirin',
  screenshotAlt: 'Trahom uygulamasında sponsor bekleyen dosyalar ekranı',
  features: {
    title: 'Uygulamada neler var',
    items: [
      { title: 'Bir çocuk seçin', text: 'Koda göre arayın; cinsiyet, yaş ve yetimlik türüne göre filtreleyin.' },
      { title: 'Sponsorluğunuzu takip edin', text: 'Sponsorluğunuzla ilgili her şey telefonunuzda tek yerde.' },
      { title: 'Teslim onayı', text: 'Yardımın aileye gerçekten ne zaman teslim edildiğini görün.' },
      { title: 'Doğrudan iletişim', text: 'Çocuk ve ailesiyle doğrudan iletişim kurun, nasıl olduklarını öğrenin.' },
      { title: 'Çocukların mahremiyeti', text: 'Fotoğraflarda çocukların yüzleri gizlenir; her çocuğun tam adı yerine bir kodu vardır.' }
    ]
  },
  steps: {
    title: 'Üç adım',
    items: [
      { title: 'Uygulamayı indirin', text: 'Google Play veya App Store’dan.' },
      { title: 'Bir çocuk seçin', text: 'Dosyalara göz atın ve sponsor olmak istediğiniz çocuğu seçin.' },
      { title: 'Sponsorluğu başlatın', text: 'Sponsorluğunuzu onaylayın ve uygulamadan takip edin.' }
    ]
  },
  cta: {
    title: 'Sponsorluğunuza bugün başlayın',
    text: 'Uygulama Trahom tarafından hazırlandı. Gazze’de bir yetime sponsor olmanın ve onu takip etmenin en kolay yolu.',
    browseLabel: 'Web sitesini mi tercih edersiniz? Dosyalara buradan göz atın'
  }
} as const;
