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