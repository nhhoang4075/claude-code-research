// Renders source-assessment.csv as a browsable markdown file with two views:
// 1) Compact ranking table (sorted by Total desc) — for quick scanning
// 2) Full per-source cards — Author/Role/TrustSignals visible, then scores

import { readFileSync, writeFileSync } from "node:fs";

const csvPath = "/Users/nhh4075/Work/intelligence/seongon-claude-code-research/data/source-assessment.csv";
const outPath = "/Users/nhh4075/Work/intelligence/seongon-claude-code-research/data/source-assessment.md";

// Tiny CSV parser handling double-quoted fields with commas
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === "\r") { /* ignore */ }
      else { field += c; }
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

const raw = readFileSync(csvPath, "utf8");
const allParsed = parseCsv(raw);
const expected = allParsed[0]?.length ?? 0;
const all = allParsed.filter((r) => r.length >= expected && r[0]);
const [header, ...data] = all;
const idx = (name: string) => header.indexOf(name);

const I = {
  ID: idx("ID"), Source: idx("Source"), Author: idx("Author"), Role: idx("Role"),
  TrustSignals: idx("TrustSignals"), Type: idx("Type"), Discipline: idx("Discipline"),
  Year: idx("Year"), URL: idx("URL"), KeyData: idx("KeyData"),
  AUTH: idx("AUTH"), SPEC: idx("SPEC"), INDP: idx("INDP"), RCNT: idx("RCNT"),
  VRFY: idx("VRFY"), MTCH: idx("MTCH"), IMPC: idx("IMPC"),
  Total: idx("Total"), Use: idx("Use"), Cluster: idx("Cluster"),
};

// Sort by Total descending, then by ID ascending for stability
const sorted = [...data].sort((a, b) => {
  const t = parseInt(b[I.Total]) - parseInt(a[I.Total]);
  return t !== 0 ? t : a[I.ID].localeCompare(b[I.ID]);
});

const totalNum = (r: string[]) => parseFloat(r[I.Total]) || 0;
const formatTotal = (r: string[]) => (totalNum(r) >= 28 ? `**${r[I.Total]}**` : r[I.Total]);

// ── COMPACT TABLE ───────────────────────────────────────────────────
let out = "";
out += "# Source Assessment — Scored Spreadsheet\n\n";
out += "Auto-generated from [`source-assessment.csv`](source-assessment.csv). Sorted by composite score descending.\n\n";
const top = sorted.filter((r) => totalNum(r) >= 28).length;
const mid = sorted.filter((r) => { const t = totalNum(r); return t >= 21 && t < 28; }).length;
out += `**Total sources scored**: ${sorted.length} · **≥ 28 (headline-grade)**: ${top} · **21–27 (support)**: ${mid}\n\n`;
out += "Read the rubric in [`assessment-framework.md`](assessment-framework.md) before relying on the scores. **TL;DR**: Total ≥ 28 = headline evidence; 21–27 = supporting; <21 = context.\n\n";
// Track cluster primaries (highest Total per cluster). Used to flag derivatives.
const clusterPrimary: Record<string, string> = {};
for (const r of sorted) {
  const cl = r[I.Cluster];
  if (!cl) continue;
  if (!clusterPrimary[cl] || totalNum(r) > totalNum(sorted.find((x) => x[I.ID] === clusterPrimary[cl])!)) {
    clusterPrimary[cl] = r[I.ID];
  }
}
const fmtCluster = (r: string[]) => {
  const cl = r[I.Cluster];
  if (!cl) return "—";
  const isPrimary = clusterPrimary[cl] === r[I.ID];
  return `\`${cl}\`${isPrimary ? " ★" : ""}`;
};

out += "---\n\n## Ranking table (click headers in GitHub to sort)\n\n";
out += "★ = highest-Total source within its cluster (use as primary citation).\n\n";
out += "| ID | Source | Discipline | Cluster | Total | AUTH | SPEC | INDP | RCNT | VRFY | MTCH | IMPC | Use |\n";
out += "|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|\n";
for (const r of sorted) {
  const sourceLink = `[${r[I.ID]}](#${r[I.ID].toLowerCase()}) [${r[I.Source].slice(0, 64)}${r[I.Source].length > 64 ? "…" : ""}](${r[I.URL]})`;
  out += `| ${r[I.ID]} | ${sourceLink} | ${r[I.Discipline]} | ${fmtCluster(r)} | ${formatTotal(r)} | ${r[I.AUTH]} | ${r[I.SPEC]} | ${r[I.INDP]} | ${r[I.RCNT]} | ${r[I.VRFY]} | ${r[I.MTCH]} | ${r[I.IMPC]} | ${r[I.Use]} |\n`;
}

// ── FULL DETAIL CARDS ───────────────────────────────────────────────
out += "\n\n---\n\n## Full detail per source\n\n";
out += "Each card: identity → key data → scores. Identity columns first because they justify the scores.\n\n";

for (const r of sorted) {
  const id = r[I.ID];
  const t = totalNum(r);
  const grade = t >= 28 ? "**Headline-grade evidence**" : t >= 21 ? "Support-grade evidence" : t >= 14 ? "Context-only" : "Skip";
  out += `### <a id="${id.toLowerCase()}"></a>${id} · ${escapeMd(r[I.Source])}\n\n`;
  const clusterPart = r[I.Cluster] ? ` · Cluster: \`${r[I.Cluster]}\`${clusterPrimary[r[I.Cluster]] === id ? " ★" : ""}` : "";
  out += `**Total ${r[I.Total]}/35** · ${grade} · Use: \`${r[I.Use]}\` · Discipline: \`${r[I.Discipline]}\` · Type: \`${r[I.Type]}\` · ${r[I.Year]}${clusterPart}\n\n`;
  out += `**URL**: ${r[I.URL]}\n\n`;
  out += `**Author**: ${escapeMd(r[I.Author])}\n\n`;
  out += `**Role**: ${escapeMd(r[I.Role])}\n\n`;
  out += `**Trust signals**: ${escapeMd(r[I.TrustSignals])}\n\n`;
  out += `**Key data extracted**:\n> ${escapeMd(r[I.KeyData])}\n\n`;
  out += "**Scores**:\n\n";
  out += "| AUTH | SPEC | INDP | RCNT | VRFY | MTCH | IMPC | **Total** |\n";
  out += "|---:|---:|---:|---:|---:|---:|---:|---:|\n";
  out += `| ${r[I.AUTH]} | ${r[I.SPEC]} | ${r[I.INDP]} | ${r[I.RCNT]} | ${r[I.VRFY]} | ${r[I.MTCH]} | ${r[I.IMPC]} | **${r[I.Total]}** |\n\n`;
  out += "---\n\n";
}

writeFileSync(outPath, out);
console.log(`Wrote ${outPath} (${out.length} bytes, ${sorted.length} sources)`);

function truncate(s: string, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function escapeMd(s: string): string {
  return (s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}
