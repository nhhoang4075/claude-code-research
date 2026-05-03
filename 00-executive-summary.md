# Claude Code for Marketers — Research for SEONGON Adoption Decision

**Date compiled:** 2026-05-03
**Purpose:** Evidence base for whether/how SEONGON should adopt Claude Code across its marketing operation (SEO, Google Ads, Facebook Ads, Digital Branding).
**Author method:** Multi-source web research — Anthropic primary publications, industry reports, GitHub skill ecosystems, agency-practitioner blogs, course catalogs, and podcast transcripts. ~30 sources extracted into structured fields.

---

## 1. Why Claude Code matters for SEONGON specifically

SEONGON is Vietnam's largest SEO agency, a Google Premier Partner since 2012, with **51–200 staff** and 100+ Google-certified team members. Service mix is dominated by:

- **SEO** (900+ projects)
- **Google Ads** (10,000+ campaigns historic)
- **Facebook Ads**
- **Digital Branding**

The most decision-relevant external precedent is Anthropic's own **Growth Marketing team** — described in Anthropic's "How Anthropic teams use Claude Code" report as a "non-technical team of one" covering **paid search, paid social, mobile app stores, email marketing, and SEO** (the exact channel mix SEONGON delivers). They use Claude Code as the agentic layer that lets one marketer "operate like a larger team."

This isn't a hypothetical — it's a documented production deployment by the company that built the tool.

---

## 2. Headline findings

### 2a. Adoption breadth (non-developer Claude Code use)

- **Anthropic's own Growth Marketing team is non-technical** and operates Claude Code in production — sets the strongest precedent.
- **Ayima (UK SEO agency)** has formalized a 4-week, 2-track *"Claude for Technical SEO"* programme for their team and clients — the closest analog to SEONGON.
- **HubSpot** ships an official course "Master Claude Code for Marketing" co-branded with the *Marketing Against the Grain* podcast — major-vendor endorsement that the role-fit is real.
- **Maven course catalog** has at least 5 distinct non-engineer Claude Code tracks (Marketers, PMs, Beginners, Non-Engineers, Kickstart 2026) — proxy for cross-role demand.
- **Anthropic Economic Index (Mar 2026)** confirms broadening usage: Management category rose from 3% → 5%, personal use 35% → 42% — Claude usage is diffusing past coding, even if Marketing isn't yet broken out as its own bucket.

### 2b. Time-savings — by marketing discipline

| Discipline | Workflow | Before | After | Source |
|---|---|---|---|---|
| **Paid search** | Ad copy creation | 2 hours | 15 min | Anthropic internal Growth Mktg |
| **Paid search** | Multi-platform audit | 8 hours | 2 hours | Stormy AI (75% reduction) |
| **Paid search** | Vibe Querying | 30 min | 15 sec | Stormy AI |
| **Paid search** | Weekly reporting | 3 hours | 4 min | Adventure PPC |
| **Paid social** | Campaign deployment | 3–4 hours | 10 min | HeyOz `/deploy-ads` |
| **Paid social** | Daily bleed-check | 30–45 min | 2 min | HeyOz `/bleed-check` |
| **Paid social** | 50 ad variants | hours | 1.75 hrs saved | HeyOz `/hooks` |
| **Paid social** | 100 ad variants | hours | 0.5 sec/batch | Anthropic Figma plugin |
| **SEO** | Technical SEO brief | 3–5 hours | 20 min | Ayima programme |
| **SEO** | Screaming Frog export analysis | 45–90 min | 5 min | Ayima programme |
| **SEO** | Schema review | 30–60 min | 3 min | Ayima programme |
| **SEO** | CTR quick-win audit | 2–3 hours | 90 sec | Michael Patrick Cortez |
| **SEO** | Keyword cannibalization detection | 3–4 hours | 2 min | Michael Patrick Cortez |
| **SEO** | Content gap analysis | 4–5 hours | 5 min | Michael Patrick Cortez |
| **SEO** | Content brief | 3–4 hours | <10 min | SE Ranking |
| **SEO** | Backlink analysis | full day | minutes | SE Ranking |
| **SEO (monthly)** | Total billable hours/account | 20–30 hours | 6–8 hours | Michael Patrick Cortez |
| **Analytics** | Manual reporting (Chacka Marketing) | baseline | −90% | Improvado |
| **Analytics** | GA4 audit | 1+ hour | 4 min | measureu.com |
| **Brand strategy** | Competitive brief (CEO-ready) | 90 min | 10 min | Stack and Scale |
| **Brand strategy** | Content repurposing per blog | 1 afternoon | 15 min | Stack and Scale |
| **Brand strategy** | Executive deck (weekly) | 90 min | 5–15 min | Stack and Scale |

### 2c. Aggregated capacity gain (highest-quality estimate)

The **HeyOz Meta Ads skill suite** (10 production skills) aggregates to **25–30 recovered hours per week per ad ops staffer**, which they value at **$2,500–$4,500/week of agency billing rates**. Independent of platform, the **Anthropic Economic Index (Jan 2026)** found **75% of API traffic is automation** vs. 52% augmentation on Claude.ai — agency work skews toward the API/automation end, where the gains compound.

For SEONGON specifically (illustrative back-of-envelope, not a quote): if 30 paid-media specialists each recovered 20 hr/week on reporting/auditing/creative variants, that's 600 hours/week reallocatable to strategy or net-new clients.

### 2d. Cost-side replacement (AdventurePPC framing)

These are the freelancer/contractor categories that Claude Code workflows directly replace, with reported market rates (US-centric):

