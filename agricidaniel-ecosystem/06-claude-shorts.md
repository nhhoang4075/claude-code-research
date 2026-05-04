# claude-shorts

**Link**: https://github.com/AgriciDaniel/claude-shorts
**Stars**: 78 · **Forks**: 19 · **Pushed**: 2026-05-02 (cập nhật mới nhất)
**Phân loại**: 2 — Kênh Marketing — Video — Long-form → Shortform extractor

| Công nghệ | Độ phổ biến | Phù hợp với SEONGON |
|:---:|:---:|:---:|
| **5** | **2** | **4** |

## Tính năng (What)

Tool tự động **extract clips viral từ video dài** sang vertical format cho YouTube Shorts / TikTok / Instagram Reels.

**Pipeline kỹ thuật**:
- **Remotion v4 + React** rendering với 3 caption styles:
  - **Bold** — ALL CAPS với yellow highlights
  - **Bounce** — spring animations với rotating colors
  - **Clean** — minimal fade-in
- Word-level karaoke highlighting + hook text overlays
- Single pass render at 1080×1920 vertical

**Claude analyzes transcripts theo 5-dimensional scoring**:
1. Hook strength
2. Coherence
3. Emotion
4. Value density
5. Payoff

(Không phải keyword matching — đây là khác biệt lớn)

**Auto cursor detection** cho screen recordings — frame differencing + smooth pan.

**Audio-aware boundary snapping** — cuts xảy ra ở word boundaries + natural silence, không bao giờ giữa câu.

**Output platform-optimized**:
| Platform | Codec | Bitrate | Audio |
|---|---|---|---|
| YouTube Shorts | H.264 | 12 Mbps | 192 kbps |
| TikTok | H.264 (CRF 18) | — | 128 kbps |
| Instagram Reels | H.264 | 4.5 Mbps | 128 kbps |

## Phân tích (So what)

Đây là **mạnh nhất về kỹ thuật** trong nhóm content tools — Remotion + AI scoring + audio-aware boundary là pattern chuyên nghiệp, không phải FFmpeg-wrapper đơn giản.

**Tại sao đáng quan tâm cho SEONGON**:
- **Repurpose case studies & webinars**: SEONGON có data lớn về client work. Long-form (case study video, webinar, talk) → 5–10 Shorts/Reels viral cho LinkedIn + TikTok branding.
- **Content marketing tự thân**: position SEONGON như thought leader Việt Nam về digital marketing → Shorts content cho LinkedIn + TikTok.
- **Add-on cho client B2C**: client F&B/retail thường có video review/promo dài 5–10 phút. Extract Shorts là dịch vụ giá trị cao.

**Lợi thế vs alternative**:
- Đối thủ commercial (Opus Clip, Munch, etc.): subscription $20–50/tháng. claude-shorts là free, chạy local, có thể fork và customize.
- 5-dimensional scoring tốt hơn keyword matching — clip extracted thường có chất lượng story tốt hơn.

**Vấn đề kỹ thuật**:
- Cần GPU (Remotion render). Macbook M-series chạy được; Linux cần NVIDIA NVENC.
- **Vietnamese transcript accuracy** — Whisper-based transcription chưa rõ chất lượng tiếng Việt. Cần test.
- **Output quality** — depend on input quality. Video < 720p, audio noise → output kém.

**Khoảng trống cần lấp**:
- Vietnamese caption styles (font hỗ trợ tiếng Việt, hook texts mặc định tiếng Việt)
- TikTok Vietnam algorithm specifics (trending sounds, hashtag ngày)
- Watermark + branding overlay cho client

## Next-step (Now what)

**Tuần 1 — Test technical feasibility**:
1. **Fork về `seongon/seongon-shorts`**.
2. **Cài lên 1 macbook** trong team — kiểm tra render time + chất lượng output.
3. **Test với 1 SEONGON case study video** (3–5 phút). Đo:
   - Transcription accuracy (Vietnamese)
   - Clip selection quality (hook scoring có hợp với judgment người không?)
   - Render time end-to-end

**Tuần 2 — Vietnamese-fit polish**:
4. **Font tiếng Việt** — bổ sung font hỗ trợ tiếng Việt vào Remotion templates.
5. **SEONGON branding overlay** — logo + watermark mặc định.
6. **Test 5–10 video** — collect output để team đánh giá chủ quan.

**Tuần 3–4 — Decide use case**:
7. Quyết định:
   - Use case A: Internal — cho marketing team SEONGON (LinkedIn + TikTok branding)
   - Use case B: Client service — extract Shorts cho client B2C
   - Use case C: Cả hai

**Tháng 2 — Pilot client**:
8. Nếu chọn B/C: pilot với 1–2 client, đo:
   - Time savings vs editing thủ công
   - View counts trên Shorts vs original video
   - Client willingness to pay

**Decision-makers**:
- Marketing Lead — chủ trì internal use
- Senior Video Editor (nếu có) — đánh giá chất lượng output
- AI/Eng team — fork + cài đặt + Vietnamese polish

**Khuyến nghị**:
- **Tier 2**: Test sau khi `claude-seo` + `claude-ads` đã ổn định. 
- **Skip nếu**: SEONGON không có nội dung dài (case study, webinar, podcast) để repurpose. Tool này không tự tạo content, chỉ extract.

**Câu hỏi mở**:
- Có nên đầu tư SEONGON's own podcast/webinar trước, để có nguồn long-form?
- Sau bao nhiêu video Shorts mới có ROI rõ ràng cho LinkedIn branding?
- Vietnamese audience có watch Shorts khác tone với US/EU không (cần test)?
