export const impact = {
  hero: {
    badge: 'Etkimizi ölçüyoruz',
    title: 'Görülen ve izlenen etki',
    description: 'Her bağış sahada somut bir karşılığa dönüşür. Burada yapılanları açıkça paylaşıyoruz; çünkü güven, sonuçları düzenli olarak takip etmekle kurulur.'
  },
  stats: {
    items: [
      { number: '300 bin+', label: 'Toplam ulaşılan kişi' },
      { number: '150+', label: 'Gerçekleştirilen kampanyalar' },
      { number: '3.375+', label: 'Yetim sponsorluğu' },
      { number: '160 bin+', label: 'Dağıtılan öğün' },
      { number: '190 bin+', label: 'Temiz suya erişim' },
      { number: '4.050+', label: 'Kış desteği alan aile' }
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
          { label: 'Sponsorlu yetim', value: '3.375+' }
        ]
      },
      {
        category: 'Acil gıda desteği',
        impact: 'Kayıp, yerinden edilme ve gıda güvencesizliği yaşayan ailelere hızlı gıda müdahalesi.',
        stats: [
          { label: 'Dağıtılan gıda paketi', value: '22.000+' },
          { label: 'Sunulan hazır öğün', value: '160 bin+' },
          { label: 'Bebek maması', value: '1.350+' }
        ]
      },
      {
        category: 'Su ve sanitasyon',
        impact: 'Sistemlerin zarar gördüğü bölgelerde güvenli içme suyuna erişimi yeniden kuran projeler.',
        stats: [
          { label: 'Su dağıtım kampanyaları', value: '450+' },
          { label: 'Su kuyusu onarımı / inşası', value: '7' },
          { label: 'Yararlanan kişi', value: '190 bin+' }
        ]
      },
      {
        category: 'Barınma ve koruma',
        impact: 'Kriz nedeniyle yerinden edilen aileler için güvenli barınma ve acil koruma.',
        stats: [
          { label: 'Kış desteği alan aile', value: '4.050+' },
          { label: 'Nakit destek', value: '20.000+' }
        ]
      },
      {
        category: 'Sağlık ve iyilik hâli',
        impact: 'Çocuklar ve kırılgan aileler için iyileşmeyi ve hayatta kalmayı destekleyen bakım.',
        stats: [
          { label: 'Psikososyal destek', value: '9.450+' },
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
        country: 'Gazze',
        story: 'Düzenli destek sayesinde okulda kalabildim ve ihtiyaçlarım karşılandı. Yalnız olmadığımı hissettim.',
        category: 'Yetim sponsorluğu'
      },
      {
        name: 'Sürekliliğin etkisi',
        age: 38,
        country: 'Gazze',
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
    items: []
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
        title: 'Toplum temelli',
        description: 'Gazze’deki yerel ekipler ve ortaklarla doğrudan uygulama.'
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
