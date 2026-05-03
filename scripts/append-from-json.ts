#!/usr/bin/env bun
/**
 * Append rows from a JSON array to source-assessment.csv.
 * The JSON keys must match the CSV header exactly.
 *
 * Usage: bun scripts/append-from-json.ts data/_pending-personal.json
 */
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";

const csvPath = "data/source-assessment.csv";
const jsonPath = process.argv[2];

if (!jsonPath) {
  console.error("Usage: bun scripts/append-from-json.ts <path/to/rows.json>");
  process.exit(1);
}

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

const csv = readFileSync(csvPath, "utf8");
const rows = parseCsv(csv);
const header = rows[0];

const newRows: Record<string, string>[] = JSON.parse(readFileSync(jsonPath, "utf8"));

// Sanity check: all keys exist in header
const missing = new Set<string>();
for (const r of newRows) {
  for (const k of Object.keys(r)) {
    if (!header.includes(k)) missing.add(k);
  }
}
if (missing.size) {
  console.error("Unknown columns in JSON (not in CSV header):", [...missing]);
  process.exit(1);
}

for (const r of newRows) rows.push(header.map((col) => r[col] ?? ""));
writeFileSync(csvPath, writeCsv(rows));

console.log(`Appended ${newRows.length} rows. Total: ${rows.length - 1} sources.`);
