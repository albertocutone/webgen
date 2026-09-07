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
