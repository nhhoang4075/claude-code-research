# Master Workflows Table

Every Claude Code workflow encountered in research, with metadata. Sorted by discipline → workflow type. Where time-savings are reported, source is cited; absent values mean the source didn't quantify it.

**Columns:**
- **Discipline** — paid-search / paid-social / seo / analytics / mops / brand / content / cross-cutting
- **Workflow** — short name
- **What it does** — concise summary
- **Tools/MCPs/APIs** — integration layer
- **Time before** — manual baseline
- **Time after** — Claude Code time
- **Replaces** — freelancer/tool/manual process
- **Role fit** — who runs it
- **Compliance notes** — flag if relevant
- **Source** — citation key

---

## Paid search / Google Ads

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| Automated ad copy generation | Sub-agents generate headlines (30 char) + descriptions (90 char), iterates from CSVs of past performance | Google Ads API, Anthropic API, sub-agents | 2 hours | 15 min | Manual ad-copy | Performance marketer | — | Anthropic internal Growth Mktg PDF |
| Multi-platform performance audit | Pulls perf across Google Ads + Meta + LinkedIn, flags issues | TrueClicks (Google Ads MCP), GAQL.app, Meta MCP | 8 hours | 2 hours | Manual audit | Account manager | — | Stormy AI playbook |
| Vibe querying (NL→GAQL) | Translates plain-English questions to Google Ads Query Language | GAQL.app, Google Ads API | 30 min | 15 sec | Manual GAQL writing | Analyst, AM | — | Stormy AI |
| Bid adjustment automation | Pulls keyword performance, applies rules, suggests bids before execution | google-ads (Python), Google Sheets approval | hours | minutes | Manual bid review | PPC manager | Approval loop required | AdventurePPC PPC pro guide |
| Search term mining for negatives | Classifies search terms, suggests negative keywords | Google Ads API | hours | minutes | Manual SQR review | Senior PPC | — | Multiple |
| Weekly client reporting | Pulls 7-day perf, formats, emails branded report | Google Ads + Meta APIs, SMTP, Google Sheets | 3 hours | 4 min | Reporting contractor ($1.5–6k retainer) | AM, ops | — | AdventurePPC 6 workflows |
| Anomaly / spend alerting | Flags 2σ deviations on spend/CTR/CPA/conv vs. 7-day baseline | Google Ads + Meta APIs, email | daily check | automated | Manual eyeballing | Senior PPC | — | Ryze AI |
| Cross-channel attribution check | Compares Google + Meta reported convs vs. actual (GA4/CRM/Shopify) | GA4 + ad APIs + CRM | hours/week | automated | Attribution analyst | Analyst | — | Ryze AI |
| Landing page + tracking QA | Crawls all final URLs, checks status, GTag/Pixel presence, UTMs | HTTP, Playwright | hours | automated | Manual click-through QA | PPC ops | Rate-limit aware | Ryze AI |
| Budget pacing forecast | Daily over/under-pace alerts at 115% / 85% thresholds | Google Ads + Meta APIs, CSV budgets | daily review | automated daily | Manual pacing | AM | — | Ryze AI |
| Full account audit | 80 Google Ads checks across Search/PMax/AI Max/DemandGen/CTV/YT | claude-ads skill, mcp-google-ads (29 tools) | hours/account | minutes | Audit retainer | Senior PPC, agency | — | AgriciDaniel/claude-ads |
| Creative perf breakdown | Ranks ads by ROAS/CTR/CPA, groups by angle/format from naming convention | Google Ads + Meta APIs | hours | automated | Manual analysis | PPC analyst | — | Ryze AI |
| Competitor LinkedIn ad intelligence | Scrapes competitor ads, tracks volume + messaging, branded PDF | Playwright, LinkedIn Ad Library, Vercel/Railway | hours per report | 5 min | Manual research | Agency founder | — | Kamil Rextin / 42 Agency (MKT1) |

---

