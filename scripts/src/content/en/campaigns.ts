export const campaigns = {
  hero: {
    title: 'Active Campaigns',
    description: 'Support our ongoing initiatives to bring hope and assistance to communities worldwide.'
  },
  stats: {
    activeLabel: 'Active campaigns',
    totalRaised: {
      number: '130+',
      label: 'Campaigns performed'
    },
    activeDonors: {
      number: '10,000+',
      label: 'Active donors'
    },
    peopleHelped: {
      number: '800k+',
      label: 'People helped'
    }
  },
  filter: {
    title: 'Filter by Category',
    allLabel: 'All'
  },
  items: [
    {
      id: 'orphan-sponsorship',
      title: 'Orphan Sponsorship',
      description: 'Provide education, healthcare, and a loving home for orphaned children.',
      goal: '$1.25M',
      percentage: 2,
      primaryBadge: '3,375+ sponsored',
      color: 'bg-[#4A90E2]',
      category: 'Education',
      sponsorCta: true
    },
    {
      id: 'water',
      title: 'Clean Water',
      description: 'Deliver safe water through 450+ distribution campaigns and 7 wells fixed/constructed in areas without reliable access.',
      goal: '$180,000',
      percentage: 17,
      primaryBadge: '100k+ people served',
      color: 'bg-[#A8D5E2]',
      category: 'Water & Sanitation'
    },
    {
      id: 'winter-campaign',
      title: 'Winter Campaign',
      description: 'Deliver warm clothing, blankets, and heating supplies to families in need.',
      goal: '$120,000',
      percentage: 56,
      primaryBadge: '4,050+ sheltered',
      color: 'bg-[#F5A623]',
      category: 'Emergency'
    },
    {
      id: 'food-security',
      title: 'Food Security Program',
      description: 'Providing meals and food support to families facing loss and displacement.',
      goal: '$175,000',
      percentage: 75,
      primaryBadge: '135k+ meals served',
      color: 'bg-[#A8D5E2]',
      category: 'Food Security'
    }
  ],
  cta: {
    title: "Can't decide which campaign to support?",
    description: "Make a general donation and we'll allocate your contribution where it's needed most.",
    buttonLabel: 'Make a General Donation'
  }
} as const;
