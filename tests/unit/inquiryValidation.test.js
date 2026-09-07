import { validateInquiry, isValid, today, EMPTY_INQUIRY } from '../../src/lib/inquiryValidation.js'

const NOW = new Date('2026-06-15T12:00:00')

/** A submission that should always pass, so each test varies one thing. */
function validValues(overrides = {}) {
  return {
    name: 'Giulia Rossi',
    email: 'giulia@example.com',
    phone: '',
    startDate: '2026-07-01',
    endDate: '2026-07-05',
    eventType: 'soggiorno',
    message: '',
    consent: true,
    ...overrides,
  }
}

describe('today', () => {
  it('formats local date, not UTC', () => {
    // 00:30 CEST on 1 July is still 30 June in UTC; toISOString would say the
    // 30th and reject a same-day booking.
    expect(today(new Date(2026, 6, 1, 0, 30))).toBe('2026-07-01')
  })
})

describe('validateInquiry', () => {
  it('accepts a complete submission', () => {
    const errors = validateInquiry(validValues(), { now: NOW })
    expect(errors).toEqual({})
    expect(isValid(errors)).toBe(true)
  })

  it('reports every missing required field at once', () => {
    const errors = validateInquiry(EMPTY_INQUIRY, { now: NOW })
    expect(Object.keys(errors).sort()).toEqual(
      ['consent', 'email', 'endDate', 'eventType', 'name', 'startDate'].sort(),
    )
  })

  it('treats whitespace-only name as missing', () => {
    expect(validateInquiry(validValues({ name: '   ' }), { now: NOW }).name).toBe('nameRequired')
  })

  it.each([
    ['no at sign', 'giulia.example.com'],
    ['no domain dot', 'giulia@example'],
    ['spaces', 'giu lia@example.com'],
    ['empty tld', 'giulia@example.'],
  ])('rejects an invalid email (%s)', (_label, email) => {
    expect(validateInquiry(validValues({ email }), { now: NOW }).email).toBe('emailInvalid')
  })

  it.each([
    ['plus addressing', 'giulia+puglia@example.co.uk'],
    ['subdomain', 'g@mail.example.it'],
  ])('accepts a valid email (%s)', (_label, email) => {
    expect(validateInquiry(validValues({ email }), { now: NOW }).email).toBeUndefined()
  })

  it('rejects a start date in the past', () => {
    expect(validateInquiry(validValues({ startDate: '2026-06-14' }), { now: NOW }).startDate).toBe(
      'startDateInPast',
    )
  })

  it('accepts a start date of today', () => {
    const values = validValues({ startDate: '2026-06-15', endDate: '2026-06-16' })
    expect(validateInquiry(values, { now: NOW }).startDate).toBeUndefined()
  })

  it('rejects an end date before the start date', () => {
    const values = validValues({ startDate: '2026-07-10', endDate: '2026-07-02' })
    expect(validateInquiry(values, { now: NOW }).endDate).toBe('endDateBeforeStart')
  })

  it('allows a same-day start and end', () => {
    const values = validValues({ startDate: '2026-07-10', endDate: '2026-07-10' })
    expect(validateInquiry(values, { now: NOW }).endDate).toBeUndefined()
  })

  it('requires explicit GDPR consent', () => {
    expect(validateInquiry(validValues({ consent: false }), { now: NOW }).consent).toBe(
      'consentRequired',
    )
  })

  it('treats phone and message as optional', () => {
    const values = validValues({ phone: '', message: '' })
    expect(validateInquiry(values, { now: NOW })).toEqual({})
  })
})
