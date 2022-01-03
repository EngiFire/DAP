//Вывод стриницы статитики для МНК
function regressionMNK() {
  var dataRange = menuZero.offset(3, 1).getValue();
  var data = spreadsheet.getRange(dataRange).getValues();
  var delVoids = menuZero.offset(6, 1).isChecked();
  var columnNumber = menuZero.offset(7, 1).getValue();
  var delColumns = menuZero.offset(8, 1).getValue();
  //Для GRAD
  var epoch = menuZero.offset(15, 1).getValue();

  var forma =
    [['Регрессионная статистика', '', '', 'Настройки', '', 'Функции', ''],
    ['Множественный R', '', '', '', '', '', ''],
    ['R-квадрат', '', '', '', '', '', ''],
    ['Нормированный R-квадрат', '', '', '', '', '', ''],
    ['Стандартная ошибка', '', '', '', '', '', ''],
    ['Наблюдения', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['Дисперсионный анализ', '', '', '', '', '', ''],
    ['', 'df', 'SS', 'MS', 'F', 'Fкрит', 'Tкрит'],
    ['Регрессия', '', '', '', '', '', ''],
    ['Остаток', '', '', '', '', '', ''],
    ['Итого', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', 'Коэффициенты', 'Стандартная ошибка', 't-статистика', 'P-Значение', '', '']];

  var categorical = false

  for (var i = 0; i < data[0].length; i++) {
    if (typeof data[1][i] != 'number') {
      categorical = true
      break
    }
  }

  if (columnNumber != 1 || delColumns != '' || delVoids || categorical) {
    dataPreparation();
    correlationList.insertColumnsBefore(1, 7);
    dataRange = 'offset(H1;;;COUNTA(H1:H);COUNTA(H1:1))';
  } else {
    dataRange = dataRange;
    newList()
  }

  //Скрыть лишние столбцы
  correlationList.hideColumns(8, correlationList.getMaxColumns() - 7);

  var fArray = [
    '=REG_MNK(', //0

    '=OBSERVATIONS(', //1
    '=DF_REGRESSION(', //2
    '=DF_REMAINS(', //3
    '=DF_TOTAL(', //4

    '=R2_MULTIPLE(', //5
    '=R2(', //6
    '=R2_NORMALIZED(', //7
    '=STANDARD_ESTIMATION_ERROR(', //8      
    '=SS(', //9
    '=MS(', //10  
    '=F_TEST(', //11
    '=STANDARD_PARAMETER_ERRORS(', //12
    '=T_STATISTICS(', //13
    '=P_VALUES(', //14
    '=CONFIDENCE_INTERVALS(', //15

    '=F_INV_RT(', //16
    '=T_INV_2T(' //17
  ];

  for (var i = 0; i < fArray.length; i++) {
    fArray[i] += dataRange;
  }

  for (var i = 5; i < fArray.length - 2; i++) {
    fArray[i] += ';offset(B16;offset(B16;B11+3;)*0;;B11+1)'
  }

  for (var i = 15; i < fArray.length; i++) {
    fArray[i] += '; E2';
  }

  for (var i = 1; i < fArray.length; i++) {
    fArray[i] += ')';
  }

  correlationList.getRange(1, 1, forma.length, forma[0].length).setValues(forma);
  correlationList.getRange('F15:G15').setFormulas([['=concatenate("Нижние ";E2*100;"%")', '=concatenate("Верхние ";E2*100;"%")']])
  correlationList.getDataRange().setNumberFormat('#,##0.00');
  spreadsheet.getRange(menuZero.offset(11, 0, 6, 2).getA1Notation()).copyTo(correlationList.getRange('D2:E7'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);

  correlationList.getRange('F6:G7').mergeVertically();
  correlationList.getRange('F2:G5').mergeVertically();
  correlationList.getRange('D1:E1').mergeAcross();
  correlationList.getRange('F1:G1').mergeAcross();

  correlationList.getRange('D1:G7').setHorizontalAlignment('center');
  correlationList.getRange('D1:G7').setVerticalAlignment('middle');
  correlationList.getRange('D1:G7').setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);
  correlationList.getRange('D1:E7').setBorder(null, null, null, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);

  correlationList.autoResizeColumns(1, 7);

  correlationList.getRange('F2').setValue('Удалить\nнаименее\nважный\nпараметр');
  correlationList.getRange('F6').setValue('Фиксировать\nзначения');

  //Для GRAD
  if (epoch != '') {
    fArray[0] = '=IFERROR(if(or(G2;G6);offset(B16;;;B11+4);REG_GRAD(' + dataRange + ';offset(B16;;;B11+1);E3;E4;E5;E6;offset(B16;B11+1;);E7;0;1;1;1' + '));offset(B16;;;B11+3))';
    correlationList.getRange(16, 2).setFormula(fArray[0]);
    correlationList.getRange(16, 1).setFormula('={transpose(offset(H1;;;1;B11+1));"Пройдено эпох";"Последнее время выполнения";"Длительность выполнения"}');
  } else {
    fArray[0] += ';E3;1;1;1)'
    correlationList.getRange(16, 1).setFormula(fArray[0]);
  }

  //correlationList.getRange(16, 1).setFormula(fArray[0]);
  correlationList.getRange(6, 2).setFormula(fArray[1]);
  correlationList.getRange(11, 2).setFormula(fArray[2]);
  correlationList.getRange(12, 2).setFormula(fArray[3]);
  correlationList.getRange(13, 2).setFormula(fArray[4]);
  correlationList.getRange(2, 2).setFormula(fArray[5]);
  correlationList.getRange(3, 2).setFormula(fArray[6]);
  correlationList.getRange(4, 2).setFormula(fArray[7]);
  correlationList.getRange(5, 2).setFormula(fArray[8]);
  correlationList.getRange(11, 3).setFormula(fArray[9]);
  correlationList.getRange(11, 4).setFormula(fArray[10]);
  correlationList.getRange(11, 5).setFormula(fArray[11]);
  correlationList.getRange(16, 3).setFormula(fArray[12]);
  correlationList.getRange(16, 4).setFormula(fArray[13]);
  correlationList.getRange(16, 5).setFormula(fArray[14]);
  correlationList.getRange(16, 6).setFormula(fArray[15]);
  correlationList.getRange(11, 6).setFormula(fArray[16]);
  correlationList.getRange(11, 7).setFormula(fArray[17]);

  //чекбоксы для доп. функций
  correlationList.getRange('G2:G6').insertCheckboxes()
}


//Замена части двумерного массива на другой
function insertAnArray(M, Z, y, x) {
  for (var i = 0; i < Z.length; i++) {
    for (var j = 0; j < Z[0].length; j++) {
      M[i + y][j + x] = Z[i][j]
    }
  }
  return M
}


//Удалить лишний параметр
function deleteParameter() {
  var dataFormula = zeroCentre.offset(-1, 1).getFormula();
  var df_reg = spreadsheet.getRange('B11').getValue();
  var labelsAndP = spreadsheet.getRange(17, 1, df_reg, 5).getValues();
  var maxP = -1;
  var label = null;
  var labelIndex = null;
  for (var i = 0; i < labelsAndP.length; i++) {
    if (labelsAndP[i][4] >= maxP) {
      maxP = labelsAndP[i][4];
      label = labelsAndP[i][0];
      labelIndex = i;
    }
  }

  //Удаление для динамичных регрессий
  if (dataFormula != "") {
    var index = dataFormula.indexOf(");OFFSET(");
    spreadsheet.getRange('H1').setFormula(dataFormula.slice(0, index) + ';"' + label + '"' + dataFormula.slice(index))
  } else {
    spreadsheet.deleteColumn(9 + labelIndex);
  }
  spreadsheet.getRange('G2').uncheck()
}


//Зафиксировать значения
function fixate() {
  spreadsheet.getDataRange().setValues(spreadsheet.getDataRange().getValues());
  spreadsheet.getRange('G6').uncheck()
}