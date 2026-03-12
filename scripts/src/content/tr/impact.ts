export const impact = {
  hero: {
    badge: 'Etkimizi ölçüyoruz',
    title: 'Görülen ve izlenen etki',
    description: 'Her bağış sahada somut bir karşılığa dönüşür. Burada yapılanları açıkça paylaşıyoruz; çünkü güven, sonuçları düzenli olarak takip etmekle kurulur.'
  },
  stats: {
    items: [
      { number: '800k+', label: 'Toplam ulaşılan kişi' },
      { number: '130+', label: 'Gerçekleştirilen kampanyalar' },
      { number: '3,375+', label: 'Yetim sponsorluğu' },
      { number: '135k+', label: 'Dağıtılan öğün' },
      { number: '202,500+', label: 'Temiz suya erişim' },
      { number: '4,050+', label: 'Acil barınma' }
    ]
  },
  programs: {
    title: 'Programlara göre etki',
    description: 'Ailelerin günlük yaşamına doğrudan dokunan alanlarda ölçülebilir sonuçlar.',
    categories: [
      {
        category: 'Süreklilik esaslı programlar',
        impact: 'Uzun vadeli takip ve destekle yürütülen yetim sponsorluğu; ailelerle bağ kopmadan devam eder.',
        stats: [
          { label: 'Aktif yararlanıcı', value: '3,375+' },
          { label: 'Düzenli destek', value: '30 months' }
        ]
      },
      {
        category: 'Acil gıda desteği',
        impact: 'Kayıp, yerinden edilme ve gıda güvencesizliği yaşayan ailelere hızlı gıda müdahalesi.',
        stats: [
          { label: 'Dağıtılan gıda paketi', value: '9,450+' },
          { label: 'Sunulan hazır öğün', value: '135k+' },
          { label: 'Bebek maması', value: '1,350+' }
        ]
      },
      {
        category: 'Su ve sanitasyon',
        impact: 'Sistemlerin zarar gördüğü bölgelerde güvenli içme suyuna erişimi yeniden kuran projeler.',
        stats: [
          { label: 'Su dağıtım kampanyaları', value: '450+' },
          { label: 'Su kuyusu onarımı / inşası', value: '7' },
          { label: 'Yararlanan kişi', value: '100k+' }
        ]
      },
      {
        category: 'Barınma ve koruma',
        impact: 'Kriz nedeniyle yerinden edilen aileler için güvenli barınma ve acil koruma.',
        stats: [
          { label: 'Acil barınma', value: '4,050+' },
          { label: 'Nakit destek', value: '20,250+' }
        ]
      },
      {
        category: 'Sağlık ve iyilik hâli',
        impact: 'Çocuklar ve kırılgan aileler için iyileşmeyi ve hayatta kalmayı destekleyen bakım.',
        stats: [
          { label: 'Psikososyal destek', value: '9,450+' },
          { label: 'Cerrahi müdahale', value: '68' }
        ]
      }
    ]
  },
  stories: {
    title: 'Sahadan hikâyeler',
    description: 'Gerçek insanlar, gerçek değişim. Desteğin ne anlama geldiğini anlatan kısa tanıklıklar.',
    nameAgeTemplate: '{{name}}, {{age}}',
    quoteTemplate: '"{{story}}"',
    imageAltTemplate: 'Gazze insani yardım hikayesi: {{name}}',
    items: [
      {
        name: 'Sponsorluğun anlamı',
        age: 14,
        country: 'Gaza',
        story: 'Düzenli destek sayesinde okulda kalabildim ve ihtiyaçlarım karşılandı. Yalnız olmadığımı hissettim.',
        category: 'Yetim sponsorluğu'
      },
      {
        name: 'Sürekliliğin etkisi',
        age: 38,
        country: 'Gaza',
        story: 'Düzenli yardım ailemize istikrar kazandırdı; en zor günleri birlikte aştık.',
        category: 'Yetim sponsorluğu'
      }
    ]
  },
  growth: {
    title: 'Büyüme süreci',
    labels: {
      totalReach: 'Toplam ulaşılan kişi',
      readyMeals: 'Dağıtılan hazır öğün',
      cleanWater: 'Temiz suya erişim',
      totalFunds: 'Gerçekleştirilen kampanyalar'
    },
    items: [
      {
        year: '2024',
        lives: '132,300+',
        projects: '47,250+',
        countries: '70,875+',
        funds: '130+'
      },
      {
        year: '2025',
        lives: '245,700+',
        projects: '87,750+',
        countries: '131,625+',
        funds: '130+'
      }
    ]
  },
  financial: {
    title: 'Mali şeffaflık',
    description: 'Her bağışı sorumlulukla kullanırız. Kaynakların sahada nasıl dağıtıldığını burada paylaşıyoruz:',
    breakdown: [
      { category: 'Program ve saha hizmetleri', percentage: 90 },
      { category: 'Temel idari giderler', percentage: 6 },
      { category: 'Kaynak geliştirme', percentage: 4 }
    ],
    highlights: [
      {
        title: 'Bağımsız denetim',
        description: 'Dürüstlük ve uyum için düzenli dış denetimler.'
      },
      {
        title: 'Etki takibi',
        description: 'Sonuçları iyileştirmek için periyodik değerlendirmeler.'
      },
      {
        title: 'İnsani standartlar',
        description: 'Uluslararası kabul gören insani ilkelere bağlılık.'
      }
    ]
  },
  cta: {
    title: 'Etkinin parçası olun',
    description: 'Katkınız, doğru zamanda ulaştığında gerçek bir fark yaratır.',
    primaryButton: 'Bağış yap',
    secondaryButton: 'Kampanyaları gör'
  }
} as const;
