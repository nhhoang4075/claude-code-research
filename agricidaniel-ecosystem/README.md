# Hệ sinh thái AgriciDaniel — Bộ skill Claude Code cho Marketing

Deep-dive về các tool **liên quan trực tiếp đến marketing** trong bộ `claude-*` của tác giả GitHub `AgriciDaniel`. Riêng `claude-seo` và `claude-ads` đã chiếm hơn **10,000 stars** — đây là cộng đồng practitioner đã xác thực, không phải tool tử tế "vài người dùng" (số liệu cập nhật 2026-05-04).

## Khung đánh giá

Áp dụng framework nội bộ SEONGON (theo `06_04_2026.docx` và `13_04_2026.docx`):

Mỗi tool được chấm trên 3 chiều, thang **1–5**:

| Chiều | Ý nghĩa |
|---|---|
| **Công nghệ** | Độ tân tiến — AI thực thụ, kiến trúc multi-agent, khó copy, hạ tầng đặc biệt |
| **Độ phổ biến** | Mức được kiểm chứng trên thị trường — GitHub stars là chỉ số chính |
| **Phù hợp với SEONGON** | Trùng dịch vụ chính (SEO/Google Ads/Facebook Ads/Branding) hay xa hơn |

Mỗi doc tool gồm **3 mục** (theo đúng framework `WHAT / SO WHAT / NOW WHAT`):
- **Tính năng (What)** — Tool làm gì, có những skill/sub-agent nào
- **Phân tích (So what)** — Ý nghĩa với SEONGON, cơ hội & rủi ro
- **Next-step (Now what)** — Hành động cụ thể, ai tiếp nhận, giai đoạn tiếp

## Ai là AgriciDaniel?

GitHub user `AgriciDaniel`. Không có danh tính tổ chức được xác thực công khai — chỉ là handle. Tuy nhiên:

- 18 repo `claude-*` được duy trì đều đặn (created 2026-01 đến 2026-04)
- Tổng > **15,000 stars** trên các repo
- Mỗi repo có README sâu, code production-grade, methodology rõ ràng
- Không có dấu hiệu thương mại hóa rõ rệt (không bán plan paid, không có CTA mua hàng)

Theo framework chấm điểm chính (xem `data/source-assessment.csv` ở thư mục gốc), AUTH = 2 (handle vô danh, không xác thực được tổ chức) nhưng ADOPT = 5 (vì stars cao). Quality of artifact ≠ verifiable authority — đó là lý do tại sao bộ này vẫn đáng test, nhưng phải test thay vì tin lời.

## Tổng quan các tool — sắp theo độ phù hợp với SEONGON

### Nhóm 1 — Trùng dịch vụ chính (priority cao nhất)

| Tool | Stars | Công nghệ | Phổ biến | Phù hợp | Doc |
|---|---:|:---:|:---:|:---:|---|
| **claude-seo** | 5,961 | 5 | 5 | 5 | [01-claude-seo.md](01-claude-seo.md) |
| **claude-ads** | 4,159 | 5 | 5 | 5 | [02-claude-ads.md](02-claude-ads.md) |
| **claude-blog** | 662 | 5 | 4 | 5 | [03-claude-blog.md](03-claude-blog.md) |
| **claude-email** | 40 | 4 | 2 | 4 | [04-claude-email.md](04-claude-email.md) |

### Nhóm 2 — Công cụ sản xuất & phân phối content (cross-cutting)

| Tool | Stars | Công nghệ | Phổ biến | Phù hợp | Doc |
|---|---:|:---:|:---:|:---:|---|
| **claude-youtube** | 80 | 4 | 2 | 4 | [05-claude-youtube.md](05-claude-youtube.md) |
| **claude-shorts** | 78 | 5 | 2 | 4 | [06-claude-shorts.md](06-claude-shorts.md) |
| **claude-repurpose** | 32 | 4 | 2 | 4 | [07-claude-repurpose.md](07-claude-repurpose.md) |
| **claude-video** | 9 | 4 | 1 | 3 | [08-claude-video.md](08-claude-video.md) |
| **claude-music** | 5 | 4 | 1 | 2 | [09-claude-music.md](09-claude-music.md) |

