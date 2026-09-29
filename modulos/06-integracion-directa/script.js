/* ==========================================================================
   script.js — Módulo 6: Integración directa
   Qué hace:
     1) Ofrece una lista de funciones básicas, cada una con su antiderivada conocida.
     2) Dibuja f(x) en una gráfica y F(x) + C en otra, junto con otras antiderivadas
        en gris (para ver que C solo desplaza la curva hacia arriba o abajo).
     3) Dibuja la recta tangente a F en x0: su pendiente es f(x0).
     4) Verifica por derivación numérica que F'(x0) = f(x0).
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Catálogo de fórmulas básicas ----------
     latexF : cómo se escribe f(x) en KaTeX          latexI : la antiderivada (sin +C)
     f, Fn  : la función y su antiderivada en JavaScript
     vista  : ventana [xmin, xmax] donde se dibuja (evita puntos donde no está definida) */
  var FORMULAS = [
    { id: 'x2',   latexF: String.raw`x^{2}`,          latexI: String.raw`\frac{x^{3}}{3}`,
      f: function (x) { return x * x; },             Fn: function (x) { return Math.pow(x, 3) / 3; },  vista: [-3, 3],   x0: 1 },
    { id: 'x3',   latexF: String.raw`x^{3}`,          latexI: String.raw`\frac{x^{4}}{4}`,
      f: function (x) { return x * x * x; },         Fn: function (x) { return Math.pow(x, 4) / 4; },  vista: [-2, 2],   x0: 1 },
    { id: 'raiz', latexF: String.raw`\sqrt{x}`,       latexI: String.raw`\frac{2}{3}x^{3/2}`,
      f: function (x) { return Math.sqrt(x); },      Fn: function (x) { return (2 / 3) * Math.pow(x, 1.5); }, vista: [0, 9], x0: 4 },
    { id: 'inv',  latexF: String.raw`\frac{1}{x}`,    latexI: String.raw`\ln|x|`,
      f: function (x) { return 1 / x; },             Fn: function (x) { return Math.log(Math.abs(x)); }, vista: [0.25, 5], x0: 2 },
    { id: 'exp',  latexF: String.raw`e^{x}`,          latexI: String.raw`e^{x}`,
      f: function (x) { return Math.exp(x); },       Fn: function (x) { return Math.exp(x); },          vista: [-2, 2],   x0: 0 },
    { id: 'sin',  latexF: String.raw`\operatorname{sen}(x)`, latexI: String.raw`-\cos(x)`,
      f: function (x) { return Math.sin(x); },       Fn: function (x) { return -Math.cos(x); },         vista: [0, 6.2832], x0: 1 },
    { id: 'cos',  latexF: String.raw`\cos(x)`,        latexI: String.raw`\operatorname{sen}(x)`,
      f: function (x) { return Math.cos(x); },       Fn: function (x) { return Math.sin(x); },          vista: [0, 6.2832], x0: 1 },
    { id: 'sec2', latexF: String.raw`\sec^{2}(x)`,    latexI: String.raw`\tan(x)`,
      f: function (x) { var c = Math.cos(x); return 1 / (c * c); }, Fn: function (x) { return Math.tan(x); }, vista: [-1.2, 1.2], x0: 0.5 }
  ];

  function buscar(id) {
    for (var i = 0; i < FORMULAS.length; i++) { if (FORMULAS[i].id === id) { return FORMULAS[i]; } }
    return null;
  }

  // ---- Referencias a la página ----
  var selFormula = document.getElementById('sel-formula');
  var rngC = document.getElementById('rng-c');
  var lblC = document.getElementById('lbl-c');
  var rngX0 = document.getElementById('rng-x0');
  var lblX0 = document.getElementById('lbl-x0');
  var divEnunciado = document.getElementById('enunciado-vivo');
  var divF = document.getElementById('grafica');
  var divAnti = document.getElementById('grafica-F');

  // Llenar la lista desplegable. Mostramos un texto simple; las fórmulas bonitas van en el enunciado.
  var NOMBRES = { x2: 'x²', x3: 'x³', raiz: '√x', inv: '1/x', exp: 'eˣ', sin: 'sen(x)', cos: 'cos(x)', sec2: 'sec²(x)' };
  FORMULAS.forEach(function (fm) {
    var op = document.createElement('option');
    op.value = fm.id;
    op.textContent = 'f(x) = ' + NOMBRES[fm.id];
    selFormula.appendChild(op);
  });

  function poner(id, texto) { document.getElementById(id).textContent = texto; }

  // Rango vertical que cubre varias listas de valores, con un pequeño margen.
  function rangoDe(listas) {
    var mn = Infinity, mx = -Infinity;
    listas.forEach(function (l) {
      l.forEach(function (y) { if (isFinite(y)) { mn = Math.min(mn, y); mx = Math.max(mx, y); } });
    });
    var m = (mx - mn) * 0.1 || 1;
    return [mn - m, mx + m];
  }

  var diseno = function (v, rangoY, ytitulo) {
    return {
      margin: { l: 50, r: 15, t: 15, b: 40 },
      xaxis: { range: v, title: 'x', zeroline: true, zerolinecolor: Grafica.COLORES.eje },
      yaxis: { range: rangoY, title: ytitulo, zeroline: true, zerolinecolor: Grafica.COLORES.eje },
      showlegend: false,
      paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(255,255,255,0.7)'
    };
  };

  // Ajusta el deslizador de x0 a la ventana de la función elegida.
  function configurarX0(fm, valor) {
    rngX0.min = fm.vista[0]; rngX0.max = fm.vista[1];
    // Para funciones como 1/x o √x evitamos x0 justo en el borde (derivada numérica con h).
    var margen = (fm.vista[1] - fm.vista[0]) * 0.02;
    rngX0.min = fm.vista[0] + margen; rngX0.max = fm.vista[1] - margen;
    rngX0.value = valor;
  }

  function actualizar() {
    var fm = buscar(selFormula.value);
    var C = +parseFloat(rngC.value).toFixed(2);
    var x0 = +parseFloat(rngX0.value).toFixed(3);
    lblC.textContent = C; lblX0.textContent = x0;

    // Enunciado con KaTeX: ∫ f(x) dx = F(x) + C
    divEnunciado.innerHTML = '$$\\int ' + fm.latexF + '\\,dx = ' + fm.latexI + ' + C$$';
    renderizarMate(divEnunciado);

    var v = fm.vista;
    var curvaF = Mate.puntosCurva(fm.f, v[0], v[1], 400);
    var curvaAnti = Mate.puntosCurva(function (x) { return fm.Fn(x) + C; }, v[0], v[1], 400);

    // ---- Gráfica de f(x) con el punto (x0, f(x0)) ----
    Plotly.react(divF, [
      { x: curvaF.x, y: curvaF.y, type: 'scatter', mode: 'lines', name: 'f(x)',
        line: { color: Grafica.COLORES.curva, width: 3 } },
      Grafica.trazaPuntos([x0], [fm.f(x0)], 'f(x0)')
    ], diseno(v, rangoDe([curvaF.y]), 'f(x)'), Grafica.CONFIG);

    // ---- Gráfica de F(x) + C, familia de antiderivadas y tangente en x0 ----
    var trazas = [];
    var todas = [curvaAnti.y];
    for (var k = -2; k <= 2; k++) {
      if (Math.abs(k - C) < 0.05) { continue; }    // esa ya se dibuja en fuerte
      var otra = Mate.puntosCurva(function (x) { return fm.Fn(x) + k; }, v[0], v[1], 200);
      todas.push(otra.y);
      trazas.push({ x: otra.x, y: otra.y, type: 'scatter', mode: 'lines', hoverinfo: 'skip',
                    line: { color: '#b8c4c0', width: 1.5 } });
    }
    trazas.push({ x: curvaAnti.x, y: curvaAnti.y, type: 'scatter', mode: 'lines', name: 'F(x)+C',
                  line: { color: Grafica.COLORES.exacto, width: 3 } });

    // Recta tangente en x0: y = F(x0) + f(x0) (x - x0)
    var y0 = fm.Fn(x0) + C, pend = fm.f(x0), ancho = (v[1] - v[0]) * 0.12;
    trazas.push({ x: [x0 - ancho, x0 + ancho], y: [y0 - pend * ancho, y0 + pend * ancho],
                  type: 'scatter', mode: 'lines', name: 'Tangente',
                  line: { color: '#14213d', width: 2, dash: 'dash' } });
    trazas.push(Grafica.trazaPuntos([x0], [y0], 'F(x0)+C', '#14213d'));

    // Fijamos el eje vertical con la curva principal y las vecinas (sin la tangente, que podría ser empinada)
    Plotly.react(divAnti, trazas, diseno(v, rangoDe(todas), 'F(x) + C'), Grafica.CONFIG);

    // ---- Verificación por derivación (diferencia central) ----
    var h = 1e-5;
    var derivada = ((fm.Fn(x0 + h) + C) - (fm.Fn(x0 - h) + C)) / (2 * h);
    poner('res-f', Mate.fmt(fm.f(x0)));
    poner('res-F', Mate.fmt(y0));
    poner('res-der', Mate.fmt(derivada));
    poner('res-dif', Mate.fmtError(Math.abs(derivada - fm.f(x0))));
  }

  // Al cambiar de función, reiniciamos x0 al valor sugerido.
  selFormula.addEventListener('change', function () {
    configurarX0(buscar(selFormula.value), buscar(selFormula.value).x0);
    actualizar();
  });
  rngC.addEventListener('input', actualizar);
  rngX0.addEventListener('input', actualizar);

  // Inicio: f(x) = x², C = 0
  selFormula.value = 'x2';
  configurarX0(buscar('x2'), 1);
  actualizar();

  renderEjemplos(window.EJEMPLOS_M6, document.getElementById('ejemplos'));
})();
