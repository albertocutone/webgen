// Italian copy. Owner-editable: no JSX, no logic — strings only.
export default {
  locale: 'it',
  siteName: 'Masseria Mastrangelo',
  tagline: 'Soggiorni ed eventi nel cuore della Puglia',

  // Per-page copy, keyed by route id in src/routes.js.
  // PLACEHOLDER lead text — to be replaced with the owner's copy (docs/CONTENT.md).
  pages: {
    home: {
      title: 'Masseria Mastrangelo',
      lead: 'Un antico casale di pietra tra gli ulivi, a pochi minuti dal mare.',
    },
    chiSiamo: {
      title: 'Chi Siamo',
      lead: 'La storia della masseria, la tenuta e il legame con il territorio.',
    },
    appartamenti: {
      title: 'Appartamenti',
      lead: "Camere e appartamenti indipendenti, oppure l'intera struttura in esclusiva.",
    },
    territorio: {
      title: 'Territorio',
      lead: 'Borghi, spiagge e sapori da scoprire nei dintorni della masseria.',
    },
    petFriendly: {
      title: 'Pet Friendly',
      lead: 'I vostri animali sono i benvenuti: spazi aperti e nessun supplemento.',
    },
    esperienze: {
      title: 'Esperienze',
      lead: 'Degustazioni, visite guidate e giornate in campagna.',
    },
    comeRaggiungerci: {
      title: 'Come Raggiungerci',
      lead: 'Dove siamo e come arrivare in auto, in treno o in aereo.',
    },
    contatti: {
      title: 'Richiesta di Prenotazione',
      lead: 'Raccontaci le tue date e ti risponderemo con disponibilita e preventivo.',
    },
    privacy: {
      title: 'Privacy Policy',
      lead: 'Come trattiamo i dati personali raccolti tramite questo sito.',
    },
  },

  contact: {
    formHeading: 'Richiedi disponibilita',
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
      startDateInPast: 'La data di arrivo non puo essere nel passato.',
      endDateRequired: 'Indica la data di partenza.',
      endDateBeforeStart: 'La partenza deve essere successiva all arrivo.',
      eventTypeRequired: 'Seleziona il tipo di soggiorno.',
      consentRequired: 'Devi acconsentire al trattamento dei dati per inviare.',
      summaryTitle: 'Controlla i campi evidenziati:',
    },
    success: {
      title: 'Richiesta inviata',
      body: 'Grazie! Ti risponderemo al piu presto con disponibilita e preventivo.',
      again: 'Invia un altra richiesta',
    },
    failure: {
      title: 'Invio non riuscito',
      body: 'Non siamo riusciti a inviare la richiesta. Scrivici direttamente:',
      retry: 'Riprova',
    },
    notConfigured: 'Il modulo non e ancora collegato. Nel frattempo scrivici direttamente:',
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
