function correlation_full() {
  var dataRange = menuZero.offset(3, 1).getValue()
  var data = spreadsheet.getRange(dataRange).getValues()
  var refreshable = menuZero.offset(5, 1).isChecked()
  var delVoids = menuZero.offset(6, 1).isChecked()
  var columnNumber = menuZero.offset(7, 1).getValue()
  var delColumns = menuZero.offset(8, 1).getValue()
  var sep = menuZero.offset(9, 1).getValue()

  if (!refreshable) {
    if (delVoids) { //Удаление строк с пустотами
      data = DC_REMOVE_VOIDS(data)
    }

    var categorical = false

    for (var i = 0; i < data[0].length; i++) {
      if (typeof data[1][i] != 'number') {
        categorical = true
        break
      }
    }

    if (categorical) {
      if (sep == '') {
        data = DC_CATEGORICAL(data)
      } else {
        data = DC_CATEGORICAL(data, sep)
      }
    }

    if (columnNumber != 1 || delColumns != '') {
      if (delColumns != '') {
        var args = delColumns.split(';')
        delColumns = args.map(function (arg) {
          if (arg[0].toLowerCase().match(/[a-z]/i)) {
            return spreadsheet.getRange(arg.trim()).getValue()
          } else if (arg[0] == '"') {
            return arg.slice(1, -1).trim()
          } else {
            return Number(arg.trim())
          }
        })
        data = DC_SELECT(data, columnNumber, delColumns)
      } else {
        data = DC_SELECT(data, columnNumber)
      }
    }
  } else {
    var formula = '=CORRELATION('

    var categorical = false
    for (var i = 0; i < data[0].length; i++) {
      if (typeof data[1][i] != 'number') {
        categorical = true
        break
      }
    }
    if (columnNumber != 1 || delColumns != '') {
      formula += 'DC_SELECT('
    }

    if (categorical) {
      formula += 'DC_CATEGORICAL('
    }

    if (delVoids) {
      formula += 'DC_REMOVE_VOIDS('
    }

    formula += spreadsheet.getName() + '!' + dataRange

    if (delVoids) {
      formula += ')'
    }

    if (categorical) {
      if (sep == '') {
        formula += ')'
      } else {
        formula += ',' + sep + ')'
      }
    }

    if (columnNumber != 1 || delColumns != '') {
      if (delColumns != '') {
        var args = delColumns.split(';')
        delColumns = '';
        args.map(function (arg) {
          if (arg[0].toLowerCase().match(/[a-z]/i)) {
            delColumns += ';' + spreadsheet.getName() + '!' + arg.trim()
          } else if (arg[0] == '"') {
            delColumns += ';"' + arg.slice(1, -1).trim() + '"';
          } else {
            delColumns += ';' + Number(arg.trim());
          }
        })
        formula += ';' + columnNumber + delColumns + ')'
      } else {
        formula += ';' + columnNumber + ')'
      }
    }

    formula += ')'
  }

  newList()

  if (refreshable) {
    correlationList.getRange(1, 1).setFormula(formula)
  } else {
    correlationList.getRange(1, 1, data[0].length + 1, data[0].length + 1).setValues(CORRELATION(data))
  }

  //Условное форматирование
  var conditionalFormatRules = correlationList.getConditionalFormatRules();
  conditionalFormatRules.splice(conditionalFormatRules.length - 1, 1, SpreadsheetApp.newConditionalFormatRule()
    .setRanges([correlationList.getDataRange()])
    .whenNumberEqualTo(1)
    .setBackground('#999999')
    .setFontColor('#000000')
    .build());
  correlationList.setConditionalFormatRules(conditionalFormatRules);
  conditionalFormatRules = correlationList.getConditionalFormatRules();
  conditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
    .setRanges([correlationList.getDataRange()])
    .setGradientMinpointWithValue('#E06666', SpreadsheetApp.InterpolationType.NUMBER, '-1')
    .setGradientMidpointWithValue('#FFFFFF', SpreadsheetApp.InterpolationType.NUMBER, '0')
    .setGradientMaxpointWithValue('#57BB8A', SpreadsheetApp.InterpolationType.NUMBER, '1')
    .build());
  correlationList.setConditionalFormatRules(conditionalFormatRules);
}


/**
 * Находит корреляцию данных.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @customfunction
 */
function CORRELATION(data) {
  let variableNames = [data[0]]
  let numberOfColumns = variableNames[0].length
  let numberOfRows = data.length - 1 //количество строк, не включая наименования

  var averageValues = [[]]
  var sum = 0

  //заполнение массива средних значений
  for (var i = 0; i < numberOfColumns; i++) {
    sum = 0
    for (var j = 1; j <= numberOfRows; j++) {
      sum += data[j][i]
    }
    averageValues[0][i] = sum / numberOfRows
  }

  //Заполнение массива cреднеквадратически[] отклонений
  var standardDeviation = [[]]
  for (var i = 0; i < numberOfColumns; i++) {
    sum = 0
    for (var j = 1; j <= numberOfRows; j++) {
      sum += (data[j][i] - averageValues[0][i]) ** 2
    }
    standardDeviation[0][i] = (sum / numberOfRows) ** 0.5
  }

  //Заполнение массива кореляций
  var correlationArray = [[]]
  for (var i = 0; i <= numberOfColumns; i++) {
    correlationArray[i] = []
    for (var j = 0; j <= numberOfColumns; j++) {
      correlationArray[i][j] = ""
    }
  }
  for (var i = 0; i < numberOfColumns; i++) {
    correlationArray[0][i + 1] = data[0][i]
  }
  var covariance = 0
  for (var i = -1; i < numberOfColumns; i++) {
    for (var j = i; j < numberOfColumns; j++) {
      if (i == -1) {
        correlationArray[j + 1][0] = correlationArray[0][j + 1]
      } else {
        covariance = 0
        for (var k = 1; k <= numberOfRows; k++) {
          covariance += (data[k][i] - averageValues[0][i]) * (data[k][j] - averageValues[0][j])
        }
        correlationArray[j + 1][i + 1] = covariance / (numberOfRows * standardDeviation[0][i] * standardDeviation[0][j])
      }
    }
  }
  return correlationArray
}
