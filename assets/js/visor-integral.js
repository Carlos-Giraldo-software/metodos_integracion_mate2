/* ==========================================================================
   visor-integral.js — Visualizador reutilizable para los módulos 7 en adelante
   Recibe un "catálogo" de integrales. Cada entrada del catálogo describe:
     id, nombre        : identificador y texto para la lista desplegable
     latexF, latexI    : f(x) y su antiderivada en LaTeX (texto, o función de p)
     f(x, p), F(x, p)  : la función y una antiderivada (p = parámetros elegidos)
     vista             : [xmin, xmax] (o función de p) donde se dibuja y se mueven a y b
     a0, b0            : límites sugeridos
     params            : (opcional) deslizadores: [{id, texto, min, max, step, valor}]
     validar(a, b, p)  : (opcional) devuelve un texto de error o null
     explicacion(p)    : (opcional) HTML con el método paso a paso
     extra(a, b, p)    : (opcional) casillas de resultados adicionales [{t, v}]
   La página debe tener los ids: sel-func, params, rng-a, rng-b, lbl-a, lbl-b, error,
   enunciado-vivo, explicacion, grafica, grafica-F, resultados.
   ========================================================================== */
(function (global) {
  'use strict';

  function iniciar(catalogo) {
    var $ = function (id) { return document.getElementById(id); };
    var sel = $('sel-func'), contParams = $('params');
    var rngA = $('rng-a'), rngB = $('rng-b');
    var actual = null, p = {};

    // Un campo puede ser un texto o una función de los parámetros.
    function dar(campo) { return typeof campo === 'function' ? campo(p) : campo; }
    function fmt(v) { return typeof v === 'number' ? Mate.fmt(Math.abs(v) < 1e-9 ? 0 : v) : v; }

    catalogo.forEach(function (e, i) {
      var op = document.createElement('option');
      op.value = i; op.textContent = e.nombre; sel.appendChild(op);
    });

    // Ajusta los deslizadores a la ventana válida y recorta a y b si hace falta.
    function configurar(reiniciar) {
      var v = dar(actual.vista);
      [rngA, rngB].forEach(function (r) { r.min = v[0]; r.max = v[1]; r.step = 0.01; });
      var a = reiniciar ? actual.a0 : parseFloat(rngA.value);
      var b = reiniciar ? actual.b0 : parseFloat(rngB.value);
      a = Math.min(Math.max(a, v[0]), v[1]); b = Math.min(Math.max(b, v[0]), v[1]);
      if (b - a < 0.1) { a = v[0]; b = v[1]; }
      rngA.value = a; rngB.value = b;
    }

    function cargar(i, reiniciar) {
      actual = catalogo[i]; p = {}; contParams.innerHTML = '';
      (actual.params || []).forEach(function (pr) {
        p[pr.id] = pr.valor;
        var lab = document.createElement('label');
        lab.innerHTML = pr.texto + ' = <span id="v-' + pr.id + '">' + pr.valor + '</span>' +
          '<input type="range" min="' + pr.min + '" max="' + pr.max + '" step="' + pr.step + '" value="' + pr.valor + '">';
        lab.querySelector('input').addEventListener('input', function (ev) {
          p[pr.id] = parseFloat(ev.target.value);
          $('v-' + pr.id).textContent = +p[pr.id].toFixed(2);
          configurar(false); actualizar();
        });
        contParams.appendChild(lab);
      });
      configurar(true); actualizar();
    }

    var f = function (x) { return actual.f(x, p); };
    var F = function (x) { return actual.F(x, p); };

    function actualizar() {
      var a = +parseFloat(rngA.value).toFixed(3), b = +parseFloat(rngB.value).toFixed(3);
      $('lbl-a').textContent = a; $('lbl-b').textContent = b;
      var v = dar(actual.vista);

      // Enunciado y explicación (KaTeX)
      $('enunciado-vivo').innerHTML = '$$\\int ' + dar(actual.latexF) + '\\,dx = ' + dar(actual.latexI) + ' + C$$';
      $('explicacion').innerHTML = actual.explicacion ? dar(actual.explicacion) : '';
      renderizarMate($('enunciado-vivo')); renderizarMate($('explicacion'));

      // Validaciones
      var problema = null;
      if (a >= b) { problema = 'Debe cumplirse a < b. Mueve los deslizadores.'; }
      else if (actual.validar) { problema = actual.validar(a, b, p); }
      if (!problema) {
        for (var k = 0; k <= 400; k++) { if (!isFinite(f(a + (b - a) * k / 400))) { problema = 'La función no está definida en todo [a, b].'; break; } }
      }
      $('error').textContent = problema || '';

      // Curva f (los valores no finitos se dejan como huecos)
      var xs = [], ys = [];
      for (var i = 0; i <= 500; i++) { var x = v[0] + (v[1] - v[0]) * i / 500; var y = f(x); xs.push(x); ys.push(isFinite(y) ? y : null); }
      var trazas = [{ x: xs, y: ys, type: 'scatter', mode: 'lines', connectgaps: false, line: { color: Grafica.COLORES.curva, width: 3 } }];
      var yr = [0, 0];
      if (!problema) {
        var pa = Mate.puntosCurva(f, a, b, 200);
        trazas.unshift({ x: pa.x.concat([b, a]), y: pa.y.concat([0, 0]), type: 'scatter', mode: 'lines', fill: 'toself',
                         fillcolor: Grafica.COLORES.relleno, line: { width: 0 }, hoverinfo: 'skip' });
        yr = [Math.min.apply(null, pa.y.concat(0)), Math.max.apply(null, pa.y.concat(0))];
      } else {
        yr = [Math.min.apply(null, ys.filter(isFinite).concat(0)), Math.max.apply(null, ys.filter(isFinite).concat(0))];
        yr = [Math.max(yr[0], -10), Math.min(yr[1], 10)];
      }
      var m = (yr[1] - yr[0]) * 0.12 || 1;
      var base = function (rango, tit) {
        return { margin: { l: 50, r: 15, t: 15, b: 40 }, showlegend: false, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(255,255,255,0.7)',
                 xaxis: { range: v, title: 'x', zeroline: true, zerolinecolor: Grafica.COLORES.eje },
                 yaxis: { range: rango, title: tit, zeroline: true, zerolinecolor: Grafica.COLORES.eje } };
      };
      Plotly.react($('grafica'), trazas, base([yr[0] - m, yr[1] + m], 'f(x)'), Grafica.CONFIG);

      if (problema) { $('resultados').innerHTML = ''; return; }

      // Antiderivada F(x) con los puntos F(a) y F(b)
      var pF = Mate.puntosCurva(F, v[0], v[1], 500).y.map(function (y) { return isFinite(y) ? y : null; });
      var Fs = pF.filter(function (y) { return y !== null; });
      var rF = [Math.min.apply(null, Fs), Math.max.apply(null, Fs)], mF = (rF[1] - rF[0]) * 0.12 || 1;
      Plotly.react($('grafica-F'), [
        { x: xs, y: pF, type: 'scatter', mode: 'lines', connectgaps: false, line: { color: Grafica.COLORES.exacto, width: 3 } },
        Grafica.trazaPuntos([a, b], [F(a), F(b)], 'F(a), F(b)', '#14213d')
      ], base([rF[0] - mF, rF[1] + mF], 'F(x)'), Grafica.CONFIG);

      // Resultados
      var exacta = F(b) - F(a), num = Mate.simpson(f, a, b, 2000);
      var cajas = [['F(a)', fmt(F(a))], ['F(b)', fmt(F(b))], ['Integral F(b) − F(a)', fmt(exacta), 1],
                   ['Simpson (n=2000)', fmt(num)], ['Diferencia', Mate.fmtError(Math.abs(exacta - num))]];
      (actual.extra ? actual.extra(a, b, p) : []).forEach(function (c) { cajas.push([c.t, c.v]); });
      $('resultados').innerHTML = cajas.map(function (c) {
        return '<div' + (c[2] ? ' class="destacado"' : '') + '><dt>' + c[0] + '</dt><dd>' + c[1] + '</dd></div>';
      }).join('');
    }

    sel.addEventListener('change', function () { cargar(parseInt(sel.value, 10), true); });
    rngA.addEventListener('input', actualizar); rngB.addEventListener('input', actualizar);
    cargar(0, true);
  }

  global.VisorIntegral = { iniciar: iniciar, fmt: function (v) { return Mate.fmt(v); } };
})(window);
