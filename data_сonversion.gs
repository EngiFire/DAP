function dataPreparation(name = null) {
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

    var formula = '=IFERROR(';
    var categorical = false;

    for (var i = 0; i < data[0].length; i++) {
      if (typeof data[1][i] != 'number') {
        categorical = true
        break
      }
    }

    formula += 'DC_SELECT('

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

    delColumns += "";
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

    formula += ';OFFSET(A1;;;COUNT(A1:A);COUNT(A1:1)))'
  }

  newList(name)

  if (refreshable) {
    correlationList.getRange(1, 1).setFormula(formula)
  } else {
    correlationList.getRange(1, 1, data.length, data[0].length).setValues(data)
  }
}


/**
 * Убирает из данных все строки, в которых есть пустыми значениями.
 * 
 * @param {Диапазон} data Данные.
 * @customfunction
 */
function DC_REMOVE_VOIDS(data) {
  for (var i = 0; i < data.length; i++) {
    iter1: while (true) {
      for (var j = 0; j < data[0].length; j++) {
        try {
          if (data[i][j] === '') {
            data.splice(i, 1)
            continue iter1
          }
        } catch {
          break iter1
        }
      }
      break
    }
  }
  return data
}


/**
 * Позволяет выбрать столбец зависимой переменной и удалить ненужные столбцы из данных.
 * Можно использовать названия или номера столбцов. При наличии категориальных признаков не рекомендуется использовать номера.
 * 
 * @param {Диапазон} data Данные.
 * @param {Число|Текст} column Столбец зависимой переменной (значение по умолчанию - 1).
 * @param {Число|Текст} args Повторяющиеся. Удаляемый столбец.
 * @customfunction
 */
function DC_SELECT(data, column = 1, ...args) {
  if (typeof args[0] == "object") {
    args = args[0]
  }

  //Перевод чисел в названия
  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === "number") {
      args[i] = data[0][args[i] - 1]
    }
  }
  if (typeof column == "number") {
    column = data[0][column - 1];
  }

  //Проверка на корректность ввода (на тупость)
  var delFirstColumn = false
  for (var i = 0; i < args.length; i++) {
    for (var j = i + 1; j < args.length; j++) {
      if (args[i] === args[j]) {
        args.splice(j, 1)
      }
    }
    if (args[i] === column) {
      delFirstColumn = true;
    }
  }

  for (var i = 0; i < args.length; i++) {
    for (var j = 0; j < data[0].length; j++) {
      if (!args[i].includes('_') && data[0][j].includes('_')) {
        if (data[0][j].includes(args[i])) {
          data.map(function (mas) {
            mas.splice(j, 1)
          })
          j--
        }
      } else {
        if (data[0][j] == args[i]) {
          data.map(function (mas) {
            mas.splice(j, 1)
          })
          j--
        }
      }
    }
  }

  if (!delFirstColumn) {
    var columnNumber = data[0].indexOf(column)
    if (column != data[0][0]) {
      data.map(function (i) {
        let a = i[0]
        i[0] = i[columnNumber]
        i[columnNumber] = a
      })
    }
  }

  return data
}


/**
 * Позволяет разбивать категориальные признаки на вектора подобные One-Hot Encoding.
 * 
 * @param {Диапазон} data Данные.
 * @param {Текст} sep Знак разделяющий несколько значений, записанных в одной ячейке.
 * @customfunction
 */
function DC_CATEGORICAL(data, sep = null) {
  var dataT = transpose(data)
  for (var i = 0; i < dataT.length; i++) {
    if (typeof dataT[i][1] != 'number') {
      var categorical = dataT[i].slice(1)

      if (sep != null) {
        for (var j = 0; j < dataT[0].length - 1; j++) {
          categorical = categorical.concat(categorical[0].split(sep))
          categorical.splice(0, 1)
        }
      }

      categorical = categorical.map(function (cat) {
        return cat.toLowerCase()
      })

      var colUniversal = [...new Set(categorical)].slice(0, -1)

      var universal = transpose([colUniversal])
      for (var j = 0; j < universal.length; j++) {
        universal[j] = universal[j].concat(new Array(data.length - 1).fill(0))
      }
      for (var j = 1; j < dataT[i].length; j++) {

        if (sep != null) {
          var splitX = dataT[i][j].split(sep).map(function (cat) {
            return cat.toLowerCase()
          })
          for (var n = 0; n < splitX.length; n++) {
            if (colUniversal.indexOf(splitX[n]) != -1) {
              universal[colUniversal.indexOf(splitX[n])][j] = 1
            }
          }

        } else {
          if (colUniversal.indexOf(dataT[i][j].toLowerCase()) != -1) {
            universal[colUniversal.indexOf(dataT[i][j].toLowerCase())][j] = 1
          }
        }


      }
      var pre = dataT.splice(i, 1)[0][0]
      for (var j = 0; j < universal.length; j++) {
        universal[j][0] = pre + '_' + universal[j][0]
      }
      dataT = dataT.concat(universal)
      i--
    }
  }

//Опять этот Алёшка развлекается. Дастал Уже!!
  if (sep == '!?!') {
    for (var i = 0; i < dataT.length; i++) {
      for (var j = 1; j < dataT[0].length; j++) {
        dataT[i][j] = 'Коровий уровень?';
      }
    } 
  }

  return transpose(dataT);
}

/*
function sortColumns(a, b) {
  if (typeof +a === number ) {

  }
}
*/