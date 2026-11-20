/* script.js — Módulo 15: arranca el visualizador 3D (ver assets/js/visor-solidos.js) */
(function () {
  'use strict';
  VisorSolidos.iniciar({ modo: 'secciones', inicio: {'secciones': 0, 'arandelas': 2, 'capas': 3}['secciones'] });
  renderEjemplos(window.EJEMPLOS_M15, document.getElementById('ejemplos'));
})();
