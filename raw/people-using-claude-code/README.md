# Raw research — How people actually use Claude Code

Two raw outputs from research agents launched 2026-05-05 covering:

1. **`01-technical-luminaries-raw.md`** — Named technical luminaries (researchers, ex-FAANG, AI thought leaders, prolific OSS authors) and their public Claude Code workflows. **8 well-sourced individuals**: Karpathy, Simon Willison, Mitchell Hashimoto, Boris Cherny, Geoffrey Litt, Armin Ronacher, Steve Yegge, Edward Z. Yang. **Dropped for lack of evidence**: Carmack, Hightower, Cassidy Williams, Abramov, Markbåge, Beyang Liu (works on competitor), Trenton Bricken.

2. **`02-leaders-non-marketing-raw.md`** — Non-engineer CEOs / marketers / business leaders using Claude Code for things that AREN'T direct marketing work (personal infrastructure, strategy coaching, side projects, ops automation). **7 well-sourced**: Matt Mullenweg, Casey Newton, Lenny Rachitsky, Garry Tan, Sahil Lavingia, Pieter Levels, Aravind Srinivas. **Flagged**: Drew Houston (workflow real but tool attribution to Claude Code unclear). **Dropped**: Patrick Collison, Naval Ravikant, Marc Andreessen, Sam Altman, April Dunford, Rand Fishkin, Amanda Natividad, Tony Dinh, Marc Lou.

## Why raw

User feedback from earlier sweep: "I need raw data first." Synthesis only after raw is reviewed and URLs spot-checked.

Both files include:
- **Body** — verbatim agent output with direct quotes, URLs, and per-person workflow detail
- **Patterns** section synthesizing what's common across the named individuals
- **Flagged uncertainty** from agent — quotes/URLs the agent rated low confidence
- **Audit notes** — concrete `[ ]` checklist of URLs/IDs to verify before any external citation

## Important null findings (worth surfacing before synthesis)

These came from explicit agent searches that returned no usable evidence:

1. **No Vietnamese C-level peer adoption signal** — searched FPT, VNG, Tiki, Shopee VN; nothing. SEONGON would be first-mover in publishing Vietnamese-market thought-leadership at C-level.
2. **Famous "AI-using CEOs" mostly use ChatGPT/general LLM, not Claude Code by name** — Houston, Collison, Naval, Andreessen, Altman all discuss AI but don't publicly attribute Claude Code specifically. Narrative narrower than headlines.
3. **Non-engineer leaders who DO use Claude Code skew indie/founder/journalist, not F500 CEO** — Mullenweg (Automattic ~2000 ppl, but distributed remote-first), Newton (~3 ppl Platformer), Levels (solo), Lavingia (Gumroad ~10 ppl). Pattern: laptop-as-work-surface, not corporate IT.
4. **Several "obvious" candidates have no first-person Claude Code material** — Cassidy Williams, Dan Abramov, John Carmack, Kelsey Hightower (technical side); April Dunford, Rand Fishkin, Sam Altman, Naval (leader side). Worth knowing explicitly so SEONGON doesn't waste time looking.

## High-priority audit list

If verifying URLs before external citation, prioritize these load-bearing claims:

**Technical (file 01):**
- [ ] Karpathy X post `2015883857489522876` — load-bearing for "80→20 shift" stat
- [ ] `howborisusesclaudecode.com` — verify domain exists, cross-reference with Pragmatic Engineer / Lenny interviews
- [ ] Armin Ronacher `lucumr.pocoo.org/2025/12/...` posts — verify slugs (lucumr.pocoo.org IS Ronacher's blog)
- [ ] Edward Z. Yang `blog.ezyang.com/2026/03/...` — verify slug

**Non-marketing leaders (file 02):**
- [ ] Mullenweg `ma.tt/2026/02/claude-sonos/` — most quotable, verify exists
- [ ] Mullenweg `ma.tt/category/ai/` — verify "What a Week" Jan 27 + "Taxonomist" Apr 1 posts
- [ ] Casey Newton `platformer.news/claude-code-review-web-design/` + `/claude-code-for-writers-tips-ideas/` — verify
- [ ] Lenny Rachitsky `lennysnewsletter.com/p/everyone-should-be-using-claude-code` — verify
- [ ] Garry Tan `github.com/garrytan/gstack` — verify repo exists with claimed star count
- [ ] Sahil Lavingia `github.com/slavingia/skills` — verify

## Pipeline

```
2 raw outputs (this folder)
  → user reviews + spot-checks URLs
  → Vietnamese synthesis (if user wants — to be added to best-practices/ or new folder)
  → optional visualization (additional best-practices.html section or new page)
```

## Generated

- 2026-05-05
- 2 parallel agents, ~108K total context tokens consumed
- ~570s wall clock per agent (background)
- Synthesis: **deferred until user audits raw**
