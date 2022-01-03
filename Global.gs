var spreadsheet = SpreadsheetApp.getActive().getActiveSheet();
var zeroCentre = spreadsheet.getActiveCell(); 
var menuZero = spreadsheet.getActiveCell();
var X = null; //А нужно ли?
var Y = null;
//var menuZero = null;
//Hi!!!
//Деревья
var result = [['Родитель', 'Название']];
var treeNames = null;
var treeCount = 0;
var leaf = 0;
var differenceRSS = [[],[]];