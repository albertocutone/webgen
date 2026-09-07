# Content checklist

Everything the site needs from the owner before launch. The site is built and
deployed; each item below is currently a **placeholder** that must be replaced.

Nothing here needs a developer — items 1–3 are files and values, and item 4 is
plain text in two files.

---

## 1. Configuration keys (blocks the booking form)

| Key                       | Where to get it                                                                               | What breaks without it                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `VITE_WEB3FORMS_KEY`      | Free access key from <https://web3forms.com>, tied to the inbox that should receive enquiries | **The form cannot send.** It currently shows a notice with the email and WhatsApp instead, and the submit button is disabled |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare dashboard → Turnstile → add site → **site key** (not the secret key)               | No bot protection; the form is otherwise fine                                                                                |

Add both under **Settings → Secrets and variables → Actions** in the GitHub
repository. Both are public client-side keys compiled into the JS bundle —
they are not secrets, and the repository is public, so nothing confidential
may go here.

## 2. Contact details

Edit `src/lib/constants.js`. Current values are placeholders:

```js
email: 'info@masseriamastrangelo.it' // ← real inbox
phone: '+39 000 000 0000' // ← real number
whatsapp: '390000000000' // ← international format, no + or spaces
address: 'Puglia, Italia' // ← full postal address
```

## 3. Photography

Drop files into `public/images/`. The site currently ships two obvious
placeholders (`placeholder-hero.svg`, `placeholder-room.svg`) that read
"PLACEHOLDER — fotografia da fornire" so they cannot be shipped by accident.

| Slot              | Suggested size     | Notes                                                            |
| ----------------- | ------------------ | ---------------------------------------------------------------- |
| Hero              | 2400 × 1350 (16:9) | The first thing visitors see; landscape, the building or grounds |
| One per unit      | 1200 × 900 (4:3)   | Four units are listed today — see item 4                         |
| Optional per page | 1600 × 900         | Chi Siamo, Territorio, Esperienze                                |

**Export from Google Business Profile:** sign in at
<https://business.google.com>, open the listing → Photos → download. Use only
photographs you own; visitor-uploaded photos on the profile belong to the
people who uploaded them.

Save as JPG or WebP. Do not worry about compression — that is handled at build
time.

## 4. Copy

Two files, mirrored key for key: `src/content/it/site.js` and
`src/content/en/site.js`. Every string marked `PLACEHOLDER` in a comment needs
replacing.

- [ ] `tagline` — one line under the venue name
- [ ] `pages.*.lead` — the sentence under each page's title (9 pages)
- [ ] `faq.items` — five questions with real answers (check-in times, pets,
      parking, exclusive hire, how to confirm)
- [ ] `apartments.items` — the **real** inventory: how many units, their names,
      sleeping capacity and a description each
- [ ] Page body content for Chi Siamo, Territorio, Pet Friendly, Esperienze and
      Come Raggiungerci, which currently show only a title and lead

> Accented characters matter: write `disponibilità`, not `disponibilita`. A
> test fails the build if common Italian words lose their accents.

## 5. Decisions still open

- [ ] **Custom domain** — the site is at `albertocutone.github.io/webgen`. A
      real domain needs `public/CNAME` and `SITE_URL` in `src/lib/constants.js`
      updated, since canonical URLs and the sitemap derive from it.
- [ ] **Pricing** — published on the site, or quoted per enquiry?
- [ ] **Analytics** — none is installed. Adding any requires wiring it to the
      cookie banner's consent state (`analyticsAllowed`).
- [ ] **Privacy policy text** — `/privacy` is a stub. This needs real legal
      copy naming the data controller, what is collected and the retention
      period, because the form links to it as GDPR consent.
