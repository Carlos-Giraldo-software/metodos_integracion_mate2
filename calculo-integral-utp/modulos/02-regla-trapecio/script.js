/* ==========================================================================
   script.js — Módulo 2: Regla del Trapecio (parte interactiva)
   Qué hace:
     1) Lee los controles (función, a, b, n).
     2) Calcula el trapecio y el valor exacto con Mate (matematicas.js).
     3) Dibuja los trapecios sobre la curva con Plotly (Grafica, graficas.js).
     4) Dibuja cómo baja el error al aumentar n.
   ========================================================================== */
(function () {
  'use strict';

  // ---- Referencias a los elementos de la página (por su id) ----
  var selFuncion = document.getElementById('sel-funcion');
  var inA = document.getElementById('in-a');
  var inB = document.getElementById('in-b');
  var rngN = document.getElementById('rng-n');
  var lblN = document.getElementById('lbl-n');
  var divError = document.getElementById('error');
  var divGrafica = document.getElementById('grafica');
  var divConv = document.getElementById('grafica-convergencia');
  var N_MAX = parseInt(rngN.max, 10);

  // Llena la lista desplegable con las funciones del catálogo.
  Mate.FUNCIONES.forEach(function (fun) {
    var op = document.createElement('option');
    op.value = fun.id;
    op.textContent = 'f(x) = ' + fun.texto;
    selFuncion.appendChild(op);
  });

  // Escribe un texto en la casilla con ese id.
  function poner(id, texto) { document.getElementById(id).textContent = texto; }

  // Evita ceros en la escala logarítmica (log de 0 no existe).
  function piso(v) { return Math.max(v, 1e-16); }

  function actualizar() {
    var fun = Mate.buscarFuncion(selFuncion.value);
    var a = parseFloat(inA.value);
    var b = parseFloat(inB.value);
    var n = parseInt(rngN.value, 10);
    lblN.textContent = n;

    // 1) Validar el intervalo
    var problema = Mate.validarIntervalo(fun, a, b);
    divError.textContent = problema || '';
    if (problema) { return; }

    // 2) Calcular
    var aprox = Mate.trapecio(fun.f, a, b, n);
    var exacto = Mate.integralExacta(fun, a, b);
    var error = Math.abs(exacto - aprox);
    var errorRel = exacto !== 0 ? (error / Math.abs(exacto)) * 100 : 0;

    poner('res-dx', Mate.fmt(Mate.anchoSubintervalo(a, b, n)));
    poner('res-aprox', Mate.fmt(aprox));
    poner('res-exacto', Mate.fmt(exacto));
    poner('res-error', Mate.fmtError(error));
    poner('res-errel', errorRel.toFixed(4) + ' %');
    // Comparamos con una tolerancia pequeña para no confundirnos por redondeos
    var tol = 1e-9 * Math.max(1, Math.abs(exacto));
    poner('res-signo', error < tol ? 'Igual' : (aprox > exacto ? 'Sobreestima' : 'Subestima'));

    // 3) Gráfica principal: curva + trapecios
    Plotly.react(divGrafica,
      [Grafica.trazaCurva(fun.f, a, b)],
      Grafica.disenoBase(fun.f, a, b, Grafica.trapecios(fun.f, a, b, n)),
      Grafica.CONFIG);

    // 4) Error frente a n: comparamos el trapecio con la suma izquierda del módulo 1
    var ns = [], errT = [], errL = [];
    for (var k = 1; k <= N_MAX; k++) {
      ns.push(k);
      errT.push(piso(Math.abs(exacto - Mate.trapecio(fun.f, a, b, k))));
      errL.push(piso(Math.abs(exacto - Mate.sumaRiemann(fun.f, a, b, k, 'izq'))));
    }
    Plotly.react(divConv, [
      { x: ns, y: errT, name: 'Trapecio', mode: 'lines', line: { width: 2, color: '#0f9d8a' } },
      { x: ns, y: errL, name: 'Suma izquierda', mode: 'lines', line: { width: 2, color: '#1d4ed8' } }
    ], Grafica.disenoErrores(n), Grafica.CONFIG);
  }

  // Al cambiar de función, proponemos su intervalo sugerido.
  selFuncion.addEventListener('change', function () {
    var fun = Mate.buscarFuncion(selFuncion.value);
    inA.value = +fun.a.toFixed(4);
    inB.value = +fun.b.toFixed(4);
    actualizar();
  });
  [inA, inB, rngN].forEach(function (el) { el.addEventListener('input', actualizar); });

  // Inicio: x² en [0, 2] con n = 4
  selFuncion.value = 'x2';
  inA.value = 0; inB.value = 2; rngN.value = 4;
  actualizar();

  renderEjemplos(window.EJEMPLOS_M2, document.getElementById('ejemplos'));
})();
