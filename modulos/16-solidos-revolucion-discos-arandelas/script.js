/* script.js — Módulo 16: arranca el visualizador 3D (ver assets/js/visor-solidos.js) */
(function () {
  'use strict';
  VisorSolidos.iniciar({ modo: 'arandelas', inicio: {'secciones': 0, 'arandelas': 2, 'capas': 3}['arandelas'] });
  renderEjemplos(window.EJEMPLOS_M16, document.getElementById('ejemplos'));
})();
