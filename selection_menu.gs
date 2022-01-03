/**
 * Выводит меню с инстументами анализа данных.
 * 
 * @customfunction
 */
function DATA_ANALYSIS() {
  return 'Loading...'
}


function onEdit() {
  var chooseInstrument = false,
    run = false,
    delMenu = false;

  try {
    if (zeroCentre.offset(0, -1).getValue() == 'Инcтpyмeнт:') {
      menuZero = zeroCentre.offset(0, -1)
      chooseInstrument = true;
    }
  } catch { }
  try {
    if (zeroCentre.offset(-1, -1).getValue() == 'Инcтpyмeнт:') {
      menuZero = zeroCentre.offset(-1, -1)
      run = true;
    }
  } catch { }
  try {
    if (zeroCentre.offset(-18, -1).getValue() == 'Инcтpyмeнт:') {
      menuZero = zeroCentre.offset(-18, -1)
      delMenu = true;
    }
  } catch { }

  var startMenu =
    [['Инcтpyмeнт:', 'Koppeляция'],
    ['Запустить:', ''],
    ['', ''],
    ['Диапазон:', ''],
    ['Название нового листа:', 'Koppeляция'],
    ['Обновлять при добавлеии данных:', ''],
    ['Удалить строки с пустыми ячейками:', ''],
    ['Столбец зависимой переменной:', 1],
    ['Удалить столбцы:', ''],
    ['Разделитель для категориальных признаков:', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['Удалить меню:', '']]

  var menuRange = spreadsheet.getRange(menuZero.getRow(), menuZero.getColumn(), startMenu.length, startMenu[0].length)

  if (typeof zeroCentre.getValue() == 'string') {
    if (menuZero.getValue() == 'Loading...') {
      itera();
      menuRange.setValues(startMenu)

      zeroCentre.offset(0, 1).setDataValidation(SpreadsheetApp.newDataValidation()
        .setAllowInvalid(false)
        .requireValueInList(['Koppeляция', 'Пoдгoтoвить дaнныe', 'Peгpeccия (MHK)', 'Peгpeccия (Грaдиeнтный cпycк)', 'Peгpeccионнoe дepeвo'], true)
        .build());

      zeroCentre.offset(1, 1).insertCheckboxes()
      zeroCentre.offset(5, 1).insertCheckboxes()
      zeroCentre.offset(6, 1).insertCheckboxes()
      zeroCentre.offset(18, 1).insertCheckboxes()

      zeroCentre.offset(3, 1).setFormula('=IN()')
      zeroCentre.offset(8, 1).setFormula('=IN()')

      //Изменение ширины столбцов
      if (spreadsheet.getColumnWidth(zeroCentre.getColumn()) < 278) {
        spreadsheet.setColumnWidth(zeroCentre.getColumn(), 278);
      }
      if (spreadsheet.getColumnWidth(zeroCentre.offset(0, 1).getColumn()) < 217) {
        spreadsheet.setColumnWidth(zeroCentre.offset(0, 1).getColumn(), 217);
      }

      //Границы меню
      menuRange.setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);

      //Выравнивание по центру
      menuRange.setHorizontalAlignment('center');

      //Заливка цветами
      zeroCentre.offset(0, 0, 1, 2).setBackground('#fefefe');
      zeroCentre.offset(1, 0, 1, 2).setBackground('#fdfdfd');
      zeroCentre.offset(2, 0, 1, 2).setBackground('#fcfcfc');
      zeroCentre.offset(3, 0, 1, 2).setBackground('#fbfbfb');
      zeroCentre.offset(4, 0, 1, 2).setBackground('#fafafa');
      zeroCentre.offset(5, 0, 1, 2).setBackground('#f9f9f9');
      zeroCentre.offset(6, 0, 1, 2).setBackground('#f8f8f8');
      zeroCentre.offset(7, 0, 1, 2).setBackground('#f7f7f7');
      zeroCentre.offset(8, 0, 1, 2).setBackground('#f6f6f6');
      zeroCentre.offset(10, 0, 1, 2).setBackground('#f5f5f5');
      zeroCentre.offset(11, 0, 1, 2).setBackground('#f4f4f4');
      zeroCentre.offset(12, 0, 1, 2).setBackground('#f3f3f3');
      zeroCentre.offset(13, 0, 1, 2).setBackground('#f2f2f2');
      zeroCentre.offset(14, 0, 1, 2).setBackground('#f1f1f1');
      zeroCentre.offset(15, 0, 1, 2).setBackground('#f0f0f0');
      zeroCentre.offset(16, 0, 1, 2).setBackground('#efefef');
      zeroCentre.offset(17, 0, 1, 2).setBackground('#eeeeee');
      zeroCentre.offset(18, 0, 1, 2).setBackground('#ededed');

      //Выбор инструмента
    } else if (chooseInstrument) {
      var menuRow = menuZero.getRow(),
        menuColumn = menuZero.getColumn()

      switch (menuZero.offset(0, 1).getValue()) {
        case 'Koppeляция':
          menuZero.offset(4, 1).setValue('Koppeляция')
          spreadsheet.getRange(menuRow + 10, menuColumn, 7, 2).clear({ contentsOnly: true, skipFilteredRows: true })
          break
        case 'Пoдгoтoвить дaнныe':
          menuZero.offset(4, 1).setValue('Дaнныe')
          spreadsheet.getRange(menuRow + 10, menuColumn, 7, 2).clear({ contentsOnly: true, skipFilteredRows: true })
          break
        case 'Peгpeccия (MHK)':
          menuZero.offset(4, 1).setValue('Peгpeccия (MHK)')
          spreadsheet.getRange(menuRow + 13, menuColumn, 4, 2).clear({ contentsOnly: true, skipFilteredRows: true })
          spreadsheet.getRange(menuRow + 11, menuColumn, 2, 2).setValues([['Уровень надежности:', 0.95], ['Параметер сглаживания:', 0]])
          break
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          menuZero.offset(4, 1).setValue('Peгpeccия (Грaдиeнтный cпycк)')
          spreadsheet.getRange(menuRow + 11, menuColumn, 6, 2).setValues([
            ['Уровень надежности:', 0.95],
            ['Шаг обучения:', 0.1],
            ['Размер пакета:', -1],
            ['Стохастический:', ''],
            ['Эпох обучения:', -1],
            ['Значение регуляризации L1:', 0]]);
          menuZero.offset(14, 1).insertCheckboxes();
          break
        case 'Peгpeccионнoe дepeвo':
          menuZero.offset(4, 1).setValue('Peгpeccионнoe дepeвo');
          spreadsheet.getRange(menuRow + 11, menuColumn, 2, 2).setValues([
            ['Максимальная глубина дерева:', ''],
            ['Максимум листов:', '']]);
          break
      }
    }

    //Начать выполнение
  } else if (run) {
    if (zeroCentre.isChecked() == true) {
      switch (menuZero.offset(0, 1).getValue()) {
        case 'Koppeляция':
          correlation_full()
          break
        case 'Пoдгoтoвить дaнныe':
          dataPreparation()
          break;
        case 'Peгpeccия (MHK)':
          regressionMNK()
          break;
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          regressionMNK()
          break;
        case 'Peгpeccионнoe дepeвo':
          treePage();
          break;
      }

      menuZero.offset(1, 1).uncheck()
    }

    //Удаление меню
  } else if (delMenu) {
    menuRange.setBackground('#ffffff');
    menuRange.clear({ contentsOnly: true, skipFilteredRows: true })
      .setBorder(false, false, false, false, false, false);
    menuRange.clearDataValidations();

    //Удаление лишних параметров из регрессии
  } else if (zeroCentre.offset(0, -1).getValue() == 'Удалить\nнаименее\nважный\nпараметр') {
    deleteParameter();

    //Фиксация значений
  } else if (zeroCentre.offset(0, -1).getValue() == 'Фиксировать\nзначения') {
    fixate();
  }
}


function onSelectionChange(e) {
  var range = e.range.getCell(1, 1);
  try {
    var left = range.offset(0, -1).getValue();
  } catch {

  }
  range.setValue(left);
} 

/*
function onSelectionChange(e) {
  // Set background to red if a single empty cell is selected.
  var range = e.range;
  if (range.getNumRows() === 1 &&
      range.getNumColumns() === 1 &&
      range.getCell(1, 1).getValue() === '') {
    range.setBackground('red');
  }
}
*/

/**
 * Возвращает всё, что введено внутрь.
 * 
 * @customfunction
 */
function IN() {
  return spreadsheet.getActiveRange().getFormula().slice(4, -1)
}