## Paid social / Meta Ads

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| Mass creative production (Figma) | Generates 100+ ad variants by swapping headlines/descriptions on Figma frames | Figma plugin, Meta API | hours of copy-paste | 0.5 sec/batch (10x output) | Designer mass-production | Performance marketer | — | Anthropic internal Growth Mktg |
| Campaign deployment from manifest | Bulk-creates campaigns/ad sets/ads via Graph API v21.0 with retries | Meta Graph API | 3–4 hours/launch | ~10 min | Media buyer launch ops | Media buyer | API rate limits | HeyOz `/deploy-ads` |
| Daily bleed-check + auto-pause | Monitors 6h spend, pauses zero-conv ad sets over threshold, Slacks alert | Meta API, Slack webhook | 30–45 min daily | ~2 min, scheduled | Manual daily check | Media buyer | Approval-or-execute decision required | HeyOz `/bleed-check` |
| Creative fatigue scan | 7-day rolling trends on hook rate / CTR / CPM / frequency, generates replacement briefs | Meta API | 1–2 hr/week | automated | Manual fatigue review | Senior media buyer | — | HeyOz `/fatigue-scan` |
| ROAS-based budget rebalance | Calculates account ROAS benchmark, shifts budget to top performers via API | Meta API | ~55 min/week | automated | Manual reallocation | Media buyer | Spend-shift cap config | HeyOz `/rebalance` |
| Server-side CAPI setup | Generates server-side event tracking with deduplication for Meta Conversions API | Shopify/Stripe/Node, Meta CAPI | 4–8 hours | ~20 min | Implementation engineer | MarTech eng / consultant | — | HeyOz `/setup-capi` |
| Hook variant generation | 50+ copy variants using PAS / AIDA / BAB / pattern-interrupt, framework-tagged CSV | LLM only | hours per 50 | ~1.75 hr saved per 50 | Copywriter | Copywriter, marketer | — | HeyOz `/hooks` |
| Audience overlap audit | Pulls custom/lookalike + ad-set targeting, runs overlap analysis with Mermaid diagram | Meta API | 2–3 hr/month | automated | Manual architecture review | Senior media buyer | — | HeyOz `/audience-audit` |
| Competitor ad spy | Scrapes competitor ads from Meta Ad Library, diffs vs. baseline, classifies hooks | Meta Ad Library | 2–3 hr/week | automated | Manual scrolling | Media buyer | — | HeyOz `/spy` |
| Weekly Meta report | 7-day metrics, account KPIs, WoW deltas, Slack + markdown | Meta API, Slack | 1–2 hr/week | automated | Manual reporting | AM | — | HeyOz `/weekly-report` |
| 30-day autonomous campaign management | Claude Code runs ad account autonomously for a month | Meta Marketing API, Claude Code, MCP | full-time mgmt | autonomous | Media buyer FTE | Senior, with oversight | High-risk; requires guardrails | Giorgio Liapakis case (Stormy AI) |
| Video creative analytics | Hook-rate + drop-off analysis at video-segment level | Meta API, custom analytics | hours | minutes | Creative analyst | Senior media buyer | — | Mike Futia / Scale AI (Stormy AI) |
| 50–500 ad variations (programmatic) | Programmatic swaps on creative templates, renders to PNG with manifest | Meta API, image gen | hours | ~6 hr saved per 50 | Designer + buyer mass-prod | Hybrid creative-ops | — | HeyOz `/bulk-creative` |
| Customer lookalike outbound | Weekly: pull closed-won from HubSpot, find 10 lookalikes via Clay, draft email + LinkedIn | HubSpot, Clay, Cowork | hours/week | weekly automated | SDR + ABM analyst | Growth marketer | — | Elaine Zelby / Tofu (MKT1) |

---

