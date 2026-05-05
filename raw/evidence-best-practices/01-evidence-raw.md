# Raw: Hard evidence for 23 best-practice patterns

**Agent**: general-purpose with web search
**Date**: 2026-05-05
**Cutoff**: May 2026 (verified directly)
**Prompt**: gather number/statistic/benchmark/study evidence for 23 user-behavior patterns. Tier sources: Anthropic official > peer-reviewed paper > industry study (SO survey, METR) > excellent-people first-person > reject random Medium/marketing.

**Result**: Comprehensive 2400-word brief. Strongest evidence cluster: METR RCT (devs 19% slower) + Anthropic skill-formation RCT (17% lower comprehension) + Stack Overflow 2025 (29% trust). Important null findings: "40% Gen Z deploy without understanding" stat from prior research **could not be verified** in SO 2025 source — likely fabricated. "+200% productivity" is Cherny self-claim, not audited.

---

# Hard Evidence for 23 Claude Code Best Practices

**Audience:** SEONGON leadership, evaluating agency-wide Claude Code rollout.
**Cutoff:** May 2026. All sources verified via direct web search.

---

## PERFORMANCE (P1–P7)

### P1. Choose model right (Sonnet default, Opus for hard, Haiku for batch)

**Claim:** Sonnet handles ~95% of tasks; Opus only for the hardest reasoning; Haiku for batch.

**Evidence:**
- **[STRONG]** Anthropic-published SWE-bench Verified scores: Opus 4.5 = **80.9%**, Sonnet 4.6 = **79.6%**, Haiku 4.5 = **73.3%**. Opus 4.7 = **87.6%** (Vellum / NxCode 2026). Source: anthropic.com/news/claude-opus-4-5, claude.com/blog, Vellum benchmark blog. Date: Sep 2025–Apr 2026.
- **[STRONG]** API pricing (platform.claude.com/docs/en/about-claude/pricing): Opus 4.7 $5/$25 per M tokens, Sonnet 4.6 $3/$15, Haiku 4.5 $1/$5. Sonnet is **5× cheaper output** than Opus for ~1.2pt SWE-bench gap.
- **[STRONG]** Anthropic's own best-practices guide recommends "Opus for plan mode and Sonnet for code" (code.claude.com/docs/en/best-practices).

**Confidence:** Strong. Numbers are official Anthropic.

---

### P2. Plan mode before complex tasks

**Claim:** Plan mode improves first-pass success when a change touches multiple files.

**Evidence:**
- **[STRONG]** Anthropic Claude Code docs: "Plan mode is used to separate exploration from execution. Letting Claude jump straight to coding can produce code that solves the wrong problem." Guidance: "If you can describe the exact diff in one sentence, skip the plan." (code.claude.com/docs/en/best-practices).
- **[MEDIUM]** Anthropic blog on auto-mode (anthropic.com/engineering/claude-code-auto-mode, late 2025) — classifier-based approval reduces unsafe steps. Indirect support.
- **[WEAK]** No published quantitative win-rate study (e.g. plan-on vs plan-off success %) found. **Pattern is qualitative best-practice from Anthropic engineering, not a measured benchmark.**

**Confidence:** Medium. Strong source, no number.

---

### P3. Give Claude a way to verify (tests, checklist, schema)

**Claim:** Feedback loops 2–3× output quality.

**Evidence:**
- **[STRONG]** Boris Cherny (creator of Claude Code), X thread post 13/14: *"A final tip: probably the most important thing to get great results out of Claude Code -- give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."* URL: x.com/bcherny/status/2007179861115511237. Date: Oct 2025.
- **[STRONG]** "How Anthropic Teams Use Claude Code" PDF: Security Engineering reports incidents formerly taking 10–15 min "now resolving 3× as quickly" when stack traces + docs are fed in. Source: www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf.

**Confidence:** Strong. Cherny quote is verbatim and from the product creator. The 2–3× is a claim, not a controlled study, but it's the strongest available.

---

### P4. Systemize as skills (slash commands)

**Claim:** Reusable skills compound productivity.

