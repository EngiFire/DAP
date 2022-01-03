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
 
    formula += ';' + maxDepth + ';'+ maxLeaf +')';
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