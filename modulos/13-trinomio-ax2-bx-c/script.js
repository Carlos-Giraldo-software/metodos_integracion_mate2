/* script.js — Módulo 13: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  var sg = function (v) { return (v < 0 ? '-' : '+') + n2(Math.abs(v)); };            // número con signo
  var poly = function (p) { return n2(p.a) + 'x^{2}' + sg(p.b) + 'x' + sg(p.c); };    // ax²+bx+c como texto
  var disc = function (p) { return p.b * p.b - 4 * p.a * p.c; };                         // discriminante
  var PA = [{ id: 'a', texto: 'a', min: 0.5, max: 3, step: 0.5, valor: 1 }, { id: 'b', texto: 'b', min: -4, max: 4, step: 0.5, valor: 0 },
            { id: 'c', texto: 'c', min: -4, max: 6, step: 0.5, valor: 1 }];
  var PB = [{ id: 'b', texto: 'b', min: -4, max: 4, step: 0.5, valor: 0 }, { id: 'c', texto: 'c', min: -4, max: 6, step: 0.5, valor: 1 }];
  var PC = [{ id: 'b', texto: 'b', min: -4, max: 4, step: 0.5, valor: 0 }, { id: 'c', texto: 'c', min: 0.5, max: 6, step: 0.5, valor: 1 }];
  var raizS = function (p) { return Math.sqrt(p.b * p.b + 4 * p.c); };
  var CATALOGO = [
    { id: 'q1', nombre: '1/(ax²+bx+c)  (según el discriminante)', latexF: function (p) { return '\\frac{1}{' + poly(p) + '}'; },
      latexI: function (p) {
        var D = disc(p), t = n2(2 * p.a) + 'x' + sg(p.b);
        if (D < -1e-9) { return '\\frac{2}{\\sqrt{' + n2(-D) + '}}\\arctan\\frac{' + t + '}{\\sqrt{' + n2(-D) + '}}'; }
        if (D > 1e-9) { return '\\frac{1}{\\sqrt{' + n2(D) + '}}\\ln\\left|\\frac{' + t + '-\\sqrt{' + n2(D) + '}}{' + t + '+\\sqrt{' + n2(D) + '}}\\right|'; }
        return '-\\frac{2}{' + t + '}'; },
      f: function (x, p) { return 1 / (p.a * x * x + p.b * x + p.c); },
      F: function (x, p) {
        var D = disc(p), t = 2 * p.a * x + p.b;
        if (D < -1e-9) { var s = Math.sqrt(-D); return 2 / s * Math.atan(t / s); }
        if (D > 1e-9) { var r = Math.sqrt(D); return Math.log(Math.abs((t - r) / (t + r))) / r; }
        return -2 / t; },
      vista: [-5, 5], a0: -1, b0: 1, params: PA,
      validar: function (lo, hi, p) {
        var D = disc(p); if (D < -1e-9) { return null; }
        var r = Math.sqrt(Math.max(D, 0)), r1 = (-p.b - r) / (2 * p.a), r2 = (-p.b + r) / (2 * p.a);
        var dentro = function (z) { return z >= lo && z <= hi; };
        return (dentro(r1) || dentro(r2)) ? 'El denominador se anula dentro de [a, b] (raíz en x = ' + n2(dentro(r1) ? r1 : r2) + '): la integral diverge.' : null; },
      explicacion: function (p) {
        var D = disc(p), caso = D < -1e-9 ? 'Como $\\Delta<0$ no hay raíces reales: queda $\\frac{1}{u^2+k^2}$ y el resultado es un <strong>arcotangente</strong>.'
          : (D > 1e-9 ? 'Como $\\Delta>0$ hay dos raíces reales: queda $\\frac{1}{u^2-k^2}$ y el resultado es un <strong>logaritmo</strong>.'
          : 'Como $\\Delta=0$ el trinomio es un cuadrado perfecto: queda $\\frac{1}{u^2}$ y el resultado es <strong>racional</strong>.');
        return '<p>Se completa el cuadrado: $ax^2+bx+c=a\\Big[\\big(x+\\tfrac{b}{2a}\\big)^2+\\tfrac{4ac-b^2}{4a^2}\\Big]$. Aquí $\\Delta=b^2-4ac=' + n2(D) + '$. ' + caso + '</p>'; } },
    { id: 'q2', nombre: '1/√(x²+bx+c)', latexF: function (p) { return '\\frac{1}{\\sqrt{x^{2}' + sg(p.b) + 'x' + sg(p.c) + '}}'; },
      latexI: function (p) { return '\\ln\\left|2x' + sg(p.b) + '+2\\sqrt{x^{2}' + sg(p.b) + 'x' + sg(p.c) + '}\\right|'; },
      f: function (x, p) { return 1 / Math.sqrt(x * x + p.b * x + p.c); },
      F: function (x, p) { return Math.log(Math.abs(2 * x + p.b + 2 * Math.sqrt(x * x + p.b * x + p.c))); },
      vista: [-5, 5], a0: -1, b0: 1, params: PB,
      validar: function (lo, hi, p) {
        for (var k = 0; k <= 200; k++) { var x = lo + (hi - lo) * k / 200; if (x * x + p.b * x + p.c <= 1e-6) { return 'x² + bx + c debe ser positivo en todo [a, b]. Cambia b, c o los límites.'; } }
        return null; },
      explicacion: '<p>Completa el cuadrado: $x^2+bx+c=\\big(x+\\frac b2\\big)^2+k$. Con $u=x+\\frac b2$ se obtiene $\\int\\frac{du}{\\sqrt{u^2+k}}=\\ln\\big|u+\\sqrt{u^2+k}\\big|$ (módulo 12).</p>' },
    { id: 'q3', nombre: '1/√(c+bx−x²)', latexF: function (p) { return '\\frac{1}{\\sqrt{' + n2(p.c) + sg(p.b) + 'x-x^{2}}}'; },
      latexI: function (p) { return '\\operatorname{arcsen}\\frac{2x' + sg(-p.b) + '}{' + n2(raizS(p)) + '}'; },
      f: function (x, p) { return 1 / Math.sqrt(p.c + p.b * x - x * x); },
      F: function (x, p) { return Math.asin((2 * x - p.b) / raizS(p)); },
      vista: function (p) { var s = raizS(p); return [(p.b - s) / 2 + 0.02, (p.b + s) / 2 - 0.02]; }, a0: -0.5, b0: 0.5, params: PC,
      explicacion: '<p>Completa el cuadrado: $c+bx-x^2=s^2-(x-\\tfrac b2)^2$ con $s^2=c+\\tfrac{b^2}{4}$. Con $u=x-\\frac b2$ queda $\\int\\frac{du}{\\sqrt{s^2-u^2}}=\\operatorname{arcsen}\\frac{u}{s}$ (módulo 11). Se dibuja solo entre las raíces del trinomio.</p>' }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M13, document.getElementById('ejemplos'));
})();
