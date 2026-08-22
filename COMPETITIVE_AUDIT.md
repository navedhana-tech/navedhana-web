# Navedhana Website — Full Site Audit + Competitive Gap Analysis

> Every page audited from actual source (not a blind fetch — the prior third-party audit's
> "4/10" was largely a false diagnosis caused by a broken prerender pipeline, already fixed).
> Compared against 3 real competitor sites in the same AI+software hybrid-agency category.
> Researched and written 2026-08-11. Audit only — nothing below has been implemented.

---

## 1. Executive Summary

The site's actual content is meaningfully better than the third-party audit suggested — real
products, a real client engagement, a working contact form, real SEO metadata. But a full
page-by-page pass plus a competitor comparison surfaces **two categories of gap**:

1. **Real, previously-undiagnosed bugs** — Google Analytics silently collecting nothing, the
   entire site's Google-facing identity including a vegetable-delivery side business, shared
   meta tags across every route.
2. **Genuine content/credibility gaps that match every competitor examined** — no team page, no
   client testimonials, one single case study, no quantified outcomes anywhere, no third-party
   validation (reviews, certifications, awards), no blog content despite `Insights` existing as
   a nav destination.

None of the three competitor sites examined are proof this needs to become an enterprise-scale
agency site — they're larger, older, and more heavily resourced than a 2-year-old company. The
comparison is used to identify *categories* of gap, not to suggest matching their scale.

---

## 2. Page-by-Page Audit (every route, from actual source)

### `/` — Home
**What's there:** Hero with clear value prop, 3 live/in-dev product cards, capability strip,
"What We Do" (4 pillars), AI Engineering + Custom Software sections, Our Products (Lekvya
detailed, 2 in-dev products), Client Work (Robocoders), How We Work (6 steps), Why Navedhana (5
pillars), Technology (5 groups), About teaser, final CTA. This is a genuinely complete,
well-structured homepage — not the "no hero, no CTA" the third-party audit claimed.
**Gap:** Every claim on the page is self-asserted — zero third-party validation (no client
logos, no review-platform badges, no press mentions) anywhere on the page that gets the most
traffic.

### `/services`
**What's there:** 4 real service categories (AI Engineering / Custom Software / Intelligent
Automation / Product Engineering) with sub-items, numbered editorial layout.
**Gap:** No pricing/engagement-model information at all (deliberately, per your own
positioning — this is a judgment call, not a defect) and no per-service proof (e.g., "AI
Engineering" has no link to the AI Agent or Lekvya as evidence of that specific capability).

### `/products`
**What's there:** Lekvya (live, real screenshot, real customer count, working outbound link),
2 in-dev products with placeholder-shot components.
**Gap:** `PlaceholderShot` components (`Add {title} screenshot`) are real, live, user-visible
placeholder UI on the production site today — not a code TODO, an actual visible "add
screenshot" box a visitor sees.

### `/work` — just rebuilt this session
**What's there:** Problem/approach/proof structure for Robocoders + 4 capability entries.
**Gap:** Still one single external case study — the site cannot yet demonstrate a *pattern* of
client success, only one engagement. This is a content gap, not a code gap; it resolves as
Navedhana takes on more client work.

### `/about`
**What's there:** Real founding year (2023), "what we build," "our approach," "where we are
today" (live product + status), 5 pillars, tech stack.
**Gap — this is the single biggest, most consistently-flagged gap in this audit:** **there are
no people anywhere on this website.** No founder name, no team photo, no LinkedIn, no bio, no
"who is Navedhana." For a company selling trust and engineering credibility to other
businesses, this is the one gap every competitor site (and the original third-party audit)
independently converges on.

### `/ai-agent`
**What's there:** Genuinely well-written product page — what it is, what problem it solves, how
it works (request flow diagram), capabilities being built, honest current-status disclosure
("not yet a packaged product, no public demo").
**Gap:** None structurally — this page is a good model for what the QA Foundation Platform and
Data Factory pages could become once they have more to say.

### `/insights`
**What's there:** A deliberate, honestly-labeled "Coming soon" stub (confirmed via a code
comment explaining this is intentional, not fabricated).
**Gap:** It's linked from the main footer nav and from `SEO_OPTIMIZATION_GUIDE.md`'s presumed
content strategy, but has zero content. This is the one gap where the third-party audit's "no
blog" finding is fully accurate.

