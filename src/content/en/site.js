// English copy. Keys must mirror it/site.js exactly — a unit test enforces this.
export default {
  locale: 'en',
  siteName: 'Masseria Mastrangelo',
  tagline: 'Stays and events in the heart of Puglia',

  // Per-page copy, keyed by route id in src/routes.js.
  // PLACEHOLDER lead text — to be replaced with the owner's copy (docs/CONTENT.md).
  pages: {
    home: {
      title: 'Masseria Mastrangelo',
      lead: 'A historic stone farmhouse among the olive groves, minutes from the sea.',
    },
    chiSiamo: {
      title: 'About Us',
      lead: 'The history of the masseria, the estate, and its ties to the land.',
    },
    appartamenti: {
      title: 'Apartments',
      lead: 'Individual rooms and self-contained apartments, or the whole property exclusively.',
    },
    territorio: {
      title: 'The Region',
      lead: 'Villages, beaches and flavours to discover around the masseria.',
    },
    petFriendly: {
      title: 'Pet Friendly',
      lead: 'Your animals are welcome: open space and no surcharge.',
    },
    esperienze: {
      title: 'Experiences',
      lead: 'Tastings, guided visits and days out in the countryside.',
    },
    comeRaggiungerci: {
      title: 'Getting Here',
      lead: 'Where we are and how to reach us by car, train or plane.',
    },
    contatti: {
      title: 'Booking Enquiry',
      lead: 'Tell us your dates and we will reply with availability and a quote.',
    },
    privacy: {
      title: 'Privacy Policy',
      lead: 'How we handle the personal data collected through this site.',
    },
  },

  contact: {
    formHeading: 'Check availability',
    required: 'required',
    optionalSuffix: '(optional)',
    labels: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      startDate: 'Arrival date',
      endDate: 'Departure date',
      eventType: 'Type of stay or event',
      message: 'Message',
    },
    eventTypes: {
      soggiorno: 'Stay',
      matrimonio: 'Wedding',
      evento: 'Private event',
      'venue-intera': 'Whole property, exclusive use',
      altro: 'Other',
    },
    eventTypePlaceholder: 'Select...',
    consent: {
      text: 'I consent to the processing of my personal data in order to answer this enquiry.',
      linkText: 'Read the Privacy Policy',
    },
    submit: 'Send enquiry',
    submitting: 'Sending...',
    errors: {
      nameRequired: 'Please enter your name.',
      emailRequired: 'Please enter your email.',
      emailInvalid: 'Please check the email format.',
      startDateRequired: 'Please choose an arrival date.',
      startDateInPast: 'The arrival date cannot be in the past.',
      endDateRequired: 'Please choose a departure date.',
      endDateBeforeStart: 'Departure must be on or after arrival.',
      eventTypeRequired: 'Please select the type of stay.',
      consentRequired: 'You must consent to data processing before sending.',
      summaryTitle: 'Please check the highlighted fields:',
    },
    success: {
      title: 'Enquiry sent',
      body: 'Thank you! We will reply shortly with availability and a quote.',
      again: 'Send another enquiry',
    },
    failure: {
      title: 'Could not send',
      body: 'We could not send your enquiry. Please contact us directly:',
      retry: 'Try again',
    },
    notConfigured: 'The form is not connected yet. In the meantime, contact us directly:',
  },

  cookies: {
    title: 'Cookies',
    body: 'We only use technical cookies required for the site to work. With your consent we may also use others to understand how the site is used.',
    accept: 'Accept',
    decline: 'Decline',
    more: 'More information',
    label: 'Cookie notice',
  },

  faq: {
    heading: 'Frequently asked questions',
    // PLACEHOLDER answers — to be confirmed by the owner (docs/CONTENT.md).
    items: [
      {
        q: 'What are the check-in and check-out times?',
        a: 'Check-in is from 15:00 to 20:00 and check-out by 10:00. Write to us if you need different times — we try to be flexible.',
      },
      {
        q: 'Are pets allowed?',
        a: 'Yes, your animals are welcome at no extra charge. The grounds are large and fenced.',
      },
      {
        q: 'Is there parking?',
        a: 'Yes, free private parking within the property.',
      },
      {
        q: 'Can the whole property be booked?',
        a: 'Yes, the masseria can be reserved exclusively for weddings and private events. Mention it in your enquiry.',
      },
      {
        q: 'How is a booking confirmed?',
        a: 'Send us your dates: we reply with availability and a quote, and confirm by email.',
      },
    ],
  },

  home: {
    heroAlt: 'The masseria seen from the olive grove',
    heroCta: 'Check availability',
    heroSecondary: 'See the apartments',
  },

  apartments: {
    // PLACEHOLDER units — the real inventory is to be confirmed (docs/CONTENT.md).
    intro: 'Each unit is self-contained, with its own entrance and a view over the countryside.',
    guestsLabel: 'guests',
    enquire: 'Enquire',
    items: [
      {
        id: 'trullo',
        name: 'Il Trullo',
        guests: 2,
        description: 'A stone double room with a star-vaulted ceiling and private patio.',
      },
      {
        id: 'uliveto',
        name: 'Uliveto',
        guests: 4,
        description: 'Two-bedroom apartment with an eat-in kitchen looking over the olive grove.',
      },
      {
        id: 'corte',
        name: 'La Corte',
        guests: 6,
        description: 'A larger unit around the inner courtyard, well suited to families.',
      },
      {
        id: 'intera',
        name: 'The whole masseria',
        guests: 12,
        description:
          'Every unit exclusively, with the shared spaces and garden, for weddings and events.',
      },
    ],
  },

  nav: {
    home: 'Home',
    chiSiamo: 'About Us',
    appartamenti: 'Apartments',
    territorio: 'The Region',
    petFriendly: 'Pet Friendly',
    esperienze: 'Experiences',
    comeRaggiungerci: 'Getting Here',
    contatti: 'Contact',
  },

  actions: {
    bookNow: 'Book Now',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    whatsapp: 'Message us on WhatsApp',
    whatsappShort: 'WhatsApp',
    skipToContent: 'Skip to main content',
  },

  footer: {
    contactHeading: 'Contact',
    followHeading: 'Follow us',
    legalHeading: 'Legal',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    rights: 'All rights reserved.',
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    back: 'Back to home',
  },
}
