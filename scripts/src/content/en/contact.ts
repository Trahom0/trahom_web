export const contact = {
  hero: {
    badge: 'Get in Touch',
    title: "We'd Love to Hear From You",
    description: "Whether you have questions about our work, want to partner with us, or need assistance, our team is here to help. Reach out today and let's make a difference together."
  },
  form: {
    title: 'Send Us a Message',
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
        placeholder: 'Roh-al-roh@example.com'
      },
      phone: {
        label: 'Phone Number',
        placeholder: '+1 (555) 000-0000'
      },
      subject: {
        label: 'Subject *',
        placeholder: 'Select a subject',
        options: [
          { value: 'general', label: 'General Inquiry' },
          { value: 'donation', label: 'Donation Question' },
          { value: 'partnership', label: 'Partnership Opportunity' },
          { value: 'volunteer', label: 'Volunteer Information' },
          { value: 'sponsorship', label: 'Orphan Sponsorship' },
          { value: 'support', label: 'Support Request' }
        ]
      },
      message: {
        label: 'Message *',
        placeholder: 'Tell us how we can help you...'
      }
    },
    submit: {
      defaultLabel: 'Send Message',
      sendingLabel: 'Sending message...',
      sentLabel: 'Message Sent!'
    },
    successMessage: "Thank you for contacting us! We'll get back to you within 24 hours.",
    errorMessage: 'Something went wrong while sending your message. Please try again or email us directly.'
  },
  quickContact: {
    title: 'Quick Contact',
    phone: {
      label: 'Phone',
      value: '+1 (555) 123-4567'
    },
    email: {
      label: 'Email',
      value: 'info@trahom.org'
    },
    location: {
      label: 'Location',
      value: 'Gaza'
    }
  },
  officeHours: {
    title: 'Office Hours',
    schedule: [
      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ]
  },
  social: {
    title: 'Follow Us',
    description: 'Stay updated with our latest news and campaigns'
  },
  globalOffices: {
    title: 'Our Global Offices',
    description: 'Find the office nearest to you for local support and partnership opportunities.',
    offices: [
      {
        city: 'New York',
        country: 'United States',
        address: '123 Humanitarian Way',
        postal: 'New York, NY 10001',
        phone: '+1 (555) 123-4567',
        email: 'ny@trahom.org'
      },
      {
        city: 'London',
        country: 'United Kingdom',
        address: '45 Charity Lane',
        postal: 'London SW1A 1AA',
        phone: '+44 20 7123 4567',
        email: 'london@trahom.org'
      },
      {
        city: 'Dubai',
        country: 'United Arab Emirates',
        address: '78 Aid Boulevard',
        postal: 'Dubai, UAE',
        phone: '+971 4 123 4567',
        email: 'dubai@trahom.org'
      }
    ]
  },
  about: {
    title: 'About Trahom',
    paragraphs: [
      'Trahom is a humanitarian initiative rooted in Gaza, created in response to real and ongoing needs.',
      'We work directly with families affected by war, loss, and displacement — focusing on orphans, food security, clean water, and essential aid. Every case we support is verified, followed up, and treated with care and responsibility.',
      'Trahom is young, but the work is constant. Our focus is simple: reach people directly, act honestly, and stay present.'
    ],
    whyTitle: 'Why Choose Trahom?',
    whyItems: [
      'Direct support delivered without intermediaries',
      'Real-time verification and follow-up on every case',
      'Focused on Gaza and urgent humanitarian needs',
      'Built on trust, accountability, and continuity — not promises'
    ]
  }
} as const;
