/* script.js — Módulo 11: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  var A = [{ id: 'a', texto: 'a', min: 0.5, max: 3, step: 0.1, valor: 1 }];
  var CATALOGO = [
    { id: 'i1', nombre: '1/√(a²−x²)  → arcsen', latexF: function (p) { return '\\frac{1}{\\sqrt{' + n2(p.a * p.a) + '-x^{2}}}'; },
      latexI: function (p) { return '\\operatorname{arcsen}\\frac{x}{' + n2(p.a) + '}'; },
      f: function (x, p) { return 1 / Math.sqrt(p.a * p.a - x * x); }, F: function (x, p) { return Math.asin(x / p.a); },
      vista: function (p) { return [-0.99 * p.a, 0.99 * p.a]; }, a0: 0, b0: 0.5, params: A,
      explicacion: '<p>$\\int\\frac{dx}{\\sqrt{a^2-x^2}}=\\operatorname{arcsen}\\frac{x}{a}+C$, válida para $|x|<a$.</p>' },
    { id: 'i2', nombre: '1/(a²+x²)  → arctan', latexF: function (p) { return '\\frac{1}{' + n2(p.a * p.a) + '+x^{2}}'; },
      latexI: function (p) { return '\\frac{1}{' + n2(p.a) + '}\\arctan\\frac{x}{' + n2(p.a) + '}'; },
      f: function (x, p) { return 1 / (p.a * p.a + x * x); }, F: function (x, p) { return Math.atan(x / p.a) / p.a; },
      vista: [-4, 4], a0: 0, b0: 1, params: A,
      explicacion: '<p>$\\int\\frac{dx}{a^2+x^2}=\\frac1a\\arctan\\frac{x}{a}+C$ (con $u=\\frac{x}{a}$).</p>' },
    { id: 'i3', nombre: '1/(x√(x²−a²))  → arcsec', latexF: function (p) { return '\\frac{1}{x\\sqrt{x^{2}-' + n2(p.a * p.a) + '}}'; },
      latexI: function (p) { return '\\frac{1}{' + n2(p.a) + '}\\operatorname{arcsec}\\frac{x}{' + n2(p.a) + '}'; },
      f: function (x, p) { return 1 / (x * Math.sqrt(x * x - p.a * p.a)); }, F: function (x, p) { return Math.acos(p.a / x) / p.a; },
      vista: function (p) { return [1.05 * p.a, 1.05 * p.a + 4]; }, a0: 1.2, b0: 3, params: A,
      explicacion: '<p>$\\int\\frac{dx}{x\\sqrt{x^2-a^2}}=\\frac1a\\operatorname{arcsec}\\frac{|x|}{a}+C$. Aquí se usa la rama $x>a$, donde $\\operatorname{arcsec}\\frac{x}{a}=\\arccos\\frac{a}{x}$.</p>' },
    { id: 'i4', nombre: '1/√(9−4x²)  (con coeficiente)', latexF: '\\frac{1}{\\sqrt{9-4x^{2}}}', latexI: '\\frac12\\operatorname{arcsen}\\frac{2x}{3}',
      f: function (x) { return 1 / Math.sqrt(9 - 4 * x * x); }, F: function (x) { return Math.asin(2 * x / 3) / 2; },
      vista: [-1.45, 1.45], a0: 0, b0: 1,
      explicacion: '<p>Saca el 9: $\\sqrt{9-4x^2}=3\\sqrt{1-(2x/3)^2}$. Con $u=\\frac{2x}{3}$, $dx=\\frac32\\,du$, queda $\\frac12\\int\\frac{du}{\\sqrt{1-u^2}}$.</p>' }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M11, document.getElementById('ejemplos'));
})();
