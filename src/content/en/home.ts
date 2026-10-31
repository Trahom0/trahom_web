export const home = {
  hero: {
    title: 'Human support, delivered with dignity.',
    description: 'We work on the ground in Gaza every day, bringing winter relief, clean water and food to the families who need it most.',
    ctaLabel: 'Join our mission',
    donorCount: 'Thousands choose to keep giving',
    stats: {
      totalReach: {
        number: '300k+',
        label: 'Total reach',
        color: 'bg-[#4A90E2]'
      },
      readyMeals: {
        number: '160k+',
        label: 'Ready meals served',
        color: 'bg-[#A8D5E2]'
      },
      communityCard: {
        title: 'Clean Water',
        description: '190k+ people reached through 450+ water distributions and 7 wells repaired or built.',
        color: 'bg-[#F5A623]'
      },
      fundsRaised: {
        number: '150+',
        label: 'Campaigns performed',
        color: 'bg-[#FFF8E1]'
      }
    }
  },
  campaigns: {
    title: 'Active Campaigns',
    viewAllLabel: 'View all campaigns →',
    cards: [
      {
        id: 'winter-campaign',
        title: 'Winter Campaign',
        description: 'Deliver warm clothing, blankets, and heating supplies to families in need.',
        goal: '$120,000',
        percentage: 56,
        primaryBadge: '4,050+ families supported',
        color: 'bg-[#F5A623]'
      },
      {
        id: 'water',
        title: 'Clean Water',
        description: 'Deliver safe water through 450+ distribution campaigns and 7 wells fixed/constructed in areas without reliable access.',
        goal: '$180,000',
        percentage: 17,
        primaryBadge: '190k+ people served',
        color: 'bg-[#A8D5E2]'
      },
      {
        id: 'food-security',
        title: 'Food Security',
        description: 'Providing meals and food support to families facing loss and displacement.',
        goal: '$175,000',
        percentage: 75,
        primaryBadge: '160k+ meals served',
        color: 'bg-[#4A90E2]'
      }
    ],
    supportCard: {
      title: 'Local Hands, Real Care',
      description: 'Our work grows from inside the community, guided by lived experience and shared responsibility.',
      color: 'bg-[#A8D5E2]'
    },
    donorsFeature: {
      videoAriaLabel: 'Our Donors',
      title: 'Those Who Made This Possible',
      description: 'Made possible by thousands of people who chose to show up consistently with trust.'
    }
  },
  gallery: {
    title: 'Our Impact in Action',
    viewAllLabel: 'View full gallery →',
    gridLabels: ['Community kitchen meals', 'Water distribution', 'Water delivered to families', 'Winter campaign'],
    feature: {
      videoAriaLabel: 'Together Making Impact',
      title: 'Together, Making an Impact',
      description: 'Our dedicated team works every day across Gaza to bring hope, resources, and sustainable solutions to communities in need.'
    }
  },
  about: {
    title: 'About Trahom',
    viewMissionLabel: 'View mission →',
    sinceBadge: 'Since 2024',
    cardTitle: 'About Trahom',
    paragraphs: [
      'Trahom was formed in response to real, immediate need. It began with families who had lost everything and people who refused to look away.',
      'We work directly with affected communities, focusing on essentials: food, water, medical care, and orphan support. Every action is grounded in urgency, dignity, and accountability doing what is needed, when it is needed, without delay or distance.'
    ],
    stats: {
      yearsOfService: {
        number: '2+',
        label: 'Years of service',
        color: 'bg-[#4A90E2]'
      },
      localPartners: {
        number: '10',
        label: 'Local partners',
        color: 'bg-[#A8D5E2]'
      },
      volunteers: {
        number: '20+',
        label: 'Volunteers',
        color: 'bg-[#F5A623]'
      },
      valuesCard: {
        title: 'Our Values',
        items: [
          '• Transparency in all operations',
          '• Sustainable, lasting solutions',
          '• Dignity and respect for all',
          '• Equal community partnership'
        ]
      }
    }
  },
  missionCards: [
    {
      title: 'Humanitarian Aid',
      description: 'Emergency response and essential supplies to communities affected by genocide.'
    },
    {
      title: 'Community Development',
      description: 'Long-term programs that build infrastructure, create jobs, and strengthen local economies.'
    },
    {
      title: 'Local Partnerships',
      description: 'Working hand in hand with local committees and organizations in Gaza to deliver support efficiently.'
    }
  ],
  fieldUpdates: {
    title: 'From the Field',
    description: 'Recent work by our teams across Gaza.',
    viewOnTemplate: 'View on {{platform}}',
    followLabel: 'Follow us',
    governorates: {
      'north-gaza': 'North Gaza',
      gaza: 'Gaza City',
      'deir-al-balah': 'Deir al-Balah',
      'khan-younis': 'Khan Younis',
      rafah: 'Rafah'
    }
  },
  app: {
    badge: 'Coming soon to Google Play and the App Store',
    title: 'The Trahom app',
    description: 'Follow your giving from your phone: the orphans you sponsor, the support that reaches them, and our latest work in Gaza.',
    features: [
      { title: 'Sponsor an orphan', text: 'Choose a child and follow the sponsorship in one place.' },
      { title: 'Delivery confirmed', text: 'See when support has actually been handed to the family.' },
      { title: 'From the field', text: 'Photos and updates from our projects as they happen.' }
    ],
    formTitle: 'Tell me when it launches',
    inputPlaceholder: 'Your email address',
    buttonLabel: 'Notify me',
    helperText: 'We will email you once when it launches, and use your address for nothing else.',
    successMessage: 'Done. We will let you know as soon as the app is on Google Play and the App Store.',
    errorMessage: 'We could not sign you up right now. Please try again shortly.'
  },
  subscribe: {
    title: 'Stay in the Loop',
    description: 'Join our community and receive the latest updates on campaigns, stories from the field, and opportunities to make a difference.',
    inputPlaceholder: 'Your email address',
    buttonLabel: 'Subscribe',
    helperText: 'We respect your privacy. Unsubscribe anytime.',
    successMessage: 'Thank you, you are subscribed. Our updates will reach your inbox.',
    errorMessage: 'We could not subscribe you right now. Please try again shortly.'
  }
} as const;
