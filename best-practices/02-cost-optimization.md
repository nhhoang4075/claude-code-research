# 02 — Tối ưu chi phí (Cost Optimization)

> Mục tiêu: scale Claude Code cho cả agency mà **chi phí token không bùng nổ**. Agency margin sẽ chết nếu mỗi nhân viên đốt $300-500/tháng API. Mục tiêu thực tế: $50-150/người/tháng cho power user, $20-50/tháng cho người dùng casual, dùng Pro / Max plan ở chỗ phù hợp.

> **Lưu ý**: Mọi con số dưới đây là **xấp xỉ theo pricing 2026-Q1**. Anthropic đã thay đổi cache TTL silently một lần (1h → 5min, 2026-03). Trước khi quyết định plan, kiểm tra `platform.claude.com/docs/en/about-claude/pricing` để có giá hiện hành.

## 1. Prompt cache 5 phút TTL — đừng để cache chết [All với API/CLI]

**Nguyên tắc**: Cache giúp tái sử dụng prompt lớn (system prompt, codebase, doc) qua nhiều request. Nhưng từ 2026-03, TTL mặc định **chỉ còn 5 phút**. Quá 5 phút idle → cache chết → phải write lại = đắt 25%, đọc lại tốn full input cost.

**Cách làm**:
- Cache write = ~1.25× input cost (đắt hơn lần đầu)
- Cache read = ~0.1× input cost (rẻ 90% nếu hit)
- Break-even: cần ≥ 3 lần read trong 5 phút thì cache mới có lợi
- Nếu nghỉ giải lao > 5 phút: cân nhắc `/clear` rồi bắt đầu lại, vì `/compact` không có cache hit còn đắt hơn
- Workflow lý tưởng: làm tập trung 30-45 phút, không idle quá 5 phút

**Áp dụng SEONGON**:
- 1 SEO senior chạy 5 audit/ngày, mỗi audit dùng cùng template lớn → cache giúp giảm 50-70% cost cho audit thứ 2 trở đi (nếu chạy liên tục)
- Đừng bật Claude Code rồi mở meeting 30 phút → cache đã chết, lần dùng sau coi như session mới
- Ước tính tiết kiệm: team 10 người dùng cache đúng cách ~$200/tháng so với cold cache mỗi lần

## 2. Quy tắc 80/10/10 — model mixing [All]

**Nguyên tắc**: Mặc định Sonnet 4.6 cho ~80% việc. Opus 4.7 cho ~10% việc khó. Haiku 4.5 cho ~10% việc cơ học. Đừng để mọi người chạy Opus mặc định.

**Cách làm — pricing 2026-Q1 (per 1M token)**:
| Model | Input | Output | Tỷ lệ vs Haiku |
|---|---|---|---|
| Haiku 4.5 | $1 | $5 | 1× |
| Sonnet 4.6 | $3 | $15 | 3× |
| Opus 4.7 | $5 | $25 | 5× |

**Áp dụng SEONGON**:
- Junior SEO/Ads: ép Sonnet làm default qua CLAUDE.md hoặc setting
- Senior strategy: cho phép Opus, nhưng review monthly cost
- Bulk task (rewrite 500 meta-desc, batch caption 1000 video): Haiku — chất lượng vẫn ổn, cost giảm 66%
- Ước tính: chuyển từ "mọi người dùng Opus" sang 80/10/10 → cost giảm 40-60% mà chất lượng không đổi rõ rệt cho task marketing thường

**Cảnh báo Opus 4.7 tokenizer mới**: Cùng input có thể tạo ~30-35% **token output nhiều hơn** Opus 4.6 do tokenizer mới. Pricing list không đổi nhưng cost thực tế cao hơn. → Càng nên ép Sonnet 4.6 default.

## 3. `/compact` vs `/clear` — chọn đúng cách kết thúc session [Tier 1 CLI]

