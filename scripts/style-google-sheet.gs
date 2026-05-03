/**
 * Style the SEONGON — Claude Code Source Assessment sheet.
 *
 * One-time setup:
 *   1. Open the Sheet:
 *      https://docs.google.com/spreadsheets/d/1DMQGo8NvTttNmmmif8Uy0S5N7-Afn-QTumVTUP5496I/edit
 *   2. Extensions → Apps Script
 *   3. Replace the default Code.gs contents with this entire file
 *   4. Save (⌘+S), then click ▶ Run (will prompt for authorization the first time)
 *   5. Watch the Sheet — it will be styled in ~3 seconds
 *
 * Re-run any time after editing the data — formatting reapplies cleanly.
 *
 * What it does:
 *   • Header row: dark background, white bold text, centered, frozen
 *   • Column 1 (ID) + Column 2 (Source) frozen for horizontal scroll
 *   • Column widths sized per content type (narrow for IDs, wide for descriptions)
 *   • Long-text columns (Source, Who, TrustSignals, KeyData) wrap text
 *   • Score columns (AUTH..ADOPT) get red→yellow→green heatmap (1..5)
 *   • Total column gets a deeper heatmap (14→24→32)
 *   • Tier column: S=red, A=amber, B=grey, C=light grey — with white bold text
 *   • All numeric / short columns center-aligned
 *   • Row banding (alternating light grey)
 *   • Light borders throughout
 *   • Row height 80px to fit wrapped descriptions
 */

function styleSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 2) {
    SpreadsheetApp.getUi().alert("Sheet appears empty.");
    return;
  }

  // Build header → column-index map
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const colIdx = {};
  headers.forEach((h, i) => { colIdx[h] = i + 1; });

  // Clear prior conditional format rules so re-runs don't pile up
  sheet.clearConditionalFormatRules();

  // ── 1. Header row ────────────────────────────────────────────────
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange
    .setFontWeight("bold")
    .setBackground("#1c1917")
    .setFontColor("#fafaf9")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2); // ID + Source stay visible on horizontal scroll
  sheet.setRowHeight(1, 36);

  // ── 2. Column widths ─────────────────────────────────────────────
  const widths = {
    ID: 64, Source: 280, Who: 300, TrustSignals: 360,
    Type: 130, Discipline: 120, Year: 60, URL: 220,
    KeyData: 380,
    AUTH: 60, SPEC: 60, INDP: 60, RCNT: 60, VRFY: 60, MTCH: 60, ADOPT: 70,
    Total: 70, Tier: 70,
  };
  Object.keys(widths).forEach((col) => {
    if (colIdx[col]) sheet.setColumnWidth(colIdx[col], widths[col]);
  });

  // ── 3. Data rows: base styling ───────────────────────────────────
  const dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
  dataRange
    .setVerticalAlignment("top")
    .setFontSize(10)
    .setFontFamily("Inter");

  // ── 4. Wrap long-text columns ────────────────────────────────────
  ["Source", "Who", "TrustSignals", "KeyData"].forEach((col) => {
    if (colIdx[col]) {
      sheet.getRange(2, colIdx[col], lastRow - 1, 1).setWrap(true);
    }
  });

  // ── 5. Center-align numeric / short categorical columns ──────────
  ["ID", "Year", "AUTH", "SPEC", "INDP", "RCNT", "VRFY", "MTCH", "ADOPT", "Total", "Tier", "Type", "Discipline"].forEach((col) => {
    if (colIdx[col]) {
      sheet.getRange(2, colIdx[col], lastRow - 1, 1).setHorizontalAlignment("center");
    }
  });

  // ── 6. Build conditional format rules ────────────────────────────
  const rules = [];

  // Tier badges
  if (colIdx.Tier) {
    const r = sheet.getRange(2, colIdx.Tier, lastRow - 1, 1);
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("S").setBackground("#b91c1c").setFontColor("#ffffff").setBold(true)
        .setRanges([r]).build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("A").setBackground("#f59e0b").setFontColor("#ffffff").setBold(true)
        .setRanges([r]).build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("B").setBackground("#d6d3d1").setFontColor("#1c1917").setBold(true)
        .setRanges([r]).build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("C").setBackground("#f5f5f4").setFontColor("#78716c")
        .setRanges([r]).build()
    );
  }

  // 1–5 score heatmap
  ["AUTH", "SPEC", "INDP", "RCNT", "VRFY", "MTCH", "ADOPT"].forEach((col) => {
    if (colIdx[col]) {
      const r = sheet.getRange(2, colIdx[col], lastRow - 1, 1);
      rules.push(
        SpreadsheetApp.newConditionalFormatRule()
          .setGradientMinpointWithValue("#fee2e2", SpreadsheetApp.InterpolationType.NUMBER, "1")
          .setGradientMidpointWithValue("#fef9c3", SpreadsheetApp.InterpolationType.NUMBER, "3")
          .setGradientMaxpointWithValue("#dcfce7", SpreadsheetApp.InterpolationType.NUMBER, "5")
          .setRanges([r]).build()
      );
    }
  });

  // Total heatmap (deeper, since 7–35 range)
  if (colIdx.Total) {
    const r = sheet.getRange(2, colIdx.Total, lastRow - 1, 1);
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .setGradientMinpointWithValue("#fecaca", SpreadsheetApp.InterpolationType.NUMBER, "14")
        .setGradientMidpointWithValue("#fef08a", SpreadsheetApp.InterpolationType.NUMBER, "24")
        .setGradientMaxpointWithValue("#86efac", SpreadsheetApp.InterpolationType.NUMBER, "32")
        .setRanges([r]).build()
    );
    sheet.getRange(2, colIdx.Total, lastRow - 1, 1).setFontWeight("bold");
  }

  sheet.setConditionalFormatRules(rules);

  // ── 7. Borders ───────────────────────────────────────────────────
  const fullRange = sheet.getRange(1, 1, lastRow, lastCol);
  fullRange.setBorder(true, true, true, true, true, true, "#e7e5e4", SpreadsheetApp.BorderStyle.SOLID);

  // Heavier border under the header row
  headerRange.setBorder(null, null, true, null, null, null, "#1c1917", SpreadsheetApp.BorderStyle.SOLID_THICK);

  // ── 8. Row banding (alternating fill) ────────────────────────────
  // Remove any existing banding first
  sheet.getBandings().forEach((b) => b.remove());
  const banding = dataRange.applyRowBanding();
  banding.setFirstRowColor("#ffffff").setSecondRowColor("#fafaf9").setHeaderRowColor(null);

  // ── 9. Row heights for data ──────────────────────────────────────
  sheet.setRowHeightsForced(2, lastRow - 1, 80);

  // ── 10. Source URL column: ensure links are clickable ────────────
  if (colIdx.URL) {
    const urlRange = sheet.getRange(2, colIdx.URL, lastRow - 1, 1);
    urlRange.setShowHyperlink(true);
    urlRange.setFontColor("#b91c1c");
  }

  // ── 11. Header hover-tooltip notes ───────────────────────────────
  // Hover any column header to see what the column means. Same content
  // as the local viewer's field guide.
  const NOTES = {
    ID: "Unique source identifier (R001, R002…). Stable across edits.",
    Source: "Title of the article, repo, course, podcast episode, or document.",
    Who: "Person/org that published it + their professional role.\nFormat: \"{Name} · {Role}\".\nThe \"why their voice matters\" column.",
    TrustSignals: "1–3 concrete observable facts supporting (or qualifying) credibility — e.g. \"agency operating since 2007\", \"vendor of the MCP server they describe\", \"code-as-evidence — every claim verifiable in repo\". Distinct from the AUTH score.",
    Type: "Source category:\nPRIMARY (Anthropic publishing about Claude)\nVENDOR-COURSE / VENDOR-DOCS / VENDOR-BLOG / VENDOR-RESOURCE (vendor selling something)\nINDUSTRY-PUB (Search Engine Land, MarTech.org)\nAGENCY-CASE (named agency case study)\nPRACTITIONER (individual blog/Substack)\nOPEN-SOURCE (GitHub repo)\nPODCAST · COURSE · PRIMARY-RESEARCH",
    Discipline: "Marketing area:\nSEO · GADS (Google Ads) · META (Facebook/Instagram Ads) · BRAND (digital branding) · ANALYTICS · MOPS (marketing ops) · CONTENT · CROSS (cross-cutting).\nCompound values like GADS+META are allowed.",
    Year: "Publication or measurement year.",
    URL: "Direct link to the source.",
    KeyData: "Headline data points extracted from the source — numbers, named workflows, case studies, methodologies.\nShould be readable on its own without opening the URL.",
    AUTH: "Authority (1–5) — credibility of the source itself.\n5 = Anthropic primary / peer-reviewed / major industry pub (Search Engine Land, MarTech)\n4 = established agency with operating history (Ayima, Animalz, AdventurePPC) OR senior named operator (Emily Kramer)\n3 = named individual with verifiable professional context\n2 = pseudonymous handle / GitHub username with no verified institutional identity (AgriciDaniel, aaron-he-zhu, HeyOz) — even with rich repos\n1 = anonymous / no track record",
    SPEC: "Specificity (1–5) — concreteness of the data.\n5 = exact metrics with methodology (e.g. \"ad copy 2h→15min, sub-agent architecture\")\n4 = specific named workflows with measured outcomes\n3 = specific named workflows without numbers\n2 = generic categorical claims\n1 = vague enthusiasm",
    INDP: "Independence (1–5) — commercial interest in promoting Claude Code.\n5 = no stake (pure user case study)\n4 = industry observer (publication writing about the space)\n3 = practitioner who uses Claude but doesn't sell anything related\n2 = adjacent-tool vendor (HubSpot, Coupler, Improvado, Windsor)\n1 = vendor of the tool itself (Anthropic only)\nLow INDP doesn't disqualify a source — just read it more carefully.",
    RCNT: "Recency (1–5) — how recent the data is.\n5 = 2026\n4 = late 2025 (Q3-Q4)\n3 = mid 2025 (Q2)\n2 = early 2025 (Q1)\n1 = ≤ 2024 (likely covers tooling that has changed)",
    VRFY: "Verifiability (1–5) — can the claim be independently checked?\n5 = open-source code or public dataset\n4 = live demo / public artifact / accessible product\n3 = detailed methodology described\n2 = self-reported with no verification path\n1 = anecdotal with no specifics",
    MTCH: "Match (1–5) — direct relevance to SEONGON's billable services.\n5 = SEO / Google Ads / Facebook Ads / Digital Branding\n4 = cross-cutting that compounds across services (analytics, ops)\n3 = adjacent service (content marketing, email)\n2 = tangential (CRM, ABM)\n1 = unrelated (personal use, software-eng only)",
    ADOPT: "Adoption (1–5) — external validation / market traction.\n5 = canonical / market-leading: 3,000+ GitHub stars, major industry pub, top platform docs, top product newsletter\n4 = strong: 200–2,999 stars, established vendor, named industry observer\n3 = mid: 50–199 stars, established but smaller vendor\n2 = niche: <50 stars, newer practitioner brand\n1 = brand new / no traction\nFor non-repos: vendor revenue/funding, publication reach, citation count.\nDeliberately separate from AUTH — many high-ADOPT repos have anonymous handle authors (low AUTH, high ADOPT); many high-AUTH sources have low reach (high AUTH, low ADOPT).",
    Total: "Sum of the 7 scores (AUTH + SPEC + INDP + RCNT + VRFY + MTCH + ADOPT). Range 7–35. The single quality-of-evidence number.",
    Tier: "Bucket derived from Total:\nS = 28–35 → headline-grade evidence (anchor proposal claims)\nA = 21–27 → solid supporting evidence\nB = 14–20 → weak / context-only\nC = ≤ 13 → skip\nNo source is auto-disqualified by one low dimension.",
  };
  Object.keys(NOTES).forEach((col) => {
    if (colIdx[col]) {
      sheet.getRange(1, colIdx[col]).setNote(NOTES[col]);
    }
  });

  // Toast confirmation
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Styling applied — " + (lastRow - 1) + " rows × " + lastCol + " columns",
    "SEONGON sources",
    3
  );
}

/**
 * Optional: sort the data rows by Total descending. Run after styleSheet().
 */
function sortByTotalDesc() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const totalIdx = headers.indexOf("Total") + 1;
  if (totalIdx <= 0) {
    SpreadsheetApp.getUi().alert("No 'Total' column found.");
    return;
  }
  sheet.getRange(2, 1, lastRow - 1, lastCol).sort({ column: totalIdx, ascending: false });
  SpreadsheetApp.getActiveSpreadsheet().toast("Sorted by Total ↓", "SEONGON sources", 3);
}
