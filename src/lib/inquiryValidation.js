/**
 * Validation for the booking-inquiry form.
 *
 * Pure and UI-free so it can be unit tested directly and reused by the Phase 2
 * backend, where the same rules must be enforced server-side — a browser can
 * always be bypassed.
 *
 * Field names mirror the Phase 2 BOOKING/CUSTOMER entities (design §5.4).
 */

// Deliberately permissive: the only authoritative test of an address is
// sending mail to it. A stricter pattern rejects valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const EVENT_TYPES = ['soggiorno', 'matrimonio', 'evento', 'venue-intera', 'altro']

export const EMPTY_INQUIRY = {
  name: '',
  email: '',
  phone: '',
  startDate: '',
  endDate: '',
  eventType: '',
  message: '',
  consent: false,
}

/** Today's date as YYYY-MM-DD in local time (not UTC — `toISOString` shifts). */
export function today(now = new Date()) {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * @returns {Record<string,string>} field name -> error key, empty when valid.
 * Error keys index into content `contact.errors.*`.
 */
export function validateInquiry(values, { now = new Date() } = {}) {
  const errors = {}

  if (!values.name?.trim()) errors.name = 'nameRequired'

  if (!values.email?.trim()) errors.email = 'emailRequired'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'emailInvalid'

  if (!values.startDate) errors.startDate = 'startDateRequired'
  else if (values.startDate < today(now)) errors.startDate = 'startDateInPast'

  if (!values.endDate) errors.endDate = 'endDateRequired'
  else if (values.startDate && values.endDate < values.startDate) {
    errors.endDate = 'endDateBeforeStart'
  }

  if (!values.eventType) errors.eventType = 'eventTypeRequired'

  // GDPR: consent must be an explicit, affirmative action (design §5.4).
  if (!values.consent) errors.consent = 'consentRequired'

  return errors
}

export function isValid(errors) {
  return Object.keys(errors).length === 0
}