**Nguyên tắc**: `/compact` giữ summary, `/clear` xóa sạch. Chọn đúng phụ thuộc vào trạng thái cache + nhu cầu giữ context.

**Cách làm**:
- Còn cache (idle < 5 phút) + cần giữ context → `/compact` (tốn ~vài K token để summarize)
- Cache đã chết (idle > 5 phút) + cần giữ context → cân nhắc `/clear` rồi paste lại tóm tắt thủ công, **rẻ hơn `/compact` cold**
- Không cần giữ context → `/clear` (free)
- `/compact focus on the SEO audit pattern` để định hướng cái gì giữ lại

**Áp dụng SEONGON**:
- Sau session debug 2h tích lũy 200K token: `/compact` ngay nếu còn cache. Chần chừ → nội dung re-process tốn $5-10
- Trước khi đổi sang task không liên quan: luôn `/clear`. Đừng để session SEO audit lẫn vào session Ads brief
- Đào tạo team: "đừng lười với `/clear` — context bẩn = output kém + chi phí cao"

## 4. Subagent isolation — bảo vệ context cha [Tier 1 CLI]

**Nguyên tắc**: Subagent có context riêng. Khi xong, **chỉ summary** trả về cha. Cha không phải gánh full transcript.

**Cách làm**:
- Task research / explore / review → đẩy cho subagent
- Cha chỉ trả phí cho input ban đầu + output summary cuối
- Subagent tự đốt token trong context của nó, nhưng không làm bẩn cha
- Có thể chạy nhiều subagent **song song** trong cùng 1 message (không serial)

**Áp dụng SEONGON**:
- Research 5 đối thủ → 5 subagent, mỗi subagent 1 đối thủ. Cha nhận về 5 summary ngắn, không phải 5 transcript dài 50K token
- Audit codebase trước deploy → 1 code-reviewer subagent. Cha chỉ thấy review report, không thấy 200 file code
- Tiết kiệm thực tế: research task 50K token → subagent → cha chỉ tốn ~5K cho summary. Tiết kiệm 90% cho main context.

## 5. Plan-first — bắt sai hướng sớm [All với CLI/Cowork]

**Nguyên tắc**: Plan tốn 2-3K token. Code/làm sai hướng tốn 30-100K token để sửa. ROI 10-30× cho task phức tạp.

**Cách làm**:
- Task scope > 1 file hoặc > 30 phút effort → plan trước
- Task nhỏ (rename, typo, 1 dòng) → skip plan, làm thẳng
- Plan mode chỉ dùng tool read-only → cost predictable

**Áp dụng SEONGON**:
- "Add OAuth cho seongon_agent": plan trước (3K token) thay vì code mò (50K nếu sai approach)
- "Rebuild SEO audit cho client X": plan trước để định khung. Sai khung phải làm lại 2 lần là tốn $50-100 cho 1 audit
- Quy tắc nội bộ: với task > 1h hoặc chạm > 3 file — bắt buộc plan, không skip

## 6. Subscription plan — khi nào subscription thắng API [All]

**Nguyên tắc**: Pro $20/tháng, Max $100/tháng (5× usage), Max $200/tháng (20× usage), API pay-per-use không subscription. Break-even phụ thuộc usage thực tế.

**Cách tính break-even (xấp xỉ 2026-Q1)**:
- < 50M token/tháng/người: API pay-as-you-go thường rẻ hơn
- 50-200M token/tháng/người: Pro $20 hoặc Max $100 thắng
- 200M-1B+ token/tháng/người: Max $200 ($200 vs $3000+ API)

**Áp dụng SEONGON**:
- Casual user (AM, junior): Pro $20/tháng — đủ cho task hằng ngày
- Power user (senior SEO/Ads/Eng): Max $100/tháng nếu chạy > 5 audit / 5 large task / ngày
- Heavy automation (tự động hóa pipeline 24/7): API pay-per-use với budget cap, không Max
- Team 10 power user × Max $100 = $1000/tháng. Cùng usage trên API có thể là $3000-5000/tháng. Tiết kiệm 60-70%
- **Concurrent session limit** trên Max — kiểm tra trước khi mua, đừng để 1 người dùng cản 5 người khác

