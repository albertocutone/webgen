import { WEB3FORMS_KEY } from './config.js'

const ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * The single place the app talks to the network. Phase 2 replaces this module
 * with an API client and nothing else needs to change (design §8).
 */
export class InquirySubmitError extends Error {
  constructor(message, { cause, status } = {}) {
    super(message)
    this.name = 'InquirySubmitError'
    this.cause = cause
    this.status = status
  }
}

/** Human-readable subject so the owner can triage the inbox at a glance. */
function buildSubject(values) {
  return `Richiesta di prenotazione — ${values.name} (${values.startDate} → ${values.endDate})`
}

/**
 * Posts an inquiry to Web3Forms.
 *
 * @param values   validated inquiry fields
 * @param options.accessKey     Web3Forms key; defaults to the build-time config
 * @param options.turnstileToken bot-protection token, omitted when disabled
 * @throws {InquirySubmitError} on a missing key, network failure or non-2xx
 */
export async function submitInquiry(values, { accessKey = WEB3FORMS_KEY, turnstileToken } = {}) {
  if (!accessKey) {
    throw new InquirySubmitError('Web3Forms access key is not configured')
  }

  const payload = {
    access_key: accessKey,
    subject: buildSubject(values),
    from_name: values.name,
    // Field names are snake_case to read well in the notification email.
    name: values.name,
    email: values.email,
    phone: values.phone || '—',
    check_in: values.startDate,
    check_out: values.endDate,
    event_type: values.eventType,
    message: values.message || '—',
    consent_given: values.consent ? 'yes' : 'no',
  }

  if (turnstileToken) payload['cf-turnstile-response'] = turnstileToken

  let response
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (cause) {
    // Offline, DNS failure, blocked by an extension...
    throw new InquirySubmitError('Network request failed', { cause })
  }

  if (!response.ok) {
    throw new InquirySubmitError(`Web3Forms responded ${response.status}`, {
      status: response.status,
    })
  }

  // Web3Forms can return HTTP 200 with { success: false }, so the body decides.
  const body = await response.json().catch(() => null)
  if (!body?.success) {
    throw new InquirySubmitError(body?.message ?? 'Web3Forms rejected the submission', {
      status: response.status,
    })
  }

  return body
}
