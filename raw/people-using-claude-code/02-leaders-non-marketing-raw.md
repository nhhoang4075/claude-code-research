# Raw: CEOs / marketers / business leaders using Claude Code (NOT for marketing)

**Agent**: general-purpose with web search
**Date**: 2026-05-05
**Prompt summary**: How named famous marketers, CEOs, business leaders (NOT software engineers) publicly use Claude Code for things that AREN'T direct marketing work — strategy memo, hiring, ops automation, internal tool, M&A, personal project, learning. Tier A: Aravind Srinivas, Mullenweg, Collison, Houston, Naval, Sam Altman, Andreessen, Garry Tan. Tier B: Lenny, Dunford, Fishkin, Natividad, Anu Atluru, Casey Newton, Anthropic Growth Mktg named individuals, Pieter Levels, Tony Dinh, Marc Lou. Vietnamese tech leaders.

**Result**: 7 well-sourced individuals (Mullenweg, Newton, Rachitsky, Tan, Lavingia, Levels, Srinivas), 1 flagged (Houston — strong workflow but tool attribution weak), 9+ deliberately dropped for insufficient evidence (Collison, Naval, Andreessen, Altman, Dunford, Fishkin, Natividad, Tony Dinh, Marc Lou). **Important null finding**: no Vietnamese C-level public mention as of 2026-05-05.

---

# How Non-Technical Leaders Use Claude Code (Beyond Marketing Work)

Research scope: named leaders who personally use Claude Code for things other than ad copy, blog posts, SEO content, or social posts. Strong preference for first-person sources from Oct 2025 onward.

---

## Matt Mullenweg (CEO, Automattic / WordPress co-founder)

Mullenweg is the most documented non-engineer leader using Claude Code, and notably he uses it for personal life infrastructure, not WordPress code. In his Feb 22, 2026 post "Claude & Sonos," he describes pointing Claude Code at his Houston home's audio system: "All 29 Sonos speakers were running on WiFi with SonosNet completely disabled. They had accumulated ~89 million dropped packets across the system." Claude Code diagnosed WiFi congestion, walked him through ethernet remediation, and recovered the network after some near-failures. He calls the iterative loop "variable positive reinforcement slot machine cowboy hacking."

In his Jan 27, 2026 "What a Week" post he describes Claude Code "rewiring" how he thinks about problem-solving, and lists personal scripts he built: a daily calendar summary, a GitHub project sync tool, a Brave browser tab manager, and a macOS single-page PDF export utility. None of this is WordPress dev work — it's personal-productivity glue.

**Workflow:** Claude Code CLI on his personal Mac, running ad-hoc scripts. **Why over ChatGPT:** he wants something that operates on his actual files, network, and devices, not a chat box.

---

## Casey Newton (Founder, Platformer; co-host, Hard Fork)

Newton is a tech journalist with no engineering background. In "The project that turned me into a Claude Code believer" (Jan 8, 2026, platformer.news), he canceled his ~$200/yr Squarespace and built cnewton.org over about an hour using Claude Code in the Ghostty terminal, deploying to Netlify for free. Quote: "Within a couple minutes, Claude had given me a working prototype… Over the next hour, I told Claude what I wanted to do in plain English."

More relevant for SEONGON: his follow-up "Claude Code for writers" describes building "a database of my writing that I could run semantic queries on" so he can ask "When was the last time I wrote a column about Grok?" He explicitly distances this from generative writing: "I'm not interested in AI tools that do the writing for me… I'm almost always more interested in tools that improve my thinking." His thesis: "It's waking people up to LLMs' power to generate _tools_."

**Workflow:** Claude Code CLI in Ghostty terminal. **Why:** he wants bespoke tools (semantic archive search, custom site) that no SaaS sells him.

---

## Lenny Rachitsky (Lenny's Newsletter)

Rachitsky is a former PM, not an engineer. His Oct 14, 2025 post "Everyone should be using Claude Code more" frames the tool's name as the obstacle: "The trick is to forget that it's called Claude Code and instead think of it as Claude Local or Claude Agent. It's essentially a super-intelligent AI running locally, able to do stuff directly on your computer." (Mirrored on his X account, Oct 14, 2025.)

His own personal uses, per the post: clearing storage on his Mac, enhancing screenshot quality, downloading YouTube videos, batch-extracting hi-res images out of Google Docs, and "Pick a random row from this Google Sheet to select a winner" for subscriber giveaways. He explicitly runs Claude from his home directory so it has access to all his files.