## 7. Token budget — biết khi nào dừng [All với CLI]

**Nguyên tắc**: Mỗi task nên có budget ước tính. Burn rate vượt budget → abort, restart với scope hẹp hơn.

**Cách làm**:
- `/cost` trong CLI để xem usage hiện tại
- Estimate trước:
  - Task nhỏ (sửa 1 file): < 10K token
  - Task vừa (debug, refactor 1 module): 20-50K token
  - Task lớn (architect, refactor lớn): 50-200K token
- Vượt 1.5× budget → dừng, không "cố một chút nữa"

**Áp dụng SEONGON**:
- Audit 1 client SEO budget 30K token (~$0.5-1). Vượt 50K → cái gì sai. Dừng, plan lại
- Generate ad copy 30 variant budget 5K token (~$0.1). Vượt 15K → có loop, abort
- Trong CLI viết hook `PostToolUse` log token cumulative → tuần kiểm tra ai burn nhiều bất thường
- Internal billing: track theo project / client để biết audit nào lãi, audit nào lỗ

## 8. Read offset/limit + Edit thay Write — đọc đúng phần [Tier 1 CLI]

**Nguyên tắc**: Đọc cả file 5000 dòng tốn 5000 token. Đọc 50 dòng cần thiết tốn 50 token. Edit gửi diff, Write gửi cả file.

**Cách làm**:
- `Read` với `offset` + `limit` khi biết phần cần đọc
- `Edit` thay vì `Write` cho file đã tồn tại
- `Grep` trước → biết line number → `Read` targeted
- Đừng yêu cầu Claude "read the whole codebase" — vô lý cả về cost lẫn chất lượng

**Áp dụng SEONGON**:
- "Đọc section authentication trong file X (dòng 50-100)" thay vì "đọc cả file X"
- Edit content brief: dùng Edit cho thay đổi từng đoạn, không Write lại cả brief
- Tiết kiệm 30-50% session cost trong codebase lớn (như `seongon_agent`, `image-agent`)

## 9. Background agent — parallelization có giá [Tier 1 CLI]

**Nguyên tắc**: Chạy nhiều agent song song **không** giảm cost — mỗi agent có context riêng nên cost **× số agent**, không chia. Parallel chỉ tiết kiệm **thời gian**.

**Cách làm**:
- 4 subagent song song cho 4 task độc lập = 4× cost, ~1× thời gian (good ROI nếu time-sensitive)
- 4 subagent song song cho 1 task chia nhỏ = 4× cost, không chắc chất lượng tốt hơn (bad ROI thường)
- Cảnh báo: spawn quá nhiều subagent → result không fit vào parent context → fail toàn session, charge full token
- Reasonable limit: 4-8 concurrent worktree per dev

**Áp dụng SEONGON**:
- Research 10 đối thủ song song trước deadline khách → đáng tiền
- "Generate 1 ad variant" chia thành 5 subagent → vô nghĩa, tốn tiền không tiết kiệm thời gian
- Quy tắc: parallelize chỉ khi task **độc lập** + có **deadline thời gian** thực

## 10. Tránh waste vặt — low-hanging optimization [All]

**Nguyên tắc**: Một số habit nhỏ tiết kiệm 10-20% cost mà không ảnh hưởng chất lượng.

**Cách làm**:
- ❌ Đừng yêu cầu Claude đọc lại file đã đọc trong session (Claude vẫn nhớ)
- ❌ Đừng search redundant — search 1 lần, lưu kết quả
- ❌ Đừng Write lại cả file để sửa 5 dòng — dùng Edit
- ❌ Đừng yêu cầu Claude chạy `grep`, `ls`, `cat` cho task đơn giản bạn tự làm được
- ❌ Đừng để Claude session mở idle — sau 5 phút cache chết, tài nguyên vô dụng
- ✅ Ngược lại: viết prompt rõ ngay từ đầu, một lần là xong thay vì 5 vòng iteration
- ✅ Dùng Skills + Slash command để re-use prompt thay vì paste lại

