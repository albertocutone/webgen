import { useLocale } from '../../hooks/useLocale.js'
import { CONTACT } from '../../lib/constants.js'

/**
 * Phone, WhatsApp and email, shown alongside the enquiry form.
 *
 * A form is not everyone's preferred channel, and this venue is run by a named
 * person — Angelo, per the contact line printed on its own menus — so giving
 * the direct routes equal standing is likely to convert better than a form
 * alone.
 */
export default function DirectContact() {
  const { t } = useLocale()
  const c = t.contact.directContact

  const linkClass =
    'rounded-full border border-olive-600 px-4 py-2 text-sm font-medium text-olive-700 transition-colors hover:bg-limestone-200'

  return (
    <section className="rounded-lg border border-limestone-200 bg-limestone-100 p-6">
      <h2 className="text-xl text-olive-700">{c.heading}</h2>
      <p className="mt-1 text-sm text-stone-muted">{c.lead}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <a className={linkClass} href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>
          {c.callLabel} · {CONTACT.phone}
        </a>
        <a
          className={linkClass}
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.whatsappLabel}
        </a>
        <a className={linkClass} href={`mailto:${CONTACT.email}`}>
          {c.emailLabel}
        </a>
      </div>
    </section>
  )
}
