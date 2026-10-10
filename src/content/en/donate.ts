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
          placeholder: ''
        },
        lastName: {
          label: 'Last Name *',
          placeholder: ''
        },
        email: {
          label: 'Email Address *',
          placeholder: ''
        },
        phone: {
          label: 'Phone Number',
          placeholder: ''
        }
      }
    },
    submit: {
      loadingLabel: 'Redirecting to Stripe...',
      defaultTemplate: 'Continue to Secure Checkout ${{amount}}'
    },
    errors: {
      invalidAmount: 'Please enter a valid donation amount.',
      tooLarge: 'For donations above $25,000, please contact us at info@trahom.org.',
      startCheckout: 'Unable to start checkout.',
      missingCheckoutUrl: 'Stripe checkout URL is missing.',
      default: 'Unable to start checkout.'
    }
  },
  impact: {
    examples: [
      { amount: 25, impact: 'Can help provide ready meals for families with nothing to cook.' },
      { amount: 50, impact: 'Can support emergency food parcels distributed by need.' },
      { amount: 100, impact: 'Helps keep an orphaned child’s regular follow-up going.' },
      { amount: 250, impact: 'Helps expand access to clean drinking water.' },
      { amount: 500, impact: 'Helps keep a displaced family warm through winter.' },
      { amount: 1000, impact: 'Contributes to urgent medical care or cash assistance.' }
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
      'On the ground in Gaza since 2024'
    ]
  },
  stats: {
    title: 'Your Donations at Work',
    items: [
      { number: '300k+', label: 'Total Reach' },
      { number: '3,375+', label: 'Orphan Sponsorships' },
      { number: '160k+', label: 'Ready Meals Served' }
    ]
  }
} as const;
