# Claude Code for Marketers — Research Pack for SEONGON

Compiled 2026-05-03. Evidence base for whether/how SEONGON should adopt Claude Code across its marketing operation.

## How to read this folder

**Start here:**
1. **[00-executive-summary.md](00-executive-summary.md)** — TL;DR, headline findings, key numbers, decision-relevant framing
2. **[09-seongon-fit-assessment.md](09-seongon-fit-assessment.md)** — synthesis of all evidence into a recommendation shape

**Deep dives by marketing discipline (weighted to SEONGON's services):**
- **[01-paid-search-google-ads.md](01-paid-search-google-ads.md)** — Google Ads workflows, time savings, integrations
- **[02-paid-social-meta-ads.md](02-paid-social-meta-ads.md)** — Facebook Ads workflows + compliance gotchas
- **[03-seo.md](03-seo.md)** — SEO + GEO, the open-source skill ecosystem (most depth)
- **[04-analytics-attribution.md](04-analytics-attribution.md)** — GA4, attribution, dashboards
- **[05-marketing-ops-martech.md](05-marketing-ops-martech.md)** — CRM, lead scoring, ops
- **[06-brand-pr.md](06-brand-pr.md)** — brand identity skills, GEO for brand
- **[07-content-marketing.md](07-content-marketing.md)** — content workflows (smaller weight)

**Foundational evidence:**
- **[08-cross-cutting-evidence.md](08-cross-cutting-evidence.md)** — Anthropic's own teams report, Economic Index data, demand signals

**Tool ecosystem & best practices (Vietnamese):**
- **[agricidaniel-ecosystem/](agricidaniel-ecosystem/)** — deep-dive on AgriciDaniel's marketing-related claude-* tools (claude-seo, claude-ads, claude-blog, claude-email, claude-shorts, etc.) using WHAT/SO WHAT/NOW WHAT framework
- **[best-practices/](best-practices/)** — adoption playbook in Vietnamese: performance optimization, cost optimization, personal-development mindset shifts for non-developers

**Reference:**
- **[data/assessment-framework.md](data/assessment-framework.md)** — 7-dimension grading rubric (Authority, Specificity, Independence, Recency, Verifiability, Match, Impact) plus identity columns (Author, Role, TrustSignals)
- **[data/source-assessment.csv](data/source-assessment.csv)** — 40 sources scored, spreadsheet-ready (open in Excel/Numbers/Sheets)
- **[data/source-assessment.md](data/source-assessment.md)** — same data rendered as a sortable ranking + per-source detail cards for GitHub browsing
- **[data/workflows-table.md](data/workflows-table.md)** — master structured table: ~85 workflows × discipline × tools × time-savings × source
- **[sources.md](sources.md)** — full source index, 100+ links, tier-ranked
- **raw/** — extracted text from primary documents (Anthropic internal teams PDF)

## Live CSV viewer

For real-time editing of `data/source-assessment.csv` with a sortable, filterable browser view that hot-reloads on every save:

```bash
bun scripts/csv-viewer.ts
# → http://localhost:4174

# custom file/port:
bun scripts/csv-viewer.ts data/workflows-table.md   # works for any CSV-ish file
bun scripts/csv-viewer.ts data/source-assessment.csv 5000
```

Server-Sent Events push a reload signal whenever the file changes on disk, so editing the CSV in VS Code, Numbers, or via `vim` updates the browser within ~50 ms. Sortable columns (click any header), live filter box, S-tier-only toggle, tier-coloured badges.

## Top-line findings to remember

1. **Anthropic's own Growth Marketing team is non-technical** and runs the same channel mix as SEONGON (paid search, paid social, mobile app, email, SEO). Documented impact: ad copy 2hr → 15min, 10x creative output. Strongest precedent.
2. **Ayima (UK SEO agency) has formalized a 4-week Claude-for-SEO programme** — closest agency analog. Documented per-task savings: tech SEO brief 3-5hr → 20min; schema review 30-60min → 3min.
3. **Mature open-source skill ecosystems** exist for both ads (claude-ads, 250+ checks) and SEO (claude-seo + superseo-skills + seo-geo, 50+ skills combined). SEONGON forks rather than builds from scratch.
4. **HeyOz Meta Ads suite** (10 skills) aggregates to **25–30 hr/wk recovered per ad-ops staffer** = $2,500–4,500/wk in agency billing rates.
5. **Monthly billable hours per SEO retainer**: 20–30 → 6–8 hours documented (Michael Patrick Cortez 2026 guide).
6. **GEO (Generative Engine Optimization)** is a strategic upgrade path not yet productized in the Vietnamese market — first-mover opportunity for SEONGON.

## Recommendation shape (preview)

Three-tier adoption:
- **Tier 1**: existing AI/eng team, builds infrastructure (skill repos, MCP servers, governance)
- **Tier 2**: ~15 senior power users (1–2 per discipline), build agency Claude Skills as durable IP
- **Tier 3**: ~100+ production marketers, consume skills via Claude.ai/Cowork (not CLI)

Pilot sequence prioritizes **SEO + Google Ads first**, Facebook Ads second (with explicit compliance design), then expands into productized new service lines (GEO consulting, Brand Strategy Sprint, AI Search Visibility Dashboard).

Detail in `09-seongon-fit-assessment.md`.

## Open questions for SEONGON-internal phase

These need internal data, not desk research:

1. Current per-account fulfillment hours (baseline for time-savings projection)
2. Current client mix by martech stack (drives integration build order)
3. Vietnamese AI-content detector landscape (drives anti-slop layer design)
4. Client appetite for GEO consulting (drives Phase 3 pilot scope)
5. Internal change-management capacity (drives realistic timeline)
