export const mission = {
  hero: {
    badge: 'Misyonumuz',
    title: 'Gazze’den, sorumlulukla.',
    description: 'Trahom masa başında değil, sahada doğdu. İhtiyacın sözden önce geldiği yerdeyiz. Yardımın gecikmesinin bedelini insanların ödediğini biliyor, bu yüzden gerektiği anda orada olmayı seçiyoruz.'
  },
  vision: {
    title: 'Vizyonumuz',
    description: 'Çocukların temiz suya korkmadan ulaşabildiği, yetimlerin bir dosya numarası değil bir isimle anıldığı bir Gazze hayal ediyoruz. Yaşamın sadece hayatta kalmaktan ibaret olmadığı, onurun adım adım geri döndüğü bir gelecek.'
  },
  approach: {
    title: 'Nasıl çalışıyoruz',
    description: 'Ailelerle doğrudan temas kurarız. Önce dinler, sonra doğrular, ardından hızla harekete geçeriz. Acelemiz gelişigüzellikten değil, beklemenin mümkün olmadığı durumlardandır.'
  },
  coreValues: {
    title: 'Temel ilkelerimiz',
    description: 'Bunlar vitrin sözleri değil; her kararda bize yön veren ölçütlerdir.',
    items: [
      {
        title: 'Merhamet',
        description: 'Her insanı bir amaç olarak görür, yardımı üstünlük değil sorumluluk kabul ederiz.'
      },
      {
        title: 'Emanet bilinci',
        description: 'Bize ulaşan her destek bir emanettir; şeffaflık ve hesap verebilirlik bu bilincin gereğidir.'
      },
      {
        title: 'Sağduyu',
        description: 'Sahada işe yarayan, insanın hayatını gerçekten kolaylaştıran çözümleri tercih ederiz.'
      },
      {
        title: 'Ortaklık',
        description: 'Toplumla birlikte çalışırız; kalıcı etki ancak birlikte mümkündür.'
      }
    ]
  },
  impactAreas: {
    title: 'Çalışma alanlarımız',
    description: 'Programlarımız, ertelenemeyen insani ihtiyaçlara odaklanır.',
    items: [
      {
        title: 'Yetim bakımı ve sponsorluğu',
        description: 'Yetim çocuklara düzenli takip, eğitim desteği ve sağlık yönlendirmesiyle güvenli bir çerçeve sunarız.',
        stats: '3.375+ sponsorlu yetim · düzenli takip'
      },
      {
        title: 'Acil gıda desteği',
        description: 'Yerinden edilmiş ve gıdaya erişimi olmayan ailelere hızlı ve düzenli gıda desteği sağlarız.',
        stats: '22.000+ gıda paketi · 160 bin öğün'
      },
      {
        title: 'Su ve sanitasyon',
        description: 'Altyapının zarar gördüğü bölgelerde güvenli içme suyuna erişimi yeniden kurarız.',
        stats: '190.000+ yararlanıcı · 450+ dağıtım · 7 kuyu'
      },
      {
        title: 'Sağlık desteği',
        description: 'En kırılgan durumdaki aileler için acil tıbbi destek ve takip sağlar, hayatı korumaya odaklanırız.',
        stats: '68 cerrahi müdahale · sürekli sağlık desteği'
      }
    ]
  },
  journey: {
    title: 'Yolculuğumuz',
    description: 'Gerçek ihtiyaçlarla şekillenen bir süreç.',
    items: [
      {
        year: '01',
        title: 'Bir taleple başlar',
        description: 'Bir mesaj, bir isim, bir ailenin yardım çağrısı.'
      },
      {
        year: '02',
        title: 'Doğrulama',
        description: 'Yardımdan önce durum teyit edilir; amaç geciktirmek değil, güveni ve onuru korumaktır.'
      },
      {
        year: '03',
        title: 'Doğrudan müdahale',
        description: 'Destek aracı olmadan, mesafe koymadan ulaştırılır.'
      },
      {
        year: '04',
        title: 'Takip',
        description: 'Yetimler düzenli izlenir, projeler uygulamadan sonra da kontrol edilir.'
      },
      {
        year: '05',
        title: 'Süreklilik',
        description: 'Bazı destekler tamamlanır, birçoğu devam eder.'
      },
      {
        year: '06',
        title: 'Devam ediyor',
        description: 'Trahom’un hikâyesi geçmişte değil; bugün, Gazze’de yaşanıyor.'
      }
    ]
  },
  stats: {
    title: 'Sayılarla etki',
    description: 'Bu verileri övünmek için değil, hesap verebilirlik için paylaşıyoruz.',
    items: [
      {
        number: '300 bin+',
        label: 'Toplam erişim'
      },
      {
        number: '4.050+',
        label: 'Kış desteği alan aile'
      },
      {
        number: '20.000+',
        label: 'Nakit destek'
      },
      {
        number: '150+',
        label: 'Gerçekleştirilen kampanyalar'
      }
    ]
  },
  cta: {
    title: 'Bu yolculuğun parçası olun',
    description: 'Küçük ya da büyük her katkı, doğru zamanda ulaştığında gerçek bir fark yaratır.',
    primaryButton: 'Bağış yap',
    secondaryButton: 'İş birliği yap'
  }
} as const;