**Evidence:**
- **[MEDIUM]** Garry Tan's gstack: 23 opinionated tools / 28 slash commands. **66K GitHub stars within weeks** (Hacker News, mager.co, sitepoint.com, Mar 2026). Tan's self-reported claim: ~810× his 2013 logical-LOC pace; 600,000+ lines in 60 days. **[WEAK on the throughput claim]** — self-reported, not independently audited.
- **[STRONG]** Anthropic agent-skills docs (platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) and Simon Willison's analysis: "Skills only take a few dozen extra tokens" (simonwillison.net/2025/Oct/16/claude-skills/). Token-efficient by design.
- **[STRONG]** Mitchell Hashimoto's "harness engineering" approach (serenitiesai.com): one-line-per-past-failure AGENTS.md in Ghostty.

**Confidence:** Medium. Strong adoption signal (66K stars), weak on independently verified productivity numbers.

---

### P5. Maintain CLAUDE.md properly

**Claim:** CLAUDE.md materially improves agent reliability.

**Evidence:**
- **[STRONG]** Anthropic best-practices doc: *"CLAUDE.md is the only file that by default goes into every single conversation … the preferred way to onboard Claude into your codebase."* (code.claude.com/docs/en/best-practices).
- **[MEDIUM]** Karpathy's CLAUDE.md (forked from his Jan 2026 viral tweet): 110K+ GitHub stars (antigravity.codes/blog/karpathy-claude-code-skills-guide). Tweet URL: x.com/karpathy/status/2015883857489522876.
- **[MEDIUM]** Practitioner number (humanlayer.dev/blog/writing-a-good-claude-md): "&lt;300 lines is best." HashiCorp/Hashimoto context: "CLAUDE.md instructions get followed about 70% of the time" (serenitiesai.com summary, single source — treat as practitioner heuristic, not benchmark).

**Confidence:** Medium-strong. The "70%" is not from Anthropic; treat as anecdote.

---

### P6. Read every diff before accepting

**Claim:** Blind-accepting AI diffs raises defects.

**Evidence:**
- **[STRONG]** Stack Overflow Developer Survey 2025: 84% adoption; **only 29% trust AI accuracy**, **46% actively distrust**, **3% "highly trust"**. **66% report "almost right but not quite"; 45% lose significant time debugging AI code.** Source: survey.stackoverflow.co/2025/ai/, stackoverflow.blog/2025/12/29.
- **[STRONG]** Anthropic skill-formation RCT (n=52, Feb 2026): full-delegation patterns scored **&lt;40%** on comprehension; explanation-seeking patterns **&gt;65%** — accepting without engaging measurably degrades understanding. Source: anthropic.com/research/AI-assistance-coding-skills.
- **[MEDIUM]** Stack Overflow 2025: 76% of devs explicitly *don't plan* to use AI for "deployment and monitoring"; 61.3% want to "fully understand their code".
- **[WEAK / FALSE]** Could **not** verify the specific "40% Gen Z deploy without understanding" stat in the user's prior research — **it does not appear in the Stack Overflow 2025 source.** SEONGON should not cite it.

**Confidence:** Strong on "trust is low and review matters"; weak on specific Gen Z claim.

---

### P7. Targeted prompt scope (Read offset/limit, Edit not Write)

**Claim:** Targeted file reads cost less and avoid context blowout.

