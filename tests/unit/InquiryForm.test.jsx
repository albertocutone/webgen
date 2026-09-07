import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import InquiryForm from '../../src/components/booking/InquiryForm.jsx'
import { LocaleProvider } from '../../src/i18n/LocaleContext.jsx'
import itContent from '../../src/content/it/site.js'

const c = itContent.contact

function setup({ submit = jest.fn().mockResolvedValue({ success: true }), ...props } = {}) {
  const user = userEvent.setup()
  render(
    <LocaleProvider>
      <MemoryRouter>
        <InquiryForm web3formsKey="test-key" turnstileSiteKey="" submit={submit} {...props} />
      </MemoryRouter>
    </LocaleProvider>,
  )
  return { user, submit }
}

/** Future dates, so validation never fails for being in the past. */
function futureDates() {
  const start = new Date()
  start.setDate(start.getDate() + 30)
  const end = new Date(start)
  end.setDate(end.getDate() + 4)
  const fmt = (d) => d.toISOString().slice(0, 10)
  return { start: fmt(start), end: fmt(end) }
}

async function fillValidForm(user) {
  const { start, end } = futureDates()
  await user.type(screen.getByLabelText(new RegExp(c.labels.name)), 'Giulia Rossi')
  await user.type(screen.getByLabelText(new RegExp(c.labels.email)), 'giulia@example.com')
  await user.type(screen.getByLabelText(new RegExp(c.labels.startDate)), start)
  await user.type(screen.getByLabelText(new RegExp(c.labels.endDate)), end)
  await user.selectOptions(screen.getByLabelText(new RegExp(c.labels.eventType)), 'soggiorno')
  await user.click(screen.getByLabelText(new RegExp(c.consent.text)))
  return { start, end }
}

beforeEach(() => {
  window.localStorage.clear()
  Object.defineProperty(window.navigator, 'language', { value: 'it-IT', configurable: true })
})

describe('InquiryForm accessibility', () => {
  it('gives every control a real label', () => {
    setup()
    for (const label of Object.values(c.labels)) {
      expect(screen.getByLabelText(new RegExp(label))).toBeInTheDocument()
    }
  })

  it('starts with consent unticked, as GDPR requires', () => {
    setup()
    expect(screen.getByLabelText(new RegExp(c.consent.text))).not.toBeChecked()
  })

  it('links the consent text to the privacy policy', () => {
    setup()
    expect(screen.getByRole('link', { name: c.consent.linkText })).toHaveAttribute(
      'href',
      '/privacy',
    )
  })
})

describe('InquiryForm validation', () => {
  it('does not submit an empty form and lists the problems', async () => {
    const { user, submit } = setup()

    await user.click(screen.getByRole('button', { name: c.submit }))

    expect(submit).not.toHaveBeenCalled()
    const summary = await screen.findByRole('alert')
    expect(summary).toHaveTextContent(c.errors.summaryTitle)
    expect(summary).toHaveTextContent(c.errors.nameRequired)
    expect(summary).toHaveTextContent(c.errors.consentRequired)
  })

  it('blocks submission when only consent is missing', async () => {
    const { user, submit } = setup()
    const { start, end } = futureDates()

    await user.type(screen.getByLabelText(new RegExp(c.labels.name)), 'Giulia')
    await user.type(screen.getByLabelText(new RegExp(c.labels.email)), 'giulia@example.com')
    await user.type(screen.getByLabelText(new RegExp(c.labels.startDate)), start)
    await user.type(screen.getByLabelText(new RegExp(c.labels.endDate)), end)
    await user.selectOptions(screen.getByLabelText(new RegExp(c.labels.eventType)), 'soggiorno')

    await user.click(screen.getByRole('button', { name: c.submit }))

    expect(submit).not.toHaveBeenCalled()
    expect(await screen.findByRole('alert')).toHaveTextContent(c.errors.consentRequired)
  })

  it('marks an invalid field with aria-invalid', async () => {
    const { user } = setup()

    await user.type(screen.getByLabelText(new RegExp(c.labels.email)), 'not-an-email')
    await user.click(screen.getByRole('button', { name: c.submit }))

    await waitFor(() =>
      expect(screen.getByLabelText(new RegExp(c.labels.email))).toHaveAttribute(
        'aria-invalid',
        'true',
      ),
    )
  })

  it('clears a field error once the user edits that field', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: c.submit }))
    await screen.findByRole('alert')

    await user.type(screen.getByLabelText(new RegExp(c.labels.name)), 'G')

    await waitFor(() => expect(screen.queryByText(c.errors.nameRequired)).not.toBeInTheDocument())
  })
})

describe('InquiryForm submission', () => {
  it('sends the collected values and shows a confirmation', async () => {
    const { user, submit } = setup()
    const { start, end } = await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: c.submit }))

    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1))
    expect(submit.mock.calls[0][0]).toMatchObject({
      name: 'Giulia Rossi',
      email: 'giulia@example.com',
      startDate: start,
      endDate: end,
      eventType: 'soggiorno',
      consent: true,
    })

    expect(await screen.findByText(c.success.title)).toBeInTheDocument()
  })

  it('shows direct contacts when sending fails', async () => {
    const submit = jest.fn().mockRejectedValue(new Error('boom'))
    const { user } = setup({ submit })
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: c.submit }))

    expect(await screen.findByText(c.failure.title)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: itContent.actions.whatsappShort })).toBeInTheDocument()
  })

  it('does not lose the visitor when no access key is configured', () => {
    render(
      <LocaleProvider>
        <MemoryRouter>
          <InquiryForm web3formsKey="" turnstileSiteKey="" submit={jest.fn()} />
        </MemoryRouter>
      </LocaleProvider>,
    )

    expect(screen.getByText(c.notConfigured)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: c.submit })).toBeDisabled()
  })

  it('passes the Turnstile token through when one was issued', async () => {
    const { user, submit } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: c.submit }))

    await waitFor(() => expect(submit).toHaveBeenCalled())
    // No site key configured in tests, so the token is empty but still passed.
    expect(submit.mock.calls[0][1]).toHaveProperty('turnstileToken', '')
  })

  it('renders no Turnstile widget when the site key is empty', () => {
    setup()
    expect(screen.queryByTestId('turnstile')).not.toBeInTheDocument()
  })
})
