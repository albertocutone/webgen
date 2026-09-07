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
      lead: 'Camere e appartamenti indipendenti, oppure l’intera struttura in esclusiva.',
    },
    territorio: {
      title: 'Territorio',
      lead: 'Il Parco Regionale del Matese, il borgo di Prata Sannita e il fiume Lete.',
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
    // PLACEHOLDER answers — to be confirmed by the owner (docs/CONTENT.md).
    items: [
      {
        q: 'A che ora sono il check-in e il check-out?',
        a: 'Il check-in è dalle 15:00 alle 20:00, il check-out entro le 10:00. Per orari diversi scrivici: cerchiamo sempre di essere flessibili.',
      },
      {
        q: 'Sono ammessi gli animali?',
        a: 'Sì, i vostri animali sono i benvenuti senza supplemento. La tenuta è ampia e recintata.',
      },
      {
        q: 'C’è parcheggio?',
        a: 'Sì, parcheggio privato gratuito all’interno della proprietà.',
      },
      {
        q: 'È possibile affittare l’intera struttura?',
        a: 'Sì, la masseria può essere riservata in esclusiva per matrimoni ed eventi privati. Indicalo nella richiesta di prenotazione.',
      },
      {
        q: 'Come si conferma una prenotazione?',
        a: 'Inviaci una richiesta con le tue date: ti rispondiamo con disponibilità e preventivo, e la conferma avviene via email.',
      },
    ],
  },

  home: {
    heroAlt: 'Il giardino della masseria con il Castello di Prata Sannita sullo sfondo',
    heroCta: 'Richiedi disponibilità',
    heroSecondary: 'Scopri gli appartamenti',
  },

  apartments: {
    // PLACEHOLDER units — the real inventory is to be confirmed (docs/CONTENT.md).
    intro: 'Ogni alloggio è indipendente, con ingresso autonomo e vista sulla campagna.',
    guestsLabel: 'ospiti',
    enquire: 'Richiedi',
    items: [
      {
        id: 'trullo',
        name: 'Il Trullo',
        guests: 2,
        description: 'Camera matrimoniale in pietra con volta a stella e patio privato.',
      },
      {
        id: 'uliveto',
        name: 'Uliveto',
        guests: 4,
        description: 'Appartamento con due camere, cucina abitabile e affaccio sull’uliveto.',
      },
      {
        id: 'corte',
        name: 'La Corte',
        guests: 6,
        description: 'Alloggio ampio attorno alla corte interna, ideale per famiglie.',
      },
      {
        id: 'intera',
        name: 'Intera masseria',
        guests: 12,
        description:
          'Tutti gli alloggi in esclusiva, con spazi comuni e giardino, per matrimoni ed eventi.',
      },
    ],
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
