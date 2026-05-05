# 01 — Tối ưu hiệu suất (Performance)

> Mục tiêu: lấy **output chất lượng cao nhất** từ Claude Code cho công việc marketing — SEO audit, ad copy, content brief, analytics, brand insight. Không phải "code nhanh hơn" mà là **suy nghĩ đúng hơn**.

## 1. Chọn model đúng — Opus 4.7 vs Sonnet 4.6 vs Haiku 4.5 [All]

**Nguyên tắc**: Mặc định Sonnet 4.6 cho ~80% công việc. Escalate Opus 4.7 (1M context) khi cần lý luận sâu hoặc xử lý dữ liệu lớn cùng lúc. Drop Haiku 4.5 cho task cơ học khối lượng lớn.

**Cách làm**:
- Sonnet 4.6 = "daily driver" — giá ~1/3 Opus, chất lượng đạt 95%+ cho task marketing thông thường
- Opus 4.7 — chỉ dùng cho: chiến lược tổng thể, audit competitive landscape 20+ đối thủ, phân tích codebase phức tạp, debug khó
- Haiku 4.5 — sub-task lặp lại: chuẩn hóa metadata 1000 URL, generate 100 subject line, batch transcription

**Áp dụng SEONGON**:
- SEO specialist viết 10 meta-description → Sonnet
- Senior SEO làm chiến lược cluster 50 keyword + map sang user journey → Opus
- Ads team rephrase 200 RSA headline cho A/B test → Haiku
- Trong CLI: gõ `/model` để switch. Trong Cowork: chọn ở selector. Trong Claude.ai: pick từ dropdown phía trên.

## 2. Plan mode trước khi làm việc phức tạp [Tier 1 CLI, Tier 2 Cowork]

**Nguyên tắc**: Nếu task chạm nhiều file / nhiều bước / scope mơ hồ — **luôn plan trước khi execute**. 2K token kế hoạch cứu 50K token làm sai hướng.

**Cách làm**:
- Trong Claude Code CLI: `Shift+Tab` để cycle vào plan mode, hoặc gõ "use plan mode to..."
- Claude sẽ chỉ dùng tool read-only (Read, Grep, WebSearch) để khảo sát rồi trình **plan**
- Bạn review plan, sửa, approve → mới execute
- Skip plan với task nhỏ: rename biến, fix typo, thêm 1 dòng log

**Áp dụng SEONGON**:
- "Plan mode: thêm tracking conversion từ landing page A vào GA4 và GTM" — Claude khảo sát config GTM hiện tại, đề xuất event schema, bạn duyệt rồi mới chỉnh
- "Plan mode: rebuild SEO audit cho client X dựa trên template hiện tại" — Claude đọc template + brief client, đề xuất section + data source trước khi viết
- Quy tắc nội bộ đề xuất: với mọi việc ảnh hưởng đến **client account thật** (Ads, GSC, GA4, WordPress prod), bắt buộc plan mode trước

## 3. Delegate cho subagent — đừng nhồi mọi thứ vào main context [Tier 1 CLI]

**Nguyên tắc**: Subagent có context riêng, chỉ trả về **summary** cho main session. Dùng để khảo sát, research, review — không làm bẩn main conversation.

**Cách làm**:
- Built-in: `Explore` (tìm code/file), `general-purpose` (research đa bước), `code-reviewer` (review code), `feature-dev:*` (architect/explore/review)
- Custom: tạo `.claude/agents/seo-researcher.md` với system prompt riêng cho domain
- Chạy song song: trong **một** assistant message gọi nhiều `Agent` tool — chúng chạy parallel
- Khi nào delegate vs làm trực tiếp: nếu việc cần > 3 query exploration, hoặc trả về > 10K token raw data — delegate

**Áp dụng SEONGON**:
- "Spawn 5 subagent song song, mỗi subagent research một đối thủ trên thị trường gym Hà Nội. Trả về JSON format."
- Code reviewer subagent để audit security cho `seongon_agent` repo trước khi deploy
- Subagent research backlink profile từ Ahrefs MCP — kết quả về dạng bullet, không kéo cả 5MB raw response vào main context

## 4. Gọi tool song song trong cùng một message [Tier 1 CLI, Tier 2 Cowork]

**Nguyên tắc**: Khi các tool call **độc lập** — luôn batch chúng vào **một** message. Mỗi vòng lặp serial mất 2-5 giây latency.

**Cách làm**:
- Sai: "Đọc file A. Sau đó đọc file B. Sau đó đọc file C." (3 round trip)
- Đúng: "Đọc đồng thời file A, B, C rồi tổng hợp" → Claude phát ra 3 Read tool call trong 1 message (1 round trip)
- Áp dụng cho Read, Grep, Bash, WebFetch, MCP call