## SEO

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| Technical SEO audit (full site, 9-cat) | Core Web Vitals + crawl + indexation + schema across 21 sub-skills, 12 subagents in parallel | claude-seo skill, GSC/PSI/CrUX/GA4 + Ahrefs/Semrush MCPs | hours | minutes | Audit retainer | Senior SEO | — | AgriciDaniel/claude-seo |
| Screaming Frog export prioritization | Parses Frog crawl, prioritizes fixes | Screaming Frog export | 45–90 min | 5 min | Manual review | Tech SEO | — | Ayima programme |
| Schema markup validation + generation | Detects, validates, auto-generates JSON-LD | claude-seo schema sub-skill | 30–60 min | 3 min | Manual schema work | Tech SEO | — | Ayima |
| Technical SEO brief (client) | Client-facing brief from data | GSC, Ahrefs, internal | 3–5 hours | 20 min | Senior SEO time | Senior SEO, AM | — | Ayima |
| CTR quick-win audit | Identifies pages ranking well with low CTR | GSC | 2–3 hours | 90 sec | Senior SEO | Tech SEO, content | — | Michael Patrick Cortez |
| Keyword cannibalization detection | Finds queries split across multiple pages | GSC, Ahrefs | 3–4 hours | 2 min | Senior SEO | Tech SEO | — | Michael Patrick Cortez |
| Content gap analysis | Maps missing keyword opportunities vs. competitors | Ahrefs, Semrush, DataForSEO | 4–5 hours | 5 min | Senior strategist | Content strategist | — | Michael Patrick Cortez |
| Content optimization with live SERP | Analyzes competitor content, generates improvement plan | Firecrawl, SERP APIs | 2–3 hours | 5 min | Senior content editor | Content strategist | — | Michael Patrick Cortez |
| Internal linking audit + opportunities | Maps link structure, surfaces strategic placements | Crawler + custom logic | 3–6 hours | 10 min | Senior SEO | Tech SEO | — | Michael Patrick Cortez |
| Content brief generation (writer-ready) | SERP gap + competitor analysis → brief | DataForSEO/Semrush, scrapers | 3–4 hours | <10 min | Content strategist ($80–200/hr) | Content strategist, AM | — | SE Ranking + AdventurePPC |
| Backlink analysis + presentation | Profile + referring domain analysis, client deck | SE Ranking, Moz, Bing, Common Crawl | full day | minutes | Senior SEO + presenter | Account director, senior SEO | — | SE Ranking |
| AI search visibility (GEO) reporting | Brand mention tracking across ChatGPT/Perplexity/Gemini/AIO | SE Ranking AI Search endpoints | hours | automated | Manual checks | GEO specialist | — | SE Ranking + AgriciDaniel/claude-seo (seo-geo) |
| E-E-A-T audit | 80-item content benchmark + 40-item domain trust = 120 quality gates | aaron-he-zhu CORE-EEAT + CITE | hours | automated | Senior content auditor | Content strategist | — | aaron-he-zhu/seo-geo-claude-skills |
| Local SEO audit | GBP, NAP consistency, citations, reviews | claude-seo seo-local subagent | hours | minutes | Local-SEO specialist | Local SEO | Hard stop at 50+ locations | AgriciDaniel/claude-seo |
| Programmatic SEO planning | Data-driven page generation with quality safeguards (warning at 100+, hard stop at 500+) | claude-seo seo-programmatic | weeks of human design | hours | Strategist + dev | Senior SEO | Quality gates required | AgriciDaniel/claude-seo |
| International / hreflang validation | Multi-language hreflang + cultural profiles | claude-seo seo-hreflang | hours | minutes | International SEO consultant | Senior SEO | — | AgriciDaniel/claude-seo |
| Anti-AI-slop content writing | Tiered banned-vocabulary + Horoscope Test + voice injection | superseo-skills | manual editing | per-piece automated | Editor doing AI cleanup | Content team | — | inhouseseo/superseo-skills |
| Featured snippet optimizer | Answer-block rewrites for snippet wins | LLM + SERP data | hours | minutes | Senior SEO | Content team | — | superseo-skills |
| Topic cluster planning | Hub-and-spoke architecture with publishing order | LLM + keyword data | days of strategy work | hours | Senior strategist | Content strategist | — | superseo-skills |
| Drift monitoring | Baseline + change detection over time | claude-seo seo-drift | weekly review | continuous | Manual monitoring | Tech SEO | — | AgriciDaniel/claude-seo |
| Competitor "X vs Y" pages | Auto-generates comparison + alternatives pages | claude-seo seo-competitor-pages | days/page | hours | Content + designer | Content team | — | AgriciDaniel/claude-seo |
| Image SERP optimization | Alt text, compression, AVIF/WebP, image SERP analysis | claude-seo image sub-skill | hours/100 images | minutes | Manual image SEO | Content ops | — | AgriciDaniel/claude-seo |

---

## Analytics / attribution

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| GA4 audit (4-min) | Custom dimensions, channel groupings (incl. AI Traffic), enhanced measurement, gaps, tag firing, consent | analytics-mcp, Chrome ext | 1+ hour | 4 min | Senior analyst | Analyst | — | measureu.com |
| Cross-channel attribution analysis | W-shaped / multi-touch with custom weighting | Improvado / Coupler.io + Claude Code | days | seconds | Attribution analyst | Senior analyst | — | Improvado |
| AI Search performance dashboard | Live artifact dashboard from SE Ranking MCP data | SE Ranking MCP | hours | 15 min | Dashboard contractor | Analyst | — | SEO Francisco |
| Campaign anomaly detection | Detects metric spikes exceeding thresholds across channels | Improvado MCP, GA4 | manual review | continuous | Manual eyeballing | Marketing ops | — | Improvado |
| Pre-launch validation | Naming-convention + UTM completeness checks before launch | UTM validators | manual QA | automated | Marketing ops manager | Marketing ops | — | Improvado |
| Marketing analyst agent | Skill bundle covering reporting, attribution, audits | rohitg00 toolkit (marketing-analyst.md) | senior analyst time | agent-driven | Junior analyst hire | Senior analyst, ops | — | rohitg00/awesome-claude-code-toolkit |
| Multi-source live analytics chat | Stream 480+ GA4 dims/metrics + 325+ data sources to Claude | Windsor.ai MCP | hours | seconds | Data team query queue | Marketing leader | — | Windsor.ai |

