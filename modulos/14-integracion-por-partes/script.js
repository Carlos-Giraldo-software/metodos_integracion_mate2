/* script.js — Módulo 14: catálogo de integrales para el visualizador (ver visor-integral.js) */
(function () {
  'use strict';
  var n2 = function (v) { return String(+v.toFixed(2)); };   // número corto para las fórmulas

  // Ayudante: casillas "u·v | − ∫ v du" (deben dar el mismo valor que la integral exacta)
  function partes(u, up, v) {
    return function (a, b) {
      var uv = u(b) * v(b) - u(a) * v(a);
      var vdu = Mate.simpson(function (x) { return v(x) * up(x); }, a, b, 2000);
      return [{ t: 'u·v evaluado en [a, b]', v: Mate.fmt(uv) }, { t: '∫ v du (Simpson)', v: Mate.fmt(vdu) },
              { t: 'u·v − ∫ v du', v: Mate.fmt(uv - vdu) }];
    };
  }
  var CATALOGO = [
    { id: 'p1', nombre: 'x·eˣ', latexF: 'x\\,e^{x}', latexI: '(x-1)e^{x}',
      f: function (x) { return x * Math.exp(x); }, F: function (x) { return (x - 1) * Math.exp(x); }, vista: [-2, 3], a0: 0, b0: 1,
      explicacion: '<p>$u=x,\\ dv=e^x\\,dx\\ \\Rightarrow\\ du=dx,\\ v=e^x$. Entonces $\\int xe^x\\,dx=xe^x-\\int e^x\\,dx$.</p>',
      extra: partes(function (x) { return x; }, function () { return 1; }, function (x) { return Math.exp(x); }) },
    { id: 'p2', nombre: 'x·sen(x)', latexF: 'x\\operatorname{sen}x', latexI: '\\operatorname{sen}x-x\\cos x',
      f: function (x) { return x * Math.sin(x); }, F: function (x) { return Math.sin(x) - x * Math.cos(x); }, vista: [0, 6.28], a0: 0, b0: 3.14,
      explicacion: '<p>$u=x,\\ dv=\\operatorname{sen}x\\,dx\\ \\Rightarrow\\ du=dx,\\ v=-\\cos x$. Entonces $\\int x\\operatorname{sen}x\\,dx=-x\\cos x+\\int\\cos x\\,dx$.</p>',
      extra: partes(function (x) { return x; }, function () { return 1; }, function (x) { return -Math.cos(x); }) },
    { id: 'p3', nombre: 'x·cos(x)', latexF: 'x\\cos x', latexI: '\\cos x+x\\operatorname{sen}x',
      f: function (x) { return x * Math.cos(x); }, F: function (x) { return Math.cos(x) + x * Math.sin(x); }, vista: [0, 6.28], a0: 0, b0: 1.57,
      explicacion: '<p>$u=x,\\ dv=\\cos x\\,dx\\ \\Rightarrow\\ du=dx,\\ v=\\operatorname{sen}x$. Entonces $\\int x\\cos x\\,dx=x\\operatorname{sen}x-\\int\\operatorname{sen}x\\,dx$.</p>',
      extra: partes(function (x) { return x; }, function () { return 1; }, function (x) { return Math.sin(x); }) },
    { id: 'p4', nombre: 'ln(x)', latexF: '\\ln x', latexI: 'x\\ln x-x',
      f: function (x) { return Math.log(x); }, F: function (x) { return x * Math.log(x) - x; }, vista: [0.05, 6], a0: 1, b0: 3,
      explicacion: '<p>$u=\\ln x,\\ dv=dx\\ \\Rightarrow\\ du=\\frac{dx}{x},\\ v=x$. Entonces $\\int\\ln x\\,dx=x\\ln x-\\int dx$.</p>',
      extra: partes(function (x) { return Math.log(x); }, function (x) { return 1 / x; }, function (x) { return x; }) },
    { id: 'p5', nombre: 'x²·eˣ  (dos veces)', latexF: 'x^{2}e^{x}', latexI: '(x^{2}-2x+2)e^{x}',
      f: function (x) { return x * x * Math.exp(x); }, F: function (x) { return (x * x - 2 * x + 2) * Math.exp(x); }, vista: [-2, 3], a0: 0, b0: 1,
      explicacion: '<p>Primero $u=x^2,\\ dv=e^x\\,dx$: $\\int x^2e^x\\,dx=x^2e^x-2\\int xe^x\\,dx$. Luego se repite el método con $\\int xe^x\\,dx$.</p>',
      extra: partes(function (x) { return x * x; }, function (x) { return 2 * x; }, function (x) { return Math.exp(x); }) },
    { id: 'p6', nombre: 'eˣ·sen(x)  (caso cíclico)', latexF: 'e^{x}\\operatorname{sen}x', latexI: '\\frac{e^{x}(\\operatorname{sen}x-\\cos x)}{2}',
      f: function (x) { return Math.exp(x) * Math.sin(x); }, F: function (x) { return Math.exp(x) * (Math.sin(x) - Math.cos(x)) / 2; }, vista: [0, 6.28], a0: 0, b0: 3.14,
      explicacion: '<p>Se aplica partes dos veces y reaparece la integral original: $I=e^x\\operatorname{sen}x-e^x\\cos x-I$. Se despeja $I=\\frac{e^x(\\operatorname{sen}x-\\cos x)}{2}$.</p>',
      extra: partes(function (x) { return Math.sin(x); }, function (x) { return Math.cos(x); }, function (x) { return Math.exp(x); }) },
    { id: 'p7', nombre: 'arctan(x)', latexF: '\\arctan x', latexI: 'x\\arctan x-\\tfrac12\\ln(1+x^{2})',
      f: function (x) { return Math.atan(x); }, F: function (x) { return x * Math.atan(x) - Math.log(1 + x * x) / 2; }, vista: [-4, 4], a0: 0, b0: 1,
      explicacion: '<p>$u=\\arctan x,\\ dv=dx\\ \\Rightarrow\\ du=\\frac{dx}{1+x^2},\\ v=x$. Entonces $\\int\\arctan x\\,dx=x\\arctan x-\\int\\frac{x}{1+x^2}dx$ (y la última sale con $u=1+x^2$).</p>',
      extra: partes(function (x) { return Math.atan(x); }, function (x) { return 1 / (1 + x * x); }, function (x) { return x; }) },
    { id: 'p8', nombre: 'x·ln(x)', latexF: 'x\\ln x', latexI: '\\frac{x^{2}}{2}\\ln x-\\frac{x^{2}}{4}',
      f: function (x) { return x * Math.log(x); }, F: function (x) { return x * x / 2 * Math.log(x) - x * x / 4; }, vista: [0.05, 5], a0: 1, b0: 3,
      explicacion: '<p>$u=\\ln x,\\ dv=x\\,dx\\ \\Rightarrow\\ du=\\frac{dx}{x},\\ v=\\frac{x^2}{2}$. Se elige $u=\\ln x$ porque derivarlo simplifica.</p>',
      extra: partes(function (x) { return Math.log(x); }, function (x) { return 1 / x; }, function (x) { return x * x / 2; }) }
  ];
  VisorIntegral.iniciar(CATALOGO);
  renderEjemplos(window.EJEMPLOS_M14, document.getElementById('ejemplos'));
})();
