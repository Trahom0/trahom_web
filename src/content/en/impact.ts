export const impact = {
  hero: {
    badge: 'Measuring Our Impact',
    title: 'Creating Lasting Change Together',
    description: 'Every donation translates into real impact. Explore how your generosity is transforming lives and communities around the world.'
  },
  stats: {
    items: [
      { number: '800k+', label: 'Total Reach' },
      { number: '130+', label: 'Campaigns performed' },
      { number: '3,375+', label: 'Orphan Sponsorship' },
      { number: '135k+', label: 'Ready Meals Served' },
      { number: '202,500+', label: 'Clean Water Distribution' },
      { number: '4,050+', label: 'Emergency Shelter' }
    ]
  },
  programs: {
    title: 'Impact Across Our Programs',
    description: 'Comprehensive results from our core focus areas',
    categories: [
      {
        category: 'Ongoing Programs',
        impact: 'Ongoing orphan sponsorships that stay present with families over the long term.',
        stats: [
          { label: 'Active beneficiaries', value: '3,375+' },
          { label: 'Continuous support', value: '30 months' }
        ]
      },
      {
        category: 'Emergency Food Assistance',
        impact: 'Rapid food response for families facing loss, displacement, and food insecurity.',
        stats: [
          { label: 'Food parcels distributed', value: '9,450+' },
          { label: 'Ready meals served', value: '135k+' },
          { label: 'Baby milk provided', value: '1,350+' }
        ]
      },
      {
        category: 'Water & Sanitation',
        impact: 'Restoring clean water access where systems have failed and sanitation is urgent.',
        stats: [
          { label: 'Water distribution campaigns', value: '450+' },
          { label: 'Water wells fixed / constructed', value: '7' },
          { label: 'People served', value: '100k+' }
        ]
      },
      {
        category: 'Shelter & Protection',
        impact: 'Safe shelter and immediate protection for families displaced by crisis.',
        stats: [
          { label: 'Emergency shelter', value: '4,050+' },
          { label: 'Cash distribution', value: '20,250+' }
        ]
      },
      {
        category: 'Health & Wellbeing',
        impact: 'Care that supports recovery and survival for children and families.',
        stats: [
          { label: 'Child psychological support', value: '9,450+' },
          { label: 'Surgical operations', value: '68' }
        ]
      }
    ]
  },
  stories: {
    title: 'Stories of Hope',
    description: 'Real people, real change. Meet some of the lives transformed by your support.',
    nameAgeTemplate: '{{name}}, {{age}}',
    quoteTemplate: '"{{story}}"',
    imageAltTemplate: 'Gaza humanitarian aid story: {{name}}',
    items: [
      {
        name: 'What It Means to Be Sponsored',
        age: 14,
        country: 'Gaza',
        story: "Trahom's sponsorship keeps me in school with the supplies and care I need. I feel supported and hopeful about my future.",
        category: 'Orphan Sponsorship'
      },
      {
        name: 'What It Means to Be Sponsored',
        age: 38,
        country: 'Gaza',
        story: 'Being sponsored means steady meals, safe learning, and someone checking in on me. It helped my family feel stable again.',
        category: 'Orphan Sponsorship'
      }
    ]
  },
  growth: {
    title: 'Our Growth Journey',
    labels: {
      totalReach: 'Total Reach',
      readyMeals: 'Ready Meals Served',
      cleanWater: 'Clean Water Distribution',
      totalFunds: 'Campaigns performed'
    },
    items: [
      {
        year: '2024',
        lives: '132,300+',
        projects: '47,250+',
        countries: '70,875+',
        funds: '130+'
      },
      {
        year: '2025',
        lives: '245,700+',
        projects: '87,750+',
        countries: '131,625+',
        funds: '130+'
      }
    ]
  },
  financial: {
    title: 'Financial Transparency',
    description: "We are committed to using your donations efficiently and effectively. Here's how every dollar is allocated:",
    breakdown: [
      { category: 'Program Services', percentage: 90 },
      { category: 'Administrative', percentage: 6 },
      { category: 'Fundraising', percentage: 4 }
    ],
    highlights: [
      {
        title: 'Independently Audited',
        description: 'Annual audits by certified firms'
      },
      {
        title: 'Impact Measured',
        description: 'Quarterly performance reviews'
      },
      {
        title: 'Community-Led',
        description: 'Delivered directly by local teams and partners inside Gaza'
      }
    ]
  },
  cta: {
    title: 'Be Part of Our Impact Story',
    description: 'Your contribution, no matter the size, creates real change. Join thousands of supporters making a difference.',
    primaryButton: 'Donate Now',
    secondaryButton: 'View Campaigns'
  }
} as const;
