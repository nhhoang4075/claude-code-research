#!/usr/bin/env bun
/**
 * Trình xem CSV trực tiếp với hot-reload theo file watch.
 * Live CSV viewer with file-watch hot-reload.
 *
 * Cách dùng / Usage:
 *   bun scripts/csv-viewer.ts                       # phục vụ data/source-assessment.csv tại :4174
 *   bun scripts/csv-viewer.ts path/to/file.csv      # file tùy chọn
 *   bun scripts/csv-viewer.ts file.csv 5000         # file + cổng tùy chọn
 *
 * Server-Sent Events đẩy tín hiệu reload mỗi khi file thay đổi trên disk.
 * Sửa CSV trong bất kỳ tool nào — tab trình duyệt cập nhật trong ~50 ms.
 */
import { watch } from "node:fs";
import path from "node:path";

const filepath = path.resolve(process.argv[2] ?? "data/source-assessment.csv");
const port = Number.parseInt(process.argv[3] ?? "4174", 10);

if (!(await Bun.file(filepath).exists())) {
  console.error(`Không tìm thấy file: ${filepath}`);
  process.exit(1);
}

const enc = new TextEncoder();
const reloadClients = new Set<ReadableStreamDefaultController<Uint8Array>>();

let debounceTimer: Timer | null = null;
watch(filepath, () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    for (const c of reloadClients) {
      try {
        c.enqueue(enc.encode("event: reload\ndata: 1\n\n"));
      } catch {
        reloadClients.delete(c);
      }
    }
    console.log(`[reload] ${new Date().toLocaleTimeString()} -> ${reloadClients.size} client(s)`);
  }, 50);
});

