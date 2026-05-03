# Cross-Cutting Evidence — Anthropic-Primary Sources + Demand Signals

This file pulls together the foundational evidence that doesn't slot under a single discipline:

1. Anthropic's own internal-teams report (the strongest precedent)
2. Anthropic Economic Index data (the only quantitative occupation-wide ground truth)
3. Demand signals (courses, podcasts, vendor moves) that show market trajectory

---

## 1. Anthropic's "How Anthropic teams use Claude Code" — internal report

The most decision-relevant primary source. Documents Claude Code adoption across **10 internal Anthropic teams**:

1. Data infrastructure
2. Product development
3. Security engineering
4. Inference
5. Data science + visualization
6. API
7. **Growth marketing** ← directly relevant to SEONGON
8. Product design
9. RL engineering
10. Legal

### Growth Marketing team (re-summarized for cross-reference)

- "Non-technical team of one"
- Channels: paid search, paid social, mobile app stores, email marketing, SEO
- 4 named workflows:
  1. Automated Google Ads creative generation (sub-agents for headlines/descriptions)
  2. Figma plugin for mass creative production (100 variants in 0.5 sec/batch, 10x output)
  3. Meta Ads MCP server for campaign analytics
  4. Memory system for self-improving experiments
- Reported impact: ad copy 2hr→15min, 10x creative output, "operates like a larger team"

### Patterns from non-marketing teams that transfer

Several patterns from other Anthropic teams generalize directly:

**From Data Infrastructure**:
- **Plain-text workflow descriptions** for non-technical staff. Finance team members write what they want as plain text; Claude Code executes the data pipeline. Direct analog for SEONGON: account managers describing client deliverables in plain text, Claude Code executing.
- **Screenshot-driven debugging**. Show Claude what's broken visually; Claude proposes fixes.

**From Legal**:
- **Two-step process: plan in Claude.ai, implement in Claude Code.** Claude.ai for thinking and brainstorming; Claude Code for execution. Avoids one-shot prompts that overwhelm.
- **Visual-first**: screenshots over text descriptions.
- **"Share toy prototypes despite imperfection"** — culture norm: the team that ships rough demos enables more downstream innovation.
- **Compliance tooling priorities**: build compliance tools quickly as AI capabilities expand. Direct lesson for SEONGON's client-account governance.

**From Product Design**:
- Claude Code as fast prototyping engine, not just code-generation.

**Cross-team top tip (appears in 5+ team sections)**:
- Plan extensively in Claude.ai first; ask Claude.ai to summarize the entire idea into a step-by-step prompt for Claude Code. Work incrementally rather than one-shot.

### Why this is the strongest precedent for SEONGON

- **Anthropic owns the tool.** They have no reason to over-promise its usefulness — the report is internal-team interviews, not marketing copy.
- **Their Growth Marketing team's channel mix matches SEONGON's**: paid search, paid social, app stores, email, SEO.
- **The team is non-technical**, not engineering-disguised-as-marketing. This is the relevant comparison group.
- **The report documents specific workflows**, not vague enthusiasm.

---

## 2. Anthropic Economic Index — January 2026 ("Economic primitives") + March 2026 ("Learning curves")

The two reports give the only quantitative ground truth on Claude usage by occupation. Marketing-specific data is **conspicuously absent** — but several findings are still useful.

### What's in the data

**Occupation breakdown (Jan 2026 report)**:
- Computer & Mathematical: 34% Claude.ai, 46% API
- Educational Instruction: 15% Claude.ai (up from 9% Jan 2025)
- Arts, Design, Entertainment: 11% Claude.ai
- Office & Administrative Support: 8% Claude.ai, 13% API

**Trend (March 2026 report)**:
- Personal use rose from 35% → 42% (Nov 2025 to Feb 2026)
- Coursework fell 19% → 12%
- Management category rose 3% → 5%
- Average task hourly value: $49.30 → $47.90 (slight decline as usage broadens to lower-wage tasks)

**Augmentation vs. automation**:
- Claude.ai: 52% augmented, 45% automated (Jan 2026)
- API: 75% automation
- API skews heavily toward programmatic/agentic deployment

### What's NOT in the data

- **No specific Marketing/Advertising/Sales O*NET breakdown** in either report
- **No Claude Code-specific occupational data** in the Jan 2026 report
- **Vietnam/SEA breakdown not published**

### How to interpret for SEONGON

The reports establish:
1. Claude usage *is* broadening past coding (personal, management, education all growing).
2. API/automation is the heavier-leverage modality (75% automation).
3. But Anthropic's own framework still treats Marketing as an under-instrumented category — partly because Marketing tasks span many O*NET buckets (Computer & Math for analytics, Arts/Design for creative, Office for ops, Sales for outreach).

