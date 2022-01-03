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