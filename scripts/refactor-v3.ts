#!/usr/bin/env bun
/**
 * Refactor source-assessment.csv to v3 schema:
 *   1. Restore RCNT + MTCH from prior commit (kept after all — outlier values
 *      do carry signal even though most rows max at 5).
 *   2. Drop TrustSignals column (user prefers slimmer Sheet; trust info is
 *      implicit in AUTH/INDP scoring).
 *   3. Consolidate Type from 12 categories → 6:
 *        PRIMARY, VENDOR, MEDIA, PRACTITIONER, OPEN-SOURCE, AGENCY
 *   4. Recompute Total = AUTH+SPEC+INDP+RCNT+VRFY+MTCH+ADOPT (max 35)
 *   5. Stricter tier thresholds: S ≥ 30, A 26–29, B 21–25, C ≤ 20
 *
 * Usage: bun scripts/refactor-v3.ts
 *   (Reads /tmp/old-csv.txt for RCNT/MTCH lookup — produced via:
 *    git show <prior-commit>:data/source-assessment.csv > /tmp/old-csv.txt)
 */
import { readFileSync, writeFileSync } from "node:fs";

const csvPath = "data/source-assessment.csv";
const oldCsvPath = "/tmp/old-csv.txt";

const TYPE_MAP: Record<string, string> = {
  // Original 12 categories → 6 consolidated
  "PRIMARY": "PRIMARY",
  "PRIMARY-RESEARCH": "PRIMARY",
  "VENDOR-BLOG": "VENDOR",
  "VENDOR-DOCS": "VENDOR",
  "VENDOR-COURSE": "VENDOR",
  "VENDOR-RESOURCE": "VENDOR",
  "INDUSTRY-PUB": "MEDIA",
  "PODCAST": "MEDIA",
  "COURSE": "MEDIA",
  "PRACTITIONER": "PRACTITIONER",
  "OPEN-SOURCE": "OPEN-SOURCE",
  "AGENCY-CASE": "AGENCY",
  // Already-consolidated forms (idempotent)
  "VENDOR": "VENDOR",
  "MEDIA": "MEDIA",
  "AGENCY": "AGENCY",
};

const tierOf = (total: number): "S" | "A" | "B" | "C" => {
  if (total >= 31) return "S"; // top ~9% — true headline grade
  if (total >= 28) return "A"; // solid support
  if (total >= 24) return "B"; // context only
  return "C";                   // skip
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

// Step 1: Build RCNT/MTCH lookup from prior CSV
const oldText = readFileSync(oldCsvPath, "utf8");
const oldRows = parseCsv(oldText);
const oldHeader = oldRows[0];
const oldIdIdx = oldHeader.indexOf("ID");
const oldRcntIdx = oldHeader.indexOf("RCNT");
const oldMtchIdx = oldHeader.indexOf("MTCH");
const lookup: Record<string, { rcnt: string; mtch: string }> = {};
for (let i = 1; i < oldRows.length; i++) {
  const id = oldRows[i][oldIdIdx];
  if (id) lookup[id] = { rcnt: oldRows[i][oldRcntIdx], mtch: oldRows[i][oldMtchIdx] };
}

// Step 2: Read current CSV
const csvText = readFileSync(csvPath, "utf8");
const rows = parseCsv(csvText);
const header = rows[0];

// Find current column positions
const idIdx = header.indexOf("ID");
const trustIdx = header.indexOf("TrustSignals");
const typeIdx = header.indexOf("Type");
const indpIdx = header.indexOf("INDP");
const vrfyIdx = header.indexOf("VRFY");
const adoptIdx = header.indexOf("ADOPT");
const totalIdx = header.indexOf("Total");
const tierIdx = header.indexOf("Tier");
const authIdx = header.indexOf("AUTH");
const specIdx = header.indexOf("SPEC");
const hasRcnt = header.includes("RCNT");
const hasMtch = header.includes("MTCH");

// Step 3: Build new header
//   Drop TrustSignals; insert RCNT after INDP, MTCH after VRFY (only if missing)
const newHeader: string[] = [];
for (let i = 0; i < header.length; i++) {
  if (i === trustIdx) continue; // skip TrustSignals
  newHeader.push(header[i]);
  if (i === indpIdx && !hasRcnt) newHeader.push("RCNT");
  if (i === vrfyIdx && !hasMtch) newHeader.push("MTCH");
}

const NEW = {
  ID: newHeader.indexOf("ID"),
  AUTH: newHeader.indexOf("AUTH"),
  SPEC: newHeader.indexOf("SPEC"),
  INDP: newHeader.indexOf("INDP"),
  RCNT: newHeader.indexOf("RCNT"),
  VRFY: newHeader.indexOf("VRFY"),
  MTCH: newHeader.indexOf("MTCH"),
  ADOPT: newHeader.indexOf("ADOPT"),
  TOTAL: newHeader.indexOf("Total"),
  TIER: newHeader.indexOf("Tier"),
  TYPE: newHeader.indexOf("Type"),
};

// Step 4: Rebuild rows
const newRows: string[][] = [newHeader];
let typeUnmappedWarnings = 0;
for (let i = 1; i < rows.length; i++) {
  const old = rows[i];
  const id = old[idIdx];
  const lk = lookup[id];
  const rcnt = lk?.rcnt ?? "5";
  const mtch = lk?.mtch ?? "4";

  const newRow: string[] = [];
  for (let j = 0; j < header.length; j++) {
    if (j === trustIdx) continue;
    let value = old[j];
    if (j === typeIdx) {
      const mapped = TYPE_MAP[value];
      if (!mapped) {
        typeUnmappedWarnings++;
        console.warn(`Unknown Type "${value}" for ${id} — leaving as-is`);
      }
      value = mapped ?? value;
    }
    newRow.push(value);
    if (j === indpIdx && !hasRcnt) newRow.push(rcnt);
    if (j === vrfyIdx && !hasMtch) newRow.push(mtch);
  }

  // Recompute Total + Tier (using new column positions)
  const sum =
    parseInt(newRow[NEW.AUTH]) +
    parseInt(newRow[NEW.SPEC]) +
    parseInt(newRow[NEW.INDP]) +
    parseInt(newRow[NEW.RCNT]) +
    parseInt(newRow[NEW.VRFY]) +
    parseInt(newRow[NEW.MTCH]) +
    parseInt(newRow[NEW.ADOPT]);
  newRow[NEW.TOTAL] = String(sum);
  newRow[NEW.TIER] = tierOf(sum);

  newRows.push(newRow);
}

writeFileSync(csvPath, writeCsv(newRows));

// Report
const counts: Record<string, number> = { S: 0, A: 0, B: 0, C: 0 };
const typeCounts: Record<string, number> = {};
for (let i = 1; i < newRows.length; i++) {
  counts[newRows[i][NEW.TIER]]++;
  const t = newRows[i][NEW.TYPE];
  typeCounts[t] = (typeCounts[t] ?? 0) + 1;
}
console.log(`New header (${newHeader.length} cols):`, newHeader.join(", "));
console.log(`Type distribution:`, typeCounts);
console.log(`Tier distribution (max 35, thresholds S≥31 / A 28-30 / B 24-27 / C≤23):`, counts);
if (typeUnmappedWarnings > 0) console.warn(`${typeUnmappedWarnings} unknown Type values found.`);
