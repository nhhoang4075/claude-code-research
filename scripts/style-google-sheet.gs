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
  // Read the full row 1 so we can locate "Tier" even if the legend already
  // exists in columns R:S from a prior run.
  const fullHeaderRow = sheet.getRange(1, 1, 1, sheet.getMaxColumns()).getValues()[0];
  const tierColIdx = fullHeaderRow.indexOf("Tier") + 1;
  // The data ends at the Tier column. If we can't find Tier, fall back to
  // getLastColumn() (first run before the legend exists).
  const lastCol = tierColIdx > 0 ? tierColIdx : sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 2) {
    SpreadsheetApp.getUi().alert("Sheet appears empty.");
    return;
  }

  // Build header → column-index map (data columns only, excluding the legend)
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
    AUTH: 64, SPEC: 64, INDP: 64, VRFY: 64, ADOPT: 70,
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
  ["ID", "Year", "AUTH", "SPEC", "INDP", "VRFY", "ADOPT", "Total", "Tier", "Type", "Discipline"].forEach((col) => {
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
  ["AUTH", "SPEC", "INDP", "VRFY", "ADOPT"].forEach((col) => {
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

  // Total heatmap (max 25 now — calibrated to actual distribution)
  if (colIdx.Total) {
    const r = sheet.getRange(2, colIdx.Total, lastRow - 1, 1);
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .setGradientMinpointWithValue("#fecaca", SpreadsheetApp.InterpolationType.NUMBER, "10")
        .setGradientMidpointWithValue("#fef08a", SpreadsheetApp.InterpolationType.NUMBER, "17")
        .setGradientMaxpointWithValue("#86efac", SpreadsheetApp.InterpolationType.NUMBER, "23")
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

  // ── 11. Vietnamese compact field guide (legend) at columns R:S ───
  // User preference: descriptions adjacent to data, not as hover-overlay.
  // Compact Vietnamese — one line per cell, designed for quick scan.
  const FIELD_GUIDE = [
    ["Cột", "Mô tả (Vietnamese · compact)"],
    ["ID", "Mã định danh nguồn (R001, R002…)"],
    ["Source", "Tên bài viết / repo / khóa học / podcast"],
    ["Who", "Tác giả + vai trò (định dạng \"Tên · Vai trò\")"],
    ["TrustSignals", "1–3 bằng chứng cụ thể về độ tin cậy"],
    ["Type", "PRIMARY · VENDOR-* · INDUSTRY-PUB · AGENCY-CASE · PRACTITIONER · OPEN-SOURCE · PODCAST · COURSE"],
    ["Discipline", "SEO · GADS · META · BRAND · ANALYTICS · MOPS · CONTENT · CROSS"],
    ["Year", "Năm xuất bản"],
    ["URL", "Đường dẫn nguồn gốc"],
    ["KeyData", "Số liệu / workflow / case study chính"],
    ["AUTH", "Uy tín (1–5). 5=Anthropic/báo lớn. 4=agency lâu năm. 3=cá nhân tên thật. 2=handle GitHub. 1=ẩn danh."],
    ["SPEC", "Cụ thể (1–5). 5=số liệu+phương pháp. 1=mơ hồ."],
    ["INDP", "Độc lập (1–5). 5=không lợi ích. 2=vendor kế cận. 1=Anthropic."],
    ["VRFY", "Kiểm chứng (1–5). 5=mã nguồn mở/dữ liệu công khai. 1=giai thoại."],
    ["ADOPT", "Phổ biến (1–5). 5=3000+ stars. 4=200–2999. 3=50–199. 2=<50. 1=mới."],
    ["Total", "Tổng (max 25) = AUTH+SPEC+INDP+VRFY+ADOPT"],
    ["Tier", "S ≥ 21 · A 19–20 · B 15–18 · C ≤ 14"],
  ];

  const guideStartCol = lastCol + 2; // Leave one empty column between data and guide
  // Spacer column
  sheet.setColumnWidth(lastCol + 1, 24);
  // Field-guide widths
  sheet.setColumnWidth(guideStartCol, 110);
  sheet.setColumnWidth(guideStartCol + 1, 480);

  // Clear any old guide content first (covers wider area to be safe)
  sheet.getRange(1, guideStartCol, 30, 2).clearContent().clearFormat();

  // Write content
  const guideRange = sheet.getRange(1, guideStartCol, FIELD_GUIDE.length, 2);
  guideRange.setValues(FIELD_GUIDE);

  // Style the guide header
  const guideHeader = sheet.getRange(1, guideStartCol, 1, 2);
  guideHeader.setBackground("#1c1917").setFontColor("#fafaf9").setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  // Style the guide body
  const guideBody = sheet.getRange(2, guideStartCol, FIELD_GUIDE.length - 1, 2);
  guideBody.setVerticalAlignment("top").setFontSize(10).setWrap(true);

  // First column (Cột name) styling
  const guideKeyCol = sheet.getRange(2, guideStartCol, FIELD_GUIDE.length - 1, 1);
  guideKeyCol.setFontFamily("Roboto Mono, ui-monospace, monospace").setFontWeight("bold")
    .setBackground("#fef2f2").setFontColor("#b91c1c").setHorizontalAlignment("center");

  // Description column styling
  const guideDescCol = sheet.getRange(2, guideStartCol + 1, FIELD_GUIDE.length - 1, 1);
  guideDescCol.setBackground("#fafaf9").setFontColor("#1c1917");

  // Borders around the guide
  sheet.getRange(1, guideStartCol, FIELD_GUIDE.length, 2)
    .setBorder(true, true, true, true, true, true, "#e7e5e4", SpreadsheetApp.BorderStyle.SOLID);

  // Row heights for guide rows
  sheet.setRowHeightsForced(2, FIELD_GUIDE.length - 1, 32);

  // Toast confirmation
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Styling applied — " + (lastRow - 1) + " rows × " + lastCol + " columns",
    "SEONGON sources",
    3
  );
}

/**
 * Optional: sort the data rows by Total descending. Run after styleSheet().
 * Constrains the sort range to data columns (A:Tier) so the field-guide
 * legend in columns R:S stays in place.
 */
function sortByTotalDesc() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const headerRow = sheet.getRange(1, 1, 1, sheet.getMaxColumns()).getValues()[0];
  const tierIdx = headerRow.indexOf("Tier") + 1;
  const totalIdx = headerRow.indexOf("Total") + 1;
  if (tierIdx <= 0 || totalIdx <= 0) {
    SpreadsheetApp.getUi().alert("Couldn't find Total or Tier column.");
    return;
  }
  sheet.getRange(2, 1, lastRow - 1, tierIdx).sort({ column: totalIdx, ascending: false });
  SpreadsheetApp.getActiveSpreadsheet().toast("Sorted by Total ↓", "SEONGON sources", 3);
}
