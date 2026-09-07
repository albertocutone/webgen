// English copy. Keys must mirror it/site.js exactly — a unit test enforces this.
export default {
  locale: 'en',
  siteName: 'Masseria Mastrangelo',
  tagline: 'A farmhouse restaurant in the Matese Regional Park, below the castle of Prata Sannita',

  // Per-page copy, keyed by route id in src/routes.js.
  // PLACEHOLDER lead text — to be replaced with the owner's copy (docs/CONTENT.md).
  pages: {
    home: {
      title: 'Masseria Mastrangelo',
      lead: 'A farmhouse among the olive groves, its garden looking onto the castle of Prata Sannita.',
    },
    chiSiamo: {
      title: 'About Us',
      lead: 'The masseria, the family who run it, and their ties to the Matese.',
    },
    appartamenti: {
      title: 'Apartments',
      lead: 'Five rooms in the farmhouse, from a simple double to a family room.',
    },
    territorio: {
      title: 'The Region',
      lead: 'The Matese Regional Park, the village of Prata Sannita and the river Lete.',
    },
    petFriendly: {
      title: 'Pet Friendly',
      lead: 'Your animals are welcome: open space and no surcharge.',
    },
    esperienze: {
      title: 'Experiences',
      lead: 'Lunches and dinners in the garden, weddings, christenings and private parties.',
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
    // Answers verified against the venue's Google Hotels listing and Facebook
    // page (September 2026). Check-in/check-out times still to be confirmed.
    items: [
      {
        q: 'Can I come for lunch or dinner without booking an event?',
        a: 'No. The masseria is not a restaurant open to the public: it cooks only for booked events and celebrations, with an agreed menu. Write to us for available dates.',
      },
      {
        q: 'What kind of events do you host?',
        a: 'Weddings, christenings, communions, birthdays and private parties, in the garden below the castle. We handle the menu, as we do for the Easter Monday and Ferragosto lunches.',
      },
      {
        q: 'Are pets allowed?',
        a: 'Yes, the property is pet friendly and your animals are welcome.',
      },
      {
        q: 'Is there parking?',
        a: 'Yes, parking is available free of charge on site.',
      },
      {
        q: 'What is included in a stay?',
        a: 'Free Wi-Fi, air conditioning and breakfast are included in every room. There is no pool, spa or gym.',
      },
      {
        q: 'How is a booking confirmed?',
        a: 'Send us your dates: we reply with availability and a quote, and confirm by email or phone.',
      },
    ],
  },

  home: {
    heroAlt: 'The masseria garden with the castle of Prata Sannita behind it',
    heroCta: 'Check availability',
    heroSecondary: 'See the apartments',
  },

  apartments: {
    // Room types and amenities verified against the venue's Google Hotels
    // listing (September 2026). Capacities follow standard hotel terminology
    // for double/triple; the family room is to be confirmed (docs/CONTENT.md).
    intro:
      'Five rooms in the farmhouse, all with free Wi-Fi, air conditioning and breakfast included. On-site parking, and pets are welcome.',
    guestsLabel: 'guests',
    enquire: 'Enquire',
    amenitiesHeading: 'Amenities',
    amenities: [
      'Free Wi-Fi',
      'Breakfast included',
      'Air conditioning',
      'Free parking',
      'Pets allowed',
    ],
    items: [
      {
        id: 'doppia-economy',
        name: 'Economy Double Room',
        guests: 2,
        description: 'A simple, quiet double room looking out over the countryside.',
      },
      {
        id: 'doppia',
        name: 'Double Room',
        guests: 2,
        description: "The farmhouse's own double room, with the building's original furnishings.",
      },
      {
        id: 'tripla-giardino',
        name: 'Triple Room with Garden View',
        guests: 3,
        description: 'A triple looking straight onto the garden and the castle of Prata Sannita.',
      },
      {
        id: 'tripla-superior',
        name: 'Superior Triple Room',
        guests: 3,
        description: 'A larger triple, with extra space for longer stays.',
      },
      {
        id: 'familiare-superior',
        name: 'Superior Family Room',
        guests: 4,
        description: 'The largest room, designed with families in mind.',
      },
    ],
  },

  events: {
    intro:
      'The masseria cooks by booking only, for events and celebrations. The garden, with the castle behind it, is laid for the occasion and the menu is agreed together.',
    typesHeading: 'What we host',
    types: [
      'Weddings',
      'Christenings and communions',
      'Birthdays and anniversaries',
      'Private parties',
      'Holiday lunches (Easter Monday, Ferragosto)',
    ],
    notRestaurant: 'We are not a restaurant open to the public: we cook only for booked events.',
    galleryHeading: 'The garden, laid for an event',
    photos: [
      { id: 'evento-tavola', alt: 'A long table laid in the garden with the castle behind' },
      { id: 'evento-giardino', alt: 'A long table under festoon lights among the olive trees' },
      { id: 'buffet', alt: 'A buffet of cured meats, cheeses and local produce' },
      { id: 'terrazza', alt: 'The terrace with parasols and the Matese hills beyond' },
    ],
    cta: 'Tell us about your event',
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
