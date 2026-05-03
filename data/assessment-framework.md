# Source Assessment Framework

**Purpose**: Not every source we collected is equally useful for the SEONGON adoption decision. This framework grades each source on **7 dimensions** producing a composite score (0–35), and labels each source with a recommended **Use** (HEADLINE / SUPPORT / CONTEXT / SKIP). The proposal should be built primarily from sources with high composite scores and a HEADLINE or SUPPORT tag.

The spreadsheet also includes **3 identity columns** so a reader can judge *who* is making each claim and *what reputation signals* support (or weaken) their voice — independent of the numerical scores I assigned.

---

## The 3 identity columns

These come before the numerical dimensions. Their job is transparency: every claim in the proposal should be defensible by pointing at *who said it* and *why their voice matters*.

### Author
The named person, organization, or GitHub user actually making the claim. Where a real name is publicly attached, it's used. Where only a handle/brand is public ("AgriciDaniel", "Stormy AI", "HeyOz"), the handle is used and noted as such — no fabricated identities.

### Role
What the author does professionally — what makes them entitled to speak on the topic. Examples:
- "AI-lab vendor publishing first-party internal-team adoption report" (Anthropic)
- "Established UK SEO agency formalizing Claude Code training" (Ayima)
- "Senior marketing operator + advisor + newsletter publisher" (Emily Kramer / MKT1)
- "Solo marketing practitioner + Substack publisher" (Sarah Noel Block)

### TrustSignals
1–3 short concrete signals that a reader can use to weigh credibility. These are observable facts about the source, not opinions:
- Track record ("agency operating since 2007", "ex-Asana CMO")
- Verifiability ("code-as-evidence — every claim is verifiable in the repo")
- Conflicts ("vendor of an MCP server they describe — direct commercial interest")
- Independence ("free 30-day trial — claims directly verifiable")
- Methodology ("methodology cites Koray Tuğberk / Kyle Roof / Lily Ray")

When trust signals point in conflicting directions (e.g., high authority + low independence), they're listed honestly so the reader can weigh both.

---

## The 7 dimensions

Each dimension is scored **1 (worst) → 5 (best)**. The scoring rubric for each:

### A. Authority — credibility of the source itself
| Score | Description |
|------:|-------------|
| 5 | Primary research from the platform vendor (Anthropic), peer-reviewed academic, or a major industry publication's editorial standard (e.g., Search Engine Land, MarTech) |
| 4 | Established practitioner with demonstrated agency operations + professional reputation (Ayima, AdventurePPC, MKT1, Animalz, Lenny) |
| 3 | Solo practitioner blog with traceable identity and domain expertise |
| 2 | Newer / niche practitioner blog with limited track record |
| 1 | Anonymous, thinly-credentialed, or low-effort content |

### B. Specificity — concreteness of the data
| Score | Description |
|------:|-------------|
| 5 | Exact metrics with workflow detail (e.g., "ad copy 2h → 15min, sub-agent architecture for headlines vs. descriptions") |
| 4 | Specific named workflows with measured outcomes |
| 3 | Specific named workflows without measured outcomes |
| 2 | Generic categorical claims |
| 1 | Vague enthusiasm with no operational detail |

