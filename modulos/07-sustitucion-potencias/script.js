/* script.js — Módulo 7: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  // Ayudante: calcula los nuevos límites en u y la integral en la variable u (debe dar lo mismo)
  function sust(g, fu) {
    return function (a, b) {
      var ua = g(a), ub = g(b);
      return [{ t: 'Límites en u: g(a) → g(b)', v: n2(ua) + ' → ' + n2(ub) },
              { t: '∫ f(u) du en esos límites', v: Mate.fmt(Mate.simpson(fu, ua, ub, 2000)) }];
    };
  }
  var CATALOGO = [
    { id: 'p1', nombre: '2x(x²+1)³', latexF: '2x(x^{2}+1)^{3}', latexI: '\\frac{(x^{2}+1)^{4}}{4}',
      f: function (x) { return 2 * x * Math.pow(x * x + 1, 3); }, F: function (x) { return Math.pow(x * x + 1, 4) / 4; },
      vista: [0, 1.5], a0: 0, b0: 1,
      explicacion: '<p>Tomamos $u=x^2+1$; entonces $du=2x\\,dx$ y queda $\\int u^3\\,du=\\frac{u^4}{4}$.</p>',
      extra: sust(function (x) { return x * x + 1; }, function (u) { return Math.pow(u, 3); }) },
    { id: 'p2', nombre: 'x·cos(x²)', latexF: 'x\\cos(x^{2})', latexI: '\\frac{\\operatorname{sen}(x^{2})}{2}',
      f: function (x) { return x * Math.cos(x * x); }, F: function (x) { return Math.sin(x * x) / 2; },
      vista: [0, 2], a0: 0, b0: 1,
      explicacion: '<p>Tomamos $u=x^2$; entonces $x\\,dx=\\frac{du}{2}$ y queda $\\frac12\\int\\cos u\\,du$.</p>',
      extra: sust(function (x) { return x * x; }, function (u) { return Math.cos(u) / 2; }) },
    { id: 'p3', nombre: 'cos(x)·sen²(x)', latexF: '\\cos(x)\\operatorname{sen}^{2}(x)', latexI: '\\frac{\\operatorname{sen}^{3}(x)}{3}',
      f: function (x) { return Math.cos(x) * Math.pow(Math.sin(x), 2); }, F: function (x) { return Math.pow(Math.sin(x), 3) / 3; },
      vista: [0, 3.14], a0: 0, b0: 1.57,
      explicacion: '<p>Tomamos $u=\\operatorname{sen}x$; entonces $du=\\cos x\\,dx$ y queda $\\int u^2\\,du=\\frac{u^3}{3}$.</p>',
      extra: sust(function (x) { return Math.sin(x); }, function (u) { return u * u; }) },
    { id: 'p4', nombre: 'x·√(x²+1)', latexF: 'x\\sqrt{x^{2}+1}', latexI: '\\frac{(x^{2}+1)^{3/2}}{3}',
      f: function (x) { return x * Math.sqrt(x * x + 1); }, F: function (x) { return Math.pow(x * x + 1, 1.5) / 3; },
      vista: [0, 2], a0: 0, b0: 1,
      explicacion: '<p>Tomamos $u=x^2+1$; entonces $x\\,dx=\\frac{du}{2}$ y queda $\\frac12\\int u^{1/2}\\,du=\\frac{u^{3/2}}{3}$.</p>',
      extra: sust(function (x) { return x * x + 1; }, function (u) { return Math.sqrt(u) / 2; }) },
    { id: 'p5', nombre: '(3x+1)⁵ (potencia de un binomio)', latexF: '(3x+1)^{5}', latexI: '\\frac{(3x+1)^{6}}{18}',
      f: function (x) { return Math.pow(3 * x + 1, 5); }, F: function (x) { return Math.pow(3 * x + 1, 6) / 18; },
      vista: [-1, 1], a0: 0, b0: 0.5,
      explicacion: '<p>Tomamos $u=3x+1$; entonces $dx=\\frac{du}{3}$ y queda $\\frac13\\int u^5\\,du=\\frac{u^6}{18}$.</p>',
      extra: sust(function (x) { return 3 * x + 1; }, function (u) { return Math.pow(u, 5) / 3; }) }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M7, document.getElementById('ejemplos'));
})();
