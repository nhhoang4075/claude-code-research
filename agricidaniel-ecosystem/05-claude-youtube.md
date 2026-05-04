# claude-youtube

**Link**: https://github.com/AgriciDaniel/claude-youtube
**Stars**: 80 · **Forks**: 12 · **Pushed**: 2026-04-10
**Phân loại**: 2 — Kênh Marketing — Video — YouTube channel + video SEO + retention + monetization

| Công nghệ | Độ phổ biến | Phù hợp với SEONGON |
|:---:|:---:|:---:|
| **4** | **2** | **4** |

## Tính năng (What)

Biến Claude Code thành **YouTube growth consultant** — recommendation dựa trên platform benchmark + actual channel metrics, không phải lời khuyên chung chung.

**14 sub-skills**:
- **Channel ops**: full audits, strategy planning, content calendars
- **Video production**: retention-engineered scripts, hook variants, thumbnail briefs với A/B testing
- **Optimization**: video SEO packages, Shorts production, metadata
- **Analytics & growth**: performance interpretation, competitor analysis, video ideation với ranking
- **Monetization**: revenue strategy across **7 income streams**, brand deal pricing, cross-platform repurposing

**Tích hợp**:
- **YouTube Data API v3** — channel + analytics data
- **DataForSEO MCP** — keyword research, YouTube SERP analysis, trend intelligence
- **NanoBanana MCP** — AI thumbnail generation (Gemini)
- Manual data input nếu API chưa config

**Kiến trúc**: 39-file, **14 sub-skills + 9 channel templates + 9 reference guides**, parallel agent processing (4 agents chạy song song cho competitor research), niche-specific benchmarks (education, entertainment, tutorial — adaptive).

## Phân tích (So what)

YouTube không phải core service của SEONGON, nhưng đáng quan tâm:

**Khi nào hữu ích cho SEONGON**:
- Client có YouTube channel + muốn grow (B2C đặc biệt: F&B, retail, edu, beauty)
- SEONGON's own brand cần build channel để showcase case studies
- Combo với `claude-shorts` để repurpose long-form → Shorts

**Mạnh điểm cụ thể**:
- **Retention-engineered scripts**: viết script với hook + retention curve được tính toán theo benchmark
- **9 channel templates**: education, tutorial, entertainment, etc. — có thể remap sang ngành Việt Nam
- **Niche-specific benchmarks**: tránh áp dụng "standard" mà không phù hợp với niche

**Vấn đề**:
- **Stars 80** — niche, chưa được test rộng rãi. Cần audit kỹ.
- **Vietnamese-specific data**: benchmarks dựa trên data US/EU. Vietnamese YouTube có dynamic khác (subscriber count thấp hơn cùng level, engagement cao hơn, thumbnail style khác).
- **Monetization streams**: chủ yếu cho creator economy, không phù hợp với business YouTube channel.

**Nên dùng kết hợp**:
- `claude-youtube` (long-form) + `claude-shorts` (extract clips) + `claude-repurpose` (post sang nền tảng khác) → content engine YouTube hoàn chỉnh

## Next-step (Now what)

**Tuần 1 — Đánh giá use case**:
1. **Survey clients SEONGON** — bao nhiêu client có YouTube channel? Bao nhiêu muốn grow?
2. **Fork về `seongon/seongon-youtube`**.
3. **Test trên SEONGON's own channel** (nếu có) hoặc 1 client volunteer.

**Tuần 2–4 — Khi (và chỉ khi) survey cho thấy có demand**:
4. **Localize 9 channel templates** cho ngành Việt Nam phổ biến: F&B, beauty, retail, finance, edu.
5. **Test combo claude-youtube + claude-shorts**: long-form audit + Shorts extraction → đo time savings.
6. **Vietnam YouTube benchmarks** — collect data 50 channels Việt Nam mỗi niche để tinh chỉnh threshold.

**Tháng 2 — Productize hoặc bỏ**:
7. **Quyết định**: nếu < 5% client SEONGON quan tâm → bỏ. Nếu nhiều hơn → tạo "YouTube Growth Audit" như add-on.

**Decision-maker**:
- Marketing Lead / Content Lead
- AM phụ trách client B2C (F&B, retail) — họ biết client có YouTube không

**Khuyến nghị**:
- **Đây là tier 2** — không phải priority. Chỉ làm sau khi `claude-seo`, `claude-ads`, `claude-blog` đã productize.
- Nếu SEONGON không có client YouTube → **skip**. Đừng đầu tư R&D cho thị trường mình chưa serve.

**Câu hỏi mở**:
- SEONGON có ý định mở rộng sang creator economy / influencer agency không?
- TikTok có lớn hơn YouTube ở thị trường target không (B2C Việt Nam)?
- Nếu có client B2B với YouTube → chiến lược khác (LinkedIn-style B2B YouTube) — claude-youtube hỗ trợ không?