**Áp dụng SEONGON**:
- "Fetch đồng thời: GSC top query 28 ngày, GA4 conversion 28 ngày, Ahrefs backlink mới 30 ngày cho domain X. Sau đó cross-correlate."
- Khi viết content: "Đọc song song brief client, brand voice doc, 3 article gần nhất của competitor. Tổng hợp thành outline."

## 5. TDD / verification loop — cho Claude một cách tự kiểm tra [All]

**Nguyên tắc**: Output Claude tốt hơn rất nhiều nếu **có cách kiểm chứng** — test case, expected output, schema validator, regex check.

**Cách làm**:
- Code: viết test trước, Claude code đến khi test pass
- Marketing copy: cung cấp checklist (length ≤ 30 ký tự, có CTA, có keyword chính, không trùng từ với headline khác) → Claude generate → tự run check → tự sửa
- `/loop` skill (nếu có) hoặc `ScheduleWakeup` cho task chạy dài
- Cho Claude truy cập tool validate được: linter, schema validator, MCP API thật

**Áp dụng SEONGON**:
- Generate Google Ads RSA: cho Claude regex check headline ≤ 30 char, description ≤ 90 char. Bị over → tự rút ngắn
- Generate FAQ schema JSON-LD: cho Claude run schema.org validator MCP. Sai → tự fix
- A/B test variant: yêu cầu Claude tự score 5 variant trên 3 chiều (clarity, urgency, brand voice), giữ top 3

## 6. Skill & slash command — systemize việc lặp lại [Tier 1 CLI, Tier 2 Cowork]

**Nguyên tắc**: Cùng một prompt chạy ≥ 3 lần → biến thành **skill** (tái sử dụng + share cho đồng nghiệp). One-off task — không cần.

**Cách làm**:
- File `.claude/skills/audit-seo/SKILL.md` với frontmatter `name`, `description` và workflow chi tiết
- Invoke: `/audit-seo client-domain.com`
- Skill được lazy-load — không phá context như nhồi vào CLAUDE.md
- Hệ sinh thái có sẵn: `AgriciDaniel/claude-seo` (21 sub-skills), `AgriciDaniel/claude-ads` (xem [agricidaniel-ecosystem/](../agricidaniel-ecosystem/))

**Áp dụng SEONGON**:
- `/audit-seo` — audit kỹ thuật SEO 9 category (Core Web Vitals, crawlability, schema)
- `/brief-content` — generate content brief từ keyword cluster + competitor analysis
- `/qa-rsa` — QA Google Ads RSA (length, policy, brand-voice)
- `/audit-fb-ad` — audit Meta ad creative + targeting + budget pacing
- Skills chia sẻ qua git repo nội bộ, mọi senior SEO/Ads checkout cùng phiên bản

## 7. CLAUDE.md — phân tầng memory [All với CLI]

**Nguyên tắc**: CLAUDE.md là **bộ nhớ thường trực**, nhưng nhồi quá tải sẽ phản tác dụng (Claude bắt đầu bỏ qua). Mỗi file < 30 dòng nội dung effective.

**Cách làm**:
- `~/CLAUDE.md` — user-wide, hiếm khi cần. Chỉ ghi shell, runtime preference.
- `<project>/CLAUDE.md` — project-level, share qua git. Convention, command thường dùng, kiến trúc.
- `<project>/CLAUDE.local.md` — personal, gitignored. Credential pointer, environment riêng.
- Subdir-level — auto-load khi work trong subdir.
- ✅ Nên ghi: command Claude không thể guess, kiến trúc, env var, code style đặc biệt
- ❌ Không nên ghi: convention chuẩn (TS strict, REST), tutorial dài, thông tin đổi hàng tuần
- Auto-memory (`memory/MEMORY.md`) — persist learning qua session, không cần ghi vào CLAUDE.md

**Áp dụng SEONGON**:
- `/Users/.../Work/CLAUDE.md` — đã có sẵn: Bun runtime, multi-project, auth flow chung
- `seongon_agent/CLAUDE.md` — sẽ ghi: multi-org auth flow, MCP setup, deploy command
- Đừng paste hết brand voice + style guide vào CLAUDE.md → tạo file riêng `docs/brand-voice.md` rồi chỉ trỏ link

## 8. IDE integration — review diff trước khi accept [Tier 1 CLI]

**Nguyên tắc**: Đừng "accept all" mù. Diff preview của VS Code / JetBrains là **cơ hội học** + **chốt chặn cuối** trước khi code commit.

**Cách làm**:
- VS Code: extension "Claude Code" — diff preview ở right panel, accept/reject từng block
- JetBrains: terminal-driven, cùng workflow Shift+Tab cycle mode
- Mode: "Ask before edits" (an toàn nhất), "Edit automatically" (chỉ khi tin tưởng), "Plan mode" (review trước)
- `/keybindings-help` để rebind shortcut

**Áp dụng SEONGON**:
- Junior dev: bắt buộc dùng "Ask before edits" — luôn review diff
- Senior dev quen với code base: có thể "Edit automatically" cho task quen, vẫn `/diff` trước commit
- Marketer dùng Cowork: review chính là việc đọc plan + output trước khi click "Apply"

