/**
 * WebVitels enquiries -> Google Sheets webhook.
 * Paste into Extensions > Apps Script of the target spreadsheet.
 * Set Script Property WEBHOOK_SECRET to the same value as GOOGLE_SHEETS_WEBHOOK_SECRET.
 */
const SHEET_NAME = "Enquiries";
const HEADERS = ["Received at", "Name", "Email", "Phone", "Project type", "Message", "User agent", "Status"];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!secret || body.secret !== secret) return json({ ok: false, error: "unauthorized" });

    getSheet().appendRow([
      new Date(),
      body.name || "",
      body.email || "",
      body.phone || "",
      body.type || "",
      body.message || "",
      body.userAgent || "",
      "New",
    ]);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server_error" });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
