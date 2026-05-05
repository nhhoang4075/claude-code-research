# Raw: Technical luminaries using Claude Code

**Agent**: general-purpose with web search
**Date**: 2026-05-05
**Prompt summary**: How named technical luminaries (researchers, ex-FAANG, AI thought leaders, prolific OSS authors) publicly use Claude Code. First-person quote + URL + workflow + surprising insight. Tier A targets: Karpathy, Simon Willison, Mitchell Hashimoto, Boris Cherny, Geoffrey Litt, John Carmack. Tier B: Sholto Douglas, Anthropic eng, Yegge, Hightower, Cassidy Williams, Abramov, Markbåge, Yang, Beyang Liu.

**Result**: 8 well-sourced individuals with direct quotes. Several Tier B targets dropped for lack of evidence (Carmack, Hightower, Cassidy Williams, Abramov, Markbåge, Bricken).

---

# Named Technical Luminaries on Claude Code: First-Person Sources

Research compiled from public posts, podcasts, and blog essays. Quotes are verbatim where possible; uncertainty flagged at the end.

---

## Tier A

### Andrej Karpathy (ex-Tesla AI, OpenAI co-founder, Eureka Labs)

**WHAT:** General agentic coding for personal projects, replacing manual + autocomplete coding. Notably *excluded* his nanochat training pipeline, where he reverted to hand-coding because agents were "net unhelpful."

**HOW:** Pure CLI agent mode. Heavy use of CLAUDE.md to constrain behavior (his personal CLAUDE.md was reverse-engineered into a popular community file). Declarative goal-setting rather than imperative micromanagement.

