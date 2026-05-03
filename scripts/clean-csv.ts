#!/usr/bin/env bun
/**
 * Clean source-assessment.csv:
 *   - drop Use and Cluster columns
 *   - merge Author + Role into a single Who column
 *
 * Usage: bun scripts/clean-csv.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

const path = "data/source-assessment.csv";

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

const csv = readFileSync(path, "utf8");
const rows = parseCsv(csv);
const header = rows[0];

const idIdx = header.indexOf("ID");
const authorIdx = header.indexOf("Author");
const roleIdx = header.indexOf("Role");
const useIdx = header.indexOf("Use");
const clusterIdx = header.indexOf("Cluster");

if (authorIdx < 0 || roleIdx < 0) {
  console.log("Already cleaned (Author/Role missing).");
  process.exit(0);
}

// Drop columns to remove
const dropSet = new Set([authorIdx, roleIdx, useIdx, clusterIdx].filter((i) => i >= 0));

// New header with Who replacing Author at the same position
const newHeader: string[] = [];
for (let i = 0; i < header.length; i++) {
  if (i === authorIdx) newHeader.push("Who");
  else if (dropSet.has(i)) continue;
  else newHeader.push(header[i]);
}

// Rebuild rows
const newRows: string[][] = [newHeader];
for (let r = 1; r < rows.length; r++) {
  const old = rows[r];
  const author = (old[authorIdx] ?? "").trim();
  const role = (old[roleIdx] ?? "").trim();
  const who = author && role
    ? `${author} · ${role}`
    : author || role;
  const out: string[] = [];
  for (let i = 0; i < header.length; i++) {
    if (i === authorIdx) out.push(who);
    else if (dropSet.has(i)) continue;
    else out.push(old[i] ?? "");
  }
  newRows.push(out);
}

writeFileSync(path, writeCsv(newRows));
console.log(`Header (${newHeader.length} cols):`, newHeader.join(", "));
console.log(`Rows: ${newRows.length - 1}`);
