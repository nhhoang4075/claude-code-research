# Paid Social / Meta Ads — Claude Code Adoption Evidence

**SEONGON relevance:** Direct. Facebook Ads is a core service line.

---

## What's documented in production

### Anthropic's Growth Marketing team (S-tier)

From the Anthropic internal report — two paid-social workflows:

1. **Figma plugin for mass creative production**
   - Identifies frames in a Figma file and programmatically generates **up to 100 ad variations per batch** by swapping headlines and descriptions.
   - **0.5 seconds per batch** vs. hours of copy-pasting.
   - **10x creative output overall.**
   - Enables testing more variations across key social channels without designer bottleneck.

2. **Meta Ads MCP server for campaign analytics**
   - In-house MCP server integrated with Meta Ads API.
   - Queries campaign performance, spending data, ad effectiveness directly inside Claude Desktop.
   - Eliminates platform-switching during analysis.

These two patterns — **creative mass production via design-tool plugin** and **MCP-based ad-platform query layer** — are the foundational architecture every other practitioner ends up rediscovering.

---

## The HeyOz 10-skill Meta Ads suite (richest practitioner reference)

Slash commands designed as Claude Code skills. Aggregate impact: **25–30 hours/week recovered per ad-ops staffer**, valued at **$2,500–$4,500/week of agency billing rates**.

| Slash command | Function | Time saved |
|---|---|---|
| `/spy` | Scrapes competitor ads from Meta Ad Library, diffs vs. baseline, classifies by hook/CTA/offer type | 2–3 hr/week |
| `/bulk-creative` | Generates 50–500 ad variations programmatically, renders to PNG with manifest JSON | ~6 hr saved per 50 |
| `/deploy-ads` | Reads deployment manifest, bulk-creates campaigns/ad sets/ads via Graph API v21.0 with retry + rate-limit handling | 3–4 hr/launch → ~10 min |
| `/bleed-check` | Monitors last 6 hours of spend; pauses ad sets over threshold with zero conversions; Slacks alert | 30–45 min/day → ~2 min, scheduled |
| `/fatigue-scan` | Analyzes 7-day rolling trends on hook rate / CTR / CPM / frequency; generates replacement briefs | 1–2 hr/week |
| `/rebalance` | Calculates account ROAS benchmark; flags underperformers; shifts budget to top performers via API | ~55 min/week |
| `/setup-capi` | Generates production-ready server-side event tracking for Meta Conversions API with deduplication | 4–8 hr (one-time) → ~20 min |
| `/hooks` | Generates 50+ copy variations using PAS / AIDA / BAB / pattern-interrupt frameworks; tags by psychology + awareness stage | ~1.75 hr saved per 50 |
| `/audience-audit` | Pulls custom + lookalike + ad-set targeting; runs overlap analysis with Mermaid flowchart | 2–3 hr/month |
| `/weekly-report` | 7-day metrics + KPIs + WoW deltas; Slack + markdown output | 1–2 hr/week |

Several of these are **directly portable to SEONGON's Facebook Ads accounts** — `/weekly-report`, `/spy`, `/bleed-check`, and `/audience-audit` are the lowest-risk to deploy first because they're read-only or involve a clear approval gate.

---

## Compliance — mandatory to address

This is the discipline where Claude Code adoption hits its biggest non-product risk. Documented in PorterMetrics' "5 ways to connect Meta Ads to Claude in 2026 (without getting banned)":

- **Meta has banned accounts that scrape via raw API scripts** without proper authentication or that exceed rate limits.
- **Approved paths**: Adspirer MCP, GrowthSpree MCP, Windsor.ai connector (60-second setup, low ban-risk), Claude Cowork.
- **Avoid**: anonymous scraping of Meta Ad Library at high volume; running production scripts against client accounts under a personal Business Manager session.

For SEONGON specifically:
- Every client ad account integration must go through approved MCP/connector layer, not raw API calls.
- Use system users with scoped permissions per client.
- Maintain audit logs for every action Claude Code takes against client accounts.