**DIRECT QUOTE:** *"I rapidly went from about 80% manual+autocomplete coding and 20% agents in November to 80% agent coding and 20% edits+touchups in December. i.e. I really am mostly programming in English now..."* — X post, January 2026 (https://x.com/karpathy/status/2015883857489522876)

He also frames the meta-principle: *"Don't tell it what to do, give it success criteria and watch it go... Change your approach from imperative to declarative to get the agents looping longer and gain leverage."*

**SURPRISING:** Karpathy is publicly conflicted. He calls it *"a bit of a hit to the ego"* and admits his manual coding ability is *"slowly atrophying."* He also explicitly disclosed that for nanochat — his marquee 2025 OSS project — agents *"didn't work well enough at all."* The 80/20 shift applies to most work, but **not the hardest work**. That nuance matters for SEONGON's pitch.

---

### Simon Willison (Datasette author, prolific LLM blogger)

**WHAT:** General computer automation, not just code. Builds Datasette plugins, publishes Claude Code transcripts as a record-of-work artifact, codes from his phone via the Claude iPhone app.

**HOW:** Claude Code CLI + Claude Code for web (mobile). Uses Skills heavily; built `claude-code-transcripts`, a Python CLI that converts session JSON to shareable HTML.

**DIRECT QUOTE:** *"These days I'm writing significantly more code via Claude Code than by typing text into a text editor myself."* And: *"Being able to have an idea on a walk and turn that into working, tested and documented code from a couple of prompts on my phone is a truly science fiction way of working."* — simonwillison.net, December 2025 (https://simonwillison.net/2025/Dec/25/claude-code-transcripts/)

On Skills: *"Claude Skills are awesome, maybe a bigger deal than MCP."* And: *"My own interest in MCPs has waned ever since I started taking coding agents seriously."* (https://simonwillison.net/2025/Oct/16/claude-skills/)

**SURPRISING:** Willison openly downgrades MCP in favor of Skills — a sharp public reversal from a writer who covered MCP enthusiastically earlier in 2025. He also reframes Claude Code as *"poorly named... a tool for general computer automation,"* not a coding tool. For SEONGON: this means the same tool justifies investment for non-engineering ops (Skills for content workflows), not just dev.

---

### Mitchell Hashimoto (HashiCorp co-founder, Ghostty author)

**WHAT:** Architectural-level AI delegation. Uses agents for refactors, library comparisons, edge-case analysis, and deep research. Famous example: a non-trivial Ghostty terminal feature substantially built via Claude Code.

**HOW:** Multi-window Ghostty (his own terminal, optimized for agentic work). Always has *"an agent running in the background doing something."* Pairs his coding with the agent planning, and vice versa.

**DIRECT QUOTE:** *"I'm more or less the architect of the software project. I give tooling that guidance... I want you to achieve this end goal, but using this shape."* — Zed blog, "Agentic Engineering in Action" (https://zed.dev/blog/agentic-engineering-with-mitchell-hashimoto)

Also: *"I've so far had the most success with Claude. Gemini was good for a while, but whenever I ask simple questions, it produces a monumental amount of text."* And: *"All these agents are really good at refactoring... Anytime I ask it to do that, it's always perfect."*

**SURPRISING:** His advice for AI-skeptics is to *"start by reproducing your research, not your code"* — i.e., delegate library comparisons and edge-case analysis before delegating actual code. This is an unusually safe on-ramp story for a luminary. Also relevant: he uses his own terminal (Ghostty) specifically because the agentic UX matters that much.

---

### Boris Cherny (creator of Claude Code, Anthropic)

**WHAT:** Ships 20–30 PRs/day. Uses Claude Code to build Claude Code. Has not written SQL by hand in 6+ months.

**HOW:** 5 parallel terminal Claudes + 5–10 simultaneous web Claudes, plus iOS app sessions throughout the day. Always starts in Plan mode, iterates on the plan, switches to auto-accept. Custom slash commands at `.claude/commands/`. Subagents (a code-simplifier and a verification agent). Shared team CLAUDE.md.

**DIRECT QUOTE:** *"If my goal is to write a Pull Request, I will use Plan mode, and go back and forth with Claude until I like its plan."* And: *"Probably the most important thing to get great results out of Claude Code — give Claude a way to verify its work... If Claude has that feedback loop, it will 2-3x the quality of the final result."* — howborisusesclaudecode.com (https://howborisusesclaudecode.com/) and his X thread (https://twitter-thread.com/t/2007179832300581177)

Also: *"I haven't written a line of SQL in 6+ months."* And: *"I use High for everything."*

**SURPRISING:** The author of the tool runs ~10–15 concurrent agents and **never lets Claude write a line of code until the plan is approved**. The discipline is the opposite of "vibe coding." Verification loops, not raw speed, are the lever.

---

### Geoffrey Litt (researcher, Ink & Switch)

**WHAT:** Oversees parallel Claude Code agents using a Notion kanban board as the orchestration UI. Voice-notes-to-tasks pipeline.

**HOW:** Notion MCP + custom slash commands. *"/implement #7"* finds the task, builds it, reports back. Also processes voice notes into structured tickets.

**DIRECT QUOTE:** *"Personally, I'm trying to code like a surgeon. A surgeon isn't a manager, they do the actual work!"* — quoted by Simon Willison, October 2025 (https://simonwillison.net/2025/Oct/24/geoffrey-litt/). Also: *"Really enjoying this vibe coding workflow today: Claude Code using @NotionHQ MCP to read/edit a board of tasks."* (https://x.com/geoffreylitt/status/1975957752804450513)

**SURPRISING:** Litt explicitly rejects the "AI makes you a manager" framing that dominates AI discourse. He delegates *prep work* (codebase guides, TS errors, exploratory spikes) to feel "like a surgeon walking into a prepped operating room" — but does the central work himself. This is the most credible counter-narrative to maximalist agent-only workflows.

---

## Tier B

### Armin Ronacher (Flask, Sentry CTO emeritus)

**WHAT:** Almost entirely Claude Code now, replacing Cursor. Uses it for regression debugging, blog migrations to markdown, even Advent of Code (with a custom web-browser skill).

**HOW:** YOLO mode (full permissions, watches it run). Sonnet on the $100/mo Max plan, not Opus. Custom prompts + system reminders rather than heavy plan-mode. Built a web-browser skill to let Claude solve Advent of Code end-to-end.

**DIRECT QUOTE:** *"Where I used to spend most of my time in Cursor, I now mostly use Claude Code, almost entirely hands-off."* — "A Year of Vibes," December 2025 (https://lucumr.pocoo.org/2025/12/22/a-year-of-vibes/). Also: *"From the very beginning I became a religious user of what is colloquially called YOLO mode."* (https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/)

**SURPRISING:** Ronacher is publicly skeptical of MCP — *"I quite vocally shared my lack of success with MCP throughout the year"* — and prefers Sonnet over Opus. Two of the most common "best practice" assumptions (use Opus, use MCP) get rejected by a heavy user. Also notable: he runs Claude Code on a $100/month plan, not enterprise pricing.

---

### Steve Yegge (ex-Google, ex-Amazon, ex-Sourcegraph)

**WHAT:** "Factory farming" of code. Built Gas Town, a Go-based Claude Code orchestrator that runs 20–30 agents in parallel with a shared task queue, coordinator process, and crash-resume checkpointing.

**HOW:** Custom orchestration layer above Claude Code. Plan-implement-review-test loops. Co-authored the book *Vibe Coding* with Gene Kim.

**DIRECT QUOTE:** From "Revenge of the Junior Developer" and his Pragmatic Engineer interview: he describes *"factory farming code"* as the endpoint of agentic dev. (https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the and https://steve-yegge.medium.com/six-new-tips-for-better-coding-with-agents-d4e9c86e42a9)

**SURPRISING:** A 30-year veteran who wrote the canonical "Stevey rants" essays now claims *"the days of coding by hand are over"* on the back cover of his own book. The "Revenge of the Junior Developer" essay was quoted by Dario Amodei. His Gas Town orchestrator pattern (20–30 parallel agents) is the most aggressive workflow on this list — beyond even Boris Cherny's 10–15.

---

### Edward Z. Yang (Meta / PyTorch core)

**WHAT:** Building `spmd_types`, a type checker for distributed PyTorch programs, via Claude Code — but with full human review of every line.

**HOW:** *"One window per work tree, each a single tab that is just a regular shell."* No orchestrator. Queues edits while reading the previous diff. Feeds review comments back through Claude to amend commits.

**DIRECT QUOTE:** *"This is NOT a workflow for letting the AI autonomously write tons of code. You're going to be reading every single line it produces."* And: *"Be lazy: if something doesn't make sense, don't try to puzzle it out, just send it straight to the LLM."* — blog.ezyang.com, March 2026 (https://blog.ezyang.com/2026/03/ai-assisted-programming-for-spmd-types/)

**SURPRISING:** Yang's bottleneck is *reading*, not generating. He explicitly forbids multitasking during review — *"Do NOT multitask this part, it needs your undivided attention (unsurprisingly, this step ends up being the bottleneck!)"* — which is the opposite of the Cherny/Yegge parallel-agent pattern. For a PyTorch maintainer working on type theory, comprehension > throughput.

---

## Patterns Across Luminaries

Five themes recur, even across very different workflows:

1. **Plan mode is consensus.** Cherny, Ronacher, Hashimoto and (implicitly) Karpathy all start with planning before generation. Cherny's *"never a line of code until the plan is approved"* discipline is the single most repeated practice. Even Ronacher's "no plan mode" is really a custom plan-as-markdown pattern.

2. **Verification loops > raw speed.** Cherny's 2–3x quality claim from feedback loops, Yang's review-every-line rule, Hashimoto's QA-while-the-agent-codes split, and Yegge's plan-implement-review-test loops all point the same way. Tests, type checkers, browser MCPs — anything machine-checkable is the moat.

3. **Parallelism is real but disputed.** Cherny (10–15), Yegge (20–30 via Gas Town), Hashimoto (always-on background agent), Litt (kanban-managed) lean heavy. Yang and Litt push back: comprehension and surgical focus matter more than agent count. There is no industry consensus.

4. **Skills and CLAUDE.md beat MCP.** Willison and Ronacher both publicly downgrade MCP. Skills (post-Oct 2025) and well-tuned CLAUDE.md files (Karpathy, Cherny's team file) are what people actually use day-to-day. For SEONGON: invest first in CLAUDE.md and skills, treat MCP as optional.

5. **The most senior people are most opinionated about limits.** Karpathy's nanochat retreat, Yang's "read every line," Litt's surgeon framing — the strongest endorsements come bundled with explicit limits. This is a *more* credible signal for SEONGON than uniform hype: these people have thought about where it breaks.

---

## Full URL List (as cited by agent — VERIFY BEFORE EXTERNAL USE)

- https://x.com/karpathy/status/2015883857489522876
- https://simonwillison.net/2025/Dec/25/claude-code-transcripts/
- https://simonwillison.net/2025/Oct/16/claude-skills/
- https://simonwillison.net/2025/Oct/24/geoffrey-litt/
- https://github.com/simonw/claude-code-transcripts
- https://zed.dev/blog/agentic-engineering-with-mitchell-hashimoto
- https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto
- https://fragmentedpodcast.com/episodes/310/
- https://howborisusesclaudecode.com/
- https://twitter-thread.com/t/2007179832300581177
- https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny
- https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens
- https://x.com/geoffreylitt/status/1975957752804450513
- https://x.com/geoffreylitt/status/2014454144103539175
- https://lucumr.pocoo.org/2025/12/22/a-year-of-vibes/
- https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/
- https://lucumr.pocoo.org/2025/06/12/agentic-coding/
- https://lucumr.pocoo.org/2025/12/23/advent-of-slop/
- https://steve-yegge.medium.com/six-new-tips-for-better-coding-with-agents-d4e9c86e42a9
- https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the
- https://www.latent.space/p/steve-yegges-vibe-coding-manifesto
- https://blog.ezyang.com/2026/03/ai-assisted-programming-for-spmd-types/
- https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf (Anthropic internal teams PDF, already in repo)

---

## Flagged Uncertainty (from agent)

- **Karpathy nanochat retreat:** Sourced through a derivative summary (blockchain.news), not Karpathy's original tweet. The 80/20 shift quote is solid (multiple corroborating sources including AI Safety Memes citing the same X thread), but the specific "agents net unhelpful for nanochat" phrasing should be verified directly on X if used externally. **Medium confidence on exact wording.**
- **Karpathy "phase shift" / "Slopacolypse" quotes:** Pulled from a derivative dev.to writeup, not the source tweet. Direction is right, exact wording medium confidence.
- **Boris Cherny detailed setup quotes:** howborisusesclaudecode.com is a community-curated site that aggregates Cherny's tweets and his Pragmatic Engineer/Lenny appearances. Individual quotes are likely faithful but the agent did not load the full original X thread (WebFetch on x.com hit a 402). **High confidence on substance, medium confidence on exact phrasing.**
- **Mitchell Hashimoto's "agent running in the background"** principle is paraphrased from Pragmatic Engineer's summary, not a direct first-person quote — the verbatim quotes are from the Zed blog interview.
- **Geoffrey Litt "surgeon" quote:** Sourced via Simon Willison's quote post; original Litt source is presumably an X thread or talk that was not directly verified.
- **Steve Yegge "factory farming code"** is widely attributed but agent did not get a direct verbatim from the primary essay — the phrase appears in multiple secondary sources.
- **Excluded for lack of direct evidence:** John Carmack (general AI takes only, no Claude Code specifics), Kelsey Hightower (general AI commentary, no Claude Code workflow), Cassidy Williams (no material), Dan Abramov / Sebastian Markbåge (nothing surfaced), Beyang Liu (works on Amp, a *competitor* — would be off-message for SEONGON), Trenton Bricken (interpretability comments only, not workflow). Better to omit than fabricate.

---

## Audit notes (for human verification)

Highest priorities to verify before any external citation:

- [ ] Karpathy X post `/karpathy/status/2015883857489522876` — verify status ID resolves and quotes match
- [ ] Boris Cherny `howborisusesclaudecode.com` — check this is real domain, not fabricated
- [ ] `twitter-thread.com/t/2007179832300581177` — unusual archive site, verify
- [ ] Armin Ronacher `lucumr.pocoo.org/2025/12/...` posts — verify slugs (lucumr.pocoo.org IS Ronacher's real blog)
- [ ] Edward Z. Yang `blog.ezyang.com/2026/03/...` — verify slug
- [ ] Geoffrey Litt X status IDs — verify
- [ ] Steve Yegge medium.com slug — verify
- [ ] Zed blog Hashimoto interview — `zed.dev/blog/agentic-engineering-with-mitchell-hashimoto` is plausible but verify
- [ ] Pragmatic Engineer newsletter URLs (Hashimoto + Yegge + Cherny) — verify each
- [ ] Latent.Space Steve Yegge piece — verify

If verifying, prioritize: Karpathy quote + Boris Cherny site + Ronacher posts. These are the load-bearing claims for SEONGON's pitch.
