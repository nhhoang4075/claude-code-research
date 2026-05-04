# claude-repurpose

**Link**: https://github.com/AgriciDaniel/claude-repurpose
**Stars**: 32 · **Forks**: 8 · **Pushed**: 2026-04-10
**Phân loại**: 2 — Kênh Marketing — Content — 1 nội dung → 10+ platform-optimized posts

| Công nghệ | Độ phổ biến | Phù hợp với SEONGON |
|:---:|:---:|:---:|
| **4** | **2** | **4** |

## Tính năng (What)

Biến **1 nội dung gốc thành 10+ platform-optimized posts** trong vài giây.

**Input**: YouTube video, blog post, podcast, hoặc local file.

**18 platforms supported**:
Twitter/X · Threads · LinkedIn · Instagram · TikTok · Pinterest · Snapchat · Facebook · YouTube Community · Skool · Discord · newsletters · Reddit · Quora · Medium · WhatsApp · Telegram · quote graphics (với SEO metadata)

**Per-platform optimization** dựa trên algorithmic preferences. Ví dụ:
- Twitter threads → +63% impressions
- LinkedIn PDF carousels → 6.60% engagement
- Instagram mixed-media → outperform single images
- Mỗi platform: character limits riêng, format riêng, audience expectations riêng

**Cơ chế**: Parallel agents sản xuất tất cả output đồng thời → output directory 30+ files organized theo platform.

## Phân tích (So what)

Đây là tool **multiplicative content** — đầu tư 1 lần, content distribution 10+ kênh.

**Cơ hội cho SEONGON**:
- **Internal use**: Mỗi blog post / case study của SEONGON → 18 distribution channels. Tăng reach mà không tăng cost sản xuất.
- **Client service add-on**: "Content Distribution Service" — client viết 1 bài, SEONGON repurpose ra 10+ platform. Recurring revenue, low marginal cost.
- **Combo với claude-blog**: pipeline `claude-blog write → claude-repurpose` — sản xuất bài + distribute trong cùng workflow.
- **Combo với claude-shorts**: long-form video → claude-shorts (extract Shorts) + claude-repurpose (post graphic + thread + carousel) → multi-platform launch hoàn chỉnh.

**Lợi thế cụ thể**:
- **18 platforms** — bao trùm hầu hết kênh phổ biến cho B2C + B2B + creator
- **Không phải copy-paste**: tool adapt nội dung theo character limit + format + audience của từng platform, không phải post identical text everywhere

**Vấn đề**:
- **Stars 32** — niche, chưa được test rộng rãi
- **Vietnamese platforms missing**: Zalo (Việt Nam), Lotus (Việt Nam — đã đóng), Coccoc Communities, Báo điện tử Việt Nam. Tool focus thị trường US/global.
- **Vietnamese tone calibration**: tone LinkedIn Vietnamese khác US (formal hơn, ít aggressive sales). Cần fine-tune.

**Khoảng trống cần lấp**:
- Zalo Official Account post format
- Vietnamese LinkedIn tone (giảm CTA aggressiveness)
- Vietnamese hashtag conventions (e.g., #marketing → #marketing #digital — không phải pure tag tiếng Anh)

## Next-step (Now what)

**Tuần 1 — Test feasibility**:
1. **Fork về `seongon/seongon-repurpose`**.
2. **Test với 1 SEONGON blog post** (Vietnamese) — generate 18 platform versions, đánh giá chủ quan.
3. **Đo time vs manual** — nếu team Marketing thường repurpose thủ công, baseline bao nhiêu giờ?

**Tuần 2 — Vietnamese-fit**:
4. **Thêm Zalo platform** vào output (nếu có client dùng Zalo OA).
5. **Adjust tone Vietnamese**: tinh chỉnh prompt để output LinkedIn ít salesy hơn, Twitter/X giảm slang phương Tây.
6. **Hashtag conventions** — kết hợp tag Anh + Việt theo pattern phổ biến.

**Tuần 3–4 — Internal pilot**:
7. **Áp dụng cho SEONGON blog** — mỗi bài blog → 10 platform posts. Đo engagement increase trong 4 tuần.

**Tháng 2 — Decide productize**:
8. Quyết định productize thành "Content Distribution Service" hay không, dựa trên:
   - Internal lift on engagement
   - Client willingness to pay
   - Maintenance overhead

**Decision-makers**:
- Content Lead / Marketing Lead — chủ trì internal pilot
- AM phụ trách client content-heavy

**Khuyến nghị**:
- **Tier 2**: làm sau claude-blog. Combo blog + repurpose mới hợp lý.
- **Internal first**: dùng cho SEONGON's own marketing trước. Sau khi internal có kết quả mới pitch client.

**Câu hỏi mở**:
- SEONGON's own social presence cần grow trước (LinkedIn, FB) — repurpose có giúp không?
- Vietnamese clients có cần distribution sang nhiều platform không (vs chỉ FB + Zalo)?
- Có rủi ro AI-generated content bị flag bởi platform algorithm (especially LinkedIn) không?
