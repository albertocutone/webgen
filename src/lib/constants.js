/**
 * Venue contact details.
 *
 * Sourced from the venue's own Facebook page (About → Contact info),
 * September 2026. Verified values, not placeholders.
 */
export const CONTACT = {
  email: 'masseriamastrangelo@gmail.com',
  phone: '+39 331 137 9732',
  // E.164 without '+' or spaces, as wa.me requires.
  whatsapp: '393311379732',
  // Named contact for enquiries, as printed on the venue's own menus.
  contactName: 'Angelo',
}

/** Postal address, kept structured so JSON-LD and the footer agree. */
export const ADDRESS = {
  street: 'Via Portelle 17',
  locality: 'Prata Sannita',
  province: 'CE',
  postalCode: '81010',
  region: 'Campania',
  country: 'IT',
}

/** Single-line form for the footer and contact blocks. */
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality} (${ADDRESS.province})`

export const SITE_URL = 'https://albertocutone.github.io/webgen'
