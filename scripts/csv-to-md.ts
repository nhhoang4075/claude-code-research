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
  ID: idx("ID"), Source: idx("Source"), Who: idx("Who"),
  Type: idx("Type"), Discipline: idx("Discipline"),
  Year: idx("Year"), URL: idx("URL"), KeyData: idx("KeyData"),
  AUTH: idx("AUTH"), SPEC: idx("SPEC"), INDP: idx("INDP"), RCNT: idx("RCNT"),
  VRFY: idx("VRFY"), MTCH: idx("MTCH"), ADOPT: idx("ADOPT"),
  Total: idx("Total"), Tier: idx("Tier"),
};

// Sort by Total descending, then by ID ascending for stability
const sorted = [...data].sort((a, b) => {
  const t = parseInt(b[I.Total]) - parseInt(a[I.Total]);
  return t !== 0 ? t : a[I.ID].localeCompare(b[I.ID]);
});

const totalNum = (r: string[]) => parseFloat(r[I.Total]) || 0;
const tierEmoji: Record<string, string> = { S: "**S**", A: "A", B: "B", C: "C" };
const formatTotal = (r: string[]) => (r[I.Tier] === "S" ? `**${r[I.Total]}**` : r[I.Total]);

// ── COMPACT TABLE ───────────────────────────────────────────────────
let out = "";
out += "# Source Assessment — Scored Spreadsheet\n\n";
out += "Auto-generated from [`source-assessment.csv`](source-assessment.csv). Sorted by composite score descending.\n\n";
const tCount = (t: string) => sorted.filter((r) => r[I.Tier] === t).length;
out += `**Total sources scored**: ${sorted.length} · **Tier S**: ${tCount("S")} · **Tier A**: ${tCount("A")} · **Tier B**: ${tCount("B")} · **Tier C**: ${tCount("C")}\n\n`;
out += "Read the rubric in [`assessment-framework.md`](assessment-framework.md) before relying on the scores. **TL;DR**: Tier S (≥31) = headline; A (28–30) = supporting; B (24–27) = context; C (≤23) = skip. Composite is sum of 7 dimensions (max 35): AUTH, SPEC, INDP, RCNT, VRFY, MTCH, ADOPT. Stricter v3 thresholds — only top ~9% reach S.\n\n";
out += "---\n\n## Ranking table (click headers in GitHub to sort)\n\n";
out += "| ID | Source | Discipline | Tier | Total | AUTH | SPEC | INDP | RCNT | VRFY | MTCH | ADOPT |\n";
out += "|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|\n";
for (const r of sorted) {
  const sourceLink = `[${r[I.ID]}](#${r[I.ID].toLowerCase()}) [${r[I.Source].slice(0, 64)}${r[I.Source].length > 64 ? "…" : ""}](${r[I.URL]})`;
  out += `| ${r[I.ID]} | ${sourceLink} | ${r[I.Discipline]} | ${tierEmoji[r[I.Tier]] ?? r[I.Tier]} | ${formatTotal(r)} | ${r[I.AUTH]} | ${r[I.SPEC]} | ${r[I.INDP]} | ${r[I.RCNT]} | ${r[I.VRFY]} | ${r[I.MTCH]} | ${r[I.ADOPT]} |\n`;
}

// ── FULL DETAIL CARDS ───────────────────────────────────────────────
out += "\n\n---\n\n## Full detail per source\n\n";
out += "Each card: identity → key data → scores. Identity columns first because they justify the scores.\n\n";

for (const r of sorted) {
  const id = r[I.ID];
  out += `### <a id="${id.toLowerCase()}"></a>${id} · ${escapeMd(r[I.Source])}\n\n`;
  const tierLabel = r[I.Tier] === "S" ? "**Tier S** (headline-grade)" : r[I.Tier] === "A" ? "Tier A (support)" : r[I.Tier] === "B" ? "Tier B (context only)" : "Tier C (skip)";
  out += `**Total ${r[I.Total]}/35** · ${tierLabel} · Discipline: \`${r[I.Discipline]}\` · Type: \`${r[I.Type]}\` · ${r[I.Year]}\n\n`;
  out += `**URL**: ${r[I.URL]}\n\n`;
  out += `**Who**: ${escapeMd(r[I.Who])}\n\n`;
  out += `**Key data extracted**:\n> ${escapeMd(r[I.KeyData])}\n\n`;
  out += "**Scores**:\n\n";
  out += "| AUTH | SPEC | INDP | RCNT | VRFY | MTCH | ADOPT | **Total** |\n";
  out += "|---:|---:|---:|---:|---:|---:|---:|---:|\n";
  out += `| ${r[I.AUTH]} | ${r[I.SPEC]} | ${r[I.INDP]} | ${r[I.RCNT]} | ${r[I.VRFY]} | ${r[I.MTCH]} | ${r[I.ADOPT]} | **${r[I.Total]}** |\n\n`;
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
