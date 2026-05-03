# SEONGON Fit Assessment — Compiling the Evidence Into a Recommendation Shape

This is the synthesis layer. Reads on top of the per-discipline files. Not a finished proposal — a structured argument for the proposal.

---

## 1. What SEONGON should compare itself to

The strongest reference points from the evidence:

| Reference | Why it matches SEONGON | Evidence strength |
|---|---|---|
| **Anthropic's own Growth Marketing team** | Same channel mix (paid search/social/app/email/SEO), non-technical team | S — direct vendor publication |
| **Ayima (UK SEO agency)** | Mid-size SEO agency formalizing Claude training for staff + clients | S — productized programme |
| **InhouseSEO agency** | Production-tested skill kit at an SEO agency | A — open-source skill repo |
| **42 Agency (Kamil Rextin)** | Boutique agency owner-operator using Claude Code for client deliverables | A — MKT1 case study |
| **Tofu (Elaine Zelby), MoEngage (Aditya Vempaty)** | In-house marketing teams at growth/late-stage startups | A — MKT1 case study |
| **HubSpot × Marketing Against the Grain** | Major MarTech vendor productizing Claude Code training for marketers | A — vendor course |

Direct counterpart for "Vietnamese digital marketing agency" doesn't exist publicly yet. SEONGON would be establishing the regional precedent.

---

## 2. Where Claude Code fits SEONGON well — by service line

### SEO (largest service, strongest fit)

- **Open-source ecosystem is mature**: 3 production-grade skill kits, 50+ skills, 27+ subagents covering full SEO surface
- **Documented per-task time savings**: 50–95% across audit, brief, cannibalization, content gap, technical audit
- **Aggregate impact estimate**: 20–30 monthly billable hours → 6–8 hours per account (4x leverage)
- **GEO is a strategic upgrade path** that almost no Vietnamese competitor has productized
- **Localization gaps are the agency's IP opportunity**: Vietnamese-language anti-slop, Cốc Cốc, .vn entities, local citation networks

**Fit verdict: STRONG. Lead with this slice.**

### Paid Search / Google Ads (second-largest service, strong fit)

- **Direct Anthropic-team precedent** (their Growth Mktg team runs the channel non-technically)
- **`claude-ads` skill kit covers 80 Google Ads-specific checks** — fork-able starting point
- **Time-savings well-documented**: 8hr→2hr audits, 2hr→15min ad copy, 3hr→4min reporting
- **Compliance is approval-loop-controllable**: human-in-loop before any account mutation
- **Aggregated capacity recovery**: 10+ hours/week per account at medium/large scale

**Fit verdict: STRONG. Pair with SEO as the priority pilot.**

### Paid Social / Facebook Ads (third-largest service, strong fit with caveats)

- **Most mature open-source skill suite** (HeyOz 10-skill suite at 25–30hr/wk recovery)
- **Anthropic Growth team has Meta-specific MCP server**: precedent for the pattern
- **Compliance is a real risk** that needs explicit mitigation: PorterMetrics ban-risk reference is mandatory reading
- **Approval gates are non-optional** for account-mutating skills

**Fit verdict: STRONG, with deliberate compliance design.**

### Digital Branding (named service line, medium fit)

- **MKT1 7-step brand strategy skill** is a productizable template
- **Anthropic-published brand-guidelines-as-skill pattern** is canonical
- **Brand-as-Skill** is a unusual durable client deliverable (recurring value across future engagements)
- Visual design still needs human + Figma

**Fit verdict: MEDIUM. Worth productizing as a Brand Strategy Sprint service line, but not the priority pilot.**

### Adjacent slices (analytics, marketing-ops, content) — internal efficiency, not new revenue

- Compounds with the priority service lines
- Improves margin on existing retainers
- Lower priority for pilot, higher priority for steady-state operating model

---

## 3. The strategic upside Claude Code unlocks (beyond efficiency)

### Service-line additions

1. **GEO consulting** — productize ahead of Vietnamese-market competitors. Use open-source GEO skills as the technical base.
2. **AI Search Visibility Dashboard** — recurring deliverable per client; tracks brand presence across Claude/ChatGPT/Perplexity/Gemini/AIO.
3. **Brand Strategy Sprint** — 7-day MKT1-style engagement with versioned brand skill as the deliverable. Lower price, higher volume, better margin than traditional brand consulting.
4. **Lead Intelligence Setup** — productize the lead-scoring + CRM enrichment pattern from AdventurePPC.
5. **GA4 Audit Sprint** — 4-minute scripted audit as a paid pre-engagement deliverable.

### Internal IP that compounds

- Versioned `.md` skill files in shared Git repos = compounding agency IP
- Vietnamese-localized anti-AI-slop ruleset = defensible vs. competitors using out-of-the-box generic skills
- Per-client Brand Skills = sticky deliverable across the client lifecycle

### Pricing-model evolution

- Reporting cadence shifts from monthly to weekly/on-demand → upgrade SLAs to higher-tier plans
- Strategy-as-skill unlocks productized strategy work at lower price points → market expansion
- AI-search visibility tracking is a net-new line item

---

## 4. Risk profile

### Low-risk

- Internal training and skill-building
- Internal reporting + audit automation
- Read-only client-account analysis (audits, reports, competitive intel)
- Brand strategy + content production for own marketing

### Medium-risk (manageable with explicit gates)

- Skill deployment to production marketers (skill quality QA needed)
- Generative content for clients (anti-slop layer mandatory)
- Lead scoring + enrichment for clients (PII handling)
- Public-facing GEO outputs

### High-risk (requires explicit governance)