## 9. Hooks — automation deterministic [Tier 1 CLI, có IT support]

**Nguyên tắc**: Khác với CLAUDE.md (advisory, có thể bị bỏ qua), **hook là deterministic** — chạy 100% theo config.

**Cách làm**:
- `PreToolUse` — chặn / cảnh báo trước khi Claude run tool
- `PostToolUse` — chạy lệnh sau khi tool xong (lint, test, log)
- `UserPromptSubmit` — pre-process prompt (inject context)
- Config trong `.claude/settings.json`

**Áp dụng SEONGON**:
- Hook chặn `Write` vào folder `migrations/` hoặc `prod-config/`
- Hook log mọi `Bash` command → file audit, tuần kiểm tra
- Hook đảm bảo trước khi `git push` lên branch `main` của repo client → có message confirm
- IT team setup hook chuẩn cho cả agency, deploy qua dotfiles

## 10. MCP server — tool có cấu trúc, ít token hơn Bash [Tier 1 CLI, Tier 2 Cowork]

**Nguyên tắc**: Khi cần dữ liệu từ hệ thống bên ngoài có sẵn MCP — **luôn dùng MCP** thay vì curl / shell. Response có cấu trúc, ít token hơn 30-70%.

**Cách làm**:
- `claude mcp add` để connect: GitHub, Drive, Slack, Sentry
- Vendor-specific: DataForSEO, Ahrefs, Semrush, GSC, GA4 đều đã có MCP server (xem `agricidaniel-ecosystem/`)
- Custom MCP nội bộ: wrap WordPress REST, n8n, internal CRM

**Áp dụng SEONGON**:
- GSC MCP cho keyword performance — không cần chạy script Python tự custom
- Drive MCP để fetch / push template content brief vào shared drive
- DataForSEO MCP cho keyword research — kết quả structured, dễ sang Sheets
- Custom MCP nội bộ: wrap dashboard SEONGON, Claude truy cập trực tiếp

## 11. Cập nhật 2025-2026 — gì mới đáng chú ý [All]

- **Opus 4.7** (default cho coding 2026-Q1) — step-change so với Opus 4.6, đặc biệt cho task agentic. Nhưng **tokenizer mới generate ~35% token hơn** cho cùng input → chi phí thực có thể cao hơn pricing list. Sonnet 4.6 vẫn là daily driver tốt nhất về ROI cho marketing task.
- **Adaptive thinking** trên Opus 4.7 + Sonnet 4.6 — thay thế extended thinking nhanh hơn, rẻ hơn cho lý luận nhẹ.
- **Cache TTL change** (2026-03) — silent drop từ 1h xuống 5 phút. Workflow nào dựa vào cache 1h cần rework. Xem [02-cost-optimization.md](02-cost-optimization.md).
- **Workspace-level cache isolation** (2026-02) — nếu SEONGON dùng nhiều Anthropic workspace, cache không share giữa workspace.
- **April 2026 performance postmortem** — Anthropic công khai 3 incident làm Claude Code chậm/yếu hơn bình thường, đã fix v2.1.116. Nếu thấy regression đột ngột — check status page trước khi đổ lỗi cho prompt của mình.

---

## Tóm tắt nhanh — Performance pattern theo task

| Task marketing | Model | Mode | Delegate? |
|---|---|---|---|
| Audit SEO 1 client | Sonnet 4.6 | Plan + execute | Subagent cho từng category |
| Generate 10 ad headline | Sonnet 4.6 | Direct | Không |
| Audit competitive landscape 20 brand | Opus 4.7 | Plan + parallel subagent | Mỗi subagent 1 brand |
| Bulk rewrite 500 meta-description | Haiku 4.5 | Direct + verification loop | Không |
| Custom analytics integration | Sonnet 4.6 | Plan first | Không |
| Code review trước deploy | Sonnet 4.6 | — | code-reviewer subagent |
| Daily / weekly recurring task | Sonnet 4.6 | Skill + cron | — |

## Nguồn

- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code Permission Modes (Plan Mode)](https://code.claude.com/docs/en/permission-modes)
- [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Anthropic Engineering — Claude Code Best Practices (2025)](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Anthropic April 2026 Performance Postmortem](https://www.anthropic.com/engineering/april-23-postmortem)
- [GMO-Z.com Vietnam Lab — Claude Code Best Practice](https://blog.vietnamlab.vn/claude-code-best-practice/) (tiếng Việt)
- [AZDIGI — 20 kinh nghiệm khi sử dụng Claude Code](https://azdigi.com/blog/tri-tue-nhan-tao/20-kinh-nghiem-khi-su-dung-claude-code) (tiếng Việt)

---

**Cập nhật**: 2026-05-05 · **Liên quan**: [02-cost-optimization.md](02-cost-optimization.md), [03-personal-development.md](03-personal-development.md)
