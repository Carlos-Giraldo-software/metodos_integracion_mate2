/* ==========================================================================
   script.js — Módulo 5: Integral definida y área bajo la curva
   Qué hace:
     1) Lee el modo (bajo una curva / entre dos curvas), las funciones f y g
        y los límites a y b (deslizadores).
     2) Calcula la integral con signo usando el Teorema Fundamental: H(b) - H(a),
        donde H = F - G (antiderivadas). También calcula el área total numéricamente.
     3) Dibuja las curvas y sombrea el área entre a y b.
     4) Dibuja la función de acumulación A(x) = H(x) - H(a).
   ========================================================================== */
(function () {
  'use strict';

  // ---- Referencias a la página ----
  var selModo = document.getElementById('sel-modo');
  var selF = document.getElementById('sel-funcion');
  var selG = document.getElementById('sel-g');
  var rngA = document.getElementById('rng-a');
  var rngB = document.getElementById('rng-b');
  var lblA = document.getElementById('lbl-a');
  var lblB = document.getElementById('lbl-b');
  var btnEjemplo = document.getElementById('btn-ejemplo');
  var divError = document.getElementById('error');
  var divGrafica = document.getElementById('grafica');
  var divAcum = document.getElementById('grafica-acum');

  // "Función" constante 0: representa el eje x cuando estamos en el modo "bajo la curva".
  var CERO = { id: 'cero', texto: '0 (eje x)', f: function () { return 0; }, F: function () { return 0; },
               dominioMin: -Infinity, vista: [-Infinity, Infinity], a: 0, b: 1 };

  // Llenar las listas desplegables
  Mate.FUNCIONES.forEach(function (fun) {
    [selF, selG].forEach(function (sel) {
      var op = document.createElement('option');
      op.value = fun.id;
      op.textContent = (sel === selF ? 'f(x) = ' : 'g(x) = ') + fun.texto;
      sel.appendChild(op);
    });
  });

  // ---- Funciones auxiliares ----
  function poner(id, texto) { document.getElementById(id).textContent = texto; }

  // Evita mostrar "-0.00000" cuando el resultado es prácticamente cero.
  function limpio(v) { return Math.abs(v) < 1e-9 ? 0 : v; }

  // Devuelve el par de funciones (f, g) según el modo elegido.
  function obtenerPar() {
    var f = Mate.buscarFuncion(selF.value);
    var g = CERO;
    if (selModo.value === 'entre') { g = Mate.buscarFuncion(selG.value); }
    return { f: f, g: g };
  }

  // Ventana horizontal donde ambas funciones están permitidas (intersección de sus "vistas").
  function ventana(par) {
    return [Math.max(par.f.vista[0], par.g.vista[0]), Math.min(par.f.vista[1], par.g.vista[1])];
  }

  // Ajusta los deslizadores a la ventana disponible y coloca a y b.
  // a0 y b0 son los valores deseados; si no caben, se recortan.
  function configurarDeslizadores(par, a0, b0) {
    var v = ventana(par);
    [rngA, rngB].forEach(function (r) { r.min = v[0]; r.max = v[1]; });
    var a = Math.min(Math.max(a0, v[0]), v[1]);
    var b = Math.min(Math.max(b0, v[0]), v[1]);
    if (b - a < 0.1) { a = v[0]; b = v[1]; }   // si quedó muy estrecho, usamos toda la ventana
    rngA.value = a; rngB.value = b;
  }

  // Mínimo y máximo de varias listas de números (para fijar el eje vertical).
  function rangoDe(listas) {
    var mn = 0, mx = 0;
    listas.forEach(function (l) {
      l.forEach(function (y) { if (isFinite(y)) { mn = Math.min(mn, y); mx = Math.max(mx, y); } });
    });
    var m = (mx - mn) * 0.1 || 1;
    return [mn - m, mx + m];
  }

  // ---- Función principal ----
  function actualizar() {
    var par = obtenerPar();
    var f = par.f, g = par.g;
    var entre = selModo.value === 'entre';
    selG.disabled = !entre;

    var a = +parseFloat(rngA.value).toFixed(3);
    var b = +parseFloat(rngB.value).toFixed(3);
    lblA.textContent = a; lblB.textContent = b;

    if (a >= b) { divError.textContent = 'Debe cumplirse a < b. Mueve los deslizadores.'; return; }
    var v = ventana(par);
    if (!(v[0] < v[1])) { divError.textContent = 'Estas dos funciones no comparten un intervalo común de dibujo.'; return; }
    divError.textContent = '';

    // Antiderivada de la diferencia: H(x) = F(x) - G(x)
    function H(x) { return f.F(x) - g.F(x); }
    var Ha = H(a), Hb = H(b);
    var integral = limpio(Hb - Ha);
    var area = Mate.areaEntre(f.f, g.f, a, b);

    poner('tit-Ha', 'H(a)');
    poner('tit-Hb', 'H(b)');
    poner('res-Ha', Mate.fmt(limpio(Ha)));
    poner('res-Hb', Mate.fmt(limpio(Hb)));
    poner('res-int', Mate.fmt(integral));
    poner('res-area', Mate.fmt(area));

    // ---- Gráfica principal ----
    var curvaF = Mate.puntosCurva(f.f, v[0], v[1], 400);
    var curvaG = Mate.puntosCurva(g.f, v[0], v[1], 400);
    var trazas = [];

    // Región sombreada: bajamos por f de a hasta b y volvemos por g de b hasta a.
    var pF = Mate.puntosCurva(f.f, a, b, 200);
    var pG = Mate.puntosCurva(g.f, a, b, 200);
    trazas.push({
      x: pF.x.concat(pG.x.slice().reverse()),
      y: pF.y.concat(pG.y.slice().reverse()),
      type: 'scatter', mode: 'lines', fill: 'toself',
      fillcolor: Grafica.COLORES.relleno, line: { width: 0 }, hoverinfo: 'skip', name: 'Área'
    });
    trazas.push({ x: curvaF.x, y: curvaF.y, type: 'scatter', mode: 'lines', name: 'f(x)',
                  line: { color: Grafica.COLORES.curva, width: 3 } });
    if (entre) {
      trazas.push({ x: curvaG.x, y: curvaG.y, type: 'scatter', mode: 'lines', name: 'g(x)',
                    line: { color: Grafica.COLORES.exacto, width: 3 } });
    }

    var lineaVertical = function (x) {
      return { type: 'line', xref: 'x', yref: 'paper', x0: x, x1: x, y0: 0, y1: 1,
               line: { color: Grafica.COLORES.eje, width: 1, dash: 'dot' } };
    };
    Plotly.react(divGrafica, trazas, {
      margin: { l: 45, r: 15, t: 15, b: 40 },
      xaxis: { range: [v[0], v[1]], title: 'x', zeroline: true, zerolinecolor: Grafica.COLORES.eje },
      yaxis: { range: rangoDe([curvaF.y, curvaG.y]), title: 'y', zeroline: true, zerolinecolor: Grafica.COLORES.eje },
      shapes: [lineaVertical(a), lineaVertical(b)],
      showlegend: true, legend: { orientation: 'h', y: -0.25 },
      paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(255,255,255,0.7)'
    }, Grafica.CONFIG);

    // ---- Función de acumulación A(x) = H(x) - H(a) para x en [a, b] ----
    var ax = [], ay = [];
    for (var i = 0; i <= 200; i++) {
      var x = a + (b - a) * i / 200;
      ax.push(x); ay.push(H(x) - Ha);
    }
    Plotly.react(divAcum, [
      { x: ax, y: ay, type: 'scatter', mode: 'lines', name: 'A(x)', line: { color: '#7c3aed', width: 3 } }
    ], {
      margin: { l: 55, r: 15, t: 15, b: 40 },
      xaxis: { title: 'x', range: [a, b] },
      yaxis: { title: 'A(x)', zeroline: true, zerolinecolor: Grafica.COLORES.eje },
      showlegend: false,
      paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(255,255,255,0.7)'
    }, Grafica.CONFIG);
  }

  // ---- Eventos ----
  // Al cambiar de función o de modo, reiniciamos los límites con valores sugeridos.
  function reiniciar() {
    var par = obtenerPar();
    configurarDeslizadores(par, par.f.a, par.f.b);
    actualizar();
  }
  selF.addEventListener('change', reiniciar);
  selG.addEventListener('change', reiniciar);
  selModo.addEventListener('change', reiniciar);
  rngA.addEventListener('input', actualizar);
  rngB.addEventListener('input', actualizar);

  // Botón: carga el ejemplo clásico de área entre curvas
  btnEjemplo.addEventListener('click', function () {
    selModo.value = 'entre'; selF.value = 'raiz'; selG.value = 'x2';
    configurarDeslizadores(obtenerPar(), 0, 1);
    actualizar();
  });

  // Inicio: área bajo x² entre 0 y 2
  selModo.value = 'bajo'; selF.value = 'x2'; selG.value = 'x1';
  configurarDeslizadores(obtenerPar(), 0, 2);
  actualizar();

  renderEjemplos(window.EJEMPLOS_M5, document.getElementById('ejemplos'));
})();
