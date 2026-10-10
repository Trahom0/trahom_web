export const campaigns = {
  hero: {
    title: 'Devam Eden Acil İnsani Yardım Kampanyaları',
    description: 'Kampanyalarımız sahadaki gerçek ihtiyaçlardan yola çıkar, yardımın en etkili olacağı noktalara ulaşır ve güvenilirliği sağlayan sürekli takip ile yürütülür.'
  },
  stats: {
    activeLabel: 'Devam Eden Kampanyalar',
    totalRaised: {
      number: '150+',
      label: 'Gerçekleştirilen kampanyalar'
    },
    activeDonors: {
      number: '3.375+',
      label: 'Sponsorlu yetim'
    },
    peopleHelped: {
      number: '300 bin+',
      label: 'Yararlanan Sayısı'
    }
  },
  filter: {
    title: 'Kategoriye göre filtrele',
    allLabel: 'Tümü'
  },
  items: [
    {
      id: 'orphan-sponsorship',
      title: 'Yetim sponsorluğu',
      description: 'Destekten yoksun kalan çocuklara sürekli bakım sağlanır; bu, günlük ihtiyaçları, eğitim ve sağlık takibini kapsar, onurları korunur ve istikrarları güvence altına alınır.',
      goal: '$1.25M',
      percentage: 2,
      primaryBadge: '3.375’ten fazla çocuk doğrudan bakım altında',
      color: 'bg-[#4A90E2]',
      category: 'Eğitim',
      sponsorCta: true
    },
    {
      id: 'water',
      title: 'Su ve Kanalizasyon',
      description: '450+ su dağıtım kampanyası ve 7 su kuyusu onarımı / inşasıyla güvenli suya erişimi destekliyoruz.',
      goal: '$180,000',
      percentage: 17,
      primaryBadge: '190 bin+ yararlanıcı',
      color: 'bg-[#A8D5E2]',
      category: 'Su ve sanitasyon'
    },
    {
      id: 'winter-campaign',
      title: 'Kış kampanyası',
      description: 'Güvenli barınağı olmayan ve soğukla mücadele eden ailelere; giysi, battaniye ve temel ısınma araçlarıyla sıcaklık sağlanması.',
      goal: '$120,000',
      percentage: 56,
      primaryBadge: '4.050’den fazla aileye doğrudan destek',
      color: 'bg-[#F5A623]',
      category: 'Acil yardım'
    },
    {
      id: 'food-security',
      title: 'Gıda güvenliği programı',
      description: 'Kayıp ve yerinden edilme koşullarında yaşayan ailelere, çocuklar ve yaşlılara öncelik verilerek düzenli öğünler ve gıda kolileri ulaştırılması.',
      goal: '$175,000',
      percentage: 75,
      primaryBadge: '160.000’den fazla yemek servisi yapıldı',
      color: 'bg-[#A8D5E2]',
      category: 'Gıda güvenliği'
    }
  ],
  cta: {
    title: 'Hangi kampanyayı seçeceğinize karar veremediniz mi?',
    description: 'Genel bir bağışta bulunabilirsiniz; biz de yardımın en çok ihtiyaç duyulan yerlere ulaşmasını ve en etkili şekilde kullanılmasını sağlarız.',
    buttonLabel: 'Genel bağış yap'
  }
} as const;
