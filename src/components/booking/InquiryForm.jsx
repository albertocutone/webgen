import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../../hooks/useLocale.js'
import { WEB3FORMS_KEY, TURNSTILE_SITE_KEY } from '../../lib/config.js'
import { CONTACT } from '../../lib/constants.js'
import {
  EMPTY_INQUIRY,
  EVENT_TYPES,
  isValid,
  today,
  validateInquiry,
} from '../../lib/inquiryValidation.js'
import { submitInquiry } from '../../lib/web3forms.js'
import TurnstileWidget from './TurnstileWidget.jsx'
import Field, { controlClass } from './Field.jsx'

/** Email and WhatsApp shown whenever the form itself cannot deliver. */
function DirectContacts() {
  const { t } = useLocale()
  return (
    <ul className="mt-3 space-y-1 text-sm">
      <li>
        <a className="underline hover:text-olive-700" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
      </li>
      <li>
        <a
          className="underline hover:text-olive-700"
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.actions.whatsapp}
        </a>
      </li>
    </ul>
  )
}

/**
 * Booking-inquiry form (design §5.4).
 *
 * Keys are injected rather than imported directly so tests can drive the
 * configured and unconfigured paths without touching build config.
 */
export default function InquiryForm({
  web3formsKey = WEB3FORMS_KEY,
  turnstileSiteKey = TURNSTILE_SITE_KEY,
  submit = submitInquiry,
}) {
  const { t } = useLocale()
  const c = t.contact

  const [values, setValues] = useState(EMPTY_INQUIRY)
  const [errors, setErrors] = useState({})
  // 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const [turnstileToken, setTurnstileToken] = useState('')
  const errorSummaryRef = useRef(null)

  const configured = Boolean(web3formsKey)

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Clear a field's error as soon as the user edits it; re-validating the
    // whole form on every keystroke would shout about fields not yet reached.
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const found = validateInquiry(values)
    setErrors(found)

    if (!isValid(found)) {
      // Move focus to the summary so keyboard and screen-reader users are told
      // why nothing was sent.
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }

    setStatus('submitting')
    try {
      await submit(values, { accessKey: web3formsKey, turnstileToken })
      setStatus('success')
      setValues(EMPTY_INQUIRY)
    } catch {
      // The reason is deliberately not surfaced: it is an internal detail and
      // the useful action is always the same — contact us another way.
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-olive-400 bg-limestone-100 p-6">
        <h2 className="text-2xl text-olive-700">{c.success.title}</h2>
        <p className="mt-2 text-stone-muted">{c.success.body}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm underline hover:text-olive-700"
        >
          {c.success.again}
        </button>
      </div>
    )
  }

  const errorEntries = Object.entries(errors)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <h2 className="text-2xl text-olive-700">{c.formHeading}</h2>

      {!configured && (
        <div className="rounded-md border border-limestone-300 bg-limestone-100 p-4 text-sm">
          <p>{c.notConfigured}</p>
          <DirectContacts />
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="rounded-md border border-terracotta-500 bg-limestone-100 p-4">
          <h3 className="font-semibold text-terracotta-700">{c.failure.title}</h3>
          <p className="mt-1 text-sm">{c.failure.body}</p>
          <DirectContacts />
        </div>
      )}

      {errorEntries.length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-md border border-terracotta-500 bg-limestone-100 p-4"
        >
          <p className="font-semibold text-terracotta-700">{c.errors.summaryTitle}</p>
          <ul className="mt-2 list-inside list-disc text-sm">
            {errorEntries.map(([field, key]) => (
              <li key={field}>{c.errors[key]}</li>
            ))}
          </ul>
        </div>
      )}

      <Field id="name" label={c.labels.name} error={errors.name && c.errors[errors.name]} required>
        {(props) => (
          <input
            {...props}
            type="text"
            autoComplete="name"
            className={controlClass}
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
          />
        )}
      </Field>

      <Field
        id="email"
        label={c.labels.email}
        error={errors.email && c.errors[errors.email]}
        required
      >
        {(props) => (
          <input
            {...props}
            type="email"
            autoComplete="email"
            className={controlClass}
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
          />
        )}
      </Field>

      <Field id="phone" label={c.labels.phone} optionalLabel={c.optionalSuffix}>
        {(props) => (
          <input
            {...props}
            type="tel"
            autoComplete="tel"
            className={controlClass}
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="startDate"
          label={c.labels.startDate}
          error={errors.startDate && c.errors[errors.startDate]}
          required
        >
          {(props) => (
            <input
              {...props}
              type="date"
              min={today()}
              className={controlClass}
              value={values.startDate}
              onChange={(e) => update('startDate', e.target.value)}
            />
          )}
        </Field>

        <Field
          id="endDate"
          label={c.labels.endDate}
          error={errors.endDate && c.errors[errors.endDate]}
          required
        >
          {(props) => (
            <input
              {...props}
              type="date"
              min={values.startDate || today()}
              className={controlClass}
              value={values.endDate}
              onChange={(e) => update('endDate', e.target.value)}
            />
          )}
        </Field>
      </div>

      <Field
        id="eventType"
        label={c.labels.eventType}
        error={errors.eventType && c.errors[errors.eventType]}
        required
      >
        {(props) => (
          <select
            {...props}
            className={controlClass}
            value={values.eventType}
            onChange={(e) => update('eventType', e.target.value)}
          >
            <option value="">{c.eventTypePlaceholder}</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {c.eventTypes[type]}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="message" label={c.labels.message} optionalLabel={c.optionalSuffix}>
        {(props) => (
          <textarea
            {...props}
            rows={5}
            className={controlClass}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
          />
        )}
      </Field>

      <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />

      {/* GDPR: unticked by default, immediately above submit (design §5.4). */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-1 size-4 shrink-0 accent-olive-600"
          />
          <label htmlFor="consent" className="text-sm text-stone-ink">
            {c.consent.text}{' '}
            <Link to="/privacy" className="underline hover:text-olive-700">
              {c.consent.linkText}
            </Link>
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="mt-1 text-sm text-terracotta-700">
            {c.errors[errors.consent]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting' || !configured}
        className="rounded-full bg-terracotta-600 px-6 py-3 font-medium text-limestone-50 transition-colors hover:bg-terracotta-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? c.submitting : c.submit}
      </button>
    </form>
  )
}
