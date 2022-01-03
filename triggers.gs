/**
 *
 */
function runOnce() {
  trigger_()
}

/**
 *
 */
function trigger_() {
  ScriptApp.newTrigger("triggerAction")
    .timeBased()
    .everyMinutes(1)
    .create();
}

/**
 *
 */
function triggerAction() {
  spreadsheet.getRange(10, 2).setValue(spreadsheet.getRange(10, 2).getValue())
}
