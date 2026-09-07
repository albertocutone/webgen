// Italian copy. Owner-editable: no JSX, no logic — strings only.
export default {
  locale: 'it',
  siteName: 'Masseria Mastrangelo',
  tagline: 'Agriturismo nel Parco Regionale del Matese, ai piedi del Castello di Prata Sannita',

  // Per-page copy, keyed by route id in src/routes.js.
  // PLACEHOLDER lead text — to be replaced with the owner's copy (docs/CONTENT.md).
  pages: {
    home: {
      title: 'Masseria Mastrangelo',
      lead: 'Un agriturismo tra gli ulivi, con il giardino affacciato sul Castello di Prata Sannita.',
    },
    chiSiamo: {
      title: 'Chi Siamo',
      lead: 'La masseria, la famiglia che la conduce e il legame con il Matese.',
    },
    appartamenti: {
      title: 'Appartamenti',
      lead: 'Cinque camere nella masseria, dalla doppia essenziale alla familiare.',
    },
    territorio: {
      title: 'Territorio',
      lead: 'Il Matese, il borgo di Prata Sannita e il suo castello.',
    },
    petFriendly: {
      title: 'Pet Friendly',
      lead: 'I vostri animali sono i benvenuti: spazi aperti e nessun supplemento.',
    },
    esperienze: {
      title: 'Esperienze',
      lead: 'Pranzi e cene nel giardino, matrimoni, battesimi e feste private.',
    },
    comeRaggiungerci: {
      title: 'Come Raggiungerci',
      lead: 'Dove siamo e come arrivare in auto, in treno o in aereo.',
    },
    contatti: {
      title: 'Richiesta di Prenotazione',
      lead: 'Raccontaci le tue date e ti risponderemo con disponibilità e preventivo.',
    },
    privacy: {
      title: 'Privacy Policy',
      lead: 'Come trattiamo i dati personali raccolti tramite questo sito.',
    },
  },

  contact: {
    formHeading: 'Richiedi disponibilità',
    required: 'obbligatorio',
    optionalSuffix: '(facoltativo)',
    labels: {
      name: 'Nome e cognome',
      email: 'Email',
      phone: 'Telefono',
      startDate: 'Data di arrivo',
      endDate: 'Data di partenza',
      eventType: 'Tipo di soggiorno o evento',
      message: 'Messaggio',
    },
    eventTypes: {
      soggiorno: 'Soggiorno',
      matrimonio: 'Matrimonio',
      evento: 'Evento privato',
      'venue-intera': 'Intera struttura in esclusiva',
      altro: 'Altro',
    },
    eventTypePlaceholder: 'Seleziona...',
    consent: {
      text: 'Acconsento al trattamento dei miei dati personali per rispondere a questa richiesta.',
      linkText: 'Leggi la Privacy Policy',
    },
    submit: 'Invia richiesta',
    submitting: 'Invio in corso...',
    errors: {
      nameRequired: 'Inserisci il tuo nome.',
      emailRequired: 'Inserisci la tua email.',
      emailInvalid: 'Controlla il formato della email.',
      startDateRequired: 'Indica la data di arrivo.',
      startDateInPast: 'La data di arrivo non può essere nel passato.',
      endDateRequired: 'Indica la data di partenza.',
      endDateBeforeStart: 'La partenza deve essere successiva all’arrivo.',
      eventTypeRequired: 'Seleziona il tipo di soggiorno.',
      consentRequired: 'Devi acconsentire al trattamento dei dati per inviare.',
      summaryTitle: 'Controlla i campi evidenziati:',
    },
    success: {
      title: 'Richiesta inviata',
      body: 'Grazie! Ti risponderemo al più presto con disponibilità e preventivo.',
      again: 'Invia un’altra richiesta',
    },
    failure: {
      title: 'Invio non riuscito',
      body: 'Non siamo riusciti a inviare la richiesta. Scrivici direttamente:',
      retry: 'Riprova',
    },
    notConfigured: 'Il modulo non è ancora collegato. Nel frattempo scrivici direttamente:',
  },

  cookies: {
    title: 'Cookie',
    body: 'Usiamo solo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso potremmo usarne altri per capire come viene usato il sito.',
    accept: 'Accetta',
    decline: 'Rifiuta',
    more: 'Maggiori informazioni',
    label: 'Avviso sui cookie',
  },

  faq: {
    heading: 'Domande frequenti',
    // Answers verified against the venue's Google Hotels listing and Facebook
    // page (September 2026). Check-in/check-out times still to be confirmed.
    items: [
      {
        q: 'Si può pranzare o cenare senza prenotare un evento?',
        a: 'No. La masseria non è un ristorante aperto al pubblico: cucina esclusivamente per eventi e ricorrenze prenotate, con menù concordati. Per le date disponibili scrivici.',
      },
      {
        q: 'Che tipo di eventi ospitate?',
        a: 'Matrimoni, battesimi, comunioni, compleanni e feste private, nel giardino con vista sul castello. Ci occupiamo noi del menù, come nei pranzi di Pasquetta e Ferragosto.',
      },
      {
        q: 'Sono ammessi gli animali?',
        a: 'Sì, la struttura è pet friendly e i vostri animali sono i benvenuti.',
      },
      {
        q: 'C’è parcheggio?',
        a: 'Sì, il parcheggio è disponibile gratuitamente in struttura.',
      },
      {
        q: 'Cosa è incluso nel soggiorno?',
        a: 'Wi-Fi gratuito, aria condizionata e colazione sono inclusi in tutte le camere. Non ci sono piscina, spa o palestra.',
      },
      {
        q: 'Come si conferma una prenotazione?',
        a: 'Inviaci una richiesta con le tue date: ti rispondiamo con disponibilità e preventivo, e la conferma avviene via email o telefono.',
      },
    ],
  },

  home: {
    heroAlt: 'Il giardino della masseria con il Castello di Prata Sannita sullo sfondo',
    heroCta: 'Richiedi disponibilità',
    heroSecondary: 'Scopri gli appartamenti',
  },

  apartments: {
    // Room types and amenities verified against the venue's Google Hotels
    // listing (September 2026). Capacities follow standard hotel terminology
    // for double/triple; the family room is to be confirmed (docs/CONTENT.md).
    intro:
      'Cinque camere nella masseria, tutte con Wi-Fi gratuito, aria condizionata e colazione inclusa. Parcheggio in struttura e animali benvenuti.',
    guestsLabel: 'ospiti',
    enquire: 'Richiedi',
    amenitiesHeading: 'Servizi',
    amenities: [
      'Wi-Fi gratuito',
      'Colazione inclusa',
      'Aria condizionata',
      'Parcheggio gratuito',
      'Animali ammessi',
    ],
    items: [
      {
        id: 'doppia-economy',
        name: 'Camera Doppia Economy',
        guests: 2,
        description: 'Camera doppia essenziale e tranquilla, affacciata sulla campagna.',
      },
      {
        id: 'doppia',
        name: 'Camera Doppia',
        guests: 2,
        description: 'La camera doppia della masseria, con gli arredi originali del casale.',
      },
      {
        id: 'tripla-giardino',
        name: 'Camera Tripla con Vista Giardino',
        guests: 3,
        description: 'Tripla con affaccio diretto sul giardino e sul Castello di Prata Sannita.',
      },
      {
        id: 'tripla-superior',
        name: 'Camera Tripla Superior',
        guests: 3,
        description: 'Tripla più ampia, con spazio in più per soggiorni lunghi.',
      },
      {
        id: 'familiare-superior',
        name: 'Camera Familiare Superior',
        guests: 4,
        description: 'La sistemazione più grande, pensata per le famiglie.',
      },
    ],
  },

  events: {
    intro:
      'La masseria cucina solo su prenotazione, per eventi e ricorrenze. Il giardino, con il castello alle spalle, viene apparecchiato per l’occasione e il menù si concorda insieme.',
    typesHeading: 'Cosa ospitiamo',
    types: [
      'Matrimoni',
      'Battesimi e comunioni',
      'Compleanni e anniversari',
      'Feste private',
      'Pranzi delle ricorrenze (Pasquetta, Ferragosto)',
    ],
    notRestaurant:
      'Non siamo un ristorante aperto al pubblico: si cucina esclusivamente per eventi prenotati.',
    galleryHeading: 'Il giardino apparecchiato',
    photos: [
      {
        id: 'evento-tavola',
        alt: 'Tavolata apparecchiata nel giardino con il castello sullo sfondo',
      },
      { id: 'evento-giardino', alt: 'Tavolo lungo sotto le luci, tra gli ulivi' },
      { id: 'buffet', alt: 'Buffet di salumi, formaggi e prodotti locali' },
      { id: 'terrazza', alt: 'La terrazza con gli ombrelloni e le colline del Matese' },
    ],
    cta: 'Raccontaci il tuo evento',
  },

  area: {
    // Places and drive times taken from the venue's Google listing
    // (September 2026). Only verified items — nothing added from memory.
    intro: 'La masseria è nel Matese, a pochi passi dal borgo di Prata Sannita e dal suo castello.',
    nearbyHeading: 'Nei dintorni',
    nearby: [
      { name: 'Castello di Prata Sannita', note: 'Proprio davanti al giardino della masseria.' },
      { name: 'Parco del Matese', note: 'Circa 40 minuti di auto.' },
      { name: 'Lago del Matese', note: 'Uno dei laghi carsici più alti d’Appennino.' },
      { name: 'Campitello Matese', note: 'La stazione sciistica del massiccio.' },
    ],
  },

  directions: {
    intro: 'Siamo a Prata Sannita, in provincia di Caserta, sul versante campano del Matese.',
    addressHeading: 'Indirizzo',
    byCarHeading: 'In auto',
    travel: [
      { from: 'Aeroporto di Napoli Capodichino', time: 'circa 1 ora e 6 minuti' },
      { from: 'Parco del Matese', time: 'circa 41 minuti' },
    ],
    mapCta: 'Apri in Google Maps',
    parkingNote: 'Il parcheggio è gratuito in struttura.',
  },

  nav: {
    home: 'Home',
    chiSiamo: 'Chi Siamo',
    appartamenti: 'Appartamenti',
    territorio: 'Territorio',
    petFriendly: 'Pet Friendly',
    esperienze: 'Esperienze',
    comeRaggiungerci: 'Come Raggiungerci',
    contatti: 'Contatti',
  },

  actions: {
    bookNow: 'Prenota Ora',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    whatsapp: 'Scrivici su WhatsApp',
    whatsappShort: 'WhatsApp',
    skipToContent: 'Vai al contenuto principale',
  },

  footer: {
    contactHeading: 'Contatti',
    followHeading: 'Seguici',
    legalHeading: 'Informazioni legali',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    rights: 'Tutti i diritti riservati.',
  },

  notFound: {
    title: 'Pagina non trovata',
    body: 'La pagina che cerchi non esiste o è stata spostata.',
    back: 'Torna alla home',
  },
}
