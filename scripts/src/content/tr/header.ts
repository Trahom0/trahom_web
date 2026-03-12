export const header = {
  logoAlt: 'Trahom',
  homeLinkAria: 'Ana sayfaya git',
  menuAria: {
    open: 'Menüyü aç',
    close: 'Menüyü kapat'
  },
  languages: [
    { code: 'EN', label: 'English' },
    { code: 'AR', label: 'العربية' },
    { code: 'TR', label: 'Türkçe' }
  ],
  navItems: [
    { key: 'mission', label: 'Misyon' },
    { key: 'impact', label: 'Etki' },
    { key: 'campaigns', label: 'Kampanyalar' },
    { key: 'contact', label: 'İletişim' }
  ],
  topLinks: [
    { key: 'family-signup', label: 'Aile Kaydı' },
    { key: 'sponsor-orphan', label: 'Yetim Sponsorluğu' }
  ],
  donateButton: 'Şimdi bağış yap',
  mobileFooterLinks: {
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Şartları'
  }
} as const;
