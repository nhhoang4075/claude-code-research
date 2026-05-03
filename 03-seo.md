# SEO + GEO — Claude Code Adoption Evidence

**SEONGON relevance:** Highest. SEO is SEONGON's largest service line (900+ projects, "largest SEO agency in Vietnam"). Also the discipline with the **richest open-source Claude Code ecosystem**.

---

## Why this is the most important section

Three specific reasons SEO is the discipline with the strongest Claude Code adoption case for SEONGON:

1. **Direct precedent: Ayima (UK SEO agency)** has formalized a 4-week Claude-for-SEO programme for their team — the closest analog to SEONGON's situation.
2. **Three production-grade open-source skill kits** exist (combined: 50+ SEO skills, 27+ subagents). SEONGON can fork and localize rather than build from scratch.
3. **GEO (Generative Engine Optimization)** is a strategic inflection. Every SEO Claude Code resource treats it as a first-class capability — and few Vietnamese agencies have GEO productized as a service line yet.

---

## Open-source skill ecosystem — three reference implementations

### `claude-seo` (AgriciDaniel) — most comprehensive

- **21 sub-skills**: technical SEO, on-page, E-E-A-T, schema markup, image optimization, sitemap architecture, AI search (GEO), local SEO, maps intelligence, semantic clustering, search experience optimization (SXO), drift monitoring, e-commerce SEO, international SEO + hreflang, FLOW framework, Google SEO APIs, PDF report generation, programmatic SEO, competitor pages, backlink analysis, strategic planning.
- **15 specialized subagents** (run in parallel under `seo-audit` orchestrator).
- **3 extensions**: DataForSEO (22 commands across 9 API modules), Firecrawl (full-site crawl), Banana (AI image gen for SEO assets).
- **Integrations**: Google Search Console, PageSpeed, CrUX, Indexing API, GA4, Keyword Planner; Ahrefs, Semrush, DataForSEO MCP servers; Moz, Bing, Common Crawl for backlinks.
- **Quality gates**: programmatic SEO warns at 100+ pages, hard stop at 500+. Local SEO warns at 30+ locations, hard stop at 50+.
- **Core Web Vitals targets**: LCP <2.5s, INP <200ms, CLS <0.1.

This is essentially a free, open-source SEO agency tech stack. The gap to SEONGON-grade production is **localization to Vietnamese-language entities, Vietnamese SERP, .vn TLD specifics, local citation networks, Cốc Cốc considerations**.

### `superseo-skills` (InhouseSEO agency) — production-tested

- **11 skills**: page-audit, content-brief, write-content, improve-content, keyword-deep-dive, semantic-gap-analysis, eeat-audit, topic-cluster-planning, featured-snippet-optimizer, linkbuilding, expert-interview.
- **Methodologies**: POP test (page-audit), Information Gain (content writing), E-E-A-T (audit + signal embedding).
- **Anti-AI-slop ruleset**: tiered banned vocabulary, structural pattern detection, **the Horoscope Test**, voice injection, search intent matching.
- **Provenance**: production-tested at the InhouseSEO agency.

The anti-slop ruleset is particularly valuable for an agency like SEONGON — it's the difference between AI-generated content that works and content that gets flagged by Google's AI-content filters.

### `seo-geo-claude-skills` (aaron-he-zhu) — GEO-first design

- **20 skills across 4 phases**: Research (4) → Build (4) → Optimize (4) → Monitor (4).
- **+4 cross-cutting protocol skills**: content-quality-auditor (CORE-EEAT 80-item benchmark), domain-authority-auditor (CITE 40-item trust framework), entity-optimizer (canonical entity profiles), memory-management (HOT/WARM/COLD project context).
- **Combined evaluation**: 120-item assessment when both auditors run.
- **Multi-agent compatibility**: works with Claude Code, OpenClaw, Gemini CLI, Qwen Code, Amp, Kimi Code CLI, CodeBuddy, Cursor, Codex, Windsurf, Cline, Copilot — 35+ agents total.

---

## Direct agency precedent — Ayima programme

Ayima is a UK-based SEO agency. They published a 4-week, 8-tutorial **Claude for Technical SEO programme**. Closest analog to SEONGON's situation.

- **Target audience**: SEO professionals who already know their craft. Segmented by role (account managers, technical SEOs, analysts).
- **Two tracks**:
  - **Efficiency Track** (all team members): prompting fundamentals → SEO workflows + prompt library → deeper analysis → team standardisation.
  - **Build Track** (analysts/technical staff): Claude Code setup → internal linking tool → API-powered tools → advanced builds + capstone.
- **Documented time-savings** (from their programme materials):

| Task | Before | After |
|---|---|---|
| Screaming Frog export prioritization | 45–90 min | 5 min |
| Technical SEO brief | 3–5 hours | 20 min |
| Schema review | 30–60 min | 3 min |

- **Positioning thesis**: "Claude works best when the person using it brings deep domain expertise" — Claude as amplifier of existing SEO skill, not replacement.
- **Agency-specific framing**: shared Projects, prompt libraries, SOPs for multi-person workflows.

For SEONGON, this is essentially a **template programme** they could adapt directly to internal training in Vietnamese.

---

## Per-task time-savings (cross-source consensus)

From Michael Patrick Cortez's 2026 SEO workflow guide and SE Ranking blog, with cross-references to the open-source skill kits:

