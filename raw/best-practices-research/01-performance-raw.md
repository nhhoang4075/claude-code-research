# Raw: Performance optimization research

**Agent**: claude-code-guide subagent
**Date**: 2026-05-05
**Prompt summary**: Best practices for performance optimization in Claude Code for SEONGON marketing agency rollout. 11 sections: model selection, plan mode, subagent delegation, parallel tool calls, TDD, skills, CLAUDE.md, IDE integration, hooks, MCP, 2025-2026 updates.

---

## Claude Code Performance Optimization: Best Practices for SEONGON Agency Rollout

### 1. Model Selection — Opus 4.7 vs Sonnet 4.6 vs Haiku 4.5

**Quick recommendation**: Default to **Sonnet 4.6** for daily marketing workflows (SEO audits, ad copy, analytics). Escalate to **Opus 4.7** (1M context window) for multi-step research requiring deep reasoning (strategy memos, competitive analysis). Use **Haiku 4.5** for high-volume, simple tasks (email bulk processing, basic summaries).

**Cost-performance reality**: Sonnet 4.6 achieves 95-99% of Opus 4.7's effectiveness at 3x-4x lower cost. Opus 4.6 costs 5x more than Haiku ($25/output million tokens vs. $5) but handles architectural complexity Sonnet struggles with. For marketing work—which rarely requires extended reasoning—Sonnet 4.6 is the "daily driver" (https://platform.claude.com/docs/en/about-claude/models/overview). Opus 4.7 excels when you're architecting custom integrations or analyzing massive datasets across 5+ strategic dimensions simultaneously.

---

### 2. Plan Mode — When to Enter, What It Solves

**Pattern**: Use plan mode for any task touching multiple files, when scope is unclear, or when you're unfamiliar with existing code. Skip it for small, scoped fixes (typo, log line, variable rename).

**Workflow**: Enter plan mode (`/plan` or Shift+Tab), let Claude explore and propose changes *without making them*, review the plan in your editor (Ctrl+G to edit inline), then approve. This separates research from execution, preventing "solving the wrong problem." For SEO audit tools, plan mode shines: Claude can explore your entire analytics pipeline, propose field mappings, and structure the audit logic before touching code (https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode).

**Marketing example**: "I want to add competitor keyword tracking to our SEO audit. Use plan mode to explore the schema and propose changes without editing." Claude reads the database schema, ad-hoc analysis scripts, and competitor tools, then shows you a plan. You review it, catch business logic gaps, then approve.

---

### 3. Subagent Delegation — Parallel Research, Specialized Tasks

**Pattern**: Delegate research (logs, file exploration, documentation search) to keep your context clean. Use subagents for code review, security scanning, or specialized domains.

**When to delegate**:
- "Use subagents to investigate how our auth handles token refresh" — exploration doesn't clutter main conversation
- Parallel fact-gathering on marketing tools (SEO platforms, analytics vendors, ad networks) — each subagent researches one platform
- Code review after implementation — fresh context means no bias toward code Claude just wrote
- Feature exploration in unfamiliar codebases (e.g., ad-hoc analytics in seongon_agent)

