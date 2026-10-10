export const privacy = {
  hero: {
    badge: 'Privacy Policy',
    title: 'Your privacy matters.',
    description: 'We are committed to transparency about how we collect, use, and protect your information while supporting our humanitarian work.',
    meta: {
      updated: 'Last updated: Oct 11, 2026',
      contact: 'Contact: info@trahom.org'
    }
  },
  highlights: [
    {
      title: 'Purpose-first data',
      description: 'We only collect what we need to deliver programs, process donations, and keep you informed.'
    },
    {
      title: 'Security by design',
      description: 'We use encryption, access controls, and routine reviews to safeguard your information.'
    },
    {
      title: 'Your choices',
      description: 'You can update preferences, request access, or ask us to delete your data.'
    }
  ],
  glance: {
    title: 'At a glance',
    items: [
      'We do not sell personal information.',
      'We share data only with trusted service providers and partners as needed.',
      'You can opt out of non-essential emails at any time.',
      'We use cookies to improve site performance and measure impact.'
    ]
  },
  sections: [
    {
      title: 'Information we collect',
      items: [
        'Contact details you provide when donating, subscribing, or contacting us.',
        'Donation and payment details processed securely by our payment partners.',
        'Usage data such as pages viewed, device type, and referral sources.'
      ]
    },
    {
      title: 'How we use information',
      items: [
        'Process donations, respond to inquiries, and deliver requested services.',
        'Send program updates, receipts, and organizational news.',
        'Analyze site performance and improve accessibility and security.'
      ]
    },
    {
      title: 'Sharing and disclosure',
      items: [
        'Service providers who help us operate the site and process payments.',
        'Partners when you opt in to shared initiatives or joint campaigns.',
        'Legal or regulatory requests when required by law.'
      ]
    },
    {
      title: 'Cookies and analytics',
      items: [
        'We use cookies to remember preferences and keep the site secure.',
        'Analytics help us understand what content is most useful to supporters.',
        'You can manage cookies through your browser settings.'
      ]
    },
    {
      title: 'Third-party services we use',
      items: [
        'Google Analytics (through Google Tag Manager) measures visits and page views so we can improve the site. Google may set its own cookies; see Google’s privacy policy.',
        'Stripe processes donations. Card details go directly to Stripe and are never stored on our servers.',
        'Tally hosts our orphan registration form. Information submitted there is stored by Tally and reviewed only by our team to verify cases.',
        'If you message us on WhatsApp, your number and messages are also handled under WhatsApp’s (Meta) privacy policy.',
        'Resend delivers the messages sent through our contact form and newsletter sign-up to our inbox.'
      ]
    },
    {
      title: 'Data retention and security',
      items: [
        'We retain information only as long as needed for operational or legal purposes.',
        'Access to sensitive data is limited to trained team members.',
        'No method of transmission is 100 percent secure, but we work to protect data.'
      ]
    },
    {
      title: 'Your rights and choices',
      items: [
        'Request access to, correction of, or deletion of your personal data.',
        'Opt out of marketing communications while still receiving receipts.',
        'Contact us with questions about this policy or your data.'
      ]
    }
  ],
  cta: {
    eyebrow: 'Global commitment',
    title: 'Questions about privacy?',
    description: 'Reach out to our team and we will respond as quickly as possible.',
    primaryButton: 'Contact Us',
    secondaryButton: 'Read Terms of Service'
  }
} as const;