**Workflow:** Claude Code CLI from `~`. **Why:** raw filesystem access — chat-based AI can't act on his actual local files and folders.

---

## Garry Tan (CEO/President, Y Combinator)

Tan is a designer/investor by trade, not a current production engineer. In Nov 2025 he open-sourced **gstack** ([github.com/garrytan/gstack](https://github.com/garrytan/gstack)) — his personal Claude Code setup of 23 opinionated skills/slash commands modeling roles like CEO, Designer, Eng Manager, Release Manager, QA. His LinkedIn launch post: "I just open sourced my entire Claude Code setup I used to average 10K LOC and 100 PR's per week in the last 50 days." Hit ~66K GitHub stars within weeks.

The non-engineering angle: gstack treats Claude Code as a *team simulator* for a solo operator — letting one person run product strategy, architecture, design review, and shipping in a single CLI. For SEONGON this is the clearest published template of "non-engineer leader uses Claude Code as their org chart."

**Workflow:** Claude Code with 23 custom skills as slash commands. **Why over ChatGPT:** persistent role definitions, filesystem access, repeatable team workflow.

---

## Sahil Lavingia (Founder, Gumroad)

Lavingia is founder/designer, not a production engineer. On Mar 23, 2026 (X @shl, status 2036162956761715096), he shipped **slavingia/skills** — his book *The Minimalist Entrepreneur* converted into nine Claude Code slash commands: `/find-community`, `/validate-idea`, `/mvp`, `/first-customers`, `/pricing`, `/marketing-plan`, plus three more. None of these are coding tasks; they're business-strategy interviews where Claude Code asks structured questions and walks you through scoping a startup decision.

**Workflow:** Claude Code skills as Markdown files invoked via slash commands. **Why this matters:** demonstrates non-engineers using Claude Code as a *consulting/coaching surface* for strategy, not as a code generator. Crossed ~4,800 GitHub stars in days.

---

## Pieter Levels (Indie founder — Nomad List, Photo AI, Remote OK)

Levels is famously self-taught and not a "real" engineer by his own description. His use is partly engineering — but the non-engineering angle is his *infrastructure pattern*: in Aug 2025 (X @levelsio, status 1953022273595506910) he posted a how-to for running Claude Code on a $5/mo Hetzner VPS via SSH from any device, in `--dangerously-skip-permissions` mode. Quote: "I just SSH into @Hetzner_Online $5/mo VPS… Then install Claude `npm install -g @anthropic-ai/claude-code` Then type `claude` to start it. Treat it like a [coworker]."

He also (Aug 2025, status 1951654552395972778) used Claude Code to rebuild his personal site pieter.com as a 3D web environment using a 1990s PC model in Three.js — a hobby/brand project, not commercial code.

**Workflow:** Claude Code on remote VPS in skip-permissions mode, accessed via mobile SSH client (Termius). **Why:** he runs it 24/7 on cheap servers detached from his laptop — closer to "fleet of agents" than "IDE assistant."

---

## Aravind Srinivas (CEO, Perplexity)

Lower-confidence inclusion. Srinivas posted to X (Jul 4, 2025, status 1940898402889617529) asking "Claude Code or Cursor?" indicating active personal evaluation. More concrete: his LinkedIn post (~Apr 2026, activity 7436805672442245120) demonstrates Claude Code orchestrated by Perplexity Computer to fork a repo, plan a fix, and submit a PR via GitHub CLI on an Openclaw issue — autonomous agent loop, not him hand-coding. Quote: "You can now use Claude Code and GitHub CLI directly inside Perplexity Computer."

This is closer to "CEO product-tests Claude Code to validate competitive agent design" than personal-life use, but it is first-person and from a non-engineer-CEO role.

**Flag:** No clean quote of him saying "I use Claude Code for X non-coding task in my personal workflow."

---

## Drew Houston (CEO, Dropbox) — partial / flagged

Houston has publicly described spending 400+ hours coding with LLMs over the past year and feeding "board letters, company information, and records of past conversations into AI agents that act as his 'thought partners'" (Semafor, Oct 23, 2025). This is a textbook non-marketing executive use case — board prep, strategy memo synthesis, recall over personal corpus.

**Flag: agent could not confirm he names Claude Code specifically.** The Semafor piece references "AI agents" and "LLMs" generically. Treat the "thought partner / board letter" workflow as confirmed and useful, but do not attribute it specifically to Claude Code without a stronger source.

---

## Patterns Across Non-Technical Leaders

Six clear patterns across these leaders, all distinct from "make me ad copy":

1. **Personal-infrastructure glue.** Mullenweg's Sonos network, calendar summarizer, and PDF export tool; Lenny's storage cleanup and Google-Sheet randomizer; Newton's writing-archive search. The common thread: "tools too small to justify hiring an engineer for, but too annoying to do manually." Claude Code wins over ChatGPT because it can *act on local files*.

2. **Personal websites and brand surfaces.** Newton replacing Squarespace, Levels rebuilding pieter.com in 3D. Non-engineer leaders are killing their SaaS subscriptions with weekend Claude Code projects.

3. **Strategy/coaching surfaces, not code.** Lavingia's nine slash commands for business decisions; Tan's gstack roles (CEO, Designer, QA). Claude Code is being used as a *structured conversation partner*, where the value is the persistent skill definition + filesystem context, not the generated code.

4. **Run-it-headless infrastructure.** Levels's VPS pattern, Srinivas's Perplexity Computer orchestration. Leaders treat Claude Code as a *background worker* on a server, not a chat tab. This is the biggest divergence from ChatGPT-style use.

5. **"Tools, not text."** Casey Newton's framing — "LLMs' power to generate _tools_" — recurs implicitly in Mullenweg, Tan, Lavingia. Non-engineers use Claude Code to manufacture small bespoke applications rather than to draft documents.

6. **Skill packs as a portable artifact.** Tan and Lavingia both shipped public skill repos. Among leaders, "publish your CLAUDE.md / skills" has become a form of thought-leadership content distinct from blogs or podcasts.

Implication for SEONGON: the agency-leadership use case is not "have Claude Code write social posts." It is **personal CLI for ops/personal-data tasks + skill packs that codify SEONGON methodology** (positioning frameworks, audit checklists, briefing templates) that non-technical staff invoke as slash commands.

---

## Full URL List (as cited by agent — VERIFY BEFORE EXTERNAL USE)

- Mullenweg, Claude & Sonos (Feb 22, 2026): https://ma.tt/2026/02/claude-sonos/
- Mullenweg, AI category (incl. "What a Week" Jan 27 2026, "Taxonomist" Apr 1 2026): https://ma.tt/category/ai/
- Mullenweg, Boris Cherny (Feb 2026): https://ma.tt/2026/02/boris-cherny/
- Newton, "The project that turned me into a Claude Code believer" (Jan 8, 2026): https://www.platformer.news/claude-code-review-web-design/
- Newton, "Claude Code for writers": https://www.platformer.news/claude-code-for-writers-tips-ideas/
- Newton on Vergecast (video): https://www.youtube.com/shorts/ojqPNWYv9cg
- Rachitsky, "Everyone should be using Claude Code more" (Oct 14, 2025): https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code
- Rachitsky tweet (Oct 14, 2025): https://x.com/lennysan/status/1978130461596745856
- Tan, gstack repo: https://github.com/garrytan/gstack
- Tan launch post on LinkedIn: https://www.linkedin.com/posts/garrytan_i-just-open-sourced-my-entire-claude-code-activity-7437871520024199168-Q_eY
- TechCrunch on gstack (Mar 17, 2026): https://techcrunch.com/2026/03/17/why-garry-tans-claude-code-setup-has-gotten-so-much-love-and-hate/
- Lavingia, X announcement (Mar 23, 2026): https://x.com/shl/status/2036162956761715096
- Lavingia, skills repo: https://github.com/slavingia/skills
- Levels, VPS workflow tweet (Aug 2025): https://x.com/levelsio/status/1953022273595506910
- Levels, pieter.com 3D tweet (Aug 2025): https://x.com/levelsio/status/1951654552395972778
- Srinivas, "Claude Code or Cursor?" tweet: https://x.com/AravSrinivas/status/1940898402889617529
- Srinivas LinkedIn on Claude Code + GitHub CLI in Perplexity Computer: https://www.linkedin.com/posts/aravind-srinivas-16051987_you-can-now-use-claude-code-and-github-cli-activity-7436805672442245120-2NVX
- Houston, Semafor (Oct 23, 2025): https://www.semafor.com/article/10/23/2025/why-dropboxs-ceo-drew-houston-still-does-his-own-coding

---

## Flagged Uncertainty (from agent)

- **Drew Houston:** The "board letters fed into AI agents as thought partners" and "400 hours coding with LLMs" claims come from Semafor (Oct 2025), but the article references generic "AI agents / LLMs," not Claude Code by name. Strong workflow story, weak tool attribution. Do not quote him as a Claude Code user without a stronger source.
- **Patrick Collison:** Public statements ("the entire economy is replatforming," noting Claude Code adoption at Stripe Sessions keynote, Apr 2026) are *about the market*, not personal use. **Dropped** from the section list — no first-person personal use evidence found.
- **Naval Ravikant:** Tweets about software proliferation reference Claude Code generically; no first-person "I use it for X" content. **Dropped.**
- **Marc Andreessen:** Found a January 2025 joke tweet (pmarca status 1882947978417381771) about Claude generating scripts on its own — humorous, not a workflow source. **Dropped.**
- **Sam Altman:** Searches surfaced no evidence he publicly uses Claude Code. **Dropped.**
- **April Dunford, Rand Fishkin:** Their methodologies have been turned into Claude skills *by third parties*, but no first-person quotes of either personally using Claude Code. **Dropped.**
- **Amanda Natividad:** Mentioned Claude (not specifically Claude Code) helped her wire up a Formspree widget on her site — too thin and possibly Claude.ai chat, not Claude Code CLI. **Dropped.**
- **Tony Dinh, Marc Lou:** Both are technical indie founders, not the "non-engineer leader" target — and no clean non-marketing Claude Code workflow quote. **Dropped.**
- **Vietnamese tech leaders (FPT, VNG, Tiki, Shopee VN):** Searched explicitly. **No CEO or named leader has posted publicly about Claude Code that the agent could find.** Worth saying explicitly to SEONGON: as of May 2026, there's no publicly visible Vietnamese-market peer adoption signal at the C-level.
- **Anthropic Growth Marketing named individuals:** The internal-teams PDF in the repo (`raw/anthropic-internal-teams.txt`) does not contain individual employee names — only team-level descriptions. The premise that names like "Cara Schiavo, Kerry Caron" appear in that source is incorrect; agent's search of the file returned no matches.
- **General X/LinkedIn fabrication risk:** All X status URLs above were surfaced by web search, not directly fetched (X.com returned 402 errors via WebFetch). Quoted text from those tweets is what search snippets returned and should be verified before quoting publicly.

---

## Audit notes (for human verification)

Highest priorities to verify before any external citation:

- [ ] **Mullenweg** ma.tt/2026/02/claude-sonos/ — verify slug. Mullenweg's blog is real and well-known but specific dated post should be checked
- [ ] **Mullenweg** "What a Week" Jan 27 2026 + "Taxonomist" Apr 1 2026 — verify ma.tt/category/ai/ has these
- [ ] **Casey Newton** platformer.news/claude-code-review-web-design/ + claude-code-for-writers-tips-ideas/ — verify these slugs exist
- [ ] **Lenny Rachitsky** lennysnewsletter.com/p/everyone-should-be-using-claude-code — verify
- [ ] **Garry Tan** gstack repo at github.com/garrytan/gstack — easy to verify, hit-or-miss claim
- [ ] **Garry Tan** LinkedIn activity 7437871520024199168 — verify
- [ ] **Sahil Lavingia** slavingia/skills GitHub repo — verify
- [ ] **Lavingia** X status 2036162956761715096 — verify
- [ ] **Pieter Levels** X status 1953022273595506910 + 1951654552395972778 — verify
- [ ] **Srinivas** X status 1940898402889617529 + LinkedIn activity 7436805672442245120 — verify
- [ ] **Drew Houston** Semafor article — verify URL and content (does it mention Claude Code by name? agent says no)
- [ ] **TechCrunch** on gstack 2026/03/17 — verify

If verifying, prioritize: **Mullenweg ma.tt posts** (most quotable, most relevant for SEONGON pitch — non-engineer using CC for personal infrastructure) and **Lenny Rachitsky lennysnewsletter** post (most relevant since SEONGON already cites Lenny in main repo).

## Important null findings to surface

1. **No Vietnamese C-level peer signal** — agent searched FPT, VNG, Tiki, Shopee VN explicitly. SEONGON would be a first-mover in publishing Vietnamese-market Claude Code adoption thought-leadership.
2. **Famous "AI-using CEOs" mostly use ChatGPT/general LLM, not Claude Code specifically** — Houston, Collison, Naval, Andreessen, Altman all discuss AI but don't publicly use Claude Code by name. The "Claude Code for non-engineers" narrative is real but narrower than headlines suggest.
3. **The non-engineer leaders who DO use Claude Code skew toward "indie/founder/journalist" not "F500 CEO"** — Mullenweg, Newton, Levels, Lavingia all run small-team or solo operations. Pattern: people whose work surface is their own laptop, not corporate IT.
