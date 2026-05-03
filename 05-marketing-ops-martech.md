# Marketing Operations / MarTech / CRM — Claude Code Adoption Evidence

**SEONGON relevance:** Medium-high. SEONGON's main service is media + SEO delivery, not full martech. But internal ops (CRM, lead pipeline, account management workflows) are still relevant, especially as SEONGON scales.

---

## Vendor-side momentum — HubSpot

The most significant vendor signal for marketing-ops adoption:

### HubSpot's official Claude connector

HubSpot ships a first-party connector that lets Claude:
- Generate tailored answers, summaries, and visualizations from HubSpot data
- Take action on insights directly inside HubSpot — campaign optimization, lead engagement
- Serve marketing, sales, support, and CS teams from a unified data layer

**Strategic signal**: HubSpot is treating Claude/MCP as a first-class integration alongside their own AI features. This is the major-vendor endorsement that makes adoption defensible to client stakeholders.

### "Master Claude Code for Marketing" course (HubSpot × Marketing Against the Grain)

Co-branded course by James Dickerson:
- **4 workflows + 12 prompts**
- Featured workflows: "Ship a Landing Page in One Session", "Find the Gap Your Competitors Missed", "Build Interactive Lead Magnets Without Developers", "Email Sequences That Don't Sound Like Templates"
- Audience: marketers (no technical prerequisites)
- Framing: "Vibe Coder to Full-Stack Marketer"

A free, productized curriculum that SEONGON could re-skin for internal training in Vietnamese.

---

## Lead scoring + CRM enrichment workflow (AdventurePPC pattern)

One of the highest-value automations for an agency that runs lead-gen for clients:

- **What it does**: Enriches leads with external data (Clearbit / Apollo / LinkedIn signals), applies a scoring function based on firmographic + behavioral signals, provides reasoning for each score.
- **Build cost**: 12–24 hours.
- **Replaces**: RevOps contractor engagement at $5,000–$15,000 per project.
- **Tools**: HubSpot / Salesforce / Pipedrive APIs + enrichment providers.

For SEONGON, this is **client-facing IP** — package as a "Lead Intelligence Setup" service line.

---

## Account scoring with intent signals (Coupler.io reference)

Documented production pattern:
- Feed Claude Code with CRM data + intent signals + ICP criteria
- Claude builds a scoring model
- Flags logic gaps the team hadn't noticed
- Produces a ranked account list

**Notable**: the human-in-the-loop is essential here. Claude Code surfaces issues the human team had missed; doesn't replace strategic judgment.

---

## Campaign governance (Improvado pattern)

High-value for any agency managing multi-client campaign portfolios:

- **Pre-launch validation**: campaigns checked against naming conventions and UTM completeness before launch
- **Budget pacing alerts**: identifies over/under-spending across portfolio
- **Anomaly detection**: flags metric spikes exceeding thresholds across clients
- **Cross-channel attribution**: custom weighting models per-client

For SEONGON: this is the "agency compliance layer" — prevents the kind of small misconfigurations that erode client trust.

---

## Lenny + Dan Shipper non-developer ops workflows

From the podcast episode — lower-leverage but instructive for the cultural shift:

- **Invoice organization** (Martin Merschroth): standardized naming + folder placement for tax prep.
- **Customer call analysis** (Dan Shipper): identifies conflict-avoidance patterns in his own communication.
- **Voice-to-article-outline** (Helen Lee Kupp): voice memos organized into outlines matching writing style.
- **Doc gap auditor** (James Pember): Claude Code + Playwright autonomously identifies documentation gaps.

Tools repeatedly mentioned: **Granola** (meeting notes), **Fireflies** (transcripts), **Linear**, **Notion** — all available as MCPs.

---

## Operating-model implications for SEONGON

### Build vs. buy decision matrix

| Layer | Build (custom skill) | Buy (vendor MCP) |
|---|---|---|
| HubSpot integration | — | HubSpot's official connector |
| Salesforce integration | — | Composio Salesforce MCP |
| Cross-source data (Coupler) | — | Coupler.io 400+ sources |
| Intent signals | Custom for VN market | Buy generic, supplement with VN-specific data |
| Lead scoring model | Build (per-client, IP) | — |
| Naming convention enforcement | Build (lightweight) | — |

### Internal SEONGON operations the same skills apply to

- Internal CRM (if they use HubSpot or similar): account management automation
- Proposal generation: structured data → branded proposal in minutes
- Client onboarding: standardized intake skill that produces a kickoff brief
- Recurring client check-ins: scheduled report generation

### Risks specific to ops/martech adoption

1. **PII handling**: client CRM data contains PII. Confirm Anthropic / MCP server data residency and processing. Use enterprise plan if needed.
2. **Multi-tenant isolation**: separate Claude Code projects per client; never shared context.
3. **Action-taking gates**: any skill that mutates CRM data needs explicit approval flows.

---

## Suggested SEONGON pilot scope (ops slice — lower priority)

This is the **third-priority pilot** after paid-search and SEO. Scope smaller:

**Pilot team**: 1 marketing ops person + 1 senior AM.

**Pilot duration**: 3 weeks.

**Targets**:
- Internal proposal generator skill (week 1)
- Client onboarding intake-to-brief skill (week 2)
- HubSpot/Salesforce summary skill for AMs (week 3)

This is more about **internal efficiency** than billable services, so the ROI calculation is different from paid-search and SEO. Most appropriate as a follow-on pilot once the priority disciplines have proven the operating model.

---

## Sources

- HubSpot Knowledge Base — *Set up and use the HubSpot connector for Claude* — https://knowledge.hubspot.com/integrations/set-up-and-use-the-hubspot-connector-for-claude
- HubSpot offers — *Master Claude Code for Marketing* (Marketing Against the Grain course) — https://offers.hubspot.com/claude-code-for-marketing-matg
- HubSpot offers — *Claude Hacks for Marketers* — https://offers.hubspot.com/claude-hacks-marketers
- MarTech.org — *HubSpot adds another CRM connector with Claude* — https://martech.org/hubspot-adds-another-crm-connector-this-time-with-claude/
- AdventurePPC — *6 Workflows That Replace Freelancer Contracts* (lead scoring + email)
- Coupler.io — *Claude Code for Marketing: Real Use Cases* — https://blog.coupler.io/claude-code-for-marketing/
- Improvado — *Claude Marketing Skills* — https://improvado.io/blog/claude-marketing-skills
- Composio HubSpot toolkit — https://composio.dev/toolkits/hubspot/framework/claude-code
- Lenny's Podcast — Dan Shipper episode (non-dev ops use cases)
