# Masseria Mastrangelo — System Design

**Project:** Marketing website and booking-inquiry funnel for the Masseria Mastrangelo venue
**Status:** Phase 1 design — approved for implementation
**Last updated:** 2026-09-07

---

## Table of Contents

- [0. Documentation Style & Conventions](#0-documentation-style--conventions)
- [1. Executive Summary](#1-executive-summary)
- [2. Scope & Requirements](#2-scope--requirements)
- [3. Technology Stack](#3-technology-stack)
- [4. High-Level Architecture](#4-high-level-architecture)
- [5. Phase 1 — Frontend Architecture](#5-phase-1--frontend-architecture)
- [6. Phase 2 — Backend Architecture (Deferred)](#6-phase-2--backend-architecture-deferred)
- [7. SEO & Performance](#7-seo--performance)
- [8. Repository Structure](#8-repository-structure)
- [9. Implementation & SCM Plan](#9-implementation--scm-plan)
- [10. Risks, Trade-offs & Open Questions](#10-risks-trade-offs--open-questions)
- [11. Future Improvements](#11-future-improvements)
- [Changelog](#changelog)

---

<details id="0-documentation-style--conventions">
<summary><strong>0. Documentation Style & Conventions</strong></summary>

- Use **clear, concise, unambiguous language**; prefer **bullet points** over paragraphs
- Highlight **key terms** in bold; use **tables** for comparisons, trade-offs and structured data
- Use **Mermaid** in fenced ` ```mermaid ` blocks so diagrams render on GitHub
- Keep node labels **short**; put explanation in prose _below_ the diagram, not inside it
- Keep sections **self-contained** so they can be read and updated independently
- Explicitly mark **assumptions**, **constraints**, **out-of-scope** items and **TBD**s
- Every significant architectural decision carries a **rationale**

</details>

---

<details id="1-executive-summary">
<summary><strong>1. Executive Summary</strong></summary>

The Masseria Mastrangelo website provides a professional online presence for the estate, showcases the
venue and its accommodations, and converts visitors into booking inquiries.

A custom booking engine with date-conflict resolution is a genuinely hard problem (overlapping
reservations, full-venue vs. per-room collisions, payment state machines, channel sync). Building it up
front would block the far more valuable outcome — **being online and reachable**. The lifecycle is
therefore split into two strictly sequenced phases.

### 🔴 Implementation Strategy — Phased Approach

|                   | **Phase 1 — Static Frontend**              | **Phase 2 — Full-Stack**                |
| ----------------- | ------------------------------------------ | --------------------------------------- |
| **Status**        | ✅ Current scope                           | ⏸️ Deferred                             |
| **Goal**          | Be online, look premium, capture inquiries | Automate availability and payment       |
| **Booking model** | "Request to Book" form → owner's email     | Live availability + deposit at checkout |
| **State**         | Stateless — no database                    | PostgreSQL, authoritative availability  |
| **Payments**      | None (handled offline by owner)            | Stripe PaymentIntents + webhooks        |
| **Admin**         | None (owner reads email)                   | Admin dashboard for calendar & bookings |
| **Hosting**       | GitHub Pages (static)                      | Node host + managed Postgres            |

**Guiding principle:** Phase 1 must not create work that Phase 2 has to throw away. The inquiry form's
data model (see §5.4) is deliberately a subset of the Phase 2 `BOOKING` entity (see §6.1).

</details>

---

<details id="2-scope--requirements">
<summary><strong>2. Scope & Requirements</strong></summary>

### Functional Requirements — Phase 1

| ID      | Requirement                                                 | Priority |
| ------- | ----------------------------------------------------------- | -------- |
| **F1**  | Multi-page marketing site with persistent header navigation | P0       |
| **F2**  | Booking-inquiry form that emails the owner reliably         | P0       |
| **F3**  | GDPR consent checkbox + linked Privacy Policy page          | P0       |
| **F4**  | Bot protection on the inquiry form                          | P0       |
| **F5**  | Cookie-consent banner (EU compliant)                        | P0       |
| **F6**  | Fully responsive layout (mobile-first)                      | P0       |
| **F7**  | Floating WhatsApp contact button                            | P1       |
| **F8**  | FAQ accordion (check-in, pets, parking)                     | P1       |
| **F9**  | EN / IT language toggle                                     | P1       |
| **F10** | Premium page/scroll transitions                             | P2       |

**Priority key:** P0 = must-have for launch · P1 = important, can ship without · P2 = nice-to-have

### Non-Functional Requirements

| Category            | Target                                                                      |
| ------------------- | --------------------------------------------------------------------------- |
| **Performance**     | Lighthouse ≥ 90 on all four categories; LCP < 2.5 s on 4G                   |
| **Accessibility**   | WCAG 2.1 AA — keyboard-navigable nav, form labels, visible focus            |
| **SEO**             | Indexable static HTML, per-page meta, `sitemap.xml`, `robots.txt`           |
| **Compliance**      | GDPR — explicit consent before submit, no non-essential cookies pre-consent |
| **Availability**    | Static hosting; no server to fail. Form outage degrades to WhatsApp/email   |
| **Maintainability** | Owner-editable copy isolated in content files, not in JSX                   |

### Out of Scope (Phase 1)

- Live availability calendar, date-conflict logic, online payment
- User accounts, login, or an admin dashboard
- Channel-manager sync with Booking.com / Expedia
- Any server-side code or database

### Assumptions

- Copy, photography and pricing are supplied by the owner; the site does not generate content
- The owner monitors an email inbox and a WhatsApp number as the inquiry SLA
- Traffic is low enough (< 100k views/month) that GitHub Pages is sufficient
- A custom domain will be pointed at GitHub Pages (**TBD**: domain name)

</details>

---

<details id="3-technology-stack">
<summary><strong>3. Technology Stack</strong></summary>

### Phase 1 — Static Frontend (current scope)

| Concern            | Choice                       | Rationale                                                           |
| ------------------ | ---------------------------- | ------------------------------------------------------------------- |
| **Framework**      | Vite + React                 | Fast HMR, minimal config, first-class static build                  |
| **Routing**        | React Router                 | Multi-page URLs without a server (see §5.2 for the GH Pages caveat) |
| **Styling**        | Tailwind CSS                 | Rapid iteration, responsive utilities, no CSS-file sprawl           |
| **Animation**      | Framer Motion                | Premium transitions, declarative, tree-shakeable                    |
| **Forms**          | Web3Forms                    | Serverless email forwarding — no backend to run                     |
| **Bot protection** | Cloudflare Turnstile         | Privacy-friendly, no image puzzles, free tier                       |
| **Unit tests**     | Jest + React Testing Library | Component logic, consent-checkbox state, banner state               |
| **E2E tests**      | Playwright                   | Real form submission, navigation, responsive viewports              |
| **Lint/format**    | ESLint + Prettier            | Enforced in CI                                                      |
| **Hosting**        | GitHub Pages                 | Free, static, integrates with GitHub Actions                        |

### Phase 2 — Full-Stack (future scope)

| Concern       | Choice               | Rationale                                                        |
| ------------- | -------------------- | ---------------------------------------------------------------- |
| **Framework** | Next.js + TypeScript | SSR for booking pages, API routes, types for money/date logic    |
| **Database**  | PostgreSQL           | Relational integrity + exclusion constraints for date collisions |
| **Payments**  | Stripe               | PaymentIntents, webhooks, EU SCA compliance built in             |
| **Auth**      | TBD (owner-only)     | Single-tenant admin; a managed provider is likely sufficient     |

</details>

---

<details id="4-high-level-architecture">
<summary><strong>4. High-Level Architecture</strong></summary>

The diagram shows the end-state (Phase 2) alongside the Phase 1 bypass that ships first.
**Green = Phase 1, live now. Grey/dashed = Phase 2, deferred.**

```mermaid
flowchart TD
    Client["Client<br/>Browser / Mobile"] --> FE["Frontend UI<br/>React + Tailwind"]

    subgraph P1["Phase 1 — Static Flow (SHIPPING)"]
        direction LR
        FE -->|"Form submit"| W3["Web3Forms<br/>+ Turnstile"]
        W3 -->|"Email"| OwnerEmail["Owner inbox"]
        FE -->|"Deep link"| WA["WhatsApp chat"]
    end

    subgraph P2["Phase 2 — Full System (DEFERRED)"]
        direction LR
        BE["Backend API<br/>Next.js"]
        DB[("PostgreSQL")]
        Stripe["Stripe API"]
        AdminUI["Admin Dashboard"]
        Admin["Venue owner"]

        BE --> DB
        BE <--> Stripe
        Admin --> AdminUI --> BE
    end

    FE -.->|"API calls (later)"| BE

    classDef phase1 fill:#2e7d32,stroke:#1b5e20,stroke-width:2px,color:#fff
    classDef phase2 fill:#616161,stroke:#212121,stroke-width:1px,color:#fff,stroke-dasharray:5 5
    classDef core fill:#0d47a1,stroke:#000,stroke-width:2px,color:#fff

    class W3,OwnerEmail,WA phase1
    class BE,DB,Stripe,Admin,AdminUI phase2
    class Client,FE core
```

**Notes**

- In Phase 1 the frontend has **no origin server of its own** — it is a bundle of static files on a CDN.
- The dashed `FE -.-> BE` edge is the single integration point Phase 2 introduces; everything else in
  Phase 1 (pages, components, styling, SEO) is reused unchanged.
- WhatsApp is a `wa.me` deep link, not an integration — zero backend cost, immediate owner response.

</details>

---

<details id="5-phase-1--frontend-architecture">
<summary><strong>5. Phase 1 — Frontend Architecture</strong></summary>

### 5.1 Global UI Components

Modelled on the reference layout (see `docs/assets/reference-header.png` — **TBD**: commit the
reference image, previously tracked only as `image_761202.png`).

| Component           | Placement               | Behaviour                                                                   |
| ------------------- | ----------------------- | --------------------------------------------------------------------------- |
| **Header**          | Persistent, top         | Left: logo · Centre: page links · Right: EN/IT toggle + **Prenota Ora** CTA |
| **Mobile nav**      | Header, < `md`          | Hamburger → full-screen overlay menu                                        |
| **WhatsApp button** | Sticky, bottom-right    | Opens `wa.me` chat with the owner in a new tab                              |
| **Cookie banner**   | Bottom, first visit     | Accept / decline non-essential cookies; choice persisted in `localStorage`  |
| **FAQ accordion**   | Section, multiple pages | Keyboard-accessible disclosure widgets (check-in, pets, parking)            |
| **Footer**          | Bottom, all pages       | Contacts, address, social, Privacy Policy + Cookie Policy links             |

### 5.2 Routing & Views

```mermaid
flowchart LR
    ROOT["/"] --> HOME["Home<br/>hero + overview"]
    ROOT --> CHI["/chi-siamo<br/>estate & history"]
    ROOT --> APP["/appartamenti<br/>rooms + full buyout"]
    ROOT --> TER["/territorio"]
    ROOT --> PET["/pet-friendly"]
    ROOT --> ESP["/esperienze"]
    ROOT --> COME["/come-raggiungerci"]
    ROOT --> CONT["/contatti<br/>inquiry form"]
    ROOT --> PRIV["/privacy"]
    ROOT --> NF["404"]

    HOME -->|"Prenota Ora"| CONT
    APP -->|"Richiedi"| CONT

    classDef primary fill:#0d47a1,stroke:#000,stroke-width:2px,color:#fff
    classDef conv fill:#2e7d32,stroke:#1b5e20,stroke-width:2px,color:#fff
    class HOME,APP primary
    class CONT conv
```

**Notes**

- **Every path leads to `/contatti`** — it is the single conversion point of the site.
- **GitHub Pages caveat:** static hosting returns 404 for deep links like `/appartamenti`. Mitigation:
  copy `index.html` to `404.html` at build time (SPA fallback) and set Vite's `base` correctly. A
  `HashRouter` would also work but produces uglier, less SEO-friendly URLs — rejected.

### 5.3 Component Design Principles

- **Component-driven / OOD** — one responsibility per component, composed upward
- **Separate concerns** — `components/` (dumb, reusable) vs. `pages/` (composition + data) vs. `content/` (copy)
- **No global state** — Phase 1 needs none. Local `useState` + a single `CookieConsentContext`
- **Avoid over-engineering** — no Redux, no data-fetching library, no CMS

### 5.4 Inquiry Form — Data, Security & Compliance

**Collected fields**

| Field                          | Required | Maps to Phase 2                   |
| ------------------------------ | -------- | --------------------------------- |
| Name                           | ✅       | `CUSTOMER.name`                   |
| Email                          | ✅       | `CUSTOMER.email`                  |
| Phone                          | ❌       | `CUSTOMER.phone`                  |
| Desired dates (from / to)      | ✅       | `BOOKING.start_date` / `end_date` |
| Event type / asset of interest | ✅       | `BOOKING_LINE_ITEM.asset_id`      |
| Message                        | ❌       | —                                 |
| GDPR consent                   | ✅       | —                                 |

**Controls**

- **Bot protection** — Cloudflare Turnstile widget; submission blocked until the token resolves
- **GDPR consent** — mandatory, unticked-by-default checkbox immediately above the submit button,
  linking to `/privacy`. Submit stays disabled until it is ticked
- **No pre-consent tracking** — analytics scripts load only after the cookie banner is accepted
- **Client-side validation** — required fields, email format, `end_date > start_date`

### 5.5 Inquiry Flow

```mermaid
sequenceDiagram
    autonumber
    participant U as Guest
    participant F as Frontend
    participant T as Turnstile
    participant W as Web3Forms
    participant O as Owner inbox

    U->>F: Fill form and tick consent
    F->>T: Request bot token
    T-->>F: Token
    U->>F: Submit
    F->>F: Validate fields
    alt Valid
        F->>W: POST inquiry + token
        W->>W: Verify token
        W->>O: Forward as email
        W-->>F: 200 OK
        F-->>U: Show thank-you state
    else Invalid or rejected
        F-->>U: Show inline errors
    end
```

**Notes**

- Failure of Web3Forms is user-visible: on non-200 the UI surfaces the owner's email and WhatsApp
  as a manual fallback, so no inquiry is silently lost.
- Web3Forms sends no confirmation to the guest in Phase 1; the owner replies manually.

</details>

---

<details id="6-phase-2--backend-architecture-deferred">
<summary><strong>6. Phase 2 — Backend Architecture (Deferred)</strong></summary>

### 6.1 Database Schema

The core difficulty: a **full-venue** booking conflicts with every **individual room** booking on
overlapping dates, and vice versa. Modelling both as `ASSET` rows joined through
`BOOKING_LINE_ITEM` lets a single overlap query answer both cases. The `external_*` fields exist so
bookings imported from OTAs (Booking.com, Expedia) occupy the same calendar as direct bookings.

```mermaid
erDiagram
    CUSTOMER ||--o{ BOOKING : places
    BOOKING ||--|{ BOOKING_LINE_ITEM : contains
    BOOKING_LINE_ITEM }|--|| ASSET : reserves

    CUSTOMER {
        uuid id PK
        string name
        string email
        string phone
    }
    BOOKING {
        uuid id PK
        uuid customer_id FK
        date start_date
        date end_date
        string status "pending|confirmed|cancelled"
        float total_amount
        string external_source "booking.com|expedia|direct"
        string external_id "reference for iCal sync"
    }
    BOOKING_LINE_ITEM {
        uuid id PK
        uuid booking_id FK
        uuid asset_id FK
    }
    ASSET {
        uuid id PK
        string type "room|full_venue"
        string name
        int capacity
    }
```

**Notes**

- A **full-venue** `ASSET` is expanded at booking time into line items for every room it contains, so
  collisions are detected by a plain overlap query rather than special-case logic.
- Integrity should be enforced in the database (a Postgres `EXCLUDE` constraint over
  `asset_id` + `daterange`), not only in application code — concurrent requests otherwise race.
- `total_amount` should be `numeric`, not `float`, in the real schema — money must not be binary FP.

### 6.2 Automated Booking & Payment Flow

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant F as Frontend
    participant B as Backend API
    participant DB as Database
    participant S as Stripe

    U->>F: Select dates and asset
    F->>B: GET /availability
    B->>DB: Query confirmed bookings
    DB-->>B: Available slots
    B-->>F: Availability status

    alt Available
        U->>F: Submit details, proceed to pay
        F->>B: POST /booking
        B->>DB: Create booking (pending)
        B->>S: Create PaymentIntent (deposit)
        S-->>B: client_secret
        B-->>F: client_secret
        U->>F: Enter card details
        F->>S: Confirm card payment
        S-->>F: Success
        S-->>B: Webhook payment_intent.succeeded
        B->>DB: Update booking (confirmed)
        B-->>U: Send confirmation email
    else Conflict
        B-->>F: 409 Dates unavailable
        F-->>U: Show error
    end
```

**Notes**

- Booking is only **confirmed by the webhook**, never by the browser's success callback — the client
  is untrusted and may close the tab mid-redirect.
- `pending` bookings must expire (e.g. 20 min TTL) or abandoned checkouts hold dates hostage.
- Availability is re-checked inside the transaction that creates the booking; the earlier
  `GET /availability` is advisory only.

</details>

---

<details id="7-seo--performance">
<summary><strong>7. SEO & Performance</strong></summary>

| Area                | Approach                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Semantic HTML**   | Strict `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`; one `<h1>` per page, logical H1–H3                           |
| **Meta data**       | Per-page `<title>` and `<meta name="description">` tuned for IT and EN intents; Open Graph + Twitter cards for link previews |
| **Structured data** | JSON-LD `LodgingBusiness` / `Hotel` schema with address, geo, amenities                                                      |
| **Technical SEO**   | Generated `sitemap.xml` and `robots.txt`; `hreflang` for IT/EN once i18n lands; canonical URLs                               |
| **Images**          | WebP/AVIF, explicit `width`/`height` to prevent CLS, `loading="lazy"` below the fold, hero preloaded                         |
| **Budget**          | JS < 200 KB gzipped; Lighthouse ≥ 90 enforced in CI (**TBD**: warn vs. fail)                                                 |

**Caveat:** a client-rendered SPA ships an empty `<div id="root">` to crawlers. Google executes JS, but
other crawlers and social scrapers often do not. Mitigation for Phase 1: prerender the routes at build
time (`vite-plugin-ssg` or equivalent) so each page emits real HTML. This is a **P0 for SEO** and is
folded into the build step, not deferred.

</details>

---

<details id="8-repository-structure">
<summary><strong>8. Repository Structure</strong></summary>

Follows the conventions used across the sibling projects in `~/local/projects` (`docs/`, `src/`,
`tests/`, `scripts/`, `.github/workflows/`, top-level `README.md` + `LICENSE`).

```text
webgen/
├── .github/
│   └── workflows/
│       └── ci.yml                  # lint → unit → e2e → build → deploy
├── docs/
│   ├── design.md                   # this document
│   ├── CONTENT.md                  # copy/asset checklist for the owner
│   └── assets/
│       └── reference-header.png    # layout reference
├── public/                         # copied verbatim to the build output
│   ├── favicon.svg
│   ├── robots.txt
│   ├── CNAME                       # custom domain for GitHub Pages
│   └── images/                     # photography (WebP)
├── src/
│   ├── main.jsx                    # entry point
│   ├── App.jsx                     # layout shell + route outlet
│   ├── router.jsx                  # route table
│   ├── components/
│   │   ├── layout/                 # Header, Footer, MobileNav, LanguageToggle
│   │   ├── common/                 # Button, Card, Accordion, Section, Seo
│   │   ├── booking/                # InquiryForm, ConsentCheckbox, TurnstileWidget
│   │   └── overlays/               # WhatsAppButton, CookieBanner
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ChiSiamo.jsx
│   │   ├── Appartamenti.jsx
│   │   ├── Territorio.jsx
│   │   ├── PetFriendly.jsx
│   │   ├── Esperienze.jsx
│   │   ├── ComeRaggiungerci.jsx
│   │   ├── Contatti.jsx
│   │   ├── Privacy.jsx
│   │   └── NotFound.jsx
│   ├── content/                    # owner-editable copy, no JSX
│   │   ├── it/
│   │   └── en/
│   ├── hooks/                      # useCookieConsent, useLocale, useMediaQuery
│   ├── lib/                        # web3forms.js, seo.js, constants.js
│   └── styles/
│       └── index.css               # Tailwind entry + design tokens
├── tests/
│   ├── unit/                       # Jest + React Testing Library
│   └── e2e/                        # Playwright specs
├── scripts/
│   └── generate-sitemap.mjs
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── jest.config.js
├── playwright.config.js
├── eslint.config.js
├── .env.example                    # WEB3FORMS_KEY, TURNSTILE_SITE_KEY
├── .gitignore
├── LICENSE
└── README.md
```

### Rationale

| Decision                                                                    | Why                                                                                          |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `components/` split by **role** (`layout`, `common`, `booking`, `overlays`) | Flat component folders rot fast; role grouping keeps the booking funnel isolated for Phase 2 |
| `content/{it,en}/` from day one                                             | Makes the P1 language toggle a data swap, and i18n a drop-in later                           |
| `tests/` at top level, not co-located                                       | Matches the sibling projects; keeps `src/` shippable and the Playwright/Jest split obvious   |
| `lib/web3forms.js` as the only network call site                            | Phase 2 replaces this one module with an API client                                          |
| `public/CNAME` committed                                                    | GitHub Pages drops the custom domain on every deploy unless the file is in the build output  |

</details>

---

<details id="9-implementation--scm-plan">
<summary><strong>9. Implementation & SCM Plan</strong></summary>

### Source Control

- **Git + GitHub**, `main` as the deployable branch
- **Atomic, conventional commits** — `feat: add WhatsApp button`, `fix: header padding`
- **Short-lived feature branches** merged via PR; CI must be green to merge

### CI/CD Pipeline

```mermaid
flowchart LR
    PR["Push / PR"] --> INS["Install deps"]
    INS --> LINT["Lint<br/>ESLint + Prettier"]
    LINT --> UNIT["Unit tests<br/>Jest + RTL"]
    UNIT --> BUILD["Build<br/>vite build"]
    BUILD --> E2E["E2E tests<br/>Playwright"]
    E2E --> GATE{"main branch<br/>and green?"}
    GATE -->|"yes"| DEPLOY["Deploy dist/<br/>GitHub Pages"]
    GATE -->|"no"| STOP["Report only"]

    classDef ok fill:#2e7d32,stroke:#1b5e20,stroke-width:2px,color:#fff
    classDef gate fill:#e65100,stroke:#000,stroke-width:2px,color:#fff
    classDef stop fill:#616161,stroke:#212121,color:#fff
    class DEPLOY ok
    class GATE gate
    class STOP stop
```

**Notes**

- E2E runs **after** the build against the built artifact, not the dev server — it tests what ships.
- Secrets (`WEB3FORMS_KEY`, `TURNSTILE_SITE_KEY`) are injected as GitHub Actions secrets at build time.
  Both are **public-by-design client keys**; they end up in the bundle and must not be treated as
  confidential. Nothing secret may ever enter this repository.

### Delivery Order (Phase 1)

| #   | Milestone                                     | Exit criterion                              |
| --- | --------------------------------------------- | ------------------------------------------- |
| 1   | Scaffold + CI + deploy skeleton               | Blank page live on GitHub Pages via Actions |
| 2   | Layout shell — header, footer, routing        | All routes reachable, deep links work       |
| 3   | Home + Appartamenti with real content         | Owner signs off on look and copy            |
| 4   | Inquiry form + Turnstile + consent            | Test inquiry lands in the owner's inbox     |
| 5   | Remaining pages, FAQ, WhatsApp, cookie banner | F1–F9 complete                              |
| 6   | SEO, prerender, image optimisation            | Lighthouse ≥ 90 across the board            |
| 7   | Polish — Framer Motion transitions            | Launch                                      |

</details>

---

<details id="10-risks-trade-offs--open-questions">
<summary><strong>10. Risks, Trade-offs & Open Questions</strong></summary>

| Risk                                   | Impact                                        | Mitigation                                                                                         |
| -------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Web3Forms outage or spam-foldering** | Inquiries lost silently — direct revenue loss | Surface email + WhatsApp fallback on submit failure; owner verifies inbox monthly                  |
| **SPA renders empty HTML to crawlers** | Poor SEO — the site's main purpose fails      | Prerender routes at build time (§7); verify with a fetch-as-crawler check                          |
| **Deep links 404 on GitHub Pages**     | Shared links break                            | `404.html` SPA fallback + correct Vite `base`                                                      |
| **Jest + Vite/ESM friction**           | Slow test setup, config drift                 | Accepted as specified. Vitest is the native pairing and a drop-in swap if config cost becomes real |
| **Content not ready**                  | Blocks milestones 3–5                         | `docs/CONTENT.md` checklist owned by the venue owner; build against placeholders                   |
| **Manual date blocking in Phase 1**    | Double-booking with OTAs                      | Explicitly out of scope; owner keeps a single master calendar until Phase 2                        |
| **Phase 2 never happens**              | Site stays a brochure                         | Acceptable — Phase 1 is independently valuable and complete                                        |

### Open Questions (TBD)

- Custom domain name and DNS ownership
- Number of rooms and whether the "full venue buyout" is a distinct sellable asset at launch
- Whether pricing is published on the site or quoted per inquiry
- Analytics provider, if any (affects the cookie banner's categories)
- Lighthouse CI: fail the build or warn only

</details>

---

<details id="11-future-improvements">
<summary><strong>11. Future Improvements</strong></summary>

| Improvement                   | Description                                                                        | Depends on                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Multi-language i18n**       | Dynamic translation across all pages via `react-i18next`, `hreflang` tags          | `content/{it,en}` structure (already in place)               |
| **Channel-manager sync**      | iCal/API sync with Booking.com and Expedia to eliminate manual date blocking       | Phase 2 database                                             |
| **Interactive 3D tour**       | WebGL/Three.js walkthrough of the estate and rooms                                 | Photogrammetry assets; performance budget review             |
| **Guest confirmation emails** | Auto-acknowledge inquiries so guests know they were received                       | Phase 2 backend (or a Web3Forms autoresponder as an interim) |
| **Owner content editing**     | Lightweight CMS or Markdown-in-repo editing so copy changes don't need a developer | Content model stability                                      |

</details>

---

## Changelog

| Date       | Change                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-07 | Restructured to the standard design-doc format; fenced and corrected all Mermaid diagrams; added scope/requirements, repository structure, risks and delivery order |
| —          | Initial draft                                                                                                                                                       |
