function deleteAllll() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('G10:H25').activate();
  spreadsheet.getActiveRangeList().clear({ contentsOnly: true, skipFilteredRows: true })
    .setBorder(false, false, false, false, false, false);
  spreadsheet.getRange('G10:H25').clearDataValidations();
};

function itera() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setRecalculationInterval(SpreadsheetApp.RecalculationInterval.ON_CHANGE);
  spreadsheet.setIterativeCalculationEnabled(true);
  spreadsheet.setMaxIterativeCalculationCycles(1);
  spreadsheet.setIterativeCalculationConvergenceThreshold(0);
};


function cop() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('J12:K17').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Peгpeccия (MHK)'), true);
  spreadsheet.getRange('D2').activate();
  spreadsheet.getRange('main!J12:K17').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
};