---

## Marketing ops / MarTech / CRM

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| Lead scoring + CRM enrichment | Enriches with firmographic + behavioral signals, scores with reasoning | HubSpot/SF/Pipedrive + Clearbit/Apollo/LinkedIn | weeks | one-time build | RevOps contractor ($5–15k) | RevOps, ops | — | AdventurePPC |
| Account scoring (CRM + intent) | ICP scoring model from CRM + intent signals; flags logic gaps | HubSpot, intent providers | weeks of manual scoring | automated | ABM analyst | RevOps | — | Coupler.io / Improvado |
| Email sequence personalization | Sequence architecture + copy with behavioral triggers | Klaviyo/AC/HubSpot/MC APIs | weeks/campaign | one-time build | Email specialist ($3–8k/campaign) | Email marketer | — | AdventurePPC |
| Competitor monitoring + intelligence brief | Diffs pricing pages, ad libraries, content; weekly briefing | Playwright, Meta Ad Library, RSS, Alerts | weeks | one-time build | Analyst retainer ($1–3k/mo) | Senior strategist | — | AdventurePPC |
| Customer-call synthesis | Identifies patterns from meeting recordings | Granola, Fireflies (MCP) | hours of listening | minutes | Senior PM/AM | Senior leader | — | Lenny + Dan Shipper |
| HubSpot connector workflows | Tailored summaries, visualizations, in-CRM actions | HubSpot Claude connector | manual CRM work | conversational | CRM admin time | RevOps, marketer | — | HubSpot KB |

---

## Brand / PR / Digital Branding

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| Brand guidelines as Claude Skill | Package colors, fonts, logos, voice rules into reusable skill | Claude Skills | re-explaining brand each task | one-time setup | Brand-review meetings | Brand lead, designer | — | Anthropic resources / aiblewmymind |
| Brand strategy living doc | 7-exercise skill: company overview, ICP, advantages, perceptions, positioning, revenue levers, big bets | Claude Code skill, MKT1 MCP server | weeks of strategy doc work | sequential exercises | Strategy consultant | CMO, strategist | — | Emily Kramer / MKT1 |
| Competitive intel brief (CEO-ready) | Synthesizes competitor websites + messaging vs. positioning | Firecrawl, Perplexity | 90 min | 10 min | Strategist | Brand lead | — | Stack and Scale |
| Content repurposing engine | One blog → 6 channel-ready assets (LinkedIn, X, email, paid social, sales 1-pager) | LLM only | full afternoon | 15 min/blog | Channel specialist | Content marketer | — | Stack and Scale |
| Friday executive deck | Reads CSVs, generates presentation with charts + strategic interpretation | LLM + chart libs | 90 min/week | 5–15 min/week | BI analyst time | Marketing leader | — | Stack and Scale |
| GEO brand visibility audit | Tracks brand mentions in ChatGPT/Perplexity/Gemini answers | SE Ranking AI Search, dedicated MCPs | manual queries | automated | Manual GEO checks | GEO specialist | — | nex.ad + claude-seo seo-geo |
| Brand voice + style consistency | `/style-check` validates new content against guidelines | Animalz `/generate-style-guide` + `/style-check` | manual editing | automated | Editor pass | Content team | — | Animalz |

---