For the SEONGON proposal: **don't lean on the Economic Index for marketing-specific numbers**. Lean on Anthropic's internal-teams report (Section 1 above) and the practitioner sources documented across the discipline files.

---

## 3. Demand signals — the market trajectory

### Course catalog (Maven + ccforeveryone + Anthropic Skilljar)

Productized non-engineer Claude Code training that exists today:

- **Intro to Claude Code (for non-engineers)** — Maven
- **From Zero to Claude Code Pro in 90 Minutes (for PMs)** — Maven
- **Claude Code Masterclass for Product Managers** — Maven
- **Claude Code 101: Kickstart 2026** — Maven
- **Claude Code for Beginners: 2 Day Launchpad** — Maven (explicitly targets "marketing, operations, content, sales")
- **Claude Code Tutorial (Free Course) | No Coding Required** — ccforeveryone.com
- **Claude Code in Action** — Anthropic Skilljar (official)
- **Master Claude Code for Marketing** — HubSpot × Marketing Against the Grain

The volume of distinct courses targeting non-engineer roles is itself a demand signal.

### Podcast / strategic-POV signals

- **Lenny Rachitsky (Lenny's Newsletter)**: "Everyone should be using Claude Code more" — explicitly makes the case for non-developers. Lists his own non-dev use cases: storage management, image enhancement, video downloads, batch image extraction, raffle picking.
- **Dan Shipper (Every)**: positions Claude Code as "the most underrated AI tool for non-technical people."
- **Boris Cherny (Head of Claude Code, on Lenny's podcast)**: hard numbers — Claude Code accounts for **~4% of public GitHub commits**, daily active users doubling.
- **Latent Space podcast**: ongoing coverage of the bimodal engineer / Claude-Code-vs-Cursor adoption dynamics.

### Vendor moves

- **HubSpot ships an official Claude connector** + co-brands a marketing course with MATG.
- **Windsor.ai, Coupler.io, Improvado** all ship paid no-code MCP-style connectors aimed at marketers.
- **Adspirer, GrowthSpree, Adzviser** all ship MCP servers for ad-platform integrations.
- **Composio, MCP Market, mcpmarket.com** function as MCP/skill marketplaces.

### Open-source ecosystem density

- 50+ marketing-related Claude Code skills aggregated across the three SEO repos alone
- 250+ paid-ads checks in claude-ads
- 54 Improvado marketing skills across 4 funnel stages
- 1,000+ data sources reachable via various connectors

This is a **mature ecosystem**, not an early-adopter risk. The reasonable interpretation is that an agency adopting now is in the second wave (after early-adopter agencies like Ayima, InhouseSEO, 42 Agency), not the bleeding edge.

---

## 4. What this evidence base supports — and what it doesn't

### Supports

- A multi-tier adoption strategy (engineering team → senior power users → all marketers, on graduated tooling) is the demonstrated pattern. ✓
- Skills-as-Git-repos is the durable, scaling architecture. ✓
- MCP-as-data-layer is the production-grade integration pattern. ✓
- Time-savings of 50–90% on specific repetitive tasks are well-documented and reproducible. ✓
- An SEO agency formalizing Claude Code training is precedented (Ayima). ✓

### Does not support

- "Claude Code replaces marketers." The evidence shows augmentation, not replacement. Even Anthropic's "team of one" still has a human running it.
- A single number for "ROI of Claude Code at SEONGON." Too many variables; the right framing is per-discipline pilot data.
- Specific Vietnamese-market adoption data — there isn't any in the surveyed sources. SEONGON would be establishing this themselves.

---

## Sources

- Anthropic — *How Anthropic teams use Claude Code* (PDF) — extracted text in `raw/anthropic-internal-teams.txt`
- Anthropic — *Economic Index landing page* — https://www.anthropic.com/economic-index
- Anthropic — *Economic Index Jan 2026 report* — https://www.anthropic.com/research/anthropic-economic-index-january-2026-report
- Anthropic — *Economic Index Mar 2026 report* — https://www.anthropic.com/research/economic-index-march-2026-report
- Anthropic — *Economic Index Survey announcement* — https://www.anthropic.com/research/economic-index-survey-announcement
- Lenny's Newsletter — *Everyone should be using Claude Code more* — https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code
- Lenny's Newsletter — *Head of Claude Code (Boris Cherny)* — https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens
- Maven — non-engineer Claude Code course catalog (multiple URLs in `sources.md`)
- Anthropic Skilljar — *Claude Code in Action* — https://anthropic.skilljar.com/claude-code-in-action
