/* script.js — Módulo 9: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  var CATALOGO = [
    { id: 'l1', nombre: 'A/(px+q)', latexF: function (p) { return '\\frac{' + n2(p.A) + '}{' + n2(p.p) + 'x+' + n2(p.q) + '}'; },
      latexI: function (p) { return '\\frac{' + n2(p.A) + '}{' + n2(p.p) + '}\\ln|' + n2(p.p) + 'x+' + n2(p.q) + '|'; },
      f: function (x, p) { return p.A / (p.p * x + p.q); }, F: function (x, p) { return p.A / p.p * Math.log(Math.abs(p.p * x + p.q)); },
      vista: [-4, 4], a0: 1, b0: 3,
      params: [{ id: 'A', texto: 'A', min: -3, max: 3, step: 0.1, valor: 1 }, { id: 'p', texto: 'p', min: -3, max: 3, step: 0.1, valor: 1 },
               { id: 'q', texto: 'q', min: -3, max: 3, step: 0.1, valor: 0 }],
      validar: function (a, b, p) {
        if (Math.abs(p.p) < 0.05) { return 'p no puede ser 0.'; }
        var x0 = -p.q / p.p;
        return (x0 >= a && x0 <= b) ? 'La asíntota x = ' + n2(x0) + ' está dentro de [a, b]: la integral diverge. Mueve los límites.' : null; },
      explicacion: '<p>$\\int\\frac{1}{px+q}\\,dx=\\frac1p\\ln|px+q|+C$ (con $u=px+q$). Si el denominador se anula dentro de $[a,b]$, la integral no existe.</p>' },
    { id: 'l2', nombre: '2x/(x²+c)  (forma f′/f)', latexF: function (p) { return '\\frac{2x}{x^{2}+' + n2(p.c) + '}'; },
      latexI: function (p) { return '\\ln(x^{2}+' + n2(p.c) + ')'; },
      f: function (x, p) { return 2 * x / (x * x + p.c); }, F: function (x, p) { return Math.log(x * x + p.c); },
      vista: [-3, 3], a0: 0, b0: 2,
      params: [{ id: 'c', texto: 'c', min: 0.2, max: 5, step: 0.1, valor: 1 }],
      explicacion: '<p>El numerador es la derivada del denominador: $\\int\\frac{f\'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$. Aquí $f=x^2+c>0$.</p>' },
    { id: 'l3', nombre: 'tan(x)', latexF: '\\tan x', latexI: '-\\ln|\\cos x|',
      f: function (x) { return Math.tan(x); }, F: function (x) { return -Math.log(Math.abs(Math.cos(x))); },
      vista: [-1.4, 1.4], a0: 0, b0: 1,
      explicacion: '<p>$\\tan x=\\frac{\\operatorname{sen}x}{\\cos x}$. Con $u=\\cos x$, $du=-\\operatorname{sen}x\\,dx$, queda $-\\int\\frac{du}{u}=-\\ln|\\cos x|$.</p>' },
    { id: 'l4', nombre: 'ln(x)', latexF: '\\ln x', latexI: 'x\\ln x-x',
      f: function (x) { return Math.log(x); }, F: function (x) { return x * Math.log(x) - x; },
      vista: [0.05, 6], a0: 1, b0: 3,
      explicacion: '<p>$\\int\\ln x\\,dx=x\\ln x-x+C$ (se obtiene por partes con $u=\\ln x$, $dv=dx$; lo verás en el módulo 14). Solo para $x>0$.</p>' }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M9, document.getElementById('ejemplos'));
})();