## Content marketing

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| Article creation (8-phase) | Foundation → Thesis → Structure → Research → Outline → Intro → Drafting → Review | Animalz `/write` | days/article | hours | Junior writer cycles | Content team | — | Animalz |
| Conversion copy (7-phase) | Conversion-tested copy with quality rules | Animalz `/copywrite` | hours | minutes | Conversion copywriter | Conversion specialist | — | Animalz |
| Content audit | Blog export → structural issues + decay flags | Sheets/CSV | hours of spreadsheet | minutes | Editor audit | Content lead | — | Animalz |
| Audience research | Aggregates questions from forums + communities | Web scrapers, Reddit/Quora APIs | hours | minutes | Researcher | Strategist | — | Animalz |
| Image prompt builder | Production-quality prompts for AI image gen with brand library | LLM + image gen pipeline | per-image manual | reusable | Designer prompts | Designer + content team | — | Animalz |
| Newsletter ops (full agentic) | ~80% of newsletter ops in Claude Code (research, drafts, thumbnails, LinkedIn carousels) | Claude Code + multiple MCPs | full ops team | one-person | Newsletter team | Newsletter ops | — | aimaker (Substack) |
| Humanizer skill | Scores AI-gen copy for authenticity, rewrites | LLM + scoring framework | manual editing cycles | automated | Editor cleanup | VP/Director Marketing | — | Aditya Vempaty (MKT1) |
| Substack competitive analysis | DNA extraction: audience, voice, gaps, themes (17-page report) | Cowork sandbox | days | 1 prompt → report | Researcher + analyst | Newsletter founder | — | aimaker (Substack) |
| Trending research + repurpose | Skills for trending topic discovery + multi-platform publishing | Claude Skills | hours/week | automated | Social media manager | Content marketer | — | MindStudio |
| Marketing site build (no devs) | Full marketing site from spec | Claude Code + Vercel | weeks of dev | days | Designer + dev + copywriter | Founder/marketer | — | Growth Marketer (cited in Stormy) |
| Lead magnet builder | Interactive HTML quizzes, calculators, audits with email gate | Claude Code + landing page deploy | weeks dev work | one session | Designer + dev | Marketer | — | HubSpot MATG course |
| Landing page in one session | "Ship a Landing Page in One Session" workflow | Claude Code + deploy | days | one session | Designer + dev | Marketer | — | HubSpot MATG course |

---

## Cross-cutting (foundational evidence)

| Workflow | What it does | Tools/MCPs/APIs | Time before | Time after | Replaces | Role fit | Compliance | Source |
|---|---|---|---|---|---|---|---|---|
| Marketing-analyst agent (toolkit) | Reusable marketing-analyst persona | rohitg00 toolkit | senior analyst | agent-driven | Junior analyst hire | Marketing leader | — | rohitg00 |
| Plan-then-implement two-step | Plan in Claude.ai, implement in Claude Code | Both | one-shot prompting failures | structured | Iteration loops | All roles | — | Anthropic Legal team |
| Visual-first iteration (screenshots) | Show Claude what UIs should look like; iterate visually | Screenshots in CC | text-only describe | visual feedback | Designer mockup cycles | All roles | — | Anthropic Product Design + Legal |
| Sub-agent delegation | Specialized agents per task (e.g., headline agent vs. description agent) | Claude Code sub-agents | one-shot prompts | parallel agents | Senior consultant | Power user | — | Anthropic Growth Mktg |
| Memory system for experiments | Logs hypotheses + iterations into context for self-improving runs | Claude Code memory | manual notes | persistent | Test ops engineer | Senior marketer | — | Anthropic Growth Mktg |
| Data-pipeline plain-text workflows | Non-technical staff describe data workflows in plain text; Claude Code executes | Claude Code | dependence on data team | self-serve | Data eng requests | Finance/non-tech staff | — | Anthropic Data Infra team |
| Customer call → action items | Synthesizes meeting recordings | Granola, Fireflies MCP | hours of listening | minutes | Note-taking | Senior leader | — | Dan Shipper / Lenny ep |
| Codebase analysis for outbound | Reads app codebase to identify pilot customer fits | Local file access | hours | minutes | Founder discovery time | Founder | — | Jeff Lindquist (Lenny ep) |
| Voice → article outline (style-matched) | Voice memos transcribed + organized into outlines matching writing style | Voice transcription + LLM | hours | minutes | Editor cycles | Writer/founder | — | Helen Lee Kupp (Lenny ep) |
| Doc gap auditor | Browses live docs via Playwright, finds gaps, proposes improvements | Playwright | weekly review | autonomous | Tech writer | Tech writer | — | James Pember (Lenny ep) |

---

## Summary roll-up

Total workflows extracted: **~85**
Disciplines covered: 7
Sources cited: 30+
Highest-confidence quantitative claim: **HeyOz Meta Ads suite recovers 25–30 hr/week ($2,500–4,500 in agency billing)**
Highest-credibility precedent: **Anthropic's own Growth Marketing team (non-technical, same channel mix as SEONGON)**
