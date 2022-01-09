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
var differenceRSS = [[], []];

/**
 * Выводит меню с инстументами анализа данных.
 * 
 * @customfunction
 */
function DAP() {
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
    ['Обновлять при добавлении данных:', ''],
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
      if (spreadsheet.getColumnWidth(zeroCentre.offset(0, 2).getColumn()) < 217) {
        spreadsheet.setColumnWidth(zeroCentre.offset(0, 2).getColumn(), 217);
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
      zeroCentre.offset(9, 0, 1, 2).setBackground('#f5f5f5');
      zeroCentre.offset(10, 0, 1, 2).setBackground('#f4f4f4');
      zeroCentre.offset(11, 0, 1, 2).setBackground('#f3f3f3');
      zeroCentre.offset(12, 0, 1, 2).setBackground('#f2f2f2');
      zeroCentre.offset(13, 0, 1, 2).setBackground('#f1f1f1');
      zeroCentre.offset(14, 0, 1, 2).setBackground('#f0f0f0');
      zeroCentre.offset(15, 0, 1, 2).setBackground('#efefef');
      zeroCentre.offset(16, 0, 1, 2).setBackground('#eeeeee');
      zeroCentre.offset(17, 0, 1, 2).setBackground('#ededed');
      zeroCentre.offset(18, 0, 1, 2).setBackground('#ececec');
      zeroCentre.offset(0, 2).setBackground('#ebebeb');

      //Help
      zeroCentre.offset(0, 2, 19, 1)
        .mergeVertically()
        .setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID)
        .setHorizontalAlignment('center')
        .setVerticalAlignment('top')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)

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
          spreadsheet.getRange(menuRow + 13, menuColumn, 4, 2).clear({ contentsOnly: true, skipFilteredRows: true })
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
    menuRange = menuZero.offset(0, 0, 19, 3)
    menuRange.setBackground('#ffffff');
    menuRange.clear({ contentsOnly: true, skipFilteredRows: true })
      .setBorder(false, false, false, false, false, false)
      .breakApart();
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
  var colorRange = range.getBackground();
  var rangeNotion = range.offset(0, 1);
  if (colorRange == rangeNotion.getBackground()) {
    rangeNotion = range.offset(0, 2);
  }
  switch (colorRange) {
    case '#fefefe':
      var toolType = rangeNotion.offset(0, -1).getValue();
      switch (toolType) {
        case 'Koppeляция':
          rangeNotion.setValue('Корреляция - статистическая взаимосвязь между несколькими наборами данных.\nПри этом изменения значений одного или нескольких наборов данных сопутствуют систематическому изменению другого или других наборов.');
          break;

        case 'Пoдгoтoвить дaнныe':
          rangeNotion.setValue('Подготовка данных - инструмент, необходимый для создания нового листа с отредактированными данными.\nВ его функционал входит: удаление лишних столбцов, изменение столбца с зависимой переменной, удаление строк с отсутствующими значениями, разбиение на категориальные признаки.');
          break;

        case 'Peгpeccия (MHK)':
          rangeNotion.setValue('Регрессионный анализ - статистический метод исследования влияния одной или нескольких независимых переменных  на зависимую.\nМетод наименьших квадратов - метод оценивания параметров уравнения регрессии, минимизирующий сумму квадратов отклонений (фактических значений результативной переменной от теоретических).');
          break

        case 'Peгpeccия (Грaдиeнтный cпycк)':
          rangeNotion.setValue('Регрессионный анализ - статистический метод исследования влияния одной или нескольких независимых переменных  на зависимую.\nГрадиентный спуск — метод нахождения локального минимума или максимума функции с помощью движения вдоль градиента.');
          break;

        case 'Peгpeccионнoe дepeвo':
          rangeNotion.setValue('Дерево решений - это базовый метод классификации и регрессии, который описывает регрессионную часть. Дерево регрессионных решений в основном относится к деревьям классификации и регрессии, значениями внутренних узлов которого являются «да» и «нет», которые представляют собой структуру двоичного дерева.');
          break;

      }
      break;

    case '#fdfdfd':
      rangeNotion.offset(-1, 0).setValue('При нажатии кнопки “Запустить” создаёт новый лист, где исполняет процесс выбранного инструмента.')
      break;

    case '#fcfcfc':
      break;

    case '#fbfbfb':
      rangeNotion.offset(-3, 0).setValue('Выберите диапазон данных, с которым вы собираетесь работать дальше.')
      break;

    case '#fafafa':
      rangeNotion.offset(-4, 0).setValue('Позволяет переименовать новый лист для удобства пользователя.')
      break;

    case '#f9f9f9':
      rangeNotion.offset(-5, 0).setValue('По желанию пользователя, есть возможность в реальном времени обновлять результаты расчётов на новом листе при добавлении новых данных на стартовом листе.')
      break;

    case '#f8f8f8':
      rangeNotion.offset(-6, 0).setValue('По желанию пользователя, есть возможность удалять из диапазона строки в которых имеются пустые значения.')
      break;

    case '#f7f7f7':
      rangeNotion.offset(-7, 0).setValue('Здесь можно изменить столбец с зависимой переменной (по умолчанию это всегда первый столбец). Для указания столбца можно писать его: порядковый номер, название или ссылку на название (при использовании категориальных признаков не рекомендуется использовать номера).')
      break;

    case '#f6f6f6':
      rangeNotion.offset(-8, 0).setValue('На усмотрение пользователя можно удалить ненужные столбцы данных. Для указания столбца можно писать его: порядковый номер, название или ссылку на название (при использовании категориальных признаков не рекомендуется использовать номера).')
      break;

    case '#f5f5f5':
      rangeNotion.offset(-9, 0).setValue('В случае, когда в одной ячейке встречаются два или более категориальных признака, есть возможность задать разделитель для них.')
      break;

    case '#f4f4f4':
      break;

    case '#f3f3f3':
      var toolType = rangeNotion.offset(-11, -1).getValue();

      switch (toolType) {
        case 'Peгpeccия (MHK)':
          rangeNotion.offset(-11, 0).setValue('Позволяет задать уровень надёжности для регрессионного анализа.\nВы можете также изменить его на странице с готовым анализом.');
          break;
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          rangeNotion.offset(-11, 0).setValue('Позволяет задать уровень надёжности для регрессионного анализа.\nВы можете также изменить его на странице с готовым анализом.');
          break;
        case 'Peгpeccионнoe дepeвo':
          rangeNotion.offset(-11, 0).setValue('Задайте, если нужно ограничить количество слоёв дерева.');
          break;
      }

      break;

    case '#f2f2f2':
      var toolType = rangeNotion.offset(-12, -1).getValue();

      switch (toolType) {
        case 'Peгpeccия (MHK)':
          rangeNotion.offset(-12, 0).setValue('Параметр для ридж-регрессии, укажите его больше 0, если независимые переменные в данных коррелируют друг с другом.');
          break;
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          rangeNotion.offset(-12, 0).setValue('Позволяет задать шаг обучения. Чем ближе это число к 0 тем дольше будет проходить обучение.');
          break;
        case 'Peгpeccионнoe дepeвo':
          rangeNotion.offset(-12, 0).setValue('Задайте, если нужно ограничить количество листьев регрессионного дерева.');
          break;
      }

      break;

    case '#f1f1f1':
      var toolType = rangeNotion.offset(-13, -1).getValue();

      switch (toolType) {
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          rangeNotion.offset(-13, 0).setValue('Задаёт размер пакета обучения. Чем выше число, тем быстрее обучение. При \"-1\" берёт все примеры обучения.');
          break;
      }

      break;

    case '#f0f0f0':
      var toolType = rangeNotion.offset(-14, -1).getValue();

      switch (toolType) {
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          rangeNotion.offset(-14, 0).setValue('Включите, чтобы перемешивать данные после каждого обновления весов.');
          break;
      }

      break;

    case '#efefef':
      var toolType = rangeNotion.offset(-15, -1).getValue();

      switch (toolType) {
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          rangeNotion.offset(-15, 0).setValue('Позволяет задать количество эпох обучения. Чем их больше, тем дольше будет выполняться, но тем лучше будет результат.');
          break;
      }

      break;

    case '#eeeeee':
      var toolType = rangeNotion.offset(-16, -1).getValue();

      switch (toolType) {
        case 'Peгpeccия (Грaдиeнтный cпycк)':
          rangeNotion.offset(-16, 0).setValue('Позволяет задать параметр для лассо-регрессии, укажите его больше 0, если хотите, чтобы влияние некоторых переменных сводилось к 0.');
          break;
      }

      break;

    case '#ededed':
      break;

    case '#ececec':
      rangeNotion.offset(-18, 0).setValue('Удаляет с листа данное меню.');
      break;
  }
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
    dataRange = + "\'" + spreadsheet.getName() + "'!" + dataRange;
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
  spreadsheet.getRange(menuZero.offset(11, 0, 6, 2).getA1Notation()).copyTo(correlationList.getRange('D2:E7'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);

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
function correlation_full() {
  var dataRange = menuZero.offset(3, 1).getValue()
  //spreadsheet.getRange('A1').setValue(dataRange);
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

    formula += '\'' + spreadsheet.getName() + '\'!' + dataRange;

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
            delColumns += ';\'' + spreadsheet.getName() + '\'!' + arg.trim()
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
/**
 * Подбор коэффициентов методом наименьших квадратов.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {[Число]} l Параметр сглаживания для регуляризации L2 (значение по умолчанию - 0).
 * @param {[Булевый]} showLabels При True, Истина или 1 - будут выводиться подписи параметров (по умолчанию не показывает).
 * @param {[Булевый]} showTheLastExecutionTime При True, Истина или 1 - показывает последнее время выполнения (по умолчанию не показывает).
 * @param {[Булевый]} showExecutionTime При True, Истина или 1 - показывает время продолжительности выполнения (по умолчанию не показывает).
 * @customfunction
 */
function REG_MNK(data, l = 0, showLabels = false, showTheLastExecutionTime = false, showExecutionTime = false) {
  var start = new Date()

  if (typeof data[0][0] !== 'number') {
    var labels = data.splice(0, 1)
  }

  let numberOfColumns = data[0].length

  let Y = data.map(function (i) {
    return [i[0]]
  })

  let X = data.map(function (i) {
    i[0] = 1
    return i
  })

  var transposeX = transpose(X)
  var XtX = multiplyMatrix(transposeX, X)

  if (l != 0) {
    XtX = sumMatrix(XtX, unitMatrix(numberOfColumns, l))
  }

  W = multiplyMatrix(multiplyMatrix(inverseMatrix(XtX), transposeX), Y)

  if (showTheLastExecutionTime == true) {
    W.push([new Date().toLocaleTimeString("ru")])
    if (showLabels == true) {
      labels[0].push('Последнее время выполнения')
    }
  }
  if (showExecutionTime == true) {
    W.push([(new Date() - start) / 1000])
    if (showLabels == true) {
      labels[0].push('Время выполнения')
    }
  }

  if (showLabels == true) {
    W = transpose(labels.concat(transpose(W)))
  }

  return W
}



/**
 * Подбор коэффициентов методом градиентного спуска.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Исходные коэффициенты для обучения (при пропуске этого параметра начальные коэффициенты примут случайные значения от 0 до 1).
 * @param {[Число]} lr Шаг обучения (значение по умолчанию - 0.1).
 * @param {[Число]} packageSize Размер пакета обучения. При "-1" - берёт все примеры обучения (значение по умолчанию - 1). 
 * @param {[Булевый]} stochastic При True, Истина или 1 - перемешивает данные после каждого обновления весов (по умолчанию не перемешивает).
 * @param {[Число]} epochs Количество эпох обучения. При "-1" - бесконечное количество эпох (значение по умолчанию - 1).
 * @param {[Число]} epochsPassed Количество пройденных эпох (значение по умолчанию - 0).
 * @param {[Число]} lr1 Значение регуляризации L1 (значение по умолчанию - 0).
 * @param {[Булевый]} showLabels При True, Истина или 1 - будут выводиться подписи параметров (по умолчанию не показывает).
 * @param {[Булевый]} showEpochsPassed При True, Истина или 1 - показывает количество пройденных эпох (по умолчанию не показывает).
 * @param {[Булевый]} showTheLastExecutionTime При True, Истина или 1 - показывает последнее время выполнения (по умолчанию не показывает).
 * @param {[Булевый]} showExecutionTime При True, Истина или 1 - показывает время продолжительности выполнения (по умолчанию не показывает).
 * @customfunction
 */
function REG_GRAD(data, W = null, lr = 0.1, packageSize = 1, stochastic = false, epochs = 1, epochsPassed = 0, lr1 = 0, showLabels = false, showEpochsPassed = false, showTheLastExecutionTime = false, showExecutionTime = false) {
  var start = new Date()

  if (typeof data[0][0] !== 'number') {
    var labels = data.splice(0, 1)
  }

  var epoch = epochsPassed

  if (epochs == -1) {
    epochs = Infinity
  }

  let numberOfColumns = data[0].length
  let numberOfRows = data.length

  if (epochsPassed == 0) {
    W = randomWeights(numberOfColumns)
  }

  let Y = data.map(function (i) {
    return [i[0]]
  })

  let X = data.map(function (i) {
    i[0] = 1
    return i
  })

  if (packageSize == -1) {
    packageSize = numberOfRows
  }

  iter1: for (; epoch < epochs; epoch++) {
    if (stochastic) {
      shuffle(X, Y)
    }

    var sliceX = X.slice(0, packageSize),
      sliceY = Y.slice(0, packageSize)

    if (lr1 == 0) {
      var error = deductionMatrix(transpose(multiplyMatrix(transpose(W), transpose(sliceX))), sliceY)
      var error_2batch = 0

      for (var j = 0; j < packageSize; j++) {
        error_2batch += error[j][0] ** 2
      }

      var dW = []

      for (var j = 0; j < numberOfColumns; j++) {
        dW.push(multiplyMatrix(transpose(error), transpose([transpose(sliceX)[j]]))[0])
      }

      while (true) {
        var Z = []

        for (var k = 0; k < numberOfColumns; k++) {
          Z.push([W[k][0]])
        }

        for (let k = 0; k < numberOfColumns; k++) {
          Z[k][0] -= lr * dW[k][0]
        }

        var newError = deductionMatrix(transpose(multiplyMatrix(transpose(Z), transpose(sliceX))), sliceY)
        var newError_2batch = 0

        for (var j = 0; j < packageSize; j++) {
          newError_2batch += newError[j][0] ** 2
        }

        if (newError_2batch > error_2batch) {
          lr /= 2
        } else {
          W = []

          for (var k = 0; k < numberOfColumns; k++) {
            W.push([Z[k][0]])
          }

          break
        }
      }
      if ((new Date() - start) / 1000 >= 25) {
        break iter1
      }
      if (packageSize != numberOfRows) {
        for (var k = 0; k < packageSize; k++) {
          X.push(X.shift())
          Y.push(Y.shift())
        }
      }
    } else { //Регуляризация L1
      var error = deductionMatrix(transpose(multiplyMatrix(transpose(W), transpose(sliceX))), sliceY)
      var error_2batch = 0

      for (var j = 0; j < packageSize; j++) {
        error_2batch += error[j][0] ** 2
      }

      error_2batch += packageSize * lr1 * transpose(W)[0].map(r => x += Math.abs(r), x = 0).reverse()[0]
      var dW = []

      for (var j = 0; j < numberOfColumns; j++) {
        dW.push(multiplyMatrix(transpose(error), transpose([transpose(sliceX)[j]]))[0])
      }

      while (true) {
        var Z = []

        for (var k = 0; k < numberOfColumns; k++) {
          Z.push([W[k][0]])
        }

        for (let k = 0; k < numberOfColumns; k++) {
          Z[k][0] -= lr * (dW[k][0] + lr1 * Math.sign(Z[k][0]) * packageSize)
        }

        var newError = deductionMatrix(transpose(multiplyMatrix(transpose(Z), transpose(sliceX))), sliceY)
        var newError_2batch = 0

        for (var j = 0; j < packageSize; j++) {
          newError_2batch += newError[j][0] ** 2
        }

        newError_2batch += packageSize * lr1 * transpose(Z)[0].map(r => x += Math.abs(r), x = 0).reverse()[0]

        if (newError_2batch > error_2batch) {
          lr /= 2
        } else {
          W = []

          for (var k = 0; k < numberOfColumns; k++) {
            W.push([Z[k][0]])
          }

          break
        }
      }
      if ((new Date() - start) / 1000 >= 25) {
        break iter1
      }

      if (packageSize != numberOfRows) {
        for (var k = 0; k < packageSize; k++) {
          X.push(X.shift())
          Y.push(Y.shift())
        }
      }
    }
  }

  if (showEpochsPassed == true) {
    W.push([epoch])

    if (showLabels == true) {
      labels[0].push('Эпох пройдено')
    }
  }
  if (showTheLastExecutionTime == true) {
    W.push([new Date().toLocaleTimeString("ru")])

    if (showLabels == true) {
      labels[0].push('Последнее время выполнения')
    }
  }
  if (showExecutionTime == true) {
    W.push([(new Date() - start) / 1000])

    if (showLabels == true) {
      labels[0].push('Время выполнения')
    }
  }

  if (showLabels == true) {
    W = transpose(labels.concat(transpose(W)))
  }

  return W
}


/**
 * Делает предсказание для выбранных значений по коэффициентам W. Если в значениях вы используете категориальные признаки, 
 * то для W также необходимо выделить подписи к параметрам.
 * 
 * @param {Диапазон} W - значения параметров обученной модели.
 * @param {Диапазон} initial Значения для которых необходимо сделать предсказание.
 * @customfunction
 */
function PREDICT(W, initial) {
  if (initial[0].length == 1) {
    initial = transpose(initial)
  }

  if (typeof W[0][0] == 'number') {
    return Number(multiplyMatrix(initial, W.slice(1))) + W[0][0]

  } else {
    var s = W[0][1]
    var j = 1
    for (var i = 0; i < initial[0].length; i++) {
      if (typeof initial[0][i] == 'number') {
        s += initial[0][i] * W[j][1]
      } else {
        var category = W[j][0].split('_')[0]

        while (category == W[j][0].split('_')[0]) {
          if (W[j][0].split('_')[1] == initial[0][i]) {
            s += W[j][1]
          }
          j++
          try {
            W[j][0].split('_')[0]
          } catch {
            break
          }
        }
        j--
      }
      j++
    }
  }
  return s
}
/**
 * Рассчитывает коэффициент детерминации.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function R2(data, W) {
  if (Y === null) {
    if (typeof data[0][0] !== 'number') {
      data.splice(0, 1)
    }

    Y = data.map(function (i) {
      return [i[0]]
    })

    X = data.map(function (i) {
      i[0] = 1
      return i
    })
  }
  let numberOfRows = Y.length

  var ESS = 0
  var TSS = 0

  var sumY = 0
  for (var i = 0; i < numberOfRows; i++) {
    sumY += Y[i][0]
  }
  var averageY = sumY / numberOfRows

  for (var i = 0; i < numberOfRows; i++) {
    ESS += (Y[i][0] - multiplyMatrix([X[i]], W)) ** 2
    TSS += (Y[i][0] - averageY) ** 2
  }

  return 1 - ESS / TSS
}


/**
 * Рассчитывает коэффициент детерминации для множественной регрессии.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function R2_MULTIPLE(data, W) {
  if (Y === null) {
    if (typeof data[0][0] !== 'number') {
      data.splice(0, 1)
    }

    Y = data.map(function (i) {
      return [i[0]]
    })

    X = data.map(function (i) {
      i[0] = 1
      return i
    })
  }
  let numberOfRows = Y.length

  var RSS = 0
  var TSS = 0

  var sumY = 0
  for (var i = 0; i < numberOfRows; i++) {
    sumY += Y[i][0]
  }
  var averageY = sumY / numberOfRows

  for (var i = 0; i < numberOfRows; i++) {
    RSS += (averageY - multiplyMatrix([X[i]], W)) ** 2
    TSS += (Y[i][0] - averageY) ** 2
  }

  return (RSS / TSS) ** 0.5
}


/**
 * Рассчитывает скорректированный коэффициент детерминации.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function R2_NORMALIZED(data, W) {
  let numberOfColumns = data[0].length
  let numberOfRows = data.length

  return 1 - (1 - R2(data, W)) * ((numberOfRows - 1) / (numberOfRows - numberOfColumns))
}


/**
 * Рассчитывает критерий Фишера для модели.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function F_TEST(data, W) {
  if (typeof data[0][0] !== 'number') {
    data.splice(0, 1)
  }

  let numberOfColumns = data[0].length
  let numberOfRows = data.length
  var r2 = R2(data, W)
  return (r2 / (numberOfColumns - 1)) / ((1 - r2) / (numberOfRows - numberOfColumns))
}


/**
 * Расчет табличного критерия Фишера.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Число} probability Уровень надёжности.
 * @customfunction
 */
function F_INV_RT(data, probability) {
  return formulajs.FINV(probability, OBSERVATIONS(data), DF_REGRESSION(data));
}


/**
 * Рассчитывает среднюю ошибку апроксимации модели.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function AVERAGE_APPROXIMATION_ERROR_REGRESSION(data, W) {
  if (Y === null) {
    if (typeof data[0][0] !== 'number') {
      data.splice(0, 1)
    }

    Y = data.map(function (i) {
      return [i[0]]
    })

    X = data.map(function (i) {
      i[0] = 1
      return i
    })
  }
  let numberOfRows = data.length
  var s = 0
  for (var i = 0; i < numberOfRows; i++) {
    s += Math.abs((Y[i][0] - multiplyMatrix([X[i]], W)) / Y[i][0])
  }

  return s / numberOfRows * 100
}


/**
 * Рассчитывает среднюю ошибку апроксимации модели.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function AVERAGE_APPROXIMATION_ERROR(Y, Y_PREDICT) {

  if (typeof Y[0][0] !== 'number') {
    Y.splice(0, 1)
  }
  if (typeof Y_PREDICT[0][0] !== 'number') {
    Y_PREDICT.splice(0, 1)
  }

  let numberOfRows = Y.length
  var s = 0
  for (var i = 0; i < numberOfRows; i++) {
    s += Math.abs((Y[i][0] - Y_PREDICT[i][0]) / Y[i][0])
  }

  return s / numberOfRows * 100
}


/**
 * Рассчитывает стандартную ошибку модели.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function STANDARD_ESTIMATION_ERROR(data, W) {
  if (Y === null) {
    if (typeof data[0][0] !== 'number') {
      data.splice(0, 1)
    }

    Y = data.map(function (i) {
      return [i[0]]
    })

    X = data.map(function (i) {
      i[0] = 1
      return i
    })
  }

  let numberOfColumns = data[0].length
  let numberOfRows = data.length

  var SSE = 0
  for (var i = 0; i < numberOfRows; i++) {
    SSE += (Y[i][0] - multiplyMatrix([X[i]], W)) ** 2
  }

  return (SSE / (numberOfRows - numberOfColumns)) ** 0.5
}


/**
 * Стандартная ошибка параметров.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function STANDARD_PARAMETER_ERRORS(data, W) {
  var s = STANDARD_ESTIMATION_ERROR(data, W);
  let numberOfColumns = data[0].length
  let numberOfRows = data.length

  var xErrors = []

  var xTx = inverseMatrix(kofs(data, numberOfRows, numberOfColumns))
  for (var i = 0; i < numberOfColumns; i++) {
    xErrors.push([s * (xTx[i][i]) ** 0.5])
  }
  return xErrors
}


/**
 * Расчёт T-статистики.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function T_STATISTICS(data, W) {
  var spe = STANDARD_PARAMETER_ERRORS(data, W);
  var t = [];
  for (var i = 0; i < W.length; i++) {
    t.push([W[i][0] / spe[i][0]]);
  }
  return t;
}


/**
 * Расчёт P-значений.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function P_VALUES(data, W) {
  var t = T_STATISTICS(data, W);
  var degreesOfFreedom = DF_REMAINS(data) - 1;
  var p = [];
  for (var i = 0; i < t.length; i++) {
    p.push([(1 - jStat.studentt.cdf(Math.abs(t[i][0]), degreesOfFreedom)) * 1.99969887]);
  }
  return p;
}


/**
 * Расчёт табличного значения Стьюдента.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Число} probability Уровень надёжности.
 * @customfunction
 */
function T_INV_2T(data, probability) {
  return Math.abs(jStat.studentt.inv((1 - probability) / 2, DF_REMAINS(data)));
}


/**
 * Расчёт доверительного интервала для параметров с заданным уровнем надёжности.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @param {Число} probability Уровень надёжности.
 * @customfunction
 */
function CONFIDENCE_INTERVALS(data, W, probability) {
  var spe = STANDARD_PARAMETER_ERRORS(data, W);
  var tCritical = T_INV_2T(data, probability)
  var intervals = []
  for (var i = 0; i < W.length; i++) {
    intervals.push([W[i][0] - tCritical * spe[i][0]])
    intervals[i].push(+(W[i][0] + tCritical * spe[i][0]))
  }
  return intervals
}


/**
 * Рассчитывает сумму квадратов отклонений.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function SS(data, W) {
  if (Y === null) {
    if (typeof data[0][0] !== 'number') {
      data.splice(0, 1)
    }

    Y = data.map(function (i) {
      return [i[0]]
    })

    X = data.map(function (i) {
      i[0] = 1
      return i
    })
  }
  let numberOfRows = data.length

  var sumY = 0
  for (var i = 0; i < numberOfRows; i++) {
    sumY += Y[i][0]
  }
  var averageY = sumY / numberOfRows
  var s = 0
  for (var i = 0; i < numberOfRows; i++) {
    s += (Y[i][0] - averageY) ** 2 - (Y[i][0] - multiplyMatrix([X[i]], W)) ** 2
  }
  return s
}


/**
 * Рассчитывает среднее суммы квадратов регрессии.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @param {Диапазон} W Значения параметров обученной модели.
 * @customfunction
 */
function MS(data, W) {
  var ms = SS(data, W)
  return ms / (W.length - 1)
}


/**
 * Количество наблюдений.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @customfunction
 */
function OBSERVATIONS(data) {
  if (typeof data[0][0] !== 'number') {
    data.splice(0, 1)
  }

  return data.length
}


/**
 * Количество степеней свободной регрессии.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @customfunction
 */
function DF_REGRESSION(data) {
  if (typeof data[0][0] !== 'number') {
    data.splice(0, 1)
  }

  return data[0].length - 1
}


/**
 * Количество степеней свободных остатков.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @customfunction
 */
function DF_REMAINS(data) {
  if (typeof data[0][0] !== 'number') {
    data.splice(0, 1)
  }

  return OBSERVATIONS(data) - DF_REGRESSION(data) - 1
}


/**
 * Итоговые количества степеней свободы.
 * 
 * @param {Диапазон} data Анализируемые данные.
 * @customfunction
 */
function DF_TOTAL(data) {
  if (typeof data[0][0] !== 'number') {
    data.splice(0, 1)
  }

  return data.length - 1
}
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

    formula += '\'' + spreadsheet.getName() + '\'!' + dataRange;

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
          delColumns += ';\'' + spreadsheet.getName() + '\'!' + arg.trim()
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
//Получить максимальный элемент массива
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}


//Получить минимальный элемент массива
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}


//Генерация случайных весов
function randomWeights(n) {
  var A = []
  for (var i = 0; i < n; i++) {
    A.push([Math.random()])
  }
  return A
}


//Нормализовать данные
function normalization(A, colOrRow, first, end) {
  if (colOrRow == 1) {
    A = transpose(A)
  }

  for (var i = first; i < end; i++) {
    var B = []
    var max = getMaxOfArray(A[i])
    var min = getMinOfArray(A[i])
    var max_min = max - min
    for (var j = 0; j < A[i].length; j++) {
      A[i][j] = (A[i][j] - min) / max_min
      B.push([min, max_min])
    }
  }
  if (colOrRow == 1) {
    A = transpose(A)
  }
  return [A, B]
}


//Денормализовать данные (скорее всего не нужно)
function reverseNormalization(A, B, colOrRow) {
  if (colOrRow == 1) {
    A = transpose(A)
  }
  for (var i = 0; i < A.length; i++) {
    A[i] = A[i] * B[i] + min///////////////
  }
  if (colOrRow == 1) {
    A = transpose(A)
  }
  return A
}


//Транспонирование матрицы
function transpose(A) {
  var m = A.length, n = A[0].length, AT = [];
  for (var i = 0; i < n; i++) {
    AT[i] = [];
    for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
  }
  return AT;
}


//Еденичная матрица
function unitMatrix(n, l = 1) {
  A = []
  for (var i = 0; i < n; i++) {
    A.push([])
    for (var j = 0; j < n; j++) {
      if (i == j) {
        A[i].push(l)
      } else {
        A[i].push(0)
      }
    }
  }
  return A
}


//Суммирование матриц
function sumMatrix(A, B)       //На входе двумерные массивы одинаковой размерности
{
  var m = A.length, n = A[0].length, C = [];
  for (var i = 0; i < m; i++) {
    C[i] = [];
    for (var j = 0; j < n; j++) C[i][j] = A[i][j] + B[i][j];
  }
  return C;
}


//Вычитание матриц
function deductionMatrix(A, B)       //На входе двумерные массивы одинаковой размерности
{
  var m = A.length, n = A[0].length, C = [];
  for (var i = 0; i < m; i++) {
    C[i] = [];
    for (var j = 0; j < n; j++) C[i][j] = A[i][j] - B[i][j];
  }
  return C;
}


//Нахожение определителя матрицы
function determinant(A)   // Используется алгоритм Барейса, сложность O(n^3) 
{
  var N = A.length, B = [], denom = 1, exchanges = 0;
  for (var i = 0; i < N; ++i) {
    B[i] = [];
    for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
  }
  for (var i = 0; i < N - 1; ++i) {
    var maxN = i, maxValue = Math.abs(B[i][i]);
    for (var j = i + 1; j < N; ++j) {
      var value = Math.abs(B[j][i]);
      if (value > maxValue) { maxN = j; maxValue = value; }
    }
    if (maxN > i) {
      var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
      ++exchanges;
    }
    else { if (maxValue == 0) return maxValue; }
    var value1 = B[i][i];
    for (var j = i + 1; j < N; ++j) {
      var value2 = B[j][i];
      B[j][i] = 0;
      for (var k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
    }
    denom = value1;
  }
  if (exchanges % 2) return -B[N - 1][N - 1];
  else return B[N - 1][N - 1];
}


//Нахождение вспомогательной матрицы
function adjugateMatrix(A)   // A - двумерный квадратный массив
{
  var N = A.length, adjA = [];
  for (var i = 0; i < N; i++) {
    adjA[i] = [];
    for (var j = 0; j < N; j++) {
      var B = [], sign = ((i + j) % 2 == 0) ? 1 : -1;
      for (var m = 0; m < j; m++) {
        B[m] = [];
        for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
        for (var n = i + 1; n < N; n++) B[m][n - 1] = A[m][n];
      }
      for (var m = j + 1; m < N; m++) {
        B[m - 1] = [];
        for (var n = 0; n < i; n++)   B[m - 1][n] = A[m][n];
        for (var n = i + 1; n < N; n++) B[m - 1][n - 1] = A[m][n];
      }
      adjA[i][j] = sign * determinant(B);   // Функцию determinant см. выше
    }
  }
  return adjA;
}


//Нахождение обратной матрицы
function inverseMatrix(A)   // A - двумерный квадратный массив
{
  var det = determinant(A);                // Функцию determinant см. выше
  if (det == 0) return false;
  var N = A.length, A = adjugateMatrix(A); // Функцию adjugateMatrix см. выше
  for (var i = 0; i < N; i++) { for (var j = 0; j < N; j++) A[i][j] /= det; }
  return A;
}


//Перемножение матриц
function multiplyMatrix(A, B) {
  var rowsA = A.length, colsA = A[0].length,
    rowsB = B.length, colsB = B[0].length,
    C = [];
  if (colsA != rowsB) return false;
  for (var i = 0; i < rowsA; i++) C[i] = [];
  for (var k = 0; k < colsB; k++) {
    for (var i = 0; i < rowsA; i++) {
      var t = 0;
      for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
      C[i][k] = t;
    }
  }
  return C;
}


//data под МНК
function kofs(masd, s1, s2) {
  var kof = [[]]
  for (var i = 0; i < s2; i++) {
    kof[i] = []
    for (var j = 0; j < s2; j++) {
      kof[i][j] = ""
    }
  }

  for (var i = 0; i < s2; i++) {
    for (var j = 0; j < s2; j++) {
      if (i == 0) {
        if (j == 0) {
          kof[0][0] = s1
        }
        else {
          sum = 0
          for (var k = 0; k < s1; k++) {
            sum += masd[k][j]
          }
          kof[0][j] = sum
        }
      }
      else {
        if (i > j) {
          kof[i][j] = kof[j][i]
        }
        else {
          sum = 0
          for (var k = 0; k < s1; k++) {
            sum += masd[k][i] * masd[k][j]
          }
          kof[i][j] = sum
        }
      }
    }
  }
  return kof
}


//Создание нового листа
function newList(name = null) {
  if (name == null) {
    listName = menuZero.offset(4, 1).getValue();
  } else {
    listName = name;
  }

  SpreadsheetApp.getActive().insertSheet(1);
  correlationList = SpreadsheetApp.getActive().getActiveSheet()
  let duplicateNameNumber = 2
  newListName = listName

  while (true) {
    try {
      correlationList.setName(newListName);
      break
    } catch {
      newListName = listName + "_" + duplicateNameNumber
      duplicateNameNumber++
    }
  }
}


function shuffle(array, array2) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    [array2[i], array2[j]] = [array2[j], array2[i]];
  }
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
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
function itera() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setRecalculationInterval(SpreadsheetApp.RecalculationInterval.ON_CHANGE);
  spreadsheet.setIterativeCalculationEnabled(true);
  spreadsheet.setMaxIterativeCalculationCycles(1);
  spreadsheet.setIterativeCalculationConvergenceThreshold(0);
};
(function (window, factory) { if (typeof exports === "object") { module.exports = factory() } else if (typeof define === "function" && define.amd) { define(factory) } else { window.jStat = factory() } })(this, function () { var jStat = function (Math, undefined) { var concat = Array.prototype.concat; var slice = Array.prototype.slice; var toString = Object.prototype.toString; function calcRdx(n, m) { var val = n > m ? n : m; return Math.pow(10, 17 - ~~(Math.log(val > 0 ? val : -val) * Math.LOG10E)) } var isArray = Array.isArray || function isArray(arg) { return toString.call(arg) === "[object Array]" }; function isFunction(arg) { return toString.call(arg) === "[object Function]" } function isNumber(num) { return typeof num === "number" ? num - num === 0 : false } function toVector(arr) { return concat.apply([], arr) } function jStat() { return new jStat._init(arguments) } jStat.fn = jStat.prototype; jStat._init = function _init(args) { if (isArray(args[0])) { if (isArray(args[0][0])) { if (isFunction(args[1])) args[0] = jStat.map(args[0], args[1]); for (var i = 0; i < args[0].length; i++)this[i] = args[0][i]; this.length = args[0].length } else { this[0] = isFunction(args[1]) ? jStat.map(args[0], args[1]) : args[0]; this.length = 1 } } else if (isNumber(args[0])) { this[0] = jStat.seq.apply(null, args); this.length = 1 } else if (args[0] instanceof jStat) { return jStat(args[0].toArray()) } else { this[0] = []; this.length = 1 } return this }; jStat._init.prototype = jStat.prototype; jStat._init.constructor = jStat; jStat.utils = { calcRdx: calcRdx, isArray: isArray, isFunction: isFunction, isNumber: isNumber, toVector: toVector }; jStat._random_fn = Math.random; jStat.setRandom = function setRandom(fn) { if (typeof fn !== "function") throw new TypeError("fn is not a function"); jStat._random_fn = fn }; jStat.extend = function extend(obj) { var i, j; if (arguments.length === 1) { for (j in obj) jStat[j] = obj[j]; return this } for (i = 1; i < arguments.length; i++) { for (j in arguments[i]) obj[j] = arguments[i][j] } return obj }; jStat.rows = function rows(arr) { return arr.length || 1 }; jStat.cols = function cols(arr) { return arr[0].length || 1 }; jStat.dimensions = function dimensions(arr) { return { rows: jStat.rows(arr), cols: jStat.cols(arr) } }; jStat.row = function row(arr, index) { if (isArray(index)) { return index.map(function (i) { return jStat.row(arr, i) }) } return arr[index] }; jStat.rowa = function rowa(arr, i) { return jStat.row(arr, i) }; jStat.col = function col(arr, index) { if (isArray(index)) { var submat = jStat.arange(arr.length).map(function () { return new Array(index.length) }); index.forEach(function (ind, i) { jStat.arange(arr.length).forEach(function (j) { submat[j][i] = arr[j][ind] }) }); return submat } var column = new Array(arr.length); for (var i = 0; i < arr.length; i++)column[i] = [arr[i][index]]; return column }; jStat.cola = function cola(arr, i) { return jStat.col(arr, i).map(function (a) { return a[0] }) }; jStat.diag = function diag(arr) { var nrow = jStat.rows(arr); var res = new Array(nrow); for (var row = 0; row < nrow; row++)res[row] = [arr[row][row]]; return res }; jStat.antidiag = function antidiag(arr) { var nrow = jStat.rows(arr) - 1; var res = new Array(nrow); for (var i = 0; nrow >= 0; nrow--, i++)res[i] = [arr[i][nrow]]; return res }; jStat.transpose = function transpose(arr) { var obj = []; var objArr, rows, cols, j, i; if (!isArray(arr[0])) arr = [arr]; rows = arr.length; cols = arr[0].length; for (i = 0; i < cols; i++) { objArr = new Array(rows); for (j = 0; j < rows; j++)objArr[j] = arr[j][i]; obj.push(objArr) } return obj.length === 1 ? obj[0] : obj }; jStat.map = function map(arr, func, toAlter) { var row, nrow, ncol, res, col; if (!isArray(arr[0])) arr = [arr]; nrow = arr.length; ncol = arr[0].length; res = toAlter ? arr : new Array(nrow); for (row = 0; row < nrow; row++) { if (!res[row]) res[row] = new Array(ncol); for (col = 0; col < ncol; col++)res[row][col] = func(arr[row][col], row, col) } return res.length === 1 ? res[0] : res }; jStat.cumreduce = function cumreduce(arr, func, toAlter) { var row, nrow, ncol, res, col; if (!isArray(arr[0])) arr = [arr]; nrow = arr.length; ncol = arr[0].length; res = toAlter ? arr : new Array(nrow); for (row = 0; row < nrow; row++) { if (!res[row]) res[row] = new Array(ncol); if (ncol > 0) res[row][0] = arr[row][0]; for (col = 1; col < ncol; col++)res[row][col] = func(res[row][col - 1], arr[row][col]) } return res.length === 1 ? res[0] : res }; jStat.alter = function alter(arr, func) { return jStat.map(arr, func, true) }; jStat.create = function create(rows, cols, func) { var res = new Array(rows); var i, j; if (isFunction(cols)) { func = cols; cols = rows } for (i = 0; i < rows; i++) { res[i] = new Array(cols); for (j = 0; j < cols; j++)res[i][j] = func(i, j) } return res }; function retZero() { return 0 } jStat.zeros = function zeros(rows, cols) { if (!isNumber(cols)) cols = rows; return jStat.create(rows, cols, retZero) }; function retOne() { return 1 } jStat.ones = function ones(rows, cols) { if (!isNumber(cols)) cols = rows; return jStat.create(rows, cols, retOne) }; jStat.rand = function rand(rows, cols) { if (!isNumber(cols)) cols = rows; return jStat.create(rows, cols, jStat._random_fn) }; function retIdent(i, j) { return i === j ? 1 : 0 } jStat.identity = function identity(rows, cols) { if (!isNumber(cols)) cols = rows; return jStat.create(rows, cols, retIdent) }; jStat.symmetric = function symmetric(arr) { var size = arr.length; var row, col; if (arr.length !== arr[0].length) return false; for (row = 0; row < size; row++) { for (col = 0; col < size; col++)if (arr[col][row] !== arr[row][col]) return false } return true }; jStat.clear = function clear(arr) { return jStat.alter(arr, retZero) }; jStat.seq = function seq(min, max, length, func) { if (!isFunction(func)) func = false; var arr = []; var hival = calcRdx(min, max); var step = (max * hival - min * hival) / ((length - 1) * hival); var current = min; var cnt; for (cnt = 0; current <= max && cnt < length; cnt++, current = (min * hival + step * hival * cnt) / hival) { arr.push(func ? func(current, cnt) : current) } return arr }; jStat.arange = function arange(start, end, step) { var rl = []; var i; step = step || 1; if (end === undefined) { end = start; start = 0 } if (start === end || step === 0) { return [] } if (start < end && step < 0) { return [] } if (start > end && step > 0) { return [] } if (step > 0) { for (i = start; i < end; i += step) { rl.push(i) } } else { for (i = start; i > end; i += step) { rl.push(i) } } return rl }; jStat.slice = function () { function _slice(list, start, end, step) { var i; var rl = []; var length = list.length; if (start === undefined && end === undefined && step === undefined) { return jStat.copy(list) } start = start || 0; end = end || list.length; start = start >= 0 ? start : length + start; end = end >= 0 ? end : length + end; step = step || 1; if (start === end || step === 0) { return [] } if (start < end && step < 0) { return [] } if (start > end && step > 0) { return [] } if (step > 0) { for (i = start; i < end; i += step) { rl.push(list[i]) } } else { for (i = start; i > end; i += step) { rl.push(list[i]) } } return rl } function slice(list, rcSlice) { var colSlice, rowSlice; rcSlice = rcSlice || {}; if (isNumber(rcSlice.row)) { if (isNumber(rcSlice.col)) return list[rcSlice.row][rcSlice.col]; var row = jStat.rowa(list, rcSlice.row); colSlice = rcSlice.col || {}; return _slice(row, colSlice.start, colSlice.end, colSlice.step) } if (isNumber(rcSlice.col)) { var col = jStat.cola(list, rcSlice.col); rowSlice = rcSlice.row || {}; return _slice(col, rowSlice.start, rowSlice.end, rowSlice.step) } rowSlice = rcSlice.row || {}; colSlice = rcSlice.col || {}; var rows = _slice(list, rowSlice.start, rowSlice.end, rowSlice.step); return rows.map(function (row) { return _slice(row, colSlice.start, colSlice.end, colSlice.step) }) } return slice }(); jStat.sliceAssign = function sliceAssign(A, rcSlice, B) { var nl, ml; if (isNumber(rcSlice.row)) { if (isNumber(rcSlice.col)) return A[rcSlice.row][rcSlice.col] = B; rcSlice.col = rcSlice.col || {}; rcSlice.col.start = rcSlice.col.start || 0; rcSlice.col.end = rcSlice.col.end || A[0].length; rcSlice.col.step = rcSlice.col.step || 1; nl = jStat.arange(rcSlice.col.start, Math.min(A.length, rcSlice.col.end), rcSlice.col.step); var m = rcSlice.row; nl.forEach(function (n, i) { A[m][n] = B[i] }); return A } if (isNumber(rcSlice.col)) { rcSlice.row = rcSlice.row || {}; rcSlice.row.start = rcSlice.row.start || 0; rcSlice.row.end = rcSlice.row.end || A.length; rcSlice.row.step = rcSlice.row.step || 1; ml = jStat.arange(rcSlice.row.start, Math.min(A[0].length, rcSlice.row.end), rcSlice.row.step); var n = rcSlice.col; ml.forEach(function (m, j) { A[m][n] = B[j] }); return A } if (B[0].length === undefined) { B = [B] } rcSlice.row.start = rcSlice.row.start || 0; rcSlice.row.end = rcSlice.row.end || A.length; rcSlice.row.step = rcSlice.row.step || 1; rcSlice.col.start = rcSlice.col.start || 0; rcSlice.col.end = rcSlice.col.end || A[0].length; rcSlice.col.step = rcSlice.col.step || 1; ml = jStat.arange(rcSlice.row.start, Math.min(A.length, rcSlice.row.end), rcSlice.row.step); nl = jStat.arange(rcSlice.col.start, Math.min(A[0].length, rcSlice.col.end), rcSlice.col.step); ml.forEach(function (m, i) { nl.forEach(function (n, j) { A[m][n] = B[i][j] }) }); return A }; jStat.diagonal = function diagonal(diagArray) { var mat = jStat.zeros(diagArray.length, diagArray.length); diagArray.forEach(function (t, i) { mat[i][i] = t }); return mat }; jStat.copy = function copy(A) { return A.map(function (row) { if (isNumber(row)) return row; return row.map(function (t) { return t }) }) }; var jProto = jStat.prototype; jProto.length = 0; jProto.push = Array.prototype.push; jProto.sort = Array.prototype.sort; jProto.splice = Array.prototype.splice; jProto.slice = Array.prototype.slice; jProto.toArray = function toArray() { return this.length > 1 ? slice.call(this) : slice.call(this)[0] }; jProto.map = function map(func, toAlter) { return jStat(jStat.map(this, func, toAlter)) }; jProto.cumreduce = function cumreduce(func, toAlter) { return jStat(jStat.cumreduce(this, func, toAlter)) }; jProto.alter = function alter(func) { jStat.alter(this, func); return this }; (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jProto[passfunc] = function (func) { var self = this, results; if (func) { setTimeout(function () { func.call(self, jProto[passfunc].call(self)) }); return this } results = jStat[passfunc](this); return isArray(results) ? jStat(results) : results } })(funcs[i]) })("transpose clear symmetric rows cols dimensions diag antidiag".split(" ")); (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jProto[passfunc] = function (index, func) { var self = this; if (func) { setTimeout(function () { func.call(self, jProto[passfunc].call(self, index)) }); return this } return jStat(jStat[passfunc](this, index)) } })(funcs[i]) })("row col".split(" ")); (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jProto[passfunc] = function () { return jStat(jStat[passfunc].apply(null, arguments)) } })(funcs[i]) })("create zeros ones rand identity".split(" ")); return jStat }(Math); (function (jStat, Math) { var isFunction = jStat.utils.isFunction; function ascNum(a, b) { return a - b } function clip(arg, min, max) { return Math.max(min, Math.min(arg, max)) } jStat.sum = function sum(arr) { var sum = 0; var i = arr.length; while (--i >= 0) sum += arr[i]; return sum }; jStat.sumsqrd = function sumsqrd(arr) { var sum = 0; var i = arr.length; while (--i >= 0) sum += arr[i] * arr[i]; return sum }; jStat.sumsqerr = function sumsqerr(arr) { var mean = jStat.mean(arr); var sum = 0; var i = arr.length; var tmp; while (--i >= 0) { tmp = arr[i] - mean; sum += tmp * tmp } return sum }; jStat.sumrow = function sumrow(arr) { var sum = 0; var i = arr.length; while (--i >= 0) sum += arr[i]; return sum }; jStat.product = function product(arr) { var prod = 1; var i = arr.length; while (--i >= 0) prod *= arr[i]; return prod }; jStat.min = function min(arr) { var low = arr[0]; var i = 0; while (++i < arr.length) if (arr[i] < low) low = arr[i]; return low }; jStat.max = function max(arr) { var high = arr[0]; var i = 0; while (++i < arr.length) if (arr[i] > high) high = arr[i]; return high }; jStat.unique = function unique(arr) { var hash = {}, _arr = []; for (var i = 0; i < arr.length; i++) { if (!hash[arr[i]]) { hash[arr[i]] = true; _arr.push(arr[i]) } } return _arr }; jStat.mean = function mean(arr) { return jStat.sum(arr) / arr.length }; jStat.meansqerr = function meansqerr(arr) { return jStat.sumsqerr(arr) / arr.length }; jStat.geomean = function geomean(arr) { return Math.pow(jStat.product(arr), 1 / arr.length) }; jStat.median = function median(arr) { var arrlen = arr.length; var _arr = arr.slice().sort(ascNum); return !(arrlen & 1) ? (_arr[arrlen / 2 - 1] + _arr[arrlen / 2]) / 2 : _arr[arrlen / 2 | 0] }; jStat.cumsum = function cumsum(arr) { return jStat.cumreduce(arr, function (a, b) { return a + b }) }; jStat.cumprod = function cumprod(arr) { return jStat.cumreduce(arr, function (a, b) { return a * b }) }; jStat.diff = function diff(arr) { var diffs = []; var arrLen = arr.length; var i; for (i = 1; i < arrLen; i++)diffs.push(arr[i] - arr[i - 1]); return diffs }; jStat.rank = function (arr) { var arrlen = arr.length; var sorted = arr.slice().sort(ascNum); var ranks = new Array(arrlen); var val; for (var i = 0; i < arrlen; i++) { var first = sorted.indexOf(arr[i]); var last = sorted.lastIndexOf(arr[i]); if (first === last) { val = first } else { val = (first + last) / 2 } ranks[i] = val + 1 } return ranks }; jStat.mode = function mode(arr) { var arrLen = arr.length; var _arr = arr.slice().sort(ascNum); var count = 1; var maxCount = 0; var numMaxCount = 0; var mode_arr = []; var i; for (i = 0; i < arrLen; i++) { if (_arr[i] === _arr[i + 1]) { count++ } else { if (count > maxCount) { mode_arr = [_arr[i]]; maxCount = count; numMaxCount = 0 } else if (count === maxCount) { mode_arr.push(_arr[i]); numMaxCount++ } count = 1 } } return numMaxCount === 0 ? mode_arr[0] : mode_arr }; jStat.range = function range(arr) { return jStat.max(arr) - jStat.min(arr) }; jStat.variance = function variance(arr, flag) { return jStat.sumsqerr(arr) / (arr.length - (flag ? 1 : 0)) }; jStat.pooledvariance = function pooledvariance(arr) { var sumsqerr = arr.reduce(function (a, samples) { return a + jStat.sumsqerr(samples) }, 0); var count = arr.reduce(function (a, samples) { return a + samples.length }, 0); return sumsqerr / (count - arr.length) }; jStat.deviation = function (arr) { var mean = jStat.mean(arr); var arrlen = arr.length; var dev = new Array(arrlen); for (var i = 0; i < arrlen; i++) { dev[i] = arr[i] - mean } return dev }; jStat.stdev = function stdev(arr, flag) { return Math.sqrt(jStat.variance(arr, flag)) }; jStat.pooledstdev = function pooledstdev(arr) { return Math.sqrt(jStat.pooledvariance(arr)) }; jStat.meandev = function meandev(arr) { var mean = jStat.mean(arr); var a = []; for (var i = arr.length - 1; i >= 0; i--) { a.push(Math.abs(arr[i] - mean)) } return jStat.mean(a) }; jStat.meddev = function meddev(arr) { var median = jStat.median(arr); var a = []; for (var i = arr.length - 1; i >= 0; i--) { a.push(Math.abs(arr[i] - median)) } return jStat.median(a) }; jStat.coeffvar = function coeffvar(arr) { return jStat.stdev(arr) / jStat.mean(arr) }; jStat.quartiles = function quartiles(arr) { var arrlen = arr.length; var _arr = arr.slice().sort(ascNum); return [_arr[Math.round(arrlen / 4) - 1], _arr[Math.round(arrlen / 2) - 1], _arr[Math.round(arrlen * 3 / 4) - 1]] }; jStat.quantiles = function quantiles(arr, quantilesArray, alphap, betap) { var sortedArray = arr.slice().sort(ascNum); var quantileVals = [quantilesArray.length]; var n = arr.length; var i, p, m, aleph, k, gamma; if (typeof alphap === "undefined") alphap = 3 / 8; if (typeof betap === "undefined") betap = 3 / 8; for (i = 0; i < quantilesArray.length; i++) { p = quantilesArray[i]; m = alphap + p * (1 - alphap - betap); aleph = n * p + m; k = Math.floor(clip(aleph, 1, n - 1)); gamma = clip(aleph - k, 0, 1); quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k] } return quantileVals }; jStat.percentile = function percentile(arr, k, exclusive) { var _arr = arr.slice().sort(ascNum); var realIndex = k * (_arr.length + (exclusive ? 1 : -1)) + (exclusive ? 0 : 1); var index = parseInt(realIndex); var frac = realIndex - index; if (index + 1 < _arr.length) { return _arr[index - 1] + frac * (_arr[index] - _arr[index - 1]) } else { return _arr[index - 1] } }; jStat.percentileOfScore = function percentileOfScore(arr, score, kind) { var counter = 0; var len = arr.length; var strict = false; var value, i; if (kind === "strict") strict = true; for (i = 0; i < len; i++) { value = arr[i]; if (strict && value < score || !strict && value <= score) { counter++ } } return counter / len }; jStat.histogram = function histogram(arr, binCnt) { binCnt = binCnt || 4; var first = jStat.min(arr); var binWidth = (jStat.max(arr) - first) / binCnt; var len = arr.length; var bins = []; var i; for (i = 0; i < binCnt; i++)bins[i] = 0; for (i = 0; i < len; i++)bins[Math.min(Math.floor((arr[i] - first) / binWidth), binCnt - 1)] += 1; return bins }; jStat.covariance = function covariance(arr1, arr2) { var u = jStat.mean(arr1); var v = jStat.mean(arr2); var arr1Len = arr1.length; var sq_dev = new Array(arr1Len); var i; for (i = 0; i < arr1Len; i++)sq_dev[i] = (arr1[i] - u) * (arr2[i] - v); return jStat.sum(sq_dev) / (arr1Len - 1) }; jStat.corrcoeff = function corrcoeff(arr1, arr2) { return jStat.covariance(arr1, arr2) / jStat.stdev(arr1, 1) / jStat.stdev(arr2, 1) }; jStat.spearmancoeff = function (arr1, arr2) { arr1 = jStat.rank(arr1); arr2 = jStat.rank(arr2); return jStat.corrcoeff(arr1, arr2) }; jStat.stanMoment = function stanMoment(arr, n) { var mu = jStat.mean(arr); var sigma = jStat.stdev(arr); var len = arr.length; var skewSum = 0; for (var i = 0; i < len; i++)skewSum += Math.pow((arr[i] - mu) / sigma, n); return skewSum / arr.length }; jStat.skewness = function skewness(arr) { return jStat.stanMoment(arr, 3) }; jStat.kurtosis = function kurtosis(arr) { return jStat.stanMoment(arr, 4) - 3 }; var jProto = jStat.prototype; (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jProto[passfunc] = function (fullbool, func) { var arr = []; var i = 0; var tmpthis = this; if (isFunction(fullbool)) { func = fullbool; fullbool = false } if (func) { setTimeout(function () { func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool)) }); return this } if (this.length > 1) { tmpthis = fullbool === true ? this : this.transpose(); for (; i < tmpthis.length; i++)arr[i] = jStat[passfunc](tmpthis[i]); return arr } return jStat[passfunc](this[0], fullbool) } })(funcs[i]) })("cumsum cumprod".split(" ")); (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jProto[passfunc] = function (fullbool, func) { var arr = []; var i = 0; var tmpthis = this; if (isFunction(fullbool)) { func = fullbool; fullbool = false } if (func) { setTimeout(function () { func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool)) }); return this } if (this.length > 1) { if (passfunc !== "sumrow") tmpthis = fullbool === true ? this : this.transpose(); for (; i < tmpthis.length; i++)arr[i] = jStat[passfunc](tmpthis[i]); return fullbool === true ? jStat[passfunc](jStat.utils.toVector(arr)) : arr } return jStat[passfunc](this[0], fullbool) } })(funcs[i]) })(("sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr " + "geomean median diff rank mode range variance deviation stdev meandev " + "meddev coeffvar quartiles histogram skewness kurtosis").split(" ")); (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jProto[passfunc] = function () { var arr = []; var i = 0; var tmpthis = this; var args = Array.prototype.slice.call(arguments); var callbackFunction; if (isFunction(args[args.length - 1])) { callbackFunction = args[args.length - 1]; var argsToPass = args.slice(0, args.length - 1); setTimeout(function () { callbackFunction.call(tmpthis, jProto[passfunc].apply(tmpthis, argsToPass)) }); return this } else { callbackFunction = undefined; var curriedFunction = function curriedFunction(vector) { return jStat[passfunc].apply(tmpthis, [vector].concat(args)) } } if (this.length > 1) { tmpthis = tmpthis.transpose(); for (; i < tmpthis.length; i++)arr[i] = curriedFunction(tmpthis[i]); return arr } return curriedFunction(this[0]) } })(funcs[i]) })("quantiles percentileOfScore".split(" ")) })(jStat, Math); (function (jStat, Math) { jStat.gammaln = function gammaln(x) { var j = 0; var cof = [76.18009172947146, -86.50532032941678, 24.01409824083091, -1.231739572450155, .001208650973866179, -5395239384953e-18]; var ser = 1.000000000190015; var xx, y, tmp; tmp = (y = xx = x) + 5.5; tmp -= (xx + .5) * Math.log(tmp); for (; j < 6; j++)ser += cof[j] / ++y; return Math.log(2.5066282746310007 * ser / xx) - tmp }; jStat.loggam = function loggam(x) { var x0, x2, xp, gl, gl0; var k, n; var a = [.08333333333333333, -.002777777777777778, .0007936507936507937, -.0005952380952380952, .0008417508417508418, -.001917526917526918, .00641025641025641, -.02955065359477124, .1796443723688307, -1.3924322169059]; x0 = x; n = 0; if (x == 1 || x == 2) { return 0 } if (x <= 7) { n = Math.floor(7 - x); x0 = x + n } x2 = 1 / (x0 * x0); xp = 2 * Math.PI; gl0 = a[9]; for (k = 8; k >= 0; k--) { gl0 *= x2; gl0 += a[k] } gl = gl0 / x0 + .5 * Math.log(xp) + (x0 - .5) * Math.log(x0) - x0; if (x <= 7) { for (k = 1; k <= n; k++) { gl -= Math.log(x0 - 1); x0 -= 1 } } return gl }; jStat.gammafn = function gammafn(x) { var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563, 629.3311553128184, 866.9662027904133, -31451.272968848367, -36144.413418691176, 66456.14382024054]; var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192, -3107.771671572311, 22538.11842098015, 4755.846277527881, -134659.9598649693, -115132.2596755535]; var fact = false; var n = 0; var xden = 0; var xnum = 0; var y = x; var i, z, yi, res; if (y <= 0) { res = y % 1 + 36e-17; if (res) { fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res); y = 1 - y } else { return Infinity } } yi = y; if (y < 1) { z = y++ } else { z = (y -= n = (y | 0) - 1) - 1 } for (i = 0; i < 8; ++i) { xnum = (xnum + p[i]) * z; xden = xden * z + q[i] } res = xnum / xden + 1; if (yi < y) { res /= yi } else if (yi > y) { for (i = 0; i < n; ++i) { res *= y; y++ } } if (fact) { res = fact / res } return res }; jStat.gammap = function gammap(a, x) { return jStat.lowRegGamma(a, x) * jStat.gammafn(a) }; jStat.lowRegGamma = function lowRegGamma(a, x) { var aln = jStat.gammaln(a); var ap = a; var sum = 1 / a; var del = sum; var b = x + 1 - a; var c = 1 / 1e-30; var d = 1 / b; var h = d; var i = 1; var ITMAX = -~(Math.log(a >= 1 ? a : 1 / a) * 8.5 + a * .4 + 17); var an; if (x < 0 || a <= 0) { return NaN } else if (x < a + 1) { for (; i <= ITMAX; i++) { sum += del *= x / ++ap } return sum * Math.exp(-x + a * Math.log(x) - aln) } for (; i <= ITMAX; i++) { an = -i * (i - a); b += 2; d = an * d + b; c = b + an / c; d = 1 / d; h *= d * c } return 1 - h * Math.exp(-x + a * Math.log(x) - aln) }; jStat.factorialln = function factorialln(n) { return n < 0 ? NaN : jStat.gammaln(n + 1) }; jStat.factorial = function factorial(n) { return n < 0 ? NaN : jStat.gammafn(n + 1) }; jStat.combination = function combination(n, m) { return n > 170 || m > 170 ? Math.exp(jStat.combinationln(n, m)) : jStat.factorial(n) / jStat.factorial(m) / jStat.factorial(n - m) }; jStat.combinationln = function combinationln(n, m) { return jStat.factorialln(n) - jStat.factorialln(m) - jStat.factorialln(n - m) }; jStat.permutation = function permutation(n, m) { return jStat.factorial(n) / jStat.factorial(n - m) }; jStat.betafn = function betafn(x, y) { if (x <= 0 || y <= 0) return undefined; return x + y > 170 ? Math.exp(jStat.betaln(x, y)) : jStat.gammafn(x) * jStat.gammafn(y) / jStat.gammafn(x + y) }; jStat.betaln = function betaln(x, y) { return jStat.gammaln(x) + jStat.gammaln(y) - jStat.gammaln(x + y) }; jStat.betacf = function betacf(x, a, b) { var fpmin = 1e-30; var m = 1; var qab = a + b; var qap = a + 1; var qam = a - 1; var c = 1; var d = 1 - qab * x / qap; var m2, aa, del, h; if (Math.abs(d) < fpmin) d = fpmin; d = 1 / d; h = d; for (; m <= 100; m++) { m2 = 2 * m; aa = m * (b - m) * x / ((qam + m2) * (a + m2)); d = 1 + aa * d; if (Math.abs(d) < fpmin) d = fpmin; c = 1 + aa / c; if (Math.abs(c) < fpmin) c = fpmin; d = 1 / d; h *= d * c; aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2)); d = 1 + aa * d; if (Math.abs(d) < fpmin) d = fpmin; c = 1 + aa / c; if (Math.abs(c) < fpmin) c = fpmin; d = 1 / d; del = d * c; h *= del; if (Math.abs(del - 1) < 3e-7) break } return h }; jStat.gammapinv = function gammapinv(p, a) { var j = 0; var a1 = a - 1; var EPS = 1e-8; var gln = jStat.gammaln(a); var x, err, t, u, pp, lna1, afac; if (p >= 1) return Math.max(100, a + 100 * Math.sqrt(a)); if (p <= 0) return 0; if (a > 1) { lna1 = Math.log(a1); afac = Math.exp(a1 * (lna1 - 1) - gln); pp = p < .5 ? p : 1 - p; t = Math.sqrt(-2 * Math.log(pp)); x = (2.30753 + t * .27061) / (1 + t * (.99229 + t * .04481)) - t; if (p < .5) x = -x; x = Math.max(.001, a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3)) } else { t = 1 - a * (.253 + a * .12); if (p < t) x = Math.pow(p / t, 1 / a); else x = 1 - Math.log(1 - (p - t) / (1 - t)) } for (; j < 12; j++) { if (x <= 0) return 0; err = jStat.lowRegGamma(a, x) - p; if (a > 1) t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1)); else t = Math.exp(-x + a1 * Math.log(x) - gln); u = err / t; x -= t = u / (1 - .5 * Math.min(1, u * ((a - 1) / x - 1))); if (x <= 0) x = .5 * (x + t); if (Math.abs(t) < EPS * x) break } return x }; jStat.erf = function erf(x) { var cof = [-1.3026537197817094, .6419697923564902, .019476473204185836, -.00956151478680863, -.000946595344482036, .000366839497852761, 42523324806907e-18, -20278578112534e-18, -1624290004647e-18, 130365583558e-17, 1.5626441722e-8, -8.5238095915e-8, 6.529054439e-9, 5.059343495e-9, -9.91364156e-10, -2.27365122e-10, 96467911e-18, 2394038e-18, -6886027e-18, 894487e-18, 313092e-18, -112708e-18, 381e-18, 7106e-18, -1523e-18, -94e-18, 121e-18, -28e-18]; var j = cof.length - 1; var isneg = false; var d = 0; var dd = 0; var t, ty, tmp, res; if (x < 0) { x = -x; isneg = true } t = 2 / (2 + x); ty = 4 * t - 2; for (; j > 0; j--) { tmp = d; d = ty * d - dd + cof[j]; dd = tmp } res = t * Math.exp(-x * x + .5 * (cof[0] + ty * d) - dd); return isneg ? res - 1 : 1 - res }; jStat.erfc = function erfc(x) { return 1 - jStat.erf(x) }; jStat.erfcinv = function erfcinv(p) { var j = 0; var x, err, t, pp; if (p >= 2) return -100; if (p <= 0) return 100; pp = p < 1 ? p : 2 - p; t = Math.sqrt(-2 * Math.log(pp / 2)); x = -.70711 * ((2.30753 + t * .27061) / (1 + t * (.99229 + t * .04481)) - t); for (; j < 2; j++) { err = jStat.erfc(x) - pp; x += err / (1.1283791670955126 * Math.exp(-x * x) - x * err) } return p < 1 ? x : -x }; jStat.ibetainv = function ibetainv(p, a, b) { var EPS = 1e-8; var a1 = a - 1; var b1 = b - 1; var j = 0; var lna, lnb, pp, t, u, err, x, al, h, w, afac; if (p <= 0) return 0; if (p >= 1) return 1; if (a >= 1 && b >= 1) { pp = p < .5 ? p : 1 - p; t = Math.sqrt(-2 * Math.log(pp)); x = (2.30753 + t * .27061) / (1 + t * (.99229 + t * .04481)) - t; if (p < .5) x = -x; al = (x * x - 3) / 6; h = 2 / (1 / (2 * a - 1) + 1 / (2 * b - 1)); w = x * Math.sqrt(al + h) / h - (1 / (2 * b - 1) - 1 / (2 * a - 1)) * (al + 5 / 6 - 2 / (3 * h)); x = a / (a + b * Math.exp(2 * w)) } else { lna = Math.log(a / (a + b)); lnb = Math.log(b / (a + b)); t = Math.exp(a * lna) / a; u = Math.exp(b * lnb) / b; w = t + u; if (p < t / w) x = Math.pow(a * w * p, 1 / a); else x = 1 - Math.pow(b * w * (1 - p), 1 / b) } afac = -jStat.gammaln(a) - jStat.gammaln(b) + jStat.gammaln(a + b); for (; j < 10; j++) { if (x === 0 || x === 1) return x; err = jStat.ibeta(x, a, b) - p; t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac); u = err / t; x -= t = u / (1 - .5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))); if (x <= 0) x = .5 * (x + t); if (x >= 1) x = .5 * (x + t + 1); if (Math.abs(t) < EPS * x && j > 0) break } return x }; jStat.ibeta = function ibeta(x, a, b) { var bt = x === 0 || x === 1 ? 0 : Math.exp(jStat.gammaln(a + b) - jStat.gammaln(a) - jStat.gammaln(b) + a * Math.log(x) + b * Math.log(1 - x)); if (x < 0 || x > 1) return false; if (x < (a + 1) / (a + b + 2)) return bt * jStat.betacf(x, a, b) / a; return 1 - bt * jStat.betacf(1 - x, b, a) / b }; jStat.randn = function randn(n, m) { var u, v, x, y, q; if (!m) m = n; if (n) return jStat.create(n, m, function () { return jStat.randn() }); do { u = jStat._random_fn(); v = 1.7156 * (jStat._random_fn() - .5); x = u - .449871; y = Math.abs(v) + .386595; q = x * x + y * (.196 * y - .25472 * x) } while (q > .27597 && (q > .27846 || v * v > -4 * Math.log(u) * u * u)); return v / u }; jStat.randg = function randg(shape, n, m) { var oalph = shape; var a1, a2, u, v, x, mat; if (!m) m = n; if (!shape) shape = 1; if (n) { mat = jStat.zeros(n, m); mat.alter(function () { return jStat.randg(shape) }); return mat } if (shape < 1) shape += 1; a1 = shape - 1 / 3; a2 = 1 / Math.sqrt(9 * a1); do { do { x = jStat.randn(); v = 1 + a2 * x } while (v <= 0); v = v * v * v; u = jStat._random_fn() } while (u > 1 - .331 * Math.pow(x, 4) && Math.log(u) > .5 * x * x + a1 * (1 - v + Math.log(v))); if (shape == oalph) return a1 * v; do { u = jStat._random_fn() } while (u === 0); return Math.pow(u, 1 / oalph) * a1 * v }; (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jStat.fn[passfunc] = function () { return jStat(jStat.map(this, function (value) { return jStat[passfunc](value) })) } })(funcs[i]) })("gammaln gammafn factorial factorialln".split(" ")); (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jStat.fn[passfunc] = function () { return jStat(jStat[passfunc].apply(null, arguments)) } })(funcs[i]) })("randn".split(" ")) })(jStat, Math); (function (jStat, Math) { (function (list) { for (var i = 0; i < list.length; i++)(function (func) { jStat[func] = function (a, b, c) { if (!(this instanceof arguments.callee)) return new arguments.callee(a, b, c); this._a = a; this._b = b; this._c = c; return this }; jStat.fn[func] = function (a, b, c) { var newthis = jStat[func](a, b, c); newthis.data = this; return newthis }; jStat[func].prototype.sample = function (arr) { var a = this._a; var b = this._b; var c = this._c; if (arr) return jStat.alter(arr, function () { return jStat[func].sample(a, b, c) }); else return jStat[func].sample(a, b, c) }; (function (vals) { for (var i = 0; i < vals.length; i++)(function (fnfunc) { jStat[func].prototype[fnfunc] = function (x) { var a = this._a; var b = this._b; var c = this._c; if (!x && x !== 0) x = this.data; if (typeof x !== "number") { return jStat.fn.map.call(x, function (x) { return jStat[func][fnfunc](x, a, b, c) }) } return jStat[func][fnfunc](x, a, b, c) } })(vals[i]) })("pdf cdf inv".split(" ")); (function (vals) { for (var i = 0; i < vals.length; i++)(function (fnfunc) { jStat[func].prototype[fnfunc] = function () { return jStat[func][fnfunc](this._a, this._b, this._c) } })(vals[i]) })("mean median mode variance".split(" ")) })(list[i]) })(("beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy " + "laplace lognormal noncentralt normal pareto studentt weibull uniform " + "binomial negbin hypgeom poisson triangular tukey arcsine").split(" ")); jStat.extend(jStat.beta, { pdf: function pdf(x, alpha, beta) { if (x > 1 || x < 0) return 0; if (alpha == 1 && beta == 1) return 1; if (alpha < 512 && beta < 512) { return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / jStat.betafn(alpha, beta) } else { return Math.exp((alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - x) - jStat.betaln(alpha, beta)) } }, cdf: function cdf(x, alpha, beta) { return x > 1 || x < 0 ? (x > 1) * 1 : jStat.ibeta(x, alpha, beta) }, inv: function inv(x, alpha, beta) { return jStat.ibetainv(x, alpha, beta) }, mean: function mean(alpha, beta) { return alpha / (alpha + beta) }, median: function median(alpha, beta) { return jStat.ibetainv(.5, alpha, beta) }, mode: function mode(alpha, beta) { return (alpha - 1) / (alpha + beta - 2) }, sample: function sample(alpha, beta) { var u = jStat.randg(alpha); return u / (u + jStat.randg(beta)) }, variance: function variance(alpha, beta) { return alpha * beta / (Math.pow(alpha + beta, 2) * (alpha + beta + 1)) } }); jStat.extend(jStat.centralF, { pdf: function pdf(x, df1, df2) { var p, q, f; if (x < 0) return 0; if (df1 <= 2) { if (x === 0 && df1 < 2) { return Infinity } if (x === 0 && df1 === 2) { return 1 } return 1 / jStat.betafn(df1 / 2, df2 / 2) * Math.pow(df1 / df2, df1 / 2) * Math.pow(x, df1 / 2 - 1) * Math.pow(1 + df1 / df2 * x, -(df1 + df2) / 2) } p = df1 * x / (df2 + x * df1); q = df2 / (df2 + x * df1); f = df1 * q / 2; return f * jStat.binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p) }, cdf: function cdf(x, df1, df2) { if (x < 0) return 0; return jStat.ibeta(df1 * x / (df1 * x + df2), df1 / 2, df2 / 2) }, inv: function inv(x, df1, df2) { return df2 / (df1 * (1 / jStat.ibetainv(x, df1 / 2, df2 / 2) - 1)) }, mean: function mean(df1, df2) { return df2 > 2 ? df2 / (df2 - 2) : undefined }, mode: function mode(df1, df2) { return df1 > 2 ? df2 * (df1 - 2) / (df1 * (df2 + 2)) : undefined }, sample: function sample(df1, df2) { var x1 = jStat.randg(df1 / 2) * 2; var x2 = jStat.randg(df2 / 2) * 2; return x1 / df1 / (x2 / df2) }, variance: function variance(df1, df2) { if (df2 <= 4) return undefined; return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4)) } }); jStat.extend(jStat.cauchy, { pdf: function pdf(x, local, scale) { if (scale < 0) { return 0 } return scale / (Math.pow(x - local, 2) + Math.pow(scale, 2)) / Math.PI }, cdf: function cdf(x, local, scale) { return Math.atan((x - local) / scale) / Math.PI + .5 }, inv: function (p, local, scale) { return local + scale * Math.tan(Math.PI * (p - .5)) }, median: function median(local) { return local }, mode: function mode(local) { return local }, sample: function sample(local, scale) { return jStat.randn() * Math.sqrt(1 / (2 * jStat.randg(.5))) * scale + local } }); jStat.extend(jStat.chisquare, { pdf: function pdf(x, dof) { if (x < 0) return 0; return x === 0 && dof === 2 ? .5 : Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - dof / 2 * Math.log(2) - jStat.gammaln(dof / 2)) }, cdf: function cdf(x, dof) { if (x < 0) return 0; return jStat.lowRegGamma(dof / 2, x / 2) }, inv: function (p, dof) { return 2 * jStat.gammapinv(p, .5 * dof) }, mean: function (dof) { return dof }, median: function median(dof) { return dof * Math.pow(1 - 2 / (9 * dof), 3) }, mode: function mode(dof) { return dof - 2 > 0 ? dof - 2 : 0 }, sample: function sample(dof) { return jStat.randg(dof / 2) * 2 }, variance: function variance(dof) { return 2 * dof } }); jStat.extend(jStat.exponential, { pdf: function pdf(x, rate) { return x < 0 ? 0 : rate * Math.exp(-rate * x) }, cdf: function cdf(x, rate) { return x < 0 ? 0 : 1 - Math.exp(-rate * x) }, inv: function (p, rate) { return -Math.log(1 - p) / rate }, mean: function (rate) { return 1 / rate }, median: function (rate) { return 1 / rate * Math.log(2) }, mode: function mode() { return 0 }, sample: function sample(rate) { return -1 / rate * Math.log(jStat._random_fn()) }, variance: function (rate) { return Math.pow(rate, -2) } }); jStat.extend(jStat.gamma, { pdf: function pdf(x, shape, scale) { if (x < 0) return 0; return x === 0 && shape === 1 ? 1 / scale : Math.exp((shape - 1) * Math.log(x) - x / scale - jStat.gammaln(shape) - shape * Math.log(scale)) }, cdf: function cdf(x, shape, scale) { if (x < 0) return 0; return jStat.lowRegGamma(shape, x / scale) }, inv: function (p, shape, scale) { return jStat.gammapinv(p, shape) * scale }, mean: function (shape, scale) { return shape * scale }, mode: function mode(shape, scale) { if (shape > 1) return (shape - 1) * scale; return undefined }, sample: function sample(shape, scale) { return jStat.randg(shape) * scale }, variance: function variance(shape, scale) { return shape * scale * scale } }); jStat.extend(jStat.invgamma, { pdf: function pdf(x, shape, scale) { if (x <= 0) return 0; return Math.exp(-(shape + 1) * Math.log(x) - scale / x - jStat.gammaln(shape) + shape * Math.log(scale)) }, cdf: function cdf(x, shape, scale) { if (x <= 0) return 0; return 1 - jStat.lowRegGamma(shape, scale / x) }, inv: function (p, shape, scale) { return scale / jStat.gammapinv(1 - p, shape) }, mean: function (shape, scale) { return shape > 1 ? scale / (shape - 1) : undefined }, mode: function mode(shape, scale) { return scale / (shape + 1) }, sample: function sample(shape, scale) { return scale / jStat.randg(shape) }, variance: function variance(shape, scale) { if (shape <= 2) return undefined; return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2)) } }); jStat.extend(jStat.kumaraswamy, { pdf: function pdf(x, alpha, beta) { if (x === 0 && alpha === 1) return beta; else if (x === 1 && beta === 1) return alpha; return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - Math.pow(x, alpha))) }, cdf: function cdf(x, alpha, beta) { if (x < 0) return 0; else if (x > 1) return 1; return 1 - Math.pow(1 - Math.pow(x, alpha), beta) }, inv: function inv(p, alpha, beta) { return Math.pow(1 - Math.pow(1 - p, 1 / beta), 1 / alpha) }, mean: function (alpha, beta) { return beta * jStat.gammafn(1 + 1 / alpha) * jStat.gammafn(beta) / jStat.gammafn(1 + 1 / alpha + beta) }, median: function median(alpha, beta) { return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha) }, mode: function mode(alpha, beta) { if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1))) return undefined; return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha) }, variance: function variance() { throw new Error("variance not yet implemented") } }); jStat.extend(jStat.lognormal, { pdf: function pdf(x, mu, sigma) { if (x <= 0) return 0; return Math.exp(-Math.log(x) - .5 * Math.log(2 * Math.PI) - Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma)) }, cdf: function cdf(x, mu, sigma) { if (x < 0) return 0; return .5 + .5 * jStat.erf((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma)) }, inv: function (p, mu, sigma) { return Math.exp(-1.4142135623730951 * sigma * jStat.erfcinv(2 * p) + mu) }, mean: function mean(mu, sigma) { return Math.exp(mu + sigma * sigma / 2) }, median: function median(mu) { return Math.exp(mu) }, mode: function mode(mu, sigma) { return Math.exp(mu - sigma * sigma) }, sample: function sample(mu, sigma) { return Math.exp(jStat.randn() * sigma + mu) }, variance: function variance(mu, sigma) { return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma) } }); jStat.extend(jStat.noncentralt, { pdf: function pdf(x, dof, ncp) { var tol = 1e-14; if (Math.abs(ncp) < tol) return jStat.studentt.pdf(x, dof); if (Math.abs(x) < tol) { return Math.exp(jStat.gammaln((dof + 1) / 2) - ncp * ncp / 2 - .5 * Math.log(Math.PI * dof) - jStat.gammaln(dof / 2)) } return dof / x * (jStat.noncentralt.cdf(x * Math.sqrt(1 + 2 / dof), dof + 2, ncp) - jStat.noncentralt.cdf(x, dof, ncp)) }, cdf: function cdf(x, dof, ncp) { var tol = 1e-14; var min_iterations = 200; if (Math.abs(ncp) < tol) return jStat.studentt.cdf(x, dof); var flip = false; if (x < 0) { flip = true; ncp = -ncp } var prob = jStat.normal.cdf(-ncp, 0, 1); var value = tol + 1; var lastvalue = value; var y = x * x / (x * x + dof); var j = 0; var p = Math.exp(-ncp * ncp / 2); var q = Math.exp(-ncp * ncp / 2 - .5 * Math.log(2) - jStat.gammaln(3 / 2)) * ncp; while (j < min_iterations || lastvalue > tol || value > tol) { lastvalue = value; if (j > 0) { p *= ncp * ncp / (2 * j); q *= ncp * ncp / (2 * (j + 1 / 2)) } value = p * jStat.beta.cdf(y, j + .5, dof / 2) + q * jStat.beta.cdf(y, j + 1, dof / 2); prob += .5 * value; j++ } return flip ? 1 - prob : prob } }); jStat.extend(jStat.normal, { pdf: function pdf(x, mean, std) { return Math.exp(-.5 * Math.log(2 * Math.PI) - Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std)) }, cdf: function cdf(x, mean, std) { return .5 * (1 + jStat.erf((x - mean) / Math.sqrt(2 * std * std))) }, inv: function (p, mean, std) { return -1.4142135623730951 * std * jStat.erfcinv(2 * p) + mean }, mean: function (mean) { return mean }, median: function median(mean) { return mean }, mode: function (mean) { return mean }, sample: function sample(mean, std) { return jStat.randn() * std + mean }, variance: function (mean, std) { return std * std } }); jStat.extend(jStat.pareto, { pdf: function pdf(x, scale, shape) { if (x < scale) return 0; return shape * Math.pow(scale, shape) / Math.pow(x, shape + 1) }, cdf: function cdf(x, scale, shape) { if (x < scale) return 0; return 1 - Math.pow(scale / x, shape) }, inv: function inv(p, scale, shape) { return scale / Math.pow(1 - p, 1 / shape) }, mean: function mean(scale, shape) { if (shape <= 1) return undefined; return shape * Math.pow(scale, shape) / (shape - 1) }, median: function median(scale, shape) { return scale * (shape * Math.SQRT2) }, mode: function mode(scale) { return scale }, variance: function (scale, shape) { if (shape <= 2) return undefined; return scale * scale * shape / (Math.pow(shape - 1, 2) * (shape - 2)) } }); jStat.extend(jStat.studentt, { pdf: function pdf(x, dof) { dof = dof > 1e100 ? 1e100 : dof; return 1 / (Math.sqrt(dof) * jStat.betafn(.5, dof / 2)) * Math.pow(1 + x * x / dof, -((dof + 1) / 2)) }, cdf: function cdf(x, dof) { var dof2 = dof / 2; return jStat.ibeta((x + Math.sqrt(x * x + dof)) / (2 * Math.sqrt(x * x + dof)), dof2, dof2) }, inv: function (p, dof) { var x = jStat.ibetainv(2 * Math.min(p, 1 - p), .5 * dof, .5); x = Math.sqrt(dof * (1 - x) / x); return p > .5 ? x : -x }, mean: function mean(dof) { return dof > 1 ? 0 : undefined }, median: function median() { return 0 }, mode: function mode() { return 0 }, sample: function sample(dof) { return jStat.randn() * Math.sqrt(dof / (2 * jStat.randg(dof / 2))) }, variance: function variance(dof) { return dof > 2 ? dof / (dof - 2) : dof > 1 ? Infinity : undefined } }); jStat.extend(jStat.weibull, { pdf: function pdf(x, scale, shape) { if (x < 0 || scale < 0 || shape < 0) return 0; return shape / scale * Math.pow(x / scale, shape - 1) * Math.exp(-Math.pow(x / scale, shape)) }, cdf: function cdf(x, scale, shape) { return x < 0 ? 0 : 1 - Math.exp(-Math.pow(x / scale, shape)) }, inv: function (p, scale, shape) { return scale * Math.pow(-Math.log(1 - p), 1 / shape) }, mean: function (scale, shape) { return scale * jStat.gammafn(1 + 1 / shape) }, median: function median(scale, shape) { return scale * Math.pow(Math.log(2), 1 / shape) }, mode: function mode(scale, shape) { if (shape <= 1) return 0; return scale * Math.pow((shape - 1) / shape, 1 / shape) }, sample: function sample(scale, shape) { return scale * Math.pow(-Math.log(jStat._random_fn()), 1 / shape) }, variance: function variance(scale, shape) { return scale * scale * jStat.gammafn(1 + 2 / shape) - Math.pow(jStat.weibull.mean(scale, shape), 2) } }); jStat.extend(jStat.uniform, { pdf: function pdf(x, a, b) { return x < a || x > b ? 0 : 1 / (b - a) }, cdf: function cdf(x, a, b) { if (x < a) return 0; else if (x < b) return (x - a) / (b - a); return 1 }, inv: function (p, a, b) { return a + p * (b - a) }, mean: function mean(a, b) { return .5 * (a + b) }, median: function median(a, b) { return jStat.mean(a, b) }, mode: function mode() { throw new Error("mode is not yet implemented") }, sample: function sample(a, b) { return a / 2 + b / 2 + (b / 2 - a / 2) * (2 * jStat._random_fn() - 1) }, variance: function variance(a, b) { return Math.pow(b - a, 2) / 12 } }); function betinc(x, a, b, eps) { var a0 = 0; var b0 = 1; var a1 = 1; var b1 = 1; var m9 = 0; var a2 = 0; var c9; while (Math.abs((a1 - a2) / a1) > eps) { a2 = a1; c9 = -(a + m9) * (a + b + m9) * x / (a + 2 * m9) / (a + 2 * m9 + 1); a0 = a1 + c9 * a0; b0 = b1 + c9 * b0; m9 = m9 + 1; c9 = m9 * (b - m9) * x / (a + 2 * m9 - 1) / (a + 2 * m9); a1 = a0 + c9 * a1; b1 = b0 + c9 * b1; a0 = a0 / b1; b0 = b0 / b1; a1 = a1 / b1; b1 = 1 } return a1 / a } jStat.extend(jStat.binomial, { pdf: function pdf(k, n, p) { return p === 0 || p === 1 ? n * p === k ? 1 : 0 : jStat.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k) }, cdf: function cdf(x, n, p) { var betacdf; var eps = 1e-10; if (x < 0) return 0; if (x >= n) return 1; if (p < 0 || p > 1 || n <= 0) return NaN; x = Math.floor(x); var z = p; var a = x + 1; var b = n - x; var s = a + b; var bt = Math.exp(jStat.gammaln(s) - jStat.gammaln(b) - jStat.gammaln(a) + a * Math.log(z) + b * Math.log(1 - z)); if (z < (a + 1) / (s + 2)) betacdf = bt * betinc(z, a, b, eps); else betacdf = 1 - bt * betinc(1 - z, b, a, eps); return Math.round((1 - betacdf) * (1 / eps)) / (1 / eps) } }); jStat.extend(jStat.negbin, { pdf: function pdf(k, r, p) { if (k !== k >>> 0) return false; if (k < 0) return 0; return jStat.combination(k + r - 1, r - 1) * Math.pow(1 - p, k) * Math.pow(p, r) }, cdf: function cdf(x, r, p) { var sum = 0, k = 0; if (x < 0) return 0; for (; k <= x; k++) { sum += jStat.negbin.pdf(k, r, p) } return sum } }); jStat.extend(jStat.hypgeom, { pdf: function pdf(k, N, m, n) { if (k !== k | 0) { return false } else if (k < 0 || k < m - (N - n)) { return 0 } else if (k > n || k > m) { return 0 } else if (m * 2 > N) { if (n * 2 > N) { return jStat.hypgeom.pdf(N - m - n + k, N, N - m, N - n) } else { return jStat.hypgeom.pdf(n - k, N, N - m, n) } } else if (n * 2 > N) { return jStat.hypgeom.pdf(m - k, N, m, N - n) } else if (m < n) { return jStat.hypgeom.pdf(k, N, n, m) } else { var scaledPDF = 1; var samplesDone = 0; for (var i = 0; i < k; i++) { while (scaledPDF > 1 && samplesDone < n) { scaledPDF *= 1 - m / (N - samplesDone); samplesDone++ } scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1)) } for (; samplesDone < n; samplesDone++) { scaledPDF *= 1 - m / (N - samplesDone) } return Math.min(1, Math.max(0, scaledPDF)) } }, cdf: function cdf(x, N, m, n) { if (x < 0 || x < m - (N - n)) { return 0 } else if (x >= n || x >= m) { return 1 } else if (m * 2 > N) { if (n * 2 > N) { return jStat.hypgeom.cdf(N - m - n + x, N, N - m, N - n) } else { return 1 - jStat.hypgeom.cdf(n - x - 1, N, N - m, n) } } else if (n * 2 > N) { return 1 - jStat.hypgeom.cdf(m - x - 1, N, m, N - n) } else if (m < n) { return jStat.hypgeom.cdf(x, N, n, m) } else { var scaledCDF = 1; var scaledPDF = 1; var samplesDone = 0; for (var i = 0; i < x; i++) { while (scaledCDF > 1 && samplesDone < n) { var factor = 1 - m / (N - samplesDone); scaledPDF *= factor; scaledCDF *= factor; samplesDone++ } scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1)); scaledCDF += scaledPDF } for (; samplesDone < n; samplesDone++) { scaledCDF *= 1 - m / (N - samplesDone) } return Math.min(1, Math.max(0, scaledCDF)) } } }); jStat.extend(jStat.poisson, { pdf: function pdf(k, l) { if (l < 0 || k % 1 !== 0 || k < 0) { return 0 } return Math.pow(l, k) * Math.exp(-l) / jStat.factorial(k) }, cdf: function cdf(x, l) { var sumarr = [], k = 0; if (x < 0) return 0; for (; k <= x; k++) { sumarr.push(jStat.poisson.pdf(k, l)) } return jStat.sum(sumarr) }, mean: function (l) { return l }, variance: function (l) { return l }, sampleSmall: function sampleSmall(l) { var p = 1, k = 0, L = Math.exp(-l); do { k++; p *= jStat._random_fn() } while (p > L); return k - 1 }, sampleLarge: function sampleLarge(l) { var lam = l; var k; var U, V, slam, loglam, a, b, invalpha, vr, us; slam = Math.sqrt(lam); loglam = Math.log(lam); b = .931 + 2.53 * slam; a = -.059 + .02483 * b; invalpha = 1.1239 + 1.1328 / (b - 3.4); vr = .9277 - 3.6224 / (b - 2); while (1) { U = Math.random() - .5; V = Math.random(); us = .5 - Math.abs(U); k = Math.floor((2 * a / us + b) * U + lam + .43); if (us >= .07 && V <= vr) { return k } if (k < 0 || us < .013 && V > us) { continue } if (Math.log(V) + Math.log(invalpha) - Math.log(a / (us * us) + b) <= -lam + k * loglam - jStat.loggam(k + 1)) { return k } } }, sample: function sample(l) { if (l < 10) return this.sampleSmall(l); else return this.sampleLarge(l) } }); jStat.extend(jStat.triangular, { pdf: function pdf(x, a, b, c) { if (b <= a || c < a || c > b) { return NaN } else { if (x < a || x > b) { return 0 } else if (x < c) { return 2 * (x - a) / ((b - a) * (c - a)) } else if (x === c) { return 2 / (b - a) } else { return 2 * (b - x) / ((b - a) * (b - c)) } } }, cdf: function cdf(x, a, b, c) { if (b <= a || c < a || c > b) return NaN; if (x <= a) return 0; else if (x >= b) return 1; if (x <= c) return Math.pow(x - a, 2) / ((b - a) * (c - a)); else return 1 - Math.pow(b - x, 2) / ((b - a) * (b - c)) }, inv: function inv(p, a, b, c) { if (b <= a || c < a || c > b) { return NaN } else { if (p <= (c - a) / (b - a)) { return a + (b - a) * Math.sqrt(p * ((c - a) / (b - a))) } else { return a + (b - a) * (1 - Math.sqrt((1 - p) * (1 - (c - a) / (b - a)))) } } }, mean: function mean(a, b, c) { return (a + b + c) / 3 }, median: function median(a, b, c) { if (c <= (a + b) / 2) { return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2) } else if (c > (a + b) / 2) { return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2) } }, mode: function mode(a, b, c) { return c }, sample: function sample(a, b, c) { var u = jStat._random_fn(); if (u < (c - a) / (b - a)) return a + Math.sqrt(u * (b - a) * (c - a)); return b - Math.sqrt((1 - u) * (b - a) * (b - c)) }, variance: function variance(a, b, c) { return (a * a + b * b + c * c - a * b - a * c - b * c) / 18 } }); jStat.extend(jStat.arcsine, { pdf: function pdf(x, a, b) { if (b <= a) return NaN; return x <= a || x >= b ? 0 : 2 / Math.PI * Math.pow(Math.pow(b - a, 2) - Math.pow(2 * x - a - b, 2), -.5) }, cdf: function cdf(x, a, b) { if (x < a) return 0; else if (x < b) return 2 / Math.PI * Math.asin(Math.sqrt((x - a) / (b - a))); return 1 }, inv: function (p, a, b) { return a + (.5 - .5 * Math.cos(Math.PI * p)) * (b - a) }, mean: function mean(a, b) { if (b <= a) return NaN; return (a + b) / 2 }, median: function median(a, b) { if (b <= a) return NaN; return (a + b) / 2 }, mode: function mode() { throw new Error("mode is not yet implemented") }, sample: function sample(a, b) { return (a + b) / 2 + (b - a) / 2 * Math.sin(2 * Math.PI * jStat.uniform.sample(0, 1)) }, variance: function variance(a, b) { if (b <= a) return NaN; return Math.pow(b - a, 2) / 8 } }); function laplaceSign(x) { return x / Math.abs(x) } jStat.extend(jStat.laplace, { pdf: function pdf(x, mu, b) { return b <= 0 ? 0 : Math.exp(-Math.abs(x - mu) / b) / (2 * b) }, cdf: function cdf(x, mu, b) { if (b <= 0) { return 0 } if (x < mu) { return .5 * Math.exp((x - mu) / b) } else { return 1 - .5 * Math.exp(-(x - mu) / b) } }, mean: function (mu) { return mu }, median: function (mu) { return mu }, mode: function (mu) { return mu }, variance: function (mu, b) { return 2 * b * b }, sample: function sample(mu, b) { var u = jStat._random_fn() - .5; return mu - b * laplaceSign(u) * Math.log(1 - 2 * Math.abs(u)) } }); function tukeyWprob(w, rr, cc) { var nleg = 12; var ihalf = 6; var C1 = -30; var C2 = -50; var C3 = 60; var bb = 8; var wlar = 3; var wincr1 = 2; var wincr2 = 3; var xleg = [.9815606342467192, .9041172563704749, .7699026741943047, .5873179542866175, .3678314989981802, .1252334085114689]; var aleg = [.04717533638651183, .10693932599531843, .16007832854334622, .20316742672306592, .2334925365383548, .24914704581340277]; var qsqz = w * .5; if (qsqz >= bb) return 1; var pr_w = 2 * jStat.normal.cdf(qsqz, 0, 1, 1, 0) - 1; if (pr_w >= Math.exp(C2 / cc)) pr_w = Math.pow(pr_w, cc); else pr_w = 0; var wincr; if (w > wlar) wincr = wincr1; else wincr = wincr2; var blb = qsqz; var binc = (bb - qsqz) / wincr; var bub = blb + binc; var einsum = 0; var cc1 = cc - 1; for (var wi = 1; wi <= wincr; wi++) { var elsum = 0; var a = .5 * (bub + blb); var b = .5 * (bub - blb); for (var jj = 1; jj <= nleg; jj++) { var j, xx; if (ihalf < jj) { j = nleg - jj + 1; xx = xleg[j - 1] } else { j = jj; xx = -xleg[j - 1] } var c = b * xx; var ac = a + c; var qexpo = ac * ac; if (qexpo > C3) break; var pplus = 2 * jStat.normal.cdf(ac, 0, 1, 1, 0); var pminus = 2 * jStat.normal.cdf(ac, w, 1, 1, 0); var rinsum = pplus * .5 - pminus * .5; if (rinsum >= Math.exp(C1 / cc1)) { rinsum = aleg[j - 1] * Math.exp(-(.5 * qexpo)) * Math.pow(rinsum, cc1); elsum += rinsum } } elsum *= 2 * b * cc / Math.sqrt(2 * Math.PI); einsum += elsum; blb = bub; bub += binc } pr_w += einsum; if (pr_w <= Math.exp(C1 / rr)) return 0; pr_w = Math.pow(pr_w, rr); if (pr_w >= 1) return 1; return pr_w } function tukeyQinv(p, c, v) { var p0 = .322232421088; var q0 = .099348462606; var p1 = -1; var q1 = .588581570495; var p2 = -.342242088547; var q2 = .531103462366; var p3 = -.204231210125; var q3 = .10353775285; var p4 = -453642210148e-16; var q4 = .0038560700634; var c1 = .8832; var c2 = .2368; var c3 = 1.214; var c4 = 1.208; var c5 = 1.4142; var vmax = 120; var ps = .5 - .5 * p; var yi = Math.sqrt(Math.log(1 / (ps * ps))); var t = yi + ((((yi * p4 + p3) * yi + p2) * yi + p1) * yi + p0) / ((((yi * q4 + q3) * yi + q2) * yi + q1) * yi + q0); if (v < vmax) t += (t * t * t + t) / v / 4; var q = c1 - c2 * t; if (v < vmax) q += -c3 / v + c4 * t / v; return t * (q * Math.log(c - 1) + c5) } jStat.extend(jStat.tukey, { cdf: function cdf(q, nmeans, df) { var rr = 1; var cc = nmeans; var nlegq = 16; var ihalfq = 8; var eps1 = -30; var eps2 = 1e-14; var dhaf = 100; var dquar = 800; var deigh = 5e3; var dlarg = 25e3; var ulen1 = 1; var ulen2 = .5; var ulen3 = .25; var ulen4 = .125; var xlegq = [.9894009349916499, .9445750230732326, .8656312023878318, .755404408355003, .6178762444026438, .45801677765722737, .2816035507792589, .09501250983763744]; var alegq = [.027152459411754096, .062253523938647894, .09515851168249279, .12462897125553388, .14959598881657674, .16915651939500254, .18260341504492358, .1894506104550685]; if (q <= 0) return 0; if (df < 2 || rr < 1 || cc < 2) return NaN; if (!Number.isFinite(q)) return 1; if (df > dlarg) return tukeyWprob(q, rr, cc); var f2 = df * .5; var f2lf = f2 * Math.log(df) - df * Math.log(2) - jStat.gammaln(f2); var f21 = f2 - 1; var ff4 = df * .25; var ulen; if (df <= dhaf) ulen = ulen1; else if (df <= dquar) ulen = ulen2; else if (df <= deigh) ulen = ulen3; else ulen = ulen4; f2lf += Math.log(ulen); var ans = 0; for (var i = 1; i <= 50; i++) { var otsum = 0; var twa1 = (2 * i - 1) * ulen; for (var jj = 1; jj <= nlegq; jj++) { var j, t1; if (ihalfq < jj) { j = jj - ihalfq - 1; t1 = f2lf + f21 * Math.log(twa1 + xlegq[j] * ulen) - (xlegq[j] * ulen + twa1) * ff4 } else { j = jj - 1; t1 = f2lf + f21 * Math.log(twa1 - xlegq[j] * ulen) + (xlegq[j] * ulen - twa1) * ff4 } var qsqz; if (t1 >= eps1) { if (ihalfq < jj) { qsqz = q * Math.sqrt((xlegq[j] * ulen + twa1) * .5) } else { qsqz = q * Math.sqrt((-(xlegq[j] * ulen) + twa1) * .5) } var wprb = tukeyWprob(qsqz, rr, cc); var rotsum = wprb * alegq[j] * Math.exp(t1); otsum += rotsum } } if (i * ulen >= 1 && otsum <= eps2) break; ans += otsum } if (otsum > eps2) { throw new Error("tukey.cdf failed to converge") } if (ans > 1) ans = 1; return ans }, inv: function (p, nmeans, df) { var rr = 1; var cc = nmeans; var eps = 1e-4; var maxiter = 50; if (df < 2 || rr < 1 || cc < 2) return NaN; if (p < 0 || p > 1) return NaN; if (p === 0) return 0; if (p === 1) return Infinity; var x0 = tukeyQinv(p, cc, df); var valx0 = jStat.tukey.cdf(x0, nmeans, df) - p; var x1; if (valx0 > 0) x1 = Math.max(0, x0 - 1); else x1 = x0 + 1; var valx1 = jStat.tukey.cdf(x1, nmeans, df) - p; var ans; for (var iter = 1; iter < maxiter; iter++) { ans = x1 - valx1 * (x1 - x0) / (valx1 - valx0); valx0 = valx1; x0 = x1; if (ans < 0) { ans = 0; valx1 = -p } valx1 = jStat.tukey.cdf(ans, nmeans, df) - p; x1 = ans; var xabs = Math.abs(x1 - x0); if (xabs < eps) return ans } throw new Error("tukey.inv failed to converge") } }) })(jStat, Math); (function (jStat, Math) { var push = Array.prototype.push; var isArray = jStat.utils.isArray; function isUsable(arg) { return isArray(arg) || arg instanceof jStat } jStat.extend({ add: function add(arr, arg) { if (isUsable(arg)) { if (!isUsable(arg[0])) arg = [arg]; return jStat.map(arr, function (value, row, col) { return value + arg[row][col] }) } return jStat.map(arr, function (value) { return value + arg }) }, subtract: function subtract(arr, arg) { if (isUsable(arg)) { if (!isUsable(arg[0])) arg = [arg]; return jStat.map(arr, function (value, row, col) { return value - arg[row][col] || 0 }) } return jStat.map(arr, function (value) { return value - arg }) }, divide: function divide(arr, arg) { if (isUsable(arg)) { if (!isUsable(arg[0])) arg = [arg]; return jStat.multiply(arr, jStat.inv(arg)) } return jStat.map(arr, function (value) { return value / arg }) }, multiply: function multiply(arr, arg) { var row, col, nrescols, sum, nrow, ncol, res, rescols; if (arr.length === undefined && arg.length === undefined) { return arr * arg } nrow = arr.length, ncol = arr[0].length, res = jStat.zeros(nrow, nrescols = isUsable(arg) ? arg[0].length : ncol), rescols = 0; if (isUsable(arg)) { for (; rescols < nrescols; rescols++) { for (row = 0; row < nrow; row++) { sum = 0; for (col = 0; col < ncol; col++)sum += arr[row][col] * arg[col][rescols]; res[row][rescols] = sum } } return nrow === 1 && rescols === 1 ? res[0][0] : res } return jStat.map(arr, function (value) { return value * arg }) }, outer: function outer(A, B) { return jStat.multiply(A.map(function (t) { return [t] }), [B]) }, dot: function dot(arr, arg) { if (!isUsable(arr[0])) arr = [arr]; if (!isUsable(arg[0])) arg = [arg]; var left = arr[0].length === 1 && arr.length !== 1 ? jStat.transpose(arr) : arr, right = arg[0].length === 1 && arg.length !== 1 ? jStat.transpose(arg) : arg, res = [], row = 0, nrow = left.length, ncol = left[0].length, sum, col; for (; row < nrow; row++) { res[row] = []; sum = 0; for (col = 0; col < ncol; col++)sum += left[row][col] * right[row][col]; res[row] = sum } return res.length === 1 ? res[0] : res }, pow: function pow(arr, arg) { return jStat.map(arr, function (value) { return Math.pow(value, arg) }) }, exp: function exp(arr) { return jStat.map(arr, function (value) { return Math.exp(value) }) }, log: function exp(arr) { return jStat.map(arr, function (value) { return Math.log(value) }) }, abs: function abs(arr) { return jStat.map(arr, function (value) { return Math.abs(value) }) }, norm: function norm(arr, p) { var nnorm = 0, i = 0; if (isNaN(p)) p = 2; if (isUsable(arr[0])) arr = arr[0]; for (; i < arr.length; i++) { nnorm += Math.pow(Math.abs(arr[i]), p) } return Math.pow(nnorm, 1 / p) }, angle: function angle(arr, arg) { return Math.acos(jStat.dot(arr, arg) / (jStat.norm(arr) * jStat.norm(arg))) }, aug: function aug(a, b) { var newarr = []; var i; for (i = 0; i < a.length; i++) { newarr.push(a[i].slice()) } for (i = 0; i < newarr.length; i++) { push.apply(newarr[i], b[i]) } return newarr }, inv: function inv(a) { var rows = a.length; var cols = a[0].length; var b = jStat.identity(rows, cols); var c = jStat.gauss_jordan(a, b); var result = []; var i = 0; var j; for (; i < rows; i++) { result[i] = []; for (j = cols; j < c[0].length; j++)result[i][j - cols] = c[i][j] } return result }, det: function det(a) { var alen = a.length, alend = alen * 2, vals = new Array(alend), rowshift = alen - 1, colshift = alend - 1, mrow = rowshift - alen + 1, mcol = colshift, i = 0, result = 0, j; if (alen === 2) { return a[0][0] * a[1][1] - a[0][1] * a[1][0] } for (; i < alend; i++) { vals[i] = 1 } for (i = 0; i < alen; i++) { for (j = 0; j < alen; j++) { vals[mrow < 0 ? mrow + alen : mrow] *= a[i][j]; vals[mcol < alen ? mcol + alen : mcol] *= a[i][j]; mrow++; mcol-- } mrow = --rowshift - alen + 1; mcol = --colshift } for (i = 0; i < alen; i++) { result += vals[i] } for (; i < alend; i++) { result -= vals[i] } return result }, gauss_elimination: function gauss_elimination(a, b) { var i = 0, j = 0, n = a.length, m = a[0].length, factor = 1, sum = 0, x = [], maug, pivot, temp, k; a = jStat.aug(a, b); maug = a[0].length; for (i = 0; i < n; i++) { pivot = a[i][i]; j = i; for (k = i + 1; k < m; k++) { if (pivot < Math.abs(a[k][i])) { pivot = a[k][i]; j = k } } if (j != i) { for (k = 0; k < maug; k++) { temp = a[i][k]; a[i][k] = a[j][k]; a[j][k] = temp } } for (j = i + 1; j < n; j++) { factor = a[j][i] / a[i][i]; for (k = i; k < maug; k++) { a[j][k] = a[j][k] - factor * a[i][k] } } } for (i = n - 1; i >= 0; i--) { sum = 0; for (j = i + 1; j <= n - 1; j++) { sum = sum + x[j] * a[i][j] } x[i] = (a[i][maug - 1] - sum) / a[i][i] } return x }, gauss_jordan: function gauss_jordan(a, b) { var m = jStat.aug(a, b); var h = m.length; var w = m[0].length; var c = 0; var x, y, y2; for (y = 0; y < h; y++) { var maxrow = y; for (y2 = y + 1; y2 < h; y2++) { if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y])) maxrow = y2 } var tmp = m[y]; m[y] = m[maxrow]; m[maxrow] = tmp; for (y2 = y + 1; y2 < h; y2++) { c = m[y2][y] / m[y][y]; for (x = y; x < w; x++) { m[y2][x] -= m[y][x] * c } } } for (y = h - 1; y >= 0; y--) { c = m[y][y]; for (y2 = 0; y2 < y; y2++) { for (x = w - 1; x > y - 1; x--) { m[y2][x] -= m[y][x] * m[y2][y] / c } } m[y][y] /= c; for (x = h; x < w; x++) { m[y][x] /= c } } return m }, triaUpSolve: function triaUpSolve(A, b) { var size = A[0].length; var x = jStat.zeros(1, size)[0]; var parts; var matrix_mode = false; if (b[0].length != undefined) { b = b.map(function (i) { return i[0] }); matrix_mode = true } jStat.arange(size - 1, -1, -1).forEach(function (i) { parts = jStat.arange(i + 1, size).map(function (j) { return x[j] * A[i][j] }); x[i] = (b[i] - jStat.sum(parts)) / A[i][i] }); if (matrix_mode) return x.map(function (i) { return [i] }); return x }, triaLowSolve: function triaLowSolve(A, b) { var size = A[0].length; var x = jStat.zeros(1, size)[0]; var parts; var matrix_mode = false; if (b[0].length != undefined) { b = b.map(function (i) { return i[0] }); matrix_mode = true } jStat.arange(size).forEach(function (i) { parts = jStat.arange(i).map(function (j) { return A[i][j] * x[j] }); x[i] = (b[i] - jStat.sum(parts)) / A[i][i] }); if (matrix_mode) return x.map(function (i) { return [i] }); return x }, lu: function lu(A) { var size = A.length; var L = jStat.identity(size); var R = jStat.zeros(A.length, A[0].length); var parts; jStat.arange(size).forEach(function (t) { R[0][t] = A[0][t] }); jStat.arange(1, size).forEach(function (l) { jStat.arange(l).forEach(function (i) { parts = jStat.arange(i).map(function (jj) { return L[l][jj] * R[jj][i] }); L[l][i] = (A[l][i] - jStat.sum(parts)) / R[i][i] }); jStat.arange(l, size).forEach(function (j) { parts = jStat.arange(l).map(function (jj) { return L[l][jj] * R[jj][j] }); R[l][j] = A[parts.length][j] - jStat.sum(parts) }) }); return [L, R] }, cholesky: function cholesky(A) { var size = A.length; var T = jStat.zeros(A.length, A[0].length); var parts; jStat.arange(size).forEach(function (i) { parts = jStat.arange(i).map(function (t) { return Math.pow(T[i][t], 2) }); T[i][i] = Math.sqrt(A[i][i] - jStat.sum(parts)); jStat.arange(i + 1, size).forEach(function (j) { parts = jStat.arange(i).map(function (t) { return T[i][t] * T[j][t] }); T[j][i] = (A[i][j] - jStat.sum(parts)) / T[i][i] }) }); return T }, gauss_jacobi: function gauss_jacobi(a, b, x, r) { var i = 0; var j = 0; var n = a.length; var l = []; var u = []; var d = []; var xv, c, h, xk; for (; i < n; i++) { l[i] = []; u[i] = []; d[i] = []; for (j = 0; j < n; j++) { if (i > j) { l[i][j] = a[i][j]; u[i][j] = d[i][j] = 0 } else if (i < j) { u[i][j] = a[i][j]; l[i][j] = d[i][j] = 0 } else { d[i][j] = a[i][j]; l[i][j] = u[i][j] = 0 } } } h = jStat.multiply(jStat.multiply(jStat.inv(d), jStat.add(l, u)), -1); c = jStat.multiply(jStat.inv(d), b); xv = x; xk = jStat.add(jStat.multiply(h, x), c); i = 2; while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) { xv = xk; xk = jStat.add(jStat.multiply(h, xv), c); i++ } return xk }, gauss_seidel: function gauss_seidel(a, b, x, r) { var i = 0; var n = a.length; var l = []; var u = []; var d = []; var j, xv, c, h, xk; for (; i < n; i++) { l[i] = []; u[i] = []; d[i] = []; for (j = 0; j < n; j++) { if (i > j) { l[i][j] = a[i][j]; u[i][j] = d[i][j] = 0 } else if (i < j) { u[i][j] = a[i][j]; l[i][j] = d[i][j] = 0 } else { d[i][j] = a[i][j]; l[i][j] = u[i][j] = 0 } } } h = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d, l)), u), -1); c = jStat.multiply(jStat.inv(jStat.add(d, l)), b); xv = x; xk = jStat.add(jStat.multiply(h, x), c); i = 2; while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) { xv = xk; xk = jStat.add(jStat.multiply(h, xv), c); i = i + 1 } return xk }, SOR: function SOR(a, b, x, r, w) { var i = 0; var n = a.length; var l = []; var u = []; var d = []; var j, xv, c, h, xk; for (; i < n; i++) { l[i] = []; u[i] = []; d[i] = []; for (j = 0; j < n; j++) { if (i > j) { l[i][j] = a[i][j]; u[i][j] = d[i][j] = 0 } else if (i < j) { u[i][j] = a[i][j]; l[i][j] = d[i][j] = 0 } else { d[i][j] = a[i][j]; l[i][j] = u[i][j] = 0 } } } h = jStat.multiply(jStat.inv(jStat.add(d, jStat.multiply(l, w))), jStat.subtract(jStat.multiply(d, 1 - w), jStat.multiply(u, w))); c = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d, jStat.multiply(l, w))), b), w); xv = x; xk = jStat.add(jStat.multiply(h, x), c); i = 2; while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) { xv = xk; xk = jStat.add(jStat.multiply(h, xv), c); i++ } return xk }, householder: function householder(a) { var m = a.length; var n = a[0].length; var i = 0; var w = []; var p = []; var alpha, r, k, j, factor; for (; i < m - 1; i++) { alpha = 0; for (j = i + 1; j < n; j++)alpha += a[j][i] * a[j][i]; factor = a[i + 1][i] > 0 ? -1 : 1; alpha = factor * Math.sqrt(alpha); r = Math.sqrt((alpha * alpha - a[i + 1][i] * alpha) / 2); w = jStat.zeros(m, 1); w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r); for (k = i + 2; k < m; k++)w[k][0] = a[k][i] / (2 * r); p = jStat.subtract(jStat.identity(m, n), jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2)); a = jStat.multiply(p, jStat.multiply(a, p)) } return a }, QR: function () { var sum = jStat.sum; var range = jStat.arange; function qr2(x) { var n = x.length; var p = x[0].length; var r = jStat.zeros(p, p); x = jStat.copy(x); var i, j, k; for (j = 0; j < p; j++) { r[j][j] = Math.sqrt(sum(range(n).map(function (i) { return x[i][j] * x[i][j] }))); for (i = 0; i < n; i++) { x[i][j] = x[i][j] / r[j][j] } for (k = j + 1; k < p; k++) { r[j][k] = sum(range(n).map(function (i) { return x[i][j] * x[i][k] })); for (i = 0; i < n; i++) { x[i][k] = x[i][k] - x[i][j] * r[j][k] } } } return [x, r] } return qr2 }(), lstsq: function () { function R_I(A) { A = jStat.copy(A); var size = A.length; var I = jStat.identity(size); jStat.arange(size - 1, -1, -1).forEach(function (i) { jStat.sliceAssign(I, { row: i }, jStat.divide(jStat.slice(I, { row: i }), A[i][i])); jStat.sliceAssign(A, { row: i }, jStat.divide(jStat.slice(A, { row: i }), A[i][i])); jStat.arange(i).forEach(function (j) { var c = jStat.multiply(A[j][i], -1); var Aj = jStat.slice(A, { row: j }); var cAi = jStat.multiply(jStat.slice(A, { row: i }), c); jStat.sliceAssign(A, { row: j }, jStat.add(Aj, cAi)); var Ij = jStat.slice(I, { row: j }); var cIi = jStat.multiply(jStat.slice(I, { row: i }), c); jStat.sliceAssign(I, { row: j }, jStat.add(Ij, cIi)) }) }); return I } function qr_solve(A, b) { var array_mode = false; if (b[0].length === undefined) { b = b.map(function (x) { return [x] }); array_mode = true } var QR = jStat.QR(A); var Q = QR[0]; var R = QR[1]; var attrs = A[0].length; var Q1 = jStat.slice(Q, { col: { end: attrs } }); var R1 = jStat.slice(R, { row: { end: attrs } }); var RI = R_I(R1); var Q2 = jStat.transpose(Q1); if (Q2[0].length === undefined) { Q2 = [Q2] } var x = jStat.multiply(jStat.multiply(RI, Q2), b); if (x.length === undefined) { x = [[x]] } if (array_mode) return x.map(function (i) { return i[0] }); return x } return qr_solve }(), jacobi: function jacobi(a) { var condition = 1; var n = a.length; var e = jStat.identity(n, n); var ev = []; var b, i, j, p, q, maxim, theta, s; while (condition === 1) { maxim = a[0][1]; p = 0; q = 1; for (i = 0; i < n; i++) { for (j = 0; j < n; j++) { if (i != j) { if (maxim < Math.abs(a[i][j])) { maxim = Math.abs(a[i][j]); p = i; q = j } } } } if (a[p][p] === a[q][q]) theta = a[p][q] > 0 ? Math.PI / 4 : -Math.PI / 4; else theta = Math.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2; s = jStat.identity(n, n); s[p][p] = Math.cos(theta); s[p][q] = -Math.sin(theta); s[q][p] = Math.sin(theta); s[q][q] = Math.cos(theta); e = jStat.multiply(e, s); b = jStat.multiply(jStat.multiply(jStat.inv(s), a), s); a = b; condition = 0; for (i = 1; i < n; i++) { for (j = 1; j < n; j++) { if (i != j && Math.abs(a[i][j]) > .001) { condition = 1 } } } } for (i = 0; i < n; i++)ev.push(a[i][i]); return [e, ev] }, rungekutta: function rungekutta(f, h, p, t_j, u_j, order) { var k1, k2, u_j1, k3, k4; if (order === 2) { while (t_j <= p) { k1 = h * f(t_j, u_j); k2 = h * f(t_j + h, u_j + k1); u_j1 = u_j + (k1 + k2) / 2; u_j = u_j1; t_j = t_j + h } } if (order === 4) { while (t_j <= p) { k1 = h * f(t_j, u_j); k2 = h * f(t_j + h / 2, u_j + k1 / 2); k3 = h * f(t_j + h / 2, u_j + k2 / 2); k4 = h * f(t_j + h, u_j + k3); u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6; u_j = u_j1; t_j = t_j + h } } return u_j }, romberg: function romberg(f, a, b, order) { var i = 0; var h = (b - a) / 2; var x = []; var h1 = []; var g = []; var m, a1, j, k, I; while (i < order / 2) { I = f(a); for (j = a, k = 0; j <= b; j = j + h, k++)x[k] = j; m = x.length; for (j = 1; j < m - 1; j++) { I += (j % 2 !== 0 ? 4 : 2) * f(x[j]) } I = h / 3 * (I + f(b)); g[i] = I; h /= 2; i++ } a1 = g.length; m = 1; while (a1 !== 1) { for (j = 0; j < a1 - 1; j++)h1[j] = (Math.pow(4, m) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1); a1 = h1.length; g = h1; h1 = []; m++ } return g }, richardson: function richardson(X, f, x, h) { function pos(X, x) { var i = 0; var n = X.length; var p; for (; i < n; i++)if (X[i] === x) p = i; return p } var h_min = Math.abs(x - X[pos(X, x) + 1]); var i = 0; var g = []; var h1 = []; var y1, y2, m, a, j; while (h >= h_min) { y1 = pos(X, x + h); y2 = pos(X, x); g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h); h /= 2; i++ } a = g.length; m = 1; while (a != 1) { for (j = 0; j < a - 1; j++)h1[j] = (Math.pow(4, m) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1); a = h1.length; g = h1; h1 = []; m++ } return g }, simpson: function simpson(f, a, b, n) { var h = (b - a) / n; var I = f(a); var x = []; var j = a; var k = 0; var i = 1; var m; for (; j <= b; j = j + h, k++)x[k] = j; m = x.length; for (; i < m - 1; i++) { I += (i % 2 !== 0 ? 4 : 2) * f(x[i]) } return h / 3 * (I + f(b)) }, hermite: function hermite(X, F, dF, value) { var n = X.length; var p = 0; var i = 0; var l = []; var dl = []; var A = []; var B = []; var j; for (; i < n; i++) { l[i] = 1; for (j = 0; j < n; j++) { if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]) } dl[i] = 0; for (j = 0; j < n; j++) { if (i != j) dl[i] += 1 / (X[i] - X[j]) } A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]); B[i] = (value - X[i]) * (l[i] * l[i]); p += A[i] * F[i] + B[i] * dF[i] } return p }, lagrange: function lagrange(X, F, value) { var p = 0; var i = 0; var j, l; var n = X.length; for (; i < n; i++) { l = F[i]; for (j = 0; j < n; j++) { if (i != j) l *= (value - X[j]) / (X[i] - X[j]) } p += l } return p }, cubic_spline: function cubic_spline(X, F, value) { var n = X.length; var i = 0, j; var A = []; var B = []; var alpha = []; var c = []; var h = []; var b = []; var d = []; for (; i < n - 1; i++)h[i] = X[i + 1] - X[i]; alpha[0] = 0; for (i = 1; i < n - 1; i++) { alpha[i] = 3 / h[i] * (F[i + 1] - F[i]) - 3 / h[i - 1] * (F[i] - F[i - 1]) } for (i = 1; i < n - 1; i++) { A[i] = []; B[i] = []; A[i][i - 1] = h[i - 1]; A[i][i] = 2 * (h[i - 1] + h[i]); A[i][i + 1] = h[i]; B[i][0] = alpha[i] } c = jStat.multiply(jStat.inv(A), B); for (j = 0; j < n - 1; j++) { b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3; d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]) } for (j = 0; j < n; j++) { if (X[j] > value) break } j -= 1; return F[j] + (value - X[j]) * b[j] + jStat.sq(value - X[j]) * c[j] + (value - X[j]) * jStat.sq(value - X[j]) * d[j] }, gauss_quadrature: function gauss_quadrature() { throw new Error("gauss_quadrature not yet implemented") }, PCA: function PCA(X) { var m = X.length; var n = X[0].length; var i = 0; var j, temp1; var u = []; var D = []; var result = []; var temp2 = []; var Y = []; var Bt = []; var B = []; var C = []; var V = []; var Vt = []; for (i = 0; i < m; i++) { u[i] = jStat.sum(X[i]) / n } for (i = 0; i < n; i++) { B[i] = []; for (j = 0; j < m; j++) { B[i][j] = X[j][i] - u[j] } } B = jStat.transpose(B); for (i = 0; i < m; i++) { C[i] = []; for (j = 0; j < m; j++) { C[i][j] = jStat.dot([B[i]], [B[j]]) / (n - 1) } } result = jStat.jacobi(C); V = result[0]; D = result[1]; Vt = jStat.transpose(V); for (i = 0; i < D.length; i++) { for (j = i; j < D.length; j++) { if (D[i] < D[j]) { temp1 = D[i]; D[i] = D[j]; D[j] = temp1; temp2 = Vt[i]; Vt[i] = Vt[j]; Vt[j] = temp2 } } } Bt = jStat.transpose(B); for (i = 0; i < m; i++) { Y[i] = []; for (j = 0; j < Bt.length; j++) { Y[i][j] = jStat.dot([Vt[i]], [Bt[j]]) } } return [X, D, Vt, Y] } }); (function (funcs) { for (var i = 0; i < funcs.length; i++)(function (passfunc) { jStat.fn[passfunc] = function (arg, func) { var tmpthis = this; if (func) { setTimeout(function () { func.call(tmpthis, jStat.fn[passfunc].call(tmpthis, arg)) }, 15); return this } if (typeof jStat[passfunc](this, arg) === "number") return jStat[passfunc](this, arg); else return jStat(jStat[passfunc](this, arg)) } })(funcs[i]) })("add divide multiply subtract dot pow exp log abs norm angle".split(" ")) })(jStat, Math); (function (jStat, Math) { var slice = [].slice; var isNumber = jStat.utils.isNumber; var isArray = jStat.utils.isArray; jStat.extend({ zscore: function zscore() { var args = slice.call(arguments); if (isNumber(args[1])) { return (args[0] - args[1]) / args[2] } return (args[0] - jStat.mean(args[1])) / jStat.stdev(args[1], args[2]) }, ztest: function ztest() { var args = slice.call(arguments); var z; if (isArray(args[1])) { z = jStat.zscore(args[0], args[1], args[3]); return args[2] === 1 ? jStat.normal.cdf(-Math.abs(z), 0, 1) : jStat.normal.cdf(-Math.abs(z), 0, 1) * 2 } else { if (args.length > 2) { z = jStat.zscore(args[0], args[1], args[2]); return args[3] === 1 ? jStat.normal.cdf(-Math.abs(z), 0, 1) : jStat.normal.cdf(-Math.abs(z), 0, 1) * 2 } else { z = args[0]; return args[1] === 1 ? jStat.normal.cdf(-Math.abs(z), 0, 1) : jStat.normal.cdf(-Math.abs(z), 0, 1) * 2 } } } }); jStat.extend(jStat.fn, { zscore: function zscore(value, flag) { return (value - this.mean()) / this.stdev(flag) }, ztest: function ztest(value, sides, flag) { var zscore = Math.abs(this.zscore(value, flag)); return sides === 1 ? jStat.normal.cdf(-zscore, 0, 1) : jStat.normal.cdf(-zscore, 0, 1) * 2 } }); jStat.extend({ tscore: function tscore() { var args = slice.call(arguments); return args.length === 4 ? (args[0] - args[1]) / (args[2] / Math.sqrt(args[3])) : (args[0] - jStat.mean(args[1])) / (jStat.stdev(args[1], true) / Math.sqrt(args[1].length)) }, ttest: function ttest() { var args = slice.call(arguments); var tscore; if (args.length === 5) { tscore = Math.abs(jStat.tscore(args[0], args[1], args[2], args[3])); return args[4] === 1 ? jStat.studentt.cdf(-tscore, args[3] - 1) : jStat.studentt.cdf(-tscore, args[3] - 1) * 2 } if (isNumber(args[1])) { tscore = Math.abs(args[0]); return args[2] == 1 ? jStat.studentt.cdf(-tscore, args[1] - 1) : jStat.studentt.cdf(-tscore, args[1] - 1) * 2 } tscore = Math.abs(jStat.tscore(args[0], args[1])); return args[2] == 1 ? jStat.studentt.cdf(-tscore, args[1].length - 1) : jStat.studentt.cdf(-tscore, args[1].length - 1) * 2 } }); jStat.extend(jStat.fn, { tscore: function tscore(value) { return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols())) }, ttest: function ttest(value, sides) { return sides === 1 ? 1 - jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols() - 1) : jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols() - 1) * 2 } }); jStat.extend({ anovafscore: function anovafscore() { var args = slice.call(arguments), expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j; if (args.length === 1) { tmpargs = new Array(args[0].length); for (i = 0; i < args[0].length; i++) { tmpargs[i] = args[0][i] } args = tmpargs } sample = new Array; for (i = 0; i < args.length; i++) { sample = sample.concat(args[i]) } sampMean = jStat.mean(sample); expVar = 0; for (i = 0; i < args.length; i++) { expVar = expVar + args[i].length * Math.pow(jStat.mean(args[i]) - sampMean, 2) } expVar /= args.length - 1; unexpVar = 0; for (i = 0; i < args.length; i++) { sampSampMean = jStat.mean(args[i]); for (j = 0; j < args[i].length; j++) { unexpVar += Math.pow(args[i][j] - sampSampMean, 2) } } unexpVar /= sample.length - args.length; return expVar / unexpVar }, anovaftest: function anovaftest() { var args = slice.call(arguments), df1, df2, n, i; if (isNumber(args[0])) { return 1 - jStat.centralF.cdf(args[0], args[1], args[2]) } var anovafscore = jStat.anovafscore(args); df1 = args.length - 1; n = 0; for (i = 0; i < args.length; i++) { n = n + args[i].length } df2 = n - df1 - 1; return 1 - jStat.centralF.cdf(anovafscore, df1, df2) }, ftest: function ftest(fscore, df1, df2) { return 1 - jStat.centralF.cdf(fscore, df1, df2) } }); jStat.extend(jStat.fn, { anovafscore: function anovafscore() { return jStat.anovafscore(this.toArray()) }, anovaftes: function anovaftes() { var n = 0; var i; for (i = 0; i < this.length; i++) { n = n + this[i].length } return jStat.ftest(this.anovafscore(), this.length - 1, n - this.length) } }); jStat.extend({ qscore: function qscore() { var args = slice.call(arguments); var mean1, mean2, n1, n2, sd; if (isNumber(args[0])) { mean1 = args[0]; mean2 = args[1]; n1 = args[2]; n2 = args[3]; sd = args[4] } else { mean1 = jStat.mean(args[0]); mean2 = jStat.mean(args[1]); n1 = args[0].length; n2 = args[1].length; sd = args[2] } return Math.abs(mean1 - mean2) / (sd * Math.sqrt((1 / n1 + 1 / n2) / 2)) }, qtest: function qtest() { var args = slice.call(arguments); var qscore; if (args.length === 3) { qscore = args[0]; args = args.slice(1) } else if (args.length === 7) { qscore = jStat.qscore(args[0], args[1], args[2], args[3], args[4]); args = args.slice(5) } else { qscore = jStat.qscore(args[0], args[1], args[2]); args = args.slice(3) } var n = args[0]; var k = args[1]; return 1 - jStat.tukey.cdf(qscore, k, n - k) }, tukeyhsd: function tukeyhsd(arrays) { var sd = jStat.pooledstdev(arrays); var means = arrays.map(function (arr) { return jStat.mean(arr) }); var n = arrays.reduce(function (n, arr) { return n + arr.length }, 0); var results = []; for (var i = 0; i < arrays.length; ++i) { for (var j = i + 1; j < arrays.length; ++j) { var p = jStat.qtest(means[i], means[j], arrays[i].length, arrays[j].length, sd, n, arrays.length); results.push([[i, j], p]) } } return results } }); jStat.extend({ normalci: function normalci() { var args = slice.call(arguments), ans = new Array(2), change; if (args.length === 4) { change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) * args[2] / Math.sqrt(args[3])) } else { change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) * jStat.stdev(args[2]) / Math.sqrt(args[2].length)) } ans[0] = args[0] - change; ans[1] = args[0] + change; return ans }, tci: function tci() { var args = slice.call(arguments), ans = new Array(2), change; if (args.length === 4) { change = Math.abs(jStat.studentt.inv(args[1] / 2, args[3] - 1) * args[2] / Math.sqrt(args[3])) } else { change = Math.abs(jStat.studentt.inv(args[1] / 2, args[2].length - 1) * jStat.stdev(args[2], true) / Math.sqrt(args[2].length)) } ans[0] = args[0] - change; ans[1] = args[0] + change; return ans }, significant: function significant(pvalue, alpha) { return pvalue < alpha } }); jStat.extend(jStat.fn, { normalci: function normalci(value, alpha) { return jStat.normalci(value, alpha, this.toArray()) }, tci: function tci(value, alpha) { return jStat.tci(value, alpha, this.toArray()) } }); function differenceOfProportions(p1, n1, p2, n2) { if (p1 > 1 || p2 > 1 || p1 <= 0 || p2 <= 0) { throw new Error("Proportions should be greater than 0 and less than 1") } var pooled = (p1 * n1 + p2 * n2) / (n1 + n2); var se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2)); return (p1 - p2) / se } jStat.extend(jStat.fn, { oneSidedDifferenceOfProportions: function oneSidedDifferenceOfProportions(p1, n1, p2, n2) { var z = differenceOfProportions(p1, n1, p2, n2); return jStat.ztest(z, 1) }, twoSidedDifferenceOfProportions: function twoSidedDifferenceOfProportions(p1, n1, p2, n2) { var z = differenceOfProportions(p1, n1, p2, n2); return jStat.ztest(z, 2) } }) })(jStat, Math); jStat.models = function () { function sub_regress(exog) { var var_count = exog[0].length; var modelList = jStat.arange(var_count).map(function (endog_index) { var exog_index = jStat.arange(var_count).filter(function (i) { return i !== endog_index }); return ols(jStat.col(exog, endog_index).map(function (x) { return x[0] }), jStat.col(exog, exog_index)) }); return modelList } function ols(endog, exog) { var nobs = endog.length; var df_model = exog[0].length - 1; var df_resid = nobs - df_model - 1; var coef = jStat.lstsq(exog, endog); var predict = jStat.multiply(exog, coef.map(function (x) { return [x] })).map(function (p) { return p[0] }); var resid = jStat.subtract(endog, predict); var ybar = jStat.mean(endog); var SSE = jStat.sum(predict.map(function (f) { return Math.pow(f - ybar, 2) })); var SSR = jStat.sum(endog.map(function (y, i) { return Math.pow(y - predict[i], 2) })); var SST = SSE + SSR; var R2 = SSE / SST; return { exog: exog, endog: endog, nobs: nobs, df_model: df_model, df_resid: df_resid, coef: coef, predict: predict, resid: resid, ybar: ybar, SST: SST, SSE: SSE, SSR: SSR, R2: R2 } } function t_test(model) { var subModelList = sub_regress(model.exog); var sigmaHat = Math.sqrt(model.SSR / model.df_resid); var seBetaHat = subModelList.map(function (mod) { var SST = mod.SST; var R2 = mod.R2; return sigmaHat / Math.sqrt(SST * (1 - R2)) }); var tStatistic = model.coef.map(function (coef, i) { return (coef - 0) / seBetaHat[i] }); var pValue = tStatistic.map(function (t) { var leftppf = jStat.studentt.cdf(t, model.df_resid); return (leftppf > .5 ? 1 - leftppf : leftppf) * 2 }); var c = jStat.studentt.inv(.975, model.df_resid); var interval95 = model.coef.map(function (coef, i) { var d = c * seBetaHat[i]; return [coef - d, coef + d] }); return { se: seBetaHat, t: tStatistic, p: pValue, sigmaHat: sigmaHat, interval95: interval95 } } function F_test(model) { var F_statistic = model.R2 / model.df_model / ((1 - model.R2) / model.df_resid); var fcdf = function (x, n1, n2) { return jStat.beta.cdf(x / (n2 / n1 + x), n1 / 2, n2 / 2) }; var pvalue = 1 - fcdf(F_statistic, model.df_model, model.df_resid); return { F_statistic: F_statistic, pvalue: pvalue } } function ols_wrap(endog, exog) { var model = ols(endog, exog); var ttest = t_test(model); var ftest = F_test(model); var adjust_R2 = 1 - (1 - model.R2) * ((model.nobs - 1) / model.df_resid); model.t = ttest; model.f = ftest; model.adjust_R2 = adjust_R2; return model } return { ols: ols_wrap } }(); jStat.extend({ buildxmatrix: function buildxmatrix() { var matrixRows = new Array(arguments.length); for (var i = 0; i < arguments.length; i++) { var array = [1]; matrixRows[i] = array.concat(arguments[i]) } return jStat(matrixRows) }, builddxmatrix: function builddxmatrix() { var matrixRows = new Array(arguments[0].length); for (var i = 0; i < arguments[0].length; i++) { var array = [1]; matrixRows[i] = array.concat(arguments[0][i]) } return jStat(matrixRows) }, buildjxmatrix: function buildjxmatrix(jMat) { var pass = new Array(jMat.length); for (var i = 0; i < jMat.length; i++) { pass[i] = jMat[i] } return jStat.builddxmatrix(pass) }, buildymatrix: function buildymatrix(array) { return jStat(array).transpose() }, buildjymatrix: function buildjymatrix(jMat) { return jMat.transpose() }, matrixmult: function matrixmult(A, B) { var i, j, k, result, sum; if (A.cols() == B.rows()) { if (B.rows() > 1) { result = []; for (i = 0; i < A.rows(); i++) { result[i] = []; for (j = 0; j < B.cols(); j++) { sum = 0; for (k = 0; k < A.cols(); k++) { sum += A.toArray()[i][k] * B.toArray()[k][j] } result[i][j] = sum } } return jStat(result) } result = []; for (i = 0; i < A.rows(); i++) { result[i] = []; for (j = 0; j < B.cols(); j++) { sum = 0; for (k = 0; k < A.cols(); k++) { sum += A.toArray()[i][k] * B.toArray()[j] } result[i][j] = sum } } return jStat(result) } }, regress: function regress(jMatX, jMatY) { var innerinv = jStat.xtranspxinv(jMatX); var xtransp = jMatX.transpose(); var next = jStat.matrixmult(jStat(innerinv), xtransp); return jStat.matrixmult(next, jMatY) }, regresst: function regresst(jMatX, jMatY, sides) { var beta = jStat.regress(jMatX, jMatY); var compile = {}; compile.anova = {}; var jMatYBar = jStat.jMatYBar(jMatX, beta); compile.yBar = jMatYBar; var yAverage = jMatY.mean(); compile.anova.residuals = jStat.residuals(jMatY, jMatYBar); compile.anova.ssr = jStat.ssr(jMatYBar, yAverage); compile.anova.msr = compile.anova.ssr / (jMatX[0].length - 1); compile.anova.sse = jStat.sse(jMatY, jMatYBar); compile.anova.mse = compile.anova.sse / (jMatY.length - (jMatX[0].length - 1) - 1); compile.anova.sst = jStat.sst(jMatY, yAverage); compile.anova.mst = compile.anova.sst / (jMatY.length - 1); compile.anova.r2 = 1 - compile.anova.sse / compile.anova.sst; if (compile.anova.r2 < 0) compile.anova.r2 = 0; compile.anova.fratio = compile.anova.msr / compile.anova.mse; compile.anova.pvalue = jStat.anovaftest(compile.anova.fratio, jMatX[0].length - 1, jMatY.length - (jMatX[0].length - 1) - 1); compile.anova.rmse = Math.sqrt(compile.anova.mse); compile.anova.r2adj = 1 - compile.anova.mse / compile.anova.mst; if (compile.anova.r2adj < 0) compile.anova.r2adj = 0; compile.stats = new Array(jMatX[0].length); var covar = jStat.xtranspxinv(jMatX); var sds, ts, ps; for (var i = 0; i < beta.length; i++) { sds = Math.sqrt(compile.anova.mse * Math.abs(covar[i][i])); ts = Math.abs(beta[i] / sds); ps = jStat.ttest(ts, jMatY.length - jMatX[0].length - 1, sides); compile.stats[i] = [beta[i], sds, ts, ps] } compile.regress = beta; return compile }, xtranspx: function xtranspx(jMatX) { return jStat.matrixmult(jMatX.transpose(), jMatX) }, xtranspxinv: function xtranspxinv(jMatX) { var inner = jStat.matrixmult(jMatX.transpose(), jMatX); var innerinv = jStat.inv(inner); return innerinv }, jMatYBar: function jMatYBar(jMatX, beta) { var yBar = jStat.matrixmult(jMatX, beta); return new jStat(yBar) }, residuals: function residuals(jMatY, jMatYBar) { return jStat.matrixsubtract(jMatY, jMatYBar) }, ssr: function ssr(jMatYBar, yAverage) { var ssr = 0; for (var i = 0; i < jMatYBar.length; i++) { ssr += Math.pow(jMatYBar[i] - yAverage, 2) } return ssr }, sse: function sse(jMatY, jMatYBar) { var sse = 0; for (var i = 0; i < jMatY.length; i++) { sse += Math.pow(jMatY[i] - jMatYBar[i], 2) } return sse }, sst: function sst(jMatY, yAverage) { var sst = 0; for (var i = 0; i < jMatY.length; i++) { sst += Math.pow(jMatY[i] - yAverage, 2) } return sst }, matrixsubtract: function matrixsubtract(A, B) { var ans = new Array(A.length); for (var i = 0; i < A.length; i++) { ans[i] = new Array(A[i].length); for (var j = 0; j < A[i].length; j++) { ans[i][j] = A[i][j] - B[i][j] } } return jStat(ans) } }); jStat.jStat = jStat; return jStat });
!function (r, n) { "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.formulajs = n() : r.formulajs = n() }("undefined" != typeof self ? self : this, function () { return function (r) { function n(t) { if (e[t]) return e[t].exports; var a = e[t] = { i: t, l: !1, exports: {} }; return r[t].call(a.exports, a, a.exports, n), a.l = !0, a.exports } var e = {}; return n.m = r, n.c = e, n.d = function (r, e, t) { n.o(r, e) || Object.defineProperty(r, e, { configurable: !1, enumerable: !0, get: t }) }, n.n = function (r) { var e = r && r.__esModule ? function () { return r.default } : function () { return r }; return n.d(e, "a", e), e }, n.o = function (r, n) { return Object.prototype.hasOwnProperty.call(r, n) }, n.p = "", n(n.s = 11) }([function (r, n) { n.nil = new Error("#NULL!"), n.div0 = new Error("#DIV/0!"), n.value = new Error("#VALUE!"), n.ref = new Error("#REF!"), n.name = new Error("#NAME?"), n.num = new Error("#NUM!"), n.na = new Error("#N/A"), n.error = new Error("#ERROR!"), n.data = new Error("#GETTING_DATA") }, function (r, n, e) { var t = e(0); n.flattenShallow = function (r) { return r && r.reduce ? r.reduce(function (r, n) { var e = Array.isArray(r), t = Array.isArray(n); return e && t ? r.concat(n) : e ? (r.push(n), r) : t ? [r].concat(n) : [r, n] }) : r }, n.isFlat = function (r) { if (!r) return !1; for (var n = 0; n < r.length; ++n)if (Array.isArray(r[n])) return !1; return !0 }, n.flatten = function () { for (var r = n.argsToArray.apply(null, arguments); !n.isFlat(r);)r = n.flattenShallow(r); return r }, n.argsToArray = function (r) { var e = []; return n.arrayEach(r, function (r) { e.push(r) }), e }, n.numbers = function () { return this.flatten.apply(null, arguments).filter(function (r) { return "number" == typeof r }) }, n.cleanFloat = function (r) { return Math.round(1e14 * r) / 1e14 }, n.parseBool = function (r) { if ("boolean" == typeof r) return r; if (r instanceof Error) return r; if ("number" == typeof r) return 0 !== r; if ("string" == typeof r) { var n = r.toUpperCase(); if ("TRUE" === n) return !0; if ("FALSE" === n) return !1 } return r instanceof Date && !isNaN(r) || t.value }, n.parseNumber = function (r) { return void 0 === r || "" === r ? t.value : isNaN(r) ? t.value : parseFloat(r) }, n.parseNumberArray = function (r) { var e; if (!r || 0 === (e = r.length)) return t.value; for (var a; e--;) { if ((a = n.parseNumber(r[e])) === t.value) return a; r[e] = a } return r }, n.parseMatrix = function (r) { if (!r || 0 === r.length) return t.value; for (var e, a = 0; a < r.length; a++)if (e = n.parseNumberArray(r[a]), r[a] = e, e instanceof Error) return e; return r }; var a = new Date(Date.UTC(1900, 0, 1)); n.parseDate = function (r) { if (!isNaN(r)) { if (r instanceof Date) return new Date(r); var n = parseInt(r, 10); return n < 0 ? t.num : n <= 60 ? new Date(a.getTime() + 864e5 * (n - 1)) : new Date(a.getTime() + 864e5 * (n - 2)) } return "string" != typeof r || (r = new Date(r), isNaN(r)) ? t.value : r }, n.parseDateArray = function (r) { for (var n, e = r.length; e--;) { if ((n = this.parseDate(r[e])) === t.value) return n; r[e] = n } return r }, n.anyIsError = function () { for (var r = arguments.length; r--;)if (arguments[r] instanceof Error) return !0; return !1 }, n.arrayValuesToNumbers = function (r) { for (var n, e = r.length; e--;)if ("number" != typeof (n = r[e])) if (!0 !== n) if (!1 !== n) { if ("string" == typeof n) { var t = this.parseNumber(n); t instanceof Error ? r[e] = 0 : r[e] = t } } else r[e] = 0; else r[e] = 1; return r }, n.rest = function (r, n) { return n = n || 1, r && "function" == typeof r.slice ? r.slice(n) : r }, n.initial = function (r, n) { return n = n || 1, r && "function" == typeof r.slice ? r.slice(0, r.length - n) : r }, n.arrayEach = function (r, n) { for (var e = -1, t = r.length; ++e < t && !1 !== n(r[e], e, r);); return r }, n.transpose = function (r) { return r ? r[0].map(function (n, e) { return r.map(function (r) { return r[e] }) }) : t.value } }, function (r, n, e) { var t = e(1), a = e(0), u = e(3), o = e(6), i = e(5); n.ABS = function (r) { return (r = t.parseNumber(r)) instanceof Error ? r : Math.abs(r) }, n.ACOS = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = Math.acos(r); return isNaN(n) && (n = a.num), n }, n.ACOSH = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = Math.log(r + Math.sqrt(r * r - 1)); return isNaN(n) && (n = a.num), n }, n.ACOT = function (r) { return (r = t.parseNumber(r)) instanceof Error ? r : Math.atan(1 / r) }, n.ACOTH = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = .5 * Math.log((r + 1) / (r - 1)); return isNaN(n) && (n = a.num), n }, n.AGGREGATE = function (r, e, o, i) { if (r = t.parseNumber(r), e = t.parseNumber(r), t.anyIsError(r, e)) return a.value; switch (r) { case 1: return u.AVERAGE(o); case 2: return u.COUNT(o); case 3: return u.COUNTA(o); case 4: return u.MAX(o); case 5: return u.MIN(o); case 6: return n.PRODUCT(o); case 7: return u.STDEV.S(o); case 8: return u.STDEV.P(o); case 9: return n.SUM(o); case 10: return u.VAR.S(o); case 11: return u.VAR.P(o); case 12: return u.MEDIAN(o); case 13: return u.MODE.SNGL(o); case 14: return u.LARGE(o, i); case 15: return u.SMALL(o, i); case 16: return u.PERCENTILE.INC(o, i); case 17: return u.QUARTILE.INC(o, i); case 18: return u.PERCENTILE.EXC(o, i); case 19: return u.QUARTILE.EXC(o, i) } }, n.ARABIC = function (r) { if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(r)) return a.value; var n = 0; return r.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (r) { n += { M: 1e3, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }[r] }), n }, n.ASIN = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = Math.asin(r); return isNaN(n) && (n = a.num), n }, n.ASINH = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.log(r + Math.sqrt(r * r + 1)) }, n.ATAN = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.atan(r) }, n.ATAN2 = function (r, n) { return r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : Math.atan2(r, n) }, n.ATANH = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = Math.log((1 + r) / (1 - r)) / 2; return isNaN(n) && (n = a.num), n }, n.BASE = function (r, n, e) { if (e = e || 0, r = t.parseNumber(r), n = t.parseNumber(n), e = t.parseNumber(e), t.anyIsError(r, n, e)) return a.value; e = void 0 === e ? 0 : e; var u = r.toString(n); return new Array(Math.max(e + 1 - u.length, 0)).join("0") + u }, n.CEILING = function (r, e, u) { if (e = void 0 === e ? 1 : Math.abs(e), u = u || 0, r = t.parseNumber(r), e = t.parseNumber(e), u = t.parseNumber(u), t.anyIsError(r, e, u)) return a.value; if (0 === e) return 0; var o = -Math.floor(Math.log(e) / Math.log(10)); return r >= 0 ? n.ROUND(Math.ceil(r / e) * e, o) : 0 === u ? -n.ROUND(Math.floor(Math.abs(r) / e) * e, o) : -n.ROUND(Math.ceil(Math.abs(r) / e) * e, o) }, n.CEILING.MATH = n.CEILING, n.CEILING.PRECISE = n.CEILING, n.COMBIN = function (r, e) { return r = t.parseNumber(r), e = t.parseNumber(e), t.anyIsError(r, e) ? a.value : n.FACT(r) / (n.FACT(e) * n.FACT(r - e)) }, n.COMBINA = function (r, e) { return r = t.parseNumber(r), e = t.parseNumber(e), t.anyIsError(r, e) ? a.value : 0 === r && 0 === e ? 1 : n.COMBIN(r + e - 1, r - 1) }, n.COS = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.cos(r) }, n.COSH = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : (Math.exp(r) + Math.exp(-r)) / 2 }, n.COT = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : 1 / Math.tan(r) }, n.COTH = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = Math.exp(2 * r); return (n + 1) / (n - 1) }, n.CSC = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : 1 / Math.sin(r) }, n.CSCH = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : 2 / (Math.exp(r) - Math.exp(-r)) }, n.DECIMAL = function (r, n) { return arguments.length < 1 ? a.value : parseInt(r, n) }, n.DEGREES = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : 180 * r / Math.PI }, n.EVEN = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : n.CEILING(r, -2, -1) }, n.EXP = function (r) { return arguments.length < 1 ? a.na : "number" != typeof r || arguments.length > 1 ? a.error : r = Math.exp(r) }; var f = []; n.FACT = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var e = Math.floor(r); return 0 === e || 1 === e ? 1 : f[e] > 0 ? f[e] : (f[e] = n.FACT(e - 1) * e, f[e]) }, n.FACTDOUBLE = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var e = Math.floor(r); return e <= 0 ? 1 : e * n.FACTDOUBLE(e - 2) }, n.FLOOR = function (r, e) { if (r = t.parseNumber(r), e = t.parseNumber(e), t.anyIsError(r, e)) return a.value; if (0 === e) return 0; if (!(r > 0 && e > 0 || r < 0 && e < 0)) return a.num; e = Math.abs(e); var u = -Math.floor(Math.log(e) / Math.log(10)); return r >= 0 ? n.ROUND(Math.floor(r / e) * e, u) : -n.ROUND(Math.ceil(Math.abs(r) / e), u) }, n.FLOOR.MATH = function (r, e, u) { if (e = void 0 === e ? 1 : e, u = void 0 === u ? 0 : u, r = t.parseNumber(r), e = t.parseNumber(e), u = t.parseNumber(u), t.anyIsError(r, e, u)) return a.value; if (0 === e) return 0; e = e ? Math.abs(e) : 1; var o = -Math.floor(Math.log(e) / Math.log(10)); return r >= 0 ? n.ROUND(Math.floor(r / e) * e, o) : 0 === u || void 0 === u ? -n.ROUND(Math.ceil(Math.abs(r) / e) * e, o) : -n.ROUND(Math.floor(Math.abs(r) / e) * e, o) }, n.FLOOR.PRECISE = n.FLOOR.MATH, n.GCD = function () { var r = t.parseNumberArray(t.flatten(arguments)); if (r instanceof Error) return r; for (var n = r.length, e = r[0], a = e < 0 ? -e : e, u = 1; u < n; u++) { for (var o = r[u], i = o < 0 ? -o : o; a && i;)a > i ? a %= i : i %= a; a += i } return a }, n.INT = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.floor(r) }, n.ISO = { CEILING: n.CEILING }, n.LCM = function () { var r = t.parseNumberArray(t.flatten(arguments)); if (r instanceof Error) return r; for (var n, e, a, u, o = 1; void 0 !== (a = r.pop());)for (; a > 1;) { if (a % 2) { for (n = 3, e = Math.floor(Math.sqrt(a)); n <= e && a % n; n += 2); u = n <= e ? n : a } else u = 2; for (a /= u, o *= u, n = r.length; n; r[--n] % u == 0 && 1 == (r[n] /= u) && r.splice(n, 1)); } return o }, n.LN = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.log(r) }, n.LN10 = function () { return Math.log(10) }, n.LN2 = function () { return Math.log(2) }, n.LOG10E = function () { return Math.LOG10E }, n.LOG2E = function () { return Math.LOG2E }, n.LOG = function (r, n) { return r = t.parseNumber(r), n = n ? t.parseNumber(n) : 10, t.anyIsError(r, n) ? a.value : (n = void 0 === n ? 10 : n, Math.log(r) / Math.log(n)) }, n.LOG10 = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.log(r) / Math.log(10) }, n.MOD = function (r, n) { if (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n)) return a.value; if (0 === n) return a.div0; var e = Math.abs(r % n); return e = r < 0 ? n - e : e, n > 0 ? e : -e }, n.MROUND = function (r, n) { return r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : r * n < 0 ? a.num : Math.round(r / n) * n }, n.MULTINOMIAL = function () { var r = t.parseNumberArray(t.flatten(arguments)); if (r instanceof Error) return r; for (var e = 0, a = 1, u = 0; u < r.length; u++)e += r[u], a *= n.FACT(r[u]); return n.FACT(e) / a }, n.ODD = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = Math.ceil(Math.abs(r)); return n = 1 & n ? n : n + 1, r > 0 ? n : -n }, n.PI = function () { return Math.PI }, n.E = function () { return Math.E }, n.POWER = function (r, n) { if (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n)) return a.value; var e = Math.pow(r, n); return isNaN(e) ? a.num : e }, n.PRODUCT = function () { var r = t.parseNumberArray(t.flatten(arguments)); if (r instanceof Error) return r; for (var n = 1, e = 0; e < r.length; e++)n *= r[e]; return n }, n.QUOTIENT = function (r, n) { return r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : parseInt(r / n, 10) }, n.RADIANS = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : r * Math.PI / 180 }, n.RAND = function () { return Math.random() }, n.RANDBETWEEN = function (r, n) { return r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : r + Math.ceil((n - r + 1) * Math.random()) - 1 }, n.ROMAN = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; for (var n = String(r).split(""), e = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], a = "", u = 3; u--;)a = (e[+n.pop() + 10 * u] || "") + a; return new Array(+n.join("") + 1).join("M") + a }, n.ROUND = function (r, n) { return r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : Math.round(r * Math.pow(10, n)) / Math.pow(10, n) }, n.ROUNDDOWN = function (r, n) { return r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : (r > 0 ? 1 : -1) * Math.floor(Math.abs(r) * Math.pow(10, n)) / Math.pow(10, n) }, n.ROUNDUP = function (r, n) { return r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : (r > 0 ? 1 : -1) * Math.ceil(Math.abs(r) * Math.pow(10, n)) / Math.pow(10, n) }, n.SEC = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : 1 / Math.cos(r) }, n.SECH = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : 2 / (Math.exp(r) + Math.exp(-r)) }, n.SERIESSUM = function (r, n, e, u) { if (r = t.parseNumber(r), n = t.parseNumber(n), e = t.parseNumber(e), u = t.parseNumberArray(u), t.anyIsError(r, n, e, u)) return a.value; for (var o = u[0] * Math.pow(r, n), i = 1; i < u.length; i++)o += u[i] * Math.pow(r, n + i * e); return o }, n.SIGN = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : r < 0 ? -1 : 0 === r ? 0 : 1 }, n.SIN = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.sin(r) }, n.SINH = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : (Math.exp(r) - Math.exp(-r)) / 2 }, n.SQRT = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : r < 0 ? a.num : Math.sqrt(r) }, n.SQRTPI = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.sqrt(r * Math.PI) }, n.SQRT1_2 = function () { return 1 / Math.sqrt(2) }, n.SQRT2 = function () { return Math.sqrt(2) }, n.SUBTOTAL = function (r, e) { if ((r = t.parseNumber(r)) instanceof Error) return r; switch (r) { case 1: return u.AVERAGE(e); case 2: return u.COUNT(e); case 3: return u.COUNTA(e); case 4: return u.MAX(e); case 5: return u.MIN(e); case 6: return n.PRODUCT(e); case 7: return u.STDEV.S(e); case 8: return u.STDEV.P(e); case 9: return n.SUM(e); case 10: return u.VAR.S(e); case 11: return u.VAR.P(e); case 101: return u.AVERAGE(e); case 102: return u.COUNT(e); case 103: return u.COUNTA(e); case 104: return u.MAX(e); case 105: return u.MIN(e); case 106: return n.PRODUCT(e); case 107: return u.STDEV.S(e); case 108: return u.STDEV.P(e); case 109: return n.SUM(e); case 110: return u.VAR.S(e); case 111: return u.VAR.P(e) } }, n.ADD = function (r, n) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : r + n) }, n.MINUS = function (r, n) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : r - n) }, n.DIVIDE = function (r, n) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : 0 === n ? a.div0 : r / n) }, n.MULTIPLY = function (r, n) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : r * n) }, n.GTE = function (r, n) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.error : r >= n) }, n.LT = function (r, n) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.error : r < n) }, n.LTE = function (r, n) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.error : r <= n) }, n.EQ = function (r, n) { return 2 !== arguments.length ? a.na : r === n }, n.NE = function (r, n) { return 2 !== arguments.length ? a.na : r !== n }, n.POW = function (r, e) { return 2 !== arguments.length ? a.na : (r = t.parseNumber(r), e = t.parseNumber(e), t.anyIsError(r, e) ? a.error : n.POWER(r, e)) }, n.SUM = function () { var r = 0; return t.arrayEach(t.argsToArray(arguments), function (e) { if ("number" == typeof e) r += e; else if ("string" == typeof e) { var t = parseFloat(e); !isNaN(t) && (r += t) } else Array.isArray(e) && (r += n.SUM.apply(null, e)) }), r }, n.SUMIF = function (r, n, e) { if (r = t.flatten(r), e = e ? t.flatten(e) : r, r instanceof Error) return r; for (var a = 0, u = void 0 === n || "*" === n, o = u ? null : i.parse(n + ""), f = 0; f < r.length; f++) { var s = r[f], l = e[f]; if (u) a += s; else { var c = [i.createToken(s, i.TOKEN_TYPE_LITERAL)].concat(o); a += i.compute(c) ? l : 0 } } return a }, n.SUMIFS = function () { var r = t.argsToArray(arguments), n = t.parseNumberArray(t.flatten(r.shift())); if (n instanceof Error) return n; for (var e = r, a = n.length, u = e.length, o = 0, f = 0; f < a; f++) { for (var s = n[f], l = !1, c = 0; c < u; c++) { var m = e[c], p = void 0 === m || "*" === m, h = !1; if (p) h = !0; else { var v = i.parse(m + ""), g = [i.createToken(s, i.TOKEN_TYPE_LITERAL)].concat(v); h = i.compute(g) } if (!h) { l = !1; break } l = !0 } l && (o += s) } return o }, n.SUMPRODUCT = function () { if (!arguments || 0 === arguments.length) return a.value; for (var r, n, e, u, o = arguments.length + 1, i = 0, f = 0; f < arguments[0].length; f++)if (arguments[0][f] instanceof Array) for (var s = 0; s < arguments[0][f].length; s++) { for (r = 1, n = 1; n < o; n++) { if ((u = t.parseNumber(arguments[n - 1][f][s])) instanceof Error) return u; r *= u } i += r } else { for (r = 1, n = 1; n < o; n++) { if ((e = t.parseNumber(arguments[n - 1][f])) instanceof Error) return e; r *= e } i += r } return i }, n.SUMSQ = function () { var r = t.parseNumberArray(t.flatten(arguments)); if (r instanceof Error) return r; for (var n = 0, e = r.length, a = 0; a < e; a++)n += o.ISNUMBER(r[a]) ? r[a] * r[a] : 0; return n }, n.SUMX2MY2 = function (r, n) { if (r = t.parseNumberArray(t.flatten(r)), n = t.parseNumberArray(t.flatten(n)), t.anyIsError(r, n)) return a.value; for (var e = 0, u = 0; u < r.length; u++)e += r[u] * r[u] - n[u] * n[u]; return e }, n.SUMX2PY2 = function (r, n) { if (r = t.parseNumberArray(t.flatten(r)), n = t.parseNumberArray(t.flatten(n)), t.anyIsError(r, n)) return a.value; var e = 0; r = t.parseNumberArray(t.flatten(r)), n = t.parseNumberArray(t.flatten(n)); for (var u = 0; u < r.length; u++)e += r[u] * r[u] + n[u] * n[u]; return e }, n.SUMXMY2 = function (r, n) { if (r = t.parseNumberArray(t.flatten(r)), n = t.parseNumberArray(t.flatten(n)), t.anyIsError(r, n)) return a.value; var e = 0; r = t.flatten(r), n = t.flatten(n); for (var u = 0; u < r.length; u++)e += Math.pow(r[u] - n[u], 2); return e }, n.TAN = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : Math.tan(r) }, n.TANH = function (r) { if ((r = t.parseNumber(r)) instanceof Error) return r; var n = Math.exp(2 * r); return (n - 1) / (n + 1) }, n.TRUNC = function (r, n) { return n = void 0 === n ? 0 : n, r = t.parseNumber(r), n = t.parseNumber(n), t.anyIsError(r, n) ? a.value : (r > 0 ? 1 : -1) * Math.floor(Math.abs(r) * Math.pow(10, n)) / Math.pow(10, n) } }, function (r, n, e) { var t = e(2), a = e(4), u = e(8), o = e(1), i = e(5), f = e(0), s = e(9); n.AVEDEV = function () { var r = o.parseNumberArray(o.flatten(arguments)); return r instanceof Error ? r : u.sum(u(r).subtract(u.mean(r)).abs()[0]) / r.length }, n.AVERAGE = function () { for (var r, n = o.numbers(o.flatten(arguments)), e = n.length, t = 0, a = 0, u = 0; u < e; u++)t += n[u], a += 1; return r = t / a, isNaN(r) && (r = f.num), r }, n.AVERAGEA = function () { for (var r, n = o.flatten(arguments), e = n.length, t = 0, a = 0, u = 0; u < e; u++) { var i = n[u]; "number" == typeof i && (t += i), !0 === i && t++, null !== i && a++ } return r = t / a, isNaN(r) && (r = f.num), r }, n.AVERAGEIF = function (r, n, e) { if (arguments.length <= 1) return f.na; if (e = e || r, r = o.flatten(r), (e = o.parseNumberArray(o.flatten(e))) instanceof Error) return e; for (var t = 0, a = 0, u = void 0 === n || "*" === n, s = u ? null : i.parse(n + ""), l = 0; l < r.length; l++) { var c = r[l]; if (u) a += e[l], t++; else { var m = [i.createToken(c, i.TOKEN_TYPE_LITERAL)].concat(s); i.compute(m) && (a += e[l], t++) } } return a / t }, n.AVERAGEIFS = function () { for (var r = o.argsToArray(arguments), n = (r.length - 1) / 2, e = o.flatten(r[0]), t = 0, a = 0, u = 0; u < e.length; u++) { for (var f = !1, s = 0; s < n; s++) { var l = r[2 * s + 1][u], c = r[2 * s + 2], m = void 0 === c || "*" === c, p = !1; if (m) p = !0; else { var h = i.parse(c + ""), v = [i.createToken(l, i.TOKEN_TYPE_LITERAL)].concat(h); p = i.compute(v) } if (!p) { f = !1; break } f = !0 } f && (a += e[u], t++) } var g = a / t; return isNaN(g) ? 0 : g }, n.BETA = {}, n.BETA.DIST = function (r, n, e, t, a, i) { return arguments.length < 4 ? f.value : (a = void 0 === a ? 0 : a, i = void 0 === i ? 1 : i, r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), a = o.parseNumber(a), i = o.parseNumber(i), o.anyIsError(r, n, e, a, i) ? f.value : (r = (r - a) / (i - a), t ? u.beta.cdf(r, n, e) : u.beta.pdf(r, n, e))) }, n.BETA.INV = function (r, n, e, t, a) { return t = void 0 === t ? 0 : t, a = void 0 === a ? 1 : a, r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), t = o.parseNumber(t), a = o.parseNumber(a), o.anyIsError(r, n, e, t, a) ? f.value : u.beta.inv(r, n, e) * (a - t) + t }, n.BINOM = {}, n.BINOM.DIST = function (r, n, e, t) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), t = o.parseNumber(t), o.anyIsError(r, n, e, t) ? f.value : t ? u.binomial.cdf(r, n, e) : u.binomial.pdf(r, n, e) }, n.BINOM.DIST.RANGE = function (r, n, e, a) { if (a = void 0 === a ? e : a, r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), a = o.parseNumber(a), o.anyIsError(r, n, e, a)) return f.value; for (var u = 0, i = e; i <= a; i++)u += t.COMBIN(r, i) * Math.pow(n, i) * Math.pow(1 - n, r - i); return u }, n.BINOM.INV = function (r, n, e) { if (r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e)) return f.value; for (var t = 0; t <= r;) { if (u.binomial.cdf(t, r, n) >= e) return t; t++ } }, n.CHISQ = {}, n.CHISQ.DIST = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), o.anyIsError(r, n) ? f.value : e ? u.chisquare.cdf(r, n) : u.chisquare.pdf(r, n) }, n.CHISQ.DIST.RT = function (r, n) { return !r | !n ? f.na : r < 1 || n > Math.pow(10, 10) ? f.num : "number" != typeof r || "number" != typeof n ? f.value : 1 - u.chisquare.cdf(r, n) }, n.CHISQ.INV = function (r, n) { return r = o.parseNumber(r), n = o.parseNumber(n), o.anyIsError(r, n) ? f.value : u.chisquare.inv(r, n) }, n.CHISQ.INV.RT = function (r, n) { return !r | !n ? f.na : r < 0 || r > 1 || n < 1 || n > Math.pow(10, 10) ? f.num : "number" != typeof r || "number" != typeof n ? f.value : u.chisquare.inv(1 - r, n) }, n.CHISQ.TEST = function (r, n) { if (2 !== arguments.length) return f.na; if (!(r instanceof Array && n instanceof Array)) return f.value; if (r.length !== n.length) return f.value; if (r[0] && n[0] && r[0].length !== n[0].length) return f.value; var e, t, a, u = r.length; for (t = 0; t < u; t++)r[t] instanceof Array || (e = r[t], r[t] = [], r[t].push(e)), n[t] instanceof Array || (e = n[t], n[t] = [], n[t].push(e)); var o = r[0].length, i = 1 === o ? u - 1 : (u - 1) * (o - 1), s = 0, l = Math.PI; for (t = 0; t < u; t++)for (a = 0; a < o; a++)s += Math.pow(r[t][a] - n[t][a], 2) / n[t][a]; return Math.round(1e6 * function (r, n) { var e = Math.exp(-.5 * r); n % 2 == 1 && (e *= Math.sqrt(2 * r / l)); for (var t = n; t >= 2;)e = e * r / t, t -= 2; for (var a = e, u = n; a > 1e-10 * e;)u += 2, a = a * r / u, e += a; return 1 - e }(s, i)) / 1e6 }, n.COLUMN = function (r, n) { if (2 !== arguments.length) return f.na; if (n < 0) return f.num; if (!(r instanceof Array) || "number" != typeof n) return f.value; if (0 !== r.length) return u.col(r, n) }, n.COLUMNS = function (r) { return 1 !== arguments.length ? f.na : r instanceof Array ? 0 === r.length ? 0 : u.cols(r) : f.value }, n.CONFIDENCE = {}, n.CONFIDENCE.NORM = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : u.normalci(1, r, n, e)[1] - 1 }, n.CONFIDENCE.T = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : u.tci(1, r, n, e)[1] - 1 }, n.CORREL = function (r, n) { return r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n) ? f.value : u.corrcoeff(r, n) }, n.COUNT = function () { return o.numbers(o.flatten(arguments)).length }, n.COUNTA = function () { var r = o.flatten(arguments); return r.length - n.COUNTBLANK(r) }, n.COUNTIN = function (r, n) { var e = 0; r = o.flatten(r); for (var t = 0; t < r.length; t++)r[t] === n && e++; return e }, n.COUNTBLANK = function () { for (var r, n = o.flatten(arguments), e = 0, t = 0; t < n.length; t++)null !== (r = n[t]) && "" !== r || e++; return e }, n.COUNTIF = function (r, n) { if (r = o.flatten(r), void 0 === n || "*" === n) return r.length; for (var e = 0, t = i.parse(n + ""), a = 0; a < r.length; a++) { var u = r[a], f = [i.createToken(u, i.TOKEN_TYPE_LITERAL)].concat(t); i.compute(f) && e++ } return e }, n.COUNTIFS = function () { for (var r = o.argsToArray(arguments), n = new Array(o.flatten(r[0]).length), e = 0; e < n.length; e++)n[e] = !0; for (e = 0; e < r.length; e += 2) { var t = o.flatten(r[e]), a = r[e + 1]; if (!(void 0 === a || "*" === a)) for (var u = i.parse(a + ""), f = 0; f < t.length; f++) { var s = t[f], l = [i.createToken(s, i.TOKEN_TYPE_LITERAL)].concat(u); n[f] = n[f] && i.compute(l) } } var c = 0; for (e = 0; e < n.length; e++)n[e] && c++; return c }, n.COUNTUNIQUE = function () { return s.UNIQUE.apply(null, o.flatten(arguments)).length }, n.COVARIANCE = {}, n.COVARIANCE.P = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n)) return f.value; for (var e = u.mean(r), t = u.mean(n), a = 0, i = r.length, s = 0; s < i; s++)a += (r[s] - e) * (n[s] - t); return a / i }, n.COVARIANCE.S = function (r, n) { return r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n) ? f.value : u.covariance(r, n) }, n.DEVSQ = function () { var r = o.parseNumberArray(o.flatten(arguments)); if (r instanceof Error) return r; for (var n = u.mean(r), e = 0, t = 0; t < r.length; t++)e += Math.pow(r[t] - n, 2); return e }, n.EXPON = {}, n.EXPON.DIST = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), o.anyIsError(r, n) ? f.value : e ? u.exponential.cdf(r, n) : u.exponential.pdf(r, n) }, n.F = {}, n.F.DIST = function (r, n, e, t) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : t ? u.centralF.cdf(r, n, e) : u.centralF.pdf(r, n, e) }, n.F.DIST.RT = function (r, n, e) { return 3 !== arguments.length ? f.na : r < 0 || n < 1 || e < 1 ? f.num : "number" != typeof r || "number" != typeof n || "number" != typeof e ? f.value : 1 - u.centralF.cdf(r, n, e) }, n.F.INV = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : r <= 0 || r > 1 ? f.num : u.centralF.inv(r, n, e) }, n.F.INV.RT = function (r, n, e) { return 3 !== arguments.length ? f.na : r < 0 || r > 1 || n < 1 || n > Math.pow(10, 10) || e < 1 || e > Math.pow(10, 10) ? f.num : "number" != typeof r || "number" != typeof n || "number" != typeof e ? f.value : u.centralF.inv(1 - r, n, e) }, n.F.TEST = function (r, n) { if (!r || !n) return f.na; if (!(r instanceof Array && n instanceof Array)) return f.na; if (r.length < 2 || n.length < 2) return f.div0; var e = function (r, n) { for (var e = 0, t = 0; t < r.length; t++)e += Math.pow(r[t] - n, 2); return e }, a = t.SUM(r) / r.length, u = t.SUM(n) / n.length; return e(r, a) / (r.length - 1) / (e(n, u) / (n.length - 1)) }, n.FISHER = function (r) { return r = o.parseNumber(r), r instanceof Error ? r : Math.log((1 + r) / (1 - r)) / 2 }, n.FISHERINV = function (r) { if ((r = o.parseNumber(r)) instanceof Error) return r; var n = Math.exp(2 * r); return (n - 1) / (n + 1) }, n.FORECAST = function (r, n, e) { if (r = o.parseNumber(r), n = o.parseNumberArray(o.flatten(n)), e = o.parseNumberArray(o.flatten(e)), o.anyIsError(r, n, e)) return f.value; for (var t = u.mean(e), a = u.mean(n), i = e.length, s = 0, l = 0, c = 0; c < i; c++)s += (e[c] - t) * (n[c] - a), l += Math.pow(e[c] - t, 2); var m = s / l; return a - m * t + m * r }, n.FREQUENCY = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n)) return f.value; for (var e = r.length, t = n.length, a = [], u = 0; u <= t; u++) { a[u] = 0; for (var i = 0; i < e; i++)0 === u ? r[i] <= n[0] && (a[0] += 1) : u < t ? r[i] > n[u - 1] && r[i] <= n[u] && (a[u] += 1) : u === t && r[i] > n[t - 1] && (a[t] += 1) } return a }, n.GAMMA = function (r) { return r = o.parseNumber(r), r instanceof Error ? r : 0 === r ? f.num : parseInt(r, 10) === r && r < 0 ? f.num : u.gammafn(r) }, n.GAMMA.DIST = function (r, n, e, t) { return 4 !== arguments.length ? f.na : r < 0 || n <= 0 || e <= 0 ? f.value : "number" != typeof r || "number" != typeof n || "number" != typeof e ? f.value : t ? u.gamma.cdf(r, n, e, !0) : u.gamma.pdf(r, n, e, !1) }, n.GAMMA.INV = function (r, n, e) { return 3 !== arguments.length ? f.na : r < 0 || r > 1 || n <= 0 || e <= 0 ? f.num : "number" != typeof r || "number" != typeof n || "number" != typeof e ? f.value : u.gamma.inv(r, n, e) }, n.GAMMALN = function (r) { return r = o.parseNumber(r), r instanceof Error ? r : u.gammaln(r) }, n.GAMMALN.PRECISE = function (r) { return 1 !== arguments.length ? f.na : r <= 0 ? f.num : "number" != typeof r ? f.value : u.gammaln(r) }, n.GAUSS = function (r) { return r = o.parseNumber(r), r instanceof Error ? r : u.normal.cdf(r, 0, 1) - .5 }, n.GEOMEAN = function () { var r = o.parseNumberArray(o.flatten(arguments)); return r instanceof Error ? r : u.geomean(r) }, n.GROWTH = function (r, n, e, t) { if ((r = o.parseNumberArray(r)) instanceof Error) return r; var a; if (void 0 === n) for (n = [], a = 1; a <= r.length; a++)n.push(a); if (void 0 === e) for (e = [], a = 1; a <= r.length; a++)e.push(a); if (n = o.parseNumberArray(n), e = o.parseNumberArray(e), o.anyIsError(n, e)) return f.value; void 0 === t && (t = !0); var u = r.length, i = 0, s = 0, l = 0, c = 0; for (a = 0; a < u; a++) { var m = n[a], p = Math.log(r[a]); i += m, s += p, l += m * p, c += m * m } i /= u, s /= u, l /= u, c /= u; var h, v; t ? (h = (l - i * s) / (c - i * i), v = s - h * i) : (h = l / c, v = 0); var g = []; for (a = 0; a < e.length; a++)g.push(Math.exp(v + h * e[a])); return g }, n.HARMEAN = function () { var r = o.parseNumberArray(o.flatten(arguments)); if (r instanceof Error) return r; for (var n = r.length, e = 0, t = 0; t < n; t++)e += 1 / r[t]; return n / e }, n.HYPGEOM = {}, n.HYPGEOM.DIST = function (r, n, e, a, u) { function i(r, n, e, a) { return t.COMBIN(e, r) * t.COMBIN(a - e, n - r) / t.COMBIN(a, n) } return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), a = o.parseNumber(a), o.anyIsError(r, n, e, a) ? f.value : u ? function (r, n, e, t) { for (var a = 0, u = 0; u <= r; u++)a += i(u, n, e, t); return a }(r, n, e, a) : i(r, n, e, a) }, n.INTERCEPT = function (r, e) { return r = o.parseNumberArray(r), e = o.parseNumberArray(e), o.anyIsError(r, e) ? f.value : r.length !== e.length ? f.na : n.FORECAST(0, r, e) }, n.KURT = function () { var r = o.parseNumberArray(o.flatten(arguments)); if (r instanceof Error) return r; for (var n = u.mean(r), e = r.length, t = 0, a = 0; a < e; a++)t += Math.pow(r[a] - n, 4); return t /= Math.pow(u.stdev(r, !0), 4), e * (e + 1) / ((e - 1) * (e - 2) * (e - 3)) * t - 3 * (e - 1) * (e - 1) / ((e - 2) * (e - 3)) }, n.LARGE = function (r, n) { return r = o.parseNumberArray(o.flatten(r)), n = o.parseNumber(n), o.anyIsError(r, n) ? r : r.sort(function (r, n) { return n - r })[n - 1] }, n.LINEST = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n)) return f.value; for (var e = u.mean(r), t = u.mean(n), a = n.length, i = 0, s = 0, l = 0; l < a; l++)i += (n[l] - t) * (r[l] - e), s += Math.pow(n[l] - t, 2); var c = i / s; return [c, e - c * t] }, n.LOGEST = function (r, e) { if (r = o.parseNumberArray(o.flatten(r)), e = o.parseNumberArray(o.flatten(e)), o.anyIsError(r, e)) return f.value; for (var t = 0; t < r.length; t++)r[t] = Math.log(r[t]); var a = n.LINEST(r, e); return a[0] = Math.round(1e6 * Math.exp(a[0])) / 1e6, a[1] = Math.round(1e6 * Math.exp(a[1])) / 1e6, a }, n.LOGNORM = {}, n.LOGNORM.DIST = function (r, n, e, t) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : t ? u.lognormal.cdf(r, n, e) : u.lognormal.pdf(r, n, e) }, n.LOGNORM.INV = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : u.lognormal.inv(r, n, e) }, n.MAX = function () { var r = o.numbers(o.flatten(arguments)); return 0 === r.length ? 0 : Math.max.apply(Math, r) }, n.MAXA = function () { var r = o.arrayValuesToNumbers(o.flatten(arguments)); return 0 === r.length ? 0 : Math.max.apply(Math, r) }, n.MEDIAN = function () { var r = o.arrayValuesToNumbers(o.flatten(arguments)), n = u.median(r); return isNaN(n) && (n = f.num), n }, n.MIN = function () { var r = o.numbers(o.flatten(arguments)); return 0 === r.length ? 0 : Math.min.apply(Math, r) }, n.MINA = function () { var r = o.arrayValuesToNumbers(o.flatten(arguments)); return 0 === r.length ? 0 : Math.min.apply(Math, r) }, n.MODE = {}, n.MODE.MULT = function () { var r = o.parseNumberArray(o.flatten(arguments)); if (r instanceof Error) return r; for (var n, e = r.length, t = {}, a = [], u = 0, i = 0; i < e; i++)n = r[i], t[n] = t[n] ? t[n] + 1 : 1, t[n] > u && (u = t[n], a = []), t[n] === u && (a[a.length] = n); return a }, n.MODE.SNGL = function () { var r = o.parseNumberArray(o.flatten(arguments)); return r instanceof Error ? r : n.MODE.MULT(r).sort(function (r, n) { return r - n })[0] }, n.NEGBINOM = {}, n.NEGBINOM.DIST = function (r, n, e, t) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : t ? u.negbin.cdf(r, n, e) : u.negbin.pdf(r, n, e) }, n.NORM = {}, n.NORM.DIST = function (r, n, e, t) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : e <= 0 ? f.num : t ? u.normal.cdf(r, n, e) : u.normal.pdf(r, n, e) }, n.NORM.INV = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : u.normal.inv(r, n, e) }, n.NORM.S = {}, n.NORM.S.DIST = function (r, n) { return r = o.parseNumber(r), r instanceof Error ? f.value : n ? u.normal.cdf(r, 0, 1) : u.normal.pdf(r, 0, 1) }, n.NORM.S.INV = function (r) { return r = o.parseNumber(r), r instanceof Error ? f.value : u.normal.inv(r, 0, 1) }, n.PEARSON = function (r, n) { if (n = o.parseNumberArray(o.flatten(n)), r = o.parseNumberArray(o.flatten(r)), o.anyIsError(n, r)) return f.value; for (var e = u.mean(r), t = u.mean(n), a = r.length, i = 0, s = 0, l = 0, c = 0; c < a; c++)i += (r[c] - e) * (n[c] - t), s += Math.pow(r[c] - e, 2), l += Math.pow(n[c] - t, 2); return i / Math.sqrt(s * l) }, n.PERCENTILE = {}, n.PERCENTILE.EXC = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumber(n), o.anyIsError(r, n)) return f.value; r = r.sort(function (r, n) { return r - n }); var e = r.length; if (n < 1 / (e + 1) || n > 1 - 1 / (e + 1)) return f.num; var t = n * (e + 1) - 1, a = Math.floor(t); return o.cleanFloat(t === a ? r[t] : r[a] + (t - a) * (r[a + 1] - r[a])) }, n.PERCENTILE.INC = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumber(n), o.anyIsError(r, n)) return f.value; r = r.sort(function (r, n) { return r - n }); var e = r.length, t = n * (e - 1), a = Math.floor(t); return o.cleanFloat(t === a ? r[t] : r[a] + (t - a) * (r[a + 1] - r[a])) }, n.PERCENTRANK = {}, n.PERCENTRANK.EXC = function (r, n, e) { if (e = void 0 === e ? 3 : e, r = o.parseNumberArray(o.flatten(r)), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e)) return f.value; r = r.sort(function (r, n) { return r - n }); for (var t = s.UNIQUE.apply(null, r), a = r.length, u = t.length, i = Math.pow(10, e), l = 0, c = !1, m = 0; !c && m < u;)n === t[m] ? (l = (r.indexOf(t[m]) + 1) / (a + 1), c = !0) : n >= t[m] && (n < t[m + 1] || m === u - 1) && (l = (r.indexOf(t[m]) + 1 + (n - t[m]) / (t[m + 1] - t[m])) / (a + 1), c = !0), m++; return Math.floor(l * i) / i }, n.PERCENTRANK.INC = function (r, n, e) { if (e = void 0 === e ? 3 : e, r = o.parseNumberArray(o.flatten(r)), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e)) return f.value; r = r.sort(function (r, n) { return r - n }); for (var t = s.UNIQUE.apply(null, r), a = r.length, u = t.length, i = Math.pow(10, e), l = 0, c = !1, m = 0; !c && m < u;)n === t[m] ? (l = r.indexOf(t[m]) / (a - 1), c = !0) : n >= t[m] && (n < t[m + 1] || m === u - 1) && (l = (r.indexOf(t[m]) + (n - t[m]) / (t[m + 1] - t[m])) / (a - 1), c = !0), m++; return Math.floor(l * i) / i }, n.PERMUT = function (r, n) { return r = o.parseNumber(r), n = o.parseNumber(n), o.anyIsError(r, n) ? f.value : t.FACT(r) / t.FACT(r - n) }, n.PERMUTATIONA = function (r, n) { return r = o.parseNumber(r), n = o.parseNumber(n), o.anyIsError(r, n) ? f.value : Math.pow(r, n) }, n.PHI = function (r) { return r = o.parseNumber(r), r instanceof Error ? f.value : Math.exp(-.5 * r * r) / 2.5066282746310002 }, n.POISSON = {}, n.POISSON.DIST = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), o.anyIsError(r, n) ? f.value : e ? u.poisson.cdf(r, n) : u.poisson.pdf(r, n) }, n.PROB = function (r, n, e, t) { if (void 0 === e) return 0; if (t = void 0 === t ? e : t, r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), e = o.parseNumber(e), t = o.parseNumber(t), o.anyIsError(r, n, e, t)) return f.value; if (e === t) return r.indexOf(e) >= 0 ? n[r.indexOf(e)] : 0; for (var a = r.sort(function (r, n) { return r - n }), u = a.length, i = 0, s = 0; s < u; s++)a[s] >= e && a[s] <= t && (i += n[r.indexOf(a[s])]); return i }, n.QUARTILE = {}, n.QUARTILE.EXC = function (r, e) { if (r = o.parseNumberArray(o.flatten(r)), e = o.parseNumber(e), o.anyIsError(r, e)) return f.value; switch (e) { case 1: return n.PERCENTILE.EXC(r, .25); case 2: return n.PERCENTILE.EXC(r, .5); case 3: return n.PERCENTILE.EXC(r, .75); default: return f.num } }, n.QUARTILE.INC = function (r, e) { if (r = o.parseNumberArray(o.flatten(r)), e = o.parseNumber(e), o.anyIsError(r, e)) return f.value; switch (e) { case 1: return n.PERCENTILE.INC(r, .25); case 2: return n.PERCENTILE.INC(r, .5); case 3: return n.PERCENTILE.INC(r, .75); default: return f.num } }, n.RANK = {}, n.RANK.AVG = function (r, n, e) { if (r = o.parseNumber(r), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n)) return f.value; n = o.flatten(n), e = e || !1; var t = e ? function (r, n) { return r - n } : function (r, n) { return n - r }; n = n.sort(t); for (var a = n.length, u = 0, i = 0; i < a; i++)n[i] === r && u++; return u > 1 ? (2 * n.indexOf(r) + u + 1) / 2 : n.indexOf(r) + 1 }, n.RANK.EQ = function (r, n, e) { if (r = o.parseNumber(r), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n)) return f.value; e = e || !1; var t = e ? function (r, n) { return r - n } : function (r, n) { return n - r }; return n = n.sort(t), n.indexOf(r) + 1 }, n.ROW = function (r, n) { if (2 !== arguments.length) return f.na; if (n < 0) return f.num; if (!(r instanceof Array) || "number" != typeof n) return f.value; if (0 !== r.length) return u.row(r, n) }, n.ROWS = function (r) { return 1 !== arguments.length ? f.na : r instanceof Array ? 0 === r.length ? 0 : u.rows(r) : f.value }, n.RSQ = function (r, e) { return r = o.parseNumberArray(o.flatten(r)), e = o.parseNumberArray(o.flatten(e)), o.anyIsError(r, e) ? f.value : Math.pow(n.PEARSON(r, e), 2) }, n.SKEW = function () { var r = o.parseNumberArray(o.flatten(arguments)); if (r instanceof Error) return r; for (var n = u.mean(r), e = r.length, t = 0, a = 0; a < e; a++)t += Math.pow(r[a] - n, 3); return e * t / ((e - 1) * (e - 2) * Math.pow(u.stdev(r, !0), 3)) }, n.SKEW.P = function () { var r = o.parseNumberArray(o.flatten(arguments)); if (r instanceof Error) return r; for (var n = u.mean(r), e = r.length, t = 0, a = 0, i = 0; i < e; i++)a += Math.pow(r[i] - n, 3), t += Math.pow(r[i] - n, 2); return a /= e, t /= e, a / Math.pow(t, 1.5) }, n.SLOPE = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n)) return f.value; for (var e = u.mean(n), t = u.mean(r), a = n.length, i = 0, s = 0, l = 0; l < a; l++)i += (n[l] - e) * (r[l] - t), s += Math.pow(n[l] - e, 2); return i / s }, n.SMALL = function (r, n) { return r = o.parseNumberArray(o.flatten(r)), n = o.parseNumber(n), o.anyIsError(r, n) ? r : r.sort(function (r, n) { return r - n })[n - 1] }, n.STANDARDIZE = function (r, n, e) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : (r - n) / e }, n.STDEV = {}, n.STDEV.P = function () { var r = n.VAR.P.apply(this, arguments), e = Math.sqrt(r); return isNaN(e) && (e = f.num), e }, n.STDEV.S = function () { var r = n.VAR.S.apply(this, arguments); return Math.sqrt(r) }, n.STDEVA = function () { var r = n.VARA.apply(this, arguments); return Math.sqrt(r) }, n.STDEVPA = function () { var r = n.VARPA.apply(this, arguments), e = Math.sqrt(r); return isNaN(e) && (e = f.num), e }, n.STEYX = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumberArray(o.flatten(n)), o.anyIsError(r, n)) return f.value; for (var e = u.mean(n), t = u.mean(r), a = n.length, i = 0, s = 0, l = 0, c = 0; c < a; c++)i += Math.pow(r[c] - t, 2), s += (n[c] - e) * (r[c] - t), l += Math.pow(n[c] - e, 2); return Math.sqrt((i - s * s / l) / (a - 2)) }, n.TRANSPOSE = function (r) { return r ? u.transpose(r) : f.na }, n.T = a.T, n.T.DIST = function (r, e, t) { return 1 !== t && 2 !== t ? f.num : 1 === t ? n.T.DIST.RT(r, e) : n.T.DIST["2T"](r, e) }, n.T.DIST["2T"] = function (r, n) { return 2 !== arguments.length ? f.na : r < 0 || n < 1 ? f.num : "number" != typeof r || "number" != typeof n ? f.value : 2 * (1 - u.studentt.cdf(r, n)) }, n.T.DIST.RT = function (r, n) { return 2 !== arguments.length ? f.na : r < 0 || n < 1 ? f.num : "number" != typeof r || "number" != typeof n ? f.value : 1 - u.studentt.cdf(r, n) }, n.T.INV = function (r, n) { return r = o.parseNumber(r), n = o.parseNumber(n), o.anyIsError(r, n) ? f.value : u.studentt.inv(r, n) }, n.T.INV["2T"] = function (r, n) { return r = o.parseNumber(r), n = o.parseNumber(n), r <= 0 || r > 1 || n < 1 ? f.num : o.anyIsError(r, n) ? f.value : Math.abs(u.studentt.inv(r / 2, n)) }, n.T.TEST = function (r, e) { if (r = o.parseNumberArray(o.flatten(r)), e = o.parseNumberArray(o.flatten(e)), o.anyIsError(r, e)) return f.value; var t, a = u.mean(r), i = u.mean(e), s = 0, l = 0; for (t = 0; t < r.length; t++)s += Math.pow(r[t] - a, 2); for (t = 0; t < e.length; t++)l += Math.pow(e[t] - i, 2); s /= r.length - 1, l /= e.length - 1; var c = Math.abs(a - i) / Math.sqrt(s / r.length + l / e.length); return n.T.DIST["2T"](c, r.length + e.length - 2) }, n.TREND = function (r, e, t) { if (r = o.parseNumberArray(o.flatten(r)), e = o.parseNumberArray(o.flatten(e)), t = o.parseNumberArray(o.flatten(t)), o.anyIsError(r, e, t)) return f.value; var a = n.LINEST(r, e), u = a[0], i = a[1], s = []; return t.forEach(function (r) { s.push(u * r + i) }), s }, n.TRIMMEAN = function (r, n) { if (r = o.parseNumberArray(o.flatten(r)), n = o.parseNumber(n), o.anyIsError(r, n)) return f.value; var e = t.FLOOR(r.length * n, 2) / 2; return u.mean(o.initial(o.rest(r.sort(function (r, n) { return r - n }), e), e)) }, n.VAR = {}, n.VAR.P = function () { for (var r, e = o.numbers(o.flatten(arguments)), t = e.length, a = 0, u = n.AVERAGE(e), i = 0; i < t; i++)a += Math.pow(e[i] - u, 2); return r = a / t, isNaN(r) && (r = f.num), r }, n.VAR.S = function () { for (var r = o.numbers(o.flatten(arguments)), e = r.length, t = 0, a = n.AVERAGE(r), u = 0; u < e; u++)t += Math.pow(r[u] - a, 2); return t / (e - 1) }, n.VARA = function () { for (var r = o.flatten(arguments), e = r.length, t = 0, a = 0, u = n.AVERAGEA(r), i = 0; i < e; i++) { var f = r[i]; t += "number" == typeof f ? Math.pow(f - u, 2) : !0 === f ? Math.pow(1 - u, 2) : Math.pow(0 - u, 2), null !== f && a++ } return t / (a - 1) }, n.VARPA = function () { for (var r, e = o.flatten(arguments), t = e.length, a = 0, u = 0, i = n.AVERAGEA(e), s = 0; s < t; s++) { var l = e[s]; a += "number" == typeof l ? Math.pow(l - i, 2) : !0 === l ? Math.pow(1 - i, 2) : Math.pow(0 - i, 2), null !== l && u++ } return r = a / u, isNaN(r) && (r = f.num), r }, n.WEIBULL = {}, n.WEIBULL.DIST = function (r, n, e, t) { return r = o.parseNumber(r), n = o.parseNumber(n), e = o.parseNumber(e), o.anyIsError(r, n, e) ? f.value : t ? 1 - Math.exp(-Math.pow(r / e, n)) : Math.pow(r, n - 1) * Math.exp(-Math.pow(r / e, n)) * n / Math.pow(e, n) }, n.Z = {}, n.Z.TEST = function (r, e, t) { if (r = o.parseNumberArray(o.flatten(r)), e = o.parseNumber(e), o.anyIsError(r, e)) return f.value; t = t || n.STDEV.S(r); var a = r.length; return 1 - n.NORM.S.DIST((n.AVERAGE(r) - e) / (t / Math.sqrt(a)), !0) } }, function (r, n, e) { var t = e(1), a = e(0); n.ASC = function () { throw new Error("ASC is not implemented") }, n.BAHTTEXT = function () { throw new Error("BAHTTEXT is not implemented") }, n.CHAR = function (r) { return r = t.parseNumber(r), r instanceof Error ? r : String.fromCharCode(r) }, n.CLEAN = function (r) { r = r || ""; var n = /[\0-\x1F]/g; return r.replace(n, "") }, n.CODE = function (r) { r = r || ""; var n = r.charCodeAt(0); return isNaN(n) && (n = a.na), n }, n.CONCATENATE = function () { for (var r = t.flatten(arguments), n = 0; (n = r.indexOf(!0)) > -1;)r[n] = "TRUE"; for (var e = 0; (e = r.indexOf(!1)) > -1;)r[e] = "FALSE"; return r.join("") }, n.DBCS = function () { throw new Error("DBCS is not implemented") }, n.DOLLAR = function () { throw new Error("DOLLAR is not implemented") }, n.EXACT = function (r, n) { return 2 !== arguments.length ? a.na : r === n }, n.FIND = function (r, n, e) { return arguments.length < 2 ? a.na : (e = void 0 === e ? 0 : e, n ? n.indexOf(r, e - 1) + 1 : null) }, n.FIXED = function () { throw new Error("FIXED is not implemented") }, n.HTML2TEXT = function (r) { var n = ""; return r && (r instanceof Array ? r.forEach(function (r) { "" !== n && (n += "\n"), n += r.replace(/<(?:.|\n)*?>/gm, "") }) : n = r.replace(/<(?:.|\n)*?>/gm, "")), n }, n.LEFT = function (r, n) { return n = void 0 === n ? 1 : n, n = t.parseNumber(n), n instanceof Error || "string" != typeof r ? a.value : r ? r.substring(0, n) : null }, n.LEN = function (r) { return 0 === arguments.length ? a.error : "string" == typeof r ? r ? r.length : 0 : r.length ? r.length : a.value }, n.LOWER = function (r) { return "string" != typeof r ? a.value : r ? r.toLowerCase() : r }, n.MID = function (r, n, e) { if (n = t.parseNumber(n), e = t.parseNumber(e), t.anyIsError(n, e) || "string" != typeof r) return e; var a = n - 1, u = a + e; return r.substring(a, u) }, n.NUMBERVALUE = function (r, n, e) { return n = void 0 === n ? "." : n, e = void 0 === e ? "," : e, Number(r.replace(n, ".").replace(e, "")) }, n.PRONETIC = function () { throw new Error("PRONETIC is not implemented") }, n.PROPER = function (r) { return void 0 === r || 0 === r.length ? a.value : (!0 === r && (r = "TRUE"), !1 === r && (r = "FALSE"), isNaN(r) && "number" == typeof r ? a.value : ("number" == typeof r && (r = "" + r), r.replace(/\w\S*/g, function (r) { return r.charAt(0).toUpperCase() + r.substr(1).toLowerCase() }))) }, n.REGEXEXTRACT = function (r, n) { if (arguments.length < 2) return a.na; var e = r.match(new RegExp(n)); return e ? e[e.length > 1 ? e.length - 1 : 0] : null }, n.REGEXMATCH = function (r, n, e) { if (arguments.length < 2) return a.na; var t = r.match(new RegExp(n)); return e ? t : !!t }, n.REGEXREPLACE = function (r, n, e) { return arguments.length < 3 ? a.na : r.replace(new RegExp(n), e) }, n.REPLACE = function (r, n, e, u) { return n = t.parseNumber(n), e = t.parseNumber(e), t.anyIsError(n, e) || "string" != typeof r || "string" != typeof u ? a.value : r.substr(0, n - 1) + u + r.substr(n - 1 + e) }, n.REPT = function (r, n) { return n = t.parseNumber(n), n instanceof Error ? n : new Array(n + 1).join(r) }, n.RIGHT = function (r, n) { return n = void 0 === n ? 1 : n, n = t.parseNumber(n), n instanceof Error ? n : r ? r.substring(r.length - n) : a.na }, n.SEARCH = function (r, n, e) { var t; return "string" != typeof r || "string" != typeof n ? a.value : (e = void 0 === e ? 0 : e, t = n.toLowerCase().indexOf(r.toLowerCase(), e - 1) + 1, 0 === t ? a.value : t) }, n.SPLIT = function (r, n) { return r.split(n) }, n.SUBSTITUTE = function (r, n, e, t) { if (arguments.length < 3) return a.na; if (!r || !n) return r; if (void 0 === t) return r.replace(new RegExp(n, "g"), e); for (var u = 0, o = 0; r.indexOf(n, u) > 0;)if (u = r.indexOf(n, u + 1), ++o === t) return r.substring(0, u) + e + r.substring(u + n.length) }, n.T = function (r) { return "string" == typeof r ? r : "" }, n.TEXT = function () { throw new Error("TEXT is not implemented") }, n.TRIM = function (r) { return "string" != typeof r ? a.value : r.replace(/ +/g, " ").trim() }, n.UNICHAR = n.CHAR, n.UNICODE = n.CODE, n.UPPER = function (r) { return "string" != typeof r ? a.value : r.toUpperCase() }, n.VALUE = function () { throw new Error("VALUE is not implemented") } }, function (r, n) { function e(r, n) { if (-1 === m.indexOf(n)) throw new Error("Unsupported token type: " + n); return { value: r, type: n } } function t(r) { return "string" != typeof r ? r : (/^\d+(\.\d+)?$/.test(r) && (r = -1 === r.indexOf(".") ? parseInt(r, 10) : parseFloat(r)), r) } function a(r) { for (var n = r.length, e = [], t = 0, a = "", u = ""; t < n;) { var o = r.charAt(t); switch (o) { case ">": case "<": case "=": u += o, a.length > 0 && (e.push(a), a = ""); break; default: u.length > 0 && (e.push(u), u = ""), a += o }t++ } return a.length > 0 && e.push(a), u.length > 0 && e.push(u), e } function u(r) { for (var n = "", a = [], u = 0; u < r.length; u++) { var o = r[u]; 0 === u && s.indexOf(o) >= 0 ? a.push(e(o, l)) : n += o } return n.length > 0 && a.push(e(t(n), c)), a.length > 0 && a[0].type !== l && a.unshift(e(f, l)), a } function o(r) { for (var n, e = [], t = 0; t < r.length; t++) { var a = r[t]; switch (a.type) { case l: n = a.value; break; case c: e.push(a.value) } } return i(e, n) } function i(r, n) { var e = !1; switch (n) { case ">": e = r[0] > r[1]; break; case ">=": e = r[0] >= r[1]; break; case "<": e = r[0] < r[1]; break; case "<=": e = r[0] <= r[1]; break; case "=": e = r[0] == r[1]; break; case "<>": e = r[0] != r[1] }return e } var f = "=", s = [">", ">=", "<", "<=", "=", "<>"], l = "operator", c = "literal", m = [l, c]; n.TOKEN_TYPE_OPERATOR = l, n.TOKEN_TYPE_LITERAL = c, n.parse = function (r) { return u(a(r)) }, n.createToken = e, n.compute = o }, function (r, n, e) { var t = e(0); n.CELL = function () { throw new Error("CELL is not implemented") }, n.ERROR = {}, n.ERROR.TYPE = function (r) { switch (r) { case t.nil: return 1; case t.div0: return 2; case t.value: return 3; case t.ref: return 4; case t.name: return 5; case t.num: return 6; case t.na: return 7; case t.data: return 8 }return t.na }, n.INFO = function () { throw new Error("INFO is not implemented") }, n.ISBLANK = function (r) { return null === r }, n.ISBINARY = function (r) { return /^[01]{1,10}$/.test(r) }, n.ISERR = function (r) { return [t.value, t.ref, t.div0, t.num, t.name, t.nil].indexOf(r) >= 0 || "number" == typeof r && (isNaN(r) || !isFinite(r)) }, n.ISERROR = function (r) { return n.ISERR(r) || r === t.na }, n.ISEVEN = function (r) { return !(1 & Math.floor(Math.abs(r))) }, n.ISFORMULA = function () { throw new Error("ISFORMULA is not implemented") }, n.ISLOGICAL = function (r) { return !0 === r || !1 === r }, n.ISNA = function (r) { return r === t.na }, n.ISNONTEXT = function (r) { return "string" != typeof r }, n.ISNUMBER = function (r) { return "number" == typeof r && !isNaN(r) && isFinite(r) }, n.ISODD = function (r) { return !!(1 & Math.floor(Math.abs(r))) }, n.ISREF = function () { throw new Error("ISREF is not implemented") }, n.ISTEXT = function (r) { return "string" == typeof r }, n.N = function (r) { return this.ISNUMBER(r) ? r : r instanceof Date ? r.getTime() : !0 === r ? 1 : !1 === r ? 0 : this.ISERROR(r) ? r : 0 }, n.NA = function () { return t.na }, n.SHEET = function () { throw new Error("SHEET is not implemented") }, n.SHEETS = function () { throw new Error("SHEETS is not implemented") }, n.TYPE = function (r) { return this.ISNUMBER(r) ? 1 : this.ISTEXT(r) ? 2 : this.ISLOGICAL(r) ? 4 : this.ISERROR(r) ? 16 : Array.isArray(r) ? 64 : void 0 } }, function (r, n, e) { function t(r) { return 1 === new Date(r, 1, 29).getMonth() } function a(r, n) { return Math.ceil((n - r) / 1e3 / 60 / 60 / 24) } function u(r) { var n = r > -22038912e5 ? 2 : 1; return Math.ceil((r - f) / 864e5) + n } var o = e(0), i = e(1), f = new Date(Date.UTC(1900, 0, 1)), s = [void 0, 0, 1, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, 1, 2, 3, 4, 5, 6, 0], l = [[], [1, 2, 3, 4, 5, 6, 7], [7, 1, 2, 3, 4, 5, 6], [6, 0, 1, 2, 3, 4, 5], [], [], [], [], [], [], [], [7, 1, 2, 3, 4, 5, 6], [6, 7, 1, 2, 3, 4, 5], [5, 6, 7, 1, 2, 3, 4], [4, 5, 6, 7, 1, 2, 3], [3, 4, 5, 6, 7, 1, 2], [2, 3, 4, 5, 6, 7, 1], [1, 2, 3, 4, 5, 6, 7]], c = [[], [6, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], void 0, void 0, void 0, [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]; n.DATE = function (r, n, e) { return r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? o.value : r < 0 || n < 0 || e < 0 ? o.num : new Date(r, n - 1, e) }, n.DATEDIF = function (r, e, t) { t = t.toUpperCase(), r = i.parseDate(r), e = i.parseDate(e); var a, u = r.getFullYear(), o = r.getMonth(), f = r.getDate(), s = e.getFullYear(), l = e.getMonth(), c = e.getDate(); switch (t) { case "Y": a = Math.floor(n.YEARFRAC(r, e)); break; case "D": a = n.DAYS(e, r); break; case "M": a = l - o + 12 * (s - u), c < f && a--; break; case "MD": f <= c ? a = c - f : (0 === l ? (r.setFullYear(s - 1), r.setMonth(12)) : (r.setFullYear(s), r.setMonth(l - 1)), a = n.DAYS(e, r)); break; case "YM": a = l - o + 12 * (s - u), c < f && a--, a %= 12; break; case "YD": l > o || l === o && c < f ? r.setFullYear(s) : r.setFullYear(s - 1), a = n.DAYS(e, r) }return a }, n.DATEVALUE = function (r) { var n, e = 2; return "string" != typeof r ? o.value : (n = Date.parse(r), isNaN(n) ? o.value : (n <= -22038912e5 && (e = 1), Math.ceil((n - f) / 864e5) + e)) }, n.DAY = function (r) { var n = i.parseDate(r); return n instanceof Error ? n : n.getDate() }, n.DAYS = function (r, n) { return r = i.parseDate(r), n = i.parseDate(n), r instanceof Error ? r : n instanceof Error ? n : u(r) - u(n) }, n.DAYS360 = function (r, n, e) { if (e = i.parseBool(e), r = i.parseDate(r), n = i.parseDate(n), r instanceof Error) return r; if (n instanceof Error) return n; if (e instanceof Error) return e; var t, a, u = r.getMonth(), o = n.getMonth(); if (e) t = 31 === r.getDate() ? 30 : r.getDate(), a = 31 === n.getDate() ? 30 : n.getDate(); else { var f = new Date(r.getFullYear(), u + 1, 0).getDate(), s = new Date(n.getFullYear(), o + 1, 0).getDate(); t = r.getDate() === f ? 30 : r.getDate(), n.getDate() === s ? t < 30 ? (o++, a = 1) : a = 30 : a = n.getDate() } return 360 * (n.getFullYear() - r.getFullYear()) + 30 * (o - u) + (a - t) }, n.EDATE = function (r, n) { return (r = i.parseDate(r)) instanceof Error ? r : isNaN(n) ? o.value : (n = parseInt(n, 10), r.setMonth(r.getMonth() + n), u(r)) }, n.EOMONTH = function (r, n) { return (r = i.parseDate(r)) instanceof Error ? r : isNaN(n) ? o.value : (n = parseInt(n, 10), u(new Date(r.getFullYear(), r.getMonth() + n + 1, 0))) }, n.HOUR = function (r) { return r = i.parseDate(r), r instanceof Error ? r : r.getHours() }, n.INTERVAL = function (r) { if ("number" != typeof r && "string" != typeof r) return o.value; r = parseInt(r, 10); var n = Math.floor(r / 94608e4); r %= 94608e4; var e = Math.floor(r / 2592e3); r %= 2592e3; var t = Math.floor(r / 86400); r %= 86400; var a = Math.floor(r / 3600); r %= 3600; var u = Math.floor(r / 60); r %= 60; var i = r; return n = n > 0 ? n + "Y" : "", e = e > 0 ? e + "M" : "", t = t > 0 ? t + "D" : "", a = a > 0 ? a + "H" : "", u = u > 0 ? u + "M" : "", i = i > 0 ? i + "S" : "", "P" + n + e + t + "T" + a + u + i }, n.ISOWEEKNUM = function (r) { if ((r = i.parseDate(r)) instanceof Error) return r; r.setHours(0, 0, 0), r.setDate(r.getDate() + 4 - (r.getDay() || 7)); var n = new Date(r.getFullYear(), 0, 1); return Math.ceil(((r - n) / 864e5 + 1) / 7) }, n.MINUTE = function (r) { return r = i.parseDate(r), r instanceof Error ? r : r.getMinutes() }, n.MONTH = function (r) { return r = i.parseDate(r), r instanceof Error ? r : r.getMonth() + 1 }, n.NETWORKDAYS = function (r, n, e) { return this.NETWORKDAYS.INTL(r, n, 1, e) }, n.NETWORKDAYS.INTL = function (r, n, e, t) { if ((r = i.parseDate(r)) instanceof Error) return r; if ((n = i.parseDate(n)) instanceof Error) return n; if (!((e = void 0 === e ? c[1] : c[e]) instanceof Array)) return o.value; void 0 === t ? t = [] : t instanceof Array || (t = [t]); for (var a = 0; a < t.length; a++) { var u = i.parseDate(t[a]); if (u instanceof Error) return u; t[a] = u } var f = (n - r) / 864e5 + 1, s = f, l = r; for (a = 0; a < f; a++) { var m = (new Date).getTimezoneOffset() > 0 ? l.getUTCDay() : l.getDay(), p = !1; m !== e[0] && m !== e[1] || (p = !0); for (var h = 0; h < t.length; h++) { var v = t[h]; if (v.getDate() === l.getDate() && v.getMonth() === l.getMonth() && v.getFullYear() === l.getFullYear()) { p = !0; break } } p && s--, l.setDate(l.getDate() + 1) } return s }, n.NOW = function () { return new Date }, n.SECOND = function (r) { return r = i.parseDate(r), r instanceof Error ? r : r.getSeconds() }, n.TIME = function (r, n, e) { return r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? o.value : r < 0 || n < 0 || e < 0 ? o.num : (3600 * r + 60 * n + e) / 86400 }, n.TIMEVALUE = function (r) { return r = i.parseDate(r), r instanceof Error ? r : (3600 * r.getHours() + 60 * r.getMinutes() + r.getSeconds()) / 86400 }, n.TODAY = function () { var r = new Date; return r.setHours(0), r.setMinutes(0), r.setSeconds(0), r }, n.WEEKDAY = function (r, n) { if ((r = i.parseDate(r)) instanceof Error) return r; void 0 === n && (n = 1); var e = r.getDay(); return l[n][e] }, n.WEEKNUM = function (r, n) { if ((r = i.parseDate(r)) instanceof Error) return r; if (void 0 === n && (n = 1), 21 === n) return this.ISOWEEKNUM(r); var e = s[n], t = new Date(r.getFullYear(), 0, 1), a = t.getDay() < e ? 1 : 0; return t -= 24 * Math.abs(t.getDay() - e) * 60 * 60 * 1e3, Math.floor((r - t) / 864e5 / 7 + 1) + a }, n.WORKDAY = function (r, n, e) { return this.WORKDAY.INTL(r, n, 1, e) }, n.WORKDAY.INTL = function (r, n, e, t) { if ((r = i.parseDate(r)) instanceof Error) return r; if ((n = i.parseNumber(n)) instanceof Error) return n; if (n < 0) return o.num; if (!((e = void 0 === e ? c[1] : c[e]) instanceof Array)) return o.value; void 0 === t ? t = [] : t instanceof Array || (t = [t]); for (var a = 0; a < t.length; a++) { var u = i.parseDate(t[a]); if (u instanceof Error) return u; t[a] = u } for (var f = 0; f < n;) { r.setDate(r.getDate() + 1); var s = r.getDay(); if (s !== e[0] && s !== e[1]) { for (var l = 0; l < t.length; l++) { var m = t[l]; if (m.getDate() === r.getDate() && m.getMonth() === r.getMonth() && m.getFullYear() === r.getFullYear()) { f--; break } } f++ } } return r }, n.YEAR = function (r) { return r = i.parseDate(r), r instanceof Error ? r : r.getFullYear() }, n.YEARFRAC = function (r, n, e) { if ((r = i.parseDate(r)) instanceof Error) return r; if ((n = i.parseDate(n)) instanceof Error) return n; e = e || 0; var u = r.getDate(), o = r.getMonth() + 1, f = r.getFullYear(), s = n.getDate(), l = n.getMonth() + 1, c = n.getFullYear(); switch (e) { case 0: return 31 === u && 31 === s ? (u = 30, s = 30) : 31 === u ? u = 30 : 30 === u && 31 === s && (s = 30), (s + 30 * l + 360 * c - (u + 30 * o + 360 * f)) / 360; case 1: var m = 365; if (f === c || f + 1 === c && (o > l || o === l && u >= s)) return (f === c && t(f) || function (r, n) { var e = r.getFullYear(), a = new Date(e, 2, 1); if (t(e) && r < a && n >= a) return !0; var u = n.getFullYear(), o = new Date(u, 2, 1); return t(u) && n >= o && r < o }(r, n) || 1 === l && 29 === s) && (m = 366), a(r, n) / m; var p = c - f + 1, h = (new Date(c + 1, 0, 1) - new Date(f, 0, 1)) / 1e3 / 60 / 60 / 24, v = h / p; return a(r, n) / v; case 2: return a(r, n) / 360; case 3: return a(r, n) / 365; case 4: return (s + 30 * l + 360 * c - (u + 30 * o + 360 * f)) / 360 } } }, function (r, n, e) { !function (n, e) { r.exports = e() }(0, function () { var r = function (r, n) { function e(n, e) { var t = n > e ? n : e; return r.pow(10, 17 - ~~(r.log(t > 0 ? t : -t) * r.LOG10E)) } function t(r) { return "[object Function]" === m.call(r) } function a(r) { return "number" == typeof r && r - r == 0 } function u(r) { return l.apply([], r) } function o() { return new o._init(arguments) } function i() { return 0 } function f() { return 1 } function s(r, n) { return r === n ? 1 : 0 } var l = Array.prototype.concat, c = Array.prototype.slice, m = Object.prototype.toString, p = Array.isArray || function (r) { return "[object Array]" === m.call(r) }; o.fn = o.prototype, o._init = function (r) { if (p(r[0])) if (p(r[0][0])) { t(r[1]) && (r[0] = o.map(r[0], r[1])); for (var n = 0; n < r[0].length; n++)this[n] = r[0][n]; this.length = r[0].length } else this[0] = t(r[1]) ? o.map(r[0], r[1]) : r[0], this.length = 1; else if (a(r[0])) this[0] = o.seq.apply(null, r), this.length = 1; else { if (r[0] instanceof o) return o(r[0].toArray()); this[0] = [], this.length = 1 } return this }, o._init.prototype = o.prototype, o._init.constructor = o, o.utils = { calcRdx: e, isArray: p, isFunction: t, isNumber: a, toVector: u }, o._random_fn = r.random, o.setRandom = function (r) { if ("function" != typeof r) throw new TypeError("fn is not a function"); o._random_fn = r }, o.extend = function (r) { var n, e; if (1 === arguments.length) { for (e in r) o[e] = r[e]; return this } for (n = 1; n < arguments.length; n++)for (e in arguments[n]) r[e] = arguments[n][e]; return r }, o.rows = function (r) { return r.length || 1 }, o.cols = function (r) { return r[0].length || 1 }, o.dimensions = function (r) { return { rows: o.rows(r), cols: o.cols(r) } }, o.row = function (r, n) { return p(n) ? n.map(function (n) { return o.row(r, n) }) : r[n] }, o.rowa = function (r, n) { return o.row(r, n) }, o.col = function (r, n) { if (p(n)) { var e = o.arange(r.length).map(function () { return new Array(n.length) }); return n.forEach(function (n, t) { o.arange(r.length).forEach(function (a) { e[a][t] = r[a][n] }) }), e } for (var t = new Array(r.length), a = 0; a < r.length; a++)t[a] = [r[a][n]]; return t }, o.cola = function (r, n) { return o.col(r, n).map(function (r) { return r[0] }) }, o.diag = function (r) { for (var n = o.rows(r), e = new Array(n), t = 0; t < n; t++)e[t] = [r[t][t]]; return e }, o.antidiag = function (r) { for (var n = o.rows(r) - 1, e = new Array(n), t = 0; n >= 0; n--, t++)e[t] = [r[t][n]]; return e }, o.transpose = function (r) { var n, e, t, a, u, o = []; for (p(r[0]) || (r = [r]), e = r.length, t = r[0].length, u = 0; u < t; u++) { for (n = new Array(e), a = 0; a < e; a++)n[a] = r[a][u]; o.push(n) } return 1 === o.length ? o[0] : o }, o.map = function (r, n, e) { var t, a, u, o, i; for (p(r[0]) || (r = [r]), a = r.length, u = r[0].length, o = e ? r : new Array(a), t = 0; t < a; t++)for (o[t] || (o[t] = new Array(u)), i = 0; i < u; i++)o[t][i] = n(r[t][i], t, i); return 1 === o.length ? o[0] : o }, o.cumreduce = function (r, n, e) { var t, a, u, o, i; for (p(r[0]) || (r = [r]), a = r.length, u = r[0].length, o = e ? r : new Array(a), t = 0; t < a; t++)for (o[t] || (o[t] = new Array(u)), u > 0 && (o[t][0] = r[t][0]), i = 1; i < u; i++)o[t][i] = n(o[t][i - 1], r[t][i]); return 1 === o.length ? o[0] : o }, o.alter = function (r, n) { return o.map(r, n, !0) }, o.create = function (r, n, e) { var a, u, o = new Array(r); for (t(n) && (e = n, n = r), a = 0; a < r; a++)for (o[a] = new Array(n), u = 0; u < n; u++)o[a][u] = e(a, u); return o }, o.zeros = function (r, n) { return a(n) || (n = r), o.create(r, n, i) }, o.ones = function (r, n) { return a(n) || (n = r), o.create(r, n, f) }, o.rand = function (r, n) { return a(n) || (n = r), o.create(r, n, o._random_fn) }, o.identity = function (r, n) { return a(n) || (n = r), o.create(r, n, s) }, o.symmetric = function (r) { var n, e, t = r.length; if (r.length !== r[0].length) return !1; for (n = 0; n < t; n++)for (e = 0; e < t; e++)if (r[e][n] !== r[n][e]) return !1; return !0 }, o.clear = function (r) { return o.alter(r, i) }, o.seq = function (r, n, a, u) { t(u) || (u = !1); var o, i = [], f = e(r, n), s = (n * f - r * f) / ((a - 1) * f), l = r; for (o = 0; l <= n && o < a; o++, l = (r * f + s * f * o) / f)i.push(u ? u(l, o) : l); return i }, o.arange = function (r, e, t) { var a, u = []; if (t = t || 1, e === n && (e = r, r = 0), r === e || 0 === t) return []; if (r < e && t < 0) return []; if (r > e && t > 0) return []; if (t > 0) for (a = r; a < e; a += t)u.push(a); else for (a = r; a > e; a += t)u.push(a); return u }, o.slice = function () { function r(r, e, t, a) { var u, i = [], f = r.length; if (e === n && t === n && a === n) return o.copy(r); if (e = e || 0, t = t || r.length, e = e >= 0 ? e : f + e, t = t >= 0 ? t : f + t, a = a || 1, e === t || 0 === a) return []; if (e < t && a < 0) return []; if (e > t && a > 0) return []; if (a > 0) for (u = e; u < t; u += a)i.push(r[u]); else for (u = e; u > t; u += a)i.push(r[u]); return i } function e(n, e) { var t, u; if (e = e || {}, a(e.row)) { if (a(e.col)) return n[e.row][e.col]; var i = o.rowa(n, e.row); return t = e.col || {}, r(i, t.start, t.end, t.step) } if (a(e.col)) { var f = o.cola(n, e.col); return u = e.row || {}, r(f, u.start, u.end, u.step) } return u = e.row || {}, t = e.col || {}, r(n, u.start, u.end, u.step).map(function (n) { return r(n, t.start, t.end, t.step) }) } return e }(), o.sliceAssign = function (e, t, u) { var i, f; if (a(t.row)) { if (a(t.col)) return e[t.row][t.col] = u; t.col = t.col || {}, t.col.start = t.col.start || 0, t.col.end = t.col.end || e[0].length, t.col.step = t.col.step || 1, i = o.arange(t.col.start, r.min(e.length, t.col.end), t.col.step); var s = t.row; return i.forEach(function (r, n) { e[s][r] = u[n] }), e } if (a(t.col)) { t.row = t.row || {}, t.row.start = t.row.start || 0, t.row.end = t.row.end || e.length, t.row.step = t.row.step || 1, f = o.arange(t.row.start, r.min(e[0].length, t.row.end), t.row.step); var l = t.col; return f.forEach(function (r, n) { e[r][l] = u[n] }), e } return u[0].length === n && (u = [u]), t.row.start = t.row.start || 0, t.row.end = t.row.end || e.length, t.row.step = t.row.step || 1, t.col.start = t.col.start || 0, t.col.end = t.col.end || e[0].length, t.col.step = t.col.step || 1, f = o.arange(t.row.start, r.min(e.length, t.row.end), t.row.step), i = o.arange(t.col.start, r.min(e[0].length, t.col.end), t.col.step), f.forEach(function (r, n) { i.forEach(function (t, a) { e[r][t] = u[n][a] }) }), e }, o.diagonal = function (r) { var n = o.zeros(r.length, r.length); return r.forEach(function (r, e) { n[e][e] = r }), n }, o.copy = function (r) { return r.map(function (r) { return a(r) ? r : r.map(function (r) { return r }) }) }; var h = o.prototype; return h.length = 0, h.push = Array.prototype.push, h.sort = Array.prototype.sort, h.splice = Array.prototype.splice, h.slice = Array.prototype.slice, h.toArray = function () { return this.length > 1 ? c.call(this) : c.call(this)[0] }, h.map = function (r, n) { return o(o.map(this, r, n)) }, h.cumreduce = function (r, n) { return o(o.cumreduce(this, r, n)) }, h.alter = function (r) { return o.alter(this, r), this }, function (r) { for (var n = 0; n < r.length; n++)!function (r) { h[r] = function (n) { var e, t = this; return n ? (setTimeout(function () { n.call(t, h[r].call(t)) }), this) : (e = o[r](this), p(e) ? o(e) : e) } }(r[n]) }("transpose clear symmetric rows cols dimensions diag antidiag".split(" ")), function (r) { for (var n = 0; n < r.length; n++)!function (r) { h[r] = function (n, e) { var t = this; return e ? (setTimeout(function () { e.call(t, h[r].call(t, n)) }), this) : o(o[r](this, n)) } }(r[n]) }("row col".split(" ")), function (r) { for (var n = 0; n < r.length; n++)!function (r) { h[r] = function () { return o(o[r].apply(null, arguments)) } }(r[n]) }("create zeros ones rand identity".split(" ")), o }(Math); return function (r, n) { function e(r, n) { return r - n } function t(r, e, t) { return n.max(e, n.min(r, t)) } var a = r.utils.isFunction; r.sum = function (r) { for (var n = 0, e = r.length; --e >= 0;)n += r[e]; return n }, r.sumsqrd = function (r) { for (var n = 0, e = r.length; --e >= 0;)n += r[e] * r[e]; return n }, r.sumsqerr = function (n) { for (var e, t = r.mean(n), a = 0, u = n.length; --u >= 0;)e = n[u] - t, a += e * e; return a }, r.sumrow = function (r) { for (var n = 0, e = r.length; --e >= 0;)n += r[e]; return n }, r.product = function (r) { for (var n = 1, e = r.length; --e >= 0;)n *= r[e]; return n }, r.min = function (r) { for (var n = r[0], e = 0; ++e < r.length;)r[e] < n && (n = r[e]); return n }, r.max = function (r) { for (var n = r[0], e = 0; ++e < r.length;)r[e] > n && (n = r[e]); return n }, r.unique = function (r) { for (var n = {}, e = [], t = 0; t < r.length; t++)n[r[t]] || (n[r[t]] = !0, e.push(r[t])); return e }, r.mean = function (n) { return r.sum(n) / n.length }, r.meansqerr = function (n) { return r.sumsqerr(n) / n.length }, r.geomean = function (e) { return n.pow(r.product(e), 1 / e.length) }, r.median = function (r) { var n = r.length, t = r.slice().sort(e); return 1 & n ? t[n / 2 | 0] : (t[n / 2 - 1] + t[n / 2]) / 2 }, r.cumsum = function (n) { return r.cumreduce(n, function (r, n) { return r + n }) }, r.cumprod = function (n) { return r.cumreduce(n, function (r, n) { return r * n }) }, r.diff = function (r) { var n, e = [], t = r.length; for (n = 1; n < t; n++)e.push(r[n] - r[n - 1]); return e }, r.rank = function (r) { for (var n, t = r.length, a = r.slice().sort(e), u = new Array(t), o = 0; o < t; o++) { var i = a.indexOf(r[o]), f = a.lastIndexOf(r[o]); n = i === f ? i : (i + f) / 2, u[o] = n + 1 } return u }, r.mode = function (r) { var n, t = r.length, a = r.slice().sort(e), u = 1, o = 0, i = 0, f = []; for (n = 0; n < t; n++)a[n] === a[n + 1] ? u++ : (u > o ? (f = [a[n]], o = u, i = 0) : u === o && (f.push(a[n]), i++), u = 1); return 0 === i ? f[0] : f }, r.range = function (n) { return r.max(n) - r.min(n) }, r.variance = function (n, e) { return r.sumsqerr(n) / (n.length - (e ? 1 : 0)) }, r.pooledvariance = function (n) { return n.reduce(function (n, e) { return n + r.sumsqerr(e) }, 0) / (n.reduce(function (r, n) { return r + n.length }, 0) - n.length) }, r.deviation = function (n) { for (var e = r.mean(n), t = n.length, a = new Array(t), u = 0; u < t; u++)a[u] = n[u] - e; return a }, r.stdev = function (e, t) { return n.sqrt(r.variance(e, t)) }, r.pooledstdev = function (e) { return n.sqrt(r.pooledvariance(e)) }, r.meandev = function (e) { for (var t = r.mean(e), a = [], u = e.length - 1; u >= 0; u--)a.push(n.abs(e[u] - t)); return r.mean(a) }, r.meddev = function (e) { for (var t = r.median(e), a = [], u = e.length - 1; u >= 0; u--)a.push(n.abs(e[u] - t)); return r.median(a) }, r.coeffvar = function (n) { return r.stdev(n) / r.mean(n) }, r.quartiles = function (r) { var t = r.length, a = r.slice().sort(e); return [a[n.round(t / 4) - 1], a[n.round(t / 2) - 1], a[n.round(3 * t / 4) - 1]] }, r.quantiles = function (r, a, u, o) { var i, f, s, l, c, m, p = r.slice().sort(e), h = [a.length], v = r.length; for (void 0 === u && (u = 3 / 8), void 0 === o && (o = 3 / 8), i = 0; i < a.length; i++)f = a[i], s = u + f * (1 - u - o), l = v * f + s, c = n.floor(t(l, 1, v - 1)), m = t(l - c, 0, 1), h[i] = (1 - m) * p[c - 1] + m * p[c]; return h }, r.percentile = function (r, n, t) { var a = r.slice().sort(e), u = n * (a.length + (t ? 1 : -1)) + (t ? 0 : 1), o = parseInt(u), i = u - o; return o + 1 < a.length ? a[o - 1] + i * (a[o] - a[o - 1]) : a[o - 1] }, r.percentileOfScore = function (r, n, e) { var t, a, u = 0, o = r.length, i = !1; for ("strict" === e && (i = !0), a = 0; a < o; a++)t = r[a], (i && t < n || !i && t <= n) && u++; return u / o }, r.histogram = function (e, t) { t = t || 4; var a, u = r.min(e), o = (r.max(e) - u) / t, i = e.length, f = []; for (a = 0; a < t; a++)f[a] = 0; for (a = 0; a < i; a++)f[n.min(n.floor((e[a] - u) / o), t - 1)] += 1; return f }, r.covariance = function (n, e) { var t, a = r.mean(n), u = r.mean(e), o = n.length, i = new Array(o); for (t = 0; t < o; t++)i[t] = (n[t] - a) * (e[t] - u); return r.sum(i) / (o - 1) }, r.corrcoeff = function (n, e) { return r.covariance(n, e) / r.stdev(n, 1) / r.stdev(e, 1) }, r.spearmancoeff = function (n, e) { return n = r.rank(n), e = r.rank(e), r.corrcoeff(n, e) }, r.stanMoment = function (e, t) { for (var a = r.mean(e), u = r.stdev(e), o = e.length, i = 0, f = 0; f < o; f++)i += n.pow((e[f] - a) / u, t); return i / e.length }, r.skewness = function (n) { return r.stanMoment(n, 3) }, r.kurtosis = function (n) { return r.stanMoment(n, 4) - 3 }; var u = r.prototype; !function (n) { for (var e = 0; e < n.length; e++)!function (n) { u[n] = function (e, t) { var o = [], i = 0, f = this; if (a(e) && (t = e, e = !1), t) return setTimeout(function () { t.call(f, u[n].call(f, e)) }), this; if (this.length > 1) { for (f = !0 === e ? this : this.transpose(); i < f.length; i++)o[i] = r[n](f[i]); return o } return r[n](this[0], e) } }(n[e]) }("cumsum cumprod".split(" ")), function (n) { for (var e = 0; e < n.length; e++)!function (n) { u[n] = function (e, t) { var o = [], i = 0, f = this; if (a(e) && (t = e, e = !1), t) return setTimeout(function () { t.call(f, u[n].call(f, e)) }), this; if (this.length > 1) { for ("sumrow" !== n && (f = !0 === e ? this : this.transpose()); i < f.length; i++)o[i] = r[n](f[i]); return !0 === e ? r[n](r.utils.toVector(o)) : o } return r[n](this[0], e) } }(n[e]) }("sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr geomean median diff rank mode range variance deviation stdev meandev meddev coeffvar quartiles histogram skewness kurtosis".split(" ")), function (n) { for (var e = 0; e < n.length; e++)!function (n) { u[n] = function () { var e, t = [], o = 0, i = this, f = Array.prototype.slice.call(arguments); if (a(f[f.length - 1])) { e = f[f.length - 1]; var s = f.slice(0, f.length - 1); return setTimeout(function () { e.call(i, u[n].apply(i, s)) }), this } e = void 0; var l = function (e) { return r[n].apply(i, [e].concat(f)) }; if (this.length > 1) { for (i = i.transpose(); o < i.length; o++)t[o] = l(i[o]); return t } return l(this[0]) } }(n[e]) }("quantiles percentileOfScore".split(" ")) }(r, Math), function (r, n) { r.gammaln = function (r) { var e, t, a, u = 0, o = [76.18009172947146, -86.50532032941678, 24.01409824083091, -1.231739572450155, .001208650973866179, -5395239384953e-18], i = 1.000000000190015; for (a = (t = e = r) + 5.5, a -= (e + .5) * n.log(a); u < 6; u++)i += o[u] / ++t; return n.log(2.5066282746310007 * i / e) - a }, r.loggam = function (r) { var e, t, a, u, o, i, f, s = [.08333333333333333, -.002777777777777778, .0007936507936507937, -.0005952380952380952, .0008417508417508418, -.001917526917526918, .00641025641025641, -.02955065359477124, .1796443723688307, -1.3924322169059]; if (e = r, f = 0, 1 == r || 2 == r) return 0; for (r <= 7 && (f = n.floor(7 - r), e = r + f), t = 1 / (e * e), a = 2 * n.PI, o = s[9], i = 8; i >= 0; i--)o *= t, o += s[i]; if (u = o / e + .5 * n.log(a) + (e - .5) * n.log(e) - e, r <= 7) for (i = 1; i <= f; i++)u -= n.log(e - 1), e -= 1; return u }, r.gammafn = function (r) { var e, t, a, u, o = [-1.716185138865495, 24.76565080557592, -379.80425647094563, 629.3311553128184, 866.9662027904133, -31451.272968848367, -36144.413418691176, 66456.14382024054], i = [-30.8402300119739, 315.35062697960416, -1015.1563674902192, -3107.771671572311, 22538.11842098015, 4755.846277527881, -134659.9598649693, -115132.2596755535], f = !1, s = 0, l = 0, c = 0, m = r; if (m <= 0) { if (!(u = m % 1 + 3.6e-16)) return 1 / 0; f = (1 & m ? -1 : 1) * n.PI / n.sin(n.PI * u), m = 1 - m } for (a = m, t = m < 1 ? m++ : (m -= s = (0 | m) - 1) - 1, e = 0; e < 8; ++e)c = (c + o[e]) * t, l = l * t + i[e]; if (u = c / l + 1, a < m) u /= a; else if (a > m) for (e = 0; e < s; ++e)u *= m, m++; return f && (u = f / u), u }, r.gammap = function (n, e) { return r.lowRegGamma(n, e) * r.gammafn(n) }, r.lowRegGamma = function (e, t) { var a, u = r.gammaln(e), o = e, i = 1 / e, f = i, s = t + 1 - e, l = 1 / 1e-30, c = 1 / s, m = c, p = 1, h = -~(8.5 * n.log(e >= 1 ? e : 1 / e) + .4 * e + 17); if (t < 0 || e <= 0) return NaN; if (t < e + 1) { for (; p <= h; p++)i += f *= t / ++o; return i * n.exp(-t + e * n.log(t) - u) } for (; p <= h; p++)a = -p * (p - e), s += 2, c = a * c + s, l = s + a / l, c = 1 / c, m *= c * l; return 1 - m * n.exp(-t + e * n.log(t) - u) }, r.factorialln = function (n) { return n < 0 ? NaN : r.gammaln(n + 1) }, r.factorial = function (n) { return n < 0 ? NaN : r.gammafn(n + 1) }, r.combination = function (e, t) { return e > 170 || t > 170 ? n.exp(r.combinationln(e, t)) : r.factorial(e) / r.factorial(t) / r.factorial(e - t) }, r.combinationln = function (n, e) { return r.factorialln(n) - r.factorialln(e) - r.factorialln(n - e) }, r.permutation = function (n, e) { return r.factorial(n) / r.factorial(n - e) }, r.betafn = function (e, t) { if (!(e <= 0 || t <= 0)) return e + t > 170 ? n.exp(r.betaln(e, t)) : r.gammafn(e) * r.gammafn(t) / r.gammafn(e + t) }, r.betaln = function (n, e) { return r.gammaln(n) + r.gammaln(e) - r.gammaln(n + e) }, r.betacf = function (r, e, t) { var a, u, o, i, f = 1, s = e + t, l = e + 1, c = e - 1, m = 1, p = 1 - s * r / l; for (n.abs(p) < 1e-30 && (p = 1e-30), p = 1 / p, i = p; f <= 100 && (a = 2 * f, u = f * (t - f) * r / ((c + a) * (e + a)), p = 1 + u * p, n.abs(p) < 1e-30 && (p = 1e-30), m = 1 + u / m, n.abs(m) < 1e-30 && (m = 1e-30), p = 1 / p, i *= p * m, u = -(e + f) * (s + f) * r / ((e + a) * (l + a)), p = 1 + u * p, n.abs(p) < 1e-30 && (p = 1e-30), m = 1 + u / m, n.abs(m) < 1e-30 && (m = 1e-30), p = 1 / p, o = p * m, i *= o, !(n.abs(o - 1) < 3e-7)); f++); return i }, r.gammapinv = function (e, t) { var a, u, o, i, f, s, l, c = 0, m = t - 1, p = r.gammaln(t); if (e >= 1) return n.max(100, t + 100 * n.sqrt(t)); if (e <= 0) return 0; for (t > 1 ? (s = n.log(m), l = n.exp(m * (s - 1) - p), f = e < .5 ? e : 1 - e, o = n.sqrt(-2 * n.log(f)), a = (2.30753 + .27061 * o) / (1 + o * (.99229 + .04481 * o)) - o, e < .5 && (a = -a), a = n.max(.001, t * n.pow(1 - 1 / (9 * t) - a / (3 * n.sqrt(t)), 3))) : (o = 1 - t * (.253 + .12 * t), a = e < o ? n.pow(e / o, 1 / t) : 1 - n.log(1 - (e - o) / (1 - o))); c < 12; c++) { if (a <= 0) return 0; if (u = r.lowRegGamma(t, a) - e, o = t > 1 ? l * n.exp(-(a - m) + m * (n.log(a) - s)) : n.exp(-a + m * n.log(a) - p), i = u / o, a -= o = i / (1 - .5 * n.min(1, i * ((t - 1) / a - 1))), a <= 0 && (a = .5 * (a + o)), n.abs(o) < 1e-8 * a) break } return a }, r.erf = function (r) { var e, t, a, u, o = [-1.3026537197817094, .6419697923564902, .019476473204185836, -.00956151478680863, -.000946595344482036, .000366839497852761, 42523324806907e-18, -20278578112534e-18, -1624290004647e-18, 130365583558e-17, 1.5626441722e-8, -8.5238095915e-8, 6.529054439e-9, 5.059343495e-9, -9.91364156e-10, -2.27365122e-10, 9.6467911e-11, 2.394038e-12, -6.886027e-12, 8.94487e-13, 3.13092e-13, -1.12708e-13, 3.81e-16, 7.106e-15, -1.523e-15, -9.4e-17, 1.21e-16, -2.8e-17], i = o.length - 1, f = !1, s = 0, l = 0; for (r < 0 && (r = -r, f = !0), e = 2 / (2 + r), t = 4 * e - 2; i > 0; i--)a = s, s = t * s - l + o[i], l = a; return u = e * n.exp(-r * r + .5 * (o[0] + t * s) - l), f ? u - 1 : 1 - u }, r.erfc = function (n) { return 1 - r.erf(n) }, r.erfcinv = function (e) { var t, a, u, o, i = 0; if (e >= 2) return -100; if (e <= 0) return 100; for (o = e < 1 ? e : 2 - e, u = n.sqrt(-2 * n.log(o / 2)), t = -.70711 * ((2.30753 + .27061 * u) / (1 + u * (.99229 + .04481 * u)) - u); i < 2; i++)a = r.erfc(t) - o, t += a / (1.1283791670955126 * n.exp(-t * t) - t * a); return e < 1 ? t : -t }, r.ibetainv = function (e, t, a) { var u, o, i, f, s, l, c, m, p, h, v, g = t - 1, N = a - 1, E = 0; if (e <= 0) return 0; if (e >= 1) return 1; for (t >= 1 && a >= 1 ? (i = e < .5 ? e : 1 - e, f = n.sqrt(-2 * n.log(i)), c = (2.30753 + .27061 * f) / (1 + f * (.99229 + .04481 * f)) - f, e < .5 && (c = -c), m = (c * c - 3) / 6, p = 2 / (1 / (2 * t - 1) + 1 / (2 * a - 1)), h = c * n.sqrt(m + p) / p - (1 / (2 * a - 1) - 1 / (2 * t - 1)) * (m + 5 / 6 - 2 / (3 * p)), c = t / (t + a * n.exp(2 * h))) : (u = n.log(t / (t + a)), o = n.log(a / (t + a)), f = n.exp(t * u) / t, s = n.exp(a * o) / a, h = f + s, c = e < f / h ? n.pow(t * h * e, 1 / t) : 1 - n.pow(a * h * (1 - e), 1 / a)), v = -r.gammaln(t) - r.gammaln(a) + r.gammaln(t + a); E < 10; E++) { if (0 === c || 1 === c) return c; if (l = r.ibeta(c, t, a) - e, f = n.exp(g * n.log(c) + N * n.log(1 - c) + v), s = l / f, c -= f = s / (1 - .5 * n.min(1, s * (g / c - N / (1 - c)))), c <= 0 && (c = .5 * (c + f)), c >= 1 && (c = .5 * (c + f + 1)), n.abs(f) < 1e-8 * c && E > 0) break } return c }, r.ibeta = function (e, t, a) { var u = 0 === e || 1 === e ? 0 : n.exp(r.gammaln(t + a) - r.gammaln(t) - r.gammaln(a) + t * n.log(e) + a * n.log(1 - e)); return !(e < 0 || e > 1) && (e < (t + 1) / (t + a + 2) ? u * r.betacf(e, t, a) / t : 1 - u * r.betacf(1 - e, a, t) / a) }, r.randn = function (e, t) { var a, u, o, i, f; if (t || (t = e), e) return r.create(e, t, function () { return r.randn() }); do { a = r._random_fn(), u = 1.7156 * (r._random_fn() - .5), o = a - .449871, i = n.abs(u) + .386595, f = o * o + i * (.196 * i - .25472 * o) } while (f > .27597 && (f > .27846 || u * u > -4 * n.log(a) * a * a)); return u / a }, r.randg = function (e, t, a) { var u, o, i, f, s, l, c = e; if (a || (a = t), e || (e = 1), t) return l = r.zeros(t, a), l.alter(function () { return r.randg(e) }), l; e < 1 && (e += 1), u = e - 1 / 3, o = 1 / n.sqrt(9 * u); do { do { s = r.randn(), f = 1 + o * s } while (f <= 0); f *= f * f, i = r._random_fn() } while (i > 1 - .331 * n.pow(s, 4) && n.log(i) > .5 * s * s + u * (1 - f + n.log(f))); if (e == c) return u * f; do { i = r._random_fn() } while (0 === i); return n.pow(i, 1 / c) * u * f }, function (n) { for (var e = 0; e < n.length; e++)!function (n) { r.fn[n] = function () { return r(r.map(this, function (e) { return r[n](e) })) } }(n[e]) }("gammaln gammafn factorial factorialln".split(" ")), function (n) { for (var e = 0; e < n.length; e++)!function (n) { r.fn[n] = function () { return r(r[n].apply(null, arguments)) } }(n[e]) }("randn".split(" ")) }(r, Math), function (r, n) { function e(r, e, t, a) { for (var u, o = 0, i = 1, f = 1, s = 1, l = 0, c = 0; n.abs((f - c) / f) > a;)c = f, u = -(e + l) * (e + t + l) * r / (e + 2 * l) / (e + 2 * l + 1), o = f + u * o, i = s + u * i, l += 1, u = l * (t - l) * r / (e + 2 * l - 1) / (e + 2 * l), f = o + u * f, s = i + u * s, o /= s, i /= s, f /= s, s = 1; return f / e } function t(r) { return r / n.abs(r) } function a(e, t, a) { var u = [.9815606342467192, .9041172563704749, .7699026741943047, .5873179542866175, .3678314989981802, .1252334085114689], o = [.04717533638651183, .10693932599531843, .16007832854334622, .20316742672306592, .2334925365383548, .24914704581340277], i = .5 * e; if (i >= 8) return 1; var f = 2 * r.normal.cdf(i, 0, 1, 1, 0) - 1; f = f >= n.exp(-50 / a) ? n.pow(f, a) : 0; var s; s = e > 3 ? 2 : 3; for (var l = i, c = (8 - i) / s, m = l + c, p = 0, h = a - 1, v = 1; v <= s; v++) { for (var g = 0, N = .5 * (m + l), E = .5 * (m - l), I = 1; I <= 12; I++) { var b, d; 6 < I ? (b = 12 - I + 1, d = u[b - 1]) : (b = I, d = -u[b - 1]); var M = E * d, y = N + M, A = y * y; if (A > 60) break; var T = 2 * r.normal.cdf(y, 0, 1, 1, 0), R = 2 * r.normal.cdf(y, e, 1, 1, 0), w = .5 * T - .5 * R; w >= n.exp(-30 / h) && (w = o[b - 1] * n.exp(-.5 * A) * n.pow(w, h), g += w) } g *= 2 * E * a / n.sqrt(2 * n.PI), p += g, l = m, m += c } return (f += p) <= n.exp(-30 / t) ? 0 : (f = n.pow(f, t), f >= 1 ? 1 : f) } function u(r, e, t) { var a = .5 - .5 * r, u = n.sqrt(n.log(1 / (a * a))), o = u + ((((-453642210148e-16 * u - .204231210125) * u - .342242088547) * u - 1) * u + .322232421088) / ((((.0038560700634 * u + .10353775285) * u + .531103462366) * u + .588581570495) * u + .099348462606); t < 120 && (o += (o * o * o + o) / t / 4); var i = .8832 - .2368 * o; return t < 120 && (i += -1.214 / t + 1.208 * o / t), o * (i * n.log(e - 1) + 1.4142) } !function (n) { for (var e = 0; e < n.length; e++)!function (n) { r[n] = function (r, n, e) { return this instanceof arguments.callee ? (this._a = r, this._b = n, this._c = e, this) : new arguments.callee(r, n, e) }, r.fn[n] = function (e, t, a) { var u = r[n](e, t, a); return u.data = this, u }, r[n].prototype.sample = function (e) { var t = this._a, a = this._b, u = this._c; return e ? r.alter(e, function () { return r[n].sample(t, a, u) }) : r[n].sample(t, a, u) }, function (e) { for (var t = 0; t < e.length; t++)!function (e) { r[n].prototype[e] = function (t) { var a = this._a, u = this._b, o = this._c; return t || 0 === t || (t = this.data), "number" != typeof t ? r.fn.map.call(t, function (t) { return r[n][e](t, a, u, o) }) : r[n][e](t, a, u, o) } }(e[t]) }("pdf cdf inv".split(" ")), function (e) { for (var t = 0; t < e.length; t++)!function (e) { r[n].prototype[e] = function () { return r[n][e](this._a, this._b, this._c) } }(e[t]) }("mean median mode variance".split(" ")) }(n[e]) }("beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy laplace lognormal noncentralt normal pareto studentt weibull uniform binomial negbin hypgeom poisson triangular tukey arcsine".split(" ")), r.extend(r.beta, { pdf: function (e, t, a) { return e > 1 || e < 0 ? 0 : 1 == t && 1 == a ? 1 : t < 512 && a < 512 ? n.pow(e, t - 1) * n.pow(1 - e, a - 1) / r.betafn(t, a) : n.exp((t - 1) * n.log(e) + (a - 1) * n.log(1 - e) - r.betaln(t, a)) }, cdf: function (n, e, t) { return n > 1 || n < 0 ? 1 * (n > 1) : r.ibeta(n, e, t) }, inv: function (n, e, t) { return r.ibetainv(n, e, t) }, mean: function (r, n) { return r / (r + n) }, median: function (n, e) { return r.ibetainv(.5, n, e) }, mode: function (r, n) { return (r - 1) / (r + n - 2) }, sample: function (n, e) { var t = r.randg(n); return t / (t + r.randg(e)) }, variance: function (r, e) { return r * e / (n.pow(r + e, 2) * (r + e + 1)) } }), r.extend(r.centralF, { pdf: function (e, t, a) { var u, o; return e < 0 ? 0 : t <= 2 ? 0 === e && t < 2 ? 1 / 0 : 0 === e && 2 === t ? 1 : 1 / r.betafn(t / 2, a / 2) * n.pow(t / a, t / 2) * n.pow(e, t / 2 - 1) * n.pow(1 + t / a * e, -(t + a) / 2) : (u = t * e / (a + e * t), o = a / (a + e * t), t * o / 2 * r.binomial.pdf((t - 2) / 2, (t + a - 2) / 2, u)) }, cdf: function (n, e, t) { return n < 0 ? 0 : r.ibeta(e * n / (e * n + t), e / 2, t / 2) }, inv: function (n, e, t) { return t / (e * (1 / r.ibetainv(n, e / 2, t / 2) - 1)) }, mean: function (r, n) { return n > 2 ? n / (n - 2) : void 0 }, mode: function (r, n) { return r > 2 ? n * (r - 2) / (r * (n + 2)) : void 0 }, sample: function (n, e) { return 2 * r.randg(n / 2) / n / (2 * r.randg(e / 2) / e) }, variance: function (r, n) { if (!(n <= 4)) return 2 * n * n * (r + n - 2) / (r * (n - 2) * (n - 2) * (n - 4)) } }), r.extend(r.cauchy, { pdf: function (r, e, t) { return t < 0 ? 0 : t / (n.pow(r - e, 2) + n.pow(t, 2)) / n.PI }, cdf: function (r, e, t) { return n.atan((r - e) / t) / n.PI + .5 }, inv: function (r, e, t) { return e + t * n.tan(n.PI * (r - .5)) }, median: function (r) { return r }, mode: function (r) { return r }, sample: function (e, t) { return r.randn() * n.sqrt(1 / (2 * r.randg(.5))) * t + e } }), r.extend(r.chisquare, { pdf: function (e, t) { return e < 0 ? 0 : 0 === e && 2 === t ? .5 : n.exp((t / 2 - 1) * n.log(e) - e / 2 - t / 2 * n.log(2) - r.gammaln(t / 2)) }, cdf: function (n, e) { return n < 0 ? 0 : r.lowRegGamma(e / 2, n / 2) }, inv: function (n, e) { return 2 * r.gammapinv(n, .5 * e) }, mean: function (r) { return r }, median: function (r) { return r * n.pow(1 - 2 / (9 * r), 3) }, mode: function (r) { return r - 2 > 0 ? r - 2 : 0 }, sample: function (n) { return 2 * r.randg(n / 2) }, variance: function (r) { return 2 * r } }), r.extend(r.exponential, { pdf: function (r, e) { return r < 0 ? 0 : e * n.exp(-e * r) }, cdf: function (r, e) { return r < 0 ? 0 : 1 - n.exp(-e * r) }, inv: function (r, e) { return -n.log(1 - r) / e }, mean: function (r) { return 1 / r }, median: function (r) { return 1 / r * n.log(2) }, mode: function () { return 0 }, sample: function (e) { return -1 / e * n.log(r._random_fn()) }, variance: function (r) { return n.pow(r, -2) } }), r.extend(r.gamma, { pdf: function (e, t, a) { return e < 0 ? 0 : 0 === e && 1 === t ? 1 / a : n.exp((t - 1) * n.log(e) - e / a - r.gammaln(t) - t * n.log(a)) }, cdf: function (n, e, t) { return n < 0 ? 0 : r.lowRegGamma(e, n / t) }, inv: function (n, e, t) { return r.gammapinv(n, e) * t }, mean: function (r, n) { return r * n }, mode: function (r, n) { if (r > 1) return (r - 1) * n }, sample: function (n, e) { return r.randg(n) * e }, variance: function (r, n) { return r * n * n } }), r.extend(r.invgamma, { pdf: function (e, t, a) { return e <= 0 ? 0 : n.exp(-(t + 1) * n.log(e) - a / e - r.gammaln(t) + t * n.log(a)) }, cdf: function (n, e, t) { return n <= 0 ? 0 : 1 - r.lowRegGamma(e, t / n) }, inv: function (n, e, t) { return t / r.gammapinv(1 - n, e) }, mean: function (r, n) { return r > 1 ? n / (r - 1) : void 0 }, mode: function (r, n) { return n / (r + 1) }, sample: function (n, e) { return e / r.randg(n) }, variance: function (r, n) { if (!(r <= 2)) return n * n / ((r - 1) * (r - 1) * (r - 2)) } }), r.extend(r.kumaraswamy, { pdf: function (r, e, t) { return 0 === r && 1 === e ? t : 1 === r && 1 === t ? e : n.exp(n.log(e) + n.log(t) + (e - 1) * n.log(r) + (t - 1) * n.log(1 - n.pow(r, e))) }, cdf: function (r, e, t) { return r < 0 ? 0 : r > 1 ? 1 : 1 - n.pow(1 - n.pow(r, e), t) }, inv: function (r, e, t) { return n.pow(1 - n.pow(1 - r, 1 / t), 1 / e) }, mean: function (n, e) { return e * r.gammafn(1 + 1 / n) * r.gammafn(e) / r.gammafn(1 + 1 / n + e) }, median: function (r, e) { return n.pow(1 - n.pow(2, -1 / e), 1 / r) }, mode: function (r, e) { if (r >= 1 && e >= 1 && 1 !== r && 1 !== e) return n.pow((r - 1) / (r * e - 1), 1 / r) }, variance: function () { throw new Error("variance not yet implemented") } }), r.extend(r.lognormal, { pdf: function (r, e, t) { return r <= 0 ? 0 : n.exp(-n.log(r) - .5 * n.log(2 * n.PI) - n.log(t) - n.pow(n.log(r) - e, 2) / (2 * t * t)) }, cdf: function (e, t, a) { return e < 0 ? 0 : .5 + .5 * r.erf((n.log(e) - t) / n.sqrt(2 * a * a)) }, inv: function (e, t, a) { return n.exp(-1.4142135623730951 * a * r.erfcinv(2 * e) + t) }, mean: function (r, e) { return n.exp(r + e * e / 2) }, median: function (r) { return n.exp(r) }, mode: function (r, e) { return n.exp(r - e * e) }, sample: function (e, t) { return n.exp(r.randn() * t + e) }, variance: function (r, e) { return (n.exp(e * e) - 1) * n.exp(2 * r + e * e) } }), r.extend(r.noncentralt, { pdf: function (e, t, a) { return n.abs(a) < 1e-14 ? r.studentt.pdf(e, t) : n.abs(e) < 1e-14 ? n.exp(r.gammaln((t + 1) / 2) - a * a / 2 - .5 * n.log(n.PI * t) - r.gammaln(t / 2)) : t / e * (r.noncentralt.cdf(e * n.sqrt(1 + 2 / t), t + 2, a) - r.noncentralt.cdf(e, t, a)) }, cdf: function (e, t, a) { if (n.abs(a) < 1e-14) return r.studentt.cdf(e, t); var u = !1; e < 0 && (u = !0, a = -a); for (var o = r.normal.cdf(-a, 0, 1), i = 1e-14 + 1, f = i, s = e * e / (e * e + t), l = 0, c = n.exp(-a * a / 2), m = n.exp(-a * a / 2 - .5 * n.log(2) - r.gammaln(1.5)) * a; l < 200 || f > 1e-14 || i > 1e-14;)f = i, l > 0 && (c *= a * a / (2 * l), m *= a * a / (2 * (l + .5))), i = c * r.beta.cdf(s, l + .5, t / 2) + m * r.beta.cdf(s, l + 1, t / 2), o += .5 * i, l++; return u ? 1 - o : o } }), r.extend(r.normal, { pdf: function (r, e, t) { return n.exp(-.5 * n.log(2 * n.PI) - n.log(t) - n.pow(r - e, 2) / (2 * t * t)) }, cdf: function (e, t, a) { return .5 * (1 + r.erf((e - t) / n.sqrt(2 * a * a))) }, inv: function (n, e, t) { return -1.4142135623730951 * t * r.erfcinv(2 * n) + e }, mean: function (r) { return r }, median: function (r) { return r }, mode: function (r) { return r }, sample: function (n, e) { return r.randn() * e + n }, variance: function (r, n) { return n * n } }), r.extend(r.pareto, { pdf: function (r, e, t) { return r < e ? 0 : t * n.pow(e, t) / n.pow(r, t + 1) }, cdf: function (r, e, t) { return r < e ? 0 : 1 - n.pow(e / r, t) }, inv: function (r, e, t) { return e / n.pow(1 - r, 1 / t) }, mean: function (r, e) { if (!(e <= 1)) return e * n.pow(r, e) / (e - 1) }, median: function (r, e) { return r * (e * n.SQRT2) }, mode: function (r) { return r }, variance: function (r, e) { if (!(e <= 2)) return r * r * e / (n.pow(e - 1, 2) * (e - 2)) } }), r.extend(r.studentt, { pdf: function (e, t) { return t = t > 1e100 ? 1e100 : t, 1 / (n.sqrt(t) * r.betafn(.5, t / 2)) * n.pow(1 + e * e / t, -(t + 1) / 2) }, cdf: function (e, t) { var a = t / 2; return r.ibeta((e + n.sqrt(e * e + t)) / (2 * n.sqrt(e * e + t)), a, a) }, inv: function (e, t) { var a = r.ibetainv(2 * n.min(e, 1 - e), .5 * t, .5); return a = n.sqrt(t * (1 - a) / a), e > .5 ? a : -a }, mean: function (r) { return r > 1 ? 0 : void 0 }, median: function () { return 0 }, mode: function () { return 0 }, sample: function (e) { return r.randn() * n.sqrt(e / (2 * r.randg(e / 2))) }, variance: function (r) { return r > 2 ? r / (r - 2) : r > 1 ? 1 / 0 : void 0 } }), r.extend(r.weibull, { pdf: function (r, e, t) { return r < 0 || e < 0 || t < 0 ? 0 : t / e * n.pow(r / e, t - 1) * n.exp(-n.pow(r / e, t)) }, cdf: function (r, e, t) { return r < 0 ? 0 : 1 - n.exp(-n.pow(r / e, t)) }, inv: function (r, e, t) { return e * n.pow(-n.log(1 - r), 1 / t) }, mean: function (n, e) { return n * r.gammafn(1 + 1 / e) }, median: function (r, e) { return r * n.pow(n.log(2), 1 / e) }, mode: function (r, e) { return e <= 1 ? 0 : r * n.pow((e - 1) / e, 1 / e) }, sample: function (e, t) { return e * n.pow(-n.log(r._random_fn()), 1 / t) }, variance: function (e, t) { return e * e * r.gammafn(1 + 2 / t) - n.pow(r.weibull.mean(e, t), 2) } }), r.extend(r.uniform, { pdf: function (r, n, e) { return r < n || r > e ? 0 : 1 / (e - n) }, cdf: function (r, n, e) { return r < n ? 0 : r < e ? (r - n) / (e - n) : 1 }, inv: function (r, n, e) { return n + r * (e - n) }, mean: function (r, n) { return .5 * (r + n) }, median: function (n, e) { return r.mean(n, e) }, mode: function () { throw new Error("mode is not yet implemented") }, sample: function (n, e) { return n / 2 + e / 2 + (e / 2 - n / 2) * (2 * r._random_fn() - 1) }, variance: function (r, e) { return n.pow(e - r, 2) / 12 } }), r.extend(r.binomial, { pdf: function (e, t, a) { return 0 === a || 1 === a ? t * a === e ? 1 : 0 : r.combination(t, e) * n.pow(a, e) * n.pow(1 - a, t - e) }, cdf: function (t, a, u) { var o; if (t < 0) return 0; if (t >= a) return 1; if (u < 0 || u > 1 || a <= 0) return NaN; t = n.floor(t); var i = u, f = t + 1, s = a - t, l = f + s, c = n.exp(r.gammaln(l) - r.gammaln(s) - r.gammaln(f) + f * n.log(i) + s * n.log(1 - i)); return o = i < (f + 1) / (l + 2) ? c * e(i, f, s, 1e-10) : 1 - c * e(1 - i, s, f, 1e-10), n.round(1e10 * (1 - o)) / 1e10 } }), r.extend(r.negbin, { pdf: function (e, t, a) { return e === e >>> 0 && (e < 0 ? 0 : r.combination(e + t - 1, t - 1) * n.pow(1 - a, e) * n.pow(a, t)) }, cdf: function (n, e, t) { var a = 0, u = 0; if (n < 0) return 0; for (; u <= n; u++)a += r.negbin.pdf(u, e, t); return a } }), r.extend(r.hypgeom, { pdf: function (e, t, a, u) { if (e !== e | 0) return !1; if (e < 0 || e < a - (t - u)) return 0; if (e > u || e > a) return 0; if (2 * a > t) return 2 * u > t ? r.hypgeom.pdf(t - a - u + e, t, t - a, t - u) : r.hypgeom.pdf(u - e, t, t - a, u); if (2 * u > t) return r.hypgeom.pdf(a - e, t, a, t - u); if (a < u) return r.hypgeom.pdf(e, t, u, a); for (var o = 1, i = 0, f = 0; f < e; f++) { for (; o > 1 && i < u;)o *= 1 - a / (t - i), i++; o *= (u - f) * (a - f) / ((f + 1) * (t - a - u + f + 1)) } for (; i < u; i++)o *= 1 - a / (t - i); return n.min(1, n.max(0, o)) }, cdf: function (e, t, a, u) { if (e < 0 || e < a - (t - u)) return 0; if (e >= u || e >= a) return 1; if (2 * a > t) return 2 * u > t ? r.hypgeom.cdf(t - a - u + e, t, t - a, t - u) : 1 - r.hypgeom.cdf(u - e - 1, t, t - a, u); if (2 * u > t) return 1 - r.hypgeom.cdf(a - e - 1, t, a, t - u); if (a < u) return r.hypgeom.cdf(e, t, u, a); for (var o = 1, i = 1, f = 0, s = 0; s < e; s++) { for (; o > 1 && f < u;) { var l = 1 - a / (t - f); i *= l, o *= l, f++ } i *= (u - s) * (a - s) / ((s + 1) * (t - a - u + s + 1)), o += i } for (; f < u; f++)o *= 1 - a / (t - f); return n.min(1, n.max(0, o)) } }), r.extend(r.poisson, { pdf: function (e, t) { return t < 0 || e % 1 != 0 || e < 0 ? 0 : n.pow(t, e) * n.exp(-t) / r.factorial(e) }, cdf: function (n, e) { var t = [], a = 0; if (n < 0) return 0; for (; a <= n; a++)t.push(r.poisson.pdf(a, e)); return r.sum(t) }, mean: function (r) { return r }, variance: function (r) { return r }, sampleSmall: function (e) { var t = 1, a = 0, u = n.exp(-e); do { a++, t *= r._random_fn() } while (t > u); return a - 1 }, sampleLarge: function (e) { var t, a, u, o, i, f, s, l, c, m, p = e; for (o = n.sqrt(p), i = n.log(p), s = .931 + 2.53 * o, f = .02483 * s - .059, l = 1.1239 + 1.1328 / (s - 3.4), c = .9277 - 3.6224 / (s - 2); ;) { if (a = n.random() - .5, u = n.random(), m = .5 - n.abs(a), t = n.floor((2 * f / m + s) * a + p + .43), m >= .07 && u <= c) return t; if (!(t < 0 || m < .013 && u > m) && n.log(u) + n.log(l) - n.log(f / (m * m) + s) <= t * i - p - r.loggam(t + 1)) return t } }, sample: function (r) { return r < 10 ? this.sampleSmall(r) : this.sampleLarge(r) } }), r.extend(r.triangular, { pdf: function (r, n, e, t) { return e <= n || t < n || t > e ? NaN : r < n || r > e ? 0 : r < t ? 2 * (r - n) / ((e - n) * (t - n)) : r === t ? 2 / (e - n) : 2 * (e - r) / ((e - n) * (e - t)) }, cdf: function (r, e, t, a) { return t <= e || a < e || a > t ? NaN : r <= e ? 0 : r >= t ? 1 : r <= a ? n.pow(r - e, 2) / ((t - e) * (a - e)) : 1 - n.pow(t - r, 2) / ((t - e) * (t - a)) }, inv: function (r, e, t, a) { return t <= e || a < e || a > t ? NaN : r <= (a - e) / (t - e) ? e + (t - e) * n.sqrt(r * ((a - e) / (t - e))) : e + (t - e) * (1 - n.sqrt((1 - r) * (1 - (a - e) / (t - e)))) }, mean: function (r, n, e) { return (r + n + e) / 3 }, median: function (r, e, t) { return t <= (r + e) / 2 ? e - n.sqrt((e - r) * (e - t)) / n.sqrt(2) : t > (r + e) / 2 ? r + n.sqrt((e - r) * (t - r)) / n.sqrt(2) : void 0 }, mode: function (r, n, e) { return e }, sample: function (e, t, a) { var u = r._random_fn(); return u < (a - e) / (t - e) ? e + n.sqrt(u * (t - e) * (a - e)) : t - n.sqrt((1 - u) * (t - e) * (t - a)) }, variance: function (r, n, e) { return (r * r + n * n + e * e - r * n - r * e - n * e) / 18 } }), r.extend(r.arcsine, { pdf: function (r, e, t) { return t <= e ? NaN : r <= e || r >= t ? 0 : 2 / n.PI * n.pow(n.pow(t - e, 2) - n.pow(2 * r - e - t, 2), -.5) }, cdf: function (r, e, t) { return r < e ? 0 : r < t ? 2 / n.PI * n.asin(n.sqrt((r - e) / (t - e))) : 1 }, inv: function (r, e, t) { return e + (.5 - .5 * n.cos(n.PI * r)) * (t - e) }, mean: function (r, n) { return n <= r ? NaN : (r + n) / 2 }, median: function (r, n) { return n <= r ? NaN : (r + n) / 2 }, mode: function () { throw new Error("mode is not yet implemented") }, sample: function (e, t) { return (e + t) / 2 + (t - e) / 2 * n.sin(2 * n.PI * r.uniform.sample(0, 1)) }, variance: function (r, e) { return e <= r ? NaN : n.pow(e - r, 2) / 8 } }), r.extend(r.laplace, { pdf: function (r, e, t) { return t <= 0 ? 0 : n.exp(-n.abs(r - e) / t) / (2 * t) }, cdf: function (r, e, t) { return t <= 0 ? 0 : r < e ? .5 * n.exp((r - e) / t) : 1 - .5 * n.exp(-(r - e) / t) }, mean: function (r) { return r }, median: function (r) { return r }, mode: function (r) { return r }, variance: function (r, n) { return 2 * n * n }, sample: function (e, a) { var u = r._random_fn() - .5; return e - a * t(u) * n.log(1 - 2 * n.abs(u)) } }), r.extend(r.tukey, { cdf: function (e, t, u) { var o = t, i = [.9894009349916499, .9445750230732326, .8656312023878318, .755404408355003, .6178762444026438, .45801677765722737, .2816035507792589, .09501250983763744], f = [.027152459411754096, .062253523938647894, .09515851168249279, .12462897125553388, .14959598881657674, .16915651939500254, .18260341504492358, .1894506104550685]; if (e <= 0) return 0; if (u < 2 || o < 2) return NaN; if (!Number.isFinite(e)) return 1; if (u > 25e3) return a(e, 1, o); var s, l = .5 * u, c = l * n.log(u) - u * n.log(2) - r.gammaln(l), m = l - 1, p = .25 * u; s = u <= 100 ? 1 : u <= 800 ? .5 : u <= 5e3 ? .25 : .125, c += n.log(s); for (var h = 0, v = 1; v <= 50; v++) { for (var g = 0, N = (2 * v - 1) * s, E = 1; E <= 16; E++) { var I, b; 8 < E ? (I = E - 8 - 1, b = c + m * n.log(N + i[I] * s) - (i[I] * s + N) * p) : (I = E - 1, b = c + m * n.log(N - i[I] * s) + (i[I] * s - N) * p); var d; if (b >= -30) { d = 8 < E ? e * n.sqrt(.5 * (i[I] * s + N)) : e * n.sqrt(.5 * (-i[I] * s + N)); g += a(d, 1, o) * f[I] * n.exp(b) } } if (v * s >= 1 && g <= 1e-14) break; h += g } if (g > 1e-14) throw new Error("tukey.cdf failed to converge"); return h > 1 && (h = 1), h }, inv: function (e, t, a) { var o = t; if (a < 2 || o < 2) return NaN; if (e < 0 || e > 1) return NaN; if (0 === e) return 0; if (1 === e) return 1 / 0; var i, f = u(e, o, a), s = r.tukey.cdf(f, t, a) - e; i = s > 0 ? n.max(0, f - 1) : f + 1; for (var l, c = r.tukey.cdf(i, t, a) - e, m = 1; m < 50; m++) { l = i - c * (i - f) / (c - s), s = c, f = i, l < 0 && (l = 0, c = -e), c = r.tukey.cdf(l, t, a) - e, i = l; if (n.abs(i - f) < 1e-4) return l } throw new Error("tukey.inv failed to converge") } }) }(r, Math), function (r, n) { function e(n) { return a(n) || n instanceof r } var t = Array.prototype.push, a = r.utils.isArray; r.extend({ add: function (n, t) { return e(t) ? (e(t[0]) || (t = [t]), r.map(n, function (r, n, e) { return r + t[n][e] })) : r.map(n, function (r) { return r + t }) }, subtract: function (n, t) { return e(t) ? (e(t[0]) || (t = [t]), r.map(n, function (r, n, e) { return r - t[n][e] || 0 })) : r.map(n, function (r) { return r - t }) }, divide: function (n, t) { return e(t) ? (e(t[0]) || (t = [t]), r.multiply(n, r.inv(t))) : r.map(n, function (r) { return r / t }) }, multiply: function (n, t) { var a, u, o, i, f, s, l, c; if (void 0 === n.length && void 0 === t.length) return n * t; if (f = n.length, s = n[0].length, l = r.zeros(f, o = e(t) ? t[0].length : s), c = 0, e(t)) { for (; c < o; c++)for (a = 0; a < f; a++) { for (i = 0, u = 0; u < s; u++)i += n[a][u] * t[u][c]; l[a][c] = i } return 1 === f && 1 === c ? l[0][0] : l } return r.map(n, function (r) { return r * t }) }, outer: function (n, e) { return r.multiply(n.map(function (r) { return [r] }), [e]) }, dot: function (n, t) { e(n[0]) || (n = [n]), e(t[0]) || (t = [t]); for (var a, u, o = 1 === n[0].length && 1 !== n.length ? r.transpose(n) : n, i = 1 === t[0].length && 1 !== t.length ? r.transpose(t) : t, f = [], s = 0, l = o.length, c = o[0].length; s < l; s++) { for (f[s] = [], a = 0, u = 0; u < c; u++)a += o[s][u] * i[s][u]; f[s] = a } return 1 === f.length ? f[0] : f }, pow: function (e, t) { return r.map(e, function (r) { return n.pow(r, t) }) }, exp: function (e) { return r.map(e, function (r) { return n.exp(r) }) }, log: function (e) { return r.map(e, function (r) { return n.log(r) }) }, abs: function (e) { return r.map(e, function (r) { return n.abs(r) }) }, norm: function (r, t) { var a = 0, u = 0; for (isNaN(t) && (t = 2), e(r[0]) && (r = r[0]); u < r.length; u++)a += n.pow(n.abs(r[u]), t); return n.pow(a, 1 / t) }, angle: function (e, t) { return n.acos(r.dot(e, t) / (r.norm(e) * r.norm(t))) }, aug: function (r, n) { var e, a = []; for (e = 0; e < r.length; e++)a.push(r[e].slice()); for (e = 0; e < a.length; e++)t.apply(a[e], n[e]); return a }, inv: function (n) { for (var e, t = n.length, a = n[0].length, u = r.identity(t, a), o = r.gauss_jordan(n, u), i = [], f = 0; f < t; f++)for (i[f] = [], e = a; e < o[0].length; e++)i[f][e - a] = o[f][e]; return i }, det: function (r) { var n, e = r.length, t = 2 * e, a = new Array(t), u = e - 1, o = t - 1, i = u - e + 1, f = o, s = 0, l = 0; if (2 === e) return r[0][0] * r[1][1] - r[0][1] * r[1][0]; for (; s < t; s++)a[s] = 1; for (s = 0; s < e; s++) { for (n = 0; n < e; n++)a[i < 0 ? i + e : i] *= r[s][n], a[f < e ? f + e : f] *= r[s][n], i++, f--; i = --u - e + 1, f = --o } for (s = 0; s < e; s++)l += a[s]; for (; s < t; s++)l -= a[s]; return l }, gauss_elimination: function (e, t) { var a, u, o, i, f = 0, s = 0, l = e.length, c = e[0].length, m = 1, p = 0, h = []; for (e = r.aug(e, t), a = e[0].length, f = 0; f < l; f++) { for (u = e[f][f], s = f, i = f + 1; i < c; i++)u < n.abs(e[i][f]) && (u = e[i][f], s = i); if (s != f) for (i = 0; i < a; i++)o = e[f][i], e[f][i] = e[s][i], e[s][i] = o; for (s = f + 1; s < l; s++)for (m = e[s][f] / e[f][f], i = f; i < a; i++)e[s][i] = e[s][i] - m * e[f][i] } for (f = l - 1; f >= 0; f--) { for (p = 0, s = f + 1; s <= l - 1; s++)p += h[s] * e[f][s]; h[f] = (e[f][a - 1] - p) / e[f][f] } return h }, gauss_jordan: function (e, t) { var a, u, o, i = r.aug(e, t), f = i.length, s = i[0].length, l = 0; for (u = 0; u < f; u++) { var c = u; for (o = u + 1; o < f; o++)n.abs(i[o][u]) > n.abs(i[c][u]) && (c = o); var m = i[u]; for (i[u] = i[c], i[c] = m, o = u + 1; o < f; o++)for (l = i[o][u] / i[u][u], a = u; a < s; a++)i[o][a] -= i[u][a] * l } for (u = f - 1; u >= 0; u--) { for (l = i[u][u], o = 0; o < u; o++)for (a = s - 1; a > u - 1; a--)i[o][a] -= i[u][a] * i[o][u] / l; for (i[u][u] /= l, a = f; a < s; a++)i[u][a] /= l } return i }, triaUpSolve: function (n, e) { var t, a = n[0].length, u = r.zeros(1, a)[0], o = !1; return void 0 != e[0].length && (e = e.map(function (r) { return r[0] }), o = !0), r.arange(a - 1, -1, -1).forEach(function (o) { t = r.arange(o + 1, a).map(function (r) { return u[r] * n[o][r] }), u[o] = (e[o] - r.sum(t)) / n[o][o] }), o ? u.map(function (r) { return [r] }) : u }, triaLowSolve: function (n, e) { var t, a = n[0].length, u = r.zeros(1, a)[0], o = !1; return void 0 != e[0].length && (e = e.map(function (r) { return r[0] }), o = !0), r.arange(a).forEach(function (a) { t = r.arange(a).map(function (r) { return n[a][r] * u[r] }), u[a] = (e[a] - r.sum(t)) / n[a][a] }), o ? u.map(function (r) { return [r] }) : u }, lu: function (n) { var e, t = n.length, a = r.identity(t), u = r.zeros(n.length, n[0].length); return r.arange(t).forEach(function (r) { u[0][r] = n[0][r] }), r.arange(1, t).forEach(function (o) { r.arange(o).forEach(function (t) { e = r.arange(t).map(function (r) { return a[o][r] * u[r][t] }), a[o][t] = (n[o][t] - r.sum(e)) / u[t][t] }), r.arange(o, t).forEach(function (t) { e = r.arange(o).map(function (r) { return a[o][r] * u[r][t] }), u[o][t] = n[e.length][t] - r.sum(e) }) }), [a, u] }, cholesky: function (e) { var t, a = e.length, u = r.zeros(e.length, e[0].length); return r.arange(a).forEach(function (o) { t = r.arange(o).map(function (r) { return n.pow(u[o][r], 2) }), u[o][o] = n.sqrt(e[o][o] - r.sum(t)), r.arange(o + 1, a).forEach(function (n) { t = r.arange(o).map(function (r) { return u[o][r] * u[n][r] }), u[n][o] = (e[o][n] - r.sum(t)) / u[o][o] }) }), u }, gauss_jacobi: function (e, t, a, u) { for (var o, i, f, s, l = 0, c = 0, m = e.length, p = [], h = [], v = []; l < m; l++)for (p[l] = [], h[l] = [], v[l] = [], c = 0; c < m; c++)l > c ? (p[l][c] = e[l][c], h[l][c] = v[l][c] = 0) : l < c ? (h[l][c] = e[l][c], p[l][c] = v[l][c] = 0) : (v[l][c] = e[l][c], p[l][c] = h[l][c] = 0); for (f = r.multiply(r.multiply(r.inv(v), r.add(p, h)), -1), i = r.multiply(r.inv(v), t), o = a, s = r.add(r.multiply(f, a), i), l = 2; n.abs(r.norm(r.subtract(s, o))) > u;)o = s, s = r.add(r.multiply(f, o), i), l++; return s }, gauss_seidel: function (e, t, a, u) { for (var o, i, f, s, l, c = 0, m = e.length, p = [], h = [], v = []; c < m; c++)for (p[c] = [], h[c] = [], v[c] = [], o = 0; o < m; o++)c > o ? (p[c][o] = e[c][o], h[c][o] = v[c][o] = 0) : c < o ? (h[c][o] = e[c][o], p[c][o] = v[c][o] = 0) : (v[c][o] = e[c][o], p[c][o] = h[c][o] = 0); for (s = r.multiply(r.multiply(r.inv(r.add(v, p)), h), -1), f = r.multiply(r.inv(r.add(v, p)), t), i = a, l = r.add(r.multiply(s, a), f), c = 2; n.abs(r.norm(r.subtract(l, i))) > u;)i = l, l = r.add(r.multiply(s, i), f), c += 1; return l }, SOR: function (e, t, a, u, o) { for (var i, f, s, l, c, m = 0, p = e.length, h = [], v = [], g = []; m < p; m++)for (h[m] = [], v[m] = [], g[m] = [], i = 0; i < p; i++)m > i ? (h[m][i] = e[m][i], v[m][i] = g[m][i] = 0) : m < i ? (v[m][i] = e[m][i], h[m][i] = g[m][i] = 0) : (g[m][i] = e[m][i], h[m][i] = v[m][i] = 0); for (l = r.multiply(r.inv(r.add(g, r.multiply(h, o))), r.subtract(r.multiply(g, 1 - o), r.multiply(v, o))), s = r.multiply(r.multiply(r.inv(r.add(g, r.multiply(h, o))), t), o), f = a, c = r.add(r.multiply(l, a), s), m = 2; n.abs(r.norm(r.subtract(c, f))) > u;)f = c, c = r.add(r.multiply(l, f), s), m++; return c }, householder: function (e) { for (var t, a, u, o, i, f = e.length, s = e[0].length, l = 0, c = [], m = []; l < f - 1; l++) { for (t = 0, o = l + 1; o < s; o++)t += e[o][l] * e[o][l]; for (i = e[l + 1][l] > 0 ? -1 : 1, t = i * n.sqrt(t), a = n.sqrt((t * t - e[l + 1][l] * t) / 2), c = r.zeros(f, 1), c[l + 1][0] = (e[l + 1][l] - t) / (2 * a), u = l + 2; u < f; u++)c[u][0] = e[u][l] / (2 * a); m = r.subtract(r.identity(f, s), r.multiply(r.multiply(c, r.transpose(c)), 2)), e = r.multiply(m, r.multiply(e, m)) } return e }, QR: function () { function e(e) { var u = e.length, o = e[0].length, i = r.zeros(o, o); e = r.copy(e); var f, s, l; for (s = 0; s < o; s++) { for (i[s][s] = n.sqrt(t(a(u).map(function (r) { return e[r][s] * e[r][s] }))), f = 0; f < u; f++)e[f][s] = e[f][s] / i[s][s]; for (l = s + 1; l < o; l++)for (i[s][l] = t(a(u).map(function (r) { return e[r][s] * e[r][l] })), f = 0; f < u; f++)e[f][l] = e[f][l] - e[f][s] * i[s][l] } return [e, i] } var t = r.sum, a = r.arange; return e }(), lstsq: function () { function n(n) { n = r.copy(n); var e = n.length, t = r.identity(e); return r.arange(e - 1, -1, -1).forEach(function (e) { r.sliceAssign(t, { row: e }, r.divide(r.slice(t, { row: e }), n[e][e])), r.sliceAssign(n, { row: e }, r.divide(r.slice(n, { row: e }), n[e][e])), r.arange(e).forEach(function (a) { var u = r.multiply(n[a][e], -1), o = r.slice(n, { row: a }), i = r.multiply(r.slice(n, { row: e }), u); r.sliceAssign(n, { row: a }, r.add(o, i)); var f = r.slice(t, { row: a }), s = r.multiply(r.slice(t, { row: e }), u); r.sliceAssign(t, { row: a }, r.add(f, s)) }) }), t } function e(e, t) { var a = !1; void 0 === t[0].length && (t = t.map(function (r) { return [r] }), a = !0); var u = r.QR(e), o = u[0], i = u[1], f = e[0].length, s = r.slice(o, { col: { end: f } }), l = r.slice(i, { row: { end: f } }), c = n(l), m = r.transpose(s); void 0 === m[0].length && (m = [m]); var p = r.multiply(r.multiply(c, m), t); return void 0 === p.length && (p = [[p]]), a ? p.map(function (r) { return r[0] }) : p } return e }(), jacobi: function (e) { for (var t, a, u, o, i, f, s, l, c = 1, m = e.length, p = r.identity(m, m), h = []; 1 === c;) { for (f = e[0][1], o = 0, i = 1, a = 0; a < m; a++)for (u = 0; u < m; u++)a != u && f < n.abs(e[a][u]) && (f = n.abs(e[a][u]), o = a, i = u); for (s = e[o][o] === e[i][i] ? e[o][i] > 0 ? n.PI / 4 : -n.PI / 4 : n.atan(2 * e[o][i] / (e[o][o] - e[i][i])) / 2, l = r.identity(m, m), l[o][o] = n.cos(s), l[o][i] = -n.sin(s), l[i][o] = n.sin(s), l[i][i] = n.cos(s), p = r.multiply(p, l), t = r.multiply(r.multiply(r.inv(l), e), l), e = t, c = 0, a = 1; a < m; a++)for (u = 1; u < m; u++)a != u && n.abs(e[a][u]) > .001 && (c = 1) } for (a = 0; a < m; a++)h.push(e[a][a]); return [p, h] }, rungekutta: function (r, n, e, t, a, u) { var o, i, f, s, l; if (2 === u) for (; t <= e;)o = n * r(t, a), i = n * r(t + n, a + o), f = a + (o + i) / 2, a = f, t += n; if (4 === u) for (; t <= e;)o = n * r(t, a), i = n * r(t + n / 2, a + o / 2), s = n * r(t + n / 2, a + i / 2), l = n * r(t + n, a + s), f = a + (o + 2 * i + 2 * s + l) / 6, a = f, t += n; return a }, romberg: function (r, e, t, a) { for (var u, o, i, f, s, l = 0, c = (t - e) / 2, m = [], p = [], h = []; l < a / 2;) { for (s = r(e), i = e, f = 0; i <= t; i += c, f++)m[f] = i; for (u = m.length, i = 1; i < u - 1; i++)s += (i % 2 != 0 ? 4 : 2) * r(m[i]); s = c / 3 * (s + r(t)), h[l] = s, c /= 2, l++ } for (o = h.length, u = 1; 1 !== o;) { for (i = 0; i < o - 1; i++)p[i] = (n.pow(4, u) * h[i + 1] - h[i]) / (n.pow(4, u) - 1); o = p.length, h = p, p = [], u++ } return h }, richardson: function (r, e, t, a) { function u(r, n) { for (var e, t = 0, a = r.length; t < a; t++)r[t] === n && (e = t); return e } for (var o, i, f, s, l, c = n.abs(t - r[u(r, t) + 1]), m = 0, p = [], h = []; a >= c;)o = u(r, t + a), i = u(r, t), p[m] = (e[o] - 2 * e[i] + e[2 * i - o]) / (a * a), a /= 2, m++; for (s = p.length, f = 1; 1 != s;) { for (l = 0; l < s - 1; l++)h[l] = (n.pow(4, f) * p[l + 1] - p[l]) / (n.pow(4, f) - 1); s = h.length, p = h, h = [], f++ } return p }, simpson: function (r, n, e, t) { for (var a, u = (e - n) / t, o = r(n), i = [], f = n, s = 0, l = 1; f <= e; f += u, s++)i[s] = f; for (a = i.length; l < a - 1; l++)o += (l % 2 != 0 ? 4 : 2) * r(i[l]); return u / 3 * (o + r(e)) }, hermite: function (r, n, e, t) { for (var a, u = r.length, o = 0, i = 0, f = [], s = [], l = [], c = []; i < u; i++) { for (f[i] = 1, a = 0; a < u; a++)i != a && (f[i] *= (t - r[a]) / (r[i] - r[a])); for (s[i] = 0, a = 0; a < u; a++)i != a && (s[i] += 1 / (r[i] - r[a])); l[i] = (1 - 2 * (t - r[i]) * s[i]) * (f[i] * f[i]), c[i] = (t - r[i]) * (f[i] * f[i]), o += l[i] * n[i] + c[i] * e[i] } return o }, lagrange: function (r, n, e) { for (var t, a, u = 0, o = 0, i = r.length; o < i; o++) { for (a = n[o], t = 0; t < i; t++)o != t && (a *= (e - r[t]) / (r[o] - r[t])); u += a } return u }, cubic_spline: function (n, e, t) { for (var a, u = n.length, o = 0, i = [], f = [], s = [], l = [], c = [], m = [], p = []; o < u - 1; o++)c[o] = n[o + 1] - n[o]; for (s[0] = 0, o = 1; o < u - 1; o++)s[o] = 3 / c[o] * (e[o + 1] - e[o]) - 3 / c[o - 1] * (e[o] - e[o - 1]); for (o = 1; o < u - 1; o++)i[o] = [], f[o] = [], i[o][o - 1] = c[o - 1], i[o][o] = 2 * (c[o - 1] + c[o]), i[o][o + 1] = c[o], f[o][0] = s[o]; for (l = r.multiply(r.inv(i), f), a = 0; a < u - 1; a++)m[a] = (e[a + 1] - e[a]) / c[a] - c[a] * (l[a + 1][0] + 2 * l[a][0]) / 3, p[a] = (l[a + 1][0] - l[a][0]) / (3 * c[a]); for (a = 0; a < u && !(n[a] > t); a++); return a -= 1, e[a] + (t - n[a]) * m[a] + r.sq(t - n[a]) * l[a] + (t - n[a]) * r.sq(t - n[a]) * p[a] }, gauss_quadrature: function () { throw new Error("gauss_quadrature not yet implemented") }, PCA: function (n) { var e, t, a = n.length, u = n[0].length, o = 0, i = [], f = [], s = [], l = [], c = [], m = [], p = [], h = [], v = [], g = []; for (o = 0; o < a; o++)i[o] = r.sum(n[o]) / u; for (o = 0; o < u; o++)for (p[o] = [], e = 0; e < a; e++)p[o][e] = n[e][o] - i[e]; for (p = r.transpose(p), o = 0; o < a; o++)for (h[o] = [], e = 0; e < a; e++)h[o][e] = r.dot([p[o]], [p[e]]) / (u - 1); for (s = r.jacobi(h), v = s[0], f = s[1], g = r.transpose(v), o = 0; o < f.length; o++)for (e = o; e < f.length; e++)f[o] < f[e] && (t = f[o], f[o] = f[e], f[e] = t, l = g[o], g[o] = g[e], g[e] = l); for (m = r.transpose(p), o = 0; o < a; o++)for (c[o] = [], e = 0; e < m.length; e++)c[o][e] = r.dot([g[o]], [m[e]]); return [n, f, g, c] } }), function (n) { for (var e = 0; e < n.length; e++)!function (n) { r.fn[n] = function (e, t) { var a = this; return t ? (setTimeout(function () { t.call(a, r.fn[n].call(a, e)) }, 15), this) : "number" == typeof r[n](this, e) ? r[n](this, e) : r(r[n](this, e)) } }(n[e]) }("add divide multiply subtract dot pow exp log abs norm angle".split(" ")) }(r, Math), function (r, n) { function e(r, e, t, a) { if (r > 1 || t > 1 || r <= 0 || t <= 0) throw new Error("Proportions should be greater than 0 and less than 1"); var u = (r * e + t * a) / (e + a); return (r - t) / n.sqrt(u * (1 - u) * (1 / e + 1 / a)) } var t = [].slice, a = r.utils.isNumber, u = r.utils.isArray; r.extend({ zscore: function () { var n = t.call(arguments); return a(n[1]) ? (n[0] - n[1]) / n[2] : (n[0] - r.mean(n[1])) / r.stdev(n[1], n[2]) }, ztest: function () { var e, a = t.call(arguments); return u(a[1]) ? (e = r.zscore(a[0], a[1], a[3]), 1 === a[2] ? r.normal.cdf(-n.abs(e), 0, 1) : 2 * r.normal.cdf(-n.abs(e), 0, 1)) : a.length > 2 ? (e = r.zscore(a[0], a[1], a[2]), 1 === a[3] ? r.normal.cdf(-n.abs(e), 0, 1) : 2 * r.normal.cdf(-n.abs(e), 0, 1)) : (e = a[0], 1 === a[1] ? r.normal.cdf(-n.abs(e), 0, 1) : 2 * r.normal.cdf(-n.abs(e), 0, 1)) } }), r.extend(r.fn, { zscore: function (r, n) { return (r - this.mean()) / this.stdev(n) }, ztest: function (e, t, a) { var u = n.abs(this.zscore(e, a)); return 1 === t ? r.normal.cdf(-u, 0, 1) : 2 * r.normal.cdf(-u, 0, 1) } }), r.extend({ tscore: function () { var e = t.call(arguments); return 4 === e.length ? (e[0] - e[1]) / (e[2] / n.sqrt(e[3])) : (e[0] - r.mean(e[1])) / (r.stdev(e[1], !0) / n.sqrt(e[1].length)) }, ttest: function () { var e, u = t.call(arguments); return 5 === u.length ? (e = n.abs(r.tscore(u[0], u[1], u[2], u[3])), 1 === u[4] ? r.studentt.cdf(-e, u[3] - 1) : 2 * r.studentt.cdf(-e, u[3] - 1)) : a(u[1]) ? (e = n.abs(u[0]), 1 == u[2] ? r.studentt.cdf(-e, u[1] - 1) : 2 * r.studentt.cdf(-e, u[1] - 1)) : (e = n.abs(r.tscore(u[0], u[1])), 1 == u[2] ? r.studentt.cdf(-e, u[1].length - 1) : 2 * r.studentt.cdf(-e, u[1].length - 1)) } }), r.extend(r.fn, { tscore: function (r) { return (r - this.mean()) / (this.stdev(!0) / n.sqrt(this.cols())) }, ttest: function (e, t) { return 1 === t ? 1 - r.studentt.cdf(n.abs(this.tscore(e)), this.cols() - 1) : 2 * r.studentt.cdf(-n.abs(this.tscore(e)), this.cols() - 1) } }), r.extend({ anovafscore: function () { var e, a, u, o, i, f, s, l, c = t.call(arguments); if (1 === c.length) { for (i = new Array(c[0].length), s = 0; s < c[0].length; s++)i[s] = c[0][s]; c = i } for (a = new Array, s = 0; s < c.length; s++)a = a.concat(c[s]); for (u = r.mean(a), e = 0, s = 0; s < c.length; s++)e += c[s].length * n.pow(r.mean(c[s]) - u, 2); for (e /= c.length - 1, f = 0, s = 0; s < c.length; s++)for (o = r.mean(c[s]), l = 0; l < c[s].length; l++)f += n.pow(c[s][l] - o, 2); return f /= a.length - c.length, e / f }, anovaftest: function () { var n, e, u, o, i = t.call(arguments); if (a(i[0])) return 1 - r.centralF.cdf(i[0], i[1], i[2]); var f = r.anovafscore(i); for (n = i.length - 1, u = 0, o = 0; o < i.length; o++)u += i[o].length; return e = u - n - 1, 1 - r.centralF.cdf(f, n, e) }, ftest: function (n, e, t) { return 1 - r.centralF.cdf(n, e, t) } }), r.extend(r.fn, { anovafscore: function () { return r.anovafscore(this.toArray()) }, anovaftes: function () { var n, e = 0; for (n = 0; n < this.length; n++)e += this[n].length; return r.ftest(this.anovafscore(), this.length - 1, e - this.length) } }), r.extend({ qscore: function () { var e, u, o, i, f, s = t.call(arguments); return a(s[0]) ? (e = s[0], u = s[1], o = s[2], i = s[3], f = s[4]) : (e = r.mean(s[0]), u = r.mean(s[1]), o = s[0].length, i = s[1].length, f = s[2]), n.abs(e - u) / (f * n.sqrt((1 / o + 1 / i) / 2)) }, qtest: function () { var n, e = t.call(arguments); 3 === e.length ? (n = e[0], e = e.slice(1)) : 7 === e.length ? (n = r.qscore(e[0], e[1], e[2], e[3], e[4]), e = e.slice(5)) : (n = r.qscore(e[0], e[1], e[2]), e = e.slice(3)); var a = e[0], u = e[1]; return 1 - r.tukey.cdf(n, u, a - u) }, tukeyhsd: function (n) { for (var e = r.pooledstdev(n), t = n.map(function (n) { return r.mean(n) }), a = n.reduce(function (r, n) { return r + n.length }, 0), u = [], o = 0; o < n.length; ++o)for (var i = o + 1; i < n.length; ++i) { var f = r.qtest(t[o], t[i], n[o].length, n[i].length, e, a, n.length); u.push([[o, i], f]) } return u } }), r.extend({ normalci: function () { var e, a = t.call(arguments), u = new Array(2); return e = 4 === a.length ? n.abs(r.normal.inv(a[1] / 2, 0, 1) * a[2] / n.sqrt(a[3])) : n.abs(r.normal.inv(a[1] / 2, 0, 1) * r.stdev(a[2]) / n.sqrt(a[2].length)), u[0] = a[0] - e, u[1] = a[0] + e, u }, tci: function () { var e, a = t.call(arguments), u = new Array(2); return e = 4 === a.length ? n.abs(r.studentt.inv(a[1] / 2, a[3] - 1) * a[2] / n.sqrt(a[3])) : n.abs(r.studentt.inv(a[1] / 2, a[2].length - 1) * r.stdev(a[2], !0) / n.sqrt(a[2].length)), u[0] = a[0] - e, u[1] = a[0] + e, u }, significant: function (r, n) { return r < n } }), r.extend(r.fn, { normalci: function (n, e) { return r.normalci(n, e, this.toArray()) }, tci: function (n, e) { return r.tci(n, e, this.toArray()) } }), r.extend(r.fn, { oneSidedDifferenceOfProportions: function (n, t, a, u) { var o = e(n, t, a, u); return r.ztest(o, 1) }, twoSidedDifferenceOfProportions: function (n, t, a, u) { var o = e(n, t, a, u); return r.ztest(o, 2) } }) }(r, Math), r.models = function () { function n(n) { var t = n[0].length; return r.arange(t).map(function (a) { var u = r.arange(t).filter(function (r) { return r !== a }); return e(r.col(n, a).map(function (r) { return r[0] }), r.col(n, u)) }) } function e(n, e) { var t = n.length, a = e[0].length - 1, u = t - a - 1, o = r.lstsq(e, n), i = r.multiply(e, o.map(function (r) { return [r] })).map(function (r) { return r[0] }), f = r.subtract(n, i), s = r.mean(n), l = r.sum(i.map(function (r) { return Math.pow(r - s, 2) })), c = r.sum(n.map(function (r, n) { return Math.pow(r - i[n], 2) })), m = l + c; return { exog: e, endog: n, nobs: t, df_model: a, df_resid: u, coef: o, predict: i, resid: f, ybar: s, SST: m, SSE: l, SSR: c, R2: l / m } } function t(e) { var t = n(e.exog), a = Math.sqrt(e.SSR / e.df_resid), u = t.map(function (r) { var n = r.SST, e = r.R2; return a / Math.sqrt(n * (1 - e)) }), o = e.coef.map(function (r, n) { return (r - 0) / u[n] }), i = o.map(function (n) { var t = r.studentt.cdf(n, e.df_resid); return 2 * (t > .5 ? 1 - t : t) }), f = r.studentt.inv(.975, e.df_resid), s = e.coef.map(function (r, n) { var e = f * u[n]; return [r - e, r + e] }); return { se: u, t: o, p: i, sigmaHat: a, interval95: s } } function a(n) { var e = n.R2 / n.df_model / ((1 - n.R2) / n.df_resid); return { F_statistic: e, pvalue: 1 - function (n, e, t) { return r.beta.cdf(n / (t / e + n), e / 2, t / 2) }(e, n.df_model, n.df_resid) } } function u(r, n) { var u = e(r, n), o = t(u), i = a(u), f = 1 - (1 - u.R2) * ((u.nobs - 1) / u.df_resid); return u.t = o, u.f = i, u.adjust_R2 = f, u } return { ols: u } }(), r.extend({ buildxmatrix: function () { for (var n = new Array(arguments.length), e = 0; e < arguments.length; e++) { var t = [1]; n[e] = t.concat(arguments[e]) } return r(n) }, builddxmatrix: function () { for (var n = new Array(arguments[0].length), e = 0; e < arguments[0].length; e++) { var t = [1]; n[e] = t.concat(arguments[0][e]) } return r(n) }, buildjxmatrix: function (n) { for (var e = new Array(n.length), t = 0; t < n.length; t++)e[t] = n[t]; return r.builddxmatrix(e) }, buildymatrix: function (n) { return r(n).transpose() }, buildjymatrix: function (r) { return r.transpose() }, matrixmult: function (n, e) { var t, a, u, o, i; if (n.cols() == e.rows()) { if (e.rows() > 1) { for (o = [], t = 0; t < n.rows(); t++)for (o[t] = [], a = 0; a < e.cols(); a++) { for (i = 0, u = 0; u < n.cols(); u++)i += n.toArray()[t][u] * e.toArray()[u][a]; o[t][a] = i } return r(o) } for (o = [], t = 0; t < n.rows(); t++)for (o[t] = [], a = 0; a < e.cols(); a++) { for (i = 0, u = 0; u < n.cols(); u++)i += n.toArray()[t][u] * e.toArray()[a]; o[t][a] = i } return r(o) } }, regress: function (n, e) { var t = r.xtranspxinv(n), a = n.transpose(), u = r.matrixmult(r(t), a); return r.matrixmult(u, e) }, regresst: function (n, e, t) { var a = r.regress(n, e), u = {}; u.anova = {}; var o = r.jMatYBar(n, a); u.yBar = o; var i = e.mean(); u.anova.residuals = r.residuals(e, o), u.anova.ssr = r.ssr(o, i), u.anova.msr = u.anova.ssr / (n[0].length - 1), u.anova.sse = r.sse(e, o), u.anova.mse = u.anova.sse / (e.length - (n[0].length - 1) - 1), u.anova.sst = r.sst(e, i), u.anova.mst = u.anova.sst / (e.length - 1), u.anova.r2 = 1 - u.anova.sse / u.anova.sst, u.anova.r2 < 0 && (u.anova.r2 = 0), u.anova.fratio = u.anova.msr / u.anova.mse, u.anova.pvalue = r.anovaftest(u.anova.fratio, n[0].length - 1, e.length - (n[0].length - 1) - 1), u.anova.rmse = Math.sqrt(u.anova.mse), u.anova.r2adj = 1 - u.anova.mse / u.anova.mst, u.anova.r2adj < 0 && (u.anova.r2adj = 0), u.stats = new Array(n[0].length); for (var f, s, l, c = r.xtranspxinv(n), m = 0; m < a.length; m++)f = Math.sqrt(u.anova.mse * Math.abs(c[m][m])), s = Math.abs(a[m] / f), l = r.ttest(s, e.length - n[0].length - 1, t), u.stats[m] = [a[m], f, s, l]; return u.regress = a, u }, xtranspx: function (n) { return r.matrixmult(n.transpose(), n) }, xtranspxinv: function (n) { var e = r.matrixmult(n.transpose(), n); return r.inv(e) }, jMatYBar: function (n, e) { var t = r.matrixmult(n, e); return new r(t) }, residuals: function (n, e) { return r.matrixsubtract(n, e) }, ssr: function (r, n) { for (var e = 0, t = 0; t < r.length; t++)e += Math.pow(r[t] - n, 2); return e }, sse: function (r, n) { for (var e = 0, t = 0; t < r.length; t++)e += Math.pow(r[t] - n[t], 2); return e }, sst: function (r, n) { for (var e = 0, t = 0; t < r.length; t++)e += Math.pow(r[t] - n, 2); return e }, matrixsubtract: function (n, e) { for (var t = new Array(n.length), a = 0; a < n.length; a++) { t[a] = new Array(n[a].length); for (var u = 0; u < n[a].length; u++)t[a][u] = n[a][u] - e[a][u] } return r(t) } }), r.jStat = r, r }) }, function (r, n, e) { var t = e(1), a = e(0); n.UNIQUE = function () { for (var r = [], n = 0; n < arguments.length; ++n) { for (var e = !1, t = arguments[n], a = 0; a < r.length && !(e = r[a] === t); ++a); e || r.push(t) } return r }, n.FLATTEN = t.flatten, n.ARGS2ARRAY = function () { return Array.prototype.slice.call(arguments, 0) }, n.REFERENCE = function (r, n) { if (!arguments.length) return a.error; try { for (var e = n.split("."), t = r, u = 0; u < e.length; ++u) { var o = e[u]; if ("]" === o[o.length - 1]) { var i = o.indexOf("["), f = o.substring(i + 1, o.length - 1); t = t[o.substring(0, i)][f] } else t = t[o] } return t } catch (r) { } }, n.JOIN = function (r, n) { return r.join(n) }, n.NUMBERS = function () { return t.flatten(arguments).filter(function (r) { return "number" == typeof r }) } }, function (r, n, e) { function t(r) { return /^[01]{1,10}$/.test(r) } var a = e(0), u = e(8), o = e(4), i = e(1), f = e(13); n.BESSELI = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : f.besseli(r, n) }, n.BESSELJ = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : f.besselj(r, n) }, n.BESSELK = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : f.besselk(r, n) }, n.BESSELY = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : f.bessely(r, n) }, n.BIN2DEC = function (r) { if (!t(r)) return a.num; var n = parseInt(r, 2), e = r.toString(); return 10 === e.length && "1" === e.substring(0, 1) ? parseInt(e.substring(1), 2) - 512 : n }, n.BIN2HEX = function (r, n) { if (!t(r)) return a.num; var e = r.toString(); if (10 === e.length && "1" === e.substring(0, 1)) return (0xfffffffe00 + parseInt(e.substring(1), 2)).toString(16); var u = parseInt(r, 2).toString(16); return void 0 === n ? u : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= u.length ? o.REPT("0", n - u.length) + u : a.num) }, n.BIN2OCT = function (r, n) { if (!t(r)) return a.num; var e = r.toString(); if (10 === e.length && "1" === e.substring(0, 1)) return (1073741312 + parseInt(e.substring(1), 2)).toString(8); var u = parseInt(r, 2).toString(8); return void 0 === n ? u : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= u.length ? o.REPT("0", n - u.length) + u : a.num) }, n.BITAND = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : r < 0 || n < 0 ? a.num : Math.floor(r) !== r || Math.floor(n) !== n ? a.num : r > 0xffffffffffff || n > 0xffffffffffff ? a.num : r & n }, n.BITLSHIFT = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : r < 0 ? a.num : Math.floor(r) !== r ? a.num : r > 0xffffffffffff ? a.num : Math.abs(n) > 53 ? a.num : n >= 0 ? r << n : r >> -n }, n.BITOR = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : r < 0 || n < 0 ? a.num : Math.floor(r) !== r || Math.floor(n) !== n ? a.num : r > 0xffffffffffff || n > 0xffffffffffff ? a.num : r | n }, n.BITRSHIFT = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : r < 0 ? a.num : Math.floor(r) !== r ? a.num : r > 0xffffffffffff ? a.num : Math.abs(n) > 53 ? a.num : n >= 0 ? r >> n : r << -n }, n.BITXOR = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : r < 0 || n < 0 ? a.num : Math.floor(r) !== r || Math.floor(n) !== n ? a.num : r > 0xffffffffffff || n > 0xffffffffffff ? a.num : r ^ n }, n.COMPLEX = function (r, n, e) { if (r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n)) return r; if ("i" !== (e = void 0 === e ? "i" : e) && "j" !== e) return a.value; if (0 === r && 0 === n) return 0; if (0 === r) return 1 === n ? e : n.toString() + e; if (0 === n) return r.toString(); var t = n > 0 ? "+" : ""; return r.toString() + t + (1 === n ? e : n.toString() + e) }, n.CONVERT = function (r, n, e) { if ((r = i.parseNumber(r)) instanceof Error) return r; for (var t, u = [["a.u. of action", "?", null, "action", !1, !1, 1.05457168181818e-34], ["a.u. of charge", "e", null, "electric_charge", !1, !1, 1.60217653141414e-19], ["a.u. of energy", "Eh", null, "energy", !1, !1, 4.35974417757576e-18], ["a.u. of length", "a?", null, "length", !1, !1, 5.29177210818182e-11], ["a.u. of mass", "m?", null, "mass", !1, !1, 9.10938261616162e-31], ["a.u. of time", "?/Eh", null, "time", !1, !1, 2.41888432650516e-17], ["admiralty knot", "admkn", null, "speed", !1, !0, .514773333], ["ampere", "A", null, "electric_current", !0, !1, 1], ["ampere per meter", "A/m", null, "magnetic_field_intensity", !0, !1, 1], ["ångström", "Å", ["ang"], "length", !1, !0, 1e-10], ["are", "ar", null, "area", !1, !0, 100], ["astronomical unit", "ua", null, "length", !1, !1, 1.49597870691667e-11], ["bar", "bar", null, "pressure", !1, !1, 1e5], ["barn", "b", null, "area", !1, !1, 1e-28], ["becquerel", "Bq", null, "radioactivity", !0, !1, 1], ["bit", "bit", ["b"], "information", !1, !0, 1], ["btu", "BTU", ["btu"], "energy", !1, !0, 1055.05585262], ["byte", "byte", null, "information", !1, !0, 8], ["candela", "cd", null, "luminous_intensity", !0, !1, 1], ["candela per square metre", "cd/m?", null, "luminance", !0, !1, 1], ["coulomb", "C", null, "electric_charge", !0, !1, 1], ["cubic ångström", "ang3", ["ang^3"], "volume", !1, !0, 1e-30], ["cubic foot", "ft3", ["ft^3"], "volume", !1, !0, .028316846592], ["cubic inch", "in3", ["in^3"], "volume", !1, !0, 16387064e-12], ["cubic light-year", "ly3", ["ly^3"], "volume", !1, !0, 8.46786664623715e-47], ["cubic metre", "m?", null, "volume", !0, !0, 1], ["cubic mile", "mi3", ["mi^3"], "volume", !1, !0, 4168181825.44058], ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", !1, !0, 6352182208], ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", !1, !0, 7.58660370370369e-8], ["cubic yard", "yd3", ["yd^3"], "volume", !1, !0, .764554857984], ["cup", "cup", null, "volume", !1, !0, .0002365882365], ["dalton", "Da", ["u"], "mass", !1, !1, 1.66053886282828e-27], ["day", "d", ["day"], "time", !1, !0, 86400], ["degree", "°", null, "angle", !1, !1, .0174532925199433], ["degrees Rankine", "Rank", null, "temperature", !1, !0, .555555555555556], ["dyne", "dyn", ["dy"], "force", !1, !0, 1e-5], ["electronvolt", "eV", ["ev"], "energy", !1, !0, 1.60217656514141], ["ell", "ell", null, "length", !1, !0, 1.143], ["erg", "erg", ["e"], "energy", !1, !0, 1e-7], ["farad", "F", null, "electric_capacitance", !0, !1, 1], ["fluid ounce", "oz", null, "volume", !1, !0, 295735295625e-16], ["foot", "ft", null, "length", !1, !0, .3048], ["foot-pound", "flb", null, "energy", !1, !0, 1.3558179483314], ["gal", "Gal", null, "acceleration", !1, !1, .01], ["gallon", "gal", null, "volume", !1, !0, .003785411784], ["gauss", "G", ["ga"], "magnetic_flux_density", !1, !0, 1], ["grain", "grain", null, "mass", !1, !0, 647989e-10], ["gram", "g", null, "mass", !1, !0, .001], ["gray", "Gy", null, "absorbed_dose", !0, !1, 1], ["gross registered ton", "GRT", ["regton"], "volume", !1, !0, 2.8316846592], ["hectare", "ha", null, "area", !1, !0, 1e4], ["henry", "H", null, "inductance", !0, !1, 1], ["hertz", "Hz", null, "frequency", !0, !1, 1], ["horsepower", "HP", ["h"], "power", !1, !0, 745.69987158227], ["horsepower-hour", "HPh", ["hh", "hph"], "energy", !1, !0, 2684519.538], ["hour", "h", ["hr"], "time", !1, !0, 3600], ["imperial gallon (U.K.)", "uk_gal", null, "volume", !1, !0, .00454609], ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", !1, !0, 50.802345], ["imperial quart (U.K)", "uk_qt", null, "volume", !1, !0, .0011365225], ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", !1, !0, 1016.046909], ["inch", "in", null, "length", !1, !0, .0254], ["international acre", "uk_acre", null, "area", !1, !0, 4046.8564224], ["IT calorie", "cal", null, "energy", !1, !0, 4.1868], ["joule", "J", null, "energy", !0, !0, 1], ["katal", "kat", null, "catalytic_activity", !0, !1, 1], ["kelvin", "K", ["kel"], "temperature", !0, !0, 1], ["kilogram", "kg", null, "mass", !0, !0, 1], ["knot", "kn", null, "speed", !1, !0, .514444444444444], ["light-year", "ly", null, "length", !1, !0, 9460730472580800], ["litre", "L", ["l", "lt"], "volume", !1, !0, .001], ["lumen", "lm", null, "luminous_flux", !0, !1, 1], ["lux", "lx", null, "illuminance", !0, !1, 1], ["maxwell", "Mx", null, "magnetic_flux", !1, !1, 1e-18], ["measurement ton", "MTON", null, "volume", !1, !0, 1.13267386368], ["meter per hour", "m/h", ["m/hr"], "speed", !1, !0, .00027777777777778], ["meter per second", "m/s", ["m/sec"], "speed", !0, !0, 1], ["meter per second squared", "m?s??", null, "acceleration", !0, !1, 1], ["parsec", "pc", ["parsec"], "length", !1, !0, 0x6da012f958ee1c], ["meter squared per second", "m?/s", null, "kinematic_viscosity", !0, !1, 1], ["metre", "m", null, "length", !0, !0, 1], ["miles per hour", "mph", null, "speed", !1, !0, .44704], ["millimetre of mercury", "mmHg", null, "pressure", !1, !1, 133.322], ["minute", "?", null, "angle", !1, !1, .000290888208665722], ["minute", "min", ["mn"], "time", !1, !0, 60], ["modern teaspoon", "tspm", null, "volume", !1, !0, 5e-6], ["mole", "mol", null, "amount_of_substance", !0, !1, 1], ["morgen", "Morgen", null, "area", !1, !0, 2500], ["n.u. of action", "?", null, "action", !1, !1, 1.05457168181818e-34], ["n.u. of mass", "m?", null, "mass", !1, !1, 9.10938261616162e-31], ["n.u. of speed", "c?", null, "speed", !1, !1, 299792458], ["n.u. of time", "?/(me?c??)", null, "time", !1, !1, 1.28808866778687e-21], ["nautical mile", "M", ["Nmi"], "length", !1, !0, 1852], ["newton", "N", null, "force", !0, !0, 1], ["œrsted", "Oe ", null, "magnetic_field_intensity", !1, !1, 79.5774715459477], ["ohm", "Ω", null, "electric_resistance", !0, !1, 1], ["ounce mass", "ozm", null, "mass", !1, !0, .028349523125], ["pascal", "Pa", null, "pressure", !0, !1, 1], ["pascal second", "Pa?s", null, "dynamic_viscosity", !0, !1, 1], ["pferdestärke", "PS", null, "power", !1, !0, 735.49875], ["phot", "ph", null, "illuminance", !1, !1, 1e-4], ["pica (1/6 inch)", "pica", null, "length", !1, !0, .00035277777777778], ["pica (1/72 inch)", "Pica", ["Picapt"], "length", !1, !0, .00423333333333333], ["poise", "P", null, "dynamic_viscosity", !1, !1, .1], ["pond", "pond", null, "force", !1, !0, .00980665], ["pound force", "lbf", null, "force", !1, !0, 4.4482216152605], ["pound mass", "lbm", null, "mass", !1, !0, .45359237], ["quart", "qt", null, "volume", !1, !0, .000946352946], ["radian", "rad", null, "angle", !0, !1, 1], ["second", "?", null, "angle", !1, !1, 484813681109536e-20], ["second", "s", ["sec"], "time", !0, !0, 1], ["short hundredweight", "cwt", ["shweight"], "mass", !1, !0, 45.359237], ["siemens", "S", null, "electrical_conductance", !0, !1, 1], ["sievert", "Sv", null, "equivalent_dose", !0, !1, 1], ["slug", "sg", null, "mass", !1, !0, 14.59390294], ["square ångström", "ang2", ["ang^2"], "area", !1, !0, 1e-20], ["square foot", "ft2", ["ft^2"], "area", !1, !0, .09290304], ["square inch", "in2", ["in^2"], "area", !1, !0, 64516e-8], ["square light-year", "ly2", ["ly^2"], "area", !1, !0, 8.95054210748189e31], ["square meter", "m?", null, "area", !0, !0, 1], ["square mile", "mi2", ["mi^2"], "area", !1, !0, 2589988.110336], ["square nautical mile", "Nmi2", ["Nmi^2"], "area", !1, !0, 3429904], ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", !1, !0, 1792111111111e-17], ["square yard", "yd2", ["yd^2"], "area", !1, !0, .83612736], ["statute mile", "mi", null, "length", !1, !0, 1609.344], ["steradian", "sr", null, "solid_angle", !0, !1, 1], ["stilb", "sb", null, "luminance", !1, !1, 1e-4], ["stokes", "St", null, "kinematic_viscosity", !1, !1, 1e-4], ["stone", "stone", null, "mass", !1, !0, 6.35029318], ["tablespoon", "tbs", null, "volume", !1, !0, 147868e-10], ["teaspoon", "tsp", null, "volume", !1, !0, 492892e-11], ["tesla", "T", null, "magnetic_flux_density", !0, !0, 1], ["thermodynamic calorie", "c", null, "energy", !1, !0, 4.184], ["ton", "ton", null, "mass", !1, !0, 907.18474], ["tonne", "t", null, "mass", !1, !1, 1e3], ["U.K. pint", "uk_pt", null, "volume", !1, !0, .00056826125], ["U.S. bushel", "bushel", null, "volume", !1, !0, .03523907], ["U.S. oil barrel", "barrel", null, "volume", !1, !0, .158987295], ["U.S. pint", "pt", ["us_pt"], "volume", !1, !0, .000473176473], ["U.S. survey mile", "survey_mi", null, "length", !1, !0, 1609.347219], ["U.S. survey/statute acre", "us_acre", null, "area", !1, !0, 4046.87261], ["volt", "V", null, "voltage", !0, !1, 1], ["watt", "W", null, "power", !0, !0, 1], ["watt-hour", "Wh", ["wh"], "energy", !1, !0, 3600], ["weber", "Wb", null, "magnetic_flux", !0, !1, 1], ["yard", "yd", null, "length", !1, !0, .9144], ["year", "yr", null, "time", !1, !0, 31557600]], o = { Yi: ["yobi", 80, 1.2089258196146292e24, "Yi", "yotta"], Zi: ["zebi", 70, 0x400000000000000000, "Zi", "zetta"], Ei: ["exbi", 60, 0x1000000000000000, "Ei", "exa"], Pi: ["pebi", 50, 0x4000000000000, "Pi", "peta"], Ti: ["tebi", 40, 1099511627776, "Ti", "tera"], Gi: ["gibi", 30, 1073741824, "Gi", "giga"], Mi: ["mebi", 20, 1048576, "Mi", "mega"], ki: ["kibi", 10, 1024, "ki", "kilo"] }, f = { Y: ["yotta", 1e24, "Y"], Z: ["zetta", 1e21, "Z"], E: ["exa", 1e18, "E"], P: ["peta", 1e15, "P"], T: ["tera", 1e12, "T"], G: ["giga", 1e9, "G"], M: ["mega", 1e6, "M"], k: ["kilo", 1e3, "k"], h: ["hecto", 100, "h"], e: ["dekao", 10, "e"], d: ["deci", .1, "d"], c: ["centi", .01, "c"], m: ["milli", .001, "m"], u: ["micro", 1e-6, "u"], n: ["nano", 1e-9, "n"], p: ["pico", 1e-12, "p"], f: ["femto", 1e-15, "f"], a: ["atto", 1e-18, "a"], z: ["zepto", 1e-21, "z"], y: ["yocto", 1e-24, "y"] }, s = null, l = null, c = n, m = e, p = 1, h = 1, v = 0; v < u.length; v++)t = null === u[v][2] ? [] : u[v][2], (u[v][1] === c || t.indexOf(c) >= 0) && (s = u[v]), (u[v][1] === m || t.indexOf(m) >= 0) && (l = u[v]); if (null === s) { var g = o[n.substring(0, 2)], N = f[n.substring(0, 1)]; "da" === n.substring(0, 2) && (N = ["dekao", 10, "da"]), g ? (p = g[2], c = n.substring(2)) : N && (p = N[1], c = n.substring(N[2].length)); for (var E = 0; E < u.length; E++)t = null === u[E][2] ? [] : u[E][2], (u[E][1] === c || t.indexOf(c) >= 0) && (s = u[E]) } if (null === l) { var I = o[e.substring(0, 2)], b = f[e.substring(0, 1)]; "da" === e.substring(0, 2) && (b = ["dekao", 10, "da"]), I ? (h = I[2], m = e.substring(2)) : b && (h = b[1], m = e.substring(b[2].length)); for (var d = 0; d < u.length; d++)t = null === u[d][2] ? [] : u[d][2], (u[d][1] === m || t.indexOf(m) >= 0) && (l = u[d]) } return null === s || null === l ? a.na : s[3] !== l[3] ? a.na : r * s[6] * p / (l[6] * h) }, n.DEC2BIN = function (r, n) { if ((r = i.parseNumber(r)) instanceof Error) return r; if (!/^-?[0-9]{1,3}$/.test(r) || r < -512 || r > 511) return a.num; if (r < 0) return "1" + o.REPT("0", 9 - (512 + r).toString(2).length) + (512 + r).toString(2); var e = parseInt(r, 10).toString(2); return void 0 === n ? e : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= e.length ? o.REPT("0", n - e.length) + e : a.num) }, n.DEC2HEX = function (r, n) { if ((r = i.parseNumber(r)) instanceof Error) return r; if (!/^-?[0-9]{1,12}$/.test(r) || r < -549755813888 || r > 549755813887) return a.num; if (r < 0) return (1099511627776 + r).toString(16); var e = parseInt(r, 10).toString(16); return void 0 === n ? e : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= e.length ? o.REPT("0", n - e.length) + e : a.num) }, n.DEC2OCT = function (r, n) { if ((r = i.parseNumber(r)) instanceof Error) return r; if (!/^-?[0-9]{1,9}$/.test(r) || r < -536870912 || r > 536870911) return a.num; if (r < 0) return (1073741824 + r).toString(8); var e = parseInt(r, 10).toString(8); return void 0 === n ? e : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= e.length ? o.REPT("0", n - e.length) + e : a.num) }, n.DELTA = function (r, n) { return n = void 0 === n ? 0 : n, r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : r === n ? 1 : 0 }, n.ERF = function (r, n) { return n = void 0 === n ? 0 : n, r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? a.value : u.erf(r) }, n.ERF.PRECISE = function () { throw new Error("ERF.PRECISE is not implemented") }, n.ERFC = function (r) { return isNaN(r) ? a.value : u.erfc(r) }, n.ERFC.PRECISE = function () { throw new Error("ERFC.PRECISE is not implemented") }, n.GESTEP = function (r, n) { return n = n || 0, r = i.parseNumber(r), i.anyIsError(n, r) ? r : r >= n ? 1 : 0 }, n.HEX2BIN = function (r, n) { if (!/^[0-9A-Fa-f]{1,10}$/.test(r)) return a.num; var e = 10 === r.length && "f" === r.substring(0, 1).toLowerCase(), t = e ? parseInt(r, 16) - 1099511627776 : parseInt(r, 16); if (t < -512 || t > 511) return a.num; if (e) return "1" + o.REPT("0", 9 - (512 + t).toString(2).length) + (512 + t).toString(2); var u = t.toString(2); return void 0 === n ? u : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= u.length ? o.REPT("0", n - u.length) + u : a.num) }, n.HEX2DEC = function (r) { if (!/^[0-9A-Fa-f]{1,10}$/.test(r)) return a.num; var n = parseInt(r, 16); return n >= 549755813888 ? n - 1099511627776 : n }, n.HEX2OCT = function (r, n) { if (!/^[0-9A-Fa-f]{1,10}$/.test(r)) return a.num; var e = parseInt(r, 16); if (e > 536870911 && e < 0xffe0000000) return a.num; if (e >= 0xffe0000000) return (e - 0xffc0000000).toString(8); var t = e.toString(8); return void 0 === n ? t : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= t.length ? o.REPT("0", n - t.length) + t : a.num) }, n.IMABS = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.value : Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) }, n.IMAGINARY = function (r) { if (void 0 === r || !0 === r || !1 === r) return a.value; if (0 === r || "0" === r) return 0; if (["i", "j"].indexOf(r) >= 0) return 1; r = r.replace("+i", "+1i").replace("-i", "-1i").replace("+j", "+1j").replace("-j", "-1j"); var n = r.indexOf("+"), e = r.indexOf("-"); 0 === n && (n = r.indexOf("+", 1)), 0 === e && (e = r.indexOf("-", 1)); var t = r.substring(r.length - 1, r.length), u = "i" === t || "j" === t; return n >= 0 || e >= 0 ? u ? n >= 0 ? isNaN(r.substring(0, n)) || isNaN(r.substring(n + 1, r.length - 1)) ? a.num : Number(r.substring(n + 1, r.length - 1)) : isNaN(r.substring(0, e)) || isNaN(r.substring(e + 1, r.length - 1)) ? a.num : -Number(r.substring(e + 1, r.length - 1)) : a.num : u ? isNaN(r.substring(0, r.length - 1)) ? a.num : r.substring(0, r.length - 1) : isNaN(r) ? a.num : 0 }, n.IMARGUMENT = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.value : 0 === e && 0 === t ? a.div0 : 0 === e && t > 0 ? Math.PI / 2 : 0 === e && t < 0 ? -Math.PI / 2 : 0 === t && e > 0 ? 0 : 0 === t && e < 0 ? -Math.PI : e > 0 ? Math.atan(t / e) : e < 0 && t >= 0 ? Math.atan(t / e) + Math.PI : Math.atan(t / e) - Math.PI }, n.IMCONJUGATE = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", 0 !== t ? n.COMPLEX(e, -t, u) : r }, n.IMCOS = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", n.COMPLEX(Math.cos(e) * (Math.exp(t) + Math.exp(-t)) / 2, -Math.sin(e) * (Math.exp(t) - Math.exp(-t)) / 2, u) }, n.IMCOSH = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", n.COMPLEX(Math.cos(t) * (Math.exp(e) + Math.exp(-e)) / 2, Math.sin(t) * (Math.exp(e) - Math.exp(-e)) / 2, u) }, n.IMCOT = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.value : n.IMDIV(n.IMCOS(r), n.IMSIN(r)) }, n.IMDIV = function (r, e) { var t = n.IMREAL(r), u = n.IMAGINARY(r), o = n.IMREAL(e), f = n.IMAGINARY(e); if (i.anyIsError(t, u, o, f)) return a.value; var s = r.substring(r.length - 1), l = e.substring(e.length - 1), c = "i"; if ("j" === s ? c = "j" : "j" === l && (c = "j"), 0 === o && 0 === f) return a.num; var m = o * o + f * f; return n.COMPLEX((t * o + u * f) / m, (u * o - t * f) / m, c) }, n.IMEXP = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); u = "i" === u || "j" === u ? u : "i"; var o = Math.exp(e); return n.COMPLEX(o * Math.cos(t), o * Math.sin(t), u) }, n.IMLN = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", n.COMPLEX(Math.log(Math.sqrt(e * e + t * t)), Math.atan(t / e), u) }, n.IMLOG10 = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", n.COMPLEX(Math.log(Math.sqrt(e * e + t * t)) / Math.log(10), Math.atan(t / e) / Math.log(10), u) }, n.IMLOG2 = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", n.COMPLEX(Math.log(Math.sqrt(e * e + t * t)) / Math.log(2), Math.atan(t / e) / Math.log(2), u) }, n.IMPOWER = function (r, e) { e = i.parseNumber(e); var t = n.IMREAL(r), u = n.IMAGINARY(r); if (i.anyIsError(e, t, u)) return a.value; var o = r.substring(r.length - 1); o = "i" === o || "j" === o ? o : "i"; var f = Math.pow(n.IMABS(r), e), s = n.IMARGUMENT(r); return n.COMPLEX(f * Math.cos(e * s), f * Math.sin(e * s), o) }, n.IMPRODUCT = function () { var r = arguments[0]; if (!arguments.length) return a.value; for (var e = 1; e < arguments.length; e++) { var t = n.IMREAL(r), u = n.IMAGINARY(r), o = n.IMREAL(arguments[e]), f = n.IMAGINARY(arguments[e]); if (i.anyIsError(t, u, o, f)) return a.value; r = n.COMPLEX(t * o - u * f, t * f + u * o) } return r }, n.IMREAL = function (r) { if (void 0 === r || !0 === r || !1 === r) return a.value; if (0 === r || "0" === r) return 0; if (["i", "+i", "1i", "+1i", "-i", "-1i", "j", "+j", "1j", "+1j", "-j", "-1j"].indexOf(r) >= 0) return 0; var n = r.indexOf("+"), e = r.indexOf("-"); 0 === n && (n = r.indexOf("+", 1)), 0 === e && (e = r.indexOf("-", 1)); var t = r.substring(r.length - 1, r.length), u = "i" === t || "j" === t; return n >= 0 || e >= 0 ? u ? n >= 0 ? isNaN(r.substring(0, n)) || isNaN(r.substring(n + 1, r.length - 1)) ? a.num : Number(r.substring(0, n)) : isNaN(r.substring(0, e)) || isNaN(r.substring(e + 1, r.length - 1)) ? a.num : Number(r.substring(0, e)) : a.num : u ? isNaN(r.substring(0, r.length - 1)) ? a.num : 0 : isNaN(r) ? a.num : r }, n.IMSEC = function (r) { if (!0 === r || !1 === r) return a.value; var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.value : n.IMDIV("1", n.IMCOS(r)) }, n.IMSECH = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.value : n.IMDIV("1", n.IMCOSH(r)) }, n.IMSIN = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", n.COMPLEX(Math.sin(e) * (Math.exp(t) + Math.exp(-t)) / 2, Math.cos(e) * (Math.exp(t) - Math.exp(-t)) / 2, u) }, n.IMSINH = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); return u = "i" === u || "j" === u ? u : "i", n.COMPLEX(Math.cos(t) * (Math.exp(e) - Math.exp(-e)) / 2, Math.sin(t) * (Math.exp(e) + Math.exp(-e)) / 2, u) }, n.IMSQRT = function (r) { var e = n.IMREAL(r), t = n.IMAGINARY(r); if (i.anyIsError(e, t)) return a.value; var u = r.substring(r.length - 1); u = "i" === u || "j" === u ? u : "i"; var o = Math.sqrt(n.IMABS(r)), f = n.IMARGUMENT(r); return n.COMPLEX(o * Math.cos(f / 2), o * Math.sin(f / 2), u) }, n.IMCSC = function (r) { if (!0 === r || !1 === r) return a.value; var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.num : n.IMDIV("1", n.IMSIN(r)) }, n.IMCSCH = function (r) { if (!0 === r || !1 === r) return a.value; var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.num : n.IMDIV("1", n.IMSINH(r)) }, n.IMSUB = function (r, n) { var e = this.IMREAL(r), t = this.IMAGINARY(r), u = this.IMREAL(n), o = this.IMAGINARY(n); if (i.anyIsError(e, t, u, o)) return a.value; var f = r.substring(r.length - 1), s = n.substring(n.length - 1), l = "i"; return "j" === f ? l = "j" : "j" === s && (l = "j"), this.COMPLEX(e - u, t - o, l) }, n.IMSUM = function () { if (!arguments.length) return a.value; for (var r = i.flatten(arguments), n = r[0], e = 1; e < r.length; e++) { var t = this.IMREAL(n), u = this.IMAGINARY(n), o = this.IMREAL(r[e]), f = this.IMAGINARY(r[e]); if (i.anyIsError(t, u, o, f)) return a.value; n = this.COMPLEX(t + o, u + f) } return n }, n.IMTAN = function (r) { if (!0 === r || !1 === r) return a.value; var e = n.IMREAL(r), t = n.IMAGINARY(r); return i.anyIsError(e, t) ? a.value : this.IMDIV(this.IMSIN(r), this.IMCOS(r)) }, n.OCT2BIN = function (r, n) { if (!/^[0-7]{1,10}$/.test(r)) return a.num; var e = 10 === r.length && "7" === r.substring(0, 1), t = e ? parseInt(r, 8) - 1073741824 : parseInt(r, 8); if (t < -512 || t > 511) return a.num; if (e) return "1" + o.REPT("0", 9 - (512 + t).toString(2).length) + (512 + t).toString(2); var u = t.toString(2); return void 0 === n ? u : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= u.length ? o.REPT("0", n - u.length) + u : a.num) }, n.OCT2DEC = function (r) { if (!/^[0-7]{1,10}$/.test(r)) return a.num; var n = parseInt(r, 8); return n >= 536870912 ? n - 1073741824 : n }, n.OCT2HEX = function (r, n) { if (!/^[0-7]{1,10}$/.test(r)) return a.num; var e = parseInt(r, 8); if (e >= 536870912) return "ff" + (e + 3221225472).toString(16); var t = e.toString(16); return void 0 === n ? t : isNaN(n) ? a.value : n < 0 ? a.num : (n = Math.floor(n), n >= t.length ? o.REPT("0", n - t.length) + t : a.num) } }, function (r, n, e) { var t = [e(12), e(14), e(10), e(15), e(2), e(4), e(7), e(16), e(6), e(17), e(3), e(9)]; for (var a in t) { var u = t[a]; for (var o in u) n[o] = n[o] || u[o] } }, function (r, n, e) { function t(r, n) { if (n) for (var e in n) r[e] = n[e]; return r } var a = e(2), u = e(3), o = e(10), i = e(7); n.BETADIST = u.BETA.DIST, n.BETAINV = u.BETA.INV, n.BINOMDIST = u.BINOM.DIST, n.CEILING = n.ISOCEILING = t(a.CEILING.MATH, a.CEILING), n.CEILINGMATH = a.CEILING.MATH, n.CEILINGPRECISE = a.CEILING.PRECISE, n.CHIDIST = u.CHISQ.DIST, n.CHIDISTRT = u.CHISQ.DIST.RT, n.CHIINV = u.CHISQ.INV, n.CHIINVRT = u.CHISQ.INV.RT, n.CHITEST = u.CHISQ.TEST, n.CONFIDENCE = t(u.CONFIDENCE.NORM, u.CONFIDENCE), n.COVAR = u.COVARIANCE.P, n.COVARIANCEP = u.COVARIANCE.P, n.COVARIANCES = u.COVARIANCE.S, n.CRITBINOM = u.BINOM.INV, n.EXPONDIST = u.EXPON.DIST, n.ERFCPRECISE = o.ERFC.PRECISE, n.ERFPRECISE = o.ERF.PRECISE, n.FDIST = u.F.DIST, n.FDISTRT = u.F.DIST.RT, n.FINVRT = u.F.INV.RT, n.FINV = u.F.INV, n.FLOOR = t(a.FLOOR.MATH, a.FLOOR), n.FLOORMATH = a.FLOOR.MATH, n.FLOORPRECISE = a.FLOOR.PRECISE, n.FTEST = u.F.TEST, n.GAMMADIST = u.GAMMA.DIST, n.GAMMAINV = u.GAMMA.INV, n.GAMMALNPRECISE = u.GAMMALN.PRECISE, n.HYPGEOMDIST = u.HYPGEOM.DIST, n.LOGINV = u.LOGNORM.INV, n.LOGNORMINV = u.LOGNORM.INV, n.LOGNORMDIST = u.LOGNORM.DIST, n.MODE = t(u.MODE.SNGL, u.MODE), n.MODEMULT = u.MODE.MULT, n.MODESNGL = u.MODE.SNGL, n.NEGBINOMDIST = u.NEGBINOM.DIST, n.NETWORKDAYSINTL = i.NETWORKDAYS.INTL, n.NORMDIST = u.NORM.DIST, n.NORMINV = u.NORM.INV, n.NORMSDIST = u.NORM.S.DIST, n.NORMSINV = u.NORM.S.INV, n.PERCENTILE = t(u.PERCENTILE.EXC, u.PERCENTILE), n.PERCENTILEEXC = u.PERCENTILE.EXC, n.PERCENTILEINC = u.PERCENTILE.INC, n.PERCENTRANK = t(u.PERCENTRANK.INC, u.PERCENTRANK), n.PERCENTRANKEXC = u.PERCENTRANK.EXC, n.PERCENTRANKINC = u.PERCENTRANK.INC, n.POISSON = t(u.POISSON.DIST, u.POISSON), n.POISSONDIST = u.POISSON.DIST, n.QUARTILE = t(u.QUARTILE.INC, u.QUARTILE), n.QUARTILEEXC = u.QUARTILE.EXC, n.QUARTILEINC = u.QUARTILE.INC, n.RANK = t(u.RANK.EQ, u.RANK), n.RANKAVG = u.RANK.AVG, n.RANKEQ = u.RANK.EQ, n.SKEWP = u.SKEW.P, n.STDEV = t(u.STDEV.S, u.STDEV), n.STDEVP = u.STDEV.P, n.STDEVS = u.STDEV.S, n.TDIST = u.T.DIST, n.TDISTRT = u.T.DIST.RT, n.TINV = u.T.INV, n.TTEST = u.T.TEST, n.VAR = t(u.VAR.S, u.VAR), n.VARP = u.VAR.P, n.VARS = u.VAR.S, n.WEIBULL = t(u.WEIBULL.DIST, u.WEIBULL), n.WEIBULLDIST = u.WEIBULL.DIST, n.WORKDAYINTL = i.WORKDAY.INTL, n.ZTEST = u.Z.TEST }, function (r, n, e) { var t; !function (r) { r("undefined" == typeof DO_NOT_EXPORT_BESSEL ? n : t = {}) }(function (r) { function n(r, n) { for (var e = 0, t = 0; e < r.length; ++e)t = n * t + r[e]; return t } function e(r, n, e, t, a) { if (0 === n) return e; if (1 === n) return t; for (var u = 2 / r, o = t, i = 1; i < n; ++i)o = t * i * u + a * e, e = t, t = o; return o } function t(r, n, t, a, u) { return function (t, o) { if (a) { if (0 === t) return 1 == a ? -1 / 0 : 1 / 0; if (t < 0) return NaN } return 0 === o ? r(t) : 1 === o ? n(t) : o < 0 ? NaN : (o |= 0, e(t, o, r(t), n(t), u)) } } r.version = "1.0.2"; var a = Math, u = function () { function r(r) { var e = 0, t = 0, l = 0, c = r * r; if (r < 8) t = n(o, c), l = n(i, c), e = t / l; else { var m = r - .785398164; c = 64 / c, t = n(f, c), l = n(s, c), e = a.sqrt(u / r) * (a.cos(m) * t - a.sin(m) * l * 8 / r) } return e } function t(r) { var e = 0, t = 0, o = 0, i = r * r, f = a.abs(r) - 2.356194491; return Math.abs(r) < 8 ? (t = r * n(l, i), o = n(c, i), e = t / o) : (i = 64 / i, t = n(m, i), o = n(p, i), e = a.sqrt(u / a.abs(r)) * (a.cos(f) * t - a.sin(f) * o * 8 / a.abs(r)), r < 0 && (e = -e)), e } var u = .636619772, o = [57568490574, -13362590354, 651619640.7, -11214424.18, 77392.33017, -184.9052456].reverse(), i = [57568490411, 1029532985, 9494680.718, 59272.64853, 267.8532712, 1].reverse(), f = [1, -.001098628627, 2734510407e-14, -2073370639e-15, 2.093887211e-7].reverse(), s = [-.01562499995, .0001430488765, -6911147651e-15, 7.621095161e-7, -9.34935152e-8].reverse(), l = [72362614232, -7895059235, 242396853.1, -2972611.439, 15704.4826, -30.16036606].reverse(), c = [144725228442, 2300535178, 18583304.74, 99447.43394, 376.9991397, 1].reverse(), m = [1, .00183105, -3516396496e-14, 2457520174e-15, -2.40337019e-7].reverse(), p = [.04687499995, -.0002002690873, 8449199096e-15, -8.8228987e-7, 1.05787412e-7].reverse(); return function n(u, o) { if (o = Math.round(o), !isFinite(u)) return isNaN(u) ? u : 0; if (o < 0) return (o % 2 ? -1 : 1) * n(u, -o); if (u < 0) return (o % 2 ? -1 : 1) * n(-u, o); if (0 === o) return r(u); if (1 === o) return t(u); if (0 === u) return 0; var i = 0; if (u > o) i = e(u, o, r(u), t(u), -1); else { for (var f = 2 * a.floor((o + a.floor(a.sqrt(40 * o))) / 2), s = !1, l = 0, c = 0, m = 1, p = 0, h = 2 / u, v = f; v > 0; v--)p = v * h * m - l, l = m, m = p, a.abs(m) > 1e10 && (m *= 1e-10, l *= 1e-10, i *= 1e-10, c *= 1e-10), s && (c += m), s = !s, v == o && (i = l); c = 2 * c - m, i /= c } return i } }(), o = function () { function r(r) { var e = 0, t = 0, c = 0, m = r * r, p = r - .785398164; return r < 8 ? (t = n(i, m), c = n(f, m), e = t / c + o * u(r, 0) * a.log(r)) : (m = 64 / m, t = n(s, m), c = n(l, m), e = a.sqrt(o / r) * (a.sin(p) * t + a.cos(p) * c * 8 / r)), e } function e(r) { var e = 0, t = 0, i = 0, f = r * r, s = r - 2.356194491; return r < 8 ? (t = r * n(c, f), i = n(m, f), e = t / i + o * (u(r, 1) * a.log(r) - 1 / r)) : (f = 64 / f, t = n(p, f), i = n(h, f), e = a.sqrt(o / r) * (a.sin(s) * t + a.cos(s) * i * 8 / r)), e } var o = .636619772, i = [-2957821389, 7062834065, -512359803.6, 10879881.29, -86327.92757, 228.4622733].reverse(), f = [40076544269, 745249964.8, 7189466.438, 47447.2647, 226.1030244, 1].reverse(), s = [1, -.001098628627, 2734510407e-14, -2073370639e-15, 2.093887211e-7].reverse(), l = [-.01562499995, .0001430488765, -6911147651e-15, 7.621095161e-7, -9.34945152e-8].reverse(), c = [-4900604943e3, 127527439e4, -51534381390, 734926455.1, -4237922.726, 8511.937935].reverse(), m = [249958057e5, 424441966400, 3733650367, 22459040.02, 102042.605, 354.9632885, 1].reverse(), p = [1, .00183105, -3516396496e-14, 2457520174e-15, -2.40337019e-7].reverse(), h = [.04687499995, -.0002002690873, 8449199096e-15, -8.8228987e-7, 1.05787412e-7].reverse(); return t(r, e, "BESSELY", 1, -1) }(), i = function () { function r(r) { return r <= 3.75 ? n(t, r * r / 14.0625) : a.exp(a.abs(r)) / a.sqrt(a.abs(r)) * n(u, 3.75 / a.abs(r)) } function e(r) { return r < 3.75 ? r * n(o, r * r / 14.0625) : (r < 0 ? -1 : 1) * a.exp(a.abs(r)) / a.sqrt(a.abs(r)) * n(i, 3.75 / a.abs(r)) } var t = [1, 3.5156229, 3.0899424, 1.2067492, .2659732, .0360768, .0045813].reverse(), u = [.39894228, .01328592, .00225319, -.00157565, .00916281, -.02057706, .02635537, -.01647633, .00392377].reverse(), o = [.5, .87890594, .51498869, .15084934, .02658733, .00301532, 32411e-8].reverse(), i = [.39894228, -.03988024, -.00362018, .00163801, -.01031555, .02282967, -.02895312, .01787654, -.00420059].reverse(); return function n(t, u) { if (0 === (u = Math.round(u))) return r(t); if (1 === u) return e(t); if (u < 0) return NaN; if (0 === a.abs(t)) return 0; if (t == 1 / 0) return 1 / 0; var o, i = 0, f = 2 / a.abs(t), s = 0, l = 1, c = 0, m = 2 * a.round((u + a.round(a.sqrt(40 * u))) / 2); for (o = m; o > 0; o--)c = o * f * l + s, s = l, l = c, a.abs(l) > 1e10 && (l *= 1e-10, s *= 1e-10, i *= 1e-10), o == u && (i = s); return i *= n(t, 0) / l, t < 0 && u % 2 ? -i : i } }(), f = function () { function r(r) { return r <= 2 ? -a.log(r / 2) * i(r, 0) + n(u, r * r / 4) : a.exp(-r) / a.sqrt(r) * n(o, 2 / r) } function e(r) { return r <= 2 ? a.log(r / 2) * i(r, 1) + 1 / r * n(f, r * r / 4) : a.exp(-r) / a.sqrt(r) * n(s, 2 / r) } var u = [-.57721566, .4227842, .23069756, .0348859, .00262698, 1075e-7, 74e-7].reverse(), o = [1.25331414, -.07832358, .02189568, -.01062446, .00587872, -.0025154, 53208e-8].reverse(), f = [1, .15443144, -.67278579, -.18156897, -.01919402, -.00110404, -4686e-8].reverse(), s = [1.25331414, .23498619, -.0365562, .01504268, -.00780353, .00325614, -68245e-8].reverse(); return t(r, e, "BESSELK", 2, 1) }(); r.besselj = u, r.bessely = o, r.besseli = i, r.besselk = f }) }, function (r, n, e) { function t(r) { var n = []; return f.arrayEach(r, function (r) { r && n.push(r) }), n } function a(r, n) { for (var e = {}, t = 1; t < r[0].length; ++t)e[t] = !0; var a = n[0].length; for (t = 1; t < n.length; ++t)n[t].length > a && (a = n[t].length); for (var u = 1; u < r.length; ++u)for (var o = 1; o < r[u].length; ++o) { for (var i = !1, f = !1, l = 0; l < n.length; ++l) { var c = n[l]; if (!(c.length < a)) { var m = c[0]; if (r[u][0] === m) { f = !0; for (var p = 1; p < c.length; ++p)if (!i) { var h = void 0 === c[p] || "*" === c[p]; if (h) i = !0; else { var v = s.parse(c[p] + ""), g = [s.createToken(r[u][o], s.TOKEN_TYPE_LITERAL)].concat(v); i = s.compute(g) } } } } } f && (e[o] = e[o] && i) } for (var N = [], E = 0; E < r[0].length; ++E)e[E] && N.push(E - 1); return N } var u = e(0), o = e(3), i = e(2), f = e(1), s = e(5); n.FINDFIELD = function (r, n) { var e = null; return f.arrayEach(r, function (r, t) { if (r[0] === n) return e = t, !1 }), null == e ? u.value : e }, n.DAVERAGE = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var o = a(r, t), i = []; if ("string" == typeof e) { var s = n.FINDFIELD(r, e); i = f.rest(r[s]) } else i = f.rest(r[e]); var l = 0; return f.arrayEach(o, function (r) { l += i[r] }), 0 === o.length ? u.div0 : l / o.length }, n.DCOUNT = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var i = a(r, t), s = []; if ("string" == typeof e) { var l = n.FINDFIELD(r, e); s = f.rest(r[l]) } else s = f.rest(r[e]); var c = []; return f.arrayEach(i, function (r) { c.push(s[r]) }), o.COUNT(c) }, n.DCOUNTA = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var i = a(r, t), s = []; if ("string" == typeof e) { var l = n.FINDFIELD(r, e); s = f.rest(r[l]) } else s = f.rest(r[e]); var c = []; return f.arrayEach(i, function (r) { c.push(s[r]) }), o.COUNTA(c) }, n.DGET = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var o = a(r, t), i = []; if ("string" == typeof e) { var s = n.FINDFIELD(r, e); i = f.rest(r[s]) } else i = f.rest(r[e]); return 0 === o.length ? u.value : o.length > 1 ? u.num : i[o[0]] }, n.DMAX = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var o = a(r, t), i = []; if ("string" == typeof e) { var s = n.FINDFIELD(r, e); i = f.rest(r[s]) } else i = f.rest(r[e]); var l = i[o[0]]; return f.arrayEach(o, function (r) { l < i[r] && (l = i[r]) }), l }, n.DMIN = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var o = a(r, t), i = []; if ("string" == typeof e) { var s = n.FINDFIELD(r, e); i = f.rest(r[s]) } else i = f.rest(r[e]); var l = i[o[0]]; return f.arrayEach(o, function (r) { l > i[r] && (l = i[r]) }), l }, n.DPRODUCT = function (r, e, o) { if (isNaN(e) && "string" != typeof e) return u.value; var i = a(r, o), s = []; if ("string" == typeof e) { var l = n.FINDFIELD(r, e); s = f.rest(r[l]) } else s = f.rest(r[e]); var c = []; f.arrayEach(i, function (r) { c.push(s[r]) }), c = t(c); var m = 1; return f.arrayEach(c, function (r) { m *= r }), m }, n.DSTDEV = function (r, e, i) { if (isNaN(e) && "string" != typeof e) return u.value; var s = a(r, i), l = []; if ("string" == typeof e) { var c = n.FINDFIELD(r, e); l = f.rest(r[c]) } else l = f.rest(r[e]); var m = []; return f.arrayEach(s, function (r) { m.push(l[r]) }), m = t(m), o.STDEV.S(m) }, n.DSTDEVP = function (r, e, i) { if (isNaN(e) && "string" != typeof e) return u.value; var s = a(r, i), l = []; if ("string" == typeof e) { var c = n.FINDFIELD(r, e); l = f.rest(r[c]) } else l = f.rest(r[e]); var m = []; return f.arrayEach(s, function (r) { m.push(l[r]) }), m = t(m), o.STDEV.P(m) }, n.DSUM = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var o = a(r, t), s = []; if ("string" == typeof e) { var l = n.FINDFIELD(r, e); s = f.rest(r[l]) } else s = f.rest(r[e]); var c = []; return f.arrayEach(o, function (r) { c.push(s[r]) }), i.SUM(c) }, n.DVAR = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var i = a(r, t), s = []; if ("string" == typeof e) { var l = n.FINDFIELD(r, e); s = f.rest(r[l]) } else s = f.rest(r[e]); var c = []; return f.arrayEach(i, function (r) { c.push(s[r]) }), o.VAR.S(c) }, n.DVARP = function (r, e, t) { if (isNaN(e) && "string" != typeof e) return u.value; var i = a(r, t), s = []; if ("string" == typeof e) { var l = n.FINDFIELD(r, e); s = f.rest(r[l]) } else s = f.rest(r[e]); var c = []; return f.arrayEach(i, function (r) { c.push(s[r]) }), o.VAR.P(c) } }, function (r, n, e) { var t = e(0), a = e(1), u = e(6); n.AND = function () { for (var r = a.flatten(arguments), n = !0, e = 0; e < r.length; e++)r[e] || (n = !1); return n }, n.CHOOSE = function () { if (arguments.length < 2) return t.na; var r = arguments[0]; return r < 1 || r > 254 ? t.value : arguments.length < r + 1 ? t.value : arguments[r] }, n.FALSE = function () { return !1 }, n.IF = function (r, n, e) { return r ? n : e }, n.IFS = function () { for (var r = 0; r < arguments.length / 2; r++)if (arguments[2 * r]) return arguments[2 * r + 1]; return t.na }, n.IFERROR = function (r, n) { return u.ISERROR(r) ? n : r }, n.IFNA = function (r, n) { return r === t.na ? n : r }, n.NOT = function (r) { return !r }, n.OR = function () { for (var r = a.flatten(arguments), n = !1, e = 0; e < r.length; e++)r[e] && (n = !0); return n }, n.TRUE = function () { return !0 }, n.XOR = function () { for (var r = a.flatten(arguments), n = 0, e = 0; e < r.length; e++)r[e] && n++; return !!(1 & Math.floor(Math.abs(n))) }, n.SWITCH = function () { var r; if (arguments.length > 0) { var n = arguments[0], e = arguments.length - 1, a = Math.floor(e / 2), u = !1, o = e % 2 != 0, i = e % 2 == 0 ? null : arguments[arguments.length - 1]; if (a) for (var f = 0; f < a; f++)if (n === arguments[2 * f + 1]) { r = arguments[2 * f + 2], u = !0; break } u || (r = o ? i : t.na) } else r = t.value; return r } }, function (r, n, e) { function t(r) { return r && r.getTime && !isNaN(r.getTime()) } function a(r) { return r instanceof Date ? r : new Date(r) } var u = e(0), o = e(7), i = e(1); n.ACCRINT = function (r, n, e, i, f, s, l) { return r = a(r), n = a(n), e = a(e), t(r) && t(n) && t(e) ? i <= 0 || f <= 0 ? u.num : -1 === [1, 2, 4].indexOf(s) ? u.num : -1 === [0, 1, 2, 3, 4].indexOf(l) ? u.num : e <= r ? u.num : (f = f || 0, l = l || 0, f * i * o.YEARFRAC(r, e, l)) : u.value }, n.ACCRINTM = function () { throw new Error("ACCRINTM is not implemented") }, n.AMORDEGRC = function () { throw new Error("AMORDEGRC is not implemented") }, n.AMORLINC = function () { throw new Error("AMORLINC is not implemented") }, n.COUPDAYBS = function () { throw new Error("COUPDAYBS is not implemented") }, n.COUPDAYS = function () { throw new Error("COUPDAYS is not implemented") }, n.COUPDAYSNC = function () { throw new Error("COUPDAYSNC is not implemented") }, n.COUPNCD = function () { throw new Error("COUPNCD is not implemented") }, n.COUPNUM = function () { throw new Error("COUPNUM is not implemented") }, n.COUPPCD = function () { throw new Error("COUPPCD is not implemented") }, n.CUMIPMT = function (r, e, t, a, o, f) { if (r = i.parseNumber(r), e = i.parseNumber(e), t = i.parseNumber(t), i.anyIsError(r, e, t)) return u.value; if (r <= 0 || e <= 0 || t <= 0) return u.num; if (a < 1 || o < 1 || a > o) return u.num; if (0 !== f && 1 !== f) return u.num; var s = n.PMT(r, e, t, 0, f), l = 0; 1 === a && (0 === f && (l = -t), a++); for (var c = a; c <= o; c++)l += 1 === f ? n.FV(r, c - 2, s, t, 1) - s : n.FV(r, c - 1, s, t, 0); return l *= r }, n.CUMPRINC = function (r, e, t, a, o, f) { if (r = i.parseNumber(r), e = i.parseNumber(e), t = i.parseNumber(t), i.anyIsError(r, e, t)) return u.value; if (r <= 0 || e <= 0 || t <= 0) return u.num; if (a < 1 || o < 1 || a > o) return u.num; if (0 !== f && 1 !== f) return u.num; var s = n.PMT(r, e, t, 0, f), l = 0; 1 === a && (l = 0 === f ? s + t * r : s, a++); for (var c = a; c <= o; c++)l += f > 0 ? s - (n.FV(r, c - 2, s, t, 1) - s) * r : s - n.FV(r, c - 1, s, t, 0) * r; return l }, n.DB = function (r, n, e, t, a) { if (a = void 0 === a ? 12 : a, r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), i.anyIsError(r, n, e, t, a)) return u.value; if (r < 0 || n < 0 || e < 0 || t < 0) return u.num; if (-1 === [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(a)) return u.num; if (t > e) return u.num; if (n >= r) return 0; for (var o = (1 - Math.pow(n / r, 1 / e)).toFixed(3), f = r * o * a / 12, s = f, l = 0, c = t === e ? e - 1 : t, m = 2; m <= c; m++)l = (r - s) * o, s += l; return 1 === t ? f : t === e ? (r - s) * o : l }, n.DDB = function (r, n, e, t, a) { if (a = void 0 === a ? 2 : a, r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), i.anyIsError(r, n, e, t, a)) return u.value; if (r < 0 || n < 0 || e < 0 || t < 0 || a <= 0) return u.num; if (t > e) return u.num; if (n >= r) return 0; for (var o = 0, f = 0, s = 1; s <= t; s++)f = Math.min(a / e * (r - o), r - n - o), o += f; return f }, n.DISC = function () { throw new Error("DISC is not implemented") }, n.DOLLARDE = function (r, n) { if (r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n)) return u.value; if (n < 0) return u.num; if (n >= 0 && n < 1) return u.div0; n = parseInt(n, 10); var e = parseInt(r, 10); e += r % 1 * Math.pow(10, Math.ceil(Math.log(n) / Math.LN10)) / n; var t = Math.pow(10, Math.ceil(Math.log(n) / Math.LN2) + 1); return e = Math.round(e * t) / t }, n.DOLLARFR = function (r, n) { if (r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n)) return u.value; if (n < 0) return u.num; if (n >= 0 && n < 1) return u.div0; n = parseInt(n, 10); var e = parseInt(r, 10); return e += r % 1 * Math.pow(10, -Math.ceil(Math.log(n) / Math.LN10)) * n }, n.DURATION = function () { throw new Error("DURATION is not implemented") }, n.EFFECT = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? u.value : r <= 0 || n < 1 ? u.num : (n = parseInt(n, 10), Math.pow(1 + r / n, n) - 1) }, n.FV = function (r, n, e, t, a) { if (t = t || 0, a = a || 0, r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), i.anyIsError(r, n, e, t, a)) return u.value; var o; if (0 === r) o = t + e * n; else { var f = Math.pow(1 + r, n); o = 1 === a ? t * f + e * (1 + r) * (f - 1) / r : t * f + e * (f - 1) / r } return -o }, n.FVSCHEDULE = function (r, n) { if (r = i.parseNumber(r), n = i.parseNumberArray(i.flatten(n)), i.anyIsError(r, n)) return u.value; for (var e = n.length, t = r, a = 0; a < e; a++)t *= 1 + n[a]; return t }, n.INTRATE = function () { throw new Error("INTRATE is not implemented") }, n.IPMT = function (r, e, t, a, o, f) { if (o = o || 0, f = f || 0, r = i.parseNumber(r), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), o = i.parseNumber(o), f = i.parseNumber(f), i.anyIsError(r, e, t, a, o, f)) return u.value; var s = n.PMT(r, t, a, o, f); return (1 === e ? 1 === f ? 0 : -a : 1 === f ? n.FV(r, e - 2, s, a, 1) - s : n.FV(r, e - 1, s, a, 0)) * r }, n.IRR = function (r, n) { if (n = n || 0, r = i.parseNumberArray(i.flatten(r)), n = i.parseNumber(n), i.anyIsError(r, n)) return u.value; for (var e = [], t = !1, a = !1, o = 0; o < r.length; o++)e[o] = 0 === o ? 0 : e[o - 1] + 365, r[o] > 0 && (t = !0), r[o] < 0 && (a = !0); if (!t || !a) return u.num; n = void 0 === n ? .1 : n; var f, s, l, c = n, m = !0; do { l = function (r, n, e) { for (var t = e + 1, a = r[0], u = 1; u < r.length; u++)a += r[u] / Math.pow(t, (n[u] - n[0]) / 365); return a }(r, e, c), f = c - l / function (r, n, e) { for (var t = e + 1, a = 0, u = 1; u < r.length; u++) { var o = (n[u] - n[0]) / 365; a -= o * r[u] / Math.pow(t, o + 1) } return a }(r, e, c), s = Math.abs(f - c), c = f, m = s > 1e-10 && Math.abs(l) > 1e-10 } while (m); return c }, n.ISPMT = function (r, n, e, t) { return r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), i.anyIsError(r, n, e, t) ? u.value : t * r * (n / e - 1) }, n.MDURATION = function () { throw new Error("MDURATION is not implemented") }, n.MIRR = function (r, e, t) { if (r = i.parseNumberArray(i.flatten(r)), e = i.parseNumber(e), t = i.parseNumber(t), i.anyIsError(r, e, t)) return u.value; for (var a = r.length, o = [], f = [], s = 0; s < a; s++)r[s] < 0 ? o.push(r[s]) : f.push(r[s]); var l = -n.NPV(t, f) * Math.pow(1 + t, a - 1), c = n.NPV(e, o) * (1 + e); return Math.pow(l / c, 1 / (a - 1)) - 1 }, n.NOMINAL = function (r, n) { return r = i.parseNumber(r), n = i.parseNumber(n), i.anyIsError(r, n) ? u.value : r <= 0 || n < 1 ? u.num : (n = parseInt(n, 10), (Math.pow(r + 1, 1 / n) - 1) * n) }, n.NPER = function (r, n, e, t, a) { if (a = void 0 === a ? 0 : a, t = void 0 === t ? 0 : t, r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), i.anyIsError(r, n, e, t, a)) return u.value; if (0 === r) return -(e + t) / n; var o = n * (1 + r * a) - t * r, f = e * r + n * (1 + r * a); return Math.log(o / f) / Math.log(1 + r) }, n.NPV = function () { var r = i.parseNumberArray(i.flatten(arguments)); if (r instanceof Error) return r; for (var n = r[0], e = 0, t = 1; t < r.length; t++)e += r[t] / Math.pow(1 + n, t); return e }, n.ODDFPRICE = function () { throw new Error("ODDFPRICE is not implemented") }, n.ODDFYIELD = function () { throw new Error("ODDFYIELD is not implemented") }, n.ODDLPRICE = function () { throw new Error("ODDLPRICE is not implemented") }, n.ODDLYIELD = function () { throw new Error("ODDLYIELD is not implemented") }, n.PDURATION = function (r, n, e) { return r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? u.value : r <= 0 ? u.num : (Math.log(e) - Math.log(n)) / Math.log(1 + r) }, n.PMT = function (r, n, e, t, a) { if (t = t || 0, a = a || 0, r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), i.anyIsError(r, n, e, t, a)) return u.value; var o; if (0 === r) o = (e + t) / n; else { var f = Math.pow(1 + r, n); o = 1 === a ? (t * r / (f - 1) + e * r / (1 - 1 / f)) / (1 + r) : t * r / (f - 1) + e * r / (1 - 1 / f) } return -o }, n.PPMT = function (r, e, t, a, o, f) { return o = o || 0, f = f || 0, r = i.parseNumber(r), t = i.parseNumber(t), a = i.parseNumber(a), o = i.parseNumber(o), f = i.parseNumber(f), i.anyIsError(r, t, a, o, f) ? u.value : n.PMT(r, t, a, o, f) - n.IPMT(r, e, t, a, o, f) }, n.PRICE = function () { throw new Error("PRICE is not implemented") }, n.PRICEDISC = function () { throw new Error("PRICEDISC is not implemented") }, n.PRICEMAT = function () { throw new Error("PRICEMAT is not implemented") }, n.PV = function (r, n, e, t, a) { return t = t || 0, a = a || 0, r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), i.anyIsError(r, n, e, t, a) ? u.value : 0 === r ? -e * n - t : ((1 - Math.pow(1 + r, n)) / r * e * (1 + r * a) - t) / Math.pow(1 + r, n) }, n.RATE = function (r, n, e, t, a, o) { if (o = void 0 === o ? .01 : o, t = void 0 === t ? 0 : t, a = void 0 === a ? 0 : a, r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), a = i.parseNumber(a), o = i.parseNumber(o), i.anyIsError(r, n, e, t, a, o)) return u.value; var f = o; a = a ? 1 : 0; for (var s = 0; s < 20; s++) { if (f <= -1) return u.num; var l, c; if (Math.abs(f) < 1e-10 ? l = e * (1 + r * f) + n * (1 + f * a) * r + t : (c = Math.pow(1 + f, r), l = e * c + n * (1 / f + a) * (c - 1) + t), Math.abs(l) < 1e-10) return f; var m; if (Math.abs(f) < 1e-10) m = e * r + n * a * r; else { c = Math.pow(1 + f, r); var p = r * Math.pow(1 + f, r - 1); m = e * p + n * (1 / f + a) * p + n * (-1 / (f * f)) * (c - 1) } f -= l / m } return f }, n.RECEIVED = function () { throw new Error("RECEIVED is not implemented") }, n.RRI = function (r, n, e) { return r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? u.value : 0 === r || 0 === n ? u.num : Math.pow(e / n, 1 / r) - 1 }, n.SLN = function (r, n, e) { return r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? u.value : 0 === e ? u.num : (r - n) / e }, n.SYD = function (r, n, e, t) { return r = i.parseNumber(r), n = i.parseNumber(n), e = i.parseNumber(e), t = i.parseNumber(t), i.anyIsError(r, n, e, t) ? u.value : 0 === e ? u.num : t < 1 || t > e ? u.num : (t = parseInt(t, 10), (r - n) * (e - t + 1) * 2 / (e * (e + 1))) }, n.TBILLEQ = function (r, n, e) { return r = i.parseDate(r), n = i.parseDate(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? u.value : e <= 0 ? u.num : r > n ? u.num : n - r > 31536e6 ? u.num : 365 * e / (360 - e * o.DAYS360(r, n, !1)) }, n.TBILLPRICE = function (r, n, e) { return r = i.parseDate(r), n = i.parseDate(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? u.value : e <= 0 ? u.num : r > n ? u.num : n - r > 31536e6 ? u.num : 100 * (1 - e * o.DAYS360(r, n, !1) / 360) }, n.TBILLYIELD = function (r, n, e) { return r = i.parseDate(r), n = i.parseDate(n), e = i.parseNumber(e), i.anyIsError(r, n, e) ? u.value : e <= 0 ? u.num : r > n ? u.num : n - r > 31536e6 ? u.num : 360 * (100 - e) / (e * o.DAYS360(r, n, !1)) }, n.VDB = function () { throw new Error("VDB is not implemented") }, n.XNPV = function (r, n, e) { if (r = i.parseNumber(r), n = i.parseNumberArray(i.flatten(n)), e = i.parseDateArray(i.flatten(e)), i.anyIsError(r, n, e)) return u.value; for (var t = 0, a = 0; a < n.length; a++)t += n[a] / Math.pow(1 + r, o.DAYS(e[a], e[0]) / 365); return t }, n.YIELD = function () { throw new Error("YIELD is not implemented") }, n.YIELDDISC = function () { throw new Error("YIELDDISC is not implemented") }, n.YIELDMAT = function () { throw new Error("YIELDMAT is not implemented") } }, function (r, n, e) { var t = e(0), a = e(1); n.MATCH = function (r, n, e) { if (!r && !n) return t.na; if (2 === arguments.length && (e = 1), !(n instanceof Array)) return t.na; if (n = a.flatten(n), -1 !== e && 0 !== e && 1 !== e) return t.na; for (var u, o, i = 0; i < n.length; i++)if (1 === e) { if (n[i] === r) return i + 1; n[i] < r && (o ? n[i] > o && (u = i + 1, o = n[i]) : (u = i + 1, o = n[i])) } else if (0 === e) { if ("string" == typeof r) { if (r = r.replace(/\?/g, "."), n[i].toLowerCase().match(r.toLowerCase())) return i + 1 } else if (n[i] === r) return i + 1 } else if (-1 === e) { if (n[i] === r) return i + 1; n[i] > r && (o ? n[i] < o && (u = i + 1, o = n[i]) : (u = i + 1, o = n[i])) } return u || t.na }, n.VLOOKUP = function (r, n, e, a) { if (!r || !n || !e) return t.na; a = !(0 === a || !1 === a); for (var u = t.na, o = 0; o < n.length; o++) { var i = n[o]; if (i[0] === r) { u = e < i.length + 1 ? i[e - 1] : t.ref; break } (a && i[0] <= r || a && "string" == typeof i[0] && i[0].localeCompare(r) < 0) && (u = e < i.length + 1 ? i[e - 1] : t.ref) } return u }, n.HLOOKUP = function (r, n, e, u) { if (!r || !n || !e) return t.na; u = u || !1; for (var o = a.transpose(n), i = 0; i < o.length; i++) { var f = o[i]; if (!u && f[0] === r || f[0] === r || u && "string" == typeof f[0] && -1 !== f[0].toLowerCase().indexOf(r.toLowerCase())) return e < f.length + 1 ? f[e - 1] : t.ref } return t.na }, n.LOOKUP = function (r, n, e) { n = a.flatten(n), e = a.flatten(e); var t = n.indexOf(r); return t > -1 ? e[t] : e[e.length - 1] }, n.INDEX = function (r, n, e) { return e = e || 1, n = n || 1, n <= r.length && e <= r[n - 1].length ? r[n - 1][e - 1] : t.ref } }]) });
function treePage() {
  var dataRange = menuZero.offset(3, 1).getValue()
  var data = spreadsheet.getRange(dataRange).getValues()
  var refreshable = menuZero.offset(5, 1).isChecked()
  var delVoids = menuZero.offset(6, 1).isChecked()
  var columnNumber = menuZero.offset(7, 1).getValue()
  var delColumns = menuZero.offset(8, 1).getValue()
  var sep = menuZero.offset(9, 1).getValue()

  var maxDepth = menuZero.offset(11, 1).getValue();
  var maxLeaf = menuZero.offset(12, 1).getValue();

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
    var formula = '=REG_TREE('

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

    formula += '\'' + spreadsheet.getName() + '\'!' + dataRange

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
            delColumns += ';\'' + spreadsheet.getName() + '\'!' + arg.trim()
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

    formula += ';' + maxDepth + ';' + maxLeaf + ')';
  }

  newList()

  if (refreshable) {
    correlationList.getRange(1, 1).setFormula(formula)
  } else {
    let tree = REG_TREE(data, maxDepth, maxLeaf);
    correlationList.getRange(1, 1, tree.length, tree[0].length).setValues(tree)
  };

  //Размер столбцов
  //Работает плохо
  correlationList.autoResizeColumns(1, 2);

  //Диаграмма
  var chart = correlationList.newChart()
    .setChartType(Charts.ChartType.ORG)
    .addRange(correlationList.getRange('B:B'))
    .addRange(correlationList.getRange('A:A'))
    .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
    .setTransposeRowsAndColumns(false)
    .setNumHeaders(1)
    .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
    .setOption('bubble.stroke', '#000000')
    .setOption('useFirstColumnAsDomain', true)
    .setOption('height', 710)
    .setOption('width', 1206)
    .setPosition(1, 3, 0, 0)
    .build();
  correlationList.insertChart(chart);
}

function RSS(data) {
  var rss = 0;
  var s = 0;

  for (var i = 0; i < data.length; i++) {
    s += data[i][0];
  }

  var average = s / data.length;

  for (var i = 0; i < data.length; i++) {
    rss += (data[i][0] - average) ** 2
  }

  return rss;
}


/**
 * @customfunction
 */
function MSE(Y, Y_PREDICT) {
  if (typeof Y_PREDICT == 'number') {
    Y_PREDICT = [[Y_PREDICT]]
  }
  if (typeof Y == 'number') {
    Y = [[Y]]
  }
  if (typeof Y[0][0] !== 'number') {
    Y.splice(0, 1)
  }
  if (typeof Y_PREDICT[0][0] !== 'number') {
    Y_PREDICT.splice(0, 1)
  }

  var se = 0;

  for (var i = 0; i < Y.length; i++) {
    se += (Y[i][0] - Y_PREDICT[i][0]) ** 2
  }

  return se / Y.length;
}


/**
 * @customfunction
 */
function RMSE(Y, Y_PREDICT) {
  return MSE(Y, Y_PREDICT) ** 0.5
}


function DOUBLE_RSS(Y, X, n) {
  var doubleRSS = 0;
  var i;
  var voidValues = [];

  if (X[0][0] === '') {
    var j;
    for (j = 1; j < X.length; j++) {
      if (X[j][0] != '') {
        break;
      }
    }
    X.splice(0, j);
    voidValues = Y.splice(0, j);
  }
  for (i = 0; i < X.length; i++) {
    if (X[i][0] >= n) {
      break;
    }
  }

  doubleRSS += RSS(voidValues.concat(Y.slice(i)))
  doubleRSS += RSS(voidValues.concat(Y.slice(0, i)))

  return doubleRSS;
}


function BubbleSort(A, B) {                            // отсортировать по возрастанию.
  var n = A.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - 1 - i; j++) {
      if (A[j + 1] < A[j]) {
        var t = A[j + 1];
        A[j + 1] = A[j];
        A[j] = t;

        t = B[j + 1];
        B[j + 1] = B[j];
        B[j] = t;
      }
    }
  }
  //return A;    // На выходе сортированный по возрастанию массив A.
}


function BubbleSorts(A, X, id) {                            // отсортировать по возрастанию.
  var n = A.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - 1 - i; j++) {
      if (X[j + 1][id] < X[j][id]) {
        var t = A[j + 1][0];
        A[j + 1][0] = A[j][0];
        A[j][0] = t;

        var t = X[j + 1];
        X[j + 1] = X[j];
        X[j] = t;

      }
    }
  }
  //return A;    // На выходе сортированный по возрастанию массив A.
}



function MAKE_TREE(data = spreadsheet.getRange('main!A1:I50').getValues(), maxLvL = Infinity, lvl = 0, father = '') {
  lvl++;

  if (treeNames == null) {
    treeNames = data.splice(0, 1);
  }
  var Y = transpose([transpose(data)[0]]);
  var X = transpose(transpose(data).slice(1))
  var rss0 = RSS(Y);
  var newN = 0;
  var xId = 0;
  var minRSS = Infinity;
  var nId = 0;
  f1: for (var j = 0; j < X[0].length; j++) {
    BubbleSorts(Y, data, j + 1)
    var Y = transpose([transpose(data)[0]]);
    var X = transpose(transpose(data).slice(1))
    for (var i = 0; i < X.length - 1; i++) {
      var n = (X[i][j] + X[i + 1][j]) / 2;
      var rss = DOUBLE_RSS(Y.slice(), transpose([transpose(X)[j]]), n);
      if (rss < minRSS) {
        newN = n;
        minRSS = rss;
        xId = j;
        nId = i + 1;
        if (rss == 0) {
          break f1;
        }
      }
    }
  }
  BubbleSorts(Y, data, xId + 1)

  if (rss0 == minRSS) {
    return averageArray(Y);
  }

  treeCount++;
  var choose = treeCount + ') RSS = ' + +rss0.toFixed(2) + '\n' + +averageArray(Y).toFixed(2) + '\n' + treeNames[0][xId + 1] + ' > ' + newN;
  result.push([father, choose])

  differenceRSS[0].push(treeCount)
  differenceRSS[1].push(rss0 - minRSS)

  if (valuesNotUnique(Y.slice(0, nId))) {
    treeCount++;
    leaf++
    result.push([choose, treeCount + ') RSS = 0\n' + +Y[0][0].toFixed(2)]);
  } else {
    if (lvl == maxLvL) {
      treeCount++
      leaf++;
      result.push([choose, treeCount + ') RSS = ' + +RSS(Y.slice(0, nId)).toFixed(2) + '\n' + +averageArray(Y.slice(0, nId)).toFixed(2)])
    } else {
      var newTree = MAKE_TREE(data.slice(0, nId), maxLvL, lvl, choose);
      if (typeof newTree == 'number') {
        treeCount++;
        leaf++;
        result.push([choose, treeCount + ') RSS = ' + +RSS(Y.slice(0, nId)).toFixed(2) + '\n' + +newTree.toFixed(2)])
      }
    }

  }

  if (valuesNotUnique(Y.slice(nId))) {
    treeCount++
    leaf++;
    result.push([choose, treeCount + ') RSS = 0\n' + +Y.slice(nId)[0][0].toFixed(2)])
  } else {
    if (lvl == maxLvL) {
      treeCount++
      leaf++
      result.push([choose, treeCount + ') RSS = ' + +RSS(Y.slice(nId)).toFixed(2) + '\n' + +averageArray(Y.slice(nId)).toFixed(2)])
    } else {
      var newTree = MAKE_TREE(data.slice(nId), maxLvL, lvl, choose);
      if (typeof newTree == 'number') {
        treeCount++;
        leaf++
        result.push([choose, treeCount + ') RSS = ' + +RSS(Y.slice(nId)).toFixed(2) + '\n' + +newTree.toFixed(2)])
      }
    }

  }

  return result;
}

//Все ли элементы в столбце уникальны 
function valuesNotUnique(mas) {
  var first = mas[0][0];
  var unique = true;
  for (var i = 1; i < mas.length; i++) {
    if (mas[i][0] != first) {
      unique = false;
    }
  }
  return unique;
}


/**
 * @customfunction
 */
function REG_TREE(data = spreadsheet.getRange('дерево!K8:M12').getValues(), maxLVL = Infinity, maxLeaf = Infinity) {
  if (maxLVL == null) {
    maxLVL = Infinity
  }
  if (maxLeaf == null || maxLeaf == '') {
    maxLeaf = Infinity
  }
  if (maxLeaf - 1 < maxLVL) {
    maxLVL = maxLeaf - 1;
  }

  var tree = MAKE_TREE(data, maxLVL);
  while (leaf > maxLeaf) {
    var oldDifference = Infinity;
    var ds;
    for (var i = tree.length - 3; i > 0; i--) {
      if ((tree[i][1] == tree[i + 1][0]) && (tree[i][1] == tree[i + 2][0]) && (tree[i + 1][1].split('\n').length < 3) && (tree[i + 2][1].split('\n').length < 3)) {
        var newDifference = differenceRSS[1][differenceRSS[0].indexOf(+tree[i][1].split(')')[0])]
        if (newDifference < oldDifference) {
          oldDifference = newDifference;
          ds = i;
        }
        i--;
      }
    }
    leaf--;
    var newLeaf = tree[ds][1].split('\n')
    tree[ds][1] = newLeaf[0] + '\n' + newLeaf[1];
    tree.splice(ds + 1, 2)

  }
  return tree;
}

/*
//Все ли элементы не уникальны
function valuesUnique(mas){
  var unique = false;
  f1: for (var i = 0; i < mas[0].length; i++ ) {
    var uniqueItem = mas[0][i]
    for (var j = 0; j < mas.length; j++) {
      if (uniqueItem != mas[j][i]) {
        unique = true;
        break f1;
      }
    }
  }
  return unique;
}
*/

//Среднее столбца
function averageArray(X) {
  var sum = 0;
  for (var i = 0; i < X.length; i++) {
    sum += X[i][0];
  }
  return sum / X.length;
}


/*
function TREE_PREDICT(W, initial){
  if (W[0][0] == 'Родитель') {
    W.splice(0, 1)
  }

  var finish = [];

  for (var j = 1; j < initial.length; j++) {
    var start = W[0][1]
    var r1 = start.split('\n')
    var r2 = r1[2].split(' > ')
    var count;

    if (initial[j][initial[0].indexOf(r2[0])] > r2[1]) {
      count = 2;
    } else {
      count = 1;
    }

    for (var i = 1; i < W.length; i++) {
      if (start == W[i][0]) {
        count--;
        if (count == 0) {
          start = W[i][1]
          r1 = start.split('\n')
          if (r1.length != 3) {
            finish.push(+[r1[1]])
            break
          }
          r2 = r1[2].split(' > ')

          if (initial[j][initial[0].indexOf(r2[0])] > r2[1]) {
            count = 2;
          } else {
            count = 1;
          }
        }
      }
    }
  }

  return finish
}
*/

/**
 * @customfunction
 */
function DATA_SPLIT(data, percent = 0.5) {
  percent = 1 - percent;
  var starterI = 0;
  var data1 = data;
  var data2 = [];
  var dataSize = data[0].length;
  if (typeof data[0][0] !== 'number') {
    data2.push(data1[0])
    starterI = 1;
  }
  var size = Math.floor((data.length - starterI) * percent + starterI);
  for (var i = starterI; i < size; i++) {
    data2.push(data1.splice(getRandomInt(data1.length - starterI) + starterI, 1)[0])
  }

  var answer;
  if (data1.length > data2.length) {
    answer = data1;
    for (var i = 0; i < data2.length; i++) {
      answer[i] = answer[i].concat(data2[i])
    }
    for (var i = data2.length; i < data1.length; i++) {
      answer[i] = answer[i].concat(new Array(dataSize).fill(''))
    }
  } else {
    answer = data2;
    for (var i = 0; i < data1.length; i++) {
      answer[i] = data1[i].concat(answer[i])//answer[i].concat(data1[i])
    }
    for (var i = data1.length; i < data2.length; i++) {
      answer[i] = new Array(dataSize).fill('').concat(answer[i])//answer[i].concat(data1[i])
    }
  }

  return answer;
}


/**
 * @customfunction
 */
function WAY_TREE(tree, Y, initial = null) {
  if (tree[0][0] == 'Родитель') {
    tree.splice(0, 1)
  }

  var way = ''
  var evaluations = [[], []]
  if (initial == null) {
    for (var i = tree.length - 1; i > 0; i--) {
      var splitLeaf = tree[i][1].split('\n')
      if (splitLeaf.length < 3) {
        evaluations[0].push(i);
        evaluations[1].push(splitLeaf[1])
      }
    }
  } else {
    var tree_pred = TREE_PREDICT(tree, initial);

    if (typeof tree_pred == 'number') {
      tree_pred = [tree_pred];
    } else {
      tree_pred = tree_pred[0]
    }

    evaluations[1] = tree_pred;

    for (var i = 1; i < tree.length; i++) {
      var splitLeaf = tree[i][1].split('\n')

      if (splitLeaf.length < 3) {
        if (evaluations[1].indexOf(+splitLeaf[1]) != -1) {
          evaluations[0].push(i);
        }
      }
    }
  }

  var choosenY;
  var betterSimilarity = Infinity;
  var choosenIds;
  for (var i = 0; i < evaluations[0].length; i++) {
    if (betterSimilarity >= Math.abs(Y - evaluations[1][i])) {
      if (betterSimilarity > Math.abs(Y - evaluations[1][i])) {
        choosenIds = [evaluations[0][i]]
        choosenY = [evaluations[1][i]];
        betterSimilarity = Math.abs(Y - evaluations[1][i])
      } else {
        choosenIds.push(evaluations[0][i])
        choosenY.push(evaluations[1][i])
      }
    }
  }

  for (var j = 0; j < choosenIds.length; j++) {
    var choosenId = choosenIds[j];

    var conditions = [[], [], []];
    while (tree[choosenId][0] != '') {
      var less = true;
      for (var i = choosenId - 1; i > 0; i--) {
        if (tree[choosenId][0] == tree[i][0]) {
          less = false;
        }
      }

      var params = tree[choosenId][0].split('\n')[2].split(' > ');
      var conditionsId = conditions[0].indexOf(params[0]);
      if (conditionsId == -1) {
        conditions[0].push(params[0]);
        conditions[1].push('');
        conditions[2].push('');
        conditionsId = conditions[0].length - 1;
      }

      if (less) {
        var upperBound = conditions[2][conditionsId];
        if (upperBound == '' || upperBound > params[1]) {
          conditions[2][conditionsId] = params[1];
        }
      } else {
        var lowerBound = conditions[1][conditionsId];
        if (lowerBound == '' || lowerBound < params[1]) {
          conditions[1][conditionsId] = params[1];
        }
      }

      for (var i = choosenId; i >= 0; i--) {
        if (tree[choosenId][0] == tree[i][1]) {
          choosenId = i;
          break
        }
      }
    }

    for (var i = 0; i < conditions[0].length; i++) {
      way += '('
      if (conditions[1][i] != '' && conditions[2][i] != '') {
        way += conditions[1][i] + ' < ';
      }

      way += conditions[0][i];

      if (conditions[2][i] != '') {
        way += ' < ' + conditions[2][i];
      } else {
        way += ' > ' + conditions[1][i];
      }
      way += ')'
      if (i != conditions[0].length - 1) {
        way += ' & ';
      }
    }

    way += '→' + choosenY[j]

    if (j < choosenIds.length - 1) {
      way += '\n';
    }
  }

  return way;
}


/**
 * @customfunction
 */
function TREE_PREDICT(tree, initial = [[''], ['']], voidsAre0 = false, inOneCell = false) {
  if (tree[0][0] == 'Родитель') {
    tree.splice(0, 1);
  }
  if (voidsAre0) {
    for (var i = 1; i < initial.length; i++) {
      for (var j = 0; j < initial[0].length; j++) {
        if (initial[i][j] == '') {
          initial[i][j] = 0;
        }
      }
    }
  }
  var predicts = []
  if (inOneCell) {
    predicts = TREE_PREDICT_V2(tree, initial, 0).slice(0, -1)
  } else {
    var initLenght = initial.length
    for (var i = 1; i < initLenght; i++) {
      predicts.push(TREE_PREDICT_V2(tree, initial, 0).slice(0, -1).split('\n').map(function (num) {
        return +num;
      }))
      initial.splice(1, 1);
    }
  }

  return predicts;
}


function TREE_PREDICT_V2(tree, initial, id) {
  var predicts = [];
  var condition = tree[id][1].split('\n');

  if (condition.length < 3) {
    return +condition[1] + '\n';
  } else {
    var label = condition[2].split(' > ')[0];
  }

  var way;
  var numWay;
  var indexLabel = initial[0].indexOf(label);
  var value;

  if (indexLabel == -1) {
    value = '';
  } else {
    value = initial[1][indexLabel];
  }

  if (value === '') {
    way = 2;
  } else {
    way = 1;

    if (value > +condition[2].split(' > ')[1]) {
      numWay = 2;
    } else {
      numWay = 1;
    }
  }

  for (var i = id + 1; i < tree.length; i++) {
    if (tree[id][1] == tree[i][0]) {
      if (way == 2) {
        predicts += TREE_PREDICT_V2(tree, initial, i);
        way--;
        numWay = 1;
      } else {
        if (numWay == 1) {
          predicts += TREE_PREDICT_V2(tree, initial, i);
          break
        }

        numWay--;
      }
    }
  }
  return predicts
}