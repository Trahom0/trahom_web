export const sponsorOrphan = {
  hero: {
    badge: 'Bir yetime sahip çık',
    title: 'Bir çocuğa doğrudan ve mahrem destek.',
    description: 'Her profil kısa bir hikâye ve özel bir kod içerir. Belgeleri WhatsApp üzerinden talep edebilirsiniz. Çocuğun güvenliği ve mahremiyeti için bilgiler yalnızca doğrulama sonrası paylaşılır.',
    primaryCta: 'Uygun çocukları görüntüle',
    secondaryCta: 'Soru sor',
    imageAlt: 'Yetim sponsorluğu'
  },
  steps: {
    title: 'Süreç nasıl işler',
    description: 'Her çocuğun korunmasını, her destekçinin ise gönül rahatlığını sağlamak için süreci sade ve güvenli tutuyoruz.',
    items: [
      {
        title: 'Bir kart seçin',
        description: 'Mevcut profilleri inceleyin ve destek olmak istediğiniz çocuğu seçin.'
      },
      {
        title: 'Belgeleri talep edin',
        description: 'Kart üzerindeki kodu WhatsApp üzerinden gönderin. Belgeler güvenli şekilde paylaşılır.'
      },
      {
        title: 'Sponsorluğu başlatın',
        description: 'Doğrulama tamamlandıktan sonra destek süreci sizinle birlikte başlatılır.'
      }
    ]
  },
  available: {
    title: 'Mevcut sponsorluklar',
    description: 'Her karttaki kodu kullanarak belgeleri talep edebilir ve sponsorluğu başlatabilirsiniz.',
    countLabels: {
      loading: 'Profiller yükleniyor...',
      error: 'Profiller şu anda erişilemiyor',
      availableTemplate: '{{count}} profil mevcut'
    },
    states: {
      loading: 'Sponsorluk profilleri yükleniyor...',
      empty: 'Şu anda uygun profil bulunmuyor. Lütfen daha sonra tekrar kontrol edin.'
    }
  },
  profile: {
    codeLabel: 'Yetim kodu',
    requestLabel: 'Belgeleri talep et',
    altTemplate: 'Yetim {{code}}'
  },
  whatsapp: {
    messageTemplate: '{{code}} kodlu yetime sponsor olmak istiyorum'
  },
  errors: {
    fetch: 'Sponsor verileri yüklenemedi',
    profilesUnavailable: 'Sponsorluk profilleri şu anda alınamıyor.'
  },
  contactLinkLabel: 'Ekibimizle iletişime geçin',
  privacyNote: {
    title: 'Mahremiyet her şeyden önce gelir',
    description: 'Çocukların güvenliği için belgeler yalnızca doğrulama sonrasında paylaşılır.',
    linkLabel: 'Ekibimizle iletişime geçin'
  }
} as const;
