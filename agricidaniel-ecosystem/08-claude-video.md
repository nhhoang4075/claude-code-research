# claude-video

**Link**: https://github.com/AgriciDaniel/claude-video
**Stars**: 9 · **Forks**: 4 · **Pushed**: 2026-04-06
**Phân loại**: 2 — Kênh Marketing — Video — AI video production suite (edit, transcode, caption, generate)

| Công nghệ | Độ phổ biến | Phù hợp với SEONGON |
|:---:|:---:|:---:|
| **4** | **1** | **3** |

## Tính năng (What)

**AI-powered video production suite** trong terminal Claude Code — kết hợp editing, transcoding, captioning, AI generation.

**Core capabilities**:
- **Editing**: trim, merge, transitions
- **Transcoding** với GPU acceleration (NVIDIA NVENC)
- **Speech-to-text captioning** với animated subtitles (Whisper)
- **Quality analysis** qua FFprobe metrics
- **AI video generation** qua Google Veo 3.x

**Sub-pipelines**:
- **Shortform conversion**: longform → TikTok/Reels/Shorts (9:16, auto-transcribe + caption)
- **Captioning pipeline**: Whisper transcription + word-by-word animated subtitles
- **Stock footage promos**: Pixabay/Pexels integration + Remotion + "contrast-aware adaptive text" (adjust backing plates theo frame luminance)
- **Audio enhancement**: loudness normalization, noise reduction, Gemini TTS voiceovers

**Integrations**:
- **Google Veo 3.x** — text-to-video
- **FFmpeg 6.x+** — H.264, H.265, AV1, VP9, ProRes
- **NVIDIA NVENC** — GPU encoding (optional)
- **Whisper** — speech recognition
- **Remotion** — programmatic video creation

## Phân tích (So what)

Tool kỹ thuật mạnh, nhưng **stars 9** — quá niche, chưa được kiểm chứng. Không nên ưu tiên cho SEONGON ngay.

**Khi nào hữu ích**:
- SEONGON có team video production riêng → tool support tự động hóa edit thường ngày
- Nhu cầu generate stock footage promo nhanh (claude-video làm được)
- Audio enhancement cho podcast SEONGON (nếu có)

**Vấn đề chính**:
- **Veo API cost** — generate video qua Veo không free. ROI cần tính kỹ.
- **GPU requirement** — cần dedicated machine với NVENC, không chạy trên macbook tốt.
- **Overlap với claude-shorts** — claude-shorts (78 stars, 2026-05-02 update) chuyên hơn về Shortform pipeline. claude-video phủ rộng hơn nhưng less focused.

**Khuyến nghị thực tế**:
- Nếu cần short-form: dùng `claude-shorts` (chuyên hơn)
- Nếu cần long-form video AI generation: cân nhắc Veo API trực tiếp + workflow custom (không qua claude-video)
- Tool này phù hợp với **dev-heavy** team có nhu cầu pipeline tự động hóa cao. SEONGON có thể chưa cần.

## Next-step (Now what)

**Tuần 1 — Quick assessment**:
1. **Đọc README + thử 1 sub-pipeline** (stock footage promo) — đánh giá chất lượng output cho 1 promo SEONGON-branded.
2. **So sánh với claude-shorts** — tool nào phù hợp hơn cho Shortform conversion?

**Khuyến nghị**:
- **Skip cho R&D Q2 2026** — ưu tiên thấp, stars quá nhỏ, có alternative tốt hơn (claude-shorts).
- **Quay lại review Q4 2026** — nếu stars tăng lên >100 thì xem xét lại.

**Decision**:
- AI/Eng Lead — quyết định có invest R&D không

**Câu hỏi mở**:
- SEONGON có nhu cầu video production tự động hóa thực sự không?
- Team có infrastructure GPU để chạy không?
- Có thể just use Veo API trực tiếp với prompt chain custom thay vì wrapper này không?
