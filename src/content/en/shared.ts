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
