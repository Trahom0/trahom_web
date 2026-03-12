export const header = {
  logoAlt: 'Trahom',
  homeLinkAria: 'Go to home',
  menuAria: {
    open: 'Open menu',
    close: 'Close menu'
  },
  languages: [
    { code: 'EN', label: 'English' },
    { code: 'AR', label: 'العربية' },
    { code: 'TR', label: 'Türkçe' }
  ],
  navItems: [
    { key: 'mission', label: 'Mission' },
    { key: 'impact', label: 'Impact' },
    { key: 'campaigns', label: 'Campaigns' },
    { key: 'contact', label: 'Contact' }
  ],
  topLinks: [
    { key: 'family-signup', label: 'Family Sign Up' },
    { key: 'sponsor-orphan', label: 'Sponsor an Orphan' }
  ],
  donateButton: 'Donate Now',
  mobileFooterLinks: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  }
} as const;
