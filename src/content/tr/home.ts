export const home = {
  hero: {
    title: 'Onurla ulaşan destek, insandan insana.',
    description: 'Gazze’de ihtiyaçlar büyürken zaman daralıyor. Biz, sahada ailelerle doğrudan temas kurarak gecikmeye tahammülü olmayanı ulaştırmaya çalışıyoruz: gıda, su, sağlık desteği ve insanı ayakta tutan dayanışma. Trahom, sahadan doğan bir inisiyatif; yardımı emanet bilir ve insana yakışır biçimde ulaştırmayı ilke edinir.',
    ctaLabel: 'Dayanışmaya katıl',
    donorCount: 'Binlerce kişi düzenli destek veriyor',
    stats: {
      totalReach: {
        number: '800k+',
        label: 'Toplam ulaşılan kişi',
        color: 'bg-[#4A90E2]'
      },
      readyMeals: {
        number: '135k+',
        label: 'Dağıtılan hazır öğün',
        color: 'bg-[#A8D5E2]'
      },
      communityCard: {
        title: 'Sahadan, toplumla birlikte',
        description: '3.375+ kişi düzenli takip ve destek alıyor; geçici müdahale değil, süreklilik esas.',
        color: 'bg-[#F5A623]'
      },
      fundsRaised: {
        number: '130+',
        label: 'Gerçekleştirilen kampanyalar',
        color: 'bg-[#FFF8E1]'
      }
    }
  },
  campaigns: {
    title: 'Devam eden kampanyalar',
    viewAllLabel: 'Tüm kampanyaları gör →',
    cards: [
      {
        id: 'orphan-sponsorship',
        title: 'Yetim sponsorluğu',
        description: 'Yetim çocuklara düzenli destek: temel ihtiyaçlar, eğitim takibi ve sağlık yönlendirmesiyle uzun vadeli bir güven alanı.',
        goal: '$1.25M',
        percentage: 2,
        primaryBadge: '3.375+ çocuk için düzenli destek',
        color: 'bg-[#4A90E2]',
        sponsorLabel: 'Sponsor ol'
      },
      {
        id: 'water',
        title: 'Temiz su',
        description: '450+ su dağıtım kampanyası ve 7 su kuyusu onarımı / inşasıyla güvenli suya erişimi destekliyoruz.',
        goal: '$180,000',
        percentage: 17,
        primaryBadge: '100k+ yararlanıcı',
        color: 'bg-[#A8D5E2]'
      },
      {
        id: 'winter-campaign',
        title: 'Kış desteği',
        description: 'Güvenli barınağı olmayan ailelere kıyafet, battaniye ve temel ısınma desteği.',
        goal: '$120,000',
        percentage: 56,
        primaryBadge: '4.050+ aileye doğrudan destek',
        color: 'bg-[#F5A623]'
      }
    ],
    supportCard: {
      title: 'Yerelin eli, gerçek bakım',
      description: 'Toplumun içinden çalışırız. Önce dinler, sonra harekete geçer, ihtiyaç sürdükçe yanında kalırız.',
      color: 'bg-[#A8D5E2]'
    },
    donorsFeature: {
      videoAriaLabel: 'Our Donors',
      title: 'Bunu mümkün kılanlar',
      description: 'Bu çalışmalar, “bir defalık” değil “süreklilik” diyen binlerce kişinin emeği ve güveniyle yürüyor.'
    }
  },
  gallery: {
    title: 'Sahadan görüntüler',
    viewAllLabel: 'Galerinin tamamını gör →',
    gridLabels: ['İnsani yardım', 'Topluluk geliştirme', 'Tıbbi destek', 'Eğitim'],
    feature: {
      videoAriaLabel: 'Birlikte etki oluşturuyoruz',
      title: 'Birlikte, sahada',
      description: 'Gerçek hikâyeler, gerçek insanlar, gerçek ihtiyaçlar. Yardımın nereye ulaştığını göstermek için.'
    }
  },
  about: {
    title: 'Trahom hakkında',
    viewMissionLabel: 'Misyonumuzu oku →',
    sinceBadge: 'Since 2024',
    cardTitle: 'Trahom hakkında',
    paragraphs: [
      'Trahom, Gazze’deki gerçek ve sürekli ihtiyaçlara bir cevap olarak doğdu. Her şeyini kaybeden aileler ve yüzünü çevirmeyi reddeden insanlar ile başladı.',
      'Etkilenen ailelerle doğrudan çalışırız; gıda, su, sağlık desteği ve yetimlere yönelik sürdürülebilir bakıma odaklanırız. Bizim için önemli olan hız kadar sorumluluktur: doğru olana, doğru zamanda ulaşmak.'
    ],
    stats: {
      yearsOfService: {
        number: '2+',
        label: 'Years of service',
        color: 'bg-[#4A90E2]'
      },
      localPartners: {
        number: '10',
        label: 'Local partners',
        color: 'bg-[#A8D5E2]'
      },
      volunteers: {
        number: '20+',
        label: 'Volunteers',
        color: 'bg-[#F5A623]'
      },
      valuesCard: {
        title: 'İlke ve değerlerimiz',
        items: [
          '• Emanete sadakat',
          '• Onur ve mahremiyet',
          '• Takip ve süreklilik',
          '• Toplumla eşit ortaklık'
        ]
      }
    }
  },
  missionCards: [
    {
      title: 'İnsani yardım',
      description: 'Soykırımdan etkilenen topluluklara acil müdahale ve temel ihtiyaç desteği.'
    },
    {
      title: 'Topluluk geliştirme',
      description: 'Altyapıyı güçlendiren, istihdam oluşturan ve yerel ekonomileri destekleyen uzun vadeli programlar.'
    },
    {
      title: 'Yerel iş birlikleri',
      description: 'Desteği etkin biçimde ulaştırmak için Gazze’deki yerel komiteler ve kuruluşlarla birlikte çalışıyoruz.'
    }
  ],
  subscribe: {
    title: 'Haberdar olun',
    description: 'Sahadan gelişmeler, kampanyalar ve güvenilir destek yolları—gereksiz mesajlar olmadan.',
    inputPlaceholder: 'E-posta adresiniz',
    buttonLabel: 'Abone ol',
    helperText: 'Gizliliğinize saygı duyarız. İstediğiniz zaman abonelikten çıkabilirsiniz.',
    successMessage: 'Teşekkürler, abone oldunuz. Güncellemelerimiz e-postanıza ulaşacak.',
    errorMessage: 'Şu anda abone olamadınız. Lütfen biraz sonra tekrar deneyin.'
  }
} as const;
