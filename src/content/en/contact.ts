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
    email: {
      label: 'Email',
      value: 'info@trahom.org'
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