**Áp dụng SEONGON**:
- Onboarding training 1h cho mọi user mới: dạy 5 quy tắc trên + setup CLI cơ bản → tiết kiệm $20-50/người/tháng
- Quy tắc văn phòng: "kết thúc session trước khi đi ăn trưa, đừng để chạy nền"

## 11. Cập nhật pricing 2026 — gì đã đổi [All]

- **Cache TTL: 1h → 5 phút (2026-03)** — silent change, không có changelog public. Workflow giả định cache 1h hiện tăng cost 20-32%. **Đáng quan tâm nhất** trong các thay đổi 2026.
- **Opus 4.7 tokenizer (2026-04)** — pricing per token không đổi nhưng tokenizer mới generate ~30-35% nhiều token hơn cho cùng output. Cost thực tăng tương đương. Sonnet 4.6 trở thành cost-effective hơn cho task lặp lại.
- **Workspace-level cache isolation (2026-02)** — nếu agency dùng nhiều workspace Anthropic, cache không share giữa workspace. Plan accordingly.
- **Max plan rate limit** thay đổi quý 1/2026 — kiểm tra current limit trước khi mua.

---

## Tóm tắt nhanh — Cost guard cho rollout

| Quy tắc | Tier áp dụng | Tiết kiệm xấp xỉ |
|---|---|---|
| 80/10/10 model mixing | All | 40-60% |
| Plan-first cho task lớn | All với CLI/Cowork | 30-50% (avoided rework) |
| Subagent isolation | Tier 1 CLI | 60-90% main context cost |
| `/clear` đúng lúc thay vì `/compact` cold | Tier 1 CLI | 10-30% |
| Read offset/limit + Edit | Tier 1 CLI | 30-50% |
| Pro/Max plan thay vì API | Tier 1, 2 (heavy user) | 50-70% nếu usage cao |
| Tránh waste vặt | All | 10-20% |
| Token budget per task | All | catch outlier sớm |

## Khuyến nghị plan SEONGON

| Vai trò | Plan đề xuất | Hạn ngạch tháng |
|---|---|---|
| AM, junior creator (casual) | Pro $20 | $20 |
| Junior SEO/Ads (regular) | Pro $20 | $20 |
| Senior SEO/Ads (heavy) | Max $100 | $100 |
| Strategy lead (very heavy + Opus) | Max $200 | $200 |
| Automation pipeline 24/7 | API + budget cap | Cap $200/pipeline |

Tổng dự kiến với team 30 người (mix): ~$2000-3000/tháng. So với "không kiểm soát, mọi người Opus mặc định API": $8000-15000/tháng. Tiết kiệm 60-75%.

## Nguồn

- [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Prompt Caching Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Claude Code Cost Optimization](https://code.claude.com/docs/en/costs)
- [How Claude Code Works](https://code.claude.com/docs/en/how-claude-code-works)
- [Cache TTL 5-Minute Change Discussion](https://dev.to/whoffagents/claude-prompt-caching-in-2026-the-5-minute-ttl-change-thats-costing-you-money-4363)
- [Claude Code Pricing 2026 Comparison](https://www.verdent.ai/guides/claude-code-pricing-2026)
- [Subagent Parallelization Issue](https://github.com/anthropics/claude-code/issues/25714)
- [Token Budget Management](https://www.mindstudio.ai/blog/ai-agent-token-budget-management-claude-code)

---

**Cập nhật**: 2026-05-05 · **Liên quan**: [01-performance.md](01-performance.md), [03-personal-development.md](03-personal-development.md)
