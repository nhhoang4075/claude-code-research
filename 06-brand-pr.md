# Brand, PR, Digital Branding — Claude Code Adoption Evidence

**SEONGON relevance:** Direct. "Digital Branding" is one of SEONGON's named service lines.

---

## Vendor-primary patterns (Anthropic-published)

Anthropic ships two official resources that frame the brand-skill pattern:

### "Package your brand guidelines in a skill"
The canonical pattern: encode brand colors, fonts, logos, voice rules, and layout standards as a Claude Skill that auto-applies across every PDF, deck, and document Claude generates. One-time setup; eliminates the cycle of re-explaining the brand to AI for every task.

### "Create brand assets"
Vendor reference for Claude-generated brand assets — logos, color schemes, voice + tone guides — as both internal IP and client deliverable.

---

## MKT1's `/marketing-strategy` skill (most strategic example)

Emily Kramer's framework for building a complete marketing strategy as a Claude Skill — published in her newsletter as a reference implementation.

**Architecture**: A "central file that becomes your team's living strategy doc." Embeds strategy directly into Claude rather than as a static PDF, making it reference-able from every brief, campaign review, and prioritization decision.

**7 sequential exercises** that build on each other:
1. **Company overview** — business model, stage, GTM motion, revenue mechanics
2. **ICP prioritization** — stack-rank audience segments by maturity + resource allocation
3. **Marketing advantages** — identify "unique catalysts that help you grow faster"
4. **Perceptions** — define 3–5 audience-facing beliefs supporting the narrative
5. **Positioning** — target, product definition, comparator, differentiation
6. **Revenue levers** — rank four growth drivers by current priority
7. **Big bet campaigns** — translate strategy into 1–3 coordinated initiatives

**Distribution**: GitHub repos for versioned, tracked updates across teams. Skills live in `.md` files in shared repos. Paid MKT1 MCP server automates the entire process.

For SEONGON: this is the **template for client-facing brand strategy work**. A 7-step skill that produces a versioned strategy document for every client engagement, far faster than current consulting-style strategy decks.

---

## The Stack and Scale "47 marketing automations" pattern

Brandon (Stack and Scale) built **47 marketing automations** by treating Claude as a "full-stack contractor" receiving strategic briefs, not a chat interface.

**Core philosophy**: "Stop Asking, Start Briefing." Transform vague requests into detailed briefs with context, constraints, deliverable formats.

**3 named brand-strategy workflows**:

1. **Competitive Intel Machine** — analyzes competitor websites + messaging vs. internal positioning. CEO-ready competitive brief in **10 minutes** vs. 90 manual.
2. **Content Repurposing Engine** — single blog post → six channel-ready assets (LinkedIn, Twitter/X, email, paid social, sales 1-pager). **15 minutes/blog** vs. full afternoon.
3. **Friday Executive Deck** — synthesizes multi-source CSV exports into automated presentation with charts + trend analysis + strategic interpretation. **5–15 min/week** vs. 90 min.

**Reported results** (one case from Tool of the Week section): "CAC down 28%, ad spend down 23%."

---

## Branding-skill examples (community-built)

### Animalz `/generate-style-guide` + `/style-check`
- **`/generate-style-guide`**: parallel analysis of 8 editorial dimensions to create comprehensive brand standards
- **`/style-check`**: validates new content against established guidelines

For an agency, this is the kind of internal IP that scales across clients — define brand once per client, validate on every deliverable.

### MCP Market — Brand Strategy & Identity skill
Pre-built skill for visual identity systems. Free, downloadable, customizable.

### DEV Community — "Built a Claude Code plugin for brand building in a weekend"
Engineer's case study of building a brand-skill plugin. Useful template for SEONGON's own engineering team.

---

## GEO-for-brand (the strategic angle, again)

Brand visibility in AI answers is its own emerging discipline:

- **nex.ad — "How to make your brand show up in Claude answers"** — concrete tactics for getting cited in AI-generated responses
- **SE Ranking AI Search endpoints** — track brand mentions across ChatGPT, Perplexity, Gemini, AIO
- **`seo-geo` subagent in `claude-seo`** — programmatic GEO optimization

For SEONGON's branding service line, this means **Brand Visibility extends from SEO/social/PR into AI answer surfaces**. Clients increasingly want to know "do I show up when ChatGPT is asked about my category?" That's a billable question SEONGON can answer.

---

## Operating-model implications for SEONGON

### Productized brand-strategy delivery

The MKT1 7-exercise pattern is directly portable. SEONGON could productize:
- "Brand Strategy Sprint" — 7-day engagement, Claude-skill-driven, produces versioned `.md` strategy doc + PDF deck. Lower price point, higher volume than traditional brand consulting.
- "Brand-as-Skill" — package the client's brand guidelines as a delivered Claude Skill. Recurring value because it gets reused on every future deliverable.

### Creative production

The Animalz `/style-check` pattern + Anthropic's brand-guidelines skill = enforce brand consistency across all client content automatically. Reduces editor pass time on every deliverable.

### Risks specific to brand work

1. **Cultural fit for Vietnamese market**: tone, register, idiom matter heavily in Vietnamese branding. Claude's Vietnamese fluency is strong but should be QA'd against agency standards before client work.
2. **Visual identity ≠ Claude's strength**: Claude is text-and-structure-strong; visual design still benefits from human + Figma. Use Claude for the *system* (style guide, voice), human for the *aesthetic* (color, typography choices).

---

## Suggested SEONGON pilot scope (brand slice)

**Pilot team**: 1 senior brand strategist + 1 designer + 1 content lead.

**Pilot duration**: 3 weeks.

**Targets**:
- Build internal "SEONGON brand" skill — encodes the agency's own brand for use on internal content (week 1)
- Build "Client Brand Skill" generator — takes brand inputs, produces a reusable skill per client (week 2)
- Pilot Brand Strategy Sprint with 1 willing client (week 3)

**Decision gate**:
- If client receives the strategy delivery + brand skill positively, productize as a service.
- If internal brand skill noticeably reduces brand inconsistency on outputs, deploy to all teams.

---

## Sources

- Anthropic — *Package your brand guidelines in a skill* — https://claude.com/resources/use-cases/package-your-brand-guidelines-in-a-skill
- Anthropic — *Create brand assets* — https://claude.com/resources/use-cases/Create-brand-assets
- MKT1 — *How to build your marketing strategy in Claude* — https://newsletter.mkt1.co/p/build-marketing-strategy-skill-in-claude-code
- Stack and Scale — *Claude Code Playbook for Marketers* — https://www.stackandscale.ai/p/the-claude-code-playbook-for-marketers
- Animalz — *Claude Code for Content Marketers* — https://www.animalz.co/blog/claude-code (style-guide skills)
- MCP Market — *Brand Strategy & Identity skill* — https://mcpmarket.com/tools/skills/brand-strategy-identity
- DEV Community — *Built a Claude Code plugin for brand building in a weekend* — https://dev.to/jgerton/i-built-a-claude-code-plugin-for-brand-building-in-a-weekend-heres-what-i-shipped-and-what-i-2lng
- aiblewmymind — *Claude brand skill for PDFs/decks* — https://aiblewmymind.substack.com/p/how-to-create-claude-brand-skill
- nex.ad — *How to make your brand show up in Claude answers* — https://nex.ad/blog/how-to-make-your-brand-show-up-in-claude-answers
- Activated Thinker (Medium) — re-explaining brand context to Claude
