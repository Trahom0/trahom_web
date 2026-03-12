export const donate = {
  status: {
    success: {
      title: 'Thank you for your donation!',
      description: 'A confirmation email and receipt will be sent shortly.'
    },
    cancel: {
      title: 'Donation canceled',
      description: "No charge was made. You can try again whenever you're ready."
    }
  },
  hero: {
    badge: 'Make an Impact',
    title: 'Your Generosity Changes Lives',
    description: "Every donation helps us provide essential services to communities in need. Choose your contribution level and see the direct impact you'll make."
  },
  form: {
    donationType: {
      title: 'Choose Donation Type',
      options: {
        oneTime: {
          label: 'One-Time',
          description: 'Single donation'
        },
        monthly: {
          label: 'Monthly',
          description: 'Recurring support'
        }
      }
    },
    amount: {
      title: 'Select Amount',
      customPlaceholder: 'Custom amount'
    },
    cause: {
      title: 'Choose a Cause',
      items: [
        {
          id: 'orphan-sponsorship',
          name: 'Orphan Sponsorship',
          description: 'Provide education, healthcare, and a loving home for orphaned children.'
        },
        {
          id: 'water',
          name: 'Clean Water',
          description: 'Build wells and water purification systems in communities without access.'
        },
        {
          id: 'winter-campaign',
          name: 'Winter Campaign',
          description: 'Deliver warm clothing, blankets, and heating supplies to families in need.'
        },
        {
          id: 'food-security',
          name: 'Food Security Program',
          description: 'Providing meals and food support to families facing loss and displacement.'
        }
      ]
    },
    info: {
      title: 'Your Information',
      fields: {
        firstName: {
          label: 'First Name *',
          placeholder: 'Hind'
        },
        lastName: {
          label: 'Last Name *',
          placeholder: 'Rajab'
        },
        email: {
          label: 'Email Address *',
          placeholder: 'hind.rajab@example.com'
        },
        phone: {
          label: 'Phone Number',
          placeholder: '+1 (555) 000-0000'
        }
      }
    },
    submit: {
      loadingLabel: 'Redirecting to Stripe...',
      defaultTemplate: 'Continue to Secure Checkout ${{amount}}'
    },
    errors: {
      invalidAmount: 'Please enter a valid donation amount.',
      startCheckout: 'Unable to start checkout.',
      missingCheckoutUrl: 'Stripe checkout URL is missing.',
      default: 'Unable to start checkout.'
    }
  },
  impact: {
    examples: [
      { amount: 25, impact: 'Help deliver 135k+ ready meals served to families.' },
      { amount: 50, impact: 'Support 9,450+ emergency food parcels distributed.' },
      { amount: 100, impact: 'Keep 3,375+ orphan sponsorships active.' },
      { amount: 250, impact: 'Expand clean water access for 202,500+ people.' },
      { amount: 500, impact: 'Strengthen emergency shelter for 4,050+ families.' },
      { amount: 1000, impact: 'Back 68 urgent surgeries and 20,250+ cash distributions.' }
    ],
    fallback: 'Every contribution makes a difference'
  },
  summary: {
    title: 'Donation Summary',
    labels: {
      type: 'Type',
      amount: 'Amount',
      frequency: 'Frequency',
      impact: 'Your Impact'
    },
    typeLabels: {
      oneTime: 'One-time',
      monthly: 'Monthly'
    },
    securityBadges: ['100% secure payment', '256-bit encryption']
  },
  trust: {
    title: 'Why Give to Trahom?',
    items: [
      '90% of funds go directly to programs',
      'Transparent reporting and impact tracking',
      '20+ years of proven humanitarian work'
    ]
  },
  stats: {
    title: 'Your Donations at Work',
    items: [
      { number: '800k+', label: 'Total Reach' },
      { number: '3,375+', label: 'Orphan Sponsorships' },
      { number: '135k+', label: 'Ready Meals Served' }
    ]
  }
} as const;
