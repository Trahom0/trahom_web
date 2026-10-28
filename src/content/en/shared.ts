export const shared = {
  imageFallbackAlt: 'Error loading image',
  campaignCard: {
    donateLabel: 'Donate Now',
    sponsorLabel: 'Sponsor',
    raisedTemplate: '{{amount}} raised',
    fundedTemplate: '{{percent}}% Funded',
    imageAltTemplate: 'Gaza humanitarian aid campaign: {{title}}'
  },
  relatedLinks: {
    title: 'Explore more',
    description: 'Learn about our mission, impact, and active campaigns in Gaza.'
  },
  whatsapp: {
    label: 'Chat with us',
    ariaLabel: 'Chat with the Trahom team on WhatsApp',
    hint: 'WhatsApp — we reply Sunday to Thursday, 9:00–16:00 (Gaza time)',
    messages: {
      default: 'Hello Trahom, I have a question.',
      donate: 'Hello Trahom, I have a question about donating.',
      'sponsor-orphan': 'Hello Trahom, I would like to know more about sponsoring an orphan.',
      campaigns: 'Hello Trahom, I have a question about your campaigns.',
      contact: 'Hello Trahom, I would like to get in touch.',
      careers: 'Hello Trahom, I have a question about working or volunteering with you.'
    }
  },
  consent: {
    title: 'Privacy choices',
    text: 'With your permission we use Meta (Facebook) to measure our awareness campaigns. It never sees what you type in our forms.',
    policyLink: 'Privacy policy',
    accept: 'Allow',
    decline: 'No thanks'
  },
  promoBar: {
    message: 'Winter is coming to Gaza: give a family warmth',
    ctaLabel: 'Donate now'
  },
  "notFound": {
    "title": "This page could not be found",
    "description": "The link may be broken, or the page may have moved. You can head back to the homepage or support families in Gaza right now.",
    "homeLabel": "Back to homepage",
    "donateLabel": "Donate now"
  }
} as const;
