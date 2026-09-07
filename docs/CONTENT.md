# Content checklist

Everything the site needs from the owner before launch. The site is built and
deployed, and the venue's real details, room types and photographs are now in
place. What remains is listed below.

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

## 2. Contact details — ✅ done

Imported from the Facebook page (September 2026) and live in
`src/lib/constants.js`:

|                  |                                           |
| ---------------- | ----------------------------------------- |
| Address          | Via Portelle 17, 81010 Prata Sannita (CE) |
| Phone / WhatsApp | +39 331 137 9732 (Angelo)                 |
| Email            | masseriamastrangelo@gmail.com             |

## 3. Photography

Drop files into `public/images/`. The site currently ships two obvious
placeholders (`placeholder-hero.svg`, `placeholder-room.svg`) that read
"PLACEHOLDER — fotografia da fornire" so they cannot be shipped by accident.

| Slot              | Suggested size     | Notes                                                            |
| ----------------- | ------------------ | ---------------------------------------------------------------- |
| Hero              | 2400 × 1350 (16:9) | The first thing visitors see; landscape, the building or grounds |
| One per unit      | 1200 × 900 (4:3)   | Four units are listed today — see item 4                         |
| Optional per page | 1600 × 900         | Chi Siamo, Territorio, Esperienze                                |

**Five of the owner's photographs are already in** (`assets/photos/`): the
garden with the castle (hero), two event table settings, a produce buffet and
the terrace. Drop more in as `<name>.jpg` and the build produces responsive
WebP automatically.

Still worth having: a photograph per room type, so the Appartamenti cards stop
using the placeholder. Name them after the room ids in
`src/content/it/site.js` — `doppia-economy.jpg`, `doppia.jpg`,
`tripla-giardino.jpg`, `tripla-superior.jpg`, `familiare-superior.jpg` — and
they will appear with no code change.

## 4. Copy — partly done

Real, verified content is now in place for: the tagline and every page lead,
the five room types and their amenities, the FAQ, the events page, nearby
places and drive times.

Still needed from you:

- [ ] **Check-in and check-out times** — not published anywhere I could reach,
      and currently absent from the FAQ.
- [ ] **Room capacity for the Superior Family Room** — assumed 4 from the name.
      Double and triple follow standard terminology and are safe.
- [ ] **Chi Siamo** — the history of the masseria and the family. Currently one
      generic line.
- [ ] **Pet Friendly page** — confirmed pet-friendly, but the page has no body
      content beyond its lead.
- [ ] **Prices** — Google reports a "££" band; the site quotes nothing. Decide
      whether room rates and event menus are published or quoted per enquiry.

> Accented characters matter: write `disponibilità`, not `disponibilita`. A
> test fails the build if common Italian words lose their accents.

## 5. Decisions still open

- [ ] **Facebook bio is truncated.** The page bio reads "Agriturismo a Prata
      Sannita, all'interno del Parco Regionale del Matese, nelle immediate
      vicinanze d…" and Facebook cuts it at 100 characters for logged-out
      viewers. Send me the full sentence and it becomes the Chi Siamo opening.
- [ ] **Parco Regionale or Parco Nazionale del Matese?** Your Facebook bio says
      _Regionale_; Google lists _Parco Nazionale del Matese_ nearby. The site
      currently uses your own wording. Tell me which is right.
- [ ] **"Appartamenti" as a nav label.** They are five rooms in the farmhouse,
      not apartments, so "Camere" would be more accurate. I left the label and
      the `/appartamenti` URL alone because you approved the structure — say
      the word and I will rename both.
- [ ] **Google rating.** 4.6/5 from 114 reviews is a strong trust signal but I
      have not put it on the site: it would go stale silently, and it must not
      go into structured data. Happy to add it as attributed text.
- [ ] **Custom domain** — the site is at `albertocutone.github.io/webgen`. A
      real domain needs `public/CNAME` and `SITE_URL` in `src/lib/constants.js`
      updated, since canonical URLs and the sitemap derive from it.
- [ ] **Analytics** — none installed. Adding any requires wiring it to the
      cookie banner's consent state (`analyticsAllowed`).
- [ ] **Privacy policy text** — `/privacy` is still a stub. It needs real legal
      copy naming the data controller, what is collected and the retention
      period, because the enquiry form links to it as the basis for GDPR
      consent.