| Workflow | Replaces | Going rate |
|---|---|---|
| Performance reporting | Reporting automation contractor | $1,500–$6,000 build + retainer |
| Content brief generation | Content strategist | $80–$200/hr |
| Ad copy + A/B pipeline | Copywriter on retainer | $2,000–$5,000/month |
| Lead scoring + CRM enrichment | RevOps contractor | $5,000–$15,000/project |
| Competitor monitoring | Dedicated analyst | $1,000–$3,000/month |
| Email sequence personalization | Email specialist | $3,000–$8,000/campaign |

For an agency that *sells these services to clients*, the implication isn't "fire the contractor" — it's "increase margin, decrease fulfillment cost, redeploy senior time to strategy."

---

## 3. The four critical themes for SEONGON

### 3a. Skills + sub-agents + MCP — the architecture that actually works

The dominant pattern across the strongest sources:

1. **Skills** = packaged workflows in markdown files, version-controlled in Git, shared across the team (e.g., MKT1's `/marketing-strategy`, Animalz's `/write`, HeyOz's `/spy` `/bleed-check` `/rebalance`).
2. **Sub-agents** = each skill orchestrates specialized agents (Anthropic's Growth team uses one agent for headlines, another for descriptions; AgriciDaniel/claude-seo runs 12 subagents in parallel under `seo-audit`).
3. **MCP servers** = the live data layer (Google Ads, Meta Ads, GA4, Search Console, HubSpot, Salesforce, Ahrefs, Semrush, DataForSEO, etc.).

This is the *operating model* — not just "use ChatGPT for marketing." Skills-as-Git-repos is what differentiates Claude Code adoption from generic chatbot use, and what makes it scale across an agency.

### 3b. The non-technical onboarding ramp is real

- **Sarah Noel Block (getmarketingwithai)**: "If you can write a brief, you can use Claude Code."
- **Coupler.io case study (Austin Lau)**: non-coder running entire growth-marketing function solo.
- **Anthropic Growth team**: explicitly "non-technical team of one."
- **Ayima programme**: targets account managers and analysts, not just technical SEOs.

The dominant onboarding path is: Claude Chat → Claude Cowork (desktop sandbox) → Claude Code CLI. Marketers don't start in the terminal.

### 3c. GEO (Generative Engine Optimization) is a strategic angle, not a side note

Every serious SEO Claude Code resource treats **GEO/AEO** (Google AI Overviews, ChatGPT, Perplexity, Gemini visibility) as a first-class capability. AgriciDaniel/claude-seo includes a dedicated `seo-geo` subagent. aaron-he-zhu's library has 4 cross-cutting skills built around the **CORE-EEAT** (80-item content benchmark) and **CITE** (40-item domain trust) frameworks specifically for AI-search era.

For SEONGON, this is both threat and opportunity:
- **Threat**: Vietnamese search traffic erosion as AI Overviews and ChatGPT capture queries upstream of Google's blue links.
- **Opportunity**: Launch **GEO consulting as a new service line** ahead of competitors. Few Vietnamese agencies have this productized.

### 3d. Compliance gravity (especially Meta Ads)

Connecting Meta Ads to Claude has **documented ban risk** if done naively (PorterMetrics article: "5 ways… without getting banned"). The safe path is via approved MCP servers / connectors (Adspirer MCP, GrowthSpree, Windsor.ai, Claude Cowork) — not raw API scripts. This is non-negotiable for an agency managing client ad accounts at scale.

Claude Code itself does not raise compliance issues; the integration layer does. SEONGON's adoption design needs an explicit compliance review for each MCP/connector before client-account access.

---

## 4. Strategic shape of the recommendation (preview — full SEONGON-fit assessment in `09-seongon-fit-assessment.md`)

Adoption should be **multi-tier, not all-staff**:

1. **Tier 1: Internal AI/eng team** — keep building products on Claude API + use Claude Code in their dev workflow. (Already happening per `~/Work/CLAUDE.md`.)
2. **Tier 2: Marketing operations + senior specialists** — train ~10–20 power users (one per discipline: Google Ads lead, Facebook Ads lead, technical SEO lead, content lead, analytics lead, brand lead). They build agency-wide Claude Skills as Git-versioned assets.
3. **Tier 3: Production marketers (the 100+ specialists)** — they consume the skills via Claude Cowork or Claude.ai (Team plan), not via terminal. Full Claude Code only as a graduation path.
4. **Tier 4: Net-new service line — GEO consulting for Vietnamese-market clients**, productized using SEONGON's existing SEO methodology + the open-source GEO skill libraries as the base.

Cost shape: Tier 2 + 3 is per-seat (Claude Team plan) plus modest API spend; Tier 1 is API-only; Tier 4 is revenue, not cost. Most leverage comes from Tier 2 building shared skills that Tiers 3 and 4 reuse.

---

## 5. How to read the rest of this folder

- `01-paid-search-google-ads.md` — workflows, time-savings, integrations for SEONGON's Google Ads service
- `02-paid-social-meta-ads.md` — workflows + compliance for SEONGON's Facebook Ads service
- `03-seo.md` — SEO + GEO, including the open-source skill ecosystem
- `04-analytics-attribution.md` — GA4, attribution, dashboards, reporting
- `05-marketing-ops-martech.md` — CRM, lead scoring, ops automation
- `06-brand-pr.md` — brand identity skills, GEO for brand visibility
- `07-content-marketing.md` — content workflows (smaller weight for SEONGON)
- `08-cross-cutting-evidence.md` — Anthropic Economic Index summary, Anthropic internal teams summary, demand signals
- `data/workflows-table.md` — the master structured table (all workflows × all metadata)
- `sources.md` — full source index with URLs and tier ranking
- `raw/` — extracted text from primary documents (Anthropic internal teams PDF, etc.)