const HTML = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <title>Trình xem CSV (trực tiếp) — __FILE_BASE__</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      --accent: #b91c1c; --accent-soft: #fef2f2;
      --bg: #fafaf9; --card: #fff; --border: #e7e5e4;
      --text: #1c1917; --text-2: #44403c; --text-3: #78716c;
      color-scheme: light;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font: 14px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: var(--text); background: var(--bg); }
    header.topbar { position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 10px 20px; display: flex; gap: 16px; align-items: center; z-index: 30; flex-wrap: wrap; }
    h1 { font-size: 14px; font-weight: 600; margin: 0; letter-spacing: -0.01em; }
    .pill { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 999px; background: var(--bg); border: 1px solid var(--border); font-size: 12px; color: var(--text-2); }
    .pill.live::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #16a34a; box-shadow: 0 0 0 0 #16a34a; animation: pulse 2s infinite; }
    @keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(22,163,74,.7)}70%{box-shadow:0 0 0 8px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)} }
    .pill.stale::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #dc2626; }
    input[type=search] { font: inherit; padding: 4px 10px; border: 1px solid var(--border); border-radius: 6px; min-width: 240px; }
    label.toggle { font-size: 12px; color: var(--text-2); display: inline-flex; gap: 6px; align-items: center; cursor: pointer; }
    .meta { font-size: 12px; color: var(--text-3); }
    main { padding: 16px 20px; }

    /* field guide */
    details.fg { background: var(--card); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 20px; }
    details.fg summary { padding: 12px 16px; cursor: pointer; user-select: none; font-weight: 600; font-size: 13px; list-style: none; display: flex; align-items: center; gap: 8px; }
    details.fg summary::-webkit-details-marker { display: none; }
    details.fg summary::before { content: "▸"; transition: transform 0.15s ease; color: var(--accent); }
    details.fg[open] summary::before { transform: rotate(90deg); }
    details.fg summary .hint { color: var(--text-3); font-weight: 400; font-size: 12px; margin-left: auto; }
    details.fg .fg-body { border-top: 1px solid var(--border); padding: 0; }
    .fg-grid { width: 100%; border-collapse: collapse; font-size: 13px; }
    .fg-grid th { text-align: left; padding: 8px 14px; background: var(--bg); border-bottom: 1px solid var(--border); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3); font-weight: 600; }
    .fg-grid td { padding: 9px 14px; border-bottom: 1px solid var(--border); vertical-align: top; }
    .fg-grid tr:last-child td { border-bottom: 0; }
    .fg-grid td.col-key { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: var(--accent); white-space: nowrap; width: 110px; }
    .fg-grid td.col-label { font-weight: 600; white-space: nowrap; width: 130px; }
    .fg-grid td.col-desc { color: var(--text-2); }

    /* main table */
    table.main { border-collapse: collapse; width: 100%; font-size: 13px; background: var(--card); border-radius: 8px; overflow: hidden; box-shadow: 0 1px 0 var(--border); }
    table.main thead th { position: sticky; top: 49px; background: #f5f5f4; padding: 8px 10px; text-align: left; font-weight: 600; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3); border-bottom: 1px solid var(--border); cursor: help; user-select: none; white-space: nowrap; }
    table.main thead th:hover { background: #ebe9e7; }
    table.main thead th .sort-ind { color: var(--accent); font-weight: 700; margin-left: 4px; }
    table.main thead th.num { text-align: right; }
    table.main tbody td { padding: 8px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
    table.main tbody tr:hover { background: var(--accent-soft); }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    .truncate { max-width: 360px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; vertical-align: top; }
    .truncate:hover { white-space: normal; word-break: break-word; }
    .tier-S { background: #b91c1c; color: #fff; padding: 2px 8px; border-radius: 999px; font-weight: 600; font-size: 11px; }
    .tier-A { background: #f59e0b; color: #fff; padding: 2px 8px; border-radius: 999px; font-weight: 600; font-size: 11px; }
    .tier-B { background: #d6d3d1; color: #1c1917; padding: 2px 8px; border-radius: 999px; font-weight: 600; font-size: 11px; }
    .tier-C { background: #f5f5f4; color: var(--text-3); padding: 2px 8px; border-radius: 999px; font-weight: 600; font-size: 11px; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .empty { padding: 40px; text-align: center; color: var(--text-3); }
    .total-cell { font-weight: 600; }
    code { background: #f5f5f4; padding: 1px 4px; border-radius: 3px; font-size: 0.9em; }
  </style>
</head>
<body>
  <header class="topbar">
    <h1>Trình xem CSV &middot; <code>__FILE_BASE__</code></h1>
    <span id="status" class="pill live">trực tiếp</span>
    <span class="meta" id="rowcount"></span>
    <input id="filter" type="search" placeholder="Lọc theo mọi cột..." />
    <label class="toggle"><input type="checkbox" id="onlyS"/> Chỉ hạng S</label>
    <span class="meta" id="updated"></span>
  </header>
  <main>
    <details class="fg" open>
      <summary>📖 Mô tả các cột <span class="hint">(nhấn để đóng/mở)</span></summary>
      <div class="fg-body">
        <table class="fg-grid">
          <thead>
            <tr>
              <th>Mã cột (CSV)</th>
              <th>Tên hiển thị</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="col-key">ID</td><td class="col-label">Mã</td><td class="col-desc">Mã định danh nguồn (R001, R002…)</td></tr>
            <tr><td class="col-key">Source</td><td class="col-label">Nguồn</td><td class="col-desc">Tên bài viết, repo, hoặc tài liệu được trích dẫn</td></tr>
            <tr><td class="col-key">Author</td><td class="col-label">Tác giả</td><td class="col-desc">Người hoặc tổ chức công bố nội dung. Khi chỉ có tên thương hiệu/handle, ghi nguyên handle (không tự bịa danh tính)</td></tr>
            <tr><td class="col-key">Role</td><td class="col-label">Vai trò</td><td class="col-desc">Họ làm gì chuyên môn — vì sao có thẩm quyền nói về chủ đề này</td></tr>
            <tr><td class="col-key">TrustSignals</td><td class="col-label">Tín hiệu uy tín</td><td class="col-desc">1–3 bằng chứng cụ thể về độ tin cậy: lịch sử hoạt động, mâu thuẫn lợi ích, khả năng kiểm chứng. Tách rời với điểm AUTH để người đọc tự đánh giá.</td></tr>
            <tr><td class="col-key">Type</td><td class="col-label">Loại</td><td class="col-desc">PRIMARY (vendor chính chủ) · VENDOR (vendor khác) · AGENCY-CASE (case study agency) · PRACTITIONER (blog thực hành) · OPEN-SOURCE (mã nguồn mở) · COURSE · PODCAST · INDUSTRY-PUB</td></tr>
            <tr><td class="col-key">Discipline</td><td class="col-label">Lĩnh vực</td><td class="col-desc">SEO · GADS (Google Ads) · META (Facebook/Instagram Ads) · BRAND (Digital Branding) · ANALYTICS · MOPS (Marketing Ops) · CONTENT · CROSS (xuyên suốt)</td></tr>
            <tr><td class="col-key">Year</td><td class="col-label">Năm</td><td class="col-desc">Năm xuất bản hoặc đo đạc dữ liệu</td></tr>
            <tr><td class="col-key">URL</td><td class="col-label">Liên kết</td><td class="col-desc">Đường dẫn đến nguồn gốc — bấm để mở</td></tr>
            <tr><td class="col-key">KeyData</td><td class="col-label">Dữ liệu chính</td><td class="col-desc">Số liệu, workflow, hoặc case study quan trọng nhất được trích từ nguồn — đủ để hiểu nội dung mà không cần mở URL</td></tr>
            <tr><td class="col-key">AUTH</td><td class="col-label">Uy tín</td><td class="col-desc"><strong>Authority (1–5) — đã thắt chặt:</strong> 5 = Anthropic / báo chuyên ngành lớn / nền tảng top (HubSpot, Lenny). 4 = agency lâu năm có nhân thân rõ (Ayima, Animalz, AdventurePPC) hoặc operator senior công khai (Emily Kramer). 3 = cá nhân tên thật có hồ sơ chuyên môn (LinkedIn, sự kiện) hoặc vendor mid-tier có team công khai. <strong>2 = handle GitHub / brand không định danh tổ chức (AgriciDaniel, aaron-he-zhu, inhouseseo, HeyOz)</strong> — kể cả khi repo chất lượng cao, AUTH vẫn là 2 vì không xác minh được tác giả. 1 = ẩn danh.</td></tr>
            <tr><td class="col-key">SPEC</td><td class="col-label">Cụ thể</td><td class="col-desc"><strong>Specificity (1–5)</strong> — độ cụ thể của dữ liệu. 5 = số liệu chính xác kèm phương pháp ("ad copy 2h → 15min, sub-agent kiến trúc"). 1 = lời tuyên bố mơ hồ ("rất hiệu quả").</td></tr>
            <tr><td class="col-key">INDP</td><td class="col-label">Độc lập</td><td class="col-desc"><strong>Independence (1–5)</strong> — không có lợi ích thương mại trong việc quảng bá Claude Code. 5 = không lợi ích. 4 = báo chí ngành. 3 = practitioner dùng nhưng không bán. 2 = vendor công cụ kế cận (HubSpot, Coupler). 1 = vendor chính (Anthropic). Lưu ý: INDP thấp KHÔNG loại trừ nguồn — chỉ cần biết để đọc cẩn thận.</td></tr>
            <tr><td class="col-key">RCNT</td><td class="col-label">Mới</td><td class="col-desc"><strong>Recency (1–5)</strong> — độ mới của dữ liệu. 5 = 2026. 4 = cuối 2025. 3 = giữa 2025. 2 = đầu 2025. 1 = ≤2024 (có thể đã lỗi thời).</td></tr>
            <tr><td class="col-key">VRFY</td><td class="col-label">Kiểm chứng</td><td class="col-desc"><strong>Verifiability (1–5)</strong> — khả năng kiểm chứng độc lập. 5 = mã nguồn mở / dataset công khai. 4 = sản phẩm sống có thể test. 3 = mô tả phương pháp chi tiết. 2 = tự khai báo, không có cách kiểm. 1 = giai thoại.</td></tr>
            <tr><td class="col-key">MTCH</td><td class="col-label">Phù hợp</td><td class="col-desc"><strong>Match (1–5)</strong> — mức phù hợp với dịch vụ SEONGON. 5 = trùng dịch vụ chính (SEO/Google Ads/FB Ads/Branding). 4 = xuyên suốt giúp mọi dịch vụ (analytics, ops). 3 = dịch vụ kế cận (content). 2 = tiếp tuyến. 1 = không liên quan.</td></tr>
            <tr><td class="col-key">ADOPT</td><td class="col-label">Phổ biến</td><td class="col-desc"><strong>Adoption (1–5) — chiều mới:</strong> mức độ được kiểm chứng bên ngoài. 5 = canonical / market-leading (3000+ GitHub stars, báo lớn, nền tảng top). 4 = adoption mạnh (200–2999 stars, vendor có khách hàng). 3 = mid (50–199 stars). 2 = niche/mới (<50 stars). 1 = chưa có traction. <em>Tách biệt với AUTH</em>: nhiều repo nổi tiếng có AUTH thấp (handle vô danh) nhưng ADOPT cao — và ngược lại.</td></tr>
            <tr><td class="col-key">Total</td><td class="col-label">Tổng</td><td class="col-desc">Tổng điểm 7 chiều (AUTH + SPEC + INDP + RCNT + VRFY + MTCH + ADOPT). Tối đa 35.</td></tr>
            <tr><td class="col-key">Tier</td><td class="col-label">Hạng</td><td class="col-desc">Hạng tổng hợp suy ra từ Tổng. <strong>S (28–35)</strong> = bằng chứng đầu đề. <strong>A (21–27)</strong> = bằng chứng hỗ trợ. <strong>B (14–20)</strong> = chỉ là context. <strong>C (≤13)</strong> = bỏ qua. Tier = chất lượng nguồn; Use = vai trò trong đề xuất — hai chiều khác nhau.</td></tr>
            <tr><td class="col-key">Use</td><td class="col-label">Sử dụng</td><td class="col-desc">Gợi ý dùng trong đề xuất. <strong>HEADLINE</strong> = nêu trong tóm tắt điều hành. <strong>SUPPORT</strong> = trích dẫn ở phần thân. <strong>CONTEXT</strong> = đọc nền, không trích. <strong>SKIP</strong> = không khuyến khích dùng.</td></tr>
            <tr><td class="col-key">Cluster</td><td class="col-label">Cụm</td><td class="col-desc">Nhóm nguồn có nội dung <strong>tương tự</strong> (cùng tác giả, cùng sản phẩm, hoặc cùng chủ đề). Cùng cụm = MỘT điểm bằng chứng — không nên đếm gấp. Khi trích, lấy nguồn có Tổng cao nhất trong cụm làm đại diện. Cụm hiện tại: ANTHROPIC-EI, AGRICIDANIEL-SEO, ADVENTUREPPC, STORMY-AI, META-INTEGRATION, GA4-CLAUDE, MARKETING-DATA-CONNECTORS. Cột trống = nguồn độc lập, không trùng nội dung với nguồn khác.</td></tr>
          </tbody>
        </table>
      </div>
    </details>
    <div id="root" class="empty">Đang tải...</div>
  </main>

<script>
const root = document.getElementById('root');
const filterInput = document.getElementById('filter');
const onlyS = document.getElementById('onlyS');
const status = document.getElementById('status');
const rowcountEl = document.getElementById('rowcount');
const updatedEl = document.getElementById('updated');

let header = []; let rows = [];
let sortCol = -1; let sortDir = 1;

const NUMERIC_COLS = new Set(['AUTH','SPEC','INDP','RCNT','VRFY','MTCH','ADOPT','Total','Year']);
const TRUNCATE_COLS = new Set(['TrustSignals','Role','KeyData','Author','Source']);

const COL_LABELS = {
  ID: 'Mã',
  Source: 'Nguồn',
  Author: 'Tác giả',
  Role: 'Vai trò',
  TrustSignals: 'Tín hiệu uy tín',
  Type: 'Loại',
  Discipline: 'Lĩnh vực',
  Year: 'Năm',
  URL: 'Liên kết',
  KeyData: 'Dữ liệu chính',
  AUTH: 'Uy tín',
  SPEC: 'Cụ thể',
  INDP: 'Độc lập',
  RCNT: 'Mới',
  VRFY: 'Kiểm chứng',
  MTCH: 'Phù hợp',
  ADOPT: 'Phổ biến',
  Total: 'Tổng',
  Tier: 'Hạng',
  Use: 'Sử dụng',
  Cluster: 'Cụm',
};

const COL_TIPS = {
  ID: 'Mã định danh nguồn (R001, R002...)',
  Source: 'Tên bài viết, repo, hoặc tài liệu',
  Author: 'Người hoặc tổ chức công bố nội dung',
  Role: 'Họ làm gì chuyên môn — cơ sở để đánh giá tiếng nói',
  TrustSignals: 'Bằng chứng cụ thể về độ tin cậy (track record, mâu thuẫn lợi ích, khả năng kiểm chứng)',
  Type: 'Loại nguồn: PRIMARY / VENDOR / AGENCY-CASE / PRACTITIONER / OPEN-SOURCE / COURSE / PODCAST / INDUSTRY-PUB',
  Discipline: 'Lĩnh vực: SEO / GADS (Google Ads) / META / BRAND / ANALYTICS / MOPS / CONTENT / CROSS',
  Year: 'Năm xuất bản',
  URL: 'Bấm để mở nguồn gốc',
  KeyData: 'Số liệu, workflow, hoặc case study quan trọng nhất',
  AUTH: 'Authority (1–5) — uy tín nguồn. 5 = vendor / báo chuyên ngành. 1 = ẩn danh.',
  SPEC: 'Specificity (1–5) — độ cụ thể. 5 = số liệu chính xác. 1 = mơ hồ.',
  INDP: 'Independence (1–5) — không có lợi ích thương mại. 5 = không lợi ích. 1 = vendor chính (Anthropic).',
  RCNT: 'Recency (1–5) — độ mới. 5 = 2026. 1 = ≤2024.',
  VRFY: 'Verifiability (1–5) — khả năng kiểm chứng. 5 = mã nguồn mở. 1 = giai thoại.',
  MTCH: 'Match (1–5) — phù hợp dịch vụ SEONGON. 5 = SEO / Google Ads / FB Ads / Branding. 1 = không liên quan.',
  ADOPT: 'Adoption (1–5) — mức độ phổ biến / được kiểm chứng bên ngoài. 5 = 3000+ GitHub stars hoặc báo lớn. 4 = 200–2999 stars hoặc vendor có khách. 3 = 50–199 stars. 2 = <50 stars hoặc brand mới. 1 = chưa có traction.',
  Total: 'Tổng 7 chiều (max 35).',
  Tier: 'Hạng tổng hợp: S (28–35) / A (21–27) / B (14–20) / C (≤13). Tier = chất lượng; Use = vai trò trong đề xuất.',
  Use: 'Gợi ý: HEADLINE / SUPPORT / CONTEXT / SKIP',
  Cluster: 'Cụm — các nguồn có nội dung tương tự (cùng tác giả, cùng sản phẩm, hoặc cùng chủ đề). Khi trích dẫn, các nguồn cùng cụm tính là MỘT điểm bằng chứng; lấy nguồn có Tổng cao nhất làm đại diện.',
};

const NL = String.fromCharCode(10);
const CR = String.fromCharCode(13);

function parseCsv(text) {
  const out = []; let row = []; let field = ''; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i+1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else {
      if (c === '"') q = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === NL) { row.push(field); out.push(row); row = []; field = ''; }
      else if (c === CR) {/* skip */}
      else field += c;
    }
  }
  if (field || row.length) { row.push(field); out.push(row); }
  return out.filter(r => r.length > 1);
}

function stripProto(s) {
  if (s.startsWith('https://')) return s.slice(8);
  if (s.startsWith('http://'))  return s.slice(7);
  return s;
}

function buildCell(col, val) {
  const td = document.createElement('td');
  if (NUMERIC_COLS.has(col)) td.className = 'num';
  if (col === 'URL' && val) {
    const a = document.createElement('a');
    a.href = val;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.textContent = stripProto(val);
    td.appendChild(a);
  } else if (col === 'Tier') {
    const sp = document.createElement('span');
    sp.className = 'tier-' + val;
    sp.textContent = val;
    td.appendChild(sp);
  } else if (col === 'Total') {
    td.classList.add('total-cell');
    td.textContent = val;
  } else if (TRUNCATE_COLS.has(col)) {
    const sp = document.createElement('span');
    sp.className = 'truncate';
    sp.title = val;
    sp.textContent = val;
    td.appendChild(sp);
  } else {
    td.textContent = val;
  }
  return td;
}

function buildHeaderCell(rawName, i) {
  const th = document.createElement('th');
  if (NUMERIC_COLS.has(rawName)) th.className = 'num';
  th.dataset.col = String(i);

  const label = COL_LABELS[rawName] ?? rawName;
  th.textContent = label;
  th.title = COL_TIPS[rawName] ?? rawName;

  if (sortCol === i) {
    const sp = document.createElement('span');
    sp.className = 'sort-ind';
    sp.textContent = sortDir > 0 ? ' ▲' : ' ▼';
    th.appendChild(sp);
  }
  th.addEventListener('click', () => {
    if (sortCol === i) sortDir = -sortDir;
    else { sortCol = i; sortDir = NUMERIC_COLS.has(rawName) ? -1 : 1; }
    render();
  });
  return th;
}

function render() {
  while (root.firstChild) root.removeChild(root.firstChild);
  if (!header.length) { root.className = 'empty'; root.textContent = 'Chưa có dữ liệu.'; return; }

  const q = filterInput.value.trim().toLowerCase();
  const tierIdx = header.indexOf('Tier');
  const filtered = rows.filter(r => {
    if (onlyS.checked && tierIdx >= 0 && r[tierIdx] !== 'S') return false;
    if (!q) return true;
    return r.some(c => (c || '').toLowerCase().includes(q));
  });
  const sorted = sortCol < 0 ? filtered : [...filtered].sort((a, b) => {
    const av = a[sortCol] ?? ''; const bv = b[sortCol] ?? '';
    if (NUMERIC_COLS.has(header[sortCol])) {
      const an = parseFloat(av); const bn = parseFloat(bv);
      const ax = Number.isFinite(an) ? an : -Infinity;
      const bx = Number.isFinite(bn) ? bn : -Infinity;
      return (ax - bx) * sortDir;
    }
    return av.localeCompare(bv) * sortDir;
  });
  rowcountEl.textContent = sorted.length + ' / ' + rows.length + ' dòng';

  const table = document.createElement('table');
  table.className = 'main';
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  header.forEach((h, i) => headRow.appendChild(buildHeaderCell(h, i)));
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (const r of sorted) {
    const tr = document.createElement('tr');
    header.forEach((h, i) => tr.appendChild(buildCell(h, r[i] ?? '')));
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  root.className = '';
  root.appendChild(table);
}

async function load() {
  try {
    const res = await fetch('/data?t=' + Date.now());
    const text = await res.text();
    const all = parseCsv(text);
    if (!all.length) { header = []; rows = []; render(); return; }
    header = all[0]; rows = all.slice(1);
    updatedEl.textContent = 'cập nhật ' + new Date().toLocaleTimeString();
    render();
  } catch (e) { console.error(e); }
}

filterInput.addEventListener('input', render);
onlyS.addEventListener('change', render);

const ev = new EventSource('/events');
ev.addEventListener('reload', () => {
  status.classList.remove('stale');
  status.classList.add('live');
  status.textContent = 'trực tiếp';
  load();
});
ev.onerror = () => {
  status.classList.remove('live');
  status.classList.add('stale');
  status.textContent = 'đang kết nối lại';
};

load();
</script>
</body>
</html>`;

const filebase = path.basename(filepath);

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/data") {
      try {
        const text = await Bun.file(filepath).text();
        return new Response(text, {
          headers: { "content-type": "text/csv; charset=utf-8", "cache-control": "no-store" },
        });
      } catch (e) {
        return new Response(`Error reading file: ${String(e)}`, { status: 500 });
      }
    }
    if (url.pathname === "/events") {
      const stream = new ReadableStream<Uint8Array>({
        start(c) {
          reloadClients.add(c);
          c.enqueue(enc.encode(": connected\n\n"));
        },
        cancel(c) {
          reloadClients.delete(c as unknown as ReadableStreamDefaultController<Uint8Array>);
        },
      });
      return new Response(stream, {
        headers: {
          "content-type": "text/event-stream",
          "cache-control": "no-cache",
          connection: "keep-alive",
        },
      });
    }
    return new Response(HTML.replace(/__FILE_BASE__/g, filebase), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`\n  Trình xem CSV trực tiếp đang chạy:`);
console.log(`    URL    -> http://localhost:${port}`);
console.log(`    File   -> ${filepath}`);
console.log(`    Reload -> push (SSE) khi file thay đổi\n`);