### Không nằm trong scope deep-dive (chỉ liệt kê)

Các tool khác của AgriciDaniel **không liên quan trực tiếp đến marketing**, nên không deep-dive:

- `claude-obsidian` (4,093 ⭐) — knowledge management cho Obsidian (utility cá nhân/nội bộ)
- `claude-prompts` (76 ⭐) — prompt library cho image/video AI (utility designer)
- `claude-canvas` (60 ⭐) — Obsidian Canvas visual production (utility nội bộ)
- `claude-cybersecurity` (106 ⭐) — code security review
- `claude-mint` (8 ⭐) — Linux desktop assistant
- `claude-code-essentials-vs-code` (46 ⭐) — VS Code setup guide
- `claude-gif` (12 ⭐) — GIF creator
- `claude-avatar` (11 ⭐) — 3D talking avatar
- `claude-skills` (8 ⭐) — meta-aggregator 232+ skills

> *Nếu sau này SEONGON cần knowledge management nội bộ (claude-obsidian) hoặc prompt library cho team designer (claude-prompts), có thể quay lại review riêng.*

## Logic chấm điểm chi tiết

### Công nghệ (1–5)
- **5** — Multi-agent architecture, novel patterns, sub-skills + extensions, MCP integration. Ví dụ: claude-seo (12 subagents chạy song song, 19 sub-skills, 3 extensions DataForSEO/Firecrawl/Banana)
- **4** — AI-orchestrated workflow, modern stack, sub-skills rõ ràng. Ví dụ: claude-email (6 sub-skills, MCP cho Gmail/Outlook)
- **3** — AI-assisted, chủ yếu orchestration sẵn có
- **2** — Light AI, mostly automation
- **1** — Basic

### Độ phổ biến (1–5) — theo GitHub stars
- **5** — ≥ 3,000 stars (canonical / market leader)
- **4** — 200–2,999 stars (strong adoption)
- **3** — 50–199 stars (mid traction)
- **2** — 20–49 stars (niche / mới)
- **1** — < 20 stars

### Phù hợp với SEONGON (1–5)
- **5** — Trùng SEO / Google Ads / Facebook Ads / Digital Branding
- **4** — Cross-cutting cho mọi dịch vụ (content, video repurpose, email)
- **3** — Adjacent service hoặc tooling
- **2** — Tiếp tuyến
- **1** — Không liên quan

## Tổng kết & khuyến nghị nhanh

**Nên test ngay (Tier 1)**: `claude-seo` + `claude-ads` + `claude-blog` — trùng dịch vụ chính, có proof-of-adoption mạnh, có thể fork và localize cho thị trường Việt Nam.

**Test sau (Tier 2)**: `claude-email` (email marketing add-on), `claude-shorts` + `claude-repurpose` (content distribution), `claude-youtube` (nếu có client làm YouTube).

**Cân nhắc thấp (Tier 3)**: `claude-video` và `claude-music` — stars quá nhỏ, có alternative tốt hơn. Có thể skip Q2 2026.

Trong các deep-dive sau, mỗi tool sẽ có Next-step cụ thể chỉ rõ ai trong team SEONGON nên tiếp nhận và lộ trình test.

## Cảnh báo phổ biến

Mọi tool đều bởi handle vô danh. Trước khi bring-into-production:

1. **Audit code** — đọc code thật, không chỉ tin README. Đã có repo open-source giả lập feature mà không thực sự work.
2. **Test trên sandbox** — không chạy trực tiếp lên client account. Đặc biệt với `claude-ads` và `claude-email` (có thể bị Meta/Gmail flag).
3. **Fork chứ đừng dùng trực tiếp** — fork về org SEONGON, audit security, rồi mới deploy. Tác giả có thể bỏ duy trì repo bất kỳ lúc nào.
4. **MCP credentials** — nhiều skill yêu cầu API keys (Google Ads, Meta Ads, GA4, GSC). Quản lý credentials tập trung qua môi trường staging trước khi cấp prod.

---

**Cập nhật**: 2026-05-04 · **Tác giả analysis**: SEONGON internal research · **Khung tham chiếu**: 06_04_2026.docx + 13_04_2026.docx