### C. Independence — vested interest in promoting Claude Code
| Score | Description |
|------:|-------------|
| 5 | No commercial interest at all — pure user case study |
| 4 | Industry observer (publication writing about the space) |
| 3 | Practitioner who uses Claude Code but doesn't sell it |
| 2 | Vendor of an adjacent tool (HubSpot, Coupler, Improvado, Windsor) |
| 1 | Vendor of the tool being assessed (Anthropic's own marketing) |

> **Note**: a low Independence score doesn't disqualify a source — Anthropic's internal-team report scores 1 on Independence but 5 on Authority. The framework deliberately separates these so we don't lose either signal.

### D. Recency — when measured / published
| Score | Description |
|------:|-------------|
| 5 | Published or measured in 2026 |
| 4 | Late 2025 (Q3–Q4) |
| 3 | Mid 2025 (Q2) |
| 2 | Early 2025 (Q1) or content covering older Claude versions |
| 1 | 2024 or earlier — likely covers tooling or behavior since changed |

### E. Verifiability — can the claim be checked?
| Score | Description |
|------:|-------------|
| 5 | Open-source code or public dataset |
| 4 | Live demo / public artifact / live product accessible |
| 3 | Detailed methodology described, even if not reproducible |
| 2 | Self-reported with no verification path beyond author's word |
| 1 | Anecdotal with no specifics |

### F. SEONGON service match — direct relevance to billable services
| Score | Description |
|------:|-------------|
| 5 | Direct match to SEO / Google Ads / Facebook Ads / Digital Branding |
| 4 | Cross-cutting that compounds across services (analytics, marketing-ops) |
| 3 | Adjacent service (content marketing, email) |
| 2 | Tangential (CRM, B2B-ABM, demand gen) |
| 1 | Unrelated (personal-life use, software-engineering-only) |

### G. Decision impact — usefulness for the adoption proposal
| Score | Description |
|------:|-------------|
| 5 | Directly answers "should we adopt and how?" — the headline of a proposal page would cite it |
| 4 | Provides ROI / cost / time numbers for the financial case |
| 3 | Provides workflow templates / patterns to fork |
| 2 | Provides demand-signal / market context |
| 1 | Ambient interest only |

---

## Composite score interpretation

**Composite** = sum of 7 dimensions. Range: 7–35.

The score is a continuous signal, not a tier. Treat it as a guide:

| Range | Quality of evidence | Recommended use |
|-------|---------------------|-----------------|
| **28–35** | High-confidence headline evidence | Lead the proposal with these. Cite by name in exec summary. |
| **21–27** | Solid supporting evidence | Use in body sections. Triangulate against high scorers. |
| **14–20** | Weak / context-only | Background reading; do not cite as primary evidence. |
| **≤13** | Skip | Mention only if specifically asked; do not build claims on. |

**No source is auto-disqualified by one low dimension.** A vendor publication (Independence=1) can still score high if Authority + Specificity + Recency + Verifiability are all 5s. Conversely, a high-Independence solo-practitioner anecdote (low on Specificity + Verifiability) won't reach 28 even with 5s on Independence and Match.

---

## Use classification

Each source is tagged with how it will be used. Use is the practical "what do I do with this source" label — distinct from the score.

| Tag | Meaning |
|-----|---------|
| **HEADLINE** | This source is named in the executive summary or feature stat |
| **SUPPORT** | Cited in body sections to back specific claims |
| **CONTEXT** | Provides background for understanding the ecosystem; not cited as evidence |
| **SKIP** | Not recommended for use; included for completeness |

Most sources scoring 28+ are HEADLINE. Sources scoring 21–27 are typically SUPPORT. Below that, CONTEXT or SKIP.

---

## How to use this framework

1. **Read the spreadsheet first** (`source-assessment.csv` or `source-assessment.md`).
2. **Read Author/Role/TrustSignals before the scores.** The numerical scores are summaries of those signals — you should be able to look at the identity columns and (mostly) predict the scores. Where the identity columns surprise you, that's where to dig deeper.
3. **Sort by Total descending** to see the strongest evidence at the top.
4. **Filter by Discipline = `SEO`** (or `GADS`, `META`, `BRAND`) to see what's available for each service-line claim.
5. **Filter to Total ≥ 28** to see the ~10–15 sources the proposal should be primarily built on.
6. **Don't trust a single source for a critical claim**. If a number anchors the proposal, verify it appears in at least 2 sources (one of which should score 21+) and at least one of them should be a high-Independence source (≥3) so it isn't all vendor-derived.

### When adding new sources

Score them on all 7 dimensions. Don't tier them subjectively — let the math decide. If the math gives a tier that feels wrong, the dimensions are likely mis-scored and need adjustment.

### When two sources contradict

Higher composite wins. If composites are tied (within 2 points), prefer:
1. Higher Authority
2. Then higher Independence (less vested interest)
3. Then higher Verifiability

---

## Caveats and limitations

- **Self-report bias**: many practitioner blogs report time-savings without independent verification. The Verifiability dimension partially offsets this, but the entire body of practitioner data is correlated — they're all reporting on the same tool's capabilities.
- **English-language bias**: 100% of these sources are in English. Vietnamese-market dynamics may differ in ways this evidence base doesn't capture. SEONGON's internal-phase data collection (the Q1–Q5 open questions) is what closes that gap.
- **Recency drift**: Claude Code is evolving fast. Sources from H1 2025 may already describe tooling that has been superseded. Rescore quarterly.
- **Discipline coverage**: SEO and paid media are over-represented in the source pool because the open-source ecosystem is most mature there. Marketing-ops and brand are under-represented — this should inform pilot sequencing, not the existence of the opportunity.

---

## Files in this layer

| File | Purpose |
|------|---------|
| `assessment-framework.md` | This document — the rubric |
| `source-assessment.csv` | The graded spreadsheet (open in Excel/Numbers/Sheets) |
| `source-assessment.md` | The same data rendered as a markdown table for in-repo browsing |
| `workflows-table.md` | Master workflows table (pre-existing) — different unit of analysis: per-workflow rather than per-source |
