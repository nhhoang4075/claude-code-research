# claude-ads

**Link**: https://github.com/AgriciDaniel/claude-ads
**Stars**: 4,159 · **Forks**: 673 · **Pushed**: 2026-04-24
**Phân loại**: 2 — Kênh Marketing — Paid Ads — Toàn diện (audit, optimization, creative, reporting cho 7 platform)

| Công nghệ | Độ phổ biến | Phù hợp với SEONGON |
|:---:|:---:|:---:|
| **5** | **5** | **5** |

## Tính năng (What)

Bộ skill audit & optimize quảng cáo trả phí, phủ **7 platform** với tổng cộng **250+ checks**.

**Phân chia checks theo platform**:
| Platform | Checks |
|---|---:|
| Google Ads | **80** (Search, PMax, AI Max, Demand Gen, CTV, YouTube) |
| Meta Ads | **50** (Pixel/CAPI, Andromeda creative diversity, Structure, Audience) |
| LinkedIn Ads | **27** (B2B targeting, TLA, Lead Gen, CRM integration) |
| TikTok Ads | **28** (Creative-first, Smart+, GMV Max, Search Ads, Events API) |
| Microsoft Ads | **24** (Google import safety, Copilot, CTV, LinkedIn targeting, video) |
| Apple Ads | **35+** (Campaign structure, CPPs, Maximize Conversions, AdAttributionKit) |
| Cross-platform | **3+** (Privacy infrastructure, creative diversity, refresh cadence) |

**Sub-skills chuyên biệt**:
- Creative audit
- Landing page assessment
- Budget/bidding review
- Competitor intelligence
- A/B testing framework
- PPC financial modeling
- PDF reporting
- AI creative generation

**Tích hợp data**:
- **Google Ads MCP**: `mcp-google-ads` (29 GAQL tools)
- **Meta Ads**: Adspirer MCP hoặc `fetch_meta_ads.py` script
- **LinkedIn Ads**: GrowthSpree MCP hoặc Adzviser MCP
- Hoặc data nhập tay (CSV exports, screenshots, paste metrics)

**12 industry templates**: SaaS, ecommerce, local service, B2B enterprise, info products, mobile app, real estate, healthcare, finance, agency, generic.

**Cơ sở chấm điểm**: weighted severity scoring dựa trên ~16,000+ campaigns research từ WordStream, Triple Whale, etc.

## Phân tích (So what)

Đây là **bộ skill paid ads phủ rộng nhất** trong hệ sinh thái Claude Code. Tỷ lệ fork/star 16% — chứng tỏ adoption mạnh. Không có competitor mở nào tương đương (HeyOz có 10 Meta-only skills nhưng phạm vi hẹp).

**Trùng 100% với 2 dịch vụ paid của SEONGON**:
- **Google Ads**: 80 checks bao trùm tất cả format mà SEONGON đang chạy cho client
- **Facebook/Meta Ads**: 50 checks bao gồm cả phần phức tạp như Pixel/CAPI deduplication, Andromeda creative diversity (algorithm bias-correction)
- **Microsoft Ads + Apple Ads + TikTok**: bonus, có thể mở rộng dịch vụ

**Cơ hội quan trọng**:
- **Audit-as-pre-pitch**: Chạy claude-ads audit trên prospect trước khi pitch — surface 5–10 issue cụ thể. Tỷ lệ close prospect tăng đáng kể vì show được "chúng tôi nhìn thấy gì mà bạn chưa thấy".
- **Recurring monthly audit**: Đã có format PDF output — có thể bán thành dịch vụ recurring "Monthly Ads Health Check" cho client subscribed.
- **Industry templates**: 12 templates có sẵn, nhưng chưa có Vietnam-specific industry. Cơ hội tạo `seongon-vietnam-template` cho retail Việt, F&B Việt, edu Việt — thành IP riêng.

**Rủi ro & compliance**:
- **Meta API ban risk** — đặc biệt nguy hiểm với client account. Bắt buộc dùng Adspirer MCP / GrowthSpree thay vì raw API. Tham khảo PorterMetrics article (R017 trong source assessment).
- **Approval gates** — tool có thể chỉ ra issue, nhưng không nên auto-fix. Mọi thay đổi bid/budget/pause phải có human approval.
- **API cost** — chạy audit cho nhiều client mỗi tuần có thể tốn API credits đáng kể. Cần track ROI.

**Khoảng trống cần lấp**:
- Vietnamese ad copy compliance (cấm từ ngữ theo Luật Quảng cáo Việt Nam)
- Vietnam-specific ad cost benchmark (CPC, CPM theo ngành ở Việt Nam thấp hơn US, cần tinh chỉnh severity threshold)
- Tích hợp Cốc Cốc Ads (nếu client có chạy)

**So với Anthropic Growth Marketing team workflow**:
- Anthropic dùng sub-agent kiến trúc "1 agent cho headlines, 1 agent cho descriptions" — đây chính là pattern claude-ads áp dụng
- Anthropic claim ad copy time: 2h → 15min — claude-ads workflow hỗ trợ chính xác use case này

## Next-step (Now what)

**Tuần 1 — R&D đánh giá**:
1. **Fork về org SEONGON** — `seongon/seongon-ads` (private). Đọc audit code đặc biệt phần API authentication và rate-limit handling.
2. **Cài lên sandbox** — kết nối với 1 Google Ads + 1 Meta Ads test account (KHÔNG client account).
3. **Chạy 80 Google Ads checks** trên SEONGON's own ad account — ngạc nhiên gì không? So sánh với manual audit do senior PPC làm.

**Tuần 2 — Pilot một service line**:
4. **Chọn 1 client SEONGON** (xin phép) — chạy claude-ads audit + so sánh kết quả với report Q1/Q2 mà SEONGON đã làm thủ công.
5. **Ghi lại false positives + missed issues** — đây là data để tune severity threshold cho thị trường Việt.

**Tuần 3–4 — Productize cho prospect pitching**:
6. **Tạo template "Free Ads Audit"** dành cho prospect — chạy claude-ads + custom presentation layer (logo SEONGON, tiếng Việt, 5 issues prioritized).
7. **Test với 5 prospect** — so close-rate vs cách pitch cũ.

**Tháng 2 — Production rollout**:
8. **Wrap thành web UI nội bộ** — để AM tự chạy audit không cần terminal.
9. **Tích hợp vào CRM** — mỗi prospect đều có audit report sẵn trước call.
10. **Train Tier 2 power user** (1 senior PPC) — họ là người duy trì + customize template cho client mới.

**Compliance & safety checklist trước production**:
- [ ] Kết nối qua Adspirer MCP (không raw API)
- [ ] System user per client (không share session)
- [ ] Rate-limit + jitter trong custom MCP nếu có
- [ ] Audit log mọi action

**Decision-makers**:
- Senior PPC Lead — chủ trì pilot phase
- Compliance / Legal team — review API ban risk
- Sales/AM — chủ trì productize "Free Ads Audit" thành sales tool

**Câu hỏi mở cho buổi review tiếp**:
- Có nên free hay paid hóa "Audit-as-pre-pitch"?
- Bao lâu thì re-run audit (weekly? monthly?) — ROI vs API cost
- Có nên mở rộng sang TikTok Ads + Apple Ads (SEONGON chưa cung cấp)?
