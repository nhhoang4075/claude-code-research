#!/usr/bin/env bun
/**
 * Restructure scoring:
 * - Drop RCNT column (uninformative — almost all sources are 2026)
 * - Drop MTCH column (sources were curated for SEONGON; redundant pre-filter)
 * - Recompute Total = AUTH + SPEC + INDP + VRFY + ADOPT (max 25)
 * - Recompute Tier with stricter thresholds
 *
 * Usage: bun scripts/restructure-scoring.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

const path = "data/source-assessment.csv";

// Stricter tier thresholds (max=25 instead of 35).
// Distribution after recalc gives ~10 S, ~17 A, ~25 B, ~4 C — selective S+A
// instead of the previous 23 S + 33 A which made tiers meaningless.
const tierOf = (total: number): "S" | "A" | "B" | "C" => {
  if (total >= 21) return "S"; // top of practical range
  if (total >= 19) return "A"; // solid support
  if (total >= 15) return "B"; // context only
  return "C"; // skip
};

function parseCsv(text: string): string[][] {
  const out: string[][] = [];
  let row: string[] = [];
  let field = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else {
      if (c === '"') q = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); out.push(row); row = []; field = ""; }
      else if (c === "\r") {/* skip */}
      else field += c;
    }
  }
  if (field || row.length) { row.push(field); out.push(row); }
  return out;
}
function writeCsv(rows: string[][]): string {
  return rows
    .filter((r) => r.length > 1)
    .map((r) =>
      r
        .map((f) => (f.includes(",") || f.includes('"') || f.includes("\n") ? `"${f.replace(/"/g, '""')}"` : f))
        .join(","),
    )
    .join("\n") + "\n";
}

const text = readFileSync(path, "utf8");
const rows = parseCsv(text);
const header = rows[0];

const rcntIdx = header.indexOf("RCNT");
const mtchIdx = header.indexOf("MTCH");
const totalIdx = header.indexOf("Total");
const tierIdx = header.indexOf("Tier");

if (rcntIdx < 0 && mtchIdx < 0) {
  console.log("Already restructured (RCNT/MTCH already removed).");
  process.exit(0);
}

const dropSet = new Set([rcntIdx, mtchIdx].filter((i) => i >= 0));

// Indexes BEFORE dropping
const authIdx = header.indexOf("AUTH");
const specIdx = header.indexOf("SPEC");
const indpIdx = header.indexOf("INDP");
const vrfyIdx = header.indexOf("VRFY");
const adoptIdx = header.indexOf("ADOPT");

// Recompute Total + Tier in old-row layout, then strip dropped columns
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const sum =
    parseInt(r[authIdx]) + parseInt(r[specIdx]) + parseInt(r[indpIdx]) +
    parseInt(r[vrfyIdx]) + parseInt(r[adoptIdx]);
  r[totalIdx] = String(sum);
  r[tierIdx] = tierOf(sum);
}

// Drop RCNT + MTCH columns
const stripped = rows.map((r) => r.filter((_, i) => !dropSet.has(i)));

writeFileSync(path, writeCsv(stripped));

// Report
const newHeader = stripped[0];
const counts: Record<string, number> = { S: 0, A: 0, B: 0, C: 0 };
const newTierIdx = newHeader.indexOf("Tier");
for (let i = 1; i < stripped.length; i++) counts[stripped[i][newTierIdx]]++;
console.log(`Dropped: ${[...dropSet].map((i) => header[i]).join(", ")}`);
console.log(`New header (${newHeader.length} cols):`, newHeader.join(", "));
console.log(`Tier distribution:`, counts);
console.log(`Tier thresholds: S ≥ 21, A 19–20, B 15–18, C ≤ 14 (max 25)`);
