/* script.js — Módulo 8: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  var CATALOGO = [
    { id: 'e1', nombre: 'A·e^(kx)', latexF: function (p) { return n2(p.A) + 'e^{' + n2(p.k) + 'x}'; },
      latexI: function (p) { return '\\frac{' + n2(p.A) + '}{' + n2(p.k) + '}e^{' + n2(p.k) + 'x}'; },
      f: function (x, p) { return p.A * Math.exp(p.k * x); }, F: function (x, p) { return p.A / p.k * Math.exp(p.k * x); },
      vista: [-3, 3], a0: 0, b0: 1,
      params: [{ id: 'A', texto: 'A', min: -3, max: 3, step: 0.1, valor: 1 }, { id: 'k', texto: 'k', min: -3, max: 3, step: 0.1, valor: 1 }],
      validar: function (a, b, p) { return Math.abs(p.k) < 0.05 ? 'k no puede ser 0: la fórmula divide entre k.' : null; },
      explicacion: '<p>$\\int e^{kx}\\,dx=\\frac{e^{kx}}{k}+C$, con $k\\ne0$ (sustitución $u=kx$).</p>' },
    { id: 'e2', nombre: 'a^(kx)', latexF: function (p) { return n2(p.a) + '^{' + n2(p.k) + 'x}'; },
      latexI: function (p) { return '\\frac{' + n2(p.a) + '^{' + n2(p.k) + 'x}}{' + n2(p.k) + '\\ln ' + n2(p.a) + '}'; },
      f: function (x, p) { return Math.pow(p.a, p.k * x); }, F: function (x, p) { return Math.pow(p.a, p.k * x) / (p.k * Math.log(p.a)); },
      vista: [-3, 3], a0: 0, b0: 2,
      params: [{ id: 'a', texto: 'base a', min: 0.2, max: 5, step: 0.1, valor: 2 }, { id: 'k', texto: 'k', min: -3, max: 3, step: 0.1, valor: 1 }],
      validar: function (a, b, p) {
        if (Math.abs(p.a - 1) < 0.05) { return 'La base a no puede ser 1 (ln 1 = 0).'; }
        return Math.abs(p.k) < 0.05 ? 'k no puede ser 0.' : null; },
      explicacion: '<p>$\\int a^{x}\\,dx=\\frac{a^{x}}{\\ln a}+C$ con $a>0,\\ a\\ne1$. Con $kx$ en el exponente se divide además entre $k$.</p>' },
    { id: 'e3', nombre: 'eˣ + e⁻ˣ', latexF: 'e^{x}+e^{-x}', latexI: 'e^{x}-e^{-x}',
      f: function (x) { return Math.exp(x) + Math.exp(-x); }, F: function (x) { return Math.exp(x) - Math.exp(-x); },
      vista: [-3, 3], a0: -1, b0: 1,
      explicacion: '<p>Se integra término a término: $\\int e^{x}dx=e^{x}$ y $\\int e^{-x}dx=-e^{-x}$.</p>' }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M8, document.getElementById('ejemplos'));
})();