| Workflow | Before | After | Source |
|---|---|---|---|
| CTR quick-win audit | 2–3 hours | 90 sec | MPC |
| Keyword cannibalization detection | 3–4 hours | 2 min | MPC |
| Content gap analysis vs. competitors | 4–5 hours | 5 min | MPC |
| Technical SEO audit from crawl | 3–6 hours | 10 min | MPC |
| Content optimization with live SERP | 2–3 hours | 5 min | MPC |
| Content brief generation | 3–4 hours (senior) | <10 min | SE Ranking |
| Backlink analysis + presentation | full day | minutes | SE Ranking |
| **Total monthly billable hours per account** | **20–30 hours** | **6–8 hours** | MPC |

The bottom-line monthly figure (20–30 → 6–8 hours per SEO retainer) is the single most powerful number for SEONGON's economics. At their scale (900+ projects), even a fraction of this gain compounds into hundreds of recovered FTE-hours/month.

---

## GEO (Generative Engine Optimization) — the strategic angle

Every SEO Claude Code resource treats GEO as a first-class capability:

- `claude-seo` has a dedicated `seo-geo` subagent for AI Overviews / ChatGPT / Perplexity targeting.
- `seo-geo-claude-skills` is named for the framework.
- SE Ranking ships AI Search endpoints for cross-LLM brand mention tracking.
- nex.ad publishes a guide specifically on getting brands to surface in Claude's answers.

**The strategic shape for SEONGON**:

1. **Defensive**: Vietnamese search traffic erosion as AI Overviews and ChatGPT capture queries upstream of Google's blue links. SEONGON's core SEO retainers will face downward pressure on click-through-rate metrics within 12–24 months.
2. **Offensive**: Productize **GEO consulting as a new service line** for Vietnamese-market clients before competitors do. Use the open-source GEO skill libraries as the technical base.

**GEO service line composition (sketch)**:
- AI search visibility audit (which prompts surface the brand across Claude/ChatGPT/Gemini/AIO)
- Entity optimization (Wikipedia, Wikidata, structured presence)
- Citation engineering (getting featured in AI training corpora)
- Schema-markup uplift for AI consumption
- Monitoring dashboard with brand mention tracking

**Pricing reference**: comparable to current SEO retainer pricing, possibly premium given novelty.

---

## Operating-model implications for SEONGON

### Tooling stack

| Layer | Recommendation |
|---|---|
| Skill kit base | Fork all three open-source kits; merge into `seongon-seo` with localization |
| Crawl infrastructure | Firecrawl MCP + Screaming Frog desktop |
| SERP / keyword data | DataForSEO MCP; Ahrefs MCP for clients with Ahrefs subscriptions |
| Search Console | Composio GSC MCP per client |
| Analytics | GA4 via Windsor.ai or analytics-mcp |
| Reporting | WeasyPrint PDFs (via `claude-seo`) + Google Slides for client decks |
| Anti-slop content layer | Adapt `superseo-skills` Horoscope Test for Vietnamese |

### Process shifts

- **Senior SEOs become skill-builders** rather than per-task executors. Their output is `.md` skill files in shared Git repos.
- **Junior SEOs become skill-runners**. They know enough to QA outputs and request remediation.
- **Account managers run /seo audit on prospects pre-pitch.** Massively raises the credibility of inbound proposals.
- **Reporting cadence shifts from monthly to weekly or even daily** because the cost dropped to near-zero.

### Vietnamese-localization gaps to fill

What SEONGON would need to add to the open-source base:

1. Vietnamese-language tokenization for content quality skills (E-E-A-T scoring, anti-slop)
2. Cốc Cốc-specific considerations (Vietnamese search engine; minor share but matters for some verticals)
3. Vietnamese local-citation networks (foody.vn, local directories, Vietnamese-language review sites)
4. Vietnamese-business schema patterns
5. Vietnamese-language brand-mention monitoring across AI engines

These are the kinds of contributions that turn open-source forks into proprietary IP.

---

## Suggested SEONGON pilot scope (SEO slice)

**Pilot team**: 2 senior SEOs (one technical, one content) + 1 account manager + AI eng support. Cap at 5 people for the pilot.

**Pilot duration**: 6 weeks.

**Targets**:
- Fork + adapt `claude-seo` to `seongon-seo` (week 1–2)
- Run `/seo audit` against 10 active client sites (week 3)
- Compare outputs to most recent manual audits — quality + completeness
- Deploy `/content-brief` and `/keyword-deep-dive` skills to 3 content writers
- Train all SEO staff on prompt library + Ayima-style efficiency track materials (week 4–6)

**Decision gate after week 6**:
- If audit quality matches or exceeds current senior-SEO output, expand to all SEO staff.
- If GEO experiments show traction with 1–2 willing clients, design GEO service line and price it.

**Adjacent decision**: do we also fork `superseo-skills` for content production? Likely yes — the anti-AI-slop ruleset is unusually well-developed.

---

## Sources

- AgriciDaniel/claude-seo — https://github.com/AgriciDaniel/claude-seo
- inhouseseo/superseo-skills — https://github.com/inhouseseo/superseo-skills
- aaron-he-zhu/seo-geo-claude-skills — https://github.com/aaron-he-zhu/seo-geo-claude-skills
- Ayima — *Claude for Technical SEO* — https://www.ayima.com/claude-seo/
- Michael Patrick Cortez — *Claude AI for SEO: Complete Workflow Guide (2026)* — https://michaelpatrickcortez.com/blog/claude-ai-for-seo/
- SE Ranking — *Claude Code & SE Ranking MCP* — https://seranking.com/blog/claude-code-for-seo/
- Pasquale Pillitteri — *Claude Code for SEO Complete Guide* — https://pasqualepillitteri.it/en/news/485/claude-code-seo-serp-complete-guide
- claude-seo.md (free tool) — https://claude-seo.md/
- nex.ad — *How to make your brand show up in Claude answers* — https://nex.ad/blog/how-to-make-your-brand-show-up-in-claude-answers (GEO reference)