**Setup**: Create `.claude/agents/marketing-researcher.md` with a focused system prompt. Subagents run in isolated context and report back summaries. For SEONGON's multi-org setup, use subagents to deep-dive into one org's ad performance without inflating the main session context (https://code.claude.com/docs/en/sub-agents).

---

### 4. Parallel Tool Calls — Batch in One Message

**Pattern**: When tasks are independent, batch them in a single assistant message. Reading 5 file paths, running 3 separate audits, fetching 2 APIs—do it all at once.

**Example**: Instead of "read auth.ts, then analyze its token flow, then check the tests," say "read @auth.ts and @tests/auth.test.ts, then explain the token refresh logic and list edge cases not covered by tests." Claude makes 2 reads and 1 analysis in parallel, saving latency.

For marketing: "Fetch our current Google Ads API schema, read the conversion-tracking module, and list the 5 highest-ROI fields we're missing" — three independent fact-gathering operations in one prompt.

---

### 5. TDD & Verification Loop — Tests First, Iterate

**Highest-leverage pattern**: Provide tests or expected outputs upfront. Claude performs dramatically better with a way to verify its own work.

**Example**: "Write a validateEmail function. Test cases: user@example.com → true, invalid → false, user@.com → false. Run the tests and fix any failures." Instead of guessing correctness, Claude validates.

For marketing tools: "Generate 5 Google Ads headlines for a SaaS product. Format each as JSON. Run them through our existing validation, flag any that exceed length limits, and regenerate those." /loop for continuous iteration. /schedule for daily regression tests on your audit suite (https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work).

---

### 6. Custom Skills & Slash Commands — When to Systemize

**Pattern**: Create a skill when you run the same prompt 3+ times or hand off a repeatable workflow to teammates. One-off tasks? Just paste the prompt.

**SKILL.md structure**: Store in `.claude/skills/audit-seo/SKILL.md`. Include name, description, and reusable workflow. Example:

```markdown
---
name: audit-seo
description: Run an SEO audit against a competitor domain
---
1. Use `gh` to get the domain from the GitHub issue
2. Fetch current keywords and rankings
3. Compare against competitors
4. Generate a report with gaps and recommendations
```

Invoke with `/audit-seo competitor-domain.com`. Skills avoid context bloat—Claude loads them on demand, not every conversation. For SEONGON: centralize ad-copy templates, analytics parsing logic, and competitor-tracking workflows as skills so all 150 people use the same approach (https://code.claude.com/docs/en/best-practices#create-skills).

---

### 7. CLAUDE.md Memory Hierarchy — File-by-File Context

**Levels**: `~/.claude/CLAUDE.md` (user-wide, rare), `./CLAUDE.md` (project root, shared), `./.claude.local.md` (personal, gitignored), subdirectory-level (auto-loaded for specific folders).

**What belongs in each**:
- ✅ Code style, test runners, Bash commands Claude can't guess, architectural decisions, env vars
- ❌ Standard language conventions, API docs (link instead), verbose tutorials, anything that changes weekly

**SEONGON example**: One `/CLAUDE.md` at the workspace root covers shared conventions (Bun, TypeScript, Tailwind, FastAPI). Project-level CLAUDE.md in `seongon_agent/` documents the multi-org auth flow. Keep each under 30 lines—bloated files cause Claude to ignore your instructions. The auto-memory system (`~/.claude/projects/.../memory/MEMORY.md`) persists learnings across sessions without cluttering CLAUDE.md (https://code.claude.com/docs/en/best-practices#write-an-effective-claudemd).

---

### 8. IDE Integration — VS Code & JetBrains Workflows

**VS Code**: Diff preview (right-click → Accept/Reject), mode selector (Ask before edits / Edit automatically / Plan mode), integrated status line showing context usage. `/keybindings-help` to rebind shortcuts.

**JetBrains**: Claude Code runs in the IDE terminal. Same mode cycling (Shift+Tab). Keyboard-driven workflow reduces context switch.

**Workflow**: Run Claude Code, review diffs in your editor, accept/reject blocks of changes. For remote teams: each developer runs their own session; Shift+Tab into plan mode for collaborative review before edits (https://code.claude.com/docs/en/vs-code, https://code.claude.com/docs/en/jetbrains).

---

### 9. Hooks — Automation at Scale

**Pattern**: Use hooks (PreToolUse, PostToolUse, UserPromptSubmit) for actions that *must* happen with zero exceptions. Examples: run eslint after every file edit, block writes to the migrations folder, log every Bash command to Sentry.

**Workflow**: Hooks run deterministically—unlike CLAUDE.md advice, they're guaranteed. Configure in `.claude/settings.json`. Example: "Block writes to migrations/ except via approved channels." Claude asks `/update-config` to set this up (https://code.claude.com/docs/en/hooks-guide).

For SEONGON: Add a hook that appends environment-specific headers to all API requests, or prevents direct writes to production databases.

---

### 10. MCP Servers — Drive, GitHub, Slack, Custom

**When to use**: MCP (Model Context Protocol) servers are more efficient than Bash for structured operations. Use GitHub MCP to read/create issues, Google Drive MCP to fetch analytics docs, Slack MCP for notifications.

**Example**: Instead of `curl https://api.github.com/repos/...`, use GitHub MCP: "Use the GitHub MCP to list all open issues tagged 'bug'." Structured response, fewer tokens.

**Setup**: `claude mcp add` to connect GitHub, Drive, Slack, Sentry, or custom servers. For SEONGON's multi-tool stack (Google Analytics, Google Ads, WordPress via REST API), custom MCPs save token budget vs. repeated Bash/HTTP calls. Drive MCP integrates your shared analytics templates without reading files repeatedly (https://code.claude.com/docs/en/best-practices#connect-mcp-servers).

---

### 11. Recent Updates 2025-2026 — What Changed

**April 2026 postmortem resolved**: Anthropic fixed three separate issues affecting Claude Code, Agent SDK, and Cowork that caused performance decline. All resolved as of v2.1.116 (https://www.anthropic.com/engineering/april-23-postmortem).

**Opus 4.7 step-change**: Released as the new default for code. Brings "a step-change improvement in agentic coding" over Opus 4.6. Use this if your team scales to complex agent architectures (https://platform.claude.com/docs/en/about-claude/models/overview).

**Adaptive thinking**: Opus 4.7 and Sonnet 4.6 now support adaptive thinking (faster, cheaper alternative to extended thinking for lightweight reasoning). Use for multi-step marketing analysis without the ~5-10s latency of extended thinking.

**Context window management**: Aggressive compaction strategies documented (use `/compact` at checkpoints, `/loop` for recurring tasks). Context is the most important resource—fills faster than you expect (https://code.claude.com/docs/en/best-practices).

---

## Summary Patterns for SEONGON Marketing Teams

| Task | Model | Mode | Delegation | Example |
|------|-------|------|-----------|---------|
| Daily SEO audits, ad copy | Sonnet 4.6 | default/acceptEdits | Direct | "Generate 10 headlines for a B2B SaaS" |
| Strategic competitive analysis | Opus 4.7 | plan + subagent | Delegate research | "Map 20 competitors across 5 dimensions" |
| Bulk email templating | Haiku 4.5 | acceptEdits | Direct | "Generate 100 subject lines, validate length" |
| Custom analytics integration | Sonnet 4.6 | plan | None | "Plan a Google Analytics → Postgres sync" |
| Security review, code audit | Subagent | dontAsk | Delegate | "Use a subagent to audit seongon_agent for XSS" |

---

## Sources (as cited by agent — VERIFY BEFORE EXTERNAL USE)

- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code Permission Modes](https://code.claude.com/docs/en/permission-modes)
- [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Anthropic April 2026 Performance Postmortem](https://www.anthropic.com/engineering/april-23-postmortem)
- [Claude Model Selection Guide](https://www.sitepoint.com/claude-model-selection-framework/)
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code MCP Integration](https://code.claude.com/docs/en/best-practices#connect-mcp-servers)

---

## Audit notes (for human verification)

- [ ] Verify all `code.claude.com` URLs resolve (canonical Anthropic docs domain)
- [ ] Verify `platform.claude.com/docs/en/about-claude/models/overview` lists Opus 4.7 as the default for coding
- [ ] Verify the April 2026 postmortem URL — title and content
- [ ] Cross-check the "v2.1.116 fix" version number — could be wrong
- [ ] Verify "Sonnet achieves 95-99% of Opus effectiveness" claim — author estimate, not benchmarked here
- [ ] sitepoint.com reference — third-party blog, treat as opinion not fact
