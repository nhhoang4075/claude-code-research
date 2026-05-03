#!/usr/bin/env bun
/**
 * Live CSV viewer with file-watch hot-reload.
 *
 * Usage:
 *   bun scripts/csv-viewer.ts                       # serves data/source-assessment.csv on :4174
 *   bun scripts/csv-viewer.ts path/to/file.csv      # custom file
 *   bun scripts/csv-viewer.ts file.csv 5000         # custom file + port
 *
 * Server-Sent Events push a reload signal whenever the file changes on disk.
 * Edit the CSV in any tool; the browser tab refreshes within ~50 ms.
 */
import { watch } from "node:fs";
import path from "node:path";

const filepath = path.resolve(process.argv[2] ?? "data/source-assessment.csv");
const port = Number.parseInt(process.argv[3] ?? "4174", 10);

if (!(await Bun.file(filepath).exists())) {
  console.error(`File not found: ${filepath}`);
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

const HTML = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>CSV viewer (live) - __FILE_BASE__</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      --accent: #b91c1c; --accent-soft: #fef2f2;
      --bg: #fafaf9; --card: #fff; --border: #e7e5e4;
      --text: #1c1917; --text-2: #44403c; --text-3: #78716c;
      color-scheme: light;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font: 14px/1.5 ui-sans-serif, system-ui, -apple-system, sans-serif; color: var(--text); background: var(--bg); }
    header { position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 10px 20px; display: flex; gap: 16px; align-items: center; z-index: 30; flex-wrap: wrap; }
    h1 { font-size: 14px; font-weight: 600; margin: 0; letter-spacing: -0.01em; }
    .pill { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 999px; background: var(--bg); border: 1px solid var(--border); font-size: 12px; color: var(--text-2); }
    .pill.live::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #16a34a; box-shadow: 0 0 0 0 #16a34a; animation: pulse 2s infinite; }
    @keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(22,163,74,.7)}70%{box-shadow:0 0 0 8px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)} }
    .pill.stale::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #dc2626; }
    input[type=search] { font: inherit; padding: 4px 10px; border: 1px solid var(--border); border-radius: 6px; min-width: 220px; }
    label.toggle { font-size: 12px; color: var(--text-2); display: inline-flex; gap: 6px; align-items: center; }
    .meta { font-size: 12px; color: var(--text-3); }
    main { padding: 16px 20px; }
    table { border-collapse: collapse; width: 100%; font-size: 13px; background: var(--card); border-radius: 8px; overflow: hidden; box-shadow: 0 1px 0 var(--border); }
    thead th { position: sticky; top: 49px; background: #f5f5f4; padding: 8px 10px; text-align: left; font-weight: 600; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3); border-bottom: 1px solid var(--border); cursor: pointer; user-select: none; white-space: nowrap; }
    thead th:hover { background: #ebe9e7; }
    thead th .sort-ind { color: var(--accent); font-weight: 700; margin-left: 4px; }
    thead th.num { text-align: right; }
    tbody td { padding: 8px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
    tbody tr:hover { background: var(--accent-soft); }
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
  <header>
    <h1>CSV viewer &middot; <code>__FILE_BASE__</code></h1>
    <span id="status" class="pill live">live</span>
    <span class="meta" id="rowcount"></span>
    <input id="filter" type="search" placeholder="Filter (matches any column)..." />
    <label class="toggle"><input type="checkbox" id="onlyS"/> S-tier only</label>
    <span class="meta" id="updated"></span>
  </header>
  <main><div id="root" class="empty">Loading...</div></main>

<script>
const root = document.getElementById('root');
const filterInput = document.getElementById('filter');
const onlyS = document.getElementById('onlyS');
const status = document.getElementById('status');
const rowcountEl = document.getElementById('rowcount');
const updatedEl = document.getElementById('updated');

let header = []; let rows = [];
let sortCol = -1; let sortDir = 1;

const NUMERIC_COLS = new Set(['AUTH','SPEC','INDP','RCNT','VRFY','MTCH','IMPC','Total','Year']);
const TRUNCATE_COLS = new Set(['TrustSignals','Role','KeyData','Author','Source']);

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
      else if (c === '\n') { row.push(field); out.push(row); row = []; field = ''; }
      else if (c === '\r') {/* skip */}
      else field += c;
    }
  }
  if (field || row.length) { row.push(field); out.push(row); }
  return out.filter(r => r.length > 1);
}

function buildCell(col, val) {
  const td = document.createElement('td');
  if (NUMERIC_COLS.has(col)) td.className = 'num';
  if (col === 'URL' && val) {
    const a = document.createElement('a');
    a.href = val;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.textContent = val.replace(/^https?:\/\//, '');
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

function buildHeaderCell(label, i) {
  const th = document.createElement('th');
  if (NUMERIC_COLS.has(label)) th.className = 'num';
  th.dataset.col = String(i);
  th.textContent = label;
  if (sortCol === i) {
    const sp = document.createElement('span');
    sp.className = 'sort-ind';
    sp.textContent = sortDir > 0 ? ' ▲' : ' ▼';
    th.appendChild(sp);
  }
  th.addEventListener('click', () => {
    if (sortCol === i) sortDir = -sortDir;
    else { sortCol = i; sortDir = NUMERIC_COLS.has(label) ? -1 : 1; }
    render();
  });
  return th;
}

function render() {
  while (root.firstChild) root.removeChild(root.firstChild);
  if (!header.length) { root.className = 'empty'; root.textContent = 'No data.'; return; }

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
  rowcountEl.textContent = sorted.length + ' / ' + rows.length + ' rows';

  const table = document.createElement('table');
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
    updatedEl.textContent = 'updated ' + new Date().toLocaleTimeString();
    render();
  } catch (e) { console.error(e); }
}

filterInput.addEventListener('input', render);
onlyS.addEventListener('change', render);

const ev = new EventSource('/events');
ev.addEventListener('reload', () => {
  status.classList.remove('stale');
  status.classList.add('live');
  status.textContent = 'live';
  load();
});
ev.onerror = () => {
  status.classList.remove('live');
  status.classList.add('stale');
  status.textContent = 'reconnecting';
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

console.log(`\n  Live CSV viewer running:`);
console.log(`    URL    -> http://localhost:${port}`);
console.log(`    File   -> ${filepath}`);
console.log(`    Reload -> push (SSE) on file change\n`);