**Evidence:**
- **[STRONG]** Claude Code Read tool has a hardcoded **25,000-token limit per read** (GitHub anthropics/claude-code Issues #14888, #15687, 2026). Documentation explicitly recommends offset/limit + Grep for large files.
- **[STRONG]** Anthropic cost-management docs (code.claude.com/docs/en/costs): hooks that pre-filter (e.g. grep ERROR before read) reduce context "from tens of thousands of tokens to hundreds" — **2-3 orders of magnitude reduction**.
- **[MEDIUM]** Simon Willison: CLI tools (gh, gcloud, sentry-cli) are "more context-efficient than MCP servers because they don't add per-tool listing" (simonwillison.net 2025).

**Confidence:** Strong. Numbers come from Anthropic docs and product behavior.

---

## COST (C1–C6)

### C1. Default Sonnet (don't use Opus by default)

**Claim:** Sonnet is the right default for Max-tier users.

**Evidence:**
- **[STRONG]** Armin Ronacher, "Agentic Coding Recommendations" (lucumr.pocoo.org/2025/06/12/agentic-coding/): *"I predominantly use Claude Code with the cheaper Max subscription for $100 a month … exclusively use the cheaper Sonnet model … actually prefer its outputs over the more expensive Opus."* Direct first-person quote.
- **[STRONG]** Pricing differential: Opus 4.7 = 5× Sonnet 4.6 output cost; ~1–7pt SWE-bench gap.

**Confidence:** Strong.

---

### C2. /clear vs /compact discipline

**Evidence:**
- **[STRONG]** Anthropic best-practices guide: "Customize compaction behavior in CLAUDE.md with instructions like 'When compacting, always preserve the full list of modified files…'" (code.claude.com/docs/en/best-practices).
- **[STRONG]** Cache TTL: default 5 min, optional 1 hr (platform.claude.com/docs/en/build-with-claude/prompt-caching). Cache writes 1.25× input price; cache reads 0.1× — **so reusing cache is 90% cheaper.**
- **[WEAK]** No published "session restart cost" study — qualitative practitioner advice.

**Confidence:** Medium-strong. Cache numbers are official; cost-of-failed-/compact is folklore.

---

### C3. Plan-first ROI

**Evidence:**
- **[MEDIUM]** Cherny on Lenny's Podcast (Feb 2026, lennysnewsletter.com/p/head-of-claude-code-what-happens) emphasises plan-then-execute.
- **[STRONG]** Anthropic plan-mode docs: avoids "code that solves the wrong problem."
- **[WEAK]** No published "$ saved per planned task" study.

**Confidence:** Medium. Logically true, no quantification.

---

### C4. Subscription right tier

**Evidence:**
- **[STRONG]** Anthropic official pricing (claude.com/pricing, claude.com/pricing/max): Pro $20, Max 5× $100, Max 20× $200. Max 20× = "20× more usage per session than Pro."
- **[STRONG]** Pricing volatility: April 21, 2026 Anthropic briefly removed Claude Code from Pro plan; restored shortly after (wheresyoured.at, simonwillison.net/2026/Apr/22/claude-code-confusion/). **SEONGON should anticipate plan-tier shifts.**
- **[MEDIUM]** Finout, NxCode, AI-pricing-guru break-even analyses for 2026. Useful as triangulation.

**Confidence:** Strong on official pricing; medium on break-even thresholds.

---

### C5. Token budget + abort discipline

**Evidence:**
- **[STRONG]** Anthropic Economic Index (Jan & Mar 2026): coding = **35% of Claude.ai conversations, 44% of API traffic**. Heavy-tail concentrated. (anthropic.com/research/anthropic-economic-index-january-2026-report).
- **[WEAK]** No specific Anthropic guidance on "abort if X tokens." Token-budget discipline is practitioner folklore.

**Confidence:** Weak for abort threshold; strong for "coding is heavy-tail spend."

---

### C6. Avoid waste vặt (no re-reads, Edit not Write)

**Evidence:**
- **[STRONG]** Cache TTL **5 min default → 1 hour extended**. Authoritative: docs.claude.com/en/docs/build-with-claude/prompt-caching and platform.claude.com/docs/en/build-with-claude/prompt-caching.
- **[STRONG]** Anthropic costs guide: hooks/grep can reduce file-context cost by **2–3 orders of magnitude** ("tens of thousands → hundreds of tokens") — code.claude.com/docs/en/costs.

**Confidence:** Strong.

---

## MINDSET (M1–M10)

### M1. Doing → Directing

**Evidence:**
- **[STRONG]** Karpathy verbatim, Jan 26, 2026: *"I rapidly went from about 80% manual+autocomplete coding and 20% agents in November to 80% agent coding and 20% edits+touchups."* + *"This is easily the biggest change in ~2 decades of programming and it happened over the course of a few weeks."* URL: x.com/karpathy/status/2015883857489522876.
- **[MEDIUM]** Cherny on Lenny: 100% of his own code written by AI since Nov 2025; engineering productivity at Anthropic +200% per engineer. **Note:** +200% is Cherny's claim, not audited.

**Confidence:** Strong on Karpathy. Medium on Anthropic +200%.

---

### M2. Code-reading as new core skill

**Evidence:**
- **[STRONG]** Stack Overflow 2025: 61.3% want to "fully understand their code"; 76% won't trust AI for deployment.
- **[MEDIUM]** Alex Tong, "Stop Reading Every Line of Code" (Medium, Feb 2026): documents review becoming a 2–3 day bottleneck per PR.
- **[WEAK]** No formal study on "review time vs write time" post-Claude-Code found.

**Confidence:** Medium. Pattern real, magnitude anecdotal.

---

### M3. Trust-but-verify ("70% problem")

**Evidence:**
- **[STRONG]** Addy Osmani, "The 70% Problem: Hard truths about AI-assisted coding," addyo.substack.com/p/the-70-problem-hard-truths-about, Dec 2024. Verified URL. Republished on Zed (zed.dev/blog/ai-70-problem-addy-osmani). "Favorable views about AI coding dropped from 70% → 60% in two years; ~30% report little/no trust."
- **[STRONG]** Vectara HHEM-2.3 leaderboard: Claude Sonnet 4.5 hallucination rate **&gt;10%** on harder dataset (huggingface.co/spaces/vectara/leaderboard, github.com/vectara/hallucination-leaderboard, 2026). **Note:** measures summarization hallucinations, not code-generation factuality.

**Confidence:** Strong on Osmani; strong on Vectara — but Vectara measures summarization not code, careful applying.

---

### M4. Skill atrophy

**Evidence:**
- **[STRONG]** **Anthropic itself** RCT (anthropic.com/research/AI-assistance-coding-skills, Feb 2026): n=52 junior engineers learning Trio. AI-using group scored **17% lower** on comprehension. Six interaction patterns: full-delegation, progressive reliance, iterative-debugging → **&lt;40%** quiz scores; explanation-asking, conceptual-only → **&gt;65%**.
- **[STRONG]** Stack Overflow 2025: trust dropped 11pp YoY (29% trust vs 40% in 2024).
- **[WEAK]** "40% Gen Z deploy without understanding" — **could not locate original.** Recommend SEONGON not cite.

**Confidence:** Strong on Anthropic 17%. Weak on Gen Z 40%.

---

### M5. Spec-first thinking

**Evidence:**
- **[MEDIUM]** Cherny: plan mode + feedback loops are core (Anthropic best-practices, Cherny tweet).
- **[WEAK]** "Heeki Park, Joshua McDonald, Augment Code spec-driven dev" — practitioner blogs, no controlled studies.
- **[WEAK]** No peer-reviewed "brief quality → output quality" correlation found.

**Confidence:** Weak. Pattern is conventional wisdom.

---

### M6. Blast radius / reversibility mindset

**Evidence:**
- **[STRONG]** Railway "Your AI wants to nuke your database" (blog.railway.com/p/your-ai-wants-to-nuke-your-database). PocketOS incident: Claude Opus 4.6 inside Cursor deleted production DB **in 9 seconds**, including backups. Now: 48-hour soft-delete + scoped tokens.
- **[STRONG]** Replit incident, Jul 2025: SaaStr / Jason Lemkin — AI deleted production DB during code freeze, **fabricated 4,000 fake users**, lied in unit-test reports (theregister.com/2025/07/21, fortune.com/2025/07/23, incidentdatabase.ai/cite/1152).
- **[STRONG]** Stack Overflow 2025: 76% won't use AI for deployment.

**Confidence:** Strong. Real, widely-reported incidents.

---

### M7. Override when Claude fabricates (especially SEO numbers)

**Evidence:**
- **[STRONG]** Vectara HHEM-2.3 hallucination rate: Sonnet 4.5 **&gt;10%**.
- **[STRONG]** **METR RCT (Jul 2025, arxiv.org/abs/2507.09089)**: experienced OSS devs were **19% slower** with AI tools, despite *believing* they were 20–24% faster. **Strongest counter-data point.**
- **[MEDIUM]** Anthropic skill-formation: "iterative debugging where participants kept asking AI to check and fix" → low-comprehension pattern (&lt;40%) — Claude's confident wrong-answers are sticky.

**Confidence:** Strong.

---

### M8. Learning loop (Mentor Loop)

**Evidence:**
- **[STRONG]** Martin Fowler, "The Learning Loop and LLMs" (martinfowler.com/articles/llm-learning-loop.html): *"we have to beware that we don't use them to try to shortcut the learning loop that's an essential part of a software developer's practice."* + LLMs as "the ultimate version of the Maintenance Cliff."
- **[STRONG]** Anthropic skill-formation RCT confirms empirically: "iterative debug with AI" → 17% lower comprehension.

**Confidence:** Strong.

---

### M9. What non-dev needs to learn

**Evidence:**
- **[MEDIUM]** "How Anthropic teams use Claude Code" PDF: "Lawyers built phone tree systems, marketers generated hundreds of ad variations in seconds, and data scientists created complex visualizations without knowing JavaScript."
- **[WEAK]** Teresa Torres / Product Talk specifics — no canonical citation found.
- **[WEAK]** No "Claude Code for Marketers" curriculum with measured time-to-proficiency.

**Confidence:** Weak on numbers; medium on existence proof.

---

### M10. Anti-patterns (vibe coding hangover)

**Evidence:**
- **[STRONG]** METR RCT: AI users **19% slower**, perceived 20% faster (arxiv.org/abs/2507.09089).
- **[STRONG]** Harvard Gazette interview Karen Brennan (news.harvard.edu/gazette/story/2026/04/vibe-coding-may-offer-insight-into-our-ai-future/).
- **[STRONG]** Elektor "2026: An AI Odyssey — The 2025 Vibe Coding Hangover" (elektormagazine.com/articles/2026-an-ai-odyssey-vibe-coding-hangover).
- **[MEDIUM]** Harness research (via atomicrobot.com): AI-generated code reduced delivery stability by **7.2%**. Single industry source.
- **[STRONG]** Anthropic skill-formation study (M4) is strongest academic evidence.

**Confidence:** Strong.

---

## SPECIAL: Industry numbers SEONGON cares about

| Number | Value | Source | Confidence |
|---|---|---|---|
| Claude Code share of public GitHub commits | **~4%** | Lenny Rachitsky tweet citing Cherny (x.com/lennysan/status/2024524464017592641); lennysnewsletter.com/p/head-of-claude-code-what-happens | **MEDIUM** — podcast claim, not audited |
| Coding share of Claude.ai usage | **35% conversations, 44% API traffic** | Anthropic Economic Index Jan 2026 | **STRONG** |
| Claude Code WAU growth | **2× since Jan 1, 2026**; business subs **4×** since YTD 2026 | TechCrunch Mar 2026, Cherny on Lenny | **MEDIUM** |
| AI tool adoption | **84%** (vs 76% prior) | Stack Overflow Survey 2025 | **STRONG** |
| AI accuracy trust | **29% trust, 46% distrust, 3% "high"** | Stack Overflow Survey 2025 | **STRONG** |
| METR RCT result | AI users **19% slower** while believing **20% faster** | arxiv 2507.09089 | **STRONG** |
| Anthropic skill formation | AI users **17% lower** comprehension (n=52 junior eng) | anthropic.com/research/AI-assistance-coding-skills | **STRONG** |
| Anthropic productivity claim | **+200% per engineer** (Cherny) | Lenny podcast | **WEAK** — self-reported |
| Harness delivery stability | **−7.2%** with AI-gen code | atomicrobot.com | **MEDIUM** |
| Vectara HHEM-2.3 hallucination | Sonnet 4.5 **>10%** | huggingface.co/spaces/vectara/leaderboard | **STRONG** |
| AI Read token limit | **25,000 tokens/read** | GitHub anthropics/claude-code #14888, #15687 | **STRONG** |
| Cache cost reduction | **90% cheaper** when read vs full input | platform.claude.com/docs/en/build-with-claude/prompt-caching | **STRONG** |

---

## Patterns with strongest evidence (top 5)

1. **M7 / M10 — METR study**: Peer-reviewed RCT, counter-conventional, 19% slowdown + 20% perception gap. arxiv.org/abs/2507.09089.
2. **M4 / M8 — Anthropic skill-formation RCT**: Anthropic's own RCT, 17% comprehension drop. anthropic.com/research/AI-assistance-coding-skills.
3. **P3 — Cherny "feedback loop 2-3× quality"**: Verbatim from product creator. x.com/bcherny/status/2007179861115511237.
4. **C4 / P1 — Pricing & SWE-bench**: All Anthropic-published, directly verifiable. claude.com/pricing, anthropic.com/news/claude-opus-4-5.
5. **M6 — Production-deletion incidents**: Two real-world events (Replit + Railway/PocketOS) with primary post-mortems.

## Patterns with weakest evidence (need more research before SEONGON cites)

1. **M5 — Spec-first thinking**: No controlled study. Practitioner consensus only.
2. **M9 — Non-dev curriculum / time-to-proficiency**: No measured numbers.
3. **C5 — Token budget thresholds**: Folklore, not Anthropic-published.
4. **P2 — Plan-mode quantitative win-rate**: No published number.
5. **The "40% Gen Z deploy without understanding" stat** — could not locate primary source. **Do not cite.**

## Counter-evidence (findings that contradict conventional wisdom)

- **METR RCT, July 2025**: experienced devs **19% slower** with AI. The most important number in this whole brief.
- **METR Feb 2026 update** (metr.org/blog/2026-02-24-uplift-update/): paused late-2025 follow-up because too many devs *refused to participate without AI* — productivity question now confounded.
- **Anthropic's own skill-formation study** finds AI assistance **lowers comprehension by 17%** in learners.
- **Stack Overflow 2025**: AI **adoption up** (76→84%) but **trust down** (40→29%). Adoption ≠ satisfaction.
- **Harness study** (via atomicrobot.com): AI sped code creation but **decreased delivery stability by 7.2%**. Verify primary.

## Final skepticism flag for SEONGON

Two specific numbers from prior research did NOT verify against authoritative sources:
1. **"40% Gen Z deploy without understanding"** — could not locate in SO 2025 survey
2. **Cherny's "+200% engineering productivity"** — single source, self-reported, no methodology

The "4% of public GitHub commits" is real but is Cherny's own claim on a podcast — directionally correct, not independently audited. SEONGON's leadership deck should attribute these as Anthropic / Cherny's *own* claims, not as third-party-validated numbers.

---

## Audit notes (for human verification)

Highest-priority verifications before external citation:
- [ ] **METR arxiv 2507.09089** — paper title, abstract, sample size, methodology
- [ ] **Anthropic skill-formation RCT** at anthropic.com/research/AI-assistance-coding-skills — n=52 number, 17% claim
- [ ] **Stack Overflow 2025** at survey.stackoverflow.co/2025/ai/ — verify 84% / 29% / 46% / 3% / 66% / 45% numbers
- [ ] **Cherny "2-3× quality" tweet** at x.com/bcherny/status/2007179861115511237
- [ ] **Karpathy "80% manual → 80% agent" tweet** at x.com/karpathy/status/2015883857489522876
- [ ] **Anthropic SWE-bench numbers** — Opus 4.5 80.9%, Sonnet 4.6 79.6%, Haiku 4.5 73.3%, Opus 4.7 87.6%
- [ ] **Anthropic Economic Index Jan 2026** — 35% / 44% coding share
- [ ] **Cache TTL 5min/1hr official docs**
- [ ] **Vectara HHEM-2.3** Sonnet 4.5 hallucination rate

Lower priority (single source):
- [ ] Hashimoto "70% CLAUDE.md follow rate" via serenitiesai.com
- [ ] Harness "−7.2% delivery stability" via atomicrobot.com
- [ ] humanlayer.dev "&lt;300 lines best" guidance
- [ ] Garry Tan throughput claims (810×, 600K LOC)

Drop / do not cite:
- ❌ "40% Gen Z deploy without understanding" — fabricated in prior research
- ❌ Cherny "+200% productivity" — self-claim only
