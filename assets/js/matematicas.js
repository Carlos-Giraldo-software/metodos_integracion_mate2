/* ==========================================================================
   matematicas.js
   Funciones matemáticas compartidas por todos los módulos.
   Aquí NO hay nada de HTML ni de gráficas: solo cálculo.
   Se usa así desde otros archivos:   Mate.sumaRiemann(f, 0, 2, 4, 'izq')
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---------- Catálogo de funciones que el estudiante puede elegir ----------
     texto      : nombre legible para las listas desplegables
     f          : la función
     F          : una antiderivada (sirve para calcular el valor EXACTO con el
                  Teorema Fundamental del Cálculo: F(b) - F(a))
     latex      : cómo se escribe la función en KaTeX
     dominioMin : el menor valor de x permitido (por ejemplo, 1/x no admite x = 0)
     a, b       : intervalo sugerido al elegir la función                        */
  var FUNCIONES = [
    { id: 'x2', texto: 'x²',   latex: 'x^{2}',       f: function (x) { return x * x; },
      F: function (x) { return Math.pow(x, 3) / 3; },        dominioMin: -Infinity, a: 0, b: 2 },
    { id: 'x3', texto: 'x³',   latex: 'x^{3}',       f: function (x) { return x * x * x; },
      F: function (x) { return Math.pow(x, 4) / 4; },        dominioMin: -Infinity, a: 0, b: 2 },
    { id: 'sin', texto: 'sen(x)',  latex: '\\operatorname{sen}(x)', f: function (x) { return Math.sin(x); },
      F: function (x) { return -Math.cos(x); },              dominioMin: -Infinity, a: 0, b: Math.PI },
    { id: 'cos', texto: 'cos(x)',  latex: '\\cos(x)',    f: function (x) { return Math.cos(x); },
      F: function (x) { return Math.sin(x); },               dominioMin: -Infinity, a: 0, b: Math.PI / 2 },
    { id: 'exp', texto: 'eˣ',  latex: 'e^{x}',       f: function (x) { return Math.exp(x); },
      F: function (x) { return Math.exp(x); },               dominioMin: -Infinity, a: 0, b: 1 },
    { id: 'inv', texto: '1/x',  latex: '\\dfrac{1}{x}', f: function (x) { return 1 / x; },
      F: function (x) { return Math.log(x); },               dominioMin: 0, estricto: true, a: 1, b: 3 },
    { id: 'raiz', texto: '√x', latex: '\\sqrt{x}',   f: function (x) { return Math.sqrt(x); },
      F: function (x) { return (2 / 3) * Math.pow(x, 1.5); }, dominioMin: 0, estricto: false, a: 0, b: 4 }
  ];

  // Busca una función del catálogo por su id.
  function buscarFuncion(id) {
    for (var i = 0; i < FUNCIONES.length; i++) {
      if (FUNCIONES[i].id === id) { return FUNCIONES[i]; }
    }
    return null;
  }

  // Ancho de cada subintervalo: Δx = (b - a) / n
  function anchoSubintervalo(a, b, n) {
    return (b - a) / n;
  }

  /* ---------- Suma de Riemann ----------
     tipo = 'izq'   -> se evalúa f en el extremo IZQUIERDO de cada subintervalo
     tipo = 'der'   -> se evalúa f en el extremo DERECHO
     tipo = 'medio' -> se evalúa f en el PUNTO MEDIO                             */
  function sumaRiemann(f, a, b, n, tipo) {
    var dx = anchoSubintervalo(a, b, n);
    var suma = 0;
    for (var i = 0; i < n; i++) {
      var xIzq = a + i * dx;        // extremo izquierdo del subintervalo i
      var xDer = a + (i + 1) * dx;  // extremo derecho
      var xEval;
      if (tipo === 'izq') { xEval = xIzq; }
      else if (tipo === 'der') { xEval = xDer; }
      else { xEval = (xIzq + xDer) / 2; }   // 'medio'
      suma += f(xEval);
    }
    return suma * dx;   // altura total × ancho
  }

  // Regla del punto medio (es una suma de Riemann con tipo 'medio').
  function puntoMedio(f, a, b, n) {
    return sumaRiemann(f, a, b, n, 'medio');
  }

  // Regla del trapecio: T = (Δx/2) [ f(x0) + 2f(x1) + ... + 2f(x_{n-1}) + f(xn) ]
  function trapecio(f, a, b, n) {
    var dx = anchoSubintervalo(a, b, n);
    var suma = f(a) + f(b);                 // los extremos se cuentan una sola vez
    for (var i = 1; i < n; i++) {
      suma += 2 * f(a + i * dx);            // los puntos interiores se cuentan dos veces
    }
    return (dx / 2) * suma;
  }

  // Regla de Simpson 1/3: S = (Δx/3) [ f0 + 4f1 + 2f2 + 4f3 + ... + 4f_{n-1} + fn ]
  // Exige que n sea PAR (cada parábola usa dos subintervalos).
  function simpson(f, a, b, n) {
    if (n % 2 !== 0) {
      throw new Error('La regla de Simpson necesita un n par.');
    }
    var dx = anchoSubintervalo(a, b, n);
    var suma = f(a) + f(b);
    for (var i = 1; i < n; i++) {
      // los índices impares llevan coeficiente 4 y los pares coeficiente 2
      suma += (i % 2 === 1 ? 4 : 2) * f(a + i * dx);
    }
    return (dx / 3) * suma;
  }

  // Valor exacto por el Teorema Fundamental del Cálculo: F(b) - F(a)
  function integralExacta(fun, a, b) {
    return fun.F(b) - fun.F(a);
  }

  // Revisa que el intervalo sea válido para la función elegida.
  // Devuelve un texto con el problema, o null si todo está bien.
  function validarIntervalo(fun, a, b) {
    if (!isFinite(a) || !isFinite(b)) { return 'Escribe números válidos en a y b.'; }
    if (a >= b) { return 'Debe cumplirse a < b.'; }
    if (fun.estricto && a <= fun.dominioMin) {
      return 'Para esta función, a debe ser mayor que ' + fun.dominioMin + '.';
    }
    if (a < fun.dominioMin) {
      return 'Para esta función, a debe ser mayor o igual que ' + fun.dominioMin + '.';
    }
    return null;
  }

  // Genera m+1 puntos (x, y) equiespaciados para dibujar la curva suave.
  function puntosCurva(f, a, b, m) {
    var xs = [], ys = [];
    for (var i = 0; i <= m; i++) {
      var x = a + (b - a) * i / m;
      xs.push(x);
      ys.push(f(x));
    }
    return { x: xs, y: ys };
  }

  var Mate = {
    FUNCIONES: FUNCIONES,
    buscarFuncion: buscarFuncion,
    anchoSubintervalo: anchoSubintervalo,
    sumaRiemann: sumaRiemann,
    puntoMedio: puntoMedio,
    trapecio: trapecio,
    simpson: simpson,
    integralExacta: integralExacta,
    validarIntervalo: validarIntervalo,
    puntosCurva: puntosCurva
  };

  global.Mate = Mate;
  if (typeof module !== 'undefined' && module.exports) { module.exports = Mate; } // para probar con Node
})(typeof window !== 'undefined' ? window : globalThis);