### `/vegetables` (+ `/seasonal` redirect)
**What's there:** A real, live page for an unrelated vegetable/produce side business, linked in
the primary footer nav under "Company" — same list tier as About/Work/Contact.
**Gap — a genuine, previously unflagged credibility risk:** this isn't just a page-content
issue. The site's own `index.html` JSON-LD schema lists **"Organic Vegetables Supply"** and
**"Seasonal Products"** as services in the *same* `hasOfferCatalog` as "Software Engineering &
AI Development." Google, and any structured-data-reading tool, will index Navedhana as a
company that sells both AI software *and* vegetables. For a B2B software/AI buyer's first
impression, this is a real risk to brand focus and credibility that the original audit never
caught (it couldn't — it saw no content at all).

### `/contact`
**What's there:** A real, working EmailJS-integrated form (verified: all 3 required EmailJS env
vars are properly set, not placeholders), phone number, email, scroll-progress + cursor-glow
polish.
**Gap:** No calendar-booking option, no explicit response-time expectation ("we reply within
24h"), and it's the only page site-wide with these extra visual effects — a minor consistency
note, not a defect.

---

## 3. Site-Wide Technical Findings (new this session, not in the original audit)

1. **Google Analytics is silently collecting zero data.** `VITE_GA_MEASUREMENT_ID` in `.env` is
   empty. `index.html` loads `gtag.js?id=G-XXXXXXXXXX` — a literal placeholder string, never a
   real measurement ID. The site has looked instrumented for analytics this whole time and
   isn't. **This directly explains why the original audit could report "Monthly Visitors: ~0-10"
   with confidence — there's no way to know the real number either way.**
2. **Every route shares one `<title>` and one meta description** — confirmed no per-route
   `<title>`/OG-tag logic exists anywhere in `src/`. Every page — Home, Services, About,
   Contact — shows the identical "Navedhana - Software Engineering & AI Solutions" in search
   results and social shares. A search engine has no way to distinguish `/services` from
   `/contact` in a results snippet.
3. **The vegetable-service schema pollution** (§2, `/vegetables`) — a genuine, structural SEO/
   credibility issue, not a content-writing issue.
4. **Prerendering was fully broken and is now fixed** (this session) — every route previously
   served an identical empty shell to any non-JS-executing fetch (crawlers, most SEO auditors,
   many social-share unfurlers, some search engine first-passes). Now fixed with a real
   Puppeteer-based render step; verified end-to-end.
5. **`PlaceholderShot` components are live production UI**, not a dev-only artifact — a visitor
   on `/products` today sees literal "Add QA Foundation Platform screenshot" boxes.
6. **No Search Console / Bing verification meta tags** — present as commented-out placeholders
   in `index.html`, never filled in. Can't see real Google Search performance data without this.
7. **`npm run lint` already fails on unmodified, pre-existing files** (`eslint.config.js` has no
   Node globals for the `scripts/` directory, and a `no-unused-vars` rule misfires on every page
   using `motion.div` — confirmed on `Services.jsx`/`About.jsx`, unrelated to this session's
   changes). Not itself a site defect, but it means lint has provided zero real signal for a
   while — if there's a genuine bug hiding behind noise, nothing would catch it today.

---

## 4. Competitor Comparison

Three real companies in the same "AI + software engineering hybrid agency" category, examined
directly (not summarized from memory):

| | **LeewayHertz** | **Markovate** | **SoluLab** | **Navedhana (current)** |
|---|---|---|---|---|
| Scale/age | 15+ yrs, acquired by The Hackett Group | 10+ yrs, 50+ AI projects | 11 yrs, 250+ staff, 1500 projects | 2 yrs, small team |
| Client logos on homepage | Yes, enterprise brands (Siemens, O'Reilly) | Yes, ~14 named | Yes (Mercedes-Benz, Goldman Sachs) | **None** |
| Case studies | 3, with named clients, quantified outcomes | 3, each with a hard metric (e.g. "70% faster") | 6, named clients + metrics | **1, no metric** |
| Testimonials | 4, named execs w/ titles | 2, named + headshots | 4, named + titles | **0** |
| Team/people shown | Implied via exec testimonials | Not confirmed | Team scale stated ("250+ staff") | **0 — nobody named anywhere on the site** |
| Certifications/badges | Forbes, Gartner, S&P Global mentions | ISO 9001:2015, ISO/IEC 27001:2022, AWS/Microsoft/Google partner badges | ISO 9001, SOC 2, CMMI Level 3 | **None** |
| Third-party review platforms | — | Clutch, GoodFirms, DesignRush | GoodFirms, AppFutura | **None** |
| Pricing/engagement model shown | 3 named models (Dedicated Team / Team Extension / Project-based) | "Focused Pilot in 4-6 Weeks" model named | Discovery workshop offered | None shown (deliberate choice, per your positioning) |
| Blog/content | Not confirmed on homepage | Yes — "The AI Perspective," 6 recent articles shown | Not confirmed | **"Coming soon" stub** |
| Own product(s) shown | Yes — ZBrain, own GenAI platform | Yes — AI Blueprint Classifier, with 3 hard metrics | No dedicated own-product section found | **Yes — Lekvya, live, real customer count** ✅ |
| Primary CTA model | Enterprise contact form (email/title/company) | "Book a Strategy Call" | "Talk with Expert" + WhatsApp | Simple contact form ✅ |

**What Navedhana already does as well or better:** a real live product with a real customer
count and a working link (Lekvya) is stronger proof than several of these companies show on
their own homepages — most gate their "own product" behind a case-study card, Navedhana puts it
front and center. The problem/approach narrative structure in the newly-rebuilt Work page is
more substantive writing than several competitors' one-line case-study cards.

**What every competitor examined has that Navedhana doesn't, without exception:**
1. At least one third-party trust signal (review platform, certification, or press mention) —
   zero of three lack this; Navedhana has zero of these.
2. At least 2 client testimonials with a named person — zero of three lack this; Navedhana has
   none.
3. At least one quantified outcome in a case study (a %, a time saved, a real number) —
   Navedhana's only case study has none.
4. Visible client logos — even the smallest of the three shows some; Navedhana shows none
   (accurate, since there's currently one documented external client).

---

## 5. Consolidated Gap List, Ranked

**Fix-the-bug tier (technical, not content — objectively broken today):**
1. Google Analytics collecting nothing (empty env var)
2. Every route sharing identical `<title>`/meta description
3. Vegetable-service schema pollution in the site's own structured data
4. Live "Add screenshot" placeholder UI on `/products`

**Credibility tier (the gap every competitor and the original audit agree on):**
5. Zero people named anywhere on the site — no founder, no team, no photo
6. Zero client testimonials
7. Zero third-party validation (no review-platform badge, no certification, no press mention)
8. Only one case study, with no quantified outcome

**Lower-priority / already a deliberate choice, not a defect:**
9. No pricing shown (matches your own explicit positioning decision — not re-flagging as a gap)
10. `Insights` blog is an honest stub, not yet content
11. `/vegetables` existing at all is a business decision outside this audit's scope — its
    *placement in the primary nav and structured data* is the actual issue (§3.3), not its
    existence

---

## 6. What I Am Not Recommending

Per the same discipline as your original positioning call: not recommending Navedhana try to
match LeewayHertz/Markovate/SoluLab's scale (ISO certifications the company doesn't have,
enterprise engagement-model taxonomies, a 6-post blog rhythm, WhatsApp/chat widgets). The gap
list above is scoped to what's realistically achievable and honest for a 2-year-old, small team
— team photos and 2-3 real testimonials close most of the credibility gap without requiring the
company to look bigger than it is.

This is an audit only — nothing above has been implemented. Tell me which items you want
addressed and I'll scope the work.
