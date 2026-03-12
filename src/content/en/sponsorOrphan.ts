export const sponsorOrphan = {
  hero: {
    badge: 'Sponsor an Orphan',
    title: 'A private, direct way to support a child.',
    description: "Each profile includes a short story and a code. Request documents through WhatsApp, and we will share details securely to protect the child's privacy.",
    primaryCta: 'View available children',
    secondaryCta: 'Ask a question',
    imageAlt: 'Sponsor an orphan'
  },
  steps: {
    title: 'How it works',
    description: 'We keep the process simple and secure so every child is protected and every sponsor is supported.',
    items: [
      {
        title: 'Choose a card',
        description: 'Browse the available profiles and select a child you want to support.'
      },
      {
        title: 'Request documents',
        description: 'Tap the button to send the code on WhatsApp. We will share documents securely.'
      },
      {
        title: 'Start sponsorship',
        description: 'After verification, we will guide you through next steps to begin support.'
      }
    ]
  },
  available: {
    title: 'Available sponsorships',
    description: 'Use the code in each card to request documents and start the sponsorship process.',
    countLabels: {
      loading: 'Loading profiles...',
      error: 'Profiles unavailable',
      availableTemplate: '{{count}} profiles available'
    },
    states: {
      loading: 'Loading sponsorship profiles...',
      empty: 'No profiles are available yet. Please check back soon.'
    }
  },
  profile: {
    codeLabel: 'Orphan code',
    requestLabel: 'Request documents',
    altTemplate: 'Orphan {{code}}'
  },
  whatsapp: {
    messageTemplate: "I'd like to sponsor {{code}}"
  },
  errors: {
    fetch: 'Failed to load sponsor data',
    profilesUnavailable: 'We could not load sponsorship profiles right now.'
  },
  contactLinkLabel: 'Contact our team',
  privacyNote: {
    title: 'Privacy comes first',
    description: 'We only share full documents after verification to keep children protected.',
    linkLabel: 'Contact our team'
  }
} as const;
