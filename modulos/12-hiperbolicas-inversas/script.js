/* script.js — Módulo 12: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  var A = [{ id: 'a', texto: 'a', min: 0.5, max: 3, step: 0.1, valor: 1 }];
  var CATALOGO = [
    { id: 'h1', nombre: '1/√(x²+a²)  → arcsenh', latexF: function (p) { return '\\frac{1}{\\sqrt{x^{2}+' + n2(p.a * p.a) + '}}'; },
      latexI: function (p) { return '\\operatorname{arcsenh}\\frac{x}{' + n2(p.a) + '}'; },
      f: function (x, p) { return 1 / Math.sqrt(x * x + p.a * p.a); }, F: function (x, p) { return Math.asinh(x / p.a); },
      vista: [-4, 4], a0: 0, b0: 2, params: A,
      explicacion: '<p>$\\int\\frac{dx}{\\sqrt{x^2+a^2}}=\\operatorname{arcsenh}\\frac{x}{a}+C=\\ln\\!\\big(x+\\sqrt{x^2+a^2}\\big)+C^\\ast$ (las constantes difieren).</p>' },
    { id: 'h2', nombre: '1/√(x²−a²)  → arccosh', latexF: function (p) { return '\\frac{1}{\\sqrt{x^{2}-' + n2(p.a * p.a) + '}}'; },
      latexI: function (p) { return '\\operatorname{arccosh}\\frac{x}{' + n2(p.a) + '}'; },
      f: function (x, p) { return 1 / Math.sqrt(x * x - p.a * p.a); }, F: function (x, p) { return Math.acosh(x / p.a); },
      vista: function (p) { return [1.02 * p.a, 1.02 * p.a + 5]; }, a0: 1.5, b0: 4, params: A,
      explicacion: '<p>$\\int\\frac{dx}{\\sqrt{x^2-a^2}}=\\operatorname{arccosh}\\frac{x}{a}+C=\\ln\\!\\big(x+\\sqrt{x^2-a^2}\\big)+C^\\ast$, con $x>a$.</p>' },
    { id: 'h3', nombre: '1/(a²−x²), |x|<a  → arctanh', latexF: function (p) { return '\\frac{1}{' + n2(p.a * p.a) + '-x^{2}}'; },
      latexI: function (p) { return '\\frac{1}{' + n2(p.a) + '}\\operatorname{arctanh}\\frac{x}{' + n2(p.a) + '}'; },
      f: function (x, p) { return 1 / (p.a * p.a - x * x); }, F: function (x, p) { return Math.atanh(x / p.a) / p.a; },
      vista: function (p) { return [-0.98 * p.a, 0.98 * p.a]; }, a0: 0, b0: 0.5, params: A,
      explicacion: '<p>$\\int\\frac{dx}{a^2-x^2}=\\frac1a\\operatorname{arctanh}\\frac{x}{a}+C=\\frac{1}{2a}\\ln\\left|\\frac{a+x}{a-x}\\right|+C^\\ast$, para $|x|<a$.</p>' },
    { id: 'h4', nombre: '1/(x²−a²), x>a  → forma logarítmica', latexF: function (p) { return '\\frac{1}{x^{2}-' + n2(p.a * p.a) + '}'; },
      latexI: function (p) { return '\\frac{1}{' + n2(2 * p.a) + '}\\ln\\frac{x-' + n2(p.a) + '}{x+' + n2(p.a) + '}'; },
      f: function (x, p) { return 1 / (x * x - p.a * p.a); }, F: function (x, p) { return Math.log((x - p.a) / (x + p.a)) / (2 * p.a); },
      vista: function (p) { return [1.05 * p.a, 1.05 * p.a + 5]; }, a0: 1.5, b0: 4, params: A,
      explicacion: '<p>Para $|x|>a$: $\\int\\frac{dx}{x^2-a^2}=\\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right|+C$ (es $-\\frac1a\\operatorname{arccoth}\\frac{x}{a}$). Se obtiene con fracciones parciales.</p>' }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M12, document.getElementById('ejemplos'));
})();
