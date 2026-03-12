export const home = {
  hero: {
    title: 'Human support, delivered with dignity.',
    description: 'We work on the ground, every day, connecting people to what they need to survive and rebuild.',
    ctaLabel: 'Join our mission',
    donorCount: '10,000+ donors',
    stats: {
      totalReach: {
        number: '800k+',
        label: 'Total reach',
        color: 'bg-[#4A90E2]'
      },
      readyMeals: {
        number: '135k+',
        label: 'Ready meals served',
        color: 'bg-[#A8D5E2]'
      },
      communityCard: {
        title: 'Community-Led Response',
        description: '3,375+ active beneficiaries receiving 30 months of continuous support.',
        color: 'bg-[#F5A623]'
      },
      fundsRaised: {
        number: '130+',
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
        id: 'orphan-sponsorship',
        title: 'Orphan Sponsorship',
        description: 'Provide education, healthcare, and a loving home for orphaned children.',
        goal: '$1.25M',
        percentage: 2,
        primaryBadge: '3,375+ sponsored',
        color: 'bg-[#4A90E2]',
        sponsorLabel: 'Sponsor'
      },
      {
        id: 'water',
        title: 'Clean Water',
        description: 'Deliver safe water through 450+ distribution campaigns and 7 wells fixed/constructed in areas without reliable access.',
        goal: '$180,000',
        percentage: 17,
        primaryBadge: '100k+ people served',
        color: 'bg-[#A8D5E2]'
      },
      {
        id: 'winter-campaign',
        title: 'Winter Campaign',
        description: 'Deliver warm clothing, blankets, and heating supplies to families in need.',
        goal: '$120,000',
        percentage: 56,
        primaryBadge: '4,050+ sheltered',
        color: 'bg-[#F5A623]'
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
  trustBadges: {
    title: 'Verified & Trusted',
    description: 'Our commitment to transparency and accountability is recognized by leading charity evaluators',
    items: [
      { label: 'Charity Navigator', detail: '4-Star Rating' },
      { label: 'GuideStar', detail: 'Gold Seal' },
      { label: 'BBB', detail: 'Accredited' },
      { label: 'Certified', detail: 'Nonprofit' }
    ]
  },
  gallery: {
    title: 'Our Impact in Action',
    viewAllLabel: 'View full gallery →',
    gridLabels: ['Humanitarian Aid', 'Community Development', 'Medical Relief', 'Education'],
    feature: {
      videoAriaLabel: 'Together Making Impact',
      title: 'Together, Making an Impact',
      description: 'Our dedicated team works tirelessly across the globe to bring hope, resources, and sustainable solutions to communities in need.'
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
      title: 'Global Partnerships',
      description: 'Collaborating with governments, NGOs, and local organizations to maximize our collective impact.'
    }
  ],
  partners: {
    title: 'Global Partnerships',
    items: [
      'UN Foundation',
      'WHO',
      'Red Cross',
      'UNICEF',
      'Oxfam',
      'Doctors W/O Borders',
      'Save the Children',
      'World Vision'
    ]
  },
  subscribe: {
    title: 'Stay in the Loop',
    description: 'Join our community and receive the latest updates on campaigns, stories from the field, and opportunities to make a difference.',
    inputPlaceholder: 'Your email address',
    buttonLabel: 'Subscribe',
    helperText: 'We respect your privacy. Unsubscribe anytime.'
  }
} as const;
