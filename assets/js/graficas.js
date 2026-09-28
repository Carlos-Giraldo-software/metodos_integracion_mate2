/* ==========================================================================
   graficas.js
   Ayudantes para dibujar con Plotly.js. Aquí solo se PREPARAN los datos
   (curvas, rectángulos, trapecios, parábolas); quien llama a Plotly es el
   script de cada módulo.
   ========================================================================== */
(function (global) {
  'use strict';

  var COLORES = {
    curva: '#1d4ed8',                   // azul: la función
    relleno: 'rgba(15,157,138,0.28)',   // verde azulado translúcido: el área aproximada
    borde: '#0b7a6b',
    exacto: '#c2410c',                  // naranja: valor exacto / referencias
    eje: '#14213d'
  };

  // Configuración común: gráfica adaptable a pantalla y sin logo de Plotly.
  var CONFIG = { responsive: true, displaylogo: false };

  // Traza (línea) de la curva f(x) entre a y b.
  function trazaCurva(f, a, b, nombre) {
    var p = Mate.puntosCurva(f, a, b, 300);
    return {
      x: p.x, y: p.y, type: 'scatter', mode: 'lines', name: nombre || 'f(x)',
      line: { color: COLORES.curva, width: 3 }
    };
  }

  // Calcula el rango vertical para que siempre se vea el eje x (y = 0) y quede un margen.
  function rangoY(f, a, b) {
    var p = Mate.puntosCurva(f, a, b, 200);
    var ymin = Math.min(0, Math.min.apply(null, p.y));
    var ymax = Math.max(0, Math.max.apply(null, p.y));
    var margen = (ymax - ymin) * 0.12 || 1;
    return [ymin - margen * (ymin < 0 ? 1 : 0), ymax + margen];
  }

  // Diseño (layout) básico de una gráfica de área.
  function disenoBase(f, a, b, formas) {
    var m = (b - a) * 0.05;
    return {
      margin: { l: 45, r: 15, t: 15, b: 40 },
      xaxis: { range: [a - m, b + m], zeroline: true, zerolinecolor: COLORES.eje, title: 'x' },
      yaxis: { range: rangoY(f, a, b), zeroline: true, zerolinecolor: COLORES.eje, title: 'y' },
      shapes: formas || [],
      showlegend: false,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(255,255,255,0.7)'
    };
  }

  // Rectángulos de una suma de Riemann. tipo: 'izq' | 'der' | 'medio'
  function rectangulos(f, a, b, n, tipo) {
    var dx = (b - a) / n;
    var formas = [];
    for (var i = 0; i < n; i++) {
      var x0 = a + i * dx, x1 = x0 + dx;
      var xEval = tipo === 'izq' ? x0 : (tipo === 'der' ? x1 : (x0 + x1) / 2);
      formas.push({
        type: 'rect', xref: 'x', yref: 'y',
        x0: x0, x1: x1, y0: 0, y1: f(xEval),
        fillcolor: COLORES.relleno,
        line: { color: COLORES.borde, width: n > 60 ? 0.4 : 1.2 }
      });
    }
    return formas;
  }

  // Trapecios (para el módulo 2): cada uno une (xi, f(xi)) con (xi+1, f(xi+1)).
  function trapecios(f, a, b, n) {
    var dx = (b - a) / n;
    var formas = [];
    for (var i = 0; i < n; i++) {
      var x0 = a + i * dx, x1 = x0 + dx;
      var camino = 'M ' + x0 + ',0 L ' + x0 + ',' + f(x0) + ' L ' + x1 + ',' + f(x1) + ' L ' + x1 + ',0 Z';
      formas.push({
        type: 'path', path: camino,
        fillcolor: COLORES.relleno,
        line: { color: COLORES.borde, width: n > 60 ? 0.4 : 1.2 }
      });
    }
    return formas;
  }

  // Parábolas de Simpson (para el módulo 4): una por cada par de subintervalos.
  // Devuelve UNA traza con todas las parábolas (separadas con huecos "null").
  function trazaParabolas(f, a, b, n) {
    var dx = (b - a) / n;
    var xs = [], ys = [];
    for (var i = 0; i < n; i += 2) {
      var x0 = a + i * dx, x1 = x0 + dx, x2 = x1 + dx;
      var y0 = f(x0), y1 = f(x1), y2 = f(x2);
      for (var k = 0; k <= 20; k++) {
        var x = x0 + (x2 - x0) * k / 20;
        // Interpolación de Lagrange con los tres puntos (x0,y0), (x1,y1), (x2,y2)
        var y = y0 * (x - x1) * (x - x2) / ((x0 - x1) * (x0 - x2)) +
                y1 * (x - x0) * (x - x2) / ((x1 - x0) * (x1 - x2)) +
                y2 * (x - x0) * (x - x1) / ((x2 - x0) * (x2 - x1));
        xs.push(x); ys.push(y);
      }
      xs.push(null); ys.push(null);   // corta la línea entre una parábola y la siguiente
    }
    return { x: xs, y: ys, type: 'scatter', mode: 'lines', name: 'Parábolas',
             line: { color: COLORES.exacto, width: 2 } };
  }

  // Diseño para la gráfica "error absoluto vs n" (eje vertical logarítmico).
  // marcaN: valor de n actual, para dibujar una línea vertical punteada.
  function disenoErrores(marcaN) {
    return {
      margin: { l: 60, r: 15, t: 15, b: 45 },
      xaxis: { title: 'Número de subintervalos (n)' },
      yaxis: { title: 'Error absoluto (escala log)', type: 'log', exponentformat: 'e' },
      shapes: [{ type: 'line', xref: 'x', yref: 'paper', x0: marcaN, x1: marcaN, y0: 0, y1: 1,
                 line: { color: COLORES.eje, width: 1, dash: 'dot' } }],
      legend: { orientation: 'h', y: -0.3 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(255,255,255,0.7)'
    };
  }

  // Traza de puntos (marcadores) sobre la curva: sirve para mostrar nodos o puntos medios.
  function trazaPuntos(xs, ys, nombre, color) {
    return { x: xs, y: ys, type: 'scatter', mode: 'markers', name: nombre,
             marker: { color: color || COLORES.exacto, size: 7 } };
  }

  global.Grafica = {
    COLORES: COLORES,
    CONFIG: CONFIG,
    trazaCurva: trazaCurva,
    rangoY: rangoY,
    disenoBase: disenoBase,
    rectangulos: rectangulos,
    trapecios: trapecios,
    trazaParabolas: trazaParabolas,
    disenoErrores: disenoErrores,
    trazaPuntos: trazaPuntos
  };
})(typeof window !== 'undefined' ? window : globalThis);
