/* ==========================================================================
   visor-solidos.js — Visualizador 3D de sólidos (módulos 15, 16 y 17)
   VisorSolidos.iniciar({ modo, inicio }) con modo =
     'secciones' : sólido con secciones transversales conocidas   V = ∫ A(x) dx
     'arandelas' : sólido de revolución, discos y arandelas        V = π ∫ (R² − r²) dx
     'capas'     : sólido de revolución, capas cilíndricas         V = 2π ∫ ρ(x)·(f − g) dx
   La región plana está entre y = g(x) (abajo) y y = f(x) (arriba), para a ≤ x ≤ b.
   ========================================================================== */
(function (global) {
  'use strict';

  var C = { curva: '#1d4ed8', solido: '#0f9d8a', interior: '#7c3aed', tipico: '#c2410c', eje: '#14213d' };
  var n2 = function (v) { return String(+v.toFixed(2)); };
  var cero = function () { return 0; };

  // Regiones disponibles: f arriba, g abajo, [a0, b0] intervalo máximo
  var REGIONES = [
    { texto: 'y = √x, bajo la curva, 0 ≤ x ≤ 4', lf: '\\sqrt{x}', lg: '0', f: Math.sqrt, g: cero, a0: 0, b0: 4 },
    { texto: 'y = x², bajo la curva, 0 ≤ x ≤ 2', lf: 'x^{2}', lg: '0', f: function (x) { return x * x; }, g: cero, a0: 0, b0: 2 },
    { texto: 'entre y = x  y  y = x², 0 ≤ x ≤ 1', lf: 'x', lg: 'x^{2}', f: function (x) { return x; }, g: function (x) { return x * x; }, a0: 0, b0: 1 },
    { texto: 'entre y = √x  y  y = x², 0 ≤ x ≤ 1', lf: '\\sqrt{x}', lg: 'x^{2}', f: Math.sqrt, g: function (x) { return x * x; }, a0: 0, b0: 1 },
    { texto: 'y = sen(x), bajo la curva, 0 ≤ x ≤ π', lf: '\\operatorname{sen}x', lg: '0', f: Math.sin, g: cero, a0: 0, b0: 3.14 },
    { texto: 'y = 4 − x², bajo la curva, −2 ≤ x ≤ 2', lf: '4-x^{2}', lg: '0', f: function (x) { return 4 - x * x; }, g: cero, a0: -2, b0: 2 },
    { texto: 'y = x, bajo la recta, 0 ≤ x ≤ 3 (cono)', lf: 'x', lg: '0', f: function (x) { return x; }, g: cero, a0: 0, b0: 3 }
  ];

  var FORMAS = {
    cuadrado:    { area: function (s) { return s * s; } },
    semicirculo: { area: function (s) { return Math.PI * s * s / 8; } },
    triangulo:   { area: function (s) { return Math.sqrt(3) / 4 * s * s; } },
    rectangulo:  { area: function (s, m) { return m * s * s; } }
  };

  // Polígono de una sección (coordenadas [y, z]) sobre el segmento de y = lo a y = hi
  function poligono(tipo, lo, hi, m) {
    var s = hi - lo, c = (lo + hi) / 2, pts = [], k;
    if (tipo === 'cuadrado') { return [[lo, 0], [hi, 0], [hi, s], [lo, s]]; }
    if (tipo === 'semicirculo') { for (k = 0; k <= 24; k++) { var t = Math.PI * k / 24; pts.push([c - s / 2 * Math.cos(t), s / 2 * Math.sin(t)]); } return pts; }
    if (tipo === 'triangulo') { return [[lo, 0], [hi, 0], [c, Math.sqrt(3) / 2 * s]]; }
    return [[lo, 0], [hi, 0], [hi, m * s], [lo, m * s]];
  }

  // Malla paramétrica para Plotly "surface": fn(u, v) con u, v en [0, 1] devuelve [x, y, z]
  function superficie(fn, color, opacidad) {
    var X = [], Y = [], Z = [], i, j, p;
    for (j = 0; j <= 40; j++) {
      var rx = [], ry = [], rz = [];
      for (i = 0; i <= 50; i++) { p = fn(i / 50, j / 40); rx.push(p[0]); ry.push(p[1]); rz.push(p[2]); }
      X.push(rx); Y.push(ry); Z.push(rz);
    }
    return { type: 'surface', x: X, y: Y, z: Z, showscale: false, opacity: opacidad,
             colorscale: [[0, color], [1, color]], hoverinfo: 'skip', lighting: { ambient: 0.75, diffuse: 0.55 } };
  }

  function iniciar(cfg) {
    var modo = cfg.modo, $ = function (id) { return document.getElementById(id); };
    var selR = $('sel-region'), rngA = $('rng-a'), rngB = $('rng-b'), rngK = $('rng-k'), rngN = $('rng-n'),
        rngAng = $('rng-ang'), rngX0 = $('rng-x0'), selS = $('sel-seccion'), rngM = $('rng-m');

    // Oculta los controles que no corresponden a este módulo
    Array.prototype.forEach.call(document.querySelectorAll('[data-modos]'), function (el) {
      if (el.getAttribute('data-modos').split(' ').indexOf(modo) < 0) { el.style.display = 'none'; }
    });
    REGIONES.forEach(function (r, i) { var o = document.createElement('option'); o.value = i; o.textContent = r.texto; selR.appendChild(o); });

    function cargarRegion() {
      var R = REGIONES[selR.value];
      [rngA, rngB].forEach(function (r) { r.min = R.a0; r.max = R.b0; r.step = 0.05; });
      rngA.value = R.a0; rngB.value = R.b0;
      rngK.value = modo === 'capas' ? R.a0 : 0;      // eje de giro: y = 0, o x = a (borde izquierdo)
      actualizar();
    }

    function actualizar() {
      var R = REGIONES[selR.value], f = R.f, g = R.g;
      var a = +parseFloat(rngA.value).toFixed(3), b = +parseFloat(rngB.value).toFixed(3);
      var n = parseInt(rngN.value, 10), k = parseFloat(rngK.value), ang = parseFloat(rngAng.value) * Math.PI / 180;
      var m = parseFloat(rngM.value), tipo = selS.value;
      $('lbl-a').textContent = a; $('lbl-b').textContent = b; $('lbl-n').textContent = n; $('lbl-k').textContent = k;
      $('lbl-ang').textContent = rngAng.value; $('lbl-m').textContent = m;
      var error = null;
      if (a >= b) { error = 'Debe cumplirse a < b. Mueve los deslizadores.'; }
      rngX0.min = a; rngX0.max = b; rngX0.step = 0.01;
      var x0 = Math.min(Math.max(parseFloat(rngX0.value), a), b); if (isNaN(x0)) { x0 = (a + b) / 2; }
      rngX0.value = x0; $('lbl-x0').textContent = +x0.toFixed(2);

      // Datos según el método: "integrando" y descripción del elemento típico en x0
      var integrando, tex = '', info = [], Rf, rf, rho, lado;
      var minG = Infinity, maxF = -Infinity, ii;
      for (ii = 0; ii <= 200; ii++) { var xs = a + (b - a) * ii / 200; minG = Math.min(minG, g(xs)); maxF = Math.max(maxF, f(xs)); }

      if (modo === 'secciones') {
        var A = function (x) { return FORMAS[tipo].area(f(x) - g(x), m); };
        integrando = A;
        tex = 'V=\\int_{' + n2(a) + '}^{' + n2(b) + '}A(x)\\,dx,\\qquad A(x)=' + {cuadrado: 's^{2}', semicirculo: '\\tfrac{\\pi}{8}s^{2}', triangulo: '\\tfrac{\\sqrt3}{4}s^{2}', rectangulo: n2(m) + 's^{2}'}[tipo] + ',\\ \\ s=f(x)-g(x)';
        info = [['Lado s en x₀', f(x0) - g(x0)], ['Área A(x₀)', A(x0)]];
      } else if (modo === 'arandelas') {
        if (k <= minG + 1e-9) { lado = 'abajo'; Rf = function (x) { return f(x) - k; }; rf = function (x) { return g(x) - k; }; }
        else if (k >= maxF - 1e-9) { lado = 'arriba'; Rf = function (x) { return k - g(x); }; rf = function (x) { return k - f(x); }; }
        else { error = error || 'El eje y = ' + n2(k) + ' atraviesa la región. Colócalo por debajo de g (y ≤ ' + n2(minG) + ') o por encima de f (y ≥ ' + n2(maxF) + ').'; }
        if (!error || lado) {
          integrando = function (x) { return Math.PI * (Rf(x) * Rf(x) - rf(x) * rf(x)); };
          tex = 'V=\\pi\\int_{' + n2(a) + '}^{' + n2(b) + '}\\Big[R(x)^{2}-r(x)^{2}\\Big]dx,\\quad R=' + (lado === 'abajo' ? 'f-(' + n2(k) + ')' : n2(k) + '-g') + ',\\ r=' + (lado === 'abajo' ? 'g-(' + n2(k) + ')' : n2(k) + '-f');
          info = [['Radio exterior R(x₀)', Rf(x0)], ['Radio interior r(x₀)', rf(x0)], ['Área de la arandela', integrando(x0)]];
        }
      } else {
        if (k <= a + 1e-9) { rho = function (x) { return x - k; }; }
        else if (k >= b - 1e-9) { rho = function (x) { return k - x; }; }
        else { error = error || 'El eje x = ' + n2(k) + ' atraviesa la región. Colócalo a la izquierda de a o a la derecha de b.'; }
        if (rho) {
          integrando = function (x) { return 2 * Math.PI * rho(x) * (f(x) - g(x)); };
          tex = 'V=2\\pi\\int_{' + n2(a) + '}^{' + n2(b) + '}\\rho(x)\\,\\big[f(x)-g(x)\\big]dx,\\quad \\rho=|x-(' + n2(k) + ')|';
          info = [['Radio de la capa ρ(x₀)', rho(x0)], ['Altura f(x₀) − g(x₀)', f(x0) - g(x0)], ['Área lateral 2πρh', integrando(x0)]];
        }
      }
      $('error').textContent = error || '';
      $('enunciado-vivo').innerHTML = tex ? '$$' + tex + '$$' : '';
      renderizarMate($('enunciado-vivo'));

      // ---- Gráfica 2D: región, eje y elemento típico ----
      var xs2 = [], fy = [], gy = [], i;
      for (i = 0; i <= 200; i++) { var x = R.a0 + (R.b0 - R.a0) * i / 200; xs2.push(x); fy.push(f(x)); gy.push(g(x)); }
      var px = [], pf = [], pg = [];
      for (i = 0; i <= 100; i++) { var xx = a + (b - a) * i / 100; px.push(xx); pf.push(f(xx)); pg.push(g(xx)); }
      var t2 = [
        { x: px.concat(px.slice().reverse()), y: pf.concat(pg.slice().reverse()), type: 'scatter', mode: 'lines', fill: 'toself', fillcolor: 'rgba(15,157,138,0.3)', line: { width: 0 }, hoverinfo: 'skip' },
        { x: xs2, y: fy, type: 'scatter', mode: 'lines', line: { color: C.curva, width: 3 } },
        { x: xs2, y: gy, type: 'scatter', mode: 'lines', line: { color: C.curva, width: 2, dash: 'dot' } },
        { x: [x0, x0], y: [g(x0), f(x0)], type: 'scatter', mode: 'lines', line: { color: C.tipico, width: 5 } }
      ];
      var ylo = Math.min(0, minG, modo === 'arandelas' ? k : 0), yhi = Math.max(maxF, modo === 'arandelas' ? k : 0), my = (yhi - ylo) * 0.12 || 1;
      var xlo = Math.min(R.a0, modo === 'capas' ? k : R.a0), xhi = Math.max(R.b0, modo === 'capas' ? k : R.b0), mx = (xhi - xlo) * 0.06;
      var formas = [];
      if (modo === 'arandelas') { formas.push({ type: 'line', xref: 'x', yref: 'y', x0: xlo - mx, x1: xhi + mx, y0: k, y1: k, line: { color: C.eje, width: 2, dash: 'dash' } }); }
      if (modo === 'capas') { formas.push({ type: 'line', xref: 'x', yref: 'y', x0: k, x1: k, y0: ylo - my, y1: yhi + my, line: { color: C.eje, width: 2, dash: 'dash' } }); }
      Plotly.react($('grafica2d'), t2, { margin: { l: 45, r: 15, t: 10, b: 40 }, showlegend: false, shapes: formas,
        xaxis: { title: 'x', range: [xlo - mx, xhi + mx], zeroline: true }, yaxis: { title: 'y', range: [ylo - my, yhi + my], zeroline: true },
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(255,255,255,0.7)' }, Grafica.CONFIG);

      if (error || !integrando) { $('resultados').innerHTML = ''; return; }

      // ---- Gráfica 3D: se construye el sólido ----
      var trazas = [], dx = (b - a) / n, xi;
      var xw = function (u) { return a + (b - a) * u; };
      if (modo === 'arandelas') {
        trazas.push(superficie(function (u, v) { var x = xw(u), r = Rf(x), t = ang * v; return [x, r * Math.cos(t), r * Math.sin(t)]; }, C.solido, 0.85));
        var hayInterior = false; for (ii = 0; ii <= 50; ii++) { if (rf(xw(ii / 50)) > 1e-6) { hayInterior = true; } }
        if (hayInterior) { trazas.push(superficie(function (u, v) { var x = xw(u), r = rf(x), t = ang * v; return [x, r * Math.cos(t), r * Math.sin(t)]; }, C.interior, 0.85)); }
        trazas.push(superficie(function (u, v) { var r = rf(x0) + (Rf(x0) - rf(x0)) * u, t = ang * v; return [x0, r * Math.cos(t), r * Math.sin(t)]; }, C.tipico, 1));
        trazas.push({ type: 'scatter3d', mode: 'lines', x: [a, b], y: [0, 0], z: [0, 0], line: { color: C.eje, width: 6 }, hoverinfo: 'skip' });
      } else if (modo === 'capas') {
        var P = function (x, t, z) { return [rho(x) * Math.cos(t), rho(x) * Math.sin(t), z]; };
        trazas.push(superficie(function (u, v) { var x = xw(u); return P(x, ang * v, f(x)); }, C.solido, 0.85));
        trazas.push(superficie(function (u, v) { var x = xw(u); return P(x, ang * v, g(x)); }, C.interior, 0.85));
        [a, b].forEach(function (xp) { if (rho(xp) > 1e-6) { trazas.push(superficie(function (u, v) { return P(xp, ang * v, g(xp) + (f(xp) - g(xp)) * u); }, C.solido, 0.6)); } });
        trazas.push(superficie(function (u, v) { return P(x0, ang * v, g(x0) + (f(x0) - g(x0)) * u); }, C.tipico, 1));
        trazas.push({ type: 'scatter3d', mode: 'lines', x: [0, 0], y: [0, 0], z: [Math.min(0, minG), maxF], line: { color: C.eje, width: 6 }, hoverinfo: 'skip' });
        // El eje de giro está en x = k: se traslada restando ρ, por eso el dibujo usa ρ como radio.
      } else {
        var X = [], Y = [], Z = [], I = [], J = [], K = [], LX = [], LY = [], LZ = [];
        var agregar = function (x, pts) {
          var base = X.length, q;
          pts.forEach(function (p) { X.push(x); Y.push(p[0]); Z.push(p[1]); });
          for (q = 1; q < pts.length - 1; q++) { I.push(base); J.push(base + q); K.push(base + q + 1); }
        };
        for (var s = 0; s < n; s++) {
          var xm = a + (s + 0.5) * dx, pg2 = poligono(tipo, g(xm), f(xm), m);
          agregar(xm, pg2);
          pg2.concat([pg2[0]]).forEach(function (p) { LX.push(xm); LY.push(p[0]); LZ.push(p[1]); });
          LX.push(null); LY.push(null); LZ.push(null);
        }
        trazas.push({ type: 'mesh3d', x: X, y: Y, z: Z, i: I, j: J, k: K, color: C.solido, opacity: 0.45, flatshading: true, hoverinfo: 'skip' });
        trazas.push({ type: 'scatter3d', mode: 'lines', x: LX, y: LY, z: LZ, line: { color: C.solido, width: 2 }, hoverinfo: 'skip' });
        var p0 = poligono(tipo, g(x0), f(x0), m), TX = [], TY = [], TZ = [], TI = [], TJ = [], TK = [];
        p0.forEach(function (p) { TX.push(x0); TY.push(p[0]); TZ.push(p[1]); });
        for (var q2 = 1; q2 < p0.length - 1; q2++) { TI.push(0); TJ.push(q2); TK.push(q2 + 1); }
        trazas.push({ type: 'mesh3d', x: TX, y: TY, z: TZ, i: TI, j: TJ, k: TK, color: C.tipico, opacity: 1, hoverinfo: 'skip' });
        var bx = [], bf = [], bg = [];
        for (i = 0; i <= 80; i++) { var xb = a + (b - a) * i / 80; bx.push(xb); bf.push(f(xb)); bg.push(g(xb)); }
        trazas.push({ type: 'scatter3d', mode: 'lines', x: bx, y: bf, z: bx.map(cero), line: { color: C.curva, width: 5 }, hoverinfo: 'skip' });
        trazas.push({ type: 'scatter3d', mode: 'lines', x: bx, y: bg, z: bx.map(cero), line: { color: C.curva, width: 5 }, hoverinfo: 'skip' });
      }
      Plotly.react($('grafica3d'), trazas, { margin: { l: 0, r: 0, t: 0, b: 0 }, showlegend: false, uirevision: modo,
        scene: { aspectmode: 'data', xaxis: { title: modo === 'capas' ? '' : 'x' }, yaxis: { title: '' }, zaxis: { title: '' } },
        paper_bgcolor: 'rgba(0,0,0,0)' }, Grafica.CONFIG);

      // ---- Resultados ----
      var V = Mate.simpson(integrando, a, b, 2000), suma = 0;
      for (var z = 0; z < n; z++) { suma += integrando(a + (z + 0.5) * dx) * dx; }
      var cajas = info.map(function (c) { return [c[0], Mate.fmt(c[1])]; });
      cajas.push(['Volumen (Simpson, n=2000)', Mate.fmt(V), 1], ['Volumen ÷ π', Mate.fmt(V / Math.PI)],
                 ['Suma de ' + n + (modo === 'secciones' ? ' rebanadas' : (modo === 'arandelas' ? ' arandelas' : ' capas')), Mate.fmt(suma)],
                 ['Diferencia con la suma', Mate.fmtError(Math.abs(V - suma))]);
      $('resultados').innerHTML = cajas.map(function (c) { return '<div' + (c[2] ? ' class="destacado"' : '') + '><dt>' + c[0] + '</dt><dd>' + c[1] + '</dd></div>'; }).join('');
    }

    selR.addEventListener('change', cargarRegion);
    [rngA, rngB, rngK, rngN, rngAng, rngX0, selS, rngM].forEach(function (el) { el.addEventListener('input', actualizar); });
    selR.value = cfg.inicio || 0;
    cargarRegion();
  }

  global.VisorSolidos = { iniciar: iniciar, REGIONES: REGIONES, FORMAS: FORMAS };
})(typeof window !== 'undefined' ? window : globalThis);