- **Mutating client ad accounts**: pause, bid, budget shift. Approval gates mandatory.
- **Meta Ads compliance**: must use approved MCP/connector layer, not raw API. PorterMetrics reference required.
- **Multi-tenant client data isolation**: per-client Claude Code projects with scoped credentials.
- **Vietnamese-market language quality**: human QA loop on every Vietnamese-language client deliverable until proven.

### Out-of-scope for now

- Fully autonomous account management (à la Liapakis 30-day Meta Ads). Graduation level after 6+ months of supervised use.

---

## 5. Adoption shape — three-tier model

### Tier 1: Engineering / AI team (~5 people, already exists)

**State**: building Claude API products; some Claude Code use already.
**Role under adoption**: build SEONGON-internal infrastructure (skill repos, MCP servers, training materials, governance tooling).
**Tooling**: Claude Code CLI, Claude API, full developer ecosystem.
**Cost shape**: API-based; existing line item.

### Tier 2: Senior power users (~10–20 people)

**Composition**: 1–2 leads per discipline (Google Ads, Facebook Ads, technical SEO, content, analytics, brand) + senior account managers.
**Role**: build the agency's Claude Skills as Git-versioned `.md` files; QA outputs from junior staff using their skills; localize open-source skills to Vietnamese-market specifics.
**Tooling**: Claude Code CLI + IDE; full skill development workflow.
**Cost shape**: Claude Team or Enterprise plan + meaningful API usage.

### Tier 3: Production marketers (~100+ people)

**Composition**: ad ops staff, junior SEOs, content writers, account coordinators.
**Role**: consume the skills built by Tier 2 via Claude Cowork (sandbox) or Claude.ai (chat). Don't write new skills; run existing ones, request fixes when outputs miss.
**Tooling**: Claude.ai Team plan + Claude Cowork inside desktop. Terminal/CLI only as graduation.
**Cost shape**: Claude Team plan per-seat.

---

## 6. Pilot sequence (first 90 days)

### Phase 1 (weeks 1–4): infrastructure + first pilots

- Tier 1 sets up shared skill Git repo, internal MCP servers (start with Google Ads + GA4)
- Tier 2 SEO + Google Ads leads start the SEO pilot (per `03-seo.md`) and Google Ads pilot (per `01-paid-search-google-ads.md`)
- Adapt anti-slop ruleset to Vietnamese
- Run Ayima-style efficiency-track training internally for SEO + Google Ads staff

### Phase 2 (weeks 5–8): expand to paid social, validate

- Add Facebook Ads pilot per `02-paid-social-meta-ads.md`. Compliance review first.
- Validate week-4 metrics from Phase 1 pilots.
- Onboard Tier 3 to Claude.ai Team plan; train on consuming existing skills.

### Phase 3 (weeks 9–12): productize new services

- Productize Brand Strategy Sprint with 1–2 willing clients
- Pilot GEO consulting with 1 willing SEO retainer client (free upgrade to test the service)
- Build the AI Search Visibility Dashboard skill
- Decision gate at week 12: which new service lines convert from pilot to formal offering?

---

## 7. Cost shape (illustrative — needs SEONGON-specific numbers)

This is a sketch, not a quote. Real numbers depend on staff count per tier and actual usage patterns.

| Item | Approximate cost |
|---|---|
| Claude Team plan @ 100 seats | per Anthropic public pricing |
| Claude API for Tier 1 + 2 power use | bounded by usage caps |
| Annual Tier 1 + 2 training time | internal — 2 weeks of senior time |
| Anti-slop ruleset Vietnamese localization | internal — 1 week of senior content + tech SEO time |
| Skill repo build-out | ongoing — compounds over time |

The decision-relevant number is **time-savings × billable rate × number of billable staff** vs. **Claude Code seat + API + training time**. Based on the documented per-discipline savings, the break-even is well below 50% adoption — meaning adoption pays back even if most of Tier 3 doesn't engage deeply.

---

## 8. Open questions to resolve in proposal phase

These are the questions I cannot answer from desk research alone — they need SEONGON-internal data:

1. **Current per-account fulfillment hours**: what's SEONGON's actual baseline for SEO retainers, paid-search retainers, Facebook retainers? Without this, the time-savings projection is industry-average, not SEONGON-specific.
2. **Current client mix**: what % of clients use HubSpot vs. Salesforce vs. nothing? Drives the marketing-ops integration build order.
3. **Vietnamese AI-content detector landscape**: which detectors do Vietnamese clients use, and how aggressive are their thresholds? Drives anti-slop layer design.
4. **Client appetite for GEO consulting**: how many existing retainer clients would buy GEO as an upsell? Drives whether GEO becomes a productized service in 90 days or 12 months.
5. **Internal change-management capacity**: how much senior time can be carved out for skill-building vs. running current accounts? Drives realistic pilot timeline.

---

## 9. Bottom line

**Claude Code is a strong fit for SEONGON's three primary service lines (SEO, Google Ads, Facebook Ads), with documented production precedent at Anthropic's own non-technical Growth Marketing team and at peer agencies (Ayima, InhouseSEO, 42 Agency).**

**The right adoption shape is multi-tier**: a small Tier 1 engineering layer to build infrastructure, a Tier 2 cohort of ~15 power users to build the agency's Claude Skills as durable IP, and Tier 3 of production marketers consuming those skills via Claude.ai/Cowork.

**The right pilot sequence prioritizes SEO + Google Ads first** (highest documented ROI, mature open-source ecosystem), Facebook Ads second (with compliance design), then expands into productized new service lines (GEO, Brand Strategy Sprint, AI Search Visibility Dashboard) in Phase 3.

**The strategic upside beyond efficiency is the new service lines** — particularly GEO consulting, where SEONGON could be the regional first-mover.

The evidence base supports an "adopt with discipline" recommendation, not a wait-and-see one.
