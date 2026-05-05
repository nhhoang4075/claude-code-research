# Raw research — Best Practices for Claude Code

These are the **raw, unedited outputs** of three research agents launched 2026-05-05 to collect best-practice material on three angles:

1. `01-performance-raw.md` — Performance optimization (model selection, plan mode, subagents, parallel tools, TDD, skills, CLAUDE.md, IDE, hooks, MCP, 2025-2026 updates). Run by **claude-code-guide subagent** (Anthropic-aware).
2. `02-cost-optimization-raw.md` — Cost optimization (prompt cache, model mixing, /compact vs /clear, subagent isolation, plan-first, subscription plans, token budgeting, parallelization, 2026 pricing). Run by **claude-code-guide subagent**.
3. `03-personal-development-raw.md` — Mindset & knowledge shifts for non-developers (doing → directing, code-reading skill, trust-but-verify, skill atrophy, spec-first, blast radius, override AI, learning loop, what marketers need to learn, anti-patterns). Run by **general-purpose agent with web search**.

## Why raw

Before synthesis, raw output lets you:

- **Verify cited URLs** — research agents can fabricate plausible-but-wrong links. Click each one before using in any external doc.
- **Sanity-check numbers** — pricing, token costs, percentages should be cross-checked against official sources.
- **Decide what to drop** — some claims are speculative or out-of-date. The Vietnamese synthesis in `best-practices/` already filtered some, but you may filter differently.
- **Audit reasoning chain** — "why did the synthesis say X?" → look up the raw evidence here.

## Known caveats

- **Cache TTL claim (5 min, was 1h, changed silently 2026-03)** — sourced from a practitioner blog (dev.to). Verify against `platform.claude.com/docs/en/build-with-claude/prompt-caching` before citing externally.
- **Opus 4.7 tokenizer +35% token claim** — sourced from finout.io. Verify with actual token counts on `/cost` for repeated workloads before deciding model strategy.
- **Vietnamese voices** in `03-personal-development-raw.md` — vietnamlab.vn, AZDIGI, ongboit.com, A Realistic Dreamer. URL exact paths need verification — flagged sources may have moved or never existed exactly as cited.
- **Some "agency math" numbers** in `02-cost-optimization-raw.md` are author-constructed estimates, not Anthropic-published. Treat as order-of-magnitude.

## Pipeline

```
3 raw outputs (this folder)
  → Vietnamese synthesis with SEONGON-specific framing (best-practices/)
  → 3-card section in index.html (#practices)
  → root README.md link
```

If you find an error in synthesis, trace it back: which raw file, which section, which URL, then update both. Mark fabricated URLs in the raw file with `[UNVERIFIED]` rather than deleting (to preserve audit trail).

## Generated

- 2026-05-05
- 3 agents, ~74K total context tokens consumed
- Synthesis time: ~2 minutes
- Verification time: **not yet done** — that's the next step before this becomes citable in client work.