The PorterMetrics article also notes that **Claude Cowork inside Claude desktop is the safest option for ad-hoc analysis** (sandboxed Linux VM running on the user's machine).

---

## Practitioner case studies

### Giorgio Liapakis (Stormy AI)
- **30-day autonomous Meta Ads account management** via Claude Code + Meta Marketing API.
- Live production deployment.

### Mike Futia / Scale AI (Stormy AI)
- Custom **Meta Ads creative analytics tool** — analyzes video hook performance and user drop-off rates at granular video-segment level.
- Surfaces which specific seconds in a video caused viewers to leave.

### Kamil Rextin / 42 Agency (MKT1 newsletter)
- **LinkedIn Ad Intelligence Agent** — scrapes competitor LinkedIn ads, generates branded PDF reports with messaging themes + ad volume tracking.
- **5-minute automated reports** vs. hours of manual research.
- Stack: GitHub + Vercel + Railway + Plan mode in Claude Code.

### Elaine Zelby / Tofu (MKT1 newsletter, growth-stage B2B)
- **Customer Lookalike Outbound Agent** — weekly Cowork agent that pulls closed-won deals from HubSpot, finds 10 lookalike companies via Clay, drafts email sequences + LinkedIn outreach.
- Human-in-the-loop review before sending.
- Replaces manual prospecting + outbound drafting.

---

## Operating-model implications for SEONGON

### Tooling choices

| Layer | Recommendation |
|---|---|
| Agent runtime | Claude Code CLI for ad-ops leads; Claude Cowork for general media buyers |
| Meta API integration | Adspirer MCP or Windsor.ai connector (compliance) |
| Creative production | Figma plugin pattern from Anthropic Growth Mktg |
| Reporting layer | Slack + markdown (per HeyOz pattern) |
| Approval gates | Required for `/deploy-ads`, `/rebalance`, `/bleed-check` (any account mutation) |

### Critical safeguards

1. **Sandbox first.** Test every skill against a SEONGON-internal sandbox account before client accounts.
2. **System users per client.** Don't share personal sessions across clients.
3. **Rate-limit awareness.** Add jitter and exponential backoff in any custom MCP — Meta is aggressive about throttling.
4. **Audit trail.** Every action logged with skill name, user, account, timestamp.

### Deployment ordering (lowest risk → highest)

1. **Read-only first**: `/weekly-report`, `/spy`, `/audience-audit`, `/fatigue-scan` — produce reports, don't mutate accounts.
2. **Generate-only**: `/hooks`, `/bulk-creative` — create assets but don't deploy.
3. **Mutating with approval gates**: `/deploy-ads`, `/bleed-check` (only after running in alert-only mode for 2 weeks), `/rebalance`.
4. **Autonomous (graduation level only)**: 30-day autonomous account mgmt à la Liapakis. Only after 6+ months of supervised use.

---

## Suggested SEONGON pilot scope (Meta Ads slice only)

**Pilot team**: 1 senior Facebook Ads lead + 1 media buyer + ad ops support.

**Pilot duration**: 6 weeks (longer than Google Ads because of the compliance learning curve).

**Targets**:
- `/weekly-report` deployed for 5 pilot clients (read-only)
- `/spy` running weekly competitive intel for 3 clients
- `/hooks` generating ad-variant CSVs ready for Meta Bulk Upload
- `/bleed-check` running in alert-only mode (no auto-pause) for 2 weeks before any mutation enabled

**Decision gate after week 6**:
- If alert-only `/bleed-check` is producing trustworthy alerts, enable auto-pause on selected accounts.
- If `/spy` and `/weekly-report` produce time-savings ≥50%, expand to all FB Ads staff.

---

## Sources

- Anthropic — *How Anthropic teams use Claude Code* (PDF)
- HeyOz — *10 Claude Code Skills for Meta Ads* — https://heyoz.com/blogs/claude-code-skills-for-meta-ads
- PorterMetrics — *5 Ways to Connect Meta Ads to Claude in 2026 (Without Getting Banned)* — https://portermetrics.com/en/tutorial/claude/chat-meta-ads/ (compliance reference)
- Adspirer — *Run Facebook & Instagram Ads with Your Claude Code AI Agent* — https://www.adspirer.com/blog/meta-ads-claude-code-agent
- Stormy AI playbook — case studies (Liapakis, Futia)
- MKT1 — *4 Gen Marketers* — Kamil Rextin (LinkedIn Ad Intelligence), Elaine Zelby (Customer Lookalike Outbound)
- Windsor.ai — Meta Ads connector — https://windsor.ai/how-to-connect-facebook-ads-to-claude-automatically/
