# Paid Search / Google Ads — Claude Code Adoption Evidence

**SEONGON relevance:** Direct. SEONGON is a Google Premier Partner since 2012 with 10,000+ campaigns historic. This is a primary service line.

---

## What's documented in production

### Anthropic's own Growth Marketing team (S-tier reference)

The single most important precedent. From "How Anthropic teams use Claude Code":

- **Team description**: "non-technical team of one" covering paid search, paid social, mobile app stores, email marketing, and SEO.
- **Core workflows**:
  1. **Automated Google Ads creative generation** — agentic workflow processes CSVs of hundreds of existing ads with performance metrics, identifies underperformers, generates new variations meeting strict character limits (30 chars headlines, 90 chars descriptions). Uses two specialized sub-agents (one for headlines, one for descriptions).
  2. **Memory system for experiments** — logs hypotheses and test results across iterations, pulls prior results into context when generating new variations. Self-improving testing framework.
- **Reported impact**:
  - Ad copy creation: **2 hours → 15 minutes**
  - **10x increase in creative output**
  - "Operating like a larger team — handles tasks that traditionally required dedicated engineering resources."
  - "Strategic focus shift" — from manual execution to system-building.
- **Top tips from the team**:
  1. Identify API-enabled repetitive tasks (ad platforms, design tools, analytics)
  2. Break complex workflows into specialized sub-agents
  3. Brainstorm + plan in Claude.ai first, then implement in Claude Code

This deserves first-paragraph treatment in the SEONGON proposal: Anthropic itself runs paid-search ops with one non-technical marketer using Claude Code.

---

## Open-source skill ecosystem

### `claude-ads` (AgriciDaniel) — most comprehensive paid-ads skill

- **250+ checks** across 7 ad platforms
- **Google Ads alone: 80 checks** spanning Search, Performance Max, AI Max, Demand Gen, CTV, YouTube
- **Specialized sub-skills**: creative audit, landing page assessment, budget/bidding review, competitor intelligence, A/B testing, PPC financial modeling, PDF reporting
- **Live data integrations**: `mcp-google-ads` (29 GAQL tools), Adspirer MCP for Meta, GrowthSpree / Adzviser for LinkedIn
- **12 industry templates**: SaaS, ecommerce, local service, B2B enterprise, info products, mobile app, real estate, healthcare, finance, agency, generic
- **Basis**: 16,000+ campaign references from WordStream, Triple Whale industry research, weighted severity scoring

This is essentially a free, open-source agency audit framework. SEONGON could fork and adapt for Vietnamese-market specifics (VND budget thresholds, local benchmarks, Vietnamese-language UI in reports).

---

## Practitioner workflow library

### AdventurePPC (PPC agency blog series)

- **5 named PPC automation projects**: bid adjustment, ad copy generation, custom reporting dashboards, search term mining, environment setup.
- **Initial setup**: 8–15 hours across first week
- **Weekly time savings**: 10+ hours per medium/large account
- **Per-project build time**: 45–120 min depending on complexity
- **Stack**: Google Ads API + Microsoft Advertising API + Anthropic API + Python (`google-ads`, `pandas`, `python-dotenv`, `plotly`, `smtplib`, `tqdm`) + Gmail SMTP + Google Sheets approval flow
- **Notable**: this article does *not* use MCP — it uses direct Python scripts. Earlier-style approach. The newer pattern is MCP-first.

### AdventurePPC's "6 workflows that replace freelancer contracts" — most useful for SEONGON ROI framing

| Workflow | Replaces | Going rate |
|---|---|---|
| Automated performance reporting | Reporting automation contractor | $1,500–$6,000 build + retainer eliminated |
| Content brief generation at scale | Content strategist | $80–$200/hr eliminated |
| Ad copy + A/B test pipelines | Copywriter on retainer | $2,000–$5,000/month |
| Lead scoring + CRM enrichment | RevOps contractor | $5,000–$15,000/project |
| Competitor monitoring + intelligence | Dedicated analyst | $1,000–$3,000/month |
| Email sequence personalization | Email specialist | $3,000–$8,000/campaign |

For SEONGON: these aren't roles to fire — they're **fulfillment cost categories on every client engagement**. Automating them via Claude Code increases per-client margin without changing the price point.

### Stormy AI playbook

