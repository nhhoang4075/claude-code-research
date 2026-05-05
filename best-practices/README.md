# Best Practices — Khi đem Claude Code vào SEONGON

Tổng hợp **best practice** khi dùng Claude Code, viết riêng cho hoàn cảnh SEONGON: agency marketing ~150 người, ba tier người dùng (CLI / Cowork / Claude.ai), không phải dev shop. Cập nhật 2026-05-05.

Ba file dưới đây trả lời ba câu hỏi mà mọi tier đều phải đối mặt khi rollout:

| File | Câu hỏi nó trả lời |
|---|---|
| [01-performance.md](01-performance.md) | Làm sao để **output từ Claude Code đạt chất lượng cao nhất** cho công việc marketing? |
| [02-cost-optimization.md](02-cost-optimization.md) | Làm sao để **chi phí token không bùng** khi scale lên cả agency? |
| [03-personal-development.md](03-personal-development.md) | Người dùng cần **chuyển dịch tư duy & kiến thức** thế nào để không trở thành "Claude-button-pusher"? |

## Nguồn dữ liệu

- **Anthropic official docs** — `code.claude.com/docs`, `docs.claude.com`, Anthropic Engineering blog
- **Practitioner essays 2025-2026** — Addy Osmani, Martin Fowler, Sanity, Anthropic Engineering
- **Vietnamese practitioner voices** — GMO-Z.com Vietnam Lab, AZDIGI Blog, A Realistic Dreamer (Saigon Claude Code workshop), ongboit.com
- **Bộ source-assessment 56 nguồn** — xem `data/source-assessment.csv` ở repo gốc

## Khung tổng hợp

Mỗi best practice được trình bày theo cùng một format ngắn:

- **Nguyên tắc** — pattern một câu, dễ nhớ
- **Cách làm** — bước cụ thể hoặc lệnh / config
- **Áp dụng SEONGON** — ví dụ cho SEO / Ads / Content / Analytics / Brand

Không phải tất cả best practice đều áp dụng cho mọi tier. Mỗi mục có gắn nhãn:

- **[Tier 1 CLI]** — chỉ áp dụng cho power user dùng terminal
- **[Tier 2 Cowork]** — áp dụng cho người dùng Claude Cowork (web UI agent)
- **[Tier 3 Claude.ai]** — áp dụng cho người dùng Claude.ai chat thông thường
- **[All]** — áp dụng cho cả ba tier

## Quick takeaway

Nếu chỉ đọc 5 phút:

1. **Mặc định Sonnet 4.6**, escalate Opus 4.7 cho việc khó, drop Haiku 4.5 cho việc đơn giản. Đừng để mọi người chạy Opus mặc định — agency margin sẽ chết.
2. **Plan mode trước khi code/làm việc phức tạp**. 2K token kế hoạch cứu 50K token làm sai hướng.
3. **Cache 5 phút TTL** — nghỉ giải lao quá 5 phút coi như cache chết. Thiết kế workflow để giữ cache ấm hoặc `/clear` rồi bắt đầu lại.
4. **Đọc diff, đừng accept mù** — đặc biệt với marketer non-dev. Claude bịa số liệu SEO rất có sức thuyết phục.
5. **Tư duy "directing not doing"** — kỹ năng cốt lõi mới là viết spec / brief tốt và đọc code / output Claude tạo ra, không phải gõ code.

## Cảnh báo chung

- Tất cả con số chi phí trong file 02 là **xấp xỉ** theo pricing 2026-Q1. Anthropic đã thay đổi cache TTL silently một lần (1h → 5min, 2026-03). Trước khi quyết định mua plan đắt, kiểm tra `code.claude.com/docs/en/costs` và `platform.claude.com/docs/en/about-claude/pricing`.
- Best practice trong file 03 không thay thế **đào tạo cơ bản về marketing**. Nếu nhân viên không vững SEO/Ads fundamentals, Claude Code chỉ làm khuyết điểm đó nguy hiểm hơn vì che lấp bằng output có vẻ chuyên nghiệp.
- Mọi pattern nên được test trên **client cũ / data sandbox** trước khi áp dụng trên client trả tiền.

---

**Cập nhật**: 2026-05-05 · **Tác giả**: SEONGON internal research
