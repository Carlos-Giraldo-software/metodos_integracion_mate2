/* ==========================================================================
   script.js — Módulo 1: Sumas de Riemann (parte interactiva)
   Qué hace:
     1) Lee los controles (función, a, b, n, tipo de suma).
     2) Calcula la aproximación y el valor exacto usando Mate (matematicas.js).
     3) Dibuja los rectángulos con Plotly (usando Grafica de graficas.js).
     4) Dibuja una segunda gráfica que muestra cómo la suma se acerca al valor exacto.
   ========================================================================== */
(function () {
  'use strict';

  // ---- Referencias a los elementos de la página (por su id) ----
  var selFuncion = document.getElementById('sel-funcion');
  var inA = document.getElementById('in-a');
  var inB = document.getElementById('in-b');
  var rngN = document.getElementById('rng-n');
  var lblN = document.getElementById('lbl-n');
  var selTipo = document.getElementById('sel-tipo');
  var divError = document.getElementById('error');
  var divGrafica = document.getElementById('grafica');
  var divConv = document.getElementById('grafica-convergencia');

  var N_MAX = parseInt(rngN.max, 10);   // máximo de rectángulos permitido por el deslizador

  // Llena la lista desplegable con las funciones del catálogo.
  Mate.FUNCIONES.forEach(function (fun) {
    var op = document.createElement('option');
    op.value = fun.id;
    op.textContent = 'f(x) = ' + fun.texto;
    selFuncion.appendChild(op);
  });

  // Da formato a un número: 5 decimales.
  function fmt(v) { return v.toFixed(5); }

  // Escribe un resultado en su casilla (<dd>) por id.
  function poner(id, texto) { document.getElementById(id).textContent = texto; }

  // ---- Función principal: se ejecuta cada vez que el usuario cambia algo ----
  function actualizar() {
    var fun = Mate.buscarFuncion(selFuncion.value);
    var a = parseFloat(inA.value);
    var b = parseFloat(inB.value);
    var n = parseInt(rngN.value, 10);
    var tipo = selTipo.value;
    lblN.textContent = n;

    // 1) Validar. Si hay problema, mostramos el mensaje y no dibujamos.
    var problema = Mate.validarIntervalo(fun, a, b);
    divError.textContent = problema || '';
    if (problema) { return; }

    // 2) Calcular
    var aprox = Mate.sumaRiemann(fun.f, a, b, n, tipo);
    var exacto = Mate.integralExacta(fun, a, b);
    var error = Math.abs(exacto - aprox);
    var errorRel = exacto !== 0 ? (error / Math.abs(exacto)) * 100 : 0;

    poner('res-dx', fmt(Mate.anchoSubintervalo(a, b, n)));
    poner('res-aprox', fmt(aprox));
    poner('res-exacto', fmt(exacto));
    poner('res-error', fmt(error));
    poner('res-errel', errorRel.toFixed(3) + ' %');

    // 3) Gráfica principal: curva + rectángulos
    var formas = Grafica.rectangulos(fun.f, a, b, n, tipo);
    Plotly.react(divGrafica,
      [Grafica.trazaCurva(fun.f, a, b)],
      Grafica.disenoBase(fun.f, a, b, formas),
      Grafica.CONFIG);

    // 4) Gráfica de convergencia: las tres sumas para n = 1, 2, ..., N_MAX
    var ns = [], izq = [], der = [], medio = [];
    for (var k = 1; k <= N_MAX; k++) {
      ns.push(k);
      izq.push(Mate.sumaRiemann(fun.f, a, b, k, 'izq'));
      der.push(Mate.sumaRiemann(fun.f, a, b, k, 'der'));
      medio.push(Mate.sumaRiemann(fun.f, a, b, k, 'medio'));
    }
    var trazas = [
      { x: ns, y: izq,   name: 'Izquierda',   mode: 'lines', line: { width: 2, color: '#1d4ed8' } },
      { x: ns, y: der,   name: 'Derecha',     mode: 'lines', line: { width: 2, color: '#0f9d8a' } },
      { x: ns, y: medio, name: 'Punto medio', mode: 'lines', line: { width: 2, color: '#7c3aed' } },
      { x: [1, N_MAX], y: [exacto, exacto], name: 'Valor exacto', mode: 'lines',
        line: { width: 2, dash: 'dash', color: Grafica.COLORES.exacto } }
    ];
    var disenoConv = {
      margin: { l: 55, r: 15, t: 15, b: 45 },
      xaxis: { title: 'Número de rectángulos (n)' },
      yaxis: { title: 'Aproximación' },
      // Línea vertical que marca el n actual
      shapes: [{ type: 'line', xref: 'x', yref: 'paper', x0: n, x1: n, y0: 0, y1: 1,
                 line: { color: '#14213d', width: 1, dash: 'dot' } }],
      legend: { orientation: 'h', y: -0.3 },
      paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(255,255,255,0.7)'
    };
    Plotly.react(divConv, trazas, disenoConv, Grafica.CONFIG);
  }

  // Al cambiar de función, proponemos su intervalo sugerido.
  selFuncion.addEventListener('change', function () {
    var fun = Mate.buscarFuncion(selFuncion.value);
    inA.value = +fun.a.toFixed(4);
    inB.value = +fun.b.toFixed(4);
    actualizar();
  });

  // Cualquier otro control vuelve a calcular. "input" reacciona mientras se arrastra el deslizador.
  [inA, inB, rngN, selTipo].forEach(function (el) {
    el.addEventListener('input', actualizar);
  });

  // Inicio: función x², intervalo [0, 2], n = 8, suma izquierda
  selFuncion.value = 'x2';
  inA.value = 0; inB.value = 2; rngN.value = 8; selTipo.value = 'izq';
  actualizar();

  // Dibuja los ejemplos resueltos (renderEjemplos está en katex-init.js)
  renderEjemplos(window.EJEMPLOS_M1, document.getElementById('ejemplos'));
})();
