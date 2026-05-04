# claude-seo

**Link**: https://claude-seo.md
**Phân loại**: 2 — Kênh Marketing — SEO — Toàn diện (audit, content, local, GEO, schema, technical)

| Công nghệ | Độ phổ biến | Phù hợp với SEONGON |
| :-------: | :---------: | :-----------------: |
|   **4**   |    **4**    |        **5**        |

## Tính năng (What)

Bộ skill Claude Code dành riêng cho SEO — phủ toàn bộ chuỗi giá trị SEO ở một tool duy nhất.

**21 sub-skills**:

- Technical SEO audit (9-category, Core Web Vitals + crawlability + indexation)
- On-page analysis
- E-E-A-T quality assessment (theo Sept 2025 guidelines)
- Schema markup (JSON-LD detection, validation, generation)
- Image optimization (alt text, AVIF/WebP, image SERP)
- Sitemap architecture
- AI Search Optimization / GEO (Google AI Overviews, ChatGPT, Perplexity)
- Local SEO (GBP, NAP, citations, reviews)
- Maps Intelligence (geo-grid tracking, GBP audits)
- Semantic clustering
- Search Experience Optimization (SXO) — page-type, persona mapping
- SEO Drift Monitoring (baseline + change detection)
- E-commerce SEO (product schema, marketplace intelligence)
- International SEO + hreflang
- FLOW Framework (41 AI prompts evidence-led)
- Google SEO APIs (GSC, PSI, CrUX, Indexing, GA4)
- PDF report generation (enterprise A4, charts via WeasyPrint)
- Programmatic SEO (data-driven page generation + quality safeguards)
- Competitor pages ("X vs Y", alternatives)
- Backlink analysis (Moz, Bing, Common Crawl free tier)
- Strategic planning templates (SaaS, local, e-commerce, publisher, agency)

**12 subagents** chạy song song dưới `seo-audit` orchestrator: seo-technical, seo-content, seo-schema, seo-geo, seo-local, seo-cluster, seo-sxo, seo-drift, seo-ecommerce, seo-hreflang, seo-programmatic, seo-competitor-pages.

**3 extensions**:

- **DataForSEO** — 22 commands, 9 API modules (live SERP, keyword volume, backlinks, AI visibility)
- **Firecrawl** — full-site crawling, URL discovery, sitemap
- **Banana** — AI image generation (OG previews, blog heroes, product photos)

**Tích hợp**:

- Google APIs: GSC, PSI, CrUX, Indexing, GA4, Keyword Planner, NLP
- MCP servers: Ahrefs, Semrush, DataForSEO, GSC, PSI, Firecrawl
- Free backlink data: Moz, Bing, Common Crawl

**Quality gates**: programmatic SEO cảnh báo ở 100+ pages, hard stop ở 500+ chưa audit. Local SEO cảnh báo 30+ locations, hard stop 50+. Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.

## Phân tích (So what)

Đây là **bộ tool SEO mạnh nhất hiện tại** trong hệ sinh thái Claude Code. 5,961 stars + 910 forks (~ tỷ lệ fork/star 15% — cao bất thường, có nghĩa là người dùng không chỉ bookmark mà thực sự fork để dùng).

**Trùng 100% với business model SEO của SEONGON**:

- Toàn bộ chuỗi audit → content brief → optimize → monitor đều có sub-skill phụ trách
- Có sẵn integration với Ahrefs/Semrush/DataForSEO mà SEONGON đã/đang dùng
- Có sẵn local SEO (Google Business Profile, citation) — quan trọng cho client dịch vụ địa phương Việt Nam
- Có sẵn GEO subagent — giải quyết câu chuyện "SEO sẽ chết vì AI Overviews" mà các SEO senior đang lo

**Khoảng trống cần lấp khi đem về SEONGON**:

- Tokenization tiếng Việt cho E-E-A-T scoring và anti-slop content
- Cốc Cốc-specific (search engine Việt Nam, tuy share nhỏ nhưng có)
- Citation network địa phương (foody.vn, các trang review tiếng Việt, GMB Vietnamese)
- Schema markup pattern cho doanh nghiệp Việt Nam
- Brand-mention monitoring cho tiếng Việt trên ChatGPT/Claude/Gemini

**Rủi ro**:

- Tác giả `AgriciDaniel` không có danh tính xác thực. Repo có thể bị bỏ duy trì bất ngờ. Cần fork về org SEONGON ngay.
- Quality gates tốt nhưng vẫn cần human-in-the-loop cho output cuối cùng — SEO output sai có thể làm rớt rank thay vì lên rank.
- Yêu cầu API keys nhiều platform (DataForSEO, Ahrefs, Semrush) — chi phí tích lũy có thể đáng kể nếu chạy audit tự động cho nhiều client.

**So với competitor trong list**:

- `inhouseseo/superseo-skills` (136 stars) chỉ có 11 skills, ít hơn nhiều, nhưng có **anti-AI-slop ruleset** (Horoscope Test) — claude-seo không có. Nên lấy luôn cả 2.
- `aaron-he-zhu/seo-geo-claude-skills` (1,470 stars) có CORE-EEAT 80-item + CITE 40-item frameworks — bổ sung cho GEO subagent của claude-seo.

## Next-step (Now what)

**Tuần 1–2 — R&D phase**:

1. **Fork về org SEONGON** — tạo `seongon/seongon-seo` (private), đọc audit code, đặc biệt phần xử lý API credential.
2. **Test sandbox** — chạy `/seo audit` trên 3 website client (xin phép trước). So sánh output với bản audit gần nhất do senior SEO làm thủ công. Đánh giá: completeness, accuracy, false positive rate.
3. **Đọc kỹ FLOW Framework + Google APIs flow** — đây là phần khác biệt nhất so với tool SEO truyền thống.

**Tuần 3–4 — Localization sprint**: 4. **Vietnamese tokenization** — fork phần E-E-A-T scoring và tinh chỉnh cho tiếng Việt. Có thể cần đầu tư 1 tuần senior SEO + 1 tuần dev. 5. **Cốc Cốc + citation pattern Việt Nam** — bổ sung dataset citation cho seo-local subagent. 6. **Test E-E-A-T trên content tiếng Việt** — so với `inhouseseo/superseo-skills` Horoscope Test xem lựa chọn nào ổn cho thị trường Việt.

**Tháng 2 — Production rollout**: 7. **Train 2 senior SEO** dùng được CLI (Tier 2 power users theo three-tier adoption). 8. **Wrap thành CLI + UI nội bộ** — để junior SEO + AM dùng được không cần terminal. 9. **Tích hợp vào pricing** — đề xuất gói "AI-augmented SEO audit" cho client mới, dựa trên claude-seo + custom layer.

**Tham khảo & decision-makers**:

- Senior SEO Lead → ai chủ trì test phase
- AI/Eng team → ai chủ trì fork + localize
- Sales/AM → ai chủ trì rebrand thành dịch vụ bán cho client

**Câu hỏi mở cho buổi review tiếp**:

- Có nên đầu tư localize toàn bộ không, hay chỉ phần GEO + local SEO?
- Bao nhiêu client sẵn sàng trả thêm cho audit AI-driven (so với audit do human làm)?
- Khi nào client của SEONGON sẽ bắt đầu hỏi về GEO?
