/* script.js — Módulo 10: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  var K = [{ id: 'k', texto: 'k', min: 0.5, max: 4, step: 0.5, valor: 1 }];
  var CATALOGO = [
    { id: 't1', nombre: 'sen(kx)', latexF: function (p) { return '\\operatorname{sen}(' + n2(p.k) + 'x)'; },
      latexI: function (p) { return '-\\frac{\\cos(' + n2(p.k) + 'x)}{' + n2(p.k) + '}'; },
      f: function (x, p) { return Math.sin(p.k * x); }, F: function (x, p) { return -Math.cos(p.k * x) / p.k; },
      vista: [0, 6.28], a0: 0, b0: 3.14, params: K,
      explicacion: '<p>$\\int\\operatorname{sen}(kx)\\,dx=-\\frac{\\cos(kx)}{k}+C$ (sustitución $u=kx$).</p>' },
    { id: 't2', nombre: 'cos(kx)', latexF: function (p) { return '\\cos(' + n2(p.k) + 'x)'; },
      latexI: function (p) { return '\\frac{\\operatorname{sen}(' + n2(p.k) + 'x)}{' + n2(p.k) + '}'; },
      f: function (x, p) { return Math.cos(p.k * x); }, F: function (x, p) { return Math.sin(p.k * x) / p.k; },
      vista: [0, 6.28], a0: 0, b0: 1.57, params: K,
      explicacion: '<p>$\\int\\cos(kx)\\,dx=\\frac{\\operatorname{sen}(kx)}{k}+C$.</p>' },
    { id: 't3', nombre: 'sen²(x)', latexF: '\\operatorname{sen}^{2}x', latexI: '\\frac{x}{2}-\\frac{\\operatorname{sen}2x}{4}',
      f: function (x) { return Math.pow(Math.sin(x), 2); }, F: function (x) { return x / 2 - Math.sin(2 * x) / 4; },
      vista: [0, 6.28], a0: 0, b0: 3.14,
      explicacion: '<p>Identidad: $\\operatorname{sen}^2x=\\frac{1-\\cos2x}{2}$. Luego se integra término a término.</p>' },
    { id: 't4', nombre: 'cos²(x)', latexF: '\\cos^{2}x', latexI: '\\frac{x}{2}+\\frac{\\operatorname{sen}2x}{4}',
      f: function (x) { return Math.pow(Math.cos(x), 2); }, F: function (x) { return x / 2 + Math.sin(2 * x) / 4; },
      vista: [0, 6.28], a0: 0, b0: 3.14,
      explicacion: '<p>Identidad: $\\cos^2x=\\frac{1+\\cos2x}{2}$.</p>' },
    { id: 't5', nombre: 'sen(x)cos(x)', latexF: '\\operatorname{sen}x\\cos x', latexI: '\\frac{\\operatorname{sen}^{2}x}{2}',
      f: function (x) { return Math.sin(x) * Math.cos(x); }, F: function (x) { return Math.pow(Math.sin(x), 2) / 2; },
      vista: [0, 6.28], a0: 0, b0: 1.57,
      explicacion: '<p>Con $u=\\operatorname{sen}x$, $du=\\cos x\\,dx$: $\\int u\\,du=\\frac{u^2}{2}$.</p>' },
    { id: 't6', nombre: 'sen³(x)', latexF: '\\operatorname{sen}^{3}x', latexI: '-\\cos x+\\frac{\\cos^{3}x}{3}',
      f: function (x) { return Math.pow(Math.sin(x), 3); }, F: function (x) { return -Math.cos(x) + Math.pow(Math.cos(x), 3) / 3; },
      vista: [0, 6.28], a0: 0, b0: 3.14,
      explicacion: '<p>Separa $\\operatorname{sen}^3x=\\operatorname{sen}x\\,(1-\\cos^2x)$ y usa $u=\\cos x$, $du=-\\operatorname{sen}x\\,dx$.</p>' },
    { id: 't7', nombre: 'sec²(x)', latexF: '\\sec^{2}x', latexI: '\\tan x',
      f: function (x) { var c = Math.cos(x); return 1 / (c * c); }, F: function (x) { return Math.tan(x); },
      vista: [-1.4, 1.4], a0: 0, b0: 1,
      explicacion: '<p>$\\frac{d}{dx}\\tan x=\\sec^2x$, así que $\\int\\sec^2x\\,dx=\\tan x+C$.</p>' },
    { id: 't8', nombre: 'sec(x)tan(x)', latexF: '\\sec x\\tan x', latexI: '\\sec x',
      f: function (x) { return Math.sin(x) / (Math.cos(x) * Math.cos(x)); }, F: function (x) { return 1 / Math.cos(x); },
      vista: [-1.3, 1.3], a0: 0, b0: 1,
      explicacion: '<p>$\\frac{d}{dx}\\sec x=\\sec x\\tan x$, así que $\\int\\sec x\\tan x\\,dx=\\sec x+C$.</p>' }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M10, document.getElementById('ejemplos'));
})();
