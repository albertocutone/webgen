import { submitInquiry, InquirySubmitError } from '../../src/lib/web3forms.js'

const VALUES = {
  name: 'Giulia Rossi',
  email: 'giulia@example.com',
  phone: '+39 333 1234567',
  startDate: '2026-07-01',
  endDate: '2026-07-05',
  eventType: 'soggiorno',
  message: 'Ciao',
  consent: true,
}

function okResponse(body = { success: true }) {
  return { ok: true, status: 200, json: async () => body }
}

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  delete global.fetch
})

describe('submitInquiry', () => {
  it('posts the mapped payload to Web3Forms', async () => {
    global.fetch.mockResolvedValue(okResponse())

    await submitInquiry(VALUES, { accessKey: 'key-123' })

    expect(global.fetch).toHaveBeenCalledTimes(1)
    const [url, init] = global.fetch.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(init.method).toBe('POST')

    const payload = JSON.parse(init.body)
    expect(payload).toMatchObject({
      access_key: 'key-123',
      name: 'Giulia Rossi',
      email: 'giulia@example.com',
      check_in: '2026-07-01',
      check_out: '2026-07-05',
      event_type: 'soggiorno',
      consent_given: 'yes',
    })
    expect(payload.subject).toContain('Giulia Rossi')
  })

  it('substitutes a dash for omitted optional fields', async () => {
    global.fetch.mockResolvedValue(okResponse())

    await submitInquiry({ ...VALUES, phone: '', message: '' }, { accessKey: 'k' })

    const payload = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(payload.phone).toBe('—')
    expect(payload.message).toBe('—')
  })

  it('includes the Turnstile token when present', async () => {
    global.fetch.mockResolvedValue(okResponse())

    await submitInquiry(VALUES, { accessKey: 'k', turnstileToken: 'tok' })

    const payload = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(payload['cf-turnstile-response']).toBe('tok')
  })

  it('omits the Turnstile field when there is no token', async () => {
    global.fetch.mockResolvedValue(okResponse())

    await submitInquiry(VALUES, { accessKey: 'k' })

    const payload = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(payload).not.toHaveProperty('cf-turnstile-response')
  })

  it('throws without an access key, without hitting the network', async () => {
    await expect(submitInquiry(VALUES, { accessKey: '' })).rejects.toThrow(InquirySubmitError)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('wraps a network failure', async () => {
    global.fetch.mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(submitInquiry(VALUES, { accessKey: 'k' })).rejects.toThrow(
      /Network request failed/,
    )
  })

  it('throws on a non-2xx response', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500, json: async () => ({}) })

    await expect(submitInquiry(VALUES, { accessKey: 'k' })).rejects.toThrow(/500/)
  })

  // Web3Forms returns 200 with success:false for a rejected submission (bad
  // key, failed captcha), which would otherwise look like a success.
  it('throws when the body reports success:false despite HTTP 200', async () => {
    global.fetch.mockResolvedValue(okResponse({ success: false, message: 'Invalid access key' }))

    await expect(submitInquiry(VALUES, { accessKey: 'k' })).rejects.toThrow(/Invalid access key/)
  })

  it('throws when the body is not JSON', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('not json')
      },
    })

    await expect(submitInquiry(VALUES, { accessKey: 'k' })).rejects.toThrow(InquirySubmitError)
  })
})
