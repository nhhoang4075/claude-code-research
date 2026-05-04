# claude-blog

**Link**: https://github.com/AgriciDaniel/claude-blog
**Stars**: 662 · **Forks**: 147 · **Pushed**: 2026-04-30
**Phân loại**: 2 — Kênh Marketing — Content/Blog — Sản xuất, tối ưu SEO + AI citation, quản lý lifecycle

| Công nghệ | Độ phổ biến | Phù hợp với SEONGON |
|:---:|:---:|:---:|
| **5** | **4** | **5** |

## Tính năng (What)

Bộ skill **toàn lifecycle blog content** — từ ý tưởng đến publish-ready, **dual-optimized cho cả Google rankings VÀ AI citation** (ChatGPT, Perplexity, AI Overviews).

**14 core commands**:
- `/blog write` · `/blog rewrite` · `/blog analyze` · `/blog brief` · `/blog calendar` · `/blog strategy` · `/blog outline` · `/blog seo-check` · `/blog schema` · `/blog repurpose` · `/blog geo` · `/blog audit` · `/blog cannibalization` · `/blog factcheck`

**14 advanced sub-skills**:
- Persona management
- CMS taxonomy sync
- NotebookLM research integration
- Audio narration via Gemini TTS
- Image generation/editing (Banana)
- Google API data retrieval (PSI, CrUX, GSC, GA4, NLP, YouTube, Keywords)
- Internal chart generation

**Tích hợp**:
- Google APIs (PageSpeed Insights, Search Console, GA4, YouTube, Keyword Planner, NLP)
- Google NotebookLM (source-grounded research)
- Gemini (image generation + TTS)
- Image platforms: Pixabay, Unsplash, Pexels
- CMS: WordPress, Shopify, Ghost, Strapi, Sanity

**Tính năng độc đáo**:
- **Dual optimization**: Cùng lúc tối ưu cho Google + AI citation platforms (đây là khác biệt chính so với SEO content tools cũ)
- **5-category quality scoring** (100-point): content, SEO, E-E-A-T, technical, AI citability
- **Fact-checking pipeline** — verify số liệu thống kê đối chiếu source URLs
- **Keyword cannibalization detection** — phát hiện nội dung cạnh tranh nội bộ

## Phân tích (So what)

Đây là **mảnh ghép content production** mà bộ claude-seo còn thiếu. Combo `claude-seo + claude-blog` phủ toàn bộ chuỗi từ keyword research → content production → optimization → distribution → monitoring.

**Tại sao "dual optimization" quan trọng cho SEONGON**:
- Vietnamese SEO market đang bắt đầu hỏi về GEO (Generative Engine Optimization) — getting cited bởi ChatGPT/Claude/Gemini khi user hỏi
- Content tối ưu cho Google chưa chắc tối ưu cho AI citation (cấu trúc Q&A, citation patterns, entity references khác nhau)
- Tool nào dual-optimize được sẽ là USP mạnh trong 2 năm tới
- claude-blog đã có sẵn `/blog geo` command + AI citability scoring trong 5-category rubric

**Cơ hội với SEONGON**:
- **Productize "AI-Era SEO Content"**: gói dịch vụ mới = SEO content + AI citation optimization + monthly visibility report. Chưa thấy agency Việt Nam nào làm.
- **Combo claude-blog + claude-seo + claude-prompts**: tạo content engine 3-tầng (research → outline → production) cho team content. 1 senior content có thể manage workflow cho 5–10 client.
- **Anti-AI-slop**: kết hợp với `superseo-skills` (R006) để có anti-AI-slop ruleset đặc biệt cần cho Vietnamese AI-content detector.

**So với competitor**:
- `inhouseseo/superseo-skills` (136 stars) — có anti-slop nhưng không có dual-optimization GEO
- `Animalz` (R023, content marketing agency) — có 6 slash-commands `/write`, `/copywrite` etc. nhưng không tích hợp Google APIs
- `claude-blog` mạnh nhất ở: tích hợp Google APIs + dual optimization + fact-check pipeline

**Khoảng trống cần lấp**:
- Vietnamese tokenization cho E-E-A-T scoring
- CMS Việt Nam chưa hỗ trợ (Haravan, Sapo, MISA — nếu client dùng)
- Anti-AI-slop ruleset tiếng Việt

**Rủi ro**:
- Fact-check chỉ verify URLs — không verify source legitimacy. Cần human review cho content y tế / pháp lý / tài chính.
- AI citation optimization vẫn còn early — chưa có benchmark rõ ràng. Có thể optimization "đoán đúng" hoặc "đoán sai".

## Next-step (Now what)

**Tuần 1 — Đánh giá nhanh**:
1. **Fork** về `seongon/seongon-blog` (private).
2. **Test 14 core commands** trên 1 bài blog SEONGON đã publish — đo gap so với bài đã optimize thủ công.
3. **So sánh `/blog seo-check` với SEMrush/Ahrefs audit** — accuracy, missing checks, false positives.

**Tuần 2 — Tích hợp với claude-seo**:
4. **Workflow combo**: `/seo keyword-research → /blog brief → /blog outline → /blog write → /blog seo-check → /blog schema → /blog factcheck → /blog publish` — chạy thử end-to-end cho 3 bài.
5. **Đo time savings** vs production thủ công truyền thống.

**Tuần 3–4 — Localization phase**:
6. **Anti-AI-slop tiếng Việt** — kết hợp `superseo-skills` Horoscope Test + tinh chỉnh banned vocab tiếng Việt.
7. **Vietnamese persona templates** — tạo 3–5 persona phổ biến cho content B2C Việt Nam (gen Z trẻ tuổi, mom-blogger, business owner SME, etc.).

**Tháng 2 — Productize**:
8. **Đề xuất gói "AI-Era SEO Content"**: 10 bài/tháng + monthly AI citation visibility report. Pricing tier riêng.
9. **Test với 1 client willing** — đo brand mention trong AI answers (ChatGPT, Claude, Perplexity) trong 2 tháng.

**Decision-makers**:
- Content Lead — chủ trì workflow design
- SEO Senior — phối hợp với SEO output
- AM/Sales — package & price

**Câu hỏi mở**:
- Có nên đầu tư localize anti-slop ngay (Q2) hay chờ thị trường Việt Nam có AI-detector trưởng thành (Q3–Q4)?
- AI citation visibility có đo được rõ ràng cho client để báo cáo không?
- Khi nào content "viết bằng AI" trở thành tín hiệu negative cho Google ranking (rủi ro với client conservative)?
