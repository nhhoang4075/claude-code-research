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
