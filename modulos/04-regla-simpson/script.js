/* ==========================================================================
   script.js — Módulo 4: Regla de Simpson (parte interactiva)
   Qué hace:
     1) Lee los controles (función, a, b, n). El deslizador solo permite n PAR.
     2) Calcula Simpson (y el trapecio para comparar) con Mate.
     3) Dibuja las parábolas ajustadas y los nodos sobre la curva.
     4) Dibuja cómo baja el error de Simpson, trapecio y punto medio.
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

    // Seguridad extra: si por alguna razón n fuera impar, lo subimos al siguiente par.
    if (n % 2 !== 0) { n += 1; rngN.value = n; }
    lblN.textContent = n;

    var problema = Mate.validarIntervalo(fun, a, b);
    divError.textContent = problema || '';
    if (problema) { return; }

    // Cálculos
    var dx = Mate.anchoSubintervalo(a, b, n);
    var simp = Mate.simpson(fun.f, a, b, n);
    var trap = Mate.trapecio(fun.f, a, b, n);
    var exacto = Mate.integralExacta(fun, a, b);

    poner('res-dx', Mate.fmt(dx));
    poner('res-aprox', Mate.fmt(simp));
    poner('res-trap', Mate.fmt(trap));
    poner('res-exacto', Mate.fmt(exacto));
    poner('res-error', Mate.fmtError(Math.abs(exacto - simp)));
    poner('res-error-trap', Mate.fmtError(Math.abs(exacto - trap)));

    // Nodos x0, x1, ..., xn para marcarlos sobre la curva
    var nx = [], ny = [];
    for (var i = 0; i <= n; i++) {
      var x = a + i * dx;
      nx.push(x); ny.push(fun.f(x));
    }

    // Gráfica principal: curva + parábolas + nodos
    Plotly.react(divGrafica,
      [Grafica.trazaCurva(fun.f, a, b),
       Grafica.trazaParabolas(fun.f, a, b, n),
       Grafica.trazaPuntos(nx, ny, 'Nodos', '#14213d')],
      Grafica.disenoBase(fun.f, a, b, []),
      Grafica.CONFIG);

    // Error frente a n (solo valores pares para Simpson)
    var ns = [], eS = [], eT = [], eM = [];
    for (var k = 2; k <= N_MAX; k += 2) {
      ns.push(k);
      eS.push(piso(Math.abs(exacto - Mate.simpson(fun.f, a, b, k))));
      eT.push(piso(Math.abs(exacto - Mate.trapecio(fun.f, a, b, k))));
      eM.push(piso(Math.abs(exacto - Mate.puntoMedio(fun.f, a, b, k))));
    }
    Plotly.react(divConv, [
      { x: ns, y: eS, name: 'Simpson',     mode: 'lines', line: { width: 2, color: '#c2410c' } },
      { x: ns, y: eT, name: 'Trapecio',    mode: 'lines', line: { width: 2, color: '#0f9d8a' } },
      { x: ns, y: eM, name: 'Punto medio', mode: 'lines', line: { width: 2, color: '#7c3aed' } }
    ], Grafica.disenoErrores(n), Grafica.CONFIG);
  }

  selFuncion.addEventListener('change', function () {
    var fun = Mate.buscarFuncion(selFuncion.value);
    inA.value = +fun.a.toFixed(4);
    inB.value = +fun.b.toFixed(4);
    actualizar();
  });
  [inA, inB, rngN].forEach(function (el) { el.addEventListener('input', actualizar); });

  selFuncion.value = 'sin';
  inA.value = 0; inB.value = +Math.PI.toFixed(4); rngN.value = 4;
  actualizar();

  renderEjemplos(window.EJEMPLOS_M4, document.getElementById('ejemplos'));
})();
