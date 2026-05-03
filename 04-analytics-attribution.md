# Analytics, Attribution, Reporting — Claude Code Adoption Evidence

**SEONGON relevance:** Cross-cutting. Every paid-media + SEO retainer ends with reporting and attribution. Improving this layer compounds across the agency.

---

## What's documented

### MCP-based GA4 access

The Anthropic ecosystem has converged on **MCP (Model Context Protocol) servers** as the live data layer between Claude Code and analytics platforms.

**Two competing GA4 MCP options**:

1. **Google's official Analytics MCP server** — direct, free, structured access to GA4 dimensions and metrics.
2. **Windsor.ai connector** — paid, no-code wrapper. Streams **480+ GA4 dimensions/metrics** directly into Claude. Also bridges **325+ other data sources** (Facebook Ads, Google Ads, Salesforce, Instagram, Shopify, BigQuery, etc.) — single connector for cross-channel attribution.

The Anthropic-internal precedent (Growth Marketing team) used a **custom-built Meta Ads MCP server** — i.e., they built rather than bought. For an agency like SEONGON, the build-vs-buy depends on how many clients use which platforms.

### GA4 audit in 4 minutes (measureu.com)

A documented audit pattern using `analytics-mcp`:

1. Confirm GA4 access: "What Google Analytics properties do you have access to?"
2. Full audit: "perform an audit on the GA4 setup and tell me what is good, bad, ugly, and needs to be fixed."
3. Browser-controlled deep dive via Chrome extension — Claude logs into GA4, navigates UI autonomously, captures screenshots, generates report with executive summary + traffic breakdown + findings + action items.

**Audit categories**: custom dimensions, channel groupings (including AI Traffic detection), enhanced measurement, data quality, implementation gaps, tag firing, consent configurations.

For SEONGON: this is a **prospect-pitch tool**. Run a 4-minute GA4 audit on every inbound prospect's analytics — surface 5 specific issues — close at higher conversion than competitors who pitch generic services.

---

## Improvado — enterprise-tier marketing analytics (most ambitious reference)

Improvado ships a Claude Marketing Skills bundle organized across the funnel:

- **Demand Gen**: 15 skills (campaign launcher, Google Ads experiments, Facebook campaign builder, landing page deployment, SERP research)
- **Creative & Content**: 15 skills (banner generation, video creation, LinkedIn carousel builder, synthetic persona scoring)
- **Sales & CRM**: 15 skills (lead scoring, account planning, call analysis, SOW generation, opportunity management)
- **Analytics**: 9 skills (Marketing Mix Modeling, causal attribution, funnel analysis, dashboard creation)

**Connectors**: 1,000+ sources — ad platforms, CRMs, outreach tools, data warehouses (Snowflake, BigQuery, Redshift, ClickHouse), analytics systems.

**Documented customer outcomes**:
- **Chacka Marketing**: 90% reduction in manual reporting time
- **Improvado internal**: 38 hours saved per analyst per week
- **SoftwareOne**: 3x ROI from marketing analytics
- Complex attribution questions answered "in seconds instead of days"

**Example queries enabled**:
> "Which channels contributed to our top 10 deals last quarter, using W-shaped attribution?"

---

## Claude Code-native analytics agents

### `marketing-analyst` agent (rohitg00 toolkit)

A reusable agent definition in the awesome-claude-code-toolkit. Functions as a junior-analyst-replacement: takes natural-language analytics questions, picks the right data source, runs the query, formats the answer.

### Coupler.io case studies (cross-channel)

- **Olexander Paladiy**: 5-agent structure outperformed 10-agent setup — counter-intuitive finding that fewer specialized agents work better than many.
- **Austin Lau**: Non-coder running entire growth-marketing function solo via Claude Code.
- **Matt Firestone**: 2–3x positive response rate on highest-priority accounts after Claude Code-driven account research.
- **Eoin Clancy**: Six-step workflow enabling three blog posts to refresh per week.

---

## The "AI Search performance dashboard" pattern (SEO Francisco)

Worth highlighting separately — this is the GEO-aware analytics pattern emerging:

- 15-minute build using SE Ranking MCP + Live Artifacts.
- Dashboard tracks brand visibility across ChatGPT, Perplexity, Gemini, AIO simultaneously.
- Refreshes on demand or scheduled.

For SEONGON: combine with the GEO service line idea. A "GEO Visibility Dashboard" can be a paid client deliverable.

---

## Operating-model implications for SEONGON

### Tooling stack

| Layer | Recommendation |
|---|---|
| GA4 access | Official Google Analytics MCP per client (free) |
| Cross-channel data | Windsor.ai or Coupler.io for clients on many platforms |
| Reporting layer | Markdown + Slack + Sheets (per HeyOz/AdventurePPC pattern) |
| Attribution | Custom W-shaped models for enterprise clients; default-channel attribution for SMB |
| Dashboard layer | Live artifacts (HTML reports rendered by Claude) for real-time client visibility |

### Process shifts

- **From monthly reports → weekly or on-demand.** Reports become a chat away.
- **From "report writer" to "report architect".** Senior analysts design the dashboard skill once; Claude Code generates per-client outputs.
- **From manual GA4 setup audits → 4-minute scripted audit per onboarding.** Standardize the audit; faster client onboarding.

### Critical caveats

- **Data quality before automation.** If GA4 implementation is broken, automating reports just amplifies wrong numbers faster. Audit before autoreport.
- **Privacy/consent**: Vietnamese clients increasingly need consent-mode-aware analytics. Bake compliance into the skill, not as an afterthought.
- **Client data isolation**: do *not* let one client's data leak into another's context. Use per-client Claude Code projects with scoped credentials.

---

## Suggested SEONGON pilot scope (analytics slice)

**Pilot team**: 1 senior analyst + 1 client services lead.

**Pilot duration**: 4 weeks.

**Targets**:
- 4-minute GA4 audit script deployed and tested against 5 client accounts (week 1–2)
- Weekly client reporting skill replacing manual reports for 3 clients (week 3–4)
- Cross-channel attribution model (W-shaped) prototyped on 1 enterprise client (week 4)

**Decision gate after week 4**:
- If GA4 audit script catches issues that match or exceed senior-analyst manual review, deploy to all client onboardings.
- If weekly reporting time-savings ≥75%, expand to all retainer clients.

---

## Sources

- Google Analytics MCP server (official) — multiple references
- Windsor.ai — GA4 connector — https://windsor.ai/connect/google-analytics-4-to-claude-integration/
- measureu.com — *Audit GA4 in 4 Minutes* — https://measureu.com/ga4-audit-mcp/
- Improvado — *Claude Marketing Skills* — https://improvado.io/blog/claude-marketing-skills
- Coupler.io — *Claude Code for Marketing: Real Use Cases* — https://blog.coupler.io/claude-code-for-marketing/
- rohitg00/awesome-claude-code-toolkit — https://github.com/rohitg00/awesome-claude-code-toolkit
- SEO Francisco — *Build AI Search Performance Dashboard* — referenced in earlier search
- Two Octobers — *Connecting to the Google Analytics MCP server with Claude* — https://twooctobers.com/blog/connecting-to-the-google-analytics-mcp-with-claude/
- Composio Google Analytics toolkit — https://composio.dev/toolkits/google_analytics/framework/claude-code
- Claude Code official docs — Track team usage with analytics — https://code.claude.com/docs/en/analytics
