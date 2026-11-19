/* script.js — Módulo 17: arranca el visualizador 3D (ver assets/js/visor-solidos.js) */
(function () {
  'use strict';
  VisorSolidos.iniciar({ modo: 'capas', inicio: {'secciones': 0, 'arandelas': 2, 'capas': 3}['capas'] });
  renderEjemplos(window.EJEMPLOS_M17, document.getElementById('ejemplos'));
})();
