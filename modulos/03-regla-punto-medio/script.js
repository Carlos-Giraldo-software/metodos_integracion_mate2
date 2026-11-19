/* ==========================================================================
   script.js — Módulo 3: Regla del Punto Medio (parte interactiva)
   Qué hace:
     1) Lee los controles (función, a, b, n).
     2) Calcula el punto medio (y el trapecio para comparar) con Mate.
     3) Dibuja los rectángulos y marca con puntos el centro de cada uno.
     4) Dibuja cómo baja el error de ambos métodos al aumentar n.
   ========================================================================== */
(function () {
  'use strict';

  var selFuncion = document.getElementById('sel-funcion');
  var inA = document.getElementById('in-a');
  var inB = document.getElementById('in-b');
  var rngN = document.getElementById('rng-n');
  var lblN = document.getElementById('lbl-n');
  var divError = document.getElementById('error');
  var divGrafica = document.getElementById('grafica');
  var divConv = document.getElementById('grafica-convergencia');
  var N_MAX = parseInt(rngN.max, 10);

  Mate.FUNCIONES.forEach(function (fun) {
    var op = document.createElement('option');
    op.value = fun.id;
    op.textContent = 'f(x) = ' + fun.texto;
    selFuncion.appendChild(op);
  });

  function poner(id, texto) { document.getElementById(id).textContent = texto; }
  function piso(v) { return Math.max(v, 1e-16); }   // evita log(0)

  function actualizar() {
    var fun = Mate.buscarFuncion(selFuncion.value);
    var a = parseFloat(inA.value);
    var b = parseFloat(inB.value);
    var n = parseInt(rngN.value, 10);
    lblN.textContent = n;

    var problema = Mate.validarIntervalo(fun, a, b);
    divError.textContent = problema || '';
    if (problema) { return; }

    // Cálculos
    var dx = Mate.anchoSubintervalo(a, b, n);
    var med = Mate.puntoMedio(fun.f, a, b, n);
    var trap = Mate.trapecio(fun.f, a, b, n);
    var exacto = Mate.integralExacta(fun, a, b);
    var errM = Math.abs(exacto - med);
    var errT = Math.abs(exacto - trap);

    poner('res-dx', Mate.fmt(dx));
    poner('res-aprox', Mate.fmt(med));
    poner('res-trap', Mate.fmt(trap));
    poner('res-exacto', Mate.fmt(exacto));
    poner('res-error', Mate.fmtError(errM));
    poner('res-error-trap', Mate.fmtError(errT));
    var tol = 1e-9 * Math.max(1, Math.abs(exacto));
    poner('res-signo', errM < tol ? 'Igual' : (med > exacto ? 'Sobreestima' : 'Subestima'));

    // Puntos medios (x, f(x)) para marcarlos sobre la curva
    var mx = [], my = [];
    for (var i = 0; i < n; i++) {
      var xm = a + (i + 0.5) * dx;
      mx.push(xm); my.push(fun.f(xm));
    }

    // Gráfica principal: curva + rectángulos + puntos medios
    Plotly.react(divGrafica,
      [Grafica.trazaCurva(fun.f, a, b),
       Grafica.trazaPuntos(mx, my, 'Puntos medios')],
      Grafica.disenoBase(fun.f, a, b, Grafica.rectangulos(fun.f, a, b, n, 'medio')),
      Grafica.CONFIG);

    // Error frente a n para punto medio y trapecio
    var ns = [], eM = [], eT = [];
    for (var k = 1; k <= N_MAX; k++) {
      ns.push(k);
      eM.push(piso(Math.abs(exacto - Mate.puntoMedio(fun.f, a, b, k))));
      eT.push(piso(Math.abs(exacto - Mate.trapecio(fun.f, a, b, k))));
    }
    Plotly.react(divConv, [
      { x: ns, y: eM, name: 'Punto medio', mode: 'lines', line: { width: 2, color: '#7c3aed' } },
      { x: ns, y: eT, name: 'Trapecio',    mode: 'lines', line: { width: 2, color: '#0f9d8a' } }
    ], Grafica.disenoErrores(n), Grafica.CONFIG);
  }

  selFuncion.addEventListener('change', function () {
    var fun = Mate.buscarFuncion(selFuncion.value);
    inA.value = +fun.a.toFixed(4);
    inB.value = +fun.b.toFixed(4);
    actualizar();
  });
  [inA, inB, rngN].forEach(function (el) { el.addEventListener('input', actualizar); });

  selFuncion.value = 'exp';
  inA.value = 0; inB.value = 1; rngN.value = 4;
  actualizar();

  renderEjemplos(window.EJEMPLOS_M3, document.getElementById('ejemplos'));
})();
