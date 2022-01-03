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