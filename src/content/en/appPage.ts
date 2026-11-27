export const appPage = {
  badge: 'The official Trahom app',
  title: 'Sponsor an orphan in Gaza and follow the sponsorship from your phone',
  description: 'Browse the children waiting for a sponsor, choose the child you want to support, and follow your sponsorship in one place.',
  freeNote: 'Free on Android and iPhone',
  googlePlay: 'Get it on Google Play',
  appStore: 'Download on the App Store',
  screenshotAlt: 'The available sponsorships screen in the Trahom app',
  features: {
    title: 'What the app does',
    items: [
      { title: 'Choose a child', text: 'Search by code and filter by gender, age and type of orphan.' },
      { title: 'Follow your sponsorship', text: 'Everything about your sponsorship in one place on your phone.' },
      { title: 'Delivery confirmed', text: 'See when support has actually been handed to the family.' },
      { title: 'Direct contact', text: 'Stay in direct touch with the child and their family to see how they are doing.' },
      { title: "Children's privacy", text: "Children's faces are hidden in photos, and each child has a code instead of a full name." }
    ]
  },
  steps: {
    title: 'Three steps',
    items: [
      { title: 'Download the app', text: 'From Google Play or the App Store.' },
      { title: 'Choose a child', text: 'Browse the profiles and pick the child you want to sponsor.' },
      { title: 'Start sponsoring', text: 'Confirm your sponsorship and follow it in the app.' }
    ]
  },
  cta: {
    title: 'Start your sponsorship today',
    text: 'The app is made by Trahom. It is the easiest way to sponsor an orphan in Gaza and stay updated.',
    browseLabel: 'Prefer the website? Browse the profiles here'
  }
} as const;