- **Three core install steps**: install Claude Code CLI → connect MCP via `claude_desktop_config.json` → integrate GAQL.app for natural-language → GAQL translation (prevents hallucinations).
- **Documented case studies**:
  - **Giorgio Liapakis**: 30-day autonomous Meta Ads account management (Claude Code + Meta Marketing API)
  - **Mike Futia (Scale AI)**: Custom Meta Ads creative analytics tool — video hook performance + drop-off rates at video-segment level
- **Time-savings**:
  - Vibe Querying: 30-minute investigation → 15-second query
  - Multi-platform audits: 8-hour manual → 2-hour automated (75% reduction)

### Ryze AI 10 Google + Meta Ads workflows (cookbook)

- Full account audits, weekly client reports, budget pacing + overspend forecasting, creative perf breakdowns, cross-channel attribution checks, audience overlap detection, search term mining, landing page + tracking QA, competitor ad monitoring, anomaly detection.
- Each workflow specifies inputs, outputs, prerequisites, and time savings.

---

## Operating-model implications for SEONGON

### Tooling choices

| Layer | Recommendation |
|---|---|
| Agent runtime | Claude Code CLI for power users; Claude Cowork (desktop sandbox) for others |
| Live data | `mcp-google-ads` (29 GAQL tools); GAQL.app for NL→GAQL |
| Audit/optimization base | Fork `claude-ads` repo, adapt to VN benchmarks |
| Reporting layer | Google Sheets / Slack / SMTP per AdventurePPC pattern |
| Approval gates | Required before bid changes / pauses go live |

### Process shifts

- **From manual ad ops → system design.** The Anthropic Growth Marketing top tips are explicit: senior people stop manually doing ops and start designing the agentic systems that do ops.
- **From one-off prompts → version-controlled skills.** Skills as `.md` files in shared Git repos so the agency builds compounding intellectual capital, not ephemeral prompts.
- **From single agent → specialized sub-agents.** One agent for headlines, one for descriptions, one for keyword expansion, one for negative-list maintenance, etc. Mirrors a real agency team structure.

### Risk / compliance posture

- **Approval loops**: every workflow that mutates an ad account (pauses, bid changes, budget shifts) needs human approval before commit. Several of the HeyOz skills do this; replicate the pattern.
- **Spend caps**: rebalancers should respect a max-shift % per execution.
- **Audit logs**: every Claude Code action against client accounts needs a logged trail.

---

## Suggested SEONGON pilot scope (paid search slice only)

**Pilot team**: 1 senior Google Ads lead + 1 senior account manager + the in-house AI eng team for support.

**Pilot duration**: 4 weeks.

**Targets** (calibrated to industry-reported numbers, not promises):
- Ad copy creation: from existing baseline → ≥50% reduction (Anthropic reports 87.5%)
- Multi-platform monthly audit: from existing baseline → ≥50% reduction (Stormy AI reports 75%)
- Weekly client reporting: from manual → fully automated for 5 pilot clients

**Build**:
1. Fork `claude-ads` skill repo as `seongon-ads`. Localize.
2. Connect `mcp-google-ads` to a sandbox client account first.
3. Wire reporting → Google Sheets → email/Slack.
4. Document SOPs in shared `.md` skills.

**Decision gate after week 4**:
- If pilot hits ≥40% on the three targets, expand to all paid-search staff.
- If <40%, do a structured retro — most likely cause is data-pipeline gaps, not Claude Code itself.

---

## Sources

- Anthropic — *How Anthropic teams use Claude Code* (PDF, internal report)
- AgriciDaniel/claude-ads — https://github.com/AgriciDaniel/claude-ads
- AdventurePPC — *Claude Code for PPC Professionals* — https://www.adventureppc.com/blog/claude-code-for-ppc-professionals-automating-campaign-management-with-ai
- AdventurePPC — *6 Workflows That Replace Freelancer Contracts* — https://www.adventureppc.com/blog/6-claude-code-workflows-that-replace-entire-freelancer-contracts-for-marketing-teams
- Stormy AI — *Claude Code for Performance Marketing* — https://stormy.ai/blog/claude-code-for-performance-marketing-playbook
- Ryze AI — *10 Claude Code Marketing Workflows for Google and Meta Ads* — https://www.get-ryze.ai/blog/claude-code-marketing-workflows-google-meta-ads
- Search Engine Land — *Claude Skills for PPC* — https://searchengineland.com/claude-skills-ppc-scalable-systems-474221 (paywall on extraction; abstract only)
